import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../lib/auth-context'

export default function SignIn() {
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await signIn(email, password)
    if (error) setError(error.message)
    setLoading(false)
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-3xl font-bold tracking-tight text-text mb-1">
          CoachFlow
        </h1>
        <p className="eyebrow mb-8">Athlete Sign In</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="rounded-xl border border-border bg-surface px-4 py-3 text-text placeholder:text-text-dim outline-none focus:border-green"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="rounded-xl border border-border bg-surface px-4 py-3 text-text placeholder:text-text-dim outline-none focus:border-green"
          />

          {error && <p className="text-alert text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-green py-3 font-semibold text-bg transition-opacity disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 flex flex-col gap-2 text-center text-sm text-text-muted">
          <Link to="/sign-up" className="hover:text-green transition-colors">
            Don't have an account? Sign up
          </Link>
          <Link to="/reset-password" className="hover:text-green transition-colors">
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  )
}
