import { useRef, useEffect } from 'react'
import { Section } from '@/components/ui/Section'
import { gsap, reducedMotion } from '@/lib/gsap'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'
import { profile } from '@/data/site'

function AnimatedCounter({ value, delay = 0 }) {
  const counterRef = useRef(null)
  useEffect(() => {
    if (reducedMotion() || !('IntersectionObserver' in window)) return
    const element = counterRef.current
    const match = value.match(/^(\d+)(.*)$/)
    if (!element || !match) return
    let tween
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return
      observer.disconnect()
      const counter = { value: 0 }
      tween = gsap.to(counter, {
        value: Number(match[1]), duration: 1, delay, ease: 'power2.out',
        onUpdate: () => { element.textContent = Math.ceil(counter.value) + match[2] },
        onComplete: () => { element.textContent = value },
      })
    }, { threshold: 0.5 })
    observer.observe(element)
    return () => { observer.disconnect(); tween?.kill(); element.textContent = value }
  }, [value, delay])
  return <div className="stat-value-wrapper"><div ref={counterRef} className="stat-value stat-value-animated">{value}</div></div>
}

export function About() {
  const sectionRef = useRef(null)
  
  useIsomorphicLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add({ desktop: '(min-width: 768px)', mobile: '(max-width: 767px)', reduce: '(prefers-reduced-motion: reduce)' }, context => {
      if (context.conditions.reduce) return
      const distance = context.conditions.mobile ? 22 : 65
      const el = sectionRef.current
      const ctx = gsap.context(() => {
        gsap.fromTo('.about-image-wrapper', { y: distance, scale: .96 }, {
          y: -distance, scale: 1.02, ease: 'none', scrollTrigger: {
            trigger: el.querySelector('.about-image-column'), start: 'top bottom', end: 'bottom top', scrub: .8, invalidateOnRefresh: true,
          },
        })
        const background = el.querySelector('.about-ink-background')
        const liquid = el.querySelector('[data-about-liquid]')
        const reveal = gsap.timeline({ scrollTrigger: {
          trigger: el.querySelector('.about-image-wrapper'), start: 'top 80%', once: true,
        } })
        reveal.fromTo(background, { opacity: 0, scale: .82 }, { opacity: 1, scale: 1, duration: 1.8, ease: 'power4.out' })
          .fromTo(liquid, { attr: { scale: 90 } }, { attr: { scale: 0 }, duration: 2.4, ease: 'power4.out' }, 0)
          // Image stays black and white (grayscale)
          .set(background, { filter: 'none' })
        
        // Animate the name from left to right on scroll
        gsap.fromTo('.about-name-animate', 
          { x: -100, opacity: 0 },
          {
            x: 0, 
            opacity: 1, 
            duration: 1.2, 
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.about-name-animate',
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        )
        gsap.fromTo('.about-description p', { y: 20, opacity: .2 }, {
          y: 0, opacity: 1, stagger: .15, duration: 1.2, ease: 'power4.out',
          scrollTrigger: { trigger: el.querySelector('.about-description'), start: 'top 90%', once: true },
        })
        gsap.fromTo('.about-text-content > div', { y: distance * .45 }, {
          y: 0, stagger: .12, ease: 'power1.out', scrollTrigger: {
            trigger: el.querySelector('.about-text-content'), start: 'top 90%', end: 'top 25%', scrub: .6, invalidateOnRefresh: true,
          },
        })
      }, el)
      return () => ctx.revert()
    })
    return () => mm.revert()
  }, [])

  const stats = [
    { value: '2+', label: 'Years Experience' },
    { value: '30+', label: 'Projects Completed' },
    { value: '15+', label: 'Technologies' },
    { value: '100%', label: 'Commitment' },
  ]

  return (
    <Section id="about" tone="base" ref={sectionRef} data-section="about">
      <div className="about-container">
        {/* Main Content Grid */}
        <div className="about-grid">
          {/* Left Column - Image */}
          <div className="about-image-column">
            <div className="about-image-wrapper">
              <svg className="about-filter-definitions" aria-hidden="true" width="0" height="0">
                <defs><filter id="about-liquify" x="-25%" y="-25%" width="150%" height="150%" colorInterpolationFilters="sRGB">
                  <feTurbulence type="fractalNoise" baseFrequency=".025" numOctaves="2" seed="8" result="noise" />
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" data-about-liquid="" />
                </filter></defs>
              </svg>
              <div className="about-ink-background" aria-hidden="true" />
              
              {/* Image Container - Optimized image for performance */}
              <div className="about-image-container">
                <img
                  src="/assets/images/updated-sakthi.png"
                  alt="Sakthi Murugesan - React AI Engineer & MERN Stack Developer"
                  className="about-image"
                  loading="lazy"
                  fetchpriority="low"
                  width="1254"
                  height="1254"
                  decoding="async"
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="about-content-column">
            <div className="about-text-content">
              {/* Animated Name - Left to Right on Scroll */}
              <div className="about-name-animate" style={{ marginBottom: '1.5rem' }}>
                <h2 className="about-name-styled">
                  Sakthi Murugesan
                </h2>
                {/* Social Icons - Black & White */}
                <div className="about-social-icons">
                  <a 
                    href={profile.links.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-icon linkedin-icon"
                    aria-label="LinkedIn"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a 
                    href={profile.links.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-icon github-icon"
                    aria-label="GitHub"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Section Label */}
              <div className="about-section-label about-fade-in">
                <span className="section-eyebrow">About Me</span>
              </div>

              {/* Header */}
              <div className="about-header about-fade-in">
                <h2 className="about-greeting">About Sakthi Murugesan — AI Engineer & MERN Stack Developer</h2>
              </div>

              {/* Description */}
              <div className="about-description about-fade-in">
                <p className="about-text">
                  I enjoy turning ideas into fast, scalable, and user-friendly web applications. 
                  With 2+ years of experience, I work across the stack from crafting responsive 
                  interfaces with React, TypeScript, JavaScript, and Redux Toolkit to building 
                  reliable APIs and backend services with Node.js, Express.js, Python, and FastAPI.
                </p>
                <p className="about-text">
                  I'm passionate about writing clean, reusable code, solving real-world problems, 
                  and creating experiences that are simple and enjoyable to use. I also explore 
                  AI and RAG technologies, experimenting with how intelligent systems can make 
                  modern applications more powerful and useful.
                </p>
                <p className="about-text-emphasis">
                  Build. Learn. Experiment. Improve. That's the mindset I bring to every project.
                </p>
              </div>

              {/* Stats */}
              <div className="stats-container about-fade-in">
                {stats.map((stat, index) => (
                  <div key={index} className="stat-card">
                    <AnimatedCounter 
                      value={stat.value} 
                      label={stat.label}
                      delay={index * 0.2}
                    />
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="about-cta about-fade-in">
                <a href="#contact" className="btn btn--solid">
                  Let's Work Together
                </a>
                <a href="#work" className="btn btn--ghost">
                  View My Work
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
