import React from 'react';
import { Icon } from './Icon.jsx';
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
.cp-fab{ display:inline-flex; flex-direction:column-reverse; align-items:center; gap:12px; }
.cp-fab__main{ width:56px; height:56px; border-radius:50%; border:0; cursor:pointer;
  background:var(--accent); color:var(--text-on-accent);
  display:flex; align-items:center; justify-content:center; box-shadow:var(--shadow-lg,0 12px 30px rgba(0,0,0,.4));
  transition:transform var(--dur-base) var(--ease-standard); }
.cp-fab.is-open .cp-fab__main{ transform:rotate(45deg); }
.cp-fab__item{ width:46px; height:46px; border-radius:50%; border:0; cursor:pointer;
  background:var(--surface-raised); color:var(--text); display:flex; align-items:center; justify-content:center;
  box-shadow:var(--shadow-md);
  opacity:0; transform:translateY(14px) scale(.7); pointer-events:none;
  transition:opacity var(--dur-base) var(--ease-standard), transform var(--dur-base) var(--ease-standard); }
.cp-fab.is-open .cp-fab__item{ opacity:1; transform:translateY(0) scale(1); pointer-events:auto; }
.cp-fab.is-open .cp-fab__item:nth-child(3){ transition-delay:.02s; }
.cp-fab.is-open .cp-fab__item:nth-child(2){ transition-delay:.06s; }
.cp-fab.is-open .cp-fab__item:nth-child(1){ transition-delay:.10s; }
`;

/**
 * ActionMenu — a floating action button that expands into a short stack of
 * icon items (Share / Note / Remind). Self-managed open state; the main
 * button rotates 45° when open. Position it yourself (e.g. absolutely, inset
 * from a corner) — it's inline by default.
 */
export function ActionMenu({
  items = [],
  mainIcon = 'plus',
  mainLabel = 'Actions',
  className,
  ...rest
}) {
  useStyles('action-menu', CSS);
  const [open, setOpen] = React.useState(false);
  return (
    <div className={cx('cp-fab', open && 'is-open', className)} {...rest}>
      <button
        type="button"
        className="cp-fab__main"
        aria-label={mainLabel}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <Icon name={mainIcon} size="1.5rem" />
      </button>
      {items.map((it) => (
        <button
          key={it.label}
          type="button"
          className="cp-fab__item"
          aria-label={it.label}
          title={it.label}
          tabIndex={open ? 0 : -1}
          onClick={() => { setOpen(false); it.onClick && it.onClick(); }}
        >
          <Icon name={it.icon} size="1.15rem" />
        </button>
      ))}
    </div>
  );
}
