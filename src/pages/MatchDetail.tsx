import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/auth-context'
import { fetchMatchById, updateMatch, deleteMatch, type Match, type MatchInsert } from '../lib/matches'
import MatchForm from '../components/MatchForm'

export default function MatchDetail() {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [match, setMatch] = useState<Match | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (id) {
      fetchMatchById(id).then(setMatch).catch(() => navigate('/matches')).finally(() => setLoading(false))
    }
  }, [id, navigate])

  async function handleUpdate(data: MatchInsert) {
    if (!id) return
    const updated = await updateMatch(id, data)
    setMatch(updated)
    setEditing(false)
  }

  async function handleDelete() {
    if (!id) return
    setDeleting(true)
    await deleteMatch(id)
    navigate('/matches')
  }

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="eyebrow animate-pulse">Loading...</p>
      </div>
    )
  }

  if (!match) return null

  if (editing) {
    return (
      <div className="flex-1 px-4 py-6">
        <p className="eyebrow mb-2">Edit</p>
        <h1 className="font-display text-2xl font-bold tracking-tight mb-6">Edit Match</h1>
        <MatchForm
          initial={match}
          athleteId={user!.id}
          onSave={handleUpdate}
          onCancel={() => setEditing(false)}
        />
      </div>
    )
  }

  return (
    <div className="flex-1 px-4 py-6">
      <button onClick={() => navigate('/matches')} className="text-sm text-text-muted mb-4 hover:text-green transition-colors">
        &larr; Back to matches
      </button>

      <div className="rounded-2xl border border-border bg-surface p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="eyebrow">{match.is_home ? 'Home' : 'Away'}</p>
          <p className="text-sm text-text-muted">
            {new Date(match.match_date + 'T00:00:00').toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
          </p>
        </div>

        <h2 className="font-display text-xl font-bold mb-1">vs {match.opponent}</h2>
        <p className="font-mono text-3xl font-bold text-text mb-4">
          {match.our_score}–{match.their_score}
        </p>

        <div className="grid grid-cols-2 gap-3 text-sm mb-4">
          {match.venue && (
            <div>
              <p className="text-text-dim">Venue</p>
              <p className="text-text">{match.venue}</p>
            </div>
          )}
          {match.my_position && (
            <div>
              <p className="text-text-dim">Position</p>
              <p className="text-text">{match.my_position}</p>
            </div>
          )}
          <div>
            <p className="text-text-dim">My Goals</p>
            <p className="font-mono font-bold text-green">{match.my_goals}</p>
          </div>
        </div>

        {match.notes && (
          <div className="border-t border-border pt-4 mt-4">
            <p className="eyebrow mb-2">Notes</p>
            <p className="text-sm text-text-muted whitespace-pre-wrap">{match.notes}</p>
          </div>
        )}
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={() => setEditing(true)}
          className="flex-1 rounded-xl border border-border py-3 text-sm font-medium text-text hover:border-green transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => { if (confirm('Delete this match?')) handleDelete() }}
          disabled={deleting}
          className="flex-1 rounded-xl border border-border py-3 text-sm font-medium text-alert hover:border-alert transition-colors disabled:opacity-50"
        >
          {deleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  )
}
