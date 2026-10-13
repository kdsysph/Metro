'use client'
import Image from "next/image";
import LandingVideo from "@/sections/Home/LandingVideo";
import React, {useRef, useState, useEffect} from 'react';
import DescriptionSection from "@/sections/Home/DescriptionSection";
import NumbersSection from "@/sections/Home/NumbersSection";
import Apartments from "@/sections/Home/Apartments";
import NextIconLight from '../../public/NextIconLight.svg';
import Schedule from "@/sections/Home/Schedule";
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
import {sanityClient} from '@/lib/sanity';
import {queries} from '@/lib/groq-queries';
import {useLanguage} from '@/context/LanguageContext';
import {localizeField} from '@/lib/localize';
import {getCTASettings, CTASettings, getCTAText} from '@/lib/cta-utils';

// Hardcoded fallbacks
const FALLBACK_ELEGANCE_HEADING = 'Experience Unmatched Elegance with Metro™';
const FALLBACK_ELEGANCE_P1 = 'Metro Real Estate has developed over 200,000 square meters of prime real estate across Ethiopia, offering innovative properties that redefine urban living with thoughtful design and inviting spaces.';
const FALLBACK_ELEGANCE_P2 = 'We have a commendable track record of delivering over 100 homes to satisfied customers. Our commitment to quality and service excellence has earned us a reputation as a trusted developer in the Ethiopian real estate market.';

