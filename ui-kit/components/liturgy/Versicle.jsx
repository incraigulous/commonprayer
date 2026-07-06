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
.cp-versicle{ display:grid; gap:var(--space-2); margin:var(--space-4) 0; }
.cp-versicle__line{ display:grid; grid-template-columns:6.5rem 1fr; gap:var(--space-3); align-items:baseline; }
.cp-versicle__by{
  font-family:var(--font-ui); font-size:var(--text-xs);
  letter-spacing:var(--tracking-caps); text-transform:uppercase;
  color:var(--accent); text-align:right; padding-top:.15em; user-select:none;
}
.cp-versicle__text{ font-family:var(--font-serif); font-size:var(--reading-base); line-height:1.5; color:var(--text); margin:0; }
.cp-versicle__line--response .cp-versicle__text{ font-weight:var(--weight-semibold); }
@media (max-width:32rem){
  .cp-versicle__line{ grid-template-columns:1fr; gap:0; }
  .cp-versicle__by{ text-align:left; }
}
`;

/**
 * A versicle-and-response exchange (Officiant / People).
 */
export function Versicle({ lines = [], className, ...rest }) {
  useStyles('versicle', CSS);
  return (
    <div className={cx('cp-versicle', className)} {...rest}>
      {lines.map((ln, i) => (
        <div key={i} className={cx('cp-versicle__line', ln.response && 'cp-versicle__line--response')}>
          <span className="cp-versicle__by">{ln.by}</span>
          <p className="cp-versicle__text">{ln.text}</p>
        </div>
      ))}
    </div>
  );
}
