import { useEffect, useRef } from 'react'

/** A decorative, hero-scoped silk web. No pointer interception or global listeners. */
export function HeroSpiderWeb() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const hero = canvas.closest('section')
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const motion = matchMedia('(prefers-reduced-motion: reduce)')
    const pointer = matchMedia('(hover: hover) and (pointer: fine)')
    let width = 0, height = 0, frame = 0, visible = true
    let x = 0, y = 0, targetX = 0, targetY = 0, phase = 0
    const spokes = 18
    const point = (index, radius) => {
      const angle = index / spokes * Math.PI * 2
      return [width * .73 + Math.cos(angle) * radius, height * .33 + Math.sin(angle) * radius * .78]
    }
    const draw = () => {
      frame = 0
      if (!visible || document.hidden) return
      const dx = targetX - x, dy = targetY - y
      const moving = Math.abs(dx) + Math.abs(dy) > .5
      x += dx * .085; y += dy * .085
      if (moving) phase += .17
      ctx.clearRect(0, 0, width, height)
      const radius = Math.max(width, height) * .85
      ctx.lineWidth = .7
      ctx.strokeStyle = 'rgba(190,198,214,.16)'
      for (let i = 0; i < spokes; i++) {
        const [px, py] = point(i, radius)
        ctx.beginPath(); ctx.moveTo(width * .73, height * .33); ctx.lineTo(px, py); ctx.stroke()
      }
      for (let ring = 1; ring <= 11; ring++) {
        const r = radius * ring / 11
        ctx.beginPath()
        for (let i = 0; i < spokes; i++) {
          const a = point(i, r), b = point(i + 1, r)
          if (!i) ctx.moveTo(...a)
          // Sagging silk between radial strands, with gentle deterministic irregularity.
          const sag = .045 + Math.sin(i * 3 + ring) * .018
          ctx.quadraticCurveTo((a[0] + b[0]) / 2 + (width * .73 - (a[0] + b[0]) / 2) * sag,
            (a[1] + b[1]) / 2 + (height * .33 - (a[1] + b[1]) / 2) * sag, ...b)
        }
        ctx.closePath(); ctx.stroke()
      }
      ctx.strokeStyle = 'rgba(224,225,232,.38)'
      ctx.beginPath(); ctx.moveTo(width * .73, height * .33); ctx.lineTo(x, y); ctx.stroke()
      ctx.save(); ctx.translate(x, y)
      const size = width < 768 ? .7 : 1
      ctx.scale(size, size)
      ctx.strokeStyle = '#a9a2a0'; ctx.lineWidth = 1.5; ctx.lineCap = 'round'
      for (const side of [-1, 1]) {
        for (let leg = 0; leg < 4; leg++) {
          const bend = moving ? Math.sin(phase + leg * 1.5 + side) * 3 : 0
          const start = (leg - 1.5) * 4
          ctx.beginPath(); ctx.moveTo(side * 4, start)
          ctx.lineTo(side * (15 + (leg % 2) * 3), start * 2 + bend)
          ctx.lineTo(side * (21 + (leg % 2) * 2), start * 3 + 8 + bend)
          ctx.stroke()
        }
      }
      ctx.fillStyle = '#292326'; ctx.strokeStyle = '#d59165'; ctx.lineWidth = 1
      ctx.beginPath(); ctx.ellipse(0, 5, 6, 9, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
      ctx.beginPath(); ctx.ellipse(0, -5, 4.5, 5, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
      ctx.restore()
      if (moving && !motion.matches && pointer.matches) frame = requestAnimationFrame(draw)
    }
    const schedule = () => { if (!frame && visible && !document.hidden) frame = requestAnimationFrame(draw) }
    const resize = () => {
      width = hero.clientWidth; height = hero.clientHeight
      const dpr = Math.min(devicePixelRatio || 1, 2)
      canvas.width = width * dpr; canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      x = targetX = width * .78; y = targetY = height * .25
      schedule()
    }
    const move = event => {
      if (motion.matches || !pointer.matches || event.pointerType === 'touch') return
      const rect = hero.getBoundingClientRect()
      targetX = Math.max(25, Math.min(width - 25, event.clientX - rect.left))
      targetY = Math.max(25, Math.min(height - 25, event.clientY - rect.top))
      schedule()
    }
    const reset = () => { targetX = width * .78; targetY = height * .25; schedule() }
    const visibility = () => { if (document.hidden) { cancelAnimationFrame(frame); frame = 0 } else schedule() }
    const observer = new ResizeObserver(resize)
    observer.observe(hero)
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) schedule()
      else { cancelAnimationFrame(frame); frame = 0 }
    })
    intersection.observe(hero)
    hero.addEventListener('pointermove', move, { passive: true })
    hero.addEventListener('pointerleave', reset)
    motion.addEventListener('change', resize)
    pointer.addEventListener('change', resize)
    document.addEventListener('visibilitychange', visibility)
    resize()
    return () => {
      cancelAnimationFrame(frame); observer.disconnect(); intersection.disconnect()
      hero.removeEventListener('pointermove', move); hero.removeEventListener('pointerleave', reset)
      motion.removeEventListener('change', resize); pointer.removeEventListener('change', resize)
      document.removeEventListener('visibilitychange', visibility)
    }
  }, [])
  return <canvas ref={canvasRef} className="hero-spider-web" aria-hidden="true" />
}
