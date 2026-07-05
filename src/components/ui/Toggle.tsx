interface ToggleProps {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
  id: string
  description?: string
}

export default function Toggle({ checked, onChange, label, id, description }: ToggleProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-1">
      <label htmlFor={id} className="select-none cursor-pointer">
        <span className="text-sm text-ink">{label}</span>
        {description && (
          <span className="block text-xs text-ink-muted mt-0.5">{description}</span>
        )}
      </label>

      {/* Track */}
      <button
        id={id}
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={[
          'relative inline-flex flex-shrink-0 items-center',
          'h-7 w-12 rounded-full',
          'transition-colors duration-200 ease-in-out',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
          checked ? 'bg-accent' : 'bg-border-strong',
        ].join(' ')}
      >
        {/* Thumb */}
        <span
          aria-hidden="true"
          className={[
            'pointer-events-none inline-block',
            'h-5 w-5 rounded-full bg-white shadow-md',
            'transform transition-transform duration-200 ease-in-out',
            checked ? 'translate-x-6' : 'translate-x-1',
          ].join(' ')}
        />
      </button>
    </div>
  )
}
