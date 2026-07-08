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

// Deterministic PRNG so the glass pattern (and its shimmer timing) is stable.
function mulberry32(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

const CSS = `
.cp-mosaic{ display:block; width:100%; height:100%; }
.cp-mosaic polygon{ transform-box:fill-box; }
.cp-mosaic--anim polygon{
  animation-name:cp-mosaic-shimmer; animation-iteration-count:infinite;
  animation-timing-function:ease-in-out; animation-direction:alternate;
  will-change:opacity;
}
@keyframes cp-mosaic-shimmer{ from{ opacity:1; } to{ opacity:.28; } }
@media (prefers-reduced-motion: reduce){ .cp-mosaic--anim polygon{ animation:none !important; } }
`;

/**
 * Mosaic — a vector stained-glass panel: a deterministic jittered quad mesh
 * tinted from `colors` and leaded with a dark join. Optionally the panes
 * shimmer, each on its own slow, staggered cycle, like light shifting through
 * old glass. Fills its container (`width:100%; height:100%`); the caller sizes,
 * clips or masks it. Presentational.
 */
export function Mosaic({
  colors,
  seed = 9,
  cols = 10,
  rows = 8,
  width = 420,
  height = 300,
  animate = true,
  lead = 'rgba(26,18,10,.45)',
  strokeWidth = 1.2,
  className,
  ...rest
}) {
  useStyles('mosaic', CSS);
  const palette = (Array.isArray(colors) && colors.length) ? colors : ['currentColor'];
  const rand = mulberry32(seed);
  const pts = [];
  for (let r = 0; r <= rows; r++) {
    pts[r] = [];
    for (let c = 0; c <= cols; c++) {
      const jx = (c === 0 || c === cols) ? 0 : (rand() - 0.5) * (width / cols) * 0.72;
      const jy = (r === 0 || r === rows) ? 0 : (rand() - 0.5) * (height / rows) * 0.72;
      pts[r][c] = [(c * width / cols) + jx, (r * height / rows) + jy];
    }
  }
  const polys = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const q = [pts[r][c], pts[r][c + 1], pts[r + 1][c + 1], pts[r + 1][c]];
    polys.push({
      p: q.map((a) => a.join(',')).join(' '),
      fill: palette[Math.floor(rand() * palette.length)],
      delay: (rand() * 4).toFixed(2),          // 0–4s stagger
      dur: (2.8 + rand() * 2.7).toFixed(2),     // 2.8–5.5s cycle
    });
  }
  return (
    <svg
      className={cx('cp-mosaic', animate && 'cp-mosaic--anim', className)}
      viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden="true" {...rest}
    >
      {polys.map((pl, i) => (
        <polygon
          key={i} points={pl.p} fill={pl.fill}
          stroke={lead} strokeWidth={strokeWidth} strokeLinejoin="round"
          style={animate ? { animationDelay: `${pl.delay}s`, animationDuration: `${pl.dur}s` } : undefined}
        />
      ))}
    </svg>
  );
}
