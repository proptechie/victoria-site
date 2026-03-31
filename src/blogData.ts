export interface BlogPost {
  slug: string
  title: string
  date: string
  readTime: string
  category: string
  excerpt: string
  heroQuote?: string
  body: string[]
}

export const posts: BlogPost[] = [
  {
    slug: 'why-primes-cant-innovate',
    title: 'Why Defense Primes Can\'t Innovate (And What to Do About It)',
    date: 'March 2026',
    readTime: '6 min read',
    category: 'Defense Innovation',
    excerpt: 'The defense industrial base was built for a different era. The procurement system rewards scale, not speed. Here\'s why the structure itself is the bottleneck -- and how accelerator-based models are starting to crack it open.',
    body: [
      'The defense industrial base was built for a world where threats evolved slowly and production cycles could span decades. That world no longer exists. Adversaries are fielding autonomous systems, electronic warfare capabilities, and cyber tools at commercial speed. And yet, the largest defense contractors in the world still operate on timelines that would make a Series A startup weep.',
      'The problem is not a lack of will. I have sat across the table from VPs at major primes who genuinely want to integrate startup technology. The problem is structural. Procurement cycles run 18-36 months. IT security reviews take 6-12 months. Legal teams are optimized for risk elimination, not risk management. By the time a startup clears these gates, the technology is often a generation behind.',
      'At Starburst, we built an accelerator model specifically designed to compress these timelines. By pre-vetting startups against specific capability gaps, running structured technical evaluations with engineering teams, and creating standardized pilot frameworks, we reduced the typical adoption cycle from years to months.',
      'The results spoke for themselves: 52% of companies that went through our program achieved technical adoption within the prime\'s systems. That is not a marginal improvement -- it is a fundamentally different operating model.',
      'The lesson is clear: innovation in defense will not come from reorganizing existing bureaucracies. It will come from building new interfaces between the startup ecosystem and the industrial base. The technology exists. The capital exists. What has been missing is the connective tissue.',
    ],
  },
  {
    slug: 'dual-use-accelerator-playbook',
    title: 'The Dual-Use Accelerator Playbook: What I Learned Deploying $2M Annually',
    date: 'February 2026',
    readTime: '8 min read',
    category: 'Accelerators',
    excerpt: 'Running a dual-use accelerator for a defense prime taught me that the hardest part isn\'t finding good startups -- it\'s building the internal infrastructure to actually adopt what they build.',
    body: [
      'When I was brought on to build and run a dual-use accelerator for a major defense prime, I assumed the biggest challenge would be deal flow. Finding startups with defense-grade technology, evaluating them rigorously, and selecting the best. I was wrong.',
      'The hardest part -- by far -- was building the internal infrastructure within the prime to actually do something with the startups we selected. Engineering teams needed dedicated time for evaluations. Legal needed standardized frameworks. Finance needed budget lines that did not require 18 months of approvals.',
      'We evaluated over 500 deep tech startups across three cohorts. The selection process was rigorous: technical capability, team strength, market positioning, and most importantly, alignment with specific capability gaps we had mapped with sector engineering leads.',
      'The 14 companies we selected represented the cutting edge of defense technology: autonomy, advanced materials, electronic warfare, and AI-enabled systems. But the real innovation was on the process side. We created a repeatable framework for intake, evaluation, pilot scoping, and integration that could scale beyond any single cohort.',
      'The key insight: an accelerator is not a startup program. It is a change management tool for the prime. The startups are the vehicle, but the transformation happens inside the large organization.',
      'By the end, our portfolio companies had raised over $8M in follow-on capital and executed 10+ LOIs and MOUs. More importantly, 52% achieved real technical adoption -- meaning their technology was being used in actual programs, not just evaluated in sandboxes.',
    ],
  },
  {
    slug: 'navigating-the-valley-of-death',
    title: 'Navigating the Valley of Death: From SBIR to Scale',
    date: 'January 2026',
    readTime: '5 min read',
    category: 'Startup Strategy',
    excerpt: 'The "valley of death" between government R&D funding and production contracts kills more defense startups than bad technology ever will. Here\'s how to cross it.',
    body: [
      'Every defense startup founder knows the term "valley of death." It is the gap between winning an SBIR or other government R&D contract and securing a production deal or prime contractor integration. Most companies that die in defense tech die here.',
      'The valley exists because the incentives on each side are misaligned. Government program offices fund research but rarely have authority to fund production. Primes want mature, low-risk technology but will not invest in development. And startups burn through venture capital while waiting for a system that was not designed to move at their speed.',
      'Having advised dozens of startups on this exact transition, I have seen what works and what does not. The companies that cross the valley successfully share three characteristics.',
      'First, they build relationships with prime contractors early -- not after their SBIR ends, but during Phase I. The integration conversation needs to start before the technology is fully mature, because the prime\'s evaluation and procurement cycles are the longest variable in the equation.',
      'Second, they scope their pilots ruthlessly. The goal of a pilot is not to demonstrate every capability. It is to prove one specific value proposition in one specific context, with measurable outcomes that a program manager can use to justify a larger commitment.',
      'Third, they understand that capital strategy and customer strategy are the same thing in defense. The investors who matter are the ones who understand government timelines and can provide bridge funding through the valley. The customers who matter are the ones with budget authority and a near-term capability gap.',
    ],
  },
  {
    slug: 'building-dc-network-from-zero',
    title: 'How I Built a 150-Person D.C. Defense Network from Zero',
    date: 'December 2025',
    readTime: '4 min read',
    category: 'Network Building',
    excerpt: 'Washington runs on relationships. When I arrived with zero connections, I had to build a network that could move capital and create partnerships. Here\'s the system I used.',
    body: [
      'When I moved to Washington D.C. to work in defense innovation, I knew exactly no one. No government contacts. No VC connections. No prime contractor relationships. Two years later, I had built a network of over 150 people spanning startups, venture capital, defense primes, and senior DoD officials.',
      'The system was simple but required discipline. Every week, I reached out to five new people. Not cold pitches -- genuine requests to understand their work and perspective. I found that people in the defense community are remarkably generous with their time if you approach them with curiosity rather than an ask.',
      'The second principle was to be a connector, not a collector. Every time I met someone, I asked myself: who in my existing network would benefit from knowing this person? Making introductions became my currency. Within six months, people were coming to me for connections, which created a flywheel effect.',
      'The third principle was to show up consistently. The same conferences, the same working groups, the same happy hours. Washington is a city where familiarity builds trust, and trust is the prerequisite for everything that matters.',
      'The network became a genuine strategic asset. It accelerated deal flow for the accelerator, opened doors to senior decision-makers for our portfolio companies, and created visibility for capability gaps that we could match with startup solutions. But more than that, it taught me that the defense innovation ecosystem is smaller than it appears -- and that persistent, genuine engagement compounds faster than you expect.',
    ],
  },
  {
    slug: 'what-anduril-got-right',
    title: 'What Anduril Got Right: Software-First Defense',
    date: 'November 2025',
    readTime: '7 min read',
    category: 'Industry Analysis',
    excerpt: 'Anduril inverted the defense model: software first, hardware second. After studying DIU\'s founding, embedding inside a prime, and watching the old model fail, I understand exactly why this works.',
    body: [
      'I became obsessed with Anduril\'s model after reading The Kill Chain and studying the founding of the Defense Innovation Unit. The thesis was clear: the traditional defense model -- hardware first, software bolted on -- was fundamentally inverted for the modern threat environment.',
      'Anduril understood something that most primes still resist: in a world where the decisive advantage comes from software, autonomy, and data fusion, you build the software platform first and attach hardware second. This is not a philosophical preference. It is an engineering and business model decision with profound implications.',
      'When you start with software, your iteration cycles are measured in weeks, not years. Your marginal cost of deployment drops toward zero. Your ability to adapt to new threats is limited only by the speed of your engineering team, not by the speed of a physical supply chain.',
      'At Northrop Grumman, I see the old model from the inside. The engineering talent is extraordinary. The manufacturing capability is unmatched. But the organizational architecture was built for a world where programs ran for decades and the software was an afterthought. Changing that architecture is the defining challenge for the traditional defense industry.',
      'The companies that will win the next era of defense are the ones that can combine Anduril\'s software-first speed with the production scale and program management expertise of the traditional primes. That combination does not exist yet. But the startups building toward it -- and the people inside primes working to create the conditions for it -- are the ones I want to work with.',
      'The inversion is not optional. It is already happening. The question is whether you are building toward it or being disrupted by it.',
    ],
  },
]
