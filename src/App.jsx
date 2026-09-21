import { useEffect } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Cursor } from '@/components/ui/Cursor'
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
  useScrollReveal() // Enable scroll-triggered animations
  useDynamicTitle() // Enable dynamic page titles based on scroll position

  useEffect(() => {
    // Fonts change layout height, so recalculate triggers once they land.
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
    if (reducedMotion()) document.documentElement.classList.add('no-motion')
  }, [])

  return (
    <>
      <SEO 
        schema={getAllSchemas()}
        title="Professional React AI Engineer & MERN Stack Developer"
        description="Professional React AI Engineer and MERN Stack Developer specializing in artificial intelligence, machine learning, and full-stack web development. Expert in building innovative AI-powered applications with React, Node.js, Python, and modern web technologies."
      />
      <ScrollProgress />
      <Cursor />
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
