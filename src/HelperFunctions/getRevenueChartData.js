export default function getRevenueChartData(invoices) {

    const template = {
    'APR': { month: 'APR', billed: 0, collected: 0 },
    'MAY': { month: 'MAY', billed: 0, collected: 0 },
    'JUN': { month: 'JUN', billed: 0, collected: 0 },
    'JUL': { month: 'JUL', billed: 0, collected: 0 },
    'AUG': { month: 'AUG', billed: 0, collected: 0 },
    'SEP': { month: 'SEP', billed: 0, collected: 0 },
  }

  invoices.forEach(invoice => {

    if (invoice.status === 'draft') return

    const monthKey = new Date(invoice.issueDate).toLocaleString('en-US', { month: 'short' }).toUpperCase()

    if (template[monthKey]) {

      template[monthKey].billed += invoice.total
      
      if (invoice.status === 'paid') {
        template[monthKey].collected += invoice.total
      }
    }
  })

  return Object.values(template)
  
}