import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'amenityItem',
  title: 'Amenity Item',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],
  preview: {
    select: { title: 'title', media: 'icon' },
    prepare({ title, media }) {
      return { title: title ?? 'Amenity', media }
    },
  },
})
