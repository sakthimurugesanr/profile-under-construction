import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync, statSync } from 'node:fs'
import { sectionSEO, metadataForSection } from '../src/data/seo.js'
import { projects, education } from '../src/data/site.js'

const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8')
const escape = text => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph']

test('all seven sections and every project are in the initial response', () => {
  assert.equal((html.match(/<h1\b/g) || []).length, 1)
  for (const id of Object.keys(sectionSEO)) assert.match(html, new RegExp(`<section[^>]*id="${id}"`))
  for (const project of projects) {
    assert(html.includes(escape(project.name)))
    assert(html.includes(escape(project.overview)))
    assert(html.includes(`href="${project.repo}"`))
  }
  assert(!html.includes('<div id="root"></div>'))
  assert(!html.includes('reveal-pending'))
})

test('initial canonical, title and descriptions are unique and consistent', () => {
  assert.equal((html.match(/<title>/g) || []).length, 1)
  assert.equal((html.match(/name="description"/g) || []).length, 1)
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1)
  assert(html.includes(`<title>${sectionSEO.top.title}</title>`))
  assert(html.includes(`name="description" content="${sectionSEO.top.description}"`))
  assert(html.includes('rel="canonical" href="https://iamsakthi.online/"'))
  assert(!/under construction|74%/i.test(html))
})

test('section metadata covers navigation and falls back to the homepage', () => {
  const titles = new Set()
  for (const [id, metadata] of Object.entries(sectionSEO)) {
    assert.equal(metadataForSection(id), metadata)
    assert(metadata.title.startsWith('Sakthi Murugesan | '))
    assert(metadata.description.length >= 80 && metadata.description.length <= 180)
    titles.add(metadata.title)
  }
  assert.equal(titles.size, 7)
  assert.equal(metadataForSection('missing-section'), sectionSEO.top)
})

test('schema sections resolve to visible anchors and list real projects without ratings', () => {
  const page = schema.find(item => item['@type'] === 'ProfilePage')
  assert.equal(page.hasPart.length, 6)
  for (const ref of page.hasPart) {
    assert(schema.some(item => item['@id'] === ref['@id']))
    assert(html.includes(`id="${ref['@id'].split('#')[1]}"`))
  }
  const list = schema.find(item => item['@type'] === 'ItemList')
  assert.equal(list.itemListElement.length, projects.length)
  assert(!JSON.stringify(schema).includes('aggregateRating'))
})

test('image and crawl assets exist; sitemap contains only the canonical homepage', () => {
  assert(existsSync(new URL('../dist/assets/images/profile-pic-sakthi.jpg', import.meta.url)))
  assert(statSync(new URL('../dist/assets/images/profile-pic-sakthi.jpg', import.meta.url)).size < 30000)
  assert(html.includes('loading="lazy"'))
  assert(html.includes('src="/assets/images/updated-sakthi.png"'))
  assert(html.includes('href="/favicon-circle.svg"'))
  const xml = readFileSync(new URL('../dist/sitemap.xml', import.meta.url), 'utf8')
  assert.equal((xml.match(/<loc>/g) || []).length, 1)
  assert(xml.includes('<loc>https://iamsakthi.online/</loc>'))
})

test('career and education timelines preserve corrected biography and navigable anchors', () => {
  for (const id of ['career-access', 'career-asglobal', 'career-cannyfore', 'education-bcom', 'education-mca']) {
    assert(html.includes(`id="${id}"`))
    assert(html.includes(`href="#${id}"`))
  }
  assert(html.includes('Sikkim Manipal University'))
  assert(html.includes('Bachelor of Commerce'))
  assert(html.includes('Cannyfore Technology Solutions Pvt Ltd'))
  assert(!html.includes('With an MCA degree'))
  assert(!html.includes("Park&#x27;s College of Engineering and Technology"))
  assert(html.includes('aria-controls="mobile-menu"'))
  assert(html.includes('<dialog'))
  const icon = readFileSync(new URL('../dist/favicon-circle.svg', import.meta.url), 'utf8')
  assert(icon.includes('<clipPath'))
  assert(icon.includes('<circle'))
  assert(icon.includes('data:image/jpeg;base64,'))
})


test('education has two valid records and the About image matches the supplied asset', () => {
  assert(Array.isArray(education))
  assert.equal(education.length, 2)
  for (const record of education) assert(record.id && record.degree && record.school)
  assert.deepEqual(
    readFileSync(new URL('../assets/updated-sakthi.png', import.meta.url)),
    readFileSync(new URL('../dist/assets/images/updated-sakthi.png', import.meta.url)),
  )
})
