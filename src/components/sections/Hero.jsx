import { HeroSpiderWeb } from '@/components/ui/HeroSpiderWeb'
import { SectionNote } from '@/components/ui/SectionNote'
import { useRef } from 'react'
import { facts, profile } from '@/data/site'
import { gsap } from '@/lib/gsap'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'
import { useMagneticEffect } from '@/hooks/useMagneticEffect'

// Disabled particles for performance - they're too heavy for 90+ score
// import SimpleParticles from '@/components/ui/SimpleParticles'

/**
 * Parallax Hero with depth-layered scene
 * Multi-speed layers create depth parallax effect on scroll
 * Inspired by atmospheric perspective and depth cueing
 */
export function Hero() {
  const scope = useRef(null)
  
  // Add magnetic effect to buttons
  const btnRef1 = useMagneticEffect({ strength: 0.2, speed: 0.4 })
  const btnRef2 = useMagneticEffect({ strength: 0.2, speed: 0.4 })

  useIsomorphicLayoutEffect(() => {
    const el = scope.current
    if (!el) return
    const mm = gsap.matchMedia()
    mm.add({ desktop: '(min-width: 768px)', mobile: '(max-width: 767px)', reduce: '(prefers-reduced-motion: reduce)' }, context => {
      if (context.conditions.reduce) return
      const strength = context.conditions.mobile ? 0.2 : 0.4
      const ctx = gsap.context(() => {
        const scene = gsap.timeline({ scrollTrigger: {
          trigger: el, start: 'top top', end: 'bottom top', scrub: 0.6, invalidateOnRefresh: true,
        } })
        el.querySelectorAll('[data-parallax-speed]').forEach(layer => {
          if (layer.classList.contains('hero-content-layer')) return
          const depth = Number(layer.dataset.parallaxSpeed) - 1
          scene.to(layer, { y: -depth * 180 * strength, ease: 'none' }, 0)
        })
        // The whole hero moves in depth as the page scrolls, not just its letters.
        scene.to('.hero-content-layer', {
          y: () => Math.min(window.innerHeight * .22, 180) * strength, ease: 'none',
        }, 0)
          .to('.hero-wave-name', { y: -100 * strength, scale: .99, transformOrigin: 'left center', ease: 'none' }, 0)
          .to('.hero-scene', {
            y: () => Math.min(window.innerHeight * .38, 300) * strength,
            scale: 1.04, transformOrigin: 'center top', ease: 'none',
          }, 0)
        // A scroll-driven wave: each glyph has its own depth and rotation.
        const nameMotion = gsap.timeline({ scrollTrigger: {
          trigger: el, start: 'top top', end: '55% top', scrub: .9, invalidateOnRefresh: true,
        } })
        el.querySelectorAll('[data-hero-name]').forEach((line, lineIndex) => {
          const letters = line.querySelectorAll('.hero-name-letter')
          const direction = lineIndex === 0 ? -1 : 1
          nameMotion.to(letters, {
            y: index => direction * Math.sin((index / (letters.length - 1)) * Math.PI) * (context.conditions.mobile ? 5 : 14),
            rotation: index => direction * ((index / (letters.length - 1)) - .5) * (context.conditions.mobile ? 1 : 3),
            rotateX: direction * (context.conditions.mobile ? 2 : 6),
            ease: 'none', stagger: { each: .035, from: lineIndex === 0 ? 'start' : 'end' },
          }, 0)
        })
        scene.to('.hero-orbit', { rotation: 32 * strength, scale: 1.04, ease: 'none' }, 0)
          .to('.hero-terrain-back', { y: 100 * strength, x: -35 * strength, ease: 'none' }, 0)
          .to('.hero-terrain-front', { y: -60 * strength, x: 45 * strength, ease: 'none' }, 0)
          .to('.hero-horizon-glow', { y: 90 * strength, scale: 1.08, ease: 'none' }, 0)
      }, el)
      return () => ctx.revert()
    })
    return () => mm.revert()
  }, [])

  return (
    <section
      id="top"
      aria-label="Sakthi Murugesan, Professional AI Engineer"
      ref={scope}
      className="hero-parallax relative isolate overflow-hidden border-b border-line bg-ink-950 pb-16 pt-28 md:pb-24 md:pt-40"
      style={{ overflowX: 'hidden', minHeight: '100vh' }}
      data-parallax="hero"
    >
      <HeroSpiderWeb />
      <div
        className="hero-scene"
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        <div className="hero-horizon-glow" />

        {/*
          FIX: hero-orbit was positioned/sized by an external stylesheet
          that pushed it outside the viewport on smaller/narrower screens
          (only its edge was visible on the right side). Inline styles
          below take precedence over that external CSS, pin the orbit
          within the visible viewport at every breakpoint using clamp(),
          and clip anything that could still overflow. Nothing else in
          this component was changed.
        */}
        <div
          className="hero-orbit"
          style={{
            position: 'absolute',
            top: 'clamp(-40px, 8vw, 60px)',
            right: 'clamp(-40px, 4vw, 80px)',
            width: 'clamp(180px, 30vw, 460px)',
            height: 'clamp(180px, 30vw, 460px)',
            maxWidth: '90vw',
            maxHeight: '90vw',
            transformOrigin: '50% 50%',
          }}
        >
          <div />
          <span />
        </div>

        <svg className="hero-terrain hero-terrain-back" viewBox="0 0 1440 600" preserveAspectRatio="none">
          <path d="M0 480 Q220 140 480 370 T1000 280 T1440 380 V600 H0Z" fill="#121010" />
          {[0, 1, 2, 3, 4, 5].map(i => <path key={i} d={`M-100 ${470+i*22} Q230 ${160+i*28} 520 ${390+i*18} T1100 ${320+i*20} T1540 ${390+i*20}`} fill="none" stroke="#ff8c42" strokeOpacity=".13" />)}
        </svg>
        <svg className="hero-terrain hero-terrain-front" viewBox="0 0 1440 500" preserveAspectRatio="none">
          <path d="M0 340 Q350 160 690 340 T1440 270 V500 H0Z" fill="#080809" />
          {[0, 1, 2, 3].map(i => <path key={i} d={`M-100 ${350+i*30} Q320 ${170+i*26} 720 ${350+i*24} T1540 ${260+i*25}`} fill="none" stroke="#ff8c42" strokeOpacity=".1" />)}
        </svg>
      </div>
      {/* Particle Background - Disabled for performance optimization */}
      {/* <div className="absolute inset-0 -z-40">
        <SimpleParticles />
      </div> */}

      {/* Layer 2: Mid background - Glow (medium speed) */}
      <div 
        data-parallax-speed="0.5"
        data-parallax-distance="160"
        className="pointer-events-none absolute left-1/2 top-0 -z-20 h-[520px] w-[min(1100px,120vw)] -translate-x-1/2"
      >
        <div className="h-full w-full bg-[radial-gradient(60%_60%_at_50%_0%,rgba(255,107,53,0.15),transparent_75%)] blur-2xl" />
      </div>

      {/* Layer 3: Accent glow top (medium-fast speed) */}
      <div 
        data-parallax-speed="0.7"
        data-parallax-distance="120"
        className="pointer-events-none absolute left-1/4 top-20 -z-10 h-[300px] w-[600px]"
      >
        <div className="h-full w-full bg-[radial-gradient(circle,rgba(255,140,66,0.12),transparent_70%)] blur-3xl" />
      </div>

      {/* Layer 4: Content container (normal speed) */}
      <div 
        data-parallax-speed="1"
        className="shell hero-content-layer flex flex-col gap-12 relative z-10"
      >
        <div style={{ overflow: 'visible', width: '100%' }}>
          <h1 aria-label="Sakthi Murugesan" className="display text-mega uppercase hero-wave-name" style={{ maxWidth: '100%' }}>
            {/* First name - faster parallax layer */}
            <span className="block overflow-visible pb-[0.06em]" style={{ perspective: '1000px' }}>
              <span
                data-hero-name="first" aria-hidden="true"
                data-intro="line"
                className="inline-block"
                style={{ transformOrigin: '50% 100%' }}
              >
                {'Sakthi'.split('').map((letter, index) => <span className="hero-name-letter" key={index}>{letter}</span>)}
              </span>
            </span>
            {/* Last name - slower parallax with outline hover */}
            <span className="block overflow-visible pb-[0.06em]" style={{ perspective: '1000px' }}>
              <span
                data-hero-name="last" aria-hidden="true"
                data-intro="line"
                className="inline-block outline-type-hover"
                style={{ 
                  transformOrigin: '50% 100%'
                }}
              >
                {'Murugesan'.split('').map((letter, index) => <span className="hero-name-letter" style={{ '--gradient-offset': (index * 12.5) + '%' }} key={index}>{letter}</span>)}
              </span>
            </span>
          </h1>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="flex flex-col gap-6 lg:col-span-7">
            <p 
              data-intro="copy" 
              data-parallax-speed="1.05"
              data-parallax-distance="40"
              className="font-display text-xl font-bold leading-snug tracking-tight sm:text-2xl"
            >
              {profile.role} in {profile.location.split(',')[0]}.
            </p>
            <p 
              data-intro="copy"
              data-parallax-speed="1.08"
              data-parallax-distance="30"
              className="copy"
            >
              {profile.intro}
            </p>
          </div>

          <div 
            data-intro="copy"
            data-parallax-speed="1.1"
            data-parallax-distance="20"
            className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end"
          >
            <a ref={btnRef1} className="btn btn--solid" href={profile.links.resume} download>
              Download résumé
            </a>
            <a ref={btnRef2} className="btn btn--ghost" href="#work">
              See my experience
            </a>
          </div>
        </div>

        <dl 
          data-parallax-speed="1.15"
          data-parallax-distance="10"
          className="grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-4"
        >
          {facts.map((fact) => (
            <div key={fact.label} data-intro="fact" className="flex flex-col gap-2 bg-ink-950 p-5 md:p-6">
              <dt className="meta">{fact.label}</dt>
              <dd className="display text-2xl sm:text-3xl">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="shell hero-section-note"><SectionNote section="top" /></div>

      {/* Layer 5: Foreground accent (fastest, advances) */}
      <div 
        data-parallax-speed="1.3"
        data-parallax-distance="100"
        className="pointer-events-none absolute right-0 bottom-0 -z-5 h-[400px] w-[400px] opacity-40"
      >
        <div className="h-full w-full bg-[radial-gradient(circle,rgba(255,107,53,0.2),transparent_60%)] blur-2xl" />
      </div>
    </section>
  )
}