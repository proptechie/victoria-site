import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react'
import { ArrowUpRight, Mail, MapPin, Shield, Rocket, Target, Users, ChevronDown, Sun, Moon } from 'lucide-react'

// ---- LinkedIn Icon ----
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

// ---- Smoke Particle ----
type SmokeParticle = { id: number; x: number; y: number; born: number }

function SmokeTrail() {
  const [particles, setParticles] = useState<SmokeParticle[]>([])
  const lastPos = useRef({ x: 0, y: 0 })
  const idRef = useRef(0)

  useEffect(() => {
    let distAccum = 0
    const move = (e: MouseEvent) => {
      const dx = e.clientX - lastPos.current.x
      const dy = e.clientY - lastPos.current.y
      distAccum += Math.sqrt(dx * dx + dy * dy)
      lastPos.current = { x: e.clientX, y: e.clientY }

      // Spawn a particle every ~12px of movement
      if (distAccum > 12) {
        distAccum = 0
        const p: SmokeParticle = { id: idRef.current++, x: e.clientX, y: e.clientY, born: Date.now() }
        setParticles(prev => [...prev, p])
      }
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  // Cleanup old particles every 200ms
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev.filter(p => Date.now() - p.born < 2000))
    }, 200)
    return () => clearInterval(interval)
  }, [])

  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998]">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          initial={{ x: p.x - 6, y: p.y - 6, scale: 0.3, opacity: 0.4 }}
          animate={{ scale: 2.5, opacity: 0, y: p.y - 6 + 20 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          style={{
            width: 12,
            height: 12,
            background: 'radial-gradient(circle, rgba(180,180,190,0.5) 0%, rgba(140,140,150,0.15) 50%, transparent 70%)',
            filter: 'blur(3px)',
          }}
        />
      ))}
    </div>
  )
}

// ---- B2 Bomber Cursor ----
function B2Cursor() {
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const springX = useSpring(mouseX, { damping: 25, stiffness: 200 })
  const springY = useSpring(mouseY, { damping: 25, stiffness: 200 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setVisible(true)
    }
    const leave = () => setVisible(false)
    window.addEventListener('mousemove', move)
    document.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', leave)
    }
  }, [mouseX, mouseY])

  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return null

  return (
    <>
      <SmokeTrail />
      <motion.img
        src="/b2-medium.png"
        alt=""
        className="fixed pointer-events-none z-[9999]"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 0.85 : 0,
          width: 56,
          height: 56,
        }}
      />
    </>
  )
}

