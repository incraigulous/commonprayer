/* @ds-bundle: {"format":4,"namespace":"CommonPrayerDesignSystem_91d70c","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"THEME_MODES","sourcePath":"components/core/DisplayMenu.jsx"},{"name":"COLOR_AUTO","sourcePath":"components/core/DisplayMenu.jsx"},{"name":"COLOR_SEASONS","sourcePath":"components/core/DisplayMenu.jsx"},{"name":"SIZE_STEPS","sourcePath":"components/core/DisplayMenu.jsx"},{"name":"DISPLAY_READING_SCALES","sourcePath":"components/core/DisplayMenu.jsx"},{"name":"OFFICE_PERIODS","sourcePath":"components/core/DisplayMenu.jsx"},{"name":"DisplayMenu","sourcePath":"components/core/DisplayMenu.jsx"},{"name":"Field","sourcePath":"components/core/Field.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"Switch","sourcePath":"components/core/Switch.jsx"},{"name":"READING_SCALES","sourcePath":"components/core/TypeScale.jsx"},{"name":"TypeScale","sourcePath":"components/core/TypeScale.jsx"},{"name":"Callout","sourcePath":"components/feedback/Callout.jsx"},{"name":"IlluminatedInitial","sourcePath":"components/liturgy/IlluminatedInitial.jsx"},{"name":"Masthead","sourcePath":"components/liturgy/Masthead.jsx"},{"name":"Mosaic","sourcePath":"components/liturgy/Mosaic.jsx"},{"name":"OrnamentalDivider","sourcePath":"components/liturgy/OrnamentalDivider.jsx"},{"name":"Rubric","sourcePath":"components/liturgy/Rubric.jsx"},{"name":"Scripture","sourcePath":"components/liturgy/Scripture.jsx"},{"name":"SectionHeading","sourcePath":"components/liturgy/SectionHeading.jsx"},{"name":"SplashScreen","sourcePath":"components/liturgy/SplashScreen.jsx"},{"name":"StartScreen","sourcePath":"components/liturgy/StartScreen.jsx"},{"name":"Versicle","sourcePath":"components/liturgy/Versicle.jsx"},{"name":"SessionBar","sourcePath":"components/navigation/SessionBar.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"af9e9e9efe2d","components/core/Button.jsx":"2a07e5982d76","components/core/Card.jsx":"7cddbd73a798","components/core/DisplayMenu.jsx":"5270aac93c2e","components/core/Field.jsx":"38ba120aac83","components/core/Icon.jsx":"0432d9140297","components/core/Switch.jsx":"b41bec2e5e8e","components/core/TypeScale.jsx":"5dfb5f5f3032","components/feedback/Callout.jsx":"7328635ddadb","components/liturgy/IlluminatedInitial.jsx":"7c3a715c82af","components/liturgy/Masthead.jsx":"180fd5a96d27","components/liturgy/Mosaic.jsx":"23b107fd5821","components/liturgy/OrnamentalDivider.jsx":"de739f3bb43c","components/liturgy/Rubric.jsx":"452c485798c7","components/liturgy/Scripture.jsx":"c123357d4047","components/liturgy/SectionHeading.jsx":"b99056aaf031","components/liturgy/SplashScreen.jsx":"c9202028ca79","components/liturgy/StartScreen.jsx":"272d2cf00e42","components/liturgy/Versicle.jsx":"3af8cd4621c3","components/navigation/SessionBar.jsx":"d3c67288f0b6","components/navigation/Tabs.jsx":"f027940bdb10","ui_kits/common-prayer/App.jsx":"6d5a5dda814c","ui_kits/common-prayer/data.js":"243f6a453b15","ui_kits/common-prayer/screens.jsx":"24e1a1866b6a"},"inlinedExternals":[],"unexposedExports":[{"name":"timeOfDayOffice","sourcePath":"components/core/DisplayMenu.jsx"},{"name":"timeOfDaySeason","sourcePath":"components/core/DisplayMenu.jsx"}]} */

(() => {

const __ds_ns = (window.CommonPrayerDesignSystem_91d70c = window.CommonPrayerDesignSystem_91d70c || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}
const CSS = `
.cp-badge{
  display:inline-flex; align-items:center; gap:.4em;
  font-family:var(--font-ui); font-size:var(--text-xs); font-weight:var(--weight-semibold);
  letter-spacing:var(--tracking-caps); text-transform:uppercase;
  padding:.28em .7em; border-radius:var(--radius-pill);
  border:var(--border-hair) solid var(--border-strong); color:var(--text-muted);
  line-height:1; white-space:nowrap;
}
.cp-badge--rubric{ color:var(--accent); border-color:color-mix(in srgb, var(--accent) 45%, transparent); background:var(--accent-quiet); }
.cp-badge--gilt{ color:var(--gold-300); border-color:color-mix(in srgb, var(--gilt) 45%, transparent); background:var(--gilt-quiet); }
.cp-badge--sage{ color:var(--sage-500); border-color:color-mix(in srgb, var(--sage-500) 45%, transparent); background:color-mix(in srgb, var(--sage-500) 14%, transparent); }
.cp-badge--violet{ color:color-mix(in srgb, var(--violet-500) 130%, white); border-color:color-mix(in srgb, var(--violet-500) 50%, transparent); background:color-mix(in srgb, var(--violet-500) 18%, transparent); }
.cp-badge--solid{ color:var(--text-on-accent); background:var(--accent); border-color:var(--accent); }
`;

/**
 * A small-caps pill for seasons, propers, and lesson markers.
 */
function Badge({
  children,
  variant = 'default',
  className,
  ...rest
}) {
  useStyles('badge', CSS);
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cx('cp-badge', variant !== 'default' && `cp-badge--${variant}`, className)
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}
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

/* primary — theme accent fill (follows season / theme) */
.cp-btn--primary{ background:var(--accent); color:var(--text-on-accent); border-color:var(--accent); box-shadow:0 1px 2px color-mix(in srgb, var(--accent-press, var(--accent)) 40%, transparent); }
.cp-btn--primary:hover:not([disabled]){ background:color-mix(in srgb, var(--accent) 88%, #000); border-color:color-mix(in srgb, var(--accent) 88%, #000); }
.cp-btn--primary:active:not([disabled]){ background:var(--accent-press, var(--accent)); box-shadow:none; }

/* secondary — soft accent-tinted fill */
.cp-btn--secondary{ background:var(--accent-quiet); color:var(--accent); border-color:transparent; }
.cp-btn--secondary:hover:not([disabled]){ background:color-mix(in srgb, var(--accent) 16%, transparent); }

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
function Button({
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
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cx('cp-btn', `cp-btn--${variant}`, `cp-btn--${size}`, block && 'cp-btn--block', className)
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}
const CSS = `
.cp-card{
  background:var(--surface-raised);
  border:var(--border-hair) solid var(--border);
  border-radius:var(--radius-lg);
  padding:var(--pad-card);
  color:var(--text);
}
.cp-card--sunk{ background:var(--surface-sunk); }
.cp-card--flat{ background:transparent; }

/* illuminated: double-ruled gilt frame, the manuscript "box" */
.cp-card--illuminated{
  border-color:var(--gilt);
  box-shadow:var(--shadow-gilt-inset);
  padding:calc(var(--pad-card) + 2px);
}
.cp-card--interactive{ cursor:pointer; transition:border-color var(--dur-base) var(--ease-standard), background var(--dur-base) var(--ease-standard); }
.cp-card--interactive:hover{ border-color:var(--border-strong); background:var(--surface-hover); }

.cp-card__eyebrow{
  font-family:var(--font-ui); font-size:var(--text-xs);
  letter-spacing:var(--tracking-caps); text-transform:uppercase;
  color:var(--accent); margin:0 0 var(--space-2);
}
.cp-card__title{
  font-family:var(--font-display); font-weight:var(--weight-semibold);
  font-size:var(--text-xl); line-height:var(--leading-heading);
  color:var(--text); margin:0 0 var(--space-3);
}
.cp-card__body{ font-size:var(--text-base); line-height:var(--leading-body); }
.cp-card__body > :first-child{ margin-top:0; }
.cp-card__body > :last-child{ margin-bottom:0; }
`;

/**
 * A ruled parchment card. Set `variant="illuminated"` for a gilt frame.
 */
function Card({
  children,
  variant = 'default',
  eyebrow,
  title,
  interactive = false,
  className,
  ...rest
}) {
  useStyles('card', CSS);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cx('cp-card', variant !== 'default' && `cp-card--${variant}`, interactive && 'cp-card--interactive', className)
  }, rest), eyebrow && /*#__PURE__*/React.createElement("div", {
    className: "cp-card__eyebrow"
  }, eyebrow), title && /*#__PURE__*/React.createElement("div", {
    className: "cp-card__title"
  }, title), eyebrow || title ? /*#__PURE__*/React.createElement("div", {
    className: "cp-card__body"
  }, children) : children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/DisplayMenu.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}

/** Theme modes offered by the menu. */
const THEME_MODES = [{
  id: 'system',
  label: 'System'
}, {
  id: 'light',
  label: 'Light'
}, {
  id: 'dark',
  label: 'Dark'
}];

/** Automatic colour modes — resolve to a season at render time in the host. */
const COLOR_AUTO = [{
  id: 'seasonal',
  label: 'Seasonal'
},
// follows the liturgical calendar
{
  id: 'time',
  label: 'Time of Day'
} // follows the clock
];

/** Explicit liturgical seasons, in calendar order. */
const COLOR_SEASONS = [{
  id: 'advent',
  label: 'Advent'
}, {
  id: 'christmas',
  label: 'Christmas'
}, {
  id: 'epiphany',
  label: 'Epiphany'
}, {
  id: 'lent',
  label: 'Lent'
}, {
  id: 'easter',
  label: 'Easter'
}, {
  id: 'pentecost',
  label: 'Pentecost'
}, {
  id: 'ordinary',
  label: 'Ordinary Time'
}];

/** Reading-size steps. */
const SIZE_STEPS = [{
  id: 'sm',
  label: 'Small'
}, {
  id: 'md',
  label: 'Regular'
}, {
  id: 'lg',
  label: 'Large'
}, {
  id: 'xl',
  label: 'Extra large'
}];

/** Recommended --reading-scale for each size step (mirrors TypeScale). */
const DISPLAY_READING_SCALES = {
  sm: 0.9,
  md: 1,
  lg: 1.15,
  xl: 1.3
};

/**
 * The four daily offices, in order, each with its proper name and the season
 * colour the "Time of Day" mode paints it in. The devotional day runs
 * dawn → day → dusk → night:
 *   Morning Prayer  → Easter    (gold — resurrection light)
 *   Noonday Prayer  → Ordinary  (green — the working day)
 *   Evening Prayer  → Pentecost (red — "at evening you hung upon the cross")
 *   Compline        → Lent      (violet — night watch & examen)
 */
const OFFICE_PERIODS = [{
  id: 'morning',
  label: 'Morning',
  office: 'Morning Prayer',
  season: 'easter',
  from: 4
}, {
  id: 'noonday',
  label: 'Noon',
  office: 'Noonday Prayer',
  season: 'ordinary',
  from: 11
}, {
  id: 'evening',
  label: 'Evening',
  office: 'Evening Prayer',
  season: 'pentecost',
  from: 16
}, {
  id: 'compline',
  label: 'Night',
  office: 'Compline',
  season: 'lent',
  from: 20
}];

/** The office appointed for a given clock time. */
function timeOfDayOffice(date = new Date()) {
  const h = date.getHours();
  // walk the periods; the last whose `from` we've passed wins (wraps past midnight to Compline)
  let cur = OFFICE_PERIODS[OFFICE_PERIODS.length - 1];
  for (const p of OFFICE_PERIODS) {
    if (h >= p.from) cur = p;
  }
  return cur;
}

/**
 * Common Prayer mapping from time of day → season colour, for the "Time of
 * Day" auto mode. Delegates to {@link timeOfDayOffice}.
 */
function timeOfDaySeason(date = new Date()) {
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
function DisplayMenu({
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
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cx('cp-display', className),
    role: "group",
    "aria-label": "Display settings"
  }, rest), /*#__PURE__*/React.createElement("section", {
    className: "cp-display__section"
  }, /*#__PURE__*/React.createElement("p", {
    className: "cp-display__label"
  }, "Theme"), /*#__PURE__*/React.createElement("div", {
    className: "cp-display__seg",
    role: "group",
    "aria-label": "Theme"
  }, THEME_MODES.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    type: "button",
    "aria-pressed": theme === t.id,
    onClick: () => onThemeChange && onThemeChange(t.id)
  }, t.label)))), /*#__PURE__*/React.createElement("section", {
    className: "cp-display__section"
  }, /*#__PURE__*/React.createElement("p", {
    className: "cp-display__label"
  }, "Color"), /*#__PURE__*/React.createElement("div", {
    className: "cp-display__pills",
    role: "group",
    "aria-label": "Color"
  }, colorOptions.map(c => /*#__PURE__*/React.createElement("button", {
    key: c.id,
    type: "button",
    className: "cp-display__pill",
    "aria-pressed": color === c.id,
    onClick: () => onColorChange && onColorChange(c.id)
  }, c.label))), colorHint ? /*#__PURE__*/React.createElement("p", {
    className: "cp-display__hint"
  }, colorHint) : null), /*#__PURE__*/React.createElement("section", {
    className: "cp-display__section"
  }, /*#__PURE__*/React.createElement("p", {
    className: "cp-display__label"
  }, "Text size"), /*#__PURE__*/React.createElement("div", {
    className: "cp-display__sizes",
    role: "group",
    "aria-label": "Text size"
  }, SIZE_STEPS.map(s => /*#__PURE__*/React.createElement("button", {
    key: s.id,
    type: "button",
    className: cx('cp-display__size', `cp-display__size--${s.id}`),
    "aria-pressed": size === s.id,
    "aria-label": s.label,
    title: s.label,
    onClick: () => onSizeChange && onSizeChange(s.id)
  }, "A")))));
}
Object.assign(__ds_scope, { THEME_MODES, COLOR_AUTO, COLOR_SEASONS, SIZE_STEPS, DISPLAY_READING_SCALES, OFFICE_PERIODS, timeOfDayOffice, timeOfDaySeason, DisplayMenu });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/DisplayMenu.jsx", error: String((e && e.message) || e) }); }

