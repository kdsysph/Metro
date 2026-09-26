'use client'
import {AiOutlineClose} from "react-icons/ai";
import Image from "next/image";
import NextIcon from "../../../public/NextIcon.svg";
import React from "react";
import RequiredIcon from '../../../public/requiredIcon.svg'
import {FaAsterisk} from "react-icons/fa6";
import {tree} from "next/dist/build/templates/app-page";
import Link from "next/link";

const DownloadBrochurePage: React.FC = () => {
    const pdfUrl = '/brochure.pdf'; // Replace with the actual path to your PDF file

    const submitInterest = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('submitting interest');
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = 'brochure.pdf'; // You can set the desired file name here
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <div>
            <div
                className="container mx-auto bg-white w-full my-20 px-5 lg:px-0 rounded flex flex-col gap-10 justify-center items-center"
                onClick={(e) => e.stopPropagation()}
            >
                <div className='w-full flex justify-between items-center'>
                    <p className='text-4xl lg:text-5xl text-[#001624] font-medium'>
                        Download Brochure
                    </p>
                </div>

                <div className='h-2 my-5 border-t-2 border-t-[#F3F4F6] w-full'></div>

                <div className='flex flex-col lg:flex-row gap-5 lg:gap-0 justify-between w-full'>
                    <p className='text-[#738195] text-sm w-full lg:w-[25%]'>
                        Are you ready to find your perfect place? Download Metro Real Estate comprehensive brochure to
                        equip you with the knowledge you need to make informed real estate decisions.
                    </p>

                    <div className='w-full lg:w-[66.5%]'>
                        <form className="flex flex-wrap gap-8 justify-between" onSubmit={submitInterest}>
                            <label
                                className="flex flex-col w-full lg:w-[48%] text-lg text-main font-medium">
                                <div className='flex gap-2 items-center'>
                                    Full name <FaAsterisk size={11} color='#FFCF01'/>
                                </div>
                                <input required={true} type="text"
                                       className="bg-transparent border-b-2 border-b-[#D1D5DB] focus:border-b-main focus:outline-none"/>
                            </label>
                            <label
                                className="flex flex-col w-full lg:w-[48%] text-lg font-medium">
                                <div className='flex gap-2 items-center'>
                                    Email address <FaAsterisk size={11} color='#FFCF01'/>
                                </div>
                                <input required={true} type='email'
                                       className="bg-transparent border-b-2 border-b-[#D1D5DB] focus:border-b-main focus:outline-none"/>
                            </label>

                            <label className="text-main flex flex-col w-full text-lg font-medium">
                                <div className='flex gap-2 items-center'>
                                    Select the property of your interest <FaAsterisk size={11} color='#FFCF01'/>
                                </div>
                                <select
                                    required={true}
                                    className='"bg-transparent border-b-2 border-b-[#D1D5DB] focus:border-b-main focus:outline-none pb-2'>
                                    <option>2 Bedroom Apartment</option>
                                    <option>3 Bedroom Apartment</option>
                                    <option>Penthouses</option>
                                    <option>Villas</option>
                                </select>
                            </label>
                            <div className=' flex flex-col lg:flex-row gap-20 lg:gap-0 justify-between w-full'>
                                <p className='text-[#6B7280] text-sm font-normal w-full lg:w-[48%]'>
                                    By sending this message you agree to Metro Real Estate <Link href='/policy'
                                    className='text-[#002740] font-medium'>
                                Terms and Conditions.
                            </Link>
                                </p>
                                <button
                                    type='submit'
                                    className='w-full lg:w-[48%] flex text-md justify-center gap-4 font-medium h-14 bg-primary hover:bg-primaryHover transition-all duration-200 items-center'>
                                    DOWNLOAD BROCHURE
                                    <Image src={NextIcon} width={20} height={20} alt='next'/>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DownloadBrochurePage;