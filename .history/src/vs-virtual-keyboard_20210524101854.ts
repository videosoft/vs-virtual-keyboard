import actions from "./actions";
import keyboard from "./components/keyboard";
import KeyboardConfig from "./types/kb-config";
import KeyboardState from "./types/kb-state";

let keyboardEl: any;

(window as any).VsVirtualKeyboard = (options: KeyboardConfig) => {
  const config: KeyboardConfig = {...options};
  config.availableInTypes = config.availableInTypes || ['text'];

  let currentState: KeyboardState = { config };

  const render = (state: KeyboardState) => {
    currentState = state;
    const newEl = keyboard(state, config, (actionName: string, params: any) => {
      const action = actions.get(actionName);
      if (!action) {
        console.warn(`${actionName} NOT EXISTS`);
        return;
      }
      const state: KeyboardState = action(actionName, params);
      render(state);
    });
    keyboardEl ? keyboardEl.replaceWith(newEl) : document.body.appendChild(newEl);
    keyboardEl = newEl;
  };

  // Focus in input and toggle keyboard
  window.addEventListener('focusin', (event: any) => {
    const state: KeyboardState = action('KEYBOARD_TOGGLE', { event });
  });

  window.addEventListener('focusout', (event: any) => {
    if (config.availableInTypes?.indexOf(event.target?.type || '') === -1) {
      return;
    }
    render({ ...currentState, input: null });
  });

  render(currentState);
}

