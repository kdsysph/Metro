import Image from "next/image";
import NextIcon from "../../../public/NextIcon.svg";
import PeopleImage from '../../../public/Staff photo.jpg';
import Link from "next/link";
import {getImageUrl} from '@/lib/sanity';

const Schedule = ({heading, subheading, body, staffPhoto}: any) => {
    const displayHeading = heading || 'Connect with\nOur Sales Team\nfor a Free\nConsultation!';
    const displaySubheading = subheading || 'Let Us Guide You Home';
    const displayBody = body || 'Gain personalized guidance and expert advice tailored to your needs. Book a consultation with our sales experts and discover your dream home today.';

    const staffImageUrl = staffPhoto ? getImageUrl(staffPhoto) : null;

    return (
        <div data-aos="fade-up" data-aos-duration="1000">
            <div className='px-5 lg:px-0 container mx-auto flex flex-col lg:mb-10'>
                <div className='flex flex-col gap-10 lg:gap-0 lg:flex-row justify-between px-20'>
                    <div className='w-full lg:w-[40%] gap-10 lg:gap-0 flex justify-evenly flex-col'>
                        <div>
                            <p className='text-5xl lg:text-5xl font-[500] leading-snug whitespace-pre-line'>
                                {displayHeading}
                            </p>
                        </div>
                        <div className='flex w-full text-[#738195] text-lg font-medium'>
                            <p className='uppercase'>{displaySubheading}</p>
                        </div>
                        <div className='flex justify-start gap-5'>
                            <p className='w-full lg:w-[80%] text-lg font-normal text-[#002740]'>{displayBody}</p>
                        </div>
                        <Link
                            href='/contact#form-section'
                            className='w-full lg:w-80 flex justify-center gap-4 h-[72px] text-[16px] font-semibold lg:text-md bg-primary hover:bg-primaryHover transition-all duration-200 items-center'>
                            SCHEDULE A CONSULTATION
                            <Image src={NextIcon} width={24} height={24} alt='next'/>
                        </Link>
                    </div>
                    <div className='w-full lg:w-[60%] hidden lg:flex justify-center'>
                        {staffImageUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={staffImageUrl} alt='Metro Sales Team' className='object-cover'/>
                        ) : (
                            <Image src={PeopleImage} alt='Metro Sales Team'/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Schedule;
