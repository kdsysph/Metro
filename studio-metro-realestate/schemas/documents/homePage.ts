import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  groups: [
    { name: 'english', title: 'English Content', default: true },
    { name: 'amharic', title: 'Amharic Content' },
  ],
  fields: [
    // Hero Section
    defineField({
      name: 'heroHeadlineText',
      title: 'Hero Headline Text',
      type: 'string',
      description: 'e.g. "Elegance & Tranquility"',
      group: 'english',
    }),
    defineField({
      name: 'heroDesktopVideoPath',
      title: 'Hero Desktop Video Path',
      type: 'string',
      description: 'e.g. "/Header Video Desktop.mp4"',
      group: 'english',
    }),
    defineField({
      name: 'heroMobileVideoPath',
      title: 'Hero Mobile Video Path',
      type: 'string',
      description: 'e.g. "/Header Video Mobile.mp4"',
      group: 'english',
    }),

    // Intro Section
    defineField({
      name: 'introTagline',
      title: 'Intro Tagline',
      type: 'string',
      description: 'e.g. "WELCOME TO METRO REAL ESTATE"',
      group: 'english',
    }),
    defineField({
      name: 'introHeading',
      title: 'Intro Heading',
      type: 'string',
      group: 'english',
    }),
    defineField({
      name: 'introParagraph1',
      title: 'Intro Paragraph 1',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'english',
    }),
    defineField({
      name: 'introParagraph2',
      title: 'Intro Paragraph 2',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'english',
    }),

    // Stats
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [{ type: 'statItem' }],
      group: 'english',
    }),

    // Elegance Section
    defineField({
      name: 'eleganceSectionHeading',
      title: 'Elegance Section Heading',
      type: 'string',
      group: 'english',
    }),
    defineField({
      name: 'eleganceParagraph1',
      title: 'Elegance Paragraph 1',
      type: 'text',
      group: 'english',
    }),
    defineField({
      name: 'eleganceParagraph2',
      title: 'Elegance Paragraph 2',
      type: 'text',
      group: 'english',
    }),

    // Property Types Section
    defineField({
      name: 'propertyTypesHeading1',
      title: 'Property Types Heading 1',
      type: 'string',
      description: 'e.g. "Find Homes —"',
      group: 'english',
    }),
    defineField({
      name: 'propertyTypesHeading2',
      title: 'Property Types Heading 2',
      type: 'string',
      description: 'e.g. "That Redefine Luxury Living"',
      group: 'english',
    }),
    defineField({
      name: 'propertyTypesParagraph1',
      title: 'Property Types Paragraph 1',
      type: 'text',
      group: 'english',
    }),
    defineField({
      name: 'propertyTypesParagraph2',
      title: 'Property Types Paragraph 2',
      type: 'text',
      group: 'english',
    }),

    // Consultation Section
    defineField({
      name: 'consultationHeading',
      title: 'Consultation Heading',
      type: 'string',
      group: 'english',
    }),
    defineField({
      name: 'consultationSubheading',
      title: 'Consultation Subheading',
      type: 'string',
      group: 'english',
    }),
    defineField({
      name: 'consultationBody',
      title: 'Consultation Body',
      type: 'text',
      group: 'english',
    }),
    defineField({
      name: 'staffPhoto',
      title: 'Staff Photo',
      type: 'image',
      options: { hotspot: true },
      group: 'english',
    }),

    // Amharic Content
    defineField({ name: 'heroHeadlineText_am', title: 'Hero Headline Text (Amharic)', type: 'string', group: 'amharic' }),
    defineField({ name: 'introTagline_am', title: 'Intro Tagline (Amharic)', type: 'string', group: 'amharic' }),
    defineField({ name: 'introHeading_am', title: 'Intro Heading (Amharic)', type: 'string', group: 'amharic' }),
    defineField({ name: 'introParagraph1_am', title: 'Intro Paragraph 1 (Amharic)', type: 'array', of: [{ type: 'block' }], group: 'amharic' }),
    defineField({ name: 'introParagraph2_am', title: 'Intro Paragraph 2 (Amharic)', type: 'array', of: [{ type: 'block' }], group: 'amharic' }),
    defineField({ name: 'eleganceSectionHeading_am', title: 'Elegance Section Heading (Amharic)', type: 'string', group: 'amharic' }),
    defineField({ name: 'eleganceParagraph1_am', title: 'Elegance Paragraph 1 (Amharic)', type: 'text', group: 'amharic' }),
    defineField({ name: 'eleganceParagraph2_am', title: 'Elegance Paragraph 2 (Amharic)', type: 'text', group: 'amharic' }),
    defineField({ name: 'propertyTypesHeading1_am', title: 'Property Types Heading 1 (Amharic)', type: 'string', group: 'amharic' }),
    defineField({ name: 'propertyTypesHeading2_am', title: 'Property Types Heading 2 (Amharic)', type: 'string', group: 'amharic' }),
    defineField({ name: 'propertyTypesParagraph1_am', title: 'Property Types Paragraph 1 (Amharic)', type: 'text', group: 'amharic' }),
    defineField({ name: 'propertyTypesParagraph2_am', title: 'Property Types Paragraph 2 (Amharic)', type: 'text', group: 'amharic' }),
    defineField({ name: 'consultationHeading_am', title: 'Consultation Heading (Amharic)', type: 'string', group: 'amharic' }),
    defineField({ name: 'consultationSubheading_am', title: 'Consultation Subheading (Amharic)', type: 'string', group: 'amharic' }),
    defineField({ name: 'consultationBody_am', title: 'Consultation Body (Amharic)', type: 'text', group: 'amharic' }),
  ],
  preview: {
    prepare() {
      return { title: 'Home Page' }
    },
  },
})
