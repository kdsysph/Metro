import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'metroNews',
  title: 'Metro News',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
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
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'secondaryImage',
      title: 'Secondary Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Optional decorative image shown alongside description2 on the news detail page.',
    }),

    // Amharic Content
    defineField({ name: 'title_am', title: 'Title (Amharic)', type: 'string' }),
    defineField({ name: 'description1_am', title: 'Description 1 (Amharic)', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'description2_am', title: 'Description 2 (Amharic)', type: 'array', of: [{ type: 'block' }] }),
  ],
})