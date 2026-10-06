'use client'
import Link from "next/link"
import { GoDownload } from "react-icons/go"
import React, { useState, useEffect } from "react"
import Image from "next/image"
import NextIcon from "../../../public/NextIcon.svg"
import RegisterInterest from "@/sections/RegisterInterest"
import FilterIcon from '../../../public/FilterIcon.svg'
import { sanityClient, getImageUrl } from '@/lib/sanity'
import { queries } from '@/lib/groq-queries'
import { unitTypeToPath, unitTypeLabel } from '@/lib/unitTypeToPath'

interface PropertyUnit {
  _id: string
  unitType: string
  site: string
  slug: { current: string }
  coverImage: any
}

const SITE_LABELS: Record<string, string> = {
  KAZANCHIS: 'Kazanchis',
  BULBULA: 'Bulbula',
  SARBET: 'Sarbet',
}

const PropertyList = () => {
  const [isRegisterInterestOpen, setRegisterInterestOpen] = useState(false)
  const [units, setUnits] = useState<PropertyUnit[]>([])
  const [loading, setLoading] = useState(true)
  const [isFilterOpen, setIsFilterOpen] = useState(true)
  const [selectedSites, setSelectedSites] = useState<Set<string>>(new Set())
  const [selectedUnitTypes, setSelectedUnitTypes] = useState<Set<string>>(new Set())
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  useEffect(() => {
    sanityClient.fetch(queries.allPropertyUnits)
      .then((data: PropertyUnit[]) => setUnits(data || []))
      .catch(() => setUnits([]))
      .finally(() => setLoading(false))
  }, [])

  // Derive available sites and unit types per site from fetched data
  const availableSites = Array.from(new Set(units.map(u => u.site)))
  const unitTypesBySite: Record<string, string[]> = {}
  units.forEach(u => {
    if (!unitTypesBySite[u.site]) unitTypesBySite[u.site] = []
    if (!unitTypesBySite[u.site].includes(u.unitType)) {
      unitTypesBySite[u.site].push(u.unitType)
    }
  })

  const toggleSite = (site: string) => {
    setSelectedSites(prev => {
      const next = new Set(prev)
      if (next.has(site)) {
        next.delete(site)
        // Also clear unit type selections for this site
        setSelectedUnitTypes(prevTypes => {
          const nextTypes = new Set(prevTypes)
          ;(unitTypesBySite[site] || []).forEach(t => nextTypes.delete(`${site}:${t}`))
          return nextTypes
        })
      } else {
        next.add(site)
      }
      return next
    })
    setCurrentPage(1)
  }

  const toggleUnitType = (site: string, unitType: string) => {
    const key = `${site}:${unitType}`
    setSelectedUnitTypes(prev => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
    setCurrentPage(1)
  }

  const filteredUnits = units.filter(unit => {
    const noSiteFilter = selectedSites.size === 0
    const siteMatch = selectedSites.has(unit.site)
    if (!noSiteFilter && !siteMatch) return false

    // Check if any unit type filters are active for this site
    const activeTypesForSite = (unitTypesBySite[unit.site] || [])
      .filter(t => selectedUnitTypes.has(`${unit.site}:${t}`))

    if (activeTypesForSite.length === 0) return true
    return activeTypesForSite.includes(unit.unitType)
  })

  const totalPages = Math.ceil(filteredUnits.length / itemsPerPage)
  const paginated = filteredUnits.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div>
      <div className='container mx-auto mt-10 lg:mt-0 pb-14 lg:py-16 flex flex-col gap-10 lg:gap-20 px-5 lg:px-0 items-end'>
        <div data-aos="fade-up" data-aos-duration="1000" className='flex justify-between items-center gap-20 w-full border-b-[2px] border-[#F7F8FA] pb-6'>
          <p className='text-4xl lg:text-7xl font-medium leading-snug'>Metro™ Property List</p>
          <div className='hidden lg:flex gap-3 items-end font-semibold justify-end'>
            <Link href='/contact'>REACH OUT TO OUR TEAM</Link>
            <Image src={NextIcon} alt='' />
          </div>
        </div>

        <div data-aos="fade-up" data-aos-duration="1000" className='flex flex-col lg:flex-row justify-between items-start gap-10'>
          {/* Filter Panel */}
          <div className='flex flex-col w-full lg:w-[25%] justify-between lg:pr-10 text-md font-medium p-6 gap-10'>
            <div className='flex w-full pr-10 text-lg lg:text-md font-semibold gap-10 uppercase'>
              <p>Property List Filter</p>
              <Image src={FilterIcon} alt='' className='cursor-pointer' onClick={() => setIsFilterOpen(!isFilterOpen)} />
            </div>
            {isFilterOpen && (
              <>
                <div>
                  <p className='text-[#6B7280]'>Metro real-estate have enormous amount of properties with a variety of choices that can fit your lifestyle and standard of living.</p>
                </div>
                <div className='flex flex-col gap-y-6 mt-2'>
                  <p className='text-lg text-[#00416B] font-semibold'>LOCATIONS</p>
                  {availableSites.map((site, i) => (
                    <div key={site}>
                      {i > 0 && <div className='border-t-2 border-t-[#dbe5f1] mb-4'></div>}
                      <div>
                        <input
                          type='checkbox'
                          className='mr-2 cursor-pointer accent-primary'
                          checked={selectedSites.has(site)}
                          onChange={() => toggleSite(site)}
                        />
                        <label className='font-medium text-black text-2xl'>{SITE_LABELS[site] ?? site}</label>
                        <div className='ml-5 flex flex-col gap-1 mt-1'>
                          {(unitTypesBySite[site] || []).map(unitType => (
                            <div key={unitType}>
                              <input
                                type='checkbox'
                                className='mr-2 cursor-pointer accent-primary'
                                disabled={!selectedSites.has(site)}
                                checked={selectedUnitTypes.has(`${site}:${unitType}`)}
                                onChange={() => toggleUnitType(site, unitType)}
                              />
                              <label className={`font-normal text-black text-lg ${!selectedSites.has(site) ? 'opacity-40' : ''}`}>
                                {unitTypeLabel[unitType] ?? unitType}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Property Cards */}
          <div className='flex flex-wrap justify-between gap-y-10 w-full lg:w-[66.5%]'>
            {loading && <p className='text-[#738195]'>Loading properties...</p>}
            {!loading && paginated.length === 0 && (
              <p className='text-[#738195]'>No properties found.</p>
            )}
            {paginated.map((unit) => {
              const path = unitTypeToPath[unit.unitType] ?? '/property-list'
              const imageUrl = unit.coverImage ? getImageUrl(unit.coverImage) : ''
              return (
                <Link
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  key={unit._id}
                  className='w-full lg:w-[49.5%] flex flex-col gap-2'
                  href={`${path}?location=${unit.site}`}
                >
                  <div
                    className='w-full bg-cover bg-center bg-gray-100'
                    style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : undefined, height: '400px' }}
                  />
                  <p className='text-[#738195] font-normal text-sm'>{SITE_LABELS[unit.site] ?? unit.site}</p>
                  <p className='text-md font-medium'>{unitTypeLabel[unit.unitType] ?? unit.unitType}</p>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className='flex justify-center gap-5 w-full lg:w-[66.5%]'>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <button
                key={n}
                onClick={() => setCurrentPage(n)}
                className={`w-8 h-8 rounded-full flex items-center text-[#002740] font-medium justify-center ${currentPage === n ? 'bg-primary text-white' : 'text-main font-medium bg-[#F3F4F6]'}`}
              >
                {n}
              </button>
            ))}
          </div>
        )}
      </div>
      {isRegisterInterestOpen && (
        <RegisterInterest isRegisterInterestOpen={isRegisterInterestOpen} setRegisterInterestOpen={setRegisterInterestOpen} />
      )}
    </div>
  )
}

export default PropertyList
