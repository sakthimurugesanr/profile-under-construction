import { useRef } from 'react'
import { gsap, reducedMotion } from '@/lib/gsap'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'

/**
 * Inverted band of stack names. GSAP drives it instead of a CSS keyframe so
 * it can be paused and so it respects reduced motion.
 */
export function Marquee({ items, speed = 26 }) {
  const track = useRef(null)
  const tween = useRef(null)

  useIsomorphicLayoutEffect(() => {
    const el = track.current
    if (!el || reducedMotion()) return

    const ctx = gsap.context(() => {
      tween.current = gsap.to(el, {
        xPercent: -50,
        duration: speed,
        ease: 'none',
        repeat: -1,
      })
    }, el)

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !document.hidden) tween.current?.play()
      else tween.current?.pause()
    })
    observer.observe(el.parentElement)
    const onVisibility = () => {
      if (document.hidden) tween.current?.pause()
      else if (el.getBoundingClientRect().bottom > 0 && el.getBoundingClientRect().top < innerHeight) tween.current?.play()
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      ctx.revert()
    }
  }, [speed])

  const pause = () => tween.current?.pause()
  const play = () => tween.current?.play()

  const row = [...items, ...items]

  return (
    <div
      className="w-full overflow-hidden border-y border-white bg-white py-3 text-ink-950"
      onMouseEnter={pause}
      onMouseLeave={play}
      aria-hidden="true"
    >
      <div ref={track} className="marquee-track">
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="display mx-6 whitespace-nowrap text-sm sm:text-base">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
