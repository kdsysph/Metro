# Design Document

## Overview

This overhaul expands the Sanity CMS from covering only Projects, Metro News, and Property Units to covering every page and section of the Metro Real Estate website. The existing dynamic connections between Projects, Property Units, and the Header/Footer navigation are preserved. All original hardcoded content is seeded into Sanity so the website renders fully from the CMS immediately.

The approach is additive: existing schemas (`project`, `propertyUnit`, `metroNews`, `imageWithRole`, `mapLocation`) are extended rather than replaced. New singleton documents are introduced for global settings and page-specific content. The frontend fetches all content via GROQ queries and renders it using existing component patterns.

---

## Architecture

```
studio-metro-realestate/
  schemas/
    documents/
      project.ts         ← EXTENDED: add amenities array
      propertyUnit.ts    ← EXTENDED: add images array + amenities array
      metroNews.ts       ← UNCHANGED
      siteSettings.ts    ← NEW: singleton for navbar/footer global data
      homePage.ts        ← NEW: singleton for all home page sections
      aboutPage.ts       ← NEW: singleton for about metro page
      galleryPage.ts     ← NEW: singleton for gallery image collection
      contactPage.ts     ← NEW: singleton for contact page data
    objects/
      imageWithRole.ts   ← UNCHANGED
      mapLocation.ts     ← UNCHANGED
      amenityItem.ts     ← NEW: reusable amenity card object (icon+title+desc)
      workingHoursItem.ts ← NEW: reusable working hours row object
      statItem.ts        ← NEW: reusable stat block object (value+label+desc)
    index.ts             ← UPDATED: register all new types

src/lib/
  sanity.ts              ← UNCHANGED
  groq-queries.ts        ← UPDATED: add queries for all new singletons
  unitTypeToPath.ts      ← UNCHANGED

src/app/
  CustomeLayout.tsx      ← UPDATED: also fetch siteSettings, pass to Footer
  page.tsx               ← UPDATED: fetch homePage, render from CMS
  about-metro/page.tsx   ← UPDATED: fetch aboutPage, render from CMS
  gallery/page.tsx       ← UPDATED: fetch galleryPage, render from CMS
  contact/page.tsx       ← UPDATED: fetch contactPage, render from CMS
  projects/[slug]/page.tsx       ← UPDATED: use amenities from CMS
  life-style/*/page.tsx          ← UPDATED: use images + amenities from CMS
  news-room/page.tsx             ← ALREADY FIXED (slug.current)
  news-room/[slug]/page.tsx      ← ALREADY FIXED (PortableText)

studio-metro-realestate/
  seed.mjs               ← REPLACED: comprehensive seed for all content
```

---

## Components and Interfaces

### New Sanity Object: `amenityItem`

Reusable object used in both `project` and `propertyUnit` for the four amenity cards.

```ts
{
  name: 'amenityItem',
  type: 'object',
  fields: [
    { name: 'icon', type: 'image', options: { hotspot: true } },
    { name: 'title', type: 'string' },
    { name: 'description', type: 'text' },
  ]
}
```

### New Sanity Object: `statItem`

Reusable object for the stats sections on Home and About pages.

```ts
{
  name: 'statItem',
  type: 'object',
  fields: [
    { name: 'value', type: 'string' },   // e.g. "58+ Years"
    { name: 'label', type: 'string' },   // e.g. "ACTIVE IN THE ETHIOPIAN BUSINESS"
    { name: 'description', type: 'text' }
  ]
}
```

### New Sanity Object: `workingHoursItem`

```ts
{
  name: 'workingHoursItem',
  type: 'object',
  fields: [
    { name: 'day', type: 'string' },    // e.g. "Monday - Friday"
    { name: 'hours', type: 'string' },  // e.g. "02:30 — 11:00LT"
    { name: 'closed', type: 'boolean' }
  ]
}
```

### New Sanity Singleton: `siteSettings`

One document, always `_id: 'siteSettings'`.

```ts
fields: [
  logo: image,
  phoneNumber: string,
  email: string,
  headOfficeAddress: text,
  branchOfficeAddress: text,
  facebookUrl: string,
  youtubeUrl: string,
  instagramUrl: string,
  linkedinUrl: string,
  copyrightText: string,
  workingHours: array of workingHoursItem,
]
```

### New Sanity Singleton: `homePage`

