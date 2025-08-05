import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Logo from './Logo'
import useTheme from './useTheme.js'
import { Sun, Moon } from 'lucide-react'
import LogOutBtn from './LogOutBtn.jsx'

function Header() {
  const authStatus = useSelector((state) => state.authStore.isloggedIn)//true
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false);


  const navItems = [
    {
      path: '/',
      name: 'Home',
      active: true
    },
    {
      path: '/signup',
      name: 'Sign Up',
      active: !authStatus
    },
    {
      path: '/login',
      name: 'Log In',
      active: !authStatus
    },
    {
      path: '/all-posts',
      name: 'Posts',
      active: authStatus,
    },
    {
      path: '/all-blogs',
      name: 'Blogs',
      active: authStatus,
    }
  ]


  return (
    <header className="bg-white dark:bg-[#1E1E1E] text-[#1A1A1A] dark:text-[#E0E0E0] px-6 md:px-16 py-4 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <nav className="flex flex-row justify-between items-center">
        {/* Logo + Name */}
        <div className="flex items-center space-x-2">
          <Logo />
          <span className="text-xl font-semibold tracking-wide">Bloglyst</span>
        </div>

        {/* Navigation Items desktop*/}
        <ul className="hidden md:flex gap-4">
          {navItems.map((item, index) =>
            item.active ? (
              <li key={index}>
                <button
                  onClick={() => navigate(item.path)}
                  className="text-sm px-3 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-[#2A2A2A] transition"
                >
                  {item.name}
                </button>
              </li>
              
            ) : null
          )}
          {authStatus && <LogOutBtn/>}
        </ul>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-sm focus:outline-none"
            aria-label="Toggle menu"
          >
            {menuOpen ? '✖' : '☰'}
          </button>
        </div>

        {menuOpen && (
          <ul className="absolute top-[70px] right-6 z-50 bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 flex flex-col gap-2 md:hidden w-40">
            {navItems.map((item, index) =>
              item.active && (
                <li key={index}>
                  <button
                    onClick={() => {
                      navigate(item.path);
                      setMenuOpen(false);
                    }}
                    className="w-full text-left text-sm px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-[#2A2A2A] transition"
                  >
                    {item.name}
                  </button>
                </li>
              )
            )}
            {authStatus && <LogOutBtn />}
          </ul>
        )}

        
      </nav>
    </header>
  )
}

export default Header
