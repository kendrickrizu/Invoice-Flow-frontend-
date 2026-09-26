import AppShell from '../layouts/AppShell.jsx'
import { btnSecondary, btnGhost, cardPad, amount } from '../styles/ui.js'

const features = [
  'Unlimited invoices',
  'Stripe payments (card + ACH)',
  'Admin analytics dashboard',
  'Up to 5 team members',
]

const settingsTabs = ['Profile', 'Company', 'Billing & Plan', 'Team', 'Integrations']

export default function SettingsBilling() {
  return (
    <AppShell topbar={<h1 className="text-xl">Settings</h1>}>
      <div className="flex gap-6 border-b border-line mb-6">
        {settingsTabs.map((t) => (
          <a
            href="#"
            key={t}
            className={`pb-3 text-sm font-semibold no-underline border-b-2 ${
              t === 'Billing & Plan' ? 'text-ink-900 border-brand-600' : 'text-gray-500 border-transparent'
            }`}
          >
            {t}
          </a>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="border-[1.5px] border-brand-600 rounded-lg p-6 relative">
          <div className="absolute -top-2.5 left-6 bg-brand-600 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-stamp">
            Current plan
          </div>
          <div className="text-sm font-semibold text-gray-500">GROWTH</div>
          <div className="font-mono text-2xl font-medium my-2">
            $49<span className="text-sm text-gray-500 font-normal">/month</span>
          </div>
          {features.map((f) => (
            <div className="text-sm flex gap-2 py-1 text-gray-700" key={f}>✓ {f}</div>
          ))}
          <a href="#" className={`${btnSecondary} mt-5 w-full justify-center`}>Change plan</a>
        </div>

        <div className={cardPad}>
          <div className="text-sm font-semibold">Next invoice</div>
          <p className="text-sm text-gray-500">Your subscription renews automatically.</p>
          <div className="flex justify-between text-sm py-2"><span>Amount</span><span className={amount}>$49.00</span></div>
          <div className="flex justify-between text-sm py-2"><span>Renews</span><span>Sep 28, 2026</span></div>
          <div className="flex justify-between text-sm py-2"><span>Billed via</span><span>Stripe</span></div>
        </div>
      </div>

      <div className={cardPad}>
        <div className="text-sm font-semibold mb-4">Payment methods</div>
        <div className="flex items-center justify-between p-4 border border-line rounded-md mb-3">
          <div className="flex items-center gap-3">
            <div className="w-[38px] h-[26px] bg-ink-900 rounded-[5px] text-white flex items-center justify-center text-[10px] font-bold">
              VISA
            </div>
            <div>
              <strong className="text-sm">•••• •••• •••• 4242</strong>
              <br />
              <span className="text-xs text-gray-500">Expires 08/28 · Default</span>
            </div>
          </div>
          <a href="#" className={btnGhost}>Manage</a>
        </div>
        <a href="#" className={btnSecondary}>+ Add payment method</a>
      </div>
    </AppShell>
  )
}
