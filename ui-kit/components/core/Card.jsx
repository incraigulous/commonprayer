import React from 'react';
import { Eyebrow } from './Eyebrow.jsx';
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
.cp-card{
  background:var(--surface-raised);
  border:var(--border-hair) solid var(--border);
  border-radius:var(--radius-lg);
  padding:var(--pad-card);
  color:var(--text);
}
.cp-card--sunk{ background:var(--surface-sunk); }
.cp-card--flat{ background:transparent; }

/* illuminated: double-ruled gilt frame, the manuscript "box" */
.cp-card--illuminated{
  border-color:var(--gilt);
  box-shadow:var(--shadow-gilt-inset);
  padding:calc(var(--pad-card) + 2px);
}
.cp-card--interactive{ cursor:pointer; transition:border-color var(--dur-base) var(--ease-standard), background var(--dur-base) var(--ease-standard); }
.cp-card--interactive:hover{ border-color:var(--border-strong); background:var(--surface-hover); }

.cp-card__title{
  font-family:var(--font-display); font-weight:var(--weight-semibold);
  font-size:var(--text-xl); line-height:var(--leading-heading);
  color:var(--text); margin:0 0 var(--space-3);
}
.cp-card__body{ font-size:var(--text-base); line-height:var(--leading-body); }
.cp-card__body > :first-child{ margin-top:0; }
.cp-card__body > :last-child{ margin-bottom:0; }
`;

/**
 * A ruled parchment card. Set `variant="illuminated"` for a gilt frame.
 */
export function Card({
  children,
  variant = 'default',
  eyebrow,
  title,
  interactive = false,
  className,
  ...rest
}) {
  useStyles('card', CSS);
  return (
    <div
      className={cx('cp-card', variant !== 'default' && `cp-card--${variant}`, interactive && 'cp-card--interactive', className)}
      {...rest}
    >
      {eyebrow && <Eyebrow as="div">{eyebrow}</Eyebrow>}
      {title && <div className="cp-card__title">{title}</div>}
      {(eyebrow || title) ? <div className="cp-card__body">{children}</div> : children}
    </div>
  );
}
