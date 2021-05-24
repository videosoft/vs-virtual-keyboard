import actions from "./actions";
import keyboard from "./components/keyboard";
import KeyboardConfig from "./types/kb-config";
import KeyboardState from "./types/kb-state";

let keyboardEl: any;

(window as any).VsVirtualKeyboard = (options: KeyboardConfig) => {
  const config: KeyboardConfig = {...options};

  let currentState = {};

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

  window.addEventListener('focusin', event => render({
    ...currentState,
    input: event.target
  }));

  render(currentState);
}

