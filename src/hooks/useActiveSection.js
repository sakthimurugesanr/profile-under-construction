import { useEffect, useState } from 'react'

/** A shared section observer drives navigation and document metadata. */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const sections = ids.map(id => document.getElementById(id)).filter(Boolean)
    const select = () => {
      const readingLine = window.innerHeight * 0.35
      let current = sections[0]
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= readingLine) current = section
      }
      if (current) setActive(current.id)
    }
    if (!('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(select, {
      rootMargin: '-35% 0px -64% 0px', threshold: 0,
    })
    sections.forEach(section => observer.observe(section))
    window.addEventListener('hashchange', select)
    window.addEventListener('resize', select, { passive: true })
    select()
    return () => {
      observer.disconnect()
      window.removeEventListener('hashchange', select)
      window.removeEventListener('resize', select)
    }
  }, [ids])
  return active
}
