import { Link, useNavigate } from 'react-router-dom'
import { btnPrimary, fieldWrap, fieldLabel, fieldInput, fieldHint } from '../styles/ui.js'

export default function Signup() {
  
  const navigate = useNavigate()

  async function handleSignUp(e) {

    e.preventDefault()
    const form = e.currentTarget
    const formData = Object.fromEntries(new FormData(form).entries())
    console.log(formData)

    if (formData) {
      try {
        const response = await fetch(
          'http://localhost:3000/api/users',
          {
            method: 'POST',
            headers: {'content-Type': 'application/json'},
            body: JSON.stringify(formData) 
          }
        )
        const data = await response.json()
        console.log(data.message)
        
      } catch (error) {
        console.log(error)
      }
    }

    form.reset()
    navigate("/dashboard", {replace: true})
   
  }

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

          <h1 className="text-2xl mb-2">Create your account</h1>
          <p className="text-gray-500 text-sm mb-8">Free for your first 5 invoices. No card required to start.</p>

          <form onSubmit={(e) => handleSignUp(e)}>

            <div className="grid grid-cols-2 gap-4">
              <div className={fieldWrap}>
                <label className={fieldLabel}>First name</label>
                <input name='firstName' className={fieldInput} />
              </div>

              <div className={fieldWrap}>
                <label className={fieldLabel}>Last name</label>
                <input name='lastName' className={fieldInput} />
              </div>
            </div>

            <div className={fieldWrap}>
              <label className={fieldLabel}>Company name</label>
              <input name='companyName' className={fieldInput} />
            </div>

            <div className={fieldWrap}>
              <label className={fieldLabel}>Work email</label>
              <input name='workEmail' type="email" className={fieldInput} />
            </div>

            <div className={fieldWrap}>
              <label className={fieldLabel}>Password</label>
              <input name='password' type="password" className={fieldInput} />
              <span className={fieldHint}>At least 10 characters, one number.</span>
            </div>

            <input type="submit" value="Create Account" className={`${btnPrimary} w-full justify-center mt-2`} />
          </form>

          <p className="text-center mt-6 text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-600 font-semibold no-underline">
              Log in
            </Link>
          </p>
        </div>
      </div>

      <div className="bg-brand-100 text-ink-900 flex flex-col justify-center p-16">
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
