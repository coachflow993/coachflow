import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/auth-context'
import { fetchMatches, createMatch, type Match, type MatchInsert } from '../lib/matches'
import MatchForm from '../components/MatchForm'

export default function Matches() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    loadMatches()
  }, [])

  async function loadMatches() {
    try {
      const data = await fetchMatches()
      setMatches(data)
    } catch (err) {
      console.error('Failed to load matches', err)
    } finally {
      setLoading(false)
    }
  }

  async function handleCreate(data: MatchInsert) {
    await createMatch(data)
    setShowForm(false)
    await loadMatches()
  }

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="eyebrow animate-pulse">Loading...</p>
      </div>
    )
  }

  if (showForm) {
    return (
      <div className="flex-1 px-4 py-6">
        <p className="eyebrow mb-2">New Match</p>
        <h1 className="font-display text-2xl font-bold tracking-tight mb-6">Log Match</h1>
        <MatchForm
          athleteId={user!.id}
          onSave={handleCreate}
          onCancel={() => setShowForm(false)}
        />
      </div>
    )
  }

  return (
    <div className="flex-1 px-4 py-6 relative">
      <p className="eyebrow mb-2">Match Day</p>
      <h1 className="font-display text-2xl font-bold tracking-tight mb-6">Matches</h1>

      {matches.length === 0 ? (
        <div className="rounded-2xl border border-border bg-surface p-6 text-center">
          <p className="text-text-muted text-sm">No matches yet. Tap + to log your first match.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {matches.map(match => (
            <button
              key={match.id}
              onClick={() => navigate(`/matches/${match.id}`)}
              className="rounded-2xl border border-border bg-surface p-4 text-left transition-colors hover:border-green/30"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-text-muted">
                  {new Date(match.match_date + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
                <span className="text-xs text-text-dim">{match.is_home ? 'Home' : 'Away'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-text">{match.opponent}</span>
                <span className="font-mono font-bold text-lg text-text">
                  {match.our_score}–{match.their_score}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-20 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-green shadow-lg text-bg text-2xl font-bold"
        aria-label="Add match"
      >
        +
      </button>
    </div>
  )
}
