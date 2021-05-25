import KeyboardKey from '../types/kb-key'
import KeyboardState from '../types/kb-state'

export default (state: KeyboardState, params: any) => {
  const key: KeyboardKey = params.key

  return {
    ...state,
    variationShow: key
  }
}
