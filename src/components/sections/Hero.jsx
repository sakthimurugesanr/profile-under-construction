import { useRef } from 'react'
import { facts, profile } from '@/data/site'
import { gsap, reducedMotion } from '@/lib/gsap'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'
import { useParallax } from '@/hooks/useParallax'
import { useMagneticEffect } from '@/hooks/useMagneticEffect'

/**
 * The one orchestrated moment on the page: the name sets, then the
 * supporting text and facts follow. Everything else on the page is either
 * scroll-linked or triggered by the visitor.
 */
export function Hero() {
  const scope = useRef(null)
  const grid = useParallax({ distance: 110, from: 0, scale: 1.08, start: 'top top', end: 'bottom top' })
  const glow = useParallax({ distance: 160, from: -40, start: 'top top', end: 'bottom top', lag: 1.1 })
  const nameRef = useParallax({ distance: 70, from: 0, start: 'top top', end: 'bottom top', lag: 0.6 })
  
  // Add magnetic effect to buttons
  const btnRef1 = useMagneticEffect({ strength: 0.2, speed: 0.4 })
  const btnRef2 = useMagneticEffect({ strength: 0.2, speed: 0.4 })

  useIsomorphicLayoutEffect(() => {
    const el = scope.current
    if (!el) return

    if (reducedMotion()) {
      gsap.set(el.querySelectorAll('[data-intro]'), { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      
      // Animated text lines with enhanced effects
      tl.fromTo(
        '[data-intro="line"]',
        { 
          yPercent: 108,
          rotationX: -45,
          opacity: 0,
        },
        { 
          yPercent: 0,
          rotationX: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.12,
          ease: 'power4.out',
        }
      )
      // Copy text with fade and slide
      .fromTo(
        '[data-intro="copy"]',
        { opacity: 0, y: 30, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 0.9, 
          stagger: 0.1,
          ease: 'back.out(1.2)',
        },
        '-=0.6'
      )
      // Facts with staggered bounce
      .fromTo(
        '[data-intro="fact"]',
        { opacity: 0, y: 20, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 0.7, 
          stagger: 0.08,
          ease: 'back.out(1.5)',
        },
        '-=0.5'
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="top"
      ref={scope}
      className="relative isolate overflow-hidden border-b border-line bg-ink-950 pb-16 pt-28 md:pb-24 md:pt-40"
    >
      {/* parallax layer 1 — the paper grid drifts and scales slightly */}
      <div ref={grid} className="grid-paper pointer-events-none absolute inset-0 -z-10 opacity-70" />
      {/* parallax layer 2 — a soft wash that lags further behind */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[520px] w-[min(1100px,120vw)] -translate-x-1/2">
        <div
          ref={glow}
          className="h-full w-full bg-[radial-gradient(60%_60%_at_50%_0%,rgba(255,255,255,0.10),transparent_75%)] blur-2xl"
        />
      </div>

      <div className="shell flex flex-col gap-12">
        <div ref={nameRef}>
          {/* Each line is masked so it can slide up from behind its own
              baseline; the padding keeps the mask off the descenders. */}
          <h1 className="display text-mega uppercase">
            {/* First name - Sakthi */}
            <span className="block overflow-hidden pb-[0.06em]" style={{ perspective: '1000px' }}>
              <span
                data-intro="line"
                className="inline-block"
                style={{ transformOrigin: '50% 100%' }}
              >
                Sakthi
              </span>
            </span>
            {/* Last name - Murugesan with outline and hover fill */}
            <span className="block overflow-hidden pb-[0.06em]" style={{ perspective: '1000px' }}>
              <span
                data-intro="line"
                className="inline-block outline-type-hover"
                style={{ 
                  transformOrigin: '50% 100%'
                }}
              >
                Murugesan
              </span>
            </span>
          </h1>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="flex flex-col gap-6 lg:col-span-7">
            <p data-intro="copy" className="font-display text-xl font-bold leading-snug tracking-tight sm:text-2xl">
              {profile.role} in {profile.location.split(',')[0]}.
            </p>
            <p data-intro="copy" className="copy">
              {profile.intro}
            </p>
          </div>

          <div data-intro="copy" className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
            <a ref={btnRef1} className="btn btn--solid" href={profile.links.resume} download>
              Download résumé
            </a>
            <a ref={btnRef2} className="btn btn--ghost" href="#work">
              See my experience
            </a>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label} data-intro="fact" className="flex flex-col gap-2 bg-ink-950 p-5 md:p-6">
              <dt className="meta">{fact.label}</dt>
              <dd className="display text-2xl sm:text-3xl">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
