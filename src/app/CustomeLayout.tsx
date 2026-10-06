'use client';

import Header from "@/sections/Header";
import Footer from "@/sections/Footer";
import Image from "next/image";
import VideoIcon from "../../public/video.svg";
import MessageIcon from "../../public/messageIcon.svg";
import React, { useContext, useState, useEffect } from "react";
import Message from '../sections/Chat/SendMessage';
import NextTopLoader from 'nextjs-toploader';
import AOS from "aos";
import "aos/dist/aos.css";
import { SplashPageContext } from "@/context/SplashPageContext";
import { LanguageProvider } from "@/context/LanguageContext";
import SplashPage from "@/sections/SplashPage";
import { usePathname } from 'next/navigation';
import { sanityClient } from '@/lib/sanity';
import { queries } from '@/lib/groq-queries';

export function CustomeLayout({ children }: any) {
    useEffect(() => {
        AOS.init({
            easing: "ease-out-cubic",
            once: true,
            offset: 50,
        });
    }, []);

    const [projects, setProjects] = useState<any[]>([]);
    const [siteSettings, setSiteSettings] = useState<any>(null);
    const [showPopup, setShowPopup] = useState<boolean>(false);

    const context = useContext(SplashPageContext);

    if (!context) {
        throw new Error('CustomLayout must be used within a SplashPageProvider');
    }

    const { splashPage } = context;

    const handleVideoAskClick = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const pathname = usePathname();

    // Fetch projects and site settings for header/footer navigation
    useEffect(() => {
        async function fetchData() {
            try {
                const [projectsData, settingsData] = await Promise.all([
                    sanityClient.fetch(queries.allProjects),
                    sanityClient.fetch(queries.siteSettings),
                ]);
                setProjects(projectsData);
                setSiteSettings(settingsData);
            } catch (error) {
                console.error('Error fetching layout data:', error);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
        if (!hasVisitedBefore) {
            if (pathname === '/') {
                console.log("home")
                setShowPopup(true);
            } else {
                console.log("other")
                setShowPopup(false);
            }
            localStorage.setItem('hasVisitedBefore', 'true');
        } else {
            setShowPopup(false);
            console.log("not first time")
        }
    }, [pathname]);

    return (
        <LanguageProvider>
        <div className=''>
            <Header setProjects={setProjects} projects={projects} />
            {!showPopup && <button
                style={{zIndex: 1000}}
                className="bg-[#FFFFFF] fixed bottom-[6%] left-[3%] h-12 text-sm font-medium hover:bg-gray-100 text-black py-2 px-5 rounded-3xl flex items-center justify-around gap-4 w-auto"
                onClick={handleVideoAskClick}
            >
                <Image src={VideoIcon} width={20} height={20} alt='video ask'/>
                Video Ask
            </button>}

            <Message />
            <NextTopLoader />

            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-start z-50">
                    <div className="bg-white p-4 rounded-lg relative w-full max-w-[275px] mb-4 ml-4">
                        <iframe src="https://www.videoask.com/fqrpu56gk" allow="camera *; microphone *; autoplay *; encrypted-media *; fullscreen *; display-capture *;" width="100%" height="404px"></iframe>
                        <button onClick={handleClosePopup} className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded">Close</button>
                    </div>
                </div>
            )}

            {splashPage ? (
                <div className="splash-screen">
                    <SplashPage />
                </div>
            ) : (
                <div className="main-content font-sans">
                    {children}
                </div>
            )}
            <Footer projects={projects} siteSettings={siteSettings} />
        </div>
        </LanguageProvider>
    );
}