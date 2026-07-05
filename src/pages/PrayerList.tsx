import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserData } from '@/store/userdata'
import Icon from '@/components/ui/Icon'

export default function PrayerList() {
  const navigate = useNavigate()
  const { prayerItems, loaded, load, addPrayerItem, removePrayerItem } = useUserData()
  const [text, setText] = useState('')
  const [adding, setAdding] = useState(false)

  useEffect(() => { load() }, [load])

  async function handleAdd() {
    const trimmed = text.trim()
    if (!trimmed) return
    try {
      await addPrayerItem(trimmed)
      setText('')
      setAdding(false)
    } catch {
      // IDB write failed — keep the form open so the user can try again
    }
  }

  return (
    <div className="min-h-dvh bg-bg">
      <header className="flex items-center gap-4 px-4 py-4 border-b border-border">
        <button onClick={() => navigate(-1)} className="text-accent p-2 -ml-2">
          <Icon name="chevron-left" size="1.25rem" />
        </button>
        <h1 className="text-lg font-display font-semibold text-ink">Prayer List</h1>
        <button
          onClick={() => setAdding(true)}
          className="ml-auto text-accent font-medium"
        >
          Add
        </button>
      </header>

      <div className="px-4 py-6 max-w-lg mx-auto">
        <p className="text-ink-muted text-sm mb-6">
          Your prayer intentions will appear during the Daily Office under Prayers &amp; Thanksgivings.
        </p>

        {adding && (
          <div className="bg-surface rounded-xl p-4 mb-4">
            <textarea
              autoFocus
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter a prayer intention..."
              className="w-full bg-transparent text-ink placeholder-ink-subtle resize-none outline-none text-base"
              rows={3}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleAdd()
                }
              }}
            />
            <div className="flex gap-3 mt-3 justify-end">
              <button onClick={() => { setAdding(false); setText('') }} className="text-ink-muted px-4 py-2">
                Cancel
              </button>
              <button
                onClick={handleAdd}
                disabled={!text.trim()}
                className="bg-accent disabled:opacity-40 text-white px-4 py-2 rounded-lg font-medium"
              >
                Add
              </button>
            </div>
          </div>
        )}

        {!loaded && <p className="text-ink-subtle text-center py-8">Loading…</p>}

        {loaded && prayerItems.length === 0 && !adding && (
          <div className="text-center py-12">
            <p className="text-ink-subtle">No prayer intentions yet.</p>
            <button onClick={() => setAdding(true)} className="mt-4 text-accent">Add one</button>
          </div>
        )}

        <ul className="space-y-2">
          {prayerItems.map((item) => (
            <li
              key={item.id}
              className="flex items-start gap-3 bg-surface rounded-xl px-4 py-3 group"
            >
              <span className="flex-1 text-ink">{item.text}</span>
              <button
                onClick={() => removePrayerItem(item.id)}
                className="text-ink-subtle hover:text-red-600 dark:hover:text-red-400 transition-colors mt-0.5 opacity-0 group-hover:opacity-100 text-lg leading-none"
                aria-label="Remove"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
