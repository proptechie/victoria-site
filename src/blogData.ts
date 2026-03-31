export interface BlogPost {
  slug: string
  title: string
  date: string
  readTime: string
  category: string
  excerpt: string
  body: string[]
}

export const posts: BlogPost[] = [
  {
    slug: 'proliferated-leo-resilience',
    title: 'Proliferated LEO and the Future of Space Resilience',
    date: 'March 2026',
    readTime: '7 min read',
    category: 'Emerging Technology',
    excerpt: 'U.S. space superiority was built on a handful of exquisite satellites -- few in number, slow to replace, and strategically fragile. That model is now a liability. Proliferated Low Earth Orbit changes everything.',
    body: [
      'Many decision-makers still think of space as a handful of "Rolls-Royces": exquisite satellites, few in number, slow to replace, and therefore strategically fragile. That mental model is now a liability. Proliferated Low Earth Orbit (LEO) constellations -- many small, affordable satellites working as a network -- invert the logic: resilience comes from volume and dispersion, not from any single platform\'s performance.',
      'U.S. space superiority came from a small number of highly capable satellites that delivered unique, hard-to-replicate effects because the U.S. concentrated on cutting-edge sensors and global reach when no peer could do the same. That asymmetry has eroded. Adversaries like China and Russia can jam links, conduct cyber intrusions against ground systems, and physically threaten satellites with new space capabilities. We must plan to operate through degradation, not assume prevention.',
      'Proliferated LEO means deploying large quantities of smaller satellites in low orbits -- hundreds to low-thousands of kilometers up -- instead of relying on a few large satellites in higher, more exposed orbits. This approach flips the cost equation. Destroying or degrading a proliferated constellation requires an attacker to engage many targets simultaneously, while the defender can replenish lost nodes faster and more cheaply than the attacker can replace kinetic or electronic weapons.',
      'Resilience in space will come from many widely dispersed, affordable satellites that the U.S. can replace and upgrade more quickly than an adversary can neutralize them. Resilience is a network property, not a single-satellite property. No one node is indispensable because the architecture routes around damage, redistributes tasking, and maintains continuity of effect even as individual elements are lost.',
      'The Department must assume space will be contested and build to fight through disruption, not avoid it. The U.S. must set requirements to ensure industry hardens systems by designing and exercising for jamming, cyber intrusion, and kinetic threats from day one -- not bolting resilience onto legacy designs after the fact.',
      'As proliferated architecture scales, complexity increases, and network management and software assurance become decisive for mission performance. The ground-based user terminals become the operational chokepoint: if the network is resilient in orbit but fragile on the ground, the advantage never reaches commanders. With proliferated LEO, congestion and debris risks require reliable tracking, collision avoidance, and credible end-of-life deorbit plans to avoid Kessler syndrome -- a self-reinforcing cascade of collisions.',
      'The Department should write requirements for networks that can scale and be replenished on predictable timelines, making "volume-ready" the default by prioritizing modularity, multi-source supply chains, and launch-on-demand contracts. Proliferated LEO architectures should be treated as the default option for new communications and data-transport requirements, with any exceptions requiring explicit justification.',
    ],
  },
  {
    slug: 'commercial-space-mission-authorization',
    title: 'Mission Authorization for Commercial Space: A Policy Framework',
    date: 'February 2026',
    readTime: '10 min read',
    category: 'Space Policy',
    excerpt: 'The U.S. faces a fast-changing commercial landscape and intensifying geopolitical competition in space. How the government designs mission-authorization criteria will determine which private missions are enabled or constrained.',
    body: [
      'The U.S. is facing a fast-changing commercial landscape and intensifying geopolitical competition in space. The Trump Administration, through an August 2025 Executive Order, has set increasing American competitiveness in space as a goal and authorized the Secretary of Commerce to design a mission-authorization framework for novel commercial space activities. How the government designs these criteria will shape the global standard for commercial space operations.',
      'There are no clear, substantive decision criteria that translate the Outer Space Treaty Article VI obligation to "authorize and continually supervise" private space activities into actionable regulatory standards for novel commercial missions. As launch costs fall and commercial missions proliferate, the way the United States enacts policy will determine which private missions are enabled or constrained, effectively setting the global standard for years to come.',
      'Operationalizing U.S. authorization and continuing-supervision obligations requires a mission-level framework that produces consistent, repeatable determinations for novel commercial missions despite conditions of technical novelty and regulatory uncertainty.',
      'Risk assessment sits at the center. Regulators should perform a mission-level risk assessment to set and apply authorization criteria consistently: identify hazards, estimate likelihood and consequence, evaluate mitigation, and compare residual risk against a defined threshold. Scenario planning allows regulators to pressure-test whether proposed mission-authorization criteria hold up under real space operations.',
      'Regulators should require a bounded set of technical and operational evidence that directly supports assessment. The goal is not exhaustive proof; it is a minimum viable evidentiary basis for making a structured authorization determination under uncertainty. This includes technical performance and safety data, mission profile and contingencies, and end-of-life disposal information.',
      'The August 2025 Executive Order sets the goal of "expediting and streamlining authorizations to enable American space competitiveness and superiority." To achieve this while balancing OST requirements, regulators must navigate three core trade-offs.',
      'First, innovation versus oversight. The U.S. has a strong interest in enabling commercial experimentation. Implementing regulation will increase commercial costs. Too much oversight chills investment; too little invites catastrophic incidents that set the entire industry back.',
      'Second, speed versus rigor. The U.S. has a vested interest in getting missions approved quickly. At the same time, regulators want to be confident that approved missions will not create unacceptable risks. The tension lies in finding a process that is fast enough to maintain competitive advantage but thorough enough to be credible.',
      'Third, company cost versus global cost. Regulators will have to consider the impacts of a mission on the broader space community. A company designs missions to prioritize lowest possible short-term cost, but this calculus may externalize risks -- debris, interference, or spectrum congestion -- onto other operators and future missions.',
      'We believe it is important to have a presumption of approval. Unless a proposed commercial mission clearly fails to meet the required criteria, it should be approved. The goal of the mission-authorization system is not to eliminate risk but to ensure it is understood, bounded, and managed. More important than spending years achieving perfect criteria is standing up a working system and learning from real regulatory decisions.',
    ],
  },
  {
    slug: 'prototype-to-program-of-record',
    title: 'Prototype to Program of Record: The Arsenal of Freedom Reforms',
    date: 'March 2026',
    readTime: '12 min read',
    category: 'Defense Acquisition',
    excerpt: 'The United States does not have an innovation problem -- it has an innovation adoption problem. A qualitative study of whether the Arsenal of Freedom reforms have changed how prototypes become programs of record.',
    body: [
      'In November 2025, Secretary of Defense Pete Hegseth announced the Arsenal of Freedom at the National War College, formally declaring the Defense Acquisition System defunct and introducing a new acquisition framework built around Portfolio Acquisition Executives with direct authority over requirements, funding, and fielding decisions.',
      'Technological innovation drives American military advantage, yet the Department of Defense fails to translate new technologies into fielded capability at speed. In a threat environment where battlefield advantages are increasingly determined by which side can deploy, adapt, and scale technology faster, this failure is not bureaucratic friction -- it is strategic risk.',
      'The central research question: How have the Arsenal of Freedom reforms changed the conditions under which prototypes transition to programs of record, as described by acquisition professionals across the DoD program management chain?',
      'The puzzle this study addresses is a mismatch between reform intent and operational reality. Acquisition reform has been a persistent challenge across nearly every administration, yet the structural barriers to prototype transition have proven remarkably durable. The Arsenal of Freedom represents the most aggressive attempt to dismantle these barriers, but whether it succeeds depends on what actually changes in the offices where transition decisions are made.',
      'The United States does not have an innovation problem -- it has an innovation adoption problem. The prototype-to-POR transition fails because the institutional architecture designed to move that technology into production was built for industrial-age procurement cycles, not software-defined capability timelines. Research documents that defense innovation organizations successfully demonstrate technical viability, but prototypes routinely stall at the transition to enduring programs because the receiving organizations lack the budget flexibility, risk tolerance, and procedural pathways to absorb them.',
      'Reform efforts have not resolved acquisition conditions so much as layered new complexity on top of them. A more rigorous policy approach would require systematic evaluation of whether discrete changes in authority, process, or incentive structure actually produce measurable change in transition outcomes.',
      'The most granular accounts of how institutional resistance operates at the behavioral level reveal that program managers often perceive prototype adoption as career risk rather than mission opportunity. Requirements documents are written to protect budgets rather than describe warfighter needs. The valley of death has behavioral expressions that performance data and policy documents cannot capture.',
      'This study employs semi-structured qualitative interviews as its primary method. The phenomenon under study is not directly observable through documents or performance data. Whether the Arsenal of Freedom has altered the conditions under which transition decisions are made is a question about how people in specific institutional positions describe their experience of a policy change.',
      'The study targets acquisition professionals across two functional groupings: DoD acquisition professionals at the program office level (Program Managers, Program Executive Officers, Portfolio Acquisition Executives, and Contracting Officers), and innovation and reform intermediaries (Defense Innovation Unit project leads, rapid capability office directors, and service innovation cell leaders).',
      'Evidence that the reforms have altered transition conditions would provide the first practitioner-grounded validation of an initiative that the Department has staked significant institutional capital on. Evidence that conditions remain unchanged despite new authorities would signal that the reform has reproduced the pattern every prior initiative has followed -- and that the Department needs a fundamentally different theory of change.',
      'In either case, this research serves the evaluation imperative that decades of RAND research identifies as the most persistent deficiency in DoD\'s reform approach: the tendency to layer initiatives atop unvalidated predecessors without building the empirical basis to understand what works and why.',
    ],
  },
]
