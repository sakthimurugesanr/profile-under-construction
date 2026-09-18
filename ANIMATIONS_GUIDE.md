# Advanced GSAP Animations & Parallax Effects Guide

## Overview
This portfolio now features advanced GSAP animations and parallax effects throughout, creating a smooth, professional, and engaging user experience.

## New Animation Hooks Created

### 1. **useSplitText** (`src/hooks/useSplitText.js`)
Splits text into characters or words and animates them individually.
- **Types**: chars, words, lines
- **Animations**: fadeUp, fadeIn, scale, rotate
- **Use case**: Hero titles, section headings

### 2. **useMagneticEffect** (`src/hooks/useMagneticEffect.js`)
Creates a magnetic effect where elements follow the cursor when nearby.
- **Parameters**: strength (0-1), speed
- **Use case**: Buttons, logos, interactive elements
- **Applied to**: Header logo, CTA buttons, Hero buttons

### 3. **useScrollProgress** (`src/hooks/useScrollProgress.js`)
Creates a scroll progress indicator tied to scroll position.
- **Parameters**: start, end, scrub, onUpdate callback
- **Use case**: Page progress bar
- **Applied to**: Top of page (ScrollProgress component)

### 4. **use3DParallax** (`src/hooks/use3DParallax.js`)
Creates 3D parallax effects with rotation based on scroll.
- **Parameters**: rotateX, rotateY, translateZ
- **Use case**: Feature cards, hero sections
- **Effect**: Elements tilt and move in 3D space as you scroll

### 5. **useHoverTilt** (`src/hooks/useHoverTilt.js`)
Creates a tilt effect based on mouse position over an element.
- **Parameters**: max tilt angle, perspective, scale, speed
- **Use case**: Cards, panels, interactive elements
- **Applied to**: Stack cards, Project cards

### 6. **useRippleEffect** (`src/hooks/useRippleEffect.js`)
Creates ripple wave effects that spread from interaction point.
- **Parameters**: radius, strength, duration, stagger
- **Use case**: Interactive grids, click effects
- **Applied to**: Interactive Grid section

## Enhanced Components

### Hero Section (`src/components/sections/Hero.jsx`)
- **Enhanced name animation** with 3D rotation effect
- **Magnetic buttons** that follow cursor
- **Improved timeline** with back easing and scale effects
- **Staggered facts animation** with bounce effect

### Projects Section (`src/components/sections/Projects.jsx`)
- **Hover tilt effect** on project cards (3D tilt following mouse)
- **Staggered tag animations**
- **Animated project numbers** with scale-in effect
- **Enhanced card hover** with smooth transitions

### Stack Section (`src/components/sections/Stack.jsx`)
- **Hover tilt effect** on stack cards
- **Cascading tag animations**
- **Staggered card reveal** with delays
- **Smooth 3D interactions**

### Experience Section (`src/components/sections/Experience.jsx`)
- **Scroll-triggered role animations**
- **Staggered content reveal** for each role
- **Animated bullet points** sliding in from left
- **Pulsing "Current role" indicator**

### Header (`src/components/layout/Header.jsx`)
- **Magnetic logo effect**
- **Magnetic CTA button**
- **Smooth active state transitions** with scale
- **Animated mobile menu** with staggered items

### New: ScrollProgress Component (`src/components/ui/ScrollProgress.jsx`)
- Fixed progress bar at top of page
- Gradient effect (white to chalk)
- Smooth scrub animation
- Non-intrusive (1px height)

### New: InteractiveGrid Section (`src/components/sections/InteractiveGrid.jsx`)
- **Two modes**: Hover mode and Ripple mode
- **Hover mode**: Proximity-based animations affecting nearby cells
- **Ripple mode**: Click to create wave effects spreading outward
- **Initial animation**: Staggered entrance from center
- **Mobile support**: Touch-based interactions
- **Dynamic grid**: 20x8 responsive grid with random properties
- **Smooth transitions**: GSAP-powered animations
- Showcases advanced animation techniques and interactivity

### New: SkillsShowcase Section (`src/components/sections/SkillsShowcase.jsx`) 🆕
- **Scroll-driven crossfades**: Images fade in/out based on scroll position
- **Vertical translation**: Smaller image container moves along larger one
- **Progress indicators**: Visual feedback showing scroll progress
- **Three skill areas**: Frontend, Backend, and Fullstack
- **Mix blend modes**: `plus-lighter` for smooth color transitions
- **Responsive design**: Side-by-side on desktop, stacked on mobile
- **GSAP ScrollTrigger**: Perfect scroll synchronization
- Inspired by modern CSS Pro techniques

