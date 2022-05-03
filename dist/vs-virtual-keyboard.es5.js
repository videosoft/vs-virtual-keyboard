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

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

var kdToggle = (function (state, params) {
    var _a, _b;
    if (!params.input) {
        return __assign(__assign({}, state), { input: null });
    }
    if (params.input.dataset.forceKeyboard) {
        if ((((_a = state.config) === null || _a === void 0 ? void 0 : _a.availableInTypes) || ['text']).indexOf(params.input.dataset.forceKeyboard) === -1) {
            return __assign(__assign({}, state), { input: null });
        }
    }
    else if ((((_b = state.config) === null || _b === void 0 ? void 0 : _b.availableInTypes) || ['text']).indexOf(params.input.type || '') === -1) {
        return __assign(__assign({}, state), { input: null });
    }
    return __assign(__assign({}, state), { input: params.input });
});

function getLayoutTable(layoutJson) {
    return layoutJson.map(function (l) {
        return l.map(function (symbolKey) {
            if (typeof symbolKey === 'string') {
                return { symbol: symbolKey };
            }
            if (symbolKey.variations) {
                return __assign(__assign({}, symbolKey), { variations: symbolKey.variations.map(function (subSymbol) {
                        if (typeof subSymbol === 'string') {
                            return { symbol: subSymbol };
                        }
                        return __assign({}, subSymbol);
                    }) });
            }
            return __assign({}, symbolKey);
        });
    });
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

var kbTyped = (function (state, params) {
    return __assign(__assign({}, state), { variationShow: null });
});

var variationToggle = (function (state, params) {
    var key = params.key;
    return __assign(__assign({}, state), { variationShow: key });
});

var ACTION_KB_TOGGLE = 0;
var ACTION_MODE_TOGGLE = 2;
var ACTION_KB_TYPED = 3;
var ACTION_VARIATION_TOGGLE = 4;
var actions = new Map();
actions.set(ACTION_KB_TOGGLE, kdToggle);
actions.set(ACTION_MODE_TOGGLE, kdModeShift);
actions.set(ACTION_KB_TYPED, kbTyped);
actions.set(ACTION_VARIATION_TOGGLE, variationToggle);

function createElement(tagName, options) {
    return document.createElement(tagName, options);
}
function createElementNS(namespaceURI, qualifiedName, options) {
    return document.createElementNS(namespaceURI, qualifiedName, options);
}
function createTextNode(text) {
    return document.createTextNode(text);
}
function createComment(text) {
    return document.createComment(text);
}
function insertBefore(parentNode, newNode, referenceNode) {
    parentNode.insertBefore(newNode, referenceNode);
}
function removeChild(node, child) {
    node.removeChild(child);
}
function appendChild(node, child) {
    node.appendChild(child);
}
function parentNode(node) {
    return node.parentNode;
}
function nextSibling(node) {
    return node.nextSibling;
}
function tagName(elm) {
    return elm.tagName;
}
function setTextContent(node, text) {
    node.textContent = text;
}
function getTextContent(node) {
    return node.textContent;
}
function isElement(node) {
    return node.nodeType === 1;
}
function isText(node) {
    return node.nodeType === 3;
}
function isComment(node) {
    return node.nodeType === 8;
}
const htmlDomApi = {
    createElement,
    createElementNS,
    createTextNode,
    createComment,
    insertBefore,
    removeChild,
    appendChild,
    parentNode,
    nextSibling,
    tagName,
    setTextContent,
    getTextContent,
    isElement,
    isText,
    isComment,
};

function vnode(sel, data, children, text, elm) {
    const key = data === undefined ? undefined : data.key;
    return { sel, data, children, text, elm, key };
}

const array = Array.isArray;
function primitive(s) {
    return typeof s === "string" || typeof s === "number";
}

function isUndef(s) {
    return s === undefined;
}
function isDef(s) {
    return s !== undefined;
}
const emptyNode = vnode("", {}, [], undefined, undefined);
function sameVnode(vnode1, vnode2) {
    var _a, _b;
    const isSameKey = vnode1.key === vnode2.key;
    const isSameIs = ((_a = vnode1.data) === null || _a === void 0 ? void 0 : _a.is) === ((_b = vnode2.data) === null || _b === void 0 ? void 0 : _b.is);
    const isSameSel = vnode1.sel === vnode2.sel;
    return isSameSel && isSameKey && isSameIs;
}
function isVnode(vnode$$1) {
    return vnode$$1.sel !== undefined;
}
function createKeyToOldIdx(children, beginIdx, endIdx) {
    var _a;
    const map = {};
    for (let i = beginIdx; i <= endIdx; ++i) {
        const key = (_a = children[i]) === null || _a === void 0 ? void 0 : _a.key;
        if (key !== undefined) {
            map[key] = i;
        }
    }
    return map;
}
const hooks = [
    "create",
    "update",
    "remove",
    "destroy",
    "pre",
    "post",
];
function init(modules, domApi) {
    let i;
    let j;
    const cbs = {
        create: [],
        update: [],
        remove: [],
        destroy: [],
        pre: [],
        post: [],
    };
    const api = domApi !== undefined ? domApi : htmlDomApi;
    for (i = 0; i < hooks.length; ++i) {
        cbs[hooks[i]] = [];
        for (j = 0; j < modules.length; ++j) {
            const hook = modules[j][hooks[i]];
            if (hook !== undefined) {
                cbs[hooks[i]].push(hook);
            }
        }
    }
    function emptyNodeAt(elm) {
        const id = elm.id ? "#" + elm.id : "";
        // elm.className doesn't return a string when elm is an SVG element inside a shadowRoot.
        // https://stackoverflow.com/questions/29454340/detecting-classname-of-svganimatedstring
        const classes = elm.getAttribute("class");
        const c = classes ? "." + classes.split(" ").join(".") : "";
        return vnode(api.tagName(elm).toLowerCase() + id + c, {}, [], undefined, elm);
    }
    function createRmCb(childElm, listeners) {
        return function rmCb() {
            if (--listeners === 0) {
                const parent = api.parentNode(childElm);
                api.removeChild(parent, childElm);
            }
        };
    }
    function createElm(vnode$$1, insertedVnodeQueue) {
        var _a, _b;
        let i;
        let data = vnode$$1.data;
        if (data !== undefined) {
            const init = (_a = data.hook) === null || _a === void 0 ? void 0 : _a.init;
            if (isDef(init)) {
                init(vnode$$1);
                data = vnode$$1.data;
            }
        }
        const children = vnode$$1.children;
        const sel = vnode$$1.sel;
        if (sel === "!") {
            if (isUndef(vnode$$1.text)) {
                vnode$$1.text = "";
            }
            vnode$$1.elm = api.createComment(vnode$$1.text);
        }
        else if (sel !== undefined) {
            // Parse selector
            const hashIdx = sel.indexOf("#");
            const dotIdx = sel.indexOf(".", hashIdx);
            const hash = hashIdx > 0 ? hashIdx : sel.length;
            const dot = dotIdx > 0 ? dotIdx : sel.length;
            const tag = hashIdx !== -1 || dotIdx !== -1
                ? sel.slice(0, Math.min(hash, dot))
                : sel;
            const elm = (vnode$$1.elm =
                isDef(data) && isDef((i = data.ns))
                    ? api.createElementNS(i, tag, data)
                    : api.createElement(tag, data));
            if (hash < dot)
                elm.setAttribute("id", sel.slice(hash + 1, dot));
            if (dotIdx > 0)
                elm.setAttribute("class", sel.slice(dot + 1).replace(/\./g, " "));
            for (i = 0; i < cbs.create.length; ++i)
                cbs.create[i](emptyNode, vnode$$1);
            if (array(children)) {
                for (i = 0; i < children.length; ++i) {
                    const ch = children[i];
                    if (ch != null) {
                        api.appendChild(elm, createElm(ch, insertedVnodeQueue));
                    }
                }
            }
            else if (primitive(vnode$$1.text)) {
                api.appendChild(elm, api.createTextNode(vnode$$1.text));
            }
            const hook = vnode$$1.data.hook;
            if (isDef(hook)) {
                (_b = hook.create) === null || _b === void 0 ? void 0 : _b.call(hook, emptyNode, vnode$$1);
                if (hook.insert) {
                    insertedVnodeQueue.push(vnode$$1);
                }
            }
        }
        else {
            vnode$$1.elm = api.createTextNode(vnode$$1.text);
        }
        return vnode$$1.elm;
    }
    function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
        for (; startIdx <= endIdx; ++startIdx) {
            const ch = vnodes[startIdx];
            if (ch != null) {
                api.insertBefore(parentElm, createElm(ch, insertedVnodeQueue), before);
            }
        }
    }
    function invokeDestroyHook(vnode$$1) {
        var _a, _b;
        const data = vnode$$1.data;
        if (data !== undefined) {
            (_b = (_a = data === null || data === void 0 ? void 0 : data.hook) === null || _a === void 0 ? void 0 : _a.destroy) === null || _b === void 0 ? void 0 : _b.call(_a, vnode$$1);
            for (let i = 0; i < cbs.destroy.length; ++i)
                cbs.destroy[i](vnode$$1);
            if (vnode$$1.children !== undefined) {
                for (let j = 0; j < vnode$$1.children.length; ++j) {
                    const child = vnode$$1.children[j];
                    if (child != null && typeof child !== "string") {
                        invokeDestroyHook(child);
                    }
                }
            }
        }
    }
    function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
        var _a, _b;
        for (; startIdx <= endIdx; ++startIdx) {
            let listeners;
            let rm;
            const ch = vnodes[startIdx];
            if (ch != null) {
                if (isDef(ch.sel)) {
                    invokeDestroyHook(ch);
                    listeners = cbs.remove.length + 1;
                    rm = createRmCb(ch.elm, listeners);
                    for (let i = 0; i < cbs.remove.length; ++i)
                        cbs.remove[i](ch, rm);
                    const removeHook = (_b = (_a = ch === null || ch === void 0 ? void 0 : ch.data) === null || _a === void 0 ? void 0 : _a.hook) === null || _b === void 0 ? void 0 : _b.remove;
                    if (isDef(removeHook)) {
                        removeHook(ch, rm);
                    }
                    else {
                        rm();
                    }
                }
                else {
                    // Text node
                    api.removeChild(parentElm, ch.elm);
                }
            }
        }
    }
    function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
        let oldStartIdx = 0;
        let newStartIdx = 0;
        let oldEndIdx = oldCh.length - 1;
        let oldStartVnode = oldCh[0];
        let oldEndVnode = oldCh[oldEndIdx];
        let newEndIdx = newCh.length - 1;
        let newStartVnode = newCh[0];
        let newEndVnode = newCh[newEndIdx];
        let oldKeyToIdx;
        let idxInOld;
        let elmToMove;
        let before;
        while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
            if (oldStartVnode == null) {
                oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
            }
            else if (oldEndVnode == null) {
                oldEndVnode = oldCh[--oldEndIdx];
            }
            else if (newStartVnode == null) {
                newStartVnode = newCh[++newStartIdx];
            }
            else if (newEndVnode == null) {
                newEndVnode = newCh[--newEndIdx];
            }
            else if (sameVnode(oldStartVnode, newStartVnode)) {
                patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
                oldStartVnode = oldCh[++oldStartIdx];
                newStartVnode = newCh[++newStartIdx];
            }
            else if (sameVnode(oldEndVnode, newEndVnode)) {
                patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
                oldEndVnode = oldCh[--oldEndIdx];
                newEndVnode = newCh[--newEndIdx];
            }
            else if (sameVnode(oldStartVnode, newEndVnode)) {
                // Vnode moved right
                patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
                api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));
                oldStartVnode = oldCh[++oldStartIdx];
                newEndVnode = newCh[--newEndIdx];
            }
            else if (sameVnode(oldEndVnode, newStartVnode)) {
                // Vnode moved left
                patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
                api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
                oldEndVnode = oldCh[--oldEndIdx];
                newStartVnode = newCh[++newStartIdx];
            }
            else {
                if (oldKeyToIdx === undefined) {
                    oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
                }
                idxInOld = oldKeyToIdx[newStartVnode.key];
                if (isUndef(idxInOld)) {
                    // New element
                    api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
                }
                else {
                    elmToMove = oldCh[idxInOld];
                    if (elmToMove.sel !== newStartVnode.sel) {
                        api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
                    }
                    else {
                        patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
                        oldCh[idxInOld] = undefined;
                        api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
                    }
                }
                newStartVnode = newCh[++newStartIdx];
            }
        }
        if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
            if (oldStartIdx > oldEndIdx) {
                before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
                addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
            }
            else {
                removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
            }
        }
    }
    function patchVnode(oldVnode, vnode$$1, insertedVnodeQueue) {
        var _a, _b, _c, _d, _e;
        const hook = (_a = vnode$$1.data) === null || _a === void 0 ? void 0 : _a.hook;
        (_b = hook === null || hook === void 0 ? void 0 : hook.prepatch) === null || _b === void 0 ? void 0 : _b.call(hook, oldVnode, vnode$$1);
        const elm = (vnode$$1.elm = oldVnode.elm);
        const oldCh = oldVnode.children;
        const ch = vnode$$1.children;
        if (oldVnode === vnode$$1)
            return;
        if (vnode$$1.data !== undefined) {
            for (let i = 0; i < cbs.update.length; ++i)
                cbs.update[i](oldVnode, vnode$$1);
            (_d = (_c = vnode$$1.data.hook) === null || _c === void 0 ? void 0 : _c.update) === null || _d === void 0 ? void 0 : _d.call(_c, oldVnode, vnode$$1);
        }
        if (isUndef(vnode$$1.text)) {
            if (isDef(oldCh) && isDef(ch)) {
                if (oldCh !== ch)
                    updateChildren(elm, oldCh, ch, insertedVnodeQueue);
            }
            else if (isDef(ch)) {
                if (isDef(oldVnode.text))
                    api.setTextContent(elm, "");
                addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
            }
            else if (isDef(oldCh)) {
                removeVnodes(elm, oldCh, 0, oldCh.length - 1);
            }
            else if (isDef(oldVnode.text)) {
                api.setTextContent(elm, "");
            }
        }
        else if (oldVnode.text !== vnode$$1.text) {
            if (isDef(oldCh)) {
                removeVnodes(elm, oldCh, 0, oldCh.length - 1);
            }
            api.setTextContent(elm, vnode$$1.text);
        }
        (_e = hook === null || hook === void 0 ? void 0 : hook.postpatch) === null || _e === void 0 ? void 0 : _e.call(hook, oldVnode, vnode$$1);
    }
    return function patch(oldVnode, vnode$$1) {
        let i, elm, parent;
        const insertedVnodeQueue = [];
        for (i = 0; i < cbs.pre.length; ++i)
            cbs.pre[i]();
        if (!isVnode(oldVnode)) {
            oldVnode = emptyNodeAt(oldVnode);
        }
        if (sameVnode(oldVnode, vnode$$1)) {
            patchVnode(oldVnode, vnode$$1, insertedVnodeQueue);
        }
        else {
            elm = oldVnode.elm;
            parent = api.parentNode(elm);
            createElm(vnode$$1, insertedVnodeQueue);
            if (parent !== null) {
                api.insertBefore(parent, vnode$$1.elm, api.nextSibling(elm));
                removeVnodes(parent, [oldVnode], 0, 0);
            }
        }
        for (i = 0; i < insertedVnodeQueue.length; ++i) {
            insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
        }
        for (i = 0; i < cbs.post.length; ++i)
            cbs.post[i]();
        return vnode$$1;
    };
}

