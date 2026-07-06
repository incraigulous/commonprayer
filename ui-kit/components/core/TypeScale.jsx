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

const STEPS = [
  { id: 'sm', label: 'Small' },
  { id: 'md', label: 'Regular' },
  { id: 'lg', label: 'Large' },
  { id: 'xl', label: 'Extra large' },
];

/** Recommended --reading-scale for each step. */
export const READING_SCALES = { sm: 0.9, md: 1, lg: 1.15, xl: 1.3 };

const CSS = `
.cp-typescale{
  display:inline-flex; align-items:stretch;
  border:var(--border-hair) solid var(--border-strong);
  border-radius:var(--radius-pill); overflow:hidden; background:var(--surface);
}
.cp-typescale__step{
  appearance:none; background:transparent; border:0; cursor:pointer;
  font-family:var(--font-serif); color:var(--text-muted); line-height:1;
  display:flex; align-items:flex-end; justify-content:center;
  padding:.5rem .85rem; min-width:2.6rem;
  transition:color var(--dur-fast) var(--ease-standard), background var(--dur-fast) var(--ease-standard);
}
.cp-typescale__step + .cp-typescale__step{ border-left:var(--border-hair) solid var(--border); }
.cp-typescale__step:hover{ color:var(--text); }
.cp-typescale__step[aria-pressed="true"]{ background:var(--accent); color:var(--text-on-accent); }
.cp-typescale__step--sm{ font-size:.9rem; }
.cp-typescale__step--md{ font-size:1.1rem; }
.cp-typescale__step--lg{ font-size:1.35rem; }
.cp-typescale__step--xl{ font-size:1.7rem; }
`;

/**
 * Reading-size control — four "A" glyphs (Small · Regular · Large · Extra
 * large) for scaling the prayed/read text. Presentational: pair `value` with
 * the READING_SCALES map and set `--reading-scale` on a root.
 */
export function TypeScale({ value = 'md', onChange, className, ...rest }) {
  useStyles('typescale', CSS);
  return (
    <div role="group" aria-label="Reading text size" className={cx('cp-typescale', className)} {...rest}>
      {STEPS.map((s) => (
        <button
          key={s.id}
          type="button"
          aria-pressed={value === s.id}
          aria-label={s.label}
          title={s.label}
          className={cx('cp-typescale__step', `cp-typescale__step--${s.id}`)}
          onClick={() => onChange && onChange(s.id)}
        >A</button>
      ))}
    </div>
  );
}
