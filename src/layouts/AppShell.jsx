import { useState } from 'react'
import Sidebar from '../components/Sidebar.jsx'

export default function AppShell({ topbar, children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden">
      
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className={`
        fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>

        <div className="h-full bg-white shadow-xl lg:shadow-none">
           <Sidebar />
        </div>
      </div>

      <div className="flex flex-col flex-1 min-w-0 h-full w-full">
        
        <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-4 lg:px-8 lg:py-5 border-b border-line bg-paper-0 shrink-0 gap-4">
          
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-1 -ml-1 text-gray-700 hover:text-gray-900 focus:outline-none lg:hidden shrink-0"
            aria-label="Open sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex flex-1 items-center justify-between min-w-0">
            {topbar}
          </div>
          
        </div>

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {children}
        </main>
        
      </div>
    </div>
  )
}