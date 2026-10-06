/**
 * Uploads local images from /public/ to Sanity and patches documents to reference them.
 *
 * Run from inside studio-metro-realestate/:
 *   node upload-images.mjs
 *
 * Requires SANITY_API_TOKEN env var with write access.
 */

import { createClient } from '@sanity/client'
import { createReadStream, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import 'dotenv/config'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC_DIR = resolve(__dirname, '../public')

const client = createClient({
  projectId: '632xwlq5',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

function key() {
  return Math.random().toString(36).slice(2, 10)
}

/** Upload a file from /public/ to Sanity and return an image reference object */
async function uploadImage(filename) {
  const filepath = resolve(PUBLIC_DIR, filename)
  if (!existsSync(filepath)) {
    console.warn(`  ⚠  File not found: ${filename}`)
    return null
  }
  try {
    const asset = await client.assets.upload('image', createReadStream(filepath), {
      filename,
    })
    console.log(`  ✓ Uploaded: ${filename} → ${asset._id}`)
    return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
  } catch (err) {
    console.error(`  ✗ Failed to upload ${filename}: ${err.message}`)
    return null
  }
}

async function main() {
  // ── GALLERY PAGE ───────────────────────────────────────────────────────────
  console.log('\n── Gallery Page ──')
  const galleryFilenames = [
    'Gallery1.jpg', 'Gallery2.jpg', 'Gallery3.jpg', 'Gallery4.jpg',
    'Gallery5.jpg', 'Gallery6.jpg', 'Gallery7.jpg', 'Gallery8.jpg',
    'Gallery9.jpg', 'Gallery10.jpg', 'Gallery11.jpg',
  ]
  const galleryImages = []
  for (const filename of galleryFilenames) {
    const imageRef = await uploadImage(filename)
    if (imageRef) {
      galleryImages.push({
        _type: 'object',
        _key: key(),
        image: imageRef,
        caption: filename.replace('.jpg', ''),
        altText: `Metro Real Estate ${filename.replace('.jpg', '')}`,
      })
    }
  }
  if (galleryImages.length) {
    await client.patch('galleryPage').set({ images: galleryImages }).commit()
    console.log(`  ✓ Patched galleryPage with ${galleryImages.length} images`)
  }

  // ── PROJECT: KAZANCHIS ────────────────────────────────────────────────────
  console.log('\n── Project: Kazanchis ──')
  const kazanchisBanner = await uploadImage('kazanchisBanner.jpg')
  const kazanchisGallery1 = await uploadImage('kazanchis2.jpg')
  const kazanchisGallery2 = await uploadImage('kazanchis3.jpg')
  const kazanchisGallery3 = await uploadImage('kazanchisTower1.jpg')

  const kazanchisImages = [
    kazanchisBanner && { _type: 'imageWithRole', _key: key(), role: 'banner', image: kazanchisBanner, caption: 'Kazanchis Banner' },
    kazanchisGallery1 && { _type: 'imageWithRole', _key: key(), role: 'gallery', image: kazanchisGallery1, caption: 'Kazanchis Gallery 1' },
    kazanchisGallery2 && { _type: 'imageWithRole', _key: key(), role: 'gallery', image: kazanchisGallery2, caption: 'Kazanchis Gallery 2' },
    kazanchisGallery3 && { _type: 'imageWithRole', _key: key(), role: 'gallery', image: kazanchisGallery3, caption: 'Kazanchis Gallery 3' },
  ].filter(Boolean)

  if (kazanchisImages.length) {
    await client.patch('project-kazanchis').set({ images: kazanchisImages }).commit()
    console.log(`  ✓ Patched project-kazanchis with ${kazanchisImages.length} images`)
  }

  // ── PROJECT: BULBULA ──────────────────────────────────────────────────────
  console.log('\n── Project: Bulbula ──')
  const bulbulaBanner = await uploadImage('BUlbulaBanner.jpg')
  const bulbulaGallery1 = await uploadImage('Bulbula2Image.jpg')
  const bulbulaGallery2 = await uploadImage('Bulbula3.jpg')
  const bulbulaGallery3 = await uploadImage('Bulbula4.jpg')

  const bulbulaImages = [
    bulbulaBanner && { _type: 'imageWithRole', _key: key(), role: 'banner', image: bulbulaBanner, caption: 'Bulbula Banner' },
    bulbulaGallery1 && { _type: 'imageWithRole', _key: key(), role: 'gallery', image: bulbulaGallery1, caption: 'Bulbula Gallery 1' },
    bulbulaGallery2 && { _type: 'imageWithRole', _key: key(), role: 'gallery', image: bulbulaGallery2, caption: 'Bulbula Gallery 2' },
    bulbulaGallery3 && { _type: 'imageWithRole', _key: key(), role: 'gallery', image: bulbulaGallery3, caption: 'Bulbula Gallery 3' },
  ].filter(Boolean)

  if (bulbulaImages.length) {
    await client.patch('project-bulbula').set({ images: bulbulaImages }).commit()
    console.log(`  ✓ Patched project-bulbula with ${bulbulaImages.length} images`)
  }

  // ── PROJECT: SARBET ───────────────────────────────────────────────────────
  console.log('\n── Project: Sarbet ──')
  const sarbetBanner = await uploadImage('SarbetBanner.jpg')
  const sarbetGallery1 = await uploadImage('SarbetImage2.jpg')
  const sarbetGallery2 = await uploadImage('SarbetImage3.jpg')
  const sarbetGallery3 = await uploadImage('SarbetImage4.jpg')

  const sarbetImages = [
    sarbetBanner && { _type: 'imageWithRole', _key: key(), role: 'banner', image: sarbetBanner, caption: 'Sarbet Banner' },
    sarbetGallery1 && { _type: 'imageWithRole', _key: key(), role: 'gallery', image: sarbetGallery1, caption: 'Sarbet Gallery 1' },
    sarbetGallery2 && { _type: 'imageWithRole', _key: key(), role: 'gallery', image: sarbetGallery2, caption: 'Sarbet Gallery 2' },
    sarbetGallery3 && { _type: 'imageWithRole', _key: key(), role: 'gallery', image: sarbetGallery3, caption: 'Sarbet Gallery 3' },
  ].filter(Boolean)

  if (sarbetImages.length) {
    await client.patch('project-sarbet').set({ images: sarbetImages }).commit()
    console.log(`  ✓ Patched project-sarbet with ${sarbetImages.length} images`)
  }

  // ── ABOUT PAGE ────────────────────────────────────────────────────────────
  console.log('\n── About Page ──')
  const aboutBanner = await uploadImage('AboutBannerImage.jpg')
  const about3 = await uploadImage('about3Image.jpg')
  const aboutGallery1 = await uploadImage('about4Image.jpg')
  const aboutGallery2 = await uploadImage('about5Image.jpg')

  const aboutPatch = {}
  if (aboutBanner) aboutPatch.bannerImage = aboutBanner
  if (about3) aboutPatch.about3Image = about3
  if (aboutGallery1) aboutPatch.galleryImage1 = aboutGallery1
  if (aboutGallery2) aboutPatch.galleryImage2 = aboutGallery2

  if (Object.keys(aboutPatch).length) {
    await client.patch('aboutPage').set(aboutPatch).commit()
    console.log('  ✓ Patched aboutPage images')
  }

  // ── PROPERTY UNITS: cover images + banner/gallery ─────────────────────────
  const unitImages = {
    // Kazanchis
    'propertyUnit-KAZANCHIS-2bed':     { cover: '2BedromImage.jpg',    banner: '2BedromImage.jpg',    gallery: ['2Bedrom2Image.jpg', '2Bedrom3Image.jpg'] },
    'propertyUnit-KAZANCHIS-3bed':     { cover: '3BedroomImage.jpg',   banner: '3BedroomImage.jpg',   gallery: ['SarbetImage2.jpg', 'SarbetImage3.jpg'] },
    'propertyUnit-KAZANCHIS-4bed':     { cover: 'kazanchis2.jpg',      banner: 'kazanchis2.jpg',      gallery: ['kazanchis3.jpg', 'kazanchisTower2.jpg'] },
    'propertyUnit-KAZANCHIS-penthouse':{ cover: 'LuxuriousImage.jpg',  banner: 'LuxuriousImage.jpg',  gallery: ['kazanchisTower1.jpg', 'kazanchisTower2.jpg'] },
    // Bulbula
    'propertyUnit-BULBULA-2bed':       { cover: 'Bulbula2Image.jpg',   banner: 'Bulbula2Image.jpg',   gallery: ['Bulbula3.jpg', 'Bulbula4.jpg'] },
    'propertyUnit-BULBULA-3bed':       { cover: 'Bulbula3.jpg',        banner: 'Bulbula3.jpg',        gallery: ['Bulbula4.jpg', 'Bulbula5.jpg'] },
    'propertyUnit-BULBULA-4bed':       { cover: 'Bulbula4.jpg',        banner: 'Bulbula4.jpg',        gallery: ['Bulbula2Image.jpg', 'Bulbula5.jpg'] },
    'propertyUnit-BULBULA-villa':      { cover: 'Villas.jpg',          banner: 'VillaBanner.jpg',     gallery: ['villa2Image.jpg', 'villa3Image.jpg'] },
    // Sarbet (reuse best available sarbet images)
    'propertyUnit-SARBET-2bed':        { cover: 'SarbetApartment.jpg', banner: 'SarbetBanner.jpg',    gallery: ['SarbetImage2.jpg', 'SarbetImage3.jpg'] },
    'propertyUnit-SARBET-3bed':        { cover: 'SarbetImage2.jpg',    banner: 'SarbetBanner.jpg',    gallery: ['SarbetImage3.jpg', 'SarbetImage4.jpg'] },
    'propertyUnit-SARBET-townhouse':   { cover: 'Townhouses.jpg',      banner: 'TownHousesBanner.jpg',gallery: ['townhouse2Image.jpg', 'townhouse3Image.jpg'] },
  }

  for (const [docId, files] of Object.entries(unitImages)) {
    console.log(`\n── Property Unit: ${docId} ──`)

    // Check document exists first
    const existing = await client.fetch(`*[_id == $id][0]{ _id }`, { id: docId })
    if (!existing) {
      console.log(`  ⚠  Document not found, skipping: ${docId}`)
      continue
    }

    const coverRef = await uploadImage(files.cover)
    const bannerRef = await uploadImage(files.banner)
    const galleryRefs = []
    for (const f of files.gallery) {
      const ref = await uploadImage(f)
      if (ref) galleryRefs.push(ref)
    }

    const patch = {}
    if (coverRef) patch.coverImage = coverRef

    const imageArray = [
      bannerRef && { _type: 'imageWithRole', _key: key(), role: 'banner', image: bannerRef, caption: 'Banner' },
      ...galleryRefs.map((ref, i) => ({ _type: 'imageWithRole', _key: key(), role: 'gallery', image: ref, caption: `Gallery ${i + 1}` })),
    ].filter(Boolean)

    if (imageArray.length) patch.images = imageArray

    if (Object.keys(patch).length) {
      await client.patch(docId).set(patch).commit()
      console.log(`  ✓ Patched ${docId}`)
    }
  }

  console.log('\n✅ Done! All images uploaded and documents patched.')
}

main().catch(console.error)
