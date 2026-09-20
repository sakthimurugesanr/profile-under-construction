# Horizontal Scroll Debugging Guide

## Changes Made

### 1. Removed Section Component Wrapper
**Problem**: The `<Section>` component wraps content in a constraining `shell` div with `flex flex-col`, which prevented the horizontal scroll track from expanding properly.

**Solution**: Changed from:
```jsx
<Section id="projects" ref={sectionRef} tone="alt" className="horizontal-scroll-section">
  <div className="shell">...</div>
  <div ref={trackRef} className="horizontal-scroll-track">...</div>
</Section>
```

To:
```jsx
<section id="projects" ref={sectionRef} className={clsx('section section--alt horizontal-scroll-section')}>
  <div className="shell">...</div>
  <div ref={trackRef} className="horizontal-scroll-track">...</div>
</section>
```

### 2. Fixed CSS Layout
- Changed `.horizontal-scroll-track` from `overflow: hidden` to `overflow: visible`
- Added `padding-left: var(--shell-x)` to track for proper alignment
- Added `padding-right: var(--shell-x)` to wrapper to maintain spacing

### 3. Enhanced Debugging
- Enabled `markers: true` in ScrollTrigger to show visual debug markers
- Added comprehensive console logging at every step
- Added 100ms delay to ensure proper layout calculation

## How to Debug

### Step 1: Open Browser Console
1. Open your browser DevTools (F12)
2. Go to the Console tab
3. Scroll down to the "Skills in Action" section

### Step 2: Check Console Logs

You should see these logs in order:

```
🎨 Rendering Projects section with 5 projects
Rendering project 1: AI Resume Analyzer
Rendering project 2: Data Analysis Agent
Rendering project 3: E-Store (E-commerce Platform)
Rendering project 4: MovieDB Clone
Rendering project 5: LangChain & LangGraph Demo
✅ Horizontal scroll setup starting...
Projects count: 5
Viewport width: [YOUR_WIDTH]
Section element: section#projects
Track element: div.horizontal-scroll-track
Wrapper element: div.horizontal-scroll-wrapper
Project cards found: 5
=== WIDTH CALCULATION ===
Wrapper scroll width: [SHOULD BE > VIEWPORT]
Viewport width: [YOUR_WIDTH]
Scroll distance needed: [POSITIVE NUMBER]
=== CREATING SCROLLTRIGGER ===
getScrollAmount called, returning: [NEGATIVE NUMBER]
ScrollTrigger end distance: [POSITIVE NUMBER]
✅ ScrollTrigger created successfully
Active ScrollTriggers: [Array with 1+ triggers]
```

### Step 3: Check Visual Markers

With `markers: true`, you should see:
- **Green line** labeled "start" at the top of "Skills in Action"
- **Red line** labeled "end" much further down the page
- The distance between them = scroll distance needed

### Step 4: Test Scrolling

1. Scroll down to "Skills in Action"
2. Watch console for:
   ```
   📌 Section PINNED - Horizontal scroll active
   Scroll progress: 0%
   Scroll progress: 10%
   Scroll progress: 20%
   ...
   Scroll progress: 100%
   ✅ Section UNPINNED - Continue vertical scroll
   ```

## Common Issues and Solutions

### Issue 1: "Wrapper scroll width" equals "Viewport width"
**Symptom**: Console shows both widths are the same
**Cause**: Cards are not rendering with proper width
**Fix**: Check CSS `.project-card` width is set correctly for your viewport

### Issue 2: No console logs appear
**Symptom**: Nothing in console when page loads
**Cause**: JavaScript not running or component not mounting
**Fix**: 
- Check for JavaScript errors in console
- Verify GSAP is installed: `npm list gsap`
- Hard refresh (Ctrl+F5 / Cmd+Shift+R)

### Issue 3: Section pins but projects don't move
**Symptom**: Section stays at top but cards don't slide
**Cause**: GSAP animation not applying transform
**Fix**: Check console for `getScrollAmount called` log during scroll

### Issue 4: Only 2-3 projects visible
**Symptom**: Not all 5 projects render
**Cause**: Wrapper width not calculated correctly
**Fix**: 
- Check "Project cards found:" should be 5
- Inspect DOM to verify 5 `.project-card` elements exist

### Issue 5: Markers don't appear
**Symptom**: No green/red lines on page
**Cause**: ScrollTrigger not created
**Fix**: Check for "✅ ScrollTrigger created successfully" in console

## Manual Inspection

### In Browser DevTools:

1. **Elements Tab**:
   - Find `<section id="projects">`
   - Check it has class `horizontal-scroll-section`
   - Find `.horizontal-scroll-wrapper` inside
   - Should contain exactly 5 `.project-card` elements

2. **Console Tab**:
   - Type: `ScrollTrigger.getAll()`
   - Should return array with at least one trigger
   - Type: `ScrollTrigger.getById('horizontal-projects')`
   - Should return the trigger object

3. **Check Wrapper Width**:
   ```javascript
   const wrapper = document.querySelector('.horizontal-scroll-wrapper')
   console.log('Wrapper scroll width:', wrapper.scrollWidth)
   console.log('Viewport width:', window.innerWidth)
   console.log('Difference:', wrapper.scrollWidth - window.innerWidth)
   ```
   The difference should be 2000-4000px for proper scrolling.

## Expected Behavior

### Desktop (≥768px):
1. Scroll down normally
2. Reach "Skills in Action" header
3. **Section pins** - page stays in place
4. Continue scrolling down → projects slide left
5. See projects: 1 → 2 → 3 → 4 → 5
6. After project 5 fully visible → **section unpins**
7. Continue normal scroll to Education section

### Mobile (<768px):
1. Scroll down normally
2. See "Skills in Action" with all 5 projects stacked vertically
3. No pinning, no horizontal effect
4. Continue normal scroll

## What to Report

If it still doesn't work, report:

1. **Viewport Width**: (from console or DevTools)
2. **Wrapper Scroll Width**: (from console "=== WIDTH CALCULATION ===")
3. **Number of Cards Found**: (from console "Project cards found:")
4. **Any Error Messages**: (red text in console)
5. **Do Markers Appear?**: (green/red lines on page)
6. **Does Section Pin?**: (does page "stick" when reaching section)

## Disable Debug Mode

Once working, turn off markers:

In `Projects.jsx`, line ~168:
```javascript
markers: true, // ENABLED for debugging
```

Change to:
```javascript
markers: false, // Disabled for production
```

## Performance Check

After confirming it works:

1. Open DevTools Performance tab
2. Start recording
3. Scroll through the horizontal section
4. Stop recording
5. Check for smooth 60fps during scroll (no red bars)

---

**Current Status**: Debug mode ENABLED with comprehensive logging
**Next Step**: Run dev server, scroll to section, check console logs
**If Successful**: Set `markers: false` and remove/reduce console logs
