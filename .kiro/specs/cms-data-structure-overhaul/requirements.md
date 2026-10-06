# Requirements Document

## Introduction

The Metro Real Estate website currently uses Sanity CMS only for Projects, Metro News, and Property Units — but all other page content (Home, About, Gallery, Contact, Policy, Legal, Download Brochure, Navbar, Footer) is hardcoded directly in React components. Additionally, the existing CMS-connected pages show blank content because property unit data has not been seeded with real text and images from the original website.

This spec covers three goals:
1. Expand the Sanity CMS schema to cover every page and section of the website so all content is editable through the CMS.
2. Preserve and strengthen the existing dynamic connections between Projects, Property Units, and the Header/Footer navigation.
3. Seed all Sanity content using the original hardcoded values (texts, image references, video paths, stats, team members, contact info) so the website renders the full content immediately after migration.

## Glossary

- **Sanity**: The headless CMS used for all content management.
- **Schema**: A Sanity document type or object type that defines the shape of a content model.
- **Singleton**: A document type where only one instance should exist (e.g., site settings, home page content).
- **Portable Text**: Sanity's structured rich text format rendered via the `<PortableText>` component.
- **GROQ**: Sanity's query language used to fetch data from the CMS.
- **Project**: One of the three Metro Real Estate development sites — Kazanchis, Bulbula, or Sarbet.
- **Property Unit**: A specific unit type (2bed, 3bed, 4bed, villa, townhouse, penthouse) within a project site.
- **Slug**: A URL-safe string identifier used to route to a specific document page.
- **Seed**: The process of programmatically populating the CMS with real content data extracted from the hardcoded frontend.
- **Section**: A distinct visual block within a page (e.g., Hero, Stats, Team, Contact Info).
- **Site Settings**: Global configuration covering the navbar, footer, social links, and contact details shared across the whole website.

---

## Requirements

### Requirement 1 — Site Settings (Navbar & Footer)

**User Story:** As a content editor, I want to manage the global site settings (logo, navigation links, footer contact details, social media URLs, and copyright text) in the CMS, so that I can update site-wide information without touching code.

#### Acceptance Criteria

1. THE system SHALL define a `siteSettings` singleton document schema in Sanity with fields: `logo` (image), `phoneNumber` (string), `email` (string), `headOfficeAddress` (text), `branchOfficeAddress` (text), `socialLinks` (object containing facebookUrl, youtubeUrl, instagramUrl, linkedinUrl as strings), `copyrightText` (string), and `workingHours` (array of objects with `day` string and `hours` string).
2. WHEN the frontend loads the Header component, THE system SHALL fetch `siteSettings` from Sanity and use `phoneNumber` and `logo` from the CMS instead of the hardcoded values.
3. WHEN the frontend loads the Footer component, THE system SHALL fetch `siteSettings` from Sanity and use `phoneNumber`, `email`, `headOfficeAddress`, `branchOfficeAddress`, `socialLinks`, and `copyrightText` from the CMS instead of hardcoded values.
4. THE system SHALL seed the `siteSettings` document with the values currently hardcoded: phone `+25193 806 0606`, email `sales@metrorealestateet.com`, head office address `2nd Floor; Sur construction Building, Africa Ave, Addis Ababa, AA, Ethiopia`, and social link placeholders.

### Requirement 2 — Home Page Content

**User Story:** As a content editor, I want to manage all sections of the home page through the CMS, so that I can update hero text, stats, property type cards, and consultation section without developer involvement.

#### Acceptance Criteria

1. THE system SHALL define a `homePage` singleton document schema in Sanity with sub-fields covering all five home page sections: `heroSection` (object with `headlineText` string, `desktopVideoPath` string, `mobileVideoPath` string), `introSection` (object with `tagline` string, `heading` string, `paragraph1` Portable Text, `paragraph2` Portable Text), `statsSection` (array of objects, each with `value` string, `label` string, `description` string), `propertyTypesSection` (object with `heading` string, `subheading` string, `paragraph1` text, `paragraph2` text), and `consultationSection` (object with `heading` string, `subheading` string, `body` text, `ctaLabel` string, `staffPhoto` image).
2. WHEN the Home page renders, THE system SHALL fetch `homePage` from Sanity and render each section's content from the CMS fields.
3. THE system SHALL seed the `homePage` document with all values currently hardcoded in `src/app/page.tsx` and the Home section components, including: hero headline "Elegance & Tranquility", intro paragraph texts, all three stat items (58+ Years, +1200, 200K+ SQM), property type headings, and the consultation section copy.

