import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'workingHoursItem',
  title: 'Working Hours Item',
  type: 'object',
  fields: [
    defineField({
      name: 'day',
      title: 'Day',
      type: 'string',
      description: 'e.g. "Monday - Friday"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hours',
      title: 'Hours',
      type: 'string',
      description: 'e.g. "02:30 — 11:00LT"',
    }),
    defineField({
      name: 'closed',
      title: 'Closed',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'day', subtitle: 'hours' },
  },
})
