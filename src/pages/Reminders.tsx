import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Toggle from '@/components/ui/Toggle'

interface Reminder {
  id: string
  office: 'morning' | 'noon' | 'evening' | 'compline'
  time: string
  enabled: boolean
}

const OFFICES = [
  { key: 'morning' as const, label: 'Morning Prayer', defaultTime: '07:00' },
  { key: 'noon' as const, label: 'Noonday Prayer', defaultTime: '12:00' },
  { key: 'evening' as const, label: 'Evening Prayer', defaultTime: '18:00' },
  { key: 'compline' as const, label: 'Compline', defaultTime: '21:00' },
]

const STORAGE_KEY = 'cp_reminders'

function load(): Reminder[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
  } catch {
    return []
  }
}

function save(reminders: Reminder[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders))
}

export default function Reminders() {
  const navigate = useNavigate()
  const [reminders, setReminders] = useState<Reminder[]>(load)
  const [permissionState, setPermissionState] = useState<NotificationPermission>(
    () => ('Notification' in window ? Notification.permission : 'default')
  )

  async function requestPermission() {
    if ('Notification' in window) {
      const perm = await Notification.requestPermission()
      setPermissionState(perm)
    }
  }

  function toggle(office: Reminder['office']) {
    const existing = reminders.find((r) => r.office === office)
    let next: Reminder[]
    if (existing) {
      next = reminders.map((r) =>
        r.office === office ? { ...r, enabled: !r.enabled } : r
      )
    } else {
      const defaultTime = OFFICES.find((o) => o.key === office)?.defaultTime ?? '08:00'
      next = [
        ...reminders,
        { id: crypto.randomUUID(), office, time: defaultTime, enabled: true },
      ]
    }
    setReminders(next)
    save(next)
  }

  function updateTime(office: Reminder['office'], time: string) {
    const next = reminders.map((r) => (r.office === office ? { ...r, time } : r))
    setReminders(next)
    save(next)
  }

  return (
    <div className="min-h-dvh bg-gray-950">
      <header className="flex items-center gap-4 px-4 py-4 border-b border-gray-800">
        <button onClick={() => navigate(-1)} className="text-blue-400 text-lg p-2 -ml-2">←</button>
        <h1 className="text-lg font-semibold text-gray-100">Reminders</h1>
      </header>

      <div className="px-4 py-6 max-w-lg mx-auto">
        {permissionState === 'default' && (
          <div className="bg-blue-900/30 border border-blue-700 rounded-xl px-4 py-4 mb-6">
            <p className="text-blue-200 text-sm mb-3">
              Enable notifications to receive daily reminders to pray.
            </p>
            <button
              onClick={requestPermission}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              Enable Notifications
            </button>
          </div>
        )}

        <div className="space-y-3">
          {OFFICES.map((office) => {
            const reminder = reminders.find((r) => r.office === office.key)
            const enabled = reminder?.enabled ?? false
            const time = reminder?.time ?? office.defaultTime
            return (
              <div key={office.key} className="bg-gray-900 rounded-xl px-4 py-4">
                <Toggle
                  id={`reminder-${office.key}`}
                  checked={enabled}
                  onChange={() => toggle(office.key)}
                  label={office.label}
                />
                {enabled && (
                  <div className="mt-3 flex items-center gap-2">
                    <label className="text-sm text-gray-400">Time:</label>
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => updateTime(office.key, e.target.value)}
                      className="bg-gray-800 text-gray-200 rounded px-2 py-1 text-sm border border-gray-700"
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <p className="text-gray-600 text-xs text-center mt-6">
          Reminders use your browser's notification system. They work when the app is installed to your home screen.
        </p>
      </div>
    </div>
  )
}
