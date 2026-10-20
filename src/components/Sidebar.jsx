import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { navItemBase, navItemActive } from '../styles/ui.js'

export default function Sidebar({ onClose }) {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const linkClass = ({ isActive }) => `${navItemBase} ${isActive ? navItemActive : ''}`

  async function handleLogout() {
    onClose?.()
    await signOut()
    navigate('/login', { replace: true })
  }

  return (
    <nav className="h-full overflow-y-auto w-[236px] shrink-0 bg-ink-900 text-paper-50 px-4 py-6 flex flex-col gap-8">
      
      <div className="flex items-center gap-2 font-display text-md font-semibold text-white">
        <div className="w-[22px] h-[22px] border-[1.5px] border-white rounded flex items-center justify-center font-mono text-[11px]">
          IF
        </div>
        InvoiceFlow
      </div>

      <div className="flex flex-col gap-1">
        <NavLink to="/dashboard" className={linkClass} onClick={onClose}>
          <span className="w-4 text-center opacity-90">◆</span>Dashboard
        </NavLink>
        <NavLink to="/invoices" className={linkClass} onClick={onClose}>
          <span className="w-4 text-center opacity-90">▤</span>Invoices
        </NavLink>
        <NavLink to="/clients" className={linkClass} onClick={onClose}>
          <span className="w-4 text-center opacity-90">◈</span>Clients
        </NavLink>
        <NavLink to="/settings/billing" className={linkClass} onClick={onClose}>
          <span className="w-4 text-center opacity-90">⚙</span>Settings
        </NavLink>
      </div>

      <div className="flex flex-col gap-1">
        <NavLink to="/admin-analytics" className={linkClass} onClick={onClose}>
          <span className="w-4 text-center opacity-90">▦</span>Admin Analytics
        </NavLink>
      </div>

      <div className="mt-auto flex flex-col gap-4">
        <button
          type="button"
          onClick={handleLogout}
          className={`${navItemBase} w-full text-left`}
        >
          <span className="w-4 text-center opacity-90">⏻</span>Log out
        </button>

        <div className="text-xs text-[#7FA39D] break-words">
          {user?.user_metadata?.company_name}
          <br />
          {user?.email}
        </div>
      </div>
      
    </nav>
  )
}