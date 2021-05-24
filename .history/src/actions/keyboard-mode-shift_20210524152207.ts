import KeyboardState from "../types/kb-state";


export default (state: KeyboardState, params: any) => {
  state.layoutName = params.layoutName;
  state.layout = params.layout || state.config?.layouts?.layouts.find(l => l.name === state.layoutName);
  return {...state};
}
