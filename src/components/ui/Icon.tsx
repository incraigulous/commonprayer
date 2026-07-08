import * as icons from 'lucide-react-native'
import type { LucideProps } from 'lucide-react-native'

const ICONS = {
  sunrise: icons.Sunrise,
  sun: icons.Sun,
  sunset: icons.Sunset,
  moon: icons.Moon,
  'moon-star': icons.MoonStar,
  menu: icons.Menu,
  home: icons.House,
  book: icons.Book,
  'book-open': icons.BookOpen,
  bookmark: icons.Bookmark,
  calendar: icons.Calendar,
  clock: icons.Clock,
  feather: icons.Feather,
  settings: icons.Settings,
  'chevron-left': icons.ChevronLeft,
  'chevron-right': icons.ChevronRight,
  'more-horizontal': icons.MoreHorizontal,
  x: icons.X,
  plus: icons.Plus,
  pencil: icons.Pencil,
  'share-2': icons.Share2,
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

export default function Icon({ name, size = 20, strokeWidth = 1.75, ...rest }: IconProps) {
  const Lucide = ICONS[name]
  return <Lucide size={size} strokeWidth={strokeWidth} {...rest} />
}
