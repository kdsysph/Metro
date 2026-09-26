'use client'

import Image from "next/image";
import AbourImage2 from "../../../../public/about2Image.svg";
import NewsDetailImage from "../../../../public/NewsDetail.svg";
import NextIcon from "../../../../public/NextIcon.svg";
import {GoDownload} from "react-icons/go";
import CallIcon from "../../../../public/CallIcon.svg";
import Bedroom2Image from "../../../../public/2BedromImage.jpg";
import Bedroom3Imge from "../../../../public/3BedroomImage.jpg";
import LuxuriousImage from "../../../../public/LuxuriousImage.jpg";
import React, {useContext, useEffect} from "react";
import {useQuery, gql} from "@apollo/client";
import ReactMarkdown from 'react-markdown';
import Link from "next/link";
import Bulbula2 from "../../../../public/Bulbula2.png";
import {SplashPageContext} from "@/context/SplashPageContext";
// @ts-ignore
import {Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import NextIconLight from "../../../../public/NextIconLight.svg";

const QUERY = gql`
    query getMetroNews($slug: String!) {
        metroNews(where: {slug: $slug}) {
            id
            title
            date
            description1
            description2
            coverImage{
              url
            }
            
          }
    }
`;

const NewsDetail = ({params}: { params: { slug: string } }) => {
    const {slug} = params;

    const {loading, error, data} = useQuery(QUERY, {
        variables: {slug},
    });

    const context = useContext(SplashPageContext);

    if (!context) {
        throw new Error('SomePage must be used within a SplashPageProvider');
    }

    const {setSplashPage} = context;

    useEffect(() => {
        if (loading) {
            console.log("loading true", loading)
            // setSplashPage(true);
        } else {
            console.log("loading false", loading)
            // setSplashPage(false);
        }
    }, [setSplashPage, loading]);

    if (error) {
        console.log("errrrrrrrrrrrrrrr", error)
        return <div>Error...</div>
    }

    console.log(data?.metroNews)

    const options: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'long', day: 'numeric'};
    const date = new Date(data?.metroNews?.date);
    const formattedDate = date.toLocaleDateString('en-US', options).toUpperCase();


    return (
        <>
            <div
                className='container mx-auto pt-28 pb-[72px] flex flex-col items-start gap-14 lg:gap-28 px-5 lg:px-0'>
                <div
                    className='flex flex-col w-full lg:w-[66.5%] '>
                    <p className='text-5xl lg:text-7xl font-medium leading-snug'>{data?.metroNews.title}</p>
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
                        {/*<p className='text-5xl lg:text-5xl font-medium leading-snug'>{data?.metroNews.title}</p>*/}
                        <div className='-my-10 lg:my-0 lg:hidden w-full lg:w-[35%]'>
                            <p className='text-[#002740] text-lg font-medium'>{formattedDate}</p>
                        </div>
                        <div className='flex flex-col justify-start gap-5'>
                            <p className='w-full text-lg  font-normal text-[#002740'>
                                {data?.metroNews.description1.map((item: any, index: number) => (
                                    <ReactMarkdown key={index}>{item}</ReactMarkdown>
                                ))}
                            </p>
                        </div>
                    </div>
                </div>


                <div style={{backgroundImage: `url(${data?.metroNews.coverImage.url})`}}
                     className=' h-[60vh] bg-cover bg-center w-full'>

                </div>
                {/*<Image src={data?.metroNews.coverImage.url} width={1500} height={900} alt='' className='w-full h-[80vh]'/>*/}
                <div className='flex justify-between gap-4 items-center'>
                    <div className='hidden lg:flex w-full lg:w-[33%] text-[#738195] text-md font-medium'>
                        <p></p>
                    </div>
                    <div
                        className='flex flex-col gap-10 w-full lg:w-[66.5%]'>
                        {data?.metroNews.description2.map((item: any, index: number) => (
                            <ReactMarkdown key={index}>{item}</ReactMarkdown>
                        ))}
                        {/*<p className='text-xl font-medium leading-snug'>HOW WE ACHIEVED THE RIBBA AWARD?</p>*/}
                        {/*<div className='flex flex-col justify-start gap-5'>*/}
                        {/*    <p className='w-full text-lg  font-normal text-[#002740'>*/}
                        {/*        We are live today on Facebook and Youtube! Hello, beautiful people! What are we going to*/}
                        {/*        be talking about today? Well, before I tell you, I just want to let you guys know I miss*/}
                        {/*        ya and I hope you missed us, and here we are back on the livestream. But! Back by*/}
                        {/*        popular demand, today we are going to be talking to Aaron Atchinson, he’s the founder of*/}
                        {/*        Farm Design based in Pasadena, and he is one of–he’s a man who has come from humble*/}
                        {/*        roots. </p>*/}

                        {/*</div>*/}
                        {/*<div*/}
                        {/*    className='flex flex-col gap-10 w-full'>*/}
                        {/*    <p className='text-4xl font-medium leading-snug'>Metro™ Bulbula Village uses only the latest*/}
                        {/*        available amenities for a comfortable life</p>*/}
                        {/*    <div className='flex flex-col justify-start gap-5'>*/}
                        {/*        <p className='w-full text-lg  font-normal text-[#002740'>*/}
                        {/*            We are live today on Facebook and Youtube! Hello, beautiful people! What are we going to*/}
                        {/*            be talking about today? Well, before I tell you, I just want to let you guys know I miss*/}
                        {/*            ya and I hope you missed us, and here we are back on the livestream. But! Back by*/}
                        {/*            popular demand, today we are going to be talking to Aaron Atchinson, he’s the founder of*/}
                        {/*            Farm Design based in Pasadena, and he is one of–he’s a man who has come from humble*/}
                        {/*            roots. </p>*/}
                        {/*        <p className='w-full text-lg  font-normal text-[#002740]'>Humble*/}
                        {/*            beginnings, and that’s his description, not mine. Now often times when we look at*/}
                        {/*            successful graphic designers and successful businesses, we make the assumption that it*/}
                        {/*            was preordained. That everything lined up for them and that that path was inevitable.*/}
                        {/*            This was most definitely not the case, so you guys are gonna want to definitely stay*/}
                        {/*            tuned to this because we’re gonna have a conversation with Aaron. He grew up in a town*/}
                        {/*            of 300 people. Small town. Stick around! Roll the titles!</p>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
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
                                className='w-full lg:w-80 flex justify-center gap-4 font-normal  h-14 text-sm items-center'>DOWNLOAD
                                BROUCHER (2.8mB)
                                <GoDownload color='#FFCF01'/>
                            </Link>
                        </div>
                    </div>


                </div>


                <div data-aos="fade-up" data-aos-duration="1000"
                     className='w-full flex flex-col gap-5 lg:px-0'>


                    <div className='w-full flex justify-between items-center '>
                        <p className='text-3xl text-[#001624] font-medium'>
                            Discover Metro Properties
                        </p>
                        <Link href='/property-list'
                                className='hidden lg:flex text-md justify-center gap-4 font-medium w-full lg:w-80 h-14 bg-[#00416B] text-white hover:bg-main transition-all duration-200 items-center'>Discover
                            your
                            next home
                            <Image src={NextIconLight} width={20} height={20} alt='next'/>
                        </Link>
                    </div>

                    <div className='border-[1px] border-[#374151] w-full '>

                    </div>

                    <div className='w-full hidden lg:flex flex-wrap justify-between gap-y-10'>
                        <Link href='/life-style/2-1A-bedroom-apartment'
                              className='w-full lg:w-[33%] flex flex-col gap-4'>
                            <Image src={Bedroom2Image} alt='' className='w-full'/>
                            <div className='flex flex-col gap-2'>
                                <p className='text-[#002740] text-lg font-medium'>2 Bedroom Apartment</p>
                                <p className='text-[#738195] text-sm font-normal'>KAZANCHIS PROJECT SITE</p>
                            </div>
                        </Link>
                        <Link href='/life-style/3-2A-bedroom-apartment'
                              className='w-full lg:w-[33%] flex flex-col gap-4'>
                            <Image src={Bedroom3Imge} alt='' className='w-full'/>
                            <div className='flex flex-col gap-2'>
                                <p className='text-[#002740] text-lg font-medium'>3 Bedroom Apartment</p>
                                <p className='text-[#738195] text-sm font-normal'>SARBET PROJECT SITE</p>
                            </div>
                        </Link>
                        <Link href='/life-style/townhouses' className='w-full lg:w-[33%] flex flex-col gap-4'>
                            <Image src={LuxuriousImage} alt='' className='w-full'/>
                            <div className='flex flex-col gap-2'>
                                <p className='text-[#002740] text-lg font-medium'>Luxurious Penthouses</p>
                                <p className='text-[#738195] text-sm font-normal'>KAZANCHIS PROJECT SITE</p>
                            </div>
                        </Link>
                    </div>

                    <div className='lg:hidden block'>
                        <Splide options={{
                            perPage: 1,
                            arrows: true,
                            autoplay: true,
                            interval: 3000,
                            type: 'loop',
                            pagination: false
                        }}>

                            <SplideSlide>
                                <Link href='/life-style/2-1A-bedroom-apartment'
                                      className='w-full lg:w-[33%] flex flex-col gap-4'>
                                    <Image src={Bedroom2Image} alt='' className='w-full'/>
                                    <div className='flex flex-col gap-2'>
                                        <p className='text-[#002740] text-lg font-medium'>2 Bedroom Apartment</p>
                                        <p className='text-[#738195] text-sm font-normal'>KAZANCHIS PROJECT SITE</p>
                                    </div>
                                </Link>
                            </SplideSlide>
                            <SplideSlide>
                                <Link href='/life-style/3-2A-bedroom-apartment'
                                      className='w-full lg:w-[33%] flex flex-col gap-4'>
                                    <Image src={Bedroom3Imge} alt='' className='w-full'/>
                                    <div className='flex flex-col gap-2'>
                                        <p className='text-[#002740] text-lg font-medium'>3 Bedroom Apartment</p>
                                        <p className='text-[#738195] text-sm font-normal'>SARBET PROJECT SITE</p>
                                    </div>
                                </Link>
                            </SplideSlide>
                            <SplideSlide>
                                <Link href='/life-style/townhouses'
                                      className='w-full lg:w-[33%] flex flex-col gap-4'>
                                    <Image src={LuxuriousImage} alt='' className='w-full'/>
                                    <div className='flex flex-col gap-2'>
                                        <p className='text-[#002740] text-lg font-medium'>Luxurious Penthouses</p>
                                        <p className='text-[#738195] text-sm font-normal'>KAZANCHIS PROJECT SITE</p>
                                    </div>
                                </Link>
                            </SplideSlide>
                        </Splide>
                    </div>


                </div>
            </div>
        </>
    )
}

export default NewsDetail;
