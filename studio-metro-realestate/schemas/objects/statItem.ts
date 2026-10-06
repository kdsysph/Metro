import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'statItem',
  title: 'Stat Item',
  type: 'object',
  fields: [
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      description: 'e.g. "58+ Years"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'e.g. "ACTIVE IN THE ETHIOPIAN BUSINESS"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'label_am',
      title: 'Label (Amharic)',
      type: 'string',
    }),
    defineField({
      name: 'description_am',
      title: 'Description (Amharic)',
      type: 'text',
    }),
  ],
  preview: {
    select: { title: 'value', subtitle: 'label' },
  },
})
