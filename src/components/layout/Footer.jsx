import { useRef, useEffect } from 'react'
import { useParallax } from '@/hooks/useParallax'
import { gsap } from '@/lib/gsap'
import { profile } from '@/data/site'

export function Footer() {
  const nameRef = useParallax({ distance: -50, from: 0, start: 'top bottom', end: 'bottom top', lag: 0.4 })
  const lineRef = useParallax({ distance: 30, from: -30, start: 'top bottom', end: 'bottom top', lag: 0.6 })
  const scrambleRef = useRef(null)

  useEffect(() => {
    const element = scrambleRef.current
    if (!element) return

    const originalText = 'SAKTHI'
    const scrambleChars = '§¶•†‡ÆØÅÑ∆∫ƒ©˙∂∑∏'
    let animationFrameId = null
    let isScrambling = false
    let audioModule = null
    let hasUserInteracted = false

    // Preload audio file
    const preloadAudio = async () => {
      try {
        const module = await import('@/assets/glitch/sakthi-glitch.mp3')
        audioModule = module
      } catch (err) {
        // Audio preload failed
      }
    }

    // Detect user interaction to enable audio
    const handleUserInteraction = () => {
      hasUserInteracted = true
    }

    // Add interaction listeners early
    document.addEventListener('click', handleUserInteraction, { once: true })
    document.addEventListener('keydown', handleUserInteraction, { once: true })
    document.addEventListener('touchstart', handleUserInteraction, { once: true })
    document.addEventListener('scroll', handleUserInteraction, { once: true })

    // Preload audio immediately
    preloadAudio()

    // Play glitch sound from your custom file
    const playGlitchSound = async () => {
      try {
        // Wait a tiny bit to ensure user interaction is registered
        await new Promise(resolve => setTimeout(resolve, 50))
        
        // Use preloaded module or load dynamically
        const module = audioModule || (await import('@/assets/glitch/sakthi-glitch.mp3'))
        
        const audio = new Audio(module.default)
        audio.volume = 0.4
        
        // Try to play with better error handling
        const playPromise = audio.play()
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Audio playing successfully
            })
            .catch(err => {
              // Silently fail - user will see animation without sound
            })
        }
      } catch (error) {
        // Audio error occurred
      }
    }

    const scrambleText = (duration, callback) => {
      if (isScrambling) return
      isScrambling = true
      
      // Play glitch sound when scramble starts
      playGlitchSound()
      
      const startTime = Date.now()
      const scramble = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        if (progress < 1) {
          const scrambled = originalText
            .split('')
            .map(() => scrambleChars[Math.floor(Math.random() * scrambleChars.length)])
            .join('')
          element.textContent = scrambled
          animationFrameId = requestAnimationFrame(scramble)
        } else {
          isScrambling = false
          if (callback) callback()
        }
      }
      scramble()
    }

    const revealText = (duration) => {
      const startTime = Date.now()
      const reveal = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        const revealedCount = Math.floor(progress * originalText.length)
        const revealed = originalText.slice(0, revealedCount)
        const scrambled = originalText
          .slice(revealedCount)
          .split('')
          .map(() => scrambleChars[Math.floor(Math.random() * scrambleChars.length)])
          .join('')
        
        element.textContent = revealed + scrambled
        
        if (progress < 1) {
          animationFrameId = requestAnimationFrame(reveal)
        } else {
          element.textContent = originalText
        }
      }
      reveal()
    }

    // Observer to trigger animation when footer is in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Scramble for 500ms, then reveal for 1000ms
            scrambleText(500, () => {
              setTimeout(() => {
                revealText(1000)
              }, 100)
            })
          }
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
      // Clean up interaction listeners
      document.removeEventListener('click', handleUserInteraction)
      document.removeEventListener('keydown', handleUserInteraction)
      document.removeEventListener('touchstart', handleUserInteraction)
      document.removeEventListener('scroll', handleUserInteraction)
    }
  }, [])

  return (
    <footer className="footer-container">
      {/* Parallax Background Line */}
      <div ref={lineRef} className="footer-line" />
      
      {/* Main Content */}
      <div className="footer-content">
        {/* Large Name Display */}
        <div className="footer-name-section">
          <h2 ref={(el) => {
            nameRef.current = el
            scrambleRef.current = el
          }} className="footer-name">
            SAKTHI
          </h2>
        </div>

        {/* Footer Info */}
        <div className="footer-info">
          <div className="footer-grid">
            {/* Left Column */}
            <div className="footer-column">
              <p className="footer-text">
                Fullstack Developer specializing in React, Node.js, and modern web technologies.
              </p>
              <p className="footer-copyright">
                © {new Date().getFullYear()} Sakthi Murugesan. All rights reserved.
              </p>
            </div>

            {/* Right Column */}
            <div className="footer-column">
              <h3 className="footer-heading">Connect</h3>
              <div className="footer-links">
                <a 
                  href={profile.links.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  GitHub
                </a>
                <a 
                  href={profile.links.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  LinkedIn
                </a>
                <a 
                  href={`mailto:${profile.email}`}
                  className="footer-link"
                >
                  Email
                </a>
                <a href="#top" className="footer-link">
                  Back to Top ↑
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Credit */}
      <div className="footer-bottom">
        <p className="footer-credit">
          Designed & Built with ❤️ by Sakthi Murugesan
        </p>
      </div>
    </footer>
  )
}
