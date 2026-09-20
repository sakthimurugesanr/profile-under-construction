/**
 * Simple Red Dots Background
 * Creates a pattern of red dots in the background
 */
export function RedDots() {
  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `radial-gradient(circle, rgba(255, 107, 53, 0.4) 2px, transparent 2px)`,
        backgroundSize: '50px 50px',
        backgroundPosition: '0 0, 25px 25px',
        opacity: 0.6,
      }}
      aria-hidden="true"
    />
  )
}
