# Requirements Document

## Introduction

This feature restores all sections and content that exist in the original Metro Real Estate frontend but are missing from the current Sanity-integrated version. It also adds bilingual (English/Amharic) support, where all CMS-managed content has a corresponding Amharic field in Sanity and the frontend language switcher fetches and renders the correct language from the CMS.

The work covers: Home page (scroll-down icon, NumbersSection), all life-style unit pages (floor plan, Register Interest CTA, location map, cross-sell section), project detail (360 virtual tour), About page (video/tour section, secondary banner image), Contact page (WhatsApp link), News Room (featured hero article), News Detail (decorative images), Header (desktop News Room link, functional language switcher), Footer (email subscription wired up), and Sanity CMS schema updates for bilingual content and new sections.

---

## Glossary

- **System**: The Metro Real Estate Next.js website and its connected Sanity CMS.
- **Life-style page**: Any of the six unit-type pages under `/life-style/` (2-bed, 3-bed, 4-bed, penthouse, villas, townhouses).
- **Language context**: A React context that stores the user's active language selection (`en` or `am`) and makes it available site-wide.
- **Bilingual field**: A Sanity object containing both `en` (English) and `am` (Amharic) sub-fields for the same piece of content.
- **CMS singleton**: A Sanity document type of which only one instance exists (e.g. `homePage`, `aboutPage`).
- **Floor plan section**: A full-width image section on life-style pages showing the unit's floor plan layout.
- **Cross-sell section**: The "Discover Metro Properties" grid/carousel shown at the bottom of project detail and news detail pages.
- **Register Interest modal**: The `RegisterInterest` component overlay triggered by a CTA button.
- **360 Virtual Tour**: An embedded section on the project detail page linking to or embedding a virtual property tour.
- **NumbersSection**: The standalone stats + descriptive text section that was present in the original home page between the description and the elegance sections.
- **Scroll-down icon**: An animated icon at the bottom of the hero video section that scrolls the user to the next section.

---

## Requirements

### Requirement 1 — Scroll-Down Icon on Home Hero

**User Story:** As a visitor, I want to see a scroll-down icon at the bottom of the hero video, so that I know I can scroll to see more content.

#### Acceptance Criteria

1. WHEN the home page loads, THE System SHALL render a scroll-down icon anchored to the bottom-center of the hero video section.
2. WHEN a user clicks the scroll-down icon, THE System SHALL smoothly scroll the viewport to the next section below the hero.
3. THE System SHALL use the existing `scrollDownIcon.svg` asset from the `/public` directory for the icon.

---

### Requirement 2 — NumbersSection on Home Page

**User Story:** As a visitor, I want to see Metro's key statistics and a descriptive call-to-action between the introduction and the elegance section, so that I get a quick overview of Metro's achievements.

#### Acceptance Criteria

1. WHEN the home page renders, THE System SHALL display the `NumbersSection` component between the `DescriptionSection` and the elegance dark section.
2. THE System SHALL remove all debug styling (red background, red border) from the `NumbersSection` component before rendering.
3. THE System SHALL connect the "DISCOVER YOUR NEXT HOME" button in `NumbersSection` to the `RegisterInterest` modal via the existing `setRegisterInterestOpen` prop pattern.
4. THE System SHALL render the `NumbersSection` stats from the CMS `homePage` stats array, falling back to hardcoded values when the CMS data is unavailable.

---

### Requirement 3 — Floor Plan Section on All Life-Style Pages

**User Story:** As a prospective buyer, I want to see the floor plan for a unit type, so that I can understand the spatial layout before visiting.

#### Acceptance Criteria

1. WHEN a life-style unit page loads, THE System SHALL render a floor plan section below the stats grid and above the first gallery image.
2. THE System SHALL display the floor plan image sourced from the `propertyUnit` CMS document's `floorPlanImage` field.
3. IF no floor plan image is available in the CMS, THEN THE System SHALL render the fallback `Plan.jpg` asset from `/public`.
4. THE System SHALL add a `floorPlanImage` field of type `image` to the `propertyUnit` Sanity schema.

---

### Requirement 4 — Register Interest CTA on All Life-Style Pages

**User Story:** As a prospective buyer on a unit detail page, I want a visible "Register Interest" button, so that I can express interest in that property type.

#### Acceptance Criteria

