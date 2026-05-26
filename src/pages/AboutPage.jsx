import { Sparkles, Zap, Smartphone, Heart, Globe, Code2, Check, Github, Twitter, Linkedin } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

const STATS = [
  { value: '500+', label: 'Fonts Available', color: '#7C4DFF' },
  { value: '50K+', label: 'Happy Users', color: '#A855F7' },
  { value: '1M+', label: 'Previews Generated', color: '#EC4899' },
  { value: '100%', label: 'Free Forever', color: '#10B981' },
]

const FEATURES = [
  {
    icon: <Sparkles size={22} />,
    title: '500+ Beautiful Fonts',
    desc: 'Access a curated collection of premium open-source typefaces — from elegant serifs to playful scripts, we have it all.',
    color: '#7C4DFF',
  },
  {
    icon: <Zap size={22} />,
    title: 'Lightning Fast Preview',
    desc: 'See your text rendered in any font instantly. No page reloads. No waiting. Just pure, real-time typography magic.',
    color: '#F59E0B',
  },
  {
    icon: <Smartphone size={22} />,
    title: 'Mobile Friendly',
    desc: 'Perfectly optimized for every screen size. Browse, preview, and save fonts on your phone just as easily as on desktop.',
    color: '#10B981',
  },
  {
    icon: <Heart size={22} />,
    title: 'Save Favorites',
    desc: 'Bookmark the fonts you love and build your personal typography collection for easy access later.',
    color: '#EF4444',
  },
  {
    icon: <Code2 size={22} />,
    title: 'One-Click Copy',
    desc: 'Copy CSS font-family declarations with a single click. Drop them directly into your projects.',
    color: '#0EA5E9',
  },
  {
    icon: <Globe size={22} />,
    title: 'Google Fonts Powered',
    desc: 'Built on the world\'s most trusted typography platform — reliable, fast, and free for any project.',
    color: '#A855F7',
  },
]

const TEAM = [
  {
    name: 'Alex Rivera',
    role: 'Founder & Designer',
    avatar: 'AR',
    color: '#7C4DFF',
    bio: 'Passionate about making typography accessible to everyone.',
    twitter: '#', github: '#',
  },
  {
    name: 'Maya Chen',
    role: 'Lead Developer',
    avatar: 'MC',
    color: '#A855F7',
    bio: 'Building delightful web experiences one pixel at a time.',
    twitter: '#', github: '#',
  },
  {
    name: 'Sam Parker',
    role: 'Product Designer',
    avatar: 'SP',
    color: '#EC4899',
    bio: 'Crafting interfaces that feel intuitive and beautiful.',
    twitter: '#', github: '#',
  },
]

const WHY_POINTS = [
  'No account needed — start instantly',
  'Free forever, no hidden costs',
  'Preview in your own custom text',
  'Powered by Google Fonts CDN',
  'Works on all devices',
  'Open-source friendly',
]

function StatCard({ stat, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '20px',
        padding: '2rem 1.5rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
        background: `linear-gradient(90deg, ${stat.color}, ${stat.color}88)`,
      }} />
      <p style={{
        fontFamily: 'Plus Jakarta Sans',
        fontWeight: 800,
        fontSize: '2.5rem',
        color: stat.color,
        lineHeight: 1,
        marginBottom: '0.5rem',
      }}>
        {stat.value}
      </p>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>
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
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '20px',
        padding: '2rem',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
      whileHover={{ y: -4, boxShadow: `0 12px 40px ${feature.color}18`, borderColor: `${feature.color}30` }}
    >
      <div style={{
        width: '52px', height: '52px',
        background: `${feature.color}14`,
        border: `1px solid ${feature.color}25`,
        borderRadius: '14px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: feature.color,
        marginBottom: '1.25rem',
      }}>
        {feature.icon}
      </div>
      <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '0.625rem' }}>
        {feature.title}
      </h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.65 }}>
        {feature.desc}
      </p>
    </motion.div>
  )
}

