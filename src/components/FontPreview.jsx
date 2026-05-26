import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FontPreview({ text, fontFamily, fontSize, isBold, isItalic, color, isDark }) {
  const displayText = text.trim() === '' ? 'Type something amazing...' : text;

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden isolate border transition-colors duration-500 ${
        isDark
          ? 'bg-[#08081a] border-white/[0.07] shadow-[0_20px_60px_rgba(0,0,0,0.7)]'
          : 'bg-[#fafbfc] border-slate-200 shadow-[0_10px_40px_rgba(0,0,0,0.06)]'
      }`}
      style={{ minHeight: 'calc(100vh - 140px)' }}
    >

      {/* Ambient glow layers — dark mode only */}
      {isDark && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.07] via-transparent to-purple-600/[0.07] pointer-events-none" />
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-cyan-500/[0.08] rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-purple-500/[0.08] rounded-full blur-[120px] pointer-events-none" />
        </>
      )}

      {/* Inner vignette */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          boxShadow: isDark
            ? 'inset 0 0 80px rgba(0,0,0,0.7)'
            : 'inset 0 0 60px rgba(0,0,0,0.03)',
        }}
      />

      {/* Text container */}
      <div className="absolute inset-0 flex items-center justify-center px-12 sm:px-16 text-center z-10">
        <AnimatePresence mode="wait">
          <motion.p
            key={`${fontFamily}-${isBold}-${isItalic}`}
            initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full break-words leading-[1] tracking-tight antialiased select-all"
            style={{
              fontFamily,
              fontSize: `clamp(1.5rem, ${fontSize / 16}rem, ${fontSize}px)`,
              fontWeight: isBold ? 700 : 400,
              fontStyle: isItalic ? 'italic' : 'normal',
              color: isDark ? color : (color === '#ffffff' ? '#1e293b' : color),
              transition: 'color 0.3s ease, font-size 0.2s ease',
            }}
          >
            {displayText}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Bottom metadata pill */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center z-20">
        <span
          className={`text-[9px] font-mono tracking-[0.25em] uppercase px-4 py-1.5 rounded-full select-none transition-colors duration-500 ${
            isDark
              ? 'text-white/25 bg-white/[0.03] border border-white/[0.06] backdrop-blur-md'
              : 'text-slate-400 bg-black/[0.02] border border-slate-200'
          }`}
        >
          {fontFamily} · {fontSize}px · {isBold ? 'Bold' : 'Regular'}{isItalic ? ' Italic' : ''}
        </span>
      </div>
    </div>
  );
}
