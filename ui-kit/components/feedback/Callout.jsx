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
.cp-callout{
  border:var(--border-hair) solid var(--border);
  border-radius:var(--radius-lg);
  padding:var(--space-4) var(--space-5);
  background:var(--surface-raised);
}
.cp-callout__head{
  display:flex; align-items:center; gap:.5em; margin:0 0 var(--space-2);
  font-family:var(--font-ui); font-size:var(--text-xs);
  letter-spacing:var(--tracking-caps); text-transform:uppercase;
  color:var(--text-muted);
}
.cp-callout__glyph{ font-family:var(--font-display); font-size:1.1em; line-height:1; }
.cp-callout__body{ font-family:var(--font-serif); font-size:var(--text-base); line-height:var(--leading-body); color:var(--text); }
.cp-callout__body > :first-child{ margin-top:0; }
.cp-callout__body > :last-child{ margin-bottom:0; }

/* note — quiet ruled aside */
.cp-callout--note{}

/* prayer — gilt illuminated frame */
.cp-callout--prayer{ border-color:var(--gilt); box-shadow:var(--shadow-gilt-inset); }
.cp-callout--prayer .cp-callout__head{ color:var(--gold-300); }
.cp-callout--prayer .cp-callout__glyph{ color:var(--gilt); }

/* blessing — gilt on faint wash, centred, the closing grace */
.cp-callout--blessing{ border-color:var(--gilt); background:var(--gilt-quiet); text-align:center; }
.cp-callout--blessing .cp-callout__head{ color:var(--gold-300); justify-content:center; }
.cp-callout--blessing .cp-callout__body{ font-style:italic; }

/* refrain — rubric left-rule antiphon */
.cp-callout--refrain{ border:0; border-left:var(--border-rule) solid var(--accent); border-radius:0; background:transparent; padding-left:var(--space-4); }
.cp-callout--refrain .cp-callout__head{ color:var(--accent); }
`;

const GLYPHS = { prayer: '\u271F', blessing: '\u2720', note: '\u2735', refrain: '\u2767' };

/**
 * A callout aside — a note, prayer, blessing, or refrain set apart from the
 * flowing office text.
 */
export function Callout({
  children,
  variant = 'note',
  title,
  glyph,
  className,
  ...rest
}) {
  useStyles('callout', CSS);
  const mark = glyph ?? GLYPHS[variant];
  return (
    <aside className={cx('cp-callout', `cp-callout--${variant}`, className)} {...rest}>
      {title && (
        <p className="cp-callout__head">
          {mark && <span className="cp-callout__glyph" aria-hidden="true">{mark}</span>}
          {title}
        </p>
      )}
      <div className="cp-callout__body">{children}</div>
    </aside>
  );
}
