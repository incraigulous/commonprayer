import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserData } from '@/store/userdata'

export default function Favorites() {
  const navigate = useNavigate()
  const { favorites, loaded, load, removeFavorite } = useUserData()

  useEffect(() => { load() }, [load])

  return (
    <div className="min-h-dvh bg-gray-950">
      <header className="flex items-center gap-4 px-4 py-4 border-b border-gray-800">
        <button onClick={() => navigate(-1)} className="text-blue-400 text-lg p-2 -ml-2">←</button>
        <h1 className="text-lg font-semibold text-gray-100">Favorites</h1>
      </header>

      <div className="px-4 py-6 max-w-lg mx-auto">
        {!loaded && <p className="text-gray-500 text-center py-8">Loading…</p>}

        {loaded && favorites.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No favorites yet.</p>
            <p className="text-gray-600 text-sm mt-2">
              Long-press any prayer text to save it here.
            </p>
          </div>
        )}

        <ul className="space-y-3">
          {favorites.map((fav) => (
            <li key={fav.id} className="bg-gray-900 rounded-xl px-4 py-4 group">
              <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">{fav.liturgy}</div>
              <p className="text-gray-200 font-serif leading-relaxed">{fav.text}</p>
              <button
                onClick={() => removeFavorite(fav.id)}
                className="mt-2 text-xs text-gray-600 hover:text-red-400 transition-colors"
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
