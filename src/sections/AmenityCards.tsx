import Image from "next/image";
import PrimeLocationIcon from '../../public/PrimeLocationIcon.svg';
import LivingIcon from '../../public/LivingIcon.svg';
import FamilyIcon from '../../public/FamilyIcon.svg';
import SecurityIcon from '../../public/SecurityIcon.svg';
import {getImageUrl} from '@/lib/sanity';

const FALLBACK_AMENITIES = [
    { icon: PrimeLocationIcon, title: 'PRIME LOCATIONS', description: 'Strategically located within reasonable proximity to Bole Intl. Airport and Meskel Square.' },
    { icon: LivingIcon, title: 'SPECTACULAR LIVING', description: 'Bright and spacious apartments designed with great attention to design & details.' },
    { icon: FamilyIcon, title: 'LIFE & WELLNESS', description: 'All amenities you may need and more to enjoy your living with easy accessibility.' },
    { icon: SecurityIcon, title: '24/7 SECURITY', description: 'The site is fully equipped with CCTV surveillance systems for better security.' },
];

export default function AmenityCards({ amenities }: { amenities?: any[] }) {
    const items = amenities?.length ? amenities : FALLBACK_AMENITIES;
    return (
        <div className='flex justify-between flex-wrap'>
            {items.map((amenity: any, idx: number) => {
                const iconUrl = amenity.icon?.asset ? getImageUrl(amenity.icon) : null;
                const fallbackIcon = FALLBACK_AMENITIES[idx]?.icon;
                return (
                    <div key={idx} className={`flex flex-col gap-12 w-[49%] lg:w-[23%] ${idx >= 2 ? 'mt-14 lg:mt-0' : ''}`}>
                        {iconUrl
                            ? <img src={iconUrl} alt={amenity.title} className='w-10 h-10 object-contain'/>
                            : fallbackIcon ? <Image src={fallbackIcon} alt='' className='flex'/> : null
                        }
                        <p className='text-md text-[#001624] font-semibold'>{amenity.title}</p>
                        <p className='text-[#738195] font-normal -mt-6'>{amenity.description}</p>
                    </div>
                );
            })}
        </div>
    );
}
