import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  groups: [
    { name: 'english', title: 'English Content', default: true },
    { name: 'amharic', title: 'Amharic Content' },
  ],
  fields: [
    defineField({ name: 'projectName', title: 'Project Name', type: 'string', validation: (Rule) => Rule.required(), group: 'english' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'projectName', maxLength: 96 }, validation: (Rule) => Rule.required(), group: 'english' }),
    defineField({ name: 'description1', title: 'Description 1', type: 'array', of: [{ type: 'block' }], group: 'english' }),
    defineField({ name: 'description2', title: 'Description 2', type: 'array', of: [{ type: 'block' }], group: 'english' }),
    defineField({ name: 'completionDate', title: 'Completion Date', type: 'string', group: 'english' }),
    defineField({ name: 'totalProjectArea', title: 'Total Project Area (SQM)', type: 'string', group: 'english' }),
    defineField({ name: 'totalPropertyUnits', title: 'Total Property Units', type: 'string', group: 'english' }),
    defineField({ name: 'carParkingCapacity', title: 'Car Parking Capacity', type: 'string', group: 'english' }),
    defineField({ name: 'address', title: 'Address', type: 'text', group: 'english' }),
    defineField({ name: 'distanceFromFriendshipPark', title: 'Distance from Friendship Park', type: 'string', group: 'english' }),
    defineField({ name: 'distanceFromBoleIntlAirport', title: 'Distance from Bole Intl Airport', type: 'string', group: 'english' }),
    defineField({ name: 'distanceFromFriendshipParkDesc', title: 'Friendship Park Description', type: 'text', group: 'english' }),
    defineField({ name: 'distanceFromBoleIntlAirportDesc', title: 'Bole Airport Description', type: 'text', group: 'english' }),
    defineField({ name: 'mapLocation', title: 'Map Location', type: 'mapLocation', group: 'english' }),
    defineField({ name: 'images', title: 'Images', type: 'array', of: [{ type: 'imageWithRole' }], description: 'Add images and assign a role: banner, secondary-banner, or gallery.', group: 'english' }),
    defineField({ name: 'amenities', title: 'Amenities', type: 'array', of: [{ type: 'amenityItem' }], description: 'Amenity cards shown on the project detail page (e.g. Prime Locations, 24/7 Security).', group: 'english' }),
    defineField({ name: 'virtualTourUrl', title: 'Virtual Tour URL', type: 'url', description: '360° virtual tour link. When present, a tour section will be shown on the project detail page.', group: 'english' }),

    // Amharic Content
    defineField({ name: 'description1_am', title: 'Description 1 (Amharic)', type: 'array', of: [{ type: 'block' }], group: 'amharic' }),
    defineField({ name: 'description2_am', title: 'Description 2 (Amharic)', type: 'array', of: [{ type: 'block' }], group: 'amharic' }),
    defineField({ name: 'address_am', title: 'Address (Amharic)', type: 'text', group: 'amharic' }),
    defineField({ name: 'distanceFromFriendshipParkDesc_am', title: 'Friendship Park Description (Amharic)', type: 'text', group: 'amharic' }),
    defineField({ name: 'distanceFromBoleIntlAirportDesc_am', title: 'Bole Airport Description (Amharic)', type: 'text', group: 'amharic' }),
  ],
})
