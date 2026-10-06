# Implementation Plan

- [x] 1. Update Sanity schemas with new fields





  - [x] 1.1 Add `floorPlanImage` (image) and `mapLocation` (mapLocation object) fields to `propertyUnit.ts`


    - _Requirements: 3.4, 5.4_
  - [x] 1.2 Add `virtualTourUrl` (url) field to `project.ts`


    - _Requirements: 7.5_
  - [x] 1.3 Add `secondaryBannerImage` and `tourSectionImage` (image) fields to `aboutPage.ts`


    - _Requirements: 8.4, 9.4_
  - [x] 1.4 Add `whatsappNumber` (string) field to `siteSettings.ts`


    - _Requirements: 10.5_
  - [x] 1.5 Add `secondaryImage` (image) field to `metroNews` schema


    - _Requirements: 12.3_
  - [x] 1.6 Add Amharic `_am` sibling fields to all user-facing text fields in `homePage.ts`, `aboutPage.ts`, `contactPage.ts`, `project.ts`, `propertyUnit.ts`, `metroNews` schema, `galleryPage.ts`, `siteSettings.ts`, and the `statItem` object schema


    - _Requirements: 14.5_

- [x] 2. Update GROQ queries to fetch new and Amharic fields

  - [x] 2.1 Update `homePage` query in `src/lib/groq-queries.ts` to include all `_am` fields and new stat sub-fields


    - _Requirements: 14.8_
  - [x] 2.2 Update `aboutPage` query to include `_am` fields, `secondaryBannerImage`, and `tourSectionImage`


    - _Requirements: 8, 9, 14.8_
  - [x] 2.3 Update `contactPage` query to include `_am` fields


    - _Requirements: 14.8_
  - [x] 2.4 Update `projectBySlug` query to include `_am` fields and `virtualTourUrl`


    - _Requirements: 7, 14.8_
  - [x] 2.5 Update `propertyUnitByTypeAndSite` query to include `_am` fields, `floorPlanImage`, and `mapLocation`


    - _Requirements: 3, 5, 14.8_
  - [x] 2.6 Update `allNews` and `newsBySlug` queries to include `_am` fields and `secondaryImage`


    - _Requirements: 12, 14.8_
  - [x] 2.7 Update `siteSettings` query to include `whatsappNumber` and `_am` fields


    - _Requirements: 10, 14.8_

- [x] 3. Create LanguageContext and localizeField utility





  - [x] 3.1 Create `src/context/LanguageContext.tsx` with `LanguageProvider` and `useLanguage` hook, reading/writing `localStorage` key `metro_lang`


    - _Requirements: 14.3, 14.4_
  - [x] 3.2 Create `src/lib/localize.ts` with the `localizeField(data, field, lang)` utility that returns the `_am` field when `lang === 'am'` and the value is non-empty, otherwise falls back to the English field


    - _Requirements: 14.6, 14.7_
  - [x] 3.3 Wrap the app in `LanguageProvider` inside `src/app/CustomeLayout.tsx`


    - _Requirements: 14.4_

- [x] 4. Fix Header — add News Room link and functional language switcher





  - [x] 4.1 Add "News Room" link to the desktop nav in `src/sections/Header.tsx`, positioned between Gallery and Properties


    - _Requirements: 13.1, 13.2, 13.3_

  - [x] 4.2 Replace the static EN/AM dropdown in both desktop and mobile header with a functional switcher that calls `setLang` from `LanguageContext`

    - _Requirements: 14.1, 14.2_

- [x] 5. Fix Home page — scroll-down icon, NumbersSection


  - [x] 5.1 Move the scroll-down icon from `CustomeLayout.tsx` into `src/sections/Home/LandingVideo.tsx`, wired to `nextSectionRef.current?.scrollIntoView({ behavior: 'smooth' })`


    - _Requirements: 1.1, 1.2, 1.3_
  - [x] 5.2 Remove debug `bg-red-300 border-[1px] border-red-500` styles from `NumbersSection.tsx` and add `stats`, `heading`, `paragraph1`, `paragraph2` props with CMS-or-fallback pattern


    - _Requirements: 2.2, 2.4_
  - [x] 5.3 Insert `<NumbersSection>` in `src/app/page.tsx` between `<DescriptionSection>` and the dark elegance section, passing the `setRegisterInterestOpen` prop and CMS stats


    - _Requirements: 2.1, 2.3_


