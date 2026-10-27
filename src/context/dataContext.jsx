import { createContext, useContext, useCallback, useMemo } from 'react'

const DataContext = createContext(null)

// Placeholder until the database is connected: no network calls, always empty.
const EMPTY_INVOICES = []
const EMPTY_CLIENTS = []

export function DataProvider({ children }) {
  // Same names the pages already use. They do nothing for now.
  // useCallback with [] keeps one identity forever, so the
  // useEffect(() => fetchX(), [fetchX]) in your pages runs once and stops.
  const fetchInvoices = useCallback(async () => {}, [])
  const fetchClients = useCallback(async () => {}, [])

  const value = useMemo(
    () => ({
      invoices: EMPTY_INVOICES,
      clients: EMPTY_CLIENTS,
      fetchInvoices,
      fetchClients,
    }),
    [fetchInvoices, fetchClients]
  )

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  const context = useContext(DataContext)
  if (context === null) {
    throw new Error('useData must be used inside a DataProvider')
  }
  return context
}