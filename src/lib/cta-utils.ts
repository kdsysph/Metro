import { sanityClient } from './sanity'
import { queries } from './groq-queries'

export interface CTASettings {
  downloadBrochureButton?: string
  downloadBrochureButton_am?: string
  getPropertyListButton?: string
  getPropertyListButton_am?: string
  downloadSalesKitButton?: string
  downloadSalesKitButton_am?: string
  getProjectBrochureButton?: string
  getProjectBrochureButton_am?: string
  discoverYourNextHomeButton?: string
  discoverYourNextHomeButton_am?: string
  contactMetroSalesTeamButton?: string
  contactMetroSalesTeamButton_am?: string
  scheduleConsultationButton?: string
  scheduleConsultationButton_am?: string
  registerInterestButton?: string
  registerInterestButton_am?: string
  submitInterestButton?: string
  submitInterestButton_am?: string
  discoverNextHomeButton?: string
  discoverNextHomeButton_am?: string
  discoverSimilarPropertiesButton?: string
  discoverSimilarPropertiesButton_am?: string
  reachOutToTeamButton?: string
  reachOutToTeamButton_am?: string
}

// Fallback values for CTAs
const FALLBACK_CTA: CTASettings = {
  downloadBrochureButton: 'DOWNLOAD BROUCHER (2.8mB)',
  getPropertyListButton: 'GET METRO PROPERTY LIST',
  downloadSalesKitButton: 'DOWNLOAD SALES KIT',
  getProjectBrochureButton: 'GET {PROJECT_NAME} BROCHURE',
  discoverYourNextHomeButton: 'DISCOVER YOUR NEXT HOME',
  contactMetroSalesTeamButton: 'CONTACT METRO SALES TEAM',
  scheduleConsultationButton: 'SCHEDULE A CONSULTATION',
  registerInterestButton: 'REGISTER INTEREST',
  submitInterestButton: 'Submit My Interest',
  discoverNextHomeButton: 'Discover your next home',
  discoverSimilarPropertiesButton: 'Discover Similar Properties',
  reachOutToTeamButton: 'REACH OUT TO OUR TEAM',
}

let cachedCTASettings: CTASettings | null = null

export async function getCTASettings(): Promise<CTASettings> {
  if (cachedCTASettings) {
    return cachedCTASettings
  }

  try {
    const settings = await sanityClient.fetch(queries.ctaSettings)
    cachedCTASettings = settings || {}
    return cachedCTASettings
  } catch (error) {
    console.error('Error fetching CTA settings:', error)
    return {}
  }
}

export function getCTAText(
  ctaSettings: CTASettings | null | undefined,
  key: keyof CTASettings,
  lang: 'en' | 'am' = 'en'
): string {
  if (!ctaSettings) {
    return FALLBACK_CTA[key] || key
  }

  const amharicKey = `${key}_am` as keyof CTASettings
  const value = lang === 'am' ? ctaSettings[amharicKey] : ctaSettings[key]

  return value || FALLBACK_CTA[key] || key
}

// Helper function to get CTA text with project name replacement
export function getProjectBrochureText(
  ctaSettings: CTASettings | null | undefined,
  projectName: string,
  lang: 'en' | 'am' = 'en'
): string {
  const baseText = getCTAText(ctaSettings, 'getProjectBrochureButton', lang)
  return baseText.replace('{PROJECT_NAME}', projectName)
}
