import { motion } from 'motion/react'
import { Link, useParams } from 'react-router'
import { ArrowLeft, Clock, Tag } from 'lucide-react'
import { posts } from './blogData'

// Detect if a paragraph is a section heading
function isHeading(text: string): boolean {
  const trimmed = text.replace(/[:\s]+$/, '').trim()
  // All caps short lines, or known heading patterns
  if (trimmed.length < 80 && trimmed === trimmed.toUpperCase() && /[A-Z]{3,}/.test(trimmed)) return true
  // Lines that are just a short title with colon
  if (trimmed.length < 60 && trimmed.endsWith(':')) return true
  // Known section markers
  const markers = ['Research Question', 'Hypotheses', 'Method and Justification', 'Plan for Data Collection',
    'Interview Questions', 'Plan for Data Analysis', 'Reform-on-Reform', 'Department of Defense Culture',
    'What the Literature Cannot Tell Us', 'The Structural Conditions Producing the Valley of Death']
  if (markers.some(m => trimmed.startsWith(m))) return true
  return false
}

// Detect if a paragraph is an interview question (starts with common patterns)
function isQuestion(text: string): boolean {
  return /^(Walk me through|How do|How does|How would|How have|What criteria|Since the|When a|Looking at|Can you|What does)/.test(text)
}

// Detect group labels
function isGroupLabel(text: string): boolean {
  return text.startsWith('Group 1:') || text.startsWith('Group 2:')
}