1. WHEN a life-style unit page renders, THE System SHALL display a "REGISTER INTEREST" button that opens the `RegisterInterest` modal.
2. THE System SHALL position the CTA button in the lower content area of each life-style page, below the amenity cards section.
3. WHEN the `RegisterInterest` modal is open, THE System SHALL render it as an overlay above the page content.
4. THE System SHALL apply the same button styling (`bg-[#041428] border-2 border-[#ffbf00] hover:bg-[#ffbf00]`) as the project detail page CTA.

---

### Requirement 5 — Location Map on All Life-Style Pages

**User Story:** As a prospective buyer, I want to see the property location on a map within the unit detail page, so that I can evaluate the area without leaving the page.

#### Acceptance Criteria

1. WHEN a life-style unit page renders, THE System SHALL display a pigeon-maps embed showing the property's location.
2. THE System SHALL source the map coordinates from the `propertyUnit` CMS document's `mapLocation` field.
3. IF no `mapLocation` data exists for a unit, THEN THE System SHALL fall back to the coordinates defined in the `coords` constant already present in the life-style page code, matched by the `location` query parameter.
4. THE System SHALL add a `mapLocation` field of type `mapLocation` to the `propertyUnit` Sanity schema.
5. THE System SHALL render a single `Marker` at the property's coordinates.

---

### Requirement 6 — Cross-Sell Section on Life-Style Pages

**User Story:** As a visitor finishing reading a unit detail page, I want to see links to other Metro property types, so that I can explore more options without going back to the property list.

#### Acceptance Criteria

1. WHEN a life-style unit page renders, THE System SHALL display a "Discover Metro Properties" cross-sell section at the bottom of the page.
2. THE System SHALL render the same three property card links (2 Bedroom Apartment, 3 Bedroom Apartment, Luxurious Penthouses) and layout as the project detail and news detail pages.
3. THE System SHALL use the desktop 3-column grid and the mobile Splide carousel, matching the existing pattern in `projects/[slug]/page.tsx`.

---

### Requirement 7 — 360 Virtual Tour Section on Project Detail Page

**User Story:** As a prospective buyer on a project detail page, I want to access a virtual tour of the project, so that I can explore the space remotely.

#### Acceptance Criteria

1. WHEN the project detail page renders, THE System SHALL display a "360 Virtual Tour" section above the location/map dark section.
2. THE System SHALL source the tour URL from the `project` CMS document's `virtualTourUrl` field.
3. WHERE a `virtualTourUrl` is present in the CMS, THE System SHALL render a CTA button or embedded iframe linking to the tour.
4. IF no `virtualTourUrl` is present, THEN THE System SHALL hide the tour section entirely.
5. THE System SHALL add a `virtualTourUrl` field of type `url` to the `project` Sanity schema.

---

### Requirement 8 — Video/Tour Section on About Page

**User Story:** As a visitor on the About page, I want to see a visual tour or video showcase of Metro's work, so that I can get an immersive sense of the brand.

#### Acceptance Criteria

1. WHEN the About page renders, THE System SHALL display a full-width tour/video section after the gallery images and before the team section.
2. THE System SHALL source the tour image from the `aboutPage` CMS document's `tourSectionImage` field.
3. IF no `tourSectionImage` is available in the CMS, THEN THE System SHALL render the `TakeTourImage.jpg` fallback asset.
4. THE System SHALL add a `tourSectionImage` field of type `image` to the `aboutPage` Sanity schema.

---

### Requirement 9 — Secondary Banner Image on About Page

**User Story:** As a visitor on the About page, I want to see decorative full-width imagery between major content sections, so that the page feels visually rich and on-brand.

#### Acceptance Criteria

1. WHEN the About page renders, THE System SHALL display the `about2Image` / secondary banner between the intro text and the stats section.
2. THE System SHALL source the image from the `aboutPage` CMS document's `secondaryBannerImage` field.
3. IF no `secondaryBannerImage` is available, THEN THE System SHALL render the `about2Image.svg` fallback.
4. THE System SHALL add a `secondaryBannerImage` field of type `image` to the `aboutPage` Sanity schema.

---

### Requirement 10 — WhatsApp Quick-Contact on Contact Page

**User Story:** As a visitor on the Contact page, I want a WhatsApp direct link, so that I can reach Metro's sales team instantly via the messaging app I already use.

#### Acceptance Criteria

