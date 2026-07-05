import React, { useState } from 'react'
import Drawer from '@/components/layout/Drawer'
import TabBar from '@/components/layout/TabBar'

type Tab = 'morning' | 'noon' | 'evening' | 'more'

interface AppShellProps {
  title: string
  showTabs?: boolean
  activeTab?: Tab
  onTabChange?: (tab: string) => void
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
    <div className="min-h-dvh flex flex-col bg-gray-950 text-gray-100">
      {/* Drawer */}
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* Header */}
      <header className="sticky top-0 z-30 flex items-center bg-gray-900 border-b border-gray-800 shadow-sm">
        {/* Hamburger */}
        <button
          onClick={() => setDrawerOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={drawerOpen}
          aria-controls="site-nav"
          className="p-3 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500"
        >
          <HamburgerIcon />
        </button>

        {/* Centered title */}
        <div className="flex-1 flex justify-center">
          <h1 className="text-base font-serif font-semibold text-gray-100 tracking-wide truncate max-w-xs">
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

function HamburgerIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}
