import React, {useEffect, useState} from 'react';
import NextIcon from '../../public/NextIcon.svg';
import Image from "next/image";
import {AiOutlineClose} from "react-icons/ai";
import Link from "next/link";
import {useLanguage} from '@/context/LanguageContext';
import {getCTASettings, CTASettings, getCTAText} from '@/lib/cta-utils';

const RegisterInterest = ({isRegisterInterestOpen, setRegisterInterestOpen, currentProjectSlug}: any) => {
    const {lang} = useLanguage();
    const [ctaSettings, setCtaSettings] = useState<CTASettings | null>(null);

    useEffect(() => {
        getCTASettings().then(setCtaSettings);
    }, []);

    const buttonHref = currentProjectSlug ? `/projects/${currentProjectSlug}` : '/projects/bulbula';
    const submitInterestText = getCTAText(ctaSettings, 'submitInterestButton', lang);
    const closeDialog = () => {
        setRegisterInterestOpen(false);
    };

    const [isRegistrationCompleted, setIsRegistrationCompleted] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        propertyInterest: '',
        howDidYouHear: ''
    })

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest('.register-interest-dialog')) {
                setRegisterInterestOpen(false);
            }
        };

        if (isRegisterInterestOpen) {
            document.addEventListener('click', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [isRegisterInterestOpen, setRegisterInterestOpen]);

    const formatFormData = (data: {
        [x: string]: any;
        name?: string;
        email?: string;
        phoneNumber?: string;
        propertyInterest?: string;
        howDidYouHear?: string;
    }) => {
        let formattedData = '';
        for (const key in data) {
            formattedData += `${key}: ${data[key]}\n`;
        }
        return formattedData;
    };

    const submitInterest = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await fetch('/api/register-interest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('SUCCESS', data)
                setLoading(false)
                setIsRegistrationCompleted(true)
            } else {
                console.log('FAILED', data)
                setLoading(false)
            }
        } catch (error) {
            console.log('FAILED', error)
            setLoading(false)
        }
    }
    return (
        <dialog
            style={{
                zIndex: 10000000
            }}
            open={isRegisterInterestOpen}
            className="fixed w-full h-full inset-0 bg-black bg-opacity-50 z-10 flex justify-center items-center"
        >
            {
                !isRegistrationCompleted ? (

                    <div
                        className="bg-white h-[95%] lg:h-[75vh] w-[90%] mx-auto p-5 my-20 px-5 lg:px-20 rounded shadow-lg flex flex-col gap-3 lg:gap-10 items-center overflow-y-auto register-interest-dialog"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className='w-full flex justify-end '>
                            <AiOutlineClose size={20} className='cursor-pointer' onClick={closeDialog}/>
                        </div>
                        <div className='w-full flex '>

                            <div className='w-full flex justify-between items-center'>
                                <p className='text-5xl lg:text-7xl text-[#001624] font-medium'>
                                    Register Interest
                                </p>
                            </div>

                        </div>
                        <div className='h-2 border-t-2 border-t-[#F3F4F6] w-full '></div>

                        <div className='flex flex-col lg:flex-row gap-5 lg:gap-0 justify-between'>
                            <p className='text-[#738195] text-sm w-full lg:w-[35%]'>
                                Use the form below to request more information, or to book a tour of the Metro model
                                apartment
                                and surrounding site.
                            </p>

                            <div className='w-full lg:w-[50%]'>
                                <form className="flex flex-wrap gap-5 lg:gap-8 justify-between"
                                      onSubmit={submitInterest}>
                                    <label
                                        className="text-gray-600 flex flex-col w-full lg:w-[45%] text-md font-medium">
                                        Name
                                        <input type="text" name="name"
                                               value={formData.name}
                                               onChange={handleChange}
                                               className="bg-transparent border-b-2 border-b-gray-500 focus:border-b-main  focus:outline-none"/>
                                    </label>
                                    <label
                                        className="text-gray-600 flex flex-col w-full lg:w-[45%] text-md font-medium">
                                        Email address
                                        <input type='email' name="email" value={formData.email}
                                               onChange={handleChange}
                                               className="bg-transparent border-b-2 border-b-gray-500 focus:border-b-main  focus:outline-none"/>
                                    </label>

                                    <label className="mt-[8px] text-gray-600 flex flex-col w-full text-md font-medium">
                                        {/*Select the property of your interest*/}
                                        <select
                                            name="propertyInterest"
                                            onChange={handleChange}
                                            value={formData.propertyInterest}
                                            className='"bg-transparent border-b-2 border-b-gray-500 focus:border-b-main  focus:outline-none pb-5'>
                                            <option disabled={false} selected={true}>Select the property of your
                                                interest
                                            </option>
                                            <option>2 Bedroom Apartment</option>
                                            <option>3 Bedroom Apartment</option>
                                            <option>Penthouses</option>
                                            <option>Villas</option>
                                        </select>
                                    </label>

                                    <label
                                        className="text-gray-600  flex flex-col w-full lg:w-[45%] text-md font-medium">
                                        Phone number
                                        <input type="text"
                                               name="phoneNumber"
                                               value={formData.phoneNumber}
                                               onChange={handleChange}
                                               className="bg-transparent border-b-2 border-b-gray-500 focus:border-b-main  focus:outline-none"/>
                                    </label>
                                    <label
                                        className="text-gray-600 flex flex-col mt-[8px] w-full lg:w-[45%] text-md font-medium">
                                        {/*How did you hear about Metro™?*/}
                                        <select
                                            name="howDidYouHear"
                                            value={formData.howDidYouHear}
                                            onChange={handleChange}
                                            className='"bg-transparent border-b-2 border-b-gray-500 focus:border-b-main focus:outline-none pb-5'>
                                            <option selected={true} disabled={true}>How did you hear about Metro™?
                                            </option>
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
                                    <div
                                        className='flex flex-col mt-6 lg:mt-10 lg:flex-row gap-8 lg:gap-0 justify-between w-full'>
                                        <p className='text-[#6B7280] text-sm font-normal w-full lg:w-[50%]'>
                                            By sending this message you agree to Metro Real Estate <Link href='/policy'
                                                                                                         onClick={closeDialog}
                                                                                                         className='text-[#002740] font-medium'>
                                            Terms and Conditions.
                                        </Link>
                                        </p>
                                        <button
                                            type='submit'
                                            className='flex text-md justify-center gap-4 font-semibold uppercase w-full lg:w-[45%] h-[72px] text-[16px]  hover:bg-primaryHover transition-all duration-200 bg-primary items-center'>
                                            {submitInterestText}
                                            <Image src={NextIcon} width={20} height={20} alt='next'/>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div
                        className="bg-white h-auto lg:h-[35vh] w-[80%] lg:w-[45%] mx-auto p-5 my-20 px-10 rounded shadow-lg flex flex-col gap-5 items-center overflow-y-auto register-interest-dialog"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <div className='w-full flex justify-end h-[5%]'>
                            <AiOutlineClose size={20} className='cursor-pointer' onClick={closeDialog}/>
                        </div>
                        <div className='flex flex-col gap-5 justify-evenly h-[80%]'>
                            <div className='w-full flex justify-between items-center'>
                                <p className='text-4xl text-[#001624] font-medium'>
                                    Register Interest
                                </p>
                            </div>
                            <div
                                className='flex flex-col lg:flex-row gap-3 lg:gap-0 justify-between w-full items-center'>
                                <div className='flex flex-col gap-6 w-full lg:w-[50%] '>
                                    <p className='text-[#002740] text-md'>
                                        Thanks for submitting your interest!
                                    </p>
                                    <p className='text-[#6B7280] text-sm font-normal'>
                                        We&apos;re thrilled to have you on board and excited to help you find your
                                        perfect property. We will get back to you shortly!
                                    </p>
                                </div>
                                <a href={buttonHref}
                                   type='submit'
                                   className='flex text-md justify-center gap-4 font-medium w-full lg:w-80 h-14 bg-primary hover:bg-primaryHover transition-all duration-200 items-center'>
                                    Discover Similar Properties
                                    <Image src={NextIcon} width={20} height={20} alt='next'/>
                                </a>
                            </div>
                        </div>
                    </div>
                )

            }
        </dialog>
    );
};

export default RegisterInterest;
