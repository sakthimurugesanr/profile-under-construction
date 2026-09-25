# Search appearance and deployment

The homepage metadata is maintained in index.html. It is sent in the initial HTML. Browser-tab titles and descriptions then follow the visible section, using src/data/seo.js; canonical URLs and social metadata stay fixed. Keep the visible role and introduction in src/data/site.js consistent with it.

Preferred title: Sakthi Murugesan | Professional AI Engineer

Description: Sakthi Murugesan is a professional AI engineer and MERN stack developer building AI-powered applications with React, Node.js and Python. Explore his work.

The original 288 x 288 public/assets/images/profile-pic-sakthi.jpg is used as the favicon, social preview and Person image. Keep this URL stable and include the JPG in deployment.

## Publish and refresh search indexes

1. Run npm run build (Vite plus full React prerendering), then npm run test:seo and publish the contents of dist to the site's existing hosting provider. These local changes have not been deployed.
2. Ensure https://iamsakthi.online/ serves this build. Configure the hosting provider to permanently redirect https://www.iamsakthi.online/ to https://iamsakthi.online/ (301 or 308), preserving paths and query strings. Also redirect HTTP to HTTPS. The non-www address is the existing canonical URL retained by this change. There is no hosting configuration in this repository, so the redirect must be configured at the host.
3. Check the homepage, /robots.txt, /sitemap.xml and /assets/images/profile-pic-sakthi.jpg return the intended content. Clear any old hosting/CDN cache. Confirm both domain versions lead to this portfolio and neither serves a construction page.
4. In Google Search Console, inspect the canonical homepage, test the live URL, and request indexing. Submit https://iamsakthi.online/sitemap.xml under Sitemaps.
5. In Bing Webmaster Tools, submit the same sitemap and request a crawl of the canonical homepage through URL Inspection.

Google's old construction summary may reflect an older crawl or a different deployment on the two hostnames. Live HTTP requests from this workspace failed, so neither cause has been confirmed. Use the inspection tools to check the fetched page and selected canonical after deployment.

Search engines select titles, snippets, images and AI summaries independently. Metadata supports consistent identification but cannot force identical wording, inclusion, rank or refresh timing. Google says favicon refreshes can take days to weeks.

References:
- https://developers.google.com/search/docs/appearance/favicon-in-search
- https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- https://developers.google.com/search/help/site-appearance-faq

## Section SEO and performance update

- The production build renders all seven sections and five projects into HTML, then React hydrates it. Keep the prerender step in the hosting build command (`npm run build`). Deploy the final `dist` directory only after the entire command succeeds.
- Each section has a descriptive heading and title/description in `src/data/seo.js`. A shared IntersectionObserver drives navigation and dynamic browser metadata. These anchor sections remain parts of one canonical page; they are not separate indexable pages. The static homepage title, social metadata and schema describe the whole portfolio.
- Changing tab titles does not itself improve rankings. Google may use a rendered title or rewrite a snippet; section metadata cannot guarantee a particular search result.
- The displayed portrait is now 15,916 bytes instead of 2,093,907 bytes (about 99.2% smaller). Its dimensions are reserved and it is lazy-loaded below the hero.
- Content is readable before JavaScript, and the hero no longer starts hidden. Font display is optional, duplicate section reveal setup was removed, coarse-pointer parallax is skipped, and footer audio is fetched only when its effect plays.
- The marquee pauses offscreen and when the tab is hidden. Scroll progress reuses a setter instead of creating a tween for each update. Reduced-motion users retain accessible project scrolling.

Validation: production build and five `npm run test:seo` regression tests passed. Browser checks covered all six section navigation links, title/description updates, canonical stability, return to the homepage title, and a 390px mobile layout without horizontal document overflow. The final tested browser session reported no errors or warnings. No deployed Lighthouse or field Core Web Vitals score has been measured.

Further reading: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics

## Portrait, menu and timeline revision

The About section now uses the user-requested original `/assets/images/sakthi.png` (1254 x 1254), with reserved dimensions and lazy loading. This supersedes the earlier note about the smaller About image. The JPG remains the social image and raster favicon fallback. `/favicon-circle.svg` embeds that JPG in a circular clip with a tighter crop, at a scalable 512px canvas size; the browser controls its displayed tab-icon size.

Experience and Education now use the reusable Timeline component, chronological entries, active year markers, native touch scrolling, mouse-draggable year navigation and keyboard-accessible anchor links. The education data is corrected to BCom (2018–2021, Grade A) and the 2026–2028 MCA in Artificial Intelligence programme at Sikkim Manipal University – Distance Education. Role durations reflect the supplied profile snapshot.

The mobile menu is a compact native dialog with a simple close button, Escape support, focus containment and body-scroll restoration. Responsive checks at 320px, 390px, 768px and 1440px found no horizontal document overflow.

## Latest image and animation fixes

About now uses `/assets/images/updated-sakthi.png`, copied without changes from the supplied `assets/updated-sakthi.png`. This supersedes previous About-image choices. Panel forwards its DOM ref for StackCard tilt. The current Education component renders the two-record education array; the previous `education.strengths.map` object access is no longer used.

The mobile menu again uses a circular GSAP reveal and elastic stagger, with the existing Syne font at a reduced size, one cross, Escape support and scroll-lock cleanup. Timeline navigation bars are hidden below 768px. The hero adapts the supplied reference's layered scroll technique into scoped terrain, orbit and glow layers, without depending on its missing landscape SVG. Motion scales down on mobile and is skipped when reduced motion is requested.

A fresh development browser session reported no errors or warnings. Menu close/Escape, two education entries, the image URL and 320/390/768/1440px overflow checks passed. The site remains local until deployed.

## Timeline and About scroll animation

Experience and Education now use scoped GSAP scroll timelines: dates and cards move at different speeds, cards settle from a small perspective tilt, and a fine progress rule follows each entry. Mobile travel is reduced and reduced-motion preferences remove these effects. GSAP contexts and media queries clean up on unmount and breakpoint changes.

About no longer renders the brush, tint overlay or corner decorations. The original supplied image remains unchanged; transparent CSS containers, screen blending and a soft edge mask remove the square visual treatment. A coordinated portrait parallax and staggered text scroll effect replaces the former overlapping per-element hooks. Browser checks confirmed changing transforms, no console errors/warnings and no mobile horizontal overflow.
