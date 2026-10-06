'use client'

import Image from "next/image";
import FacbookIcon from '../../public/FacebookIcon.svg'
import YoutubeIon from '../../public/YoutubeIcon.svg'
import InstagramIcon from '../../public/InstagramIcon.svg'
import LinkedinIcon from '../../public/LinkedinIcon.svg'
import NextIcon from "../../public/NextYellowIcon.svg";
import CallIconBlack from '../../public/CallIconBlack.svg'
import EmailIcon from '../../public/EmailIcon.svg'
import Link from "next/link";
import React, {useState} from "react";
import emailjs from '@emailjs/browser';
import RegisterInterest from "@/sections/RegisterInterest";
import {useLanguage} from '@/context/LanguageContext';
import {localizeField} from '@/lib/localize';

const Footer = ({projects, siteSettings}: any) => {
    const {lang} = useLanguage();
    const [isRegisterInterestOpen, setRegisterInterestOpen] = useState(false);
    const [subEmail, setSubEmail] = useState('');
    const [subStatus, setSubStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    // Use CMS values with hardcoded fallbacks
    const phone = siteSettings?.phoneNumber || '+25193 806 0606';
    const email = siteSettings?.email || 'sales@metrorealestateet.com';
    const headOffice = localizeField(siteSettings, 'headOfficeAddress', lang) || '2nd Floor; Sur construction Building,\nAfrica Ave, Addis Ababa, AA, Ethiopia';
    const copyright = siteSettings?.copyrightText || '2024 ©Metro Real Estate™';
    const facebookUrl = siteSettings?.facebookUrl || '#';
    const youtubeUrl = siteSettings?.youtubeUrl || '#';
    const instagramUrl = siteSettings?.instagramUrl || '#';
    const linkedinUrl = siteSettings?.linkedinUrl || '#';

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!subEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(subEmail)) {
            setSubStatus('error');
            return;
        }
        setSubStatus('loading');
        emailjs.send(
            process.env.NEXT_PUBLIC_SERVICE_ID as string,
            process.env.NEXT_PUBLIC_TEMPLATE_ID as string,
            { from_email: subEmail, message: `Newsletter subscription request from: ${subEmail}` },
            { publicKey: process.env.NEXT_PUBLIC_KEY as string }
        ).then(
            () => { setSubStatus('success'); setSubEmail(''); },
            () => { setSubStatus('error'); }
        );
    };

    return (
        <>
            <footer data-aos="fade-up" data-aos-duration="1000"
                    className='bg-[#041428] mt-0 p-5 pb-28 lg:pb-20'>
                <div className='container mx-auto flex flex-col gap-10 lg:gap-18'>

                    <div className='w-full flex justify-between'>
                        <p className='text-white text-sm'>{copyright}</p>
                        <div className='flex gap-5'>
                            <Link href={facebookUrl} target='_blank' rel='noopener noreferrer'>
                                <Image src={FacbookIcon} alt='Facebook'/>
                            </Link>
                            <Link href={youtubeUrl} target='_blank' rel='noopener noreferrer'>
                                <Image src={YoutubeIon} alt='YouTube'/>
                            </Link>
                            <Link href={instagramUrl} target='_blank' rel='noopener noreferrer'>
                                <Image src={InstagramIcon} alt='Instagram'/>
                            </Link>
                            <Link href={linkedinUrl} target='_blank' rel='noopener noreferrer'>
                                <Image src={LinkedinIcon} alt='LinkedIn'/>
                            </Link>
                        </div>
                    </div>

                    <div className='w-full lg:w-[90%] flex flex-col lg:flex-row justify-between h-auto'>
                        <div className='w-full lg:w-[35%] flex flex-col gap-8 justify-between'>
                            <p className='text-3xl text-white'>Don&apos;t Miss Our Project Updates!</p>
                            <p className='text-[#E5E7EB] text-sm'>Get exclusive access to new listings, market insights,
                                and expert tips to navigate your Metro™ journey.</p>
                        </div>
                    </div>

                    <div className='w-full flex flex-col gap-10 lg:gap-0 lg:flex-row justify-between h-auto'>
                        <form className='w-full lg:w-[30%] flex flex-col gap-2' onSubmit={handleSubscribe}>
                            <input
                                type="email"
                                placeholder='Email address'
                                value={subEmail}
                                onChange={e => { setSubEmail(e.target.value); setSubStatus('idle'); }}
                                disabled={subStatus === 'loading' || subStatus === 'success'}
                                className='w-full h-14 bg-transparent focus:border-b-primary outline-none border-b-2 border-gray-500 text-[#ffbf00]'
                            />
                            <button
                                type="submit"
                                disabled={subStatus === 'loading' || subStatus === 'success'}
                                className='w-full lg:w-80 flex justify-start gap-2 font-semibold h-20 lg:h-14 text-md lg:text-sm bg-transparent text-primary items-center hover:text-[#af910b] disabled:opacity-60'>
                                {subStatus === 'loading' ? 'SENDING...' : subStatus === 'success' ? 'SUBSCRIBED ✓' : 'REGISTER NOW'}
                                {subStatus !== 'loading' && subStatus !== 'success' && <Image src={NextIcon} width={20} height={20} alt='next'/>}
                            </button>
                            {subStatus === 'success' && (
                                <p className='text-green-400 text-sm'>You&apos;re subscribed! Thank you.</p>
                            )}
                            {subStatus === 'error' && (
                                <p className='text-red-400 text-sm'>Please enter a valid email address and try again.</p>
                            )}
                            <p className='text-white text-sm'>We are open for business world wide. Send us an email, and
                                we&apos;ll set up a meeting. Sign up today and unlock the door to your dream home!</p>
                        </form>

                        <div className='w-full lg:w-[30%] gap-6 flex flex-col'>
                            <p className='text-[#738195] text-sm'>METRO REAL ESTATE</p>
                            <div className='text-white text-sm'>
                                <p className='font-semibold mb-2'>Sales Office:</p>
                                {headOffice.split('\n').map((line: string, i: number) => (
                                    <p key={i}>{line}</p>
                                ))}
                            </div>
                            <div className='text-white text-sm flex flex-col gap-2'>
                                <Link href={`tel:${phone}`} className='flex gap-2 hover:text-[#ffbf00]'>
                                    <Image alt='call' src={CallIconBlack} width={20} height={20}/>: {phone}
                                </Link>
                                <Link href={`mailto:${email}`} className='flex gap-2 hover:text-[#ffbf00]'>
                                    <Image alt='email' src={EmailIcon} width={20} height={20}/>: {email}
                                </Link>
                            </div>
                        </div>

                        <div className='w-full lg:w-[30%] flex justify-start gap-20'>
                            <div className='flex flex-col gap-6'>
                                <p className='text-[#738195] text-sm'>QUICK LINKS</p>
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
                                    <Link href='/property-list/' className='hover:text-[#ffbf00]'>Metro Properties</Link>
                                    {projects?.map((project: any, index: number) => (
                                        <Link key={index}
                                              href={`/projects/${project.slug?.current}`}
                                              className='hover:text-[#ffbf00]'>
                                            Metro {project.projectName}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            {isRegisterInterestOpen && (
                <div style={{ zIndex: 10000000000 }}>
                    <RegisterInterest
                        isRegisterInterestOpen={isRegisterInterestOpen}
                        setRegisterInterestOpen={setRegisterInterestOpen}
                    />
                </div>
            )}
        </>
    );
}

export default Footer;
