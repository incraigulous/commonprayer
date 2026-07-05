import React from 'react'
import { useOverlayBehavior } from '@/hooks/useOverlayBehavior'
import Icon from '@/components/ui/Icon'

interface SheetProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
}

export default function Sheet({ open, onClose, children, title }: SheetProps) {
  useOverlayBehavior(open, onClose)

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={[
          'fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title ?? 'Sheet'}
        className={[
          'fixed bottom-0 left-0 right-0 z-50',
          'flex flex-col',
          'bg-surface',
          'rounded-t-2xl shadow-2xl',
          'max-h-[90dvh]',
          'transition-transform duration-300 ease-out',
          open ? 'translate-y-0' : 'translate-y-full',
        ].join(' ')}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-10 h-1 rounded-full bg-border-strong" />
        </div>

        {/* Title */}
        {title && (
          <div className="flex items-center justify-between px-5 pt-2 pb-3 flex-shrink-0 border-b border-border">
            <h2 className="text-lg font-display font-semibold text-ink">{title}</h2>
            <button
              onClick={onClose}
              aria-label="Close"
              className="p-1 rounded-full text-ink-muted hover:text-ink hover:bg-surface-hover transition-colors"
            >
              <Icon name="x" size="1.25rem" />
            </button>
          </div>
        )}

        {/* Content */}
        <div className="overflow-y-auto flex-1 px-5 py-4">{children}</div>
      </div>
    </>
  )
}
