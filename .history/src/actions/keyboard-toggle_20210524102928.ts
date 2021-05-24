import KeyboardState from "../types/kb-state";


export default (state: KeyboardState, params: any) => {
  if ((state.config?.availableInTypes || ['text']).indexOf(params.input.type || '') === -1) {
    return;
  }
  setTimeout(() => render({ ...currentState, input: event.target }), 100);
}

