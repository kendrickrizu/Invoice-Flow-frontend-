import { Link } from 'react-router-dom'
import { btnPrimary, btnSecondary, fieldWrap, fieldLabel, fieldInput } from '../styles/ui.js'


export default function Login() {
  return (
    <div className="min-h-screen grid grid-cols-2">
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-[380px]">
          <div className="flex items-center gap-2 mb-10">
            <div className="w-[26px] h-[26px] bg-ink-900 rounded-[5px] text-white flex items-center justify-center font-mono text-xs">
              IF
            </div>
            <span className="font-display font-semibold text-md">InvoiceFlow</span>
          </div>

          <h1 className="text-2xl mb-2">Log in</h1>
          <p className="text-gray-500 text-sm mb-8">Welcome back. Your ledger's exactly how you left it.</p>

          <form>
            <div className={fieldWrap}>
              <label htmlFor="email" className={fieldLabel}>Work email</label>
              <input
                id="email"
                type="email"
                placeholder="you@company.com"
                defaultValue="maya@northwood-studio.com"
                className={fieldInput}
              />
            </div>
            <div className={fieldWrap}>
              <label htmlFor="pass" className={fieldLabel}>Password</label>
              <input id="pass" type="password" placeholder="••••••••" defaultValue="••••••••" className={fieldInput} />
            </div>
            <div className="flex justify-end mb-6">
              <Link to="#" className="text-brand-600 font-semibold text-xs no-underline">
                Forgot password?
              </Link>
            </div>
            <Link to="/dashboard" className={`${btnPrimary} w-full justify-center`}>
              Log in
            </Link>
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

      <div className="bg-ink-900 text-paper-50 flex flex-col justify-center p-16 relative overflow-hidden">
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
