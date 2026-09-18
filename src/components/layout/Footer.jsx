import { useRef } from 'react'
import { useParallax } from '@/hooks/useParallax'
import { profile } from '@/data/site'

export function Footer() {
  const nameRef = useParallax({ distance: -50, from: 0, start: 'top bottom', end: 'bottom top', lag: 0.4 })
  const lineRef = useParallax({ distance: 30, from: -30, start: 'top bottom', end: 'bottom top', lag: 0.6 })

  return (
    <footer className="footer-container">
      {/* Parallax Background Line */}
      <div ref={lineRef} className="footer-line" />
      
      {/* Main Content */}
      <div className="footer-content">
        {/* Large Name Display */}
        <div className="footer-name-section">
          <h2 ref={nameRef} className="footer-name">
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
