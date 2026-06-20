import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../lib/auth-context'

export default function SignUp() {
  const { signUp } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }
    setLoading(true)
    const { error } = await signUp(email, password)
    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
    }
    setLoading(false)
  }

  if (success) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm text-center">
          <h1 className="font-display text-3xl font-bold tracking-tight text-text mb-2">
            Check your email
          </h1>
          <p className="text-text-muted text-sm">
            We've sent a confirmation link to <strong className="text-text">{email}</strong>.
          </p>
          <Link to="/sign-in" className="mt-6 inline-block text-green text-sm hover:underline">
            Back to sign in
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-3xl font-bold tracking-tight text-text mb-1">
          CoachFlow
        </h1>
        <p className="eyebrow mb-8">Create Athlete Account</p>

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
            placeholder="Password (8+ characters)"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="rounded-xl border border-border bg-surface px-4 py-3 text-text placeholder:text-text-dim outline-none focus:border-green"
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            required
            className="rounded-xl border border-border bg-surface px-4 py-3 text-text placeholder:text-text-dim outline-none focus:border-green"
          />

          {error && <p className="text-alert text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-green py-3 font-semibold text-bg transition-opacity disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-text-muted">
          Already have an account?{' '}
          <Link to="/sign-in" className="text-green hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
