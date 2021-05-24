import kdToggle from './keyboard-toggle';
import kdModeShift from './keyboard-mode-shift';

export const ACTION_KB_TOGGLE = 0;
export const ACTION_MODE_TOGGLE = 2;
// const ACTION_VARIATION_TOGGLE = 3;

const actions: Map<Number, Function> = new Map<Number, Function>();

actions.set(ACTION_KB_TOGGLE, kdToggle);
// actions.set(ACTION_KB_TOGGLE, kdModeShift);

export default actions;
