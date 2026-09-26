'use client'

import Header from "@/sections/Header";
import Image from "next/image";
import BannerImage from '../../../public/AboutBannerImage.jpg';
import AbourImage2 from '../../../public/about2Image.svg';
import About3Image from '../../../public/about3Image.jpg';
import {GoDownload} from "react-icons/go";
import About4Image from '../../../public/about4Image.jpg';
import About5Image from '../../../public/about5Image.jpg';
import NextIcon from "../../../public/NextIcon.svg";
import Footer from "@/sections/Footer";
import PhotoFrame from '../../../public/PhotoFrame.jpg';
import Bedroom2Image from '../../../public/2BedromImage.jpg'
import Bedroom3Imge from '../../../public/3BedroomImage.jpg';
import LuxuriousImage from '../../../public/LuxuriousImage.jpg'
import KazanchisImage from "../../../public/kazanchis.jpg";
import React, {useState} from "react";
import Link from "next/link";
import About2Banner from '../../../public/About2Banner.jpg'
import RegisterInterest from "@/sections/RegisterInterest";
// @ts-ignore
import {Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

const AboutMetro = () => {

    const team = [
        {
            id: 1,
            name: "Adera Habtamu",
            position: "PRICINCIPAL HEAD, FOUNDER/CEO",
        },
        {
            id: 2,
            name: "Mikreselasie G.",
            position: "HEAD OF MARKETING AND SALES"
        },
        {
            id: 3,
            name: "Abubaker Seid",
            position: "VICE HEAD OF ACCOUNTING"
        },
        {
            id: 4,
            name: "Kidist Alemu",
            position: "VICE HEAD OF HUMAN RESOURCE"
        },
        {
            id: 5,
            name: "Sami Ahmed",
            position: "HEAD OF OPERATIONS"
        },
        {
            id: 6,
            name: "Kidus Yoseph",
            position: "VICE HEAD OF OPERATIONS"
        },
        {
            id: 7,
            name: "Ayalew Kebede",
            position: "MANAGER OF EXTERNAL OPS"
        },
        {
            id: 8,
            name: "Misrak Teferra",
            position: "TEAM LEAD OF EXTERNAL OPS"
        },
        {
            id: 4,
            name: "Kidist Alemu",
            position: "VICE HEAD OF HUMAN RESOURCE"
        },
        {
            id: 5,
            name: "Sami Ahmed",
            position: "HEAD OF OPERATIONS"
        },
        {
            id: 6,
            name: "Kidus Yoseph",
            position: "VICE HEAD OF OPERATIONS"
        },
        {
            id: 7,
            name: "Ayalew Kebede",
            position: "MANAGER OF EXTERNAL OPS"
        },
    ]

    // const [isRegisterInterestOpen, setRegisterInterestOpen] = useState(false);

    return (
        <div className='pb-[72px]'>
            <div style={{backgroundImage: `url(${BannerImage.src})`}}
                 className=' h-[70vh] lg:h-[60vh] bg-cover bg-center w-full'>

            </div>

            <div className='container mx-auto py-20 lg:py-28 flex flex-col items-end gap-20 px-5 lg:px-0'>
                <div
                    data-aos="fade-up" data-aos-duration="1000"
                    className='flex flex-col gap-28 w-full lg:w-[66.5%]'>
                    <p className='text-4xl lg:text-6xl font-semibold leading-snug'>Welcome to Metro Real Estate -
                        Your <span className='text-[#00416B]'>
                         Next
                        Dream Home!
                    </span>
                    </p>
                </div>
                <div data-aos="fade-up" data-aos-duration="1000" className='flex justify-between items-start'>
                    <div
                        className='hidden lg:flex w-full lg:w-[33%] text-[#00416B] text-md font-semibold'>
                        <p>METRO REAL ESTATE UNBOXED</p>
                    </div>
                    <div
                        className='flex flex-col gap-10 w-full lg:w-[66.5%]'>
                        <div className='lg:hidden w-full lg:w-[35%]'>
                            <p className='text-[#00416B] text-md font-semibold'>METRO REAL ESTATE UNBOXED</p>
                        </div>
                        <div className='flex flex-col lg:flex-row justify-start gap-5'>
                            <p className='w-full lg:w-1/2 text-lg  font-normal text-[#002740]'>Welcome to Metro Real
                                Estate, where exceptional living and thoughtful design converge. Founded in Addis Ababa
                                in April 2012, we proudly belong to the Kangaroo Industrial Group S.C., bringing over
                                five decades of expertise to Ethiopia&apos;s industrial, commercial, and trading
                                landscape.</p>
                            <p className='flex w-full lg:w-1/2 text-lg font-normal text-[#002740]'>Discover
                                how we can help you find your perfect home or investment opportunity. Whether
                                you&apos;re
                                looking for a cozy apartment or a luxurious villa, we&apos;re here to guide you every
                                step of
                                the way.</p>
                        </div>
                    </div>
                </div>
                {/*<div data-aos="fade-up" data-aos-duration="1000" style={{backgroundImage: `url(${About2Banner.src})`}}*/}
                {/*     className=' h-[60vh] bg-cover bg-center w-full lg:w-[66.5%]'>*/}

                {/*</div>*/}
                {/*<Image src={AbourImage2} alt='' className='lg:mt-10'/>*/}
                <div data-aos="fade-up" data-aos-duration="1000"
                     className='w-full md:w-[66.5%] hidden lg:flex flex-col lg:flex-row gap-y-10 justify-between flex-wrap'>

                    <div className='w-full md:w-[49%] flex flex-col gap-4 '>
                        <p className='text-4xl font-medium'>58+ Years</p>
                        <p className='text-[#00416B] text-md font-semibold'>ACTIVE IN THE ETHIOPIAN BUSINESS</p>
                        <p className='text-[#738195] text-md font-normal mt-6'>Experience the Legacy of Over 58 Years in
                            Ethiopian Business. Explore Our Established History and Commitment to Excellence!</p>
                    </div>

                    <div className='w-full md:w-[49%] flex flex-col gap-4 pt-5'>
                        <p className='text-4xl font-medium'>+1200</p>
                        <p className='text-[#00416B] text-md font-semibold'>NUMBER OF DELIVERED PROPERTIES</p>
                        <p className='text-[#738195] text-md font-normal mt-6'>Over 1200 Properties Delivered. Discover
                            Our Commitment to Quality and Excellence!</p>
                    </div>

                    <div className='w-full md:w-[49%] flex flex-col gap-4 border-t-2 border-t-[#dbe5f1] pt-16'>
                        <p className='text-4xl font-medium'>+5 LOCATIONS</p>
                        <p className='text-[#00416B] text-md font-semibold'>PROJECT DEVELOPMENT LOCATIONS</p>
                        <p className='text-[#738195] text-md font-normal mt-6'>From suburban tranquility in Bulbula to
                            vibrant city living in Kazanchis, and upscale residences near Old Airport, find your perfect
                            home with Metro Real Estate.</p>
                    </div>
                    <div className='w-full md:w-[49%] flex flex-col gap-4 border-t-2 border-t-[#dbe5f1] pt-16'>
                        <p className='text-4xl font-medium'>200K+ SQM</p>
                        <p className='text-[#00416B] text-md font-semibold'>OF DEVELOPED REAL ESTATE LAND</p>
                        <p className='text-[#738195] text-md font-normal mt-6'>Developed Over 200,000 sqm of Prime Real
                            Estate. Explore Our Expansive Land Portfolio!</p>
                    </div>
                </div>

                <div data-aos="fade-up" data-aos-duration="1000"
                     className='container mx-auto flex lg:hidden flex-col justify-between'>

                    <Splide options={{
                        perPage: 1,
                        arrows: false,
                        // gap: '1rem',
                        autoplay: true,
                        interval: 3000,
                        type: 'loop',
                        pagination: false

                    }}>
                        <SplideSlide>

                            <div>

                                <div
                                    className='flex flex-col gap-5 w-full '>
                                    <p className='text-4xl lg:text-5xl font-semibold'>58+ Years</p>
                                    <p className='text-[#002e6b] font-bold text-sm'>ACTIVE IN THE ETHIOPIAN
                                        BUSINESS</p>
                                    <p className='text-[#738195] text-md font-normal mt-8 w-full'>Experience the
                                        Legacy
                                        of
                                        Over
                                        58
                                        Years in Ethiopian Business. Explore Our Established History and Commitment
                                        to
                                        Excellence!</p>
                                </div>

                                <div
                                    className='flex flex-col gap-5 w-full mt-10 border-t-2 border-t-[#dbe5f1] pt-10 '>
                                    <p className='text-4xl lg:text-5xl font-semibold'>+1200</p>
                                    <p className='text-[#002e6b] font-bold text-sm'>NUMBER OF DELIVERED
                                        PROPERTIES</p>
                                    <p className='text-[#738195] text-md font-normal mt-10 w-full'>Over 1200
                                        Properties
                                        Delivered.
                                        Discover Our Commitment to Quality and Excellence!</p>
                                </div>
                            </div>
                        </SplideSlide>

                        <SplideSlide>


                            <div className=''>

                                <div
                                    className='flex flex-col gap-5 w-full pb-6'>
                                    <p className='text-4xl lg:text-5xl font-semibold'>200K+ SQM</p>
                                    <p className='text-[#002e6b] font-bold text-sm'>OF DEVELOPED REAL ESTATE
                                        LAND</p>
                                    <p className='text-[#738195] text-md font-normal mt-8 w-full'>Developed Over
                                        200,000
                                        sqm of
                                        Prime
                                        Real Estate. Explore Our Expansive Land Portfolio!</p>
                                </div>

                                <div
                                    className='flex flex-col gap-5 w-full mt-10 border-t-2 border-t-[#dbe5f1] pt-10'>
                                    <p className='text-4xl lg:text-5xl font-semibold'>+1200</p>
                                    <p className='text-[#002e6b] font-bold text-sm'>NUMBER OF DELIVERED
                                        PROPERTIES</p>
                                    <p className='text-[#738195] text-md font-normal mt-8 w-full'>Over 1200
                                        Properties
                                        Delivered.
                                        Discover Our Commitment to Quality and Excellence!</p>
                                </div>
                            </div>
                        </SplideSlide>

                    </Splide>
                </div>


                <div data-aos="fade-up" data-aos-duration="1000" style={{backgroundImage: `url(${About3Image.src})`}}
                     className=' h-[60vh] bg-cover bg-center w-full'>

                </div>
            </div>
            {/*<Image src={About3Image} alt='' className='w-full'/>*/}
            <div className='container mx-auto pb-20 gap-20 flex flex-col items-end px-5 lg:px-0'>
                <div
                    data-aos="fade-up" data-aos-duration="1000"
                    className='flex flex-col gap-28 w-full lg:w-[66.5%]'>
                    <p className='text-4xl lg:text-6xl font-semibold leading-snug'>Uncover the <span
                        className='text-[#00416B]'>Perfect Place to Live </span>
                        with Metro Real Estate</p>
                </div>
                <div data-aos="fade-up" data-aos-duration="1000"
                     className='flex flex-col lg:flex-row justify-between items-start'>
                    <div className='hidden lg:flex w-full lg:w-[33%] text-[#00416B] text-md font-semibold'>
                        <p>METRO REAL ESTATE UNBOXED</p>
                    </div>
                    <div
                        className='flex flex-col gap-28 w-full lg:w-[66.5%]'>

                        <div className='flex flex-col lg:flex-row justify-start gap-5'>
                            <div className='w-full lg:w-1/2 flex flex-col gap-10'>
                                <p className='text-[#00416B] text-md font-semibold'>
                                    OUR VISION
                                </p>
                                <p className='text-md  font-normal text-[#002740]'>At Metro Real Estate, our vision is
                                    clear: to lead Ethiopia&apos;s real estate development industry by crafting
                                    exceptional
                                    living spaces that cater to diverse lifestyles and empower residents to thrive for
                                    perfection.</p>
                                {/*<Link*/}
                                {/*    href='/download-brochure'*/}
                                {/*    className='hidden lg:flex gap-4 font-normal w-80 items-center'>LEARN ABOUT*/}
                                {/*    Metro™*/}
                                {/*    <GoDownload color='#FFCF01'/>*/}
                                {/*</Link>*/}
                            </div>
                            <div className='w-full lg:w-1/2 flex flex-col gap-10'>
                                <p className='text-[#00416B] text-md font-semibold'>
                                    OUR MISSION
                                </p>
                                <p className='text-md  font-normal text-[#002740]'>Our mission is to deliver
                                    thoughtfully designed, high-quality homes at competitive prices. We strive to exceed
                                    customer expectations through personalized service, innovation, and unwavering
                                    integrity.</p>
                                {/*<Link*/}
                                {/*    href='/download-brochure'*/}
                                {/*    className='lg:hidden flex gap-4 font-normal w-80 h-[4rem] items-center'>LEARN*/}
                                {/*    ABOUT*/}
                                {/*    Metro™*/}
                                {/*    <GoDownload color='#FFCF01'/>*/}
                                {/*</Link>*/}
                            </div>
                        </div>

                    </div>
                </div>
                <div data-aos="fade-up" data-aos-duration="1000"
                     className='hidden lg:flex flex-col w-full lg:w-[66.5%] lg:flex-row justify-between gap-5'>
                    <Image src={About4Image} alt='' className='w-full md:w-[49%]'/>
                    <Image src={About5Image} alt='' className='w-full md:w-[49%]'/>
                </div>

                <div className='lg:hidden block'>

                    <Splide
                        options={{
                            perPage: 1,
                            arrows: true,
                            // gap: '1rem',
                            autoplay: true,
                            interval: 2000,
                            type: 'loop',
                            height: '50vh'
                        }}
                    >
                        <SplideSlide>
                            <Image src={About4Image} alt='' className='w-full  md:w-[49%] h-full'/>

                        </SplideSlide>
                        <SplideSlide>
                            <Image src={About5Image} alt='' className='w-full md:w-[49%] h-full'/>

                        </SplideSlide>
                    </Splide>
                </div>
            </div>

            <div className=' container mx-auto flex flex-col items-end gap-28 px-5 lg:px-0'>
                <div data-aos="fade-up" data-aos-duration="1000"
                     className='flex flex-col lg:flex-row justify-between lg:gap-4'>
                    <div className='text-4xl lg:text-5xl font-normal leading-snug'>
                        <p></p>
                    </div>
                    <div
                        className='flex flex-col gap-10 lg:gap-20 w-full lg:w-[66.5%]'>
                        <p className='text-4xl lg:text-6xl font-semibold leading-snug'>Meet the— <span
                            className='text-[#00416B]'>People behind</span> Metro Real
                            Estate™</p>

                        <div className='flex flex-col lg:flex-row justify-start gap-5 items-center'>
                            <div className='w-full lg:w-1/2 flex flex-col gap-5'>
                                <p className='text-[#00416B] text-md font-semibold'>
                                    OUR CHAMPIONS
                                </p>
                                <p className='text-md  font-normal text-[#002740]'>Meet the dedicated team behind Metro
                                    Real Estate, where passion meets expertise. Our diverse team is committed to
                                    delivering exceptional service and innovative solutions in the real estate
                                    industry.</p>
                            </div>
                            <div className='lg:w-1/2 hidden lg:flex gap-3 items-end justify-end'>
                                <Link href='/contact' className='text-primary'>
                                    REACH OUT TO OUR TEAM
                                </Link>
                                <Image src={NextIcon} alt=''/>
                            </div>
                        </div>
                        {/*<div className='flex flex-col gap-2'>*/}
                        {/*<Link*/}
                        {/*    href='/contact#form-section'*/}
                        {/*    className='flex text-md justify-center gap-4 font-semibold w-full lg:w-80 h-[72px] bg-primary hover:bg-primaryHover transition-all duration-200 items-center'>CONTACT*/}
                        {/*    METRO SALES TEAM*/}
                        {/*    <Image src={NextIcon} width={20} height={20} alt='next'/>*/}
                        {/*</Link>*/}
                        {/*<button*/}
                        {/*    className='flex gap-4 font-normal w-full lg:w-80 h-14 items-center'>DOWNLOAD*/}
                        {/*    BROUCHER (2.8mB)*/}
                        {/*    <GoDownload color='#FFCF01'/>*/}
                        {/*</button>*/}
                        {/*</div>*/}
                    </div>
                </div>
                <div data-aos="fade-up" data-aos-duration="1000"
                     className='justify-between hidden lg:flex lg:flex-row flex-wrap w-full lg:w-[66.5%] gap-y-10 '>
                    {
                        team.map((item) => (
                            <div key={item.id} className='w-[49%] lg:w-[24%] h-full flex flex-col gap-4'>
                                <Image src={PhotoFrame} alt='' className='w-full h-full'/>
                                <div className='flex flex-col gap-2'>
                                    <p className='text-[#002740] text-lg font-medium'>{item.name}</p>
                                    <p className='text-[#738195] text-sm font-normal'>{item.position}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div data-aos="fade-up" data-aos-duration="1000"
                     className='justify-between lg:hidden flex flex-col flex-wrap w-full lg:w-[66.5%] gap-y-10'>
                    <Splide
                        options={{
                            perPage: 1, // Only one "container" per slide, which contains 4 items
                            arrows: false,
                            gap: '1rem',
                            autoplay: true,
                            interval: 2000,
                            type: 'loop',
                            width: '100%',
                            pagination: false
                        }}>
                        {
                            team.map((item, index) => (
                                index % 4 === 0 && (
                                    <SplideSlide key={index}>
                                        <div className='grid grid-cols-2 gap-4'>
                                            {team.slice(index, index + 4).map((subItem) => (
                                                <div key={subItem.id} className='flex flex-col items-center gap-4'>
                                                    <div className='w-full h-48 flex items-center justify-center'>
                                                        <Image src={PhotoFrame} alt=''
                                                               className='w-full h-full object-cover'/>
                                                    </div>
                                                    <div className='flex flex-col gap-2'>
                                                        <p className='text-[#002740] text-lg font-medium'>{subItem.name}</p>
                                                        <p className='text-[#738195] text-sm font-normal'>{subItem.position}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </SplideSlide>
                                )
                            ))
                        }
                    </Splide>
                </div>


                {/*<div data-aos="fade-up" data-aos-duration="1000" className='w-full flex flex-col gap-8'>*/}


                {/*    <div className='w-full flex justify-between items-center'>*/}
                {/*        <p className='text-3xl text-[#001624] font-medium'>*/}
                {/*            Discover Metro Properties*/}
                {/*        </p>*/}
                {/*        <Link href='/property-list'*/}
                {/*            // onClick={() => setRegisterInterestOpen(true)}*/}
                {/*              className='hidden lg:flex text-md justify-center gap-4 font-semibold w-full lg:w-80 h-14 bg-primary hover:bg-primaryHover transition-all duration-200 items-center'>CHECK*/}
                {/*            OUT METRO HOMES*/}
                {/*            <Image src={NextIcon} width={20} height={20} alt='next'/>*/}
                {/*        </Link>*/}
                {/*    </div>*/}

                {/*    <div className='border-2 border-[#F3F4F6] w-full'>*/}

                {/*    </div>*/}

                {/*    <div className='w-full flex flex-wrap justify-between gap-y-10'>*/}
                {/*        <Link href='/life-style/2-1A-bedroom-apartment'*/}
                {/*              className='w-full lg:w-[33%] flex flex-col gap-4'>*/}
                {/*            <Image src={Bedroom2Image} alt='' className='w-full'/>*/}
                {/*            <div className='flex flex-col gap-2'>*/}
                {/*                <p className='text-[#002740] text-lg font-medium'>2 Bedroom Apartment</p>*/}
                {/*                <p className='text-[#738195] text-sm font-normal'>KAZANCHIS PROJECT SITE</p>*/}
                {/*            </div>*/}
                {/*        </Link>*/}
                {/*        <Link href='/life-style/3-2A-bedroom-apartment'*/}
                {/*              className='w-full lg:w-[33%] flex flex-col gap-4'>*/}
                {/*            <Image src={Bedroom3Imge} alt='' className='w-full'/>*/}
                {/*            <div className='flex flex-col gap-2'>*/}
                {/*                <p className='text-[#002740] text-lg font-medium'>3 Bedroom Apartment</p>*/}
                {/*                <p className='text-[#738195] text-sm font-normal'>SARBET PROJECT SITE</p>*/}
                {/*            </div>*/}
                {/*        </Link>*/}
                {/*        <Link href='/life-style/townhouses' className='w-full lg:w-[33%] flex flex-col gap-4'>*/}
                {/*            <Image src={LuxuriousImage} alt='' className='w-full'/>*/}
                {/*            <div className='flex flex-col gap-2'>*/}
                {/*                <p className='text-[#002740] text-lg font-medium'>Luxurious Penthouses</p>*/}
                {/*                <p className='text-[#738195] text-sm font-normal'>KAZANCHIS PROJECT SITE</p>*/}
                {/*            </div>*/}
                {/*        </Link>*/}
                {/*    </div>*/}

                {/*</div>*/}
            </div>
            {/*{*/}
            {/*    isRegisterInterestOpen ? <RegisterInterest isRegisterInterestOpen={isRegisterInterestOpen}*/}
            {/*                                               setRegisterInterestOpen={setRegisterInterestOpen}/> : null*/}

            {/*}*/}
        </div>
    )
}

export default AboutMetro
