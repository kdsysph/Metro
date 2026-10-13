import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '632xwlq5',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

const propertyBrochureDocs = await client.fetch('*[_type == "propertyBrochureOption"] { _id }')

console.log(`Found ${propertyBrochureDocs.length} property brochure option documents to delete`)

for (const doc of propertyBrochureDocs) {
  try {
    await client.delete(doc._id)
    console.log(`Deleted document: ${doc._id}`)
  } catch (error) {
    console.error(`Error deleting document ${doc._id}:`, error)
  }
}

console.log('Done')
