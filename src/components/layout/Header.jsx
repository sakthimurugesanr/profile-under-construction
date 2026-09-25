import { useEffect, useState, useRef } from 'react'
import { nav } from '@/data/site'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useSectionMetadata } from '@/hooks/useSectionMetadata'
import { sectionSEO } from '@/data/seo'
import { gsap, reducedMotion } from '@/lib/gsap'
import { clsx } from '@/lib/clsx'

const ids = Object.keys(sectionSEO)
export function Header() {
  const active = useActiveSection(ids)
  useSectionMetadata(active)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const dialog = useRef(null)
  const trigger = useRef(null)
  const menuAnimation = useRef(null)
  const closing = useRef(false)
  const closeMenu = () => {
    if (closing.current) return
    closing.current = true
    menuAnimation.current?.kill()
    menuAnimation.current = gsap.timeline({ onComplete: () => setOpen(false) })
      .to(dialog.current.querySelectorAll("nav li"), { x: -40, opacity: 0, duration: reducedMotion() ? 0 : 0.2, stagger: 0.025 }, 0)
      .to(dialog.current, { clipPath: "circle(0px at calc(100% - 2.75rem) 2.75rem)", duration: reducedMotion() ? 0 : 0.45, ease: "power4.inOut" }, 0)
  }
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    const onResize = () => { if (window.innerWidth >= 1024) setOpen(false) }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onResize) }
  }, [])
  useEffect(() => {
    if (!open) { dialog.current?.close(); return }
    closing.current = false
    dialog.current?.showModal()
    menuAnimation.current = gsap.timeline()
      .fromTo(dialog.current, { clipPath: 'circle(0px at calc(100% - 2.75rem) 2.75rem)' },
        { clipPath: 'circle(150% at calc(100% - 2.75rem) 2.75rem)', duration: reducedMotion() ? 0 : 0.85, ease: 'power4.out' }, 0)
      .fromTo(dialog.current.querySelectorAll('nav li'), { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: reducedMotion() ? 0 : 0.8, stagger: reducedMotion() ? 0 : 0.065, ease: 'elastic.out(1.15, 0.95)' }, 0.08)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { menuAnimation.current?.kill(); document.body.style.overflow = previous; dialog.current?.close(); trigger.current?.focus() }
  }, [open])
  return <>
    <header className={clsx('fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300',
      scrolled ? 'border-line bg-ink-950/90 backdrop-blur-xl' : 'border-transparent bg-ink-950/80')}>
      <div className="shell flex h-16 items-center justify-between gap-3 md:h-20">
        <a href="#top" className="mobile-signature text-xl sm:text-2xl whitespace-nowrap">Sakthi Murugesan</a>
        <nav aria-label="Sections" className="hidden lg:block"><ul className="flex gap-1">
          {nav.map(item => <li key={item.id}><a href={`#${item.id}`} aria-current={active === item.id ? 'location' : undefined}
            className={clsx('px-3 py-2 font-mono text-xs transition-colors', active === item.id ? 'text-orange-500' : 'text-chalk-muted hover:text-white')}>{item.label}</a></li>)}
        </ul></nav>
        <a href="#contact" className="btn btn--solid hidden lg:inline-flex">Get in touch</a>
        <button ref={trigger} type="button" className="compact-menu-button lg:hidden" aria-label="Open menu"
          aria-controls="mobile-menu" aria-expanded={open} onClick={() => setOpen(true)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
        </button>
      </div>
    </header>
    <dialog id="mobile-menu" ref={dialog} className="compact-menu restored-mobile-menu" aria-labelledby="mobile-menu-title"
      onCancel={event => { event.preventDefault(); closeMenu() }} onClose={() => setOpen(false)} onClick={event => { if (event.target === event.currentTarget) setOpen(false) }}>
      <div className="compact-menu-panel">
        <div className="compact-menu-heading"><span id="mobile-menu-title" className="meta">Explore portfolio</span>
          <button type="button" className="compact-menu-button" aria-label="Close menu" onClick={closeMenu}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>
          </button>
        </div>
        <nav aria-label="Mobile navigation"><ul>{nav.map((item,index) => <li key={item.id}>
          <a href={`#${item.id}`} aria-current={active === item.id ? 'location' : undefined} onClick={closeMenu}>
            <span className="compact-menu-number">0{index+1}</span>{item.label}<span className="compact-menu-arrow" aria-hidden="true">↗</span>
          </a></li>)}</ul></nav>
        <a href="#contact" className="btn btn--solid w-full mt-5" onClick={closeMenu}>Let's work together</a>
      </div>
    </dialog>
  </>
}
