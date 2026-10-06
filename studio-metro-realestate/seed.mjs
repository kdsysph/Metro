/**
 * Comprehensive Sanity seed script — populates ALL content that was previously
 * hardcoded in the Metro Real Estate frontend.
 *
 * Run from inside studio-metro-realestate/:
 *   node seed.mjs
 *
 * Requires SANITY_API_TOKEN env var with write access (editor or above).
 * Set it in a .env file or export it before running.
 */

import { createClient } from '@sanity/client'
import 'dotenv/config'

const client = createClient({
  projectId: '632xwlq5',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function key() {
  return Math.random().toString(36).slice(2, 10)
}

/** Wrap plain text as a single-block Portable Text array */
function block(text) {
  return {
    _type: 'block',
    _key: key(),
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: key(), text, marks: [] }],
  }
}

/** Build a Portable Text array from one or more strings (one block each) */
function pt(...lines) {
  return lines.map(block)
}

/** Upsert a document and log result */
async function upsert(doc) {
  try {
    await client.createOrReplace(doc)
    console.log(`  ✓  ${doc._type} → ${doc._id}`)
    return true
  } catch (err) {
    console.error(`  ✗  ${doc._type} → ${doc._id}: ${err.message}`)
    return false
  }
}

// ─── AMENITIES (reused across projects and property units) ───────────────────

const STANDARD_AMENITIES = [
  {
    _type: 'amenityItem',
    _key: key(),
    title: 'PRIME LOCATIONS',
    description:
      'Strategically located within reasonable proximity to Bole Intl. Airport and Meskel Square.',
  },
  {
    _type: 'amenityItem',
    _key: key(),
    title: 'SPECTACULAR LIVING',
    description:
      'Bright and spacious apartments designed with great attention to design & details.',
  },
  {
    _type: 'amenityItem',
    _key: key(),
    title: 'LIFE & WELLNESS',
    description:
      'All amenities you may need and more to enjoy your living with easy accessibility.',
  },
  {
    _type: 'amenityItem',
    _key: key(),
    title: '24/7 SECURITY',
    description:
      'The site is fully equipped with CCTV surveillance systems for better security.',
  },
]

function freshAmenities() {
  return STANDARD_AMENITIES.map((a) => ({ ...a, _key: key() }))
}

// ─── WORKING HOURS ────────────────────────────────────────────────────────────

const WORKING_HOURS = [
  { _type: 'workingHoursItem', _key: key(), day: 'Monday - Friday', hours: '02:30 — 11:00LT', closed: false },
  { _type: 'workingHoursItem', _key: key(), day: 'Saturday', hours: '02:30 — 06:30LT', closed: false },
  { _type: 'workingHoursItem', _key: key(), day: 'Sunday', hours: '', closed: true },
]

function freshWorkingHours() {
  return WORKING_HOURS.map((w) => ({ ...w, _key: key() }))
}

// ─── STATS ───────────────────────────────────────────────────────────────────

const STATS = [
  {
    _type: 'statItem',
    _key: key(),
    value: '58+ Years',
    label: 'ACTIVE IN THE ETHIOPIAN BUSINESS',
    description:
      'Experience the Legacy of Over 58 Years in Ethiopian Business. Explore Our Established History and Commitment to Excellence!',
  },
  {
    _type: 'statItem',
    _key: key(),
    value: '+1200',
    label: 'NUMBER OF DELIVERED PROPERTIES',
    description: 'Over 1200 Properties Delivered. Discover Our Commitment to Quality and Excellence!',
  },
  {
    _type: 'statItem',
    _key: key(),
    value: '200K+ SQM',
    label: 'OF DEVELOPED REAL ESTATE LAND',
    description: 'Developed Over 200,000 sqm of Prime Real Estate. Explore Our Expansive Land Portfolio!',
  },
]

function freshStats() {
  return STATS.map((s) => ({ ...s, _key: key() }))
}

const ABOUT_STATS = [
  {
    _type: 'statItem',
    _key: key(),
    value: '58+ Years',
    label: 'ACTIVE IN THE ETHIOPIAN BUSINESS',
    description: 'Experience the Legacy of Over 58 Years in Ethiopian Business.',
  },
  {
    _type: 'statItem',
    _key: key(),
    value: '+1200',
    label: 'NUMBER OF DELIVERED PROPERTIES',
    description: 'Over 1200 Properties Delivered.',
  },
  {
    _type: 'statItem',
    _key: key(),
    value: '+5 LOCATIONS',
    label: 'PROJECT DEVELOPMENT LOCATIONS',
    description: 'From suburban tranquility in Bulbula to vibrant city living in Kazanchis.',
  },
  {
    _type: 'statItem',
    _key: key(),
    value: '200K+ SQM',
    label: 'OF DEVELOPED REAL ESTATE LAND',
    description: 'Developed Over 200,000 sqm of Prime Real Estate.',
  },
]

function freshAboutStats() {
  return ABOUT_STATS.map((s) => ({ ...s, _key: key() }))
}

// ─── 1. SITE SETTINGS ────────────────────────────────────────────────────────

const siteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  phoneNumber: '+25193 806 0606',
  email: 'sales@metrorealestateet.com',
  headOfficeAddress:
    '2nd Floor; Sur construction Building,\nAfrica Ave, Addis Ababa, AA, Ethiopia',
  branchOfficeAddress:
    'Refenti Mall Area; Bole Bulbula Site,\nAfrica Ave, Addis Ababa, AA, Ethiopia',
  facebookUrl: 'https://www.facebook.com/',
  youtubeUrl: 'https://www.youtube.com/',
  instagramUrl: 'https://www.instagram.com/',
  linkedinUrl: 'https://www.linkedin.com/',
  copyrightText: '2024 ©Metro Real Estate™',
  workingHours: freshWorkingHours(),
}

