'use client'

import Image from "next/image";
import KazanchisImage from '../../../public/kazanchis.jpg'
import BulbulaImage from '../../../public/bulbula.jpg';
import NextIcon from "../../../public/NextIcon.svg";
import AparmnetImage from '../../../public/Apartments.jpg';
import TownHousesImage from '../../../public/Townhouses.jpg'
import VillasImage from '../../../public/Villas.jpg'
// @ts-ignore
import {Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Link from "next/link";
import KazanchisSlide from '../../../public/KazanchisSlide.png'
import Bulbula2 from '../../../public/Bulbula2.png'
import {useState} from "react";

const Apartments = () => {
    const splideOptions: any = {
        perPage: 1,
        arrows: true,
        pagination: false,
        drag: 'free',
        gap: '0rem'
    }

    const [hoveredLink, setHoveredLink] = useState<any>(null);
    return (
        <div className='px-5 lg:px-0 container mx-auto flex flex-col gap-28'>


            <div data-aos="fade-up" data-aos-duration="1000" className='flex flex-col lg:flex-row justify-between '>
                <div className='w-full lg:w-[33%] '>
                    <p className='text-5xl font-semibold'>Find Homes —</p>
                </div>
                <div className='w-full lg:w-[66.5%] flex flex-col gap-12'>
                    <p className='text-5xl font-semibold'>That Redefine Luxury Living</p>
                    <div className='flex w-full lg:w-[40%] text-[#00416B] text-sm font-semibold'>
                        <p className='uppercase'>Explore Homes for Every Lifestyle</p>
                    </div>
                    <div className='flex justify-start gap-5'>
                        <p className='w-full lg:w-1/2 text-lg  font-normal text-[#002740]'>Discover our diverse
                            collection of homes tailored to elevate your lifestyle beyond the ordinary. Whether you seek
                            an apartment, villa, or townhouse, we have the perfect option for you. Experience
                            exceptional living with Metro Real Estate.</p>
                        <p className='hidden lg:flex w-full lg:w-1/2 text-lg font-normal text-[#002740]'>A diverse
                            portfolio of property types and locations tailored to your lifestyle. From suburban
                            tranquility in Bulbula to vibrant city living in Kazanchis, and upscale residences near Old
                            Airport, find your perfect home with Metro Real Estate.</p>
                    </div>
                    <div className=''>
                        <Link
                            href='/contact#form-section'
                            className='flex justify-center gap-4 font-semibold w-full lg:w-80 h-[72px] text-[16px] lg:text-sm bg-primary hover:bg-primaryHover transition-all duration-200 items-center'>
                            CONTACT METRO SALES TEAM
                            <Image src={NextIcon} width={20} height={20} alt='next'/>
                        </Link>
                    </div>
                </div>
            </div>

            <div className='flex justify-between gap-2'>
                <div className='lg:hidden'>
                    <Splide
                        options={splideOptions}
                        aria-label="React Splide Example"
                    >
                        <SplideSlide>
                            <Link href='/life-style/apartments' className='relative'>
                                <Image src={AparmnetImage} alt='apartment'/>
                                <div style={{
                                    position: 'absolute',
                                    bottom: 40,
                                    left: 20,
                                    color: 'white',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '10px'
                                }}>
                                    <p className='text-4xl font-medium'>
                                        Apartments
                                    </p>
                                    <p className='text-white font-light text-sm'>
                                        FIND YOUR PERFECT STARTER HOME →
                                    </p>
                                </div>
                            </Link>
                        </SplideSlide>
                        <SplideSlide>
                            <Link href='/life-style/townhouses' className='relative'>
                                <Image src={TownHousesImage} alt='apartment'/>
                                <div style={{
                                    position: 'absolute',
                                    bottom: 40,
                                    left: 20,
                                    color: 'white',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '10px'
                                }}>
                                    <p className='text-4xl font-medium'>
                                        Townhouses
                                    </p>
                                    <p className='text-white font-light text-sm'>
                                        Unique Properties Full of Charm →
                                    </p>
                                </div>
                            </Link>
                        </SplideSlide>
                        <SplideSlide>
                            <Link href='/life-style/villas' className='relative'>
                                <Image src={VillasImage} alt='apartment'/>
                                <div style={{
                                    position: 'absolute',
                                    bottom: 40,
                                    left: 20,
                                    color: 'white',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '10px'
                                }}>
                                    <p className='text-4xl font-medium'>
                                        Villas
                                    </p>
                                    <p className='text-white font-light text-sm'>
                                        Explore Homes with Character →
                                    </p>
                                </div>
                            </Link>
                        </SplideSlide>
                    </Splide>
                </div>

                {[{
                    name: 'Apartments',
                    desc: 'FIND YOUR PERFECT STARTER HOME →',
                    image: AparmnetImage,
                    link: '/life-style/4-bedroom-apartments'
                }, {
                    name: 'Townhouses',
                    desc: 'Unique Properties Full of Charm →',
                    image: TownHousesImage,
                    link: '/life-style/townhouses'
                }, {
                    name: 'Villas',
                    desc: 'Explore Homes with Character →',
                    image: VillasImage,
                    link: '/life-style/villas'
                }].map((link, index) => (
                    <Link
                        // data-aos="fade-up" data-aos-duration="1000"
                        href={link.link}
                        key={index}
                        onMouseEnter={() => setHoveredLink(index)}
                        onMouseLeave={() => setHoveredLink(null)}
                        className={`hidden lg:flex transition-all duration-300 ${hoveredLink === index ? 'w-[40%]' : 'w-[33%]'} lg:flex relative`}
                        style={{height: '85vh'}}
                    >
                        <Image src={link.image} alt='apartment' className='w-full h-full object-cover'/>
                        <div style={{
                            position: 'absolute',
                            bottom: 40,
                            left: 20,
                            color: 'white',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px'
                        }}>
                            <p className='text-4xl font-medium'>
                                {link.name}
                            </p>
                            <p className='text-white font-light text-sm'>
                                {link.desc}
                            </p>
                        </div>
                    </Link>
                ))}


            </div>
        </div>
    )
}

export default Apartments