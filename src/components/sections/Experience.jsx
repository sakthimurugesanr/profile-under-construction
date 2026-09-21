import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { TagList } from '@/components/ui/Tag'
import { experience } from '@/data/site'
import { useRef } from 'react'
import { gsap, ScrollTrigger, reducedMotion, CustomEase } from '@/lib/gsap'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'

function Role({ role, index }) {
  const roleRef = useRef(null)

  useIsomorphicLayoutEffect(() => {
    const el = roleRef.current
    if (!el || reducedMotion()) return

    const ctx = gsap.context(() => {
      // Custom ease for smooth gradient animation
      const customEase = CustomEase.create("custom", "M0,0 C0.548,0.032 0.63,1 1,1")
      
      // Initial entrance animation
      gsap.fromTo(
        el,
        { 
          opacity: 0, 
          y: 50,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        }
      )

      // Intro timeline with gradient reveals
      const introTween = gsap.timeline({
        defaults: { duration: 0.48 },
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          once: true,
        }
      })
      .set(el, { '--stop-active': '0%', '--stop-hover': '0%' })
      .to(el, {
        '--stop-active': '100%',
        ease: customEase
      })
      .to(el, {
        '--stop-hover': '100%',
        ease: customEase
      })
      .to(el, {
        '--stop-hover': '0%',
        ease: customEase
      }, '-=0.1')

      // Animate child elements with stagger
      gsap.fromTo(
        el.querySelectorAll('.role-content > *'),
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            once: true,
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [])

  // Mouse hover effects
  useIsomorphicLayoutEffect(() => {
    const el = roleRef.current
    if (!el || reducedMotion()) return

    const customEase = CustomEase.create("custom", "M0,0 C0.548,0.032 0.63,1 1,1")

    const handleMouseEnter = () => {
      gsap.to(el, {
        '--stop-hover': '100%',
        ease: customEase,
        duration: 0.36
      })
    }

    const handleMouseLeave = () => {
      gsap.to(el, {
        '--stop-hover': '0%',
        ease: customEase,
        duration: 0.36
      })
    }

    el.addEventListener('mouseenter', handleMouseEnter)
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      el.removeEventListener('mouseenter', handleMouseEnter)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <article
      ref={roleRef}
      data-reveal
      className="experience-role will-reveal grid gap-8 border-b border-line pb-12 last:border-0 last:pb-0 lg:grid-cols-12"
    >
      <div className="flex flex-col gap-2 lg:col-span-4">
        {role.current && (
          <span className="flex items-center gap-2 meta-strong">
            <span 
              className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" 
              aria-hidden="true" 
            />
            Current role
          </span>
        )}
        <p className="font-display text-xl font-extrabold tracking-tight">{role.period}</p>
        <p className="meta">{role.place}</p>
        <p className="meta">{role.type}</p>
      </div>

      <div className="role-content flex flex-col gap-5 lg:col-span-8">
        <div>
          <h3 className="subheading">{role.title}</h3>
          <p className="meta-strong mt-1">{role.company}</p>
        </div>
        <p className="copy">{role.summary}</p>
        <ul className="flex flex-col gap-2 border-l border-line pl-5">
          {role.points.map((point, i) => (
            <li 
              key={point} 
              className="copy text-sm"
              style={{
                animation: `fadeInLeft 0.5s ease-out ${0.2 + i * 0.1}s both`
              }}
            >
              {point}
            </li>
          ))}
        </ul>
        <TagList items={role.tags} />
      </div>
    </article>
  )
}

export function Experience() {
  return (
    <Section id="work" data-section="experience">
      <SectionHeader
        title="Where I have worked"
        note="Most recent first. The earliest role is not an engineering job, and it is on the page on purpose."
        data-reveal="fade-up"
      />
      <div className="flex flex-col gap-12" data-reveal="fade-up">
        {experience.map((role, index) => (
          <Role key={role.company} role={role} index={index} />
        ))}
      </div>
    </Section>
  )
}
