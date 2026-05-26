import { useState, useEffect, useMemo, useRef, memo, useCallback } from 'react'
import { Search, Filter, Star, Zap, Grid, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { Heart, Copy, Check } from 'lucide-react'
import Navbar from '../components/Navbar'
import { PROCESSED_FONTS, CATEGORIES, getCategoryColor, useLoadGoogleFont } from '../utils/fontLoader'
import { useGridVirtualList } from '../utils/useVirtualList'

function FontGridCard({ font, favorites, onToggle }) {
  const [copied, setCopied] = useState(false)
  const isFav = favorites.has(font.name)
  const catColor = getCategoryColor(font.category)

  // Lazy load font file dynamically using WebFont Loader hook
  const loadStatus = useLoadGoogleFont(font.name)
  const isLoaded = loadStatus === 'loaded'
  const isError = loadStatus === 'error'

  const handleCopy = (e) => {
    e.stopPropagation()
    navigator.clipboard.writeText(`font-family: '${font.name}', sans-serif;`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: 'rgba(255, 255, 255, 0.015)',
        border: '1px solid rgba(255, 255, 255, 0.04)',
        borderRadius: '24px',
        padding: '1.5rem 1.75rem',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
      className="premium-grid-card"
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.035)'
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'none'
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.015)'
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.04)'
      }}
    >
      <div>
        {/* Header Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: '#ffffff', marginBottom: '6px', letterSpacing: '-0.015em' }}>
              {font.name}
            </h3>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <span style={{
                fontSize: '0.68rem', fontWeight: 600, color: '#C084FC',
                background: 'rgba(139, 92, 246, 0.08)', padding: '2px 9px', borderRadius: '99px',
                border: '1px solid rgba(139, 92, 246, 0.12)'
              }}>{font.category}</span>
              {font.trending && (
                <span style={{
                  fontSize: '0.68rem', fontWeight: 600, color: '#F59E0B',
                  background: 'rgba(245, 158, 11, 0.08)', padding: '2px 9px', borderRadius: '99px',
                  display: 'flex', alignItems: 'center', gap: '3px',
                  border: '1px solid rgba(245, 158, 11, 0.12)'
                }}>
                  <TrendingUp size={10} /> Hot
                </span>
              )}
              {font.new && (
                <span style={{
                  fontSize: '0.68rem', fontWeight: 600, color: '#10B981',
                  background: 'rgba(16, 185, 129, 0.08)', padding: '2px 9px', borderRadius: '99px',
                  border: '1px solid rgba(16, 185, 129, 0.12)'
                }}>New</span>
              )}
            </div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onToggle(font.name) }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: isFav ? '#EF4444' : '#52525b', padding: '4px', transition: 'transform 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Heart size={18} fill={isFav ? '#EF4444' : 'none'} />
          </button>
        </div>

        {/* Large Preview Area */}
        <div style={{ marginBottom: '1.25rem' }}>
          {isLoaded || isError ? (
            <p style={{
              fontFamily: isError ? 'sans-serif' : (font.family || font.name),
              fontSize: '1.45rem', color: isError ? '#71717a' : '#ffffff', lineHeight: 1.35,
              wordBreak: 'break-word', transition: 'font-family 0.3s ease'
            }}>
              The quick brown fox jumps over the lazy dog.
              {isError && (
                <span style={{ fontSize: '0.65rem', color: '#ef4444', marginLeft: '6px', fontWeight: 600 }}>
                  (offline)
                </span>
              )}
            </p>
          ) : (
            <div style={{
              width: '100%',
              height: '24px',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '6px',
              animation: 'pulse 1.5s infinite ease-in-out',
            }} />
          )}
        </div>
      </div>

      {/* Typography Sample Row & Copy Button */}
      <div>
        {/* Sample Row */}
        <div style={{
          marginBottom: '1rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.04)',
          paddingTop: '0.75rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{
            fontFamily: isError ? 'sans-serif' : (font.family || font.name),
            fontSize: '1.05rem',
            color: '#72689c',
            letterSpacing: '0.02em'
          }}>
            Aa Bb Cc 123
          </span>
          <span style={{
            fontSize: '0.75rem',
            color: '#52525b',
            fontFamily: 'Inter, sans-serif'
          }}>
            10 glyphs
          </span>
        </div>

        <button
          id={`grid-copy-${font.name.replace(/\s+/g, '-')}`}
          onClick={handleCopy}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            padding: '0.55rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.04)',
            background: copied ? 'rgba(139, 92, 246, 0.08)' : 'rgba(255, 255, 255, 0.01)',
            color: copied ? '#C084FC' : '#71717a',
            fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.25s ease',
            fontFamily: 'Inter, sans-serif',
          }}
          onMouseEnter={(e) => {
            if (!copied) {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)'
              e.currentTarget.style.color = '#ffffff'
            }
          }}
          onMouseLeave={(e) => {
            if (!copied) {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.01)'
              e.currentTarget.style.color = '#71717a'
            }
          }}
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? 'Copied CSS!' : 'Copy CSS Reference'}
        </button>
      </div>
    </motion.div>
  )
}

