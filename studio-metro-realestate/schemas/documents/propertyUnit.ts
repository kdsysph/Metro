import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'propertyUnit',
  title: 'Property Unit',
  type: 'document',
  groups: [
    { name: 'english', title: 'English Content', default: true },
    { name: 'amharic', title: 'Amharic Content' },
  ],
  fields: [
    defineField({
      name: 'unitType',
      title: 'Unit Type',
      type: 'string',
      options: {
        list: [
          { title: '2 Bedroom Apartment', value: '2bed' },
          { title: '3 Bedroom Apartment', value: '3bed' },
          { title: '4 Bedroom Apartment', value: '4bed' },
          { title: 'Villa', value: 'villa' },
          { title: 'Townhouse', value: 'townhouse' },
          { title: 'Penthouse', value: 'penthouse' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
      group: 'english',
    }),
    defineField({
      name: 'site',
      title: 'Site',
      type: 'string',
      options: {
        list: [
          { title: 'Kazanchis', value: 'KAZANCHIS' },
          { title: 'Bulbula', value: 'BULBULA' },
          { title: 'Sarbet', value: 'SARBET' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
      group: 'english',
    }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: (doc: any) => `${doc.site}-${doc.unitType}`, maxLength: 96 }, validation: (Rule) => Rule.required(), group: 'english' }),
    defineField({ name: 'project', title: 'Project', type: 'reference', to: [{ type: 'project' }], group: 'english' }),
    defineField({ name: 'description1', title: 'Description 1', type: 'array', of: [{ type: 'block' }], group: 'english' }),
    defineField({ name: 'description2', title: 'Description 2', type: 'array', of: [{ type: 'block' }], group: 'english' }),
    defineField({ name: 'propertyLocationLevel', title: 'Property Location Level', type: 'string', group: 'english' }),
    defineField({ name: 'totalCirculationAreaInSqm', title: 'Total Circulation Area (SQM)', type: 'string', group: 'english' }),
    defineField({ name: 'totalFloorAreaInSqm', title: 'Total Floor Area (SQM)', type: 'string', group: 'english' }),
    defineField({ name: 'bedroomPerPropertyUnits', title: 'Bedroom Per Property Units', type: 'string', group: 'english' }),
    defineField({ name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true }, group: 'english' }),
    defineField({ name: 'images', title: 'Images', type: 'array', of: [{ type: 'imageWithRole' }], description: 'Add images and assign a role: banner or gallery.', group: 'english' }),
    defineField({ name: 'amenities', title: 'Amenities', type: 'array', of: [{ type: 'amenityItem' }], description: 'Amenity cards shown on the unit detail page.', group: 'english' }),
    defineField({ name: 'floorPlanImage', title: 'Floor Plan Image', type: 'image', options: { hotspot: true }, description: 'Floor plan layout image shown on the unit detail page.', group: 'english' }),
    defineField({ name: 'mapLocation', title: 'Map Location', type: 'mapLocation', description: 'Latitude/longitude for the map embed on the unit detail page.', group: 'english' }),

    // Amharic Content
    defineField({ name: 'description1_am', title: 'Description 1 (Amharic)', type: 'array', of: [{ type: 'block' }], group: 'amharic' }),
    defineField({ name: 'description2_am', title: 'Description 2 (Amharic)', type: 'array', of: [{ type: 'block' }], group: 'amharic' }),
  ],
  preview: {
    select: {
      unitType: 'unitType',
      site: 'site',
      media: 'coverImage',
    },
    prepare({ unitType, site, media }) {
      return {
        title: `${unitType ?? 'Unknown type'} — ${site ?? 'Unknown site'}`,
        media,
      }
    },
  },
})
