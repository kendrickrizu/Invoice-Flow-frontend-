import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { btnPrimary, fieldWrap, fieldLabel, fieldInput, fieldHint } from '../styles/ui.js'

export default function Signup() {
  const navigate = useNavigate()
  const { signUp } = useAuth()
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSignUp(e) {
    e.preventDefault()
    setError('')

    const form = e.currentTarget
    const { firstName, lastName, companyName, workEmail, password } =
      Object.fromEntries(new FormData(form).entries())

    if (password.length < 10 || !/\d/.test(password)) {
      setError('Password must be at least 10 characters and include a number.')
      return
    }

    setSubmitting(true)
    const { error } = await signUp({
      email: workEmail,
      password,
      firstName,
      lastName,
      companyName,
    })
    setSubmitting(false)

    if (error) {
      setError(error.message)
      return
    }

    form.reset()
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

          <h1 className="text-2xl mb-2">Create your account</h1>
          <p className="text-gray-500 text-sm mb-8">Free for your first 5 invoices. No card required to start.</p>

          <form onSubmit={handleSignUp}>
            <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-4">
              <div className={fieldWrap}>
                <label htmlFor="firstName" className={fieldLabel}>First name</label>
                <input id="firstName" name="firstName" required className={fieldInput} />
              </div>

              <div className={fieldWrap}>
                <label htmlFor="lastName" className={fieldLabel}>Last name</label>
                <input id="lastName" name="lastName" required className={fieldInput} />
              </div>
            </div>

            <div className={fieldWrap}>
              <label htmlFor="companyName" className={fieldLabel}>Company name</label>
              <input id="companyName" name="companyName" required className={fieldInput} />
            </div>

            <div className={fieldWrap}>
              <label htmlFor="workEmail" className={fieldLabel}>Work email</label>
              <input id="workEmail" name="workEmail" type="email" required className={fieldInput} />
            </div>

            <div className={fieldWrap}>
              <label htmlFor="password" className={fieldLabel}>Password</label>
              <input id="password" name="password" type="password" required className={fieldInput} />
              <span className={fieldHint}>At least 10 characters, one number.</span>
            </div>

            {error && <p className="text-sm text-red-600 mb-2">{error}</p>}

            <input
              type="submit"
              value={submitting ? 'Creating account...' : 'Create Account'}
              disabled={submitting}
              className={`${btnPrimary} w-full justify-center mt-2`}
            />
          </form>

          <p className="text-center mt-6 text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-600 font-semibold no-underline">
              Log in
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden md:flex bg-brand-100 text-ink-900 flex-col justify-center p-16">
        <h2 className="text-xl max-w-[360px]">Built for people who invoice for a living.</h2>
        <div className="flex flex-col gap-4 mt-8">
          <div className="flex gap-3 items-start text-sm">
            <span className="w-5 h-5 rounded-full bg-brand-600 text-white flex items-center justify-center text-[11px] shrink-0">✓</span>
            Get paid by card, ACH, or bank transfer — Stripe under the hood
          </div>
          <div className="flex gap-3 items-start text-sm">
            <span className="w-5 h-5 rounded-full bg-brand-600 text-white flex items-center justify-center text-[11px] shrink-0">✓</span>
            Auto-numbered, auto-stamped invoices with a real paper trail
          </div>
          <div className="flex gap-3 items-start text-sm">
            <span className="w-5 h-5 rounded-full bg-brand-600 text-white flex items-center justify-center text-[11px] shrink-0">✓</span>
            Every payment reconciled and receipted automatically
          </div>
        </div>
      </div>
    </div>
  )
}