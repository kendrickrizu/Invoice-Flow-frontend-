import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import AppShell from '../layouts/AppShell.jsx'
import StampBadge from '../components/StampBadge.jsx'
import { btnPrimary, card, ledgerTable, ledgerTh, ledgerTd, amount, fieldInput } from '../styles/ui.js'
import { useData } from '../context/dataContext.jsx'
import formatRawDateString from "../HelperFunctions/formatRawDateString.js"

const tabs = [
  {
    name:'All',
    isActive: true
  }, 
  {
    name:'Draft',
    isActive: false
  }, 
  {
    name:'Sent',
    isActive: false
  }, 
  {
    name:'Paid',
    isActive: false
  }, 
  {
    name:'Overdue',
    isActive: false
  }
]

export default function Invoices() {
  const { invoices, fetchInvoices, fetchClients } = useData()

  useEffect(() => { fetchInvoices() }, [fetchInvoices])
  useEffect(() => { fetchClients() }, [fetchClients])
  
  const [displayTabs, setDisplayTabs] = useState(tabs)
  const [invoicesArr, setInvoicesArr] = useState(invoices)
  
  function activateTab(e){
    
    const tabsArr = displayTabs.map(displayTab => (
      e.target.dataset.active.toLowerCase() === displayTab.name.toLowerCase() ?
        { ...displayTab, isActive: true } : 
        { ...displayTab, isActive: false }
    )) 

    setDisplayTabs(tabsArr)

    if(e.target.dataset.active.toLowerCase() != "all"){  
      
     const tabFilteredInvoicesArr = invoices.filter(
       invoice => invoice.status ===  e.target.dataset.active.toLowerCase()
     )
     setInvoicesArr(tabFilteredInvoicesArr)

    }else{
      setInvoicesArr(invoices)
    }

  }

  function searchInvoices(e) {

    let inputValue = e.target.value.trim().toLowerCase()

    const activeTab = displayTabs.find(tab => tab.isActive).name.toLowerCase()

    const searchFilteredInvoicesArr = invoices.filter(invoice => {
    
      const matchesTab = activeTab === "all" || invoice.status.toLowerCase() === activeTab
      
      const matchesSearch = invoice.id.toString().includes(inputValue) || 
                            invoice.client.toLowerCase().includes(inputValue)

      return matchesTab && matchesSearch

    })

    setInvoicesArr(searchFilteredInvoicesArr)
  }

  return (

    <AppShell
      topbar={
        <>
          <h1 className="text-xl">Invoices</h1>
          <Link to = '/invoices/new' className={btnPrimary}>+ New invoice</Link>
        </>
      }
    >
      <div className="flex justify-between items-center mb-5">
        <div className= "flex gap-2">
          {displayTabs.map((t, i) => (
            <div
              data-active = {t.name}
              onClick = { (e) => {activateTab(e)} }
              key={i * 100}
              className={`px-3.5 py-1.5 rounded-stamp text-sm font-semibold cursor-pointer ${
                t.isActive ? 'bg-ink-900 text-white' : 'text-gray-700'
              }`}
            >
              {t.name + 
                `(${ t.name.toLowerCase() !== "all"?
                  invoices.filter(
                    invoice => invoice.status === t.name.toLowerCase()).length: invoices.length })`
              } 

            </div>
          ))}
        </div>
        <input placeholder="Search invoice # or client…" className={`${fieldInput} w-60 py-2.5`} onInput={(e)=>{searchInvoices(e)}} />
      </div>

      <div className={card}>
        <table className={ledgerTable}>

          <thead>
            <tr>
              {['Invoice', 'Client', 'Issued', 'Due', 'Amount', 'Status']
              .map( x => <th key={x} className={ledgerTh}> {x}</th>)}
            </tr>
          </thead>

          <tbody>
            {invoicesArr.map((inv) => (
              <tr key={inv.id} className="hover:bg-paper-100 cursor-pointer">
                <td className={`${ledgerTd} font-mono`}>
                  <Link to={'/invoices/' + `${inv.id}`}>INV-{inv.id}</Link>
                </td>
                <td className={ledgerTd}>{inv.client}</td>
                <td className={ledgerTd}>{formatRawDateString(inv.issueDate)}</td>
                <td className={ledgerTd}>{formatRawDateString(inv.dueDate)}</td>
                <td className={`${ledgerTd} ${amount}`}>${inv.total.toFixed(2)}</td>
                <td className={ledgerTd}>
                  <StampBadge status={inv.status} />
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </AppShell>
  )
}
