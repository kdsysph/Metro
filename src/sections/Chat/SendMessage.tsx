'use client'

import {useState, useEffect, useRef} from "react";
import Image from "next/image";
import MessageIcon from "../../../public/messageIcon.svg";
import React from "react";
import WhatsAppIcon from '../../../public/whatsupIcon.svg';
import AgentIcon from '../../../public/AgentIcon.svg';
import Link from "next/link";
// @ts-ignore
import ChatBot from 'react-simple-chatbot';

const Message = () => {

    const [isChatOptionOpen, setIsChatOptionOpen] = useState(false);
    const [isChatBotOpen, setIsChatBotOpen] = useState(false);

    const ref = useRef(null);
    const chatBotRef = useRef(null);

    const handleClickOutside = (event:any) => {
        // @ts-ignore
        if (ref.current && !ref.current.contains(event.target) && chatBotRef.current && !chatBotRef.current.contains(event.target)) {
            setIsChatOptionOpen(false);
            setIsChatBotOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const steps = [
        {
            id: '0',
            message: 'Hello there!',
            trigger: '1',
        }, {
            id: '1',
            message: 'Please write your username',
            trigger: '2'
        }, {
            id: '2',
            user: true,
            trigger: '3',
        }, {
            id: '3',
            message: " hi {previousValue}, how can I help you?",
            trigger: 4
        }, {
            id: '4',
            options: [
                { value: 1, label: 'View Courses' },
                { value: 2, label: 'Read Articles' },
            ],
            end: true
        }
    ];

    const config = {
        botAvatar: "img.png",
        floating: true,
    };

    return (
        <div style={{zIndex: 1000}} className='w-auto h-auto fixed bottom-[6%] right-[3%] flex justify-end flex-col items-end' ref={ref}>
            {
                (isChatOptionOpen && !isChatBotOpen) ? (
                    <div className="relative bottom-14 flex flex-col flex-between gap-10">
                        <Link href='https://wa.me/+251938060606' target={'_blank'} className='flex gap-10 cursor-pointer'>
                            <a
                                className='bg-[#FFFFFF] h-12 text-sm font-medium hover:bg-gray-100 text-black px-5 rounded-3xl flex items-center justify-around gap-4 w-auto'>WhatsApp
                            </a>
                            <Image src={WhatsAppIcon} alt='whatsApp'/>
                        </Link>

                        <div
                            onClick={() => setIsChatBotOpen(!isChatBotOpen)}
                            className='flex gap-10 cursor-pointer'>
                            <button
                                className='bg-[#FFFFFF] h-12 text-sm font-medium hover:bg-gray-100 text-black px-5 rounded-3xl flex items-center justify-around gap-4 w-auto'>Live
                                Chat
                            </button>
                            <Image src={AgentIcon} alt='whatsApp'/>
                        </div>
                    </div>
                ) : null
            }
            {
                isChatBotOpen ? (
                    <div ref={chatBotRef} className="relative">
                        <ChatBot
                            steps={steps}
                            config={config}
                        />
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
