import { useRef } from 'react'
import { facts, profile } from '@/data/site'
import { gsap, reducedMotion } from '@/lib/gsap'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'
import { useMagneticEffect } from '@/hooks/useMagneticEffect'
import { SimpleParticles } from '@/components/ui/SimpleParticles'

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

    if (reducedMotion()) {
      gsap.set(el.querySelectorAll('[data-intro], [data-parallax-speed]'), { 
        opacity: 1, 
        y: 0,
        clearProps: 'transform,filter'
      })
      return
    }

    const ctx = gsap.context(() => {
      // Intro timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      
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

      // Parallax scroll timeline - multi-layer depth effect
      const layers = gsap.utils.toArray('[data-parallax-speed]')
      
      layers.forEach((layer) => {
        const speed = parseFloat(layer.dataset.parallaxSpeed) || 1
        const distance = parseFloat(layer.dataset.parallaxDistance) || 200
        
        // Calculate movement: depth determines speed
        // speed < 1 = recedes (background)
        // speed > 1 = advances (foreground)
        const y = (1 - speed) * distance
        
        gsap.to(layer, {
          y: y,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
            invalidateOnRefresh: true
          }
        })
      })

      // Optional: Add pointer parallax for desktop
      if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        const pointer = { x: 0, y: 0 }
        
        const onPointerMove = (event) => {
          const rect = el.getBoundingClientRect()
          pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
          pointer.y = ((event.clientY - rect.top) / rect.height) * 2 - 1
          
          layers.forEach((layer) => {
            const speed = parseFloat(layer.dataset.parallaxSpeed) || 1
            const depth = speed - 1
            const drift = 15 // max drift in pixels
            
            gsap.to(layer, {
              xPercent: -pointer.x * depth * drift,
              yPercent: -pointer.y * depth * drift * 0.6,
              duration: 1.1,
              ease: 'power3.out',
              overwrite: 'auto'
            })
          })
        }
        
        const onPointerLeave = () => {
          layers.forEach((layer) => {
            gsap.to(layer, {
              xPercent: 0,
              yPercent: 0,
              duration: 1.1,
              ease: 'power3.out',
              overwrite: 'auto'
            })
          })
        }
        
        el.addEventListener('pointermove', onPointerMove)
        el.addEventListener('pointerleave', onPointerLeave)
        
        return () => {
          el.removeEventListener('pointermove', onPointerMove)
          el.removeEventListener('pointerleave', onPointerLeave)
        }
      }
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="top"
      ref={scope}
      className="hero-parallax relative isolate overflow-hidden border-b border-line bg-ink-950 pb-16 pt-28 md:pb-24 md:pt-40"
      style={{ overflowX: 'hidden', minHeight: '100vh' }}
      data-parallax="hero"
    >
      {/* Particle Background - Only in Hero */}
      <div className="absolute inset-0 -z-40">
        <SimpleParticles />
      </div>

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
        className="shell flex flex-col gap-12 relative z-10"
      >
        <div style={{ overflow: 'visible', width: '100%' }}>
          <h1 className="display text-mega uppercase" style={{ maxWidth: '100%' }}>
            {/* First name - faster parallax layer */}
            <span className="block overflow-hidden pb-[0.06em]" style={{ perspective: '1000px' }}>
              <span
                data-parallax-speed="1.1"
                data-parallax-distance="80"
                data-intro="line"
                className="inline-block"
                style={{ transformOrigin: '50% 100%' }}
              >
                Sakthi
              </span>
            </span>
            {/* Last name - slower parallax with outline hover */}
            <span className="block overflow-hidden pb-[0.06em]" style={{ perspective: '1000px' }}>
              <span
                data-parallax-speed="1.2"
                data-parallax-distance="60"
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
