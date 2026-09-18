import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'

gsap.registerPlugin(ScrollTrigger, CustomEase)

/** True when the visitor has asked the OS for less movement. */
export const reducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Coarse pointers (phones, tablets) get lighter parallax and no cursor. */
export const coarsePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

// Advanced GSAP easing presets
export const customEases = {
  smooth: 'power2.out',
  elastic: 'elastic.out(1, 0.5)',
  bounce: 'bounce.out',
  expo: 'expo.out',
  back: 'back.out(1.7)',
  slowmo: 'slow(0.7, 0.7, false)',
}

// Animation configuration presets
export const animationConfig = {
  // Fade and slide up
  fadeUp: {
    from: { opacity: 0, y: 40 },
    to: { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
  },
  // Fade and slide from left
  fadeLeft: {
    from: { opacity: 0, x: -60 },
    to: { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' },
  },
  // Fade and slide from right
  fadeRight: {
    from: { opacity: 0, x: 60 },
    to: { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' },
  },
  // Scale in with fade
  scaleIn: {
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' },
  },
  // Rotate and fade in
  rotateIn: {
    from: { opacity: 0, rotation: -10, scale: 0.9 },
    to: { opacity: 1, rotation: 0, scale: 1, duration: 1, ease: 'power3.out' },
  },
  // Clip path reveal
  clipReveal: {
    from: { clipPath: 'inset(100% 0% 0% 0%)' },
    to: { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power4.out' },
  },
}

// Utility to create staggered animations
export const createStagger = (amount = 0.1, from = 'start') => ({
  amount,
  from,
  ease: 'power2.out',
})

export { gsap, ScrollTrigger, CustomEase }
