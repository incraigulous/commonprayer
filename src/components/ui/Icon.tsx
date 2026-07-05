import * as icons from 'lucide-react'
import type { LucideProps } from 'lucide-react'

// Common office icons — extend as needed. Kept as an explicit map (rather
// than dynamic PascalCase lookup) so unused icons tree-shake out of the bundle.
const ICONS = {
  sunrise: icons.Sunrise,
  sun: icons.Sun,
  moon: icons.Moon,
  menu: icons.Menu,
  'book-open': icons.BookOpen,
  bookmark: icons.Bookmark,
  calendar: icons.Calendar,
  feather: icons.Feather,
  settings: icons.Settings,
  'chevron-left': icons.ChevronLeft,
  'chevron-right': icons.ChevronRight,
  'more-horizontal': icons.MoreHorizontal,
  x: icons.X,
  heart: icons.Heart,
  'hand-heart': icons.HandHeart,
  bell: icons.Bell,
  cross: icons.Cross,
  star: icons.Star,
  info: icons.Info,
  check: icons.Check,
} satisfies Record<string, React.ComponentType<LucideProps>>

export type IconName = keyof typeof ICONS

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: IconName
}

// Line-art icon (Lucide, bundled — not CDN-loaded, for offline reliability).
export default function Icon({ name, size = '1.25rem', strokeWidth = 1.75, ...rest }: IconProps) {
  const Lucide = ICONS[name]
  return <Lucide size={size} strokeWidth={strokeWidth} aria-hidden="true" {...rest} />
}
