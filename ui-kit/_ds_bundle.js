/* @ds-bundle: {"format":4,"namespace":"CommonPrayerDesignSystem_91d70c","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Field","sourcePath":"components/core/Field.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"READING_SCALES","sourcePath":"components/core/TypeScale.jsx"},{"name":"TypeScale","sourcePath":"components/core/TypeScale.jsx"},{"name":"Callout","sourcePath":"components/feedback/Callout.jsx"},{"name":"IlluminatedInitial","sourcePath":"components/liturgy/IlluminatedInitial.jsx"},{"name":"OrnamentalDivider","sourcePath":"components/liturgy/OrnamentalDivider.jsx"},{"name":"Rubric","sourcePath":"components/liturgy/Rubric.jsx"},{"name":"Scripture","sourcePath":"components/liturgy/Scripture.jsx"},{"name":"SectionHeading","sourcePath":"components/liturgy/SectionHeading.jsx"},{"name":"Versicle","sourcePath":"components/liturgy/Versicle.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"af9e9e9efe2d","components/core/Button.jsx":"1dffbc0d7680","components/core/Card.jsx":"7cddbd73a798","components/core/Field.jsx":"38ba120aac83","components/core/Icon.jsx":"0432d9140297","components/core/TypeScale.jsx":"5dfb5f5f3032","components/feedback/Callout.jsx":"7328635ddadb","components/liturgy/IlluminatedInitial.jsx":"8337788baecc","components/liturgy/OrnamentalDivider.jsx":"de739f3bb43c","components/liturgy/Rubric.jsx":"452c485798c7","components/liturgy/Scripture.jsx":"c123357d4047","components/liturgy/SectionHeading.jsx":"6bf54d2054f2","components/liturgy/Versicle.jsx":"3af8cd4621c3","components/navigation/Tabs.jsx":"e15b4319944c","ui_kits/common-prayer/App.jsx":"e80a7bc44309","ui_kits/common-prayer/data.js":"ab7f60ea41d4","ui_kits/common-prayer/screens.jsx":"da1679743d10"},"inlinedExternals":[],"unexposedExports":[]} */

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
  font-size:3.4em;
}
.cp-initial--rubric .cp-initial__cap{ color:var(--accent); }
.cp-initial--ink .cp-initial__cap{ color:var(--text); }

