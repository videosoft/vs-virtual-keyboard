import KeyboardState from "../types/kb-state";


export default (state: KeyboardState, params: any) => {
  state.layout = params.layout;
  return {...state};
}
