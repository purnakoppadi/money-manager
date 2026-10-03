import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AppContext from '../context/AppContext'
import { SIDE_BAR_DATA } from '../assets/assets'

const Sidebar = ({ activeMenu }) => {
  const { user } = useContext(AppContext)
  const navigate = useNavigate()

  return (
    <div className="w-60 h-[calc(100vh-57px)] bg-white border-r flex flex-col sticky top-[57px] z-20" style={{ borderColor: 'var(--color-border)' }}>
      {/* User Profile Section */}
      <div className="p-4 border-b" style={{ borderColor: 'var(--color-border-light)' }}>
        <div className="flex items-center gap-3">
          {user?.profileImageUrl ? (
            <img
              src={user.profileImageUrl}
              alt={user.fullName || 'Profile'}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-offset-1"
              style={{ ringColor: 'var(--color-primary-200)' }}
            />
          ) : (
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold text-white" style={{ backgroundColor: 'var(--color-primary)' }}>
              {user?.fullName?.charAt(0)?.toUpperCase() || 'U'}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate" style={{ color: 'var(--color-dark)' }}>
              {user?.fullName || ''}
            </p>
            <p className="text-xs truncate" style={{ color: 'var(--color-text-muted)' }}>
              {user?.email || ''}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1" role="navigation" aria-label="Main navigation">
        {SIDE_BAR_DATA.map((item, index) => {
          const isActive = activeMenu === item.label
          return (
            <button
              onClick={() => navigate(item.path)}
              key={`menu_${index}`}
              className={`w-full flex items-center gap-3 text-[13px] font-medium py-2.5 px-3 rounded-lg transition-colors cursor-pointer ${
                isActive
                  ? 'text-white'
                  : 'hover:bg-gray-50'
              }`}
              style={isActive ? { backgroundColor: 'var(--color-primary)', color: '#fff' } : { color: 'var(--color-text-secondary)' }}
              aria-current={isActive ? 'page' : undefined}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          )
        })}
      </nav>
    </div>
  )
}

export default Sidebar