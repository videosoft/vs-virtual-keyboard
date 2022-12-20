import KeyboardKey from '../types/kb-key'
import KeyboardState from '../types/kb-state'

function getLayoutTable(layoutJson: Array<Array<KeyboardKey>>) {
  return layoutJson.map(l =>
    l.map(symbolKey => {
      if (typeof symbolKey === 'string') {
        return { symbol: symbolKey }
      }
      if (symbolKey.variations) {
        return {
          ...(symbolKey as any),
          variations: symbolKey.variations.map(subSymbol => {
            if (typeof subSymbol === 'string') {
              return { symbol: subSymbol }
            }
            return { ...(subSymbol as any) }
          })
        }
      }
      return { ...(symbolKey as any) }
    })
  )
}

export default (state: KeyboardState, params: any) => {
  state.layoutName = params.layoutName

  try {
    const layout = params.layout || state.config?.layouts?.layouts.find(l => l.name === state.layoutName)
    state.layout = getLayoutTable(layout.rows)
    state.shortcuts = layout.shortcuts
  } catch (err) {
    console.error(err)
  }

  return { ...state }
}
