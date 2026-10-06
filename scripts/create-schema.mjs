import pkg from '@hygraph/management-sdk';
import dotenv from 'dotenv';

const { Client } = pkg;
dotenv.config();

const MANAGEMENT_API_TOKEN = process.env.HYGRAPH_MANAGEMENT_TOKEN;

const client = new Client({
  endpoint: 'https://eu-west-2.cdn.hygraph.com/content/cmu7ogzsz02ci06uwhmvetskf/master',
  managementEndpoint: 'https://management-eu-west-2.hygraph.com/graphql',
  token: MANAGEMENT_API_TOKEN,
});

async function createSchema() {
  console.log('🚀 Creating Hygraph schema via Management SDK...\n');

  try {
    // 1. Create Site enum
    console.log('📝 Creating Site enumeration...');
    await client.createEnumeration({
      apiId: 'Site',
      displayName: 'Site',
      values: [
        { apiId: 'KAZANCHIS', displayName: 'Kazanchis' },
        { apiId: 'BULBULA', displayName: 'Bulbula' },
        { apiId: 'SARBET', displayName: 'Sarbet' },
      ],
    });
    console.log('✅ Site enumeration created\n');

    // 2. Create MapLocation component
    console.log('📝 Creating MapLocation component...');
    await client.createComponent({
      apiId: 'MapLocation',
      displayName: 'Map Location',
      description: 'Latitude and longitude coordinates',
    });
    console.log('✅ MapLocation component created\n');

    // 3. Add fields to MapLocation component
    console.log('📝 Adding fields to MapLocation component...');
    await client.createSimpleField({
      componentId: 'MapLocation',
      apiId: 'latitude',
      displayName: 'Latitude',
      type: 'Float',
      isRequired: true,
    });
    await client.createSimpleField({
      componentId: 'MapLocation',
      apiId: 'longitude',
      displayName: 'Longitude',
      type: 'Float',
      isRequired: true,
    });
    console.log('✅ MapLocation fields added\n');

    // 4. Create Project model
    console.log('📝 Creating Project model...');
    await client.createModel({
      apiId: 'Project',
      displayName: 'Project',
      description: 'Real estate project/development',
    });
    console.log('✅ Project model created\n');

    // 5. Add fields to Project model
    console.log('📝 Adding fields to Project model...');
    const projectFields = [
      { apiId: 'projectName', displayName: 'Project Name', type: 'String', isRequired: true },
      { apiId: 'slug', displayName: 'Slug', type: 'Slug', isRequired: true, isUnique: true, slugConfig: { sourceFieldId: 'projectName' } },
      { apiId: 'description1', displayName: 'Description 1', type: 'RichText' },
      { apiId: 'decription2', displayName: 'Description 2', type: 'RichText' },
      { apiId: 'completionDate', displayName: 'Completion Date', type: 'String' },
      { apiId: 'totalProjectArea', displayName: 'Total Project Area (SQM)', type: 'String' },
      { apiId: 'totalPropertyUnits', displayName: 'Total Property Units', type: 'String' },
      { apiId: 'carParkingCapacity', displayName: 'Car Parking Capacity', type: 'String' },
      { apiId: 'address', displayName: 'Address', type: 'Text' },
      { apiId: 'distanceFromFriendshipPark', displayName: 'Distance from Friendship Park', type: 'String' },
      { apiId: 'distanceFromBoleIntlAirport', displayName: 'Distance from Bole Intl Airport', type: 'String' },
      { apiId: 'distanceFromFriendshipParkDesc', displayName: 'Friendship Park Description', type: 'Text' },
      { apiId: 'distanceFromBoleIntlAirportDesc', displayName: 'Bole Airport Description', type: 'Text' },
    ];

    for (const field of projectFields) {
      await client.createSimpleField({
        modelId: 'Project',
        ...field
      });
      console.log(`  ✓ ${field.apiId}`);
    }

    // Component field for mapLocation
    await client.createComponentField({
      modelId: 'Project',
      apiId: 'mapLocation',
      displayName: 'Map Location',
      componentConfig: { allowedComponents: ['MapLocation'], allowMultiple: false }
    });
    console.log('  ✓ mapLocation');

    // Asset fields
    console.log('  Adding asset fields...');
    const assetFields = [
      { apiId: 'image1', displayName: 'Image 1' },
      { apiId: 'secondBanner', displayName: 'Second Banner' },
      { apiId: 'image2', displayName: 'Image 2' },
      { apiId: 'image3', displayName: 'Image 3' },
      { apiId: 'image5', displayName: 'Image 5' },
      { apiId: 'bannePicture', displayName: 'Banner Picture' },
    ];

    for (const field of assetFields) {
      await client.createRelationalField({
        modelId: 'Project',
        apiId: field.apiId,
        displayName: field.displayName,
        type: 'ASSET',
        isList: false,
        reverseSide: {
          modelId: 'Asset',
          field: {
            apiId: `${field.apiId}Reverse`,
            displayName: `${field.displayName} (Reverse)`,
            isList: true,
          }
        }
      });
      console.log(`  ✓ ${field.apiId}`);
    }
    console.log('✅ Project model fields added\n');

    // 6. Create MetroNews model
    console.log('📝 Creating MetroNews model...');
    await client.createModel({
      apiId: 'MetroNews',
      displayName: 'Metro News',
      description: 'News articles and updates',
    });
    console.log('✅ MetroNews model created\n');

    // 7. Add fields to MetroNews model
    console.log('📝 Adding fields to MetroNews model...');
    const newsFields = [
      { apiId: 'title', displayName: 'Title', type: 'String', isRequired: true },
      { apiId: 'slug', displayName: 'Slug', type: 'Slug', isRequired: true, isUnique: true, slugConfig: { sourceFieldId: 'title' } },
      { apiId: 'date', displayName: 'Date', type: 'DateTime', isRequired: true },
      { apiId: 'description1', displayName: 'Description 1', type: 'RichText' },
      { apiId: 'description2', displayName: 'Description 2', type: 'RichText' },
    ];

    for (const field of newsFields) {
      await client.createSimpleField({
        modelId: 'MetroNews',
        ...field
      });
      console.log(`  ✓ ${field.apiId}`);
    }

    await client.createRelationalField({
      modelId: 'MetroNews',
      apiId: 'coverImage',
      displayName: 'Cover Image',
      type: 'ASSET',
      isList: false,
      reverseSide: {
        modelId: 'Asset',
        field: {
          apiId: 'coverImageReverse',
          displayName: 'Cover Image (Reverse)',
          isList: true,
        }
      }
    });
    console.log('  ✓ coverImage');
    console.log('✅ MetroNews model fields added\n');

    // 8. Create TwoBedroom model
    console.log('📝 Creating TwoBedroom model...');
    await client.createModel({
      apiId: 'TwoBedroom',
      displayName: '2 Bedroom Apartment',
      description: '2 bedroom apartment specifications by site',
    });
    console.log('✅ TwoBedroom model created\n');

    // 9. Add fields to TwoBedroom model
    console.log('📝 Adding fields to TwoBedroom model...');
    const twoBedFields = [
      { apiId: 'description1', displayName: 'Description 1', type: 'RichText' },
      { apiId: 'description2', displayName: 'Description 2', type: 'RichText' },
      { apiId: 'propertyLocationLevel', displayName: 'Property Location Level', type: 'String' },
      { apiId: 'totalCirculationAreaInSqm', displayName: 'Total Circulation Area (SQM)', type: 'String' },
      { apiId: 'totalFloorAreaInSqm', displayName: 'Total Floor Area (SQM)', type: 'String' },
      { apiId: 'bedroomPerPropertyUnits', displayName: 'Bedroom Per Property Units', type: 'String' },
    ];

    for (const field of twoBedFields) {
      await client.createSimpleField({
        modelId: 'TwoBedroom',
        ...field
      });
      console.log(`  ✓ ${field.apiId}`);
    }

    // Enum field for site
    await client.createEnumerableField({
      modelId: 'TwoBedroom',
      apiId: 'site',
      displayName: 'Site',
      isRequired: true,
      enumConfig: { enumId: 'Site' }
    });
    console.log('  ✓ site');
    console.log('✅ TwoBedroom model fields added\n');

    // Try run() instead of applySchemaChanges
    console.log('🔄 Running schema deployment...');
    await client.run();
    console.log('✅ Schema deployed\n');

    console.log('🎉 All schema created and deployed successfully!');
    console.log('\nNext steps:');
    console.log('1. Go to Hygraph UI → Content to add entries');
    console.log('2. Create 3 Project entries (Kazanchis, Bulbula, Sarbet)');
    console.log('3. Create MetroNews entries');
    console.log('4. Create TwoBedroom entries for each site');
    console.log('5. Upload images and link them');

  } catch (error) {
    console.error('❌ Error creating schema:', error.message);
    if (error.response?.errors) {
      console.error('GraphQL Errors:', JSON.stringify(error.response.errors, null, 2));
    }
    process.exit(1);
  }
}

createSchema();