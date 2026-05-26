import { Sparkles, Zap, Smartphone, Heart, Globe, Code2, Check, Github, Mail, Linkedin } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

const STATS = [
  { value: '600+ Fonts', label: 'Real Google Fonts fetched dynamically via API.', color: '#8B5CF6' },
  { value: 'Instant Preview', label: 'Lightning-fast client-side virtualization rendering.', color: '#EC4899' },
  { value: 'Responsive UI', label: 'Flawlessly optimized for desktop, tablet, and mobile.', color: '#10B981' },
  { value: 'Modern SaaS', label: 'Sleek dark-mode aesthetic with minimal grid texture.', color: '#3B82F6' },
]

const FEATURES = [
  {
    icon: <Sparkles size={22} />,
    title: 'Beautiful Typography',
    desc: 'Uncompromising layout balance and large live preview cards that highlight the unique character of every typeface.',
    color: '#8B5CF6',
  },
  {
    icon: <Zap size={22} />,
    title: 'Fast Dynamic Loading',
    desc: 'Intersection-observed font downloads to minimize bandwidth consumption while keeping performance flawless.',
    color: '#EC4899',
  },
  {
    icon: <Smartphone size={22} />,
    title: 'Responsive Experience',
    desc: 'A gorgeous full-width interface optimized for fluid navigation and zero scroll lag across all modern viewports.',
    color: '#10B981',
  },
  {
    icon: <Globe size={22} />,
    title: 'Clean Modern UI',
    desc: 'Inspired by world-class software designs. Clean line-by-line filters, subtle glowing states, and zero visual clutter.',
    color: '#3B82F6',
  },
]

function StatCard({ stat, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{
        background: 'rgba(255, 255, 255, 0.015)',
        border: '1px solid rgba(255, 255, 255, 0.04)',
        borderRadius: '24px',
        padding: '2.5rem 2rem',
        textAlign: 'left',
        position: 'relative',
        overflow: 'hidden',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
      whileHover={{ y: -6, borderColor: 'rgba(255, 255, 255, 0.08)', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
        background: `linear-gradient(90deg, ${stat.color}, transparent)`,
      }} />
      <h3 style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 800,
        fontSize: '1.8rem',
        color: '#ffffff',
        marginBottom: '0.75rem',
        letterSpacing: '-0.02em',
      }}>
        {stat.value}
      </h3>
      <p style={{ color: '#72689c', fontSize: '0.9rem', lineHeight: 1.5 }}>
        {stat.label}
      </p>
    </motion.div>
  )
}

function FeatureCard({ feature, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{
        background: 'rgba(255, 255, 255, 0.015)',
        border: '1px solid rgba(255, 255, 255, 0.04)',
        borderRadius: '24px',
        padding: '2.25rem 2rem',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
      whileHover={{ y: -4, boxShadow: `0 12px 40px ${feature.color}15`, borderColor: `rgba(255, 255, 255, 0.08)` }}
    >
      <div style={{
        width: '52px', height: '52px',
        background: `${feature.color}14`,
        border: `1px solid ${feature.color}25`,
        borderRadius: '14px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: feature.color,
        marginBottom: '1.5rem',
      }}>
        {feature.icon}
      </div>
      <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '1.15rem', color: '#ffffff', marginBottom: '0.75rem' }}>
        {feature.title}
      </h3>
      <p style={{ color: '#72689c', fontSize: '0.92rem', lineHeight: 1.65 }}>
        {feature.desc}
      </p>
    </motion.div>
  )
}