function addNS(data, children, sel) {
    data.ns = "http://www.w3.org/2000/svg";
    if (sel !== "foreignObject" && children !== undefined) {
        for (let i = 0; i < children.length; ++i) {
            const childData = children[i].data;
            if (childData !== undefined) {
                addNS(childData, children[i].children, children[i].sel);
            }
        }
    }
}
function h(sel, b, c) {
    let data = {};
    let children;
    let text;
    let i;
    if (c !== undefined) {
        if (b !== null) {
            data = b;
        }
        if (array(c)) {
            children = c;
        }
        else if (primitive(c)) {
            text = c;
        }
        else if (c && c.sel) {
            children = [c];
        }
    }
    else if (b !== undefined && b !== null) {
        if (array(b)) {
            children = b;
        }
        else if (primitive(b)) {
            text = b;
        }
        else if (b && b.sel) {
            children = [b];
        }
        else {
            data = b;
        }
    }
    if (children !== undefined) {
        for (i = 0; i < children.length; ++i) {
            if (primitive(children[i]))
                children[i] = vnode(undefined, undefined, undefined, children[i], undefined);
        }
    }
    if (sel[0] === "s" &&
        sel[1] === "v" &&
        sel[2] === "g" &&
        (sel.length === 3 || sel[3] === "." || sel[3] === "#")) {
        addNS(data, children, sel);
    }
    return vnode(sel, data, children, text, undefined);
}

