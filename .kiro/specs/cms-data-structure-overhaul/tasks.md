# Implementation Plan

- [x] 1. Create new Sanity object schemas and update schema index

  - [x] 1.1 Create `amenityItem` object schema at `studio-metro-realestate/schemas/objects/amenityItem.ts`


    - Define fields: `icon` (image with hotspot), `title` (string), `description` (text)
    - _Requirements: 6.1, 7.1_
  - [x] 1.2 Create `statItem` object schema at `studio-metro-realestate/schemas/objects/statItem.ts`


    - Define fields: `value` (string), `label` (string), `description` (text)
    - _Requirements: 2.1, 3.1_
  - [x] 1.3 Create `workingHoursItem` object schema at `studio-metro-realestate/schemas/objects/workingHoursItem.ts`


    - Define fields: `day` (string), `hours` (string), `closed` (boolean)
    - _Requirements: 1.1, 5.1_
  - [x] 1.4 Update schema index `studio-metro-realestate/schemas/index.ts` to import and export all new object and document types


    - _Requirements: 1.1, 2.1, 3.1, 4.1, 5.1_

- [x] 2. Create new Sanity singleton document schemas

  - [x] 2.1 Create `siteSettings` document schema at `studio-metro-realestate/schemas/documents/siteSettings.ts`


    - Fields: `logo` (image), `phoneNumber` (string), `email` (string), `headOfficeAddress` (text), `branchOfficeAddress` (text), `facebookUrl`, `youtubeUrl`, `instagramUrl`, `linkedinUrl` (strings), `copyrightText` (string), `workingHours` (array of `workingHoursItem`)
    - _Requirements: 1.1_
  - [x] 2.2 Create `homePage` document schema at `studio-metro-realestate/schemas/documents/homePage.ts`



    - Fields: `heroHeadlineText`, `heroDesktopVideoPath`, `heroMobileVideoPath`, `introTagline`, `introHeading`, `introParagraph1` (block array), `introParagraph2` (block array), `stats` (array of `statItem`), `eleganceSectionHeading`, `eleganceParagraph1`, `eleganceParagraph2`, `propertyTypesHeading1`, `propertyTypesHeading2`, `propertyTypesParagraph1`, `propertyTypesParagraph2`, `consultationHeading`, `consultationSubheading`, `consultationBody`, `staffPhoto` (image)
    - _Requirements: 2.1_

  - [x] 2.3 Create `aboutPage` document schema at `studio-metro-realestate/schemas/documents/aboutPage.ts`

    - Fields: `bannerImage` (image), `heroHeading`, `introSubheading`, `introParagraph1` (block array), `introParagraph2` (block array), `stats` (array of `statItem`), `about3Image` (image), `secondaryHeading`, `visionTitle`, `visionBody`, `missionTitle`, `missionBody`, `galleryImage1` (image), `galleryImage2` (image), `teamSectionHeading`, `teamChampionsLabel`, `teamDescription`, `teamMembers` (array of objects with `name`, `position`, `photo`)
    - _Requirements: 3.1_


  - [x] 2.4 Create `galleryPage` document schema at `studio-metro-realestate/schemas/documents/galleryPage.ts`

    - Fields: `title` (string), `images` (array of objects with `image` (image hotspot), `caption` (string), `altText` (string))

    - _Requirements: 4.1_
  - [x] 2.5 Create `contactPage` document schema at `studio-metro-realestate/schemas/documents/contactPage.ts`

    - Fields: `headOfficeLabel`, `headOfficeAddress`, `branchOfficeLabel`, `branchOfficeAddress`, `phoneNumber`, `email`, `workingHours` (array of `workingHoursItem`), `defaultMapCenter` (mapLocation object), `mapMarkers` (array of mapLocation objects), `formHeading`, `formSubtext`
    - _Requirements: 5.1_

- [x] 3. Extend existing `project` and `propertyUnit` schemas


  - [x] 3.1 Extend `studio-metro-realestate/schemas/documents/project.ts` to add `amenities` array of `amenityItem`

    - _Requirements: 6.1_

  - [x] 3.2 Extend `studio-metro-realestate/schemas/documents/propertyUnit.ts` to add `images` array of `imageWithRole` and `amenities` array of `amenityItem`

    - _Requirements: 7.1_


- [x] 4. Update GROQ queries for all new singletons and extended schemas




  - [x] 4.1 Add `siteSettings`, `homePage`, `aboutPage`, `galleryPage`, and `contactPage` queries to `src/lib/groq-queries.ts`


    - _Requirements: 9.1_

  - [x] 4.2 Extend `projectBySlug` query to fetch `amenities[]{ icon, title, description }`

    - _Requirements: 6.3_
  - [x] 4.3 Extend `propertyUnitByTypeAndSite` query to fetch `images[]{ image, role, caption }` and `amenities[]{ icon, title, description }`


    - _Requirements: 7.2_

- [x] 5. Update `CustomeLayout.tsx` to fetch and pass `siteSettings`


  - Fetch `siteSettings` alongside `allProjects` on mount
  - Pass `siteSettings` as a prop to the `<Footer>` component
  - Update `Footer` component signature to accept and use `siteSettings` for phone, email, addresses, social links, and copyright text
  - _Requirements: 1.2, 1.3, 9.2_

