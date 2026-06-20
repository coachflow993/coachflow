import { useAuth } from '../lib/auth-context'

export default function Today() {
  const { user, signOut } = useAuth()

  return (
    <div className="flex-1 px-4 py-6">
      <p className="eyebrow mb-2">Dashboard</p>
      <h1 className="font-display text-2xl font-bold tracking-tight mb-6">Today</h1>

      <div className="rounded-2xl border border-border bg-surface p-6 mb-4">
        <p className="eyebrow mb-3">Your Profile</p>
        <p className="text-sm text-text-muted">{user?.email}</p>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-6 mb-4">
        <p className="eyebrow mb-3">Upcoming</p>
        <p className="text-sm text-text-muted">No sessions or matches scheduled yet.</p>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-6">
        <p className="eyebrow mb-3">Quick Stats</p>
        <div className="flex gap-4">
          <div className="flex-1 text-center">
            <p className="font-mono text-2xl font-bold text-green">0</p>
            <p className="text-xs text-text-dim mt-1">Matches</p>
          </div>
          <div className="flex-1 text-center">
            <p className="font-mono text-2xl font-bold text-orange">0</p>
            <p className="text-xs text-text-dim mt-1">Sessions</p>
          </div>
          <div className="flex-1 text-center">
            <p className="font-mono text-2xl font-bold text-text">0</p>
            <p className="text-xs text-text-dim mt-1">Goals</p>
          </div>
        </div>
      </div>

      <button
        onClick={signOut}
        className="mt-8 w-full rounded-xl border border-border py-3 text-sm text-text-muted hover:text-alert transition-colors"
      >
        Sign Out
      </button>
    </div>
  )
}
