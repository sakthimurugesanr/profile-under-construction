import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'

/** Scoped timeline: native touch scrolling, mouse dragging and keyboard links. */
export function Timeline({ label, items, renderItem }) {
  const root = useRef(null)
  const rail = useRef(null)
  const drag = useRef(null)
  const [active, setActive] = useState(items[0]?.id)

  useEffect(() => {
    const cards = [...root.current.querySelectorAll('[data-timeline-entry]')]
    if (!cards.length) return
    const observer = new IntersectionObserver(() => {
      const line = window.innerHeight * 0.5
      const nearest = cards.reduce((best, card) =>
        Math.abs(card.getBoundingClientRect().top - line) < Math.abs(best.getBoundingClientRect().top - line) ? card : best, cards[0])
      if (nearest) setActive(nearest.id)
    }, { rootMargin: '-20% 0px -40% 0px', threshold: [0, 0.5, 1] })
    cards.forEach(card => observer.observe(card))
    return () => observer.disconnect()
  }, [items])

  useIsomorphicLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add({ desktop: '(min-width: 768px)', mobile: '(max-width: 767px)', reduce: '(prefers-reduced-motion: reduce)' }, context => {
      if (context.conditions.reduce) return
      const distance = context.conditions.mobile ? 18 : 56
      const ctx = gsap.context(() => {
        root.current.querySelectorAll('[data-timeline-entry]').forEach(entry => {
          const date = entry.querySelector('.journey-date')
          const card = entry.querySelector('.journey-card')
          const scene = gsap.timeline({ scrollTrigger: {
            trigger: entry, start: 'top 92%', end: 'bottom 25%', scrub: 0.7, invalidateOnRefresh: true,
          } })
          gsap.fromTo(entry.querySelector('.journey-scene-art'), { rotateY: 15, y: distance, scale: .92 }, {
            rotateY: -5, y: -distance, scale: 1, ease: 'none',
            scrollTrigger: { trigger: entry, start: 'top bottom', end: 'bottom top', scrub: 1 },
          })
          scene.fromTo(date, { y: distance * .6 }, { y: -distance * .6, ease: 'none' }, 0)
            .fromTo(card, { y: distance, rotateX: context.conditions.mobile ? 0 : 3, scale: .98 },
              { y: -distance * .25, rotateX: 0, scale: 1, ease: 'none' }, 0)
            .fromTo(entry, { '--journey-progress': 0 }, { '--journey-progress': 1, ease: 'none' }, 0)
        })
      }, root)
      return () => ctx.revert()
    })
    return () => mm.revert()
  }, [items])

  const startDrag = event => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return
    drag.current = { x: event.clientX, left: rail.current.scrollLeft, moved: false, down: true }
  }
  const moveDrag = event => {
    if (!drag.current?.down) return
    const distance = event.clientX - drag.current.x
    if (Math.abs(distance) > 5) {
      drag.current.moved = true
      rail.current.setPointerCapture(event.pointerId)
      rail.current.scrollLeft = drag.current.left - distance
    }
  }
  const stopDrag = event => {
    if (rail.current.hasPointerCapture(event.pointerId)) rail.current.releasePointerCapture(event.pointerId)
    // Keep the movement flag until click capture, to prevent opening a link after dragging.
    if (drag.current) drag.current.down = false
  }

  return <div className="journey" ref={root}>
    <nav className="journey-nav" aria-label={`${label} timeline`}>
      <div className="journey-track" ref={rail} onPointerDown={startDrag} onPointerMove={moveDrag}
        onPointerUp={stopDrag} onPointerCancel={() => { drag.current = null }}
        onPointerLeave={event => { if (!rail.current.hasPointerCapture(event.pointerId)) drag.current = null }}
        onClickCapture={event => { if (drag.current?.moved) event.preventDefault(); drag.current = null }}>
        <ol className="journey-years">
          {items.map(item => <li key={item.id}>
            <a href={`#${item.id}`} className="journey-link" aria-current={active === item.id ? 'step' : undefined}
              onClick={event => { if (!event.defaultPrevented) setActive(item.id) }} aria-label={`${item.year}: ${item.title || item.degree}`}>
              <span className="journey-dot" aria-hidden="true" />
              <span>{item.year}</span><small>{item.railLabel || item.company || item.school}</small>
            </a>
          </li>)}
        </ol>
      </div>
      <p className="journey-hint">Explore the years <span aria-hidden="true">↔</span></p>
    </nav>
    <div className="journey-entries">
      {items.map((item, index) => <article key={item.id} id={item.id} data-timeline-entry
        className={`journey-entry ${active === item.id ? 'is-current' : ''}`} aria-labelledby={`${item.id}-title`}>
        <div className="journey-scene-art" aria-hidden="true"><span>{String(index + 1).padStart(2, '0')}</span><i /><i /><i /></div>
        <div className="journey-date"><span className="meta">{String(index + 1).padStart(2, '0')} / {label}</span>
          <p className="journey-year">{item.year}<span>{item.endYear || 'Present'}</span></p>
        </div>
        <div className="journey-card">{renderItem(item)}</div>
      </article>)}
    </div>
  </div>
}
