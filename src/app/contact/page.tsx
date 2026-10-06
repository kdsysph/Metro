'use client';

import Image from "next/image";
import NextIcon from "../../../public/NextIcon.svg";
import NextYellowIcon from '../../../public/NextYellow.svg';
import WhatsAppIcon from '../../../public/whatsupIcon.svg';
import React, {useState, useEffect} from "react";
import Link from "next/link";
import {Map, Marker} from "pigeon-maps";
import emailjs from '@emailjs/browser';
import {sanityClient} from '@/lib/sanity';
import {queries} from '@/lib/groq-queries';
import {useLanguage} from '@/context/LanguageContext';
import {localizeField} from '@/lib/localize';

// Hardcoded fallbacks
const FALLBACK_MAP_CENTER: [number, number] = [8.999737, 38.7700249];
const FALLBACK_MARKERS: [number, number][] = [
    [9.012788, 38.775208],
    [8.9451929, 38.7851493],
    [8.984135960290898, 38.72723843279496],
    [8.999737, 38.7700249],
];
const FALLBACK_WORKING_HOURS = [
    {day: 'Monday - Friday', hours: '02:30 — 11:00LT', closed: false},
    {day: 'Saturday', hours: '02:30 — 06:30LT', closed: false},
    {day: 'Sunday', hours: '', closed: true},
];

