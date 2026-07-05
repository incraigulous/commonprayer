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
.cp-btn{
  display:inline-flex; align-items:center; justify-content:center; gap:.5em;
  font-family:var(--font-ui); font-weight:var(--weight-semibold);
  letter-spacing:var(--tracking-wide); line-height:1;
  border:var(--border-hair) solid transparent; border-radius:var(--radius-md);
  cursor:pointer; text-decoration:none; white-space:nowrap;
  transition:background var(--dur-fast) var(--ease-standard),
             color var(--dur-fast) var(--ease-standard),
             border-color var(--dur-fast) var(--ease-standard),
             transform var(--dur-fast) var(--ease-standard);
  padding:var(--pad-btn-y) var(--pad-btn-x);
}
.cp-btn:focus-visible{ outline:none; box-shadow:var(--focus-ring); }
.cp-btn:active{ transform:translateY(1px); }
.cp-btn[disabled]{ opacity:.45; cursor:not-allowed; transform:none; }

/* sizes */
.cp-btn--sm{ font-size:var(--text-xs); padding:.4rem .8rem; }
.cp-btn--md{ font-size:var(--text-sm); }
.cp-btn--lg{ font-size:var(--text-base); padding:.8rem 1.6rem; }

/* primary — rubric red fill */
.cp-btn--primary{ background:var(--accent); color:var(--text-on-accent); border-color:var(--accent); }
.cp-btn--primary:hover:not([disabled]){ background:var(--accent-hover); border-color:var(--accent-hover); }
.cp-btn--primary:active:not([disabled]){ background:var(--accent-press); }

/* secondary — ruled vellum outline */
.cp-btn--secondary{ background:transparent; color:var(--text); border-color:var(--border-strong); }
.cp-btn--secondary:hover:not([disabled]){ border-color:var(--text); background:color-mix(in srgb, var(--text) 6%, transparent); }

/* ghost — quiet text */
.cp-btn--ghost{ background:transparent; color:var(--text-muted); border-color:transparent; letter-spacing:var(--tracking-normal); }
.cp-btn--ghost:hover:not([disabled]){ color:var(--text); background:var(--surface-hover); }

/* gilt — illuminated, for singular sacred actions ("Amen") */
.cp-btn--gilt{ background:transparent; color:var(--gilt); border-color:var(--gilt); font-family:var(--font-display); font-size:1.05em; letter-spacing:var(--tracking-caps); text-transform:uppercase; }
.cp-btn--gilt:hover:not([disabled]){ background:var(--gilt-quiet); color:var(--gold-300); }

.cp-btn--block{ display:flex; width:100%; }
`;

/**
 * Common Prayer button.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  block = false,
  as,
  className,
  ...rest
}) {
  useStyles('button', CSS);
  const Tag = as || (rest.href ? 'a' : 'button');
  return (
    <Tag
      className={cx('cp-btn', `cp-btn--${variant}`, `cp-btn--${size}`, block && 'cp-btn--block', className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
