import AppShell from '../layouts/AppShell.jsx'
import StampBadge from '../components/StampBadge.jsx'
import { cardPad, ledgerTable, ledgerTh, ledgerTd, amount, statValue, statStatus, statDelta } from '../styles/ui.js'
import { useData } from '../context/dataContext.jsx'
import { useEffect } from 'react'
import formatRawDateString from '../HelperFunctions/formatRawDateString.js'

export default function AdminAnalytics() {

  const { invoices, clients, fetchInvoices, fetchClients } = useData()

  useEffect(() => { fetchInvoices() }, [fetchInvoices])
  useEffect(() => { fetchClients() }, [fetchClients])

  let percentChange = 0

  const thisMonthTotal = invoices
      .filter(inv => inv.status === 'paid' && new Date(inv.issueDate).getMonth() === new Date().getMonth())
      .reduce((sum, inv) => sum + inv.total, 0)

  const lastMonthTotal = invoices
      .filter(inv => inv.status === 'paid' && new Date(inv.issueDate).getMonth() === new Date().getMonth() - 1)
      .reduce((sum, inv) => sum + inv.total, 0)
      
      if (lastMonthTotal > 0) {
        percentChange = ((thisMonthTotal - lastMonthTotal) / lastMonthTotal) * 100
      }
      
      const isUp = percentChange >= 0
      const dynamicDelta = `${isUp ? '↑' : '↓'} ${Math.abs(percentChange).toFixed(1)}% MoM`
      const dynamicDirection = isUp ? 'up' : 'down'


  const adminStats = [
      { 
          label: 'MRR', 
          value: '12,860', 
          delta: '↑ 8.1% MoM', 
          direction: 'up' 
      },
      { 
          label: 'Active subscriptions', 
          value: '214', 
          delta: '↑ 14 new', 
          direction: 'up' 
      },
      { 
          label: 'Churn rate', 
          value: '2.1%', 
          delta: '↑ 0.4pp', 
          direction: 'down' 
      },
      { 
          label: 'Total processed (Stripe)', 
          value: invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.total, 0).toLocaleString(), 
          delta: dynamicDelta,       
          direction: dynamicDirection 
      },
  ]

  const revenueByClient = clients.map((client, index) => {
    const totalCollected = invoices
      .filter(inv => inv.client === client.name && inv.status === 'paid')
      .reduce((sum, inv) => sum + inv.total, 0)

    return {
      name: client.name,
      width: Math.min(Math.max(totalCollected * 0.08, 40), 420), 
      amount: totalCollected > 1000 ? `${(totalCollected / 1000).toFixed(1)}K` : `${totalCollected}`,
      fill: index === 0 ? 'var(--color-brand-600)' : index === 1 ? 'var(--color-brand-500)' : 'var(--color-line-strong)',
      y: index * 40
    }
  }).sort((a, b) => b.width - a.width)

  const transactions = invoices.slice(0, 5).map(inv => {

    let label =  (inv.status === 'sent') ? 'Processing' : (inv.status === 'overdue') ? 'Failed' : (inv.status === 'draft') ? 'Draft' : 'Succeeded'

    return {
      date: inv.issueDate,
      client: inv.client,
      type: inv.items[0]?.description || 'Invoice Payment',
      amount: inv.total.toString(),
      status: inv.status === 'sent' ? 'pending' : inv.status,
      label: label
    }
  })

  const totalProcessedValue = invoices
    .filter(inv => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.total, 0)

  const dynamicAdminStats = adminStats.map(stat => {
    if (stat.label === 'Total processed (Stripe)') {
      return { ...stat, value: totalProcessedValue.toLocaleString() }
    }
    return stat
  })

  return (

    <AppShell
      topbar={
        <div className="flex items-center justify-between gap-3 w-full">
          <h1 className="text-lg sm:text-xl">Admin Analytics</h1>
          <span className="text-xs bg-brand-100 text-brand-600 px-2.5 py-1 rounded-stamp font-semibold whitespace-nowrap">Owner view</span>
        </div>
      }
    >
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6">
        {dynamicAdminStats.map((s) => (
          <div className={cardPad} key={s.label}>
            <div className={statStatus}>{s.label}</div>
            <div className={statValue}>{s.value}</div>
            <div className={statDelta[s.direction]}>{s.delta}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 mb-6">

        <div className={`${cardPad} overflow-hidden`}>
          <div className="text-sm font-semibold mb-1">MRR growth, last 8 months</div>
          <div className="text-xs text-gray-500 mb-5">Monthly recurring revenue, USD</div>
          <svg viewBox="0 0 480 180" width="100%" height="180">
            <line x1="20" y1="150" x2="460" y2="150" stroke="var(--color-line-strong)" />
            <polyline
              fill="none" stroke="var(--color-brand-600)" strokeWidth="2.5"
              points="20,130 76,124 132,110 188,104 244,86 300,70 356,48 412,28 460,20"
            />
            <g fill="var(--color-brand-600)">
              <circle cx="20" cy="130" r="3" />
              <circle cx="76" cy="124" r="3" />
              <circle cx="132" cy="110" r="3" />
              <circle cx="188" cy="104" r="3" />
              <circle cx="244" cy="86" r="3" />
              <circle cx="300" cy="70" r="3" />
              <circle cx="356" cy="48" r="3" />
              <circle cx="412" cy="28" r="3" />
              <circle cx="460" cy="20" r="4" />
            </g>
            <polygon
              fill="var(--color-brand-100)" opacity="0.5"
              points="20,130 76,124 132,110 188,104 244,86 300,70 356,48 412,28 460,20 460,150 20,150"
            />
            <text x="20" y="168" className="fill-gray-500 font-mono text-[10px]">JAN</text>
            <text x="188" y="168" className="fill-gray-500 font-mono text-[10px]">APR</text>
            <text x="356" y="168" className="fill-gray-500 font-mono text-[10px]">JUL</text>
            <text x="440" y="168" className="fill-gray-500 font-mono text-[10px]">AUG</text>
          </svg>
        </div>

        <div className={`${cardPad} overflow-hidden`}>
          <div className="text-sm font-semibold mb-1">Revenue by client, this quarter</div>
          <div className="text-xs text-gray-500 mb-5">Top accounts, USD collected</div>
          <svg viewBox="0 0 480 180" width="100%" height="180">
            <g fontFamily="var(--font-mono)" fontSize="11" fill="var(--color-ink-900)">
              {revenueByClient.map((c) => (
                <g key={c.name}>
                  <text x="0" y={c.y + 16}>{c.name}</text>
                  <rect x="0" y={c.y + 22} width={c.width} height="14" rx="3" fill={c.fill} />
                  <text x="430" y={c.y + 33} className="fill-gray-500 font-mono text-[10px]" textAnchor="end">{c.amount}</text>
                </g>
              ))}
            </g>
          </svg>
        </div>

      </div>

      <div className={`${cardPad} overflow-x-auto`}>
        <div className="text-sm font-semibold mb-4">Recent transactions (Stripe)</div>
        <table className={`${ledgerTable} min-w-[650px]`}>
          <thead>
            <tr>
             {['Date', 'Client', 'Type', 'Amount', 'Status'].map((h) => <th key={h} className={`${ledgerTh} whitespace-nowrap`}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, i) => (
              <tr key={i} className="hover:bg-paper-100">
                <td className={`${ledgerTd} whitespace-nowrap`}>{formatRawDateString(t.date)}</td>
                <td className={`${ledgerTd} whitespace-nowrap`}>{t.client}</td>
                <td className={`${ledgerTd} whitespace-nowrap`}>{t.type}</td>
                <td className={`${ledgerTd} ${amount} whitespace-nowrap`}>{t.amount}</td>
                <td className={`${ledgerTd} whitespace-nowrap`}>
                  <StampBadge status={t.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </>
    </AppShell>
  )
}