### Requirement 3 — About Metro Page Content

**User Story:** As a content editor, I want to manage the About Metro page content in the CMS, so that I can update the company description, stats, vision, mission, and team members without code changes.

#### Acceptance Criteria

1. THE system SHALL define an `aboutPage` singleton document schema in Sanity with fields: `bannerImage` (image), `heroHeading` (string), `introSubheading` (string), `introParagraph1` (Portable Text), `introParagraph2` (Portable Text), `stats` (array of objects with `value` string, `label` string, `description` string), `secondaryHeading` (string), `vision` (object with `title` string, `body` text), `mission` (object with `title` string, `body` text), `teamSectionHeading` (string), `teamSectionSubheading` (text), `teamMembers` (array of objects with `name` string, `position` string, `photo` image), `galleryImages` (array of images).
2. WHEN the About Metro page renders, THE system SHALL fetch `aboutPage` from Sanity and render all content from the CMS.
3. THE system SHALL seed the `aboutPage` document with all values hardcoded in `src/app/about-metro/page.tsx`, including all 8 team member names and positions, both banner and gallery images (referencing files from `/public/`), vision text, mission text, and all stats.

### Requirement 4 — Gallery Page Content

**User Story:** As a content editor, I want to manage the gallery images collection in the CMS, so that I can add, remove, or reorder gallery images without touching code.

#### Acceptance Criteria

1. THE system SHALL define a `galleryPage` singleton document schema in Sanity with fields: `title` (string) and `images` (array of objects with `image` (image with hotspot), `caption` (string, optional), `project` (reference to `project`, optional)).
2. WHEN the Gallery page renders, THE system SHALL fetch `galleryPage.images` from Sanity and render those images instead of the hardcoded array.
3. THE system SHALL seed the `galleryPage` document with all 11 unique gallery images currently listed in `src/app/gallery/page.tsx` (Gallery1.jpg through Gallery11.jpg from `/public/`), uploaded to Sanity.

### Requirement 5 — Contact Page Content

**User Story:** As a content editor, I want to manage the Contact page's office details, map coordinates, and working hours in the CMS, so that I can update contact information without developer involvement.

#### Acceptance Criteria

1. THE system SHALL define a `contactPage` singleton document schema in Sanity with fields: `headOfficeLabel` (string), `headOfficeAddress` (text), `branchOfficeLabel` (string), `branchOfficeAddress` (text), `phoneNumber` (string), `email` (string), `workingHours` (array of objects with `day` string and `hours` string), `mapMarkers` (array of objects with `latitude` number and `longitude` number), `formHeading` (string), `formSubtext` (text), and `defaultMapCenter` (object with `latitude` number and `longitude` number).
2. WHEN the Contact page renders, THE system SHALL fetch `contactPage` from Sanity and use the CMS data for all office details, working hours, and map markers.
3. THE system SHALL seed the `contactPage` document with all values currently hardcoded in `src/app/contact/page.tsx`, including the four map markers with their exact coordinates.

### Requirement 6 — Project Pages (Existing + Extended)

**User Story:** As a content editor, I want to manage project page content — including banner, descriptions, stats, amenity items, and location details — fully through the CMS, so that every project page is data-driven.

#### Acceptance Criteria

1. THE system SHALL extend the existing `project` schema with an `amenities` array field, where each item has `icon` (image), `title` (string), and `description` (text), to allow the four amenity cards (Prime Locations, Spectacular Living, Life & Wellness, 24/7 Security) to be CMS-managed.
2. THE system SHALL ensure the existing `images` array (with `imageWithRole` objects) on the `project` schema includes enough image slots to cover the banner image and at least 3 gallery images.
3. WHEN a project detail page renders, THE system SHALL use the `amenities` array from the CMS to render the amenity cards rather than the hardcoded SVG icon + text pairs.
4. THE system SHALL seed each of the three project documents (Kazanchis, Bulbula, Sarbet) with the four standard amenity items and their descriptions currently hardcoded in `src/app/projects/[slug]/page.tsx`.
5. THE system SHALL upload the correct banner images to each project: `kazanchis.jpg` for Kazanchis, `BUlbulaBanner.jpg` for Bulbula, and `SarbetBanner.jpg` for Sarbet.

