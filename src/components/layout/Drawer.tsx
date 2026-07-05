import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface DrawerProps {
  open: boolean
  onClose: () => void
}

const navLinks: { to: string; label: string; icon: string }[] = [
  { to: '/prayer-list',          label: 'Prayer List',              icon: '🙏' },
  { to: '/psalter',              label: 'Psalter',                  icon: '📖' },
  { to: '/daily-readings',       label: 'Daily Readings',           icon: '📅' },
  { to: '/prayers',              label: 'Prayers & Thanksgivings',  icon: '✝️' },
  { to: '/favorites',            label: 'Favorites',                icon: '★' },
  { to: '/reminders',            label: 'Reminders',                icon: '🔔' },
  { to: '/settings',             label: 'Settings',                 icon: '⚙️' },
  { to: '/about',                label: 'About',                    icon: 'ℹ️' },
]

export default function Drawer({ open, onClose }: DrawerProps) {
  const location = useLocation()

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  // Close when location changes (user navigated)
  useEffect(() => {
    if (open) onClose()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  return (
    <>
      {/* Overlay */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={[
          'fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
      />

      {/* Drawer panel */}
      <nav
        aria-label="Site navigation"
        aria-hidden={!open}
        className={[
          'fixed top-0 left-0 bottom-0 z-50',
          'w-72 max-w-[85vw]',
          'flex flex-col',
          'bg-gray-900 shadow-2xl',
          'transition-transform duration-300 ease-out',
          open ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
      >
        {/* App name header */}
        <div className="flex items-center justify-between px-5 pt-safe-top pb-4 pt-10 border-b border-gray-800">
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-0.5">
              The
            </p>
            <h1 className="text-xl font-serif font-semibold text-gray-100 leading-tight">
              Common Prayer
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Book of Common Prayer, 1979
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close navigation"
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-200 hover:bg-gray-800 transition-colors"
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

        {/* Nav links */}
        <ul className="flex-1 overflow-y-auto py-3" role="list">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to
            return (
              <li key={link.to}>
                <Link
                  to={link.to}
                  aria-current={isActive ? 'page' : undefined}
                  className={[
                    'flex items-center gap-3 px-5 py-3 text-sm transition-colors',
                    isActive
                      ? 'text-white bg-gray-800 border-l-2 border-rubric dark:border-rubric-dark'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50 border-l-2 border-transparent',
                  ].join(' ')}
                >
                  <span className="text-base w-5 text-center" aria-hidden="true">
                    {link.icon}
                  </span>
                  <span>{link.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-800 pb-safe-bottom">
          <p className="text-xs text-gray-600 text-center">
            Common Prayer PWA
          </p>
        </div>
      </nav>
    </>
  )
}
