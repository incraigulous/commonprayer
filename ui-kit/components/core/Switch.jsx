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
export function Switch({
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
  return (
    <label className={cx('cp-switch', disabled && 'cp-switch--disabled', className)} htmlFor={fieldId}>
      {(label || help) && (
        <span className="cp-switch__text">
          {label && <span className="cp-switch__label">{label}</span>}
          {help && <span className="cp-switch__help">{help}</span>}
        </span>
      )}
      <input
        type="checkbox" role="switch" id={fieldId}
        checked={checked} disabled={disabled}
        onChange={(e) => onChange && onChange(e.target.checked, e)}
        {...rest}
      />
      <span className="cp-switch__track">
        <span className="cp-switch__thumb">{glyph ? <span className="cp-switch__ico">{glyph}</span> : null}</span>
      </span>
    </label>
  );
}
