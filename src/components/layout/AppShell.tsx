import React, { useState } from 'react'
import Drawer from '@/components/layout/Drawer'
import TabBar from '@/components/layout/TabBar'
import Icon from '@/components/ui/Icon'

type Tab = 'morning' | 'noon' | 'evening' | 'more'

interface AppShellProps {
  title: string
  showTabs?: boolean
  activeTab?: Tab
  onTabChange?: (tab: Tab) => void
  children: React.ReactNode
  rightAction?: React.ReactNode
}

export default function AppShell({
  title,
  showTabs = false,
  activeTab = 'morning',
  onTabChange,
  children,
  rightAction,
}: AppShellProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className="min-h-dvh flex flex-col bg-bg text-ink">
      {/* Drawer */}
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* Header */}
      <header className="sticky top-0 z-30 flex items-center bg-surface border-b border-border shadow-sm">
        {/* Hamburger */}
        <button
          onClick={() => setDrawerOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={drawerOpen}
          aria-controls="site-nav"
          className="p-3 text-ink-muted hover:text-ink hover:bg-surface-hover transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
        >
          <Icon name="menu" size="1.5rem" />
        </button>

        {/* Centered title */}
        <div className="flex-1 flex justify-center">
          <h1 className="text-base font-display font-semibold text-ink tracking-wide truncate max-w-xs">
            {title}
          </h1>
        </div>

        {/* Right action slot — same width as hamburger so title stays centered */}
        <div className="w-12 flex justify-center">
          {rightAction ?? null}
        </div>
      </header>

      {/* Tab bar — only on main prayer pages */}
      {showTabs && (
        <TabBar
          active={activeTab}
          onSelect={(tab) => onTabChange?.(tab)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
