import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'twoBedroom',
  title: '2 Bedroom Apartment',
  type: 'document',
  fields: [
    defineField({
      name: 'description1',
      title: 'Description 1',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'description2',
      title: 'Description 2',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'propertyLocationLevel',
      title: 'Property Location Level',
      type: 'string',
    }),
    defineField({
      name: 'totalCirculationAreaInSqm',
      title: 'Total Circulation Area (SQM)',
      type: 'string',
    }),
    defineField({
      name: 'totalFloorAreaInSqm',
      title: 'Total Floor Area (SQM)',
      type: 'string',
    }),
    defineField({
      name: 'bedroomPerPropertyUnits',
      title: 'Bedroom Per Property Units',
      type: 'string',
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
    }),
  ],
})