// components/core/Field.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}
const CSS = `
.cp-field{ display:flex; flex-direction:column; gap:var(--space-2); font-family:var(--font-serif); }
.cp-field__label{
  font-family:var(--font-ui); font-size:var(--text-xs);
  letter-spacing:var(--tracking-caps); text-transform:uppercase;
  color:var(--text-muted);
}
.cp-field__label .cp-field__req{ color:var(--accent); margin-left:.15em; }
.cp-field__control{
  width:100%; font-family:var(--font-serif); font-size:var(--text-base);
  line-height:1.5; color:var(--text);
  background:var(--surface-sunk);
  border:var(--border-hair) solid var(--border);
  border-radius:var(--radius-md);
  padding:var(--pad-field-y) var(--pad-field-x);
  transition:border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard);
}
.cp-field__control::placeholder{ color:var(--text-subtle); font-style:italic; }
.cp-field__control:hover{ border-color:var(--border-strong); }
.cp-field__control:focus{ outline:none; border-color:var(--accent); box-shadow:var(--focus-ring); }
.cp-field__control:disabled{ opacity:.5; cursor:not-allowed; }
textarea.cp-field__control{ resize:vertical; min-height:5.5rem; }
.cp-field--invalid .cp-field__control{ border-color:var(--accent); }
.cp-field__help{ font-size:var(--text-xs); color:var(--text-subtle); }
.cp-field--invalid .cp-field__help{ color:var(--accent); }
`;

/**
 * A labelled text field (single- or multi-line).
 */
function Field({
  label,
  help,
  error,
  required = false,
  multiline = false,
  rows = 3,
  id,
  className,
  ...rest
}) {
  useStyles('field', CSS);
  const reactId = React.useId ? React.useId() : undefined;
  const fieldId = id || reactId;
  const Control = multiline ? 'textarea' : 'input';
  const helpText = error || help;
  return /*#__PURE__*/React.createElement("label", {
    className: cx('cp-field', error && 'cp-field--invalid', className),
    htmlFor: fieldId
  }, label && /*#__PURE__*/React.createElement("span", {
    className: "cp-field__label"
  }, label, required && /*#__PURE__*/React.createElement("span", {
    className: "cp-field__req"
  }, "*")), /*#__PURE__*/React.createElement(Control, _extends({
    id: fieldId,
    className: "cp-field__control",
    "aria-invalid": error ? 'true' : undefined
  }, multiline ? {
    rows
  } : {}, rest)), helpText && /*#__PURE__*/React.createElement("span", {
    className: "cp-field__help"
  }, helpText));
}
Object.assign(__ds_scope, { Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Field.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}
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
  loading = new Promise(resolve => {
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
function Icon({
  name,
  size = '1.25rem',
  strokeWidth = 1.75,
  className,
  style,
  ...rest
}) {
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
          attrs: {
            'stroke-width': strokeWidth,
            width: '100%',
            height: '100%'
          },
          nameAttr: 'data-lucide'
        });
      } catch (e) {/* noop */}
    });
    return () => {
      cancelled = true;
    };
  }, [name, strokeWidth]);
  return /*#__PURE__*/React.createElement("span", _extends({
    ref: ref,
    className: cx('cp-icon', className),
    style: {
      width: size,
      height: size,
      fontSize: size,
      ...style
    },
    role: "img",
    "aria-label": rest['aria-label'] || name
  }, rest));
}
function toPascal(n) {
  return String(n || '').split(/[-_]/).map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('');
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}
const CSS = `
.cp-switch{ display:flex; align-items:center; justify-content:space-between; gap:var(--space-4);
  font-family:var(--font-serif); cursor:pointer; }
.cp-switch--disabled{ opacity:.5; cursor:not-allowed; }
.cp-switch__text{ display:flex; flex-direction:column; gap:2px; }
.cp-switch__label{ font-family:var(--font-serif); font-size:var(--text-base); color:var(--text); line-height:1.3; }
.cp-switch__help{ font-family:var(--font-ui); font-size:var(--text-xs); color:var(--text-subtle); }
.cp-switch__track{
  position:relative; flex:none; width:52px; height:30px; border-radius:var(--radius-pill);
  background:var(--surface-sunk); border:var(--border-hair) solid var(--border-strong);
  transition:background var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard);
}
.cp-switch__thumb{
  position:absolute; top:50%; left:3px; transform:translateY(-50%);
  width:22px; height:22px; border-radius:50%; background:#fff;
  box-shadow:0 1px 3px rgba(0,0,0,.3); display:flex; align-items:center; justify-content:center;
  color:var(--text-subtle); font-size:12px; line-height:1;
  transition:left var(--dur-normal) var(--ease-spring, var(--ease-standard)), color var(--dur-fast) var(--ease-standard);
}
.cp-switch__ico{ opacity:.85; }
.cp-switch input{ position:absolute; opacity:0; width:0; height:0; }
.cp-switch input:checked + .cp-switch__track{ background:var(--accent); border-color:var(--accent); }
.cp-switch input:checked + .cp-switch__track .cp-switch__thumb{ left:calc(100% - 25px); color:var(--accent); }
.cp-switch input:focus-visible + .cp-switch__track{ box-shadow:var(--focus-ring); }
`;

/**
 * Switch — a labelled toggle field (a "light switch"): a pill track with a
 * sliding thumb, an inline label and optional help text. Controlled via
 * `checked` / `onChange`; the track fills with the theme `--accent` when on.
 * Optional `onGlyph` / `offGlyph` ride inside the thumb (e.g. a sun / moon for
 * a light-mode switch).
 */
function Switch({
  label,
  help,
  checked = false,
  onChange,
  disabled = false,
  onGlyph,
  offGlyph,
  id,
  className,
  ...rest
}) {
  useStyles('switch', CSS);
  const reactId = React.useId ? React.useId() : undefined;
  const fieldId = id || reactId;
  const glyph = checked ? onGlyph : offGlyph;
  return /*#__PURE__*/React.createElement("label", {
    className: cx('cp-switch', disabled && 'cp-switch--disabled', className),
    htmlFor: fieldId
  }, (label || help) && /*#__PURE__*/React.createElement("span", {
    className: "cp-switch__text"
  }, label && /*#__PURE__*/React.createElement("span", {
    className: "cp-switch__label"
  }, label), help && /*#__PURE__*/React.createElement("span", {
    className: "cp-switch__help"
  }, help)), /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    role: "switch",
    id: fieldId,
    checked: checked,
    disabled: disabled,
    onChange: e => onChange && onChange(e.target.checked, e)
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "cp-switch__track"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cp-switch__thumb"
  }, glyph ? /*#__PURE__*/React.createElement("span", {
    className: "cp-switch__ico"
  }, glyph) : null)));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Switch.jsx", error: String((e && e.message) || e) }); }

// components/core/TypeScale.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}
const STEPS = [{
  id: 'sm',
  label: 'Small'
}, {
  id: 'md',
  label: 'Regular'
}, {
  id: 'lg',
  label: 'Large'
}, {
  id: 'xl',
  label: 'Extra large'
}];

/** Recommended --reading-scale for each step. */
const READING_SCALES = {
  sm: 0.9,
  md: 1,
  lg: 1.15,
  xl: 1.3
};
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
function TypeScale({
  value = 'md',
  onChange,
  className,
  ...rest
}) {
  useStyles('typescale', CSS);
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "group",
    "aria-label": "Reading text size",
    className: cx('cp-typescale', className)
  }, rest), STEPS.map(s => /*#__PURE__*/React.createElement("button", {
    key: s.id,
    type: "button",
    "aria-pressed": value === s.id,
    "aria-label": s.label,
    title: s.label,
    className: cx('cp-typescale__step', `cp-typescale__step--${s.id}`),
    onClick: () => onChange && onChange(s.id)
  }, "A")));
}
Object.assign(__ds_scope, { READING_SCALES, TypeScale });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/TypeScale.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Callout.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}
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
.cp-callout__body{ font-family:var(--font-serif); font-size:var(--reading-base); line-height:var(--leading-body); color:var(--text); }
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
const GLYPHS = {
  prayer: '\u271F',
  blessing: '\u2720',
  note: '\u2735',
  refrain: '\u2767'
};

