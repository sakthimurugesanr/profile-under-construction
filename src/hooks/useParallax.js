import { useRef } from 'react'
import { gsap, ScrollTrigger, reducedMotion, coarsePointer } from '@/lib/gsap'
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'

/**
 * Scrub-linked parallax. Attach the returned ref to the element that should
 * drift; pass `trigger` when the drift should be driven by an ancestor.
 *
 *   const ref = useParallax({ distance: 90 })
 *   <div ref={ref} />
 *
 * distance  px travelled across the whole trigger (negative = moves up)
 * scale     optional end scale, for background layers
 * lag       scrub smoothing in seconds
 */
export function useParallax({
  distance = 80,
  from = null,
  scale = null,
  lag = 0.8,
  start = 'top bottom',
  end = 'bottom top',
  trigger = null,
} = {}) {
  const ref = useRef(null)

  useIsomorphicLayoutEffect(() => {
    const el = ref.current
    if (!el || reducedMotion() || coarsePointer()) return

    // Phones do less work: half the travel, no scaling.
    const factor = coarsePointer() ? 0.45 : 1

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: (from ?? -distance) * factor },
        {
          y: distance * factor,
          ...(scale && !coarsePointer() ? { scale } : {}),
          ease: 'none',
          scrollTrigger: {
            trigger: trigger?.current || el,
            start,
            end,
            scrub: lag,
            invalidateOnRefresh: true,
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [distance, from, scale, lag, start, end, trigger])

  return ref
}
