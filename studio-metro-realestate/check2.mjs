import { createClient } from '@sanity/client'

// Test with useCdn: true (same as frontend)
const client = createClient({
  projectId: '632xwlq5',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

// Exact query from groq-queries.ts
const projects = await client.fetch(`*[_type == "project"] | order(_createdAt asc) { _id, projectName, slug }`)
console.log('allProjects result:', JSON.stringify(projects, null, 2))

const units = await client.fetch(`*[_type == "propertyUnit"] | order(site asc, unitType asc) { _id, unitType, site, slug, coverImage }`)
console.log('allPropertyUnits count:', units.length)

const bySlug = await client.fetch(`*[_type == "project" && slug.current == $slug][0] { _id, projectName, slug, description1, description2, completionDate, totalProjectArea, totalPropertyUnits, carParkingCapacity, address, distanceFromFriendshipPark, distanceFromBoleIntlAirport, mapLocation { latitude, longitude }, images[] { image, role, caption } }`, { slug: 'kazanchis' })
console.log('projectBySlug (kazanchis):', JSON.stringify(bySlug, null, 2))

const unit = await client.fetch(`*[_type == "propertyUnit" && unitType == $unitType && site == $site][0] { _id, unitType, site, description1, description2, propertyLocationLevel, totalFloorAreaInSqm }`, { unitType: '2bed', site: 'KAZANCHIS' })
console.log('propertyUnit (KAZANCHIS 2bed):', JSON.stringify(unit, null, 2))
