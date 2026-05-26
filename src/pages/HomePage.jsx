import { useState, useEffect, useCallback, useRef, memo } from 'react'
import { Heart, Copy, Check, TrendingUp, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import { PROCESSED_FONTS, CATEGORIES, getCategoryColor, useLoadGoogleFont } from '../utils/fontLoader'
import { useWindowVirtualList } from '../utils/useVirtualList'

const DEFAULT_TEXT = 'The quick brown fox jumps over the lazy dog.'
const PREVIEW_SIZE = 24

function FontCard({ font, previewText, favorites, onToggleFavorite }) {
  const [copied, setCopied] = useState(false)
  const isFav = favorites.has(font.name)
  const catColor = getCategoryColor(font.category)
  const displayText = previewText.trim() || DEFAULT_TEXT

  // Lazy load font file dynamically using WebFont Loader hook
  const loadStatus = useLoadGoogleFont(font.name)
  const isLoaded = loadStatus === 'loaded'
  const isError = loadStatus === 'error'

  const handleCopy = (e) => {
    e.stopPropagation()
    const cssText = `font-family: '${font.name}', sans-serif;`
    navigator.clipboard.writeText(cssText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      className="premium-font-card"
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '106px', // Constrained height for pixel-perfect virtualization calculations
        boxSizing: 'border-box'
      }}
    >
      {/* Left: Font Meta Info */}
      <div style={{ minWidth: '150px', flexShrink: 0 }}>
        <h3 style={{
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          fontWeight: 700,
          fontSize: '1rem',
          color: '#ffffff',
          marginBottom: '6px',
        }}>
          {font.name}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center',
            fontSize: '0.72rem', fontWeight: 600, color: catColor,
            background: `${catColor}15`,
            padding: '3px 10px', borderRadius: '99px',
            border: `1px solid ${catColor}30`,
          }}>
            {font.category}
          </span>
          {font.trending && (
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '3px',
              fontSize: '0.68rem', fontWeight: 600, color: '#F59E0B',
              background: 'rgba(245, 158, 11, 0.12)',
              padding: '2px 8px', borderRadius: '99px',
            }}>
              <TrendingUp size={11} /> Hot
            </span>
          )}
        </div>
      </div>

      {/* Left-Center: Large Preview Text */}
      <div style={{ flex: 1, minWidth: 0, textAlign: 'left', paddingLeft: '3rem', paddingRight: '2rem' }}>
        {isLoaded || isError ? (
          <p style={{
            fontFamily: isError ? 'sans-serif' : (font.family || font.name),
            fontSize: `${PREVIEW_SIZE}px`,
            fontWeight: 500,
            color: isError ? '#71717a' : '#ffffff',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineHeight: 1.3,
          }}>
            {displayText}
            {isError && (
              <span style={{ fontSize: '0.65rem', color: '#ef4444', marginLeft: '8px', fontWeight: 600 }}>
                (offline)
              </span>
            )}
          </p>
        ) : (
          <div style={{
            width: '60%',
            height: '20px',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '4px',
            animation: 'pulse 1.5s infinite ease-in-out',
          }} />
        )}
      </div>

      {/* Right: Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.1rem', flexShrink: 0, paddingRight: '0.5rem' }}>
        {/* Favorite */}
        <button
          id={`fav-${font.name.replace(/\s+/g, '-')}`}
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(font.name) }}
          style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
            background: 'none', border: 'none', cursor: 'pointer',
            color: isFav ? '#EF4444' : '#52525b',
            transition: 'transform 0.2s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <Heart size={18} fill={isFav ? '#EF4444' : 'none'} style={{ transition: 'all 0.2s' }} />
          <span style={{ fontSize: '0.68rem', fontWeight: 600, color: '#71717a' }}>Save</span>
        </button>

        {/* Copy CSS */}
        <button
          id={`copy-${font.name.replace(/\s+/g, '-')}`}
          onClick={handleCopy}
          style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
            background: 'none', border: 'none', cursor: 'pointer',
            color: copied ? '#8B5CF6' : '#52525b',
            transition: 'transform 0.2s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          {copied ? <Check size={18} className="text-[#8B5CF6]" /> : <Copy size={18} />}
          <span style={{ fontSize: '0.68rem', fontWeight: 600, color: '#71717a' }}>Copy</span>
        </button>
      </div>
    </motion.div>
  )
}

