import { useEffect } from 'react'

/** One observer; content stays visible before hydration or without JavaScript. */
export function useScrollReveal() {
  useEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const elements = [...document.querySelectorAll('[data-reveal]')]
    const observer = new IntersectionObserver(entries => {
      for (const { target, isIntersecting } of entries) {
        if (!isIntersecting) continue
        target.classList.add('revealed')
        observer.unobserve(target)
      }
    }, { threshold: 0, rootMargin: '0px 0px 80px 0px' })
    for (const el of elements) {
      // Never hide already visible content during hydration.
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('revealed')
      else el.classList.add('reveal-pending')
      observer.observe(el)
    }
    return () => {
      observer.disconnect()
      elements.forEach(el => el.classList.remove('reveal-pending'))
    }
  }, [])
}
