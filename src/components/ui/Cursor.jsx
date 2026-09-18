import { useEffect, useRef } from 'react'
import { gsap, reducedMotion } from '@/lib/gsap'
import { useFinePointer } from '@/hooks/usePointer'

/**
 * Dot + trailing ring, mouse only. Hidden from assistive tech and skipped
 * entirely on touch devices and under reduced motion.
 */
export function Cursor() {
  const fine = useFinePointer()
  const dot = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    if (!fine || reducedMotion()) return

    const dotX = gsap.quickTo(dot.current, 'x', { duration: 0.06, ease: 'none' })
    const dotY = gsap.quickTo(dot.current, 'y', { duration: 0.06, ease: 'none' })
    const ringX = gsap.quickTo(ring.current, 'x', { duration: 0.35, ease: 'power3.out' })
    const ringY = gsap.quickTo(ring.current, 'y', { duration: 0.35, ease: 'power3.out' })

    const onMove = (e) => {
      dotX(e.clientX)
      dotY(e.clientY)
      ringX(e.clientX)
      ringY(e.clientY)
    }

    const grow = () => gsap.to(ring.current, { scale: 1.8, opacity: 0.9, duration: 0.25 })
    const shrink = () => gsap.to(ring.current, { scale: 1, opacity: 0.45, duration: 0.25 })

    window.addEventListener('mousemove', onMove)
    document
      .querySelectorAll('a, button, input, textarea, [data-cursor]')
      .forEach((el) => {
        el.addEventListener('mouseenter', grow)
        el.addEventListener('mouseleave', shrink)
      })

    return () => {
      window.removeEventListener('mousemove', onMove)
      document
        .querySelectorAll('a, button, input, textarea, [data-cursor]')
        .forEach((el) => {
          el.removeEventListener('mouseenter', grow)
          el.removeEventListener('mouseleave', shrink)
        })
    }
  }, [fine])

  if (!fine) return null

  return (
    <div aria-hidden="true">
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[60] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-white"
      />
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[59] -ml-[19px] -mt-[19px] h-10 w-10 rounded-full border border-white/45 opacity-45"
      />
    </div>
  )
}
