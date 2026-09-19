import { useRef } from 'react'
import { Section } from '@/components/ui/Section'
import { gsap } from '@/lib/gsap'
import { useParallax } from '@/hooks/useParallax'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'

export function About() {
  const sectionRef = useRef(null)
  
  // Parallax effects for different layers
  const imageRef = useParallax({ distance: 50, from: -25, lag: 0.5 })
  const textRef = useParallax({ distance: -30, from: 15, lag: 0.7 })
  const brushRef = useParallax({ distance: 80, from: -40, lag: 0.3 })
  const accentRef = useParallax({ distance: -40, from: 20, lag: 0.6 })

  // Scroll-triggered animations
  useIsomorphicLayoutEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      // Set initial state to visible (no hidden text)
      gsap.set('.about-fade-in', { opacity: 1, y: 0 })
      
      // Animate content on scroll
      gsap.fromTo(
        '.about-fade-in',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            once: true,
          },
        }
      )

      // Animate skills
      gsap.fromTo(
        '.skill-item',
        { opacity: 0, scale: 0.8, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 85%',
            once: true,
          },
        }
      )

      // Animate stats
      gsap.fromTo(
        '.stat-card',
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.stats-container',
            start: 'top 85%',
            once: true,
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [])

  const stats = [
    { value: '2+', label: 'Years Experience' },
    { value: '30+', label: 'Projects Completed' },
    { value: '15+', label: 'Technologies' },
    { value: '100%', label: 'Commitment' },
  ]

  return (
    <Section id="about" tone="base" ref={sectionRef}>
      <div className="about-container">
        {/* Main Content Grid */}
        <div className="about-grid">
          {/* Left Column - Image */}
          <div className="about-image-column">
            <div className="about-image-wrapper">
              {/* Parallax Brush Stroke */}
              <div ref={brushRef} className="brush-stroke" />
              
              {/* Image Container - Regular image for now */}
              <div ref={imageRef} className="about-image-container">
                <img
                  src="/assets/images/sakthi.png"
                  alt="Sakthi Murugesan - Fullstack Developer"
                  className="about-image"
                  onLoad={() => console.log('✅ Image loaded!')}
                  onError={(e) => {
                    console.error('❌ Image failed to load')
                    console.log('Tried path:', e.target.src)
                    // Try fallback
                    e.target.src = '/assets/images/placeholder-profile.svg'
                  }}
                />
                <div className="image-overlay" />
              </div>

              {/* Accent Elements */}
              <div ref={accentRef} className="accent-line accent-line-1" />
              <div className="accent-line accent-line-2" />
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="about-content-column">
            <div ref={textRef} className="about-text-content">
              {/* Section Label */}
              <div className="about-section-label about-fade-in" ref={useParallax({ distance: 20, from: -10, lag: 0.8 })}>
                <span className="section-eyebrow">About Me</span>
              </div>

              {/* Header */}
              <div className="about-header about-fade-in" ref={useParallax({ distance: 30, from: -15, lag: 0.75 })}>
                <h2 className="about-greeting">Hi, I'm Sakthi — a Full Stack Developer & AI Enthusiast.</h2>
              </div>

              {/* Description */}
              <div className="about-description about-fade-in" ref={useParallax({ distance: 35, from: -18, lag: 0.7 })}>
                <p className="about-text">
                  I enjoy turning ideas into fast, scalable, and user-friendly web applications. 
                  With 2+ years of experience, I work across the stack—from crafting responsive 
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
              <div className="stats-container about-fade-in" ref={useParallax({ distance: 25, from: -12, lag: 0.65 })}>
                {stats.map((stat, index) => (
                  <div key={index} className="stat-card">
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="about-cta about-fade-in" ref={useParallax({ distance: 30, from: -15, lag: 0.55 })}>
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
