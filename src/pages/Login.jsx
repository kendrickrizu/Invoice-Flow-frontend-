import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { btnPrimary, btnSecondary, fieldWrap, fieldLabel, fieldInput } from '../styles/ui.js'

export default function Login() {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleLogin(e) {
    e.preventDefault()
    setError('')

    const { email, password } = Object.fromEntries(
      new FormData(e.currentTarget).entries()
    )

    setSubmitting(true)
    const { error } = await signIn({ email, password })
    setSubmitting(false)

    if (error) {
      setError(error.message)
      return
    }

    navigate('/dashboard', { replace: true })
  }

  return (
    <div className="min-h-dvh grid grid-cols-1 md:grid-cols-2">
      <div className="flex items-center justify-center px-5 py-10 sm:p-8">
        <div className="w-full max-w-[380px]">
          <div className="flex items-center gap-2 mb-10">
            <div className="w-[26px] h-[26px] bg-ink-900 rounded-[5px] text-white flex items-center justify-center font-mono text-xs">
              IF
            </div>
            <span className="font-display font-semibold text-md">InvoiceFlow</span>
          </div>

          <h1 className="text-2xl mb-2">Log in</h1>
          <p className="text-gray-500 text-sm mb-8">Welcome back. Your ledger's exactly how you left it.</p>

          <form onSubmit={handleLogin}>
            <div className={fieldWrap}>
              <label htmlFor="email" className={fieldLabel}>Work email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@company.com"
                className={fieldInput}
              />
            </div>
            <div className={fieldWrap}>
              <label htmlFor="pass" className={fieldLabel}>Password</label>
              <input
                id="pass"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className={fieldInput}
              />
            </div>
            <div className="flex justify-end mb-6">
              <Link to="#" className="text-brand-600 font-semibold text-xs no-underline">
                Forgot password?
              </Link>
            </div>

            {error && <p className="text-sm text-red-600 mb-3">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className={`${btnPrimary} w-full justify-center`}
            >
              {submitting ? 'Logging in...' : 'Log in'}
            </button>
          </form>

          <div className="flex items-center gap-3 text-gray-500 text-xs my-6 before:content-[''] before:flex-1 before:h-px before:bg-line after:content-[''] after:flex-1 after:h-px after:bg-line">
            OR
          </div>

          <Link to="#" className={`${btnSecondary} w-full justify-center`}>
            Continue with Google
          </Link>

          <p className="text-center mt-6 text-sm text-gray-500">
            New to InvoiceFlow?{' '}
            <Link to="/signup" className="text-brand-600 font-semibold no-underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden md:flex bg-ink-900 text-paper-50 flex-col justify-center p-16 relative overflow-hidden">
        <p className="font-display text-xl leading-snug max-w-[420px] font-medium">
          "Every invoice is a promise. InvoiceFlow is where we keep score."
        </p>
        <p className="mt-6 text-sm text-[#9FC0BB]">
          — Design note, on why we built this like a ledger, not a form
        </p>
      </div>
    </div>
  )
}