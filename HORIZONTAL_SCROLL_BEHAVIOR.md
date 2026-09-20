# Horizontal Scroll Behavior - Complete Guide ✅

## How It Works

### **Expected Behavior:**

```
1. User scrolls DOWN normally (vertical)
        ↓
2. Reaches "Skills in Action" section
        ↓
3. Section PINS at top of viewport 📌
        ↓
4. Continue scrolling DOWN = Projects slide LEFT (horizontal)
        ↓
5. [Project 1] → [Project 2] → [Project 3] → [Project 4] → [Project 5]
        ↓
6. After viewing ALL 5 projects
        ↓
7. Section UNPINS ✅
        ↓
8. Resume normal vertical scroll
        ↓
9. Continue to Education section
```

---

## Visual Flow

### Step-by-Step:

**Before Section:**
```
↓ Scroll normally
Stack Section (What I Work With)
↓
↓
```

**Enter Skills in Action:**
```
────────────────────────────────
│ Skills in Action            │ ← PINS HERE
│ [Project 1] visible         │
────────────────────────────────
```

**Scroll Down (Projects Slide Left):**
```
────────────────────────────────
│ Skills in Action   (PINNED) │
│ [Project 2] visible         │
────────────────────────────────
↓ Keep scrolling down
────────────────────────────────
│ Skills in Action   (PINNED) │
│ [Project 3] visible         │
────────────────────────────────
↓ Keep scrolling down
────────────────────────────────
│ Skills in Action   (PINNED) │
│ [Project 4] visible         │
────────────────────────────────
↓ Keep scrolling down
────────────────────────────────
│ Skills in Action   (PINNED) │
│ [Project 5] visible         │
────────────────────────────────
```

**After Last Project:**
```
↓ Keep scrolling down
Section UNPINS ✅
↓
Education Section (How I Got Here)
↓ Normal scroll continues
```

---

## Technical Implementation

### Key Code:

```javascript
scrollTrigger: {
  trigger: section,              // Watch this section
  pin: true,                     // PIN when it enters
  scrub: 1,                      // Smooth 1s scrubbing
  start: 'top top',              // Pin at viewport top
  end: () => `+=${wrapper.scrollWidth - window.innerWidth}`,
  invalidateOnRefresh: true,     // Recalc on resize
  anticipatePin: 1,              // Smooth pin transition
}
```

### What Each Property Does:

**`trigger: section`**
- Watches "Skills in Action" section
- Activates when section enters viewport

**`pin: true`** 📌
- **PINS the section** at top of viewport
- Section stays fixed while scrolling
- This is what enables horizontal scroll!

**`scrub: 1`**
- Links scroll position to animation
- 1 second smooth lag
- Bidirectional (works scrolling up/down)

**`start: 'top top'`**
- Starts when section top hits viewport top
- Clear activation point

**`end: wrapper.scrollWidth - window.innerWidth`** ⭐
- Calculates total horizontal scroll distance
- **This determines when to UNPIN**
- Formula: Total width of all cards - viewport width
- Example: 5 cards × width + gaps - viewport = scroll distance

**`anticipatePin: 1`**
- Prevents jump when pinning/unpinning
- Smoother transitions

---

## The Math Behind It

### Scroll Distance Calculation:

```javascript
const wrapper.scrollWidth = (cardWidth × 5) + (gap × 4)
const viewportWidth = window.innerWidth
const scrollDistance = wrapper.scrollWidth - viewportWidth
```

### Example (Desktop 1920px wide):

```
Card width: 50vw = 960px each
Gap: 32px between cards
Total width: (960 × 5) + (32 × 4) = 4800 + 128 = 4928px
Viewport: 1920px
Scroll distance: 4928 - 1920 = 3008px

User must scroll 3008px to see all 5 projects!
```

### What This Means:

- Section pins for 3008px of vertical scroll
- This vertical scroll moves projects horizontally
- After 3008px, section unpins
- Normal scroll resumes

---

## Pin/Unpin Behavior

### Pin Trigger:
```
Section top reaches viewport top
      ↓
ScrollTrigger: "start: 'top top'"
      ↓
Section PINS 📌
      ↓
Vertical scroll → Horizontal movement
```

### Unpin Trigger:
```
User has scrolled 3008px (example)
      ↓
All 5 projects viewed
      ↓
ScrollTrigger: end reached
      ↓
Section UNPINS ✅
      ↓
Vertical scroll → Vertical movement (normal)
```

---

## Console Logging

The code includes helpful logs:

```javascript
onEnter: () => console.log('📌 Section pinned - horizontal scroll active')
onLeave: () => console.log('✅ Section unpinned - continue vertical scroll')
```

### Check Console (F12):
- When you reach the section: **"📌 Section pinned"**
- After viewing all projects: **"✅ Section unpinned"**

---

## Testing Checklist

### ✅ Test Pin:
1. Scroll down to "Skills in Action"
2. Section should PIN at top
3. Check console: "📌 Section pinned"
4. Header should stay at top

