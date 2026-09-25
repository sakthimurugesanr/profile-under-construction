import { useRef, useEffect } from 'react'
import { useParallax } from '@/hooks/useParallax'
import { gsap, reducedMotion } from '@/lib/gsap'
import { profile } from '@/data/site'
import glitchSound from '@/assets/glitch/sakthi-glitch.mp3'

export function Footer() {
  const nameRef = useParallax({ distance: -50, from: 0, start: 'top bottom', end: 'bottom top', lag: 0.4 })
  const lineRef = useParallax({ distance: 30, from: -30, start: 'top bottom', end: 'bottom top', lag: 0.6 })
  const scrambleRef = useRef(null)
  const audioRef = useRef(null)

  useEffect(() => {
    // Audio is fetched only when the footer effect actually plays.
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    const element = scrambleRef.current
    if (!element || reducedMotion()) return

    const originalText = 'SAKTHI'
    const scrambleChars = '§¶•†‡ÆØÅÑ∆∫ƒ©˙∂∑∏πµΩ≈ç√∫˜≤≥÷'
    let animationFrameId = null
    let isScrambling = false
    let isInView = false

    // Play glitch sound
    const playGlitchSound = () => {
      if (!audioRef.current) {
        audioRef.current = new Audio(glitchSound)
        audioRef.current.preload = 'none'
      }
      
      try {
        // Clone audio for immediate playback (allows multiple plays)
        const audio = audioRef.current
        audio.currentTime = 0
        audio.volume = 0.5
        
        const playPromise = audio.play()
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Silently handle autoplay restrictions
          })
        }
      } catch (error) {
        // Silent fail
      }
    }

    const scrambleText = (duration, callback) => {
      if (isScrambling) return
      isScrambling = true
      
      // Play glitch sound at the start
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
          
          // Add glitch visual effect
          element.style.transform = `translateX(${(Math.random() - 0.5) * 4}px)`
          
          animationFrameId = requestAnimationFrame(scramble)
        } else {
          element.style.transform = 'translateX(0)'
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

    const triggerAnimation = () => {
      // Cancel any ongoing animation
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
      
      // Scramble for 400ms, then reveal for 800ms
      scrambleText(400, () => {
        setTimeout(() => {
          revealText(800)
        }, 50)
      })
    }

    // Observer to trigger animation EVERY TIME footer comes into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isInView) {
            // Just entered view - trigger animation
            isInView = true
            triggerAnimation()
          } else if (!entry.isIntersecting && isInView) {
            // Just left view - reset state
            isInView = false
            // Reset text to original
            if (!isScrambling) {
              element.textContent = originalText
            }
          }
        })
      },
      { 
        threshold: 0.2, 
        rootMargin: '0px 0px -100px 0px' 
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
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
                AI Engineer & MERN Stack Developer building applications with React, Node.js and Python.
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
