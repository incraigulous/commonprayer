import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useOverlayBehavior } from '@/hooks/useOverlayBehavior'
import Icon, { type IconName } from '@/components/ui/Icon'

interface DrawerProps {
  open: boolean
  onClose: () => void
}

const navLinks: { to: string; label: string; icon: IconName }[] = [
  { to: '/prayer-list',          label: 'Prayer List',              icon: 'hand-heart' },
  { to: '/psalter',              label: 'Psalter',                  icon: 'book-open' },
  { to: '/daily-readings',       label: 'Daily Readings',           icon: 'calendar' },
  { to: '/prayers',              label: 'Prayers & Thanksgivings',  icon: 'cross' },
  { to: '/favorites',            label: 'Favorites',                icon: 'star' },
  { to: '/reminders',            label: 'Reminders',                icon: 'bell' },
  { to: '/settings',             label: 'Settings',                 icon: 'settings' },
  { to: '/about',                label: 'About',                    icon: 'info' },
]

export default function Drawer({ open, onClose }: DrawerProps) {
  const location = useLocation()
  useOverlayBehavior(open, onClose)

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
        id="site-nav"
        aria-label="Site navigation"
        aria-hidden={!open}
        className={[
          'fixed top-0 left-0 bottom-0 z-50',
          'w-72 max-w-[85vw]',
          'flex flex-col',
          'bg-surface shadow-2xl',
          'transition-transform duration-300 ease-out',
          open ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
      >
        {/* App name header */}
        <div className="flex items-center justify-between px-5 pt-safe-top pb-4 pt-10 border-b border-border">
          <div>
            <p className="text-xs uppercase tracking-widest text-ink-subtle mb-0.5">
              The
            </p>
            <h1 className="text-xl font-display font-semibold text-ink leading-tight">
              Common Prayer
            </h1>
            <p className="text-xs text-ink-subtle mt-0.5">
              Book of Common Prayer, 1979
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close navigation"
            className="p-1.5 rounded-full text-ink-muted hover:text-ink hover:bg-surface-hover transition-colors"
          >
            <Icon name="x" size="1.25rem" />
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
                      ? 'text-ink bg-surface-hover border-l-2 border-accent'
                      : 'text-ink-muted hover:text-ink hover:bg-surface-hover/50 border-l-2 border-transparent',
                  ].join(' ')}
                >
                  <Icon name={link.icon} size="1.1rem" className={isActive ? 'text-accent' : undefined} />
                  <span>{link.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-border pb-safe-bottom">
          <p className="text-xs text-ink-subtle text-center">
            Common Prayer PWA
          </p>
        </div>
      </nav>
    </>
  )
}
