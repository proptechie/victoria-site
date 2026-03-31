import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'motion/react'
import { ArrowUpRight, Mail, MapPin, Shield, Rocket, Target, Users, ChevronDown, Sun, Moon } from 'lucide-react'

// Simple LinkedIn SVG icon since lucide doesn't export it
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

// ---- BlurText Component ----
function BlurText({ text, className, delay = 100 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const words = text.split(' ')

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className || ''}`}>
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

// ---- Stat Counter ----
function AnimatedStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const duration = 1500
    const startTime = Date.now()
    const tick = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      start = Math.floor(eased * value)
      setCount(start)
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [isInView, value])

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-heading italic text-gradient-pink">
        {count}{suffix}
      </div>
      <div className="text-sm text-current/60 font-body mt-2 font-light opacity-60">{label}</div>
    </div>
  )
}

// ---- Experience Card ----
function ExperienceCard({ role, company, location, period, bullets, accent = false }: {
  role: string; company: string; location: string; period: string; bullets: string[]; accent?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={`p-6 md:p-8 rounded-2xl border transition-colors ${accent ? 'border-pink-accent/30 pink-glow' : 'border-current/5'} bg-current/[0.02] backdrop-blur-sm`}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
        <div>
          <h3 className="text-xl font-body font-semibold">{role}</h3>
          <p className="text-pink-soft font-body font-medium">{company}</p>
        </div>
        <div className="opacity-50 text-sm font-body mt-1 md:mt-0 md:text-right">
          <div>{period}</div>
          <div className="flex items-center gap-1 md:justify-end"><MapPin className="h-3 w-3" />{location}</div>
        </div>
      </div>
      <ul className="space-y-2">
        {bullets.map((b, i) => (
          <li key={i} className="opacity-70 text-sm font-body font-light leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-pink-accent/50">
            {b}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

// ---- Theme Toggle Hook ----
function useTheme() {
  const [mode, setMode] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'dark' | 'light') || 'dark'
    }
    return 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode)
    localStorage.setItem('theme', mode)
  }, [mode])

  return { mode, toggle: () => setMode(m => m === 'dark' ? 'light' : 'dark') }
}

// ---- Main App ----
export default function App() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const { mode, toggle } = useTheme()
  const isDark = mode === 'dark'

  return (
    <div className={`min-h-screen overflow-x-hidden transition-colors duration-500 ${isDark ? 'bg-[#0a0a0a] text-white' : 'bg-[#faf7f5] text-[#1a1a1a]'}`}>

      {/* ===== NAVBAR ===== */}
      <nav className="fixed top-4 left-0 right-0 z-50 px-6 lg:px-16">
        <div className="flex items-center justify-between">
          <a href="#" className={`font-heading italic text-2xl ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>VE</a>
          <div className={`hidden md:flex rounded-full px-2 py-1.5 items-center gap-1 ${isDark ? 'liquid-glass' : 'bg-white/70 backdrop-blur-md shadow-lg shadow-black/5 border border-black/5'}`}>
            {['About', 'Experience', 'Impact', 'Education'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className={`px-3 py-2 text-sm font-medium font-body transition-colors ${isDark ? 'text-white/90 hover:text-white' : 'text-[#1a1a1a]/70 hover:text-[#1a1a1a]'}`}>
                {item}
              </a>
            ))}
            <button onClick={toggle} className={`p-2 rounded-full transition-colors ${isDark ? 'text-white/70 hover:text-white' : 'text-[#1a1a1a]/70 hover:text-[#1a1a1a]'}`}>
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <a href="mailto:victoriapelfend@gmail.com" className="bg-pink-accent text-white rounded-full px-3.5 py-1.5 text-sm font-medium font-body flex items-center gap-1 hover:bg-pink-soft transition-colors">
              Get in Touch <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <div className="flex items-center gap-2 md:hidden">
            <button onClick={toggle} className={`p-2 rounded-full ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <a href="mailto:victoriapelfend@gmail.com" className="bg-pink-accent text-white rounded-full px-3 py-1.5 text-sm font-medium font-body">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section ref={heroRef} className="relative h-screen flex flex-col overflow-hidden">
        {/* Video Background */}
        <motion.div style={{ scale: heroScale }} className="absolute inset-0 z-0">
          <video
            autoPlay loop muted playsInline preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260306_115329_5e00c9c5-4d69-49b7-94c3-9c31c60bb644.mp4"
          />
          {/* Gradient overlay */}
          <div className={`absolute inset-0 transition-colors duration-500 ${isDark ? 'bg-gradient-to-b from-black/60 via-black/30 to-[#0a0a0a]' : 'bg-gradient-to-b from-white/40 via-white/20 to-[#faf7f5]'}`} />
          <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-r from-pink-accent/5 via-transparent to-pink-accent/5' : 'bg-gradient-to-r from-pink-accent/10 via-transparent to-pink-accent/10'}`} />
        </motion.div>

        {/* Hero Content */}
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 pt-24">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="liquid-glass rounded-full px-1 py-1 flex items-center gap-2 mb-4"
          >
            <span className="bg-pink-accent text-white rounded-full px-3 py-1 text-xs font-semibold font-body">Defense</span>
            <span className="text-sm text-white/90 pr-3 font-body">Strategy & Innovation at the Edge of National Security</span>
          </motion.div>

          {/* Heading */}
          <h1 className={`text-5xl md:text-7xl lg:text-[5.5rem] font-heading italic leading-[0.85] max-w-3xl tracking-[-3px] mb-4 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
            <BlurText text="Victoria Elfend" delay={120} />
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className={`mt-1 text-base md:text-lg max-w-2xl font-body font-light leading-relaxed ${isDark ? 'text-white/80' : 'text-[#1a1a1a]/70'}`}
          >
            Bridging the gap between venture-backed startups and defense primes.
            Turning capability gaps into fielded technology.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-6"
          >
            <a href="mailto:victoriapelfend@gmail.com" className="liquid-glass-strong rounded-full px-6 py-3 text-sm font-medium text-white font-body flex items-center gap-2 hover:bg-pink-accent/20 transition-all">
              Connect with Victoria <ArrowUpRight className="h-5 w-5" />
            </a>
            <a href="#experience" className="text-sm font-medium text-white/80 font-body flex items-center gap-2 hover:text-white transition-colors">
              View Experience <ChevronDown className="h-4 w-4" />
            </a>
          </motion.div>
        </motion.div>

        {/* Bottom Ticker */}
        <div className="relative z-10 flex flex-col items-center gap-4 pb-8">
          <div className={`rounded-full px-3.5 py-1 text-xs font-medium font-body ${isDark ? 'liquid-glass text-white' : 'bg-white/80 backdrop-blur-md text-[#1a1a1a] shadow-sm'}`}>
            Operating at the intersection of defense, technology, and venture capital
          </div>
          <div className="flex items-center gap-6 md:gap-14 overflow-x-auto max-w-full px-4 no-scrollbar">
            {['Northrop Grumman', 'Starburst', 'Pardee RAND', 'UC Berkeley', 'Cosmic Shielding'].map(name => (
              <span key={name} className={`text-base md:text-2xl font-heading italic tracking-tight whitespace-nowrap flex-shrink-0 ${isDark ? 'text-white/70' : 'text-[#1a1a1a]/50'}`}>
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="about" className="py-24 px-6 lg:px-16 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-pink-accent text-sm font-body font-semibold tracking-widest uppercase mb-3">About</p>
            <h2 className={`text-4xl md:text-5xl font-heading italic leading-[0.9] mb-6 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
              Where startups meet the mission
            </h2>
            <p className={`font-body font-light leading-relaxed mb-4 ${isDark ? 'text-white/70' : 'text-[#1a1a1a]/65'}`}>
              My path to defense was not traditional. It was built on frustration, curiosity, and an urgent question: why can the most powerful military in the world not field the technology that future warfare demands?
            </p>
            <p className={`font-body font-light leading-relaxed mb-4 ${isDark ? 'text-white/70' : 'text-[#1a1a1a]/65'}`}>
              After UC Berkeley, I entered the defense-startup ecosystem and immediately hit a system structurally designed to reject the very innovation it claimed to want. I became obsessed with why.
            </p>
            <p className={`font-body font-light leading-relaxed ${isDark ? 'text-white/70' : 'text-[#1a1a1a]/65'}`}>
              Now I operate at the seam between venture-backed deep tech and prime contractor systems -- identifying capability gaps, structuring pilot engagements, and accelerating adoption cycles.
            </p>
            <div className="flex items-center gap-4 mt-8">
              <a href="mailto:victoriapelfend@gmail.com" className={`flex items-center gap-2 text-sm hover:text-pink-accent transition-colors font-body ${isDark ? 'text-white/60' : 'text-[#1a1a1a]/50'}`}>
                <Mail className="h-4 w-4" /> victoriapelfend@gmail.com
              </a>
              <a href="https://linkedin.com/in/victoria-elfend" target="_blank" className={`flex items-center gap-2 text-sm hover:text-pink-accent transition-colors font-body ${isDark ? 'text-white/60' : 'text-[#1a1a1a]/50'}`}>
                <LinkedinIcon className="h-4 w-4" /> LinkedIn
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { icon: Shield, label: 'Defense Strategy', desc: 'Startup-prime integration' },
              { icon: Rocket, label: 'Deep Tech', desc: '500+ startups evaluated' },
              { icon: Target, label: 'Pilot Execution', desc: '52% adoption rate' },
              { icon: Users, label: 'Network Building', desc: '150+ D.C. connections' },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className={`rounded-2xl p-5 flex flex-col items-center text-center ${isDark ? 'liquid-glass' : 'bg-white shadow-lg shadow-pink-accent/5 border border-pink-accent/10'}`}>
                <Icon className="h-8 w-8 text-pink-accent mb-3" />
                <h4 className={`font-body font-semibold text-sm ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>{label}</h4>
                <p className={`font-body font-light text-xs mt-1 ${isDark ? 'text-white/50' : 'text-[#1a1a1a]/50'}`}>{desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== IMPACT STATS ===== */}
      <section id="impact" className={`py-20 px-6 lg:px-16 border-y ${isDark ? 'border-white/5' : 'border-[#1a1a1a]/5'}`}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <AnimatedStat value={500} suffix="+" label="Startups Evaluated" />
          <AnimatedStat value={8} suffix="M+" label="Capital Raised (Advisory)" />
          <AnimatedStat value={52} suffix="%" label="Post-Program Adoption" />
          <AnimatedStat value={14} suffix="" label="Companies Selected" />
        </div>
      </section>

      {/* ===== EXPERIENCE ===== */}
      <section id="experience" className="py-24 px-6 lg:px-16 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-pink-accent text-sm font-body font-semibold tracking-widest uppercase mb-3">Experience</p>
          <h2 className={`text-4xl md:text-5xl font-heading italic leading-[0.9] ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
            Building from the inside out
          </h2>
        </motion.div>

        <div className="space-y-6">
          <ExperienceCard
            accent
            role="Principal Strategic Planner"
            company="Northrop Grumman"
            location="Falls Church, VA"
            period="Oct 2025 - Present"
            bullets={[
              'Execute startup engagement strategy to accelerate technology fielding through structured partnerships, reducing adoption cycle time across the enterprise.',
              'Source and evaluate 100+ startups aligned to sector capture priorities; advanced 8 companies into technical reviews, resulting in 5 active pilot engagements.',
              'Identify capability gaps across sectors and assess corporate positioning (make, buy, or partner) to prioritize technology investment for senior leadership.',
              'Synthesize defense ecosystem research into executive briefing memos and decision frameworks that drive enterprise-level technology strategy.',
            ]}
          />
          <ExperienceCard
            role="Program Manager"
            company="Starburst"
            location="Washington D.C."
            period="Jan 2024 - Sep 2025"
            bullets={[
              'Built and led a dual-use accelerator for a U.S. defense prime, deploying $2M annually to scale defense-grade technologies and structure integration pathways.',
              'Evaluated 500+ deep tech startups; led technical and portfolio down-selection, selecting 14 companies across 3 cohorts with a 52% post-program technical adoption rate.',
              'Advised portfolio CEOs on pilot scoping, government engagement, and capital strategy, contributing to $8M+ in capital raised and 10+ executed LOIs/MOUs.',
              'Built a 150+ person D.C. network linking startups with VCs, defense primes, and senior DoD officials.',
            ]}
          />
          <ExperienceCard
            role="Consulting Analyst"
            company="Starburst"
            location="Washington D.C."
            period="Mar 2023 - Jan 2024"
            bullets={[
              'Profiled 500+ early-stage startups across aerospace and defense; built financial analyses, market landscapes, and macro trend assessments.',
              'Advised an international infrastructure conglomerate on commercial space station investment and policy strategy.',
              'Identified structural barriers to startup adoption within a prime contractor and proposed accelerator-based models that informed subsequent program design.',
            ]}
          />
          <ExperienceCard
            role="Market & Product Intern"
            company="Cosmic Shielding Corporation"
            location="Berkeley, CA"
            period="Jul 2021 - Jul 2022"
            bullets={[
              'Conducted technical and market analysis on small satellites, radiation-hardened components, and 3D aerospace manufacturing.',
              'Led stakeholder interviews with space startup executives and secured a $5K sponsorship for the UC Berkeley Space Technology Symposium.',
            ]}
          />
        </div>
      </section>

      {/* ===== EDUCATION ===== */}
      <section id="education" className="py-24 px-6 lg:px-16 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-pink-accent text-sm font-body font-semibold tracking-widest uppercase mb-3">Education</p>
          <h2 className={`text-4xl md:text-5xl font-heading italic leading-[0.9] ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
            Foundation in policy & analysis
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`rounded-2xl p-8 ${isDark ? 'liquid-glass' : 'bg-white shadow-lg shadow-pink-accent/5 border border-pink-accent/10'}`}
          >
            <div className="text-pink-accent text-sm font-body font-semibold mb-1">May 2026</div>
            <h3 className={`text-2xl font-heading italic ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>Pardee RAND Graduate School</h3>
            <p className="opacity-60 font-body mt-1">M.A., National Security Policy</p>
            <p className="opacity-50 font-body font-light text-sm mt-3">Arlington, VA</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className={`rounded-2xl p-8 ${isDark ? 'liquid-glass' : 'bg-white shadow-lg shadow-pink-accent/5 border border-pink-accent/10'}`}
          >
            <div className="text-pink-accent text-sm font-body font-semibold mb-1">May 2023</div>
            <h3 className={`text-2xl font-heading italic ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>University of California, Berkeley</h3>
            <p className="opacity-60 font-body mt-1">B.A., Political Science</p>
            <p className="opacity-50 font-body font-light text-sm mt-3">
              Co-founded NewSpace at Berkeley -- UC Berkeley's first student-run space nonprofit. Raised $25K+ in funding, built 15+ industry partnerships (Planet, Redwire, NASA, USRA).
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== CTA / FOOTER ===== */}
      <section className={`py-24 px-6 lg:px-16 border-t ${isDark ? 'border-white/5' : 'border-[#1a1a1a]/5'}`}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={`text-4xl md:text-6xl font-heading italic leading-[0.85] mb-6 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
              Let's build what defense needs next
            </h2>
            <p className="opacity-60 font-body font-light mb-8 max-w-xl mx-auto">
              I think in data models, build frameworks quickly, and execute at the pace the problem demands. Ready to move on day one.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="mailto:victoriapelfend@gmail.com" className={`rounded-full px-8 py-3.5 text-sm font-medium font-body flex items-center gap-2 transition-all ${isDark ? 'liquid-glass-strong text-white hover:bg-pink-accent/20' : 'bg-pink-accent text-white hover:bg-pink-soft shadow-lg shadow-pink-accent/20'}`}>
                <Mail className="h-4 w-4" /> victoriapelfend@gmail.com
              </a>
              <a href="https://linkedin.com/in/victoria-elfend" target="_blank" className={`rounded-full px-6 py-3.5 text-sm font-medium font-body flex items-center gap-2 transition-all ${isDark ? 'liquid-glass text-white hover:bg-white/5' : 'bg-white border border-[#1a1a1a]/10 text-[#1a1a1a] hover:border-pink-accent/30 shadow-sm'}`}>
                <LinkedinIcon className="h-4 w-4" /> LinkedIn
              </a>
            </div>
          </motion.div>
        </div>

        <div className={`mt-16 pt-8 border-t flex flex-col md:flex-row items-center justify-between text-xs font-body ${isDark ? 'border-white/5 text-white/30' : 'border-[#1a1a1a]/5 text-[#1a1a1a]/30'}`}>
          <span className={`font-heading italic text-lg ${isDark ? 'text-white/40' : 'text-[#1a1a1a]/40'}`}>Victoria Elfend</span>
          <span>Washington D.C. | Newport Coast, CA</span>
        </div>
      </section>
    </div>
  )
}
