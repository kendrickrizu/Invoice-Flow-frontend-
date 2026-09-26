import { createContext, useState, useContext, useCallback } from 'react'

const DataContext = createContext()

export function DataProvider({ children }) {
  const [invoices, setInvoices] = useState([])
  const [clients, setClients] = useState([])
  const [hasFetched, setHasFetched] = useState({ invoices: false, clients: false })

  const fetchInvoices = useCallback(async () => {
        try {
            const res = await fetch('http://localhost:3000/api/invoices')
            const data = await res.json()
            setInvoices(data)
            setHasFetched(prev => ({ ...prev, invoices: true }))
        } catch (err) {
            console.error("Failed to fetch invoices:", err)
        }
  }, [] )

  const fetchClients = useCallback(async () => {
    if (hasFetched.clients) return

    try {
      const res = await fetch('http://localhost:3000/api/clients')
      const data = await res.json()
      const clientsData = data.map(client => {
          const openBalance = invoices.filter(inv => inv.client === client.name && (inv.status === 'sent' || inv.status === 'overdue')).reduce((sum, inv) => sum + inv.total, 0)
          return {...client, open: openBalance}
      })
      setClients(clientsData)
      setHasFetched(prev => ({ ...prev, clients: true }))
    } catch (err) {
      console.error("Failed to fetch clients:", err)
    }
  }, [hasFetched.clients])

  return (
    <DataContext.Provider value={{ 
      invoices, 
      clients, 
      fetchInvoices, 
      fetchClients 
    }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  return useContext(DataContext)
}