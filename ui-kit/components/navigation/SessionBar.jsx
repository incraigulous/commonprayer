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
.cp-sessionbar{ display:flex; align-items:center; gap:var(--space-2);
  padding:14px 16px; background:var(--bg); }
.cp-sessionbar--hairline{ border-bottom:var(--border-hair) solid var(--hairline); }
.cp-sessionbar__title{ flex:1; min-width:0; text-align:center;
  font-family:var(--font-display); font-weight:600; font-size:var(--text-lg); color:var(--text);
  margin:0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.cp-sessionbar__spacer{ flex:1; }
.cp-sessionbar__ico{ appearance:none; background:none; border:0; cursor:pointer; color:var(--text);
  display:flex; align-items:center; justify-content:center; padding:6px; border-radius:var(--radius-sm);
  transition:background var(--dur-fast) var(--ease-standard); }
.cp-sessionbar__ico:hover{ background:var(--surface-hover); }
.cp-sessionbar__ico:focus-visible{ outline:none; box-shadow:var(--focus-ring); }
/* the AA text-size glyph */
.cp-sessionbar__aa{ display:flex; align-items:baseline; gap:1px; color:var(--accent); font-family:var(--font-serif); line-height:1; }
.cp-sessionbar__aa .s{ font-size:15px; }
.cp-sessionbar__aa .l{ font-size:22px; font-weight:600; }
`;

/**
 * SessionBar — the office reading-view top bar: a back (or close) control on
 * the left and the "AA" text-size control on the right, with an optional
 * centred title. Presentational; wire `onBack` / `onTextSize`. Use `leadIcon`
 * to switch between a back chevron and a close ✕.
 */
export function SessionBar({
  title,
  leadIcon = 'chevron-left',
  onBack,
  onTextSize,
  showTextSize = true,
  hairline = true,
  backLabel = 'Back',
  className,
  ...rest
}) {
  useStyles('session-bar', CSS);
  return (
    <header className={cx('cp-sessionbar', hairline && 'cp-sessionbar--hairline', className)} {...rest}>
      <button className="cp-sessionbar__ico" aria-label={backLabel} onClick={onBack}>
        <Icon name={leadIcon} size="1.5rem" />
      </button>
      {title ? <h1 className="cp-sessionbar__title">{title}</h1> : <span className="cp-sessionbar__spacer" />}
      {showTextSize ? (
        <button className="cp-sessionbar__ico" aria-label="Text size" onClick={onTextSize}>
          <span className="cp-sessionbar__aa"><span className="s">A</span><span className="l">A</span></span>
        </button>
      ) : <span className="cp-sessionbar__ico" aria-hidden="true" style={{ visibility: 'hidden' }} />}
    </header>
  );
}
