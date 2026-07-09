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

/** Theme modes offered by the menu. */
export const THEME_MODES = [
  { id: 'system', label: 'System' },
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
];

/** Automatic colour modes — resolve to a season at render time in the host. */
export const COLOR_AUTO = [
  { id: 'seasonal', label: 'Seasonal' },   // follows the liturgical calendar
  { id: 'time', label: 'Time of Day' },    // follows the clock
];

/** Explicit liturgical seasons, in calendar order. */
export const COLOR_SEASONS = [
  { id: 'advent', label: 'Advent' },
  { id: 'christmas', label: 'Christmas' },
  { id: 'epiphany', label: 'Epiphany' },
  { id: 'lent', label: 'Lent' },
  { id: 'easter', label: 'Easter' },
  { id: 'pentecost', label: 'Pentecost' },
  { id: 'ordinary', label: 'Ordinary Time' },
];

/** Reading-size steps. */
export const SIZE_STEPS = [
  { id: 'sm', label: 'Small' },
  { id: 'md', label: 'Regular' },
  { id: 'lg', label: 'Large' },
  { id: 'xl', label: 'Extra large' },
];

/** Recommended --reading-scale for each size step (mirrors TypeScale). */
export const DISPLAY_READING_SCALES = { sm: 0.9, md: 1, lg: 1.15, xl: 1.3 };

/**
 * The four daily offices, in order, each with its proper name and the season
 * colour the "Time of Day" mode paints it in. The devotional day runs
 * dawn → day → dusk → night:
 *   Morning Prayer  → Easter    (gold — resurrection light)
 *   Noonday Prayer  → Ordinary  (green — the working day)
 *   Evening Prayer  → Pentecost (red — "at evening you hung upon the cross")
 *   Compline        → Lent      (violet — night watch & examen)
 */
export const OFFICE_PERIODS = [
  { id: 'morning', label: 'Morning', office: 'Morning Prayer', season: 'easter',    from: 4 },
  { id: 'noonday', label: 'Noon',    office: 'Noonday Prayer', season: 'ordinary',  from: 11 },
  { id: 'evening', label: 'Evening', office: 'Evening Prayer', season: 'pentecost', from: 16 },
  { id: 'compline', label: 'Night',  office: 'Compline',       season: 'lent',      from: 20 },
];

/** The office appointed for a given clock time. */
export function timeOfDayOffice(date = new Date()) {
  const h = date.getHours();
  // walk the periods; the last whose `from` we've passed wins (wraps past midnight to Compline)
  let cur = OFFICE_PERIODS[OFFICE_PERIODS.length - 1];
  for (const p of OFFICE_PERIODS) { if (h >= p.from) cur = p; }
  return cur;
}

/**
 * Common Prayer mapping from time of day → season colour, for the "Time of
 * Day" auto mode. Delegates to {@link timeOfDayOffice}.
 */
export function timeOfDaySeason(date = new Date()) {
  return timeOfDayOffice(date).season;
}

