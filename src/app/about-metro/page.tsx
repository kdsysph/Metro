'use client'

import Image from "next/image";
import BannerImage from '../../../public/AboutBannerImage.jpg';
import About2Image from '../../../public/about2Image.svg';
import About3Image from '../../../public/about3Image.jpg';
import About4Image from '../../../public/about4Image.jpg';
import About5Image from '../../../public/about5Image.jpg';
import TakeTourImage from '../../../public/TakeTourImage.jpg';
import NextIcon from "../../../public/NextIcon.svg";
import PhotoFrame from '../../../public/PhotoFrame.jpg';
import React, {useState, useEffect} from "react";
import Link from "next/link";
import {PortableText} from '@portabletext/react';
// @ts-ignore
import {Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import {sanityClient, getImageUrl} from '@/lib/sanity';
import {queries} from '@/lib/groq-queries';
import {localizeField} from '@/lib/localize';
import {useLanguage} from '@/context/LanguageContext';

const FALLBACK_TEAM = [
    { id: 1, name: "Adera Habtamu", position: "PRINCIPAL HEAD, FOUNDER/CEO" },
    { id: 2, name: "Mikreselasie G.", position: "HEAD OF MARKETING AND SALES" },
    { id: 3, name: "Abubaker Seid", position: "VICE HEAD OF ACCOUNTING" },
    { id: 4, name: "Kidist Alemu", position: "VICE HEAD OF HUMAN RESOURCE" },
    { id: 5, name: "Sami Ahmed", position: "HEAD OF OPERATIONS" },
    { id: 6, name: "Kidus Yoseph", position: "VICE HEAD OF OPERATIONS" },
    { id: 7, name: "Ayalew Kebede", position: "MANAGER OF EXTERNAL OPS" },
    { id: 8, name: "Misrak Teferra", position: "TEAM LEAD OF EXTERNAL OPS" },
];

const FALLBACK_STATS = [
    { value: '58+ Years', label: 'ACTIVE IN THE ETHIOPIAN BUSINESS', description: 'Experience the Legacy of Over 58 Years in Ethiopian Business.' },
    { value: '+1200', label: 'NUMBER OF DELIVERED PROPERTIES', description: 'Over 1200 Properties Delivered.' },
    { value: '+5 LOCATIONS', label: 'PROJECT DEVELOPMENT LOCATIONS', description: 'From suburban tranquility in Bulbula to vibrant city living in Kazanchis.' },
    { value: '200K+ SQM', label: 'OF DEVELOPED REAL ESTATE LAND', description: 'Developed Over 200,000 sqm of Prime Real Estate.' },
];

const AboutMetro = () => {
    const [aboutData, setAboutData] = useState<any>(null);
    const { lang } = useLanguage();

    useEffect(() => {
        sanityClient.fetch(queries.aboutPage)
            .then((data: any) => setAboutData(data))
            .catch(() => setAboutData(null));
    }, []);

    const bannerUrl = aboutData?.bannerImage ? getImageUrl(aboutData.bannerImage) : null;
    const about3Url = aboutData?.about3Image ? getImageUrl(aboutData.about3Image) : null;
    const gallery1Url = aboutData?.galleryImage1 ? getImageUrl(aboutData.galleryImage1) : null;
    const gallery2Url = aboutData?.galleryImage2 ? getImageUrl(aboutData.galleryImage2) : null;
    const secondaryBannerUrl = aboutData?.secondaryBannerImage ? getImageUrl(aboutData.secondaryBannerImage) : null;
    const tourSectionUrl = aboutData?.tourSectionImage ? getImageUrl(aboutData.tourSectionImage) : null;

    const heroHeading = localizeField(aboutData, 'heroHeading', lang) || 'Welcome to Metro Real Estate - Your Next Dream Home!';
    const introSubheading = localizeField(aboutData, 'introSubheading', lang) || 'METRO REAL ESTATE UNBOXED';
    const secondaryHeading = localizeField(aboutData, 'secondaryHeading', lang) || 'Uncover the Perfect Place to Live with Metro Real Estate';
    const visionTitle = localizeField(aboutData, 'visionTitle', lang) || 'OUR VISION';
    const visionBody = localizeField(aboutData, 'visionBody', lang) || "At Metro Real Estate, our vision is clear: to lead Ethiopia's real estate development industry by crafting exceptional living spaces that cater to diverse lifestyles and empower residents to thrive for perfection.";
    const missionTitle = localizeField(aboutData, 'missionTitle', lang) || 'OUR MISSION';
    const missionBody = localizeField(aboutData, 'missionBody', lang) || "Our mission is to deliver thoughtfully designed, high-quality homes at competitive prices. We strive to exceed customer expectations through personalized service, innovation, and unwavering integrity.";
    const teamHeading = localizeField(aboutData, 'teamSectionHeading', lang) || 'Meet the— People behind Metro Real Estate™';
    const teamChampionsLabel = localizeField(aboutData, 'teamChampionsLabel', lang) || 'OUR CHAMPIONS';
    const teamDescription = localizeField(aboutData, 'teamDescription', lang) || "Meet the dedicated team behind Metro Real Estate, where passion meets expertise. Our diverse team is committed to delivering exceptional service and innovative solutions in the real estate industry.";
    const stats = aboutData?.stats?.length ? aboutData.stats : FALLBACK_STATS;
    const teamMembers = aboutData?.teamMembers?.length ? aboutData.teamMembers : FALLBACK_TEAM;

    return (
        <div className='pb-[72px]'>
            <div
                style={{backgroundImage: `url(${bannerUrl || BannerImage.src})`}}
                className='h-[70vh] lg:h-[60vh] bg-cover bg-center w-full'
            />

            <div className='container mx-auto py-20 lg:py-28 flex flex-col items-end gap-20 px-5 lg:px-0'>
                <div data-aos="fade-up" data-aos-duration="1000" className='flex flex-col gap-28 w-full lg:w-[66.5%]'>
                    <p className='text-4xl lg:text-6xl font-semibold leading-snug'>{heroHeading}</p>
                </div>

                <div data-aos="fade-up" data-aos-duration="1000" className='flex justify-between items-start'>
                    <div className='hidden lg:flex w-full lg:w-[33%] text-[#00416B] text-md font-semibold'>
                        <p>{introSubheading}</p>
                    </div>
                    <div className='flex flex-col gap-10 w-full lg:w-[66.5%]'>
                        <div className='lg:hidden w-full'>
                            <p className='text-[#00416B] text-md font-semibold'>{introSubheading}</p>
                        </div>
                        <div className='flex flex-col lg:flex-row justify-start gap-5'>
                            <div className='w-full lg:w-1/2 text-lg font-normal text-[#002740]'>
                                {localizeField(aboutData, 'introParagraph1', lang)
                                    ? <PortableText value={localizeField(aboutData, 'introParagraph1', lang)}/>
                                    : <p>Welcome to Metro Real Estate, where exceptional living and thoughtful design converge. Founded in Addis Ababa in April 2012, we proudly belong to the Kangaroo Industrial Group S.C., bringing over five decades of expertise to Ethiopia&apos;s industrial, commercial, and trading landscape.</p>
                                }
                            </div>
                            <div className='flex w-full lg:w-1/2 text-lg font-normal text-[#002740]'>
                                {localizeField(aboutData, 'introParagraph2', lang)
                                    ? <PortableText value={localizeField(aboutData, 'introParagraph2', lang)}/>
                                    : <p>Discover how we can help you find your perfect home or investment opportunity. Whether you&apos;re looking for a cozy apartment or a luxurious villa, we&apos;re here to guide you every step of the way.</p>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                {/* Secondary banner image — between intro text and stats */}
                <div data-aos="fade-up" data-aos-duration="1000" className='w-full'>
                    {secondaryBannerUrl
                        ? <img src={secondaryBannerUrl} alt='Metro Real Estate' className='w-full object-cover'/>
                        : <Image src={About2Image} alt='Metro Real Estate' className='w-full'/>
                    }
                </div>

                {/* Stats — desktop */}
                <div data-aos="fade-up" data-aos-duration="1000"
                     className='w-full md:w-[66.5%] hidden lg:flex flex-col lg:flex-row gap-y-10 justify-between flex-wrap'>
                    {stats.map((stat: any, i: number) => (
                        <div key={i} className={`w-full md:w-[49%] flex flex-col gap-4 ${i >= 2 ? 'border-t-2 border-t-[#dbe5f1] pt-16' : ''}`}>
                            <p className='text-4xl font-medium'>{stat.value}</p>
                            <p className='text-[#00416B] text-md font-semibold'>{localizeField(stat, 'label', lang)}</p>
                            <p className='text-[#738195] text-md font-normal mt-6'>{localizeField(stat, 'description', lang)}</p>
                        </div>
                    ))}
                </div>

                {/* Stats — mobile */}
                <div data-aos="fade-up" data-aos-duration="1000" className='container mx-auto flex lg:hidden flex-col justify-between'>
                    <Splide options={{ perPage: 1, arrows: false, autoplay: true, interval: 3000, type: 'loop', pagination: false }}>
                        <SplideSlide>
                            <div>
                                {stats.slice(0, 2).map((stat: any, i: number) => (
                                    <div key={i} className={`flex flex-col gap-5 w-full ${i > 0 ? 'mt-10 border-t-2 border-t-[#dbe5f1] pt-10' : ''}`}>
                                        <p className='text-4xl font-semibold'>{stat.value}</p>
                                        <p className='text-[#002e6b] font-bold text-sm'>{localizeField(stat, 'label', lang)}</p>
                                        <p className='text-[#738195] text-md font-normal mt-8 w-full'>{localizeField(stat, 'description', lang)}</p>
                                    </div>
                                ))}
                            </div>
                        </SplideSlide>
                        {stats.length > 2 && (
                            <SplideSlide>
                                <div>
                                    {stats.slice(2).map((stat: any, i: number) => (
                                        <div key={i} className={`flex flex-col gap-5 w-full ${i > 0 ? 'mt-10 border-t-2 border-t-[#dbe5f1] pt-10' : 'pb-6'}`}>
                                            <p className='text-4xl font-semibold'>{stat.value}</p>
                                            <p className='text-[#002e6b] font-bold text-sm'>{localizeField(stat, 'label', lang)}</p>
                                            <p className='text-[#738195] text-md font-normal mt-8 w-full'>{localizeField(stat, 'description', lang)}</p>
                                        </div>
                                    ))}
                                </div>
                            </SplideSlide>
                        )}
                    </Splide>
                </div>

                <div data-aos="fade-up" data-aos-duration="1000"
                     style={{backgroundImage: `url(${about3Url || About3Image.src})`}}
                     className='h-[60vh] bg-cover bg-center w-full'/>
            </div>

            <div className='container mx-auto pb-20 gap-20 flex flex-col items-end px-5 lg:px-0'>
                <div data-aos="fade-up" data-aos-duration="1000" className='flex flex-col gap-28 w-full lg:w-[66.5%]'>
                    <p className='text-4xl lg:text-6xl font-semibold leading-snug'>{secondaryHeading}</p>
                </div>
                <div data-aos="fade-up" data-aos-duration="1000" className='flex flex-col lg:flex-row justify-between items-start'>
                    <div className='hidden lg:flex w-full lg:w-[33%] text-[#00416B] text-md font-semibold'>
                        <p>{introSubheading}</p>
                    </div>
                    <div className='flex flex-col gap-28 w-full lg:w-[66.5%]'>
                        <div className='flex flex-col lg:flex-row justify-start gap-5'>
                            <div className='w-full lg:w-1/2 flex flex-col gap-10'>
                                <p className='text-[#00416B] text-md font-semibold'>{visionTitle}</p>
                                <p className='text-md font-normal text-[#002740]'>{visionBody}</p>
                            </div>
                            <div className='w-full lg:w-1/2 flex flex-col gap-10'>
                                <p className='text-[#00416B] text-md font-semibold'>{missionTitle}</p>
                                <p className='text-md font-normal text-[#002740]'>{missionBody}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Gallery images desktop */}
                <div data-aos="fade-up" data-aos-duration="1000"
                     className='hidden lg:flex flex-col w-full lg:w-[66.5%] lg:flex-row justify-between gap-5'>
                    {gallery1Url
                        ? <img src={gallery1Url} alt='Metro About' className='w-full md:w-[49%] object-cover'/>
                        : <Image src={About4Image} alt='' className='w-full md:w-[49%]'/>
                    }
                    {gallery2Url
                        ? <img src={gallery2Url} alt='Metro About' className='w-full md:w-[49%] object-cover'/>
                        : <Image src={About5Image} alt='' className='w-full md:w-[49%]'/>
                    }
                </div>

                {/* Gallery images mobile */}
                <div className='lg:hidden block'>
                    <Splide options={{ perPage: 1, arrows: true, autoplay: true, interval: 2000, type: 'loop', height: '50vh' }}>
                        <SplideSlide>
                            {gallery1Url
                                ? <img src={gallery1Url} alt='Metro About' className='w-full h-full object-cover'/>
                                : <Image src={About4Image} alt='' className='w-full md:w-[49%] h-full'/>
                            }
                        </SplideSlide>
                        <SplideSlide>
                            {gallery2Url
                                ? <img src={gallery2Url} alt='Metro About' className='w-full h-full object-cover'/>
                                : <Image src={About5Image} alt='' className='w-full md:w-[49%] h-full'/>
                            }
                        </SplideSlide>
                    </Splide>
                </div>
            </div>

            {/* Tour section image — between gallery and team */}
            <div data-aos="fade-up" data-aos-duration="1000" className='container mx-auto px-5 lg:px-0 pb-20'>
                {tourSectionUrl
                    ? <img src={tourSectionUrl} alt='Take a Tour' className='w-full object-cover'/>
                    : <Image src={TakeTourImage} alt='Take a Tour' className='w-full'/>
                }
            </div>

            {/* Team section */}
            <div className='container mx-auto flex flex-col items-end gap-28 px-5 lg:px-0'>
                <div data-aos="fade-up" data-aos-duration="1000" className='flex flex-col lg:flex-row justify-between lg:gap-4'>
                    <div className='text-4xl lg:text-5xl font-normal leading-snug'/>
                    <div className='flex flex-col gap-10 lg:gap-20 w-full lg:w-[66.5%]'>
                        <p className='text-4xl lg:text-6xl font-semibold leading-snug'>{teamHeading}</p>
                        <div className='flex flex-col lg:flex-row justify-start gap-5 items-center'>
                            <div className='w-full lg:w-1/2 flex flex-col gap-5'>
                                <p className='text-[#00416B] text-md font-semibold'>{teamChampionsLabel}</p>
                                <p className='text-md font-normal text-[#002740]'>{teamDescription}</p>
                            </div>
                            <div className='lg:w-1/2 hidden lg:flex gap-3 items-end justify-end'>
                                <Link href='/contact' className='text-primary'>REACH OUT TO OUR TEAM</Link>
                                <Image src={NextIcon} alt=''/>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Team grid desktop */}
                <div data-aos="fade-up" data-aos-duration="1000"
                     className='justify-between hidden lg:flex lg:flex-row flex-wrap w-full lg:w-[66.5%] gap-y-10'>
                    {teamMembers.map((member: any, i: number) => {
                        const photoUrl = member.photo ? getImageUrl(member.photo) : null;
                        return (
                            <div key={i} className='w-[49%] lg:w-[24%] h-full flex flex-col gap-4'>
                                {photoUrl
                                    ? <img src={photoUrl} alt={member.name} className='w-full h-full object-cover'/>
                                    : <Image src={PhotoFrame} alt='' className='w-full h-full'/>
                                }
                                <div className='flex flex-col gap-2'>
                                    <p className='text-[#002740] text-lg font-medium'>{member.name}</p>
                                    <p className='text-[#738195] text-sm font-normal'>{member.position}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Team carousel mobile */}
                <div data-aos="fade-up" data-aos-duration="1000"
                     className='justify-between lg:hidden flex flex-col flex-wrap w-full gap-y-10'>
                    <Splide options={{ perPage: 1, arrows: false, gap: '1rem', autoplay: true, interval: 2000, type: 'loop', width: '100%', pagination: false }}>
                        {teamMembers.filter((_: any, i: number) => i % 4 === 0).map((_: any, slideIdx: number) => (
                            <SplideSlide key={slideIdx}>
                                <div className='grid grid-cols-2 gap-4'>
                                    {teamMembers.slice(slideIdx * 4, slideIdx * 4 + 4).map((member: any, i: number) => {
                                        const photoUrl = member.photo ? getImageUrl(member.photo) : null;
                                        return (
                                            <div key={i} className='flex flex-col items-center gap-4'>
                                                <div className='w-full h-48 flex items-center justify-center'>
                                                    {photoUrl
                                                        ? <img src={photoUrl} alt={member.name} className='w-full h-full object-cover'/>
                                                        : <Image src={PhotoFrame} alt='' className='w-full h-full object-cover'/>
                                                    }
                                                </div>
                                                <div className='flex flex-col gap-2'>
                                                    <p className='text-[#002740] text-lg font-medium'>{member.name}</p>
                                                    <p className='text-[#738195] text-sm font-normal'>{member.position}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </SplideSlide>
                        ))}
                    </Splide>
                </div>
            </div>
        </div>
    );
}

export default AboutMetro;
