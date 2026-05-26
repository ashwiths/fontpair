import { useEffect, useRef, useState, useMemo } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowRight, Copy, Check, Sparkles, Heart, Layers, Eye, Github, Linkedin, Mail } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import Lenis from 'lenis'

/* ────────────────────────────────────────────────────────
   Futuristic, subtle drifting glowing streaks
──────────────────────────────────────────────────────── */
function FuturisticBackground() {
  const streaks = useMemo(() => {
    return [
      { id: 1, x: 15, y: -20, len: 120, color: 'rgba(167, 139, 250, 0.08)', dur: 22, delay: 0 },
      { id: 2, x: 55, y: -10, len: 150, color: 'rgba(76, 237, 225, 0.06)', dur: 26, delay: -4 },
      { id: 3, x: 85, y: -30, len: 130, color: 'rgba(103, 232, 249, 0.07)', dur: 30, delay: -8 },
    ]
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[#030303]">
      {/* Cinematic Ambient Radial Glows */}
      <div className="absolute top-[-25%] left-[-15%] w-[80vw] aspect-square rounded-full bg-purple-900/12 blur-[180px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[75vw] aspect-square rounded-full bg-cyan-950/15 blur-[180px]" />
      <div className="absolute top-[30%] left-[20%] w-[60vw] aspect-square rounded-full bg-indigo-900/12 blur-[220px]" />
      <div className="absolute bottom-[10%] left-[-10%] w-[50vw] aspect-square rounded-full bg-purple-950/8 blur-[180px]" />

      {/* SVG Glowing Streaks */}
      <svg className="absolute inset-0 w-full h-full opacity-50" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {streaks.map((s) => (
            <linearGradient key={`grad-${s.id}`} id={`grad-${s.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={s.color} stopOpacity="0" />
              <stop offset="50%" stopColor={s.color} stopOpacity="1" />
              <stop offset="100%" stopColor={s.color} stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>
        {streaks.map((s) => {
          const angleRad = (-26 * Math.PI) / 180
          const dx = Math.sin(angleRad) * s.len
          const dy = Math.cos(angleRad) * s.len
          const cx = s.x * 10
          const cy = s.y * 6

          return (
            <g key={s.id}>
              <style>{`
                @keyframes drift${s.id} {
                  0%   { transform: translate(0, 0); opacity: 0; }
                  10%  { opacity: 1; }
                  90%  { opacity: 1; }
                  100% { transform: translate(-80px, 350px); opacity: 0; }
                }
                .streak${s.id} {
                  animation: drift${s.id} ${s.dur}s linear ${s.delay}s infinite;
                  transform-box: fill-box;
                  transform-origin: center top;
                }
              `}</style>
              <line
                className={`streak${s.id}`}
                x1={cx - dx / 2}
                y1={cy - dy / 2}
                x2={cx + dx / 2}
                y2={cy + dy / 2}
                stroke={`url(#grad-${s.id})`}
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </g>
          )
        })}
      </svg>
    </div>
  )
}
/* ────────────────────────────────────────────────────────
   Hero Showcase — Animated Font Preview Card
──────────────────────────────────────────────────────── */
const SHOWCASE_PAIRS = [
  { label: 'Syne + Inter', heading: 'Build interfaces that feel modern.', headFont: 'Syne', bodyFont: 'Inter', headClass: 'font-extrabold tracking-tight' },
  { label: 'Playfair Display + Jakarta Sans', heading: 'Crafting editorial experiences.', headFont: 'Playfair Display', bodyFont: 'Plus Jakarta Sans', headClass: 'font-normal italic' },
  { label: 'Space Grotesk + JetBrains Mono', heading: 'Clarity for complex systems.', headFont: 'Space Grotesk', bodyFont: 'JetBrains Mono', headClass: 'font-semibold' },
  { label: 'Outfit + Sora', heading: 'Design systems that breathe.', headFont: 'Outfit', bodyFont: 'Sora', headClass: 'font-bold tracking-tight' },
]

function HeroShowcase() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIdx((prev) => (prev + 1) % SHOWCASE_PAIRS.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  const pair = SHOWCASE_PAIRS[idx]

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#0a0a10] overflow-hidden relative shadow-[0_24px_50px_-12px_rgba(0,0,0,0.7)] hover:border-white/[0.1] transition-all duration-500">
      {/* Top shimmer */}
      <div className="absolute top-0 inset-x-0 bg-gradient-to-r from-transparent via-white/8 to-transparent" style={{ height: '1px' }} />

      {/* Topbar */}
      <div className="flex justify-between items-center border-b border-white/[0.05]" style={{ padding: '0.75rem 1.5rem' }}>
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="rounded-full bg-white/10" style={{ width: '8px', height: '8px' }} />
            <span className="rounded-full bg-white/10" style={{ width: '8px', height: '8px' }} />
            <span className="rounded-full bg-white/10" style={{ width: '8px', height: '8px' }} />
          </div>
          <span className="text-[9px] font-mono tracking-[0.2em] text-neutral-600 uppercase">fontpair.co — preview</span>
        </div>
        <span className="text-[9px] font-mono tracking-[0.2em] text-[#4cede1]/50 uppercase">{pair.label}</span>
      </div>

      {/* Preview Content */}
      <div style={{ padding: '2.5rem 2rem' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
          >
            <h3
              className={`text-white leading-tight ${pair.headClass}`}
              style={{ fontFamily: pair.headFont, fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', marginBottom: '0.75rem' }}
            >
              {pair.heading}
            </h3>
            <p
              className="text-neutral-500 font-light leading-relaxed"
              style={{ fontFamily: pair.bodyFont, fontSize: '0.875rem', maxWidth: '80%' }}
            >
              Preview how this typography combination renders across different content densities and layout contexts.
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom bar with cycling indicator */}
      <div className="flex items-center border-t border-white/[0.05]" style={{ padding: '0.625rem 1.5rem', gap: '0.5rem' }}>
        {SHOWCASE_PAIRS.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === idx ? '24px' : '6px',
              height: '4px',
              backgroundColor: i === idx ? 'rgba(76, 237, 225, 0.6)' : 'rgba(255,255,255,0.08)',
            }}
          />
        ))}
      </div>
    </div>
  )
}

/* ────────────────────────────────────────────────────────
   Live Typography Sandbox Data & Component
──────────────────────────────────────────────────────── */
const PAIRINGS = [
  {
    name: 'Modern Avant-Garde',
    headlineFont: 'Syne',
    bodyFont: 'Inter',
    headlineClass: 'font-extrabold tracking-tight',
    bodyClass: 'font-light tracking-wide',
    defaultHeading: 'Build interfaces that feel modern.',
    defaultBody: 'Preview live typography combinations crafted for creators, developers, and modern digital brands.',
  },
  {
    name: 'Editorial Elegance',
    headlineFont: 'Playfair Display',
    bodyFont: 'Plus Jakarta Sans',
    headlineClass: 'font-normal italic',
    bodyClass: 'font-normal tracking-normal',
    defaultHeading: 'Crafting editorial digital experiences.',
    defaultBody: 'A harmonious marriage of traditional print aesthetics and ultra-clean modern digital layout systems.',
  },
  {
    name: 'Minimalist Tech',
    headlineFont: 'Space Grotesk',
    bodyFont: 'JetBrains Mono',
    headlineClass: 'font-semibold tracking-normal',
    bodyClass: 'font-mono text-sm leading-relaxed',
    defaultHeading: 'System terminals require absolute clarity.',
    defaultBody: 'Engineered for high readability in density-rich interfaces. Perfect for developer utilities and SaaS dashboards.',
  },
  {
    name: 'Sleek Geometry',
    headlineFont: 'Outfit',
    bodyFont: 'Sora',
    headlineClass: 'font-bold tracking-tight',
    bodyClass: 'font-light leading-relaxed',
    defaultHeading: 'Design systems that breathe.',
    defaultBody: 'Vibrant geometry meets fluid layouts. Designed to make consumer platforms feel premium, friendly, and alive.',
  },
]

function LivePreviewSandbox() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [customText, setCustomText] = useState('')
  const [copied, setCopied] = useState(false)
  const [displayedHeading, setDisplayedHeading] = useState('')
  const [displayedBody, setDisplayedBody] = useState('')

  // Interval cycling fallback (only runs if the user isn't interacting)
  useEffect(() => {
    if (customText.trim() !== '') return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PAIRINGS.length)
    }, 8000) // longer interval for reading typing effect
    return () => clearInterval(timer)
  }, [customText])

  // Custom typing animation logic
  useEffect(() => {
    let active = true

    if (customText.trim() !== '') {
      setDisplayedHeading(customText)
      setDisplayedBody(PAIRINGS[currentIndex].defaultBody)
      return
    }

    const targetHeading = PAIRINGS[currentIndex].defaultHeading
    const targetBody = PAIRINGS[currentIndex].defaultBody

    setDisplayedHeading('')
    setDisplayedBody('')

    let hStr = ''
    let bStr = ''
    let hIdx = 0
    let bIdx = 0

    function typeHeading() {
      if (!active) return
      if (hIdx < targetHeading.length) {
        hStr += targetHeading.charAt(hIdx)
        setDisplayedHeading(hStr)
        hIdx++
        setTimeout(typeHeading, 20)
      } else {
        setTimeout(typeBody, 12)
      }
    }

    function typeBody() {
      if (!active) return
      if (bIdx < targetBody.length) {
        bStr += targetBody.charAt(bIdx)
        setDisplayedBody(bStr)
        bIdx++
        setTimeout(typeBody, 12)
      }
    }

    typeHeading()

    return () => {
      active = false
    }
  }, [currentIndex, customText])

  const current = PAIRINGS[currentIndex]

  const handleCopyCSS = () => {
    const cssText = `/* Headline: ${current.headlineFont} */\nh1 {\n  font-family: '${current.headlineFont}', sans-serif;\n  font-weight: 700;\n}\n\n/* Body: ${current.bodyFont} */\np {\n  font-family: '${current.bodyFont}', sans-serif;\n  font-weight: 400;\n  line-height: 1.6;\n}`
    navigator.clipboard.writeText(cssText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="relative z-20 w-full" style={{ padding: '7rem 0' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 3rem' }}>

        {/* ── Section Header ──────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
          <p className="text-[11px] font-mono tracking-[0.3em] text-[#4cede1]/70 uppercase" style={{ marginBottom: '1rem' }}>
            Interactive Laboratory
          </p>
          <h2 className="font-extralight text-white tracking-tight leading-none" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: '1.25rem' }}>
            Design Through{' '}
            <span className="font-light bg-gradient-to-r from-white via-white to-[#4cede1] bg-clip-text text-transparent">
              Typography.
            </span>
          </h2>
          <p className="text-neutral-500 font-light leading-relaxed" style={{ fontSize: '1rem', maxWidth: '520px', margin: '0 auto' }}>
            A live playground for font pairing. Type custom copy, explore curated duos, and export production-ready CSS.
          </p>
        </div>

        {/* ── Two-Column Grid: 40% / 60% ─────────────────── */}
        <div className="sandbox-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', alignItems: 'start' }}>

          {/* LEFT: Controls ─────────────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            {/* Custom Input Card */}
            <div className="rounded-2xl border border-white/[0.07] bg-[#0d0d14] transition-all duration-300 hover:border-white/[0.1]" style={{ padding: '1.5rem' }}>
              <span className="block text-[10px] font-mono tracking-[0.28em] text-[#4cede1]/80 uppercase" style={{ marginBottom: '0.75rem' }}>
                Custom Copy
              </span>
              <textarea
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Type your own heading to preview..."
                className="w-full rounded-xl bg-white/[0.02] border border-white/[0.06] text-white placeholder-neutral-600 focus:outline-none focus:border-[#4cede1]/30 focus:bg-white/[0.04] focus:shadow-[0_0_15px_rgba(76,237,225,0.03)] transition-all duration-300 resize-none text-sm leading-relaxed"
                style={{ height: '5.5rem', padding: '0.875rem 1.125rem' }}
              />
            </div>

            {/* Font Pairing Selector */}
            <div className="rounded-2xl border border-white/[0.07] bg-[#0d0d14] transition-all duration-300 hover:border-white/[0.1]" style={{ padding: '1.75rem 1.5rem' }}>
              <span className="block text-[10px] font-mono tracking-[0.28em] text-neutral-500 uppercase" style={{ marginBottom: '1.25rem' }}>
                Curated Font Pairings
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {PAIRINGS.map((pair, idx) => {
                  const isActive = idx === currentIndex
                  return (
                    <button
                      key={pair.name}
                      onClick={() => setCurrentIndex(idx)}
                      className={`group w-full text-left rounded-xl border cursor-pointer flex justify-between items-center transition-all duration-300 ease-out hover:-translate-y-[1px] ${
                        isActive
                          ? 'bg-[#4cede1]/[0.08] border-[#4cede1]/30 shadow-[0_0_24px_rgba(76,237,225,0.06)]'
                          : 'bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.05] hover:border-white/[0.12] hover:shadow-[0_4px_16px_rgba(0,0,0,0.2)]'
                      }`}
                      style={{ padding: '1rem 1.25rem' }}
                    >
                      <div>
                        <span 
                          className={`block text-[9px] font-mono font-semibold uppercase tracking-[0.22em] transition-colors duration-300 ${
                            isActive ? 'text-[#4cede1]' : 'text-neutral-500'
                          }`} 
                          style={{ marginBottom: '5px' }}
                        >
                          {pair.name}
                        </span>
                        <span className={`block font-medium tracking-wide transition-colors duration-300 ${isActive ? 'text-white' : 'text-neutral-400'}`} style={{ fontSize: '0.9375rem' }}>
                          {pair.headlineFont} <span className="text-neutral-600 font-light mx-1">+</span> {pair.bodyFont}
                        </span>
                      </div>
                      <ArrowRight
                        className={`shrink-0 transition-all duration-300 ${
                          isActive 
                            ? 'translate-x-1 text-[#4cede1] drop-shadow-[0_0_8px_rgba(76,237,225,0.5)]' 
                            : 'text-neutral-700 group-hover:text-neutral-500 group-hover:translate-x-0.5'
                        }`}
                        style={{ width: '14px', height: '14px' }}
                      />
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Pair Metadata */}
            <div className="rounded-2xl border border-white/[0.05] bg-[#0d0d14]/40 backdrop-blur-md transition-all duration-300 hover:border-white/[0.08]" style={{ padding: '1.5rem 1.75rem' }}>
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-mono tracking-[0.28em] text-neutral-500 uppercase">Heading</span>
                <span className="text-[12px] font-mono font-medium text-[#4cede1]" style={{ fontFamily: current.headlineFont }}>
                  {current.headlineFont} <span className="text-neutral-600 font-light">·</span> 700
                </span>
              </div>
              <div className="bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" style={{ height: '1px', margin: '1rem 0' }} />
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-mono tracking-[0.28em] text-neutral-500 uppercase">Body</span>
                <span className="text-[12px] font-mono font-medium text-purple-300" style={{ fontFamily: current.bodyFont }}>
                  {current.bodyFont} <span className="text-neutral-600 font-light">·</span> 400
                </span>
              </div>
            </div>

            {/* Copy CSS Button */}
            <div className="flex justify-center w-full" style={{ marginTop: '0.25rem' }}>
              <button
                onClick={handleCopyCSS}
                className="w-full max-w-[280px] flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#4cede1] to-[#36d6cb] text-[#030303] font-bold tracking-wide rounded-xl cursor-pointer shadow-[0_4px_24px_rgba(76,237,225,0.15)] hover:shadow-[0_4px_32px_rgba(76,237,225,0.3)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[2px] active:translate-y-0 active:scale-[0.98]"
                style={{ fontSize: '12px', padding: '0.875rem 1.5rem' }}
              >
                {copied ? (
                  <>
                    <Check style={{ width: '15px', height: '15px' }} />
                    Copied to Clipboard
                  </>
                ) : (
                  <>
                    <Copy style={{ width: '15px', height: '15px' }} />
                    Copy CSS Styles
                  </>
                )}
              </button>
            </div>
          </div>

          {/* RIGHT: Live Preview Canvas ──────────────────── */}
          <div className="relative h-full flex flex-col">
            {/* Ambient glows */}
            <div className="absolute -inset-6 rounded-[2.5rem] pointer-events-none bg-[radial-gradient(circle_at_70%_20%,rgba(168,85,247,0.14),transparent_50%)] blur-[40px] z-0" />
            <div className="absolute -inset-6 rounded-[2.5rem] pointer-events-none bg-[radial-gradient(circle_at_20%_80%,rgba(6,182,212,0.08),transparent_50%)] blur-[40px] z-0" />

            <div
              className="relative z-10 rounded-2xl border border-white/[0.07] bg-[#0d0d14]/90 backdrop-blur-xl flex flex-col overflow-hidden flex-grow transition-all duration-500 hover:border-white/[0.1]"
              style={{ minHeight: '100%' }}
            >
              {/* Top shimmer */}
              <div className="absolute top-0 inset-x-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" style={{ height: '1px' }} />

              {/* Canvas Topbar */}
              <div className="flex justify-between items-center border-b border-white/[0.05]" style={{ padding: '1.25rem 3rem' }}>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-[#4cede1]/60 animate-pulse" style={{ width: '6px', height: '6px' }} />
                  <span className="text-[9px] font-mono tracking-[0.3em] text-neutral-600 uppercase">
                    Preview Canvas
                  </span>
                </div>
                <span className="text-[9px] font-mono tracking-[0.2em] text-[#4cede1]/60 uppercase font-medium">
                  {current.name}
                </span>
              </div>

              {/* Live Typography Content */}
              <div className="flex-1 flex flex-col justify-center" style={{ padding: '4rem 3rem' }}>
                <h1
                  className={`text-white leading-[1.14] tracking-tight ${current.headlineClass}`}
                  style={{ fontFamily: current.headlineFont, fontSize: 'clamp(1.85rem, 3.2vw, 3.125rem)', marginBottom: '1rem' }}
                >
                  {displayedHeading}
                  <span className="inline-block bg-[#4cede1] animate-pulse align-middle" style={{ width: '3px', height: '0.85em', marginLeft: '4px' }} />
                </h1>

                <p
                  className={`text-neutral-400/90 leading-relaxed tracking-wide ${current.bodyClass}`}
                  style={{ fontFamily: current.bodyFont, fontSize: 'clamp(0.875rem, 1.05vw, 0.975rem)', maxWidth: '85%', marginBottom: '2rem' }}
                >
                  {displayedBody}
                </p>

                {/* Demo CTA pill */}
                <div>
                  <span
                    style={{ fontFamily: current.bodyFont, fontSize: '11px', padding: '0.625rem 1.25rem' }}
                    className="inline-flex items-center gap-2 border border-white/[0.08] bg-white/[0.03] rounded-full font-medium text-neutral-400 transition-all duration-300 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.15] cursor-default select-none"
                  >
                    Explore this typeface
                    <ArrowRight style={{ width: '12px', height: '12px' }} />
                  </span>
                </div>
              </div>

              {/* Canvas Footer */}
              <div className="flex justify-between items-center border-t border-white/[0.05]" style={{ padding: '1rem 3rem' }}>
                <span className="text-[9px] font-mono tracking-[0.25em] text-neutral-700 uppercase">fontpair.co</span>
                <span className="text-[9px] font-mono tracking-[0.25em] text-neutral-700 uppercase">Live Preview</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

  )
}

/* ────────────────────────────────────────────────────────
   Premium Sticky Stacking Cards — Feature Showcases
──────────────────────────────────────────────────────── */

/* Card 1: Live Preview Demo */
function PreviewLiveFont() {
  const [weight, setWeight] = useState(400)
  const weights = [300, 400, 500, 600, 700, 800]
  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] flex-1 flex flex-col justify-center" style={{ padding: '1.5rem' }}>
        <p className="text-[9px] font-mono tracking-[0.2em] text-neutral-600 uppercase" style={{ marginBottom: '0.75rem' }}>Live Rendering</p>
        <p className="text-white leading-tight transition-all duration-300" style={{ fontFamily: 'Inter', fontWeight: weight, fontSize: 'clamp(1.25rem, 2.5vw, 2rem)' }}>
          The quick brown fox jumps over the lazy dog.
        </p>
      </div>
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02]" style={{ padding: '1rem 1.25rem' }}>
        <p className="text-[9px] font-mono tracking-[0.2em] text-neutral-600 uppercase" style={{ marginBottom: '0.75rem' }}>Font Weight</p>
        <div className="flex gap-1.5">
          {weights.map(w => (
            <button key={w} onClick={() => setWeight(w)} className={`rounded-lg text-[11px] font-mono transition-all cursor-pointer ${w === weight ? 'bg-[#4cede1]/15 text-[#4cede1] border-[#4cede1]/30' : 'bg-white/[0.04] text-neutral-500 border-white/[0.06]'} border`} style={{ padding: '0.375rem 0.625rem' }}>
              {w}
            </button>
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        {['Inter', 'Syne', 'Outfit'].map(f => (
          <div key={f} className="rounded-lg border border-white/[0.06] bg-white/[0.02] flex-1 text-center" style={{ padding: '0.5rem' }}>
            <span className="text-[9px] font-mono text-neutral-600 block" style={{ marginBottom: '2px' }}>{f}</span>
            <span className="text-white text-sm" style={{ fontFamily: f }}>Aa</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* Card 2: Font Pairing Demo */
function PreviewPairing() {
  const pairs = [
    { head: 'Syne', body: 'Inter', label: 'Modern' },
    { head: 'Playfair Display', body: 'Plus Jakarta Sans', label: 'Editorial' },
    { head: 'Space Grotesk', body: 'JetBrains Mono', label: 'Technical' },
  ]
  return (
    <div className="flex flex-col gap-3 h-full">
      {pairs.map((p, i) => (
        <div key={i} className="rounded-xl border border-white/[0.06] bg-white/[0.02] flex-1 flex flex-col justify-center" style={{ padding: '1.25rem' }}>
          <div className="flex justify-between items-center" style={{ marginBottom: '0.75rem' }}>
            <span className="text-[9px] font-mono tracking-[0.2em] text-neutral-600 uppercase">{p.label}</span>
            <span className="text-[9px] font-mono text-[#4cede1]/50">{p.head} + {p.body}</span>
          </div>
          <p className="text-white leading-tight" style={{ fontFamily: p.head, fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.375rem' }}>
            Typography matters.
          </p>
          <p className="text-neutral-500 text-xs leading-relaxed" style={{ fontFamily: p.body }}>
            A well-paired typeface creates visual harmony and strengthens brand identity.
          </p>
        </div>
      ))}
    </div>
  )
}

/* Card 3: Side-by-Side Compare */
function PreviewCompare() {
  return (
    <div className="flex flex-col gap-4 h-full w-full">
      {/* Visual Canvas Card */}
      <div className="rounded-xl border border-white/[0.06] bg-[#09090e]/60 backdrop-blur-md flex-1 flex flex-col justify-between overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-all duration-300 hover:border-white/[0.1]" style={{ padding: '1.5rem' }}>
        <div className="flex justify-between items-center" style={{ marginBottom: '1.25rem' }}>
          <p className="text-[9px] font-mono tracking-[0.25em] text-[#4cede1]/80 uppercase font-semibold">Metrics Inspector</p>
          <span className="text-[8px] font-mono text-neutral-600 uppercase tracking-widest">Active side-by-side comparison</span>
        </div>

        {/* The Glyphs Side-by-Side Grid */}
        <div className="grid grid-cols-2 gap-6 items-center" style={{ minHeight: '180px' }}>
          
          {/* Left Font Specimen */}
          <div className="relative rounded-lg border border-white/[0.04] bg-white/[0.01] h-[190px] overflow-hidden flex flex-col justify-center items-center transition-all duration-300 hover:bg-white/[0.02]">
            {/* Typographic Axis Guides */}
            <div className="absolute inset-x-0 top-[25%] border-t border-dashed border-white/[0.06] pointer-events-none">
              <span className="absolute right-2 -top-2 text-[7px] font-mono text-neutral-600 uppercase tracking-wider">CAP HEIGHT</span>
            </div>
            <div className="absolute inset-x-0 top-[48%] border-t border-dashed border-[#4cede1]/10 pointer-events-none">
              <span className="absolute left-2 -top-2 text-[7px] font-mono text-[#4cede1]/50 uppercase tracking-wider">X-HEIGHT</span>
            </div>
            <div className="absolute inset-x-0 top-[75%] border-t border-white/[0.08] pointer-events-none">
              <span className="absolute right-2 -top-2 text-[7px] font-mono text-neutral-500 uppercase tracking-wider font-medium">BASELINE</span>
            </div>

            {/* Glyph Showcase */}
            <div className="z-10 flex flex-col items-center justify-center h-full pt-2">
              <p className="text-white leading-none tracking-tight select-none drop-shadow-[0_0_12px_rgba(255,255,255,0.05)]" style={{ fontFamily: 'Inter', fontSize: '3.75rem', fontWeight: 500 }}>
                Ag
              </p>
              <div className="absolute bottom-3 left-3 flex flex-col gap-0.5">
                <span className="text-[9px] font-medium text-neutral-300 leading-none">Inter</span>
                <span className="text-[8px] font-mono text-[#4cede1] leading-none">x-height: 1096</span>
              </div>
              <span className="absolute bottom-3 right-3 text-[8px] font-mono text-neutral-600 leading-none">SANS-SERIF</span>
            </div>
          </div>

          {/* Right Font Specimen */}
          <div className="relative rounded-lg border border-white/[0.04] bg-white/[0.01] h-[190px] overflow-hidden flex flex-col justify-center items-center transition-all duration-300 hover:bg-white/[0.02]">
            {/* Typographic Axis Guides */}
            <div className="absolute inset-x-0 top-[25%] border-t border-dashed border-white/[0.06] pointer-events-none">
              <span className="absolute right-2 -top-2 text-[7px] font-mono text-neutral-600 uppercase tracking-wider">CAP HEIGHT</span>
            </div>
            <div className="absolute inset-x-0 top-[52%] border-t border-dashed border-purple-500/10 pointer-events-none">
              <span className="absolute left-2 -top-2 text-[7px] font-mono text-purple-400/60 uppercase tracking-wider">X-HEIGHT</span>
            </div>
            <div className="absolute inset-x-0 top-[75%] border-t border-white/[0.08] pointer-events-none">
              <span className="absolute right-2 -top-2 text-[7px] font-mono text-neutral-500 uppercase tracking-wider font-medium">BASELINE</span>
            </div>

            {/* Glyph Showcase */}
            <div className="z-10 flex flex-col items-center justify-center h-full pt-2">
              <p className="text-white leading-none tracking-tight select-none drop-shadow-[0_0_12px_rgba(255,255,255,0.05)]" style={{ fontFamily: 'Space Grotesk', fontSize: '3.75rem', fontWeight: 500 }}>
                Ag
              </p>
              <div className="absolute bottom-3 left-3 flex flex-col gap-0.5">
                <span className="text-[9px] font-medium text-neutral-300 leading-none">Space Grotesk</span>
                <span className="text-[8px] font-mono text-purple-300 leading-none">x-height: 1060</span>
              </div>
              <span className="absolute bottom-3 right-3 text-[8px] font-mono text-neutral-600 leading-none">GEOMETRIC</span>
            </div>
          </div>

        </div>
      </div>

      {/* Metric Cards Bottom */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Cap Height', a: '1456', b: '1430', aName: 'Inter', bName: 'Space G.' }, 
          { label: 'Ascender', a: '2048', b: '2000', aName: 'Inter', bName: 'Space G.' }, 
          { label: 'Weight Axis', a: '100–900', b: '300–700', aName: 'Inter', bName: 'Space G.' }
        ].map((m, i) => (
          <div 
            key={i} 
            className="rounded-xl border border-white/[0.05] bg-[#0c0c12]/60 backdrop-blur-md flex flex-col justify-between transition-all duration-300 hover:border-white/[0.1] hover:bg-white/[0.02] hover:-translate-y-[1px]" 
            style={{ padding: '1.125rem 1.25rem', minHeight: '90px' }}
          >
            <p className="text-[9px] font-mono font-semibold tracking-[0.25em] text-neutral-500 uppercase">{m.label}</p>
            <div className="flex flex-col gap-1.5" style={{ marginTop: '0.75rem' }}>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-neutral-500 font-mono font-light">{m.aName}</span>
                <span className="text-[11px] font-mono font-semibold text-white/90">{m.a}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-neutral-500 font-mono font-light">{m.bName}</span>
                <span className="text-[11px] font-mono font-semibold text-[#4cede1]">{m.b}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* Card 4: CSS Export Demo */
function PreviewCSS() {
  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="rounded-xl border border-white/[0.06] bg-[#0a0a10] flex-1 overflow-hidden">
        <div className="flex items-center border-b border-white/[0.05]" style={{ padding: '0.5rem 1rem' }}>
          <span className="text-[9px] font-mono text-neutral-600">typography.css</span>
        </div>
        <pre className="text-[11px] font-mono leading-relaxed overflow-hidden" style={{ padding: '1rem 1.25rem', color: 'rgba(255,255,255,0.7)' }}>{`/* Heading: Syne */
h1, h2, h3 {
  font-family: 'Syne', sans-serif;
  font-weight: 700;
  letter-spacing: -0.02em;
}

/* Body: Inter */
p, span, li {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  line-height: 1.6;
}`}</pre>
      </div>
      <div className="flex gap-3">
        {['CSS Variables', 'Tailwind Config', 'Import URL'].map((label, i) => (
          <div key={i} className={`rounded-lg border flex-1 text-center cursor-pointer transition-all ${i === 0 ? 'bg-[#4cede1]/10 border-[#4cede1]/20 text-[#4cede1]' : 'bg-white/[0.03] border-white/[0.06] text-neutral-500 hover:bg-white/[0.06]'}`} style={{ padding: '0.5rem' }}>
            <span className="text-[10px] font-mono">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* Card 5: Library/Collection Demo */
function PreviewLibrary() {
  const saved = [
    { name: 'Brand Primary', head: 'Syne', body: 'Inter', count: 3 },
    { name: 'Editorial Set', head: 'Playfair', body: 'Jakarta Sans', count: 5 },
    { name: 'Developer Kit', head: 'Space Grotesk', body: 'JetBrains', count: 2 },
  ]
  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02]" style={{ padding: '1rem 1.25rem' }}>
        <div className="flex justify-between items-center" style={{ marginBottom: '0.75rem' }}>
          <span className="text-[9px] font-mono tracking-[0.2em] text-neutral-600 uppercase">Your Libraries</span>
          <span className="text-[9px] font-mono text-[#4cede1]/50">3 collections</span>
        </div>
        <div className="flex flex-col gap-2">
          {saved.map((s, i) => (
            <div key={i} className="flex justify-between items-center rounded-lg border border-white/[0.05] bg-white/[0.02] transition-all hover:bg-white/[0.04]" style={{ padding: '0.75rem 1rem' }}>
              <div>
                <span className="block text-white text-sm font-light">{s.name}</span>
                <span className="block text-[10px] font-mono text-neutral-600">{s.head} + {s.body}</span>
              </div>
              <span className="text-[9px] font-mono text-neutral-600 bg-white/[0.04] rounded-full border border-white/[0.06]" style={{ padding: '0.25rem 0.625rem' }}>{s.count} pairs</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-3">
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] flex-1 text-center" style={{ padding: '0.625rem' }}>
          <span className="text-[10px] font-mono text-neutral-500">Export All</span>
        </div>
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] flex-1 text-center" style={{ padding: '0.625rem' }}>
          <span className="text-[10px] font-mono text-neutral-500">Share Link</span>
        </div>
        <div className="rounded-lg border border-[#4cede1]/20 bg-[#4cede1]/10 flex-1 text-center" style={{ padding: '0.625rem' }}>
          <span className="text-[10px] font-mono text-[#4cede1]">+ New</span>
        </div>
      </div>
    </div>
  )
}



/* ────────────────────────────────────────────────────────
   Grid Features Data
──────────────────────────────────────────────────────── */
const FEATURES = [
  {
    icon: <Layers className="w-5 h-5 text-[#4cede1]" />,
    title: '500+ Curated Fonts',
    desc: 'An filtered catalog of premium open-source typefaces. We prune the noise to bring you clean, modern, and production-ready choices.'
  },
  {
    icon: <Eye className="w-5 h-5 text-purple-400" />,
    title: 'Real-time Canvas',
    desc: 'Modify scaling, line height, weights, and tracking properties directly. See font combinations respond to layout changes.'
  },
  {
    icon: <Copy className="w-5 h-5 text-cyan-400" />,
    title: 'One-Click Export',
    desc: 'Instantly copy CSS variables, Tailwind configuration rules, or import hooks to drop directly into React, Vue, or clean HTML layouts.'
  },
  {
    icon: <Sparkles className="w-5 h-5 text-indigo-400" />,
    title: 'Mobile Optimized',
    desc: 'Fully fluid sizing. Explore, contrast, and inspect typography structures smoothly on tablets, phones, and high-DPI desktop viewports.'
  },
  {
    icon: <Layers className="w-5 h-5 text-[#4cede1]" />,
    title: 'Minimalist Interface',
    desc: 'Clean workspace environment built to remove distractions. Focus entirely on font-families, weights, and typographic contrast.'
  },
  {
    icon: <Heart className="w-5 h-5 text-rose-400" />,
    title: 'Seamless Integrations',
    desc: 'Save pairings in custom cloud folders. Create shareable links to collaborate directly with other design teammates and clients.'
  }
]

/* ────────────────────────────────────────────────────────
   Page Component
──────────────────────────────────────────────────────── */
export default function LandingPage() {
  const navigate = useNavigate()


  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.8,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])



  return (
    <main className="bg-[#030303] min-h-screen relative select-none w-full flex flex-col items-center" style={{ overflowX: 'clip' }}>
      {/* Deep Space Ambient Background */}
      <FuturisticBackground />

      {/* 1. HERO SECTION */}
      <section className="w-full flex flex-col items-center justify-center relative z-20 text-center px-6" style={{ minHeight: '90vh', paddingTop: '9rem', paddingBottom: '4.5rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 rounded-full border border-[#4cede1]/10 bg-[#4cede1]/5 text-xs font-mono tracking-widest text-[#4cede1] uppercase"
          style={{ padding: '0.5rem 1rem', marginBottom: '2rem' }}
        >
          <span className="rounded-full bg-[#4cede1] animate-ping" style={{ width: '6px', height: '6px' }} />
          The Typographic Vanguard
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.1, ease: 'easeOut' }}
          className="font-extralight tracking-tighter text-white leading-none"
          style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', marginBottom: '1.5rem', maxWidth: '900px' }}
        >
          Design with Intent. <br />
          <span className="font-light bg-gradient-to-r from-white via-white to-neutral-400 bg-clip-text text-transparent">
            Pair with Precision.
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
          className="text-neutral-500 font-light leading-relaxed"
          style={{ fontSize: 'clamp(1rem, 1.2vw, 1.25rem)', maxWidth: '600px', marginBottom: '2.5rem' }}
        >
          Discover, contrast, and integrate premium font pairings. Engineered for modern web designers and product developers who refuse compromise.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center z-30"
          style={{ marginBottom: '4.5rem' }}
        >
          <button
            onClick={() => navigate('/home')}
            className="flex items-center gap-2.5 bg-white text-[#030303] hover:bg-neutral-100 transition-all duration-200 font-semibold rounded-full cursor-pointer shadow-[0_4px_40px_rgba(255,255,255,0.1)] hover:shadow-[0_4px_60px_rgba(255,255,255,0.18)]"
            style={{ padding: '1rem 2rem', fontSize: '0.9375rem' }}
          >
            Get Started
            <ArrowRight style={{ width: '18px', height: '18px' }} />
          </button>
          <button
            onClick={() => navigate('/home')}
            className="flex items-center gap-2.5 border border-white/12 hover:border-white/25 hover:bg-white/5 transition-all duration-200 text-white font-medium rounded-full cursor-pointer bg-transparent"
            style={{ padding: '1rem 2rem', fontSize: '0.9375rem' }}
          >
            Explore Fonts
          </button>
        </motion.div>

        {/* ── Floating Typography Showcase ──────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.6, ease: 'easeOut' }}
          className="w-full relative"
          style={{ maxWidth: '860px' }}
        >
          <HeroShowcase />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="flex flex-col items-center gap-2 text-neutral-600 text-[10px] font-mono tracking-[0.25em] uppercase"
          style={{ marginTop: '3rem' }}
        >
          <span>Scroll to craft</span>
          <motion.div 
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="bg-[#4cede1] rounded-full"
            style={{ width: '6px', height: '6px' }}
          />
        </motion.div>
      </section>



      {/* 3. TYPOGRAPHY COMPARISON SHOWCASE */}
      <section className="w-full relative z-20 flex flex-col items-center" style={{ padding: '7rem 2rem 5rem' }}>
        <div style={{ maxWidth: '1240px', width: '100%', margin: '0 auto', relative: 'true' }}>
          
          {/* Ambient Glows */}
          <div className="absolute rounded-full pointer-events-none bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.06),transparent_65%)] blur-[100px] z-0" style={{ width: '80%', height: '80%', left: '10%', top: '10%' }} />
          <div className="absolute rounded-full pointer-events-none bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.04),transparent_60%)] blur-[80px] z-0" style={{ width: '60%', height: '60%', left: '20%', top: '20%' }} />

          {/* Section Header */}
          <div className="text-center relative z-10" style={{ marginBottom: '4rem' }}>
            <span className="text-[10px] font-mono tracking-[0.35em] text-[#4cede1]/70 uppercase block" style={{ marginBottom: '1rem' }}>
              Visual Analysis
            </span>
            <h2 className="text-white font-light tracking-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1.25rem' }}>
              Compare Typography Side by Side
            </h2>
            <p className="text-neutral-500 font-light leading-relaxed mx-auto" style={{ fontSize: '1rem', maxWidth: '540px' }}>
              Evaluate letterforms, visual metrics, and geometric weight contrast to build cohesive interface scales.
            </p>
          </div>

          {/* Main Feature Box: Premium Glassmorphism Card */}
          <div
            className="w-full relative rounded-2xl border border-white/[0.09] bg-[#0c0c12]/90 backdrop-blur-3xl overflow-hidden shadow-[0_32px_60px_-15px_rgba(0,0,0,0.8)] z-10 transition-all duration-500 hover:border-white/[0.12]"
            style={{ minHeight: '480px' }}
          >
            {/* Top shimmer highlight line */}
            <div className="absolute top-0 inset-x-0 bg-gradient-to-r from-transparent via-white/12 to-transparent" style={{ height: '1px' }} />

            {/* Split layout (2 columns on md/lg, 1 on mobile) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0' }} className="md:!grid-cols-[2fr_3fr]">

              {/* Left Side Content: Explanation */}
              <div className="flex flex-col justify-between" style={{ padding: '3.5rem 3rem' }}>
                <div>
                  <span className="text-[9px] font-mono tracking-[0.28em] text-[#4cede1]/80 font-semibold uppercase block" style={{ marginBottom: '1rem' }}>
                    Metrics Inspector
                  </span>
                  <h3 className="text-white font-normal tracking-tight leading-tight" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)', marginBottom: '1rem' }}>
                    Compare Visual Metrics
                  </h3>
                  <p className="text-neutral-400/90 font-light leading-relaxed" style={{ fontSize: '0.9375rem', marginBottom: '2rem' }}>
                    Anatomical metrics dictate how a font feels at scale. Match visual rhythm, track letter spacing, and build consistent typographic contrasts seamlessly.
                  </p>

                  {/* Bullet points */}
                  <ul className="flex flex-col gap-3">
                    {[
                      'Compare letterform x-heights',
                      'Analyze kerning & character spacing',
                      'Match visual weight & visual rhythm',
                      'Build high-fidelity, responsive scales'
                    ].map((bullet, i) => (
                      <li key={i} className="flex items-center gap-3 text-neutral-400/80 font-light transition-all duration-300 hover:text-white" style={{ fontSize: '0.875rem' }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4cede1]/60 shadow-[0_0_8px_rgba(76,237,225,0.4)]" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between items-center border-t border-white/[0.05]" style={{ paddingTop: '1.5rem', marginTop: '3rem' }}>
                  <span className="text-[9px] font-mono text-neutral-700 tracking-[0.2em] uppercase">fontpair.co</span>
                  <span className="text-[9px] font-mono text-neutral-700">Metrics Engine v1.0</span>
                </div>
              </div>

              {/* Right Side Content: Typography Comparison Preview */}
              <div className="border-t md:border-t-0 md:border-l border-white/[0.05] flex flex-col justify-center bg-[#07070c]/50" style={{ padding: '3rem 2.5rem' }}>
                <PreviewCompare />
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 4. FEATURES SECTION */}
      <section id="features" className="w-full relative z-20 scroll-mt-12 flex flex-col items-center" style={{ padding: '4rem 1.5rem 6rem' }}>
        <div style={{ maxWidth: '1100px', width: '100%', margin: '0 auto' }}>
          <div className="text-center" style={{ marginBottom: '4rem' }}>
            <span className="text-[10px] font-mono tracking-[0.35em] text-[#4cede1]/70 uppercase block" style={{ marginBottom: '1rem' }}>
              System Features
            </span>
            <h2 className="text-white font-light tracking-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Engineered for Creators
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full" style={{ gap: '1rem' }}>
            {FEATURES.map((feat, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/[0.06] bg-[#0c0c12]/70 flex flex-col items-start text-left hover:border-white/10 transition-all group"
                style={{ padding: '1.5rem' }}
              >
                <div className="bg-white/5 rounded-lg border border-white/5 group-hover:bg-[#4cede1]/5 group-hover:border-[#4cede1]/10 transition-all" style={{ padding: '0.625rem', marginBottom: '1.25rem' }}>
                  {feat.icon}
                </div>
                <h3 className="text-white font-medium tracking-wide" style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>
                  {feat.title}
                </h3>
                <p className="text-neutral-500 font-light leading-relaxed" style={{ fontSize: '0.8125rem' }}>
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FINAL CTA SECTION */}
      <section className="pt-32 pb-56 w-full relative z-20 flex justify-center px-6">
        <div className="w-full border border-white/[0.07] bg-[#0a0a12]/80 backdrop-blur-2xl rounded-2xl relative overflow-hidden text-center" style={{ maxWidth: '900px', padding: 'clamp(3rem, 6vw, 5rem) clamp(2rem, 4vw, 4rem)' }}>
          {/* Ambient glow */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(76,237,225,0.03) 0%, transparent 70%)' }} />
          <div className="absolute top-0 inset-x-0 bg-gradient-to-r from-transparent via-[#4cede1]/15 to-transparent" style={{ height: '1px' }} />

          <span className="text-[10px] font-mono tracking-[0.35em] text-[#4cede1]/70 uppercase block" style={{ marginBottom: '1.5rem' }}>
            Start Building
          </span>
          <h2 className="text-white font-light tracking-tight leading-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1.25rem' }}>
            Elevate Your Type. <br />
            Define Your Interface.
          </h2>
          <p className="text-neutral-500 font-light leading-relaxed mx-auto" style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1.05rem)', maxWidth: '480px', marginBottom: '2.5rem' }}>
            Join the typographic vanguard. Start pairing, comparing, and compiling flawless layouts.
          </p>
          <button
            onClick={() => navigate('/home')}
            className="inline-flex items-center gap-2.5 bg-[#4cede1] hover:bg-[#5df3e8] text-[#030303] font-semibold rounded-full transition-all duration-200 cursor-pointer border-none"
            style={{ padding: '0.875rem 2rem', fontSize: '0.875rem', boxShadow: '0 4px 30px rgba(76,237,225,0.2), 0 0 60px rgba(76,237,225,0.06)' }}
          >
            Enter the Sandbox
            <ArrowRight style={{ width: '16px', height: '16px' }} />
          </button>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer style={{ borderTop: '1px solid rgba(255, 255, 255, 0.04)', padding: '2.5rem 0', width: '100%', position: 'relative', zIndex: 20 }}>
        <div className="section-container" style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '0 2rem', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: '2rem' 
        }}>
          {/* Left: Signature & Made with */}
          <div className="flex flex-col gap-1" style={{ minWidth: '220px' }}>
            <a 
              href="https://ashil.space" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ 
                fontFamily: '"Dancing Script", cursive', 
                fontSize: '1.4rem', 
                fontWeight: 700, 
                color: '#C084FC',
                letterSpacing: '0.02em',
                textDecoration: 'none',
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              Infant Ashil A
            </a>
            <span style={{ color: '#72689c', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              Made with <Heart size={11} style={{ color: '#EF4444', display: 'inline' }} fill="#EF4444" /> and a lot of ☕
            </span>
          </div>

          {/* Center: Social Icons */}
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', alignItems: 'center' }}>
            {[
              { icon: <Github size={16} />, href: 'https://github.com/' },
              { icon: <Linkedin size={16} />, href: 'https://www.linkedin.com/in/infant-ashil-a-b88a39361/' },
              { icon: <Mail size={16} />, href: 'mailto:infantashil.a@gmail.com' }
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.015)',
                  border: '1px solid rgba(255, 255, 255, 0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#72689c',
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#C084FC';
                  e.currentTarget.style.borderColor = 'rgba(192, 132, 252, 0.3)';
                  e.currentTarget.style.background = 'rgba(139, 92, 246, 0.06)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#72689c';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.04)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.015)';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Right: Copyright */}
          <div style={{ color: '#52525b', fontSize: '0.8rem', textAlign: 'right', minWidth: '220px' }}>
            © 2026 <a href="https://ashil.space" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }} onMouseEnter={(e) => e.currentTarget.style.color = '#C084FC'} onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}>Infant Ashil A</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
