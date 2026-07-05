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
export function Field({
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
  return (
    <label className={cx('cp-field', error && 'cp-field--invalid', className)} htmlFor={fieldId}>
      {label && (
        <span className="cp-field__label">
          {label}{required && <span className="cp-field__req">*</span>}
        </span>
      )}
      <Control
        id={fieldId}
        className="cp-field__control"
        aria-invalid={error ? 'true' : undefined}
        {...(multiline ? { rows } : {})}
        {...rest}
      />
      {helpText && <span className="cp-field__help">{helpText}</span>}
    </label>
  );
}
