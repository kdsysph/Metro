import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'galleryPage',
  title: 'Gallery Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Page Title', type: 'string' }),
    defineField({ name: 'title_am', title: 'Page Title (Amharic)', type: 'string' }),
    defineField({
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
            { name: 'caption', title: 'Caption', type: 'string' },
            { name: 'altText', title: 'Alt Text', type: 'string' },
          ],
          preview: {
            select: { media: 'image', title: 'caption' },
            prepare({ media, title }: any) {
              return { title: title || 'Gallery Image', media }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() { return { title: 'Gallery Page' } },
  },
})
