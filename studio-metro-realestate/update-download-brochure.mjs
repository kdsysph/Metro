import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '632xwlq5',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

// Get the property brochure option IDs
const propertyOptions = await client.fetch('*[_type == "propertyBrochureOption"] { _id }')

const updateData = {
  propertyOptions: propertyOptions.map(opt => ({
    _type: 'reference',
    _ref: opt._id
  }))
}

try {
  const result = await client.patch('downloadBrochure').set(updateData).commit()
  console.log('Download Brochure document updated successfully:', result._id)
} catch (error) {
  console.error('Error updating download brochure document:', error)
}
