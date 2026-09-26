'use client'
import {Suspense} from 'react'
import Image from "next/image";
import ApartmentImage from '../../../../public/Apartment.jpg';
import PlaneImage from "../../../../public/Plan.jpg";
import Bathroom1 from "../../../../public/bathroomIcon.svg";
import Bathroom2 from "../../../../public/bathroomIcon2.svg";
import Bathroom3 from "../../../../public/bathroom3Icon.svg";
import Bedrom22Image from '../../../../public/2Bedrom2Image.jpg'
import Bedrom23Image from '../../../../public/2Bedrom3Image.jpg'
import TakeVirtualTourImage from '../../../../public/TakeTourImage.jpg'
import Icon360 from '../../../../public/360Icon.svg';
import SarbetBanner from "../../../../public/SarbetBanner.jpg";
import NextIcon from "../../../../public/NextIcon.svg";
import Bedroom2Image from "../../../../public/2BedromImage.jpg";
import Bedroom3Imge from "../../../../public/3BedroomImage.jpg";
import LuxuriousImage from "../../../../public/LuxuriousImage.jpg";
import React, {useState} from "react";
import {GoDownload} from "react-icons/go";
import Apartment32B from '../../../../public/21ABedroom.jpg'
import phoneCallIcon from "../../../../public/phoneCallIcon.svg";
import Link from "next/link";
import RegisterInterest from "@/sections/RegisterInterest";
import CallIcon from "../../../../public/CallIcon.svg";
import {Canvas} from "@react-three/fiber"
import {OrbitControls, useGLTF} from "@react-three/drei";
import LocationIcon from '../../../../public/LocationIcon.svg'
// @ts-ignore
import {Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import PrimeLocationIcon from '../../../../public/PrimeLocationIcon.svg'
import LivingIcon from '../../../../public/LivingIcon.svg'
import FamilyIcon from '../../../../public/FamilyIcon.svg'
import SecurityIcon from '../../../../public/SecurityIcon.svg'
import NextIconLight from '../../../../public/NextIconLight.svg'
import TownhouseBanner from "../../../../public/TownHousesBanner.jpg";
import { useSearchParams } from 'next/navigation';
import {Map, Marker} from "pigeon-maps";
import {useQuery, gql} from "@apollo/client";
import SplashPage from "@/sections/SplashPage";

function Model(props: any) {
    const {scene} = useGLTF("/originalmat2.glb");
    return <primitive object={scene}/>;
}

const coords = [
    {
        name: 'Kazanchis',
        longitude: 9.012788,
        latitude: 38.775208
    },
    {
        name: 'Bulbula',
        longitude: 8.9451929,
        latitude: 38.7851493
    },
    {
        name: 'Sarbet',
        longitude: 8.984135960290898,
        latitude: 38.72723843279496
    }
]

const QUERY = gql`
    query getTwoBedrooms($site: Site!) {
      twoBedrooms(where: {site: $site}) {
        description1
        description2
        propertyLocationLevel
        totalCirculationAreaInSqm
        totalFloorAreaInSqm
        bedroomPerPropertyUnits
      }
    }
`

const Apartment21ABedroom = () => {
    const [isRegisterInterestOpen, setRegisterInterestOpen] = useState(false);
    const location = useSearchParams().get('location') || 'Bulbula';
    const locationCoords = coords.find(coord => coord.name === location);

    const {loading, error, data} = useQuery(QUERY, {
        variables: {site: location}
    });

    if (error) {
        console.log("errrrrrrrrrrrrrrr", error)
        return <div>Error...</div>
    }

    if (loading) {
        return <SplashPage/>
    }

    console.log(data.twoBedrooms[0])

    return (
        <>
            <div style={{backgroundImage: `url(${ApartmentImage.src})`}}
                 className=' h-[70vh] lg:h-[90vh] bg-cover bg-center w-full'>

            </div>
            <div className='lg:hidden flex w-full lg:w-[33%] text-sm font-medium'>
                <div className='flex gap-2 bg-[#ebc166] items-center py-6 lg:py-0 px-2 w-full lg:w-[80%] uppercase'>
                    <Image alt='' src={LocationIcon}/>
                    METRO {location}, AA, ETHIOPIA
                </div>
            </div>
            <div
                className='container mx-auto pt-20 bg-white flex-col flex gap-16 lg:gap-28 items-end pb-[72px] '>
                {/*<div className='w-full h-[60vh] flex justify-center items-center'>*/}
                {/*    <Canvas camera={{position: [10, 100, 100], fov: 50}}>*/}
                {/*        <ambientLight intensity={2}/>*/}
                {/*        <Suspense fallback={null}>*/}
                {/*            <Model/>*/}
                {/*        </Suspense>*/}
                {/*        <OrbitControls/>*/}
                {/*    </Canvas>*/}
                {/*    <Image src={Apartment32B} alt='villas' width={1000} height={600}/>*/}
                {/*</div>*/}
                <div data-aos="fade-up" data-aos-duration="1000"
                     className='container mx-auto lg:pt-14 flex flex-col items-end gap-20 px-5'>
                    <div className='w-full flex flex-col lg:flex-row gap-14 lg:gap-0'>
                        <div className='hidden lg:flex w-full lg:w-[33%] text-sm font-medium'>
                            <div className='flex gap-2 bg-[#ebc166] items-center py-6 lg:py-0 px-2 w-full lg:w-[80%] uppercase'>
                                <Image alt='' src={LocationIcon}/>
                                METRO {location}, AA, ETHIOPIA
                            </div>
                        </div>
                        <div
                            data-aos="fade-up" data-aos-duration="1000"
                            className='flex flex-col gap-10 w-full lg:w-[66.5%]'>
                            <p className='text-4xl lg:text-6xl font-semibold leading-snug'>2 Bedroom
                                Apartments</p>
                        </div>
                    </div>
                    <div data-aos="fade-up" data-aos-duration="1000" className='flex justify-between gap-4 items-start'>
                        <div className='hidden lg:flex w-full lg:w-[33%] text-[#00416B] text-sm font-semibold mt-3'>
                            <p>ABOUT PROPERTY</p>
                        </div>
                        <div
                            className='flex flex-col gap-8 lg:gap-10 w-full lg:w-[66.5%]'>
                            <div className='lg:hidden w-full lg:w-[35%]'>
                                <p className='text-[#00416B] text-sm font-semibold'>ABOUT PROPERTY</p>
                            </div>
                            <div className='flex flex-col lg:flex-row justify-start gap-5'>
                                <p className='w-full lg:w-1/2 text-lg  font-normal '>{data.twoBedrooms[0]?.description1}</p>
                                <p className='flex w-full lg:w-1/2 text-lg font-normal '>{data.twoBedrooms[0]?.description2}</p>
                            </div>
                            {/*<a href="tel:+251922599161"*/}
                            {/*   className='flex lg:hidden justify-center gap-4 font-semibold w-full h-[72px] text-[16px] lg:text-sm bg-primary  hover:bg-[#022c47] transition-all duration-200 items-center'>*/}
                            {/*    CALL METRO SALES*/}
                            {/*    <Image src={CallIcon} width={40} height={40} alt='next'/>*/}

                            {/*</a>*/}
                            <Link
                                href='/download-brochure'
                                className='flex gap-4 font-semibold w-80 items-center'>DOWNLOAD SALES KIT
                                <GoDownload color='#FFCF01'/>
                            </Link>
                        </div>
                    </div>
                    <Image data-aos="fade-up" data-aos-duration="1000" src={PlaneImage} alt=''
                           className='w-full lg:mt-10 lg:w-[66.5%]'/>
                    <div data-aos="fade-up" data-aos-duration="1000"
                         className='w-full md:w-[66.5%] flex gap-y-10 justify-between flex-wrap'>

                        <div className='w-[48%] flex flex-col gap-4 lg:border-t-2 border-t-[#dbe5f1] pt-5'>
                            <p className='text-2xl lg:text-4xl text-[#00416B] font-semibold'>{data.twoBedrooms[0]?.totalFloorAreaInSqm} SQM</p>
                            <p className='text-[#738195] text-sm lg:text-md font-medium'>TOTAL FLOOR AREA</p>
                        </div>

                        <div className='w-[48%] flex flex-col gap-4 lg:border-t-2 border-t-[#dbe5f1] pt-5'>
                            <p className='text-2xl lg:text-4xl text-[#00416B] font-semibold'>{data.twoBedrooms[0]?.totalCirculationAreaInSqm} SQM</p>
                            <p className='text-[#738195] text-sm lg:text-md font-medium'>TOTAL CIRCULATION AREA</p>
                        </div>

                        <div className='w-[48%] flex flex-col gap-4 border-t-2 border-t-[#dbe5f1] pt-5'>
                            <p className='text-2xl lg:text-4xl text-[#00416B] font-semibold'>{data.twoBedrooms[0]?.bedroomPerPropertyUnits} Bedrooms</p>
                            <p className='text-[#738195] text-sm lg:text-md font-medium'>PER PROPERTY UNITS</p>
                        </div>
                        <div className='w-[48%] flex flex-col gap-4 border-t-2 border-t-[#dbe5f1] pt-5'>
                            <p className='text-2xl lg:text-4xl text-[#00416B] font-semibold'>{data.twoBedrooms[0]?.propertyLocationLevel}</p>
                            <p className='text-[#738195] text-sm lg:text-md font-medium'>PROPERTY LOCATION LEVEL</p>
                        </div>
                    </div>
                </div>


                <div data-aos="fade-up" data-aos-duration="1000"
                     className='container mx-auto flex flex-col items-end gap-20 px-5 lg:px-0'>
                    <div className='w-full flex justify-end gap-4 items-center'>

                        <div
                            className='flex flex-col gap-10 w-full lg:w-[66.5%]'>
                            <div className='hidden lg:flex flex-col lg:flex-row justify-between gap-5'>
                                <Image src={Bedrom22Image} alt='' className='w-full md:w-[49%]'/>
                                <Image src={Bedrom23Image} alt='' className='w-full md:w-[49%]'/>

                            </div>
                            <div className='lg:hidden flex flex-col lg:flex-row justify-between gap-5'>
                                <Splide options={{
                                    type: 'loop',
                                    perPage: 1,
                                    perMove: 1,
                                    gap: '1rem',
                                    pagination: false,
                                    arrows: true,
                                    autoplay: true,
                                    interval: 3000,
                                    pauseOnHover: true,
                                    resetProgress: false,
                                    lazyLoad: 'sequential',
                                }}>
                                    <SplideSlide>
                                        <Image src={Bedrom22Image} alt='' className='w-full md:w-[49%] h-full'/>
                                    </SplideSlide>
                                    <SplideSlide>
                                        <Image src={Bedrom23Image} alt='' className='w-full md:w-[49%] h-full'/>
                                    </SplideSlide>
                                </Splide>

                            </div>
                        </div>
                    </div>
                </div>


                <div data-aos="fade-up" data-aos-duration="1000"
                     className='container mx-auto flex flex-col items-end gap-20 px-5 lg:px-0'>
                    <div className='w-full flex flex-col lg:flex-row justify-between items-start'>
                        <div className='flex w-full lg:w-[33%] text-[#00416B] text-xl lg:text-sm font-semibold'>
                            <p>AMENITIES AND FEATURES</p>
                        </div>
                        <div
                            className='flex flex-col gap-10 w-full lg:w-[66.5%] mt-14 lg:mt-0'>
                            <div className='flex justify-between gap-4 flex-wrap'>
                                <div className='flex flex-col gap-12 w-[45%] lg:w-[23%]'>
                                    <Image src={PrimeLocationIcon} alt='' className='flex'/>
                                    <p className='text-md text-[#001624] font-semibold'>PRIME LOCATIONS</p>
                                    <p className='text-[#738195] font-normal -mt-6'>Strategically located within
                                        reasonable
                                        proximity to Bole Intl. Airport and Meskel Square.</p>
                                </div>
                                <div className='flex flex-col gap-12 w-[45%] lg:w-[23%]'>
                                    <Image src={LivingIcon} alt='' className='flex'/>
                                    <p className='text-md text-[#001624] font-semibold'>SPECTACULAR LIVING</p>
                                    <p className='text-[#738195] font-normal -mt-6'>Bright and spacious apartments
                                        designed with
                                        great attention to design & details.</p>
                                </div>
                                <div className='flex flex-col gap-12 w-[45%] lg:w-[23%] mt-14 lg:mt-0'>
                                    <Image src={FamilyIcon} alt='' className='flex'/>
                                    <p className='text-md text-[#001624] font-semibold'>LIFE & WELLNESS</p>
                                    <p className='text-[#738195] font-normal -mt-6'>All amenities your may need and more
                                        to enjoy
                                        your living with easy accessibility.</p>
                                </div>
                                <div className='flex flex-col gap-12 w-[45%] lg:w-[23%] mt-14 lg:mt-0'>
                                    <Image src={SecurityIcon} alt='' className='flex'/>
                                    <p className='text-md text-[#001624] font-semibold'>24/7 SECURITY</p>
                                    <p className='text-[#738195] font-normal -mt-6'>The site is fully equipped with CCTV
                                        surveillance systems for better security.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div data-aos="fade-up" data-aos-duration="1000"
                     className='w-full md:w-[66.5%] flex flex-col lg:flex-row justify-start gap-5 lg:gap-16 px-5 lg:px-0'>
                    <a href="tel:+25193 806 0606"
                       className='flex lg:hidden justify-center gap-4 font-semibold w-full h-[72px] text-[16px] lg:text-sm bg-primary  hover:bg-[#022c47] transition-all duration-200 items-center'>
                        CALL METRO SALES
                        <Image src={CallIcon} width={40} height={40} alt='next'/>

                    </a>
                    <div className='w-1/2'>
                        <button
                            onClick={() => setRegisterInterestOpen(true)}
                            className='lg:w-80 hidden lg:flex justify-center gap-4 font-semibold w-full h-[72px] text-[16px] lg:text-sm bg-primary  hover:bg-primaryHover transition-all duration-200 items-center'>
                            REGISTER MY INTEREST
                            <Image src={NextIcon} width={40} height={40} alt='next'/>

                        </button>
                    </div>
                    <div className='w-1/2'>
                        <Link
                            href='/download-brochure'
                            className='hidden lg:flex justify-start gap-4 font-semibold w-full lg:w-80 h-14 text-sm items-center'>DOWNLOAD
                            BROUCHER (2.8mB)
                            <GoDownload color='#FFCF01'/>
                        </Link>
                    </div>
                </div>


                {
                    isRegisterInterestOpen ? <RegisterInterest isRegisterInterestOpen={isRegisterInterestOpen}
                                                               setRegisterInterestOpen={setRegisterInterestOpen}/> : null

                }
            </div>

            <div className='bg-[#031428] w-full'>
                <div className='container mx-auto py-20 flex flex-col gap-14 lg:gap-20'>
                    <div className='w-full px-5'>
                        <div data-aos="fade-up" data-aos-duration="1000"
                             className='-mt-10 flex justify-center items-center bg-cover bg-center w-full h-[50vh] lg:h-[70vh]'
                             style={{backgroundImage: `url(${TakeVirtualTourImage.src})`}}>
                            <Link href='https://virtual-tour.metrorealestateet.com/'
                                className='bg-white rounded-3xl text-black text-sm font-semibold flex px-4 py-2 gap-2'>
                                TAKE A 3D VIRTUAL TOUR
                                <Image src={Icon360} alt=''/>
                            </Link>
                        </div>
                    </div>

                    <div className='flex lg:hidden flex-col gap-8 px-5'>
                        <p className='text-3xl font-semibold text-white'>
                            Visit Your Next Home
                        </p>
                        <p className='text-[#00416B] font-semibold'>
                            2.4KM AWAY FROM BOLE INTL. AIRPORT
                        </p>
                        <p className='-mt-4 text-white'>
                            We understand that your dream home is just one piece of the puzzle. Let&apos;s find the
                            place
                            where you can truly thrive and live your dream life.
                        </p>
                        <a href="tel:+25193 806 0606"
                           className='text-white lg:w-80 flex justify-center gap-4 font-semibold w-full h-[72px] text-[16px] lg:text-sm bg-[#002e6b] hover:bg-[#022c47] transition-all duration-200 items-center'>
                            SCHEDULE A CONSULTATION
                            <Image src={NextIconLight} width={40} height={40} alt='next'/>

                        </a>
                    </div>

                    {/*<div className='h-[60vh] w-full px-5 lg:px-0'>*/}
                    {/*    <div className="relative h-full " style={{paddingBottom: '36.25%'}}>*/}
                    {/*        <iframe*/}
                    {/*            className="absolute border-[1px] border-red-500  top-0 left-0 w-full h-full"*/}
                    {/*            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.8330574332176!2d38.7770612!3d8.9875048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b845784b5635f%3A0x449bba45eca8f3ee!2sRwanda%20St%2C%20Addis%20Ababa!5e0!3m2!1sen!2set!4v1713559191994!5m2!1sen!2set"*/}
                    {/*            style={{border: 0, filter: "grayscale(100%)"}}*/}
                    {/*            allowFullScreen*/}
                    {/*            loading="lazy"*/}
                    {/*            autoFocus={true}*/}
                    {/*            referrerPolicy="no-referrer-when-downgrade"*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div className='h-[70vh] w-full px-5 lg:px-0'>
                        <div className="relative h-full " style={{paddingBottom: '36.25%'}}>

                            <Map height={500}

                                 defaultCenter={[locationCoords?.longitude, locationCoords?.latitude]}
                                 defaultZoom={15}>
                                <Marker
                                    width={50}
                                    anchor={[locationCoords?.longitude, locationCoords?.latitude]}
                                />
                                {/*<Marker width={50} anchor={[50.879, 4.6997]} />*/}
                            </Map>
                        </div>
                    </div>


                    <div data-aos="fade-up" data-aos-duration="1000"
                         className='w-full -mt-20 flex flex-col gap-5 px-5 lg:px-0'>


                        <div className='w-full flex justify-between items-center '>
                            <p className='text-3xl text-white font-medium'>
                                Discover Metro Properties
                            </p>
                            <button onClick={() => setRegisterInterestOpen(true)}
                                    className='hidden lg:flex text-md justify-center gap-4 font-medium w-full lg:w-80 h-14 bg-[#00416B] text-white hover:bg-primaryHover transition-all duration-200 items-center'>Discover
                                your
                                next home
                                <Image src={NextIconLight} width={20} height={20} alt='next'/>
                            </button>
                        </div>

                        <div className='border-[1px] border-[#374151] w-full '>

                        </div>

                        <div className='w-full hidden lg:flex flex-wrap justify-between gap-y-10 text-white'>
                            <Link href='/life-style/villas' className='w-full lg:w-[33%] flex flex-col gap-4'>
                                <Image src={Bedroom2Image} alt='' className='w-full'/>
                                <div className='flex flex-col gap-2'>
                                    <p className='text-lg font-semibold'>Villas</p>
                                    <p className='text-[#00416b] text-sm font-semibold'>KAZANCHIS PROJECT SITE</p>
                                </div>
                            </Link>
                            <Link href='/life-style/3-2A-bedroom-apartment'
                                  className='w-full lg:w-[33%] flex flex-col gap-4'>
                                <Image src={Bedroom3Imge} alt='' className='w-full'/>
                                <div className='flex flex-col gap-2'>
                                    <p className='text-lg font-semibold'>3 Bedroom Apartment</p>
                                    <p className='text-[#00416b] text-sm font-semibold'>SARBET PROJECT SITE</p>
                                </div>
                            </Link>
                            <Link href='/life-style/townhouses' className='w-full lg:w-[33%] flex flex-col gap-4'>
                                <Image src={LuxuriousImage} alt='' className='w-full'/>
                                <div className='flex flex-col gap-2'>
                                    <p className='text-lg font-semibold'>Luxurious Penthouses</p>
                                    <p className='text-[#00416b] text-sm font-semibold'>KAZANCHIS PROJECT SITE</p>
                                </div>
                            </Link>
                        </div>

                        <div className='lg:hidden block'>
                            <Splide options={{
                                perPage: 1,
                                arrows: true,
                                autoplay: true,
                                interval: 3000,
                                type: 'loop',
                                pagination: false
                            }}>

                                <SplideSlide>
                                    <Link href='/life-style/villas' className='w-full lg:w-[33%] flex flex-col gap-4'>
                                        <Image src={Bedroom2Image} alt='' className='w-full'/>
                                        <div className='flex flex-col gap-2'>
                                            <p className='text-lg font-semibold text-white'>Villas</p>
                                            <p className='text-[#00416b] text-sm font-semibold'>KAZANCHIS PROJECT
                                                SITE</p>
                                        </div>
                                    </Link>
                                </SplideSlide>
                                <SplideSlide>
                                    <Link href='/life-style/3-2A-bedroom-apartment'
                                          className='w-full lg:w-[33%] flex flex-col gap-4'>
                                        <Image src={Bedroom3Imge} alt='' className='w-full'/>
                                        <div className='flex flex-col gap-2'>
                                            <p className='text-lg font-semibold text-white'>3 Bedroom Apartment</p>
                                            <p className='text-[#00416b] text-sm font-semibold'>SARBET PROJECT SITE</p>
                                        </div>
                                    </Link>
                                </SplideSlide>
                                <SplideSlide>
                                    <Link href='/life-style/townhouses'
                                          className='w-full lg:w-[33%] flex flex-col gap-4'>
                                        <Image src={LuxuriousImage} alt='' className='w-full'/>
                                        <div className='flex flex-col gap-2'>
                                            <p className='text-lg font-semibold text-white'>Luxurious Penthouses</p>
                                            <p className='text-[#00416b] text-sm font-semibold'>KAZANCHIS PROJECT
                                                SITE</p>
                                        </div>
                                    </Link>
                                </SplideSlide>
                            </Splide>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Apartment21ABedroom
