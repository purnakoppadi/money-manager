import React, { useContext, useEffect, useRef, useState } from "react"
import AppContext from "../context/AppContext"
import { useNavigate } from "react-router-dom"
import { LogOut, Menu, X } from "lucide-react"
import Sidebar from "./Sidebar"
import Logo from "./Logo"

const Menubar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)
  const { user, clearUser } = useContext(AppContext)
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowDropdown(false)
      }
    }

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showDropdown])

  // Close mobile menu on route change
  useEffect(() => {
    setOpenSideMenu(false)
  }, [activeMenu])

  const handleLogout = () => {
    localStorage.clear()
    clearUser()
    setShowDropdown(false)
    navigate("/login")
  }

  return (
    <>
      <header
        className="flex items-center justify-between bg-white border-b px-4 sm:px-6 sticky top-0 z-30"
        style={{ borderColor: 'var(--color-border)', height: '57px' }}
      >
        {/* Left */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setOpenSideMenu(!openSideMenu)}
            className="block lg:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {openSideMenu ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="flex items-center cursor-pointer" onClick={() => navigate('/dashboard')}>
            <div className="hidden sm:block">
              <Logo size="sm" showText={true} subtitle={false} />
            </div>
            <div className="block sm:hidden">
              <Logo size="sm" showText={false} />
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-gray-50 transition-colors"
            aria-label="User menu"
          >
            {user?.profileImageUrl ? (
              <img
                src={user.profileImageUrl}
                alt={user.fullName || 'Profile'}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                {user?.fullName?.charAt(0)?.toUpperCase() || 'U'}
              </div>
            )}
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium leading-tight" style={{ color: 'var(--color-dark)' }}>
                {user?.fullName || ''}
              </p>
              <p className="text-[11px] leading-tight" style={{ color: 'var(--color-text-muted)' }}>
                {user?.email || ''}
              </p>
            </div>
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-1.5 w-52 bg-white rounded-lg border shadow-lg py-1 z-50 animate-scale-in" style={{ borderColor: 'var(--color-border)' }}>
              <div className="px-3 py-2.5 border-b sm:hidden" style={{ borderColor: 'var(--color-border-light)' }}>
                <p className="text-sm font-medium" style={{ color: 'var(--color-dark)' }}>
                  {user?.fullName}
                </p>
                <p className="text-xs truncate" style={{ color: 'var(--color-text-muted)' }}>
                  {user?.email}
                </p>
              </div>
              <div className="py-1">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2.5 w-full px-3 py-2 text-sm hover:bg-gray-50 transition-colors"
                  style={{ color: 'var(--color-expense)' }}
                >
                  <LogOut size={15} />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {openSideMenu && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-20 lg:hidden"
            onClick={() => setOpenSideMenu(false)}
          />
          <div className="fixed left-0 top-[57px] bottom-0 z-25 lg:hidden animate-slide-in-left">
            <Sidebar activeMenu={activeMenu} />
          </div>
        </>
      )}
    </>
  )
}

export default Menubar