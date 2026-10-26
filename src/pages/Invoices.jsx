import { Link } from 'react-router-dom'
import { useState, useEffect, useMemo } from 'react'
import AppShell from '../layouts/AppShell.jsx'
import StampBadge from '../components/StampBadge.jsx'
import { btnPrimary, card, ledgerTable, ledgerTh, ledgerTd, amount, fieldInput } from '../styles/ui.js'
import { useData } from '../context/dataContext.jsx'
import formatRawDateString from '../HelperFunctions/formatRawDateString.js'

const TABS = ['All', 'Draft', 'Sent', 'Paid', 'Overdue']

export default function Invoices() {
  const { invoices, fetchInvoices } = useData()
  const [activeTab, setActiveTab] = useState('All')
  const [search, setSearch] = useState('')

  useEffect(() => { fetchInvoices() }, [fetchInvoices])

  const counts = useMemo(() => {
    const result = { all: invoices.length }
    for (const inv of invoices) {
      result[inv.status] = (result[inv.status] ?? 0) + 1
    }
    return result
  }, [invoices])

  const visibleInvoices = useMemo(() => {
    const query = search.trim().toLowerCase()

    return invoices.filter((inv) => {
      const matchesTab =
        activeTab === 'All' || inv.status === activeTab.toLowerCase()

      const matchesSearch =
        !query ||
        String(inv.id).includes(query) ||
        (inv.client ?? '').toLowerCase().includes(query)

      return matchesTab && matchesSearch
    })
    
  }, [invoices, activeTab, search])

  return (
    <AppShell
      topbar={
        <>
          <h1 className="text-xl">Invoices</h1>
          <Link to="/invoices/new" className={btnPrimary}>+ New invoice</Link>
        </>
      }
    >
      <div className="flex justify-between items-center mb-5">
        <div className="flex gap-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-stamp text-sm font-semibold cursor-pointer ${
                activeTab === tab ? 'bg-ink-900 text-white' : 'text-gray-700'
              }`}
            >
              {tab} ({counts[tab.toLowerCase()] ?? 0})
            </button>
          ))}
        </div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search invoice # or client…"
          className={`${fieldInput} w-60 py-2.5`}
        />
      </div>

      <div className={card}>
        <table className={ledgerTable}>
          <thead>
            <tr>
              {['Invoice', 'Client', 'Issued', 'Due', 'Amount', 'Status'].map((x) => (
                <th key={x} className={ledgerTh}>{x}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {visibleInvoices.length === 0 ? (
              <tr>
                <td colSpan={6} className={`${ledgerTd} text-center text-gray-500`}>
                  No invoices found.
                </td>
              </tr>
            ) : (
              visibleInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-paper-100 cursor-pointer">
                  <td className={`${ledgerTd} font-mono`}>
                    <Link to={`/invoices/${inv.id}`}>INV-{inv.id}</Link>
                  </td>
                  <td className={ledgerTd}>{inv.client}</td>
                  <td className={ledgerTd}>{formatRawDateString(inv.issueDate)}</td>
                  <td className={ledgerTd}>{formatRawDateString(inv.dueDate)}</td>
                  <td className={`${ledgerTd} ${amount}`}>${Number(inv.total).toFixed(2)}</td>
                  <td className={ledgerTd}>
                    <StampBadge status={inv.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </AppShell>
  )
}