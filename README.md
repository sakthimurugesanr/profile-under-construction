# Portfolio — React + Vite + Tailwind + GSAP

Component-based rebuild of the single-file HTML portfolio. Black and white only,
responsive from 320px up, scroll-linked parallax with GSAP ScrollTrigger.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
```

Node 18 or newer.

## Structure

```
src/
  main.jsx                 entry
  App.jsx                  page composition — section order lives here
  data/site.js             ALL copy. Edit this, not the components.
  styles/theme.css         tokens + component classes (.panel, .btn, .tag, .field…)
  lib/
    gsap.js                plugin registration + motion/pointer checks
    clsx.js                class joiner
  hooks/
    useReveal.js           one scroll reveal per section
    useParallax.js         scrub-linked drift for any element
    useActiveSection.js    nav highlight
    usePointer.js          fine-pointer detection
  components/
    layout/   Header, Footer
    ui/       Section, SectionHeader, Panel, Tag, Marquee, Cursor
    sections/ Hero, Experience, Stack, Projects, Education, Contact
```

Two layers do the styling work. `tailwind.config.js` holds the tokens (ink and
chalk scales, type scale, fonts); `styles/theme.css` turns those into named
component classes so a restyle is one file, not forty class strings.

## Motion

- **Intro** — one timeline in `Hero.jsx`: the name slides up, then the copy and
  facts. That is the only unprompted animation above the fold.
- **Parallax** — `useParallax` on the hero grid, the hero wash, the hero name,
  and each project plate. Different `distance` and `lag` values per layer are
  what create depth; keep the background layers slower than the foreground.
- **Reveals** — `useReveal` animates every `[data-reveal]` child of a section in
  one staggered tween, so the page holds a handful of ScrollTriggers, not fifty.
- `prefers-reduced-motion: reduce` skips every tween and the custom cursor, and
  coarse pointers get roughly half the parallax travel.

Adding parallax to anything:

```jsx
const ref = useParallax({ distance: 90, lag: 0.8 })
return <div ref={ref} />
```

Note: GSAP writes the whole `transform`, so don't put a Tailwind `translate-*`
or `scale-*` on an element you also animate — put it on a wrapper.

## What changed from the original HTML, and why

Structure and styling aside, some content was pulled. Anyone hiring you reads a
portfolio for signal, and invented numbers destroy it the moment one is
questioned in an interview.

- **Removed the fake telemetry** — live "latency: 14ms", "uptime 99.99%",
  "600+ deployments", "checkout P99 142ms", "WS rehydration < 8ms". The latency
  figure was `Math.random()`, and a portfolio page has no latency to report.
- **Removed the PGP fingerprint** and the "TLS 1.3 encrypted" label on a form
  that did not send anything.
- **The contact form now works** — it opens the visitor's mail client with the
  message filled in, instead of showing "TRANSMISSION ACKNOWLEDGED" and
  discarding the text. Swap `handleSubmit` in `Contact.jsx` for a `fetch()` when
  you have an endpoint.
- **Removed "Grade: A"** and the 95% / 98% / 90% skill bars. Self-assigned
  percentages read as filler.
- **Rewrote the project descriptions** as what they are: personal builds, with
  what each taught you. "Distributed e-commerce engine with partitioned
  PostgreSQL schemas" invites questions a personal project cannot answer.
- **Softened the job copy** — "spearheading front-of-house UI engineering" and
  "engineered synchronous state hydration" say less than the plain version and
  cost credibility. Your actual differentiator, two years of client work before
  the switch, now has a straight explanation instead of being called an
  "uncommon dual-competency".
- **Dropped the 01–05 section numbers.** The sections are not a sequence.

Accessibility and correctness fixes: real `alt` handling (the original put its
descriptions in `data-alt`, so screen readers got nothing), a skip link, visible
focus rings, a working mobile menu (the original had no nav under 1024px),
`aria-current` on the active nav item, labels tied to inputs, and
`prefers-reduced-motion` honoured throughout.

## Before you publish

Search `TODO` in `src/data/site.js`:

- real email address
- GitHub and LinkedIn URLs
- project repository links
- drop `resume.pdf` into `public/`
- add project screenshots and swap the placeholder plate in `Projects.jsx`