## CSS Animations Added

### New Keyframes in `theme.css`
1. **fadeInUp** - Fade and slide from bottom
2. **fadeInLeft** - Fade and slide from left
3. **fadeInRight** - Fade and slide from right
4. **scaleIn** - Scale from small to normal
5. **rotateIn** - Rotate and fade in
6. **slideInBottom** - Slide from bottom edge
7. **bounceIn** - Bounce entrance effect
8. **float** - Continuous floating animation
9. **pulse** - Pulsing opacity effect

### Utility Classes
- `.animate-fade-up` - Quick fade up animation
- `.animate-fade-left` - Quick fade left animation
- `.animate-fade-right` - Quick fade right animation
- `.animate-scale-in` - Quick scale in animation
- `.animate-rotate-in` - Quick rotate in animation
- `.animate-float` - Infinite floating animation
- `.animate-pulse` - Infinite pulse animation

### 3D Transform Utilities
- `.preserve-3d` - Enable 3D transformations
- `.perspective-1000` - Set perspective for 3D effects
- `.backface-hidden` - Hide back face of elements
- `.transform-gpu` - Hardware acceleration

## Enhanced GSAP Configuration (`src/lib/gsap.js`)

### Custom Easing Presets
```javascript
smooth: 'power2.out'
elastic: 'elastic.out(1, 0.5)'
bounce: 'bounce.out'
expo: 'expo.out'
back: 'back.out(1.7)'
slowmo: 'slow(0.7, 0.7, false)'
```

### Animation Config Presets
- `fadeUp` - Standard fade and slide up
- `fadeLeft` - Slide from left with fade
- `fadeRight` - Slide from right with fade
- `scaleIn` - Scale with back easing
- `rotateIn` - Rotate with fade
- `clipReveal` - Clip path reveal effect

## Performance Optimizations

1. **Reduced Motion Support**
   - All animations respect `prefers-reduced-motion`
   - Graceful fallbacks for accessibility

2. **Coarse Pointer Detection**
   - Lighter effects on touch devices
   - Magnetic effects disabled on mobile

3. **GPU Acceleration**
   - Using `transform` instead of position properties
   - `will-change` hints for smooth animations

4. **Smart Triggering**
   - `once: true` for entrance animations
   - Lazy loading with ScrollTrigger
   - Context cleanup to prevent memory leaks

## Usage Examples

### Apply magnetic effect to a button:
```jsx
import { useMagneticEffect } from '@/hooks/useMagneticEffect'

function MyButton() {
  const magneticRef = useMagneticEffect({ strength: 0.3, speed: 0.4 })
  return <button ref={magneticRef}>Click me</button>
}
```

### Apply hover tilt to a card:
```jsx
import { useHoverTilt } from '@/hooks/useHoverTilt'

function MyCard() {
  const tiltRef = useHoverTilt({ max: 15, scale: 1.05 })
  return <div ref={tiltRef}>Card content</div>
}
```

### Add CSS animation to an element:
```jsx
<div className="animate-fade-up">Animated content</div>

// Or with inline animation
<div style={{ animation: 'fadeInUp 0.6s ease-out' }}>Content</div>
```

## Testing the Animations

1. **Run the development server:**
   ```bash
   npm run dev
   ```

2. **Test scenarios:**
   - Scroll through the page to see scroll-triggered animations
   - Hover over cards to see tilt effects
   - Move cursor near buttons to see magnetic effects
   - Check mobile menu animation
   - Watch the scroll progress bar at the top
   - Verify reduced motion mode (browser settings)

## Browser Compatibility

- Chrome/Edge: Full support ✓
- Firefox: Full support ✓
- Safari: Full support ✓
- Mobile browsers: Optimized effects ✓

## Future Enhancement Ideas

1. **Page transitions** between sections
2. **Cursor follower** with custom shapes
3. **Smooth scroll locomotive**
4. **Mouse-reactive backgrounds**
5. **SVG path animations**
6. **Text scramble effects**
7. **Particle systems**
8. **Morphing shapes**

---

**All animations are production-ready and optimized for performance!** 🚀