const CSS = `
.cp-display{
  width:300px; box-sizing:border-box;
  background:var(--accent); color:var(--text-on-accent);
  border-radius:var(--radius-lg); box-shadow:var(--shadow-lg);
  padding:20px;
  --dm-line:color-mix(in srgb, var(--text-on-accent) 34%, transparent);
  --dm-fill:color-mix(in srgb, var(--text-on-accent) 20%, transparent);
  --dm-dim:color-mix(in srgb, var(--text-on-accent) 74%, transparent);
}
.cp-display__section + .cp-display__section{ margin-top:20px; }
.cp-display__label{
  font-family:var(--font-ui); font-size:12px; font-weight:600;
  letter-spacing:.16em; text-transform:uppercase; color:var(--dm-dim); margin:0 0 12px;
}

/* segmented control (theme + size) */
.cp-display__seg{
  display:flex; border:var(--border-hair) solid var(--dm-line);
  border-radius:var(--radius-pill); overflow:hidden;
}
.cp-display__seg button{
  flex:1; appearance:none; background:transparent; border:0; cursor:pointer;
  font-family:var(--font-ui); font-size:15px; color:var(--dm-dim); padding:11px 8px;
  transition:background var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard);
}
.cp-display__seg button + button{ border-left:var(--border-hair) solid var(--dm-line); }
.cp-display__seg button:hover{ color:var(--text-on-accent); }
.cp-display__seg button[aria-pressed="true"]{ background:var(--dm-fill); color:var(--text-on-accent); font-weight:700; }

/* colour pills */
.cp-display__pills{ display:flex; flex-wrap:wrap; gap:10px; }
.cp-display__pill{
  appearance:none; cursor:pointer; font-family:var(--font-ui); font-size:15px;
  color:var(--dm-dim); background:transparent;
  border:var(--border-hair) solid var(--dm-line); border-radius:var(--radius-pill);
  padding:9px 16px;
  transition:background var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard);
}
.cp-display__pill:hover{ color:var(--text-on-accent); border-color:color-mix(in srgb, var(--text-on-accent) 55%, transparent); }
.cp-display__pill[aria-pressed="true"]{ background:var(--dm-fill); color:var(--text-on-accent); font-weight:700; border-color:transparent; }
.cp-display__hint{
  font-family:var(--font-serif); font-style:italic; font-size:13px;
  color:var(--dm-dim); margin:12px 0 0;
}

/* reading-size glyphs */
.cp-display__sizes{
  display:flex; border:var(--border-hair) solid var(--dm-line);
  border-radius:var(--radius-pill); overflow:hidden;
}
.cp-display__size{
  flex:1; appearance:none; background:transparent; border:0; cursor:pointer;
  font-family:var(--font-serif); color:var(--dm-dim); line-height:1;
  display:flex; align-items:flex-end; justify-content:center; padding:.6rem .3rem;
  transition:background var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard);
}
.cp-display__size + .cp-display__size{ border-left:var(--border-hair) solid var(--dm-line); }
.cp-display__size:hover{ color:var(--text-on-accent); }
.cp-display__size[aria-pressed="true"]{ background:var(--dm-fill); color:var(--text-on-accent); }
.cp-display__size--sm{ font-size:.9rem; }
.cp-display__size--md{ font-size:1.1rem; }
.cp-display__size--lg{ font-size:1.35rem; }
.cp-display__size--xl{ font-size:1.7rem; }
`;

/**
 * DisplayMenu — the reading-display settings panel: Theme (System / Light /
 * Dark), Colour (Seasonal & Time-of-Day auto modes plus every liturgical
 * season) and Text size. Presentational and controlled; the panel paints in
 * the current `--accent`, so it previews the chosen colour. Drop it inside a
 * popover/menu of your own.
 */
export function DisplayMenu({
  theme = 'system',
  onThemeChange,
  color = 'seasonal',
  onColorChange,
  size = 'md',
  onSizeChange,
  colorHint,
  className,
  ...rest
}) {
  useStyles('display-menu', CSS);
  const colorOptions = [...COLOR_AUTO, ...COLOR_SEASONS];
  return (
    <div className={cx('cp-display', className)} role="group" aria-label="Display settings" {...rest}>
      <section className="cp-display__section">
        <p className="cp-display__label">Theme</p>
        <div className="cp-display__seg" role="group" aria-label="Theme">
          {THEME_MODES.map((t) => (
            <button
              key={t.id} type="button"
              aria-pressed={theme === t.id}
              onClick={() => onThemeChange && onThemeChange(t.id)}
            >{t.label}</button>
          ))}
        </div>
      </section>

      <section className="cp-display__section">
        <p className="cp-display__label">Color</p>
        <div className="cp-display__pills" role="group" aria-label="Color">
          {colorOptions.map((c) => (
            <button
              key={c.id} type="button"
              className="cp-display__pill"
              aria-pressed={color === c.id}
              onClick={() => onColorChange && onColorChange(c.id)}
            >{c.label}</button>
          ))}
        </div>
        {colorHint ? <p className="cp-display__hint">{colorHint}</p> : null}
      </section>

      <section className="cp-display__section">
        <p className="cp-display__label">Text size</p>
        <div className="cp-display__sizes" role="group" aria-label="Text size">
          {SIZE_STEPS.map((s) => (
            <button
              key={s.id} type="button"
              className={cx('cp-display__size', `cp-display__size--${s.id}`)}
              aria-pressed={size === s.id}
              aria-label={s.label}
              title={s.label}
              onClick={() => onSizeChange && onSizeChange(s.id)}
            >A</button>
          ))}
        </div>
      </section>
    </div>
  );
}
