import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Type, Bold, Italic, RefreshCw, Copy, Check, Sun, Moon } from 'lucide-react';
import FontPreview from '../components/FontPreview';

// ── Data ─────────────────────────────────────────────────────────────────────

const FONTS = [
  'Inter', 'Poppins', 'Roboto', 'Montserrat',
  'Playfair Display', 'Oswald', 'Raleway', 'Nunito', 'Lora', 'Bebas Neue',
];

const PRESET_COLORS = [
  '#ffffff', '#f87171', '#fbbf24', '#34d399',
  '#60a5fa', '#a78bfa', '#f472b6', '#94a3b8',
];

const DEFAULTS = {
  text: '', fontFamily: 'Inter', fontSize: 56,
  isBold: false, isItalic: false, color: '#ffffff',
};

// ── Reusable sub-components ───────────────────────────────────────────────────

function SectionLabel({ children, value }) {
  return (
    <div className="flex items-baseline justify-between mb-2">
      <span className="text-[9px] font-bold tracking-[0.18em] uppercase text-white/40">{children}</span>
      {value && <span className="text-[10px] font-semibold text-cyan-400/80">{value}</span>}
    </div>
  );
}

function Divider() {
  return <div className="h-px bg-white/[0.05] -mx-5 md:-mx-6" />;
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function Home() {
  const [text, setText]           = useState(DEFAULTS.text);
  const [fontFamily, setFont]     = useState(DEFAULTS.fontFamily);
  const [fontSize, setSize]       = useState(DEFAULTS.fontSize);
  const [isBold, setBold]         = useState(DEFAULTS.isBold);
  const [isItalic, setItalic]     = useState(DEFAULTS.isItalic);
  const [color, setColor]         = useState(DEFAULTS.color);
  const [isDark, setDark]         = useState(true);
  const [copied, setCopied]       = useState(false);

  const reset = () => {
    setText(DEFAULTS.text); setFont(DEFAULTS.fontFamily); setSize(DEFAULTS.fontSize);
    setBold(DEFAULTS.isBold); setItalic(DEFAULTS.isItalic); setColor(DEFAULTS.color);
  };

  const copy = () => {
    navigator.clipboard.writeText(text || 'Type something amazing...');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // theme tokens
  const bg       = isDark ? 'bg-[#06060f]'           : 'bg-slate-100';
  const text_c   = isDark ? 'text-white'              : 'text-slate-900';
  const panel    = isDark
    ? 'bg-[#0c0c1a]/70 border-white/[0.06] shadow-[0_4px_40px_rgba(0,0,0,0.5)]'
    : 'bg-white/80    border-black/[0.07]  shadow-[0_4px_30px_rgba(0,0,0,0.08)]';
  const inputCls = isDark
    ? 'bg-black/40 border-white/[0.06] placeholder-white/20 text-white focus:border-cyan-500/40'
    : 'bg-white/60 border-black/[0.07] placeholder-black/30 text-slate-900 focus:border-blue-400/50';
  const btnBase  = isDark
    ? 'border-white/[0.07] hover:bg-white/[0.06] text-white/70 hover:text-white'
    : 'border-black/[0.07] hover:bg-black/[0.04] text-slate-600 hover:text-slate-900';
  const fontBtnInactive = isDark
    ? 'border-white/[0.06] hover:bg-white/[0.05] text-white/70'
    : 'border-black/[0.06] hover:bg-black/[0.04] text-slate-700';

  return (
    <div className={`min-h-screen w-full ${bg} ${text_c} transition-colors duration-400`}>

      {/* ── Background texture ───────────────────────────────────────────── */}
      {isDark && (
        <>
          <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(76,237,225,0.06),transparent)] pointer-events-none" />
          <div className="fixed inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_100%,rgba(139,92,246,0.06),transparent)] pointer-events-none" />
        </>
      )}

      {/* ── Centered container ───────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto min-h-screen flex flex-col px-4 sm:px-6 lg:px-10 py-5 lg:py-7">

        {/* ── HEADER ───────────────────────────────────────────────────────── */}
        <header className="flex items-center justify-between mb-6 shrink-0">

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2.5"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Type className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight leading-none select-none">
                Font Style{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  Studio
                </span>
              </h1>
              <p className="text-[9px] tracking-widest uppercase opacity-40 mt-0.5 select-none">Typography Editor</p>
            </div>
          </motion.div>

          {/* Theme toggle */}
          <button
            onClick={() => setDark(!isDark)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all ${btnBase} hover:scale-[1.03] active:scale-95`}
          >
            {isDark ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
            {isDark ? 'Light' : 'Dark'}
          </button>
        </header>

        {/* ── MAIN GRID ────────────────────────────────────────────────────── */}
        <main className="flex-1 grid grid-cols-1 lg:grid-cols-[1.2fr_0.85fr] gap-5 lg:gap-7 items-start">

          {/* ── LEFT: Preview ──────────────────────────────────────────────── */}
          <div className="lg:sticky lg:top-7">
            <FontPreview
              text={text}
              fontFamily={fontFamily}
              fontSize={fontSize}
              isBold={isBold}
              isItalic={isItalic}
              color={color}
            />
          </div>

          {/* ── RIGHT: Controls ────────────────────────────────────────────── */}
          <div
            className={`self-start rounded-3xl border backdrop-blur-2xl ${panel} flex flex-col gap-0 overflow-hidden transition-all duration-300`}
          >
            {/* ── Copy / Reset ─────────────────────────── */}
            <div className="flex gap-3 p-5 md:p-6 pb-4">
              <button
                onClick={copy}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all ${btnBase}`}
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <button
                onClick={reset}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all border-red-500/20 hover:bg-red-500/[0.07] text-red-400/70 hover:text-red-400`}
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset
              </button>
            </div>

            <Divider />

            {/* ── Text input ───────────────────────────── */}
            <div className="p-5 md:p-6 pb-4">
              <SectionLabel>Your Text</SectionLabel>
              <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Type something amazing..."
                rows={2}
                className={`w-full rounded-xl border text-sm leading-relaxed p-3.5 resize-none outline-none focus:ring-1 focus:ring-cyan-500/20 transition-all ${inputCls}`}
              />
            </div>

            <Divider />

            {/* ── Font Family ──────────────────────────── */}
            <div className="p-5 md:p-6 pb-4">
              <SectionLabel value={fontFamily}>Font Family</SectionLabel>
              <div className="grid grid-cols-2 gap-2">
                {FONTS.map(f => (
                  <button
                    key={f}
                    onClick={() => setFont(f)}
                    style={{ fontFamily: f }}
                    className={`py-2 px-2.5 text-[11px] rounded-xl border transition-all truncate ${
                      fontFamily === f
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-transparent shadow shadow-cyan-500/20 scale-[1.01]'
                        : fontBtnInactive
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <Divider />

            {/* ── Size slider ──────────────────────────── */}
            <div className="p-5 md:p-6 pb-4">
              <SectionLabel value={`${fontSize}px`}>Font Size</SectionLabel>
              <input
                type="range" min={14} max={120} value={fontSize}
                onChange={e => setSize(Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-cyan-500"
                style={{ background: `linear-gradient(to right, #22d3ee ${((fontSize - 14) / 106) * 100}%, rgba(255,255,255,0.08) 0)` }}
              />
              <div className="flex justify-between mt-1">
                <span className="text-[9px] opacity-30">14px</span>
                <span className="text-[9px] opacity-30">120px</span>
              </div>
            </div>

            <Divider />

            {/* ── Bold / Italic ────────────────────────── */}
            <div className="p-5 md:p-6 pb-4">
              <SectionLabel>Style</SectionLabel>
              <div className="flex gap-3">
                {[
                  { label: 'Bold',   icon: Bold,   state: isBold,   toggle: () => setBold(!isBold)   },
                  { label: 'Italic', icon: Italic,  state: isItalic, toggle: () => setItalic(!isItalic) },
                ].map(({ label, icon: Icon, state, toggle }) => (
                  <button
                    key={label}
                    onClick={toggle}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-[10px] font-bold uppercase tracking-wider transition-all ${
                      state
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-transparent shadow shadow-cyan-500/20'
                        : btnBase
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <Divider />

            {/* ── Color picker ─────────────────────────── */}
            <div className="p-5 md:p-6">
              <div className="flex items-center justify-between mb-3">
                <SectionLabel>Text Color</SectionLabel>
                <div className={`flex items-center gap-2 px-2 py-1 rounded-lg border ${isDark ? 'border-white/[0.06] bg-black/30' : 'border-black/[0.06] bg-white/50'}`}>
                  <input
                    type="color" value={color}
                    onChange={e => setColor(e.target.value)}
                    className="w-4 h-4 rounded cursor-pointer border-0 bg-transparent p-0"
                  />
                  <span className="text-[9px] font-mono opacity-60 uppercase">{color}</span>
                </div>
              </div>
              <div className="flex justify-between">
                {PRESET_COLORS.map(c => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`w-7 h-7 rounded-full border-2 transition-all hover:scale-110 ${
                      color === c ? 'border-cyan-400 scale-110 shadow shadow-cyan-500/30' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: c }}
                    aria-label={`Color ${c}`}
                  />
                ))}
              </div>
            </div>

          </div>{/* end right panel */}

        </main>

        {/* ── Footer ───────────────────────────────────────────────────────── */}
        <footer className="shrink-0 mt-6 text-center">
          <p className="text-[9px] tracking-widest uppercase opacity-20 select-none">
            Font Style Studio · Powered by Google Fonts
          </p>
        </footer>

      </div>{/* end centered container */}
    </div>
  );
}
