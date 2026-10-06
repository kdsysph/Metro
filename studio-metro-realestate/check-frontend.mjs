import { createClient } from '@sanity/client'
import 'dotenv/config'

// Use NO token — same as the frontend (unauthenticated, useCdn: false)
const client = createClient({
  projectId: '632xwlq5',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

const home = await client.fetch('*[_type == "homePage"][0]{ heroHeadlineText, introHeading, stats }')
const about = await client.fetch('*[_type == "aboutPage"][0]{ heroHeading }')
const contact = await client.fetch('*[_type == "contactPage"][0]{ phoneNumber }')
const projects = await client.fetch('*[_type == "project"]{ projectName, slug }')

console.log('homePage:  ', JSON.stringify(home))
console.log('aboutPage: ', JSON.stringify(about))
console.log('contactPage:', JSON.stringify(contact))
console.log('projects:  ', JSON.stringify(projects))
