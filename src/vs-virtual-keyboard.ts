import actions from './actions'
import { ACTION_KB_TOGGLE, ACTION_MODE_TOGGLE } from './actions'
import keyboard, { getPreventFocusOut } from './components/keyboard'
import KeyboardConfig from './types/kb-config'
import KeyboardState from './types/kb-state'

let keyboardEl: any
const VsVirtualKeyboard = (options: KeyboardConfig) => {
  const config: KeyboardConfig = { ...options }

  // Initial state
  let currentState: KeyboardState = { config }

  /**
   * Application renderer
   */
  const render = (state: KeyboardState) => {
    currentState = state

    /**
     * Keyboard lifecycle
     */
    const newEl = keyboard(state, config, (actionId: number, params: any) => {
      const action = actions.get(actionId)
      if (!action) {
        console.warn(`${actionId} NOT EXISTS`)
        return
      }
      let newState: KeyboardState = action(state, params)
      if (config.interceptor) {
        let stateChanged = config.interceptor({ ...newState })
        if (stateChanged.layoutName !== newState.layoutName) {
          const action = actions.get(ACTION_MODE_TOGGLE)
          if (action) {
            stateChanged = action(newState, { layoutName: stateChanged.layoutName })
          }
        }
        newState = stateChanged || newState
      }
      render(newState)
    })

    keyboardEl ? keyboardEl.replaceWith(newEl) : document.body.appendChild(newEl)
    keyboardEl = newEl

    /**
     * Adds default click handler to the new element
     */
    newEl.addEventListener('click', event => {
      event.preventDefault()
      if (state.input) {
        state.input.focus()
      }
    })
  }

  /**
   * Focus-in and toggle keyboard
   */
  let focusOutTimeout: any
  window.addEventListener('focusin', (event: any) => {
    focusOutTimeout && clearTimeout(focusOutTimeout)
    const action = actions.get(ACTION_KB_TOGGLE)
    if (action) {
      setTimeout(() => {
        const state: KeyboardState = action(currentState, { input: event.target })
        render(state)
      }, 10)
    }
  })

  /**
   * Focus-out interceptor and hide keyboard
   */
  window.addEventListener('focusout', e => {

    // Clicking on kb button, input focus out, returns it
    if (getPreventFocusOut()) {
      currentState.input.focus();
      e.preventDefault();
      return;
    }

    // Focus out, hide keyboard
    focusOutTimeout = setTimeout(() => {
      const action = actions.get(ACTION_KB_TOGGLE)
      if (action) {
        const state: KeyboardState = action(currentState, { input: null })
        render(state)
      }
    }, 600)
  })

  // First render
  render(currentState)
}

;(window as any).VsVirtualKeyboard = VsVirtualKeyboard
export default VsVirtualKeyboard