function TeamCard({ member, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '24px',
        padding: '2rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
      whileHover={{ y: -4, boxShadow: '0 16px 50px rgba(124,77,255,0.12)' }}
    >
      {/* Avatar */}
      <div style={{
        width: '80px', height: '80px',
        background: `linear-gradient(135deg, ${member.color}, ${member.color}88)`,
        borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 1.25rem',
        boxShadow: `0 8px 24px ${member.color}30`,
        fontFamily: 'Plus Jakarta Sans',
        fontWeight: 800, fontSize: '1.35rem', color: 'white',
      }}>
        {member.avatar}
      </div>

      <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
        {member.name}
      </h3>
      <p style={{ color: member.color, fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.875rem' }}>
        {member.role}
      </p>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
        {member.bio}
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
        {[{ icon: <Twitter size={15} />, href: member.twitter }, { icon: <Github size={15} />, href: member.github }].map((s, i) => (
          <a key={i} href={s.href} style={{
            width: '34px', height: '34px',
            background: 'var(--bg)', border: '1px solid var(--border)',
            borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--text-muted)', transition: 'all 0.2s ease',
          }}
            onMouseEnter={(e) => { e.currentTarget.style.color = member.color; e.currentTarget.style.borderColor = `${member.color}30` }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)' }}
          >
            {s.icon}
          </a>
        ))}
      </div>
    </motion.div>
  )
}

export default function AboutPage({ darkMode, setDarkMode }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* ── HERO ──────────────────────────────────────────── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '5rem 0 6rem' }}>
        {/* Background shapes */}
        <div className="orb orb-primary" style={{ top: '-200px', right: '-100px', opacity: 0.5 }} />
        <div className="orb orb-secondary" style={{ bottom: '-150px', left: '-80px', opacity: 0.5 }} />
        <div className="dot-grid" style={{ position: 'absolute', inset: 0, opacity: 0.35 }} />

        <div className="section-container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="badge" style={{ marginBottom: '1.5rem', display: 'inline-flex' }}>
              <Heart size={13} fill="currentColor" /> About Us
            </span>
            <h1 className="heading-display" style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', color: 'var(--text-primary)', marginBottom: '1.5rem', maxWidth: '800px', margin: '0 auto 1.25rem' }}>
              Discover and preview{' '}
              <span className="gradient-text">beautiful fonts</span>
              {' '}instantly.
            </h1>
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: 'var(--text-secondary)',
              maxWidth: '580px', margin: '0 auto 3rem',
              lineHeight: 1.7,
            }}>
              Font Style Changer is a free, open-source typography tool that lets you discover, preview, and save hundreds of beautiful fonts — all in one place.
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/home" style={{ textDecoration: 'none' }}>
                <button id="about-explore-btn" className="btn-primary" style={{ fontSize: '1rem', padding: '0.875rem 2rem' }}>
                  Start Exploring <span>→</span>
                </button>
              </Link>
              <Link to="/fonts" style={{ textDecoration: 'none' }}>
                <button id="about-browse-btn" className="btn-secondary" style={{ fontSize: '1rem', padding: '0.875rem 2rem' }}>
                  Browse All Fonts
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────── */}
      <section className="section-container section-padding" style={{ paddingTop: '1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem' }}>
          {STATS.map((stat, i) => <StatCard key={stat.label} stat={stat} index={i} />)}
        </div>
      </section>

      {/* ── OUR MISSION ───────────────────────────────────── */}
      <section className="section-padding" style={{ background: 'linear-gradient(135deg, rgba(124,77,255,0.04), rgba(168,85,247,0.03))', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="section-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            {/* Left */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <span className="badge" style={{ marginBottom: '1.25rem', display: 'inline-flex' }}>
                <Sparkles size={12} /> Our Mission
              </span>
              <h2 className="heading-h1" style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
                Making great typography{' '}
                <span className="gradient-text">accessible to all</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                We believe that beautiful typography shouldn't be locked behind expensive tools or require design expertise. Font Style Changer was built to democratize typography — giving every developer, designer, student, and creative the power to find the perfect font in seconds.
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.75 }}>
                Whether you're building a startup, writing a blog, or designing a presentation, great fonts make everything look better.
              </p>
            </motion.div>

            {/* Right — Why Choose Us */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '24px', padding: '2rem' }}>
                <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
                  Why Choose Us?
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                  {WHY_POINTS.map((point, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                      <div style={{
                        width: '24px', height: '24px', borderRadius: '50%',
                        background: 'rgba(124,77,255,0.1)', border: '1px solid rgba(124,77,255,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <Check size={13} color="#7C4DFF" />
                      </div>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────── */}
      <section className="section-container section-padding">
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="badge" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
              <Zap size={12} /> Features
            </span>
            <h2 className="heading-h1" style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', color: 'var(--text-primary)', marginBottom: '0.875rem' }}>
              Everything you need for{' '}
              <span className="gradient-text">great typography</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto', lineHeight: 1.65 }}>
              Powerful features designed to make font discovery and preview as smooth as possible.
            </p>
          </motion.div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {FEATURES.map((f, i) => <FeatureCard key={f.title} feature={f} index={i} />)}
        </div>
      </section>

      {/* ── TEAM ──────────────────────────────────────────── */}
      <section className="section-padding" style={{ background: 'linear-gradient(135deg, rgba(124,77,255,0.04), rgba(168,85,247,0.03))', borderTop: '1px solid var(--border)' }}>
        <div className="section-container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <span className="badge" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
                <Heart size={12} fill="currentColor" /> The Team
              </span>
              <h2 className="heading-h1" style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', color: 'var(--text-primary)' }}>
                Built with <span className="gradient-text">passion</span>
              </h2>
            </motion.div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
            {TEAM.map((member, i) => <TeamCard key={member.name} member={member} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────── */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '2.5rem 0' }}>
        <div className="section-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px', height: '32px',
              background: 'linear-gradient(135deg, #7C4DFF, #A855F7)',
              borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ color: 'white', fontWeight: 800, fontSize: '0.9rem', fontFamily: 'Plus Jakarta Sans' }}>F</span>
            </div>
            <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Font Style Changer
            </span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.825rem' }}>
            © 2026 Font Style Changer. Made with ❤️ for typography lovers.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {['/home', '/fonts', '/favorites', '/about'].map((path, i) => (
              <Link key={path} to={path} style={{ color: 'var(--text-muted)', fontSize: '0.825rem', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
              >
                {['Home', 'Fonts', 'Favorites', 'About'][i]}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
