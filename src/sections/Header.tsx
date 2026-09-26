'use client'
import React, {useState, useEffect, useContext} from 'react';
import Image from "next/image";
import Logo from '../../public/logo.svg';
import {FiMenu} from 'react-icons/fi';
import NextIcon from '../../public/NextIcon.svg'
import Link from 'next/link';
import phoneCallIcon from '../../public/phoneCallIcon.svg'
import {usePathname} from 'next/navigation';
import {useQuery, gql} from "@apollo/client";
import RegisterInterest from "@/sections/RegisterInterest";
import {BsX} from 'react-icons/bs'
import {SplashPageContext} from "@/context/SplashPageContext";

const QUERY = gql`
                {
          projects {
            id
            projectName
            slug
          }
        }
    `
const Header = ({setProjects}: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    // const router = useRouter(); // Add this line to get the current route
    const [isRegisterInterestOpen, setRegisterInterestOpen] = useState(false);

    const currentPage = usePathname();

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

    const {data, loading, error} = useQuery(QUERY);

    // if (loading){
    //     return <div>Loading...</div>
    // }

    // if (error) {
    //     console.log(error)
    //     return <div>Error...</div>
    // }

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isMobileMenuOpen]);

    console.log(data)
    setProjects(data?.projects);

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
        if (loading) {
            setSplashPage(true);
        } else {
            setSplashPage(false);
        }
    }, [setSplashPage, loading]);

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
                        loading ? <div className={`dropdown-menu flex justify-center items-center`}>

                                <svg aria-hidden="true"
                                     className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                     viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"/>
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill"/>
                                </svg>
                            </div>
                            :
                            data && data.projects.map((project: any, index: number) => (
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

                                                <Link href={`/projects/${project.slug}`}
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
                                                <Link href="/property-list"
                                                      className="block px-6 py-2 hover:bg-gray-100">
                                                    Apartments
                                                </Link>
                                            </div>
                                        </div>
                                    ) :
                                    <Link href={`/projects/${project.slug}`} key={project.id}
                                          className={`py-2 block hover:text-primary ${currentPage === project.slug ? 'text-primary' : ''}`}>
                                        {project.projectName}
                                    </Link>
                            ))
                    }
                    <Link href="/gallery"
                          className={`py-2 px-3 block hover:text-primary ${currentPage === '/gallery' ? 'text-primary' : ''}`}>
                        Gallery
                    </Link>
                    <Link href="/property-list"
                          className={`py-2 block hover:text-primary ${currentPage === '/property-list' ? 'text-primary' : ''}`}>
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
                            <span className="pointer-events-none">EN</span>
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
                            <Link href="#" className="block px-6 py-2 hover:bg-gray-100">
                                English
                            </Link>
                            <Link href="#" className="block px-6 py-2 hover:bg-gray-100">
                                Amharic
                            </Link>
                            {/*<Link href="#" className="block px-6 py-2 hover:bg-gray-800">*/}
                            {/*    Bulbula*/}
                            {/*</Link>*/}
                        </div>
                    </div>
                    <div className=''>
                        <button
                            onClick={() => setRegisterInterestOpen(true)}
                            className='flex text-sm justify-center text-black font-semibold px-4 py-4 w-30 h-10 bg-primary hover:bg-primaryHover transition-all duration-200 items-center'>
                            REGISTER INTEREST
                            <Image src={NextIcon} width={20} height={20} alt='next'/>
                        </button>
                    </div>

                </div>


                {/*mobile*/}


                <div
                    style={{zIndex: 1000}}
                    className={`pl-3 flex md:hidden text-white absolute bg-main w-full side-menu h-[92vh] top-[8vh] flex-col items-start justify-start gap-6 pt-14 md:space-x-1 pb-3 md:pb-0 transition-all duration-300 ease-in ${isMobileMenuOpen ? 'opacity-100 flex' : 'opacity-0 hidden'}`}>                    {/*<a href="#" className="py-2 px-3 block">*/}
                    {
                        loading ? <div className={`dropdown-menu flex justify-center items-center`}>

                                <svg aria-hidden="true"
                                     className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                     viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"/>
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill"/>
                                </svg>
                            </div>
                            :
                            data && data.projects.map((project: any, index: number) => (
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
                                                      href={`/projects/${project.slug}`}
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
                                                <Link onClick={() => setMobileMenuOpen(false)} href="/property-list"
                                                      className="hover:bg-gray-800 text-xl flex gap-2 items-center py-2 px-6 w-full hover:text-primary ">
                                                    Apartments
                                                </Link>
                                            </div>
                                        </div>
                                    ) :
                                    <Link onClick={() => setMobileMenuOpen(false)} href={`/projects/${project.slug}`}
                                          key={project.id}
                                          className={`hover:bg-gray-800 text-xl flex gap-2 items-center py-2 px-3 w-full hover:text-primary ${currentPage === project.slug ? 'text-primary' : ''}`}>
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
                          className={`hover:bg-gray-800 text-xl flex gap-2 items-center py-2 px-3 w-full hover:text-primary ${currentPage === '/property-list' ? 'text-primary' : ''}`}>
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
                            REGISTER INTEREST
                            <Image src={NextIcon} width={20} height={20} alt='next'/>
                        </button>
                    </div>

                </div>


                <div className="md:hidden relative z-100">
                    <button className="dropdown-toggle py-2 px-3 hover:text-primary flex items-center gap-2 rounded"
                            onClick={handleDropdownToggle}>
                        <span className="pointer-events-none">EN</span>
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
                        <Link href="#" className="block px-6 py-2 hover:bg-gray-800">
                            English
                        </Link>
                        <Link href="#" className="block px-6 py-2 hover:bg-gray-800">
                            Amharic
                        </Link>
                        {/*<Link href="#" className="block px-6 py-2 hover:bg-gray-800">*/}
                        {/*    Bulbula*/}
                        {/*</Link>*/}
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