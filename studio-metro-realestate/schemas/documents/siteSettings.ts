import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'english', title: 'English Content', default: true },
    { name: 'amharic', title: 'Amharic Content' },
  ],
  fields: [
    defineField({ name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true }, group: 'english' }),
    defineField({ name: 'phoneNumber', title: 'Phone Number', type: 'string', group: 'english' }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      type: 'string',
      description: 'WhatsApp contact number shown on the Contact page (e.g. +25193 806 0606).',
      group: 'english',
    }),
    defineField({ name: 'email', title: 'Email', type: 'string', group: 'english' }),
    defineField({ name: 'headOfficeAddress', title: 'Head Office Address', type: 'text', group: 'english' }),
    defineField({ name: 'branchOfficeAddress', title: 'Branch Office Address', type: 'text', group: 'english' }),
    defineField({ name: 'facebookUrl', title: 'Facebook URL', type: 'url', group: 'english' }),
    defineField({ name: 'youtubeUrl', title: 'YouTube URL', type: 'url', group: 'english' }),
    defineField({ name: 'instagramUrl', title: 'Instagram URL', type: 'url', group: 'english' }),
    defineField({ name: 'linkedinUrl', title: 'LinkedIn URL', type: 'url', group: 'english' }),
    defineField({ name: 'copyrightText', title: 'Copyright Text', type: 'string', group: 'english' }),
    defineField({ name: 'workingHours', title: 'Working Hours', type: 'array', of: [{ type: 'workingHoursItem' }], group: 'english' }),

    // Amharic Content
    defineField({ name: 'headOfficeAddress_am', title: 'Head Office Address (Amharic)', type: 'text', group: 'amharic' }),
    defineField({ name: 'branchOfficeAddress_am', title: 'Branch Office Address (Amharic)', type: 'text', group: 'amharic' }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})
