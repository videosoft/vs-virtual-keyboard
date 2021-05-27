"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("./actions");
var actions_2 = require("./actions");
var keyboard_1 = require("./components/keyboard");
var keyboardEl;
var VsVirtualKeyboard = function (options) {
    var config = __assign({}, options);
    // Initial state
    var currentState = { config: config };
    /**
     * Application renderer
     */
    var render = function (state) {
        currentState = state;
        /**
         * Keyboard lifecycle
         */
        var newEl = keyboard_1.default(state, config, function (actionId, params) {
            var action = actions_1.default.get(actionId);
            if (!action) {
                console.warn(actionId + " NOT EXISTS");
                return;
            }
            var newState = action(state, params);
            if (config.interceptor) {
                var stateChanged = config.interceptor(__assign({}, newState));
                if (stateChanged.layoutName !== newState.layoutName) {
                    var action_1 = actions_1.default.get(actions_2.ACTION_MODE_TOGGLE);
                    if (action_1) {
                        stateChanged = action_1(newState, { layoutName: stateChanged.layoutName });
                    }
                }
                newState = stateChanged || newState;
            }
            render(newState);
        });
        keyboardEl ? keyboardEl.replaceWith(newEl) : document.body.appendChild(newEl);
        keyboardEl = newEl;
        /**
         * Adds default click handler to the new element
         */
        newEl.addEventListener('click', function (event) {
            event.preventDefault();
            if (state.input) {
                state.input.focus();
            }
        });
    };
    /**
     * Focus-in and toggle keyboard
     */
    var focusOutTimeout;
    window.addEventListener('focusin', function (event) {
        focusOutTimeout && clearTimeout(focusOutTimeout);
        var action = actions_1.default.get(actions_2.ACTION_KB_TOGGLE);
        if (action) {
            setTimeout(function () {
                var state = action(currentState, { input: event.target });
                render(state);
            }, 10);
        }
    });
    /**
     * Focus-out interceptor and hide keyboard
     */
    window.addEventListener('focusout', function (e) {
        // Clicking on kb button, input focus out, returns it
        if (keyboard_1.getPreventFocusOut()) {
            currentState.input.focus();
            e.preventDefault();
            return;
        }
        // Focus out, hide keyboard
        focusOutTimeout = setTimeout(function () {
            var action = actions_1.default.get(actions_2.ACTION_KB_TOGGLE);
            if (action) {
                var state = action(currentState, { input: null });
                render(state);
            }
        }, 600);
    });
    // First render
    render(currentState);
};
window.VsVirtualKeyboard = VsVirtualKeyboard;
exports.default = VsVirtualKeyboard;
//# sourceMappingURL=vs-virtual-keyboard.js.map