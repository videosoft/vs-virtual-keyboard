
export const h = (tagName: string, classList: string, children: Array<any>, options: any= null) => {
  const el = document.createElement(tagName);
  (classList || '').split(' ').forEach(cl => el.classList.add(cl));
  (children || []).forEach(c => el.appendChild(c));
  if (!options) {
    return el;
  }

  if (typeof options === 'string') {
    el.textContent = options;
    return el;
  }

  Object.keys(options).forEach(o => el.setAttribute(o, options[o]));

  return el;
}
