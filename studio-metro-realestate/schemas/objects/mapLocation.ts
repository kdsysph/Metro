import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'mapLocation',
  title: 'Map Location',
  type: 'object',
  fields: [
    defineField({
      name: 'latitude',
      title: 'Latitude',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'longitude',
      title: 'Longitude',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
  ],
})