import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FontPreview({ text, fontFamily, fontSize, isBold, isItalic, color }) {
  const displayText = text.trim() === '' ? 'Type something amazing...' : text;

  return (
    /* Outer card — no fixed height, uses min-h so it grows with content but stays tall */
    <div className="relative w-full min-h-[75vh] lg:min-h-[76vh] rounded-3xl overflow-hidden isolate flex items-center justify-center border border-white/[0.07] bg-[#05050d]">

      {/* ── Ambient glow layers ────────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-600/10 via-transparent to-purple-600/10 pointer-events-none" />
      <div className="absolute -top-1/4 -left-1/4 w-2/3 h-2/3 bg-cyan-500/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-1/4 -right-1/4 w-2/3 h-2/3 bg-purple-600/8 rounded-full blur-[100px] pointer-events-none" />

      {/* ── Inner shadow ring ──────────────────────────────── */}
      <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.6)] rounded-3xl pointer-events-none" />

      {/* ── Text ──────────────────────────────────────────── */}
      <div className="relative z-10 w-full flex items-center justify-center p-8 md:p-16">
        <AnimatePresence mode="wait">
          <motion.p
            key={`${fontFamily}-${isBold}-${isItalic}`}
            initial={{ opacity: 0, filter: 'blur(6px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(4px)' }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full text-center break-words leading-[1.15] tracking-tight antialiased select-all"
            style={{
              fontFamily,
              fontSize: `clamp(1.5rem, ${fontSize / 16}rem, ${fontSize}px)`,
              fontWeight: isBold ? 700 : 400,
              fontStyle: isItalic ? 'italic' : 'normal',
              color,
              transition: 'color 0.25s ease, font-size 0.2s ease',
            }}
          >
            {displayText}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* ── Bottom metadata strip ──────────────────────────── */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center">
        <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-white/20 select-none">
          {fontFamily} · {fontSize}px · {isBold ? 'Bold' : 'Regular'}{isItalic ? ' Italic' : ''}
        </span>
      </div>
    </div>
  );
}