export default function Home() {
    const nextSectionRef = useRef(null);
    const [isRegisterInterestOpen, setRegisterInterestOpen] = useState(false);
    const [homePage, setHomePage] = useState<any>(null);
    const [ctaSettings, setCtaSettings] = useState<CTASettings | null>(null);
    const {lang} = useLanguage();

    useEffect(() => {
        sanityClient.fetch(queries.homePage)
            .then((data: any) => setHomePage(data))
            .catch(() => setHomePage(null));

        getCTASettings().then(setCtaSettings);
    }, []);

    const eleganceHeading = localizeField(homePage, 'eleganceSectionHeading', lang) || FALLBACK_ELEGANCE_HEADING;
    const eleganceP1 = localizeField(homePage, 'eleganceParagraph1', lang) || FALLBACK_ELEGANCE_P1;
    const eleganceP2 = localizeField(homePage, 'eleganceParagraph2', lang) || FALLBACK_ELEGANCE_P2;
    const getPropertyListText = getCTAText(ctaSettings, 'getPropertyListButton', lang);

    return (
        <main className='flex flex-col lg:gap-28 font-sans'>
            <LandingVideo
                nextSectionRef={nextSectionRef}
                heroHeadlineText={localizeField(homePage, 'heroHeadlineText', lang)}
                desktopVideoPath={homePage?.heroDesktopVideoPath}
                mobileVideoPath={homePage?.heroMobileVideoPath}
            />
            <div className='flex flex-col gap-20 lg:gap-28'>
                <div ref={nextSectionRef}>
                    <DescriptionSection
                        setRegisterInterestOpen={setRegisterInterestOpen}
                        tagline={localizeField(homePage, 'introTagline', lang)}
                        heading={localizeField(homePage, 'introHeading', lang)}
                        paragraph1={localizeField(homePage, 'introParagraph1', lang)}
                        paragraph2={localizeField(homePage, 'introParagraph2', lang)}
                        stats={homePage?.stats}
                        ctaSettings={ctaSettings}
                    />
                </div>
                <NumbersSection
                    setRegisterInterestOpen={setRegisterInterestOpen}
                    stats={homePage?.stats}
                    heading={localizeField(homePage, 'numbersSectionHeading', lang)}
                    paragraph1={localizeField(homePage, 'numbersSectionParagraph1', lang)}
                    paragraph2={localizeField(homePage, 'numbersSectionParagraph2', lang)}
                    ctaSettings={ctaSettings}
                />
                <div className="bg-[#041428] w-full">
                    <div className='container mx-auto flex justify-end'>
                        <div className='hidden lg:flex w-[33%]'></div>
                        <div className='w-full lg:w-[66%] py-20 flex flex-col gap-14 px-5'>
                            <p className='block lg:hidden text-4xl font-bodoni font-medium leading-snug text-white'>
                                {eleganceHeading}
                            </p>
                            <p className='hidden lg:block text-6xl font-bodoni font-medium leading-snug text-white'>
                                {eleganceHeading}
                            </p>
                            <div className='flex justify-start gap-5 font-medium'>
                                <p className='w-full lg:w-1/2 text-md text-white font-light'>{eleganceP1}</p>
                                <p className='hidden lg:flex w-full lg:w-1/2 text-md text-white font-light'>{eleganceP2}</p>
                            </div>
                            <div className='flex flex-col lg:flex-row gap-10 lg:gap-0 justify-evenly w-full'>
                                <div className='w-full flex flex-col lg:flex-row justify-start gap-5 text-white'>
                                    <div className='w-full lg:w-1/2'>
                                        <a href='/property-list'
                                           className='flex text-md justify-center gap-4 font-medium w-full lg:w-80 h-[4rem] bg-[#041428] border-2 border-[#ffbf00] hover:bg-[#ffbf00] hover:text-[#041428] transition-all duration-200 items-center'>
                                            CHECK OUT METRO LOCATIONS
                                            <Image src={NextIconLight} width={30} height={30} alt='next'/>
                                        </a>
                                    </div>
                                    <div className='hidden lg:flex w-1/2'>
                                        <Link
                                            href='/download-brochure'
                                            className='flex justify-start gap-4 font-medium w-80 h-14 text-sm items-center hover:text-[#ffbf00]'>
                                            {getPropertyListText}
                                            <GoDownload size={20}/>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Desktop project slider */}
                    <div data-aos="fade-up" data-aos-duration="1000"
                         className='container mx-auto hidden md:block pb-20'>
                        <Splide options={{ perPage: 2, arrows: false, gap: '1rem', autoplay: true, interval: 3000, type: 'loop', pagination: false }}>
                            <SplideSlide>
                                <Link href='/projects/kazanchis'>
                                    <div style={{backgroundImage: `url(${KazanchisImage.src})`}} className='h-[60vh] bg-cover bg-center w-full'/>
                                    <p className='text-white pt-5'>Metro Kazanchis</p>
                                </Link>
                            </SplideSlide>
                            <SplideSlide>
                                <Link href='/projects/bulbula'>
                                    <div style={{backgroundImage: `url(${BulbulaImage.src})`}} className='h-[60vh] bg-cover bg-center w-full'/>
                                    <p className='text-white pt-5'>Metro Bulbula</p>
                                </Link>
                            </SplideSlide>
                            <SplideSlide>
                                <Link href='/projects/sarbet'>
                                    <div style={{backgroundImage: `url(${SarbetApartmentDesktop.src})`}} className='h-[60vh] bg-cover bg-center w-full'/>
                                    <p className='text-white pt-5'>Metro Sarbet</p>
                                </Link>
                            </SplideSlide>
                        </Splide>
                    </div>

                    {/* Mobile project slider */}
                    <div data-aos="fade-up" data-aos-duration="1000" className='md:hidden block px-5 lg:px-0 pb-14'>
                        <Splide options={{ perPage: 1, arrows: true, gap: '1rem', autoplay: true, interval: 3000, type: 'loop', pagination: false }}>
                            <SplideSlide>
                                <Link href='/projects/kazanchis'>
                                    <div style={{backgroundImage: `url(${KazanchisImage.src})`}} className='h-[60vh] bg-cover bg-center w-full'/>
                                    <p className='text-white pt-5'>Metro Kazanchis</p>
                                </Link>
                            </SplideSlide>
                            <SplideSlide>
                                <Link href='/projects/bulbula'>
                                    <div style={{backgroundImage: `url(${BulbulaImage.src})`}} className='h-[60vh] bg-cover bg-center w-full'/>
                                    <p className='text-white pt-5'>Metro Bulbula</p>
                                </Link>
                            </SplideSlide>
                            <SplideSlide>
                                <Link href='/projects/sarbet'>
                                    <div style={{backgroundImage: `url(${SarbetApartment.src})`}} className='h-[60vh] bg-cover bg-center w-full'/>
                                    <p className='text-white pt-5'>Metro Sarbet</p>
                                </Link>
                            </SplideSlide>
                        </Splide>
                    </div>
                </div>

                <Apartments
                    heading1={localizeField(homePage, 'propertyTypesHeading1', lang)}
                    heading2={localizeField(homePage, 'propertyTypesHeading2', lang)}
                    paragraph1={localizeField(homePage, 'propertyTypesParagraph1', lang)}
                    paragraph2={localizeField(homePage, 'propertyTypesParagraph2', lang)}
                    ctaSettings={ctaSettings}
                />

                <Schedule
                    heading={localizeField(homePage, 'consultationHeading', lang)}
                    subheading={localizeField(homePage, 'consultationSubheading', lang)}
                    body={localizeField(homePage, 'consultationBody', lang)}
                    staffPhoto={homePage?.staffPhoto}
                    ctaSettings={ctaSettings}
                />
            </div>
            <div className='w-full lg:w-[60%] flex lg:hidden justify-center'>
                <Image src={ScheduleMob} alt='call' className='w-full'/>
            </div>
            {isRegisterInterestOpen && (
                <RegisterInterest isRegisterInterestOpen={isRegisterInterestOpen} setRegisterInterestOpen={setRegisterInterestOpen}/>
            )}
        </main>
    );
}
