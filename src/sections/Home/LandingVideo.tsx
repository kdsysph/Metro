'use client'
import React, {RefObject} from 'react';
import Image from 'next/image';
import ScrollDownIcon from '../../../public/scrollDownIcon.svg';

interface LandingVideoProps {
    nextSectionRef: RefObject<HTMLElement>;
    heroHeadlineText?: string;
    desktopVideoPath?: string;
    mobileVideoPath?: string;
}

const LandingVideo: React.FC<LandingVideoProps> = ({nextSectionRef, heroHeadlineText, desktopVideoPath, mobileVideoPath}) => {
    const headline = heroHeadlineText || 'Elegance & Tranquility';
    const desktopSrc = desktopVideoPath || '/Header%20Video%20Desktop.mp4';
    const mobileSrc = mobileVideoPath || '/Header%20Video%20Mobile.mp4';

    const handleScrollDown = () => {
        nextSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="relative">
            <div className="h-[92vh] relative">
                {/* Desktop video */}
                <video className="absolute top-0 left-0 w-full h-full object-cover hidden md:block" loop muted autoPlay>
                    <source src={desktopSrc} type="video/mp4"/>
                </video>
                {/* Mobile video */}
                <video className="absolute top-0 left-0 w-full h-full object-cover md:hidden" loop muted autoPlay>
                    <source src={mobileSrc} type="video/mp4"/>
                </video>
                <div className="absolute top-0 left-0 w-full h-full bg-[#041428] opacity-60"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full">
                    <h1 className="font-bodoni text-white text-5xl md:text-9xl font-regular text-center">
                        {headline}
                    </h1>
                </div>
                {/* Scroll-down icon anchored to bottom-center */}
                <button
                    onClick={handleScrollDown}
                    className="absolute bottom-6 left-1/2 transform -translate-x-1/2 cursor-pointer"
                    aria-label="Scroll to next section"
                >
                    <Image src={ScrollDownIcon} width={25} height={25} alt="scroll down"/>
                </button>
            </div>
        </div>
    );
}

export default LandingVideo;
