import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const MANAGEMENT_API_TOKEN = process.env.HYGRAPH_MANAGEMENT_TOKEN;
const ENDPOINT = 'https://management-eu-west-2.hygraph.com/graphql';
const CONTENT_ENDPOINT = 'https://eu-west-2.cdn.hygraph.com/content/cmu7ogzsz02ci06uwhmvetskf/master';

async function graphql(endpoint, query, variables = {}) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${MANAGEMENT_API_TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
  });
  
  const result = await response.json();
  if (result.errors) {
    throw new Error(JSON.stringify(result.errors, null, 2));
  }
  return result.data;
}

async function exportHygraph() {
  console.log('🚀 Exporting data from Hygraph...\n');
  
  const exportData = {
    projects: [],
    metroNews: [],
    twoBedrooms: [],
    assets: [],
  };

  try {
    // 1. Export Projects
    console.log('📝 Fetching Projects...');
    const projectsData = await graphql(CONTENT_ENDPOINT, `
      {
        projects {
          id
          projectName
          slug
          description1
          decription2
          completionDate
          totalProjectArea
          totalPropertyUnits
          carParkingCapacity
          address
          distanceFromFriendshipPark
          distanceFromBoleIntlAirport
          distanceFromFriendshipParkDesc
          distanceFromBoleIntlAirportDesc
          mapLocation {
            latitude
            longitude
          }
          image1 { url }
          secondBanner { url }
          image2 { url }
          image3 { url }
          image5 { url }
          bannePicture { url }
        }
      }
    `);
    exportData.projects = projectsData.projects || [];
    console.log(`  ✓ Found ${exportData.projects.length} projects`);

    // 2. Export MetroNews
    console.log('📝 Fetching MetroNews...');
    const newsData = await graphql(CONTENT_ENDPOINT, `
      {
        metroNewss {
          id
          title
          slug
          date
          description1
          description2
          coverImage { url }
        }
      }
    `);
    exportData.metroNews = newsData.metroNewss || [];
    console.log(`  ✓ Found ${exportData.metroNews.length} news articles`);

    // 3. Export TwoBedrooms
    console.log('📝 Fetching TwoBedrooms...');
    const twoBedData = await graphql(CONTENT_ENDPOINT, `
      {
        twoBedrooms {
          id
          description1
          description2
          propertyLocationLevel
          totalCirculationAreaInSqm
          totalFloorAreaInSqm
          bedroomPerPropertyUnits
          site
        }
      }
    `);
    exportData.twoBedrooms = twoBedData.twoBedrooms || [];
    console.log(`  ✓ Found ${exportData.twoBedrooms.length} two-bedroom entries`);

    // 4. Collect all asset URLs
    console.log('📝 Collecting asset URLs...');
    const assetUrls = new Set();
    
    for (const project of exportData.projects) {
      ['image1', 'secondBanner', 'image2', 'image3', 'image5', 'bannePicture'].forEach(field => {
        if (project[field]?.url) assetUrls.add(project[field].url);
      });
    }
    for (const news of exportData.metroNews) {
      if (news.coverImage?.url) assetUrls.add(news.coverImage.url);
    }
    
    exportData.assets = Array.from(assetUrls);
    console.log(`  ✓ Found ${exportData.assets.length} unique assets`);

    // Save to file
    fs.writeFileSync('hygraph-export.json', JSON.stringify(exportData, null, 2));
    console.log('\n✅ Export saved to hygraph-export.json');
    
  } catch (error) {
    console.error('❌ Export failed:', error.message);
    process.exit(1);
  }
}

exportHygraph();