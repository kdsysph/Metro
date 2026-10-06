import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '632xwlq5',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

// Fetch all draft documents
const drafts = await client.fetch('*[_id in path("drafts.**")] { _id, _type }')
console.log(`Found ${drafts.length} draft documents`)

for (const draft of drafts) {
  const publishedId = draft._id.replace('drafts.', '')
  try {
    // Copy draft to published ID
    const full = await client.getDocument(draft._id)
    if (!full) continue
    const { _id, _rev, ...rest } = full
    await client.createOrReplace({ ...rest, _id: publishedId })
    // Delete the draft
    await client.delete(draft._id)
    console.log(`  ✓ Published: ${publishedId}`)
  } catch (err) {
    console.error(`  ✗ Failed ${draft._id}:`, err.message)
  }
}

console.log('\n✅ All documents published!')
