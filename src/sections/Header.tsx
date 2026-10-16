'use client'
import React, {useState, useEffect, useContext} from 'react';
import Image from "next/image";
import Logo from '../../public/logo.svg';
import {FiMenu} from 'react-icons/fi';
import NextIcon from '../../public/NextIcon.svg'
import Link from 'next/link';
import phoneCallIcon from '../../public/phoneCallIcon.svg'
import {usePathname} from 'next/navigation';
import RegisterInterest from "@/sections/RegisterInterest";
import {BsX} from 'react-icons/bs'
import {SplashPageContext} from "@/context/SplashPageContext";
import {useLanguage} from "@/context/LanguageContext";
import {getCTASettings, CTASettings, getCTAText} from '@/lib/cta-utils';

const Header = ({setProjects, projects}: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isRegisterInterestOpen, setRegisterInterestOpen] = useState(false);
    const [ctaSettings, setCtaSettings] = useState<CTASettings | null>(null);

    const currentPage = usePathname();
    const {lang, setLang} = useLanguage();

    useEffect(() => {
        getCTASettings().then(setCtaSettings);
    }, []);

    const registerInterestText = getCTAText(ctaSettings, 'registerInterestButton', lang);

    useEffect(() => {
        console.log(isMobileMenuOpen);
    }, [isMobileMenuOpen]);

    const toggleSidebar = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };


    const handleDropdownToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log("dropping down")
        const target = event.currentTarget;
        const dropdownMenu = target.nextElementSibling as HTMLElement;

        dropdownMenu.classList.toggle('hidden');

        if (!dropdownMenu.classList.contains('hidden')) {
            document.querySelectorAll('.dropdown-menu').forEach((menu) => {
                if (menu !== dropdownMenu) {
                    menu.classList.add('hidden');
                }
            });
        }
    };

    const handleClickOutsideMenu = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        const isDropdownToggle = target.matches('.dropdown-toggle');
        const isDropdownMenu = target.closest('.dropdown-menu');

        if (!isDropdownToggle && !isDropdownMenu) {
            document.querySelectorAll('.dropdown-menu').forEach((menu) => {
                menu.classList.add('hidden');
            });
        }
    };

    const handleMobileMenuToggle = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    // Attach event listeners
    useEffect(() => {
        const handleClickOutsideMenu = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            const isSideMenu = target.closest('.side-menu');
            const isDropdownToggle = target.matches('.dropdown-toggle');
            const isDropdownMenu = target.closest('.dropdown-menu');

            if (!isDropdownToggle && !isDropdownMenu) {
                document.querySelectorAll('.dropdown-menu').forEach((menu) => {
                    menu.classList.add('hidden');
                });
            }

        };

        document.addEventListener('mousedown', handleClickOutsideMenu);
        return () => {
            document.removeEventListener('mousedown', handleClickOutsideMenu);
        };
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isMobileMenuOpen]);

    const handleRegistrationOpen = () => {
        setRegisterInterestOpen(!isRegisterInterestOpen)
        setMobileMenuOpen(false)
    }

    const context = useContext(SplashPageContext);

    if (!context) {
        throw new Error('SomePage must be used within a SplashPageProvider');
    }

    const {setSplashPage} = context;

    useEffect(() => {
        // No more loading state needed since projects are fetched in CustomeLayout
    }, [setSplashPage]);

    return (
        <div style={{
            zIndex: 10000000
        }} className="sticky top-0 w-full bg-white flex justify-between py-8 text-#001624 h-[8vh] px-5 md:px-20 shadow-lg">
            <div className="container mx-auto w-full flex items-between md:justify-center justify-between items-center">
            <Link onClick={() => setMobileMenuOpen(false)} href='/' className='w-[20%] md:w-[30%] flex items-center'>
    <Image width={60} height={60} src={Logo} alt='Logo' className='border-none'/>
</Link>

                <div
                    className={`hidden w-[70%] md:flex md:flex-row flex-col items-center justify-between lg:space-x-1 navigation-menu pb-3 md:pb-0 ${isMobileMenuOpen ? '' : 'hidden'}`}>
                    {
                        projects && projects.map((project: any, index: number) => (
                            project.projectName === 'Bulbula' ? (
                                    <div key={index} className="relative z-100">
                                        <button
                                            className="dropdown-toggle py-2 hover:text-primary flex items-center gap-2 rounded"
                                            onClick={handleDropdownToggle}>
                                            <span className="pointer-events-none">{project.projectName}</span>
                                            <svg className="w-3 h-3 pointer-events-none"
                                                 xmlns="http://www.w3.org/2000/svg" width="24"
                                                 height="24"
                                                 viewBox="0 0 24 24">
                                                <title>chevron-down</title>
                                                <g fill="none">
                                                    <path
                                                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                                        stroke="currentColor"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    ></path>
                                                </g>
                                            </svg>
                                        </button>
                                        <div style={{zIndex: 1000}}
                                             className="dropdown-menu absolute hidden bg-white text-#001624 rounded-b-lg pb-2 w-40">

                                            <Link href={`/projects/${project.slug?.current}`}
                                                  className="block px-6 py-2 hover:bg-gray-100">
                                                About Site
                                            </Link>
                                            <Link href="/life-style/villas"
                                                  className="block px-6 py-2 hover:bg-gray-100">
                                                Villas
                                            </Link>
                                            <Link href="/life-style/townhouses"
                                                  className="block px-6 py-2 hover:bg-gray-100">
                                                Town Houses
                                            </Link>
                                            <Link href="/life-style/4-bedroom-apartments?location=Bulbula"
                                                  className="block px-6 py-2 hover:bg-gray-100">
                                                Apartments
                                            </Link>
                                        </div>
                                    </div>
                                ) :
                                <Link href={`/projects/${project.slug?.current}`} key={project._id || project.id || index}
                                      className={`py-2 block hover:text-primary ${currentPage === project.slug?.current ? 'text-primary' : ''}`}>
                                    {project.projectName}
                                </Link>
                        ))
                    }
                    <Link href="/gallery"
                          className={`py-2 px-3 block hover:text-primary ${currentPage === '/gallery' ? 'text-primary' : ''}`}>
                        Gallery
                    </Link>
                    <Link href="/news-room"
                          className={`py-2 px-3 block hover:text-primary ${currentPage === '/news-room' ? 'text-primary' : ''}`}>
                        News Room
                    </Link>
                    <Link href="/property-list"
                          className={`hidden py-2 block hover:text-primary ${currentPage === '/property-list' ? 'text-primary' : ''}`}>
                        Properties
                    </Link>
                    <Link href="/about-metro"
                          className={`py-2 block hover:text-primary ${currentPage === '/about-metro' ? 'text-primary' : ''}`}>
                        About Us
                    </Link>
                    <Link href="/contact"
                          className={`py-2 block hover:text-primary ${currentPage === '/contact' ? 'text-primary' : ''}`}>
                        Contact
                    </Link>
                    {/*<Image src={phoneCallIcon} alt='call us'/>*/}
                    <div className="relative z-100">
                        <button className="dropdown-toggle py-2 px-3 hover:text-primary flex items-center gap-2 rounded"
                                onClick={handleDropdownToggle}>
                            <span className="pointer-events-none">{lang === 'am' ? 'AM' : 'EN'}</span>
                            <svg className="w-3 h-3 pointer-events-none" xmlns="http://www.w3.org/2000/svg" width="24"
                                 height="24"
                                 viewBox="0 0 24 24">
                                <title>chevron-down</title>
                                <g fill="none">
                                    <path
                                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                </g>
                            </svg>
                        </button>
                        <div className="dropdown-menu absolute hidden bg-white text-#001624 rounded-b-lg pb-2 w-32">
                            <button onClick={() => { setLang('en'); document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.add('hidden')); }} className={`block w-full text-left px-6 py-2 hover:bg-gray-100 ${lang === 'en' ? 'text-primary font-semibold' : ''}`}>
                                English
                            </button>
                            <button onClick={() => { setLang('am'); document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.add('hidden')); }} className={`block w-full text-left px-6 py-2 hover:bg-gray-100 ${lang === 'am' ? 'text-primary font-semibold' : ''}`}>
                                Amharic
                            </button>
                        </div>
                    </div>
                    <div className=''>
                        <button
                            onClick={() => setRegisterInterestOpen(true)}
                            className='flex text-sm justify-center text-black font-semibold px-4 py-4 w-30 h-10 bg-primary hover:bg-primaryHover transition-all duration-200 items-center'>
                            {registerInterestText}
                            <Image src={NextIcon} width={20} height={20} alt='next'/>
                        </button>
                    </div>

                </div>


                {/*mobile*/}



                <div
                    style={{zIndex: 1000}}
                    className={`pl-3 flex md:hidden text-white absolute bg-main w-full side-menu h-[92vh] top-[8vh] flex-col items-start justify-start gap-6 pt-14 md:space-x-1 pb-3 md:pb-0 transition-all duration-300 ease-in ${isMobileMenuOpen ? 'opacity-100 flex' : 'opacity-0 hidden'}`}>                    {/*<a href="#" className="py-2 px-3 block">*/}
                    {
                        projects && projects.map((project: any, index: number) => (
                            project.projectName === 'Bulbula' ? (
                                    <div key={index} className="relative z-100">
                                        <button
                                            className="dropdown-toggle py-2 hover:text-primary flex items-center gap-2 rounded"
                                            onClick={handleDropdownToggle}>

                                            <span
                                                className="pointer-events-none hover:bg-gray-800 text-xl flex gap-2 items-center px-3 w-full hover:text-primary"><span
                                                className='text-[#6B7280]'>02</span>{project.projectName}</span>
                                            <svg className="w-3 h-3 pointer-events-none"
                                                 xmlns="http://www.w3.org/2000/svg" width="24"
                                                 height="24"
                                                 viewBox="0 0 24 24">
                                                <title>chevron-down</title>
                                                <g fill="none">
                                                    <path
                                                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                                        stroke="currentColor"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    ></path>
                                                </g>
                                            </svg>
                                        </button>
                                        <div style={{zIndex: 1000}}
                                             className="dropdown-menu absolute hidden bg-white text-#001624 rounded-b-lg pb-2 w-80">

                                            <Link onClick={() => setMobileMenuOpen(false)}
                                                  href={`/projects/${project.slug?.current}`}
                                                  className="hover:bg-gray-800 text-xl flex gap-2 items-center py-2 px-6 w-full hover:text-primary ">
                                                About Site
                                            </Link>
                                            <Link onClick={() => setMobileMenuOpen(false)} href="/life-style/villas"
                                                  className="hover:bg-gray-800 text-xl flex gap-2 items-center py-2 px-6 w-full hover:text-primary ">
                                                Villas
                                            </Link>
                                            <Link onClick={() => setMobileMenuOpen(false)} href="/life-style/townhouses"
                                                  className="hover:bg-gray-800 text-xl flex gap-2 items-center py-2 px-6 w-full hover:text-primary ">
                                                Town Houses
                                            </Link>
                                            <Link onClick={() => setMobileMenuOpen(false)} href="/life-style/4-bedroom-apartments?location=Bulbula"
                                                  className="hover:bg-gray-800 text-xl flex gap-2 items-center py-2 px-6 w-full hover:text-primary ">
                                                Apartments
                                            </Link>
                                        </div>
                                    </div>
                                ) :
                                <Link onClick={() => setMobileMenuOpen(false)} href={`/projects/${project.slug?.current}`}
                                      key={project._id || project.id || index}
                                      className={`hover:bg-gray-800 text-xl flex gap-2 items-center py-2 px-3 w-full hover:text-primary ${currentPage === project.slug?.current ? 'text-primary' : ''}`}>
                                    <span className='text-[#6B7280]'>0{index + 1}</span>
                                    {project.projectName}
                                </Link>
                        ))
                    }
                    <Link onClick={() => setMobileMenuOpen(false)} href="/gallery"
                          className={`hover:bg-gray-800 text-xl flex gap-2 items-center py-2 px-3 w-full hover:text-primary ${currentPage === '/gallery' ? 'text-primary' : ''}`}>
                        <span className='text-[#6B7280]'>03</span>
                        Gallery
                    </Link>
                    <Link onClick={() => setMobileMenuOpen(false)} href="/news-room"
                          className={`hover:bg-gray-800 text-xl flex gap-2 items-center py-2 px-3 w-full hover:text-primary ${currentPage === '/news-room' ? 'text-primary' : ''}`}>
                        <span className='text-[#6B7280]'>04</span>
                        News Room
                    </Link>
                    <Link onClick={() => setMobileMenuOpen(false)} href="/property-list"
                          className={`hidden hover:bg-gray-800 text-xl flex gap-2 items-center py-2 px-3 w-full hover:text-primary ${currentPage === '/property-list' ? 'text-primary' : ''}`}>
                        <span className='text-[#6B7280]'>05</span>
                        Properties
                    </Link>
                    <Link onClick={() => setMobileMenuOpen(false)} href="/about-metro"
                          className={`hover:bg-gray-800 text-xl flex gap-2 items-center w-full py-2 px-3 hover:text-primary ${currentPage === '/about-metro' ? 'text-primary' : ''}`}>
                        <span className='text-[#6B7280]'>06</span>
                        About Metro
                    </Link>
                    <Link onClick={() => setMobileMenuOpen(false)} href="/contact"
                          className={`hover:bg-gray-800 text-xl flex gap-2 items-center w-full py-2 px-3 hover:text-primary ${currentPage === '/contact' ? 'text-primary' : ''}`}>
                        <span className='text-[#6B7280]'>07</span>
                        Contact
                    </Link>

                    <div className='relative pr-4 pl-1 w-full'>
                        <button
                            onClick={handleRegistrationOpen}
                            className='flex text-xl justify-center text-black font-semibold px-4 py-8 w-full h-10 bg-primary hover:bg-primaryHover transition-all duration-200 items-center'>
                            {registerInterestText}
                            <Image src={NextIcon} width={20} height={20} alt='next'/>
                        </button>
                    </div>

                </div>


                <div className="md:hidden relative z-100">
                    <button className="dropdown-toggle py-2 px-3 hover:text-primary flex items-center gap-2 rounded"
                            onClick={handleDropdownToggle}>
                        <span className="pointer-events-none">{lang === 'am' ? 'AM' : 'EN'}</span>
                        <svg className="w-3 h-3 pointer-events-none" xmlns="http://www.w3.org/2000/svg" width="24"
                             height="24"
                             viewBox="0 0 24 24">
                            <title>chevron-down</title>
                            <g fill="none">
                                <path
                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></path>
                            </g>
                        </svg>
                    </button>
                    <div className="dropdown-menu absolute hidden bg-main text-white rounded-b-lg pb-2 w-32">
                        <button onClick={() => { setLang('en'); document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.add('hidden')); }} className={`block w-full text-left px-6 py-2 hover:bg-gray-800 ${lang === 'en' ? 'text-primary font-semibold' : ''}`}>
                            English
                        </button>
                        <button onClick={() => { setLang('am'); document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.add('hidden')); }} className={`block w-full text-left px-6 py-2 hover:bg-gray-800 ${lang === 'am' ? 'text-primary font-semibold' : ''}`}>
                            Amharic
                        </button>
                    </div>
                </div>
                <a href="tel:+25193 806 0606"
                   className='md:hidden flex text-sm justify-center text-black font-semibold px-4 py-4 w-30 h-10 bg-primary hover:bg-primaryHover transition-all duration-200 items-center'>
                    CALL METRO
                    <Image src={phoneCallIcon} width={30} height={30} alt='next'/>
                </a>
                <button className="md:hidden" onClick={toggleSidebar}>
                    {
                        isMobileMenuOpen ? <BsX size={32}/> : <FiMenu size={32}/>
                    }
                    {/*<FiMenu size={24}/>*/}
                </button>
            </div>
            {
                isRegisterInterestOpen ? <RegisterInterest isRegisterInterestOpen={isRegisterInterestOpen}
                                                           setRegisterInterestOpen={setRegisterInterestOpen}/> : null

            }
        </div>
    );
};

export default Header;