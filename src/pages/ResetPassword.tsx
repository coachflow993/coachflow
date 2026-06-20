import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../lib/auth-context'

export default function ResetPassword() {
  const { resetPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await resetPassword(email)
    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  if (sent) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm text-center">
          <h1 className="font-display text-3xl font-bold tracking-tight text-text mb-2">
            Reset link sent
          </h1>
          <p className="text-text-muted text-sm">
            Check <strong className="text-text">{email}</strong> for a password reset link.
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
        <p className="eyebrow mb-8">Reset Password</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="rounded-xl border border-border bg-surface px-4 py-3 text-text placeholder:text-text-dim outline-none focus:border-green"
          />

          {error && <p className="text-alert text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-green py-3 font-semibold text-bg transition-opacity disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-text-muted">
          <Link to="/sign-in" className="text-green hover:underline">Back to sign in</Link>
        </p>
      </div>
    </div>
  )
}