/* boxed: an illuminated frame around the initial, in the manuscript manner */
.cp-initial--boxed .cp-initial__cap{
  float:left; display:flex; align-items:center; justify-content:center;
  width:1.5em; height:1.5em; margin:.08em .35em .1em 0; padding:0;
  font-size:2.5em; line-height:1;
  border:var(--border-frame) solid var(--gilt); border-radius:var(--radius-sm);
  box-shadow:var(--shadow-gilt-inset);
  background:var(--gilt-quiet);
}
.cp-initial--boxed.cp-initial--rubric .cp-initial__cap{
  border-color:var(--accent); background:var(--accent-quiet); color:var(--accent);
}
.cp-initial__body{ margin:0; }
.cp-initial__body::after{ content:""; display:block; clear:both; }
`;

/**
 * An illuminated initial (drop-cap) opening a prayer or reading.
 */
function IlluminatedInitial({
  letter,
  children,
  variant = 'gilt',
  boxed = false,
  className,
  ...rest
}) {
  useStyles('initial', CSS);
  return /*#__PURE__*/React.createElement("p", _extends({
    className: cx('cp-initial', `cp-initial--${variant}`, boxed && 'cp-initial--boxed', className)
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "cp-initial__cap",
    "aria-hidden": "false"
  }, letter), /*#__PURE__*/React.createElement("span", {
    className: "cp-initial__body"
  }, children));
}
Object.assign(__ds_scope, { IlluminatedInitial });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/liturgy/IlluminatedInitial.jsx", error: String((e && e.message) || e) }); }

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
  font-family:var(--font-display); font-weight:var(--weight-bold);
  line-height:var(--leading-heading); color:var(--text); margin:0;
}
.cp-heading__rule{
  display:block; width:2.5rem; height:var(--border-rule);
  background:var(--accent); border:0; margin:var(--space-3) 0 0;
}
.cp-heading--center{ text-align:center; }
.cp-heading--center .cp-heading__rule{ margin-inline:auto; }

.cp-heading--display .cp-heading__title{ font-size:var(--text-3xl); font-weight:var(--weight-semibold); }
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
  rule = true,
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

/* underline (horizontal text tabs) */
.cp-tabs--underline{ gap:var(--space-5); border-bottom:var(--border-hair) solid var(--border); }
.cp-tabs--underline .cp-tab{
  appearance:none; background:none; border:0; cursor:pointer;
  font-family:var(--font-display); font-size:var(--text-lg);
  color:var(--text-muted); padding:0 0 var(--space-3);
  border-bottom:var(--border-rule) solid transparent; margin-bottom:-1px;
  transition:color var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard);
}
.cp-tabs--underline .cp-tab:hover{ color:var(--text); }
.cp-tabs--underline .cp-tab[aria-selected="true"]{ color:var(--text); border-bottom-color:var(--accent); }

/* bar (bottom navigation, icon over label) — filled with the seasonal accent */
.cp-tabs--bar{
  justify-content:space-around; align-items:stretch;
  background:var(--accent); border-top:var(--border-hair) solid var(--accent-press);
}
.cp-tabs--bar .cp-tab{
  appearance:none; background:none; border:0; cursor:pointer;
  flex:1; display:flex; flex-direction:column; align-items:center; gap:.35rem;
  padding:var(--space-3) var(--space-2) calc(var(--space-3) - 2px);
  color:color-mix(in srgb, var(--text-on-accent) 68%, transparent); position:relative;
  border-top:2px solid transparent; margin-top:-1px;
  transition:color var(--dur-fast) var(--ease-standard);
}
.cp-tabs--bar .cp-tab__icon{ font-size:1.35rem; line-height:1; display:flex; }
.cp-tabs--bar .cp-tab__label{
  font-family:var(--font-ui); font-size:var(--text-xs);
  letter-spacing:var(--tracking-wide);
}
.cp-tabs--bar .cp-tab:hover{ color:var(--text-on-accent); }
.cp-tabs--bar .cp-tab[aria-selected="true"]{ color:var(--text-on-accent); border-top-color:var(--text-on-accent); }
.cp-tabs--bar .cp-tab[aria-selected="true"] .cp-tab__icon{ color:var(--text-on-accent); }
`;

/**
 * Segmented tabs. `underline` for in-page section switching, `bar` for the
 * bottom office navigation (Morning / Noon / Evening / More).
 */
function Tabs({
  items = [],
  value,
  onChange,
  variant = 'underline',
  className,
  ...rest
}) {
  useStyles('tabs', CSS);
  const active = value ?? items[0]?.id;
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "tablist",
    className: cx('cp-tabs', `cp-tabs--${variant}`, className)
  }, rest), items.map(it => /*#__PURE__*/React.createElement("button", {
    key: it.id,
    role: "tab",
    type: "button",
    "aria-selected": active === it.id,
    className: "cp-tab",
    onClick: () => onChange && onChange(it.id)
  }, variant === 'bar' && it.icon != null && /*#__PURE__*/React.createElement("span", {
    className: "cp-tab__icon"
  }, it.icon), /*#__PURE__*/React.createElement("span", {
    className: "cp-tab__label"
  }, it.label))));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/common-prayer/App.jsx
