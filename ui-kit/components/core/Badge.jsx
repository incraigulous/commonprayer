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
.cp-badge{
  display:inline-flex; align-items:center; gap:.4em;
  font-family:var(--font-ui); font-size:var(--text-xs); font-weight:var(--weight-semibold);
  letter-spacing:var(--tracking-caps); text-transform:uppercase;
  padding:.28em .7em; border-radius:var(--radius-pill);
  border:var(--border-hair) solid var(--border-strong); color:var(--text-muted);
  line-height:1; white-space:nowrap;
}
.cp-badge--rubric{ color:var(--accent); border-color:color-mix(in srgb, var(--accent) 45%, transparent); background:var(--accent-quiet); }
.cp-badge--gilt{ color:var(--gold-300); border-color:color-mix(in srgb, var(--gilt) 45%, transparent); background:var(--gilt-quiet); }
.cp-badge--sage{ color:var(--sage-500); border-color:color-mix(in srgb, var(--sage-500) 45%, transparent); background:color-mix(in srgb, var(--sage-500) 14%, transparent); }
.cp-badge--violet{ color:color-mix(in srgb, var(--violet-500) 130%, white); border-color:color-mix(in srgb, var(--violet-500) 50%, transparent); background:color-mix(in srgb, var(--violet-500) 18%, transparent); }
.cp-badge--solid{ color:var(--text-on-accent); background:var(--accent); border-color:var(--accent); }
`;

/**
 * A small-caps pill for seasons, propers, and lesson markers.
 */
export function Badge({ children, variant = 'default', className, ...rest }) {
  useStyles('badge', CSS);
  return (
    <span className={cx('cp-badge', variant !== 'default' && `cp-badge--${variant}`, className)} {...rest}>
      {children}
    </span>
  );
}
