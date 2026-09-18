import { useRef } from 'react'
import { gsap, ScrollTrigger, reducedMotion } from '@/lib/gsap'
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'

/**
 * Creates a 3D parallax effect with rotation based on scroll
 * Perfect for cards and featured sections
 * Usage:
 *   const ref = use3DParallax({ rotateX: 15, rotateY: 10 })
 *   <div ref={ref}>3D Parallax Content</div>
 */
export function use3DParallax({
  rotateX = 10,
  rotateY = 10,
  translateZ = 50,
  start = 'top bottom',
  end = 'bottom top',
  scrub = 1,
} = {}) {
  const ref = useRef(null)

  useIsomorphicLayoutEffect(() => {
    const el = ref.current
    if (!el || reducedMotion()) return

    // Set perspective on parent
    if (el.parentElement) {
      el.parentElement.style.perspective = '1000px'
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          rotateX: -rotateX,
          rotateY: -rotateY,
          z: -translateZ,
        },
        {
          rotateX: rotateX,
          rotateY: rotateY,
          z: translateZ,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start,
            end,
            scrub,
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [rotateX, rotateY, translateZ, start, end, scrub])

  return ref
}