const Contact = () => {
    const {lang} = useLanguage();
    const [contactData, setContactData] = useState<any>(null);
    const [siteSettings, setSiteSettings] = useState<any>(null);
    const [formData, setFormData] = useState({
        name: '', email: '', propertyInterest: '', phoneNumber: '', hearAboutUs: '', message: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        Promise.all([
            sanityClient.fetch(queries.contactPage),
            sanityClient.fetch(queries.siteSettings),
        ]).then(([contactResult, settingsResult]) => {
            setContactData(contactResult);
            setSiteSettings(settingsResult);
        }).catch(() => {
            setContactData(null);
            setSiteSettings(null);
        });
    }, []);

    const headOfficeAddress = localizeField(contactData, 'headOfficeAddress', lang) || '2nd Floor; Sur Construction Building,\nAfrica Ave, Addis Ababa, AA, Ethiopia';
    const branchOfficeAddress = localizeField(contactData, 'branchOfficeAddress', lang) || 'Refenti Mall Area; Bole Bulbula Site,\nAfrica Ave, Addis Ababa, AA, Ethiopia';
    const phone = contactData?.phoneNumber || '+25193 806 0606';
    const email = contactData?.email || 'sales@metrorealestateet.com';
    const whatsappNumber = siteSettings?.whatsappNumber || '+25193 806 0606';
    const formHeading = localizeField(contactData, 'formHeading', lang) || "We'd love to hear from you!";
    const formSubtext = localizeField(contactData, 'formSubtext', lang) || 'Fill in the form below to request details or to plan a tour of the Metro model apartment and its beautiful surroundings.';
    const workingHours = contactData?.workingHours?.length ? contactData.workingHours : FALLBACK_WORKING_HOURS;

    const mapCenter: [number, number] = contactData?.defaultMapCenter
        ? [contactData.defaultMapCenter.latitude, contactData.defaultMapCenter.longitude]
        : FALLBACK_MAP_CENTER;

    const markers: [number, number][] = contactData?.mapMarkers?.length
        ? contactData.mapMarkers.map((m: any) => [m.latitude, m.longitude] as [number, number])
        : FALLBACK_MARKERS;

    const handleChange = (e: any) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const submitInterest = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const templateParams = {from_name: formData.name, from_email: formData.email, message: formData.message};
        emailjs.send(
            process.env.NEXT_PUBLIC_SERVICE_ID as string,
            process.env.NEXT_PUBLIC_TEMPLATE_ID as string,
            templateParams,
            {publicKey: process.env.NEXT_PUBLIC_KEY as string}
        ).then(() => setLoading(false), () => setLoading(false));
    };

    return (
        <div className='container mx-auto pt-16 pb-20 flex flex-col gap-16 lg:gap-10 px-5 lg:px-0'>
            <div className='w-full flex justify-between items-center'>
                <p className='text-5xl lg:text-7xl text-[#001624] font-medium'>Contact Metro™</p>
            </div>

            <div className='border-2 border-[#F3F4F6] w-full -my-8 lg:-my-0'/>

            <div data-aos="fade-up" data-aos-duration="1000"
                 className='flex flex-col lg:flex-row justify-between gap-14 lg:gap-0'>
                {/* Head Office */}
                <div className='flex flex-col gap-5 w-full lg:w-[33%]'>
                    <p className='text-lg font-medium'>Address</p>
                    <div className='flex flex-col gap-2'>
                        <p className='text-md font-semibold text-[#00416B]'>{localizeField(contactData, 'headOfficeLabel', lang) || 'Head Office'}</p>
                        <div>
                            {headOfficeAddress.split('\n').map((line: string, i: number) => (
                                <p key={i} className='text-sm text-[#738195] font-normal'>{line}</p>
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <Link href={`tel:${phone}`} className='text-md font-medium text-[#001624]'>Phone: {phone}</Link>
                        <Link href={`mailto:${email}`} className='text-sm text-[#738195] font-normal'>{email}</Link>
                        <Link href={`https://wa.me/${whatsappNumber.replace(/\s+/g, '').replace('+', '')}`} target='_blank' rel='noopener noreferrer' className='flex items-center gap-2 text-sm text-[#738195] font-normal mt-1'>
                            <Image src={WhatsAppIcon} width={16} height={16} alt='WhatsApp'/>
                            WhatsApp: {whatsappNumber}
                        </Link>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <div className='flex gap-3'>
                            <Link href='/contact#form-section' className='text-lg font-medium'>How To Get There</Link>
                            <Image src={NextYellowIcon} alt=''/>
                        </div>
                        <div className='flex gap-3'>
                            <Link href='/contact#form-section' className='text-lg font-medium'>Schedule Meeting</Link>
                            <Image src={NextYellowIcon} alt=''/>
                        </div>
                    </div>
                </div>

                {/* Branch Office */}
                <div className='flex flex-col gap-5 w-full lg:w-[33%]'>
                    <p className='text-lg font-medium'>{localizeField(contactData, 'branchOfficeLabel', lang) || 'Metro™ Sales Points'}</p>
                    <div className='flex flex-col gap-3'>
                        <p className='text-md font-medium text-[#001624]'>Branch Sales Office</p>
                        <div>
                            {branchOfficeAddress.split('\n').map((line: string, i: number) => (
                                <p key={i} className='text-sm text-[#738195] font-normal'>{line}</p>
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <Link href={`tel:${phone}`} className='text-md font-medium text-[#001624]'>Phone: {phone}</Link>
                        <Link href={`mailto:${email}`} className='text-sm text-[#738195] font-normal'>{email}</Link>
                        <Link href={`https://wa.me/${whatsappNumber.replace(/\s+/g, '').replace('+', '')}`} target='_blank' rel='noopener noreferrer' className='flex items-center gap-2 text-sm text-[#738195] font-normal mt-1'>
                            <Image src={WhatsAppIcon} width={16} height={16} alt='WhatsApp'/>
                            WhatsApp: {whatsappNumber}
                        </Link>
                    </div>
                </div>

                {/* Working Hours */}
                <div className='flex flex-col gap-5 w-full lg:w-[33%]'>
                    <p className='text-lg font-medium'>Working Hours</p>
                    <div className='flex flex-col gap-5'>
                        {workingHours.map((wh: any, i: number) => (
                            <div key={i} className='flex flex-col gap-3'>
                                <p className='text-sm text-[#738195] font-normal'>{wh.day}</p>
                                {wh.closed
                                    ? <p className='text-sm font-semibold'>we&apos;re<span className='text-[#738195]'>——--——————</span>closed</p>
                                    : <p className='text-sm font-semibold'>{wh.hours}</p>
                                }
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Map */}
            <div className='h-[70vh] w-full'>
                <div className="relative h-full" style={{paddingBottom: '36.25%'}}>
                    <Map height={500} defaultCenter={mapCenter} defaultZoom={12}>
                        {markers.map((anchor, i) => (
                            <Marker key={i} width={50} anchor={anchor}/>
                        ))}
                    </Map>
                </div>
            </div>

            {/* Form */}
            <div data-aos="fade-up" data-aos-duration="1000" id="form-section"
                 className='w-full mt-10 flex justify-between items-center'>
                <p className='text-4xl lg:text-6xl text-[#001624] font-medium'>{formHeading}</p>
            </div>

            <div className='h-2 border-b-gray-300 w-full border-b-2 -my-10 lg:my-1'/>

            <div data-aos="fade-up" data-aos-duration="1000"
                 className='flex flex-col lg:flex-row gap-14 lg:gap-0 justify-between'>
                <p className='text-[#738195] text-sm w-full lg:w-[28%]'>{formSubtext}</p>
                <div className='w-full lg:w-[66.5%]'>
                    <form className="flex flex-wrap gap-5 lg:gap-8 justify-between" onSubmit={submitInterest}>
                        <label className="text-gray-600 flex flex-col w-full lg:w-[45%] text-md font-medium">
                            Name
                            <input type="text" name="name" value={formData.name} onChange={handleChange}
                                   className="bg-transparent border-b-2 border-b-gray-500 focus:border-b-main focus:outline-none"/>
                        </label>
                        <label className="text-gray-600 flex flex-col w-full lg:w-[45%] text-md font-medium">
                            Email address
                            <input type='email' name="email" value={formData.email} onChange={handleChange}
                                   className="bg-transparent border-b-2 border-b-gray-500 focus:border-b-main focus:outline-none"/>
                        </label>
                        <label className="mt-[8px] text-gray-600 flex flex-col w-full text-md font-medium">
                            <select name="propertyInterest" value={formData.propertyInterest} onChange={handleChange}
                                    className="bg-transparent border-b-2 border-b-gray-500 focus:border-b-main focus:outline-none pb-5">
                                <option disabled value="">Select the property of your interest</option>
                                <option>2 Bedroom Apartment</option>
                                <option>3 Bedroom Apartment</option>
                                <option>Penthouses</option>
                                <option>Villas</option>
                            </select>
                        </label>
                        <label className="text-gray-600 flex flex-col w-full lg:w-[45%] text-md font-medium">
                            Phone number
                            <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}
                                   className="bg-transparent border-b-2 border-b-gray-500 focus:border-b-main focus:outline-none"/>
                        </label>
                        <label className="text-gray-600 flex flex-col mt-[8px] w-full lg:w-[45%] text-md font-medium">
                            <select name="hearAboutUs" value={formData.hearAboutUs} onChange={handleChange}
                                    className="bg-transparent border-b-2 border-b-gray-500 focus:border-b-main focus:outline-none pb-5">
                                <option disabled value="">How did you hear about Metro™?</option>
                                <option>Social Media</option><option>Friend</option><option>Facebook</option>
                                <option>Instagram</option><option>WhatsApp</option><option>LinkedIn</option>
                                <option>Telegram</option><option>Sales Agent</option><option>Other</option>
                            </select>
                        </label>
                        <label className="text-main flex flex-col w-full text-lg font-medium">
                            Write us a message or tell us about the property of your interest
                            <textarea required name="message" value={formData.message} onChange={handleChange}
                                      className="bg-transparent border-b-2 border-b-[#D1D5DB] h-20 focus:border-b-main focus:outline-none"/>
                        </label>
                        <div className='flex flex-col lg:flex-row gap-20 lg:gap-0 justify-between w-full'>
                            <p className='text-[#6B7280] text-sm font-normal w-full lg:w-[48%]'>
                                By sending this message you agree to Metro Real Estate{' '}
                                <span className='text-[#002740] font-medium'>Terms and Conditions.</span>
                            </p>
                            <button disabled={loading} type='submit'
                                    className={`w-full lg:w-[48%] flex text-md justify-center gap-4 font-semibold h-[72px] ${loading ? 'bg-primaryHover' : 'bg-primary hover:bg-primaryHover'} transition-all duration-200 items-center`}>
                                {loading ? 'Sending...' : 'SUBMIT MESSAGE'}
                                {!loading && <Image src={NextIcon} width={20} height={20} alt='next'/>}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Contact;
