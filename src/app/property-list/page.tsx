'use client'
import Link from "next/link";
import {GoDownload} from "react-icons/go";
import React, {useState, useEffect} from "react";
import Image from "next/image";
import NextIcon from "../../../public/NextIcon.svg";
import RegisterInterest from "@/sections/RegisterInterest";
import Apartment1 from '../../../public/Apartment1.jpg'
import Apartment2 from '../../../public/Apartment2.jpg'
import FilterIcon from '../../../public/FilterIcon.svg'

const PropertyList = () => {
    const [isRegisterInterestOpen, setRegisterInterestOpen] = useState(false);
    const [isBulbulaChecked, setIsBulbulaChecked] = useState(false);
    const [isKazanchisChecked, setIsKazanchisChecked] = useState(false);
    const [isSarbetChecked, setIsSarbetChecked] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(true);
    const [isBulbulaApartmentsChecked, setIsBulbulaApartmentsChecked] = useState(false);
    const [isBulbulaVillasChecked, setIsBulbulaVillasChecked] = useState(false);
    const [isBulbulaTownhousesChecked, setIsBulbulaTownhousesChecked] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const apartments = [
        {
            id: 1,
            location: 'Kazanchis',
            title: '2 Bedroom Apartments',
            path: '/2-1A-bedroom-apartment',
            image: Apartment1
        },
        {
            id: 2,
            location: 'Kazanchis',
            title: '3 Bedroom Apartments',
            path: '/3-2A-bedroom-apartment',
            image: Apartment1
        },
        {
            id: 3,
            location: 'Kazanchis',
            title: '4 Bedroom Apartments',
            path: '/4-bedroom-apartments',
            image: Apartment1
        },
        {
            id: 4,
            location: 'Sarbet',
            title: '2 Bedroom Apartments',
            path: '/2-1A-bedroom-apartment',
            image: Apartment2
        },
        {
            id: 5,
            location: 'Sarbet',
            title: '3 Bedroom Apartments',
            path: '/3-2A-bedroom-apartment',
            image: Apartment1
        },
        {
            id: 6,
            location: 'Sarbet',
            title: '4 Bedroom Apartments',
            path: '/4-bedroom-apartments',
            image: Apartment2
        },
        {
            id: 7,
            location: 'Bulbula',
            title: '2 Bedroom Apartments',
            path: '/2-1A-bedroom-apartment',
            image: Apartment1
        },
        {
            id: 8,
            location: 'Bulbula',
            title: '3 Bedroom Apartments',
            path: '/3-2A-bedroom-apartment',
            image: Apartment1
        },
        {
            id: 9,
            location: 'Bulbula',
            title: '4 Bedroom Apartments',
            path: '/4-bedroom-apartments',
            image: Apartment2
        },
        {
            id: 10,
            location: 'Bulbula',
            title: 'G+1 Luxurious Villas',
            path: '/villas',
            image: Apartment2
        },
        {
            id: 11,
            location: 'Bulbula',
            title: 'G+2 Opulent Townhouse',
            path: '/townhouses',
            image: Apartment2
        },
    ];

    const imagesPerPage = 12;

    // Filtering logic
    const filteredApartments = apartments.filter(apartment => {
        if (isKazanchisChecked && apartment.location === 'Kazanchis') return true;
        if (isSarbetChecked && apartment.location === 'Sarbet') return true;
        if (isBulbulaChecked) {
            if (!isBulbulaApartmentsChecked && !isBulbulaVillasChecked && !isBulbulaTownhousesChecked) return apartment.location === 'Bulbula';
            if (isBulbulaApartmentsChecked && apartment.location === 'Bulbula' && apartment.title.includes('Bedroom Apartments')) return true;
            if (isBulbulaVillasChecked && apartment.location === 'Bulbula' && apartment.title.includes('Villas')) return true;
            if (isBulbulaTownhousesChecked && apartment.location === 'Bulbula' && apartment.title.includes('Townhouse')) return true;
        }
        return !isKazanchisChecked && !isSarbetChecked && !isBulbulaChecked;
    });

    const indexOfLastImage = currentPage * imagesPerPage;
    const indexOfFirstImage = indexOfLastImage - imagesPerPage;
    const currentApartments = filteredApartments.slice(indexOfFirstImage, indexOfLastImage);

    const totalPages = Math.ceil(filteredApartments.length / imagesPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    // Auto-check the nested checkboxes for Kazanchis and Sarbet
    useEffect(() => {
        if (isKazanchisChecked) {
            // Auto-check nested checkbox logic for Kazanchis (if needed)
        }
        if (isSarbetChecked) {
            // Auto-check nested checkbox logic for Sarbet (if needed)
        }
    }, [isKazanchisChecked, isSarbetChecked]);

    return (
        <div>
            <div className='container mx-auto mt-10 lg:-mt-0 pb-14 lg:py-16 flex flex-col gap-10 lg:gap-20 px-5 lg:px-0 items-end'>
                <div data-aos="fade-up" data-aos-duration="1000" className='flex justify-between items-center gap-20 w-full border-b-[2px] border-[#F7F8FA] pb-6'>
                    <p className='text-4xl lg:text-7xl font-medium leading-snug'>Metro™ Property List</p>
                    <div className='hidden lg:flex gap-3 items-end font-semibold justify-end'>
                        <Link href='/contact' className=''>
                            REACH OUT TO OUR TEAM
                        </Link>
                        <Image src={NextIcon} alt=''/>
                    </div>
                </div>
                <div data-aos="fade-up" data-aos-duration="1000" className='flex flex-col lg:flex-row justify-between items-start gap-10'>
                    <div className='flex flex-col w-full lg:w-[25%] justify-between lg:pr-10 text-md font-medium p-6 gap-10'>
                        <div className='flex w-full pr-10 text-lg lg:text-md font-semibold gap-10 uppercase'>
                            <p>Property List Filter</p>
                            <Image src={FilterIcon} alt='' className='cursor-pointer' onClick={() => setIsFilterOpen(!isFilterOpen)} />
                        </div>
                        {isFilterOpen && (
                            <>
                                <div>
                                    <p className='text-[#6B7280]'>Metro real-estate have enormous amount of properties with a variety of choices that can fit your lifestyle and standard of living.</p>
                                </div>
                                <div className='flex flex-col gap-y-6 mt-2'>
                                    <p className='text-lg text-[#00416B] font-semibold'>LOCATIONS</p>
                                    <div>
                                        <input
                                            type='checkbox'
                                            className='mr-2 cursor-pointer accent-primary'
                                            checked={isKazanchisChecked}
                                            onChange={(e) => setIsKazanchisChecked(e.target.checked)}
                                        />
                                        <label className='font-medium text-black text-2xl'> Kazanchis</label>
                                        <fieldset className='ml-5' disabled={!isKazanchisChecked}>
                                            <input type='checkbox' className='mr-2 cursor-pointer accent-primary' checked={isKazanchisChecked} readOnly />
                                            <label className='font-normal text-black text-lg'>Apartments</label>
                                        </fieldset>
                                    </div>
                                    <div className='border-t-2 border-t-[#dbe5f1]'></div>
                                    <div>
                                        <input
                                            type='checkbox'
                                            className='mr-2 cursor-pointer accent-primary'
                                            checked={isSarbetChecked}
                                            onChange={(e) => setIsSarbetChecked(e.target.checked)}
                                        />
                                        <label className='font-medium text-black text-2xl'> Sarbet</label>
                                        <fieldset className='ml-5' disabled={!isSarbetChecked}>
                                            <input type='checkbox' className='mr-2 cursor-pointer accent-primary' checked={isSarbetChecked} readOnly />
                                            <label className='font-normal text-black text-lg'>Apartments</label>
                                        </fieldset>
                                    </div>
                                    <div className='border-t-2 border-t-[#dbe5f1]'></div>
                                    <div>
                                        <input
                                            type='checkbox'
                                            className='mr-2 cursor-pointer accent-primary'
                                            checked={isBulbulaChecked}
                                            onChange={(e) => setIsBulbulaChecked(e.target.checked)}
                                        />
                                        <label className='font-medium text-black text-2xl'> Bulbula</label>
                                        <fieldset className='ml-5' disabled={!isBulbulaChecked}>
                                            <input
                                                type='checkbox'
                                                className='mr-2 cursor-pointer accent-primary'
                                                checked={isBulbulaApartmentsChecked}
                                                onChange={(e) => setIsBulbulaApartmentsChecked(e.target.checked)}
                                            />
                                            <label className='font-normal text-black text-lg'>Apartments</label>
                                        </fieldset>
                                        <fieldset className='ml-5' disabled={!isBulbulaChecked}>
                                            <input
                                                type='checkbox'
                                                className='mr-2 cursor-pointer accent-primary'
                                                checked={isBulbulaVillasChecked}
                                                onChange={(e) => setIsBulbulaVillasChecked(e.target.checked)}
                                            />
                                            <label className='font-normal text-black text-lg'>Villas</label>
                                        </fieldset>
                                        <fieldset className='ml-5' disabled={!isBulbulaChecked}>
                                            <input
                                                type='checkbox'
                                                className='mr-2 cursor-pointer accent-primary'
                                                checked={isBulbulaTownhousesChecked}
                                                onChange={(e) => setIsBulbulaTownhousesChecked(e.target.checked)}
                                            />
                                            <label className='font-normal text-black text-lg'>Townhouses</label>
                                        </fieldset>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <div className='flex flex-wrap justify-between gap-y-10 w-full lg:w-[66.5%]'>
                        {currentApartments.map((apartment, index) => (
                            <Link data-aos="fade-up" data-aos-duration="1000" className='w-full lg:w-[49.5%] flex flex-col gap-2' href={{
                                pathname: `/life-style/${apartment.path}`,
                                query: { location: apartment.location}
                            }} key={index}>
                                <div className='flex flex-col gap-2 w-full bg-cover bg-center' style={{backgroundImage: `url(${apartment.image.src})`, height: '400px'}}></div>
                                <p className='text-[#738195] font-normal text-sm'>{apartment.location}</p>
                                <p className='text-md font-medium'>{apartment.title}</p>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className='flex justify-center gap-5 w-full lg:w-[66.5%]'>
                    {pageNumbers.map(number => (
                        <button
                            key={number}
                            onClick={() => setCurrentPage(number)}
                            className={`w-8 h-8 rounded-full flex items-center text-[#002740] font-medium justify-center ${currentPage === number ? 'bg-primary text-white' : 'text-main font-medium bg-[#F3F4F6]'}`}
                        >
                            {number}
                        </button>
                    ))}
                </div>
            </div>
            {isRegisterInterestOpen ? <RegisterInterest isRegisterInterestOpen={isRegisterInterestOpen} setRegisterInterestOpen={setRegisterInterestOpen} /> : null}
        </div>
    )
}

export default PropertyList
