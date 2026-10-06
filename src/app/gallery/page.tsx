'use client'
import React, {useState, useEffect} from 'react';
import Image from "next/image";
import Gallery1 from '../../../public/Gallery1.jpg';
import Gallery2 from '../../../public/Gallery2.jpg';
import Gallery3 from '../../../public/Gallery3.jpg';
import Gallery4 from '../../../public/Gallery4.jpg';
import Gallery5 from '../../../public/Gallery5.jpg';
import Gallery6 from '../../../public/Gallery6.jpg';
import Gallery7 from '../../../public/Gallery7.jpg';
import Gallery8 from '../../../public/Gallery8.jpg';
import Gallery9 from '../../../public/Gallery9.jpg';
import Gallery10 from '../../../public/Gallery10.jpg';
import Gallery11 from '../../../public/Gallery11.jpg';
import LightNextIcon from '../../../public/NextYellowIcon.svg';
import Link from "next/link";
import {sanityClient, getImageUrl} from '@/lib/sanity';
import {queries} from '@/lib/groq-queries';

const FALLBACK_IMAGES = [
    Gallery1, Gallery2, Gallery3, Gallery4, Gallery5, Gallery6,
    Gallery7, Gallery8, Gallery9, Gallery10, Gallery11,
    Gallery1, Gallery2, Gallery3, Gallery4, Gallery5, Gallery3,
    Gallery4, Gallery5, Gallery6, Gallery7, Gallery2, Gallery3,
    Gallery4, Gallery1, Gallery2, Gallery1, Gallery6, Gallery2,
    Gallery3, Gallery4, Gallery6, Gallery7, Gallery2, Gallery3,
    Gallery4, Gallery1, Gallery2, Gallery3, Gallery4,
];

const Gallery = () => {
    const [galleryData, setGalleryData] = useState<any>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const imagesPerPage = 12;

    useEffect(() => {
        sanityClient.fetch(queries.galleryPage)
            .then((data: any) => setGalleryData(data))
            .catch(() => setGalleryData(null));
    }, []);

    // Use CMS images only if there are entries with actual image assets
    const hasCmsImages = galleryData?.images?.some((item: any) => item.image?.asset);

    const indexOfLastImage = currentPage * imagesPerPage;
    const indexOfFirstImage = indexOfLastImage - imagesPerPage;

    const cmsImages = hasCmsImages ? galleryData.images.filter((item: any) => item.image?.asset) : [];

    const totalPages = hasCmsImages
        ? Math.ceil(cmsImages.length / imagesPerPage)
        : Math.ceil(FALLBACK_IMAGES.length / imagesPerPage);

    const pageNumbers = Array.from({length: totalPages}, (_, i) => i + 1);

    const title = galleryData?.title || 'Metro™ Gallery';

    return (
        <div className='container mx-auto pt-16 pb-8 lg:pb-0 flex flex-col gap-6 lg:gap-10 px-5 lg:px-0'>
            <div className='w-full flex justify-between items-center'>
                <p className='text-5xl lg:text-7xl font-medium text-[#001624]'>{title}</p>
                <div className='hidden lg:flex gap-3 items-center font-semibold justify-end'>
                    <Link href='/contact'>REACH OUT TO OUR TEAM</Link>
                    <Image src={LightNextIcon} alt='' width={30} height={30}/>
                </div>
            </div>

            <div className='border-2 border-[#F3F4F6] w-full'/>

            {hasCmsImages ? (
                <>
                    <div className='flex flex-wrap justify-between gap-y-2'>
                        {cmsImages.slice(indexOfFirstImage, indexOfLastImage).map((item: any, index: number) => {
                            const url = getImageUrl(item.image);
                            return (
                                <div data-aos="fade-up" data-aos-duration="1000" key={index} className='w-full lg:w-[33%]'>
                                    {url
                                        ? <img src={url} alt={item.altText || item.caption || 'Gallery image'} className='w-full'/>
                                        : null
                                    }
                                </div>
                            );
                        })}
                    </div>
                    {totalPages > 1 && (
                        <div className='flex justify-center gap-5 pt-4 lg:py-20'>
                            {pageNumbers.map(number => (
                                <button
                                    key={number}
                                    onClick={() => setCurrentPage(number)}
                                    className={`w-8 h-8 rounded-full flex items-center text-[#002740] font-medium justify-center ${currentPage === number ? 'bg-primary text-white' : 'text-main font-medium bg-[#F3F4F6]'}`}
                                >
                                    {number}
                                </button>
                            ))}
                        </div>
                    )}
                </>
            ) : (
                <>
                    <div className='flex flex-wrap justify-between gap-y-2'>
                        {FALLBACK_IMAGES.slice(indexOfFirstImage, indexOfLastImage).map((image, index) => (
                            <div data-aos="fade-up" data-aos-duration="1000" key={index} className='w-full lg:w-[33%]'>
                                <Image src={image} alt='gallery' className='w-full'/>
                            </div>
                        ))}
                    </div>
                    <div className='flex justify-center gap-5 pt-4 lg:py-20'>
                        {pageNumbers.map(number => (
                            <button
                                key={number}
                                onClick={() => setCurrentPage(number)}
                                className={`w-8 h-8 rounded-full flex items-center text-[#002740] font-medium justify-center ${currentPage === number ? 'bg-primary text-white' : 'text-main font-medium bg-[#F3F4F6]'}`}
                            >
                                {number}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Gallery;