/**
 * A callout aside — a note, prayer, blessing, or refrain set apart from the
 * flowing office text.
 */
function Callout({
  children,
  variant = 'note',
  title,
  glyph,
  className,
  ...rest
}) {
  useStyles('callout', CSS);
  const mark = glyph ?? GLYPHS[variant];
  return /*#__PURE__*/React.createElement("aside", _extends({
    className: cx('cp-callout', `cp-callout--${variant}`, className)
  }, rest), title && /*#__PURE__*/React.createElement("p", {
    className: "cp-callout__head"
  }, mark && /*#__PURE__*/React.createElement("span", {
    className: "cp-callout__glyph",
    "aria-hidden": "true"
  }, mark), title), /*#__PURE__*/React.createElement("div", {
    className: "cp-callout__body"
  }, children));
}
Object.assign(__ds_scope, { Callout });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Callout.jsx", error: String((e && e.message) || e) }); }

// components/liturgy/IlluminatedInitial.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}
const CSS = `
.cp-initial{ font-size:var(--reading-base); }
.cp-initial__cap{
  font-family:var(--font-initial); font-weight:var(--weight-regular); /* Goudy Initialen ships Regular only — bold synthesizes & breaks glyphs */
  float:left; line-height:.72; color:var(--gilt);
  margin:.04em .12em 0 0; padding:0;
  font-size:3.8em;
}
.cp-initial--rubric .cp-initial__cap{ color:var(--accent); }
.cp-initial--ink .cp-initial__cap{ color:var(--text); }
.cp-initial__body{ margin:0; }
.cp-initial__body::after{ content:""; display:block; clear:both; }
`;

/**
 * An illuminated initial (drop-cap) opening a prayer or reading — the gilt
 * letter alone, set large and floated into the text.
 */
function IlluminatedInitial({
  letter,
  children,
  variant = 'gilt',
  className,
  ...rest
}) {
  useStyles('initial', CSS);
  return /*#__PURE__*/React.createElement("p", _extends({
    className: cx('cp-initial', `cp-initial--${variant}`, className)
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "cp-initial__cap",
    "aria-hidden": "false"
  }, letter), /*#__PURE__*/React.createElement("span", {
    className: "cp-initial__body"
  }, children));
}
Object.assign(__ds_scope, { IlluminatedInitial });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/liturgy/IlluminatedInitial.jsx", error: String((e && e.message) || e) }); }

// components/liturgy/Mosaic.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}

// Deterministic PRNG so the glass pattern (and its shimmer timing) is stable.
function mulberry32(a) {
  return function () {
    a |= 0;
    a = a + 0x6D2B79F5 | 0;
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
function Mosaic({
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
  const palette = Array.isArray(colors) && colors.length ? colors : ['currentColor'];
  const rand = mulberry32(seed);
  const pts = [];
  for (let r = 0; r <= rows; r++) {
    pts[r] = [];
    for (let c = 0; c <= cols; c++) {
      const jx = c === 0 || c === cols ? 0 : (rand() - 0.5) * (width / cols) * 0.72;
      const jy = r === 0 || r === rows ? 0 : (rand() - 0.5) * (height / rows) * 0.72;
      pts[r][c] = [c * width / cols + jx, r * height / rows + jy];
    }
  }
  const polys = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const q = [pts[r][c], pts[r][c + 1], pts[r + 1][c + 1], pts[r + 1][c]];
    polys.push({
      p: q.map(a => a.join(',')).join(' '),
      fill: palette[Math.floor(rand() * palette.length)],
      delay: (rand() * 4).toFixed(2),
      // 0–4s stagger
      dur: (2.8 + rand() * 2.7).toFixed(2) // 2.8–5.5s cycle
    });
  }
  return /*#__PURE__*/React.createElement("svg", _extends({
    className: cx('cp-mosaic', animate && 'cp-mosaic--anim', className),
    viewBox: `0 0 ${width} ${height}`,
    preserveAspectRatio: "none",
    "aria-hidden": "true"
  }, rest), polys.map((pl, i) => /*#__PURE__*/React.createElement("polygon", {
    key: i,
    points: pl.p,
    fill: pl.fill,
    stroke: lead,
    strokeWidth: strokeWidth,
    strokeLinejoin: "round",
    style: animate ? {
      animationDelay: `${pl.delay}s`,
      animationDuration: `${pl.dur}s`
    } : undefined
  })));
}
Object.assign(__ds_scope, { Mosaic });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/liturgy/Mosaic.jsx", error: String((e && e.message) || e) }); }

// components/liturgy/Masthead.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}
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
function Masthead({
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
  const lines = Array.isArray(opening) ? opening.filter(Boolean) : opening ? [opening] : [];
  const glass = Array.isArray(colors) && colors.length ? colors : null;
  return /*#__PURE__*/React.createElement("header", _extends({
    className: cx('cp-masthead', className),
    style: {
      background: fill,
      color: textColor,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "cp-masthead__body"
  }, date ? /*#__PURE__*/React.createElement("p", {
    className: "cp-masthead__date"
  }, date) : null, /*#__PURE__*/React.createElement("h1", {
    className: "cp-masthead__title"
  }, office), tradition ? /*#__PURE__*/React.createElement("p", {
    className: "cp-masthead__tradition"
  }, tradition) : null, lines.length ? /*#__PURE__*/React.createElement("p", {
    className: "cp-masthead__opening"
  }, lines.map((l, i) => /*#__PURE__*/React.createElement("span", {
    key: i
  }, l))) : null, list.length ? /*#__PURE__*/React.createElement("p", {
    className: "cp-masthead__readings"
  }, "Readings \xB7 ", list.join(' · ')) : null, children), glass ? /*#__PURE__*/React.createElement("div", {
    className: "cp-masthead__glass"
  }, /*#__PURE__*/React.createElement(__ds_scope.Mosaic, {
    colors: glass,
    seed: seed,
    animate: animateGlass
  })) : null);
}
Object.assign(__ds_scope, { Masthead });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/liturgy/Masthead.jsx", error: String((e && e.message) || e) }); }

// components/liturgy/OrnamentalDivider.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}
const GLYPHS = {
  cross: '\u2720',
  /* ✠ maltese cross */
  latin: '\u2020',
  /* † */
  fleuron: '\u2766',
  /* ❦ */
  diamond: '\u2756',
  /* ❖ */
  asterism: '\u2042',
  /* ⁂ */
  none: ''
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
function OrnamentalDivider({
  glyph = 'cross',
  tone = 'gilt',
  className,
  ...rest
}) {
  useStyles('divider', CSS);
  const mark = GLYPHS[glyph] ?? glyph;
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cx('cp-divider', tone === 'rubric' && 'cp-divider--rubric', glyph === 'none' && 'cp-divider--plain', className),
    role: "separator"
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "cp-divider__line"
  }), mark && /*#__PURE__*/React.createElement("span", {
    className: "cp-divider__glyph",
    "aria-hidden": "true"
  }, mark), /*#__PURE__*/React.createElement("span", {
    className: "cp-divider__line"
  }));
}
Object.assign(__ds_scope, { OrnamentalDivider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/liturgy/OrnamentalDivider.jsx", error: String((e && e.message) || e) }); }

// components/liturgy/Rubric.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}
const CSS = `
.cp-rubric{
  font-family:var(--font-serif); font-style:italic;
  color:var(--accent); font-size:var(--reading-base);
  line-height:var(--leading-body); margin:0;
}
.cp-rubric--sm{ font-size:var(--reading-sm); }
.cp-rubric--center{ text-align:center; }
/* a rubric heading — small-caps, letterspaced, for red-letter section marks */
.cp-rubric--heading{
  font-family:var(--font-ui); font-style:normal;
  font-size:var(--text-xs); font-weight:var(--weight-semibold);
  letter-spacing:var(--tracking-caps); text-transform:uppercase;
}
`;

/**
 * Rubric — the traditional red-letter instruction to the worshipper.
 * Italic and rubric-red by default; `heading` for small-caps section marks.
 */
function Rubric({
  children,
  variant = 'default',
  center = false,
  as = 'p',
  className,
  ...rest
}) {
  useStyles('rubric', CSS);
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cx('cp-rubric', variant !== 'default' && `cp-rubric--${variant}`, center && 'cp-rubric--center', className)
  }, rest), children);
}
Object.assign(__ds_scope, { Rubric });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/liturgy/Rubric.jsx", error: String((e && e.message) || e) }); }

// components/liturgy/Scripture.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}
const CSS = `
.cp-scripture{
  position:relative; margin:var(--space-5) 0;
  padding:var(--space-4) var(--space-5);
  border-left:var(--border-rule) solid var(--accent);
  background:var(--surface-sunk); border-radius:0 var(--radius-md) var(--radius-md) 0;
}
.cp-scripture--illuminated{
  border:var(--border-hair) solid var(--gilt); border-left-width:var(--border-rule);
  border-radius:var(--radius-md); box-shadow:var(--shadow-gilt-inset);
}
.cp-scripture__text{
  font-family:var(--font-serif); font-size:var(--reading-lg);
  line-height:1.6; color:var(--text); margin:0;
}
.cp-scripture__text p{ margin:0 0 var(--space-3); }
.cp-scripture__text p:last-child{ margin-bottom:0; }
.cp-scripture__foot{
  display:flex; align-items:center; justify-content:space-between; gap:var(--space-3);
  margin-top:var(--space-3);
}
.cp-scripture__cite{
  font-family:var(--font-ui); font-size:var(--text-xs);
  letter-spacing:var(--tracking-caps); text-transform:uppercase;
  color:var(--text-muted);
}
.cp-scripture__mark{ font-family:var(--font-display); color:var(--gilt); font-size:1.25rem; line-height:1; }
.cp-scripture--illuminated .cp-scripture__mark{ color:var(--gilt); }
`;

/**
 * A scripture reading block — verse text with a citation and a gilt mark.
 */
function Scripture({
  children,
  cite,
  variant = 'quiet',
  mark = true,
  className,
  ...rest
}) {
  useStyles('scripture', CSS);
  return /*#__PURE__*/React.createElement("figure", _extends({
    className: cx('cp-scripture', variant === 'illuminated' && 'cp-scripture--illuminated', className)
  }, rest), /*#__PURE__*/React.createElement("blockquote", {
    className: "cp-scripture__text"
  }, children), (cite || mark) && /*#__PURE__*/React.createElement("figcaption", {
    className: "cp-scripture__foot"
  }, cite ? /*#__PURE__*/React.createElement("cite", {
    className: "cp-scripture__cite"
  }, cite) : /*#__PURE__*/React.createElement("span", null), mark && /*#__PURE__*/React.createElement("span", {
    className: "cp-scripture__mark",
    "aria-hidden": "true"
  }, '\u271F')));
}
Object.assign(__ds_scope, { Scripture });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/liturgy/Scripture.jsx", error: String((e && e.message) || e) }); }

// components/liturgy/SectionHeading.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}
const CSS = `
.cp-heading{ margin:0 0 var(--space-4); }
.cp-heading__eyebrow{
  font-family:var(--font-ui); font-size:var(--text-xs);
  letter-spacing:var(--tracking-caps); text-transform:uppercase;
  color:var(--accent); margin:0 0 var(--space-2);
}
.cp-heading__title{
  font-family:var(--font-display); font-weight:var(--weight-semibold);
  line-height:var(--leading-heading); letter-spacing:-.01em; color:var(--text); margin:0;
}
.cp-heading__rule{
  display:block; width:2.5rem; height:var(--border-rule);
  background:var(--accent); border:0; margin:var(--space-3) 0 0;
}
.cp-heading--center{ text-align:center; }
.cp-heading--center .cp-heading__rule{ margin-inline:auto; }

.cp-heading--display .cp-heading__title{ font-size:var(--text-3xl); }
.cp-heading--office .cp-heading__title{ font-size:var(--text-2xl); }
.cp-heading--section .cp-heading__title{ font-size:var(--text-xl); }
`;

/**
 * A section heading in the display serif with an optional rubric rule.
 */
function SectionHeading({
  children,
  eyebrow,
  level = 'section',
  rule = false,
  center = false,
  as = 'h2',
  className,
  ...rest
}) {
  useStyles('heading', CSS);
  const Tag = as;
  return /*#__PURE__*/React.createElement("header", _extends({
    className: cx('cp-heading', `cp-heading--${level}`, center && 'cp-heading--center', className)
  }, rest), eyebrow && /*#__PURE__*/React.createElement("p", {
    className: "cp-heading__eyebrow"
  }, eyebrow), /*#__PURE__*/React.createElement(Tag, {
    className: "cp-heading__title"
  }, children), rule && /*#__PURE__*/React.createElement("span", {
    className: "cp-heading__rule",
    "aria-hidden": "true"
  }));
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/liturgy/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/liturgy/SplashScreen.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}
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
function SplashScreen({
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
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cx('cp-splash', enter && 'cp-splash--enter', className),
    style: {
      '--cp-splash-bg': background,
      '--cp-splash-fg': gilt,
      '--cp-splash-word': wordColor,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Mosaic, {
    className: "cp-splash__glass",
    colors: ['transparent'],
    lead: lead,
    strokeWidth: 0.75,
    animate: true,
    cols: 14,
    rows: 24,
    seed: 11,
    width: 420,
    height: 720
  }), /*#__PURE__*/React.createElement("div", {
    className: "cp-splash__wash"
  }), /*#__PURE__*/React.createElement("div", {
    className: "cp-splash__mark"
  }, glyph), /*#__PURE__*/React.createElement("div", {
    className: "cp-splash__rule"
  }), /*#__PURE__*/React.createElement("h1", {
    className: "cp-splash__word"
  }, word), /*#__PURE__*/React.createElement("p", {
    className: "cp-splash__sub"
  }, subtitle));
}
Object.assign(__ds_scope, { SplashScreen });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/liturgy/SplashScreen.jsx", error: String((e && e.message) || e) }); }

// components/liturgy/StartScreen.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}
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
function StartScreen({
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
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cx('cp-start', className),
    style: style
  }, rest), image ? /*#__PURE__*/React.createElement("div", {
    className: "cp-start__bg",
    style: {
      backgroundImage: `url(${image})`
    }
  }) : null, /*#__PURE__*/React.createElement("div", {
    className: "cp-start__scrim"
  }), /*#__PURE__*/React.createElement("div", {
    className: "cp-start__inner"
  }, top ? /*#__PURE__*/React.createElement("div", {
    className: "cp-start__top"
  }, top) : null, /*#__PURE__*/React.createElement("div", {
    className: "cp-start__arch"
  }, glassLines ? /*#__PURE__*/React.createElement(__ds_scope.Mosaic, {
    className: "cp-start__glass",
    colors: ['transparent'],
    lead: "rgba(255,255,255,.3)",
    animate: true,
    cols: 4,
    rows: 6,
    seed: 7
  }) : null, /*#__PURE__*/React.createElement("div", {
    className: "cp-start__archbody"
  }, date ? /*#__PURE__*/React.createElement("p", {
    className: "cp-start__date"
  }, date) : null, /*#__PURE__*/React.createElement("h1", {
    className: "cp-start__title"
  }, title), subtitle ? /*#__PURE__*/React.createElement("p", {
    className: "cp-start__sub"
  }, subtitle) : null, /*#__PURE__*/React.createElement("button", {
    className: "cp-start__begin",
    style: {
      '--cp-start-accent': accent,
      '--cp-start-on': textColor
    },
    onClick: onBegin
  }, buttonLabel), children))));
}
Object.assign(__ds_scope, { StartScreen });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/liturgy/StartScreen.jsx", error: String((e && e.message) || e) }); }