One document, `_id: 'homePage'`.

```ts
fields: [
  heroHeadlineText: string,          // "Elegance & Tranquility"
  heroDesktopVideoPath: string,      // "/Header Video Desktop.mp4"
  heroMobileVideoPath: string,       // "/Header Video Mobile.mp4"
  introTagline: string,              // "WELCOME TO METRO REAL ESTATE"
  introHeading: string,              // "A home to live your dream lifestyle"
  introParagraph1: array[block],
  introParagraph2: array[block],
  stats: array of statItem,
  eleganceSectionHeading: string,    // "Experience Unmatched Elegance with Metro™"
  eleganceParagraph1: text,
  eleganceParagraph2: text,
  propertyTypesHeading1: string,     // "Find Homes —"
  propertyTypesHeading2: string,     // "That Redefine Luxury Living"
  propertyTypesParagraph1: text,
  propertyTypesParagraph2: text,
  consultationHeading: string,
  consultationSubheading: string,
  consultationBody: text,
  staffPhoto: image,
]
```

### New Sanity Singleton: `aboutPage`

One document, `_id: 'aboutPage'`.

```ts
fields: [
  bannerImage: image,
  heroHeading: string,               // "Welcome to Metro Real Estate - Your Next Dream Home!"
  introSubheading: string,           // "METRO REAL ESTATE UNBOXED"
  introParagraph1: array[block],
  introParagraph2: array[block],
  stats: array of statItem,          // same 4 items as home
  about3Image: image,                // full-width divider image
  secondaryHeading: string,          // "Uncover the Perfect Place to Live..."
  visionTitle: string,
  visionBody: text,
  missionTitle: string,
  missionBody: text,
  galleryImage1: image,
  galleryImage2: image,
  teamSectionHeading: string,        // "Meet the— People behind Metro Real Estate™"
  teamChampionsLabel: string,
  teamDescription: text,
  teamMembers: array of { name: string, position: string, photo: image },
]
```

### New Sanity Singleton: `galleryPage`

One document, `_id: 'galleryPage'`.

```ts
fields: [
  title: string,                     // "Metro™ Gallery"
  images: array of { image: image (hotspot), caption: string, altText: string },
]
```

### New Sanity Singleton: `contactPage`

One document, `_id: 'contactPage'`.

```ts
fields: [
  headOfficeLabel: string,
  headOfficeAddress: text,
  branchOfficeLabel: string,
  branchOfficeAddress: text,
  phoneNumber: string,
  email: string,
  workingHours: array of workingHoursItem,
  defaultMapCenter: mapLocation,
  mapMarkers: array of mapLocation,
  formHeading: string,               // "We'd love to hear from you!"
  formSubtext: text,
]
```

### Extended `project` Schema

Added field:
```ts
amenities: array of amenityItem
```
All other fields remain unchanged.

### Extended `propertyUnit` Schema

Added fields:
```ts
images: array of imageWithRole   // banner + gallery per unit
amenities: array of amenityItem  // the 4 standard amenity cards
```
All other fields remain unchanged.

---

## Data Models

### GROQ Queries — New additions to `groq-queries.ts`

```ts
siteSettings: `*[_type == "siteSettings"][0] { logo, phoneNumber, email, headOfficeAddress, branchOfficeAddress, facebookUrl, youtubeUrl, instagramUrl, linkedinUrl, copyrightText, workingHours }`,

homePage: `*[_type == "homePage"][0] { heroHeadlineText, heroDesktopVideoPath, heroMobileVideoPath, introTagline, introHeading, introParagraph1, introParagraph2, stats, eleganceSectionHeading, eleganceParagraph1, eleganceParagraph2, propertyTypesHeading1, propertyTypesHeading2, propertyTypesParagraph1, propertyTypesParagraph2, consultationHeading, consultationSubheading, consultationBody, staffPhoto }`,

aboutPage: `*[_type == "aboutPage"][0] { bannerImage, heroHeading, introSubheading, introParagraph1, introParagraph2, stats, about3Image, secondaryHeading, visionTitle, visionBody, missionTitle, missionBody, galleryImage1, galleryImage2, teamSectionHeading, teamChampionsLabel, teamDescription, teamMembers[] { name, position, photo } }`,

galleryPage: `*[_type == "galleryPage"][0] { title, images[] { image, caption, altText } }`,

contactPage: `*[_type == "contactPage"][0] { headOfficeLabel, headOfficeAddress, branchOfficeLabel, branchOfficeAddress, phoneNumber, email, workingHours, defaultMapCenter, mapMarkers, formHeading, formSubtext }`,
```

