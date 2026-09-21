import { useState, useRef, useEffect } from 'react'

/**
 * Optimized Image Component with lazy loading and performance optimization
 * Addresses Lighthouse performance issues related to images
 */
export function OptimizedImage({ 
  src, 
  alt, 
  className = '', 
  loading = 'lazy',
  fetchPriority = 'auto',
  width = 'auto',
  height = 'auto',
  ...props 
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const placeholderStyle = {
    backgroundColor: '#1a1a1a',
    width: width === 'auto' ? '100%' : width,
    height: height === 'auto' ? '100%' : height,
    minHeight: height === 'auto' ? '300px' : height,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }

  return (
    <div ref={imgRef} className={`image-optimizer ${className}`} {...props}>
      {isInView && (
        <img
          src={src}
          alt={alt}
          loading={loading}
          fetchPriority={fetchPriority}
          width={width}
          height={height}
          onLoad={handleLoad}
          className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ 
            width: '100%', 
            height: 'auto',
            display: 'block',
            objectFit: 'cover'
          }}
          decoding="async"
        />
      )}
      {!isLoaded && (
        <div 
          className="image-placeholder"
          style={placeholderStyle}
        />
      )}
    </div>
  )
}