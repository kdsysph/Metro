import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  groups: [
    { name: 'english', title: 'English Content', default: true },
    { name: 'amharic', title: 'Amharic Content' },
  ],
  fields: [
    defineField({ name: 'bannerImage', title: 'Banner Image', type: 'image', options: { hotspot: true }, group: 'english' }),
    defineField({ name: 'heroHeading', title: 'Hero Heading', type: 'string', group: 'english' }),
    defineField({ name: 'introSubheading', title: 'Intro Subheading', type: 'string', group: 'english' }),
    defineField({ name: 'introParagraph1', title: 'Intro Paragraph 1', type: 'array', of: [{ type: 'block' }], group: 'english' }),
    defineField({ name: 'introParagraph2', title: 'Intro Paragraph 2', type: 'array', of: [{ type: 'block' }], group: 'english' }),
    defineField({ name: 'secondaryBannerImage', title: 'Secondary Banner Image', type: 'image', options: { hotspot: true }, description: 'Decorative image shown between the intro text and the stats section.', group: 'english' }),
    defineField({ name: 'stats', title: 'Stats', type: 'array', of: [{ type: 'statItem' }], group: 'english' }),
    defineField({ name: 'about3Image', title: 'About Section Image', type: 'image', options: { hotspot: true }, group: 'english' }),
    defineField({ name: 'secondaryHeading', title: 'Secondary Heading', type: 'string', group: 'english' }),
    defineField({ name: 'visionTitle', title: 'Vision Title', type: 'string', group: 'english' }),
    defineField({ name: 'visionBody', title: 'Vision Body', type: 'text', group: 'english' }),
    defineField({ name: 'missionTitle', title: 'Mission Title', type: 'string', group: 'english' }),
    defineField({ name: 'missionBody', title: 'Mission Body', type: 'text', group: 'english' }),
    defineField({ name: 'galleryImage1', title: 'Gallery Image 1', type: 'image', options: { hotspot: true }, group: 'english' }),
    defineField({ name: 'galleryImage2', title: 'Gallery Image 2', type: 'image', options: { hotspot: true }, group: 'english' }),
    defineField({ name: 'tourSectionImage', title: 'Tour Section Image', type: 'image', options: { hotspot: true }, description: 'Full-width image shown after gallery images and before the team section.', group: 'english' }),
    defineField({ name: 'teamSectionHeading', title: 'Team Section Heading', type: 'string', group: 'english' }),
    defineField({ name: 'teamChampionsLabel', title: 'Team Champions Label', type: 'string', group: 'english' }),
    defineField({ name: 'teamDescription', title: 'Team Description', type: 'text', group: 'english' }),
    defineField({
      name: 'teamMembers',
      title: 'Team Members',
      type: 'array',
      group: 'english',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Name', type: 'string' },
            { name: 'position', title: 'Position', type: 'string' },
            { name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } },
          ],
          preview: {
            select: { title: 'name', subtitle: 'position', media: 'photo' },
          },
        },
      ],
    }),

    // Amharic Content
    defineField({ name: 'heroHeading_am', title: 'Hero Heading (Amharic)', type: 'string', group: 'amharic' }),
    defineField({ name: 'introSubheading_am', title: 'Intro Subheading (Amharic)', type: 'string', group: 'amharic' }),
    defineField({ name: 'introParagraph1_am', title: 'Intro Paragraph 1 (Amharic)', type: 'array', of: [{ type: 'block' }], group: 'amharic' }),
    defineField({ name: 'introParagraph2_am', title: 'Intro Paragraph 2 (Amharic)', type: 'array', of: [{ type: 'block' }], group: 'amharic' }),
    defineField({ name: 'secondaryHeading_am', title: 'Secondary Heading (Amharic)', type: 'string', group: 'amharic' }),
    defineField({ name: 'visionTitle_am', title: 'Vision Title (Amharic)', type: 'string', group: 'amharic' }),
    defineField({ name: 'visionBody_am', title: 'Vision Body (Amharic)', type: 'text', group: 'amharic' }),
    defineField({ name: 'missionTitle_am', title: 'Mission Title (Amharic)', type: 'string', group: 'amharic' }),
    defineField({ name: 'missionBody_am', title: 'Mission Body (Amharic)', type: 'text', group: 'amharic' }),
    defineField({ name: 'teamSectionHeading_am', title: 'Team Section Heading (Amharic)', type: 'string', group: 'amharic' }),
    defineField({ name: 'teamChampionsLabel_am', title: 'Team Champions Label (Amharic)', type: 'string', group: 'amharic' }),
    defineField({ name: 'teamDescription_am', title: 'Team Description (Amharic)', type: 'text', group: 'amharic' }),
  ],
  preview: {
    prepare() { return { title: 'About Page' } },
  },
})
