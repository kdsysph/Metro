'use client'

import {useState, useEffect, useRef} from "react";
import Image from "next/image";
import MessageIcon from "../../../public/messageIcon.svg";
import React from "react";
import WhatsAppIcon from '../../../public/whatsupIcon.svg';
import TelegramIcon from '../../../public/telegramIcon.svg';
import Link from "next/link";

const Message = () => {

    const [isChatOptionOpen, setIsChatOptionOpen] = useState(false);

    const ref = useRef(null);

    const handleClickOutside = (event:any) => {
        // @ts-ignore
        if (ref.current && !ref.current.contains(event.target)) {
            setIsChatOptionOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div style={{zIndex: 1000}} className='w-auto h-auto fixed bottom-[6%] right-[3%] flex justify-end flex-col items-end' ref={ref}>
            {
                isChatOptionOpen ? (
                    <div className="relative bottom-14 flex flex-col flex-between gap-10">
                        <Link href='https://wa.me/+251938060606' target={'_blank'} className='flex gap-10 cursor-pointer'>
                            <a
                                className='bg-[#FFFFFF] h-12 text-sm font-medium hover:bg-gray-100 text-black px-5 rounded-3xl flex items-center justify-around gap-4 w-auto'>WhatsApp
                            </a>
                            <Image src={WhatsAppIcon} alt='whatsApp'/>
                        </Link>

                        <Link href='https://t.me/mikreg' target={'_blank'} className='flex gap-10 cursor-pointer'>
                            <a
                                className='bg-[#FFFFFF] h-12 text-sm font-medium hover:bg-gray-100 text-black px-5 rounded-3xl flex items-center justify-around gap-4 w-auto'>Telegram
                            </a>
                            <Image src={TelegramIcon} alt='telegram'/>
                        </Link>
                    </div>
                ) : null
            }
            <button
                onClick={() => setIsChatOptionOpen(!isChatOptionOpen)}
                className="bg-[#FFFFFF] h-14 w-14 hover:bg-gray-100 text-black font-semibold rounded-full flex justify-center items-center">
                <Image src={MessageIcon} width={40} height={40} alt='video ask'/>
            </button>
        </div>
    )
}

export default Message;
