'use client';

import Header from "@/sections/Header";
import Footer from "@/sections/Footer";
import Image from "next/image";
import VideoIcon from "../../public/video.svg";
import ScrollDownIcon from "../../public/scrollDownIcon.svg";
import MessageIcon from "../../public/messageIcon.svg";
import React, { useContext, useState, useEffect } from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Message from '../sections/Chat/SendMessage';
import NextTopLoader from 'nextjs-toploader';
import AOS from "aos";
import "aos/dist/aos.css";
import { SplashPageContext } from "@/context/SplashPageContext";
import SplashPage from "@/sections/SplashPage";
import { usePathname } from 'next/navigation';

const client = new ApolloClient({
    uri: "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clv4wpwbk090307vzqd0mq1xb/master",
    cache: new InMemoryCache()
});

export function CustomeLayout({ children }: any) {
    useEffect(() => {
        AOS.init({
            easing: "ease-out-cubic",
            once: true,
            offset: 50,
        });
    }, []);

    const [projects, setProjects] = useState<any[]>([]);
    const [showPopup, setShowPopup] = useState<boolean>(false); // State for popup visibility

    const context = useContext(SplashPageContext);

    if (!context) {
        throw new Error('CustomLayout must be used within a SplashPageProvider');
    }

    const { splashPage } = context;

    const handleVideoAskClick = () => {
        setShowPopup(true); // Show popup on button click
    };

    const handleClosePopup = () => {
        setShowPopup(false); // Function to close popup
    };

    const pathname = usePathname();

    useEffect(() => {

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
        <ApolloProvider client={client}>
            <div className=''>
                <Header setProjects={setProjects} />
                {!showPopup && <button
                    style={{zIndex: 1000}}
                    className="bg-[#FFFFFF] fixed bottom-[6%] left-[3%] h-12 text-sm font-medium hover:bg-gray-100 text-black py-2 px-5 rounded-3xl flex items-center justify-around gap-4 w-auto"
                    onClick={handleVideoAskClick} // Add onClick handler
                >
                    <Image src={VideoIcon} width={20} height={20} alt='video ask'/>
                    Video Ask
                </button>}
                <button style={{
                    zIndex: 10000000000000000000
                }} className="fixed bottom-[6%] left-[50%] hidden lg:flex text-4xl cursor-none">
                    <Image src={ScrollDownIcon} width={25} height={25} alt='scroll down'/>
                </button>
                <Message />
                <NextTopLoader />

                {showPopup && ( // Conditional rendering for popup
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
                <Footer projects={projects} />
            </div>
        </ApolloProvider>
    );
}
