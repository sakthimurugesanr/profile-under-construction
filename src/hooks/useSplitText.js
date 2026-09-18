import { useRef } from 'react'
import { gsap, reducedMotion } from '@/lib/gsap'
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'

/**
 * Advanced text animation that splits text into characters/words and animates them
 * Usage:
 *   const ref = useSplitText({ type: 'chars', stagger: 0.03 })
 *   <h1 ref={ref}>Animated Text</h1>
 */
export function useSplitText({
  type = 'chars', // 'chars', 'words', or 'lines'
  stagger = 0.03,
  duration = 0.8,
  ease = 'power3.out',
  animationType = 'fadeUp', // 'fadeUp', 'fadeIn', 'scale', 'rotate'
  trigger = null,
  start = 'top 80%',
} = {}) {
  const ref = useRef(null)

  useIsomorphicLayoutEffect(() => {
    const el = ref.current
    if (!el || reducedMotion()) return

    const text = el.textContent
    const splitText = type === 'chars' ? text.split('') : text.split(' ')
    
    // Clear and rebuild with spans
    el.innerHTML = splitText
      .map((char) => `<span style="display: inline-block;">${char === ' ' ? '&nbsp;' : char}</span>`)
      .join('')

    const spans = el.querySelectorAll('span')

    // Animation variants
    const animations = {
      fadeUp: {
        from: { opacity: 0, y: 20 },
        to: { opacity: 1, y: 0 },
      },
      fadeIn: {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
      scale: {
        from: { opacity: 0, scale: 0 },
        to: { opacity: 1, scale: 1 },
      },
      rotate: {
        from: { opacity: 0, rotationX: -90 },
        to: { opacity: 1, rotationX: 0 },
      },
    }

    const anim = animations[animationType] || animations.fadeUp

    const ctx = gsap.context(() => {
      gsap.fromTo(
        spans,
        anim.from,
        {
          ...anim.to,
          duration,
          ease,
          stagger,
          scrollTrigger: {
            trigger: trigger?.current || el,
            start,
            once: true,
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [type, stagger, duration, ease, animationType, trigger, start])

  return ref
}
