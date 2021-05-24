import {default as actions, ACTION_KB_TOGGLE} from "./actions";
import keyboard from "./components/keyboard";
import KeyboardConfig from "./types/kb-config";
import KeyboardState from "./types/kb-state";

let keyboardEl: any;

(window as any).VsVirtualKeyboard = (options: KeyboardConfig) => {
  const config: KeyboardConfig = {...options};

  let currentState: KeyboardState = { config };

  /**
   * Application renderer
   */
  const render = (state: KeyboardState) => {
    currentState = state;
    const newEl = keyboard(state, config, (actionId: number, params: any) => {
      const action = actions.get(actionId);
      if (!action) {
        console.warn(`${actionId} NOT EXISTS`);
        return;
      }
      const newState: KeyboardState = action(state, params);
      render(newState);
    });
    keyboardEl ? keyboardEl.replaceWith(newEl) : document.body.appendChild(newEl);
    keyboardEl = newEl;
  };

  /**
   * Focus-in and Focus-out input and toggle keyboard
   */
  window.addEventListener('focusin', (event: any) => {
    const action = actions.get(ACTION_KB_TOGGLE);
    if (action) {
      const state: KeyboardState = action({ input: event.target });
      render(state);
    }
  });
  window.addEventListener('focusout', () => {
    const action = actions.get(ACTION_KB_TOGGLE);
    if (action) {
      const state: KeyboardState = action({ input: null });
      render(state);
    }
  });

  render(currentState);
}

