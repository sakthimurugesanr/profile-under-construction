/**
 * Performance Monitoring and Optimization Utilities
 * Addresses Lighthouse performance and best practices issues
 */

// Core Web Vitals monitoring (simplified version without external dependency)
export const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Basic performance metrics without external web-vitals library
    if (typeof performance !== 'undefined') {
      // Report basic timing metrics
      const timing = performance.timing
      if (timing) {
        const pageLoadTime = timing.loadEventEnd - timing.navigationStart
        const domContentLoaded = timing.domContentLoadedEventEnd - timing.navigationStart
        
        onPerfEntry({
          name: 'pageLoadTime',
          value: pageLoadTime,
          id: 'page-load'
        })
        
        onPerfEntry({
          name: 'domContentLoaded',
          value: domContentLoaded,
          id: 'dom-content-loaded'
        })
      }
    }
  }
}

// Performance timing utilities
export const measurePerformance = (name, fn) => {
  if (typeof performance !== 'undefined' && performance.mark) {
    const startMark = `${name}-start`
    const endMark = `${name}-end`
    const measureName = `${name}-measure`

    performance.mark(startMark)
    const result = fn()
    performance.mark(endMark)
    performance.measure(measureName, startMark, endMark)

    // Clean up marks
    performance.clearMarks(startMark)
    performance.clearMarks(endMark)

    return result
  }
  return fn()
}

// Resource timing monitoring
export const getResourceTiming = () => {
  if (typeof performance !== 'undefined' && performance.getEntriesByType) {
    const resources = performance.getEntriesByType('resource')
    return {
      totalResources: resources.length,
      slowResources: resources.filter(r => r.duration > 1000).length,
      largeResources: resources.filter(r => r.transferSize > 100000).length,
    }
  }
  return null
}

// Memory monitoring (where available)
export const getMemoryInfo = () => {
  if (typeof performance !== 'undefined' && performance.memory) {
    return {
      usedJSHeapSize: performance.memory.usedJSHeapSize,
      totalJSHeapSize: performance.memory.totalJSHeapSize,
      jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
    }
  }
  return null
}

// Performance marks for custom measurements
export const markPerformance = (name) => {
  if (typeof performance !== 'undefined' && performance.mark) {
    performance.mark(name)
  }
}

export const measureCustomPerformance = (name, startMark, endMark) => {
  if (typeof performance !== 'undefined' && performance.measure) {
    performance.measure(name, startMark, endMark)
  }
}

// Debounce utility for performance optimization
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Throttle utility for performance optimization
export const throttle = (func, limit) => {
  let inThrottle
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Request animation frame throttle
export const rafThrottle = (callback) => {
  let ticking = false
  return (...args) => {
    if (!ticking) {
      requestAnimationFrame(() => {
        callback(...args)
        ticking = false
      })
      ticking = true
    }
  }
}

// Intersection observer with performance optimization
export const createPerformanceObserver = (callback, options = {}) => {
  const defaultOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  }

  return new IntersectionObserver(callback, { ...defaultOptions, ...options })
}

// Preload critical resources
export const preloadResource = (href, as) => {
  const link = document.createElement('link')
  link.rel = 'preload'
  link.href = href
  link.as = as
  document.head.appendChild(link)
}

// Prefetch non-critical resources
export const prefetchResource = (href) => {
  const link = document.createElement('link')
  link.rel = 'prefetch'
  link.href = href
  document.head.appendChild(link)
}