import { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { Section } from '@/components/ui/Section'
import { Tag } from '@/components/ui/Tag'
import { projects } from '@/data/site'

export function Projects() {
  const containerRef = useRef(null)

  useEffect(() => {
    const containers = containerRef.current?.querySelectorAll('.image-box')
    if (!containers) return

    const ctx = gsap.context(() => {
      containers.forEach((container) => {
        const swapper = container.querySelector('.swapper')
        const controller = container.querySelector('.controller')
        const progressBar = swapper?.querySelector('.progress div > div')
        const flipIndicator = swapper?.querySelector('.progress')

        // Translation animation - swapper moves along with scroll
        if (swapper && controller) {
          gsap.to(swapper, {
            y: () => controller.offsetHeight - swapper.offsetHeight,
            ease: 'none',
            scrollTrigger: {
              trigger: container,
              start: 'top center',
              end: 'bottom center',
              scrub: 1,
            },
          })
        }

        // Progress bar fill animation
        if (progressBar) {
          gsap.to(progressBar, {
            height: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: container,
              start: 'center center+=50%',
              end: 'center center-=50%',
              scrub: true,
            },
          })
        }

        // Flip animation for progress indicator
        if (flipIndicator) {
          gsap.to(flipIndicator, {
            '--flip': 1,
            ease: 'none',
            scrollTrigger: {
              trigger: container,
              start: 'center center',
              end: 'center center',
              scrub: true,
            },
          })
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <Section id="projects" tone="alt">
      <div ref={containerRef} className="showcase-container">
        {/* Header */}
        <div className="showcase-header">
          <h2 className="display text-center text-4xl md:text-6xl mb-4">
            Skills in Action
          </h2>
          <p className="text-center meta mb-12 md:mb-20">
            Personal projects showcasing real-world implementations • Scroll to explore
          </p>
        </div>

        {/* Projects */}
        {projects.map((project, index) => (
          <div
            key={project.name}
            className={`image-box ${index % 2 === 0 ? '' : 'reverse'}`}
          >
            {/* Visual Section */}
            <div className="swapper">
              <div className="progress">
                <div>
                  <div></div>
                </div>
              </div>
              
              <div className="caption">
                <h3 className="subheading text-sm">{project.name}</h3>
                <p className="copy text-xs">
                  {project.blurb}
                </p>
              </div>

              {/* Project Visual - Placeholder with number */}
              <div className="relative h-full w-full overflow-hidden bg-ink-700 border border-line rounded-xl">
                <div className="grid-paper absolute inset-[-14%] opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-[12rem] md:text-[16rem] font-extrabold text-white/5">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="controller">
              <div className="project-details-overlay">
                {/* Kind Tag */}
                <span className="meta-strong text-chalk/80 uppercase tracking-widest text-xs mb-2 block">
                  {project.kind}
                </span>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <Tag key={tag}>
                      {tag}
                    </Tag>
                  ))}
                </div>

                {/* Footer Info */}
                <div className="flex items-center justify-between border-t border-line pt-3 mt-auto">
                  <div className="flex items-center gap-2">
                    <span className="meta">{project.detail.label}:</span>
                    <span className="meta-strong text-chalk">
                      {project.detail.value}
                    </span>
                  </div>
                  <a
                    href={project.repo}
                    className="meta-strong link-underline flex items-center gap-1 hover:text-chalk transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Code
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
