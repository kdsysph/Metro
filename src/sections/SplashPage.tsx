'use client'
import SplashLogo from '../../public/SplashLogo.svg'
import Image from "next/image";
import { useContext, useEffect } from 'react';
import { SplashPageContext } from '@/context/SplashPageContext';

const SplashPage = () => {
    const context = useContext(SplashPageContext);

    useEffect(() => {
        const timer = setTimeout(() => {
            context?.setSplashPage(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, [context]);

    return (
        <div className='z-100000000000000 h-[100vh] bg-main w-full flex justify-center items-center'>
            <Image src={SplashLogo} alt=''/>
        </div>
    )
}

export default SplashPage
