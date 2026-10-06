import fs from 'fs';
import crypto from 'crypto';

function generateId() {
  return crypto.randomBytes(12).toString('hex');
}

function transformHygraphToSanity() {
  console.log('🔄 Transforming Hygraph export to Sanity ndjson...\n');
  
  // Load Hygraph export (or create empty if file doesn't exist)
  let hygraphData = { projects: [], metroNews: [], twoBedrooms: [], assets: [] };
  if (fs.existsSync('hygraph-export.json')) {
    hygraphData = JSON.parse(fs.readFileSync('hygraph-export.json', 'utf-8'));
  }
  
  const sanityDocs = [];
  const assetMap = new Map(); // Hygraph URL -> Sanity asset ID
  
  // 1. Create asset documents first
  console.log('📝 Creating asset documents...');
  for (const assetUrl of hygraphData.assets) {
    const assetId = generateId();
    assetMap.set(assetUrl, assetId);
    
    sanityDocs.push({
      _id: assetId,
      _type: 'sanity.imageAsset',
      originalFilename: assetUrl.split('/').pop() || 'image',
      label: assetUrl,
      mimeType: 'image/jpeg',
      source: { id: '', name: '', url: assetUrl },
      metadata: {
        dimensions: { width: 1920, height: 1080, aspectRatio: 1.77 },
        lqip: '',
        hasAlpha: false,
        isOpaque: true,
      },
      assetId: assetId,
      _createdAt: new Date().toISOString(),
      _updatedAt: new Date().toISOString(),
    });
  }
  console.log(`  ✓ Created ${hygraphData.assets.length} asset documents`);
  
  // 2. Transform Projects
  console.log('📝 Transforming Projects...');
  for (const project of hygraphData.projects) {
    const doc = {
      _id: generateId(),
      _type: 'project',
      projectName: project.projectName || '',
      slug: { current: project.slug || project.projectName?.toLowerCase().replace(/\s+/g, '-') || '' },
      description1: convertRichText(project.description1),
      decription2: convertRichText(project.decription2),
      completionDate: project.completionDate || '',
      totalProjectArea: project.totalProjectArea || '',
      totalPropertyUnits: project.totalPropertyUnits || '',
      carParkingCapacity: project.carParkingCapacity || '',
      address: project.address || '',
      distanceFromFriendshipPark: project.distanceFromFriendshipPark || '',
      distanceFromBoleIntlAirport: project.distanceFromBoleIntlAirport || '',
      distanceFromFriendshipParkDesc: project.distanceFromFriendshipParkDesc || '',
      distanceFromBoleIntlAirportDesc: project.distanceFromBoleIntlAirportDesc || '',
      mapLocation: project.mapLocation ? {
        _type: 'mapLocation',
        latitude: project.mapLocation.latitude,
        longitude: project.mapLocation.longitude,
      } : undefined,
      image1: project.image1?.url ? { _type: 'image', asset: { _ref: assetMap.get(project.image1.url), _type: 'reference' } } : undefined,
      secondBanner: project.secondBanner?.url ? { _type: 'image', asset: { _ref: assetMap.get(project.secondBanner.url), _type: 'reference' } } : undefined,
      image2: project.image2?.url ? { _type: 'image', asset: { _ref: assetMap.get(project.image2.url), _type: 'reference' } } : undefined,
      image3: project.image3?.url ? { _type: 'image', asset: { _ref: assetMap.get(project.image3.url), _type: 'reference' } } : undefined,
      image5: project.image5?.url ? { _type: 'image', asset: { _ref: assetMap.get(project.image5.url), _type: 'reference' } } : undefined,
      bannePicture: project.bannePicture?.url ? { _type: 'image', asset: { _ref: assetMap.get(project.bannePicture.url), _type: 'reference' } } : undefined,
    };
    
    // Remove undefined fields
    Object.keys(doc).forEach(key => doc[key] === undefined && delete doc[key]);
    
    sanityDocs.push(doc);
  }
  console.log(`  ✓ Transformed ${hygraphData.projects.length} projects`);
  
  // 3. Transform MetroNews
  console.log('📝 Transforming MetroNews...');
  for (const news of hygraphData.metroNews) {
    const doc = {
      _id: generateId(),
      _type: 'metroNews',
      title: news.title || '',
      slug: { current: news.slug || news.title?.toLowerCase().replace(/\s+/g, '-') || '' },
      date: news.date || new Date().toISOString(),
      description1: convertRichTextArray(news.description1),
      description2: convertRichTextArray(news.description2),
      coverImage: news.coverImage?.url ? { _type: 'image', asset: { _ref: assetMap.get(news.coverImage.url), _type: 'reference' } } : undefined,
    };
    
    Object.keys(doc).forEach(key => doc[key] === undefined && delete doc[key]);
    sanityDocs.push(doc);
  }
  console.log(`  ✓ Transformed ${hygraphData.metroNews.length} news articles`);
  
  // 4. Transform TwoBedrooms
  console.log('📝 Transforming TwoBedrooms...');
  for (const twoBed of hygraphData.twoBedrooms) {
    const doc = {
      _id: generateId(),
      _type: 'twoBedroom',
      description1: convertRichText(twoBed.description1),
      description2: convertRichText(twoBed.description2),
      propertyLocationLevel: twoBed.propertyLocationLevel || '',
      totalCirculationAreaInSqm: twoBed.totalCirculationAreaInSqm || '',
      totalFloorAreaInSqm: twoBed.totalFloorAreaInSqm || '',
      bedroomPerPropertyUnits: twoBed.bedroomPerPropertyUnits || '',
      site: twoBed.site || 'KAZANCHIS',
    };
    sanityDocs.push(doc);
  }
  console.log(`  ✓ Transformed ${hygraphData.twoBedrooms.length} two-bedroom entries`);
  
  // Write ndjson
  const ndjson = sanityDocs.map(doc => JSON.stringify(doc)).join('\n');
  fs.writeFileSync('sanity-import.ndjson', ndjson);
  
  console.log(`\n✅ Transform complete!`);
  console.log(`   Total documents: ${sanityDocs.length}`);
  console.log(`   Output: sanity-import.ndjson`);
}

function convertRichText(text) {
  if (!text) return [];
  if (Array.isArray(text)) return convertRichTextArray(text);
  // Simple string to Portable Text block
  return [{
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: String(text), marks: [] }],
    markDefs: [],
  }];
}

function convertRichTextArray(arr) {
  if (!Array.isArray(arr)) return convertRichText(arr);
  return arr.map(item => convertRichText(item)).flat();
}

transformHygraphToSanity();