import { useRef, useEffect, useState } from 'react'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { gsap } from '@/lib/gsap'
import { useRippleEffect } from '@/hooks/useRippleEffect'

export function InteractiveGrid() {
  const gridRef = useRef(null)
  const rippleGridRef = useRippleEffect({ radius: 4, strength: 0.5, duration: 1.5 })
  const cellsRef = useRef([])
  const [mode, setMode] = useState('hover') // 'hover' or 'ripple'
  
  const config = {
    cols: 20,
    rows: 8
  }

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    // Build grid cells
    const totalCells = config.cols * config.rows
    const cells = []
    
    for (let i = 0; i < totalCells; i++) {
      const cell = document.createElement('div')
      cell.className = 'grid-cell'
      cell.textContent = '+'
      
      // Random properties for each cell
      const grade = Math.floor(Math.random() * 12 - 6)
      const opacity = Math.min(Math.random(), 0.3)
      const hue = Math.floor(Math.random() * 60) + 180 // Blue/cyan range
      
      cell.style.setProperty('--grade', grade)
      cell.style.setProperty('--opacity', opacity)
      cell.style.setProperty('--hue', hue)
      
      cells.push(cell)
      grid.appendChild(cell)
    }
    
    cellsRef.current = cells

    // Set grid dimensions
    grid.style.setProperty('--cols', config.cols)
    grid.style.setProperty('--rows', config.rows)

    // Initial wave animation on load
    gsap.fromTo(cells, 
      { 
        opacity: 0,
        scale: 0.5,
      },
      {
        opacity: (i, target) => target.style.getPropertyValue('--opacity') || 0.3,
        scale: 1,
        duration: 0.6,
        stagger: {
          amount: 1.2,
          from: 'center',
          grid: [config.cols, config.rows],
        },
        ease: 'back.out(1.7)',
      }
    )

    // Desktop hover interactions
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      cells.forEach((cell, index) => {
        cell.addEventListener('mouseenter', () => {
          if (mode === 'hover') {
            const col = index % config.cols
            const row = Math.floor(index / config.cols)
            
            // Animate nearby cells
            cells.forEach((nearbyCell, nearbyIndex) => {
              const nearbyCol = nearbyIndex % config.cols
              const nearbyRow = Math.floor(nearbyIndex / config.cols)
              const distance = Math.sqrt(
                Math.pow(col - nearbyCol, 2) + Math.pow(row - nearbyRow, 2)
              )
              
              if (distance <= 2) {
                const strength = 1 - (distance / 2)
                gsap.to(nearbyCell, {
                  rotate: `${nearbyCell.style.getPropertyValue('--grade') * 90 * strength}deg`,
                  filter: `grayscale(${1 - strength}) brightness(${1 + strength * 0.5})`,
                  opacity: 0.5 + strength * 0.5,
                  scale: 1 + strength * 0.2,
                  duration: 0.1,
                })
              }
            })
          }
        })
        
        cell.addEventListener('mouseleave', () => {
          if (mode === 'hover') {
            gsap.to(cell, {
              rotate: '0deg',
              filter: 'grayscale(1)',
              opacity: cell.style.getPropertyValue('--opacity'),
              scale: 1,
              duration: 0.8,
              ease: 'power2.out',
            })
          }
        })
      })
    }

    // Mobile touch interactions
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      let currentHovered = null

      const handleTouchMove = (event) => {
        const touch = event.touches[0]
        const element = document.elementFromPoint(touch.clientX, touch.clientY)
        
        if (element && element.classList.contains('grid-cell')) {
          if (currentHovered && currentHovered !== element) {
            gsap.to(currentHovered, {
              rotate: '0deg',
              filter: 'grayscale(1)',
              opacity: currentHovered.style.getPropertyValue('--opacity'),
              scale: 1,
              duration: 0.5,
            })
          }
          
          gsap.to(element, {
            rotate: `${element.style.getPropertyValue('--grade') * 90}deg`,
            filter: 'grayscale(0) brightness(1.5)',
            opacity: 1,
            scale: 1.2,
            duration: 0,
          })
          
          currentHovered = element
        }
      }

      const handleTouchEnd = () => {
        if (currentHovered) {
          gsap.to(currentHovered, {
            rotate: '0deg',
            filter: 'grayscale(1)',
            opacity: currentHovered.style.getPropertyValue('--opacity'),
            scale: 1,
            duration: 0.8,
          })
          currentHovered = null
        }
      }

      grid.addEventListener('touchmove', handleTouchMove, { passive: true })
      grid.addEventListener('touchend', handleTouchEnd)

      return () => {
        grid.removeEventListener('touchmove', handleTouchMove)
        grid.removeEventListener('touchend', handleTouchEnd)
      }
    }

    // Cleanup
    return () => {
      cells.forEach(cell => cell.remove())
    }
  }, [mode])

  // Merge refs for ripple effect
  const setRefs = (element) => {
    gridRef.current = element
    rippleGridRef.current = element
  }

  return (
    <Section id="interactive" tone="base">
      <SectionHeader
        title="Interactive Experience"
        note="Experience smooth animations and interactions. Hover over cells or click to create ripple effects."
      />
      
      <div className="relative overflow-hidden rounded-lg border border-line bg-ink-950 p-8 md:p-12">
        {/* Mode Toggle */}
        <div className="mb-6 flex items-center justify-center gap-3">
          <button
            onClick={() => setMode('hover')}
            className={`btn ${mode === 'hover' ? 'btn--solid' : 'btn--ghost'} text-xs`}
          >
            Hover Mode
          </button>
          <button
            onClick={() => setMode('ripple')}
            className={`btn ${mode === 'ripple' ? 'btn--solid' : 'btn--ghost'} text-xs`}
          >
            Ripple Mode
          </button>
        </div>

        <div 
          ref={setRefs}
          className="interactive-grid"
          style={{
            display: 'grid',
            gridTemplate: 'repeat(var(--rows), 1fr) / repeat(var(--cols), 1fr)',
            gap: '2px',
            aspectRatio: '2.5 / 1',
            cursor: mode === 'ripple' ? 'pointer' : 'none',
            userSelect: 'none',
          }}
        />
        
        <div className="mt-6 flex flex-col items-center gap-2 text-center">
          <p className="font-mono text-xs text-chalk-muted">
            {mode === 'hover' 
              ? 'Move your cursor across the grid for proximity effects'
              : 'Click anywhere on the grid to create ripple waves'
            }
          </p>
          <p className="font-mono text-[0.65rem] text-chalk-faint">
            Built with GSAP, React & Advanced Animations
          </p>
        </div>
      </div>
    </Section>
  )
}
