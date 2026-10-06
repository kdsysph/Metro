import { createClient } from '@sanity/client'
import 'dotenv/config'

const client = createClient({
  projectId: '632xwlq5',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

const ids = [
  'siteSettings', 'homePage', 'aboutPage', 'contactPage', 'galleryPage',
  'project-kazanchis', 'project-bulbula', 'project-sarbet',
  'propertyUnit-KAZANCHIS-2bed', 'propertyUnit-KAZANCHIS-3bed',
]

// Check published vs draft state
const published = await client.fetch(
  `*[_id in $ids]{ _id, _type }`,
  { ids }
)
const drafts = await client.fetch(
  `*[_id in $draftIds]{ _id, _type }`,
  { draftIds: ids.map(id => `drafts.${id}`) }
)

console.log('\nPublished documents:')
published.forEach(d => console.log(`  ✓ ${d._id}`))

if (drafts.length) {
  console.log('\nDraft (unpublished) documents:')
  drafts.forEach(d => console.log(`  ⚠  ${d._id}`))
} else {
  console.log('\nNo drafts found — all documents are published.')
}
