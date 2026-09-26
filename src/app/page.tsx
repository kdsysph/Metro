'use client'
import Image from "next/image";
import Header from "@/sections/Header";
import LandingVideo from "@/sections/Home/LandingVideo";
import React, {useRef, useState} from 'react';
import DescriptionSection from "@/sections/Home/DescriptionSection";
import NumbersSection from "@/sections/Home/NumbersSection";
import Apartments from "@/sections/Home/Apartments";
import NextIcon from '../../public/NextIcon.svg';
import NextIconLight from '../../public/NextIconLight.svg';

import Schedule from "@/sections/Home/Schedule";
import Footer from "@/sections/Footer";
import Page from "@/app/about-metro/page";
import RegisterInterest from "@/sections/RegisterInterest";
import ScheduleMob from "../../public/ScheduleMob.jpg";
import Link from "next/link";
import {GoDownload} from "react-icons/go";
// @ts-ignore
import {Splide, SplideSlide} from "@splidejs/react-splide";
import '@splidejs/react-splide/css';
import KazanchisImage from "../../public/kazanchis.jpg";
import BulbulaImage from "../../public/bulbula.jpg";
import SarbetApartment from "../../public/SarbetApartment.jpg";
import SarbetApartmentDesktop from "../../public/SarbetApartment.jpg";
import KazanchisSlide from "../../public/KazanchisSlide.png";
import SplashPage from "@/sections/SplashPage";

