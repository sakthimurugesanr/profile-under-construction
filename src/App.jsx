import { useEffect, useState } from 'react'
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
import { useDynamicTitle } from '@/hooks/useDynamicTitle'
import SEO from '@/components/seo/SEO'
import { getAllSchemas } from '@/data/schema'

export default function App() {
  const [isClient, setIsClient] = useState(false)
  
  useScrollReveal() // Enable scroll-triggered animations
  useDynamicTitle() // Enable dynamic page titles based on scroll position

  useEffect(() => {
    setIsClient(true)
    
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

  if (!isClient) {
    return (
      <>
        <SEO 
          schema={getAllSchemas()}
          title="Professional React AI Engineer & MERN Stack Developer"
          description="Professional React AI Engineer and MERN Stack Developer specializing in artificial intelligence, machine learning, and full-stack web development. Expert in building innovative AI-powered applications with React, Node.js, Python, and modern web technologies."
        />
        <div style={{ minHeight: '100vh', background: '#050506' }} />
      </>
    )
  }

  return (
    <>
      <SEO 
        schema={getAllSchemas()}
        title="Professional React AI Engineer & MERN Stack Developer"
        description="Professional React AI Engineer and MERN Stack Developer specializing in artificial intelligence, machine learning, and full-stack web development. Expert in building innovative AI-powered applications with React, Node.js, Python, and modern web technologies."
      />
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