- [ ] 6. Update Home page to render from CMS
  - [x] 6.1 Update `src/app/page.tsx` to fetch `homePage` from Sanity on mount


    - Replace hardcoded hero headline with `homePage.heroHeadlineText`
    - Replace hardcoded "Experience Unmatched Elegance" section text with CMS fields
    - Fall back to hardcoded values if fetch returns null
    - _Requirements: 2.2, 9.3_


  - [x] 6.2 Update `src/sections/Home/LandingVideo.tsx` to accept `heroHeadlineText`, `desktopVideoPath`, `mobileVideoPath` as props


  
    - _Requirements: 2.2_
  - [x] 6.3 Update `src/sections/Home/DescriptionSection.tsx` to accept `tagline`, `heading`, `paragraph1`, `paragraph2`, `stats` as props and render from CMS

    - Replace hardcoded stat values with mapped `statItem` array
    - _Requirements: 2.2_

  - [x] 6.4 Update `src/sections/Home/Schedule.tsx` to accept `heading`, `subheading`, `body`, `staffPhoto` as props

    - _Requirements: 2.2_

- [x] 7. Update About Metro page to render from CMS



  - Fetch `aboutPage` from Sanity on mount
  - Replace hardcoded `team` array with `aboutPage.teamMembers` mapped to the same grid/carousel layout
  - Replace `BannerImage`, `About3Image`, `About4Image`, `About5Image` static imports with `getImageUrl()` calls on CMS image fields
  - Replace hardcoded vision/mission text with `aboutPage.visionBody` and `aboutPage.missionBody`
  - Replace hardcoded stat blocks with mapped `aboutPage.stats` array
  - Fall back to hardcoded values if fetch returns null
  - _Requirements: 3.2, 9.4_

- [x] 8. Update Gallery page to render from CMS


  - Fetch `galleryPage` from Sanity on mount
  - Replace hardcoded `images` array with `galleryPage.images` mapped through `getImageUrl()`
  - Pagination logic stays identical
  - Show "No images available" if array is empty
  - _Requirements: 4.2, 9.5_

- [x] 9. Update Contact page to render from CMS


  - Fetch `contactPage` from Sanity on mount
  - Replace hardcoded office address strings with `contactPage.headOfficeAddress` and `contactPage.branchOfficeAddress`
  - Replace hardcoded working hours text with mapped `contactPage.workingHours` array
  - Replace the 4 hardcoded `<Marker>` lat/lng values with mapped `contactPage.mapMarkers` array
  - Replace hardcoded `defaultCenter` with `contactPage.defaultMapCenter`
  - Fall back to hardcoded values if fetch returns null
  - _Requirements: 5.2, 9.6_


- [x] 10. Update project detail page to use CMS amenities


  - Extend the component to read `project.amenities` from the Sanity response
  - Replace the 4 hardcoded amenity `<div>` blocks with `.map()` over `project.amenities`
  - Fall back to hardcoded amenity data if `project.amenities` is empty
  - _Requirements: 6.3_

- [x] 11. Update property unit detail pages to use CMS images and amenities





  - [x] 11.1 Update `src/app/life-style/townhouses/page.tsx`


    - Replace hardcoded `TownhouseBanner` static import with `getImageUrl(apartment.images?.find(i => i.role === 'banner')?.image)`
    - Replace hardcoded gallery images with `apartment.images?.filter(i => i.role === 'gallery')`
    - Replace 4 hardcoded amenity blocks with `.map()` over `apartment.amenities`
    - _Requirements: 7.2_

  - [x] 11.2 Update `src/app/life-style/villas/page.tsx` with the same pattern

    - _Requirements: 7.2_


  - [x] 11.3 Update `src/app/life-style/2-1A-bedroom-apartment/page.tsx` with the same pattern


    - _Requirements: 7.2_


  - [x] 11.4 Update `src/app/life-style/3-2A-bedroom-apartment/page.tsx` with the same pattern


    - _Requirements: 7.2_
  - [x] 11.5 Update `src/app/life-style/4-bedroom-apartments/page.tsx` with the same pattern

    - _Requirements: 7.2_

  - [x] 11.6 Update `src/app/life-style/penthouse/page.tsx` with the same pattern

    - _Requirements: 7.2_

- [x] 12. Write comprehensive seed script





  - Replace `studio-metro-realestate/seed.mjs` with a full seed covering: `siteSettings`, `homePage`, `aboutPage`, `contactPage`, `galleryPage`, 3 project documents (extended with amenities), 11 property unit documents (extended with amenities), and 2 sample `metroNews` documents
  - Use `createOrReplace` for all documents to keep the script idempotent
  - Seed all text, numbers, and Portable Text fields with the original hardcoded values from the frontend source
  - Print a clear image-upload checklist per document at the end of the script
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_
  - [x] 12.1 Verify seed script runs without errors against the production Sanity dataset



    - Run `node seed.mjs` from `studio-metro-realestate/` and confirm all documents show `✓`
    - _Requirements: 10.2_