// components/liturgy/Versicle.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}
const CSS = `
.cp-versicle{ display:grid; gap:var(--space-2); margin:var(--space-4) 0; }
.cp-versicle__line{ display:grid; grid-template-columns:6.5rem 1fr; gap:var(--space-3); align-items:baseline; }
.cp-versicle__by{
  font-family:var(--font-ui); font-size:var(--text-xs);
  letter-spacing:var(--tracking-caps); text-transform:uppercase;
  color:var(--accent); text-align:right; padding-top:.15em; user-select:none;
}
.cp-versicle__text{ font-family:var(--font-serif); font-size:var(--reading-base); line-height:1.5; color:var(--text); margin:0; }
.cp-versicle__line--response .cp-versicle__text{ font-weight:var(--weight-semibold); }
@media (max-width:32rem){
  .cp-versicle__line{ grid-template-columns:1fr; gap:0; }
  .cp-versicle__by{ text-align:left; }
}
`;

/**
 * A versicle-and-response exchange (Officiant / People).
 */
function Versicle({
  lines = [],
  className,
  ...rest
}) {
  useStyles('versicle', CSS);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cx('cp-versicle', className)
  }, rest), lines.map((ln, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: cx('cp-versicle__line', ln.response && 'cp-versicle__line--response')
  }, /*#__PURE__*/React.createElement("span", {
    className: "cp-versicle__by"
  }, ln.by), /*#__PURE__*/React.createElement("p", {
    className: "cp-versicle__text"
  }, ln.text))));
}
Object.assign(__ds_scope, { Versicle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/liturgy/Versicle.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SessionBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}
const CSS = `
.cp-sessionbar{ display:flex; align-items:center; gap:var(--space-2);
  padding:14px 16px; background:var(--bg); }
.cp-sessionbar--hairline{ border-bottom:var(--border-hair) solid var(--hairline); }
.cp-sessionbar__title{ flex:1; min-width:0; text-align:center;
  font-family:var(--font-display); font-weight:600; font-size:var(--text-lg); color:var(--text);
  margin:0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.cp-sessionbar__spacer{ flex:1; }
.cp-sessionbar__ico{ appearance:none; background:none; border:0; cursor:pointer; color:var(--text);
  display:flex; align-items:center; justify-content:center; padding:6px; border-radius:var(--radius-sm);
  transition:background var(--dur-fast) var(--ease-standard); }
.cp-sessionbar__ico:hover{ background:var(--surface-hover); }
.cp-sessionbar__ico:focus-visible{ outline:none; box-shadow:var(--focus-ring); }
/* the AA text-size glyph */
.cp-sessionbar__aa{ display:flex; align-items:baseline; gap:1px; color:var(--accent); font-family:var(--font-serif); line-height:1; }
.cp-sessionbar__aa .s{ font-size:15px; }
.cp-sessionbar__aa .l{ font-size:22px; font-weight:600; }
`;

/**
 * SessionBar — the office reading-view top bar: a back (or close) control on
 * the left and the "AA" text-size control on the right, with an optional
 * centred title. Presentational; wire `onBack` / `onTextSize`. Use `leadIcon`
 * to switch between a back chevron and a close ✕.
 */
function SessionBar({
  title,
  leadIcon = 'chevron-left',
  onBack,
  onTextSize,
  showTextSize = true,
  hairline = true,
  backLabel = 'Back',
  className,
  ...rest
}) {
  useStyles('session-bar', CSS);
  return /*#__PURE__*/React.createElement("header", _extends({
    className: cx('cp-sessionbar', hairline && 'cp-sessionbar--hairline', className)
  }, rest), /*#__PURE__*/React.createElement("button", {
    className: "cp-sessionbar__ico",
    "aria-label": backLabel,
    onClick: onBack
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: leadIcon,
    size: "1.5rem"
  })), title ? /*#__PURE__*/React.createElement("h1", {
    className: "cp-sessionbar__title"
  }, title) : /*#__PURE__*/React.createElement("span", {
    className: "cp-sessionbar__spacer"
  }), showTextSize ? /*#__PURE__*/React.createElement("button", {
    className: "cp-sessionbar__ico",
    "aria-label": "Text size",
    onClick: onTextSize
  }, /*#__PURE__*/React.createElement("span", {
    className: "cp-sessionbar__aa"
  }, /*#__PURE__*/React.createElement("span", {
    className: "s"
  }, "A"), /*#__PURE__*/React.createElement("span", {
    className: "l"
  }, "A"))) : /*#__PURE__*/React.createElement("span", {
    className: "cp-sessionbar__ico",
    "aria-hidden": "true",
    style: {
      visibility: 'hidden'
    }
  }));
}
Object.assign(__ds_scope, { SessionBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SessionBar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}
const CSS = `
.cp-tabs{ display:flex; }

/* the in-office step tabs (Opening · Psalm · Scripture …): a horizontal-scrolling
   row, each active tab carrying its own accent underline. Matches the app. */
.cp-tabs--underline{ gap:22px; overflow-x:auto; scrollbar-width:none; }
.cp-tabs--underline::-webkit-scrollbar{ display:none; }
.cp-tabs--underline .cp-tab{
  appearance:none; background:none; border:0; cursor:pointer; white-space:nowrap;
  font-family:var(--font-ui); font-size:15px; font-weight:600;
  color:var(--text-subtle); padding:10px 0 12px;
  border-bottom:2.5px solid transparent;
  transition:color var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard);
}
.cp-tabs--underline .cp-tab:hover{ color:var(--text); }
.cp-tabs--underline .cp-tab[aria-selected="true"]{ color:var(--accent); border-bottom-color:var(--accent); }
`;

/**
 * The in-office step tabs (Opening · Psalm · Scripture …): a horizontal-scrolling
 * row of section tabs, each active one carrying its own accent underline — the
 * tabs used at the top of the office in the app.
 */
function Tabs({
  items = [],
  value,
  onChange,
  className,
  ...rest
}) {
  useStyles('tabs', CSS);
  const active = value ?? items[0]?.id;
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "tablist",
    className: cx('cp-tabs', 'cp-tabs--underline', className)
  }, rest), items.map(it => /*#__PURE__*/React.createElement("button", {
    key: it.id,
    role: "tab",
    type: "button",
    "aria-selected": active === it.id,
    className: "cp-tab",
    onClick: () => onChange && onChange(it.id)
  }, /*#__PURE__*/React.createElement("span", {
    className: "cp-tab__label"
  }, it.label))));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/common-prayer/App.jsx
