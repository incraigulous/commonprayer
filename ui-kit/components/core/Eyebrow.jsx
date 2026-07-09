import React from 'react';
// Self-contained style helper (inlined so each component bundles independently).
const __cpInjected = new Set();
function useStyles(id, css) {
  if (typeof document !== 'undefined' && !__cpInjected.has(id)) {
    __cpInjected.add(id);
    const el = document.createElement('style');
    el.setAttribute('data-cp', id);
    el.textContent = css;
    document.head.appendChild(el);
  }
}
function cx(...parts) { return parts.filter(Boolean).join(' '); }

const CSS = `
.cp-eyebrow{
  display:block;
  font-family:var(--font-ui); font-size:var(--text-xs);
  letter-spacing:var(--tracking-caps); text-transform:uppercase;
  color:var(--accent); margin:0 0 var(--space-2);
}
`;

/**
 * A small-caps label above a heading or card title — the manuscript's
 * rubric tag. Always the live accent color.
 */
export function Eyebrow({ children, as = 'p', className, ...rest }) {
  useStyles('eyebrow', CSS);
  const Tag = as;
  return (
    <Tag className={cx('cp-eyebrow', className)} {...rest}>
      {children}
    </Tag>
  );
}
