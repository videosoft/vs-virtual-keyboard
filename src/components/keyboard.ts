import { ACTION_KB_TYPED, ACTION_MODE_TOGGLE, ACTION_VARIATION_TOGGLE } from '../actions'
import KeyboardConfig from '../types/kb-config'
import KeyboardKey from '../types/kb-key'
import KeyboardState from '../types/kb-state'
import { h } from '../utils/create-element'
import isTouchDevice from '../utils/is-touch'


let preventFocusOut = false
let cancelPullout = false
let variationsTimeout: any
export const getPreventFocusOut = () => preventFocusOut;


function addKeyboardKeyListener(
  buttonEl: any,
  config: KeyboardConfig,
  action: Function,
  key: KeyboardKey,
  state: KeyboardState
) {
  let cancelTouchEnd = false

  const isTouch = isTouchDevice()
  const eventTrigger = isTouch ? 'touchstart' : 'mousedown'
  const eventPullout = isTouch ? 'touchend' : 'mouseup'

  buttonEl.addEventListener(eventTrigger, (event: any) => {
    cancelTouchEnd = false
    if (!state.input) {
      return
    }
    variationsTimeout && clearTimeout(variationsTimeout)
    variationsTimeout = setTimeout(() => {
      cancelTouchEnd = true
      if (key.variations && key.variations.length) {
        action(ACTION_VARIATION_TOGGLE, { key })
        cancelPullout = true
        setTimeout(() => cancelPullout = false, 400)
      }
    }, 1e3)
  })

  buttonEl.addEventListener(eventPullout, (event: any) => {
    if (cancelPullout) {
      return
    }

    variationsTimeout && clearTimeout(variationsTimeout)

    setTimeout(() => {

      if (cancelTouchEnd) {
        return
      }

      if (!state.input) {
        return
      }

      state.input = state.input || {}

      // Keyup optional listener
      if (config.onKeyUp) {
        const newVal = config.onKeyUp(state.input?.value, key)
        state.input.value = newVal || ''
      }

      // Keydown optional listener
      if (config.onKeyDown) {
        const newVal = config.onKeyDown(state.input?.value, key)
        state.input.value = newVal || ''
      }

      // OnChange optional listener
      if (config.onChange) {
        const newVal = config.onChange(state.input?.value, key)
        state.input.value = newVal || ''
      }

      // Key custom action
      if (key.action) {
        const newVal = key.action(state.input?.value)
        state.input.value = newVal || ''
        return
      } else if (key.layoutShift) {
        // Layout shift key
        action(ACTION_MODE_TOGGLE, { layoutName: key.layoutShift })
        return
      } else {
        state.input.value = state.input.value + '' + key.symbol
      }

      action(ACTION_KB_TYPED, {})
    }, 200)
  });
}


export default (state: KeyboardState, config: KeyboardConfig, action: Function) => {

  // Gets the default layout for first
  if (!state.layout) {
    const layouts: any = config.layouts || {}
    const layout = layouts.layouts.find((l: any) => l.name === config.layouts?.defaultLayout)
    action(ACTION_MODE_TOGGLE, {
      layout: layout.rows,
      layoutName: config.layouts?.defaultLayout
    })
    return h('div', 'vs-virtual-kb', [])
  }

  // Kb rows format
  const rows = state.layout.map(l => {

    // Row buttons format
    const buttons = l.map(kButton => {

      let createButton: Function
      let subButtonsEl: Array<{ key: KeyboardKey; button: any }> = []

      // Button render function
      const buttonEl: any = (createButton = (kButton: KeyboardKey) => {

        // Button with icon
        if (kButton.base64Icon) {
          return h('button', 'vs-virtual-kb-row-button-with-icon', [
            h('img', 'vs-virtual-kb-row-button-with-icon-icon', [], {
              src: kButton.base64Icon,
              alt: kButton.symbol
            })
          ])
        }

        // Button variations popover
        if (state.variationShow === kButton) {
          return h('button', 'vs-virtual-kb-row-button', [
            (() => {

              // Creates the variation popover element
              const variationsRow = h('div', 'vs-virtual-kb-row-button-variations', [
                ...(kButton.variations || []).map(variation => {
                  const button = createButton(variation)
                  subButtonsEl.push({ key: variation, button })
                  return button
                })
              ])

              // Stop event propagation to the parent button
              variationsRow.addEventListener('touchstart', e => e.stopImmediatePropagation())
              variationsRow.addEventListener('touchend', e => e.stopImmediatePropagation())

              // Popover extreme position adjust
              setTimeout(() => {
                const width = window.innerWidth
                const coords = variationsRow.getBoundingClientRect()
                if (coords.x < 300) {
                  variationsRow.style.marginLeft = '200px'
                  return
                }
                if (width - coords.x < 300) {
                  variationsRow.style.marginLeft = '-200px'
                  return
                }
              }, 200)

              // Returns el
              return variationsRow
            })(),
            h('span', '', [], kButton.symbol)
          ])
        }

        return h('button', 'vs-virtual-kb-row-button', [], kButton.symbol)
      })(kButton)

      // Applies key specific class
      let hash
      try {
        hash = btoa(kButton.symbol)
      } catch (err) {
        hash = encodeURIComponent(kButton.symbol)
      }
      buttonEl.classList.add(`vs-virtual-kb-key-${hash.split('=').join('')}`)

      // Adding click listeners
      addKeyboardKeyListener(buttonEl, config, action, kButton, state)
      subButtonsEl.forEach(b => addKeyboardKeyListener(b.button, config, action, b.key, state))

      return buttonEl
    })

    // Row buttons div
    return h('div', 'vs-virtual-kb-row', buttons)
  })

  // App main div
  const appDiv = h(
    'div',
    `vs-virtual-kb ${config.wrpClass || ''} vs-virtual-kb-closed${
      state.input ? 'vs-virtual-kb-opened' : ''
    }`,
    rows
  )

  // No context menu
  appDiv.addEventListener('contextmenu', e => {
    e.preventDefault()
    state.input.focus()
  })

  // Variation close
  appDiv.addEventListener('click', e => {
    if (state.variationShow) {
      action(ACTION_VARIATION_TOGGLE, {})
    }
  })

  // Prevent focus out notification
  let preventFocusOutTimeout: any;
  appDiv.addEventListener('mousedown', () => {
    preventFocusOut = true;
    if (preventFocusOutTimeout) {
      clearTimeout(preventFocusOutTimeout);
    }
    preventFocusOutTimeout = setTimeout(() => preventFocusOut = false, 50);
  });

  return appDiv
}
