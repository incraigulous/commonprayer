import { Routes, Route, Navigate } from 'react-router-dom'
import { useSettings } from '@/store/settings'
import { useTheme } from '@/hooks/useTheme'
import Onboarding from '@/pages/Onboarding'
import MorningPrayer from '@/pages/MorningPrayer'
import NoonPrayer from '@/pages/NoonPrayer'
import EveningPrayer from '@/pages/EveningPrayer'
import MoreLiturgies from '@/pages/MoreLiturgies'
import PrayerList from '@/pages/PrayerList'
import Psalter from '@/pages/Psalter'
import PsalmDetail from '@/pages/PsalmDetail'
import DailyReadings from '@/pages/DailyReadings'
import PrayersThanksgivings from '@/pages/PrayersThanksgivings'
import Favorites from '@/pages/Favorites'
import Reminders from '@/pages/Reminders'
import SettingsPage from '@/pages/Settings'
import About from '@/pages/About'
import { getDefaultOffice } from '@/liturgy/calendar'

function DefaultRedirect() {
  const office = getDefaultOffice(new Date())
  return <Navigate to={`/${office}`} replace />
}

export default function App() {
  const { settings } = useSettings()
  useTheme(settings.theme)

  if (!settings.hasCompletedOnboarding) {
    return <Onboarding />
  }

  return (
    <div className="min-h-dvh bg-bg">
      <Routes>
        <Route path="/" element={<DefaultRedirect />} />
        <Route path="/morning" element={<MorningPrayer />} />
        <Route path="/noon" element={<NoonPrayer />} />
        <Route path="/evening" element={<EveningPrayer />} />
        <Route path="/compline" element={<EveningPrayer office="compline" />} />
        <Route path="/more" element={<MoreLiturgies />} />
        <Route path="/prayer-list" element={<PrayerList />} />
        <Route path="/psalter" element={<Psalter />} />
        <Route path="/psalter/:num" element={<PsalmDetail />} />
        <Route path="/daily-readings" element={<DailyReadings />} />
        <Route path="/prayers" element={<PrayersThanksgivings />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/reminders" element={<Reminders />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<DefaultRedirect />} />
      </Routes>
    </div>
  )
}
