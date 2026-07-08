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
.cp-masthead{
  position:relative; min-height:100%; box-sizing:border-box;
  display:flex; flex-direction:column; text-align:center; overflow:hidden;
  background:var(--accent); color:var(--text-on-accent);
}
.cp-masthead__body{
  flex:1; display:flex; flex-direction:column; justify-content:center;
  padding:40px 26px 48px; position:relative; z-index:1;
}
.cp-masthead__date{
  font-family:var(--font-ui); font-size:12px; font-weight:600;
  letter-spacing:.22em; text-transform:uppercase; opacity:.82; margin:0 0 16px;
}
.cp-masthead__title{
  font-family:var(--font-display); font-weight:600; font-size:46px; line-height:1.06;
  letter-spacing:-.015em; margin:0;
}
.cp-masthead__tradition{
  font-family:var(--font-ui); font-size:12px; font-weight:600;
  letter-spacing:.2em; text-transform:uppercase; opacity:.72; margin:10px 0 0;
}
.cp-masthead__opening{
  font-family:var(--font-serif); font-style:italic; font-size:22px; line-height:1.4;
  margin:24px 0 0; text-wrap:balance;
}
.cp-masthead__opening span{ display:block; }
.cp-masthead__opening span + span{ opacity:.82; }
.cp-masthead__readings{
  font-family:var(--font-ui); font-size:12px; font-weight:600; letter-spacing:.14em;
  text-transform:uppercase; opacity:.72; margin:22px 0 0;
}
/* the glass band, anchored at the foot, fading up under the text */
.cp-masthead__glass{
  position:absolute; left:0; right:0; bottom:0;
  width:100%; height:46%; min-height:200px; z-index:0;
  -webkit-mask-image:linear-gradient(180deg, transparent 0%, rgba(0,0,0,.35) 40%, rgba(0,0,0,.8) 66%, #000 100%);
  mask-image:linear-gradient(180deg, transparent 0%, rgba(0,0,0,.35) 40%, rgba(0,0,0,.8) 66%, #000 100%);
}
`;

/**
 * Masthead — the full-bleed opening of a daily office: a solid colour-of-the-day
 * block carrying the date, the office name (the centred page heading) and the
 * appointed readings, with a shimmering vector stained-glass {@link Mosaic}
 * fading up from its foot. Fills its container's height, so the reading content
 * scrolls up from beneath it.
 *
 * Presentational. `fill` / `textColor` default to the live `--accent` /
 * `--text-on-accent`, so it follows the season automatically; pass explicit
 * values (and a matching `colors` palette) to pin a colour.
 */
export function Masthead({
  office,
  tradition,
  date,
  readings,
  opening,
  fill = 'var(--accent)',
  textColor = 'var(--text-on-accent)',
  colors,
  seed = 9,
  animateGlass = true,
  children,
  className,
  style,
  ...rest
}) {
  useStyles('masthead', CSS);
  const list = Array.isArray(readings) ? readings.filter(Boolean) : [];
  const lines = Array.isArray(opening) ? opening.filter(Boolean) : (opening ? [opening] : []);
  const glass = Array.isArray(colors) && colors.length ? colors : null;
  return (
    <header
      className={cx('cp-masthead', className)}
      style={{ background: fill, color: textColor, ...style }}
      {...rest}
    >
      <div className="cp-masthead__body">
        {date ? <p className="cp-masthead__date">{date}</p> : null}
        <h1 className="cp-masthead__title">{office}</h1>
        {tradition ? <p className="cp-masthead__tradition">{tradition}</p> : null}
        {lines.length ? (
          <p className="cp-masthead__opening">{lines.map((l, i) => <span key={i}>{l}</span>)}</p>
        ) : null}
        {list.length ? (
          <p className="cp-masthead__readings">Readings · {list.join(' · ')}</p>
        ) : null}
        {children}
      </div>
      {glass ? (
        <div className="cp-masthead__glass">
          <Mosaic colors={glass} seed={seed} animate={animateGlass} />
        </div>
      ) : null}
    </header>
  );
}
