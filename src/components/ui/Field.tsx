import { useId } from 'react'
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

interface FieldBaseProps {
  label?: string
  help?: string
  error?: string
  required?: boolean
  multiline?: boolean
  rows?: number
  id?: string
  className?: string
}

type FieldProps = FieldBaseProps &
  (InputHTMLAttributes<HTMLInputElement> | TextareaHTMLAttributes<HTMLTextAreaElement>)

export default function Field({
  label,
  help,
  error,
  required = false,
  multiline = false,
  rows = 3,
  id,
  className,
  ...rest
}: FieldProps) {
  const generatedId = useId()
  const fieldId = id ?? generatedId
  const helpText = error ?? help
  const isInvalid = Boolean(error)

  const controlClasses = [
    'w-full font-serif text-base leading-[1.5] text-ink',
    'bg-surface-sunk border border-border rounded-[4px]',
    'px-[0.9rem] py-[0.65rem]',
    'placeholder:text-ink-subtle placeholder:italic',
    'hover:border-border-strong',
    'focus:outline-none focus:border-accent focus:[box-shadow:var(--focus-ring)]',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'transition-[border-color,box-shadow] duration-[120ms]',
    isInvalid ? 'border-accent' : '',
    multiline ? 'resize-y min-h-[5.5rem]' : '',
  ].filter(Boolean).join(' ')

  return (
    <label
      htmlFor={fieldId}
      className={[
        'flex flex-col gap-2 font-serif',
        isInvalid ? 'cp-field--invalid' : '',
        className ?? '',
      ].filter(Boolean).join(' ')}
    >
      {label && (
        <span className="font-sans text-xs uppercase tracking-caps text-ink-muted">
          {label}
          {required && <span className="text-accent ml-[0.15em]">*</span>}
        </span>
      )}

      {multiline ? (
        <textarea
          id={fieldId}
          rows={rows}
          className={controlClasses}
          aria-invalid={isInvalid || undefined}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={fieldId}
          className={controlClasses}
          aria-invalid={isInvalid || undefined}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}

      {helpText && (
        <span className={['text-xs', isInvalid ? 'text-accent' : 'text-ink-subtle'].join(' ')}>
          {helpText}
        </span>
      )}
    </label>
  )
}
