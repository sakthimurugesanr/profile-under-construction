import { useEffect } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Marquee } from '@/components/ui/Marquee'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Stack } from '@/components/sections/Stack'
import { Experience } from '@/components/sections/Experience'
import { Projects } from '@/components/sections/Projects'
import { Education } from '@/components/sections/Education'
import { Contact } from '@/components/sections/Contact'
import { marquee } from '@/data/site'
import { ScrollTrigger, reducedMotion } from '@/lib/gsap'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export default function App() {
  
  useScrollReveal() // Enable scroll-triggered animations

  useEffect(() => {
    // Performance monitoring - non-blocking
    if (typeof performance !== 'undefined') {
      performance.mark('app-start')
    }
    
    // Fonts change layout height, so recalculate triggers once they land.
    document.fonts?.ready.then(() => {
      ScrollTrigger.refresh()
      if (typeof performance !== 'undefined') {
        performance.mark('fonts-loaded')
      }
    })
    
    if (reducedMotion()) document.documentElement.classList.add('no-motion')
    
    // Mark app ready - non-blocking
    if (typeof performance !== 'undefined') {
      performance.mark('app-ready')
      performance.measure('app-initialization', 'app-start', 'app-ready')
    }
  }, [])


  return (
    <>
      <ScrollProgress />
      {/* Cursor disabled for performance */}
      {/* <Cursor /> */}
      <a href="#main" className="btn btn--solid sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70]">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Marquee items={marquee} />
        <About />
        <Experience />
        <Stack />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
