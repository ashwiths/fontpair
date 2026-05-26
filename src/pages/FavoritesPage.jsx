import { useState, useEffect, memo } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Copy, Check, Trash2, BookOpen } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import { PROCESSED_FONTS, getCategoryColor, useLoadGoogleFont } from '../utils/fontLoader'

function FavCard({ name, onRemove }) {
  const [copied, setCopied] = useState(false)
  const fontData = PROCESSED_FONTS.find(f => f.name === name) || { category: 'Sans Serif' }
  const catColor = getCategoryColor(fontData.category)

  // Lazy load font file only when this specific card mounts
  const isLoaded = useLoadGoogleFont(name)

  const handleCopy = () => {
    navigator.clipboard.writeText(`font-family: '${name}', sans-serif;`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.94, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -10 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '20px',
        padding: '1.25rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Corner glow */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: '60px', height: '60px',
        background: `radial-gradient(circle, ${catColor}15, transparent 70%)`,
        borderRadius: '50%',
        pointerEvents: 'none',
      }} />

      {/* Heart icon + remove */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.875rem' }}>
        <Heart size={18} fill="#EF4444" color="#EF4444" />
        <button
          id={`remove-fav-${name.replace(/\s+/g, '-')}`}
          onClick={() => onRemove(name)}
          title="Remove from favorites"
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#52525b', transition: 'color 0.2s ease', padding: '2px',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#EF4444'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#52525b'}
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Font name */}
      <p style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: '0.9rem', color: '#ffffff', marginBottom: '6px' }}>
        {name}
      </p>
      <span style={{
        fontSize: '0.72rem', fontWeight: 600, color: catColor,
        background: `${catColor}14`, padding: '2px 8px', borderRadius: '99px',
        display: 'inline-block', marginBottom: '1rem',
      }}>
        {fontData.category}
      </span>

      {/* Preview */}
      <div style={{
        background: 'rgba(0, 0, 0, 0.2)', borderRadius: '12px', padding: '1rem 1.25rem',
        marginBottom: '1rem',
      }}>
        {isLoaded ? (
          <p style={{
            fontFamily: fontData.family || fontData.name || name,
            fontSize: '1.5rem', color: '#ffffff', lineHeight: 1.3,
          }}>
            The quick brown fox jumps over the lazy dog.
          </p>
        ) : (
          <div style={{
            width: '80%',
            height: '16px',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '4px',
            animation: 'pulse 1.5s infinite ease-in-out',
          }} />
        )}
      </div>

      {/* Actions */}
      <button
        onClick={handleCopy}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
          padding: '0.45rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.05)',
          background: 'transparent', color: copied ? '#8B5CF6' : '#71717a',
          fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s ease',
          fontFamily: 'Inter',
        }}
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
        {copied ? 'Copied!' : 'Copy CSS'}
      </button>
    </motion.div>
  )
}

const MemoizedFavCard = memo(FavCard)

export default function FavoritesPage({ darkMode, setDarkMode }) {
  const [favorites, setFavorites] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem('fsc_favorites') || '[]')) }
    catch { return new Set() }
  })
  const [searchVal, setSearchVal] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)

  const removeFav = (name) => {
    setFavorites(prev => {
      const next = new Set(prev)
      next.delete(name)
      localStorage.setItem('fsc_favorites', JSON.stringify([...next]))
      return next
    })
  }

  const clearAll = () => {
    setFavorites(new Set())
    localStorage.setItem('fsc_favorites', '[]')
  }

  const favList = [...favorites].filter(name => 
    searchVal.trim() === '' || name.toLowerCase().includes(searchVal.toLowerCase())
  )

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at top, rgba(139, 92, 246, 0.08), transparent 50%), #05010d',
      color: '#ffffff',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Tiny Analog Noise/Grain Texture Overlay */}
      <div style={{
        position: 'fixed', inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        opacity: 0.015,
        pointerEvents: 'none',
        zIndex: 9999,
      }} />

      <Navbar 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        searchVal={searchVal}
        setSearchVal={setSearchVal}
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
      />

      {/* Header */}
      <div style={{ padding: '6.5rem 0 2.5rem' }}>
        <div className="section-container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="badge" style={{
              display: 'inline-flex', gap: '6px', alignItems: 'center',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              background: 'rgba(255, 255, 255, 0.02)',
              color: '#d8b4fe',
              marginBottom: '1rem',
            }}>
              <Heart size={12} fill="currentColor" /> Saved Fonts
            </span>
            <h1 className="heading-h1" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#ffffff', marginBottom: '0.75rem', fontWeight: 800 }}>
              Your <span style={{
                background: 'linear-gradient(135deg, #ffffff 10%, #C084FC 50%, #8B5CF6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Favorites</span>
            </h1>
            <p style={{ color: '#b4b0cc', fontSize: '1rem' }}>
              {favList.length > 0
                ? `You've saved ${favList.length} font${favList.length === 1 ? '' : 's'} to your collection.`
                : 'Your saved fonts will appear here.'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="section-container" style={{ maxWidth: '1100px', margin: '0 auto', paddingTop: '2.5rem', paddingBottom: '6rem', paddingLeft: '2rem', paddingRight: '2rem' }}>
        <AnimatePresence mode="wait">
          {favList.length === 0 ? (
            /* Empty state */
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{ textAlign: 'center', padding: '6rem 2rem' }}
            >
              {/* Illustration */}
              <div style={{
                width: '140px', height: '140px',
                background: 'rgba(255,255,255,0.02)',
                border: '2px dashed rgba(255,255,255,0.08)',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 2rem',
              }}>
                <BookOpen size={52} color="rgba(255, 255, 255, 0.2)" />
              </div>

              <h2 style={{
                fontFamily: 'Plus Jakarta Sans', fontWeight: 700,
                fontSize: '1.75rem', color: '#ffffff', marginBottom: '0.875rem',
              }}>
                No favorites yet
              </h2>
              <p style={{ color: '#71717a', fontSize: '1rem', maxWidth: '380px', margin: '0 auto 2.5rem', lineHeight: 1.65 }}>
                Start exploring fonts and click the ❤️ icon to save your favorites here for quick access.
              </p>

              <Link to="/home" style={{ textDecoration: 'none' }}>
                <button id="explore-fonts-btn" style={{
                  background: 'linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)',
                  color: '#ffffff',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  padding: '0.85rem 2.25rem',
                  borderRadius: '16px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(139, 92, 246, 0.15)',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                }}>
                  Explore Fonts
                </button>
              </Link>
            </motion.div>
          ) : (
            <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Top bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem' }}>
                <p style={{ color: '#71717a', fontSize: '0.875rem' }}>
                  <strong style={{ color: '#ffffff' }}>{favList.length}</strong> saved font{favList.length !== 1 && 's'}
                </p>
                <button
                  id="clear-all-favorites"
                  onClick={clearAll}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    background: 'none', border: '1px solid rgba(239,68,68,0.2)',
                    color: '#EF4444', padding: '0.4rem 0.875rem', borderRadius: '10px',
                    fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239,68,68,0.06)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                >
                  <Trash2 size={13} /> Clear All
                </button>
              </div>

              {/* Cards */}
              <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
                <AnimatePresence>
                  {favList.map(name => (
                    <MemoizedFavCard key={name} name={name} onRemove={removeFav} />
                  ))}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