try { (() => {
// Common Prayer — app shell. Views: home · session · more · psalter.
const CPds = window.CommonPrayerDesignSystem_91d70c;
const {
  Icon,
  timeOfDaySeason
} = CPds;
const READING_SCALES = CPds.READING_SCALES || {
  sm: 0.9,
  md: 1,
  lg: 1.15,
  xl: 1.3
};
const SEASON_ACCENTS = window.CP_SEASON_ACCENTS;
const SEASON_GLASS = window.CP_SEASON_GLASS;
const SEASON_LABELS = {
  advent: 'Advent',
  christmas: 'Christmas',
  epiphany: 'Epiphany',
  lent: 'Lent',
  easter: 'Easter',
  pentecost: 'Pentecost',
  ordinary: 'Ordinary Time'
};
const store = {
  get: (k, d) => {
    try {
      return localStorage.getItem(k) ?? d;
    } catch {
      return d;
    }
  },
  set: (k, v) => {
    try {
      localStorage.setItem(k, v);
    } catch {}
  }
};
function App() {
  const data = window.CP_DATA;
  const [view, setView] = React.useState('home'); // home | session | more | psalter
  const [period, setPeriod] = React.useState('morning'); // morning | noonday | evening | compline
  const [theme, setTheme] = React.useState(() => store.get('cp-theme', 'light')); // system | light | dark
  const [color, setColor] = React.useState(() => store.get('cp-color', 'time')); // seasonal | time | <season>
  const [size, setSize] = React.useState(() => store.get('cp-reading-size', 'md'));
  const p = data.periods.find(x => x.id === period) || data.periods[0];

  // Resolve the colour mode → a concrete liturgical season.
  const season = color === 'time' ? p.season : color === 'seasonal' ? data.day.seasonKey || 'ordinary' : color;
  const accent = SEASON_ACCENTS[season] || SEASON_ACCENTS.ordinary;
  const glass = SEASON_GLASS[season] || SEASON_GLASS.ordinary;
  const colorHint = color === 'time' ? `Now · ${p.office}` : color === 'seasonal' ? `Following the calendar · ${SEASON_LABELS[season]}` : null;

  // Resolve theme (system follows the OS).
  const effTheme = theme === 'system' ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' : theme;

  // Season → in-office accent (tabs, scripture cards, links) + home mood.
  React.useEffect(() => {
    document.documentElement.setAttribute('data-season', season);
    const root = document.querySelector('.cp-app');
    if (root) {
      root.style.setProperty('--period-accent', accent.accent);
      root.style.setProperty('--period-on', accent.onAccent);
    }
  }, [season, accent]);
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', effTheme);
  }, [effTheme]);
  React.useEffect(() => {
    store.set('cp-theme', theme);
  }, [theme]);
  React.useEffect(() => {
    store.set('cp-color', color);
  }, [color]);
  React.useEffect(() => {
    document.documentElement.style.setProperty('--reading-scale', READING_SCALES[size] ?? 1);
    store.set('cp-reading-size', size);
  }, [size]);
  const office = data.offices[period];
  const display = {
    theme,
    onTheme: setTheme,
    color,
    onColor: setColor,
    size,
    onSize: setSize,
    colorHint
  };

  // Splash: show the SplashScreen component briefly, then fade out + retire the boot bridge.
  const [booting, setBooting] = React.useState(true);
  React.useEffect(() => {
    const boot = document.getElementById('cp-boot');
    if (boot) {
      boot.classList.add('is-hidden');
      setTimeout(() => boot.remove(), 400);
    }
    const t = setTimeout(() => setBooting(false), 1600);
    return () => clearTimeout(t);
  }, []);
  const onNavigate = id => {
    if (id === 'office') setView('session');else setView(id);
  };
  const SplashScreen = CPds.SplashScreen;
  return /*#__PURE__*/React.createElement("div", {
    className: "cp-app"
  }, SplashScreen && booting ? /*#__PURE__*/React.createElement("div", {
    className: 'cp-splash-overlay' + (booting ? '' : ' is-hidden')
  }, /*#__PURE__*/React.createElement(SplashScreen, null)) : null, view === 'home' && /*#__PURE__*/React.createElement(HomeScreen, {
    periods: data.periods,
    period: period,
    onSelectPeriod: setPeriod,
    day: data.day,
    week: data.week,
    accent: accent,
    onStart: () => setView('session'),
    onNavigate: onNavigate
  }), view === 'session' && /*#__PURE__*/React.createElement(SessionScreen, {
    office: office,
    period: p,
    day: data.day,
    week: data.week,
    accent: accent,
    glass: glass,
    display: display,
    onClose: () => setView('home')
  }), (view === 'more' || view === 'psalter') && /*#__PURE__*/React.createElement("div", {
    className: "cp-inner"
  }, /*#__PURE__*/React.createElement("header", {
    className: "cp-inner__head"
  }, view === 'psalter' && /*#__PURE__*/React.createElement("button", {
    className: "cp-inner__back",
    "aria-label": "Back",
    onClick: () => setView('more')
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-left",
    size: "1.5rem"
  })), /*#__PURE__*/React.createElement("h1", {
    className: "cp-inner__title"
  }, view === 'psalter' ? 'The Psalter' : 'More')), /*#__PURE__*/React.createElement("main", {
    className: "cp-inner__scroll"
  }, view === 'psalter' ? /*#__PURE__*/React.createElement(PsalterScreen, null) : /*#__PURE__*/React.createElement(MoreScreen, {
    display: display,
    onOpenPsalter: () => setView('psalter')
  })), /*#__PURE__*/React.createElement(Nav, {
    variant: "solid",
    active: view === 'psalter' ? 'psalter' : 'more',
    onNavigate: onNavigate
  })));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/common-prayer/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/common-prayer/data.js
try { (() => {
// Common Prayer — sample content for the modern demo app.
// Content follows the traditional daily office (public-domain / BCP-style
// language), authored to mirror the real app's readings.
// FOUR daily offices, each mapped to a season colour used by "Time of Day":
//   Morning Prayer  → Easter    (gold)
//   Noonday Prayer  → Ordinary  (green)
//   Evening Prayer  → Pentecost (red)
//   Compline        → Lent      (violet)
// Steps per office: Opening · Psalm · Scripture · Canticle · Prayers · Collect.

// Season → accent hexes (mirror tokens/seasons.css).
window.CP_SEASON_ACCENTS = {
  easter: {
    accent: '#c9a24b',
    onAccent: '#fbf4e4'
  },
  // gold-500 (lighter)
  christmas: {
    accent: '#c9a24b',
    onAccent: '#fbf4e4'
  },
  ordinary: {
    accent: '#5f7d53',
    onAccent: '#f1f6ee'
  },
  epiphany: {
    accent: '#5f7d53',
    onAccent: '#f1f6ee'
  },
  advent: {
    accent: '#675889',
    onAccent: '#efeaf6'
  },
  lent: {
    accent: '#524570',
    onAccent: '#efeaf6'
  },
  pentecost: {
    accent: '#bf4835',
    onAccent: '#fdeeea'
  }
};

// Season → stained-glass mosaic palette (light → deep, monochromatic per season).
window.CP_SEASON_GLASS = {
  easter: ['#ecd79c', '#e2c887', '#d3ad5c', '#c9a24b', '#a9843a', '#8a6b2e', '#dcc079'],
  christmas: ['#ecd79c', '#e2c887', '#d3ad5c', '#c9a24b', '#a9843a', '#8a6b2e', '#dcc079'],
  ordinary: ['#a9c19b', '#94ad87', '#7f9a72', '#5f7d53', '#4a6540', '#3c5334', '#8aa67d'],
  epiphany: ['#a9c19b', '#94ad87', '#7f9a72', '#5f7d53', '#4a6540', '#3c5334', '#8aa67d'],
  advent: ['#b3a7c9', '#9789b3', '#7d6f9c', '#675889', '#564a77', '#453a63', '#8b7daa'],
  lent: ['#b3a7c9', '#9789b3', '#7d6f9c', '#675889', '#524570', '#3f3459', '#8b7daa'],
  pentecost: ['#f0b3a6', '#eca192', '#e27563', '#d65846', '#bf4835', '#9c3626', '#e9897a']
};

// The Gloria Patri, said after the psalms.
const GLORIA = 'Glory to the Father, and to the Son, and to the Holy Spirit:\nas it was in the beginning, is now, and will be for ever. Amen.';

// The general confession, shared by Morning and Evening Prayer.
const CONFESSION = 'Most merciful God, we confess that we have sinned against you in thought, word, and deed, by what we have done, and by what we have left undone. We have not loved you with our whole heart; we have not loved our neighbors as ourselves. We are truly sorry and we humbly repent. For the sake of your Son Jesus Christ, have mercy on us and forgive us; that we may delight in your will, and walk in your ways, to the glory of your Name. Amen.';
window.CP_DATA = {
  day: {
    dateLong: 'Monday, 6 July',
    dateShort: 'Mon 6 Jul',
    season: 'Ordinary Time',
    proper: 'Proper 9',
    seasonKey: 'ordinary'
  },
  week: {
    theme: 'The Promise of Freedom',
    series: 'Fixing our eyes on Jesus',
    intro: "This week we fix our eyes upon Jesus in the Gospel of John. As we listen to his teaching and explore the miracle of a man receiving sight, we hear Christ’s invitation to us — and respond.",
    author: 'Brittany White'
  },
  periods: [{
    id: 'morning',
    label: 'Morning',
    office: 'Morning Prayer',
    icon: 'sunrise',
    season: 'easter',
    greeting: 'Grace and peace to you this morning',
    image: './assets/morning.jpg'
  }, {
    id: 'noonday',
    label: 'Noon',
    office: 'Noonday Prayer',
    icon: 'sun',
    season: 'ordinary',
    greeting: 'A pause in the middle of the day',
    image: './assets/noon.jpg'
  }, {
    id: 'evening',
    label: 'Evening',
    office: 'Evensong',
    icon: 'sunset',
    season: 'pentecost',
    greeting: 'The day declines; give thanks',
    image: './assets/evening.jpg'
  }, {
    id: 'compline',
    label: 'Night',
    office: 'Compline',
    icon: 'moon',
    season: 'lent',
    greeting: 'Rest now in the peace of Christ',
    image: './assets/night.jpg'
  }],
  offices: {
    // ---- MORNING PRAYER --------------------------------------------------
    morning: {
      duration: '9:46',
      readings: ['Psalm 95', 'John 14'],
      opening: ['The night has passed, and the day lies open before us;', 'let us pray with one heart and mind.'],
      steps: [{
        key: 'confess',
        label: 'Confess',
        blocks: [{
          type: 'rubric',
          text: 'The Officiant begins with a sentence of Scripture.'
        }, {
          type: 'scripture',
          dropcap: true,
          text: 'Jesus said to him, “I am the way, the truth, and the life. No one comes to the Father, except through me.”',
          ref: 'John 14:6'
        }, {
          type: 'heading',
          text: 'Confession of Sin'
        }, {
          type: 'rubric',
          text: 'Let us confess our sins against God and our neighbor.'
        }, {
          type: 'prose',
          text: CONFESSION
        }, {
          type: 'rubric',
          text: 'The Officiant alone says —'
        }, {
          type: 'prose',
          text: 'Almighty God have mercy on you, forgive you all your sins through our Lord Jesus Christ, strengthen you in all goodness, and by the power of the Holy Spirit keep you in eternal life. Amen.'
        }]
      }, {
        key: 'read',
        label: 'Read',
        blocks: [{
          type: 'versicle',
          lines: [{
            text: 'Lord, open our lips.'
          }, {
            text: 'And our mouth shall proclaim your praise.',
            response: true
          }]
        }, {
          type: 'canticle',
          text: GLORIA
        }, {
          type: 'heading',
          text: 'Venite · Psalm 95'
        }, {
          type: 'psalm',
          ref: 'Psalm 95:1–7',
          text: 'Come, let us sing to the Lord; *\nlet us shout for joy to the Rock of our salvation.\n\nLet us come before his presence with thanksgiving *\nand raise a loud shout to him with psalms.\n\nFor the Lord is a great God, *\nand a great King above all gods.\n\nCome, let us bow down, and bend the knee, *\nand kneel before the Lord our Maker.'
        }, {
          type: 'rubric',
          text: 'A Reading from the Gospel according to John.'
        }, {
          type: 'scripture',
          highlight: true,
          text: '“If you hold to my teaching, you are really my disciples. Then you will know the truth, and the truth will set you free.”',
          ref: 'John 8:31–32'
        }, {
          type: 'prose',
          text: 'Jesus extends an invitation that will have an everlasting effect on our lives: to hold to his word, to know the truth, and to be set free indeed.'
        }, {
          type: 'heading',
          text: 'Te Deum Laudamus · We Praise You, O God'
        }, {
          type: 'canticle',
          text: 'You are God: we praise you;\nYou are the Lord: we acclaim you;\nYou are the eternal Father:\nAll creation worships you.\n\nHoly, holy, holy Lord, God of power and might,\nheaven and earth are full of your glory.'
        }]
      }, {
        key: 'pray',
        label: 'Pray',
        blocks: [{
          type: 'heading',
          text: 'The Apostles’ Creed'
        }, {
          type: 'prose',
          text: 'I believe in God, the Father almighty, creator of heaven and earth; and in Jesus Christ, his only Son, our Lord, who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died, and was buried. On the third day he rose again. He ascended into heaven, and is seated at the right hand of the Father.'
        }, {
          type: 'heading',
          text: 'The Prayers'
        }, {
          type: 'versicle',
          lines: [{
            text: 'The Lord be with you.'
          }, {
            text: 'And also with you.',
            response: true
          }]
        }, {
          type: 'prose',
          text: 'Our Father, who art in heaven, hallowed be thy Name, thy kingdom come, thy will be done, on earth as it is in heaven. Give us this day our daily bread. And forgive us our trespasses, as we forgive those who trespass against us. And lead us not into temptation, but deliver us from evil. Amen.'
        }, {
          type: 'heading',
          text: 'A Collect for Grace'
        }, {
          type: 'collect',
          text: 'Lord God, almighty and everlasting Father, you have brought us in safety to this new day: Preserve us with your mighty power, that we may not fall into sin, nor be overcome by adversity; and in all we do, direct us to the fulfilling of your purpose; through Jesus Christ our Lord. Amen.'
        }, {
          type: 'refrain',
          text: 'Let us bless the Lord. Thanks be to God.'
        }]
      }]
    },
    // ---- NOONDAY PRAYER --------------------------------------------------
    noonday: {
      duration: '5:12',
      readings: ['Psalms 30, 31'],
      opening: ['O God, make speed to save us.', 'O Lord, make haste to help us.'],
      steps: [{
        key: 'opening',
        label: 'Opening',
        blocks: [{
          type: 'rubric',
          text: 'A brief pause in the day. Be still, and know.'
        }, {
          type: 'canticle',
          text: GLORIA
        }, {
          type: 'refrain',
          text: 'Alleluia.'
        }]
      }, {
        key: 'psalm',
        label: 'Psalm',
        blocks: [{
          type: 'psalm',
          ref: 'Psalms 30, 31',
          text: 'I will exalt you, O Lord, because you have lifted me up *\nand have not let my enemies triumph over me.\n\nO Lord my God, I cried out to you, *\nand you restored me to health.\n\nWeeping may spend the night, *\nbut joy comes in the morning.\n\nIn you, O Lord, have I taken refuge; *\nlet me never be put to shame.'
        }]
      }, {
        key: 'scripture',
        label: 'Scripture',
        blocks: [{
          type: 'rubric',
          text: 'A Reading.'
        }, {
          type: 'scripture',
          highlight: true,
          text: 'Blessed Savior, at this hour you hung upon the cross, stretching out your loving arms: Grant that all the peoples of the earth may look to you and be saved.',
          ref: 'A Prayer at Noon'
        }]
      }, {
        key: 'prayers',
        label: 'Prayers',
        blocks: [{
          type: 'versicle',
          lines: [{
            text: 'Lord, hear our prayer.'
          }, {
            text: 'And let our cry come to you.',
            response: true
          }]
        }, {
          type: 'prose',
          text: 'Our Father, who art in heaven, hallowed be thy Name, thy kingdom come, thy will be done, on earth as it is in heaven. Give us this day our daily bread. And forgive us our trespasses, as we forgive those who trespass against us. And lead us not into temptation, but deliver us from evil. Amen.'
        }]
      }, {
        key: 'collect',
        label: 'Collect',
        blocks: [{
          type: 'heading',
          text: 'A Collect for the Renewal of Life'
        }, {
          type: 'collect',
          text: 'Almighty Savior, who at noonday called your servant Saint Paul to be an apostle to the Gentiles: We pray you to illumine the world with the radiance of your glory, that all nations may come and worship you; for you live and reign for ever and ever. Amen.'
        }, {
          type: 'refrain',
          text: 'Let us bless the Lord. Thanks be to God.'
        }]
      }]
    },
    // ---- EVENING PRAYER --------------------------------------------------
    evening: {
      duration: '8:30',
      readings: ['Psalm 141', 'Luke 1'],
      opening: ['That this evening may be holy, good and peaceful,', 'let us pray with one heart and mind.'],
      steps: [{
        key: 'opening',
        label: 'Opening',
        blocks: [{
          type: 'rubric',
          text: 'At the close of day the candles are lit. Then the Officiant begins.'
        }, {
          type: 'scripture',
          dropcap: true,
          text: 'Take my yoke upon you and learn from me, for I am gentle and humble in heart; and you will find rest for your souls.',
          ref: 'Matthew 11:29'
        }, {
          type: 'heading',
          text: 'Confession of Sin'
        }, {
          type: 'rubric',
          text: 'Let us confess our sins against God and our neighbor.'
        }, {
          type: 'prose',
          text: CONFESSION
        }]
      }, {
        key: 'psalm',
        label: 'Psalm',
        blocks: [{
          type: 'versicle',
          lines: [{
            text: 'O God, make speed to save us.'
          }, {
            text: 'O Lord, make haste to help us.',
            response: true
          }]
        }, {
          type: 'canticle',
          text: GLORIA
        }, {
          type: 'heading',
          text: 'Domine, clamavi · Psalm 141'
        }, {
          type: 'psalm',
          ref: 'Psalm 141:1–3',
          text: 'O Lord, I call to you; come to me quickly; *\nhear my voice when I cry to you.\n\nLet my prayer be set forth in your sight as incense, *\nthe lifting up of my hands as the evening sacrifice.\n\nSet a watch before my mouth, O Lord, *\nand guard the door of my lips.'
        }]
      }, {
        key: 'scripture',
        label: 'Scripture',
        blocks: [{
          type: 'rubric',
          text: 'A Reading from the Gospel according to Luke.'
        }, {
          type: 'scripture',
          highlight: true,
          text: '“Stay with us, for it is nearly evening; the day is almost over.” So he went in to stay with them.',
          ref: 'Luke 24:29'
        }]
      }, {
        key: 'canticle',
        label: 'Canticle',
        blocks: [{
          type: 'heading',
          text: 'Phos hilaron · O Gracious Light'
        }, {
          type: 'canticle',
          text: 'O gracious Light,\npure brightness of the everliving Father in heaven,\nO Jesus Christ, holy and blessed!\n\nNow as we come to the setting of the sun,\nand our eyes behold the vesper light,\nwe sing your praises, O God: Father, Son, and Holy Spirit.'
        }, {
          type: 'heading',
          text: 'Magnificat · The Song of Mary'
        }, {
          type: 'canticle',
          text: 'My soul proclaims the greatness of the Lord,\nmy spirit rejoices in God my Savior;\nfor he has looked with favor on his lowly servant.\nFrom this day all generations will call me blessed.'
        }]
      }, {
        key: 'prayers',
        label: 'Prayers',
        blocks: [{
          type: 'versicle',
          lines: [{
            text: 'The Lord be with you.'
          }, {
            text: 'And also with you.',
            response: true
          }]
        }, {
          type: 'prose',
          text: 'Our Father, who art in heaven, hallowed be thy Name, thy kingdom come, thy will be done, on earth as it is in heaven. Give us this day our daily bread. And forgive us our trespasses, as we forgive those who trespass against us. And lead us not into temptation, but deliver us from evil. Amen.'
        }]
      }, {
        key: 'collect',
        label: 'Collect',
        blocks: [{
          type: 'heading',
          text: 'A Collect for Aid against Perils'
        }, {
          type: 'collect',
          text: 'Lighten our darkness, we beseech you, O Lord; and by your great mercy defend us from all perils and dangers of this night; for the love of your only Son, our Savior Jesus Christ. Amen.'
        }, {
          type: 'refrain',
          text: 'Let us bless the Lord. Thanks be to God.'
        }]
      }]
    },
    // ---- COMPLINE --------------------------------------------------------
    compline: {
      duration: '6:40',
      readings: ['Psalm 4', 'Psalm 91'],
      opening: ['The Lord Almighty grant us a peaceful night and a perfect end.', 'Amen.'],
      steps: [{
        key: 'opening',
        label: 'Opening',
        blocks: [{
          type: 'versicle',
          lines: [{
            text: 'Our help is in the Name of the Lord;'
          }, {
            text: 'The maker of heaven and earth.',
            response: true
          }]
        }, {
          type: 'heading',
          text: 'Confession of Sin'
        }, {
          type: 'rubric',
          text: 'Let us confess our sins to God.'
        }, {
          type: 'prose',
          text: 'Almighty God, our heavenly Father: We have sinned against you, through our own fault, in thought, and word, and deed, and in what we have left undone. For the sake of your Son our Lord Jesus Christ, have mercy on us and forgive us; that we may walk in newness of life, to the glory of your Name. Amen.'
        }]
      }, {
        key: 'psalm',
        label: 'Psalm',
        blocks: [{
          type: 'versicle',
          lines: [{
            text: 'O God, make speed to save us.'
          }, {
            text: 'O Lord, make haste to help us.',
            response: true
          }]
        }, {
          type: 'canticle',
          text: GLORIA
        }, {
          type: 'psalm',
          ref: 'Psalm 4:1, 8',
          text: 'Answer me when I call, O God, defender of my cause; *\nyou set me free when I am hard-pressed; have mercy on me and hear my prayer.\n\nI lie down in peace; at once I fall asleep; *\nfor only you, Lord, make me dwell in safety.'
        }]
      }, {
        key: 'scripture',
        label: 'Scripture',
        blocks: [{
          type: 'rubric',
          text: 'A Reading.'
        }, {
          type: 'scripture',
          highlight: true,
          text: 'Be sober, be watchful. Cast all your care on him, for he cares for you. Now to him who is able to keep you from falling, be glory and majesty, dominion and power, now and for ever.',
          ref: '1 Peter 5:7–8'
        }]
      }, {
        key: 'canticle',
        label: 'Canticle',
        blocks: [{
          type: 'heading',
          text: 'Nunc dimittis · The Song of Simeon'
        }, {
          type: 'canticle',
          text: 'Lord, now you let your servant go in peace; *\nyour word has been fulfilled:\n\nMy own eyes have seen the salvation *\nwhich you have prepared in the sight of every people:\n\nA light to reveal you to the nations *\nand the glory of your people Israel.'
        }]
      }, {
        key: 'prayers',
        label: 'Prayers',
        blocks: [{
          type: 'versicle',
          lines: [{
            text: 'Guide us waking, O Lord,'
          }, {
            text: 'and guard us sleeping.',
            response: true
          }]
        }, {
          type: 'prose',
          text: 'Our Father, who art in heaven, hallowed be thy Name, thy kingdom come, thy will be done, on earth as it is in heaven. Give us this day our daily bread. And forgive us our trespasses, as we forgive those who trespass against us. And lead us not into temptation, but deliver us from evil. Amen.'
        }]
      }, {
        key: 'collect',
        label: 'Collect',
        blocks: [{
          type: 'heading',
          text: 'A Collect for the Close of Day'
        }, {
          type: 'collect',
          text: 'Keep watch, dear Lord, with those who work, or watch, or weep this night, and give your angels charge over those who sleep. Tend the sick, give rest to the weary, bless the dying, soothe the suffering, pity the afflicted, shield the joyous; and all for your love’s sake. Amen.'
        }, {
          type: 'refrain',
          text: 'Into your hands, O Lord, I commend my spirit.',
          ref: 'Psalm 31:5'
        }]
      }]
    }
  }
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/common-prayer/data.js", error: String((e && e.message) || e) }); }

// ui_kits/common-prayer/screens.jsx
try { (() => {
// Common Prayer — modern app screens.
const CP = window.CommonPrayerDesignSystem_91d70c;
const {
  Icon,
  TypeScale,
  Tabs
} = CP;
const IlluminatedInitial = CP.IlluminatedInitial || function ({
  letter,
  children
}) {
  return /*#__PURE__*/React.createElement("p", {
    className: "rb rb-scripture"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '2.4em',
      float: 'left',
      lineHeight: .8,
      marginRight: '.08em'
    }
  }, letter), children);
};
// DisplayMenu comes from the DS bundle; guard so a not-yet-rebuilt bundle can't
// blank the whole app (the real component renders once the bundle is current).
const DisplayMenu = CP.DisplayMenu || function DisplayMenuPending() {
  return null;
};
const SCR_SEASON_ACCENTS = window.CP_SEASON_ACCENTS || {};

/* ---- shared floating nav ------------------------------------------------- */
function Nav({
  variant,
  active,
  onNavigate
}) {
  const items = [{
    id: 'home',
    label: 'Home',
    icon: 'home'
  }, {
    id: 'office',
    label: 'Office',
    icon: 'book-open'
  }, {
    id: 'psalter',
    label: 'Psalter',
    icon: 'book'
  }, {
    id: 'more',
    label: 'More',
    icon: 'menu'
  }];
  return /*#__PURE__*/React.createElement("nav", {
    className: 'cp-fnav cp-fnav--' + variant
  }, items.map(it => /*#__PURE__*/React.createElement("button", {
    key: it.id,
    className: active === it.id ? 'is-on' : '',
    onClick: () => onNavigate(it.id)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: it.icon,
    size: "1.35rem"
  }), it.label)));
}

/* ---- floating action menu ------------------------------------------------ */
function ActionMenu() {
  const [open, setOpen] = React.useState(false);
  const items = [{
    icon: 'share-2',
    label: 'Share'
  }, {
    icon: 'pencil',
    label: 'Note'
  }, {
    icon: 'bell',
    label: 'Remind'
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: 'cp-fab' + (open ? ' is-open' : '')
  }, /*#__PURE__*/React.createElement("button", {
    className: "cp-fab__main",
    "aria-label": "Actions",
    "aria-expanded": open,
    onClick: () => setOpen(o => !o)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: "1.5rem"
  })), items.map(it => /*#__PURE__*/React.createElement("button", {
    key: it.label,
    className: "cp-fab__item",
    "aria-label": it.label,
    title: it.label
  }, /*#__PURE__*/React.createElement(Icon, {
    name: it.icon,
    size: "1.15rem"
  }))));
}

/* ---- HOME (time of day) -------------------------------------------------- */
const StartScreen = CP.StartScreen;
function HomeScreen({
  periods,
  period,
  onSelectPeriod,
  day,
  week,
  accent,
  onStart,
  onNavigate
}) {
  const p = periods.find(x => x.id === period) || periods[0];
  const periodSwitch = /*#__PURE__*/React.createElement("div", {
    className: "cp-period"
  }, periods.map(x => /*#__PURE__*/React.createElement("button", {
    key: x.id,
    className: x.id === period ? 'is-on' : '',
    onClick: () => onSelectPeriod(x.id)
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot",
    style: x.id === period ? undefined : {
      background: (SCR_SEASON_ACCENTS[x.season] || {}).accent
    }
  }), x.label)));
  return /*#__PURE__*/React.createElement("div", {
    className: "cp-home"
  }, /*#__PURE__*/React.createElement(StartScreen, {
    image: p.image,
    date: day.dateLong,
    title: p.office,
    subtitle: week.theme,
    accent: accent.accent,
    textColor: accent.onAccent,
    onBegin: onStart,
    top: periodSwitch
  }), /*#__PURE__*/React.createElement(ActionMenu, null), /*#__PURE__*/React.createElement(Nav, {
    variant: "glass",
    active: "home",
    onNavigate: onNavigate
  }));
}

/* ---- reading blocks ------------------------------------------------------ */
function Block({
  b
}) {
  switch (b.type) {
    case 'heading':
      return /*#__PURE__*/React.createElement("h2", {
        className: "rb rb-heading"
      }, b.text);
    case 'rubric':
      return /*#__PURE__*/React.createElement("p", {
        className: "rb rb-rubric"
      }, b.text);
    case 'prose':
      return /*#__PURE__*/React.createElement("p", {
        className: "rb rb-prose"
      }, b.text);
    case 'scripture':
      if (b.dropcap && b.text) {
        const letter = b.text.charAt(0);
        const rest = b.text.slice(1);
        return /*#__PURE__*/React.createElement("div", {
          className: "rb rb-opening"
        }, /*#__PURE__*/React.createElement(IlluminatedInitial, {
          letter: letter,
          variant: "gilt"
        }, rest), b.ref && /*#__PURE__*/React.createElement("span", {
          className: "rb-ref"
        }, b.ref));
      }
      return /*#__PURE__*/React.createElement("div", {
        className: 'rb rb-scripture' + (b.highlight ? ' rb-scripture--hl' : '')
      }, b.text, b.ref && /*#__PURE__*/React.createElement("span", {
        className: "rb-ref"
      }, b.ref));
    case 'psalm':
      return /*#__PURE__*/React.createElement("div", {
        className: "rb rb-psalm"
      }, b.ref && /*#__PURE__*/React.createElement("span", {
        className: "rb-psalm__ref"
      }, b.ref), /*#__PURE__*/React.createElement("span", {
        className: "rb-psalm__text"
      }, b.text));
    case 'canticle':
      return /*#__PURE__*/React.createElement("p", {
        className: "rb rb-canticle"
      }, b.text);
    case 'collect':
      return /*#__PURE__*/React.createElement("p", {
        className: "rb rb-collect"
      }, b.text);
    case 'refrain':
      return /*#__PURE__*/React.createElement("p", {
        className: "rb rb-refrain"
      }, b.text, /*#__PURE__*/React.createElement("span", {
        className: "rb-ref"
      }, b.ref));
    case 'versicle':
      return /*#__PURE__*/React.createElement("div", {
        className: "rb rb-versicle"
      }, b.lines.map((l, i) => /*#__PURE__*/React.createElement("p", {
        key: i,
        className: 'rb-vline' + (l.response ? ' rb-vline--resp' : '')
      }, l.by ? /*#__PURE__*/React.createElement("span", {
        className: "who"
      }, l.by) : null, l.text)));
    default:
      return null;
  }
}

/* ---- stained-glass mosaic (vector, voronoi-ish) -------------------------- */
function mulberry32(a) {
  return function () {
    a |= 0;
    a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function MosaicBand({
  colors,
  seed = 9,
  cols = 10,
  rows = 8,
  width = 420,
  height = 300
}) {
  const rand = mulberry32(seed);
  const pts = [];
  for (let r = 0; r <= rows; r++) {
    pts[r] = [];
    for (let c = 0; c <= cols; c++) {
      const jx = c === 0 || c === cols ? 0 : (rand() - .5) * (width / cols) * .72;
      const jy = r === 0 || r === rows ? 0 : (rand() - .5) * (height / rows) * .72;
      pts[r][c] = [c * width / cols + jx, r * height / rows + jy];
    }
  }
  const polys = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const q = [pts[r][c], pts[r][c + 1], pts[r + 1][c + 1], pts[r + 1][c]];
    polys.push({
      p: q.map(a => a.join(',')).join(' '),
      fill: colors[Math.floor(rand() * colors.length)],
      delay: (rand() * 4).toFixed(2),
      dur: (2.8 + rand() * 2.7).toFixed(2)
    });
  }
  return /*#__PURE__*/React.createElement("svg", {
    className: "cp-mosaic cp-mosaic--anim",
    viewBox: `0 0 ${width} ${height}`,
    preserveAspectRatio: "none",
    "aria-hidden": "true"
  }, polys.map((pl, i) => /*#__PURE__*/React.createElement("polygon", {
    key: i,
    points: pl.p,
    fill: pl.fill,
    stroke: "rgba(26,18,10,.45)",
    strokeWidth: "1.2",
    strokeLinejoin: "round",
    style: {
      animationDelay: `${pl.delay}s`,
      animationDuration: `${pl.dur}s`
    }
  })));
}

/* Masthead comes from the DS bundle; fall back to this inline copy until the
   bundle is rebuilt so the office opening never blanks. Same props either way. */
function InlineMasthead({
  office,
  date,
  readings,
  opening,
  fill,
  textColor,
  colors
}) {
  const list = Array.isArray(readings) ? readings.filter(Boolean) : [];
  const lines = Array.isArray(opening) ? opening.filter(Boolean) : opening ? [opening] : [];
  return /*#__PURE__*/React.createElement("div", {
    className: "cp-mast",
    style: {
      background: fill,
      color: textColor
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "cp-mast__body"
  }, date ? /*#__PURE__*/React.createElement("p", {
    className: "cp-mast__date"
  }, date) : null, /*#__PURE__*/React.createElement("h1", {
    className: "cp-mast__title"
  }, office), lines.length ? /*#__PURE__*/React.createElement("p", {
    className: "cp-mast__opening"
  }, lines.map((l, i) => /*#__PURE__*/React.createElement("span", {
    key: i
  }, l))) : null, list.length ? /*#__PURE__*/React.createElement("p", {
    className: "cp-mast__readings"
  }, "Readings \xB7 ", list.join(' · ')) : null), colors && colors.length ? /*#__PURE__*/React.createElement(MosaicBand, {
    colors: colors
  }) : null);
}
// Use the actual Masthead component from the design-system bundle.
const Masthead = CP.Masthead;

/* ---- SESSION (the office) ------------------------------------------------ */
function SessionScreen({
  office,
  period,
  day,
  week,
  accent,
  glass,
  display,
  onClose
}) {
  const [active, setActive] = React.useState(0);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const pageRef = React.useRef(null);
  const steps = office.steps;
  React.useEffect(() => {
    const root = pageRef.current;
    if (!root) return;
    const secs = [...root.querySelectorAll('[data-sec]')];
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) setActive(Number(e.target.dataset.sec));
      });
    }, {
      root,
      rootMargin: '-45% 0px -50% 0px',
      threshold: 0
    });
    secs.forEach(s => io.observe(s));
    return () => io.disconnect();
  }, [office]);
  const go = i => {
    const root = pageRef.current;
    if (!root) return;
    const el = root.querySelector(`[data-sec="${i}"]`);
    if (el) root.scrollTo({
      top: el.offsetTop - 6,
      behavior: 'smooth'
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "cp-session"
  }, /*#__PURE__*/React.createElement("header", {
    className: "cp-shead"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cp-shead__top"
  }, /*#__PURE__*/React.createElement("button", {
    className: "cp-shead__ico",
    "aria-label": "Display settings",
    onClick: () => setMenuOpen(o => !o)
  }, /*#__PURE__*/React.createElement("span", {
    className: "cp-aa"
  }, /*#__PURE__*/React.createElement("span", {
    className: "s"
  }, "A"), /*#__PURE__*/React.createElement("span", {
    className: "l"
  }, "A"))), /*#__PURE__*/React.createElement("button", {
    className: "cp-shead__ico",
    "aria-label": "Close",
    onClick: onClose
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: "1.5rem"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "cp-steps"
  }, /*#__PURE__*/React.createElement(Tabs, {
    items: steps.map(s => ({
      id: s.key,
      label: s.label
    })),
    value: steps[active].key,
    onChange: id => go(steps.findIndex(s => s.key === id))
  })), menuOpen && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "cp-typepop__scrim",
    onClick: () => setMenuOpen(false)
  }), /*#__PURE__*/React.createElement("div", {
    className: "cp-menupop",
    role: "dialog",
    "aria-label": "Display settings"
  }, /*#__PURE__*/React.createElement(DisplayMenu, {
    theme: display.theme,
    onThemeChange: display.onTheme,
    color: display.color,
    onColorChange: display.onColor,
    size: display.size,
    onSizeChange: display.onSize,
    colorHint: display.colorHint
  })))), /*#__PURE__*/React.createElement("div", {
    className: "cp-page",
    ref: pageRef
  }, /*#__PURE__*/React.createElement("div", {
    className: "cp-mastwrap"
  }, /*#__PURE__*/React.createElement(Masthead, {
    office: period.office,
    date: day.dateLong,
    readings: office.readings,
    fill: accent.accent,
    textColor: accent.onAccent,
    colors: glass
  })), steps.map((s, i) => /*#__PURE__*/React.createElement("section", {
    className: "cp-sec",
    "data-sec": i,
    key: s.key
  }, i === 0 && office.opening && office.opening.length ? /*#__PURE__*/React.createElement("div", {
    className: "cp-lead"
  }, /*#__PURE__*/React.createElement(Block, {
    b: {
      type: 'versicle',
      lines: office.opening.map((t, k) => ({
        text: t,
        response: k > 0
      }))
    }
  })) : null, /*#__PURE__*/React.createElement("p", {
    className: "cp-sec__label"
  }, s.label), s.blocks.map((b, j) => /*#__PURE__*/React.createElement(Block, {
    key: j,
    b: b
  })))), /*#__PURE__*/React.createElement("div", {
    className: "cp-amen"
  }, /*#__PURE__*/React.createElement("button", {
    className: "cp-amen__btn",
    onClick: onClose
  }, "Amen"))));
}

