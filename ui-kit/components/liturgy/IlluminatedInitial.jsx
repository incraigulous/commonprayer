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
  font-size:3.4em;
}
.cp-initial--rubric .cp-initial__cap{ color:var(--accent); }
.cp-initial--ink .cp-initial__cap{ color:var(--text); }

/* boxed: an illuminated frame around the initial, in the manuscript manner */
.cp-initial--boxed .cp-initial__cap{
  float:left; display:flex; align-items:center; justify-content:center;
  width:1.5em; height:1.5em; margin:.08em .35em .1em 0; padding:0;
  font-size:2.5em; line-height:1;
  border:var(--border-frame) solid var(--gilt); border-radius:var(--radius-sm);
  box-shadow:var(--shadow-gilt-inset);
  background:var(--gilt-quiet);
}
.cp-initial--boxed.cp-initial--rubric .cp-initial__cap{
  border-color:var(--accent); background:var(--accent-quiet); color:var(--accent);
}
.cp-initial__body{ margin:0; }
.cp-initial__body::after{ content:""; display:block; clear:both; }
`;

/**
 * An illuminated initial (drop-cap) opening a prayer or reading.
 */
export function IlluminatedInitial({
  letter,
  children,
  variant = 'gilt',
  boxed = false,
  className,
  ...rest
}) {
  useStyles('initial', CSS);
  return (
    <p
      className={cx('cp-initial', `cp-initial--${variant}`, boxed && 'cp-initial--boxed', className)}
      {...rest}
    >
      <span className="cp-initial__cap" aria-hidden="false">{letter}</span>
      <span className="cp-initial__body">{children}</span>
    </p>
  );
}
