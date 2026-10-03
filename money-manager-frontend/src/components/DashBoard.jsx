import React, { useContext } from 'react'
import Menubar from './Menubar'
import AppContext from '../context/AppContext'
import Sidebar from './Sidebar'

const DashBoard = ({ children, activeMenu }) => {
  const { user } = useContext(AppContext)

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background)]">
      <Menubar activeMenu={activeMenu} />

      {user && (
        <div className="flex flex-1 overflow-hidden">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block flex-shrink-0">
            <Sidebar activeMenu={activeMenu} />
          </div>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto pt-5 pb-8">
            <div className="page-container">
              {children}
            </div>
          </main>
        </div>
      )}
    </div>
  )
}

export default DashBoard