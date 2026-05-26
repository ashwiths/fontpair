import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, Menu, X } from 'lucide-react'

export default function Navbar({ 
  darkMode, 
  setDarkMode, 
  searchVal: controlledSearchVal, 
  setSearchVal: controlledSetSearchVal, 
  searchOpen: controlledSearchOpen, 
  setSearchOpen: controlledSetSearchOpen 
}) {
  const [scrolled, setScrolled] = useState(false)
  const [localSearchOpen, setLocalSearchOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [localSearchVal, setLocalSearchVal] = useState('')
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const location = useLocation()

  const searchOpen = controlledSearchOpen !== undefined ? controlledSearchOpen : localSearchOpen
  const setSearchOpen = controlledSetSearchOpen !== undefined ? controlledSetSearchOpen : setLocalSearchOpen
  const searchVal = controlledSearchVal !== undefined ? controlledSearchVal : localSearchVal
  const setSearchVal = controlledSetSearchVal !== undefined ? controlledSetSearchVal : setLocalSearchVal

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const navLinks = [
    { label: 'Home', path: '/home' },
    { label: 'All Fonts', path: '/fonts' },
    { label: 'Favorites', path: '/favorites' },
    { label: 'About Us', path: '/about' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          background: scrolled ? 'rgba(10, 10, 15, 0.65)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid transparent',
          boxShadow: 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          maxWidth: '1280px', margin: '0 auto',
          padding: '0.875rem 2rem',
        }}>
          {/* Logo */}
          <Link to="/home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" style={{ width: '32px', height: '32px', flexShrink: 0 }}>
              <defs>
                <linearGradient id="navBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#A855F7" />
                </linearGradient>
              </defs>
              <rect x="10" y="10" width="100" height="100" rx="28" fill="url(#navBgGrad)" />
              <path d="M 68,32 C 60,32 54,36 54,46 L 54,58 L 44,58 C 42,58 41,59 41,61 L 41,67 C 41,69 42,70 44,70 L 54,70 L 54,92 C 54,94 55,95 57,95 L 65,95 C 67,95 68,94 68,92 L 68,70 L 76,70 C 78,70 79,69 79,67 L 79,61 C 79,59 78,58 76,58 L 68,58 L 68,48 C 68,45 70,44 73,44 C 74,44 76,44 77,45 C 78,45 79,44 79,42 L 79,35 C 79,33 78,32 76,32 Z" fill="#FFFFFF" />
              <circle cx="84" cy="84" r="10" fill="#4cede1" />
              <path d="M 80,84 L 83,87 L 88,81" stroke="#030303" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            <span style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '20px',
              color: '#ffffff', letterSpacing: '-0.02em',
            }}>
              font.<span style={{ color: '#8B5CF6' }}>save</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          {!isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    textDecoration: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '10px',
                    fontSize: '0.9rem',
                    fontWeight: isActive(link.path) ? 600 : 500,
                    color: isActive(link.path) ? '#ffffff' : 'var(--text-secondary)',
                    background: isActive(link.path) ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                    border: isActive(link.path) ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
                    boxShadow: 'none',
                    transition: 'all 0.2s ease',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {/* Search bar */}
            <div
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                width: searchOpen ? '200px' : '40px',
                transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                overflow: 'hidden',
                padding: searchOpen ? '0.5rem 1rem' : '0.5rem 0.625rem',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                boxShadow: 'none',
                borderRadius: '10px',
                cursor: searchOpen ? 'default' : 'pointer',
              }}
              onClick={() => !searchOpen && setSearchOpen(true)}
            >
              <Search size={15} color="var(--text-muted)" style={{ flexShrink: 0 }} />
              {searchOpen && (
                <input
                  autoFocus
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  onBlur={() => { if (!searchVal) setSearchOpen(false) }}
                  placeholder="Search fonts..."
                  style={{
                    background: 'transparent', border: 'none', outline: 'none',
                    fontSize: '0.875rem', color: 'var(--text-primary)', width: '100%',
                    fontFamily: 'Inter, sans-serif',
                  }}
                />
              )}
            </div>



            {/* Mobile hamburger */}
            {isMobile && (
              <button
                id="mobile-menu-toggle"
                onClick={() => setMobileOpen(!mobileOpen)}
                style={{
                  width: '40px', height: '40px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'var(--bg-card)',
                  border: '1.5px solid var(--border)',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  color: 'var(--text-secondary)',
                }}
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && isMobile && (
          <div style={{
            background: 'var(--bg-card)',
            borderTop: '1px solid var(--border)',
            padding: '0.75rem 1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
          }}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  textDecoration: 'none',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  fontSize: '0.95rem',
                  fontWeight: isActive(link.path) ? 600 : 500,
                  color: isActive(link.path) ? 'var(--primary)' : 'var(--text-secondary)',
                  background: isActive(link.path) ? 'rgba(124, 77, 255, 0.08)' : 'transparent',
                  display: 'block',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Spacer so content doesn't go under fixed navbar */}
      <div style={{ height: '68px' }} />
    </>
  )
}