function updateClass(oldVnode, vnode) {
    let cur;
    let name;
    const elm = vnode.elm;
    let oldClass = oldVnode.data.class;
    let klass = vnode.data.class;
    if (!oldClass && !klass)
        return;
    if (oldClass === klass)
        return;
    oldClass = oldClass || {};
    klass = klass || {};
    for (name in oldClass) {
        if (oldClass[name] && !Object.prototype.hasOwnProperty.call(klass, name)) {
            // was `true` and now not provided
            elm.classList.remove(name);
        }
    }
    for (name in klass) {
        cur = klass[name];
        if (cur !== oldClass[name]) {
            elm.classList[cur ? "add" : "remove"](name);
        }
    }
}
const classModule = { create: updateClass, update: updateClass };

function invokeHandler(handler, vnode, event) {
    if (typeof handler === "function") {
        // call function handler
        handler.call(vnode, event, vnode);
    }
    else if (typeof handler === "object") {
        // call multiple handlers
        for (let i = 0; i < handler.length; i++) {
            invokeHandler(handler[i], vnode, event);
        }
    }
}
function handleEvent(event, vnode) {
    const name = event.type;
    const on = vnode.data.on;
    // call event handler(s) if exists
    if (on && on[name]) {
        invokeHandler(on[name], vnode, event);
    }
}
function createListener() {
    return function handler(event) {
        handleEvent(event, handler.vnode);
    };
}
function updateEventListeners(oldVnode, vnode) {
    const oldOn = oldVnode.data.on;
    const oldListener = oldVnode.listener;
    const oldElm = oldVnode.elm;
    const on = vnode && vnode.data.on;
    const elm = (vnode && vnode.elm);
    let name;
    // optimization for reused immutable handlers
    if (oldOn === on) {
        return;
    }
    // remove existing listeners which no longer used
    if (oldOn && oldListener) {
        // if element changed or deleted we remove all existing listeners unconditionally
        if (!on) {
            for (name in oldOn) {
                // remove listener if element was changed or existing listeners removed
                oldElm.removeEventListener(name, oldListener, false);
            }
        }
        else {
            for (name in oldOn) {
                // remove listener if existing listener removed
                if (!on[name]) {
                    oldElm.removeEventListener(name, oldListener, false);
                }
            }
        }
    }
    // add new listeners which has not already attached
    if (on) {
        // reuse existing listener or create new
        const listener = (vnode.listener =
            oldVnode.listener || createListener());
        // update vnode for listener
        listener.vnode = vnode;
        // if element changed or added we add all needed listeners unconditionally
        if (!oldOn) {
            for (name in on) {
                // add listener if element was changed or new listeners added
                elm.addEventListener(name, listener, false);
            }
        }
        else {
            for (name in on) {
                // add listener if new listener added
                if (!oldOn[name]) {
                    elm.addEventListener(name, listener, false);
                }
            }
        }
    }
}
const eventListenersModule = {
    create: updateEventListeners,
    update: updateEventListeners,
    destroy: updateEventListeners,
};

