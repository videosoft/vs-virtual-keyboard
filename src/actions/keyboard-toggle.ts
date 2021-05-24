import KeyboardState from "../types/kb-state";


export default (state: KeyboardState, params: any) => {
  if (!params.input) {
    return { ...state, input: null };
  }
  if ((state.config?.availableInTypes || ['text']).indexOf(params.input.type || '') === -1) {
    return { ...state };
  }
  return { ...state, input: params.input };
}

