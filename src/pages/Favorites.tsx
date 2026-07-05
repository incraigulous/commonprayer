import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserData } from '@/store/userdata'
import Icon from '@/components/ui/Icon'

export default function Favorites() {
  const navigate = useNavigate()
  const { favorites, loaded, load, removeFavorite } = useUserData()

  useEffect(() => { load() }, [load])

  return (
    <div className="min-h-dvh bg-bg">
      <header className="flex items-center gap-4 px-4 py-4 border-b border-border">
        <button onClick={() => navigate(-1)} className="text-accent p-2 -ml-2">
          <Icon name="chevron-left" size="1.25rem" />
        </button>
        <h1 className="text-lg font-display font-semibold text-ink">Favorites</h1>
      </header>

      <div className="px-4 py-6 max-w-lg mx-auto">
        {!loaded && <p className="text-ink-subtle text-center py-8">Loading…</p>}

        {loaded && favorites.length === 0 && (
          <div className="text-center py-12">
            <p className="text-ink-subtle">No favorites yet.</p>
            <p className="text-ink-subtle text-sm mt-2">
              Long-press any prayer text to save it here.
            </p>
          </div>
        )}

        <ul className="space-y-3">
          {favorites.map((fav) => (
            <li key={fav.id} className="bg-surface rounded-xl px-4 py-4 group">
              <div className="text-xs text-ink-subtle uppercase tracking-caps mb-1">{fav.liturgy}</div>
              <p className="text-ink font-serif leading-relaxed">{fav.text}</p>
              <button
                onClick={() => removeFavorite(fav.id)}
                className="mt-2 text-xs text-ink-subtle hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
