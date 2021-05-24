import KeyboardConfig from "../types/kb-config";
import KeyboardKey from "../types/kb-key";
import KeyboardState from "../types/kb-state";
import { h } from "../utils/create-element";


function getLayoutTable(layoutJson: Array<Array<KeyboardKey>>) {
  return layoutJson.map(l => l.map(symbolKey => {
    if (typeof symbolKey === 'object') {
      return { symbol: symbolKey.symbol };
    }
    return { ...(symbolKey as any) };
  }))
}

function addKeyboardKeyListener(button: any, config: KeyboardConfig, action: Function) {
  // let pressedOn: number = 0;

  button.addEventListener('mousedown', (event: any) => {
    // TODO
    console.log(event);
  });

  button.addEventListener('mouseup', (event: any) => {
    // TODO
    console.log(event);
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
      return h('button', 'vs-virtual-kb-row-button', [], variation.key.symbol);
    });

    // Button listeners
    for (const button of buttons) {
      addKeyboardKeyListener(button, config, action);
    }

    // Row buttons div
    return h('div', 'vs-virtual-kb-row', buttons);
  });

  return h('div', `vs-virtual-kb ${config.wrpClass || ''}`, rows);
}
