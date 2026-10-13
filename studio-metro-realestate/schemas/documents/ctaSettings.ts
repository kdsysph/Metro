import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'ctaSettings',
  title: 'CTA Settings',
  type: 'document',
  groups: [
    { name: 'english', title: 'English Content', default: true },
    { name: 'amharic', title: 'Amharic Content' },
  ],
  fields: [
    // Download Brochure CTAs
    defineField({
      name: 'downloadBrochureButton',
      title: 'Download Brochure Button Text',
      type: 'string',
      description: 'e.g. "DOWNLOAD BROUCHER (2.8mB)"',
      group: 'english',
    }),
    defineField({
      name: 'getPropertyListButton',
      title: 'Get Property List Button Text',
      type: 'string',
      description: 'e.g. "GET METRO PROPERTY LIST"',
      group: 'english',
    }),
    defineField({
      name: 'downloadSalesKitButton',
      title: 'Download Sales Kit Button Text',
      type: 'string',
      description: 'e.g. "DOWNLOAD SALES KIT"',
      group: 'english',
    }),
    defineField({
      name: 'getProjectBrochureButton',
      title: 'Get Project Brochure Button Text',
      type: 'string',
      description: 'e.g. "GET {PROJECT_NAME} BROCHURE"',
      group: 'english',
    }),

    // Home Page CTAs
    defineField({
      name: 'discoverYourNextHomeButton',
      title: 'Discover Your Next Home Button Text',
      type: 'string',
      description: 'e.g. "DISCOVER YOUR NEXT HOME"',
      group: 'english',
    }),
    defineField({
      name: 'contactMetroSalesTeamButton',
      title: 'Contact Metro Sales Team Button Text',
      type: 'string',
      description: 'e.g. "CONTACT METRO SALES TEAM"',
      group: 'english',
    }),
    defineField({
      name: 'scheduleConsultationButton',
      title: 'Schedule Consultation Button Text',
      type: 'string',
      description: 'e.g. "SCHEDULE A CONSULTATION"',
      group: 'english',
    }),

    // Registration CTAs
    defineField({
      name: 'registerInterestButton',
      title: 'Register Interest Button Text',
      type: 'string',
      description: 'e.g. "REGISTER INTEREST"',
      group: 'english',
    }),
    defineField({
      name: 'submitInterestButton',
      title: 'Submit Interest Button Text',
      type: 'string',
      description: 'e.g. "Submit My Interest"',
      group: 'english',
    }),

    // Property List CTAs
    defineField({
      name: 'discoverNextHomeButton',
      title: 'Discover Next Home Button Text',
      type: 'string',
      description: 'e.g. "Discover your next home"',
      group: 'english',
    }),
    defineField({
      name: 'discoverSimilarPropertiesButton',
      title: 'Discover Similar Properties Button Text',
      type: 'string',
      description: 'e.g. "Discover Similar Properties"',
      group: 'english',
    }),
    defineField({
      name: 'reachOutToTeamButton',
      title: 'Reach Out To Team Button Text',
      type: 'string',
      description: 'e.g. "REACH OUT TO OUR TEAM"',
      group: 'english',
    }),

    // Amharic Content
    defineField({
      name: 'downloadBrochureButton_am',
      title: 'Download Brochure Button Text (Amharic)',
      type: 'string',
      group: 'amharic',
    }),
    defineField({
      name: 'getPropertyListButton_am',
      title: 'Get Property List Button Text (Amharic)',
      type: 'string',
      group: 'amharic',
    }),
    defineField({
      name: 'downloadSalesKitButton_am',
      title: 'Download Sales Kit Button Text (Amharic)',
      type: 'string',
      group: 'amharic',
    }),
    defineField({
      name: 'getProjectBrochureButton_am',
      title: 'Get Project Brochure Button Text (Amharic)',
      type: 'string',
      group: 'amharic',
    }),
    defineField({
      name: 'discoverYourNextHomeButton_am',
      title: 'Discover Your Next Home Button Text (Amharic)',
      type: 'string',
      group: 'amharic',
    }),
    defineField({
      name: 'contactMetroSalesTeamButton_am',
      title: 'Contact Metro Sales Team Button Text (Amharic)',
      type: 'string',
      group: 'amharic',
    }),
    defineField({
      name: 'scheduleConsultationButton_am',
      title: 'Schedule Consultation Button Text (Amharic)',
      type: 'string',
      group: 'amharic',
    }),
    defineField({
      name: 'registerInterestButton_am',
      title: 'Register Interest Button Text (Amharic)',
      type: 'string',
      group: 'amharic',
    }),
    defineField({
      name: 'submitInterestButton_am',
      title: 'Submit Interest Button Text (Amharic)',
      type: 'string',
      group: 'amharic',
    }),
    defineField({
      name: 'discoverNextHomeButton_am',
      title: 'Discover Next Home Button Text (Amharic)',
      type: 'string',
      group: 'amharic',
    }),
    defineField({
      name: 'discoverSimilarPropertiesButton_am',
      title: 'Discover Similar Properties Button Text (Amharic)',
      type: 'string',
      group: 'amharic',
    }),
    defineField({
      name: 'reachOutToTeamButton_am',
      title: 'Reach Out To Team Button Text (Amharic)',
      type: 'string',
      group: 'amharic',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'CTA Settings' }
    },
  },
})
