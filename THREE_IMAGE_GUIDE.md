# 3D Interactive Image Guide

## Overview
The About section now features a stunning 3D interactive image powered by Three.js with advanced shader effects.

## Features

### 1. **Shader Effects**
- **RGB Shift**: Color channel separation on hover for a chromatic aberration effect
- **Zoom Effect**: Exponential zoom animation when hovering
- **Pixel Displacement**: Dynamic pixel distortion based on image luminance
- **Aspect Ratio Correction**: Maintains proper image proportions

### 2. **3D Transformations**
- **Mouse Tracking**: Image follows mouse movement with parallax effect
- **Rotation**: 3D rotation based on cursor position
- **Scale**: Dynamic scaling that responds to vertical mouse position
- **Smooth Transitions**: All movements use GSAP for buttery-smooth animations

### 3. **Performance Optimizations**
- WebGL rendering with hardware acceleration
- Optimized pixel ratio for retina displays
- Efficient raycasting for hover detection
- Proper cleanup and disposal on unmount

## How It Works

### ThreeImage Component
Located at `src/components/ui/ThreeImage.jsx`

```jsx
<ThreeImage 
  imageSrc="/assets/images/sakthi.png"
  className="about-three-image"
/>
```

### Technical Details

**Vertex Shader**:
- Passes UV coordinates to fragment shader
- Standard projection transformation

**Fragment Shader**:
- Fixes aspect ratio distortion
- Applies exponential easing for zoom
- RGB channel shifting for chromatic effect
- Pixel displacement based on red channel
- Smooth opacity blending

**Mouse Interactions**:
- Position: `x: mouse.x * 0.5` (horizontal follow)
- Rotation: 3D tilt based on mouse position
- Scale: Subtle scaling with vertical movement
- Hover: Triggers shader effects via uniform

## Customization

### Adjust Zoom Level
In `ThreeImage.jsx`, line 77:
```glsl
float zoomLevel = 0.2; // Change this value (0.0 - 1.0)
```

### Adjust RGB Shift Intensity
Lines 96-97:
```glsl
color.r = texture2D(texture, uv + (hoverLevel) * 0.01).r; // Change 0.01
color.g = texture2D(texture, uv - (hoverLevel) * 0.01).g; // Change 0.01
```

### Adjust Movement Speed
Lines 161-178:
```javascript
duration: 0.5, // Change animation duration
```

### Adjust Rotation Intensity
Lines 172-176:
```javascript
x: -this.mouse.y * (Math.PI / 3) * 0.3, // Vertical tilt
y: this.mouse.x * (Math.PI / 3) * 0.3,  // Horizontal tilt
```

## Browser Support
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari (WebGL 2.0)
- ✅ Mobile browsers with WebGL support

## Performance Tips

1. **Image Size**: Keep images under 2MB for faster loading
2. **Resolution**: 1000x1000px is optimal for quality vs performance
3. **Format**: Use WebP for better compression (with PNG fallback)

## Troubleshooting

### Image Not Loading
- Check the image path is correct
- Ensure the image is in `public/assets/images/`
- Open browser console for texture loading errors

### Poor Performance
- Reduce image resolution
- Lower pixel ratio in `buildRenderer` (line 42)
- Reduce mouse movement sensitivity

### No Hover Effect
- Check browser DevTools console for shader errors
- Ensure WebGL is enabled in browser
- Try disabling browser extensions

## Mobile Behavior
- Touch interactions are supported
- Optimized for mobile performance
- Auto-adjusts canvas size on rotation
- Mouse leave resets position smoothly

## Credits
Shader technique inspired by modern WebGL image effects and adapted for React with Three.js.
