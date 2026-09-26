import exp from "node:constants";
import Image from "next/image";
import NextIcon from "../../../public/NextIcon.svg";
import {GoDownload} from "react-icons/go";
import Link from "next/link";
import CallIcon from '../../../public/CallIcon.svg'

const NumbersSection = ({setRegisterInterestOpen}: any) => {
    return (
        <div className='w-full flex flex-col justify-around gap-20'>
            <div data-aos="fade-up" data-aos-duration="1000"
                 className='container mx-auto flex flex-col lg:flex-row justify-between px-1 gap-y-8 lg:gap-y-28 '>

                <div className='lg:border-t-2 border-t-[#F3F4F6] lg:pt-14 flex flex-col gap-4 w-full lg:w-[32%] '>
                    <p className='text-4xl lg:text-5xl font-medium'>58+ Years</p>
                    <p className='text-[#00416B] text-md font-medium'>ACTIVE IN THE ETHIOPIAN BUSINESS</p>
                    <p className='text-[#738195] text-md font-normal mt-3 w-[80%]'>Experience the Legacy of Over 58
                        Years in Ethiopian Business. Explore Our Established History and Commitment to Excellence!</p>
                </div>

                <div className='border-t-2 border-t-[#F3F4F6] pt-8 lg:pt-14 flex flex-col gap-4  w-full lg:w-[32%] '>
                    <p className='text-4xl lg:text-5xl font-medium'>+1200</p>
                    <p className='text-[#00416B] text-md font-medium'>NUMBER OF DELIVERED PROPERTIES</p>
                    <p className='text-[#738195] text-md font-normal mt-3 w-[80%]'>Over 1200 Properties Delivered.
                        Discover Our Commitment to Quality and Excellence!</p>
                </div>

                <div className='border-t-2 border-t-[#F3F4F6] pt-8 lg:pt-14 flex flex-col gap-4  w-full lg:w-[32%] '>
                    <p className='text-4xl lg:text-5xl font-medium'>200K+ SQM</p>
                    <p className='text-[#00416B] text-md font-medium'>OF DEVELOPED REAL ESTATE LAND</p>
                    <p className='text-[#738195] text-md font-normal mt-3 w-[80%]'>Developed Over 200,000 sqm of Prime
                        Real Estate. Explore Our Expansive Land Portfolio!</p>
                </div>
                <a href="tel:+25193 806 0606"
                   onClick={() => setRegisterInterestOpen(true)}
                   className='flex lg:hidden justify-center gap-4 font-semibold w-full h-[72px] text-[16px] lg:text-sm bg-primary  hover:bg-[#022c47] transition-all duration-200 items-center'>
                    CALL METRO SALES
                    <Image src={CallIcon} width={40} height={40} alt='next'/>

                </a>
            </div>


            <div data-aos="fade-up" data-aos-duration="1000"
                 className='bg-red-300 border-[1px] border-red-500 w-full flex justify-end items-end mb-[40px] lg:mb-0'>
                <div className='lg:w-[66.5%] flex flex-col gap-16'>
                    <div>
                        <p className='text-[#001624] font-[600] text-5xl leading-tight'>
                            More than five locations to live your dream lifestyle
                        </p>
                    </div>

                    <div className='flex flex-col lg:flex-row justify-start gap-5'>
                        <p className='w-full lg:w-1/2 text-lg  font-normal text-[#002740]'>Metro Real Estate has
                            developed over 200,000 square meters of prime real estate across Ethiopia, offering
                            innovative properties that redefine urban living with thoughtful design and inviting
                            spaces.</p>
                        <p className='hidden lg:flex w-full lg:w-1/2 text-lg font-normal text-[#002740]'>We have a
                            commendable track record of delivering over 100 homes to satisfied customers. Our commitment
                            to quality and service excellence has earned us a reputation as a trusted developer in the
                            Ethiopian real estate market.</p>
                    </div>

                    <div className='hidden lg:flex flex-col lg:flex-row justify-evenly w-full '>
                        <div className='w-1/2'>
                            <button
                                onClick={() => setRegisterInterestOpen(true)}
                                className='flex justify-center gap-4 font-semibold w-80 h-14 text-sm bg-primary  hover:bg-primaryHover transition-all duration-200 items-center'>DISCOVER
                                YOUR NEXT HOME
                                <Image src={NextIcon} width={20} height={20} alt='next'/>

                            </button>
                        </div>
                        <div className='w-1/2'>
                            <Link
                                href='/download-brochure'
                                className='flex justify-center gap-4 font-normal w-80 h-14 text-sm items-center'>DOWNLOAD
                                BROUCHER (2.8mB)
                                <GoDownload color='#FFCF01'/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NumbersSection