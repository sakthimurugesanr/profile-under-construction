import { useEffect, useRef } from 'react'

/**
 * Animated Spider Web Network Background
 * Creates an interactive network of nodes and connections that responds to mouse movement.
 * 
 * Features:
 * - 80 animated nodes that move and bounce within viewport
 * - Dynamic connections between nearby nodes
 * - Interactive connections to mouse cursor with glow effects
 * - Uses canvas for high-performance rendering
 * - Fixed at z-index 0 to stay behind all content
 * 
 * @component
 */
export function SpiderWeb() {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const nodesRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const container = canvas.parentElement
    let width = container.clientWidth
    let height = container.clientHeight
    
    // Node configuration - HIGHLY VISIBLE WITH BRIGHT COLORS
    const config = {
      nodeCount: 100, // More nodes for better coverage
      nodeSize: 5, // Even larger nodes
      connectionDistance: 220,
      mouseDistance: 280,
      nodeSpeed: 0.6,
      nodeColor: 'rgba(255, 255, 255, 0.8)', // BRIGHT WHITE nodes
      lineColor: 'rgba(255, 140, 66, 0.3)', // Orange lines
      mouseLineColor: 'rgba(255, 107, 53, 0.9)', // Bright orange on hover
    }

    // Set canvas size to container
    const resizeCanvas = () => {
      width = container.clientWidth
      height = container.clientHeight
      canvas.width = width
      canvas.height = height
    }

    // Node class
    class Node {
      constructor() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.vx = (Math.random() - 0.5) * config.nodeSpeed
        this.vy = (Math.random() - 0.5) * config.nodeSpeed
        this.radius = config.nodeSize
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        // Bounce off edges
        if (this.x < 0 || this.x > width) {
          this.vx *= -1
          this.x = Math.max(0, Math.min(width, this.x))
        }
        if (this.y < 0 || this.y > height) {
          this.vy *= -1
          this.y = Math.max(0, Math.min(height, this.y))
        }
      }

      draw() {
        // Draw bright white node
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = config.nodeColor
        ctx.fill()
        
        // Add bright glow
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius * 2.5, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'
        ctx.fill()
        
        // Add orange outer glow
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius * 4, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255, 140, 66, 0.15)'
        ctx.fill()
      }
    }

    // Initialize nodes
    const initNodes = () => {
      nodesRef.current = []
      for (let i = 0; i < config.nodeCount; i++) {
        nodesRef.current.push(new Node())
      }
    }

    // Draw connections between nodes
    const drawConnections = () => {
      const nodes = nodesRef.current

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < config.connectionDistance) {
            const opacity = (1 - distance / config.connectionDistance) * 0.4
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(255, 140, 66, ${opacity})`
            ctx.lineWidth = 1.5
            ctx.stroke()
          }
        }
      }
    }

    // Draw connections to mouse
    const drawMouseConnections = () => {
      const mouseX = mouseRef.current.x
      const mouseY = mouseRef.current.y
      const nodes = nodesRef.current

      for (let i = 0; i < nodes.length; i++) {
        const dx = nodes[i].x - mouseX
        const dy = nodes[i].y - mouseY
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < config.mouseDistance) {
          const opacity = (1 - distance / config.mouseDistance) * 0.6
          
          // Draw line
          ctx.beginPath()
          ctx.moveTo(nodes[i].x, nodes[i].y)
          ctx.lineTo(mouseX, mouseY)
          ctx.strokeStyle = `rgba(255, 140, 66, ${opacity})`
          ctx.lineWidth = 2
          ctx.stroke()

          // Glow node
          ctx.beginPath()
          ctx.arc(nodes[i].x, nodes[i].y, config.nodeSize * 3, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 140, 66, ${opacity * 0.3})`
          ctx.fill()
        }
      }

      // Draw mouse node
      ctx.beginPath()
      ctx.arc(mouseX, mouseY, config.nodeSize * 2, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(255, 107, 53, 1)' // Bright solid orange
      ctx.shadowBlur = 20
      ctx.shadowColor = 'rgba(255, 107, 53, 1)'
      ctx.fill()
      ctx.shadowBlur = 0
    }

    // Animation loop
    const animate = () => {
      // Clear canvas completely - fully transparent background
      ctx.clearRect(0, 0, width, height)

      // Draw connections first (behind nodes)
      drawConnections()
      drawMouseConnections()

      // Update and draw nodes on top
      nodesRef.current.forEach(node => {
        node.update()
        node.draw()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    // Event listeners
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    const handleResize = () => {
      resizeCanvas()
      initNodes()
    }

    // Initialize
    resizeCanvas()
    initNodes()
    
    animate()

    // Attach listeners
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="spider-web-canvas"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none', // Allow clicks to pass through
        opacity: 1, // Fully visible
      }}
      aria-hidden="true" // Decorative element, hide from screen readers
    />
  )
}
