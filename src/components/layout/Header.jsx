import { useEffect, useState, useRef } from 'react'
import { nav, profile } from '@/data/site'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useMagneticEffect } from '@/hooks/useMagneticEffect'
import { gsap } from '@/lib/gsap'
import { clsx } from '@/lib/clsx'

const ids = nav.map((n) => n.id)

export function Header() {
  const active = useActiveSection(ids)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef(null)
  const openTlRef = useRef(null)
  const closeTlRef = useRef(null)
  
  // Add magnetic effect to the logo
  const logoRef = useMagneticEffect({ strength: 0.15, speed: 0.3 })
  const ctaRef = useMagneticEffect({ strength: 0.2, speed: 0.4 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Setup GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Open animation timeline
      openTlRef.current = gsap.timeline({ paused: true })
        .set('.hamburger-menu', { pointerEvents: 'none' })
        .to('.mobile-nav-overlay', {
          clipPath: 'circle(200% at calc(100% - 2.75rem) 2.75rem)',
          duration: 1.5,
          ease: 'power4.out',
        }, 0)
        .to('.mobile-nav-item', {
          x: 0,
          opacity: 1,
          pointerEvents: 'all',
          duration: 1.25,
          stagger: 0.1,
          ease: 'elastic.out(1.15, 0.95)',
        }, 0)
        .to('.hamburger-close', {
          opacity: 1,
          yPercent: -125,
          duration: 1,
          ease: 'power4.out',
        }, 0)
        .to('.hamburger-line', {
          opacity: 0,
          yPercent: -125,
          duration: 1,
          ease: 'power4.out',
        }, 0)
        .set('.hamburger-menu', { pointerEvents: 'all' })

      // Close animation timeline
      closeTlRef.current = gsap.timeline({ paused: true })
        .set('.hamburger-menu', { pointerEvents: 'none' })
        .to('.mobile-nav-item', {
          x: -200,
          opacity: 0,
          pointerEvents: 'none',
          duration: 1,
          stagger: 0.1,
          ease: 'power4.out',
        }, 0)
        .to('.mobile-nav-overlay', {
          clipPath: 'circle(0px at calc(100% - 2.75rem) 2.75rem)',
          duration: 1.2,
          ease: 'power4.out',
        }, '-=1')
        .to('.hamburger-bg', {
          scale: 0.9,
          duration: 0.25,
          ease: 'elastic.out',
        }, '-=0.9')
        .to('.hamburger-bg', {
          scale: 1,
          duration: 0.25,
          ease: 'elastic.out',
        }, '-=0.5')
        .to('.hamburger-close', {
          opacity: 0,
          yPercent: 125,
          duration: 1,
          ease: 'power4.out',
        }, 0)
        .to('.hamburger-line', {
          opacity: 1,
          yPercent: 0,
          duration: 1,
          ease: 'power4.out',
        }, 0)
        .set('.hamburger-menu', { pointerEvents: 'all' })
    })

    return () => ctx.revert()
  }, [])

  // Handle menu toggle
  const toggleMenu = () => {
    if (!open) {
      openTlRef.current?.seek(0).play()
      document.body.style.overflow = 'hidden'
    } else {
      closeTlRef.current?.seek(0).play()
      document.body.style.overflow = ''
    }
    setOpen(!open)
  }

  const closeMenu = () => {
    if (open) {
      closeTlRef.current?.seek(0).play()
      setOpen(false)
      document.body.style.overflow = ''
    }
  }

  return (
    <>
      <header
        className={clsx(
          'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300',
          scrolled ? 'border-line bg-ink-950/90 backdrop-blur-xl' : 'border-transparent bg-transparent'
        )}
      >
        <div className="shell flex h-16 items-center justify-between gap-4 md:h-20">
          <a 
            ref={logoRef}
            href="#top" 
            className="flex items-center gap-3 z-[60]" 
            onClick={closeMenu}
          >
            <span className="flex h-9 w-9 items-center justify-center border border-line-strong font-display text-sm font-extrabold transition-transform hover:scale-110">
              {profile.initials}
            </span>
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="font-display text-sm font-extrabold tracking-tight">{profile.name}</span>
              <span className="meta">{profile.role}</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav aria-label="Sections" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={active === item.id ? 'true' : undefined}
                    className={clsx(
                      'px-3 py-1.5 font-mono text-xs transition-all duration-300',
                      active === item.id 
                        ? 'bg-white text-ink-950 scale-105' 
                        : 'text-chalk-muted hover:text-chalk hover:scale-105'
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a 
              ref={ctaRef}
              href="#contact" 
              className="btn btn--solid hidden sm:inline-flex z-[60]"
            >
              Get in touch
            </a>

            {/* Hamburger Button */}
            <button
              type="button"
              className="hamburger-menu lg:hidden z-[60]"
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={toggleMenu}
            >
              <div className="hamburger-bg"></div>
              <div className="hamburger-icons">
                <svg viewBox="0 0 448 512" className="hamburger-line">
                  <path d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z"/>
                </svg>
                <svg viewBox="0 0 320 512" className="hamburger-close">
                  <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <nav
        ref={navRef}
        className="mobile-nav-overlay"
        aria-label="Mobile navigation"
      >
        <ul className="mobile-nav-list">
          {nav.map((item) => (
            <li key={item.id} className="mobile-nav-item">
              <a href={`#${item.id}`} onClick={closeMenu}>
                <span className="mobile-nav-text">{item.label}</span>
              </a>
            </li>
          ))}
          <li className="mobile-nav-item mobile-nav-cta">
            <a href="#contact" onClick={closeMenu} className="btn btn--solid w-full">
              Get in touch
            </a>
          </li>
        </ul>
      </nav>
    </>
  )
}
