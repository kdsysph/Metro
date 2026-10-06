import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'imageWithRole',
  title: 'Image with Role',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      options: {
        list: [
          { title: 'Banner', value: 'banner' },
          { title: 'Secondary Banner', value: 'secondary-banner' },
          { title: 'Gallery', value: 'gallery' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      media: 'image',
      subtitle: 'role',
    },
    prepare({ media, subtitle }) {
      return { title: subtitle ?? 'Image', media }
    },
  },
})
