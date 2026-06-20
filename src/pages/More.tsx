import { useAuth } from '../lib/auth-context'

export default function More() {
  const { user, signOut } = useAuth()

  return (
    <div className="flex-1 px-4 py-6">
      <p className="eyebrow mb-2">Settings</p>
      <h1 className="font-display text-2xl font-bold tracking-tight mb-6">More</h1>

      <div className="rounded-2xl border border-border bg-surface p-6 mb-4">
        <p className="eyebrow mb-3">Account</p>
        <p className="text-sm text-text-muted">{user?.email}</p>
      </div>

      <button
        onClick={signOut}
        className="w-full rounded-xl border border-border py-3 text-sm text-text-muted hover:text-alert transition-colors"
      >
        Sign Out
      </button>
    </div>
  )
}
