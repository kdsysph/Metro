import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  groups: [
    { name: 'english', title: 'English Content', default: true },
    { name: 'amharic', title: 'Amharic Content' },
  ],
  fields: [
    defineField({ name: 'headOfficeLabel', title: 'Head Office Label', type: 'string', group: 'english' }),
    defineField({ name: 'headOfficeAddress', title: 'Head Office Address', type: 'text', group: 'english' }),
    defineField({ name: 'branchOfficeLabel', title: 'Branch Office Label', type: 'string', group: 'english' }),
    defineField({ name: 'branchOfficeAddress', title: 'Branch Office Address', type: 'text', group: 'english' }),
    defineField({ name: 'phoneNumber', title: 'Phone Number', type: 'string', group: 'english' }),
    defineField({ name: 'email', title: 'Email', type: 'string', group: 'english' }),
    defineField({
      name: 'workingHours',
      title: 'Working Hours',
      type: 'array',
      of: [{ type: 'workingHoursItem' }],
      group: 'english',
    }),
    defineField({
      name: 'defaultMapCenter',
      title: 'Default Map Center',
      type: 'mapLocation',
      group: 'english',
    }),
    defineField({
      name: 'mapMarkers',
      title: 'Map Markers',
      type: 'array',
      of: [{ type: 'mapLocation' }],
      group: 'english',
    }),
    defineField({ name: 'formHeading', title: 'Form Heading', type: 'string', group: 'english' }),
    defineField({ name: 'formSubtext', title: 'Form Subtext', type: 'text', group: 'english' }),

    // Amharic Content
    defineField({ name: 'headOfficeLabel_am', title: 'Head Office Label (Amharic)', type: 'string', group: 'amharic' }),
    defineField({ name: 'headOfficeAddress_am', title: 'Head Office Address (Amharic)', type: 'text', group: 'amharic' }),
    defineField({ name: 'branchOfficeLabel_am', title: 'Branch Office Label (Amharic)', type: 'string', group: 'amharic' }),
    defineField({ name: 'branchOfficeAddress_am', title: 'Branch Office Address (Amharic)', type: 'text', group: 'amharic' }),
    defineField({ name: 'formHeading_am', title: 'Form Heading (Amharic)', type: 'string', group: 'amharic' }),
    defineField({ name: 'formSubtext_am', title: 'Form Subtext (Amharic)', type: 'text', group: 'amharic' }),
  ],
  preview: {
    prepare() { return { title: 'Contact Page' } },
  },
})