// Memoize FontGridCard to prevent scroll overhead
const MemoizedFontGridCard = memo(FontGridCard)

export default function AllFontsPage({ darkMode, setDarkMode }) {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeFilter, setActiveFilter] = useState('all')
  const [favorites, setFavorites] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem('fsc_favorites') || '[]')) }
    catch { return new Set() }
  })
  const [showSidebar, setShowSidebar] = useState(window.innerWidth >= 768)
  const [searchOpen, setSearchOpen] = useState(false)

  const listContainerRef = useRef(null)

  useEffect(() => {
    const onResize = () => setShowSidebar(window.innerWidth >= 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const toggleFavorite = (name) => {
    setFavorites(prev => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name); else next.add(name)
      localStorage.setItem('fsc_favorites', JSON.stringify([...next]))
      return next
    })
  }

  // Filter lists based on sidebar & header categories
  const filtered = useMemo(() => {
    return PROCESSED_FONTS
      .filter(f => {
        const matchCat = activeCategory === 'All' || f.category === activeCategory
        const matchSearch = f.name.toLowerCase().includes(search.toLowerCase())
        const matchFilter = activeFilter === 'all' || 
          (activeFilter === 'popular' && f.popular) ||
          (activeFilter === 'trending' && f.trending) || 
          (activeFilter === 'new' && f.new)
        return matchCat && matchSearch && matchFilter
      })
  }, [search, activeCategory, activeFilter])

  // Responsive column counts (Change from 3-column grid to 2-column grid for premium editorial spacing)
  const getColumnCount = useCallback((width) => {
    if (showSidebar) {
      return width >= 1000 ? 2 : 1
    } else {
      return width >= 600 ? 2 : 1
    }
  }, [showSidebar])

  // Grid Virtualization (itemHeight: 312px represents 288px card + 24px gap)
  const { visibleItems, containerStyle } = useGridVirtualList(listContainerRef, filtered, 312, getColumnCount, 6)

  const sidebarFilters = [
    { id: 'all', label: 'All Fonts', icon: <Grid size={15} />, count: PROCESSED_FONTS.length },
    { id: 'popular', label: 'Popular', icon: <Star size={15} />, count: PROCESSED_FONTS.filter(f => f.popular).length },
    { id: 'trending', label: 'Trending', icon: <TrendingUp size={15} />, count: PROCESSED_FONTS.filter(f => f.trending).length },
    { id: 'new', label: 'New Fonts', icon: <Zap size={15} />, count: PROCESSED_FONTS.filter(f => f.new).length },
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at top, rgba(139, 92, 246, 0.08), transparent 50%), #05010d',
      color: '#ffffff',
      position: 'relative',
      overflowX: 'hidden',
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
        searchVal={search}
        setSearchVal={setSearch}
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
      />

      {/* Page Header */}
      <div style={{ padding: '6.5rem 0 2rem', textAlign: 'center' }}>
        <div className="section-container" style={{ maxWidth: '1450px', margin: '0 auto', padding: '0 2rem' }}>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="badge" style={{
              display: 'inline-flex', gap: '6px', alignItems: 'center',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              background: 'rgba(255, 255, 255, 0.02)',
              color: '#d8b4fe',
              marginBottom: '1rem',
            }}>
              <Filter size={12} /> Explore Collection
            </span>
            <h1 className="heading-h1" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: '#ffffff', marginBottom: '0.75rem', fontWeight: 800, letterSpacing: '-0.025em' }}>
              Explore <span style={{
                background: 'linear-gradient(135deg, #ffffff 10%, #C084FC 50%, #8B5CF6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>All Fonts</span>
            </h1>
            <p style={{ color: '#b4b0cc', fontSize: '1.05rem', maxWidth: '540px', margin: '0 auto', lineHeight: 1.6 }}>
              Browse our curated collection of {PROCESSED_FONTS.length}+ typefaces loaded dynamically.
            </p>
          </motion.div>

          {/* Big search */}
          <div 
            id="all-fonts-search-wrapper"
            style={{
              maxWidth: '720px', 
              margin: '2rem auto 0 auto', 
              borderRadius: '20px', 
              padding: '0.95rem 1.5rem',
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              background: 'rgba(255, 255, 255, 0.015)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
            }}
          >
            <Search size={20} color="#8B5CF6" style={{ opacity: 0.8 }} />
            <input
              id="all-fonts-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by font name, category..."
              style={{
                fontSize: '1.05rem', color: '#ffffff', background: 'transparent', border: 'none', outline: 'none',
                width: '100%', fontFamily: 'Inter, sans-serif',
              }}
              onFocus={() => {
                const el = document.getElementById('all-fonts-search-wrapper')
                if (el) {
                  el.style.borderColor = 'rgba(139, 92, 246, 0.4)'
                  el.style.boxShadow = '0 0 25px rgba(139, 92, 246, 0.08), 0 4px 30px rgba(0, 0, 0, 0.3)'
                  el.style.background = 'rgba(255, 255, 255, 0.03)'
                }
              }}
              onBlur={() => {
                const el = document.getElementById('all-fonts-search-wrapper')
                if (el) {
                  el.style.borderColor = 'rgba(255, 255, 255, 0.05)'
                  el.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.2)'
                  el.style.background = 'rgba(255, 255, 255, 0.015)'
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className="section-container" style={{ maxWidth: '1450px', margin: '0 auto', padding: '2.5rem 2rem', display: 'flex', gap: '2.5rem', alignItems: 'flex-start' }}>
        {/* Sidebar — sticky on medium & large screens */}
        {showSidebar && (
          <aside style={{
            width: '230px', flexShrink: 0, position: 'sticky', top: '100px',
            background: 'rgba(255, 255, 255, 0.01)', border: '1px solid rgba(255, 255, 255, 0.03)',
            borderRadius: '24px', padding: '1.75rem',
            display: 'block',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          }}
          >
            <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#72689c', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.25rem' }}>Filter</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '1.75rem' }}>
              {sidebarFilters.map(f => (
                <button
                  key={f.id}
                  id={`sidebar-${f.id}`}
                  onClick={() => setActiveFilter(f.id)}
                  style={{
                    width: '100%', textAlign: 'left', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    gap: '10px', padding: '0.7rem 1.1rem', borderRadius: '12px',
                    fontSize: '0.88rem', fontWeight: activeFilter === f.id ? 600 : 500,
                    color: activeFilter === f.id ? '#C084FC' : '#72689c',
                    background: activeFilter === f.id ? 'rgba(139, 92, 246, 0.06)' : 'transparent',
                    border: activeFilter === f.id ? '1px solid rgba(139, 92, 246, 0.12)' : '1px solid transparent',
                    fontFamily: 'Inter, sans-serif',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (activeFilter !== f.id) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'
                      e.currentTarget.style.color = '#ffffff'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeFilter !== f.id) {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.color = '#72689c'
                    }
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {f.icon} {f.label}
                  </span>
                  <span style={{ fontSize: '0.72rem', fontWeight: 600, color: activeFilter === f.id ? '#C084FC' : '#72689c', background: 'rgba(0,0,0,0.25)', padding: '2px 8px', borderRadius: '99px' }}>
                    {f.count}
                  </span>
                </button>
              ))}
            </div>

            <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.04)', marginBottom: '1.5rem' }} />

            <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#72689c', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>Categories</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  id={`sidebar-cat-${cat.replace(/\s+/g, '-')}`}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    width: '100%', textAlign: 'left', cursor: 'pointer',
                    padding: '0.7rem 1.1rem', borderRadius: '12px',
                    fontSize: '0.88rem', fontWeight: activeCategory === cat ? 600 : 500,
                    color: activeCategory === cat ? '#C084FC' : '#72689c',
                    background: activeCategory === cat ? 'rgba(139, 92, 246, 0.06)' : 'transparent',
                    border: activeCategory === cat ? '1px solid rgba(139, 92, 246, 0.12)' : '1px solid transparent',
                    fontFamily: 'Inter, sans-serif',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (activeCategory !== cat) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'
                      e.currentTarget.style.color = '#ffffff'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeCategory !== cat) {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.color = '#72689c'
                    }
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </aside>
        )}

        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Category chips (mobile/tablet) */}
          {!showSidebar && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.75rem' }}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={`chip ${activeCategory === cat ? 'chip-active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    fontSize: '0.8rem', padding: '0.45rem 1.15rem', borderRadius: '99px',
                    fontFamily: 'Inter, sans-serif', fontWeight: 600, cursor: 'pointer',
                    background: activeCategory === cat ? '#8B5CF6' : 'rgba(255, 255, 255, 0.01)',
                    color: activeCategory === cat ? '#ffffff' : '#52525b',
                    border: activeCategory === cat ? '1px solid #8B5CF6' : '1px solid rgba(255, 255, 255, 0.03)',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Result count */}
          <p style={{ color: '#72689c', fontSize: '0.88rem', marginBottom: '1.5rem', letterSpacing: '0.01em' }}>
            Showing <strong style={{ color: '#ffffff', fontWeight: 600 }}>{filtered.length}</strong> fonts
          </p>

          {/* Grid Container (2-column layout with 24px spacing) */}
          <div ref={listContainerRef} style={containerStyle}>
            {visibleItems.map(({ item: font, style }) => (
              <div key={font.name} style={{ ...style, padding: '12px' }}>
                <MemoizedFontGridCard
                  font={font}
                  favorites={favorites}
                  onToggle={toggleFavorite}
                />
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '6rem 2rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1.25rem' }}>🔍</div>
              <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: '1.4rem', color: '#ffffff', marginBottom: '0.5rem' }}>No fonts found</h3>
              <p style={{ color: '#72689c' }}>Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
