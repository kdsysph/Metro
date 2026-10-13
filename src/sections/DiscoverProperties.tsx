'use client'
import Image from 'next/image';
import Link from 'next/link';
// @ts-ignore
import {Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Bedroom2Image from '../../public/2BedromImage.jpg';
import Bedroom3Image from '../../public/3BedroomImage.jpg';
import LuxuriousImage from '../../public/LuxuriousImage.jpg';
import NextIconLight from '../../public/NextIconLight.svg';
import {useLanguage} from '@/context/LanguageContext';
import {getCTASettings, CTASettings, getCTAText} from '@/lib/cta-utils';
import {useEffect, useState} from 'react';

const PROPERTIES = [
    { href: '/life-style/2-1A-bedroom-apartment', image: Bedroom2Image, title: '2 Bedroom Apartment', site: 'KAZANCHIS PROJECT SITE' },
    { href: '/life-style/3-2A-bedroom-apartment', image: Bedroom3Image, title: '3 Bedroom Apartment', site: 'SARBET PROJECT SITE' },
    { href: '/life-style/penthouse', image: LuxuriousImage, title: 'Luxurious Penthouses', site: 'KAZANCHIS PROJECT SITE' },
];

const DiscoverProperties = () => {
    const {lang} = useLanguage();
    const [ctaSettings, setCtaSettings] = useState<CTASettings | null>(null);

    useEffect(() => {
        getCTASettings().then(setCtaSettings);
    }, []);

    const discoverNextHomeText = getCTAText(ctaSettings, 'discoverNextHomeButton', lang);
    return (
        <div data-aos="fade-up" data-aos-duration="1000" className='w-full mt-10 flex flex-col gap-5'>
            <div className='w-full flex justify-between items-center'>
                <p className='text-3xl text-white font-medium'>Discover Metro Properties</p>
                <Link
                    href='/property-list'
                    className='hidden lg:flex text-md justify-center gap-4 font-medium w-full lg:w-80 h-14 bg-[#00416B] text-white hover:bg-main transition-all duration-200 items-center'>
                    {discoverNextHomeText}
                    <Image src={NextIconLight} width={20} height={20} alt='next'/>
                </Link>
            </div>

            <div className='border-[1px] border-[#374151] w-full'></div>

            {/* Desktop grid */}
            <div className='w-full hidden lg:flex flex-wrap justify-between gap-y-10'>
                {PROPERTIES.map((p, i) => (
                    <Link key={i} href={p.href} className='w-full lg:w-[33%] flex flex-col gap-4'>
                        <Image src={p.image} alt={p.title} className='w-full'/>
                        <div className='flex flex-col gap-2'>
                            <p className='text-white text-lg font-medium'>{p.title}</p>
                            <p className='text-[#9CA3AF] text-sm font-normal'>{p.site}</p>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Mobile carousel */}
            <div className='lg:hidden block'>
                <Splide options={{ perPage: 1, arrows: true, autoplay: true, interval: 3000, type: 'loop', pagination: false }}>
                    {PROPERTIES.map((p, i) => (
                        <SplideSlide key={i}>
                            <Link href={p.href} className='w-full flex flex-col gap-4'>
                                <Image src={p.image} alt={p.title} className='w-full'/>
                                <div className='flex flex-col gap-2'>
                                    <p className='text-white text-lg font-medium'>{p.title}</p>
                                    <p className='text-[#9CA3AF] text-sm font-normal'>{p.site}</p>
                                </div>
                            </Link>
                        </SplideSlide>
                    ))}
                </Splide>
            </div>
        </div>
    );
};

export default DiscoverProperties;