// ─── 2. HOME PAGE ─────────────────────────────────────────────────────────────

const homePage = {
  _id: 'homePage',
  _type: 'homePage',
  heroHeadlineText: 'Elegance & Tranquility',
  heroDesktopVideoPath: '/Header%20Video%20Desktop.mp4',
  heroMobileVideoPath: '/Header%20Video%20Mobile.mp4',
  introTagline: 'WELCOME TO METRO REAL ESTATE',
  introHeading: 'A home to live your dream lifestyle',
  introParagraph1: pt(
    "Welcome to Metro Real Estate, where exceptional living meets thoughtful design. Established in Addis Ababa in April 2012, we are proud to be a subsidiary of the Kangaroo Industrial Group S.C., bringing over five decades of expertise to Ethiopia's real estate landscape."
  ),
  introParagraph2: pt(
    "At Metro Real Estate, our vision is clear: to lead Ethiopia's real estate development industry by crafting exceptional living spaces that cater to diverse lifestyles and empower residents to thrive."
  ),
  stats: freshStats(),
  eleganceSectionHeading: 'Experience Unmatched Elegance with Metro™',
  eleganceParagraph1:
    'Metro Real Estate has developed over 200,000 square meters of prime real estate across Ethiopia, offering innovative properties that redefine urban living with thoughtful design and inviting spaces.',
  eleganceParagraph2:
    'We have a commendable track record of delivering over 100 homes to satisfied customers. Our commitment to quality and service excellence has earned us a reputation as a trusted developer in the Ethiopian real estate market.',
  propertyTypesHeading1: 'Find Homes —',
  propertyTypesHeading2: 'That Redefine Luxury Living',
  propertyTypesParagraph1:
    'Discover our diverse collection of homes tailored to elevate your lifestyle beyond the ordinary. Whether you seek an apartment, villa, or townhouse, we have the perfect option for you. Experience exceptional living with Metro Real Estate.',
  propertyTypesParagraph2:
    'A diverse portfolio of property types and locations tailored to your lifestyle. From suburban tranquility in Bulbula to vibrant city living in Kazanchis, and upscale residences near Old Airport, find your perfect home with Metro Real Estate.',
  consultationHeading: 'Connect with\nOur Sales Team\nfor a Free\nConsultation!',
  consultationSubheading: 'Let Us Guide You Home',
  consultationBody:
    'Gain personalized guidance and expert advice tailored to your needs. Book a consultation with our sales experts and discover your dream home today.',
}

// ─── 3. ABOUT PAGE ───────────────────────────────────────────────────────────

const aboutPage = {
  _id: 'aboutPage',
  _type: 'aboutPage',
  heroHeading: 'Welcome to Metro Real Estate - Your Next Dream Home!',
  introSubheading: 'METRO REAL ESTATE UNBOXED',
  introParagraph1: pt(
    "Welcome to Metro Real Estate, where exceptional living and thoughtful design converge. Founded in Addis Ababa in April 2012, we proudly belong to the Kangaroo Industrial Group S.C., bringing over five decades of expertise to Ethiopia's industrial, commercial, and trading landscape."
  ),
  introParagraph2: pt(
    "Discover how we can help you find your perfect home or investment opportunity. Whether you're looking for a cozy apartment or a luxurious villa, we're here to guide you every step of the way."
  ),
  stats: freshAboutStats(),
  secondaryHeading: 'Uncover the Perfect Place to Live with Metro Real Estate',
  visionTitle: 'OUR VISION',
  visionBody:
    "At Metro Real Estate, our vision is clear: to lead Ethiopia's real estate development industry by crafting exceptional living spaces that cater to diverse lifestyles and empower residents to thrive for perfection.",
  missionTitle: 'OUR MISSION',
  missionBody:
    'Our mission is to deliver thoughtfully designed, high-quality homes at competitive prices. We strive to exceed customer expectations through personalized service, innovation, and unwavering integrity.',
  teamSectionHeading: 'Meet the— People behind Metro Real Estate™',
  teamChampionsLabel: 'OUR CHAMPIONS',
  teamDescription:
    'Meet the dedicated team behind Metro Real Estate, where passion meets expertise. Our diverse team is committed to delivering exceptional service and innovative solutions in the real estate industry.',
  teamMembers: [
    { _type: 'object', _key: key(), name: 'Adera Habtamu', position: 'PRINCIPAL HEAD, FOUNDER/CEO' },
    { _type: 'object', _key: key(), name: 'Mikreselasie G.', position: 'HEAD OF MARKETING AND SALES' },
    { _type: 'object', _key: key(), name: 'Abubaker Seid', position: 'VICE HEAD OF ACCOUNTING' },
    { _type: 'object', _key: key(), name: 'Kidist Alemu', position: 'VICE HEAD OF HUMAN RESOURCE' },
    { _type: 'object', _key: key(), name: 'Sami Ahmed', position: 'HEAD OF OPERATIONS' },
    { _type: 'object', _key: key(), name: 'Kidus Yoseph', position: 'VICE HEAD OF OPERATIONS' },
    { _type: 'object', _key: key(), name: 'Ayalew Kebede', position: 'MANAGER OF EXTERNAL OPS' },
    { _type: 'object', _key: key(), name: 'Misrak Teferra', position: 'TEAM LEAD OF EXTERNAL OPS' },
  ],
}

// ─── 4. CONTACT PAGE ─────────────────────────────────────────────────────────

