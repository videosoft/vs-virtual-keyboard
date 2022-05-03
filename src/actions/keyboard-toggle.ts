import KeyboardState from '../types/kb-state'

export default (state: KeyboardState, params: any) => {
  if (!params.input) {
    return { ...state, input: null }
  }
  if (params.input.dataset.forceKeyboard) {
    if ((state.config?.availableInTypes || ['text']).indexOf(params.input.dataset.forceKeyboard) === -1) {
      return { ...state, input: null }     
    }
  } else if ((state.config?.availableInTypes || ['text']).indexOf(params.input.type || '') === -1) {
    return { ...state, input: null }
  }
  
  return { ...state, input: params.input }
}
