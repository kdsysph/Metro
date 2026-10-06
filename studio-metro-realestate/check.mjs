import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '632xwlq5',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

const projects = await client.fetch('*[_type == "project"] { _id, projectName, slug }')
console.log('PROJECTS:', JSON.stringify(projects, null, 2))

const units = await client.fetch('*[_type == "propertyUnit"] { _id, unitType, site, slug }')
console.log('UNITS:', JSON.stringify(units, null, 2))
