
import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h as html,
} from "snabbdom";

export const patch = init([
  // Init patch function with chosen modules
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  styleModule, // handles styling on elements with support for animations
  eventListenersModule, // attaches event listeners
]);

export const h = (tagName: string, classList: string, children: Array<any>, options: any= null) => {
  const normalizedClassList = classList.split(' ').map(c => c).join('.');
  let text;
  if (typeof options === 'string') {
    text = options
    options = null
  }
  const el = html(
    `${tagName}${normalizedClassList ? `.${normalizedClassList}` : ''}`,
    {props: {...(options || {})}},
    text || children
  );

  el.data = el.data || {};
  el.data.on = el.data.on || {};

  return el;
}
