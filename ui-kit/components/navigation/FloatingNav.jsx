import React from 'react';
import { Icon } from '../core/Icon.jsx';
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
.cp-fnav{ display:flex; gap:2px; border-radius:var(--radius-pill); padding:8px 10px; }
.cp-fnav--glass{ background:rgba(14,18,32,.42); backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px); border:1px solid rgba(255,255,255,.14); }
.cp-fnav--solid{ background:var(--surface-raised); border:1px solid var(--border); box-shadow:var(--shadow-md); }
.cp-fnav button{ flex:1; appearance:none; border:0; background:transparent; cursor:pointer;
  display:flex; flex-direction:column; align-items:center; gap:4px; padding:8px 4px;
  font-family:var(--font-ui); font-size:11px; letter-spacing:.03em;
  transition:color var(--dur-fast) var(--ease-standard); }
.cp-fnav--glass button{ color:rgba(255,255,255,.66); }
.cp-fnav--glass button.is-on{ color:#fff; }
.cp-fnav--solid button{ color:var(--text-subtle); }
.cp-fnav--solid button.is-on{ color:var(--accent); }
`;

/**
 * FloatingNav — the app's floating pill tabs (Home / Office / Psalter / More):
 * a rounded bar of icon-over-label buttons. `glass` sits over full-bleed
 * imagery with light text; `solid` sits on a raised surface with the active
 * tab in the season accent. Controlled via `active` / `onChange`.
 */
export function FloatingNav({ items = [], active, onChange, variant = 'glass', className, ...rest }) {
  useStyles('floating-nav', CSS);
  return (
    <nav className={cx('cp-fnav', `cp-fnav--${variant}`, className)} {...rest}>
      {items.map((it) => (
        <button
          key={it.id}
          type="button"
          className={active === it.id ? 'is-on' : ''}
          aria-current={active === it.id ? 'page' : undefined}
          onClick={() => onChange && onChange(it.id)}
        >
          <Icon name={it.icon} size="1.35rem" />
          {it.label}
        </button>
      ))}
    </nav>
  );
}