export default function AboutPage({ darkMode, setDarkMode }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at top, rgba(139, 92, 246, 0.1), transparent 50%), radial-gradient(circle at bottom right, rgba(168, 85, 247, 0.04), transparent 45%), #030303',
      color: '#ffffff',
      fontFamily: 'Inter, sans-serif',
      overflowX: 'hidden',
      position: 'relative',
    }}>
      {/* Tiny Analog Noise/Grain Texture Overlay */}
      <div style={{
        position: 'fixed', inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        opacity: 0.015,
        pointerEvents: 'none',
        zIndex: 9999,
      }} />

      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* ── HERO SECTION ──────────────────────────────────── */}
      <section style={{ padding: '8rem 0 5rem', position: 'relative', overflow: 'hidden' }}>
        <div className="section-container" style={{ maxWidth: '1450px', margin: '0 auto', padding: '0 2rem', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="badge" style={{
              display: 'inline-flex', gap: '6px', alignItems: 'center',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              background: 'rgba(255, 255, 255, 0.02)',
              color: '#d8b4fe',
              marginBottom: '1.5rem',
            }}>
              <Heart size={12} fill="currentColor" /> Built with Passion
            </span>
            <h1 className="heading-display" style={{
              fontSize: 'clamp(2.8rem, 6.5vw, 5rem)',
              color: '#ffffff',
              marginBottom: '1.25rem',
              fontWeight: 300,
              letterSpacing: '-0.045em',
              lineHeight: 1.1,
            }}>
              Crafting typography{' '}
              <span style={{
                background: 'linear-gradient(135deg, #ffffff 10%, #C084FC 55%, #8B5CF6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>experiences</span>
              {' '}instantly.
            </h1>
            <p style={{
              color: '#b4b0cc',
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              maxWidth: '640px',
              margin: '0 auto 3.5rem',
              lineHeight: 1.7
            }}>
              font.save is a free, modern platform designed for creators, developers, and designers to preview and organize real Google Fonts seamlessly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FOUNDER SECTION (Horizontal Premium Card) ────── */}
      <section style={{ padding: '2rem 0 5rem' }}>
        <div className="section-container" style={{ maxWidth: '1450px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{
            maxWidth: '920px',
            margin: '0 auto',
            background: 'rgba(255, 255, 255, 0.015)',
            border: '1px solid rgba(255, 255, 255, 0.04)',
            borderRadius: '32px',
            padding: '3rem 2.5rem',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 24px 80px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Ambient card background glow */}
            <div style={{
              position: 'absolute',
              top: '-15%', right: '-15%',
              width: '280px', height: '280px',
              background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />
            
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2.5rem',
              position: 'relative',
              zIndex: 1,
            }}>
              {/* Avatar circle with glow border */}
              <div style={{
                width: '120px', height: '120px',
                background: 'linear-gradient(135deg, #10B981 0%, #8B5CF6 100%)',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 8px 32px rgba(16, 185, 129, 0.25)',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 800, fontSize: '2rem', color: '#ffffff',
                flexShrink: 0,
              }}>
                IA
              </div>
              
              {/* Info details */}
              <div style={{ flex: '1 1 450px', textAlign: 'left' }}>
                <span className="badge" style={{
                  background: 'rgba(16, 185, 129, 0.08)',
                  color: '#34D399',
                  border: '1px solid rgba(16, 185, 129, 0.15)',
                  marginBottom: '0.75rem',
                  fontSize: '0.72rem',
                  display: 'inline-flex',
                }}>
                  Founder
                </span>
                <h2 style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 800,
                  fontSize: '2rem',
                  color: '#ffffff',
                  marginBottom: '0.25rem',
                  letterSpacing: '-0.02em',
                }}>
                  <a 
                    href="https://ashil.space" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{ 
                      color: 'inherit', 
                      textDecoration: 'none',
                      transition: 'color 0.25s' 
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#C084FC'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}
                  >
                    Infant Ashil A
                  </a>
                </h2>
                <p style={{
                  color: '#8B5CF6',
                  fontWeight: 600,
                  fontSize: '0.98rem',
                  marginBottom: '1rem',
                  letterSpacing: '0.03em',
                  textTransform: 'uppercase',
                }}>
                  Lead Full-Stack Engineer
                </p>
                <p style={{
                  color: '#b4b0cc',
                  fontSize: '0.95rem',
                  lineHeight: 1.7,
                  marginBottom: '1.5rem',
                }}>
                  Pioneering next-gen web applications, interactive design tools, and typography systems. Focused on crafting seamless, lightning-fast interfaces that combine cinematic visual artistry with performance-oriented frontend engineering.
                </p>
                
                {/* Social icons */}
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  {[
                    { icon: <Mail size={15} />, href: 'mailto:infantashil.a@gmail.com' },
                    { icon: <Github size={15} />, href: 'https://github.com/' },
                    { icon: <Linkedin size={15} />, href: 'https://www.linkedin.com/in/infant-ashil-a-b88a39361/' }
                  ].map((s, idx) => (
                    <a
                      key={idx}
                      href={s.href}
                      style={{
                        width: '38px', height: '38px',
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.04)',
                        borderRadius: '12px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#72689c', transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#10B981'
                        e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.3)'
                        e.currentTarget.style.background = 'rgba(16, 185, 129, 0.05)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#72689c'
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.04)'
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'
                      }}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS SECTION ─────────────────────────────────── */}
      <section style={{ padding: '4rem 0' }}>
        <div className="section-container" style={{ maxWidth: '1450px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
            maxWidth: '1200px',
            margin: '0 auto',
          }}>
            {STATS.map((stat, idx) => <StatCard key={idx} stat={stat} index={idx} />)}
          </div>
        </div>
      </section>

      {/* ── WHY THIS PLATFORM ─────────────────────────────── */}
      <section style={{ padding: '6rem 0 4rem' }}>
        <div className="section-container" style={{ maxWidth: '1450px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <span className="badge" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
                <Sparkles size={12} /> Why This Platform
              </span>
              <h2 className="heading-h1" style={{ fontSize: 'clamp(1.75rem, 4.5vw, 3rem)', color: '#ffffff', marginBottom: '0.875rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
                Everything you need for{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #ffffff 10%, #C084FC 60%, #8B5CF6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>great typography</span>
              </h2>
              <p style={{ color: '#72689c', maxWidth: '520px', margin: '0 auto', lineHeight: 1.65 }}>
                Powerful rendering tools and layouts crafted specifically to make typeface testing fluid and clean.
              </p>
            </motion.div>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            maxWidth: '1200px',
            margin: '0 auto',
          }}>
            {FEATURES.map((f, i) => <FeatureCard key={f.title} feature={f} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA SECTION ─────────────────────────────── */}
      <section style={{ padding: '6rem 0 8rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />
        
        <div className="section-container" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 300,
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              color: '#ffffff',
              marginBottom: '1rem',
              letterSpacing: '-0.04em',
            }}>
              Explore 600+ Beautiful Fonts
            </h2>
            <p style={{ color: '#b4b0cc', fontSize: '1.1rem', marginBottom: '2.5rem', maxWidth: '580px', margin: '0 auto 2.5rem', lineHeight: 1.65 }}>
              Find the perfect typeface for your next project. Preview, filter, and reference styles in real time.
            </p>
            <Link to="/fonts" style={{ textDecoration: 'none' }}>
              <button
                id="about-cta-explore-btn"
                style={{
                  background: 'linear-gradient(135deg, #8B5CF6 0%, #C084FC 100%)',
                  color: '#ffffff',
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  padding: '1rem 2.5rem',
                  borderRadius: '16px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 8px 30px rgba(139, 92, 246, 0.3)',
                  fontFamily: 'Inter, sans-serif',
                  transition: 'all 0.3s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(139, 92, 246, 0.45)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(139, 92, 246, 0.3)'
                }}
              >
                Get Started For Free <Sparkles size={16} />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────── */}
      <footer style={{ borderTop: '1px solid rgba(255, 255, 255, 0.04)', padding: '2.5rem 0', width: '100%', position: 'relative', zIndex: 20 }}>
        <div className="section-container" style={{ 
          maxWidth: '1450px', 
          margin: '0 auto', 
          padding: '0 2rem', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: '2rem' 
        }}>
          {/* Left: Signature & Made with */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', minWidth: '220px' }}>
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
    </div>
  )
}
