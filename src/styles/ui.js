export const btnBase =
  'font-body text-sm font-semibold px-4 py-2 rounded-md border border-transparent inline-flex items-center gap-2 no-underline cursor-pointer transition active:translate-y-px'

export const btnPrimary = `${btnBase} bg-brand-600 text-white hover:bg-ink-900`
export const btnSecondary = `${btnBase} bg-paper-0 text-ink-900 border-line-strong hover:border-ink-900`
export const btnGhost = `${btnBase} bg-transparent text-gray-700 hover:text-ink-900`
export const btnDanger = `${btnBase} bg-danger-600 text-white`

export const card = 'bg-paper-0 border border-line rounded-lg shadow-sm'
export const cardPad = `${card} p-6`

export const fieldWrap = 'flex flex-col gap-2 mb-4'
export const fieldLabel = 'text-sm font-semibold text-ink-700'
export const fieldInput =
  'font-body text-base px-3 py-2.5 border border-line-strong rounded-md bg-paper-0 text-ink-900 focus:outline focus:outline-2 focus:outline-brand-500 focus:outline-offset-1 focus:border-brand-600'
export const fieldHint = 'text-xs text-gray-500'
export const lineInput = 'border-none bg-transparent font-body text-sm w-full px-1 py-1.5 rounded focus:outline focus:outline-2 focus:outline-brand-500 focus:bg-paper-0'


export const ledgerTable = 'w-full border-collapse'
export const ledgerTh =
  'text-left text-xs uppercase tracking-wide text-gray-500 font-semibold px-4 py-3 border-b border-line-strong'
export const ledgerTd = 'px-4 py-4 border-b border-line text-sm'
export const amount = 'font-mono font-medium tabular-nums'

export const stampBase =
  'inline-flex items-center justify-center font-mono text-[11px] font-semibold tracking-wider px-3 py-1.5 rounded-stamp border-[1.5px] border-current uppercase'
export const stampVariants = {
  paid: 'text-success-600 bg-success-100',
  pending: 'text-warning-600 bg-warning-100',
  overdue: 'text-danger-600 bg-danger-100',
  draft: 'text-gray-500 bg-paper-100',
}

export const statValue = 'font-mono text-2xl font-medium'
export const statStatus = 'text-xs text-gray-500 uppercase tracking-wide'
export const statDelta = {
  up: 'text-success-600 text-xs font-semibold',
  down: 'text-danger-600 text-xs font-semibold',
}

export const navItemBase =
  'flex items-center gap-3 px-3 py-2 rounded-md text-[#C9DBD7] text-sm font-semibold no-underline transition hover:bg-white/[.06] hover:text-white'
export const navItemActive = 'bg-brand-600 text-white'