const contactPage = {
  _id: 'contactPage',
  _type: 'contactPage',
  headOfficeLabel: 'Head Office',
  headOfficeAddress:
    '2nd Floor; Sur Construction Building,\nAfrica Ave, Addis Ababa, AA, Ethiopia',
  branchOfficeLabel: 'Metro™ Sales Points',
  branchOfficeAddress:
    'Refenti Mall Area; Bole Bulbula Site,\nAfrica Ave, Addis Ababa, AA, Ethiopia',
  phoneNumber: '+25193 806 0606',
  email: 'sales@metrorealestateet.com',
  workingHours: freshWorkingHours(),
  defaultMapCenter: { _type: 'mapLocation', latitude: 8.999737, longitude: 38.7700249 },
  mapMarkers: [
    { _type: 'mapLocation', _key: key(), latitude: 9.012788, longitude: 38.775208 },
    { _type: 'mapLocation', _key: key(), latitude: 8.9451929, longitude: 38.7851493 },
    { _type: 'mapLocation', _key: key(), latitude: 8.984135960290898, longitude: 38.72723843279496 },
    { _type: 'mapLocation', _key: key(), latitude: 8.999737, longitude: 38.7700249 },
  ],
  formHeading: "We'd love to hear from you!",
  formSubtext:
    'Fill in the form below to request details or to plan a tour of the Metro model apartment and its beautiful surroundings.',
}

// ─── 5. GALLERY PAGE ─────────────────────────────────────────────────────────

const galleryPage = {
  _id: 'galleryPage',
  _type: 'galleryPage',
  title: 'Metro™ Gallery',
  // NOTE: Images are placeholders — upload the actual files from /public/ in Sanity Studio.
  // Gallery1.jpg through Gallery11.jpg must be uploaded and assigned to each slot.
  images: Array.from({ length: 11 }, (_, i) => ({
    _type: 'object',
    _key: key(),
    caption: `Gallery Image ${i + 1}`,
    altText: `Metro Real Estate Gallery ${i + 1}`,
  })),
}

// ─── 6. PROJECTS ─────────────────────────────────────────────────────────────

const projects = [
  {
    _id: 'project-kazanchis',
    _type: 'project',
    projectName: 'Kazanchis',
    slug: { _type: 'slug', current: 'kazanchis' },
    description1: pt(
      "Metro Kazanchis is a premier mixed-use development located in the heart of Addis Ababa's most vibrant and prestigious district. Designed for those who seek the finest in urban living, this landmark project offers a curated selection of luxurious residences, including 2, 3, and 4 bedroom apartments as well as exclusive penthouses."
    ),
    description2: pt(
      'Each residence at Metro Kazanchis has been thoughtfully designed with open floor plans, premium finishes, and floor-to-ceiling windows that frame stunning city views. The development integrates seamlessly into the surrounding urban fabric while providing a private sanctuary of comfort and elegance for its residents.'
    ),
    completionDate: '2025',
    totalProjectArea: '45,000',
    totalPropertyUnits: '320',
    carParkingCapacity: '400',
    address: 'Kazanchis, Addis Ababa, Ethiopia',
    distanceFromFriendshipPark: '0.5 KM',
    distanceFromBoleIntlAirport: '7 KM',
    distanceFromFriendshipParkDesc:
      "Metro Kazanchis is just a short 5-minute walk from Friendship Park, one of the city's most beloved green spaces, offering residents easy access to outdoor recreation and leisure.",
    distanceFromBoleIntlAirportDesc:
      'Conveniently situated only 7 kilometres from Bole International Airport, Metro Kazanchis ensures seamless connectivity for frequent travellers and international residents.',
    mapLocation: { _type: 'mapLocation', latitude: 9.012788, longitude: 38.775208 },
    images: [
      { _type: 'imageWithRole', _key: key(), role: 'banner', caption: 'Kazanchis Banner' },
      { _type: 'imageWithRole', _key: key(), role: 'gallery', caption: 'Kazanchis Gallery 1' },
      { _type: 'imageWithRole', _key: key(), role: 'gallery', caption: 'Kazanchis Gallery 2' },
      { _type: 'imageWithRole', _key: key(), role: 'gallery', caption: 'Kazanchis Gallery 3' },
    ],
    amenities: freshAmenities(),
  },
  {
    _id: 'project-bulbula',
    _type: 'project',
    projectName: 'Bulbula',
    slug: { _type: 'slug', current: 'bulbula' },
    description1: pt(
      'Metro Bulbula is a sprawling residential community set across a generous landscape on the outskirts of Addis Ababa. This exclusive development offers a rare combination of space, privacy, and modern comfort, featuring an impressive collection of villas, townhouses, and multi-bedroom apartments.'
    ),
    description2: pt(
      'Designed with families and lifestyle in mind, Metro Bulbula incorporates extensive green spaces, communal amenities, and secure gated access. Each property has been crafted to the highest standards, blending contemporary architecture with functional layouts that suit the diverse needs of modern residents.'
    ),
    completionDate: '2026',
    totalProjectArea: '120,000',
    totalPropertyUnits: '450',
    carParkingCapacity: '600',
    address: 'Bulbula, Addis Ababa, Ethiopia',
    distanceFromFriendshipPark: '12 KM',
    distanceFromBoleIntlAirport: '5 KM',
    distanceFromFriendshipParkDesc:
      "Located approximately 12 kilometres from Friendship Park, Metro Bulbula provides a peaceful retreat from the city while remaining well connected to its key landmarks and attractions.",
    distanceFromBoleIntlAirportDesc:
      "Metro Bulbula's proximity to Bole International Airport — just 5 kilometres away — makes it an ideal choice for professionals and families with international connections.",
    mapLocation: { _type: 'mapLocation', latitude: 8.9451929, longitude: 38.7851493 },
    images: [
      { _type: 'imageWithRole', _key: key(), role: 'banner', caption: 'Bulbula Banner' },
      { _type: 'imageWithRole', _key: key(), role: 'gallery', caption: 'Bulbula Gallery 1' },
      { _type: 'imageWithRole', _key: key(), role: 'gallery', caption: 'Bulbula Gallery 2' },
      { _type: 'imageWithRole', _key: key(), role: 'gallery', caption: 'Bulbula Gallery 3' },
    ],
    amenities: freshAmenities(),
  },
  {
    _id: 'project-sarbet',
    _type: 'project',
    projectName: 'Sarbet',
    slug: { _type: 'slug', current: 'sarbet' },
    description1: pt(
      "Metro Sarbet offers a sophisticated urban living experience in one of Addis Ababa's most desirable southern neighbourhoods. This carefully planned residential development presents an exquisite range of 2 and 3 bedroom apartments, each designed to maximise light, space, and comfort."
    ),
    description2: pt(
      "Metro Sarbet's architecture reflects a harmonious blend of modern aesthetics and cultural sensibility, creating a development that feels both globally inspired and distinctly Ethiopian. Residents enjoy access to a full suite of on-site amenities and the vibrant community life that defines this dynamic location."
    ),
    completionDate: '2025',
    totalProjectArea: '38,000',
    totalPropertyUnits: '210',
    carParkingCapacity: '280',
    address: 'Sarbet, Addis Ababa, Ethiopia',
    distanceFromFriendshipPark: '3 KM',
    distanceFromBoleIntlAirport: '10 KM',
    distanceFromFriendshipParkDesc:
      "Metro Sarbet is situated approximately 3 kilometres from Friendship Park, offering residents a convenient connection to the city's green heart and recreational facilities.",
    distanceFromBoleIntlAirportDesc:
      'Bole International Airport is reachable in approximately 20 minutes from Metro Sarbet, providing practical accessibility for residents with frequent travel requirements.',
    mapLocation: { _type: 'mapLocation', latitude: 8.984135960290898, longitude: 38.72723843279496 },
    images: [
      { _type: 'imageWithRole', _key: key(), role: 'banner', caption: 'Sarbet Banner' },
      { _type: 'imageWithRole', _key: key(), role: 'gallery', caption: 'Sarbet Gallery 1' },
      { _type: 'imageWithRole', _key: key(), role: 'gallery', caption: 'Sarbet Gallery 2' },
      { _type: 'imageWithRole', _key: key(), role: 'gallery', caption: 'Sarbet Gallery 3' },
    ],
    amenities: freshAmenities(),
  },
]

