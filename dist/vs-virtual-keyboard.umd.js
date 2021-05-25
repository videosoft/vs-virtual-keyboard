(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (factory());
}(this, (function () { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    var kdToggle = (function (state, params) {
        var _a;
        if (!params.input) {
            return __assign(__assign({}, state), { input: null });
        }
        if ((((_a = state.config) === null || _a === void 0 ? void 0 : _a.availableInTypes) || ['text']).indexOf(params.input.type || '') === -1) {
            return __assign({}, state);
        }
        return __assign(__assign({}, state), { input: params.input });
    });
    //# sourceMappingURL=keyboard-toggle.js.map

    function getLayoutTable(layoutJson) {
        return layoutJson.map(function (l) { return l.map(function (symbolKey) {
            if (typeof symbolKey === 'string') {
                return { symbol: symbolKey };
            }
            return __assign({}, symbolKey);
        }); });
    }
    var kdModeShift = (function (state, params) {
        var _a, _b, _c;
        state.layoutName = params.layoutName;
        try {
            state.layout = getLayoutTable(params.layout || ((_c = (_b = (_a = state.config) === null || _a === void 0 ? void 0 : _a.layouts) === null || _b === void 0 ? void 0 : _b.layouts.find(function (l) { return l.name === state.layoutName; })) === null || _c === void 0 ? void 0 : _c.rows));
        }
        catch (err) {
            console.error(err);
        }
        return __assign({}, state);
    });
    //# sourceMappingURL=keyboard-mode-shift.js.map

    var kbTyped = (function (state, params) {
        return __assign({}, state);
    });
    //# sourceMappingURL=keyboard-typed.js.map

    var ACTION_KB_TOGGLE = 0;
    var ACTION_MODE_TOGGLE = 2;
    var ACTION_KB_TYPED = 3;
    var actions = new Map();
    actions.set(ACTION_KB_TOGGLE, kdToggle);
    actions.set(ACTION_MODE_TOGGLE, kdModeShift);
    actions.set(ACTION_KB_TYPED, kbTyped);
    //# sourceMappingURL=index.js.map

    var h = function (tagName, classList, children, options) {
        if (options === void 0) { options = null; }
        var el = document.createElement(tagName);
        (classList || '').split(' ').forEach(function (cl) { return cl && el.classList.add(cl); });
        (children || []).forEach(function (c) { return el.appendChild(c); });
        if (!options) {
            return el;
        }
        if (typeof options === 'string') {
            el.textContent = options;
            return el;
        }
        Object.keys(options).forEach(function (o) { return el.setAttribute(o, options[o]); });
        return el;
    };
    //# sourceMappingURL=create-element.js.map

    function addKeyboardKeyListener(buttonEl, config, action, key, state) {
        var pressedOn = 0;
        buttonEl.addEventListener('mousedown', function (event) {
            if (!state.input) {
                return;
            }
            pressedOn = (new Date).getTime();
        });
        buttonEl.addEventListener('mouseup', function (event) { return setTimeout(function () {
            var _a, _b, _c, _d;
            if (!state.input) {
                return;
            }
            var pressedTime = (new Date).getTime() - pressedOn;
            if (pressedTime > (config.modePressedOnTimeout || 2500)) {
                // TODO
                return;
            }
            state.input = state.input || {};
            // Keyup optional listener
            if (config.onKeyUp) {
                var newVal = config.onKeyUp((_a = state.input) === null || _a === void 0 ? void 0 : _a.value, key);
                state.input.value = newVal || '';
            }
            // Keydown optional listener
            if (config.onKeyDown) {
                var newVal = config.onKeyDown((_b = state.input) === null || _b === void 0 ? void 0 : _b.value, key);
                state.input.value = newVal || '';
            }
            // OnChange optional listener
            if (config.onChange) {
                var newVal = config.onChange((_c = state.input) === null || _c === void 0 ? void 0 : _c.value, key);
                state.input.value = newVal || '';
            }
            // Key custom action
            if (key.action) {
                var newVal = key.action((_d = state.input) === null || _d === void 0 ? void 0 : _d.value);
                state.input.value = newVal || '';
                return;
            }
            else if (key.layoutShift) {
                // Layout shift key
                action(ACTION_MODE_TOGGLE, { layoutName: key.layoutShift });
                return;
            }
            else {
                state.input.value = (state.input.value + '') + key.symbol;
            }
            action(ACTION_KB_TYPED, {});
        }, 200); });
    }
    var keyboard = (function (state, config, action) {
        var _a;
        // Gets the default layout for first
        if (!state.layout) {
            var layouts = config.layouts || {};
            var layout = layouts.layouts.find(function (l) { var _a; return l.name === ((_a = config.layouts) === null || _a === void 0 ? void 0 : _a.defaultLayout); });
            action(ACTION_MODE_TOGGLE, {
                layout: layout.rows,
                layoutName: (_a = config.layouts) === null || _a === void 0 ? void 0 : _a.defaultLayout
            });
            return h('div', 'vs-virtual-kb', []);
        }
        // Kb rows format
        var rows = state.layout.map(function (l) {
            // Row buttons format
            var buttons = l.map(function (kButton) {
                var buttonEl = (function () {
                    var _a;
                    // Button with icon
                    if (kButton.base64Icon) {
                        return h('button', 'vs-virtual-kb-row-button-with-icon', [
                            h('img', 'vs-virtual-kb-row-button-with-icon-icon', [], {
                                src: kButton.base64Icon,
                                alt: kButton.symbol
                            })
                        ]);
                    }
                    // Common char button
                    if (!state.mode) {
                        return h('button', 'vs-virtual-kb-row-button', [], kButton.symbol);
                    }
                    // Button without variations
                    if (!((_a = kButton.variations) === null || _a === void 0 ? void 0 : _a.length)) {
                        return h('button', 'vs-virtual-kb-row-button', [], kButton.symbol);
                    }
                    // Button variation
                    var variation = kButton.variations.find(function (v) { return v.mode === state.mode; });
                    if (!variation) {
                        return h('button', 'vs-virtual-kb-row-button', [], kButton.symbol);
                    }
                    // Variation button icon
                    if (variation.key.base64Icon) {
                        return h('button', 'vs-virtual-kb-row-button-with-icon', [
                            h('img', 'vs-virtual-kb-row-button-with-icon-icon', [], {
                                src: kButton.base64Icon,
                                alt: kButton.symbol
                            })
                        ]);
                    }
                    // Variation symbol
                    return h('button', 'vs-virtual-kb-row-button', [], variation.key.symbol);
                })();
                // Applies key specific class
                var hash;
                try {
                    hash = btoa(kButton.symbol);
                }
                catch (err) {
                    hash = encodeURIComponent(kButton.symbol);
                }
                buttonEl.classList.add("vs-virtual-kb-key-" + hash.split('=').join(''));
                // Adding click listeners
                addKeyboardKeyListener(buttonEl, config, action, kButton, state);
                return buttonEl;
            });
            // Row buttons div
            return h('div', 'vs-virtual-kb-row', buttons);
        });
        return h('div', "vs-virtual-kb " + (config.wrpClass || '') + " " + (state.input ? 'vs-virtual-kb-opened' : 'vs-virtual-kb-closed'), rows);
    });
    //# sourceMappingURL=keyboard.js.map

    var keyboardEl;
    window.VsVirtualKeyboard = function (options) {
        var config = __assign({}, options);
        // Initial state
        var currentState = { config: config };
        /**
         * Application renderer
         */
        var render = function (state) {
            currentState = state;
            var newEl = keyboard(state, config, function (actionId, params) {
                var action = actions.get(actionId);
                if (!action) {
                    console.warn(actionId + " NOT EXISTS");
                    return;
                }
                var newState = action(state, params);
                if (config.interceptor) {
                    var stateChanged = config.interceptor(__assign({}, newState));
                    if (stateChanged.layoutName !== newState.layoutName) {
                        var action_1 = actions.get(ACTION_MODE_TOGGLE);
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
            newEl.addEventListener('click', function (event) {
                event.preventDefault();
                if (state.input) {
                    state.input.focus();
                }
            });
        };
        /**
         * Focus-in and Focus-out input and toggle keyboard
         */
        var focusOutTimeout;
        window.addEventListener('focusin', function (event) {
            focusOutTimeout && clearTimeout(focusOutTimeout);
            var action = actions.get(ACTION_KB_TOGGLE);
            if (action) {
                setTimeout(function () {
                    var state = action(currentState, { input: event.target });
                    render(state);
                }, 100);
            }
        });
        window.addEventListener('focusout', function () {
            focusOutTimeout = setTimeout(function () {
                var action = actions.get(ACTION_KB_TOGGLE);
                if (action) {
                    var state = action(currentState, { input: null });
                    render(state);
                }
            }, 600);
        });
        // First render
        render(currentState);
    };

})));
//# sourceMappingURL=vs-virtual-keyboard.umd.js.map
