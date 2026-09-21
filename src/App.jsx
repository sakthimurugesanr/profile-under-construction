import { useEffect, lazy, Suspense } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Cursor } from '@/components/ui/Cursor'
import { Marquee } from '@/components/ui/Marquee'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { Hero } from '@/components/sections/Hero'
import { marquee } from '@/data/site'
import { ScrollTrigger, reducedMotion } from '@/lib/gsap'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useDynamicTitle } from '@/hooks/useDynamicTitle'
import SEO from '@/components/seo/SEO'
import { getAllSchemas } from '@/data/schema'
import { markPerformance, measureCustomPerformance } from '@/lib/performance'

// Lazy load sections for better performance
const About = lazy(() => import('@/components/sections/About').then(m => ({ default: m.default })))
const Stack = lazy(() => import('@/components/sections/Stack').then(m => ({ default: m.default })))
const Experience = lazy(() => import('@/components/sections/Experience').then(m => ({ default: m.default })))
const Projects = lazy(() => import('@/components/sections/Projects').then(m => ({ default: m.default })))
const Education = lazy(() => import('@/components/sections/Education').then(m => ({ default: m.default })))
const Contact = lazy(() => import('@/components/sections/Contact').then(m => ({ default: m.default })))

// Loading fallback component
const SectionLoader = () => (
  <div className="flex items-center justify-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
  </div>
)

export default function App() {
  useScrollReveal() // Enable scroll-triggered animations
  useDynamicTitle() // Enable dynamic page titles based on scroll position

  useEffect(() => {
    // Performance monitoring
    markPerformance('app-start')
    
    // Fonts change layout height, so recalculate triggers once they land.
    document.fonts?.ready.then(() => {
      ScrollTrigger.refresh()
      markPerformance('fonts-loaded')
    })
    
    if (reducedMotion()) document.documentElement.classList.add('no-motion')
    
    // Mark app ready
    markPerformance('app-ready')
    measureCustomPerformance('app-initialization', 'app-start', 'app-ready')
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
        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Stack />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Education />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
