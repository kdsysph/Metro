'use client'

import Image from "next/image";
import {gql, useQuery} from "@apollo/client";
import React, {useState} from "react";
import LightNextIcon from "../../../public/NextYellowIcon.svg";
import Link from "next/link";

const QUERY = gql`
     {
        metroNewss {
            id
            title
            date
            description1
            description2
            coverImage{
              url
            }
            slug
        }
    }
`

const NewsRoom = () =>{


    const [currentPage, setCurrentPage] = useState(1);
    const {data, loading, error} = useQuery(QUERY);

    if (error)
        return <div>Error loading news</div>

    if (loading)
        return <div>Loading</div>

    console.log(data)

    const imagesPerPage = 12;

    const indexOfLastImage = currentPage * imagesPerPage;
    const indexOfFirstImage = indexOfLastImage - imagesPerPage;
    const currentNews = data?.metroNewss.slice(indexOfFirstImage, indexOfLastImage);

    const totalPages = Math.ceil(data?.metroNewss.length / imagesPerPage);
    const pageNumbers = Array.from({length: totalPages}, (_, i) => i + 1);

    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(data?.metroNews?.date);
    const formattedDate = date.toLocaleDateString('en-US', options).toUpperCase();

    const dateFormatter = (rawDate:string) =>{
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(rawDate);
        return date.toLocaleDateString('en-US', options).toUpperCase()
    }
    return(
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

            <div className='flex flex-wrap justify-between gap-y-10'>
                {
                    currentNews.map((news: any, index: number) => (
                        <Link data-aos="fade-up" data-aos-duration="1000" className='w-full lg:w-[33%] flex flex-col gap-2' href={`/news-room/${news.slug}`} key={index}>
                            <div
                                className='flex flex-col gap-2 w-full bg-cover bg-center'
                                style={{ backgroundImage: `url(${news.coverImage.url})`, height: '400px' }}
                            >
                            </div>
                                <p className='text-[#738195] font-normal text-sm'>{dateFormatter(news.date)}</p>
                                <p className='text-md font-medium'>{news.title}</p>
                        </Link>
                    ))
                }

                {/*<div className='flex flex-col gap-4 w-[33%]'>*/}
                {/*    <Image src={NewsImage1} alt='news 1' className='w-full'/>*/}
                {/*    <p className='text-[#738195] font-normal text-sm'>16 MARCH 2024</p>*/}
                {/*    <p className='text-md font-semibold'>Metro Real Estate Launches First Residential Tower in Addis</p>*/}
                {/*</div>*/}
                {/*<div className='flex flex-col gap-2 w-[33%]'>*/}
                {/*    <Image src={NewsImage2} alt='news 1' className='w-full'/>*/}
                {/*    <p className='text-[#738195] font-normal text-sm'>16 MARCH 2024</p>*/}
                {/*    <p className='text-md font-semibold'>Metro Real Estate Launches First Residential Tower in Addis</p>*/}
                {/*</div>*/}
                {/*<div className='flex flex-col gap-2 w-[33%]'>*/}
                {/*    <Image src={NewsImage3} alt='news 1' className='w-full'/>*/}
                {/*    <p className='text-[#738195] font-normal text-sm'>16 MARCH 2024</p>*/}
                {/*    <p className='text-md font-semibold'>Metro Real Estate Launches First Residential Tower in Addis</p>*/}
                {/*</div>*/}
                {/*<div className='flex flex-col gap-2 w-[33%]'>*/}
                {/*    <Image src={NewsImage1} alt='news 1 w-full'/>*/}
                {/*    <p className='text-[#738195] font-normal text-sm'>16 MARCH 2024</p>*/}
                {/*    <p className='text-md font-semibold'>Metro Real Estate Launches First Residential Tower in Addis</p>*/}
                {/*</div>*/}
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
    )
}

export default NewsRoom