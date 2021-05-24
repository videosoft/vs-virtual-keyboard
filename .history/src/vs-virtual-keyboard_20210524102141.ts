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

  /**
   * Focus-in and Focus-out input and toggle keyboard
   */
  window.addEventListener('focusin', (event: any) => {
    const action = actions.get('KEYBOARD_TOGGLE');
    if (action) {
      const state: KeyboardState = action({ input: event.target });
      render(state);
    }
  });
  window.addEventListener('focusout', () => {
    const action = actions.get('KEYBOARD_TOGGLE');
    if (action) {
      const state: KeyboardState = action({ input: null });
      render(state);
    }
  });

  render(currentState);
}

