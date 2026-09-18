import { useRef, useEffect } from 'react'
import { gsap, reducedMotion, coarsePointer } from '@/lib/gsap'

/**
 * Creates a tilt effect based on mouse position
 * Perfect for cards and interactive panels
 * Usage:
 *   const ref = useHoverTilt({ max: 15 })
 *   <div ref={ref}>Tiltable Card</div>
 */
export function useHoverTilt({
  max = 15, // Maximum tilt angle
  perspective = 1000,
  scale = 1.05,
  speed = 0.4,
} = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || reducedMotion() || coarsePointer()) return

    // Set transform style
    el.style.transformStyle = 'preserve-3d'
    if (el.parentElement) {
      el.parentElement.style.perspective = `${perspective}px`
    }

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      
      const percentX = (x - centerX) / centerX
      const percentY = (y - centerY) / centerY
      
      const tiltX = percentY * max
      const tiltY = -percentX * max

      gsap.to(el, {
        rotateX: tiltX,
        rotateY: tiltY,
        scale: scale,
        duration: speed,
        ease: 'power2.out',
        transformPerspective: perspective,
      })
    }

    const handleMouseEnter = () => {
      gsap.to(el, {
        scale: scale,
        duration: speed,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: speed * 1.5,
        ease: 'elastic.out(1, 0.3)',
      })
    }

    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseenter', handleMouseEnter)
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseenter', handleMouseEnter)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [max, perspective, scale, speed])

  return ref
}