function updateProps(oldVnode, vnode) {
    let key;
    let cur;
    let old;
    const elm = vnode.elm;
    let oldProps = oldVnode.data.props;
    let props = vnode.data.props;
    if (!oldProps && !props)
        return;
    if (oldProps === props)
        return;
    oldProps = oldProps || {};
    props = props || {};
    for (key in props) {
        cur = props[key];
        old = oldProps[key];
        if (old !== cur && (key !== "value" || elm[key] !== cur)) {
            elm[key] = cur;
        }
    }
}
const propsModule = { create: updateProps, update: updateProps };

// Bindig `requestAnimationFrame` like this fixes a bug in IE/Edge. See #360 and #409.
const raf = (typeof window !== "undefined" &&
    window.requestAnimationFrame.bind(window)) ||
    setTimeout;
const nextFrame = function (fn) {
    raf(function () {
        raf(fn);
    });
};
let reflowForced = false;
function setNextFrame(obj, prop, val) {
    nextFrame(function () {
        obj[prop] = val;
    });
}
function updateStyle(oldVnode, vnode) {
    let cur;
    let name;
    const elm = vnode.elm;
    let oldStyle = oldVnode.data.style;
    let style = vnode.data.style;
    if (!oldStyle && !style)
        return;
    if (oldStyle === style)
        return;
    oldStyle = oldStyle || {};
    style = style || {};
    const oldHasDel = "delayed" in oldStyle;
    for (name in oldStyle) {
        if (!style[name]) {
            if (name[0] === "-" && name[1] === "-") {
                elm.style.removeProperty(name);
            }
            else {
                elm.style[name] = "";
            }
        }
    }
    for (name in style) {
        cur = style[name];
        if (name === "delayed" && style.delayed) {
            for (const name2 in style.delayed) {
                cur = style.delayed[name2];
                if (!oldHasDel || cur !== oldStyle.delayed[name2]) {
                    setNextFrame(elm.style, name2, cur);
                }
            }
        }
        else if (name !== "remove" && cur !== oldStyle[name]) {
            if (name[0] === "-" && name[1] === "-") {
                elm.style.setProperty(name, cur);
            }
            else {
                elm.style[name] = cur;
            }
        }
    }
}
function applyDestroyStyle(vnode) {
    let style;
    let name;
    const elm = vnode.elm;
    const s = vnode.data.style;
    if (!s || !(style = s.destroy))
        return;
    for (name in style) {
        elm.style[name] = style[name];
    }
}
function applyRemoveStyle(vnode, rm) {
    const s = vnode.data.style;
    if (!s || !s.remove) {
        rm();
        return;
    }
    if (!reflowForced) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        vnode.elm.offsetLeft;
        reflowForced = true;
    }
    let name;
    const elm = vnode.elm;
    let i = 0;
    const style = s.remove;
    let amount = 0;
    const applied = [];
    for (name in style) {
        applied.push(name);
        elm.style[name] = style[name];
    }
    const compStyle = getComputedStyle(elm);
    const props = compStyle["transition-property"].split(", ");
    for (; i < props.length; ++i) {
        if (applied.indexOf(props[i]) !== -1)
            amount++;
    }
    elm.addEventListener("transitionend", function (ev) {
        if (ev.target === elm)
            --amount;
        if (amount === 0)
            rm();
    });
}
function forceReflow() {
    reflowForced = false;
}
const styleModule = {
    pre: forceReflow,
    create: updateStyle,
    update: updateStyle,
    destroy: applyDestroyStyle,
    remove: applyRemoveStyle,
};

