import { useCallback } from "react"
import Particles from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"

/**
 * Simple Particle Background
 * Lightweight floating particles effect - optimized for performance
 */
export default function SimpleParticles() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine)
  }, [])

  const options = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 30, // Reduced from 60 for better performance
    particles: {
      color: {
        value: "#ff6b35", // Red/orange color
      },
      links: {
        enable: false, // No connections between particles
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: true,
        speed: 0.3, // Reduced from 0.5 for better performance
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 1200, // Increased area to reduce particle count
        },
        value: 40, // Reduced from 80 for better performance
      },
      opacity: {
        value: 0.3, // Reduced from 0.5 for better performance
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 2 }, // Reduced size for better performance
      },
    },
    detectRetina: false, // Disabled for better performance
  }

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={options}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  )
}
