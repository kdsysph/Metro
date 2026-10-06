'use client'

import Image from "next/image";
import VillaBanner from '../../../../public/VillaBanner.jpg';
import Villa2Image from '../../../../public/villa2Image.jpg';
import Villa3Image from '../../../../public/villa3Image.jpg';
import PlanImage from '../../../../public/Plan.jpg';
import NextIcon from '../../../../public/NextIcon.svg';
import NextIconLight from '../../../../public/NextIconLight.svg';
import LocationIcon from '../../../../public/LocationIcon.svg';
import CallIcon from '../../../../public/CallIcon.svg';
import TakeTourImage from '../../../../public/TakeTourImage.jpg';
import React, {useState, useEffect} from "react";
import {GoDownload} from "react-icons/go";
import Link from "next/link";
import RegisterInterest from "@/sections/RegisterInterest";
import {Map, Marker} from 'pigeon-maps';
// @ts-ignore
import {Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import {sanityClient, getImageUrl} from '@/lib/sanity';
import {queries} from '@/lib/groq-queries';
import {PortableText} from '@portabletext/react';
import SplashPage from "@/sections/SplashPage";
import AmenityCards from "@/sections/AmenityCards";
import DiscoverProperties from "@/sections/DiscoverProperties";
import {useLanguage} from '@/context/LanguageContext';
import {localizeField} from '@/lib/localize';
import Bedroom2Image from '../../../../public/2BedromImage.jpg';
import Bedroom3Image from '../../../../public/3BedroomImage.jpg';
import LuxuriousImage from '../../../../public/LuxuriousImage.jpg';

const BULBULA = {latitude: 8.9451929, longitude: 38.7851493};

const Villas = () => {
    const {lang} = useLanguage();
    const [isRegisterInterestOpen, setRegisterInterestOpen] = useState(false);
    const [showFirstFloor, setShowFirstFloor] = useState(false);
    const [unit, setUnit] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        sanityClient.fetch(queries.propertyUnitByTypeAndSite, {unitType: 'villa', site: 'BULBULA'})
            .then((data: any) => {setUnit(data); setLoading(false);})
            .catch(() => {setError('Failed to load'); setLoading(false);});
    }, []);

    if (loading) return <SplashPage/>;
    if (error || !unit) return <div>Error loading villa details</div>;

    const bannerUrl = unit.images?.find((i: any) => i.role === 'banner')?.image
        ? getImageUrl(unit.images.find((i: any) => i.role === 'banner').image) : null;
    const galleryImages = unit.images?.filter((i: any) => i.role === 'gallery') || [];
    const floorPlanUrl = unit.floorPlanImage ? getImageUrl(unit.floorPlanImage) : null;
    const mapCoords = unit.mapLocation ?? BULBULA;

    const virtualTourUrl = unit.virtualTourUrl || 'https://virtual-tour.metrorealestateet.com/';

    return (
        <>
            <div style={{backgroundImage: `url(${bannerUrl || VillaBanner.src})`}}
                 className='h-[70vh] lg:h-[90vh] bg-cover bg-center w-full'/>

            {/* Mobile location badge */}
            <div className='lg:hidden flex w-full lg:w-[33%] text-sm font-medium'>
                <div className='flex gap-2 bg-[#ebc166] items-center py-6 lg:py-0 px-2 w-full lg:w-[80%]'>
                    <Image alt='' src={LocationIcon}/>METRO Bulbula, AA, ETHIOPIA
                </div>
            </div>

            <div className='container mx-auto pt-20 bg-white flex-col flex gap-16 lg:gap-28 items-end pb-[72px]'>
                <div data-aos="fade-up" data-aos-duration="1000"
                     className='container mx-auto pt-14 flex flex-col items-end gap-20 px-5'>

                    {/* Title row with location badge */}
                    <div className='w-full flex flex-col lg:flex-row gap-14 lg:gap-0'>
                        <div className='hidden lg:flex w-full lg:w-[33%] text-sm font-medium'>
                            <div className='flex gap-2 bg-[#ebc166] items-center py-6 lg:py-0 px-2 w-full lg:w-[80%]'>
                                <Image alt='' src={LocationIcon}/>METRO Bulbula, AA, ETHIOPIA
                            </div>
                        </div>
                        <div data-aos="fade-up" data-aos-duration="1000"
                             className='flex flex-col gap-10 w-full lg:w-[66.5%]'>
                            <p className='text-5xl lg:text-6xl font-semibold leading-snug'>G+1 Luxurious Villas</p>
                        </div>
                    </div>

                    {/* Description */}
                    <div data-aos="fade-up" data-aos-duration="1000" className='flex justify-between gap-4 items-start'>
                        <div className='hidden lg:flex w-full lg:w-[33%] text-[#00416B] text-sm font-semibold mt-3'>
                            <p>ABOUT PROPERTY</p>
                        </div>
                        <div className='flex flex-col gap-8 lg:gap-10 w-full lg:w-[66.5%]'>
                            <div className='lg:hidden w-full lg:w-[35%]'>
                                <p className='text-[#00416B] text-sm font-semibold'>ABOUT PROPERTY</p>
                            </div>
                            <div className='flex flex-col lg:flex-row justify-start gap-5'>
                                <div className='w-full lg:w-1/2 flex flex-col gap-5 text-lg font-normal'>
                                    {localizeField(unit, 'description1', lang)
                                        ? <PortableText value={localizeField(unit, 'description1', lang)}/>
                                        : <p>The G+1 villas boast expansive living areas, perfect for entertaining or simply unwinding in ultimate comfort. Soaring ceilings and large windows create a sense of openness, while the seamless flow between indoor and outdoor living spaces allows you to connect with the beauty of your surroundings.</p>
                                    }
                                </div>
                                <div className='flex w-full lg:w-1/2 flex-col gap-5 text-lg font-normal'>
                                    {localizeField(unit, 'description2', lang)
                                        ? <PortableText value={localizeField(unit, 'description2', lang)}/>
                                        : <p>The G+1 villas are appointed with high-end finishes and state-of-the-art appliances, leaving no detail unattended to. Contact us today to schedule a viewing and discover your own private paradise. We can&apos;t wait to show your next home!</p>
                                    }
                                </div>
                            </div>
                            <Link href='/download-brochure'
                                  className='flex gap-4 font-semibold w-80 items-center'>
                                DOWNLOAD SALES KIT
                                <GoDownload color='#FFCF01'/>
                            </Link>
                        </div>
                    </div>

                    {/* Floor plan image + ground/first floor toggle */}
                    <Image data-aos="fade-up" data-aos-duration="1000"
                           src={floorPlanUrl ? {src: floorPlanUrl, width: 932, height: 310} as any : PlanImage}
                           alt=''
                           className='w-full lg:mt-10 lg:w-[66.5%]'
                           width={932} height={310}
                    />
                    <div data-aos="fade-up" data-aos-duration="1000"
                         className='w-full md:w-[66.5%] gap-10 flex flex-col md:flex-row justify-between -mt-10'>
                        <div className='flex gap-5 justify-between'>
                            <button onClick={() => setShowFirstFloor(false)}
                                    className={`${!showFirstFloor ? 'text-[#001624]' : 'text-[#738195]'} text-md`}>
                                GROUND FLOOR
                            </button>
                            <button onClick={() => setShowFirstFloor(true)}
                                    className={`${showFirstFloor ? 'text-[#001624]' : 'text-[#738195]'} text-md`}>
                                FIRST FLOOR
                            </button>
                        </div>
                    </div>

                    {/* Stats grid */}
                    <div data-aos="fade-up" data-aos-duration="1000"
                         className='w-full md:w-[66.5%] flex gap-y-10 justify-between flex-wrap'>
                        <div className='w-[48%] flex flex-col gap-4 lg:border-t-2 border-t-[#dbe5f1] pt-5'>
                            <p className='text-3xl lg:text-4xl text-[#00416B] font-semibold'>{unit?.totalFloorAreaInSqm ? `${unit.totalFloorAreaInSqm} SQM` : '182 SQM'}</p>
                            <p className='text-[#738195] text-sm lg:text-md font-medium'>TOTAL FLOOR AREA</p>
                        </div>
                        <div className='w-[48%] flex flex-col gap-4 lg:border-t-2 border-t-[#dbe5f1] pt-5'>
                            <p className='text-3xl lg:text-4xl text-[#00416B] font-semibold'>{unit?.bedroomPerPropertyUnits || '4 Bedrooms'}</p>
                            <p className='text-[#738195] text-sm lg:text-md font-medium'>NUMBER OF BEDROOM UNITS</p>
                        </div>
                        <div className='w-[48%] flex flex-col gap-4 border-t-2 border-t-[#dbe5f1] pt-5'>
                            <p className='text-3xl lg:text-4xl text-[#00416B] font-semibold'>{unit?.totalCirculationAreaInSqm ? `${unit.totalCirculationAreaInSqm} SQM` : '18 SQM'}</p>
                            <p className='text-[#738195] text-sm lg:text-md font-medium'>TOTAL CIRCULATION AREA</p>
                        </div>
                        <div className='w-[48%] flex flex-col gap-4 border-t-2 border-t-[#dbe5f1] pt-5'>
                            <p className='text-3xl lg:text-4xl text-[#00416B] font-semibold'>{unit?.carParkingCapacity || unit?.propertyLocationLevel || '2 vehicles'}</p>
                            <p className='text-[#738195] text-sm lg:text-md font-medium'>CAR PARKING CAPACITY</p>
                        </div>
                    </div>
                </div>

                {/* Gallery section — desktop 2-up, mobile slider */}
                <div data-aos="fade-up" data-aos-duration="1000"
                     className='container mx-auto flex flex-col items-end gap-20 px-5 lg:px-0'>
                    <div className='w-full flex justify-end gap-4 items-center'>
                        <div className='flex flex-col gap-10 w-full lg:w-[66.5%]'>
                            {/* Desktop */}
                            <div className='hidden lg:flex flex-col lg:flex-row justify-between gap-5'>
                                <Image src={galleryImages[0] ? {src: getImageUrl(galleryImages[0].image), width: 460, height: 460} as any : Villa2Image}
                                       alt='' className='w-full md:w-[49%]' width={460} height={460}/>
                                <Image src={galleryImages[1] ? {src: getImageUrl(galleryImages[1].image), width: 460, height: 460} as any : Villa3Image}
                                       alt='' className='w-full md:w-[49%]' width={460} height={460}/>
                            </div>
                            {/* Mobile slider */}
                            <div className='lg:hidden flex flex-col lg:flex-row justify-between gap-5'>
                                <Splide options={{type: 'loop', perPage: 1, perMove: 1, gap: '1rem', pagination: false, arrows: true, autoplay: true, interval: 3000, pauseOnHover: true}}>
                                    <SplideSlide>
                                        <Image src={galleryImages[0] ? {src: getImageUrl(galleryImages[0].image), width: 460, height: 460} as any : Villa2Image}
                                               alt='' className='w-full md:w-[49%] h-full' width={460} height={460}/>
                                    </SplideSlide>
                                    <SplideSlide>
                                        <Image src={galleryImages[1] ? {src: getImageUrl(galleryImages[1].image), width: 460, height: 460} as any : Villa3Image}
                                               alt='' className='w-full md:w-[49%] h-full' width={460} height={460}/>
                                    </SplideSlide>
                                </Splide>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Amenities */}
                <div data-aos="fade-up" data-aos-duration="1000"
                     className='container mx-auto flex flex-col items-end gap-20 px-5 lg:px-0'>
                    <div className='w-full flex flex-col lg:flex-row justify-between items-start'>
                        <div className='flex w-full lg:w-[33%] text-[#00416B] text-xl lg:text-sm font-semibold'>
                            <p>AMENITIES AND FEATURES</p>
                        </div>
                        <div className='flex flex-col gap-10 w-full lg:w-[66.5%] mt-14 lg:mt-0'>
                            <AmenityCards amenities={unit?.amenities}/>
                        </div>
                    </div>
                </div>

                {/* CTA row — mobile: CALL METRO SALES, desktop: REGISTER INTEREST + DOWNLOAD */}
                <div data-aos="fade-up" data-aos-duration="1000"
                     className='w-full md:w-[66.5%] flex flex-col lg:flex-row justify-start gap-5 lg:gap-16 px-5 lg:px-0'>
                    <a href='tel:+25193 806 0606'
                       className='flex lg:hidden justify-center gap-4 font-semibold w-full h-[72px] text-[16px] lg:text-sm bg-primary hover:bg-[#022c47] transition-all duration-200 items-center'>
                        CALL METRO SALES
                        <Image src={CallIcon} width={40} height={40} alt='call'/>
                    </a>
                    <div className='w-1/2'>
                        <button
                            onClick={() => setIsRegisterInterestOpen(true)}
                            className='lg:w-80 hidden lg:flex justify-center gap-4 font-semibold w-full h-[72px] text-[16px] lg:text-sm bg-primary hover:bg-primaryHover transition-all duration-200 items-center'>
                            REGISTER MY INTEREST
                            <Image src={NextIcon} width={40} height={40} alt='next'/>
                        </button>
                    </div>
                    <div className='w-1/2'>
                        <Link href='/download-brochure'
                              className='hidden lg:flex justify-start gap-4 font-semibold w-full lg:w-80 h-14 text-sm items-center'>
                            DOWNLOAD BROUCHER (2.8mB)
                            <GoDownload color='#FFCF01'/>
                        </Link>
                    </div>
                </div>
            </div>

            {isRegisterInterestOpen && (
                <RegisterInterest isRegisterInterestOpen={isRegisterInterestOpen}
                                 setRegisterInterestOpen={setIsRegisterInterestOpen}/>
            )}

            {/* Dark section: virtual tour + location info + map + discover */}
            <div className='bg-[#031428] w-full'>
                <div className='container mx-auto py-20 flex flex-col gap-20'>

                    {/* Virtual tour banner */}
                    <div className='w-full px-5'>
                        <div data-aos="fade-up" data-aos-duration="1000"
                             className='flex justify-center items-center bg-cover bg-center w-full h-[70vh]'
                             style={{backgroundImage: `url(${TakeTourImage.src})`}}>
                            <Link href={virtualTourUrl} target='_blank' rel='noopener noreferrer'
                                  className='bg-white rounded-3xl text-black text-sm font-semibold flex px-4 py-2 gap-2'>
                                TAKE A 3D VIRTUAL TOUR
                                <Image src={NextIconLight} alt='' width={20} height={20}/>
                            </Link>
                        </div>
                    </div>

                    {/* Mobile: location text + CTA */}
                    <div className='flex lg:hidden flex-col gap-8 px-5'>
                        <p className='text-3xl font-semibold text-white'>Visit Your Next Home</p>
                        <p className='text-[#00416B] font-semibold'>2.4KM AWAY FROM BOLE INTL. AIRPORT</p>
                        <p className='-mt-4 text-white'>We understand that your dream home is just one piece of the puzzle. Let&apos;s find the place where you can truly thrive and live your dream life.</p>
                        <a href='tel:+25193 806 0606'
                           className='text-white lg:w-80 flex justify-center gap-4 font-semibold w-full h-[72px] text-[16px] lg:text-sm bg-[#002e6b] hover:bg-[#022c47] transition-all duration-200 items-center'>
                            SCHEDULE A CONSULTATION
                            <Image src={NextIconLight} width={40} height={40} alt='next'/>
                        </a>
                    </div>

                    {/* Map */}
                    <div className='h-[70vh] w-full px-5 lg:px-0'>
                        <div className='relative h-full' style={{paddingBottom: '36.25%'}}>
                            <Map height={500}
                                 defaultCenter={[mapCoords.latitude, mapCoords.longitude]}
                                 defaultZoom={15}>
                                <Marker width={50} anchor={[mapCoords.latitude, mapCoords.longitude]}/>
                            </Map>
                        </div>
                    </div>

                    {/* Discover Properties */}
                    <div data-aos="fade-up" data-aos-duration="1000"
                         className='w-full -mt-32 lg:-mt-20 flex flex-col gap-5 px-5 lg:px-0'>
                        <DiscoverProperties/>
                    </div>
                </div>
            </div>
        </>
    );

    function setIsRegisterInterestOpen(val: boolean) {
        setRegisterInterestOpen(val);
    }
}

export default Villas;
