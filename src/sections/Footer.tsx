'use client'

import Image from "next/image";
import FacbookIcon from '../../public/FacebookIcon.svg'
import YoutubeIon from '../../public/YoutubeIcon.svg'
import InstagramIcon from '../../public/InstagramIcon.svg'
import LinkedinIcon from '../../public/LinkedinIcon.svg'
import NextIcon from "../../public/NextYellowIcon.svg";
import SendIcon from '../../public/SendIcon.svg'
import CallIconBlack from '../../public/CallIconBlack.svg'
import EmailIcon from '../../public/EmailIcon.svg'
import Link from "next/link";
import React, {useState} from "react";
import RegisterInterest from "@/sections/RegisterInterest";

const Footer = ({projects}: any) => {

    // console.log(projects, " from footer")
    const [isRegisterInterestOpen, setRegisterInterestOpen] = useState(false);

    return (
        <>
            <footer data-aos="fade-up" data-aos-duration="1000"
                    className='bg-[#041428] mt-0 p-5 pb-28 lg:pb-20'>
                <div className='container mx-auto flex flex-col gap-10 lg:gap-18'>

                    <div className='w-full flex justify-between'>
                        <p className='text-white text-sm'>2024 ©Metro Real Estate™</p>
                        <div className='flex gap-5'>
                            <Image src={FacbookIcon} alt='fb'/>
                            <Image src={YoutubeIon} alt='yt'/>
                            <Image src={InstagramIcon} alt='ig'/>
                            <Image src={LinkedinIcon} alt='li'/>
                        </div>
                    </div>

                    <div className='w-full lg:w-[90%]  flex flex-col lg:flex-row justify-between h-auto '>


                        <div className='w-full lg:w-[35%] flex flex-col gap-8 justify-between'>
                            <p className='text-3xl text-white'>Don’t Miss Our
                                Project Updates! </p>
                            <p className='text-[#E5E7EB] text-sm'>Get exclusive access to new listings, market insights,
                                and expert tips to navigate your Metro™ journey.</p>

                            {/*<button*/}
                            {/*    onClick={() => setRegisterInterestOpen(true)}*/}
                            {/*    className='w-full lg:w-80 flex justify-start gap-2 font-semibold h-20 lg:h-14 text-md lg:text-sm bg-transparent text-primary items-center'>*/}
                            {/*    REGISTER INTEREST*/}
                            {/*    <Image src={NextIcon} width={20} height={20} alt='next'/>*/}
                            {/*</button>*/}
                        </div>


                    </div>

                    <div
                        className='w-full flex flex-col gap-10 lg:gap-0 lg:flex-row justify-between h-auto '>
                        <form className='w-full lg:w-[30%] flex flex-col gap-2'>

                            <input
                                type="email"
                                placeholder='Email address'
                                className='w-full h-14 bg-transparent focus:border-b-primary  outline-none border-b-2 border-gray-500 text-[#ffbf00]'
                            />
                            <button
                                className='w-full lg:w-80 flex justify-start gap-2 font-semibold h-20 lg:h-14 text-md lg:text-sm bg-transparent text-primary items-center hover:text-[#af910b]'>
                                REGISTER NOW
                                <Image src={NextIcon} width={20} height={20} alt='next'/>
                            </button>
                            <p className='text-white text-sm'>We are open for business world wide. Send us an email, and
                                we’ll set up a meeting. Sign up today and unlock the door to your dream home!</p>
                        </form>
                        <div className='w-full lg:w-[30%] gap-6 flex flex-col'>
                            <p className='text-[#738195] text-sm'>METRO REAL ESTATE</p>
                            <div className='text-white text-sm'>
                                <p className='font-semibold mb-2'>Sales Office:</p>
                                <p>2nd Floor; Sur construction Building,</p>
                                <p>Africa Ave, Addis Ababa, AA, Ethiopia</p>
                            </div>
                            <div className='text-white text-sm flex flex-col gap-2'>
                                <Link href='tel:+25193 806 0606' className='flex gap-2 hover:text-[#ffbf00]'><Image alt='call' src={CallIconBlack} width={20} height={20}/>:
                                    +25193 806 0606</Link>

                                <Link href='mailto:sales@metrorealestateet.com' className='flex gap-2 hover:text-[#ffbf00]'><Image alt='email' src={EmailIcon} width={20} height={20}/>:sales@metrorealestateet.com
                                </Link>
                            </div>
                        </div>

                        <div className='w-full lg:w-[30%] flex justify-start gap-20'>

                            <div className='flex flex-col gap-6'>
                                <p className='text-[#738195] text-sm '>QUICK LINKS</p>
                                <div className='text-white text-sm flex flex-col gap-2'>
                                    <Link href='/contact' className='hover:text-[#ffbf00]'>Get in Touch</Link>
                                    <Link href='/gallery' className='hover:text-[#ffbf00]'>Gallery</Link>
                                    <Link href='/news-room' className='hover:text-[#ffbf00]'>Newsroom</Link>
                                    <Link href='/about-metro' className='hover:text-[#ffbf00]'>About Metro</Link>
                                    <Link href='/policy' className='hover:text-[#ffbf00]'>Data Policy</Link>
                                    <Link href='/metro-legal' className='hover:text-[#ffbf00]'>Metro Legal</Link>
                                </div>

                            </div>

                        <div className='flex flex-col gap-6'>
                            <p className='text-[#738195] text-sm'>PROJECTS</p>
                            <div className='text-white text-sm flex flex-col gap-2'>
                                <Link
                                    href={`/property-list/`} className='hover:text-[#ffbf00]'>Metro Properties</Link>
                                {
                                    projects?.map((project: any, index: number) => (
                                        <Link key={index}
                                              href={`/projects/${project.slug}`} className='hover:text-[#ffbf00]'>Metro {project.projectName}</Link>
                                    ))
                                }
                            </div>
                        </div>
                        </div>


                    </div>
                </div>
            </footer>
            {
                isRegisterInterestOpen &&
                <div className='' style={{
                    zIndex: 10000000000
                }}>
                    isRegisterInterestOpen ? <RegisterInterest
                    isRegisterInterestOpen={isRegisterInterestOpen}
                    setRegisterInterestOpen={setRegisterInterestOpen}/> : null
                </div>

            }
        </>
    );
}

export default Footer;
