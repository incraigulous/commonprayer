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
.cp-tabs{ display:flex; }

/* underline (horizontal text tabs) */
.cp-tabs--underline{ gap:var(--space-5); border-bottom:var(--border-hair) solid var(--border); }
.cp-tabs--underline .cp-tab{
  appearance:none; background:none; border:0; cursor:pointer;
  font-family:var(--font-display); font-size:var(--text-lg);
  color:var(--text-muted); padding:0 0 var(--space-3);
  border-bottom:var(--border-rule) solid transparent; margin-bottom:-1px;
  transition:color var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard);
}
.cp-tabs--underline .cp-tab:hover{ color:var(--text); }
.cp-tabs--underline .cp-tab[aria-selected="true"]{ color:var(--text); border-bottom-color:var(--accent); }

/* bar (bottom navigation, icon over label) — filled with the seasonal accent */
.cp-tabs--bar{
  justify-content:space-around; align-items:stretch;
  background:var(--accent); border-top:var(--border-hair) solid var(--accent-press);
}
.cp-tabs--bar .cp-tab{
  appearance:none; background:none; border:0; cursor:pointer;
  flex:1; display:flex; flex-direction:column; align-items:center; gap:.35rem;
  padding:var(--space-3) var(--space-2) calc(var(--space-3) - 2px);
  color:color-mix(in srgb, var(--text-on-accent) 68%, transparent); position:relative;
  border-top:2px solid transparent; margin-top:-1px;
  transition:color var(--dur-fast) var(--ease-standard);
}
.cp-tabs--bar .cp-tab__icon{ font-size:1.35rem; line-height:1; display:flex; }
.cp-tabs--bar .cp-tab__label{
  font-family:var(--font-ui); font-size:var(--text-xs);
  letter-spacing:var(--tracking-wide);
}
.cp-tabs--bar .cp-tab:hover{ color:var(--text-on-accent); }
.cp-tabs--bar .cp-tab[aria-selected="true"]{ color:var(--text-on-accent); border-top-color:var(--text-on-accent); }
.cp-tabs--bar .cp-tab[aria-selected="true"] .cp-tab__icon{ color:var(--text-on-accent); }
`;

/**
 * Segmented tabs. `underline` for in-page section switching, `bar` for the
 * bottom office navigation (Morning / Noon / Evening / More).
 */
export function Tabs({ items = [], value, onChange, variant = 'underline', className, ...rest }) {
  useStyles('tabs', CSS);
  const active = value ?? items[0]?.id;
  return (
    <div role="tablist" className={cx('cp-tabs', `cp-tabs--${variant}`, className)} {...rest}>
      {items.map((it) => (
        <button
          key={it.id}
          role="tab"
          type="button"
          aria-selected={active === it.id}
          className="cp-tab"
          onClick={() => onChange && onChange(it.id)}
        >
          {variant === 'bar' && it.icon != null && <span className="cp-tab__icon">{it.icon}</span>}
          <span className="cp-tab__label">{it.label}</span>
        </button>
      ))}
    </div>
  );
}
