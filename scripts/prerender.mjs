import { readFile, writeFile } from 'node:fs/promises'
import { createServer } from 'vite'
import { sectionSEO } from '../src/data/seo.js'
import { profile, projects } from '../src/data/site.js'

// Render the actual React components for all visitors, using the same data
// and markup that the client hydrates. No browser or bot-specific rendering.
const server = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
})
try {
  const { render } = await server.ssrLoadModule('/src/entry-server.jsx')
  const markup = render()
  const path = new URL('../dist/index.html', import.meta.url)
  let html = await readFile(path, 'utf8')
  if (!html.includes('<div id="root"></div>')) throw new Error('Missing prerender root')
  html = html.replace('<div id="root"></div>', () => `<div id="root">${markup}</div>`)
  const base = 'https://iamsakthi.online/'
  const schemaPattern = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/
  const schema = JSON.parse(html.match(schemaPattern)[1])
  const page = schema['@graph'].find(item => item['@type'] === 'ProfilePage')
  const sections = Object.entries(sectionSEO).filter(([id]) => id !== 'top')
  page.hasPart = sections.map(([id]) => ({ '@id': `${base}#${id}` }))
  schema['@graph'].push(...sections.map(([id, meta]) => ({
    '@type': 'WebPageElement', '@id': `${base}#${id}`,
    name: meta.heading, description: meta.description,
    isPartOf: { '@id': `${base}#webpage` },
  })))
  schema['@graph'].push({
    '@type': 'ItemList', '@id': `${base}#project-list`,
    name: 'Projects by Sakthi Murugesan', numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem', position: index + 1,
      item: {
        '@type': 'CreativeWork', name: project.name,
        description: project.overview, url: project.repo,
        author: { '@id': `${base}#person` }, keywords: project.tags.join(', '),
      },
    })),
  })
  schema['@graph'].find(item => item['@id'] === `${base}#projects`).mainEntity = { '@id': `${base}#project-list` }
  schema['@graph'].find(item => item['@type'] === 'Person').name = profile.name
  html = html.replace(schemaPattern, () => `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`)
  await writeFile(path, html)
  console.log(`Prerendered ${sections.length + 1} sections and ${projects.length} projects into dist/index.html`)
} finally {
  await server.close()
}
