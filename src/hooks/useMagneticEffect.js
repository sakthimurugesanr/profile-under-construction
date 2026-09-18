import { useRef, useEffect } from 'react'
import { gsap, reducedMotion, coarsePointer } from '@/lib/gsap'

/**
 * Creates a magnetic effect where element follows cursor when nearby
 * Perfect for buttons and interactive elements
 * Usage:
 *   const ref = useMagneticEffect({ strength: 0.3 })
 *   <button ref={ref}>Magnetic Button</button>
 */
export function useMagneticEffect({ strength = 0.3, speed = 0.3 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || reducedMotion() || coarsePointer()) return

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const deltaX = (e.clientX - centerX) * strength
      const deltaY = (e.clientY - centerY) * strength

      gsap.to(el, {
        x: deltaX,
        y: deltaY,
        duration: speed,
        ease: 'power3.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: speed * 1.5,
        ease: 'elastic.out(1, 0.3)',
      })
    }

    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [strength, speed])

  return ref
}
