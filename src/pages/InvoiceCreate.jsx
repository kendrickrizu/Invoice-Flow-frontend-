import {useNavigate } from 'react-router-dom' 
import { useState } from 'react'
import AppShell from '../layouts/AppShell.jsx'
import { btnPrimary, btnSecondary, cardPad, fieldWrap, fieldLabel, fieldInput, lineInput } from '../styles/ui.js'
import { useData } from '../context/dataContext.jsx'

const lineItems = [{description: 'First Product', qty: 1, rate: 0.00,amount: 0.00}]

function generateInvNumber() {
  let rawInvNumber = Number(Number((Math.random() * 3000).toPrecision(4)).toFixed(0))
  return (rawInvNumber < 1000 ) ? (rawInvNumber + 1000) : rawInvNumber
}

const invNumber = generateInvNumber()
const currencies = [ {name: 'USD', sign: '$'}, {name: 'EUR', sign: '€'}, {name: 'NGN', sign: 'N'}]

export default function InvoiceCreate() {

  const navigate = useNavigate() 
  const { clients, fetchInvoices } = useData()
  const [currentIssueDate, setCurrentIssueDate] = useState("")
  const [subTotal, setSubTotal] = useState(0)
  const [newLineItems, setNewLineItems] = useState(lineItems)


  function addLineItem() {
    const newLineItem = {
          description: '', 
          qty: 0.00, 
          rate: 0.00, 
          amount: ''
    }
    setNewLineItems([...newLineItems, newLineItem])
  }

  function checkInputs(e) {
    const tbody = e.currentTarget
    const rows = tbody.querySelectorAll("tr")

    const allLineItems = Array.from(rows).map( row => {
      const inputs = row.querySelectorAll("input")

      const description = inputs[0].value
      const qty = Number(inputs[1].value)
      const rate = Number(inputs[2].value)
      const amount = qty * rate

      inputs[3].value = amount.toFixed(2)

      return {
        description,
        qty, 
        rate, 
        amount
      }
    })

    const subtotal = allLineItems.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.amount
    }, 0)

    setSubTotal(subtotal)
  }

  async function handleSubmit(e) {

    e.preventDefault()
    const action = e.nativeEvent.submitter.value 

    const invoiceDetails = Object.fromEntries(new FormData(e.target).entries())
    const rows = e.target.querySelector('tbody').querySelectorAll('tr')

    const itemsData = Array.from(rows).map(row => {
      const inputs = row.querySelectorAll("input")
      return {
        description: inputs[0].value,
        qty: Number(inputs[1].value),
        rate: Number(inputs[2].value),
        amount: Number(inputs[1].value) * Number(inputs[2].value)
      }
    })

    const newInvoice = {
      id: invNumber, 
      client: invoiceDetails.clientName,
      currency: invoiceDetails.currency,
      issueDate: invoiceDetails.issueDate,
      dueDate: invoiceDetails.dueDate,
      items: itemsData,
      subTotal: subTotal,
      total: subTotal + (subTotal * 0.08),
      status: action === "saveAsDraft" ? 'Draft' : 'Pending'
    }

    const response = await fetch('http://localhost:3000/api/invoices', {
      method: "POST",
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(newInvoice)
    })

    const data = await response.json()
    console.log(data.message)
    await fetchInvoices()
    navigate(`/invoices/${action === "saveAsDraft" ? '' : newInvoice.id}`)

  }


  return (

    <AppShell
      topbar={
        <>
          <h1 className="text-xl">
            New invoice 
            <span className="font-mono mx-2 text-gray-500 text-md">INV-{invNumber}</span>
          </h1>

          <div className="flex gap-3">
            <button 
              type="submit" 
              form="create-invoice-form" 
              className={btnSecondary}
              value="saveAsDraft"
            >
              Save As Draft
            </button>

            <button 
              type="submit" 
              form="create-invoice-form" 
              className={btnPrimary}
              value="reviewAndSend"
            >
              Review & send
            </button>
          </div>
        </>
      }
    >

      <div className="flex gap-6">
        <div className="flex-1">

        <form id="create-invoice-form" onSubmit={handleSubmit}>
          <div className={`${cardPad} mb-5`}>
            <div className="grid grid-cols-2 gap-4">

              <div className={fieldWrap}>
                <label className={fieldLabel}>Bill to</label>
                <input 
                  type="text" 
                  name="clientName" 
                  list="clients-list"
                  className={fieldInput}
                  placeholder="John Doe"
                  required
                />
                <datalist id="clients-list" >
                  {clients.map((client, i) => <option key={i + 1}>{client.name}</option>)}
                </datalist>
              </div>

              <div className={fieldWrap}>
                <label className={fieldLabel}>Currency</label>
      
                <select name="currency" className={fieldInput} required>
                  {currencies.map((currency, i) => <option key={currency.name}>{currency.sign}</option>)}
                </select> 
              </div>

              <div className={fieldWrap}>
                <label className={fieldLabel}>Issue date</label>
                <input type="date" name="issueDate" onChange= {(e) => setCurrentIssueDate(e.target.value)} className={fieldInput} required/>
              </div>

              <div className={fieldWrap}>
                <label className={fieldLabel}>Due date</label>
                <input type="date" name="dueDate" min={currentIssueDate} required className={fieldInput} />
              </div>

            </div>
          </div>

          <div className={cardPad}>
            <div className="text-sm font-semibold">Line items</div>

            <table className="w-full border-collapse my-5">
              <thead>
                <tr>
                  {['Description', 'Qty', 'Rate', 'Amount'].map((header, i) => {
                    return <th key={i + 12} className={`text-left text-xs text-gray-500 uppercase tracking-wide pb-2 border-b border-line-strong ${header === 'Description'? 'w-1/2':''}`}>{header}</th>
                  })}
                </tr>
              </thead>

              <tbody onChange={(e) => checkInputs(e)}>
                {newLineItems.map((item, i) => (
                  <tr key={i}>
                    <td className="py-3 pr-2 border-b border-line">
                      <input type='text' defaultValue={item.description} placeholder='Description' title='Items Description' className={lineInput} required/>
                    </td>
                    <td className="py-3 pr-2 border-b border-line">
                      <input type='number' min={0} defaultValue={item.qty} className={`${lineInput} w-10`} placeholder='Quantity' title='Quantity' required/>
                    </td>
                    <td className="py-3 pr-2 border-b border-line">
                      <input type='number' min={0} defaultValue={item.rate.toFixed(2)} className={`${lineInput} w-[90px]`} placeholder='Rate' title='Item Rate' required/>
                    </td>
                    <td className="py-3 border-b border-line">
                      <input type='number' min={0} defaultValue={item.amount} readOnly className={`${lineInput} font-mono text-right`} placeholder='Sub-Total' title='Item Sub-Total'/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div onClick={() => addLineItem()} className="text-sm text-brand-600 font-semibold cursor-pointer inline-flex items-center gap-1.5">+ Add line item</div>

            <div className="ml-auto w-[260px] flex flex-col gap-2 mt-6">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span><span className="font-mono">{subTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax (8%)</span><span className="font-mono">{(subTotal * 0.08).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold pt-3 border-t border-line-strong font-mono">
                <span className="font-body">Total due</span>
                <span>{(subTotal + (subTotal * 0.08)).toFixed(2)}</span>
              </div>
            </div>
          </div>

        </form>

        <div className={`${fieldWrap} mt-5`}>
          <label className={fieldLabel}>Note to client</label>
          <textarea
            name="notes"
            readOnly
            rows="3"
            defaultValue="Thanks for the continued work together — payable via card or bank transfer, link included below."
            className={fieldInput}
          />
        </div>

        </div>

        <div className="right w-[300px] shrink-0">
          <div className="preview-card bg-[var(--paper-100)] rounded-[var(--r-lg)] p-[var(--sp-5)] text-[length:var(--text-xs)] text-[color:var(--gray-500)] sticky top-[var(--sp-6)]">
              <strong className="text-[color:var(--ink-900)] text-[length:var(--text-sm)]">Payment options</strong>
              <p className="mt-[var(--sp-2)]"> This invoice will include a secure Stripe checkout link — your client can pay by card or ACH directly from the email.</p>
              <div className="flex gap-[var(--sp-2)] mt-[var(--sp-3)]">
                  {['Card', 'ACH'].map((x, i)=> <span key={i + 3} className="stamp stamp-pending transform-none">{x}</span> )}
              </div>
          </div>
      </div>

      </div>
    </AppShell>
  )
}