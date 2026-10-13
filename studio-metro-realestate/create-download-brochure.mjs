import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '632xwlq5',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

const downloadBrochureDoc = {
  _type: 'downloadBrochure',
  heading: 'Download Brochure',
  description: 'Are you ready to find your perfect place? Download Metro Real Estate comprehensive brochure to equip you with the knowledge you need to make informed real estate decisions.',
  fullNameLabel: 'Full name',
  emailLabel: 'Email address',
  propertySelectLabel: 'Select the property of your interest',
  propertyOptions: ['2 Bedroom Apartment', '3 Bedroom Apartment', 'Penthouses', 'Villas'],
  termsText: 'By sending this message you agree to Metro Real Estate',
  termsLinkText: 'Terms and Conditions.',
  submitButtonText: 'DOWNLOAD BROCHURE',
  // Amharic translations (placeholder - can be updated later)
  heading_am: 'ብሮሹር ያውርዱ',
  description_am: 'የእርስዎን ትክክለኛ ቦታ ለማግኘት ዝግጁ ነዎት? የሜትሮ ሬል እስቴት የተሟላ ብሮሹር ያውርዱ ይህም በሬል እስቴት ውሳኔዎችን ለማድረግ የሚያስፈልግዎትን እውቀት ያስረዳዎታል።',
  fullNameLabel_am: 'ሙሉ ስም',
  emailLabel_am: 'ኢሜይል አድራሻ',
  propertySelectLabel_am: 'የእርስዎን ፍላጎት ያለውን ንብረት ይምረጡ',
  propertyOptions_am: ['2 አቢር አፓርትመንት', '3 አቢር አፓርትመንት', 'ፔንትሃውስ', 'ቪላዎች'],
  termsText_am: 'ይህንን መልእክት በመላክ በሜትሮ ሬል እስቴት ውሎች ይስማማሉ',
  termsLinkText_am: 'ውሎች እና ሁኔታዎች።',
  submitButtonText_am: 'ብሮሹር ያውርዱ',
}

try {
  const result = await client.create(downloadBrochureDoc)
  console.log('Download Brochure document created successfully:', result._id)
  console.log('Document ID:', result._id)
} catch (error) {
  console.error('Error creating download brochure document:', error)
}
