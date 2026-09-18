# Image Not Showing - Debug Guide

## Your dev server is running at: http://localhost:5179/

## Quick Debug Steps

### Step 1: Test Image Loading
Open this URL in your browser:
```
http://localhost:5179/test-image.html
```

This will test 3 different image paths and show you which one works.

### Step 2: Check Browser Console
1. Open your portfolio at http://localhost:5179/
2. Press F12 to open DevTools
3. Go to the Console tab
4. Scroll to the About section
5. Look for messages like:
   - ✅ "Image loaded successfully: /assets/images/sakthi.png"
   - ❌ "Error loading image: /assets/images/sakthi.png"

### Step 3: Check Network Tab
1. In DevTools, go to Network tab
2. Filter by "Img" or "images"
3. Refresh the page
4. Look for "sakthi.png" in the list
5. Check if it shows:
   - ✅ Status 200 (success)
   - ❌ Status 404 (not found)

### Step 4: Direct Image Test
Try opening the image directly:
```
http://localhost:5179/assets/images/sakthi.png
```

If this shows your image, the path is correct!

## Common Issues & Fixes

### Issue 1: 404 Not Found
**Symptom**: Browser says "Failed to load resource: 404"

**Fix**: The image path is wrong. Try these alternatives in `About.jsx`:

```jsx
// Option 1 (current)
<ThreeImage imageSrc="/assets/images/sakthi.png" />

// Option 2 (without leading slash)
<ThreeImage imageSrc="assets/images/sakthi.png" />

// Option 3 (relative path)
<ThreeImage imageSrc="./assets/images/sakthi.png" />
```

### Issue 2: Black/Empty Canvas
**Symptom**: You see a black rectangle but no image

**Possible causes**:
1. Three.js texture not loading
2. WebGL not supported
3. Shader compilation error

**Fix**: Check browser console for WebGL errors

### Issue 3: CORS Error
**Symptom**: "Cross-origin request blocked"

**Fix**: This shouldn't happen with Vite dev server, but if it does:
- Make sure you're accessing via `localhost`, not `127.0.0.1`
- Restart the dev server

### Issue 4: Image Too Large
**Symptom**: Long loading time, performance issues

**Your image**: 2.09 MB (this is fine, but can be optimized)

**Optional optimization**:
```bash
# If you have ImageMagick or similar
convert sakthi.png -resize 1000x1000 -quality 85 sakthi-optimized.png
```

## Fallback: Use Regular Image Instead

If the 3D image isn't working, you can temporarily use a regular image:

### Edit `About.jsx`

Replace the 3D image section with:

```jsx
{/* Regular Image (Fallback) */}
<div ref={imageRef} className="about-image-container">
  <img
    src="/assets/images/sakthi.png"
    alt="Sakthi Murugesan - Fullstack Developer"
    className="about-image"
    onError={(e) => {
      console.error('Image failed to load:', e)
      e.target.src = '/assets/images/placeholder-profile.svg'
    }}
    onLoad={() => {
      console.log('✅ Image loaded successfully!')
    }}
  />
  <div className="image-overlay" />
</div>
```

## What I Added for Debugging

1. **Console Logs in ThreeImage.jsx**:
   - Shows when image loads successfully
   - Shows errors if loading fails
   - Logs alternative paths to try

2. **test-image.html**:
   - Tests 3 different image paths
   - Shows image dimensions and status
   - Located at: `public/test-image.html`

3. **Hidden fallback image**:
   - In About.jsx for SEO
   - Invisible but loads the image

## Current File Structure

```
public/
└── assets/
    └── images/
        ├── sakthi.png ✅ (2.09 MB, exists)
        ├── placeholder-profile.svg ✅
        ├── placeholder-skill-1.svg ✅
        ├── placeholder-skill-2.svg ✅
        └── placeholder-skill-3.svg ✅
```

## Expected Behavior

When working correctly, you should:
1. See your photo in the About section
2. When you hover, see RGB color separation effect
3. When you move mouse, image tilts in 3D
4. Smooth animations on all movements

## Browser Console Commands

While on the page, try these in console:

```javascript
// Check if Three.js is loaded
console.log(typeof THREE)

// Check if image exists
fetch('/assets/images/sakthi.png')
  .then(r => console.log('Image fetch:', r.status, r.statusText))
  .catch(e => console.error('Image fetch failed:', e))

// Check WebGL support
const canvas = document.createElement('canvas')
const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
console.log('WebGL supported:', !!gl)
```

## Next Steps

1. **First**: Open http://localhost:5179/test-image.html
2. **Then**: Check which path works (Test 1, 2, or 3)
3. **Finally**: Update the imageSrc in About.jsx if needed

## Contact Info

If you're still having issues, share:
- Browser console errors (F12 → Console)
- Network tab screenshot showing sakthi.png status
- Which test in test-image.html worked

---

**Dev Server**: http://localhost:5179/
**Image Test Page**: http://localhost:5179/test-image.html
**Direct Image**: http://localhost:5179/assets/images/sakthi.png
