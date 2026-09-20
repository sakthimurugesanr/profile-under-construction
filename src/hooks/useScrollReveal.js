import { useEffect } from 'react'

/**
 * Reveals elements with [data-reveal] attribute when they scroll into view
 * Adds 'revealed' class to trigger CSS transitions
 */
export function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]')
    
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            // Optional: Unobserve after revealing (reveal only once)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px', // Trigger slightly before element enters viewport
      }
    )

    elements.forEach((el) => observer.observe(el))

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [])
}
