import { useState, useEffect } from 'react'
import WebFont from 'webfontloader'
import googleFontsData from '../data/google-fonts.json'

const FUTURISTIC = ['Orbitron', 'Space Grotesk', 'Syncopate', 'Rajdhani', 'Share Tech Mono', 'Oxanium', 'Audiowide', 'Michroma', 'Exo 2', 'Teko'];
const DECORATIVE = ['Lobster', 'Pacifico', 'Cinzel', 'Playfair Display', 'Abril Fatface', 'Righteous', 'Creepster', 'Ewert', 'Monoton', 'Spicy Rice'];
const MODERN = ['Poppins', 'Plus Jakarta Sans', 'Outfit', 'Montserrat', 'Inter', 'Kanit', 'Sora', 'Syne', 'Clash Display', 'Cabinet Grotesk'];
const MINIMAL = ['Inter', 'Raleway', 'DM Sans', 'Abel', 'Actor', 'Urbanist', 'Manrope', 'Lexend', 'Questrial', 'Tenor Sans'];

// Process fonts to include custom categories and the "new" attribute
export const PROCESSED_FONTS = googleFontsData.map((font, index) => {
  let category = font.category;
  if (FUTURISTIC.includes(font.name)) category = 'Futuristic';
  else if (DECORATIVE.includes(font.name)) category = 'Decorative';
  else if (MODERN.includes(font.name)) category = 'Modern';
  else if (MINIMAL.includes(font.name)) category = 'Minimal';
  
  return {
    ...font,
    category,
    new: index % 11 === 0, // Dynamic representation of new fonts
  };
});

export const CATEGORIES = [
  'All', 
  'Sans Serif', 
  'Serif', 
  'Display', 
  'Handwriting', 
  'Monospace', 
  'Script', 
  'Decorative', 
  'Modern', 
  'Minimal', 
  'Futuristic'
];

export function getCategoryColor(cat) {
  const map = {
    'Sans Serif': '#8B5CF6',
    'Serif': '#A855F7',
    'Display': '#EC4899',
    'Handwriting': '#10B981',
    'Monospace': '#0EA5E9',
    'Script': '#F59E0B',
    'Decorative': '#E11D48',
    'Modern': '#06B6D4',
    'Minimal': '#6B7280',
    'Futuristic': '#3B82F6'
  };
  return map[cat] || '#8B5CF6';
}

// Centralized Font Loading Manager Queue
const loadedFontsCache = new Set()
const activeLoadingSet = new Set()
const fontLoadQueue = []
const MAX_CONCURRENT_LOADS = 3

function processQueue() {
  if (activeLoadingSet.size >= MAX_CONCURRENT_LOADS) return
  if (fontLoadQueue.length === 0) return

  const fontName = fontLoadQueue.shift()
  activeLoadingSet.add(fontName)

  let loaded = false
  
  // Set fallback timeout of 3.5 seconds
  const timeoutId = setTimeout(() => {
    if (!loaded) {
      console.warn(`Font load timeout: ${fontName}`)
      onFontFinished(fontName, false)
    }
  }, 3500)

  WebFont.load({
    google: {
      families: [fontName]
    },
    active: () => {
      clearTimeout(timeoutId)
      loaded = true
      onFontFinished(fontName, true)
    },
    inactive: () => {
      clearTimeout(timeoutId)
      loaded = true
      onFontFinished(fontName, false)
    }
  })
}

function onFontFinished(fontName, success) {
  activeLoadingSet.delete(fontName)
  if (success) {
    loadedFontsCache.add(fontName)
  }
  
  const event = new CustomEvent('font-loaded', { detail: { fontName, success } })
  window.dispatchEvent(event)

  processQueue()
}

export function queueFontLoad(fontName) {
  if (loadedFontsCache.has(fontName) || activeLoadingSet.has(fontName) || fontLoadQueue.includes(fontName)) {
    return
  }
  fontLoadQueue.push(fontName)
  processQueue()
}

export function useLoadGoogleFont(fontName) {
  const [status, setStatus] = useState(() => {
    if (loadedFontsCache.has(fontName)) return 'loaded'
    return 'loading'
  })

  useEffect(() => {
    if (!fontName) return

    if (loadedFontsCache.has(fontName)) {
      setStatus('loaded')
      return
    }

    // Debounce load trigger by 180ms to avoid querying fast scrolled items
    const timer = setTimeout(() => {
      queueFontLoad(fontName)
    }, 180)

    const handleFontLoaded = (e) => {
      if (e.detail.fontName === fontName) {
        setStatus(e.detail.success ? 'loaded' : 'error')
      }
    }

    window.addEventListener('font-loaded', handleFontLoaded)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('font-loaded', handleFontLoaded)
    }
  }, [fontName])

  return status
}