/* eslint-disable @typescript-eslint/no-namespace, import/export */

// core

var patch = init([
    // Init patch function with chosen modules
    classModule,
    propsModule,
    styleModule,
    eventListenersModule,
]);
var h$1 = function (tagName, classList, children, options) {
    if (options === void 0) { options = null; }
    var normalizedClassList = classList.split(' ').map(function (c) { return c; }).join('.');
    var text;
    if (typeof options === 'string') {
        text = options;
        options = null;
    }
    var el = h("" + tagName + (normalizedClassList ? "." + normalizedClassList : ''), { props: __assign({}, (options || {})) }, text || children);
    el.data = el.data || {};
    el.data.on = el.data.on || {};
    return el;
};

var isTouchDevice = function () { return (('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0) ||
    (navigator.msMaxTouchPoints > 0)); };

var preventFocusOut = false;
var cancelPullout = false;
var variationsTimeout;
var pressingTimeout;
var pressingInterval;
var getPreventFocusOut = function () { return preventFocusOut; };
function addKeyboardKeyListener(buttonEl, config, action, key, state) {
    var cancelTouchEnd = false;
    var isTouch = isTouchDevice();
    var eventTrigger = isTouch ? 'touchstart' : 'mousedown';
    var eventPullout = isTouch ? 'touchend' : 'mouseup';
    buttonEl.data = buttonEl.data || {};
    buttonEl.data.on = buttonEl.data.on || {};
    var typedNow = function () {
        var _a, _b, _c, _d;
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
            action(ACTION_KB_TYPED, {});
            return;
        }
        else if (key.layoutShift) {
            // Layout shift key
            action(ACTION_MODE_TOGGLE, { layoutName: key.layoutShift });
            return;
        }
        else {
            state.input.value = state.input.value + '' + key.symbol;
        }
        action(ACTION_KB_TYPED, {});
    };
    var clearKbTimeouts = function () {
        variationsTimeout && clearTimeout(variationsTimeout);
        pressingTimeout && clearTimeout(pressingTimeout);
        pressingInterval && clearInterval(pressingInterval);
    };
    buttonEl.data.on[eventTrigger] = function (event) {
        event.preventDefault();
        clearKbTimeouts();
        cancelTouchEnd = false;
        if (!state.input) {
            return;
        }
        if (key.variations && key.variations.length) {
            variationsTimeout = setTimeout(function () {
                cancelTouchEnd = true;
                action(ACTION_VARIATION_TOGGLE, { key: key });
                cancelPullout = true;
                setTimeout(function () { return cancelPullout = false; }, 400);
            }, 1e3);
        }
        else {
            pressingTimeout = setTimeout(function () {
                pressingInterval = setInterval(function () { return typedNow(); }, 90);
            }, 800);
        }
    };
    buttonEl.data.on[eventPullout] = function (event) {
        event.preventDefault();
        event.stopPropagation();
        clearKbTimeouts();
        if (cancelPullout) {
            return;
        }
        setTimeout(function () {
            if (cancelTouchEnd) {
                return;
            }
            if (!state.input) {
                return;
            }
            typedNow();
        }, 200);
    };
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
        return h$1('div', 'vs-virtual-kb', []);
    }
    // Kb rows format
    var rows = state.layout.map(function (l) {
        // Row buttons format
        var buttons = l.map(function (kButton) {
            var createButton;
            var subButtonsEl = [];
            // Button render function
            var buttonEl = (createButton = function (kButton) {
                // Button with icon
                if (kButton.base64Icon) {
                    return h$1('button', 'vs-virtual-kb-row-button-with-icon', [
                        h$1('img', 'vs-virtual-kb-row-button-with-icon-icon', [], {
                            src: kButton.base64Icon,
                            alt: kButton.symbol
                        })
                    ]);
                }
                // Button variations popover
                if (state.variationShow === kButton) {
                    return h$1('button', 'vs-virtual-kb-row-button', [
                        (function () {
                            // Creates the variation popover element
                            var variationsRow = h$1('div', 'vs-virtual-kb-row-button-variations', __spreadArrays((kButton.variations || []).map(function (variation) {
                                var button = createButton(variation);
                                subButtonsEl.push({ key: variation, button: button });
                                return button;
                            })));
                            // Stop event propagation to the parent button
                            variationsRow.data.on.touchstart = function (e) { return e.stopImmediatePropagation()(variationsRow).data.on.touchend = function (e) { return e.stopImmediatePropagation(); }; };
                            // Popover extreme position adjust
                            setTimeout(function () {
                                // const width = window.innerWidth
                                // const coords = variationsRow.getBoundingClientRect()
                                // if (coords.x < 300) {
                                //   variationsRow.style.marginLeft = '200px'
                                //   return
                                // }
                                // if (width - coords.x < 300) {
                                //   variationsRow.style.marginLeft = '-200px'
                                //   return
                                // }
                            }, 200);
                            // Returns el
                            return variationsRow;
                        })(),
                        h$1('span', '', [], kButton.symbol)
                    ]);
                }
                return h$1('button', 'vs-virtual-kb-row-button', [], kButton.symbol);
            })(kButton);
            // Applies key specific class
            var hash;
            try {
                hash = btoa(kButton.symbol);
            }
            catch (err) {
                hash = encodeURIComponent(kButton.symbol);
            }
            buttonEl.sel += " vs-virtual-kb-key-" + hash.split('=').join('');
            // Adding click listeners
            addKeyboardKeyListener(buttonEl, config, action, kButton, state);
            subButtonsEl.forEach(function (b) { return addKeyboardKeyListener(b.button, config, action, b.key, state); });
            return buttonEl;
        });
        // Row buttons div
        return h$1('div', 'vs-virtual-kb-row', buttons);
    });
    // App main div
    var appDiv = h$1('div', "vs-virtual-kb " + (config.wrpClass || '') + " vs-virtual-kb-closed " + (state.input ? 'vs-virtual-kb-opened' : ''), rows);
    // No context menu
    appDiv.data.on.contextmenu = function (e) {
        e.preventDefault();
        state.input.focus();
    };
    // Variation close
    appDiv.data.on.click = function (e) {
        if (state.variationShow) {
            action(ACTION_VARIATION_TOGGLE, {});
        }
    };
    // Prevent focus out notification
    var preventFocusOutTimeout;
    appDiv.data.on.mousedown = function () {
        preventFocusOut = true;
        if (preventFocusOutTimeout) {
            clearTimeout(preventFocusOutTimeout);
        }
        preventFocusOutTimeout = setTimeout(function () { return preventFocusOut = false; }, 50);
    };
    return appDiv;
});