The existing queries (`allProjects`, `projectBySlug`, `allNews`, `newsBySlug`, `allPropertyUnits`, `propertyUnitByTypeAndSite`) are unchanged.

The `projectBySlug` query is extended to also fetch `amenities[]{ icon, title, description }`.

The `propertyUnitByTypeAndSite` query is extended to also fetch `images[]{ image, role, caption }` and `amenities[]{ icon, title, description }`.

---

## Frontend Page Data Flow

### `CustomeLayout.tsx`
- Already fetches `allProjects` for Header + Footer.
- Add fetch for `siteSettings` on mount.
- Pass `siteSettings` to `<Footer>` as a prop alongside `projects`.

### `src/app/page.tsx` (Home)
- Fetch `homePage` using `sanityClient.fetch(queries.homePage)` on mount.
- Pass `homePage` data as props to each section component, or have each section accept and render from a `data` prop.
- Fallback to the existing hardcoded values if `homePage` is null (graceful degradation).

### `src/app/about-metro/page.tsx`
- Fetch `aboutPage` on mount.
- Map `teamMembers` array from CMS to the rendered grid/carousel.
- Use `getImageUrl()` for `bannerImage`, `about3Image`, `galleryImage1`, `galleryImage2`, and each team member `photo`.

### `src/app/gallery/page.tsx`
- Fetch `galleryPage` on mount.
- Replace the hardcoded `images` array with `galleryPage.images`.
- Pagination logic remains identical.

### `src/app/contact/page.tsx`
- Fetch `contactPage` on mount.
- Replace hardcoded address/phone/hours with CMS values.
- Map `mapMarkers` array to `<Marker>` components.

### `src/app/projects/[slug]/page.tsx`
- Already fetches `projectBySlug`.
- Extend query to include `amenities`.
- Replace 4 hardcoded amenity `<div>` blocks with a `.map()` over `project.amenities`.
- Fall back to hardcoded amenity data if `project.amenities` is empty.

### `src/app/life-style/*/page.tsx`
- Already fetches `propertyUnitByTypeAndSite`.
- Extend query to include `images` and `amenities`.
- Replace hardcoded banner `backgroundImage` with `images.find(i => i.role === 'banner')?.image`.
- Replace hardcoded gallery images with `images.filter(i => i.role === 'gallery')`.
- Replace 4 hardcoded amenity blocks with `.map()` over `unit.amenities`.
- Fall back to the current static imports if CMS values are absent.

---

## Seed Strategy

The seed script (`studio-metro-realestate/seed.mjs`) is replaced with a comprehensive version that creates or replaces all singleton and multi-instance documents. The order of operations is:

1. `siteSettings` (no dependencies)
2. `homePage` (no dependencies)
3. `aboutPage` (no dependencies)
4. `contactPage` (no dependencies)
5. `galleryPage` (no dependencies)
6. `project` documents × 3 (no dependencies)
7. `propertyUnit` documents × 11 (reference `project` documents — created after step 6)
8. `metroNews` documents × 2 (no dependencies)

All text and numeric data from the original hardcoded frontend is written into the seed. Images from `/public/` are referenced by filename in inline log comments — the script prints a clear mapping at the end of what to upload manually in Sanity Studio.

---

## Error Handling

- All new page-level Sanity fetches use the existing try/catch + loading/error state pattern.
- If a singleton (e.g. `homePage`) returns null, the component falls back to a sensible hardcoded default so the page never goes blank.
- If `galleryPage.images` is empty, the gallery renders a "No images available" message.
- The seed script prints `✓` per document on success and `✗` with the error message on failure, so partial failures are visible.

---

## Testing Strategy

- After running the seed, verify each page in the browser shows real content (not blank).
- Verify the Header and Footer show CMS-managed phone, email, and social links.
- Verify the Home page hero video and text load from Sanity.
- Verify Gallery page shows images from the CMS collection.
- Verify the project detail pages show CMS amenity cards (not hardcoded icon SVGs).
- Verify the news listing links and detail pages render correctly.
- Verify the property unit pages show correct banner images after uploading to Sanity Studio.
