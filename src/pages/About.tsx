import { useNavigate } from 'react-router-dom'

export default function About() {
  const navigate = useNavigate()

  return (
    <div className="min-h-dvh bg-gray-950">
      <header className="flex items-center gap-4 px-4 py-4 border-b border-gray-800">
        <button onClick={() => navigate(-1)} className="text-blue-400 text-lg p-2 -ml-2">←</button>
        <h1 className="text-lg font-semibold text-gray-100">About</h1>
      </header>

      <div className="px-6 py-8 max-w-lg mx-auto">
        <h2 className="text-2xl font-serif text-gray-100 mb-1">Via Media</h2>
        <p className="text-gray-400 text-sm mb-6">Daily prayer from the 1979 Book of Common Prayer</p>

        <div className="prose prose-invert prose-sm max-w-none space-y-4 text-gray-300 leading-relaxed">
          <p>
            Via Media ("the middle way") is a nonprofit organization dedicated to making the rich tradition of Anglican daily prayer accessible to all Christians.
          </p>
          <p>
            This app provides the Daily Office from the 1979 Book of Common Prayer — Morning Prayer, Noonday Prayer, Evening Prayer, and Compline — along with the Psalter and lectionary readings.
          </p>
          <p>
            The Book of Common Prayer (1979) is in the public domain and is the primary prayer book of The Episcopal Church.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-800">
          <p className="text-gray-600 text-xs text-center">
            Via Media · Version 0.1.0
          </p>
        </div>
      </div>
    </div>
  )
}
