export const queries = {
  // Get all projects for header/footer navigation
  allProjects: `
    *[_type == "project"] | order(_createdAt asc) {
      _id,
      projectName,
      slug
    }
  `,

  // Get single project by slug
  projectBySlug: `
    *[_type == "project" && slug.current == $slug][0] {
      _id,
      projectName,
      slug,
      description1,
      description1_am,
      description2,
      description2_am,
      completionDate,
      totalProjectArea,
      totalPropertyUnits,
      carParkingCapacity,
      address,
      address_am,
      distanceFromFriendshipPark,
      distanceFromBoleIntlAirport,
      distanceFromFriendshipParkDesc,
      distanceFromFriendshipParkDesc_am,
      distanceFromBoleIntlAirportDesc,
      distanceFromBoleIntlAirportDesc_am,
      mapLocation {
        latitude,
        longitude
      },
      virtualTourUrl,
      images[] {
        image,
        role,
        caption
      },
      amenities[] {
        icon,
        title,
        description
      }
    }
  `,

  // Get all news articles
  allNews: `
    *[_type == "metroNews"] | order(date desc) {
      _id,
      title,
      title_am,
      slug,
      date,
      description1,
      description1_am,
      description2,
      description2_am,
      coverImage
    }
  `,

  // Get single news by slug
  newsBySlug: `
    *[_type == "metroNews" && slug.current == $slug][0] {
      _id,
      title,
      title_am,
      slug,
      date,
      description1,
      description1_am,
      description2,
      description2_am,
      coverImage,
      secondaryImage
    }
  `,

  // Get all property units (for property list page)
  allPropertyUnits: `
    *[_type == "propertyUnit"] | order(site asc, unitType asc) {
      _id,
      unitType,
      site,
      slug,
      coverImage
    }
  `,

  // Get a single property unit by type and site (for unit detail pages)
  propertyUnitByTypeAndSite: `
    *[_type == "propertyUnit" && unitType == $unitType && site == $site][0] {
      _id,
      unitType,
      site,
      slug,
      description1,
      description1_am,
      description2,
      description2_am,
      propertyLocationLevel,
      totalCirculationAreaInSqm,
      totalFloorAreaInSqm,
      bedroomPerPropertyUnits,
      coverImage,
      floorPlanImage,
      mapLocation {
        latitude,
        longitude
      },
      images[] {
        image,
        role,
        caption
      },
      amenities[] {
        icon,
        title,
        description
      }
    }
  `,

  // Global site settings (navbar/footer)
  siteSettings: `
    *[_type == "siteSettings"][0] {
      logo,
      phoneNumber,
      whatsappNumber,
      email,
      headOfficeAddress,
      headOfficeAddress_am,
      branchOfficeAddress,
      branchOfficeAddress_am,
      facebookUrl,
      youtubeUrl,
      instagramUrl,
      linkedinUrl,
      copyrightText,
      workingHours[] {
        day,
        hours,
        closed
      }
    }
  `,

  // Home page singleton
  homePage: `
    *[_type == "homePage"][0] {
      heroHeadlineText,
      heroHeadlineText_am,
      heroDesktopVideoPath,
      heroMobileVideoPath,
      introTagline,
      introTagline_am,
      introHeading,
      introHeading_am,
      introParagraph1,
      introParagraph1_am,
      introParagraph2,
      introParagraph2_am,
      stats[] {
        value,
        label,
        label_am,
        description,
        description_am
      },
      eleganceSectionHeading,
      eleganceSectionHeading_am,
      eleganceParagraph1,
      eleganceParagraph1_am,
      eleganceParagraph2,
      eleganceParagraph2_am,
      propertyTypesHeading1,
      propertyTypesHeading1_am,
      propertyTypesHeading2,
      propertyTypesHeading2_am,
      propertyTypesParagraph1,
      propertyTypesParagraph1_am,
      propertyTypesParagraph2,
      propertyTypesParagraph2_am,
      consultationHeading,
      consultationHeading_am,
      consultationSubheading,
      consultationSubheading_am,
      consultationBody,
      consultationBody_am,
      staffPhoto
    }
  `,

  // About page singleton
  aboutPage: `
    *[_type == "aboutPage"][0] {
      bannerImage,
      heroHeading,
      heroHeading_am,
      introSubheading,
      introSubheading_am,
      introParagraph1,
      introParagraph1_am,
      introParagraph2,
      introParagraph2_am,
      secondaryBannerImage,
      stats[] {
        value,
        label,
        label_am,
        description,
        description_am
      },
      about3Image,
      secondaryHeading,
      secondaryHeading_am,
      visionTitle,
      visionTitle_am,
      visionBody,
      visionBody_am,
      missionTitle,
      missionTitle_am,
      missionBody,
      missionBody_am,
      galleryImage1,
      galleryImage2,
      tourSectionImage,
      teamSectionHeading,
      teamSectionHeading_am,
      teamChampionsLabel,
      teamChampionsLabel_am,
      teamDescription,
      teamDescription_am,
      teamMembers[] {
        name,
        position,
        photo
      }
    }
  `,

  // Gallery page singleton
  galleryPage: `
    *[_type == "galleryPage"][0] {
      title,
      images[] {
        image,
        caption,
        altText
      }
    }
  `,

  // Contact page singleton
  contactPage: `
    *[_type == "contactPage"][0] {
      headOfficeLabel,
      headOfficeLabel_am,
      headOfficeAddress,
      headOfficeAddress_am,
      branchOfficeLabel,
      branchOfficeLabel_am,
      branchOfficeAddress,
      branchOfficeAddress_am,
      phoneNumber,
      email,
      workingHours[] {
        day,
        hours,
        closed
      },
      defaultMapCenter {
        latitude,
        longitude
      },
      mapMarkers[] {
        latitude,
        longitude
      },
      formHeading,
      formHeading_am,
      formSubtext,
      formSubtext_am
    }
  `,
}