/* ---- MORE ---------------------------------------------------------------- */
function MoreScreen({
  display,
  onOpenPsalter
}) {
  const {
    Card,
    Field
  } = CP;
  const items = [{
    icon: 'book',
    label: 'The Psalter',
    meta: '150',
    onClick: onOpenPsalter
  }, {
    icon: 'calendar',
    label: 'Choose a day',
    meta: 'Today'
  }, {
    icon: 'book-open',
    label: 'The Lectionary',
    meta: 'Year C'
  }, {
    icon: 'bookmark',
    label: 'Saved prayers',
    meta: '4'
  }, {
    icon: 'bell',
    label: 'Reminders',
    meta: 'Off'
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "cp-more"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cp-more__display"
  }, /*#__PURE__*/React.createElement(DisplayMenu, {
    theme: display.theme,
    onThemeChange: display.onTheme,
    color: display.color,
    onColorChange: display.onColor,
    size: display.size,
    onSizeChange: display.onSize,
    colorHint: display.colorHint
  })), /*#__PURE__*/React.createElement("nav", {
    className: "cp-list"
  }, items.map(it => /*#__PURE__*/React.createElement("button", {
    key: it.label,
    className: "cp-list__row",
    onClick: it.onClick
  }, /*#__PURE__*/React.createElement("span", {
    className: "cp-list__lead"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: it.icon,
    size: "1.15rem"
  })), /*#__PURE__*/React.createElement("span", {
    className: "cp-list__label"
  }, it.label), it.meta && /*#__PURE__*/React.createElement("span", {
    className: "cp-list__meta"
  }, it.meta), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: "1.1rem"
  })))), /*#__PURE__*/React.createElement(Card, {
    variant: "illuminated",
    title: "An intention",
    eyebrow: "Prayer journal"
  }, /*#__PURE__*/React.createElement(Field, {
    multiline: true,
    rows: 3,
    placeholder: "Name someone or something to hold in prayer\u2026"
  })));
}

