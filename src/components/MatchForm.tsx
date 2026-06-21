import { useState, type FormEvent } from 'react'
import type { Match, MatchInsert } from '../lib/matches'

type Props = {
  initial?: Match
  athleteId: string
  onSave: (data: MatchInsert) => Promise<void>
  onCancel: () => void
}

export default function MatchForm({ initial, athleteId, onSave, onCancel }: Props) {
  const today = new Date().toISOString().split('T')[0]
  const [matchDate, setMatchDate] = useState(initial?.match_date ?? today)
  const [opponent, setOpponent] = useState(initial?.opponent ?? '')
  const [venue, setVenue] = useState(initial?.venue ?? '')
  const [isHome, setIsHome] = useState(initial?.is_home ?? true)
  const [ourScore, setOurScore] = useState(initial?.our_score ?? 0)
  const [theirScore, setTheirScore] = useState(initial?.their_score ?? 0)
  const [myPosition, setMyPosition] = useState(initial?.my_position ?? '')
  const [myGoals, setMyGoals] = useState(initial?.my_goals ?? 0)
  const [notes, setNotes] = useState(initial?.notes ?? '')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!opponent.trim()) { setError('Opponent is required'); return }
    if (matchDate > today) { setError('Match date cannot be in the future'); return }
    setError('')
    setLoading(true)
    try {
      await onSave({
        athlete_id: athleteId,
        match_date: matchDate,
        opponent: opponent.trim(),
        venue: venue.trim() || null,
        is_home: isHome,
        our_score: ourScore,
        their_score: theirScore,
        my_position: myPosition.trim() || null,
        my_goals: myGoals,
        notes: notes.trim() || null,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save')
      setLoading(false)
    }
  }

  const inputClass = 'rounded-xl border border-border bg-surface px-4 py-3 text-text placeholder:text-text-dim outline-none focus:border-green w-full'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="eyebrow block mb-1">Date *</label>
        <input type="date" value={matchDate} max={today} onChange={e => setMatchDate(e.target.value)} required className={inputClass} />
      </div>

      <div>
        <label className="eyebrow block mb-1">Opponent *</label>
        <input type="text" placeholder="e.g. Hackney FC" value={opponent} onChange={e => setOpponent(e.target.value)} required className={inputClass} />
      </div>

      <div>
        <label className="eyebrow block mb-1">Venue</label>
        <input type="text" placeholder="e.g. Victoria Park" value={venue} onChange={e => setVenue(e.target.value)} className={inputClass} />
      </div>

      <div>
        <label className="eyebrow block mb-1">Home / Away</label>
        <div className="flex gap-2">
          <button type="button" onClick={() => setIsHome(true)} className={`flex-1 rounded-xl py-2 text-sm font-medium border ${isHome ? 'border-green text-green' : 'border-border text-text-dim'}`}>Home</button>
          <button type="button" onClick={() => setIsHome(false)} className={`flex-1 rounded-xl py-2 text-sm font-medium border ${!isHome ? 'border-green text-green' : 'border-border text-text-dim'}`}>Away</button>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <label className="eyebrow block mb-1">Our Score</label>
          <input type="number" min={0} value={ourScore} onChange={e => setOurScore(Number(e.target.value))} className={inputClass} />
        </div>
        <div className="flex-1">
          <label className="eyebrow block mb-1">Their Score</label>
          <input type="number" min={0} value={theirScore} onChange={e => setTheirScore(Number(e.target.value))} className={inputClass} />
        </div>
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <label className="eyebrow block mb-1">My Position</label>
          <input type="text" placeholder="e.g. CM" value={myPosition} onChange={e => setMyPosition(e.target.value)} className={inputClass} />
        </div>
        <div className="flex-1">
          <label className="eyebrow block mb-1">My Goals</label>
          <input type="number" min={0} value={myGoals} onChange={e => setMyGoals(Number(e.target.value))} className={inputClass} />
        </div>
      </div>

      <div>
        <label className="eyebrow block mb-1">Notes</label>
        <textarea rows={3} placeholder="Post-match reflections..." value={notes} onChange={e => setNotes(e.target.value)} className={inputClass + ' resize-none'} />
      </div>

      {error && <p className="text-alert text-sm">{error}</p>}

      <div className="flex gap-3">
        <button type="button" onClick={onCancel} className="flex-1 rounded-xl border border-border py-3 text-sm text-text-muted">
          Cancel
        </button>
        <button type="submit" disabled={loading} className="flex-1 rounded-xl bg-green py-3 font-semibold text-bg disabled:opacity-50">
          {loading ? 'Saving...' : 'Save Match'}
        </button>
      </div>
    </form>
  )
}
