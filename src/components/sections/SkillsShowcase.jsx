import { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { Section } from '@/components/ui/Section'

export function SkillsShowcase() {
  const containerRef = useRef(null)

  useEffect(() => {
    const containers = containerRef.current?.querySelectorAll('.image-box')
    if (!containers) return

    const ctx = gsap.context(() => {
      containers.forEach((container) => {
        const swapper = container.querySelector('.swapper')
        const controller = container.querySelector('.controller')
        const images = swapper.querySelectorAll('img')
        const progressBar = swapper.querySelector('.progress div > div')
        const flipIndicator = swapper.querySelector('.progress')

        // Translation animation - swapper moves along with scroll
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

        // Crossfade animation - images fade in/out
        gsap.to(images, {
          opacity: (index) => (index === 0 ? 0 : 1),
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top center-=25%',
            end: 'bottom center+=25%',
            scrub: true,
          },
        })

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
    <Section id="skills-showcase" tone="base">
      <div ref={containerRef} className="showcase-container">
        <div className="showcase-header">
          <h2 className="display text-center text-4xl md:text-6xl mb-4">
            Real-Time Experience
          </h2>
          <p className="text-center meta mb-12 md:mb-20">
            Scroll to see the technology transitions
          </p>
        </div>

        {/* Frontend Development */}
        <div className="image-box">
          <div className="swapper">
            <div className="progress">
              <div>
                <div></div>
              </div>
            </div>
            <div className="caption">
              <h3 className="subheading text-sm">Frontend Development</h3>
              <p className="copy text-xs">
                Building responsive, interactive user interfaces with React, TypeScript, and modern CSS
              </p>
            </div>
            <img
              src="/assets/images/placeholder-skill-1.svg"
              alt="React Development"
              className="showcase-image"
            />
            <img
              src="/assets/images/placeholder-skill-1.svg"
              alt="TypeScript Code"
              className="showcase-image"
            />
          </div>
          <div className="controller">
            <img
              src="/assets/images/placeholder-skill-1.svg"
              alt="Code Editor"
              className="showcase-image"
            />
          </div>
        </div>

        {/* Backend Development */}
        <div className="image-box reverse">
          <div className="controller">
            <img
              src="/assets/images/placeholder-skill-2.svg"
              alt="Server Infrastructure"
              className="showcase-image"
            />
          </div>
          <div className="swapper">
            <div className="progress">
              <div>
                <div></div>
              </div>
            </div>
            <div className="caption">
              <h3 className="subheading text-sm">Backend Development</h3>
              <p className="copy text-xs">
                Scalable APIs, databases, and server-side logic with Node.js, Express, and MongoDB
              </p>
            </div>
            <img
              src="/assets/images/placeholder-skill-2.svg"
              alt="Node.js Development"
              className="showcase-image"
            />
            <img
              src="/assets/images/placeholder-skill-2.svg"
              alt="Database Design"
              className="showcase-image"
            />
          </div>
        </div>

        {/* Fullstack Integration */}
        <div className="image-box">
          <div className="swapper">
            <div className="progress">
              <div>
                <div></div>
              </div>
            </div>
            <div className="caption">
              <h3 className="subheading text-sm">Fullstack Integration</h3>
              <p className="copy text-xs">
                End-to-end solutions combining frontend excellence with robust backend architecture
              </p>
            </div>
            <img
              src="/assets/images/placeholder-skill-3.svg"
              alt="Analytics Dashboard"
              className="showcase-image"
            />
            <img
              src="/assets/images/placeholder-skill-3.svg"
              alt="Business Metrics"
              className="showcase-image"
            />
          </div>
          <div className="controller">
            <img
              src="/assets/images/placeholder-skill-3.svg"
              alt="Developer Workspace"
              className="showcase-image"
            />
          </div>
        </div>
      </div>
    </Section>
  )
}