/* ---- PSALTER ------------------------------------------------------------- */
function range(a, b) {
  const out = [];
  for (let i = a; i <= b; i++) out.push(i);
  return out;
}
function PsalterScreen() {
  const [q, setQ] = React.useState('');
  const books = [{
    name: 'Book I',
    from: 1,
    to: 41
  }, {
    name: 'Book II',
    from: 42,
    to: 72
  }, {
    name: 'Book III',
    from: 73,
    to: 89
  }, {
    name: 'Book IV',
    from: 90,
    to: 106
  }, {
    name: 'Book V',
    from: 107,
    to: 150
  }];
  const appointed = [{
    n: 95,
    name: 'Venite'
  }, {
    n: 100,
    name: 'Jubilate'
  }, {
    n: 84,
    name: 'Quam dilecta'
  }];
  const todaySet = new Set(appointed.map(a => a.n));
  const query = q.trim();
  const visibleBooks = books.map(b => ({
    ...b,
    nums: range(b.from, b.to).filter(n => query === '' || String(n).startsWith(query))
  })).filter(b => b.nums.length > 0);
  return /*#__PURE__*/React.createElement("div", {
    className: "cp-psalter"
  }, /*#__PURE__*/React.createElement("p", {
    className: "cp-psalter__lede"
  }, "One hundred fifty psalms, in five books."), /*#__PURE__*/React.createElement("div", {
    className: "cp-psearch"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cp-psearch__ico"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: "1.05rem"
  })), /*#__PURE__*/React.createElement("input", {
    className: "cp-psearch__input",
    inputMode: "numeric",
    placeholder: "Jump to a psalm\u2026",
    value: q,
    onChange: e => setQ(e.target.value.replace(/[^0-9]/g, ''))
  }), q && /*#__PURE__*/React.createElement("button", {
    className: "cp-psearch__clear",
    "aria-label": "Clear",
    onClick: () => setQ('')
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: "1rem"
  }))), query === '' && /*#__PURE__*/React.createElement("div", {
    className: "cp-appointed"
  }, /*#__PURE__*/React.createElement("p", {
    className: "cp-appointed__lbl"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sw",
    "aria-hidden": "true"
  }), " Appointed today"), /*#__PURE__*/React.createElement("div", {
    className: "cp-appointed__chips"
  }, appointed.map(a => /*#__PURE__*/React.createElement("button", {
    key: a.n,
    className: "cp-chip"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cp-chip__n"
  }, a.n), /*#__PURE__*/React.createElement("span", {
    className: "cp-chip__name"
  }, a.name))))), visibleBooks.map(b => /*#__PURE__*/React.createElement("section", {
    className: "cp-book",
    key: b.name
  }, /*#__PURE__*/React.createElement("header", {
    className: "cp-book__head"
  }, /*#__PURE__*/React.createElement("p", {
    className: "cp-book__name"
  }, b.name), /*#__PURE__*/React.createElement("p", {
    className: "cp-book__range"
  }, "Psalms ", b.from, "\u2013", b.to)), /*#__PURE__*/React.createElement("div", {
    className: "cp-book__grid"
  }, b.nums.map(n => /*#__PURE__*/React.createElement("button", {
    key: n,
    className: 'cp-psalm' + (todaySet.has(n) ? ' cp-psalm--today' : '')
  }, n))))), visibleBooks.length === 0 && /*#__PURE__*/React.createElement("p", {
    className: "cp-psalter__empty"
  }, "No psalm ", query, ". The Psalter numbers 1 to 150."));
}
Object.assign(window, {
  Nav,
  HomeScreen,
  SessionScreen,
  MoreScreen,
  PsalterScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/common-prayer/screens.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.THEME_MODES = __ds_scope.THEME_MODES;

__ds_ns.COLOR_AUTO = __ds_scope.COLOR_AUTO;

__ds_ns.COLOR_SEASONS = __ds_scope.COLOR_SEASONS;

__ds_ns.SIZE_STEPS = __ds_scope.SIZE_STEPS;

__ds_ns.DISPLAY_READING_SCALES = __ds_scope.DISPLAY_READING_SCALES;

__ds_ns.OFFICE_PERIODS = __ds_scope.OFFICE_PERIODS;

__ds_ns.DisplayMenu = __ds_scope.DisplayMenu;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.READING_SCALES = __ds_scope.READING_SCALES;

__ds_ns.TypeScale = __ds_scope.TypeScale;

__ds_ns.Callout = __ds_scope.Callout;

__ds_ns.IlluminatedInitial = __ds_scope.IlluminatedInitial;

__ds_ns.Masthead = __ds_scope.Masthead;

__ds_ns.Mosaic = __ds_scope.Mosaic;

__ds_ns.OrnamentalDivider = __ds_scope.OrnamentalDivider;

__ds_ns.Rubric = __ds_scope.Rubric;

__ds_ns.Scripture = __ds_scope.Scripture;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.SplashScreen = __ds_scope.SplashScreen;

__ds_ns.StartScreen = __ds_scope.StartScreen;

__ds_ns.Versicle = __ds_scope.Versicle;

__ds_ns.SessionBar = __ds_scope.SessionBar;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
