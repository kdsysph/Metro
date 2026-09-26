'use client'
import SplashLogo from '../../public/SplashLogo.svg'
import Image from "next/image";

const SplashPage = () =>{
    return(
        <div className='z-100000000000000 h-[100vh] bg-main w-full flex justify-center items-center'>
            <Image src={SplashLogo} alt=''/>
        </div>
    )
}

export default SplashPage