import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Clients from './pages/Clients.jsx'
import Invoices from './pages/Invoices.jsx'
import InvoiceCreate from './pages/InvoiceCreate.jsx'
import InvoiceDetail from './pages/InvoiceDetail.jsx'
import AdminAnalytics from './pages/AdminAnalytics.jsx'
import SettingsBilling from './pages/SettingsBilling.jsx'


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/clients" element={<Clients />} />
      <Route path="/invoices" element={<Invoices />} />
      <Route path="/invoices/new" element={<InvoiceCreate />} />
      <Route path="/invoices/:id" element={<InvoiceDetail />} />
      <Route path="/admin-analytics" element={<AdminAnalytics />} />
      <Route path="/settings/billing" element={<SettingsBilling />} />
    </Routes>
  )
}
