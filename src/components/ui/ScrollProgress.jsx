import { useScrollProgress } from '@/hooks/useScrollProgress'

/**
 * Fixed scroll progress bar at the top of the page
 */
export function ScrollProgress() {
  const progressRef = useScrollProgress({ 
    start: 'top top', 
    end: 'bottom bottom',
    scrub: 0.3 
  })

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-transparent pointer-events-none">
      <div
        ref={progressRef}
        className="h-full bg-gradient-to-r from-white via-chalk to-white origin-left"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}
