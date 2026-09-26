'use client'
import React, {RefObject, useState, useRef } from 'react';
import Image from "next/image";
import PlayButton from '../../../public/playButton.svg';
import { FiChevronDown } from 'react-icons/fi';
import ScrollDownIcon from '../../../public/scrollDownIcon.svg';
import VideoIcon from '../../../public/video.svg';
import MessageIcon from '../../../public/messageIcon.svg'
interface LandingVideoProps {
    nextSectionRef: RefObject<HTMLElement>;
}
const LandingVideo: React.FC<LandingVideoProps> = ({nextSectionRef}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const handlePlayButton = () => {
        if (isPlaying) {
            videoRef.current && videoRef.current.pause();
        } else {
            videoRef.current && videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleScrollDown = () => {
        if (!nextSectionRef.current) return;
        nextSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="relative">
  <div className="h-[92vh] relative">
    <video ref={videoRef} className="absolute top-0 left-0 w-full h-full object-cover" loop muted autoPlay>
      <source src="/Header%20Video%20Desktop.mp4" type="video/mp4" />
    </video>
    <div className="absolute top-0 left-0 w-full h-full bg-[#041428] opacity-60"></div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full">
    <h1 className="font-bodoni text-white text-5xl md:text-9xl font-regular text-center">Elegance & Tranquility</h1>
    </div>
  </div>
</div>

    )
}

export default LandingVideo