// Memoize FontCard to optimize performance and prevent scroll re-renders
const MemoizedFontCard = memo(FontCard)

export default function HomePage({ darkMode, setDarkMode }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [previewText, setPreviewText] = useState('')
  const [favorites, setFavorites] = useState(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem('fsc_favorites') || '[]'))
    } catch { return new Set() }
  })
  const [sortBy, setSortBy] = useState('popular')
  const [searchVal, setSearchVal] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)

  const listContainerRef = useRef(null)

  useEffect(() => {
    localStorage.setItem('fsc_favorites', JSON.stringify([...favorites]))
  }, [favorites])

  const toggleFavorite = useCallback((name) => {
    setFavorites(prev => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }, [])

  // Filter & Sort list of 1,500+ Google Fonts
  const filtered = PROCESSED_FONTS
    .filter(f => {
      if (activeCategory !== 'All' && f.category !== activeCategory) return false
      if (searchVal.trim()) {
        const term = searchVal.toLowerCase()
        return f.name.toLowerCase().includes(term) || f.category.toLowerCase().includes(term)
      }
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'popular') return (b.popular ? 1 : 0) - (a.popular ? 1 : 0) || a.name.localeCompare(b.name)
      if (sortBy === 'trending') return (b.trending ? 1 : 0) - (a.trending ? 1 : 0) || a.name.localeCompare(b.name)
      if (sortBy === 'new') return (b.new ? 1 : 0) - (a.new ? 1 : 0) || a.name.localeCompare(b.name)
      return a.name.localeCompare(b.name)
    })

  // Virtualization List calculation (itemHeight: 120px matches card 106px + gap)
  const { visibleItems, containerStyle } = useWindowVirtualList(listContainerRef, filtered, 120, 6)

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

      {/* Centered Soft Purple Radial Blur behind Heading */}
      <div style={{
        position: 'absolute', top: '12%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '500px', height: '220px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.04), transparent 60%)',
        filter: 'blur(80px)', zIndex: 1, pointerEvents: 'none',
      }} />

      <Navbar 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        searchVal={searchVal}
        setSearchVal={setSearchVal}
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
      />

      {/* HERO SECTION */}
      <section style={{
        position: 'relative', zIndex: 5,
        paddingTop: '70px', paddingBottom: '60px',
        textAlign: 'center',
      }}>
        <div className="section-container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>
          {/* Sparkles Badge */}
          <div style={{ marginBottom: '1.25rem', display: 'flex', justifyContent: 'center' }}>
            <span className="badge" style={{
              display: 'inline-flex', gap: '6px', alignItems: 'center',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              background: 'rgba(255, 255, 255, 0.02)',
              color: '#d8b4fe',
            }}>
              <Sparkles size={13} />
              600+ Real Google Fonts Loaded Dynamically
            </span>
          </div>

          {/* Heading Title */}
          <div style={{ maxWidth: '900px', width: '100%', margin: '0 auto' }}>
            <h1 style={{
              fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              marginBottom: '1rem',
              color: '#ffffff',
            }}
            >
              Font Style <span style={{
                background: 'linear-gradient(135deg, #ffffff 10%, #C084FC 50%, #8B5CF6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Changer</span>
            </h1>
          </div>

          {/* Subtitle */}
          <p style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
            color: '#b4b0cc',
            maxWidth: '560px',
            margin: '0 auto 2rem',
            lineHeight: 1.5,
            fontWeight: 400,
          }}
          >
            Type something and preview it instantly in 600+ beautiful Google Fonts.
          </p>

          {/* Textarea Input area */}
          <div
            style={{
              maxWidth: '720px', margin: '0 auto', position: 'relative',
              borderRadius: '24px',
              background: 'rgba(255, 255, 255, 0.02)',
              backdropFilter: 'blur(30px)',
              border: '1.5px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
              padding: '2px',
              transition: 'all 0.3s ease',
              height: '140px',
            }}
            id="glowing-textarea-wrapper"
          >
            <textarea
              id="preview-text-input"
              value={previewText}
              onChange={(e) => setPreviewText(e.target.value)}
              placeholder="Type your text here to preview fonts instantly..."
              maxLength={120}
              style={{
                width: '100%',
                height: '100%',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#ffffff',
                fontSize: '1rem',
                fontFamily: 'Inter, sans-serif',
                padding: '1.2rem 1.2rem 2.2rem',
                resize: 'none',
                borderRadius: '22px',
              }}
              onFocus={() => {
                const parent = document.getElementById('glowing-textarea-wrapper')
                if (parent) {
                  parent.style.borderColor = 'rgba(139, 92, 246, 0.5)'
                  parent.style.boxShadow = '0 4px 20px rgba(139, 92, 246, 0.06)'
                }
              }}
              onBlur={() => {
                const parent = document.getElementById('glowing-textarea-wrapper')
                if (parent) {
                  parent.style.borderColor = 'rgba(255, 255, 255, 0.08)'
                  parent.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)'
                }
              }}
            />
            <span style={{
              position: 'absolute', bottom: '14px', right: '20px',
              fontSize: '0.75rem', color: '#72689c', fontWeight: 600,
            }}>
              {previewText.length} / 120
            </span>
          </div>
        </div>
      </section>

      {/* FILTER + FONTS GRID SECTION */}
      <section style={{ position: 'relative', zIndex: 5, paddingBottom: '5rem' }}>
        <div className="section-container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>
          
          {/* Filters Bar */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: '1rem', marginBottom: '1.75rem',
            paddingBottom: '1.25rem',
          }}>
            {/* Category Chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {CATEGORIES.map(cat => {
                const isActive = activeCategory === cat
                return (
                  <button
                    key={cat}
                    id={`cat-${cat.replace(/\s+/g, '-')}`}
                    onClick={() => setActiveCategory(cat)}
                    className="chip"
                    style={{
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      padding: '0.45rem 1.15rem',
                      borderRadius: '99px',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      transition: 'all 0.25s ease',
                      background: isActive ? '#8B5CF6' : 'rgba(255, 255, 255, 0.01)',
                      color: isActive ? '#ffffff' : '#52525b',
                      border: isActive ? '1px solid #8B5CF6' : '1px solid rgba(255, 255, 255, 0.03)',
                      boxShadow: 'none',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'
                        e.currentTarget.style.color = '#a1a1aa'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.03)'
                        e.currentTarget.style.color = '#52525b'
                      }
                    }}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>

            {/* Sorting Select Dropdown */}
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '0.5rem 1.15rem', borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                background: 'rgba(255, 255, 255, 0.03)',
                color: '#B9B0D8', fontSize: '0.82rem', fontWeight: 600,
                cursor: 'pointer', outline: 'none',
                fontFamily: 'Inter, sans-serif',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)'}
            >
              <option value="popular">Sort by: Popular</option>
              <option value="trending">Sort by: Trending</option>
              <option value="new">Sort by: New Fonts</option>
              <option value="az">Sort by: A–Z</option>
            </select>
          </div>

          {/* Virtualized Cards List Wrapper */}
          <div ref={listContainerRef} style={containerStyle}>
            {visibleItems.map(({ item: font, style }) => (
              <div key={font.name} style={style}>
                <MemoizedFontCard
                  font={font}
                  previewText={previewText}
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
                />
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '5rem 2rem' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🔍</div>
              <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: '1.4rem', color: '#ffffff', marginBottom: '0.5rem' }}>
                No match found
              </h3>
              <p style={{ color: '#71717a' }}>Try updating your search query or categories.</p>
            </div>
          )}

        </div>
      </section>
    </div>
  )
}
