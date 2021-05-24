import KeyboardConfig from "../types/kb-config";
import KeyboardKey from "../types/kb-key";
import KeyboardState from "../types/kb-state";
import { h } from "../utils/create-element";


function getLayoutTable(layoutJson: Array<Array<KeyboardKey>>) {
  return layoutJson.map(l => l.map(symbolKey => {
    if (typeof symbolKey === 'string') {
      return { symbol: symbolKey };
    }
    return { ...(symbolKey as any) };
  }))
}

function addKeyboardKeyListener(buttonEl: any, config: KeyboardConfig, action: Function,
        key: KeyboardKey, state: KeyboardState) {

  let pressedOn: number = 0;

  buttonEl.addEventListener('mousedown', (event: any) => {
    if (!state.input) {
      return;
    }
    pressedOn = (new Date).getTime();
  });

  buttonEl.addEventListener('mouseup', (event: any) => {
    if (!state.input) {
      return;
    }
    const pressedTime = (new Date).getTime() - pressedOn;
    if (pressedTime < (config.modePressedOnTimeout || 1500)) {
      // TODO
      return;
    }

    state.input = state.input || {};

    // Keyup optional listener
    if (config.onKeyUp) {
      const newVal = config.onKeyUp(state.input?.value, key);
      state.input.value = newVal;
    }

    // Keydown optional listener
    if (config.onKeyDown) {
      const newVal = config.onKeyDown(state.input?.value, key);
      state.input.value = newVal;
    }

    // OnChange optional listener
    if (config.onChange) {
      const newVal = config.onChange(state.input?.value, key);
      state.input.value = newVal;
    }

    // Key custom action
    if (key.action) {
      const newVal = key.action(state.input?.value);
      state.input.value = newVal;
      return;
    }

    state.input.value = (state.input.value+'') + key.symbol;
  });
}


export default (state: KeyboardState, config: KeyboardConfig, action: Function) => {

  // Gets the default layout for first
  if (!state.layout) {
    const layouts: any = config.layouts || {};
    const layout = layouts.layouts.find((l: any) => l.name === config.layouts?.defaultLayout);
    state.layout = getLayoutTable(layout.rows);
  }

  // Kb rows format
  const rows = state.layout.map(l => {

    // Row buttons format
    const buttons = l.map(kButton => {

      // Button with icon
      if (kButton.base64Icon) {
        return h('button', 'vs-virtual-kb-row-button-with-icon', [
          h('img', 'vs-virtual-kb-row-button-with-icon-icon', [], {
            src: kButton.base64Icon,
            alt: kButton.symbol
          })
        ]);
      }

      // Common char button
      if (!state.mode) {
        return h('button', 'vs-virtual-kb-row-button', [], kButton.symbol);
      }

      // Button without variations
      if (!kButton.variations?.length) {
        return h('button', 'vs-virtual-kb-row-button', [], kButton.symbol);
      }

      // Button variation
      const variation = kButton.variations.find(v => v.mode === state.mode);
      if (!variation) {
        return h('button', 'vs-virtual-kb-row-button', [], kButton.symbol);
      }

      // Variation button icon
      if (variation.key.base64Icon) {
        return h('button', 'vs-virtual-kb-row-button-with-icon', [
          h('img', 'vs-virtual-kb-row-button-with-icon-icon', [], {
            src: kButton.base64Icon,
            alt: kButton.symbol
          })
        ]);
      }

      // Variation symbol
      const buttonEl = h('button', 'vs-virtual-kb-row-button', [], variation.key.symbol);

      // Adding click listeners
      addKeyboardKeyListener(buttonEl, config, action, kButton, state);

      return buttonEl;
    });

    // Row buttons div
    return h('div', 'vs-virtual-kb-row', buttons);
  });

  return h('div', `vs-virtual-kb ${config.wrpClass || ''}`, rows);
}
