'use client';

import Image from "next/image";
import NextIcon from "../../../public/NextIcon.svg";
import NextYellowIcon from '../../../public/NextYellow.svg';
import React, { useState } from "react";
import { FaAsterisk } from "react-icons/fa6";
import Link from "next/link";
import { Map, ZoomControl, Marker } from "pigeon-maps";
import emailjs from '@emailjs/browser';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        propertyInterest: '',
        phoneNumber: '',
        hearAboutUs: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message
    };

    const submitInterest = (e) => {
        e.preventDefault();
        setLoading(true);
        emailjs.send(process.env.NEXT_PUBLIC_SERVICE_ID, process.env.NEXT_PUBLIC_TEMPLATE_ID, templateParams, {
            publicKey: process.env.NEXT_PUBLIC_KEY
        })
            .then((result) => {
                console.log('SUCCESS', result);
                setLoading(false);
            }, (error) => {
                console.log('FAILED', error);
                setLoading(false);
            });
    };

    return (
        <div className='container mx-auto pt-16 pb-20 flex flex-col gap-16 lg:gap-10 px-5 lg:px-0'>
            <div className='w-full flex justify-between items-center'>
                <p className='text-5xl lg:text-7xl text-[#001624] font-medium'>
                    Contact Metro™
                </p>
            </div>

            <div className='border-2 border-[#F3F4F6] w-full -my-8 lg:-my-0'></div>

            <div data-aos="fade-up" data-aos-duration="1000"
                 className='flex flex-col lg:flex-row justify-between gap-14 lg:gap-0'>
                <div className='flex flex-col gap-5 w-full lg:w-[33%]'>
                    <p className='text-lg font-medium'>Address</p>
                    <div className='flex flex-col gap-2'>
                        <p className='text-md font-semibold text-[#00416B]'>Head Office</p>
                        <div>
                            <p className='text-sm text-[#738195] font-normal'>2nd Floor; Sur Construction Building, </p>
                            <p className='text-sm text-[#738195] font-normal'>Africa Ave, Addis Ababa, AA, Ethiopia</p>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <Link href='tel:+25193 806 0606' className='text-md font-medium text-[#001624]'>Phone: +25193
                            806 0606</Link>
                        <Link href='mailto:sales@metrorealestateet.com'
                              className='text-sm text-[#738195] font-normal'>sales@metrorealestateet.com</Link>
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

                <div className='flex flex-col gap-5 w-full lg:w-[33%]'>
                    <p className='text-lg font-medium'>Metro™ Sales Points</p>
                    <div className='flex flex-col gap-3'>
                        <p className='text-md font-medium text-[#001624]'>Branch Sales Office</p>
                        <div>
                            <p className='text-sm text-[#738195] font-normal'>Site Sales Office:</p>
                            <p className='text-sm text-[#738195] font-normal'>Refenti Mall Area; Bole Bulbula Site,</p>
                            <p className='text-sm text-[#738195] font-normal'>Africa Ave, Addis Ababa, AA, Ethiopia</p>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <Link href='tel:+25193 806 0606' className='text-md font-medium text-[#001624]'>Phone: +25193
                            806 0606</Link>
                        <Link href='mailto:sales@metrorealestateet.com'
                              className='text-sm text-[#738195] font-normal'>sales@metrorealestateet.com</Link>
                    </div>
                </div>

                <div className='flex flex-col gap-5 w-full lg:w-[33%]'>
                    <p className='text-lg font-medium'>Working Hours</p>
                    <div className='flex flex-col gap-5'>
                        <div className='flex flex-col gap-3'>
                            <p className='text-sm text-[#738195] font-normal'>Monday - Friday</p>
                            <p className='text-sm font-semibold '>02:30 <span
                                className='text-[#738195] '>————————</span> 11:00LT</p>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <p className='text-sm text-[#738195] font-normal'>Saturday</p>
                            <p className='text-sm font-semibold '>02:30 <span
                                className='text-[#738195] '>————————</span> 06:30LT</p>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <p className='text-sm text-[#738195] font-normal'>Sunday</p>
                            <p className='text-sm font-semibold '>we&apos;re<span
                                className='text-[#738195] '>——--——————</span>closed</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='h-[70vh] w-full'>
                <div className="relative h-full " style={{paddingBottom: '36.25%'}}>
                    <Map height={500}
                         defaultCenter={[8.999737, 38.7700249]}
                         defaultZoom={12}>
                        <Marker width={50} anchor={[9.012788, 38.775208]}/>
                        <Marker width={50} anchor={[8.9451929, 38.7851493]}/>
                        <Marker width={50} anchor={[8.984135960290898, 38.72723843279496]}/>
                        <Marker width={50} anchor={[8.999737, 38.7700249]}/>
                    </Map>
                </div>
            </div>

            <div data-aos="fade-up" data-aos-duration="1000" id="form-section"
                 className='w-full mt-10 flex justify-between items-center'>
                <p className='text-4xl lg:text-6xl text-[#001624] font-medium'>
                We&apos;d love to hear from you!
                </p>
            </div>

            <div className='h-2 border-b-gray-300 w-full border-b-2 -my-10 lg:my-1'></div>

            <div data-aos="fade-up" data-aos-duration="1000"
                 className='flex flex-col lg:flex-row gap-14 lg:gap-0 justify-between'>
                <p className=' text-[#738195] text-sm w-full lg:w-[28%]'>
                Fill in the form below to request details or to plan a tour of the Metro model apartment and its beautiful surroundings.
                </p>

                <div className='w-full lg:w-[66.5%]'>
                    <form className="flex flex-wrap gap-5 lg:gap-8 justify-between" onSubmit={submitInterest}>
                        <label className="text-gray-600 flex flex-col w-full lg:w-[45%] text-md font-medium">
                            Name
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="bg-transparent border-b-2 border-b-gray-500 focus:border-b-main  focus:outline-none"
                            />
                        </label>
                        <label className="text-gray-600 flex flex-col w-full lg:w-[45%] text-md font-medium">
                            Email address
                            <input
                                type='email'
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="bg-transparent border-b-2 border-b-gray-500 focus:border-b-main  focus:outline-none"
                            />
                        </label>

                        <label className="mt-[8px] text-gray-600 flex flex-col w-full text-md font-medium">
                            <select
                                name="propertyInterest"
                                value={formData.propertyInterest}
                                onChange={handleChange}
                                className='"bg-transparent border-b-2 border-b-gray-500 focus:border-b-main  focus:outline-none pb-5'>
                                <option disabled={true} selected={true}>Select the property of your interest</option>
                                <option>2 Bedroom Apartment</option>
                                <option>3 Bedroom Apartment</option>
                                <option>Penthouses</option>
                                <option>Villas</option>
                            </select>
                        </label>

                        <label className="text-gray-600  flex flex-col w-full lg:w-[45%] text-md font-medium">
                            Phone number
                            <input
                                type="text"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="bg-transparent border-b-2 border-b-gray-500 focus:border-b-main  focus:outline-none"
                            />
                        </label>
                        <label className="text-gray-600 flex flex-col mt-[8px] w-full lg:w-[45%] text-md font-medium">
                            <select
                                name="hearAboutUs"
                                value={formData.hearAboutUs}
                                onChange={handleChange}
                                className='"bg-transparent border-b-2 border-b-gray-500 focus:border-b-main focus:outline-none pb-5'>
                                <option selected={true} disabled={true}>How did you hear about Metro™?</option>
                                <option>Social Media</option>
                                <option>Friend</option>
                                <option>Facebook</option>
                                <option>Instagram</option>
                                <option>WhatsApp</option>
                                <option>LinkedIn</option>
                                <option>Telegram</option>
                                <option>Sales Agent</option>
                                <option>Other</option>
                            </select>
                        </label>
                        <label className="text-main flex flex-col w-full text-lg font-medium">
                            Write us a message or tell us about the property of your interest
                            <textarea
                                required={true}
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="bg-transparent border-b-2 border-b-[#D1D5DB] h-20 focus:border-b-main focus:outline-none"
                            />
                        </label>
                        <div className=' flex flex-col lg:flex-row gap-20 lg:gap-0 justify-between w-full'>
                            <p className='text-[#6B7280] text-sm font-normal w-full lg:w-[48%]'>
                                By sending this message you agree to Metro Real Estate <span
                                className='text-[#002740] font-medium'>Terms and Conditions.</span>
                            </p>
                            <button
                                disabled={loading}
                                type='submit'
                                className={`w-full lg:w-[48%] flex text-md justify-center gap-4 font-semibold h-[72px] ${loading ? 'bg-primaryHover' : 'bg-primary'} ${loading ? '' : 'hover:bg-primaryHover'} transition-all duration-200 items-center`}>
                                {loading ? 'Sending...' : 'SUBMIT MESSAGE'}
                                {!loading && <Image src={NextIcon} width={20} height={20} alt='next' />}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contact
