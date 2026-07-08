import React from 'react';
import { Mosaic } from './Mosaic.jsx';
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
.cp-splash{ position:relative; width:100%; height:100%; overflow:hidden;
  display:flex; flex-direction:column; align-items:center; justify-content:center; gap:22px;
  background:var(--cp-splash-bg, #ffffff); color:var(--cp-splash-fg, var(--gilt)); }
.cp-splash__wash{ position:absolute; inset:-20%; z-index:0; pointer-events:none;
  background:radial-gradient(60% 50% at 50% 42%, color-mix(in srgb, var(--cp-splash-fg) 16%, transparent) 0%, transparent 70%);
  animation:cp-splash-wash 7s ease-in-out infinite; }
@keyframes cp-splash-wash{ 0%,100%{ opacity:.5; transform:scale(1) translateY(0); } 50%{ opacity:1; transform:scale(1.12) translateY(-2%); } }
@media (prefers-reduced-motion: reduce){ .cp-splash__wash{ animation:none !important; } }
.cp-splash__glass{ position:absolute; inset:0; z-index:0; opacity:.14; pointer-events:none; }
.cp-splash__mark, .cp-splash__rule, .cp-splash__word, .cp-splash__sub{ position:relative; z-index:1; }
.cp-splash__mark{ font-family:var(--font-display); font-size:46px; line-height:1;
  animation:cp-splash-glow 2.6s ease-in-out infinite; }
.cp-splash__rule{ width:44px; height:1px; background:currentColor; opacity:.4; }
.cp-splash__word{ font-family:var(--font-display); font-weight:600; font-size:34px; line-height:1;
  letter-spacing:.01em; margin:0; color:var(--cp-splash-word, var(--text)); }
.cp-splash__sub{ font-family:var(--font-ui); font-size:12px; letter-spacing:.28em; text-transform:uppercase;
  opacity:.62; margin:0; padding-left:.28em; }
.cp-splash--enter .cp-splash__mark,
.cp-splash--enter .cp-splash__rule,
.cp-splash--enter .cp-splash__word,
.cp-splash--enter .cp-splash__sub{ animation:cp-splash-rise .7s var(--ease-standard, ease) both; }
.cp-splash--enter .cp-splash__rule{ animation-delay:.08s; }
.cp-splash--enter .cp-splash__word{ animation-delay:.14s; }
.cp-splash--enter .cp-splash__sub{ animation-delay:.24s; }
@keyframes cp-splash-glow{ 0%,100%{ opacity:.55; transform:translateY(0); } 50%{ opacity:1; transform:translateY(-2px); } }
@keyframes cp-splash-rise{ from{ opacity:0; transform:translateY(10px); } to{ opacity:1; transform:translateY(0); } }
@media (prefers-reduced-motion: reduce){
  .cp-splash__mark{ animation:none !important; }
  .cp-splash--enter :is(.cp-splash__mark,.cp-splash__rule,.cp-splash__word,.cp-splash__sub){ animation:none !important; }
}
`;

/**
 * SplashScreen — the app-open lockup: a gilt cross, thin rule, the wordmark and
 * a small-caps byline on a deep ground. Fills its container. Presentational;
 * the host fades it out once the app has mounted. `enter` plays a one-shot
 * rise-in; the cross gently glows on a loop.
 */
export function SplashScreen({
  word = 'Prayer Book',
  subtitle = 'by Via Media',
  glyph = '\u271D',
  background = '#ffffff',
  gilt = 'var(--gilt)',
  wordColor = 'var(--ink, #14100a)',
  lead = 'rgba(26,18,10,.5)',
  enter = true,
  className,
  style,
  ...rest
}) {
  useStyles('splash', CSS);
  return (
    <div
      className={cx('cp-splash', enter && 'cp-splash--enter', className)}
      style={{ '--cp-splash-bg': background, '--cp-splash-fg': gilt, '--cp-splash-word': wordColor, ...style }}
      {...rest}
    >
      <Mosaic className="cp-splash__glass" colors={['transparent']} lead={lead} strokeWidth={0.75}
        animate={true} cols={14} rows={24} seed={11} width={420} height={720} />
      <div className="cp-splash__wash" />
      <div className="cp-splash__mark">{glyph}</div>
      <div className="cp-splash__rule" />
      <h1 className="cp-splash__word">{word}</h1>
      <p className="cp-splash__sub">{subtitle}</p>
    </div>
  );
}
