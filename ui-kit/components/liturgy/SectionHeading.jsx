import React from 'react';
import { Eyebrow } from '../core/Eyebrow.jsx';
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
.cp-heading{ margin:0 0 var(--space-4); }
.cp-heading__title{
  font-family:var(--font-display); font-weight:var(--weight-semibold);
  line-height:var(--leading-heading); letter-spacing:-.01em; color:var(--text); margin:0;
}
.cp-heading__rule{
  display:block; width:2.5rem; height:var(--border-rule);
  background:var(--accent); border:0; margin:var(--space-3) 0 0;
}
.cp-heading--center{ text-align:center; }
.cp-heading--center .cp-heading__rule{ margin-inline:auto; }

.cp-heading--display .cp-heading__title{ font-size:var(--text-3xl); }
.cp-heading--office .cp-heading__title{ font-size:var(--text-2xl); }
.cp-heading--section .cp-heading__title{ font-size:var(--text-xl); }
`;

/**
 * A section heading in the display serif with an optional rubric rule.
 */
export function SectionHeading({
  children,
  eyebrow,
  level = 'section',
  rule = false,
  center = false,
  as = 'h2',
  className,
  ...rest
}) {
  useStyles('heading', CSS);
  const Tag = as;
  return (
    <header className={cx('cp-heading', `cp-heading--${level}`, center && 'cp-heading--center', className)} {...rest}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Tag className="cp-heading__title">{children}</Tag>
      {rule && <span className="cp-heading__rule" aria-hidden="true" />}
    </header>
  );
}
