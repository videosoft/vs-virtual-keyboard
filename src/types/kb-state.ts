import KeyboardConfig from './kb-config'
import KeyboardKey from './kb-key'

export default interface KeyboardState {
  layoutName?: string
  layout?: Array<Array<KeyboardKey>>
  shortcuts?: Array<string>
  mode?: string
  input?: any
  config?: KeyboardConfig
  variationShow?: KeyboardKey
}
