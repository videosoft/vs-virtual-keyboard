import {default as actions, ACTION_KB_TOGGLE, ACTION_MODE_TOGGLE} from "./actions";
import keyboard from "./components/keyboard";
import KeyboardConfig from "./types/kb-config";
import KeyboardState from "./types/kb-state";

let keyboardEl: any;

(window as any).VsVirtualKeyboard = (options: KeyboardConfig) => {
  const config: KeyboardConfig = {...options};

  // Initial state
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
      let newState: KeyboardState = action(state, params);
      if (config.interceptor) {
        const stateChanged = config.interceptor(newState);
        if (stateChanged.layoutName !== newState.layoutName) {
          const action = actions.get(ACTION_MODE_TOGGLE);
          stateChanged = action(newState, { layoutName: stateChanged.layoutName });
        }
        newState = stateChanged || newState;
      }
      render(newState);
    });
    keyboardEl ? keyboardEl.replaceWith(newEl) : document.body.appendChild(newEl);
    keyboardEl = newEl;
    newEl.addEventListener('click', event => {
      event.preventDefault();
      if (state.input) {
        state.input.focus();
      }
    });
  };

  /**
   * Focus-in and Focus-out input and toggle keyboard
   */
  let focusOutTimeout: any;
  window.addEventListener('focusin', (event: any) => {
    focusOutTimeout && clearTimeout(focusOutTimeout);
    const action = actions.get(ACTION_KB_TOGGLE);
    if (action) {
      setTimeout(() => {
        const state: KeyboardState = action(currentState, { input: event.target });
        render(state);
      }, 100);
    }
  });
  window.addEventListener('focusout', () => {
    focusOutTimeout = setTimeout(() => {
      const action = actions.get(ACTION_KB_TOGGLE);
      if (action) {
        const state: KeyboardState = action(currentState, { input: null });
        render(state);
      }
    }, 600);
  });

  // First render
  render(currentState);
}