// ─── 7. PROPERTY UNITS ────────────────────────────────────────────────────────

const propertyUnits = [
  // ── KAZANCHIS ──────────────────────────────────────────────────────────────
  {
    _id: 'propertyUnit-KAZANCHIS-2bed',
    _type: 'propertyUnit',
    unitType: '2bed',
    site: 'KAZANCHIS',
    slug: { _type: 'slug', current: 'KAZANCHIS-2bed' },
    project: { _type: 'reference', _ref: 'project-kazanchis' },
    description1: pt(
      'The 2 Bedroom Apartment at Metro Kazanchis has been designed to deliver a premium urban lifestyle. Spanning a generous floor area, each unit features an open-plan living and dining area, two well-proportioned bedrooms with built-in wardrobes, a fully equipped kitchen, and elegantly finished bathrooms.'
    ),
    description2: pt(
      "Floor-to-ceiling windows flood the interiors with natural light and offer commanding views of Addis Ababa's skyline. Every detail — from the imported fixtures to the high-quality flooring — reflects Metro's commitment to excellence and attention to design."
    ),
    propertyLocationLevel: 'G+2 to G+14',
    totalCirculationAreaInSqm: '18',
    totalFloorAreaInSqm: '112',
    bedroomPerPropertyUnits: '2',
    images: [
      { _type: 'imageWithRole', _key: key(), role: 'banner', caption: 'Kazanchis 2 Bed Banner' },
      { _type: 'imageWithRole', _key: key(), role: 'gallery', caption: 'Kazanchis 2 Bed Gallery 1' },
      { _type: 'imageWithRole', _key: key(), role: 'gallery', caption: 'Kazanchis 2 Bed Gallery 2' },
    ],
    amenities: freshAmenities(),
  },
  {
    _id: 'propertyUnit-KAZANCHIS-3bed',
    _type: 'propertyUnit',
    unitType: '3bed',
    site: 'KAZANCHIS',
    slug: { _type: 'slug', current: 'KAZANCHIS-3bed' },
    project: { _type: 'reference', _ref: 'project-kazanchis' },
    description1: pt(
      'Metro Kazanchis 3 Bedroom Apartments offer a spacious and refined living environment for families and discerning residents. The carefully considered layout features three generously sized bedrooms, a large open-plan living area, a dedicated dining space, and a modern kitchen with premium fittings.'
    ),
    description2: pt(
      'The apartments are finished to an exceptional standard, with quality materials chosen to create interiors that are both beautiful and durable. Residents benefit from panoramic views across the city and access to the full range of Metro Kazanchis amenities.'
    ),
    propertyLocationLevel: 'G+8 to G+20',
    totalCirculationAreaInSqm: '22',
    totalFloorAreaInSqm: '158',
    bedroomPerPropertyUnits: '3',
    images: [
      { _type: 'imageWithRole', _key: key(), role: 'banner', caption: 'Kazanchis 3 Bed Banner' },
      { _type: 'imageWithRole', _key: key(), role: 'gallery', caption: 'Kazanchis 3 Bed Gallery 1' },
      { _type: 'imageWithRole', _key: key(), role: 'gallery', caption: 'Kazanchis 3 Bed Gallery 2' },
    ],
    amenities: freshAmenities(),
  },
  {
    _id: 'propertyUnit-KAZANCHIS-4bed',
    _type: 'propertyUnit',
    unitType: '4bed',
    site: 'KAZANCHIS',
    slug: { _type: 'slug', current: 'KAZANCHIS-4bed' },
    project: { _type: 'reference', _ref: 'project-kazanchis' },
    description1: pt(
      'The 4 Bedroom Apartment at Metro Kazanchis represents the pinnacle of apartment living in Addis Ababa. These expansive residences offer four large bedrooms, multiple bathrooms, a grand living area, a separate dining room, and a gourmet kitchen — all finished to the highest possible standard.'
    ),
    description2: pt(
      "Designed for those who refuse to compromise on space or quality, these apartments deliver an unmatched living experience. With sweeping cityscape views and access to Metro Kazanchis's world-class facilities, this is urban living at its most elevated."
    ),
    propertyLocationLevel: 'G+15 to G+22',
    totalCirculationAreaInSqm: '28',
    totalFloorAreaInSqm: '220',
    bedroomPerPropertyUnits: '4',
    images: [
      { _type: 'imageWithRole', _key: key(), role: 'banner', caption: 'Kazanchis 4 Bed Banner' },
      { _type: 'imageWithRole', _key: key(), role: 'gallery', caption: 'Kazanchis 4 Bed Gallery 1' },
      { _type: 'imageWithRole', _key: key(), role: 'gallery', caption: 'Kazanchis 4 Bed Gallery 2' },
    ],
    amenities: freshAmenities(),
  },
  {
    _id: 'propertyUnit-KAZANCHIS-penthouse',
    _type: 'propertyUnit',
    unitType: 'penthouse',
    site: 'KAZANCHIS',
    slug: { _type: 'slug', current: 'KAZANCHIS-penthouse' },
    project: { _type: 'reference', _ref: 'project-kazanchis' },
    description1: pt(
      "The 4 Bedroom Penthouse at Metro Kazanchis is a statement of luxury at the very top of the tower. Occupying the highest levels of the development, these exclusive residences offer expansive terraces, panoramic 360-degree views of Addis Ababa, and interiors finished with the finest materials sourced from around the world."
    ),
    description2: pt(
      "Each penthouse is a unique sanctuary of elegance — featuring a private entrance, a chef's kitchen, a master suite with a dressing room and spa-inspired en suite, and vast living spaces designed for both intimate family life and sophisticated entertaining. Ownership here is truly in a class of its own."
    ),
    propertyLocationLevel: 'Top Floor',
    totalCirculationAreaInSqm: '35',
    totalFloorAreaInSqm: '380',
    bedroomPerPropertyUnits: '4',
    images: [
      { _type: 'imageWithRole', _key: key(), role: 'banner', caption: 'Kazanchis Penthouse Banner' },
      { _type: 'imageWithRole', _key: key(), role: 'gallery', caption: 'Kazanchis Penthouse Gallery 1' },
      { _type: 'imageWithRole', _key: key(), role: 'gallery', caption: 'Kazanchis Penthouse Gallery 2' },
    ],
    amenities: freshAmenities(),
  },

  // ── BULBULA ────────────────────────────────────────────────────────────────
  {
    _id: 'propertyUnit-BULBULA-2bed',
    _type: 'propertyUnit',
    unitType: '2bed',
    site: 'BULBULA',
    slug: { _type: 'slug', current: 'BULBULA-2bed' },
    project: { _type: 'reference', _ref: 'project-bulbula' },
    description1: pt(
      'The 2 Bedroom Apartment at Metro Bulbula brings together contemporary design and generous space in a community setting. Each unit offers an open-plan living and dining area that flows onto a private balcony, two comfortable bedrooms, and sleek modern bathrooms — all within a secure gated residential community.'
    ),
    description2: pt(
      "Residents enjoy the full benefits of Metro Bulbula's extensive grounds and communal facilities, including landscaped gardens, a swimming pool, and dedicated children's play areas. It is an ideal home for young families and professionals seeking space without sacrificing the conveniences of city living."
    ),
    propertyLocationLevel: 'G+1 to G+8',
    totalCirculationAreaInSqm: '16',
    totalFloorAreaInSqm: '108',
    bedroomPerPropertyUnits: '2',
    images: [
      { _type: 'imageWithRole', _key: key(), role: 'banner', caption: 'Bulbula 2 Bed Banner' },
      { _type: 'imageWithRole', _key: key(), role: 'gallery', caption: 'Bulbula 2 Bed Gallery 1' },
      { _type: 'imageWithRole', _key: key(), role: 'gallery', caption: 'Bulbula 2 Bed Gallery 2' },
    ],
    amenities: freshAmenities(),
  },
  {
    _id: 'propertyUnit-BULBULA-3bed',
    _type: 'propertyUnit',
    unitType: '3bed',
    site: 'BULBULA',
    slug: { _type: 'slug', current: 'BULBULA-3bed' },
    project: { _type: 'reference', _ref: 'project-bulbula' },
    description1: pt(
      "Metro Bulbula's 3 Bedroom Apartments provide the ideal balance between space, comfort, and community. Featuring three well-appointed bedrooms, expansive living areas, and a modern kitchen, these residences have been thoughtfully designed to accommodate the needs of growing families."
    ),
    description2: pt(
      "Set within Metro Bulbula's beautifully landscaped grounds, residents benefit from a peaceful environment, communal green spaces, and a wide range of on-site facilities. With secure parking, 24-hour security, and excellent transport links, this is a community designed for life."
    ),
    propertyLocationLevel: 'G+4 to G+12',
    totalCirculationAreaInSqm: '20',
    totalFloorAreaInSqm: '152',
    bedroomPerPropertyUnits: '3',
    images: [
      { _type: 'imageWithRole', _key: key(), role: 'banner', caption: 'Bulbula 3 Bed Banner' },
      { _type: 'imageWithRole', _key: key(), role: 'gallery', caption: 'Bulbula 3 Bed Gallery 1' },
      { _type: 'imageWithRole', _key: key(), role: 'gallery', caption: 'Bulbula 3 Bed Gallery 2' },
    ],
    amenities: freshAmenities(),
  },
  {
    _id: 'propertyUnit-BULBULA-4bed',
    _type: 'propertyUnit',
    unitType: '4bed',
    site: 'BULBULA',
    slug: { _type: 'slug', current: 'BULBULA-4bed' },
    project: { _type: 'reference', _ref: 'project-bulbula' },
    description1: pt(
      'The 4 Bedroom Apartment at Metro Bulbula offers exceptional space and privacy within a vibrant residential community. With four spacious bedrooms, multiple bathrooms, a large open-plan living area, and a fully fitted kitchen, this is a home designed to accommodate the modern family in comfort and style.'
    ),
    description2: pt(
      "Each apartment benefits from direct access to Metro Bulbula's extensive communal amenities, including landscaped gardens, recreational facilities, and 24-hour concierge services. The combination of generous living space and community infrastructure makes this one of the most desirable family homes in Addis Ababa."
    ),
    propertyLocationLevel: 'G+8 to G+15',
    totalCirculationAreaInSqm: '26',
    totalFloorAreaInSqm: '205',
    bedroomPerPropertyUnits: '4',
    images: [
      { _type: 'imageWithRole', _key: key(), role: 'banner', caption: 'Bulbula 4 Bed Banner' },
      { _type: 'imageWithRole', _key: key(), role: 'gallery', caption: 'Bulbula 4 Bed Gallery 1' },
      { _type: 'imageWithRole', _key: key(), role: 'gallery', caption: 'Bulbula 4 Bed Gallery 2' },
    ],
    amenities: freshAmenities(),
  },
  {
    _id: 'propertyUnit-BULBULA-villa',
    _type: 'propertyUnit',
    unitType: 'villa',
    site: 'BULBULA',
    slug: { _type: 'slug', current: 'BULBULA-villa' },
    project: { _type: 'reference', _ref: 'project-bulbula' },
    description1: pt(
      'The G+1 Luxurious Villas at Metro Bulbula offer an extraordinary private residential experience. Each villa spans two elegant levels, with a ground floor dedicated to generous living and entertaining spaces — including a grand sitting room, a formal dining area, and a fully equipped open-plan kitchen — alongside a private garden and a covered carport.'
    ),
    description2: pt(
      "The upper level houses four beautifully appointed bedrooms, each with premium en-suite bathrooms and built-in wardrobes. The master suite features a private terrace with views across the landscaped grounds. Finished to Metro's signature standard of excellence, these villas represent the very best in private family living."
    ),
    propertyLocationLevel: 'G+1',
    totalCirculationAreaInSqm: '45',
    totalFloorAreaInSqm: '420',
    bedroomPerPropertyUnits: '4',
    images: [
      { _type: 'imageWithRole', _key: key(), role: 'banner', caption: 'Bulbula Villa Banner' },
      { _type: 'imageWithRole', _key: key(), role: 'gallery', caption: 'Bulbula Villa Gallery 1' },
      { _type: 'imageWithRole', _key: key(), role: 'gallery', caption: 'Bulbula Villa Gallery 2' },
    ],
    amenities: freshAmenities(),
  },
  {
    _id: 'propertyUnit-BULBULA-townhouse',
    _type: 'propertyUnit',
    unitType: 'townhouse',
    site: 'BULBULA',
    slug: { _type: 'slug', current: 'BULBULA-townhouse' },
    project: { _type: 'reference', _ref: 'project-bulbula' },
    description1: pt(
      'The G+2 Opulent Townhouses at Metro Bulbula redefine multi-level residential living. Spread across three thoughtfully designed floors, each townhouse offers an exceptional level of space and privacy within the Metro Bulbula community. The ground floor features an open-plan kitchen, living, and dining area with access to a private courtyard garden.'
    ),
    description2: pt(
      'The first and second floors house five generously sized bedrooms, each with en-suite facilities, alongside a dedicated study, a family lounge, and a rooftop terrace with panoramic views of the surrounding landscape. These townhouses are designed for families who demand the very best in residential living, combining the privacy of a standalone home with the security and amenities of Metro Bulbula.'
    ),
    propertyLocationLevel: 'G+2',
    totalCirculationAreaInSqm: '55',
    totalFloorAreaInSqm: '520',
    bedroomPerPropertyUnits: '5',
    images: [
      { _type: 'imageWithRole', _key: key(), role: 'banner', caption: 'Bulbula Townhouse Banner' },
      { _type: 'imageWithRole', _key: key(), role: 'gallery', caption: 'Bulbula Townhouse Gallery 1' },
      { _type: 'imageWithRole', _key: key(), role: 'gallery', caption: 'Bulbula Townhouse Gallery 2' },
    ],
    amenities: freshAmenities(),
  },

  // ── SARBET ─────────────────────────────────────────────────────────────────
  {
    _id: 'propertyUnit-SARBET-2bed',
    _type: 'propertyUnit',
    unitType: '2bed',
    site: 'SARBET',
    slug: { _type: 'slug', current: 'SARBET-2bed' },
    project: { _type: 'reference', _ref: 'project-sarbet' },
    description1: pt(
      "Metro Sarbet's 2 Bedroom Apartments offer a refined and accessible entry into the Metro lifestyle. Each apartment features a bright open-plan living and dining area, two well-proportioned bedrooms, and high-quality bathrooms, all finished to a consistent standard of excellence that defines the Metro brand."
    ),
    description2: pt(
      "Situated in the heart of Sarbet, these apartments benefit from excellent access to the city's commercial, retail, and cultural amenities. The development's secure environment, professional management, and communal facilities make it an ideal choice for professionals and couples seeking a quality urban home."
    ),
    propertyLocationLevel: 'G+2 to G+10',
    totalCirculationAreaInSqm: '15',
    totalFloorAreaInSqm: '105',
    bedroomPerPropertyUnits: '2',
    images: [
      { _type: 'imageWithRole', _key: key(), role: 'banner', caption: 'Sarbet 2 Bed Banner' },
      { _type: 'imageWithRole', _key: key(), role: 'gallery', caption: 'Sarbet 2 Bed Gallery 1' },
      { _type: 'imageWithRole', _key: key(), role: 'gallery', caption: 'Sarbet 2 Bed Gallery 2' },
    ],
    amenities: freshAmenities(),
  },
  {
    _id: 'propertyUnit-SARBET-3bed',
    _type: 'propertyUnit',
    unitType: '3bed',
    site: 'SARBET',
    slug: { _type: 'slug', current: 'SARBET-3bed' },
    project: { _type: 'reference', _ref: 'project-sarbet' },
    description1: pt(
      "The 3 Bedroom Apartment at Metro Sarbet is a beautifully proportioned family home in one of Addis Ababa's most sought-after residential areas. Featuring three spacious bedrooms, a large combined living and dining area, a modern fitted kitchen, and premium bathroom fittings, this apartment sets a new standard for mid-rise living in the city."
    ),
    description2: pt(
      "Metro Sarbet's central location puts residents within easy reach of international schools, hospitals, restaurants, and retail outlets. The development's well-maintained communal areas and professional on-site management ensure a consistently high quality of living for all residents."
    ),
    propertyLocationLevel: 'G+5 to G+14',
    totalCirculationAreaInSqm: '21',
    totalFloorAreaInSqm: '155',
    bedroomPerPropertyUnits: '3',
    images: [
      { _type: 'imageWithRole', _key: key(), role: 'banner', caption: 'Sarbet 3 Bed Banner' },
      { _type: 'imageWithRole', _key: key(), role: 'gallery', caption: 'Sarbet 3 Bed Gallery 1' },
      { _type: 'imageWithRole', _key: key(), role: 'gallery', caption: 'Sarbet 3 Bed Gallery 2' },
    ],
    amenities: freshAmenities(),
  },
  {
    _id: 'propertyUnit-SARBET-4bed',
    _type: 'propertyUnit',
    unitType: '4bed',
    site: 'SARBET',
    slug: { _type: 'slug', current: 'SARBET-4bed' },
    project: { _type: 'reference', _ref: 'project-sarbet' },
    description1: pt(
      "Metro Sarbet's 4 Bedroom Apartment is a premium family residence offering abundant space and superior finishes. With four large bedrooms, multiple bathrooms, a grand living area, a separate family room, and a gourmet kitchen, this apartment caters to the needs of discerning families who expect the best."
    ),
    description2: pt(
      "Each unit enjoys beautiful city views and is finished with carefully selected materials that create a warm, sophisticated atmosphere. As part of the Metro Sarbet community, residents have access to a comprehensive range of amenities and the peace of mind that comes with Metro's renowned security and management standards."
    ),
    propertyLocationLevel: 'G+10 to G+18',
    totalCirculationAreaInSqm: '27',
    totalFloorAreaInSqm: '215',
    bedroomPerPropertyUnits: '4',
    images: [
      { _type: 'imageWithRole', _key: key(), role: 'banner', caption: 'Sarbet 4 Bed Banner' },
      { _type: 'imageWithRole', _key: key(), role: 'gallery', caption: 'Sarbet 4 Bed Gallery 1' },
      { _type: 'imageWithRole', _key: key(), role: 'gallery', caption: 'Sarbet 4 Bed Gallery 2' },
    ],
    amenities: freshAmenities(),
  },
]

