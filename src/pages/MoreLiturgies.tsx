import { useNavigate } from 'react-router-dom'

const LITURGIES = [
  { key: 'compline', label: 'Compline', description: 'The office at the close of day' },
  { key: 'penitential', label: 'A Penitential Order', description: 'BCP pp. 319–321', comingSoon: true },
  { key: 'eucharist', label: 'Holy Eucharist', description: 'BCP pp. 322–395', comingSoon: true },
  { key: 'marriage', label: 'Celebration and Blessing of a Marriage', description: 'BCP pp. 422–432', comingSoon: true },
  { key: 'burial', label: 'Burial of the Dead', description: 'BCP pp. 469–507', comingSoon: true },
  { key: 'ministration', label: 'Ministration to the Sick', description: 'BCP pp. 453–461', comingSoon: true },
]

export default function MoreLiturgies() {
  const navigate = useNavigate()

  return (
    <div className="min-h-dvh bg-gray-950">
      <header className="flex items-center gap-4 px-4 py-4 border-b border-gray-800">
        <button onClick={() => navigate(-1)} className="text-blue-400 text-lg p-2 -ml-2">←</button>
        <h1 className="text-lg font-semibold text-gray-100">Other Liturgies</h1>
      </header>

      <div className="px-4 py-4 max-w-lg mx-auto space-y-2">
        {LITURGIES.map((l) => (
          <button
            key={l.key}
            disabled={l.comingSoon}
            onClick={() => l.comingSoon ? undefined : navigate(`/compline`)}
            className={`w-full text-left bg-gray-900 rounded-xl px-4 py-4 transition-colors ${
              l.comingSoon ? 'opacity-50' : 'hover:bg-gray-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-100 font-medium">{l.label}</div>
                <div className="text-sm text-gray-500 mt-0.5">{l.description}</div>
              </div>
              {l.comingSoon ? (
                <span className="text-xs bg-gray-700 text-gray-400 px-2 py-0.5 rounded-full">Soon</span>
              ) : (
                <span className="text-gray-500">›</span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