### Requirement 7 — Property Unit Pages (Existing + Extended)

**User Story:** As a content editor, I want to manage property unit page content — including banner image, gallery images, and amenity items — through the CMS, so that each unit detail page is fully data-driven.

#### Acceptance Criteria

1. THE system SHALL extend the existing `propertyUnit` schema with an `images` array field of type `imageWithRole` to support banner and gallery images per unit, and an `amenities` array field matching the structure on the `project` schema.
2. WHEN a property unit detail page renders, THE system SHALL use `images` from the CMS to display the banner and gallery images instead of the hardcoded static imports.
3. THE system SHALL seed each of the 11 property unit documents with appropriate cover images and the four standard amenity items.
4. THE system SHALL ensure the seed assigns the correct cover images: `2BedromImage.jpg` for 2bed units, `3BedroomImage.jpg` for 3bed units, `Apartment.jpg` for 4bed units, `LuxuriousImage.jpg` for penthouses, `VillaBanner.jpg` for villas, `TownHousesBanner.jpg` for townhouses.

### Requirement 8 — Metro News (Existing + Confirmed Working)

**User Story:** As a content editor, I want the Metro News listing and detail pages to correctly display all news articles from the CMS, so that new articles published in Sanity appear on the website immediately.

#### Acceptance Criteria

1. THE system SHALL ensure the news listing page at `/news-room` uses `newsItem.slug.current` (not the raw slug object) when building the article link href.
2. THE system SHALL ensure the news detail page at `/news-room/[slug]` renders `description1` and `description2` using `<PortableText>` components.
3. THE system SHALL confirm the `metroNews` schema has fields: `title` (string), `slug` (slug), `date` (date), `description1` (Portable Text), `description2` (Portable Text), `coverImage` (image).
4. THE system SHALL seed at least 2 sample news articles with real titles, content, and image references from the `/public/` folder (`NewsImage1.jpg`, `NewsImage2.jpg`, `NewsImage3.jpg`).

### Requirement 9 — Frontend Pages Connect to CMS

**User Story:** As a developer, I want all frontend pages to fetch their content from Sanity using GROQ queries, so that no page content is hardcoded in React components.

#### Acceptance Criteria

1. THE system SHALL update `src/lib/groq-queries.ts` to include queries for: `siteSettings`, `homePage`, `aboutPage`, `galleryPage`, and `contactPage`.
2. WHEN the `CustomeLayout` component fetches projects for the Header and Footer, THE system SHALL also fetch `siteSettings` and pass contact/social data to the Footer component.
3. THE system SHALL update `src/app/page.tsx` to fetch `homePage` from Sanity and render hero text, stats, and section headings from the CMS.
4. THE system SHALL update `src/app/about-metro/page.tsx` to fetch `aboutPage` from Sanity and render all content including team members from the CMS.
5. THE system SHALL update `src/app/gallery/page.tsx` to fetch `galleryPage` from Sanity and render images from the CMS array.
6. THE system SHALL update `src/app/contact/page.tsx` to fetch `contactPage` from Sanity for office details, working hours, and map markers.

### Requirement 10 — Comprehensive Seed Script

**User Story:** As a developer, I want a single seed script that populates the entire CMS with all content from the original website, so that running it once fills every page with real content and the website renders fully.

#### Acceptance Criteria

1. THE system SHALL provide an updated seed script at `studio-metro-realestate/seed.mjs` that creates or replaces documents for: `siteSettings`, `homePage`, `aboutPage`, `contactPage`, `galleryPage`, the 3 project documents, and the 11 property unit documents.
2. THE system SHALL use Sanity's `createOrReplace` mutation so the script is idempotent and safe to re-run.
3. WHEN the seed script runs for text-only fields, THE system SHALL populate all string, Portable Text, and numeric fields with the original hardcoded values from the website.
4. THE system SHALL include inline instructions in the seed script output indicating which images from `/public/` must be manually uploaded to each document in Sanity Studio (since image binary upload requires the asset pipeline separately).
5. THE system SHALL NOT attempt to programmatically upload binary image files from `/public/` — those are referenced by filename in comments only.
