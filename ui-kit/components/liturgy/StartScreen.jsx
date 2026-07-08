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
.cp-start{ position:relative; width:100%; height:100%; overflow:hidden; display:flex; }
.cp-start__bg{ position:absolute; inset:0; background-size:cover; background-position:center; transform:scale(1.05); }
.cp-start__scrim{ position:absolute; inset:0;
  background:linear-gradient(180deg, rgba(8,10,20,.14) 0%, transparent 26%, transparent 60%, rgba(8,10,20,.34) 100%); }
.cp-start__inner{ position:relative; z-index:1; flex:1; display:flex; flex-direction:column;
  align-items:center; justify-content:center; padding:28px 22px; }
.cp-start__top{ position:absolute; top:22px; left:22px; right:22px; }
.cp-start__arch{ position:relative; overflow:hidden; width:min(300px, 84%); padding:46px 30px 36px; text-align:center; color:#fff;
  background:rgba(12,16,28,.40); backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px);
  border:1px solid rgba(255,255,255,.22); border-radius:150px 150px 36px 36px;
  box-shadow:0 24px 70px rgba(0,0,0,.45); }
.cp-start__glass{ position:absolute; inset:0; z-index:0; opacity:.16; pointer-events:none; }
.cp-start__archbody{ position:relative; z-index:1; }
.cp-start__date{ font-family:var(--font-ui); font-size:12px; letter-spacing:.22em; text-transform:uppercase; opacity:.82; margin:0 0 16px; }
.cp-start__title{ font-family:var(--font-display); font-weight:600; font-size:34px; line-height:1.06; margin:0; letter-spacing:-.01em; }
.cp-start__sub{ font-family:var(--font-serif); font-style:italic; font-size:15px; opacity:.86; margin:16px 0 26px; line-height:1.4; }
.cp-start__begin{ appearance:none; border:0; cursor:pointer;
  font-family:var(--font-ui); font-weight:700; letter-spacing:.14em; text-transform:uppercase; font-size:14px;
  color:var(--cp-start-on, #fff); background:var(--cp-start-accent, var(--accent));
  padding:16px 44px; border-radius:var(--radius-pill, 999px);
  box-shadow:0 10px 30px rgba(0,0,0,.35); transition:transform .15s ease, filter .15s ease; }
.cp-start__begin:hover{ filter:brightness(1.06); transform:translateY(-1px); }
.cp-start__begin:active{ transform:translateY(0); }
`;

/**
 * StartScreen — the office entry screen: a full-bleed image behind a frosted
 * chapel-arch card carrying the date, the day's theme, the office name, and a
 * Begin button. Fills its container. Presentational — wire `onBegin` and pass
 * a background `image`; the button paints in `accent` (defaults to the live
 * `--accent`). Anything you pass as `top` (e.g. a period switcher) floats over
 * the image above the card.
 */
export function StartScreen({
  image,
  date,
  title,
  subtitle,
  buttonLabel = 'Begin',
  onBegin,
  accent = 'var(--accent)',
  textColor = '#fff',
  glassLines = true,
  top,
  children,
  className,
  style,
  ...rest
}) {
  useStyles('start-screen', CSS);
  return (
    <div className={cx('cp-start', className)} style={style} {...rest}>
      {image ? <div className="cp-start__bg" style={{ backgroundImage: `url(${image})` }} /> : null}
      <div className="cp-start__scrim" />
      <div className="cp-start__inner">
        {top ? <div className="cp-start__top">{top}</div> : null}
        <div className="cp-start__arch">
          {glassLines ? (
            <Mosaic className="cp-start__glass" colors={['transparent']} lead="rgba(255,255,255,.3)"
              animate={true} cols={4} rows={6} seed={7} />
          ) : null}
          <div className="cp-start__archbody">
            {date ? <p className="cp-start__date">{date}</p> : null}
            <h1 className="cp-start__title">{title}</h1>
            {subtitle ? <p className="cp-start__sub">{subtitle}</p> : null}
            <button
              className="cp-start__begin"
              style={{ '--cp-start-accent': accent, '--cp-start-on': textColor }}
              onClick={onBegin}
            >
              {buttonLabel}
            </button>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
