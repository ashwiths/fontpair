import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home, Type, LayoutGrid, GitCompare, Layers, Compass, FolderHeart, Sparkles,
  Moon, Sun, Search, Bell, Settings, Heart, Menu, X, Zap, Check
} from 'lucide-react'

const NAV = [
  { label: 'Home', icon: Home, active: true },
  { label: 'All Fonts', icon: Type },
  { label: 'Categories', icon: LayoutGrid },
  { label: 'Font Pairings', icon: GitCompare },
  { label: 'Compare', icon: Layers },
  { label: 'Inspiration', icon: Compass },
  { label: 'Collections', icon: FolderHeart },
  { label: 'Playground', icon: Sparkles },
]

const COLLECTIONS = [
  { label: 'My Favorites', count: 12 },
  { label: 'Brand Kit', count: 3 },
  { label: 'Design System', count: 5 },
]

export default function MainLayout({ children, searchVal, setSearchVal }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [dark, setDark] = useState(true)
  const [activeTab, setActiveTab] = useState('Home')

  /* Shared sidebar content renderer */
  const renderNav = (onSelect) => (
    <div className="flex flex-col gap-1">
      {NAV.map(item => {
        const Icon = item.icon
        const isActive = activeTab === item.label
        return (
          <button
            key={item.label}
            onClick={() => { setActiveTab(item.label); onSelect?.() }}
            className={`w-full flex items-center gap-3 rounded-lg text-left transition-all duration-300 cursor-pointer group relative ${
              isActive
                ? 'text-white font-medium bg-white/[0.04]'
                : 'text-neutral-400 hover:text-neutral-100 hover:bg-white/[0.015]'
            }`}
            style={{ padding: '8px 12px' }}
          >
            {isActive && (
              <motion.div
                layoutId="activeSidebarIndicator"
                className="absolute left-0 top-[20%] bottom-[20%] w-0.5 bg-purple-500 rounded-full"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
            <Icon style={{ width: 15, height: 15 }} className={`shrink-0 transition-colors ${isActive ? 'text-purple-400' : 'text-neutral-500 group-hover:text-neutral-300'}`} />
            <span className="text-[12.5px] tracking-wide">{item.label}</span>
          </button>
        )
      })}
    </div>
  )

  return (
    <div className="min-h-screen bg-[#06060a] text-white flex relative overflow-x-hidden">
      {/* Premium ambient backdrop atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[45vw] h-[45vw] rounded-full bg-purple-900/4 blur-[130px]" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-cyan-950/4 blur-[130px]" />
      </div>

      {/* ════════════════════════════════════════════════════
          DESKTOP SIDEBAR
      ════════════════════════════════════════════════════ */}
      <aside className="hidden lg:flex flex-col shrink-0 border-r border-white/[0.02] bg-[#07070b]/60 backdrop-blur-3xl h-screen sticky top-0 z-40" style={{ width: '235px' }}>

        {/* Logo */}
        <div className="flex items-center border-b border-white/[0.02]" style={{ height: '56px', padding: '0 22px' }}>
          <Link to="/" className="font-semibold tracking-[0.08em] text-white text-[14px]">
            fontpair<span className="text-purple-400">.co</span>
          </Link>
        </div>

        {/* Nav Container */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-6" style={{ padding: '18px 12px' }}>
          {renderNav()}

          {/* Collections Section */}
          <div className="flex flex-col gap-1.5 mt-2">
            <span className="text-[8px] font-mono tracking-[0.25em] text-neutral-600 uppercase font-semibold block" style={{ padding: '0 12px' }}>Collections</span>
            {COLLECTIONS.map(c => (
              <button key={c.label} className="w-full flex items-center justify-between rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.015] transition-all duration-200 cursor-pointer" style={{ padding: '6px 12px' }}>
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-purple-500/40" />
                  <span className="text-[12px]">{c.label}</span>
                </div>
                <span className="text-[9px] font-mono text-neutral-600 bg-white/[0.03] px-1.5 py-px rounded">{c.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Premium Integrated Upgrade Callout */}
        <div style={{ padding: '12px' }} className="border-t border-white/[0.02]">
          <div className="rounded-xl bg-gradient-to-b from-white/[0.01] to-transparent relative overflow-hidden p-4 border border-white/[0.02]">
            <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/5 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center gap-1.5 mb-1.5">
              <Zap className="w-2.5 h-2.5 text-purple-400" />
              <span className="text-[8px] font-mono tracking-widest text-neutral-500 uppercase">Pro Access</span>
            </div>
            <h4 className="text-neutral-200 font-semibold text-[11px] mb-2">Upgrade to Pro</h4>
            
            <button className="w-full bg-white/[0.04] hover:bg-white/[0.08] text-white rounded-lg font-semibold text-[10.5px] transition-all duration-300 cursor-pointer hover:shadow-[0_4px_12px_rgba(255,255,255,0.02)] active:scale-[0.98] flex items-center justify-center gap-1.5" style={{ padding: '7px' }}>
              Learn More <span className="text-neutral-500">→</span>
            </button>
          </div>
        </div>

        {/* Clean Theme Selector */}
        <div className="flex items-center justify-between border-t border-white/[0.02]" style={{ padding: '12px 20px' }}>
          <div className="flex items-center gap-2 text-neutral-500">
            <Moon className="w-3 h-3 text-purple-400" />
            <span className="text-[10.5px] tracking-wide">Dark Mode</span>
          </div>
          <button onClick={() => setDark(!dark)} className="relative rounded-full cursor-pointer transition-colors" style={{ width: '32px', height: '16px', background: dark ? 'rgba(168,85,247,0.3)' : 'rgba(255,255,255,0.08)' }}>
            <motion.div className="absolute top-[2px] rounded-full bg-neutral-200" style={{ width: '12px', height: '12px' }} animate={{ left: dark ? '18px' : '2px' }} transition={{ type: 'spring', stiffness: 550, damping: 30 }} />
          </button>
        </div>
      </aside>

      {/* ════════════════════════════════════════════════════
          MOBILE DRAWER
      ════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDrawerOpen(false)} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" />
            <motion.aside initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', bounce: 0.1, duration: 0.4 }} className="fixed left-0 top-0 bottom-0 w-[240px] bg-[#07070b] border-r border-white/[0.04] z-50 flex flex-col lg:hidden">
              <div className="flex items-center justify-between border-b border-white/[0.02]" style={{ height: '56px', padding: '0 20px' }}>
                <span className="font-semibold tracking-[0.08em] text-white text-[14px]">fontpair<span className="text-purple-400">.co</span></span>
                <button onClick={() => setDrawerOpen(false)} className="text-neutral-400 hover:text-white cursor-pointer"><X className="w-5 h-5" /></button>
              </div>
              <div className="flex-1 overflow-y-auto" style={{ padding: '16px 10px' }}>{renderNav(() => setDrawerOpen(false))}</div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════
          MAIN AREA
      ════════════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col min-h-screen relative z-10">
        {/* Top Header */}
        <header className="border-b border-white/[0.02] bg-[#0B0B10]/50 backdrop-blur-2xl sticky top-0 z-30 flex items-center justify-between relative" style={{ height: '56px', padding: '0 24px' }}>
          {/* Left - Mobile Menu Toggle */}
          <div className="flex-1 flex items-center">
            <button onClick={() => setDrawerOpen(true)} className="lg:hidden text-neutral-400 hover:text-white p-1 cursor-pointer"><Menu className="w-5 h-5" /></button>
          </div>
          
          {/* Center - Minimal Search Bar */}
          <div className="absolute left-1/2 -translate-x-1/2 hidden sm:flex items-center gap-2 bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] focus-within:border-teal-500/30 rounded-full transition-all duration-300" style={{ padding: '6px 14px', width: '380px' }}>
            <Search className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
            <input type="text" value={searchVal} onChange={e => setSearchVal(e.target.value)} placeholder="Search fonts, categories, pairings..." className="flex-1 bg-transparent border-none outline-none text-[13px] font-light text-white placeholder-neutral-600" />
            <kbd className="text-[9px] font-mono text-neutral-600 bg-white/[0.03] px-1.5 py-0.5 rounded select-none">/</kbd>
          </div>
          
          {/* Right - Profile & Notifications */}
          <div className="flex-1 flex items-center justify-end gap-2">
            {[Settings, Bell, Heart].map((Icon, i) => (
              <button key={i} className="text-neutral-500 hover:text-white hover:bg-white/[0.03] rounded-full transition-all cursor-pointer" style={{ padding: '8px' }}>
                <Icon style={{ width: 16, height: 16 }} />
              </button>
            ))}
            <div className="w-px h-4 bg-white/[0.06] mx-2" />
            <div className="rounded-full bg-gradient-to-tr from-purple-500 to-teal-400 flex items-center justify-center font-semibold text-[11px] text-white cursor-pointer shadow-lg shadow-purple-500/20" style={{ width: '32px', height: '32px' }}>A</div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
