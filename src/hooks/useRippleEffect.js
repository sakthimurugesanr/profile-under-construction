import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'

/**
 * Creates a ripple effect that spreads from interaction point
 * Perfect for the interactive grid to create wave-like animations
 */
export function useRippleEffect({ 
  radius = 3, 
  strength = 1,
  duration = 1.2,
  stagger = 0.05 
} = {}) {
  const containerRef = useRef(null)
  const elementsRef = useRef([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Collect all children elements
    elementsRef.current = Array.from(container.children)

    const handleInteraction = (event) => {
      const rect = container.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      
      // Get container grid dimensions
      const cols = parseInt(getComputedStyle(container).getPropertyValue('--cols') || 10)
      const rows = parseInt(getComputedStyle(container).getPropertyValue('--rows') || 10)
      const cellWidth = rect.width / cols
      const cellHeight = rect.height / rows
      
      // Calculate which cell was clicked
      const clickedCol = Math.floor(x / cellWidth)
      const clickedRow = Math.floor(y / cellHeight)
      const clickedIndex = clickedRow * cols + clickedCol

      // Create ripple effect
      elementsRef.current.forEach((element, index) => {
        const col = index % cols
        const row = Math.floor(index / cols)
        
        // Calculate distance from clicked cell
        const distance = Math.sqrt(
          Math.pow(col - clickedCol, 2) + Math.pow(row - clickedRow, 2)
        )
        
        if (distance <= radius) {
          const delay = distance * stagger
          const scale = 1 + (strength * (1 - distance / radius))
          
          gsap.timeline()
            .to(element, {
              scale: scale,
              opacity: 1,
              filter: 'grayscale(0) brightness(1.5)',
              duration: duration * 0.3,
              delay: delay,
              ease: 'power2.out',
            })
            .to(element, {
              scale: 1,
              opacity: element.style.getPropertyValue('--opacity') || 0.5,
              filter: 'grayscale(1)',
              duration: duration * 0.7,
              ease: 'power2.in',
            })
        }
      })
    }

    container.addEventListener('click', handleInteraction)
    
    return () => {
      container.removeEventListener('click', handleInteraction)
    }
  }, [radius, strength, duration, stagger])

  return containerRef
}
