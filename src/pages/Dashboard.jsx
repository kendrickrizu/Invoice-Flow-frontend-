import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import AppShell from '../layouts/AppShell.jsx'
import StatCard from '../components/StatCard.jsx'
import StampBadge from '../components/StampBadge.jsx'
import { btnPrimary, cardPad, ledgerTable, ledgerTh, ledgerTd, amount } from '../styles/ui.js'
import formatRawDateString from '../HelperFunctions/formatRawDateString.js'
import getRevenueChartData from '../HelperFunctions/getRevenueChartData.js'
import RevenueChart from '../components/RevenueChart.jsx'
import { useData } from '../context/dataContext.jsx'

export default function Dashboard() {

  const { invoices, clients, fetchInvoices, fetchClients } = useData()

  useEffect(() => {
    fetchInvoices()
  }, [fetchInvoices])

  useEffect(() => {
    fetchClients()
  }, [fetchClients])

  const chartData = getRevenueChartData(invoices)

   const stats = [
    {
        label: 'Outstanding',
        value: '$' + Math.floor(invoices
            .filter(inv => inv.status === 'sent' || inv.status === 'overdue')
            .reduce((acc, invoice) => acc + invoice.total, 0)).toLocaleString(),
        delta: '↓ 3 overdue',
        direction: 'down'
    },
    {
        label: 'Paid this month',
        value: '$' + Math.floor(invoices
            .filter(inv => inv.status === 'paid')
            .reduce((acc, invoice) => acc + invoice.total, 0)).toLocaleString(),
        delta: '↑ 12.4% vs Jul',
        direction: 'up'
    },
    {
        label: 'Avg. days to pay',
        value: '6.2',
        delta: '↓ 1.8 days faster',
        direction: 'up'
    },
    {
        label: 'Active clients',
        value: clients.length,
        delta: '↑ 2 new',
        direction: 'up'
    },
]
 const activity = [
    {
        initials: 'RK',
        client: 'Redshift Kitchens',
        action: 'paid invoice INV-1042 - $3200',
        time: '2 hours ago'
    },
    {
        initials: 'PL',
        client: 'Palmer & Co.',
        action: 'viewed invoice INV-1045',
        time: 'Yesterday'
    },
    {
        initials: 'AT',
        client: 'Atlas Freight',
        action: `invoice INV-1039 is now 5 days overdue`,
        time: 'Yesterday'
    },
]

  return (
    <AppShell
      topbar={
        <>
          <h1 className="text-xl">Dashboard</h1>
          <Link to="/invoices/new" className={btnPrimary}>+ New invoice</Link>
        </>
      }
    >
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* 
        UPDATED: Changed from fixed fractional layout to responsive cols. 
        1 col stacking on mobile, side-by-side on desktop (lg) 
      */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 mb-6">
        
        <div className={cardPad}>
          <RevenueChart data={chartData} />
        </div>

        <div className={cardPad}>
          <div className="text-sm font-semibold mb-1">Recent activity</div>
          <div className="text-xs text-gray-500 mb-5">Latest events on your ledger</div>
          {activity.map((a, i) => (
            <div className="flex gap-3 py-3 border-b border-line text-sm last:border-b-0" key={i}>
              <div className="w-7 h-7 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-[11px] font-semibold shrink-0">
                {a.initials}
              </div>
              <div>
                <b>{a.client}</b> {a.action}
                <br />
                <span className="text-gray-500 text-xs">{a.time}</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      <div className={cardPad}>
        <div className="text-sm font-semibold mb-4">Latest invoices</div>

        <div className="overflow-x-auto">
          <table className={ledgerTable}>

            <thead>
              <tr>
                {['Invoice', 'Client', 'Issued', 'Due', 'Amount', 'Status']
                .map( x => <th key={x} className={ledgerTh}> {x}</th>)}
              </tr>
            </thead>

            <tbody>
              {invoices.filter(inv => inv.status.toLowerCase() !== 'draft').sort((a, b) => new Date(b.issueDate) - new Date(a.issueDate)).slice(0,4).map((inv) => (
                <tr key={inv.id} className="hover:bg-paper-100">
                  <td className={`${ledgerTd} font-mono`}>{inv.id}</td>
                  <td className={ledgerTd}>{inv.client}</td>
                  <td className={ledgerTd}>{formatRawDateString(inv.issueDate)}</td>
                  <td className={ledgerTd}>{formatRawDateString(inv.dueDate)}</td>
                  <td className={`${ledgerTd} ${amount}`}>${inv.total}</td>
                  <td className={ledgerTd}>
                    <StampBadge status={inv.status} label={inv.status} />
                  </td>
                </tr>
              ))}
            </tbody>
            
          </table>
        </div>

      </div>
      
    </AppShell>
  )
}