import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { Link } from 'react-router'
import { ArrowUpRight, ArrowLeft, BookOpen } from 'lucide-react'
import { posts } from './blogData'

function BlogCard({ slug, title, date, readTime, category, excerpt, index, isDark }: {
  slug: string; title: string; date: string; readTime: string; category: string; excerpt: string; index: number; isDark: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.015, y: -4 }}
      className="cursor-none"
    >
      <Link to={`/blog/${slug}`} className="block no-underline">
        <div className={`rounded-2xl p-6 md:p-8 border transition-all duration-300 group ${isDark ? 'border-white/5 bg-white/[0.02] hover:border-pink-accent/20 hover:shadow-[0_0_40px_rgba(255,45,120,0.08)]' : 'bg-white border-[#1a1a1a]/5 shadow-sm hover:shadow-lg hover:shadow-pink-accent/10 hover:border-pink-accent/15'}`}>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-pink-accent/10 text-pink-accent rounded-full px-3 py-0.5 text-[11px] font-body font-semibold uppercase tracking-wider">{category}</span>
            <span className={`text-xs font-body ${isDark ? 'text-white/30' : 'text-[#1a1a1a]/30'}`}>{date}</span>
            <span className={`text-xs font-body ${isDark ? 'text-white/30' : 'text-[#1a1a1a]/30'}`}>{readTime}</span>
          </div>
          <h3 className={`text-xl md:text-2xl font-heading italic leading-tight mb-3 group-hover:text-pink-accent transition-colors ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
            {title}
          </h3>
          <p className={`text-sm font-body font-light leading-relaxed mb-4 ${isDark ? 'text-white/50' : 'text-[#1a1a1a]/50'}`}>
            {excerpt}
          </p>
          <div className="flex items-center gap-1.5 text-pink-accent text-sm font-body font-medium group-hover:gap-2.5 transition-all">
            Read more <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function BlogList({ isDark }: { isDark: boolean; onContact?: () => void }) {
  return (
    <div className="min-h-screen pt-24 pb-16 px-5 md:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <Link to="/" className={`inline-flex items-center gap-1.5 text-sm font-body mb-8 hover:text-pink-accent transition-colors cursor-none ${isDark ? 'text-white/50' : 'text-[#1a1a1a]/50'}`}>
            <ArrowLeft className="h-4 w-4" /> Back home
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="h-5 w-5 text-pink-accent" />
              <p className="text-pink-accent text-xs font-body font-semibold tracking-[0.2em] uppercase">Writing</p>
            </div>
            <h1 className={`text-4xl md:text-6xl font-heading italic leading-[0.9] mb-4 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
              Thoughts on Defense, Tech & Strategy
            </h1>
            <p className={`text-base md:text-lg font-body font-light max-w-2xl ${isDark ? 'text-white/50' : 'text-[#1a1a1a]/45'}`}>
              Essays on defense innovation, startup-prime integration, and building at the edge of national security.
            </p>
          </motion.div>
        </div>

        {/* Blog Grid */}
        <div className="space-y-5">
          {posts.map((post, i) => (
            <BlogCard key={post.slug} {...post} index={i} isDark={isDark} />
          ))}
        </div>

        {/* Footer with Churchill Quote */}
        <div className={`mt-20 pt-10 border-t text-center ${isDark ? 'border-white/5' : 'border-[#1a1a1a]/5'}`}>
          <p className={`font-heading italic text-lg md:text-xl max-w-lg mx-auto leading-snug ${isDark ? 'text-white/20' : 'text-[#1a1a1a]/15'}`}>
            "We make a living by what we get, but we make a life by what we give."
          </p>
          <p className={`font-body text-xs mt-3 ${isDark ? 'text-white/10' : 'text-[#1a1a1a]/10'}`}>-- Winston Churchill</p>
        </div>
      </div>
    </div>
  )
}