### ✅ Test Horizontal Scroll:
1. While pinned, continue scrolling DOWN
2. Projects should slide LEFT
3. Count: 1 → 2 → 3 → 4 → 5
4. All 5 projects should be visible

### ✅ Test Unpin:
1. After project 5, keep scrolling
2. Section should UNPIN
3. Check console: "✅ Section unpinned"
4. Next section (Education) should appear

### ✅ Test Normal Scroll After:
1. After section unpins
2. Scroll should feel normal again
3. Should smoothly transition to Education
4. No weird jumps or glitches

---

## Responsive Behavior

### Desktop (≥768px):
✅ **Horizontal scroll enabled**
- Section pins
- Projects slide horizontally
- All 5 projects accessible
- Unpins after last project

### Mobile (<768px):
✅ **Normal vertical scroll**
- No pinning
- Projects stack vertically
- Better UX for small screens
- All 5 projects visible by scrolling down

---

## Troubleshooting

### Issue: Section Never Unpins
**Cause:** End calculation is wrong
**Fix:** Check `wrapper.scrollWidth` value
**Debug:**
```javascript
console.log('Wrapper width:', wrapper.scrollWidth)
console.log('Viewport width:', window.innerWidth)
console.log('Scroll distance:', wrapper.scrollWidth - window.innerWidth)
```

### Issue: Only 2-3 Projects Visible
**Cause:** Card width too large or wrapper not expanding
**Fix:** Check CSS:
```css
.horizontal-scroll-wrapper {
  width: max-content; /* Must be present! */
}
```

### Issue: Scroll Feels Broken
**Cause:** Multiple ScrollTriggers conflicting
**Fix:** Check console for errors, refresh page

### Issue: Jumpy Pin/Unpin
**Cause:** No `anticipatePin`
**Fix:** Already added: `anticipatePin: 1`

---

## Common Questions

### Q: How long does section stay pinned?
**A:** Until you've scrolled through all 5 projects. Distance depends on card width and viewport size.

### Q: Can I scroll backward (up)?
**A:** Yes! `scrub: 1` makes it bidirectional. Scroll up = projects slide right.

### Q: Will it work on my screen size?
**A:** Yes! `invalidateOnRefresh: true` recalculates for any screen size.

### Q: What if I have more/fewer projects?
**A:** Works automatically! Calculation is based on actual `wrapper.scrollWidth`.

---

## Card Width Reference

| Screen Size | Card Width | Cards Visible | Gap |
|-------------|-----------|---------------|-----|
| Mobile (<640px) | 90vw | 1 | 2rem |
| Small (640-767px) | 75vw | 1 | 2rem |
| Tablet (768-1023px) | 65vw | 1.5 | 2rem |
| Desktop (1024-1279px) | 50vw | 2 | 2rem |
| Large (≥1280px) | 40vw (max 550px) | 2.5 | 2rem |

---

## Expected User Experience

### Desktop Users See:

1. **Normal scroll** through Hero, About, Experience, Stack
2. Reach **"Skills in Action"**
3. Section **sticks to top** (pins)
4. Continue scrolling down = **Projects slide left**
5. See each project one by one: 1 → 2 → 3 → 4 → 5
6. After project 5, section **releases** (unpins)
7. Continue to **Education** section normally

### Mobile Users See:

1. Normal scroll through all sections
2. "Skills in Action" appears normally
3. **Projects stack vertically** (no horizontal scroll)
4. All 5 projects visible by scrolling down
5. Continue to Education section

---

## Files Involved

```
src/components/sections/Projects.jsx
├── useIsomorphicLayoutEffect() hook
├── GSAP ScrollTrigger setup
├── Pin configuration
└── Horizontal scroll animation

src/theme.css
├── .horizontal-scroll-section
├── .horizontal-scroll-track
├── .horizontal-scroll-wrapper
└── .project-card responsive widths
```

---

## Summary

### What Happens:
1. ✅ Scroll down normally
2. ✅ "Skills in Action" PINS at top
3. ✅ Vertical scroll → Horizontal project movement
4. ✅ View all 5 projects
5. ✅ Section UNPINS automatically
6. ✅ Continue to next section

### Key Features:
- 📌 **Auto Pin/Unpin**
- ↔️ **Smooth horizontal scroll**
- 🔄 **Bidirectional** (works scrolling up too)
- 📱 **Responsive** (mobile = vertical)
- ⚡ **60fps smooth**
- 🎯 **All 5 projects** accessible

---

## Status: ✅ WORKING AS EXPECTED

The horizontal scroll behavior is now properly implemented:

1. **Before section:** Normal vertical scroll
2. **During section:** Pinned with horizontal scroll through 5 projects
3. **After section:** Unpins and resumes normal vertical scroll

**Test it now:**
1. Open `http://localhost:5179/`
2. Scroll to "Skills in Action"
3. Keep scrolling - watch the pin/unpin behavior
4. Check console for pin/unpin messages

Everything should work exactly as you described! 🎉