var VsVirtualKeyboard = function (options) {
    var keyboardEl;
    var config = __assign({}, options);
    var wrp = document.createElement('div');
    document.body.appendChild(wrp);
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
        /**
         * Updates view with vdom
         */
        patch(keyboardEl || wrp, newEl);
        keyboardEl = newEl;
        newEl.data.on.click = function (event) {
            event.preventDefault();
            if (state.input) {
                state.input.focus();
            }
        };
    };
    window.addEventListener('focusin', function (event) {
        var action = actions.get(ACTION_KB_TOGGLE);
        if (action) {
            var state = action(currentState, { input: event.target });
            render(state);
        }
    });
    /**
     * Focus-out interceptor and hide keyboard
     */
    window.addEventListener('focusout', function (e) {
        // Clicking on kb button, input focus out, returns it
        if (getPreventFocusOut()) {
            currentState.input && currentState.input.focus();
            e.preventDefault();
            return;
        }
        // // Focus out, hide keyboard
        var action = actions.get(ACTION_KB_TOGGLE);
        if (action) {
            var state = action(currentState, { input: null });
            render(state);
        }
    });
    // First render
    render(currentState);
};
window.VsVirtualKeyboard = VsVirtualKeyboard;

export default VsVirtualKeyboard;
//# sourceMappingURL=vs-virtual-keyboard.es5.js.map