// ─── 8. METRO NEWS ────────────────────────────────────────────────────────────

const metroNews = [
  {
    _id: 'metroNews-launch-kazanchis',
    _type: 'metroNews',
    title: 'Metro Kazanchis: A New Era of Urban Living in Addis Ababa',
    slug: { _type: 'slug', current: 'metro-kazanchis-new-era-urban-living' },
    date: '2024-03-15T09:00:00.000Z',
    description1: pt(
      "We are thrilled to announce the official launch of Metro Kazanchis, our landmark mixed-use development in the heart of Addis Ababa's most prestigious district. This project represents a new benchmark for urban living in Ethiopia — combining world-class design with exceptional amenities and a prime central location."
    ),
    description2: pt(
      "Metro Kazanchis will offer a curated selection of luxurious residences including 2, 3, and 4 bedroom apartments and exclusive penthouses. Each unit has been designed with open floor plans, premium finishes, and floor-to-ceiling windows that frame stunning city views. We invite you to visit our sales office and discover your future home."
    ),
  },
  {
    _id: 'metroNews-bulbula-community',
    _type: 'metroNews',
    title: 'Metro Bulbula Community: Where Space Meets Modern Living',
    slug: { _type: 'slug', current: 'metro-bulbula-community-space-modern-living' },
    date: '2024-06-20T09:00:00.000Z',
    description1: pt(
      "Metro Bulbula continues to grow as Addis Ababa's most sought-after residential community. Our sprawling development on the outskirts of the city offers an unrivalled combination of space, privacy, and modern comfort — setting a new standard for suburban living in Ethiopia."
    ),
    description2: pt(
      "From luxurious villas and opulent townhouses to well-appointed apartments, Metro Bulbula has a home for every lifestyle. The development features extensive landscaped gardens, communal recreational facilities, and 24-hour security — everything a modern family needs. Contact our sales team today to arrange a viewing."
    ),
  },
]

