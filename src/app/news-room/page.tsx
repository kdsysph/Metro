'use client'

import Image from "next/image";
import React, {useState, useEffect} from "react";
import LightNextIcon from "../../../public/NextYellowIcon.svg";
import Link from "next/link";
import {sanityClient, getImageUrl} from '@/lib/sanity';
import {queries} from '@/lib/groq-queries';
import {useLanguage} from '@/context/LanguageContext';
import {localizeField} from '@/lib/localize';

const NewsRoom = () => {
    const {lang} = useLanguage();
    const [currentPage, setCurrentPage] = useState(1);
    const [news, setNews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchNews() {
            try {
                setLoading(true);
                const data = await sanityClient.fetch(queries.allNews);
                setNews(data || []);
                setError(null);
            } catch (err) {
                console.error('Error fetching news:', err);
                setError('Failed to load news');
            } finally {
                setLoading(false);
            }
        }
        fetchNews();
    }, []);

    if (loading) return <div className="flex justify-center py-20">Loading...</div>;
    if (error) return <div className="flex justify-center py-20">Error loading news</div>;

    const dateFormatter = (rawDate: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(rawDate);
        return date.toLocaleDateString('en-US', options).toUpperCase();
    };

    // Separate featured (first) article from the rest
    const featuredArticle = news[0] ?? null;
    const remainingNews = news.slice(1);

    const imagesPerPage = 12;
    const indexOfLastImage = currentPage * imagesPerPage;
    const indexOfFirstImage = indexOfLastImage - imagesPerPage;
    const currentNews = remainingNews.slice(indexOfFirstImage, indexOfLastImage);

    const totalPages = Math.ceil(remainingNews.length / imagesPerPage);
    const pageNumbers = Array.from({length: totalPages}, (_, i) => i + 1);

    return (
        <div className='container mx-auto py-16 pb-[72px] flex flex-col gap-6 lg:gap-10 px-5 lg:px-0'>
            <div className='w-full flex justify-between items-center'>
                <p className='hidden lg:flex text-5xl lg:text-7xl text-[#001624] font-medium'>
                    News & Update
                </p>
                <p className='lg:hidden flex text-5xl lg:text-7xl text-[#001624] font-medium'>
                    Newsroom
                </p>
                <div className='hidden lg:flex gap-3 items-center font-semibold justify-end'>
                    <Link href='/contact' className=''>
                        REACH OUT TO OUR TEAM
                    </Link>
                    <Image src={LightNextIcon} alt='' width={30} height={30}/>
                </div>
            </div>

            <div className='border-2 border-[#F3F4F6] w-full'></div>

            {/* Featured hero article */}
            {featuredArticle && (
                <Link
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    href={`/news-room/${featuredArticle.slug?.current}`}
                    className='w-full flex flex-col gap-3'
                >
                    <div
                        className='w-full bg-cover bg-center'
                        style={{ backgroundImage: `url(${getImageUrl(featuredArticle.coverImage)})`, height: '520px' }}
                    />
                    <p className='text-[#738195] font-normal text-sm'>{dateFormatter(featuredArticle.date)}</p>
                    <p className='text-2xl lg:text-3xl font-medium'>{localizeField(featuredArticle, 'title', lang)}</p>
                </Link>
            )}

            {/* 3-column grid — excludes the featured article */}
            <div className='flex flex-wrap justify-between gap-y-10'>
                {
                    currentNews.map((newsItem: any, index: number) => (
                        <Link data-aos="fade-up" data-aos-duration="1000" className='w-full lg:w-[33%] flex flex-col gap-2' href={`/news-room/${newsItem.slug?.current}`} key={newsItem._id || index}>
                            <div
                                className='flex flex-col gap-2 w-full bg-cover bg-center'
                                style={{ backgroundImage: `url(${getImageUrl(newsItem.coverImage)})`, height: '400px' }}
                            >
                            </div>
                            <p className='text-[#738195] font-normal text-sm'>{dateFormatter(newsItem.date)}</p>
                            <p className='text-md font-medium'>{localizeField(newsItem, 'title', lang)}</p>
                        </Link>
                    ))
                }
            </div>
            <div className='flex justify-center gap-5'>
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
        </div>
    );
};

export default NewsRoom;