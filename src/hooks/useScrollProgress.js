import { useRef } from 'react'
import { gsap, ScrollTrigger, reducedMotion } from '@/lib/gsap'
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'

/**
 * Creates a scroll progress indicator or animation tied to scroll position
 * Usage:
 *   const ref = useScrollProgress({ scrub: 1 })
 *   <div ref={ref} className="progress-bar" />
 */
export function useScrollProgress({
  start = 'top top',
  end = 'bottom bottom',
  scrub = 1,
  onUpdate = null,
} = {}) {
  const ref = useRef(null)

  useIsomorphicLayoutEffect(() => {
    const el = ref.current
    if (!el || reducedMotion()) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: document.body,
        start,
        end,
        scrub,
        onUpdate: (self) => {
          const progress = self.progress
          gsap.to(el, {
            scaleX: progress,
            duration: 0.1,
            ease: 'none',
          })
          if (onUpdate) onUpdate(progress)
        },
      })
    }, el)

    return () => ctx.revert()
  }, [start, end, scrub, onUpdate])

  return ref
}
