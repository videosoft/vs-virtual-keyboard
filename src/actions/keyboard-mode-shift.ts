import KeyboardKey from "../types/kb-key";
import KeyboardState from "../types/kb-state";

function getLayoutTable(layoutJson: Array<Array<KeyboardKey>>) {
  return layoutJson.map(l => l.map(symbolKey => {
    if (typeof symbolKey === 'string') {
      return { symbol: symbolKey };
    }
    return { ...(symbolKey as any) };
  }))
}

export default (state: KeyboardState, params: any) => {
  state.layoutName = params.layoutName;

  try {
    state.layout = getLayoutTable(
      params.layout || state.config?.layouts?.layouts.find(l => l.name === state.layoutName)?.rows
    );
  } catch (err) {
    console.error(err);
  }

  return {...state};
}