1. WHEN the Contact page renders, THE System SHALL display a WhatsApp quick-contact link alongside the phone and email links.
2. THE System SHALL source the WhatsApp number from the `siteSettings` CMS document's `whatsappNumber` field.
3. IF no `whatsappNumber` is defined in the CMS, THEN THE System SHALL use the fallback number `+25193 806 0606`.
4. THE System SHALL use the `whatsupIcon.svg` asset from `/public` for the WhatsApp link icon.
5. THE System SHALL add a `whatsappNumber` field of type `string` to the `siteSettings` Sanity schema.

---

### Requirement 11 — Featured Hero Article on News Room Page

**User Story:** As a visitor on the News Room page, I want to see a featured/highlighted news article at the top, so that the most important story gets prominent attention.

#### Acceptance Criteria

1. WHEN the News Room page renders with at least one article, THE System SHALL display the first (most recent) article as a full-width featured hero card above the 3-column article grid.
2. THE System SHALL exclude the featured article from the 3-column grid to avoid duplication.
3. THE System SHALL display the featured article's cover image, date, and title at a larger scale than the grid cards.
4. WHEN a user clicks the featured hero card, THE System SHALL navigate to the article's detail page.

---

### Requirement 12 — Decorative Images on News Detail Page

**User Story:** As a reader on a news detail page, I want to see decorative Metro-branded images alongside the article, so that the reading experience feels visually polished.

#### Acceptance Criteria

1. WHEN a news detail page renders, THE System SHALL display the `NewsDetailImage` asset as a decorative element in the article layout.
2. THE System SHALL position the decorative image in the sidebar or as a secondary content block alongside `description2`.
3. THE System SHALL add an optional `secondaryImage` field of type `image` to the `metroNews` Sanity schema, sourced instead of the static asset when present.
4. IF no `secondaryImage` is in the CMS, THEN THE System SHALL render the static `NewsDetail.svg` fallback.

---

### Requirement 13 — News Room Link in Desktop Header

**User Story:** As a visitor browsing the desktop site, I want to see a "News Room" link in the main navigation, so that I can find news articles without going through a secondary menu.

#### Acceptance Criteria

1. WHEN the desktop header renders, THE System SHALL include a "News Room" navigation link pointing to `/news-room`.
2. THE System SHALL apply the same active-state styling (`text-primary`) when the current path is `/news-room`.
3. THE System SHALL insert the "News Room" link between the "Gallery" and "Properties" links in the desktop navigation order.

---

### Requirement 14 — Functional Language Switcher with CMS Bilingual Content

**User Story:** As an Amharic-speaking visitor, I want to toggle the site language to Amharic and see all text content rendered in Amharic, so that I can fully understand the site in my preferred language.

#### Acceptance Criteria

1. WHEN a user selects "Amharic" in the language switcher, THE System SHALL update all CMS-sourced text content on the current page to the Amharic version without a full page reload.
2. WHEN a user selects "English" in the language switcher, THE System SHALL restore all text content to the English version.
3. THE System SHALL persist the user's language selection in `localStorage` so that it is restored on subsequent visits.
4. THE System SHALL provide a `LanguageContext` React context that exposes the active language (`'en'` | `'am'`) and a toggle function to all pages and components.
5. THE System SHALL update every CMS singleton schema (`homePage`, `aboutPage`, `contactPage`, `siteSettings`, `project`, `propertyUnit`, `metroNews`, `galleryPage`) to include Amharic-language variants of all user-facing text fields, grouped under a clearly labelled "Amharic Content" section in the Sanity Studio UI.
6. THE System SHALL create a reusable `localizeField(data, field, lang)` utility function that returns the Amharic value when `lang === 'am'` and it exists, otherwise returning the English value as a fallback.
7. WHEN the active language is `'am'` and a CMS document has no Amharic value for a given field, THE System SHALL fall back to the English value for that field.
8. THE System SHALL pass the active language to all data-fetching components so that GROQ queries or client-side localization selects the correct language fields.

---

### Requirement 15 — Footer Email Subscription Wired Up

**User Story:** As a visitor, I want to subscribe to Metro's project updates by entering my email in the footer form, so that I receive news and listings in my inbox.

#### Acceptance Criteria

1. WHEN a user submits the footer email subscription form with a valid email address, THE System SHALL send the subscription request via the existing EmailJS integration.
2. THE System SHALL display a loading/success/error state in the footer form after submission.
3. THE System SHALL validate that the email field is not empty and is a valid email format before submitting.
4. IF the EmailJS request fails, THEN THE System SHALL display an error message to the user.
