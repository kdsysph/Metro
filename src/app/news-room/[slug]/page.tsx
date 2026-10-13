'use client'

import Image from "next/image";
import NewsDetailImage from "../../../../public/NewsDetail.svg";
import NextIcon from "../../../../public/NextIcon.svg";
import {GoDownload} from "react-icons/go";
import CallIcon from "../../../../public/CallIcon.svg";
import React, {useContext, useEffect, useState} from "react";
import Link from "next/link";
import {SplashPageContext} from "@/context/SplashPageContext";
import {sanityClient, getImageUrl} from '@/lib/sanity';
import {queries} from '@/lib/groq-queries';
import {PortableText} from '@portabletext/react';
import DiscoverProperties from '@/sections/DiscoverProperties';
import {useLanguage} from '@/context/LanguageContext';
import {localizeField} from '@/lib/localize';
import {getCTASettings, CTASettings, getCTAText} from '@/lib/cta-utils';

const NewsDetail = ({params}: { params: { slug: string } }) => {
    const {slug} = params;
    const {lang} = useLanguage();
    const [news, setNews] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [ctaSettings, setCtaSettings] = useState<CTASettings | null>(null);

    const context = useContext(SplashPageContext);

    if (!context) {
        throw new Error('SomePage must be used within a SplashPageProvider');
    }

    const {setSplashPage} = context;

    useEffect(() => {
        async function fetchNews() {
            try {
                setLoading(true);
                const data = await sanityClient.fetch(queries.newsBySlug, { slug });
                setNews(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching news:', err);
                setError('Failed to load news');
            } finally {
                setLoading(false);
            }
        }
        fetchNews();
        getCTASettings().then(setCtaSettings);
    }, [slug]);

    useEffect(() => {
        if (loading) {
            console.log("loading true", loading)
        } else {
            console.log("loading false", loading)
        }
    }, [loading]);

    const downloadBrochureText = getCTAText(ctaSettings, 'downloadBrochureButton', lang);

    if (loading) {
        return <div className="flex justify-center items-center h-[50vh]">Loading...</div>;
    }

    if (error || !news) {
        return <div className="flex justify-center items-center h-[50vh]">News not found</div>;
    }

    const options: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'long', day: 'numeric'};
    const date = new Date(news?.date);
    const formattedDate = date.toLocaleDateString('en-US', options).toUpperCase();

    return (
        <>
            <div
                className='container mx-auto pt-28 pb-[72px] flex flex-col items-start gap-14 lg:gap-28 px-5 lg:px-0'>
                <div
                    className='flex flex-col w-full lg:w-[66.5%] '>
                    <p className='text-5xl lg:text-7xl font-medium leading-snug'>{localizeField(news, 'title', lang)}</p>
                    <div className='-my-10 lg:my-0 hidden lg:flex w-full lg:w-[35%]'>
                        <p className='flex lg:hidden text-[#002740] text-lg font-medium'>{formattedDate}</p>
                    </div>
                </div>
                <div className='flex justify-between gap-4 items-start'>
                    <div className='hidden lg:flex w-full lg:w-[33%] text-[#738195] text-md font-medium'>
                        <p>{formattedDate}</p>
                    </div>
                    <div
                        className='flex flex-col w-full lg:w-[66.5%] gap-28'>
                        <div className='-my-10 lg:my-0 lg:hidden w-full lg:w-[35%]'>
                            <p className='text-[#002740] text-lg font-medium'>{formattedDate}</p>
                        </div>
                        <div className='flex flex-col justify-start gap-5'>
                            <div className='w-full text-lg font-normal text-[#002740]'>
                                <PortableText value={localizeField(news, 'description1', lang) || []} />
                            </div>
                        </div>
                    </div>
                </div>


                <div style={{backgroundImage: `url(${getImageUrl(news.coverImage)})`}}
                     className=' h-[60vh] bg-cover bg-center w-full'>

                </div>
                <div className='flex justify-between gap-4 items-start'>
                    <div className='hidden lg:flex w-full lg:w-[33%]'>
                        <div className='w-full sticky top-28'>
                            {(() => {
                                const imgSrc = getImageUrl(news.secondaryImage);
                                return imgSrc ? (
                                    <Image
                                        src={imgSrc}
                                        width={400}
                                        height={500}
                                        alt='Metro Real Estate decorative image'
                                        className='w-full object-cover'
                                    />
                                ) : (
                                    <Image
                                        src={NewsDetailImage}
                                        width={400}
                                        height={500}
                                        alt='Metro Real Estate decorative image'
                                        className='w-full object-cover'
                                    />
                                );
                            })()}
                        </div>
                    </div>
                    <div
                        className='flex flex-col gap-10 w-full lg:w-[66.5%]'>
                        <PortableText value={localizeField(news, 'description2', lang) || []} />
                        {/* Mobile decorative image */}
                        <div className='flex lg:hidden w-full'>
                            {(() => {
                                const imgSrc = getImageUrl(news.secondaryImage);
                                return imgSrc ? (
                                    <Image
                                        src={imgSrc}
                                        width={400}
                                        height={300}
                                        alt='Metro Real Estate decorative image'
                                        className='w-full object-cover'
                                    />
                                ) : (
                                    <Image
                                        src={NewsDetailImage}
                                        width={400}
                                        height={300}
                                        alt='Metro Real Estate decorative image'
                                        className='w-full object-cover'
                                    />
                                );
                            })()}
                        </div>
                        <div className='w-full flex flex-col lg:flex-row justify-start'>
                            <Link
                                href='/contact#form-section'
                                className='w-full lg:w-80 hidden lg:flex text-md justify-center gap-4 font-medium h-[4rem] bg-primary hover:bg-primaryHover transition-all duration-200 items-center'>CONTACT
                                METRO SALES TEAM
                                <Image src={NextIcon} width={30} height={30} alt='next'/>
                            </Link>
                            <a href="tel:+25193 806 0606"
                               className='flex lg:hidden justify-center gap-4 font-semibold w-full h-[72px] text-[16px] lg:text-sm bg-primary  hover:bg-[#022c47] transition-all duration-200 items-center'>
                                CALL METRO SALES
                                <Image src={CallIcon} width={40} height={40} alt='next'/>

                            </a>
                            <Link
                                href='/download-brochure'
                                className='w-full lg:w-80 flex justify-center gap-4 font-normal  h-14 text-sm items-center'>{downloadBrochureText}
                                <GoDownload color='#FFCF01'/>
                            </Link>
                        </div>
                    </div>


                </div>


                <DiscoverProperties />
            </div>
        </>
    )
}

export default NewsDetail;