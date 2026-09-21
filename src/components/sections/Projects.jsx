import { useRef } from 'react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Tag } from '@/components/ui/Tag'
import { projects } from '@/data/site'
import { useHoverTilt } from '@/hooks/useHoverTilt'
import { gsap } from '@/lib/gsap'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'
import { clsx } from '@/lib/clsx'

function ProjectCard({ project }) {
  const tiltRef = useHoverTilt({ max: 6, scale: 1.01 })

  return (
    <article
      ref={tiltRef}
      className="project-card group relative flex-shrink-0 overflow-hidden border border-line bg-ink-800/70 backdrop-blur-sm"
    >
      <div className="p-4 sm:p-6 md:p-8">
        {/* Header */}
        <header className="mb-4 flex flex-col gap-2 border-b border-line pb-4">
          <div className="flex items-start justify-between gap-2 sm:gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="subheading mb-1 group-hover:text-orange-500 transition-colors duration-300 break-words">
                {project.name}
              </h3>
              <p className="meta-strong text-orange-500 break-words">{project.company}</p>
            </div>
          </div>
        </header>

        {/* Overview */}
        <p className="copy mb-4 text-sm leading-relaxed text-chalk-muted">
          {project.overview}
        </p>

        {/* Key Features/Responsibilities */}
        <div className="mb-4">
          <h4 className="meta-strong mb-3 text-chalk">Key Features:</h4>
          <ul className="space-y-2">
            {project.responsibilities.slice(0, 4).map((item, i) => (
              <li key={i} className="flex gap-2 sm:gap-3 text-xs leading-relaxed text-chalk-muted">
                <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                <span className="break-words">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack */}
        <div className="mb-4">
          <h4 className="meta-strong mb-2 text-chalk">Tech Stack:</h4>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Tag key={tag} className="text-xs">
                {tag}
              </Tag>
            ))}
          </div>
        </div>

        {/* Footer with GitHub link */}
        <footer className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 border-t border-line pt-4">
          <div className="flex items-center gap-2">
            <span className="meta">{project.detail.label}:</span>
            <span className="meta-strong text-chalk break-words">{project.detail.value}</span>
          </div>
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded border border-line bg-ink-700 px-3 sm:px-4 py-2 font-mono text-xs font-medium text-chalk transition-all duration-300 hover:border-orange-500 hover:bg-orange-500/10 hover:text-orange-500 whitespace-nowrap"
          >
            <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span className="hidden xs:inline">View Code</span>
            <span className="xs:hidden">Code</span>
          </a>
        </footer>
      </div>
    </article>
  )
}

export default function Projects() {
  const sectionRef = useRef(null)
  const wrapperRef = useRef(null)

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current
    const wrapper = wrapperRef.current
    
    if (!section || !wrapper) return

    // Only enable on desktop
    const mm = gsap.matchMedia()
    
    mm.add("(min-width: 768px)", () => {
      const cards = gsap.utils.toArray('.project-card')
      
      gsap.to(cards, {
        xPercent: -100 * (cards.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          snap: 1 / (cards.length - 1),
          end: () => "+=" + wrapper.offsetWidth
        }
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className={clsx('section section--alt horizontal-scroll-section')}
    >
      <div className="shell">
        <SectionHeader
          title="Skills in Action"
          note="Personal projects showcasing full-stack development, AI/ML, and modern web technologies."
          data-reveal="fade-up"
          className="mb-12"
        />
      </div>
      
      <div 
        ref={wrapperRef}
        className="horizontal-scroll-container"
      >
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  )
}
