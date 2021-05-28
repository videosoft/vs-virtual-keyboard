import kdToggle from './keyboard-toggle'
import kdModeShift from './keyboard-mode-shift'
import kbTyped from './keyboard-typed'
import variationToggle from './keyboard-variation-toggle'

export const ACTION_KB_TOGGLE = 0
export const ACTION_MODE_TOGGLE = 2
export const ACTION_KB_TYPED = 3
export const ACTION_VARIATION_TOGGLE = 4

const actions: Map<Number, Function> = new Map<Number, Function>()

actions.set(ACTION_KB_TOGGLE, kdToggle)
actions.set(ACTION_MODE_TOGGLE, kdModeShift)
actions.set(ACTION_KB_TYPED, kbTyped)
actions.set(ACTION_VARIATION_TOGGLE, variationToggle)

export default actions
