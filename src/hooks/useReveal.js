import { useRef } from 'react'
import { gsap, ScrollTrigger, reducedMotion } from '@/lib/gsap'
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'

/**
 * Reveals every [data-reveal] child of the returned ref once, when the
 * section scrolls in. One tween per section rather than per element keeps
 * the number of ScrollTriggers low.
 *
 * Usage:
 *   const ref = useReveal()
 *   <section ref={ref}><div data-reveal className="will-reveal" /></section>
 */
export function useReveal({ y = 28, stagger = 0.08, start = 'top 85%' } = {}) {
  const scope = useRef(null)

  useIsomorphicLayoutEffect(() => {
    const el = scope.current
    if (!el) return

    const targets = el.querySelectorAll('[data-reveal]')
    if (!targets.length) return

    if (reducedMotion()) {
      targets.forEach((t) => t.classList.remove('will-reveal'))
      gsap.set(targets, { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger,
          // Clearing opacity here would hand control back to .will-reveal
          // (opacity: 0), so drop the class instead once the tween lands.
          onComplete: () => {
            targets.forEach((t) => t.classList.remove('will-reveal'))
            gsap.set(targets, { clearProps: 'transform' })
          },
          scrollTrigger: { trigger: el, start, once: true },
        }
      )
    }, el)

    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [y, stagger, start])

  return scope
}
