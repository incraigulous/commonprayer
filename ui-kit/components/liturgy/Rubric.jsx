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
.cp-rubric{
  font-family:var(--font-serif); font-style:italic;
  color:var(--accent); font-size:var(--reading-base);
  line-height:var(--leading-body); margin:0;
}
.cp-rubric--sm{ font-size:var(--reading-sm); }
.cp-rubric--center{ text-align:center; }
/* a rubric heading — small-caps, letterspaced, for red-letter section marks */
.cp-rubric--heading{
  font-family:var(--font-ui); font-style:normal;
  font-size:var(--text-xs); font-weight:var(--weight-semibold);
  letter-spacing:var(--tracking-caps); text-transform:uppercase;
}
`;

/**
 * Rubric — the traditional red-letter instruction to the worshipper.
 * Italic and rubric-red by default; `heading` for small-caps section marks.
 */
export function Rubric({ children, variant = 'default', center = false, as = 'p', className, ...rest }) {
  useStyles('rubric', CSS);
  const Tag = as;
  return (
    <Tag
      className={cx('cp-rubric', variant !== 'default' && `cp-rubric--${variant}`, center && 'cp-rubric--center', className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