// ---- BlurText ----
function BlurText({ text, className, delay = 100 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const words = text.split(' ')
  return (
    <span ref={ref} className={`inline-flex flex-wrap justify-center ${className || ''}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          initial={{ filter: 'blur(10px)', opacity: 0, y: 40 }}
          animate={isInView ? { filter: 'blur(0px)', opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 + i * (delay / 1000) }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

// ---- AnimatedStat ----
function AnimatedStat({ value, suffix, label, isDark }: { value: number; suffix: string; label: string; isDark: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const duration = 1500
    const startTime = Date.now()
    const tick = () => {
      const progress = Math.min((Date.now() - startTime) / duration, 1)
      setCount(Math.floor((1 - Math.pow(1 - progress, 3)) * value))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [isInView, value])

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-heading italic text-gradient-pink leading-none">
        {count}{suffix}
      </div>
      <div className={`text-sm font-body mt-3 font-light ${isDark ? 'text-white/50' : 'text-[#1a1a1a]/50'}`}>{label}</div>
    </div>
  )
}

// ---- ExperienceCard ----
function ExperienceCard({ role, company, location, period, bullets, accent = false, isDark }: {
  role: string; company: string; location: string; period: string; bullets: string[]; accent?: boolean; isDark: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={`p-6 md:p-8 rounded-2xl border transition-colors ${
        accent
          ? 'border-pink-accent/30 pink-glow'
          : isDark ? 'border-white/5' : 'border-[#1a1a1a]/5'
      } ${isDark ? 'bg-white/[0.02]' : 'bg-white shadow-sm'}`}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-5 gap-1">
        <div>
          <h3 className={`text-lg md:text-xl font-body font-semibold ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>{role}</h3>
          <p className="text-pink-soft font-body font-medium text-sm md:text-base">{company}</p>
        </div>
        <div className={`text-xs md:text-sm font-body md:text-right ${isDark ? 'text-white/40' : 'text-[#1a1a1a]/40'}`}>
          <div>{period}</div>
          <div className="flex items-center gap-1 md:justify-end"><MapPin className="h-3 w-3" />{location}</div>
        </div>
      </div>
      <ul className="space-y-3">
        {bullets.map((b, i) => (
          <li key={i} className={`text-sm font-body font-light leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-pink-accent/40 ${isDark ? 'text-white/60' : 'text-[#1a1a1a]/60'}`}>
            {b}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

// ---- School Icons ----
function RandIcon({ className, isDark }: { className?: string; isDark: boolean }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <rect x="4" y="4" width="40" height="40" rx="8" fill={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'} stroke={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'} strokeWidth="1"/>
      <text x="24" y="29" textAnchor="middle" fontFamily="'Barlow', sans-serif" fontWeight="700" fontSize="13" fill={isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)'}>RAND</text>
    </svg>
  )
}

function BerkeleyIcon({ className, isDark }: { className?: string; isDark: boolean }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <rect x="4" y="4" width="40" height="40" rx="8" fill={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'} stroke={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'} strokeWidth="1"/>
      {/* Campanile tower silhouette */}
      <rect x="22" y="10" width="4" height="24" rx="1" fill={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.35)'}/>
      <rect x="19" y="10" width="10" height="4" rx="1" fill={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.35)'}/>
      <rect x="17" y="34" width="14" height="3" rx="1" fill={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.35)'}/>
      <text x="24" y="44" textAnchor="middle" fontFamily="'Barlow', sans-serif" fontWeight="600" fontSize="6" fill={isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)'}>CAL</text>
    </svg>
  )
}

// ---- Theme Hook ----
function useTheme() {
  const [mode, setMode] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') return (localStorage.getItem('theme') as 'dark' | 'light') || 'dark'
    return 'dark'
  })
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode)
    localStorage.setItem('theme', mode)
  }, [mode])
  return { mode, toggle: () => setMode(m => m === 'dark' ? 'light' : 'dark') }
}