// ─── SEED FUNCTION ────────────────────────────────────────────────────────────

async function seed() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('ERROR: SANITY_API_TOKEN is not set.')
    console.error('  Export it or add it to a .env file in studio-metro-realestate/ before running.')
    process.exit(1)
  }

  console.log('🌱  Metro Real Estate — comprehensive Sanity seed\n')

  // 1. Site Settings
  console.log('⚙️   Site Settings')
  await upsert(siteSettings)

  // 2. Home Page
  console.log('\n🏠  Home Page')
  await upsert(homePage)

  // 3. About Page
  console.log('\n📖  About Page')
  await upsert(aboutPage)

  // 4. Contact Page
  console.log('\n📞  Contact Page')
  await upsert(contactPage)

  // 5. Gallery Page
  console.log('\n🖼️   Gallery Page')
  await upsert(galleryPage)

  // 6. Projects
  console.log('\n📦  Projects')
  for (const project of projects) {
    await upsert(project)
  }

  // 7. Property Units
  console.log('\n🏗️   Property Units')
  for (const unit of propertyUnits) {
    await upsert(unit)
  }

  // 8. Metro News
  console.log('\n📰  Metro News')
  for (const news of metroNews) {
    await upsert(news)
  }

  printImageChecklist()
}

// ─── IMAGE UPLOAD CHECKLIST ───────────────────────────────────────────────────

