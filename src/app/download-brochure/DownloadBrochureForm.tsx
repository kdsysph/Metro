'use client'
import Image from "next/image";
import NextIcon from "../../../public/NextIcon.svg";
import React, {useState} from "react";
import {FaAsterisk} from "react-icons/fa6";
import Link from "next/link";
import {useLanguage} from '@/context/LanguageContext';
import {localizeField} from '@/lib/localize';

interface DownloadBrochureFormProps {
    brochureData: any;
}

const DownloadBrochureForm: React.FC<DownloadBrochureFormProps> = ({ brochureData }) => {
    const {lang} = useLanguage();
    const [formData, setFormData] = useState({fullName: '', email: '', propertyInterest: ''});

    const heading = localizeField(brochureData, 'heading', lang) || 'Download Brochure';
    const description = localizeField(brochureData, 'description', lang) || 'Are you ready to find your perfect place? Download Metro Real Estate comprehensive brochure to equip you with the knowledge you need to make informed real estate decisions.';
    const fullNameLabel = localizeField(brochureData, 'fullNameLabel', lang) || 'Full name';
    const emailLabel = localizeField(brochureData, 'emailLabel', lang) || 'Email address';
    const propertySelectLabel = localizeField(brochureData, 'propertySelectLabel', lang) || 'Select the property of your interest';
    const propertyOptions = brochureData?.propertyOptions || [];
    const termsText = localizeField(brochureData, 'termsText', lang) || 'By sending this message you agree to Metro Real Estate';
    const termsLinkText = localizeField(brochureData, 'termsLinkText', lang) || 'Terms and Conditions.';
    const submitButtonText = localizeField(brochureData, 'submitButtonText', lang) || 'DOWNLOAD BROCHURE';

    const submitInterest = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('submitting interest');
        
        // Find the selected property option to get its brochure file
        const selectedProperty = propertyOptions.find((opt: any) => 
            (lang === 'am' ? opt.propertyName_am : opt.propertyName) === formData.propertyInterest
        );
        
        const pdfUrl = selectedProperty?.brochureFile?.asset?.url || '/brochure.pdf';
        const fileName = selectedProperty?.brochureFile?.asset?.originalFilename || 'brochure.pdf';
        
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const handleChange = (e: any) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    return (
        <div>
            <div
                className="container mx-auto bg-white w-full my-20 px-5 lg:px-0 rounded flex flex-col gap-10 justify-center items-center"
                onClick={(e) => e.stopPropagation()}
            >
                <div className='w-full flex justify-between items-center'>
                    <p className='text-4xl lg:text-5xl text-[#001624] font-medium'>
                        {heading}
                    </p>
                </div>

                <div className='h-2 my-5 border-t-2 border-t-[#F3F4F6] w-full'></div>

                <div className='flex flex-col lg:flex-row gap-5 lg:gap-0 justify-between w-full'>
                    <p className='text-[#738195] text-sm w-full lg:w-[25%]'>
                        {description}
                    </p>

                    <div className='w-full lg:w-[66.5%]'>
                        <form className="flex flex-wrap gap-8 justify-between" onSubmit={submitInterest}>
                            <label
                                className="flex flex-col w-full lg:w-[48%] text-lg text-main font-medium">
                                <div className='flex gap-2 items-center'>
                                    {fullNameLabel} <FaAsterisk size={11} color='#FFCF01'/>
                                </div>
                                <input required={true} type="text" name="fullName" value={formData.fullName} onChange={handleChange}
                                       className="bg-transparent border-b-2 border-b-[#D1D5DB] focus:border-b-main focus:outline-none"/>
                            </label>
                            <label
                                className="flex flex-col w-full lg:w-[48%] text-lg font-medium">
                                <div className='flex gap-2 items-center'>
                                    {emailLabel} <FaAsterisk size={11} color='#FFCF01'/>
                                </div>
                                <input required={true} type='email' name="email" value={formData.email} onChange={handleChange}
                                       className="bg-transparent border-b-2 border-b-[#D1D5DB] focus:border-b-main focus:outline-none"/>
                            </label>

                            <label className="text-main flex flex-col w-full text-lg font-medium">
                                <div className='flex gap-2 items-center'>
                                    {propertySelectLabel} <FaAsterisk size={11} color='#FFCF01'/>
                                </div>
                                <select
                                    required={true}
                                    name="propertyInterest"
                                    value={formData.propertyInterest}
                                    onChange={handleChange}
                                    className='"bg-transparent border-b-2 border-b-[#D1D5DB] focus:border-b-main focus:outline-none pb-2'>
                                    <option disabled value="">{propertySelectLabel}</option>
                                    {propertyOptions.map((opt: any, i: number) => (
                                        <option key={i} value={lang === 'am' ? opt.propertyName_am : opt.propertyName}>
                                            {lang === 'am' ? opt.propertyName_am : opt.propertyName}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <div className=' flex flex-col lg:flex-row gap-20 lg:gap-0 justify-between w-full'>
                                <p className='text-[#6B7280] text-sm font-normal w-full lg:w-[48%]'>
                                    {termsText} <Link href='/policy'
                                    className='text-[#002740] font-medium'>
                                {termsLinkText}
                            </Link>
                                </p>
                                <button
                                    type='submit'
                                    className='w-full lg:w-[48%] flex text-md justify-center gap-4 font-medium h-14 bg-primary hover:bg-primaryHover transition-all duration-200 items-center'>
                                    {submitButtonText}
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

export default DownloadBrochureForm;
