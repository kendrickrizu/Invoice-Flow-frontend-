import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import AppShell from '../layouts/AppShell.jsx'
import formatRawDateString from '../HelperFunctions/formatRawDateString.js'
import { btnPrimary, btnGhost, card, ledgerTable, ledgerTh, ledgerTd, amount, fieldInput } from '../styles/ui.js'
import { useData } from '../context/dataContext.jsx'


export default function Clients() {

  const { invoices, clients, fetchInvoices, fetchClients } = useData()
  useEffect(() => { fetchInvoices() }, [fetchInvoices])
  useEffect(() => { fetchClients() }, [fetchClients])

  const [clientsArr, setClientsArr] = useState(clients)
  const [isAddClientOpen, setIsAddClientOpen] = useState(false)

    useEffect(() => {
    setClientsArr(clients)
  }, [clients])

  function searchClients(e) {
    let inputValue = e.target.value.trim().toLowerCase()

    const filteredClientsArr = clients.filter(
      client => client.name.toLowerCase().includes(inputValue)
    )

    setClientsArr(filteredClientsArr)

  }

  function getInitials(name) {
    if (!name) return ""
    
    const words = name.trim().split(/\s+/)
    
    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase()
    }
    return (words[0][0] + words[1][0]).toUpperCase()
  }

  function handleSubmit(e) {
      e.preventDefault()

      const formData = new FormData(e.currentTarget)
      const newClientFormData = Object.fromEntries(formData.entries())
      const newClientData = {
                              ...newClientFormData, 
                              lifetimeBilled: Number(newClientFormData.lifetimeBilled),
                              open: Number(newClientFormData.open),
                              last: formatRawDateString(newClientFormData.last)
                            }

      newClientData.id = crypto.randomUUID()
      newClientData.initials = getInitials(newClientData.name)
      const updatedClients = [...clients, newClientData]

      setClientsArr(updatedClients)
      setIsAddClientOpen(false)
  }

  const getRecentInvoiceDate = client => {
    return invoices.filter(invoice => client.name.toLowerCase() === invoice.client.toLowerCase())
    .sort((a, b) => new Date(b.issueDate) - new Date(a.issueDate))[0].issueDate
  }

  return (

    <AppShell
      topbar={
        <div className="flex items-center justify-between gap-3 w-full">
          <h1 className="text-lg sm:text-xl">Clients</h1>
          <Link to="#" className={`${btnPrimary} whitespace-nowrap`} onClick={() => setIsAddClientOpen(!isAddClientOpen)}>+ Add client</Link>
        </div>
      }
    >

      {isAddClientOpen && (

        <div
          className="fixed inset-0 bg-ink-900/40 flex items-center justify-center z-50 p-4"
          onClick={() => setIsAddClientOpen(false)}
        >

          <div
            className="bg-paper-0 border border-line rounded-lg shadow-sm w-[calc(100%-2rem)] max-w-[420px] max-h-[90vh] overflow-y-auto p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}>

            <div className="flex items-center justify-between mb-5">
              <h2 className="text-md font-display font-semibold">Add client</h2>
              <button
                type="button"
                className="text-gray-500 hover:text-ink-900 text-lg leading-none"
                onClick={() => setIsAddClientOpen(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={(e) => { handleSubmit(e) }}>

              <div className="flex flex-col gap-2 mb-4">
                <label className="text-sm font-semibold text-ink-700" htmlFor="name">
                  Client name
                </label>
                <input
                  id="name"
                  name="name"
                  className="w-full font-body text-base px-3 py-2.5 border border-line-strong rounded-md bg-paper-0 text-ink-900"
                  placeholder="Redshift Kitchens"
                />
              </div>

              <div className="flex flex-col gap-2 mb-4">
                <label className="text-sm font-semibold text-ink-700" htmlFor="contact">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="w-full font-body text-base px-3 py-2.5 border border-line-strong rounded-md bg-paper-0 text-ink-900"
                  placeholder="billing@redshiftkitchens.com"
                  required
                />
              </div>

              <div className="flex flex-col gap-2 mb-4">
                <label className="text-sm font-semibold text-ink-700" htmlFor="open">
                  Open balance
                </label>
                <input
                  type="number"
                  id="open"
                  name="open"
                  className="w-full font-body text-base px-3 py-2.5 border border-line-strong rounded-md bg-paper-0 text-ink-900"
                  placeholder="0"
                  defaultValue="0"
                  required
                />
              </div>

              <div className="flex flex-col gap-2 mb-4">
                <label className="text-sm font-semibold text-ink-700" htmlFor="lifetime">
                  Lifetime value
                </label>
                <input
                  type="number"
                  id="lifetime"
                  name="lifetimeBilled"
                  className="w-full font-body text-base px-3 py-2.5 border border-line-strong rounded-md bg-paper-0 text-ink-900"
                  placeholder="5000"
                  required
                />
              </div>

              <div className="flex flex-col gap-2 mb-4">
                <label className="text-sm font-semibold text-ink-700" htmlFor="last">
                  Last invoice
                </label>
                <input
                  type="date"
                  id="last"
                  name="last"
                  className="w-full font-body text-base px-3 py-2.5 border border-line-strong rounded-md bg-paper-0 text-ink-900"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  className="text-sm font-semibold px-4 py-2 rounded-md border border-line-strong bg-paper-0 text-ink-900"
                  onClick={() => setIsAddClientOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-sm font-semibold px-4 py-2 rounded-md bg-brand-600 text-white"
                >
                  Add client
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-5">
        <input placeholder="Search clients…" onInput={(e) => { searchClients(e) }} className={`${fieldInput} w-full sm:w-[280px] py-2.5`} />
        {clients && <div className="text-gray-500 text-sm">{
          clientsArr.length} {clientsArr.length > 1 ? 'clients' : 'client'} </div>}
      </div>

      <div className={`${card} overflow-x-auto`}>
        <table className={`${ledgerTable} min-w-[800px]`}>
          <thead>
            <tr>
              {
              ['Client', 'Contact', 'Open Balance', 'Lifetime Billed', 'Last Invoice']
              .map((h, i) => <th key={i + 23} className={ledgerTh}>{h}</th> )
              }
            </tr>
          </thead>
          <tbody>
            {clientsArr.map((client) => (
              <tr key={client.name} className="hover:bg-paper-100">
                <td className={`${ledgerTd} whitespace-nowrap`}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 shrink-0 rounded-lg bg-brand-100 text-brand-600 flex items-center justify-center text-xs font-semibold">
                      {getInitials(client.name)}
                    </div>
                    {client.name}
                  </div>
                </td>
                <td className={`${ledgerTd} whitespace-nowrap`}>{client.email}</td>
                <td className={`${ledgerTd} ${amount} whitespace-nowrap`}>{'$' + client.open.toFixed(2)}</td>
                <td className={`${ledgerTd} ${amount} whitespace-nowrap`}>
                  {'$' + invoices.filter(invoice => client.name.toLowerCase() === invoice.client.toLowerCase()).reduce((acc, invoice) => acc + invoice.total , 0 ).toFixed(2)}
                </td>
                <td className={`${ledgerTd} whitespace-nowrap`}>
                  {formatRawDateString(getRecentInvoiceDate(client))}
                </td>
                <td className={`${ledgerTd} whitespace-nowrap`}>
                  <Link to= {"/invoices/" + invoices.find(invoice => getRecentInvoiceDate(client) === invoice.issueDate).id} 
                    className={btnGhost}>View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </AppShell>
  )
}