// ---- Password Gate ----
function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [pw, setPw] = useState('')
  const [error, setError] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { inputRef.current?.focus() }, [])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (pw.toLowerCase() === 'victoria') {
      sessionStorage.setItem('ve-auth', '1')
      onUnlock()
    } else {
      setError(true)
      setPw('')
      setTimeout(() => setError(false), 1500)
    }
  }

  return (
    <div className="fixed inset-0 z-[99999] bg-[#0a0a0a] flex items-center justify-center px-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-sm w-full"
      >
        <h1 className="font-heading italic text-5xl md:text-6xl text-white mb-3">VE</h1>
        <p className="text-white/40 font-body font-light text-sm mb-8">Enter password to continue</p>
        <form onSubmit={submit} className="flex flex-col items-center gap-4">
          <motion.input
            ref={inputRef}
            type="password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            placeholder="Password"
            animate={error ? { x: [0, -10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
            className={`w-full max-w-xs bg-white/[0.04] border rounded-full px-5 py-3 text-sm font-body text-white text-center placeholder-white/30 outline-none focus:border-pink-accent/50 transition-colors ${error ? 'border-red-500/50' : 'border-white/10'}`}
          />
          <button type="submit" className="liquid-glass-strong rounded-full px-8 py-2.5 text-sm font-medium text-white font-body flex items-center gap-2 hover:bg-pink-accent/20 transition-all">
            Enter <ArrowUpRight className="h-4 w-4" />
          </button>
        </form>
        {error && <p className="text-red-400/70 text-xs font-body mt-4">Incorrect password</p>}
      </motion.div>
    </div>
  )
}

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('ve-auth') === '1')
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const { mode, toggle } = useTheme()
  const d = mode === 'dark' // shorthand

  if (!authed) return <PasswordGate onUnlock={() => setAuthed(true)} />

  return (
    <div className={`min-h-screen overflow-x-hidden transition-colors duration-500 cursor-none ${d ? 'bg-[#0a0a0a] text-white' : 'bg-[#faf7f5] text-[#1a1a1a]'}`}>

      <B2Cursor />

      {/* ===== NAVBAR ===== */}
      <nav className="fixed top-4 left-0 right-0 z-50 px-5 md:px-12">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <a href="#" className={`font-heading italic text-2xl cursor-none ${d ? 'text-white' : 'text-[#1a1a1a]'}`}>VE</a>

          <div className={`hidden md:flex rounded-full px-2 py-1.5 items-center gap-1 ${d ? 'liquid-glass' : 'bg-white/80 backdrop-blur-md shadow-lg shadow-black/5 border border-black/[0.04]'}`}>
            {['About', 'Experience', 'Impact', 'Education'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className={`px-3 py-1.5 text-sm font-medium font-body transition-colors cursor-none ${d ? 'text-white/80 hover:text-white' : 'text-[#1a1a1a]/60 hover:text-[#1a1a1a]'}`}>
                {item}
              </a>
            ))}
            <button onClick={toggle} className={`p-2 rounded-full transition-colors cursor-none ${d ? 'text-white/60 hover:text-white' : 'text-[#1a1a1a]/50 hover:text-[#1a1a1a]'}`}>
              {d ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <a href="mailto:victoriapelfend@gmail.com" className="bg-pink-accent text-white rounded-full px-4 py-1.5 text-sm font-medium font-body flex items-center gap-1.5 hover:bg-pink-soft transition-colors cursor-none">
              Get in Touch <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button onClick={toggle} className={`p-2 cursor-none ${d ? 'text-white' : 'text-[#1a1a1a]'}`}>
              {d ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <a href="mailto:victoriapelfend@gmail.com" className="bg-pink-accent text-white rounded-full px-3 py-1.5 text-xs font-medium font-body cursor-none">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section ref={heroRef} className="relative h-[100svh] flex flex-col overflow-hidden">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260306_115329_5e00c9c5-4d69-49b7-94c3-9c31c60bb644.mp4"
          />
          <div className={`absolute inset-0 transition-colors duration-500 ${d ? 'bg-gradient-to-b from-black/60 via-black/30 to-[#0a0a0a]' : 'bg-gradient-to-b from-white/50 via-white/30 to-[#faf7f5]'}`} />
          <div className={`absolute inset-0 ${d ? 'bg-gradient-to-r from-pink-accent/5 via-transparent to-pink-accent/5' : 'bg-gradient-to-r from-pink-accent/8 via-transparent to-pink-accent/8'}`} />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-5 pt-20">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`rounded-full px-1 py-1 flex items-center gap-2 mb-6 ${d ? 'liquid-glass' : 'bg-white/80 backdrop-blur-md shadow-sm border border-black/[0.04]'}`}
          >
            <span className="bg-pink-accent text-white rounded-full px-2.5 py-0.5 text-[11px] font-semibold font-body uppercase tracking-wider">Defense</span>
            <span className={`text-xs md:text-sm pr-3 font-body ${d ? 'text-white/80' : 'text-[#1a1a1a]/70'}`}>Strategy & Innovation at the Edge of National Security</span>
          </motion.div>

          {/* Name */}
          <h1 className={`text-[2.75rem] leading-[1] sm:text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic max-w-3xl tracking-[-2px] md:tracking-[-3px] mb-5 ${d ? 'text-white' : 'text-[#1a1a1a]'}`}>
            <BlurText text="Victoria Elfend" delay={120} />
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className={`text-sm sm:text-base md:text-lg max-w-lg md:max-w-2xl font-body font-light leading-relaxed ${d ? 'text-white/70' : 'text-[#1a1a1a]/60'}`}
          >
            Bridging the gap between venture-backed startups and defense primes. Turning capability gaps into fielded technology.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 mt-8"
          >
            <a href="mailto:victoriapelfend@gmail.com" className={`rounded-full px-5 py-2.5 text-sm font-medium font-body flex items-center gap-2 transition-all cursor-none ${d ? 'liquid-glass-strong text-white hover:bg-pink-accent/20' : 'bg-pink-accent text-white hover:bg-pink-soft shadow-lg shadow-pink-accent/20'}`}>
              Connect with Victoria <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href="#experience" className={`text-sm font-medium font-body flex items-center gap-1.5 transition-colors cursor-none ${d ? 'text-white/60 hover:text-white' : 'text-[#1a1a1a]/50 hover:text-[#1a1a1a]'}`}>
              View Experience <ChevronDown className="h-4 w-4" />
            </a>
          </motion.div>
        </motion.div>

        {/* Bottom tagline */}
        <div className="relative z-10 flex flex-col items-center pb-8">
          <div className={`rounded-full px-3 py-1 text-[10px] md:text-xs font-medium font-body ${d ? 'liquid-glass text-white/80' : 'bg-white/80 backdrop-blur-md text-[#1a1a1a]/60 shadow-sm'}`}>
            Operating at the intersection of defense, technology, and venture capital
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="about" className="py-16 md:py-24 px-5 md:px-12 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-start">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="text-pink-accent text-xs font-body font-semibold tracking-[0.2em] uppercase mb-3">About</p>
            <h2 className={`text-3xl md:text-5xl font-heading italic leading-[0.95] mb-6 ${d ? 'text-white' : 'text-[#1a1a1a]'}`}>
              Where startups meet the mission
            </h2>
            <div className={`space-y-4 text-sm md:text-base font-body font-light leading-relaxed ${d ? 'text-white/60' : 'text-[#1a1a1a]/55'}`}>
              <p>My path to defense was not traditional. It was built on frustration, curiosity, and an urgent question: why can the most powerful military in the world not field the technology that future warfare demands?</p>
              <p>After UC Berkeley, I entered the defense-startup ecosystem and immediately hit a system structurally designed to reject the very innovation it claimed to want. I became obsessed with why.</p>
              <p>Now I operate at the seam between venture-backed deep tech and prime contractor systems -- identifying capability gaps, structuring pilot engagements, and accelerating adoption cycles.</p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5 mt-8">
              <a href="mailto:victoriapelfend@gmail.com" className={`flex items-center gap-2 text-xs md:text-sm hover:text-pink-accent transition-colors font-body cursor-none ${d ? 'text-white/50' : 'text-[#1a1a1a]/40'}`}>
                <Mail className="h-3.5 w-3.5" /> victoriapelfend@gmail.com
              </a>
              <a href="https://linkedin.com/in/victoria-elfend" target="_blank" className={`flex items-center gap-2 text-xs md:text-sm hover:text-pink-accent transition-colors font-body cursor-none ${d ? 'text-white/50' : 'text-[#1a1a1a]/40'}`}>
                <LinkedinIcon className="h-3.5 w-3.5" /> LinkedIn
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="grid grid-cols-2 gap-3 md:gap-4"
          >
            {[
              { icon: Shield, label: 'Defense Strategy', desc: 'Startup-prime integration' },
              { icon: Rocket, label: 'Deep Tech', desc: '500+ startups evaluated' },
              { icon: Target, label: 'Pilot Execution', desc: '52% adoption rate' },
              { icon: Users, label: 'Network Building', desc: '150+ D.C. connections' },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className={`rounded-2xl p-4 md:p-5 flex flex-col items-center text-center cursor-none ${d ? 'liquid-glass' : 'bg-white shadow-md shadow-pink-accent/5 border border-pink-accent/10'}`}>
                <Icon className="h-7 w-7 md:h-8 md:w-8 text-pink-accent mb-2.5" />
                <h4 className={`font-body font-semibold text-xs md:text-sm ${d ? 'text-white' : 'text-[#1a1a1a]'}`}>{label}</h4>
                <p className={`font-body font-light text-[10px] md:text-xs mt-1 ${d ? 'text-white/40' : 'text-[#1a1a1a]/40'}`}>{desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== IMPACT ===== */}
      <section id="impact" className={`py-16 md:py-20 px-5 md:px-12 border-y ${d ? 'border-white/5' : 'border-[#1a1a1a]/5'}`}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <AnimatedStat isDark={d} value={500} suffix="+" label="Startups Evaluated" />
          <AnimatedStat isDark={d} value={8} suffix="M+" label="Capital Raised (Advisory)" />
          <AnimatedStat isDark={d} value={52} suffix="%" label="Post-Program Adoption" />
          <AnimatedStat isDark={d} value={14} suffix="" label="Companies Selected" />
        </div>
      </section>

      {/* ===== EXPERIENCE ===== */}
      <section id="experience" className="py-16 md:py-24 px-5 md:px-12 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 md:mb-16">
          <p className="text-pink-accent text-xs font-body font-semibold tracking-[0.2em] uppercase mb-3">Experience</p>
          <h2 className={`text-3xl md:text-5xl font-heading italic leading-[0.95] ${d ? 'text-white' : 'text-[#1a1a1a]'}`}>Building from the inside out</h2>
        </motion.div>

        <div className="space-y-4 md:space-y-6">
          <ExperienceCard isDark={d} accent role="Principal Strategic Planner" company="Northrop Grumman" location="Falls Church, VA" period="Oct 2025 - Present"
            bullets={[
              'Execute startup engagement strategy to accelerate technology fielding through structured partnerships, reducing adoption cycle time across the enterprise.',
              'Source and evaluate 100+ startups aligned to sector capture priorities; advanced 8 companies into technical reviews, resulting in 5 active pilot engagements.',
              'Identify capability gaps across sectors and assess corporate positioning (make, buy, or partner) to prioritize technology investment for senior leadership.',
              'Synthesize defense ecosystem research into executive briefing memos and decision frameworks that drive enterprise-level technology strategy.',
            ]}
          />
          <ExperienceCard isDark={d} role="Program Manager" company="Starburst" location="Washington D.C." period="Jan 2024 - Sep 2025"
            bullets={[
              'Built and led a dual-use accelerator for a U.S. defense prime, deploying $2M annually to scale defense-grade technologies and structure integration pathways.',
              'Evaluated 500+ deep tech startups; led technical and portfolio down-selection, selecting 14 companies across 3 cohorts with a 52% post-program technical adoption rate.',
              'Advised portfolio CEOs on pilot scoping, government engagement, and capital strategy, contributing to $8M+ in capital raised and 10+ executed LOIs/MOUs.',
              'Built a 150+ person D.C. network linking startups with VCs, defense primes, and senior DoD officials.',
            ]}
          />
          <ExperienceCard isDark={d} role="Consulting Analyst" company="Starburst" location="Washington D.C." period="Mar 2023 - Jan 2024"
            bullets={[
              'Profiled 500+ early-stage startups across aerospace and defense; built financial analyses, market landscapes, and macro trend assessments.',
              'Advised an international infrastructure conglomerate on commercial space station investment and policy strategy.',
              'Identified structural barriers to startup adoption within a prime contractor and proposed accelerator-based models that informed subsequent program design.',
            ]}
          />
          <ExperienceCard isDark={d} role="Market & Product Intern" company="Cosmic Shielding Corporation" location="Berkeley, CA" period="Jul 2021 - Jul 2022"
            bullets={[
              'Conducted technical and market analysis on small satellites, radiation-hardened components, and 3D aerospace manufacturing.',
              'Led stakeholder interviews with space startup executives and secured a $5K sponsorship for the UC Berkeley Space Technology Symposium.',
            ]}
          />
        </div>
      </section>

      {/* ===== EDUCATION ===== */}
      <section id="education" className="py-16 md:py-24 px-5 md:px-12 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 md:mb-16">
          <p className="text-pink-accent text-xs font-body font-semibold tracking-[0.2em] uppercase mb-3">Education</p>
          <h2 className={`text-3xl md:text-5xl font-heading italic leading-[0.95] ${d ? 'text-white' : 'text-[#1a1a1a]'}`}>Foundation in policy & analysis</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className={`rounded-2xl p-6 md:p-8 ${d ? 'liquid-glass' : 'bg-white shadow-md shadow-pink-accent/5 border border-pink-accent/10'}`}
          >
            <div className="flex items-start gap-4">
              <RandIcon className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0" isDark={d} />
              <div>
                <div className="text-pink-accent text-xs font-body font-semibold mb-1.5">May 2026</div>
                <h3 className={`text-xl md:text-2xl font-heading italic ${d ? 'text-white' : 'text-[#1a1a1a]'}`}>Pardee RAND Graduate School</h3>
                <p className={`font-body mt-1 text-sm ${d ? 'text-white/60' : 'text-[#1a1a1a]/55'}`}>M.A., National Security Policy</p>
                <p className={`font-body font-light text-xs mt-3 ${d ? 'text-white/40' : 'text-[#1a1a1a]/40'}`}>Arlington, VA</p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
            className={`rounded-2xl p-6 md:p-8 ${d ? 'liquid-glass' : 'bg-white shadow-md shadow-pink-accent/5 border border-pink-accent/10'}`}
          >
            <div className="flex items-start gap-4">
              <BerkeleyIcon className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0" isDark={d} />
              <div>
                <div className="text-pink-accent text-xs font-body font-semibold mb-1.5">May 2023</div>
                <h3 className={`text-xl md:text-2xl font-heading italic ${d ? 'text-white' : 'text-[#1a1a1a]'}`}>University of California, Berkeley</h3>
                <p className={`font-body mt-1 text-sm ${d ? 'text-white/60' : 'text-[#1a1a1a]/55'}`}>B.A., Political Science</p>
                <p className={`font-body font-light text-xs md:text-sm mt-3 leading-relaxed ${d ? 'text-white/40' : 'text-[#1a1a1a]/40'}`}>
                  Co-founded NewSpace at Berkeley -- UC Berkeley's first student-run space nonprofit. Raised $25K+ in funding, built 15+ industry partnerships (Planet, Redwire, NASA, USRA).
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== CTA / FOOTER ===== */}
      <section className={`py-16 md:py-24 px-5 md:px-12 border-t ${d ? 'border-white/5' : 'border-[#1a1a1a]/5'}`}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className={`text-3xl sm:text-4xl md:text-6xl font-heading italic leading-[0.9] mb-5 md:mb-6 ${d ? 'text-white' : 'text-[#1a1a1a]'}`}>
              Let's build what defense needs next
            </h2>
            <p className={`font-body font-light mb-8 max-w-xl mx-auto text-sm md:text-base ${d ? 'text-white/50' : 'text-[#1a1a1a]/45'}`}>
              I think in data models, build frameworks quickly, and execute at the pace the problem demands. Ready to move on day one.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="mailto:victoriapelfend@gmail.com" className={`rounded-full px-6 py-3 text-sm font-medium font-body flex items-center gap-2 transition-all cursor-none ${d ? 'liquid-glass-strong text-white hover:bg-pink-accent/20' : 'bg-pink-accent text-white hover:bg-pink-soft shadow-lg shadow-pink-accent/20'}`}>
                <Mail className="h-4 w-4" /> victoriapelfend@gmail.com
              </a>
              <a href="https://linkedin.com/in/victoria-elfend" target="_blank" className={`rounded-full px-5 py-3 text-sm font-medium font-body flex items-center gap-2 transition-all cursor-none ${d ? 'liquid-glass text-white hover:bg-white/5' : 'bg-white border border-[#1a1a1a]/10 text-[#1a1a1a] hover:border-pink-accent/30 shadow-sm'}`}>
                <LinkedinIcon className="h-4 w-4" /> LinkedIn
              </a>
            </div>
          </motion.div>
        </div>

        <div className={`mt-12 md:mt-16 pt-6 md:pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-2 text-xs font-body ${d ? 'border-white/5 text-white/25' : 'border-[#1a1a1a]/5 text-[#1a1a1a]/25'}`}>
          <span className={`font-heading italic text-base ${d ? 'text-white/30' : 'text-[#1a1a1a]/30'}`}>Victoria Elfend</span>
          <span>Washington D.C. | Newport Coast, CA</span>
        </div>
      </section>
    </div>
  )
}
