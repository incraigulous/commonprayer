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
.cp-scripture{
  position:relative; margin:var(--space-5) 0;
  padding:var(--space-4) var(--space-5);
  border-left:var(--border-rule) solid var(--accent);
  background:var(--surface-sunk); border-radius:0 var(--radius-md) var(--radius-md) 0;
}
.cp-scripture--illuminated{
  border:var(--border-hair) solid var(--gilt); border-left-width:var(--border-rule);
  border-radius:var(--radius-md); box-shadow:var(--shadow-gilt-inset);
}
.cp-scripture__text{
  font-family:var(--font-serif); font-size:var(--text-lg);
  line-height:1.6; color:var(--text); margin:0;
}
.cp-scripture__text p{ margin:0 0 var(--space-3); }
.cp-scripture__text p:last-child{ margin-bottom:0; }
.cp-scripture__foot{
  display:flex; align-items:center; justify-content:space-between; gap:var(--space-3);
  margin-top:var(--space-3);
}
.cp-scripture__cite{
  font-family:var(--font-ui); font-size:var(--text-xs);
  letter-spacing:var(--tracking-caps); text-transform:uppercase;
  color:var(--text-muted);
}
.cp-scripture__mark{ font-family:var(--font-display); color:var(--gilt); font-size:1.25rem; line-height:1; }
.cp-scripture--illuminated .cp-scripture__mark{ color:var(--gilt); }
`;

/**
 * A scripture reading block — verse text with a citation and a gilt mark.
 */
export function Scripture({
  children,
  cite,
  variant = 'quiet',
  mark = true,
  className,
  ...rest
}) {
  useStyles('scripture', CSS);
  return (
    <figure className={cx('cp-scripture', variant === 'illuminated' && 'cp-scripture--illuminated', className)} {...rest}>
      <blockquote className="cp-scripture__text">{children}</blockquote>
      {(cite || mark) && (
        <figcaption className="cp-scripture__foot">
          {cite ? <cite className="cp-scripture__cite">{cite}</cite> : <span />}
          {mark && <span className="cp-scripture__mark" aria-hidden="true">{'\u271F'}</span>}
        </figcaption>
      )}
    </figure>
  );
}