export default function BlogPost({ isDark }: { isDark: boolean }) {
  const { slug } = useParams()
  const post = posts.find(p => p.slug === slug)

  if (!post) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-5 md:px-12 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className={`text-4xl font-heading italic mb-4 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>Post not found</h1>
          <Link to="/writing" className="text-pink-accent font-body text-sm hover:underline cursor-none">Back to all posts</Link>
        </div>
      </div>
    )
  }

  // Calculate actual read time based on word count
  const wordCount = post.body.join(' ').split(/\s+/).length
  const readTime = `${Math.max(1, Math.round(wordCount / 250))} min read`

  return (
    <div className="min-h-screen pt-24 pb-16 px-5 md:px-12">
      <article className="max-w-3xl mx-auto">
        <Link to="/writing" className={`inline-flex items-center gap-1.5 text-sm font-body mb-10 hover:text-pink-accent transition-colors cursor-none no-underline ${isDark ? 'text-white/50' : 'text-[#1a1a1a]/50'}`}>
          <ArrowLeft className="h-4 w-4" /> All writing
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="bg-pink-accent/10 text-pink-accent rounded-full px-3 py-0.5 text-[11px] font-body font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <Tag className="h-3 w-3" /> {post.category}
            </span>
            <span className={`text-xs font-body flex items-center gap-1 ${isDark ? 'text-white/40' : 'text-[#1a1a1a]/40'}`}>
              {post.date}
            </span>
            <span className={`text-xs font-body flex items-center gap-1 ${isDark ? 'text-white/40' : 'text-[#1a1a1a]/40'}`}>
              <Clock className="h-3 w-3" /> {readTime}
            </span>
          </div>

          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-heading italic leading-[0.95] mb-6 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
            {post.title}
          </h1>

          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-pink-accent/30 flex-shrink-0">
              <img src="/headshot.jpg" alt="Victoria Elfend" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className={`font-body font-semibold text-sm ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>Victoria Elfend</p>
              <p className={`font-body text-xs ${isDark ? 'text-white/40' : 'text-[#1a1a1a]/40'}`}>Defense Strategy & Innovation</p>
            </div>
          </div>
        </motion.div>

        <div className={`w-full h-px mb-10 ${isDark ? 'bg-white/5' : 'bg-[#1a1a1a]/5'}`} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-5"
        >
          {post.body.map((para, i) => {
            // Handle paragraphs with embedded \n (heading + body combined)
            if (para.includes('\n')) {
              const parts = para.split('\n').map(s => s.trim()).filter(Boolean)
              return (
                <div key={i}>
                  <h2 className={`text-xl md:text-2xl font-heading italic mt-10 mb-4 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                    {parts[0]}
                  </h2>
                  {parts.slice(1).map((p, j) => (
                    <p key={j} className={`text-base md:text-[17px] font-body font-light leading-[1.85] mb-4 ${isDark ? 'text-white/65' : 'text-[#1a1a1a]/60'}`}>
                      {p}
                    </p>
                  ))}
                </div>
              )
            }

            // Section headings
            if (isHeading(para)) {
              return (
                <h2 key={i} className={`text-xl md:text-2xl font-heading italic mt-10 mb-1 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                  {para.replace(/:$/, '')}
                </h2>
              )
            }

            // Group labels
            if (isGroupLabel(para)) {
              return (
                <h3 key={i} className={`text-base md:text-lg font-body font-semibold mt-8 mb-2 ${isDark ? 'text-white/80' : 'text-[#1a1a1a]/80'}`}>
                  {para}
                </h3>
              )
            }

            // Interview questions - render as blockquote style
            if (isQuestion(para)) {
              return (
                <blockquote key={i} className={`border-l-2 border-pink-accent/30 pl-4 my-4 text-base font-body font-light italic leading-[1.8] ${isDark ? 'text-white/55' : 'text-[#1a1a1a]/50'}`}>
                  {para}
                </blockquote>
              )
            }

            // Hypothesis lines
            if (para.startsWith('Hypothesis')) {
              return (
                <div key={i} className={`rounded-xl p-4 my-4 ${isDark ? 'bg-white/[0.03] border border-white/5' : 'bg-pink-accent/[0.03] border border-pink-accent/10'}`}>
                  <p className={`text-sm md:text-base font-body font-light leading-[1.8] ${isDark ? 'text-white/65' : 'text-[#1a1a1a]/60'}`}>
                    <span className="font-semibold text-pink-accent">{para.split(':')[0]}:</span>
                    {para.split(':').slice(1).join(':')}
                  </p>
                </div>
              )
            }

            // Regular paragraphs - drop cap on first real paragraph (not heading)
            const isFirstBody = i === 0 || (i > 0 && post.body.slice(0, i).every(p => isHeading(p)))
            return (
              <p key={i} className={`text-base md:text-[17px] font-body font-light leading-[1.85] ${isDark ? 'text-white/65' : 'text-[#1a1a1a]/60'}`}>
                {isFirstBody && i === 0 && !isHeading(para) ? (
                  <>
                    <span className="text-3xl font-heading italic text-pink-accent float-left mr-2 mt-1 leading-none">{para.charAt(0)}</span>
                    {para.slice(1)}
                  </>
                ) : para}
              </p>
            )
          })}
        </motion.div>

        {/* Nav */}
        <div className={`mt-16 pt-8 border-t ${isDark ? 'border-white/5' : 'border-[#1a1a1a]/5'}`}>
          {(() => {
            const idx = posts.findIndex(p => p.slug === slug)
            const prev = idx > 0 ? posts[idx - 1] : null
            const next = idx < posts.length - 1 ? posts[idx + 1] : null
            return (
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                {prev ? (
                  <Link to={`/writing/${prev.slug}`} className={`group flex-1 cursor-none no-underline ${isDark ? 'text-white/50 hover:text-white' : 'text-[#1a1a1a]/50 hover:text-[#1a1a1a]'}`}>
                    <span className="text-xs font-body uppercase tracking-wider text-pink-accent/60">Previous</span>
                    <p className="font-heading italic text-base mt-1 group-hover:text-pink-accent transition-colors">{prev.title}</p>
                  </Link>
                ) : <div />}
                {next ? (
                  <Link to={`/writing/${next.slug}`} className={`group flex-1 text-right cursor-none no-underline ${isDark ? 'text-white/50 hover:text-white' : 'text-[#1a1a1a]/50 hover:text-[#1a1a1a]'}`}>
                    <span className="text-xs font-body uppercase tracking-wider text-pink-accent/60">Next</span>
                    <p className="font-heading italic text-base mt-1 group-hover:text-pink-accent transition-colors">{next.title}</p>
                  </Link>
                ) : <div />}
              </div>
            )
          })()}
        </div>

        <div className={`mt-12 pt-8 border-t text-center ${isDark ? 'border-white/5' : 'border-[#1a1a1a]/5'}`}>
          <p className={`font-heading italic text-lg max-w-md mx-auto leading-snug ${isDark ? 'text-white/20' : 'text-[#1a1a1a]/15'}`}>
            "Courage is what it takes to stand up and speak; courage is also what it takes to sit down and listen."
          </p>
          <p className={`font-body text-xs mt-3 ${isDark ? 'text-white/10' : 'text-[#1a1a1a]/10'}`}>-- Winston Churchill</p>
        </div>
      </article>
    </div>
  )
}
