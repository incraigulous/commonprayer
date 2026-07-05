import React from 'react'
import { useOverlayBehavior } from '@/hooks/useOverlayBehavior'

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
          'bg-gray-900 dark:bg-gray-900',
          'rounded-t-2xl shadow-2xl',
          'max-h-[90dvh]',
          'transition-transform duration-300 ease-out',
          open ? 'translate-y-0' : 'translate-y-full',
        ].join(' ')}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-10 h-1 rounded-full bg-gray-600" />
        </div>

        {/* Title */}
        {title && (
          <div className="flex items-center justify-between px-5 pt-2 pb-3 flex-shrink-0 border-b border-gray-800">
            <h2 className="text-lg font-semibold text-gray-100">{title}</h2>
            <button
              onClick={onClose}
              aria-label="Close"
              className="p-1 rounded-full text-gray-400 hover:text-gray-200 hover:bg-gray-800 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Content */}
        <div className="overflow-y-auto flex-1 px-5 py-4">{children}</div>
      </div>
    </>
  )
}
