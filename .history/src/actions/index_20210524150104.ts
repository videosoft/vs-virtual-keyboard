import kdToggle from './keyboard-toggle';
import kdModeShift from './keyboard-mode-shift';
import kbTyped from './keyboard-typed';

export const ACTION_KB_TOGGLE = 0;
export const ACTION_MODE_TOGGLE = 2;
export const ACTION_KB_TYPED = 3;

const actions: Map<Number, Function> = new Map<Number, Function>();

actions.set(ACTION_KB_TOGGLE, kdToggle);
actions.set(ACTION_MODE_TOGGLE, kdModeShift);
actions.set(ACTION_KB_TYPED, kbTyped);


export default actions;
