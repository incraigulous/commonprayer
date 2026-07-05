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
.cp-icon{ display:inline-flex; align-items:center; justify-content:center; color:currentColor; vertical-align:middle; }
.cp-icon svg{ width:1em; height:1em; display:block; }
`;

const LUCIDE_SRC = 'https://unpkg.com/lucide@0.469.0/dist/umd/lucide.min.js';
let loading = null;

function ensureLucide() {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.lucide) return Promise.resolve();
  if (loading) return loading;
  loading = new Promise((resolve) => {
    const s = document.createElement('script');
    s.src = LUCIDE_SRC;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => resolve();
    document.head.appendChild(s);
  });
  return loading;
}

/**
 * A line-art icon (Lucide). Sized in `em` so it inherits font-size & color.
 * NOTE: Lucide substitutes for an unknown production icon set — see readme.
 */
export function Icon({ name, size = '1.25rem', strokeWidth = 1.75, className, style, ...rest }) {
  useStyles('icon', CSS);
  const ref = React.useRef(null);

  React.useEffect(() => {
    let cancelled = false;
    ensureLucide().then(() => {
      if (cancelled || !ref.current || !window.lucide) return;
      const dom = window.lucide.icons?.[toPascal(name)];
      // Prefer direct SVG creation when available for crisp control.
      ref.current.innerHTML = '';
      const el = document.createElement('i');
      el.setAttribute('data-lucide', name);
      ref.current.appendChild(el);
      try {
        window.lucide.createIcons({
          attrs: { 'stroke-width': strokeWidth, width: '100%', height: '100%' },
          nameAttr: 'data-lucide',
        });
      } catch (e) { /* noop */ }
    });
    return () => { cancelled = true; };
  }, [name, strokeWidth]);

  return (
    <span
      ref={ref}
      className={cx('cp-icon', className)}
      style={{ width: size, height: size, fontSize: size, ...style }}
      role="img"
      aria-label={rest['aria-label'] || name}
      {...rest}
    />
  );
}

function toPascal(n) {
  return String(n || '').split(/[-_]/).map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join('');
}