function printImageChecklist() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════╗
║             IMAGE UPLOAD CHECKLIST — Sanity Studio                      ║
║  Open Studio → navigate to each document → upload the listed file       ║
╚══════════════════════════════════════════════════════════════════════════╝

All image files are in the /public/ folder of the Next.js project.

──── SITE SETTINGS ─────────────────────────────────────────────────────────
  Document : siteSettings
  logo     → public/logo.svg

──── HOME PAGE ─────────────────────────────────────────────────────────────
  Document   : homePage
  staffPhoto → public/Staff photo.jpg

──── ABOUT PAGE ────────────────────────────────────────────────────────────
  Document       : aboutPage
  bannerImage    → public/AboutBannerImage.jpg
  about3Image    → public/about3Image.jpg
  galleryImage1  → public/about4Image.jpg
  galleryImage2  → public/about5Image.jpg

  teamMembers (no photos required by default — upload per member if available):
    Adera Habtamu     → (no stock photo — upload when available)
    Mikreselasie G.   → (no stock photo — upload when available)
    Abubaker Seid     → (no stock photo — upload when available)
    Kidist Alemu      → (no stock photo — upload when available)
    Sami Ahmed        → (no stock photo — upload when available)
    Kidus Yoseph      → (no stock photo — upload when available)
    Ayalew Kebede     → (no stock photo — upload when available)
    Misrak Teferra    → (no stock photo — upload when available)

