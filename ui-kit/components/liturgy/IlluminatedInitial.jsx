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
.cp-initial{ font-size:var(--reading-base); }
.cp-initial__cap{
  font-family:var(--font-initial); font-weight:var(--weight-regular); /* Goudy Initialen ships Regular only — bold synthesizes & breaks glyphs */
  float:left; line-height:.72; color:var(--gilt);
  margin:.04em .12em 0 0; padding:0;
  font-size:3.8em;
}
.cp-initial--rubric .cp-initial__cap{ color:var(--accent); }
.cp-initial--ink .cp-initial__cap{ color:var(--text); }
.cp-initial__body{ margin:0; }
.cp-initial__body::after{ content:""; display:block; clear:both; }
`;

/**
 * An illuminated initial (drop-cap) opening a prayer or reading — the gilt
 * letter alone, set large and floated into the text.
 */
export function IlluminatedInitial({
  letter,
  children,
  variant = 'gilt',
  className,
  ...rest
}) {
  useStyles('initial', CSS);
  return (
    <p
      className={cx('cp-initial', `cp-initial--${variant}`, className)}
      {...rest}
    >
      <span className="cp-initial__cap" aria-hidden="false">{letter}</span>
      <span className="cp-initial__body">{children}</span>
    </p>
  );
}
