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

const GLYPHS = {
  cross: '\u2720',      /* ✠ maltese cross */
  latin: '\u2020',      /* † */
  fleuron: '\u2766',    /* ❦ */
  diamond: '\u2756',    /* ❖ */
  asterism: '\u2042',   /* ⁂ */
  none: '',
};

const CSS = `
.cp-divider{ display:flex; align-items:center; gap:var(--space-4); margin:var(--space-6) 0; color:var(--gilt); }
.cp-divider__line{ flex:1; height:0; border-top:var(--border-hair) solid var(--border-strong); }
.cp-divider__glyph{ font-family:var(--font-display); font-size:1.15rem; line-height:1; color:var(--gilt); }
.cp-divider--rubric .cp-divider__glyph{ color:var(--accent); }
.cp-divider--plain .cp-divider__line{ border-top-color:var(--hairline); }
`;

/**
 * An ornamental divider — a ruled line centred on a small manuscript glyph.
 */
export function OrnamentalDivider({ glyph = 'cross', tone = 'gilt', className, ...rest }) {
  useStyles('divider', CSS);
  const mark = GLYPHS[glyph] ?? glyph;
  return (
    <div className={cx('cp-divider', tone === 'rubric' && 'cp-divider--rubric', glyph === 'none' && 'cp-divider--plain', className)} role="separator" {...rest}>
      <span className="cp-divider__line" />
      {mark && <span className="cp-divider__glyph" aria-hidden="true">{mark}</span>}
      <span className="cp-divider__line" />
    </div>
  );
}
