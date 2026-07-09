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

/* the in-office step tabs (Opening · Psalm · Scripture …): a horizontal-scrolling
   row, each active tab carrying its own accent underline. Matches the app. */
.cp-tabs--underline{ gap:22px; overflow-x:auto; scrollbar-width:none; }
.cp-tabs--underline::-webkit-scrollbar{ display:none; }
.cp-tabs--underline .cp-tab{
  appearance:none; background:none; border:0; cursor:pointer; white-space:nowrap;
  font-family:var(--font-ui); font-size:15px; font-weight:600;
  color:var(--text-subtle); padding:10px 0 12px;
  border-bottom:2.5px solid transparent;
  transition:color var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard);
}
.cp-tabs--underline .cp-tab:hover{ color:var(--text); }
.cp-tabs--underline .cp-tab[aria-selected="true"]{ color:var(--accent); border-bottom-color:var(--accent); }
`;

/**
 * The in-office step tabs (Opening · Psalm · Scripture …): a horizontal-scrolling
 * row of section tabs, each active one carrying its own accent underline — the
 * tabs used at the top of the office in the app.
 */
export function Tabs({ items = [], value, onChange, className, ...rest }) {
  useStyles('tabs', CSS);
  const active = value ?? items[0]?.id;
  return (
    <div role="tablist" className={cx('cp-tabs', 'cp-tabs--underline', className)} {...rest}>
      {items.map((it) => (
        <button
          key={it.id}
          role="tab"
          type="button"
          aria-selected={active === it.id}
          className="cp-tab"
          onClick={() => onChange && onChange(it.id)}
        >
          <span className="cp-tab__label">{it.label}</span>
        </button>
      ))}
    </div>
  );
}