try { (() => {
// Common Prayer — app shell (top bar, office nav, theme). Mounts everything.
const CPds = window.CommonPrayerDesignSystem_91d70c;
const {
  Tabs,
  Icon,
  TypeScale
} = CPds;
const READING_SCALES = CPds.READING_SCALES || {
  sm: 0.9,
  md: 1,
  lg: 1.15,
  xl: 1.3
};
function App() {
  const data = window.CP_DATA;
  const [tab, setTab] = React.useState('morning');
  const [theme, setTheme] = React.useState('dark');
  const [size, setSize] = React.useState(() => localStorage.getItem('cp-reading-size') || 'md');
  const [typeOpen, setTypeOpen] = React.useState(false);
  const scrollRef = React.useRef(null);
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Recolour the accent to the liturgical season of the day.
  React.useEffect(() => {
    const seasonByColor = {
      sage: 'ordinary',
      violet: 'advent',
      gilt: 'christmas',
      rubric: 'pentecost'
    };
    const season = data.day.seasonKey || seasonByColor[data.day.color] || 'ordinary';
    document.documentElement.setAttribute('data-season', season);
  }, [data.day]);

  // Scale only the reading text to the chosen size, and remember it.
  React.useEffect(() => {
    document.documentElement.style.setProperty('--reading-scale', READING_SCALES[size] ?? 1);
    localStorage.setItem('cp-reading-size', size);
  }, [size]);
  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [tab]);
  const isOffice = tab !== 'more';
  const office = isOffice ? data.offices[tab] : null;
  const title = isOffice ? office.title : 'Common Prayer';
  return /*#__PURE__*/React.createElement("div", {
    className: "cp-app"
  }, /*#__PURE__*/React.createElement("header", {
    className: "cp-app__bar"
  }, /*#__PURE__*/React.createElement("button", {
    className: "cp-app__icon",
    "aria-label": "Menu"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "menu",
    size: "1.3rem"
  })), /*#__PURE__*/React.createElement("h1", {
    className: "cp-app__title"
  }, title), /*#__PURE__*/React.createElement("div", {
    className: "cp-app__typewrap"
  }, /*#__PURE__*/React.createElement("button", {
    className: "cp-app__icon",
    "aria-label": "Text size",
    "aria-expanded": typeOpen,
    onClick: () => setTypeOpen(o => !o)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "type",
    size: "1.15rem"
  })), typeOpen && /*#__PURE__*/React.createElement("div", {
    className: "cp-typepop",
    role: "dialog",
    "aria-label": "Text size"
  }, /*#__PURE__*/React.createElement("p", {
    className: "cp-typepop__lbl"
  }, "Text size"), /*#__PURE__*/React.createElement(TypeScale, {
    value: size,
    onChange: setSize
  }), /*#__PURE__*/React.createElement("p", {
    className: "cp-typepop__sample"
  }, "Grace to you and peace from God our Father.")))), typeOpen && /*#__PURE__*/React.createElement("div", {
    className: "cp-typepop__scrim",
    onClick: () => setTypeOpen(false)
  }), /*#__PURE__*/React.createElement("main", {
    className: "cp-app__scroll",
    ref: scrollRef
  }, isOffice ? /*#__PURE__*/React.createElement(OfficeScreen, {
    office: office,
    day: data.day
  }) : /*#__PURE__*/React.createElement(MoreScreen, {
    theme: theme,
    onTheme: setTheme,
    size: size,
    onSize: setSize
  })), /*#__PURE__*/React.createElement("footer", {
    className: "cp-app__nav"
  }, /*#__PURE__*/React.createElement(Tabs, {
    variant: "bar",
    value: tab,
    onChange: setTab,
    items: [{
      id: 'morning',
      label: 'Morning',
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "sunrise",
        size: "1em"
      })
    }, {
      id: 'noon',
      label: 'Noon',
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "sun",
        size: "1em"
      })
    }, {
      id: 'evening',
      label: 'Evening',
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "moon",
        size: "1em"
      })
    }, {
      id: 'more',
      label: 'More',
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "more-horizontal",
        size: "1em"
      })
    }]
  })));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/common-prayer/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/common-prayer/data.js
