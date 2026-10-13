import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'downloadBrochure',
  title: 'Download Brochure Page',
  type: 'document',
  groups: [
    { name: 'english', title: 'English Content', default: true },
    { name: 'amharic', title: 'Amharic Content' },
  ],
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string', group: 'english' }),
    defineField({ name: 'description', title: 'Description', type: 'text', group: 'english' }),
    defineField({ name: 'fullNameLabel', title: 'Full Name Label', type: 'string', group: 'english' }),
    defineField({ name: 'emailLabel', title: 'Email Address Label', type: 'string', group: 'english' }),
    defineField({ name: 'propertySelectLabel', title: 'Property Selection Label', type: 'string', group: 'english' }),
    defineField({
      name: 'propertyOptions',
      title: 'Property Options',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'propertyName', title: 'Property Name', type: 'string' },
            { name: 'propertyName_am', title: 'Property Name (Amharic)', type: 'string' },
            { name: 'brochureFile', title: 'Brochure PDF File', type: 'file' },
          ],
          preview: {
            select: { title: 'propertyName' },
          },
        },
      ],
      group: 'english',
    }),
    defineField({ name: 'termsText', title: 'Terms and Conditions Text', type: 'text', group: 'english' }),
    defineField({ name: 'termsLinkText', title: 'Terms Link Text', type: 'string', group: 'english' }),
    defineField({ name: 'submitButtonText', title: 'Submit Button Text', type: 'string', group: 'english' }),

    // Amharic Content
    defineField({ name: 'heading_am', title: 'Heading (Amharic)', type: 'string', group: 'amharic' }),
    defineField({ name: 'description_am', title: 'Description (Amharic)', type: 'text', group: 'amharic' }),
    defineField({ name: 'fullNameLabel_am', title: 'Full Name Label (Amharic)', type: 'string', group: 'amharic' }),
    defineField({ name: 'emailLabel_am', title: 'Email Address Label (Amharic)', type: 'string', group: 'amharic' }),
    defineField({ name: 'propertySelectLabel_am', title: 'Property Selection Label (Amharic)', type: 'string', group: 'amharic' }),
    defineField({ name: 'termsText_am', title: 'Terms and Conditions Text (Amharic)', type: 'text', group: 'amharic' }),
    defineField({ name: 'termsLinkText_am', title: 'Terms Link Text (Amharic)', type: 'string', group: 'amharic' }),
    defineField({ name: 'submitButtonText_am', title: 'Submit Button Text (Amharic)', type: 'string', group: 'amharic' }),
  ],
  preview: {
    prepare() { return { title: 'Download Brochure Page' } },
  },
})