- [x] 6. Apply localizeField to Home page sections

  - Wrap all CMS text fields on `src/app/page.tsx`, `DescriptionSection.tsx`, `LandingVideo.tsx`, `Apartments.tsx`, and `Schedule.tsx` with `localizeField(data, field, lang)` using the `useLanguage` hook
  - _Requirements: 14.1, 14.2_

- [x] 7. Create shared DiscoverProperties component


  - Extract the "Discover Metro Properties" heading + divider + 3-card desktop grid + mobile Splide carousel into `src/sections/DiscoverProperties.tsx` and replace the existing inline duplicates in `src/app/projects/[slug]/page.tsx` and `src/app/news-room/[slug]/page.tsx`
  - _Requirements: 6.2, 6.3_

- [x] 8. Restore missing sections on all life-style pages



  - [x] 8.1 Add floor plan section (CMS `floorPlanImage` or `Plan.jpg` fallback) to all six life-style pages after the stats grid
  
    - _Requirements: 3.1, 3.2, 3.3_

  - [x] 8.2 Add pigeon-maps location map section to all six life-style pages using `unit.mapLocation` or the `coords` fallback matched to the `location` query param


    - _Requirements: 5.1, 5.2, 5.3, 5.5_

  - [x] 8.3 Add "REGISTER INTEREST" CTA button to all six life-style pages below the amenity cards section, wired to open the `RegisterInterest` modal

    - _Requirements: 4.1, 4.2, 4.3, 4.4_

  - [x] 8.4 Add `<DiscoverProperties />` cross-sell section to the bottom of all six life-style pages


    - _Requirements: 6.1, 6.2, 6.3_

  - [x] 8.5 Apply `localizeField` to all CMS-sourced text on each life-style page

    - _Requirements: 14.1_

- [x] 9. Restore 360 virtual tour section on Project Detail page


  - Add a conditional 360 virtual tour section in `src/app/projects/[slug]/page.tsx` above the dark location section, rendered only when `project.virtualTourUrl` is non-empty, showing a CTA button linking to the tour URL
  - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [x] 10. Restore missing sections on About page

  - [x] 10.1 Add `secondaryBannerImage` render (CMS or `about2Image.svg` fallback) between the intro text block and the stats section in `src/app/about-metro/page.tsx`


    - _Requirements: 9.1, 9.2, 9.3_
  - [x] 10.2 Add `tourSectionImage` section (CMS or `TakeTourImage.jpg` fallback) between the gallery images and the team section


    - _Requirements: 8.1, 8.2, 8.3_
  - [x] 10.3 Apply `localizeField` to all CMS-sourced text on the About page


    - _Requirements: 14.1_

- [x] 11. Add WhatsApp quick-contact link on Contact page

  - Add WhatsApp link with `whatsupIcon.svg` alongside phone and email in `src/app/contact/page.tsx`, sourcing the number from `siteSettings.whatsappNumber` passed down from `CustomeLayout` or fetched locally with fallback
  - _Requirements: 10.1, 10.2, 10.3, 10.4_

- [x] 12. Add featured hero article to News Room page


  - Modify `src/app/news-room/page.tsx` to render the first article as a full-width featured hero card above the grid, and exclude it from the 3-column grid
  - _Requirements: 11.1, 11.2, 11.3, 11.4_

- [x] 13. Add decorative secondary image to News Detail page




  - Render `news.secondaryImage` (CMS) or `NewsDetail.svg` (fallback) as a decorative element alongside `description2` in `src/app/news-room/[slug]/page.tsx`
  - _Requirements: 12.1, 12.2, 12.4_


- [x] 14. Wire up footer email subscription form




  - Add controlled input state, EmailJS `send()` call, and inline success/error/loading feedback to the footer email form in `src/sections/Footer.tsx`
  - _Requirements: 15.1, 15.2, 15.3, 15.4_


- [x] 15. Apply localizeField across remaining pages and shared components




  - Apply `localizeField` to all remaining CMS-sourced text in `src/app/contact/page.tsx`, `src/app/news-room/page.tsx`, `src/app/news-room/[slug]/page.tsx`, `src/app/projects/[slug]/page.tsx`, `src/sections/Footer.tsx`, and `src/sections/Header.tsx`
  - _Requirements: 14.1, 14.2_