try { (() => {
// Common Prayer — sample office content for the UI kit.
// Traditional daily-office language (public-domain style), authored for demo.
window.CP_DATA = {
  day: {
    date: 'July 5, 2026',
    season: 'The Sixth Sunday after Pentecost',
    proper: 'Proper 9',
    color: 'sage'
  },
  offices: {
    morning: {
      title: 'Morning Prayer',
      icon: 'sunrise',
      opening: "The Officiant begins the service with one or more of the following sentences of Scripture.",
      sentence: "Grace to you and peace from God our Father and from the Lord Jesus Christ.",
      sentenceRef: 'Philippians 1:2',
      confessionRubric: "The following Confession of Sin may then be said; all kneeling.",
      confession: "Almighty and most merciful Father, we have erred and strayed from your ways like lost sheep. We have followed too much the devices and desires of our own hearts. Spare those who confess their faults, restore those who are penitent.",
      versicle: [{
        by: 'Officiant',
        text: 'Lord, open our lips.'
      }, {
        by: 'People',
        text: 'And our mouth shall proclaim your praise.',
        response: true
      }],
      invitatoryCap: 'C',
      invitatory: "ome, let us sing unto the Lord; let us heartily rejoice in the strength of our salvation. Let us come before his presence with thanksgiving, and show ourselves glad in him with psalms.",
      lessonRef: 'Psalm 95:1–7',
      lesson: "For the Lord is a great God, and a great King above all gods. In his hand are all the corners of the earth, and the strength of the hills is his also. The sea is his, and he made it, and his hands prepared the dry land.",
      collectTitle: 'A Collect for Grace',
      collect: "O Lord, our heavenly Father, almighty and everlasting God, you have brought us in safety to this new day: Defend us by your mighty power, that we may fall into no sin, neither run into any kind of danger.",
      refrain: "In the morning my prayer comes before you; incline your ear to my cry.",
      refrainRef: 'Psalm 88:13'
    },
    noon: {
      title: 'Noonday Prayer',
      icon: 'sun',
      opening: "The Officiant begins",
      sentence: "O God, make speed to save us. O Lord, make haste to help us.",
      sentenceRef: 'Psalm 70:1',
      confessionRubric: "A pause is kept.",
      confession: "Blessed Savior, at this hour you hung upon the cross, stretching out your loving arms: Grant that all the peoples of the earth may look to you and be saved.",
      versicle: [{
        by: 'Officiant',
        text: 'Let the words of my mouth be acceptable.'
      }, {
        by: 'People',
        text: 'And the meditation of my heart, O Lord.',
        response: true
      }],
      invitatoryCap: 'B',
      invitatory: "lessed are they who dwell in your house; they will always be praising you. Blessed are those whose strength is in you, whose hearts are set on the pilgrims' way.",
      lessonRef: 'Psalm 84:4–5',
      lesson: "For a day in your courts is better than a thousand elsewhere. I would rather stand at the threshold of the house of my God than dwell in the tents of the wicked.",
      collectTitle: 'A Collect for the Renewal of Life',
      collect: "Lord, in the middle of my everyday life of jobs and commitments, it is easy to forget that you have called me to partner in your great work of salvation. I remind myself of that reality now.",
      refrain: "At noon I cry out in my distress, and the Lord hears my voice.",
      refrainRef: 'Psalm 55:17'
    },
    evening: {
      title: 'Evening Prayer',
      icon: 'moon',
      opening: "The Officiant begins the service",
      sentence: "Let my prayer be set forth in your sight as incense, the lifting up of my hands as the evening sacrifice.",
      sentenceRef: 'Psalm 141:2',
      confessionRubric: "The following Confession of Sin may then be said.",
      confession: "Most merciful God, we confess that we have sinned against you in thought, word, and deed, by what we have done, and by what we have left undone. Have mercy on us and forgive us.",
      versicle: [{
        by: 'Officiant',
        text: 'O God, make speed to save us.'
      }, {
        by: 'People',
        text: 'O Lord, make haste to help us.',
        response: true
      }],
      invitatoryCap: 'O',
      invitatory: " gracious Light, pure brightness of the everliving Father in heaven: now as we come to the setting of the sun, and our eyes behold the vesper light, we sing your praises, O God.",
      lessonRef: 'Phos hilaron',
      lesson: "You are worthy at all times to be praised by happy voices, O Son of God, O Giver of life, and to be glorified through all the worlds.",
      collectTitle: 'A Collect for Peace',
      collect: "O God, from whom all holy desires, all good counsels, and all just works proceed: Give to your servants that peace which the world cannot give, that our hearts may be set to obey your commandments.",
      refrain: "Into your hands I commend my spirit; you have redeemed me, O Lord, O God of truth.",
      refrainRef: 'Psalm 31:5'
    }
  }
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/common-prayer/data.js", error: String((e && e.message) || e) }); }

// ui_kits/common-prayer/screens.jsx
try { (() => {
// Common Prayer — office reading screen. Composes the DS liturgy components.
const CP = window.CommonPrayerDesignSystem_91d70c;
const {
  SectionHeading,
  Rubric,
  IlluminatedInitial,
  Versicle,
  Scripture,
  Callout,
  OrnamentalDivider,
  Badge,
  Button
} = CP;
function OfficeScreen({
  office,
  day
}) {
  return /*#__PURE__*/React.createElement("article", {
    className: "cp-office"
  }, /*#__PURE__*/React.createElement("header", {
    className: "cp-office__masthead"
  }, /*#__PURE__*/React.createElement("p", {
    className: "cp-office__date"
  }, day.date), /*#__PURE__*/React.createElement("p", {
    className: "cp-office__season"
  }, day.season), /*#__PURE__*/React.createElement("div", {
    className: "cp-office__tags"
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "sage"
  }, day.proper), /*#__PURE__*/React.createElement(Badge, null, "Ordinary Time"))), /*#__PURE__*/React.createElement(OrnamentalDivider, {
    glyph: "fleuron"
  }), /*#__PURE__*/React.createElement(SectionHeading, {
    level: "display"
  }, office.title), /*#__PURE__*/React.createElement(Rubric, null, office.opening), /*#__PURE__*/React.createElement(Scripture, {
    cite: office.sentenceRef
  }, office.sentence), /*#__PURE__*/React.createElement(SectionHeading, null, "Confession of Sin"), /*#__PURE__*/React.createElement(Rubric, {
    variant: "sm"
  }, office.confessionRubric), /*#__PURE__*/React.createElement("p", {
    className: "cp-office__say"
  }, office.confession), /*#__PURE__*/React.createElement(SectionHeading, null, "The Invitatory"), /*#__PURE__*/React.createElement(Versicle, {
    lines: office.versicle
  }), /*#__PURE__*/React.createElement(IlluminatedInitial, {
    letter: office.invitatoryCap
  }, office.invitatory), /*#__PURE__*/React.createElement(SectionHeading, null, "The Lesson"), /*#__PURE__*/React.createElement(Scripture, {
    cite: office.lessonRef,
    variant: "illuminated"
  }, office.lesson), /*#__PURE__*/React.createElement(SectionHeading, null, "The Collect"), /*#__PURE__*/React.createElement(Callout, {
    variant: "prayer",
    title: office.collectTitle
  }, office.collect), /*#__PURE__*/React.createElement(Callout, {
    variant: "refrain",
    title: "Refrain"
  }, office.refrain, " ", /*#__PURE__*/React.createElement("span", {
    className: "cp-office__ref"
  }, office.refrainRef)), /*#__PURE__*/React.createElement(OrnamentalDivider, {
    glyph: "cross"
  }), /*#__PURE__*/React.createElement("div", {
    className: "cp-office__amen"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "gilt",
    size: "lg"
  }, "Amen")));
}
function MoreScreen({
  theme,
  onTheme,
  size,
  onSize
}) {
  const {
    Card,
    Field,
    Icon,
    TypeScale
  } = CP;
  const items = [{
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
    icon: 'feather',
    label: 'Prayer journal',
    meta: ''
  }, {
    icon: 'bell',
    label: 'Reminders',
    meta: 'Off'
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "cp-more"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    level: "display"
  }, "More"), /*#__PURE__*/React.createElement(Card, {
    title: "Appearance",
    eyebrow: "Settings"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cp-toggle"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cp-toggle__opt"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "moon",
    size: "1.1rem"
  }), /*#__PURE__*/React.createElement("span", null, "Night office")), /*#__PURE__*/React.createElement("div", {
    className: "cp-seg"
  }, /*#__PURE__*/React.createElement("button", {
    className: theme === 'dark' ? 'is-on' : '',
    onClick: () => onTheme('dark')
  }, "Dark"), /*#__PURE__*/React.createElement("button", {
    className: theme === 'light' ? 'is-on' : '',
    onClick: () => onTheme('light')
  }, "Light"))), /*#__PURE__*/React.createElement("div", {
    className: "cp-toggle",
    style: {
      marginTop: 'var(--space-4)',
      paddingTop: 'var(--space-4)',
      borderTop: 'var(--border-hair) solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "cp-toggle__opt"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "type",
    size: "1.1rem"
  }), /*#__PURE__*/React.createElement("span", null, "Text size")), /*#__PURE__*/React.createElement(TypeScale, {
    value: size,
    onChange: onSize
  }))), /*#__PURE__*/React.createElement("nav", {
    className: "cp-list"
  }, items.map(it => /*#__PURE__*/React.createElement("button", {
    key: it.label,
    className: "cp-list__row"
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
Object.assign(window, {
  OfficeScreen,
  MoreScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/common-prayer/screens.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.READING_SCALES = __ds_scope.READING_SCALES;

__ds_ns.TypeScale = __ds_scope.TypeScale;

__ds_ns.Callout = __ds_scope.Callout;

__ds_ns.IlluminatedInitial = __ds_scope.IlluminatedInitial;

__ds_ns.OrnamentalDivider = __ds_scope.OrnamentalDivider;

__ds_ns.Rubric = __ds_scope.Rubric;

__ds_ns.Scripture = __ds_scope.Scripture;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.Versicle = __ds_scope.Versicle;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