──── GALLERY PAGE ──────────────────────────────────────────────────────────
  Document : galleryPage  (11 slots)
  images[0]  → public/Gallery1.jpg
  images[1]  → public/Gallery2.jpg
  images[2]  → public/Gallery3.jpg
  images[3]  → public/Gallery4.jpg
  images[4]  → public/Gallery5.jpg
  images[5]  → public/Gallery6.jpg
  images[6]  → public/Gallery7.jpg
  images[7]  → public/Gallery8.jpg
  images[8]  → public/Gallery9.jpg
  images[9]  → public/Gallery10.jpg
  images[10] → public/Gallery11.jpg

──── PROJECTS ──────────────────────────────────────────────────────────────
  project-kazanchis
    images[banner]    → public/kazanchis.jpg  (or kazanchisBanner.jpg)
    images[gallery1]  → public/kazanchis2.jpg
    images[gallery2]  → public/kazanchis3.jpg
    images[gallery3]  → public/kazanchisTower1.jpg
    amenities[icons]  → (optional — leave blank to use fallback SVG icons)

  project-bulbula
    images[banner]    → public/BUlbulaBanner.jpg
    images[gallery1]  → public/Bulbula2Image.jpg
    images[gallery2]  → public/Bulbula3.jpg
    images[gallery3]  → public/Bulbula4.jpg
    amenities[icons]  → (optional)

  project-sarbet
    images[banner]    → public/SarbetBanner.jpg
    images[gallery1]  → public/SarbetImage2.jpg
    images[gallery2]  → public/SarbetImage3.jpg
    images[gallery3]  → public/SarbetImage4.jpg
    amenities[icons]  → (optional)

──── PROPERTY UNITS ────────────────────────────────────────────────────────
  Each unit needs a banner image at minimum. Upload the gallery images as available.

  KAZANCHIS-2bed    banner → public/2BedromImage.jpg
                  gallery1 → public/2Bedrom2Image.jpg
                  gallery2 → public/2Bedrom3Image.jpg

  KAZANCHIS-3bed    banner → public/3BedroomImage.jpg
                  gallery1 → public/21ABedroom.jpg

  KAZANCHIS-4bed    banner → public/Apartment.jpg
                  gallery1 → public/Apartment1.jpg
                  gallery2 → public/Apartment2.jpg

  KAZANCHIS-penthouse  banner → public/LuxuriousImage.jpg

  BULBULA-2bed      banner → public/2BedromImage.jpg
  BULBULA-3bed      banner → public/3BedroomImage.jpg
  BULBULA-4bed      banner → public/Apartment.jpg

  BULBULA-villa     banner → public/VillaBanner.jpg
                  gallery1 → public/villa2Image.jpg
                  gallery2 → public/villa3Image.jpg

  BULBULA-townhouse  banner → public/TownHousesBanner.jpg
                   gallery1 → public/townhouse2Image.jpg
                   gallery2 → public/townhouse3Image.jpg

  SARBET-2bed       banner → public/2BedromImage.jpg
  SARBET-3bed       banner → public/3BedroomImage.jpg
  SARBET-4bed       banner → public/Apartment.jpg

──── METRO NEWS ────────────────────────────────────────────────────────────
  metroNews-launch-kazanchis    coverImage → public/NewsImage1.jpg
  metroNews-bulbula-community   coverImage → public/NewsImage2.jpg

════════════════════════════════════════════════════════════════════════════
`)
}

// ─── RUN ─────────────────────────────────────────────────────────────────────

seed().catch((err) => {
  console.error('\nSeed failed:', err)
  process.exit(1)
})
