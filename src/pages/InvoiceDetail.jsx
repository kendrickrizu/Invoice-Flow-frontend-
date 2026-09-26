// import { useState } from 'react'
import { useParams } from 'react-router-dom'
import AppShell from '../layouts/AppShell.jsx'
import StampBadge from '../components/StampBadge.jsx'
import { btnSecondary, cardPad, amount } from '../styles/ui.js'
import { useData } from '../context/dataContext.jsx'


export default function InvoiceDetail() {
  
  const { invoices } = useData()
  const { id } = useParams()
  let actualInvoice = invoices.find(invoice => String(invoice.id) === String(id))

  
    if (!actualInvoice) {
      return (
        <AppShell
          topbar={
            <h1 className="text-xl">Invoice not found</h1>
          }
        >
          <div className="p-10 text-center text-gray-500">
            We couldn't find an invoice with the ID: {id} 
            <br/>(If you refreshed the page, the mocked array might have reset).
          </div>
        </AppShell>
      )
    }

  return (
    
    <AppShell
      topbar={
        <>
          <h1 className="text-xl">
            Invoice <span className="font-mono text-md text-gray-500">{'INV-' + id}</span>
          </h1> 
          <div className="flex gap-3">
            <a href="#" className={btnSecondary}>Download PDF</a>
            <a href="#" className={btnSecondary}>Send reminder</a>
          </div>
        </>
      }
    >

      <div className="flex gap-6 items-start">

        <div className="flex-1 bg-paper-0 border border-line rounded-lg p-10 relative shadow-md">

          <div className="absolute top-[110px] right-[70px] font-mono font-bold text-2xl text-success-600 border-[3px] border-success-600 rounded-xl px-5 py-2 -rotate-[9deg] opacity-85 tracking-wider">
            PAID
          </div>

          <div className="flex justify-between items-start mb-10">

            <div>

              <div className="w-[34px] h-[34px] bg-ink-900 rounded-[7px] text-white flex items-center justify-center font-mono text-sm mb-2">
                IF
              </div>
              <h2 className="text-2xl">Invoice</h2>
              <div className="text-sm text-gray-500 mt-2">
                Northwood Studio<br />142 Bellrose Ave, Suite 4<br />Portland, OR 97209
              </div>

            </div>

            <div className="text-right text-sm text-gray-500">
              <div className="font-mono text-ink-900 text-md font-semibold">{'INV-' + actualInvoice.id}</div>
              <div className="mt-3">Issued &nbsp;&nbsp;&nbsp;&nbsp; {actualInvoice.issueDate}</div>
              <div>Due &nbsp;&nbsp;&nbsp;&nbsp; {actualInvoice.dueDate}</div>
              <div>Paid &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate()}</div>
            </div>

          </div>

          <div className="grid grid-cols-2 gap-6 mb-8 text-sm">
            <div>
              <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">Billed to</div>
              <strong>{actualInvoice.client}</strong>
              <br />{actualInvoice.email}<br />{!actualInvoice.address ? '': ''}
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">Payment method</div>
              <strong>Visa •••• 4242</strong>
              <br />Charged Aug 27, 2026, 4:12 PM<br />Receipt #RCPT-88231
            </div>
          </div>

          <table className="w-full border-collapse mb-6">

            <thead>
              <tr>
                {['Description', 'Qty', 'Rate', 'Amount'].map(x => 
                  <th key={x} className={`${x == 'Amount' ? 'text-right' : 'text-left' } text-xs uppercase text-gray-500 pb-2 border-b-[1.5px] border-ink-900 `}>{x}</th>
                  )}
              </tr>
            </thead>

            <tbody>
              {
                (actualInvoice.items).map((inv, i) =>
                     <tr key={i + 1}>
                        <td className="py-3 border-b border-line">{inv.description}</td>
                        <td className="py-3 border-b border-line">{inv.qty}</td>
                        <td className="py-3 border-b border-line font-mono">{inv.rate}</td>
                        <td className= {`py-3 border-b border-line text-right ${amount}`}>{actualInvoice.currency}{inv.amount}</td>
                      </tr>
                )
              }
            </tbody>

          </table>

          <div className="ml-auto w-[260px]">

            <div className="flex justify-between text-sm py-2">
              <span>Subtotal</span>
              <span className="font-mono">${actualInvoice.subTotal}</span>
            </div>

            <div className="flex justify-between text-sm py-2">
              <span>Tax (8%)</span>
              <span className="font-mono">${(0.08 * actualInvoice.subTotal).toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-xl font-semibold border-t-[1.5px] border-ink-900 mt-2 pt-3">
              <span>Total paid</span>
              <span className="font-mono">${actualInvoice.total}</span>
            </div>
          </div>

        </div>

        <div className="w-80 flex flex-col gap-5 shrink-0">
          <div className={cardPad}>

            <div className="text-sm font-semibold mb-4">Payment</div>

            <div className="flex justify-between text-sm py-2">
              <span>Status</span>
              <StampBadge status="paid" label="Paid" />
            </div>

            <div className="flex justify-between text-sm py-2">
              <span>Amount</span>
              <span className={amount}>${actualInvoice.total}</span>
            </div>

            <div className="flex justify-between text-sm py-2">
              <span>Method</span>
              <span>Visa •••• 4242</span>
            </div>

            <div className="flex justify-between text-sm py-2">
              <span>Processor</span>
              <span>Stripe</span>
            </div>

            <div className="border border-line-strong rounded-md px-3 py-2.5 flex items-center gap-2 font-mono text-sm text-gray-700 mt-3">
              💳 •••• •••• •••• 4242 &nbsp; 08/28
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mt-4 justify-center">
              🔒 Secured &amp; processed by Stripe
            </div>

          </div>

          <div className={cardPad}>

            <div className="text-sm font-semibold mb-3">Receipt</div>
            <p className="text-sm text-gray-500 mb-4">
              A PDF receipt was emailed automatically to {actualInvoice.client} on payment.
            </p>
            <a href="#" className={`${btnSecondary} w-full justify-center`}>Download receipt PDF</a>
          </div>

        </div>

      </div>

    </AppShell>
  )
}
