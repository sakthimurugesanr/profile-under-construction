# Z-Index Layering System

This document describes the z-index layering hierarchy used throughout the application to ensure proper stacking of elements.

## Layer Hierarchy (Bottom to Top)

### Layer 0: Background Effects
- **Spider Web Canvas**: `z-index: 0`
  - Fixed position animated canvas background
  - Interactive node network that responds to mouse movement
  - Uses `mixBlendMode: screen` for ethereal blending
  - `pointerEvents: none` to allow clicks through
  - Location: `src/components/ui/SpiderWeb.jsx`

### Layer 1: Content Sections
- **All Sections, Header, Footer, Main**: `z-index: 1` (via CSS)
  - Defined globally in `src/theme.css`
  - Ensures all content appears above background effects
  - Applied with: `position: relative; z-index: 1;`

### Layer 10-20: Hero Section Background Elements
- **Hero Background Layers**: `z-index: -30, -20, -10, -5`
  - Negative z-index relative to parent (Hero section is z-1)
  - Grid paper overlay: `-z-30`
  - Gradient glows: `-z-20`, `-z-10`, `-z-5`
  - Content within Hero: `z-10` (relative to parent)

### Layer 50: Primary UI Elements
- **Header Navigation**: `z-index: 50`
  - Fixed header bar with navigation
  - Location: `src/components/layout/Header.jsx`

- **Background Music Player**: `z-index: 50`
  - Fixed bottom-right music player
  - Location: `src/components/ui/BackgroundMusic.jsx`

### Layer 55: Overlays
- **Mobile Navigation Overlay**: `z-index: 55`
  - Full-screen mobile menu overlay
  - Location: `src/components/layout/Header.jsx`

### Layer 59-60: Interactive UI
- **Cursor Ring**: `z-index: 59`
  - Custom cursor outer ring
  - Location: `src/components/ui/Cursor.jsx`

- **Cursor Dot**: `z-index: 60`
  - Custom cursor center dot
  - Location: `src/components/ui/Cursor.jsx`

- **Scroll Progress**: `z-index: 60`
  - Top progress bar indicator
  - Location: `src/components/ui/ScrollProgress.jsx`

- **Header Interactive Elements**: `z-index: 60`
  - Logo, CTA button, hamburger menu
  - Ensures they're clickable above other elements
  - Location: `src/components/layout/Header.jsx`

### Layer 70: Accessibility
- **Skip to Content Link**: `z-index: 70`
  - Focus-visible skip navigation link
  - Highest z-index to ensure keyboard accessibility
  - Location: `src/App.jsx`

## Key Rules

1. **Spider Web stays at the bottom**: Always `z-index: 0` to provide background ambiance
2. **Content above effects**: All sections use `z-index: 1` via CSS
3. **Navigation accessibility**: Header and interactive elements at `z-50+`
4. **Keyboard navigation priority**: Skip link at highest z-index for accessibility
5. **Pointer events**: Background elements use `pointerEvents: none` to prevent interaction blocking

## CSS Classes

The following CSS utility is defined in `src/theme.css`:

```css
/* Spider Web Canvas */
.spider-web-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  pointer-events: none;
  z-index: 0;
  opacity: 1;
  transition: opacity 0.3s ease;
}

/* Ensure all sections have proper z-index above spider web */
.section,
header,
footer,
main {
  position: relative;
  z-index: 1;
}
```

## Modifications Made

### SpiderWeb.jsx
- Changed inline `zIndex` from `1` to `0`
- Added `aria-hidden="true"` for accessibility
- Added inline comments explaining each style property
- Enhanced component documentation

This ensures the spider web animation stays in the background while all interactive content remains accessible and properly layered.