export default function Home() {
    const nextSectionRef = useRef(null);
    const [isRegisterInterestOpen, setRegisterInterestOpen] = useState(false);

    return (
        <main className='flex flex-col lg:gap-28 font-sans'>
            <LandingVideo nextSectionRef={nextSectionRef}/>
            <div className='flex flex-col gap-20 lg:gap-28'>
                <div ref={nextSectionRef}>
                    <DescriptionSection setRegisterInterestOpen={setRegisterInterestOpen}/>
                </div>
                <div className="bg-[#041428] w-full">
                    <div className='container mx-auto flex justify-end'>

                        <div className='hidden lg:flex w-[33%]'>

                        </div>
                        <div className='w-full lg:w-[66%] py-20 flex flex-col gap-14 px-5'>
                            <p className='block lg:hidden text-4xl font-bodoni font-medium leading-snug text-white'>
                            Experience Unmatched <span className='text-white'>Elegance</span> with Metro™
                            </p>
                            <p className='hidden lg:block text-6xl font-bodoni font-medium leading-snug text-white'>
                            Experience Unmatched <span className='text-white'>Elegance</span> with Metro™
                            </p>
                            <div className='flex justify-start gap-5 font-medium'>
                                <p className='w-full lg:w-1/2 text-md   text-white font-light'>Metro Real Estate has
                                    developed
                                    over 200,000 square meters of prime real estate across Ethiopia, offering
                                    innovative
                                    properties that redefine urban living with thoughtful design and inviting
                                    spaces.</p>
                                <p className='hidden lg:flex w-full lg:w-1/2 text-md text-white font-light'>We have a
                                    commendable track record of delivering over 100 homes to satisfied customers.
                                    Our
                                    commitment to quality and service excellence has earned us a reputation as a
                                    trusted
                                    developer in the Ethiopian real estate market.
                                </p>
                            </div>
                            <div className='flex flex-col lg:flex-row gap-10 lg:gap-0 justify-evenly w-full '>
                                <div className='w-full flex flex-col lg:flex-row justify-start gap-5 text-white'>
                                <div className='w-full lg:w-1/2'>
    <a href='/property-list'
       className='flex text-md justify-center gap-4 font-medium w-full lg:w-80 h-[4rem] bg-[#041428] border-2 border-[#ffbf00] hover:bg-[#ffbf00] hover:text-[#041428] transition-all duration-200 items-center'>
        CHECK OUT METRO LOCATIONS
        <Image src={NextIconLight} width={30} height={30} alt='next' color= 'white hover:color[#ffbf00]' />
    </a>
</div>

                                    <div className='hidden lg:flex w-1/2 '>
                                        <Link
                                            href='/download-brochure'
                                            className='flex justify-start gap-4 font-medium w-80 h-14 text-sm items-center hover:text-[#ffbf00]'>GET
                                            METRO PROPERTY LIST
                                            <GoDownload size={20} color= 'white hover:color[#ffbf00]'/>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div data-aos="fade-up" data-aos-duration="1000"
                         className='container mx-auto hidden md:block pb-20'>

                        <Splide options={{
                            perPage: 2,
                            arrows: false,
                            gap: '1rem',
                            autoplay: true,
                            interval: 3000,
                            type: 'loop',
                            pagination: false

                        }}>
                            <SplideSlide>
                                <Link href='/projects/kazanchis'>
                                    <div style={{backgroundImage: `url(${KazanchisImage.src})`}}
                                         className=' h-[60vh] bg-cover bg-center w-full'>

                                    </div>
                                    {/*<Image src={KazanchisImage} alt='kazanchis' ></Image>*/}
                                    <p className='text-white pt-5'>Metro Kazanchis</p>
                                </Link>
                            </SplideSlide>
                            <SplideSlide>
                                <Link href='/projects/bulbula'>
                                    <div style={{backgroundImage: `url(${BulbulaImage.src})`}}
                                         className='h-[60vh] bg-cover bg-center w-full'>

                                    </div>
                                    {/*<Image src={BulbulaImage} alt='kazanchis'></Image>*/}
                                    <p className='text-white pt-5'>Metro Bulbula </p>
                                </Link>
                            </SplideSlide>
                            <SplideSlide>
                                <Link href='/projects/sarbet'>
                                    <div style={{backgroundImage: `url(${SarbetApartmentDesktop.src})`}}
                                         className=' h-[60vh] bg-cover bg-center w-full'>

                                    </div>
                                    {/*<Image src={KazanchisImage} alt='kazanchis' ></Image>*/}
                                    <p className='text-white pt-5'>Metro Sarbet</p>
                                </Link>
                            </SplideSlide>
                            {/*<SplideSlide>*/}
                            {/*    <div style={{backgroundImage: `url(${KazanchisSlide.src})`}}*/}
                            {/*         className='h-[60vh] bg-cover bg-center w-full'>*/}

                            {/*    </div>*/}
                            {/*    /!*<Image src={BulbulaImage} alt='kazanchis'></Image>*!/*/}
                            {/*    <p>bulbula</p>*/}
                            {/*</SplideSlide>*/}
                        </Splide>
                    </div>
                    <div data-aos="fade-up" data-aos-duration="1000" className='md:hidden block px-5 lg:px-0 pb-14'>

                        <Splide options={{
                            perPage: 1,
                            arrows: true,
                            gap: '1rem',
                            autoplay: true,
                            interval: 3000,
                            type: 'loop',
                            pagination: false

                        }}>
                            <SplideSlide>
                                <Link href='/projects/kazanchis'>
                                    <div style={{backgroundImage: `url(${KazanchisImage.src})`}}
                                         className=' h-[60vh] bg-cover bg-center w-full'>

                                    </div>
                                    {/*<Image src={KazanchisImage} alt='kazanchis' ></Image>*/}
                                    <p className='text-white pt-5'>Metro Kazanchis</p>
                                </Link>
                            </SplideSlide>
                            <SplideSlide>
                                <Link href='/projects/bulbula'>
                                    <div style={{backgroundImage: `url(${BulbulaImage.src})`}}
                                         className='h-[60vh] bg-cover bg-center w-full'>

                                    </div>
                                    {/*<Image src={BulbulaImage} alt='kazanchis'></Image>*/}
                                    <p className='text-white pt-5'>Metro Bulbula</p>
                                </Link>
                            </SplideSlide>
                            <SplideSlide>
                                <Link href='/projects/sarbet'>
                                    <div style={{backgroundImage: `url(${SarbetApartment.src})`}}
                                         className=' h-[60vh] bg-cover bg-center w-full'>

                                    </div>
                                    {/*<Image src={KazanchisImage} alt='kazanchis' ></Image>*/}
                                    <p className='text-white pt-5'>Metro Sarbet</p>
                                </Link>
                            </SplideSlide>
                            {/*<SplideSlide>*/}
                            {/*    <div style={{backgroundImage: `url(${KazanchisSlide.src})`}}*/}
                            {/*         className='h-[60vh] bg-cover bg-center w-full'>*/}

                            {/*    </div>*/}
                            {/*    /!*<Image src={BulbulaImage} alt='kazanchis'></Image>*!/*/}
                            {/*    <p>bulbula</p>*/}
                            {/*</SplideSlide>*/}
                        </Splide>
                    </div>

                </div>
                {/*<NumbersSection setRegisterInterestOpen={setRegisterInterestOpen}/>*/}
                <Apartments/>

                <Schedule/>
            </div>
            <div className='w-full lg:w-[60%] flex lg:hidden justify-center'>
                <Image src={ScheduleMob} alt='call' className='w-full  '/>
            </div>
            {
                isRegisterInterestOpen ? <RegisterInterest isRegisterInterestOpen={isRegisterInterestOpen}
                                                           setRegisterInterestOpen={setRegisterInterestOpen}/> : null

            }
        </main>
    );
}
