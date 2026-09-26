import NextIcon from '../../../public/NextIcon.svg';
import Image from "next/image";
import {GoDownload} from "react-icons/go";
import Link from "next/link";
import CallIcon from "../../../public/CallIcon.svg";
// @ts-ignore
import {Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

const DescriptionSection = ({setRegisterInterestOpen}: any) => {
    return (
        <div data-aos="fade-up" data-aos-duration="1000"
             className='px-5 lg:px-0 container mx-auto flex justify-center items-start'>
            <div className='hidden lg:flex w-full mt-[11.5%] lg:w-[33%] text-[#738195] text-lg font-medium'>
                <p>WELCOME TO METRO REAL ESTATE</p>
            </div>
            <div className=' h-full flex flex-col gap-14 lg:gap-28 lg:justify-evenly w-full lg:w-[66%]'>
                <div>
                    <p className='hidden lg:flex text-5xl lg:text-6xl font-semibold leading-snug'>A home to live your
                        dream lifestyle</p>
                </div>
                <div className='flex flex-col gap-16'>
                    <div className='hidden lg:flex justify-start gap-5'>
                        <p className='w-full lg:w-1/2 text-md  font-normal text-[#002740]'>Welcome to Metro Real Estate,
                            where exceptional living meets thoughtful design. Established in Addis Ababa in April 2012,
                            we are proud to be a subsidiary of the Kangaroo Industrial Group S.C., bringing over five
                            decades of expertise to Ethiopia&apos;s real estate landscape.</p>
                        <p className='hidden lg:flex w-full lg:w-1/2 text-md font-normal text-[#002740]'>At Metro Real
                            Estate, our vision is clear: to lead Ethiopia&apos;s real estate development industry by
                            crafting
                            exceptional living spaces that cater to diverse lifestyles and empower residents to thrive.

                        </p>
                    </div>
                    <div data-aos="fade-up" data-aos-duration="1000"
                         className='container mx-auto hidden md:flex flex-col justify-between'>

                        <Splide options={{
                            perPage: 2,
                            arrows: false,
                            // gap: '1rem',
                            autoplay: true,
                            interval: 3000,
                            type: 'loop',
                            pagination: false

                        }}>
                            <SplideSlide>


                                <div
                                    className='flex flex-col gap-4 w-full '>
                                    <p className='text-4xl lg:text-5xl font-medium'>58+ Years</p>
                                    <p className='text-[#00416B] font-bold text-sm'>ACTIVE IN THE ETHIOPIAN
                                        BUSINESS</p>
                                    <p className='text-[#738195] text-md font-normal mt-10 w-full'>Experience the Legacy
                                        of
                                        Over
                                        58
                                        Years in Ethiopian Business. Explore Our Established History and Commitment to
                                        Excellence!</p>
                                </div>
                            </SplideSlide>

                            <SplideSlide>

                                <div
                                    className='flex flex-col gap-4  w-full '>
                                    <p className='text-4xl lg:text-5xl font-medium'>+1200</p>
                                    <p className='text-[#00416B] font-bold text-sm'>NUMBER OF DELIVERED PROPERTIES</p>
                                    <p className='text-[#738195] text-md font-normal mt-10 w-full'>Over 1200 Properties
                                        Delivered.
                                        Discover Our Commitment to Quality and Excellence!</p>
                                </div>
                            </SplideSlide>
                            <SplideSlide>


                                <div
                                    className='flex flex-col gap-4 w-full '>
                                    <p className='text-4xl lg:text-5xl font-medium'>200K+ SQM</p>
                                    <p className='text-[#00416B] font-bold text-sm'>OF DEVELOPED REAL ESTATE LAND</p>
                                    <p className='text-[#738195] text-md font-normal mt-10 w-full'>Developed Over
                                        200,000
                                        sqm of
                                        Prime
                                        Real Estate. Explore Our Expansive Land Portfolio!</p>
                                </div>
                            </SplideSlide>

                        </Splide>
                    </div>


                    <div data-aos="fade-up" data-aos-duration="1000"
                         className='container mx-auto flex lg:hidden flex-col justify-between'>

                        <Splide options={{
                            perPage: 1,
                            arrows: false,
                            // gap: '1rem',
                            autoplay: true,
                            interval: 3000,
                            type: 'loop',
                            pagination: false

                        }}>
                            <SplideSlide>

                                <div>

                                    <div
                                        className='flex flex-col gap-5 w-full '>
                                        <p className='text-4xl lg:text-5xl font-semibold'>58+ Years</p>
                                        <p className='text-[#002e6b] font-bold text-sm'>ACTIVE IN THE ETHIOPIAN
                                            BUSINESS</p>
                                        <p className='text-[#738195] text-md font-normal mt-8 w-full'>Experience the
                                            Legacy
                                            of
                                            Over
                                            58
                                            Years in Ethiopian Business. Explore Our Established History and Commitment
                                            to
                                            Excellence!</p>
                                    </div>

                                    <div
                                        className='flex flex-col gap-5 w-full mt-10 border-t-2 border-t-[#dbe5f1] pt-10 '>
                                        <p className='text-4xl lg:text-5xl font-semibold'>+1200</p>
                                        <p className='text-[#002e6b] font-bold text-sm'>NUMBER OF DELIVERED
                                            PROPERTIES</p>
                                        <p className='text-[#738195] text-md font-normal mt-10 w-full'>Over 1200
                                            Properties
                                            Delivered.
                                            Discover Our Commitment to Quality and Excellence!</p>
                                    </div>
                                </div>
                            </SplideSlide>

                            <SplideSlide>


                                <div className=''>

                                    <div
                                        className='flex flex-col gap-5 w-full pb-6'>
                                        <p className='text-4xl lg:text-5xl font-semibold'>200K+ SQM</p>
                                        <p className='text-[#002e6b] font-bold text-sm'>OF DEVELOPED REAL ESTATE
                                            LAND</p>
                                        <p className='text-[#738195] text-md font-normal mt-8 w-full'>Developed Over
                                            200,000
                                            sqm of
                                            Prime
                                            Real Estate. Explore Our Expansive Land Portfolio!</p>
                                    </div>

                                    <div
                                        className='flex flex-col gap-5 w-full mt-10 border-t-2 border-t-[#dbe5f1] pt-10'>
                                        <p className='text-4xl lg:text-5xl font-semibold'>+1200</p>
                                        <p className='text-[#002e6b] font-bold text-sm'>NUMBER OF DELIVERED
                                            PROPERTIES</p>
                                        <p className='text-[#738195] text-md font-normal mt-8 w-full'>Over 1200
                                            Properties
                                            Delivered.
                                            Discover Our Commitment to Quality and Excellence!</p>
                                    </div>
                                </div>
                            </SplideSlide>

                        </Splide>
                    </div>
                    <div className='flex flex-col lg:flex-row gap-10 lg:gap-0 justify-evenly w-full '>
                        <div className='w-full flex flex-col lg:flex-row justify-start gap-5'>
                            <div className='w-full lg:w-1/2 lg:border-t-2 border-t-[#dbe5f1] lg:pt-16'>
                                <a href='/about-metro'

                                   className='flex text-md justify-center gap-4 font-semibold w-full lg:w-80 h-[4rem] bg-primary hover:bg-primaryHover transition-all duration-200 items-center'>LEARN
                                    MORE ABOUT METRO
                                    <Image src={NextIcon} width={30} height={30} alt='next'/>
                                </a>
                            </div>
                            <div className='hidden lg:flex w-1/2 lg:border-t-2 border-t-[#dbe5f1] pt-16'>
                                <Link
                                    href='/download-brochure'
                                    className='flex justify-center gap-4 font-semibold w-80 h-14 text-sm items-center hover:text-[#ffbf00]'>GET
                                    METRO PROPERTY LIST
                                    <GoDownload color='#041428 hover:color[#ffbf00]'/>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DescriptionSection