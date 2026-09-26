'use client'

import BulbulaBanner from "../../../../public/BUlbulaBanner.jpg";
import {GoDownload} from "react-icons/go";
import Bulbula2Image from '../../../../public/Bulbula2Image.jpg';
import Bulbula4Image from '../../../../public/Bulbula5.jpg';
import Image from "next/image";
import BulbulaTower1 from '../../../../public/Bulbula3.jpg'
import BulbulaTower2 from '../../../../public/Bulbula4.jpg'
import Bathroom1 from '../../../../public/bathroomIcon.svg'
import Bathroom2 from '../../../../public/bathroomIcon2.svg'
import Bathroom3 from '../../../../public/bathroom3Icon.svg'
import NextIcon from "../../../../public/NextIcon.svg";
import CallIcon from "../../../../public/CallIcon.svg";
import Bedroom2Image from "../../../../public/2BedromImage.jpg";
import Bedroom3Imge from "../../../../public/3BedroomImage.jpg";
import LuxuriousImage from "../../../../public/LuxuriousImage.jpg";
import {useQuery, gql} from "@apollo/client";
import React, {useState} from "react";
import Link from "next/link";
import RegisterInterest from "@/sections/RegisterInterest";
import {Map, ZoomControl, Marker} from "pigeon-maps";
// @ts-ignore
import {Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import PrimeLocationIcon from "../../../../public/PrimeLocationIcon.svg";
import LivingIcon from "../../../../public/LivingIcon.svg";
import FamilyIcon from "../../../../public/FamilyIcon.svg";
import SecurityIcon from "../../../../public/SecurityIcon.svg";
import CallIconLight from '../../../../public/CallIconLight.svg'
import NextIconLight from "../../../../public/NextIconLight.svg";

const QUERY = gql`
    query GetProject($slug: String!) {
        project(where: {slug: $slug}) {
            id,
            projectName,
            decription2,
            description1,
            completionDate,
            totalProjectArea,
            totalPropertyUnits,
            carParkingCapacity,
            address,
            distanceFromFriendshipPark,
            distanceFromBoleIntlAirport,
            distanceFromFriendshipParkDesc,
            distanceFromBoleIntlAirportDesc,
            mapLocation{
                 latitude
                 longitude
            },
            image1 {
                url
            },
            secondBanner {
                url
            },
            image2 {
                url
            },
            image3 {
                url
            },
            image5 {
                url
            },
            bannePicture{
                url
            }
        }
    }
`;


const ProjectDetail = ({params}: { params: { slug: string } }) => {
    const [isRegisterInterestOpen, setRegisterInterestOpen] = useState(false);

    const {slug} = params;

    const {loading, error, data} = useQuery(QUERY, {
        variables: {slug},
    });

    if (error) {
        console.log(error)
        return <div>Error...</div>
    }

    console.log(data)

    return (
        <>
            <div className='pb-[72px] lg:pb-0'>
                <div className="w-full h-[50vh] lg:h-[90vh] bg-cover bg-center"
                     style={{backgroundImage: `url(${data?.project?.bannePicture.url})`}}>
                </div>
                <div
                    className='container mx-auto mt-5 lg:mt-0 lg:py-16 flex flex-col gap-20 lg:gap-28 px-5 lg:px-0 items-end'>

                    <div
                        data-aos="fade-up" data-aos-duration="1000"
                        className='flex flex-col gap-20 w-full lg:w-[66.5%]'>
                        <p className='text-5xl lg:text-7xl font-medium leading-snug'>Metro™ {data?.project?.projectName} </p>
                    </div>
                    <div data-aos="fade-up" data-aos-duration="1000"
                         className='flex flex-col lg:flex-row justify-between items-start'>
                        <div
                            className='hidden lg:flex w-full lg:w-[33%] text-[#00416B] text-md font-semibold'>
                            <p>ABOUT PROPERTY</p>
                        </div>
                        <div
                            className='flex flex-col gap-10 w-full lg:w-[66.5%]'>
                            {/*<p className='text-4xl lg:text-5xl font-medium leading-snug'>Metro™ {data?.project?.projectName} </p>*/}
                            <div
                                className='lg:hidden -my-8 flex w-full lg:w-[35%] text-[#00416B] text-md font-semibold'>
                                <p>ABOUT PROPERTY</p>
                            </div>
                            <div className='flex flex-col lg:flex-row justify-start gap-5'>
                                <div className='w-full lg:w-1/2 flex flex-col gap-5'>
                                    <p className='text-md  font-normal text-[#002740]'>{data?.project?.description1}</p>
                                </div>
                                <div className=' w-full lg:w-1/2 lg:flex flex-col gap-5'>
                                    <p className='text-md  font-normal text-[#002740]'>{data?.project?.decription2}</p>
                                </div>
                            </div>
                            <Link
                                href='/download-brochure'
                                className='flex gap-4 font-semibold w-80 h-[4rem] items-center uppercase'>GET {data?.project?.projectName} BROCHURE
                                <GoDownload color='#FFCF01'/>
                            </Link>
                        </div>
                    </div>
                    {/*<div className="w-full h-[60vh] bg-cover bg-center"*/}
                    {/*     style={{backgroundImage: `url(${data?.project?.secondBanner?.url})`}}>*/}
                    {/*</div>*/}
                    {/*<Image data-aos="fade-up" data-aos-duration="1000" src={data?.project?.secondBanner?.url}*/}
                    {/*       alt='Bulbula 2'*/}
                    {/*       className='w-full hidden lg:flex'/>*/}

                    <div data-aos="fade-up" data-aos-duration="1000"
                         className='w-full md:w-[66.5%] flex flex-col gap-28'>
                        <div data-aos="fade-up" data-aos-duration="1000"
                             className='w-full flex gap-y-10 justify-between flex-wrap'>

                            <div className='w-[48%] flex flex-col gap-4 lg:border-t-2 border-t-[#dbe5f1] pt-5'>
                                <p className='text-3xl lg:text-4xl text-[#00416B] font-semibold'>{data?.project?.completionDate}</p>
                                <p className='text-[#738195] text-sm lg:text-md font-medium'>COMPLETION DARE</p>
                            </div>

                            <div className='w-[48%] flex flex-col gap-4 lg:border-t-2 border-t-[#dbe5f1] pt-5'>
                                <p className='text-3xl lg:text-4xl text-[#00416B] font-semibold'>{data?.project?.totalProjectArea} SQM</p>
                                <p className='text-[#738195] text-sm lg:text-md font-medium'>TOTAL PROJECT AREA</p>
                            </div>

                            <div className='w-[48%] flex flex-col gap-4 border-t-2 border-t-[#dbe5f1] pt-5'>
                                <p className='text-3xl lg:text-4xl text-[#00416B] font-semibold'>{data?.project?.totalPropertyUnits} UNITS</p>
                                <p className='text-[#738195] text-sm lg:text-md font-medium'>TOTAl PROPERTY UNITS</p>
                            </div>
                            <div className='w-[48%] flex flex-col gap-4 border-t-2 border-t-[#dbe5f1] pt-5'>
                                <p className='text-3xl lg:text-4xl text-[#00416B] font-semibold'>{data?.project?.carParkingCapacity}</p>
                                <p className='text-[#738195] text-sm lg:text-md font-medium'>CAR PARKING CAPACITY</p>
                            </div>
                        </div>
                        <div data-aos="fade-up" data-aos-duration="1000"
                             className='hidden lg:flex justify-between flex-col lg:flex-row gap-5'>
                            <div className="w-full h-[50vh] lg:w-[49%] bg-cover bg-center"
                                 style={{backgroundImage: `url(${data?.project?.image2.url})`}}>
                            </div>
                            <div className="w-full h-[50vh] lg:w-[49%] bg-cover bg-center"
                                 style={{backgroundImage: `url(${data?.project?.image3.url})`}}>
                            </div>
                            {/*<Image src={data?.project?.image2?.url} layout='fill' objectFit='contain' alt='bublbula 1' className='w-full lg:w-[49%]'/>*/}
                            {/*<Image src={data?.project?.image3?.url} alt='bulbula 2' className='w-full lg:w-[49%]'/>*/}

                        </div>

                        <div data-aos="fade-up" data-aos-duration="1000"
                             className='lg:hidden flex justify-between flex-col lg:flex-row gap-5'>
                            <Splide options={{
                                perPage: 1,
                                arrows: true,
                                autoplay: true,
                                interval: 3000,
                                type: 'loop',
                                pagination: false
                            }}>
                                <SplideSlide>
                                    <div className="w-full h-[50vh] lg:w-[49%] bg-cover bg-center"
                                         style={{backgroundImage: `url(${data?.project?.image2.url})`}}>
                                    </div>
                                </SplideSlide>
                                <SplideSlide>
                                    <div className="w-full h-[50vh] lg:w-[49%] bg-cover bg-center"
                                         style={{backgroundImage: `url(${data?.project?.image3.url})`}}>
                                    </div>
                                </SplideSlide>
                            </Splide>
                            {/*<Image src={data?.project?.image2?.url} layout='fill' objectFit='contain' alt='bublbula 1' className='w-full lg:w-[49%]'/>*/}
                            {/*<Image src={data?.project?.image3?.url} alt='bulbula 2' className='w-full lg:w-[49%]'/>*/}

                        </div>
                    </div>

                    {/*<div data-aos="fade-up" data-aos-duration="1000"*/}
                    {/*     className='flex flex-col items-end gap-20 px-5 lg:px-0'>*/}
                    <div className='w-full flex flex-col lg:flex-row justify-between items-start'>
                        <div className='flex w-full lg:w-[33%] text-[#00416B] text-xl lg:text-sm font-semibold'>
                            <p>AMENITIES AND FEATURES</p>
                        </div>
                        <div
                            className='flex flex-col gap-20 w-full lg:w-[66.5%]'>
                            <p className='hidden lg:text-3xl lg:text-4xl font-semibold leading-snug'>
                                Metro™ {data?.project?.projectName} Apartments uses only the latest available  amenities for a comfortable life
                            </p>
                            <div className='flex justify-between flex-wrap'>
                                <div className='flex flex-col gap-12 w-[49%] lg:w-[23%]'>
                                    <Image src={PrimeLocationIcon} alt='' className='flex'/>
                                    <p className='text-md text-[#001624] font-semibold'>PRIME LOCATIONS</p>
                                    <p className='text-[#738195] font-normal -mt-6'>Strategically located within
                                        reasonable
                                        proximity to Bole Intl. Airport and Meskel Square.</p>
                                </div>
                                <div className='flex flex-col gap-12 w-[49%] lg:w-[23%]'>
                                    <Image src={LivingIcon} alt='' className='flex'/>
                                    <p className='text-md text-[#001624] font-semibold'>SPECTACULAR LIVING</p>
                                    <p className='text-[#738195] font-normal -mt-6'>Bright and spacious apartments
                                        designed with
                                        great attention to design & details.</p>
                                </div>
                                <div className='flex flex-col gap-12 w-[49%] lg:w-[23%] mt-14 lg:mt-0'>
                                    <Image src={FamilyIcon} alt='' className='flex'/>
                                    <p className='text-md text-[#001624] font-semibold'>LIFE & WELLNESS</p>
                                    <p className='text-[#738195] font-normal -mt-6'>All amenities your may need and more
                                        to enjoy
                                        your living with easy accessibility.</p>
                                </div>
                                <div className='flex flex-col gap-12 w-[49%] lg:w-[23%] mt-14 lg:mt-0'>
                                    <Image src={SecurityIcon} alt='' className='flex'/>
                                    <p className='text-md text-[#001624] font-semibold'>24/7 SECURITY</p>
                                    <p className='text-[#738195] font-normal -mt-6'>The site is fully equipped with CCTV
                                        surveillance systems for better security.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*</div>*/}

                    {/*<div data-aos="fade-up" data-aos-duration="1000"*/}
                    {/*     className='w-full md:w-[66.5%] flex flex-col justify-start items-center gap-5 lg:gap-16'>*/}
                    {/*    <div className='w-full flex flex-col lg:flex-row justify-start items-center gap-5 '>*/}

                    {/*        /!*<div className='w-1/2'>*!/*/}
                    {/*        <button*/}
                    {/*            onClick={() => setRegisterInterestOpen(true)}*/}
                    {/*            className='hidden lg:flex text-[20px] justify-center gap-4 font-semibold w-full lg:w-80 h-[72px] bg-primary hover:bg-primaryHover transition-all duration-200 items-center'>REGISTER*/}
                    {/*            INTEREST*/}
                    {/*            <Image src={NextIcon} width={24} height={24} alt='next'/>*/}
                    {/*        </button>*/}
                    {/*        <a href="tel:+251922599161"*/}
                    {/*           onClick={() => setRegisterInterestOpen(true)}*/}
                    {/*           className='flex lg:hidden justify-center gap-4 font-semibold w-full h-[72px] text-[16px] lg:text-sm bg-primary  hover:bg-[#022c47] transition-all duration-200 items-center'>*/}
                    {/*            CALL METRO SALES*/}
                    {/*            <Image src={CallIcon} width={40} height={40} alt='next'/>*/}

                    {/*        </a>*/}
                    {/*        /!*</div>*!/*/}
                    {/*        /!*<div className='w-1/2'>*!/*/}
                    {/*        <Link*/}
                    {/*            href='/download-brochure'*/}
                    {/*            className='flex justify-center gap-4 font-semibold w-full lg:w-80 h-14 text-sm items-center'>DOWNLOAD*/}
                    {/*            BROUCHER (2.8mB)*/}
                    {/*            <GoDownload color='#FFCF01' size={20}/>*/}
                    {/*        </Link>*/}

                    {/*    </div>*/}
                    {/*    /!*</div>*!/*/}
                    <div className="w-full h-[60vh] lg:h-[70vh] bg-cover bg-center"
                         style={{backgroundImage: `url(${data?.project?.image5.url})`}}>
                    </div>
                    {/*    /!*<Image src={Bulbula4Image} alt='bulbula 2' className='w-full hidden lg:flex'/>*!/*/}
                    {/*</div>*/}
                    {/*<Image src={BulbulaTower2} alt='bulbula 2' className='w-full lg:hidden flex'/>*/}

                    {
                        isRegisterInterestOpen ? <RegisterInterest isRegisterInterestOpen={isRegisterInterestOpen}
                                                                   setRegisterInterestOpen={setRegisterInterestOpen}/> : null

                    }
                </div>
            </div>
            <div className='bg-[#031428] w-full'>
                <div className='container mx-auto py-20 flex flex-col items-end gap-14 px-5 lg:px-0'>
                    <div data-aos="fade-up" data-aos-duration="1000"
                         className='flex flex-col lg:flex-row justify-between gap-10'>
                        <div className='hidden lg:block w-full lg:w-[33%] text-white text-md font-semibold'>
                            <p>PROPERTY LOCATION</p>
                        </div>
                        <div
                            className='flex flex-col gap-20 w-full lg:w-[66.5%]'>
                            <div className='flex flex-col gap-5'>
                                <p className='text-5xl lg:text-6xl font-semibold leading-snug text-white'>Metro™ {data?.project?.projectName} Area, </p>
                                <div className='w-full text-white text-md font-medium'>
                                    <p>{data?.project?.address}</p>
                                </div>
                            </div>
                            <div className='flex flex-col lg:flex-row justify-start gap-10'>
                                <div className='w-full lg:w-1/2 flex flex-col gap-6'>
                                    <p className='text-white font-semibold text-md'>{data?.project?.distanceFromBoleIntlAirport} AWAY
                                        FROM BOLE INTL.
                                        AIRPORT</p>
                                    <p className='text-md  font-normal text-white'>{data?.project?.distanceFromBoleIntlAirportDesc}</p>
                                </div>
                                <div className='w-full lg:w-1/2 flex flex-col gap-5'>
                                    <p className='text-white font-semibold text-md'>{data?.project?.distanceFromFriendshipPark} FROM
                                        FRIENDSHIP PARK</p>
                                    <p className='text-md  font-normal text-white'>{data?.project?.distanceFromBoleIntlAirportDesc}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-[66%] hidden lg:flex flex-col lg:flex-row justify-start items-center gap-5 '>

                        {/*<div className='w-1/2'>*/}
                        <button
                            onClick={() => setRegisterInterestOpen(true)}
                            className='flex text-md text-white justify-center gap-4 font-medium w-full lg:w-80 h-[4rem] bg-[#041428] border-2 border-[#ffbf00] hover:bg-[#ffbf00] hover:text-[#041428] transition-all duration-200 items-center'>
                           REGISTER INTEREST
                            <Image src={NextIconLight} width={24} height={24} alt='next'/>
                        </button>
                        {/*</div>*/}
                        {/*<div className='w-1/2'>*/}
                        <Link
                            href='/download-brochure'
                            className='flex justify-center text-white gap-4 ml-[18%] font-semibold w-full lg:w-80 h-14 text-sm items-center'>DOWNLOAD
                            BROUCHER (2.8mB)
                            <GoDownload color='#002e6b' size={20}/>
                        </Link>

                    </div>


                    <a href="tel:+25193 806 0606"
                       onClick={() => setRegisterInterestOpen(true)}
                       className='flex lg:hidden text-white justify-center gap-4 font-semibold w-full h-[72px] text-[16px] lg:text-sm bg-[#002e6b] text-white hover:bg-[#022c47] transition-all duration-200 items-center'>
                        CALL METRO SALES
                        <Image src={CallIconLight} width={30} height={30} alt='next'/>

                    </a>

                    <div className='h-[50vh] lg:h-[70vh] w-full'>
                        <div className="relative h-full " style={{paddingBottom: '36.25%'}}>
                            {/*<iframe*/}
                            {/*    className="absolute border-[1px] border-red-500  top-0 left-0 w-full h-full"*/}
                            {/*    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.8330574332176!2d38.7770612!3d8.9875048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b845784b5635f%3A0x449bba45eca8f3ee!2sRwanda%20St%2C%20Addis%20Ababa!5e0!3m2!1sen!2set!4v1713559191994!5m2!1sen!2set"*/}
                            {/*    style={{border: 0, filter: "grayscale(100%)"}}*/}
                            {/*    allowFullScreen*/}
                            {/*    loading="lazy"*/}
                            {/*    autoFocus={true}*/}
                            {/*    referrerPolicy="no-referrer-when-downgrade"*/}
                            {/*/>*/}
                            {/*{data?.project?.MapLocation}*/}
                            {
                                data?.project?.mapLocation &&
                                <Map height={500}

                                     defaultCenter={[data?.project?.mapLocation?.latitude, data?.project?.mapLocation?.longitude]}
                                     defaultZoom={15}>
                                    <Marker
                                        width={50}
                                        anchor={[data?.project?.mapLocation?.latitude, data?.project?.mapLocation?.longitude]}
                                        // color={color}
                                        // onClick={() => setHue(hue + 20)}
                                    />
                                    {/*<Marker width={50} anchor={[50.879, 4.6997]} />*/}
                                </Map>
                            }
                        </div>
                    </div>

                    <div data-aos="fade-up" data-aos-duration="1000"
                         className='w-full mt-10 lg:-mt-20 flex flex-col gap-5 lg:px-0'>


                        <div className='w-full flex justify-between items-center '>
                            <p className='text-3xl text-white font-medium'>
                                Discover Metro Properties
                            </p>
                            <Link href='/property-list'
                                    className='hidden lg:flex text-md justify-center gap-4 font-medium w-full lg:w-80 h-14 bg-[#00416B] text-white hover:bg-main transition-all duration-200 items-center'>Discover
                                your
                                next home
                                <Image src={NextIconLight} width={20} height={20} alt='next'/>
                            </Link>
                        </div>

                        <div className='border-[1px] border-[#374151] w-full '>

                        </div>

                        <div className='w-full hidden lg:flex flex-wrap justify-between gap-y-10'>
                            <Link href='/life-style/2-1A-bedroom-apartment'
                                  className='w-full lg:w-[33%] flex flex-col gap-4'>
                                <Image src={Bedroom2Image} alt='' className='w-full'/>
                                <div className='flex flex-col gap-2'>
                                    <p className='text-[#002740] text-lg font-medium'>2 Bedroom Apartment</p>
                                    <p className='text-[#738195] text-sm font-normal'>KAZANCHIS PROJECT SITE</p>
                                </div>
                            </Link>
                            <Link href='/life-style/3-2A-bedroom-apartment'
                                  className='w-full lg:w-[33%] flex flex-col gap-4'>
                                <Image src={Bedroom3Imge} alt='' className='w-full'/>
                                <div className='flex flex-col gap-2'>
                                    <p className='text-[#002740] text-lg font-medium'>3 Bedroom Apartment</p>
                                    <p className='text-[#738195] text-sm font-normal'>SARBET PROJECT SITE</p>
                                </div>
                            </Link>
                            <Link href='/life-style/townhouses' className='w-full lg:w-[33%] flex flex-col gap-4'>
                                <Image src={LuxuriousImage} alt='' className='w-full'/>
                                <div className='flex flex-col gap-2'>
                                    <p className='text-[#002740] text-lg font-medium'>Luxurious Penthouses</p>
                                    <p className='text-[#738195] text-sm font-normal'>KAZANCHIS PROJECT SITE</p>
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
                                    <Link href='/life-style/2-1A-bedroom-apartment'
                                          className='w-full lg:w-[33%] flex flex-col gap-4'>
                                        <Image src={Bedroom2Image} alt='' className='w-full'/>
                                        <div className='flex flex-col gap-2'>
                                            <p className='text-[#002740] text-lg font-medium'>2 Bedroom Apartment</p>
                                            <p className='text-[#738195] text-sm font-normal'>KAZANCHIS PROJECT SITE</p>
                                        </div>
                                    </Link>
                                </SplideSlide>
                                <SplideSlide>
                                    <Link href='/life-style/3-2A-bedroom-apartment'
                                          className='w-full lg:w-[33%] flex flex-col gap-4'>
                                        <Image src={Bedroom3Imge} alt='' className='w-full'/>
                                        <div className='flex flex-col gap-2'>
                                            <p className='text-[#002740] text-lg font-medium'>3 Bedroom Apartment</p>
                                            <p className='text-[#738195] text-sm font-normal'>SARBET PROJECT SITE</p>
                                        </div>
                                    </Link>
                                </SplideSlide>
                                <SplideSlide>
                                    <Link href='/life-style/townhouses'
                                          className='w-full lg:w-[33%] flex flex-col gap-4'>
                                        <Image src={LuxuriousImage} alt='' className='w-full'/>
                                        <div className='flex flex-col gap-2'>
                                            <p className='text-[#002740] text-lg font-medium'>Luxurious Penthouses</p>
                                            <p className='text-[#738195] text-sm font-normal'>KAZANCHIS PROJECT SITE</p>
                                        </div>
                                    </Link>
                                </SplideSlide>
                            </Splide>
                        </div>


                    </div>
                </div>
            </div>
        </>

    );
}

export default ProjectDetail;
