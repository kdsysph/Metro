'use client'

import {GoDownload} from "react-icons/go";
import Image from "next/image";
import React, {useState, useEffect} from "react";
import Link from "next/link";
import RegisterInterest from "@/sections/RegisterInterest";
import {Map, Marker} from "pigeon-maps";
// @ts-ignore
import {Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import PrimeLocationIcon from "../../../../public/PrimeLocationIcon.svg";
import LivingIcon from "../../../../public/LivingIcon.svg";
import FamilyIcon from "../../../../public/FamilyIcon.svg";
import SecurityIcon from "../../../../public/SecurityIcon.svg";
import CallIconLight from '../../../../public/CallIconLight.svg'
import NextIconLight from "../../../../public/NextIconLight.svg";
import {sanityClient, getImageUrl} from '@/lib/sanity';
import {queries} from '@/lib/groq-queries';
import {PortableText} from '@portabletext/react';
import DiscoverProperties from '@/sections/DiscoverProperties';
import {useLanguage} from '@/context/LanguageContext';
import {localizeField} from '@/lib/localize';
import {getCTASettings, CTASettings, getCTAText, getProjectBrochureText} from '@/lib/cta-utils';
import {unitTypeToPath, unitTypeLabel} from '@/lib/unitTypeToPath';

const FALLBACK_AMENITIES = [
    { icon: PrimeLocationIcon, title: 'PRIME LOCATIONS', description: 'Strategically located within reasonable proximity to Bole Intl. Airport and Meskel Square.' },
    { icon: LivingIcon, title: 'SPECTACULAR LIVING', description: 'Bright and spacious apartments designed with great attention to design & details.' },
    { icon: FamilyIcon, title: 'LIFE & WELLNESS', description: 'All amenities you may need and more to enjoy your living with easy accessibility.' },
    { icon: SecurityIcon, title: '24/7 SECURITY', description: 'The site is fully equipped with CCTV surveillance systems for better security.' },
];

const ProjectDetail = ({params}: { params: { slug: string } }) => {
    const [isRegisterInterestOpen, setRegisterInterestOpen] = useState(false);
    const [project, setProject] = useState<any>(null);
    const [units, setUnits] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [ctaSettings, setCtaSettings] = useState<CTASettings | null>(null);
    const {lang} = useLanguage();

    const {slug} = params;

    const slugToSiteMap: Record<string, string> = {
        'sarbet': 'SARBET',
        'kazanchis': 'KAZANCHIS',
        'bulbula': 'BULBULA'
    };
    const site = slugToSiteMap[slug] || slug.toUpperCase();

    useEffect(() => {
        async function fetchProject() {
            try {
                setLoading(true);
                const data = await sanityClient.fetch(queries.projectBySlug, { slug });
                setProject(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching project:', err);
                setError('Failed to load project');
            } finally {
                setLoading(false);
            }
        }

        async function fetchUnits() {
            try {
                const data = await sanityClient.fetch(queries.propertyUnitsBySite, { site });
                setUnits(data || []);
            } catch (err) {
                console.error('Error fetching units:', err);
                setUnits([]);
            }
        }

        fetchProject();
        fetchUnits();
        getCTASettings().then(setCtaSettings);
    }, [slug, site]);

    if (loading) {
        return <div className="flex justify-center items-center h-[50vh]">Loading...</div>;
    }

    if (error || !project) {
        return <div className="flex justify-center items-center h-[50vh]">Project not found</div>;
    }

    const downloadBrochureText = getCTAText(ctaSettings, 'downloadBrochureButton', lang);
    const projectBrochureText = getProjectBrochureText(ctaSettings, project.projectName || 'Project', lang);

    const projectComponents = {
        block: ({ children }: any) => <p>{children}</p>,
    };

    return (
        <>
            <div className='pb-[72px] lg:pb-0'>
                <div className="w-full h-[50vh] lg:h-[90vh] bg-cover bg-center"
                     style={{backgroundImage: `url(${getImageUrl(project.images?.find((i: any) => i.role === 'banner')?.image)})`}}>
                </div>
                <div
                    className='container mx-auto mt-5 lg:mt-0 lg:py-16 flex flex-col gap-20 lg:gap-28 px-5 lg:px-0 items-end'>

                    <div
                        data-aos="fade-up" data-aos-duration="1000"
                        className='flex flex-col gap-20 w-full lg:w-[66.5%]'>
                        <p className='text-5xl lg:text-7xl font-medium leading-snug'>Metro™ {project.projectName} </p>
                    </div>
                    <div data-aos="fade-up" data-aos-duration="1000"
                         className='flex flex-col lg:flex-row justify-between items-start'>
                        <div
                            className='hidden lg:flex w-full lg:w-[33%] text-[#00416B] text-md font-semibold'>
                            <p>ABOUT PROPERTY</p>
                        </div>
                        <div
                            className='flex flex-col gap-10 w-full lg:w-[66.5%]'>
                            <div
                                className='lg:hidden -my-8 flex w-full lg:w-[35%] text-[#00416B] text-md font-semibold'>
                                <p>ABOUT PROPERTY</p>
                            </div>
                            <div className='flex flex-col lg:flex-row justify-start gap-5'>
                                <div className='w-full lg:w-1/2 flex flex-col gap-5'>
                                    <PortableText value={localizeField(project, 'description1', lang)} components={projectComponents} />
                                </div>
                                <div className='w-full lg:w-1/2 lg:flex flex-col gap-5'>
                                    <PortableText value={localizeField(project, 'description2', lang)} components={projectComponents} />
                                </div>
                            </div>
                            <Link
                                href='/download-brochure'
                                className='flex gap-4 font-semibold w-80 h-[4rem] items-center uppercase'>{projectBrochureText}
                                <GoDownload color='#FFCF01'/>
                            </Link>
                        </div>
                    </div>

                    <div data-aos="fade-up" data-aos-duration="1000"
                         className='w-full md:w-[66.5%] flex flex-col gap-28'>
                        <div data-aos="fade-up" data-aos-duration="1000"
                             className='w-full flex gap-y-10 justify-between flex-wrap'>

                            <div className='w-[48%] flex flex-col gap-4 lg:border-t-2 border-t-[#dbe5f1] pt-5'>
                                <p className='text-3xl lg:text-4xl text-[#00416B] font-semibold'>{project.completionDate}</p>
                                <p className='text-[#738195] text-sm lg:text-md font-medium'>COMPLETION DARE</p>
                            </div>

                            <div className='w-[48%] flex flex-col gap-4 lg:border-t-2 border-t-[#dbe5f1] pt-5'>
                                <p className='text-3xl lg:text-4xl text-[#00416B] font-semibold'>{project.totalProjectArea} SQM</p>
                                <p className='text-[#738195] text-sm lg:text-md font-medium'>TOTAL PROJECT AREA</p>
                            </div>

                            <div className='w-[48%] flex flex-col gap-4 border-t-2 border-t-[#dbe5f1] pt-5'>
                                <p className='text-3xl lg:text-4xl text-[#00416B] font-semibold'>{project.totalPropertyUnits} UNITS</p>
                                <p className='text-[#738195] text-sm lg:text-md font-medium'>TOTAl PROPERTY UNITS</p>
                            </div>
                            <div className='w-[48%] flex flex-col gap-4 border-t-2 border-t-[#dbe5f1] pt-5'>
                                <p className='text-3xl lg:text-4xl text-[#00416B] font-semibold'>{project.carParkingCapacity}</p>
                                <p className='text-[#738195] text-sm lg:text-md font-medium'>CAR PARKING CAPACITY</p>
                            </div>
                        </div>
                        <div data-aos="fade-up" data-aos-duration="1000"
                             className='hidden lg:flex justify-between flex-col lg:flex-row gap-5'>
                            {project.images?.filter((i: any) => i.role === 'gallery').slice(0, 2).map((img: any, idx: number) => (
                                <div key={idx} className="w-full h-[50vh] lg:w-[49%] bg-cover bg-center"
                                     style={{backgroundImage: `url(${getImageUrl(img.image)})`}}>
                                </div>
                            ))}
                        </div>

                        <div data-aos="fade-up" data-aos-duration="1000"
                             className='lg:hidden flex justify-between flex-col lg:flex-row gap-5'>
                            <Splide options={{
                                perPage: 1,
                                arrows: true,
                                autoplay: true,
                                interval: 3000,
                                type: 'loop',
                                pagination: false
                            }}>
                                {project.images?.filter((i: any) => i.role === 'gallery').map((img: any, idx: number) => (
                                    <SplideSlide key={idx}>
                                        <div className="w-full h-[50vh] bg-cover bg-center"
                                             style={{backgroundImage: `url(${getImageUrl(img.image)})`}}>
                                        </div>
                                    </SplideSlide>
                                ))}
                            </Splide>
                        </div>
                    </div>

                    <div className='w-full flex flex-col lg:flex-row justify-between items-start'>
                        <div className='flex w-full lg:w-[33%] text-[#00416B] text-xl lg:text-sm font-semibold'>
                            <p>AMENITIES AND FEATURES</p>
                        </div>
                        <div className='flex flex-col gap-20 w-full lg:w-[66.5%]'>
                            <div className='flex justify-between flex-wrap'>
                                {(project.amenities?.length ? project.amenities : FALLBACK_AMENITIES).map((amenity: any, idx: number) => {
                                    const iconUrl = amenity.icon ? getImageUrl(amenity.icon) : null;
                                    const fallbackIcon = FALLBACK_AMENITIES[idx]?.icon;
                                    return (
                                        <div key={idx} className={`flex flex-col gap-12 w-[49%] lg:w-[23%] ${idx >= 2 ? 'mt-14 lg:mt-0' : ''}`}>
                                            {iconUrl
                                                ? <img src={iconUrl} alt={amenity.title} className='flex w-10 h-10 object-contain'/>
                                                : fallbackIcon ? <Image src={fallbackIcon} alt='' className='flex'/> : null
                                            }
                                            <p className='text-md text-[#001624] font-semibold'>{amenity.title}</p>
                                            <p className='text-[#738195] font-normal -mt-6'>{amenity.description}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className='w-full flex flex-col gap-10'>
                        <p className='text-3xl lg:text-4xl font-medium text-[#001624]'>
                            Available Units at Metro™ {project.projectName}
                        </p>
                            {units.length === 0 ? (
                                <p className='text-[#738195] font-normal'>No units available</p>
                            ) : (
                                <>
                                    {/* Desktop grid */}
                                    <div className='w-full hidden lg:flex flex-wrap justify-between gap-y-10'>
                                        {units.map((unit) => {
                                            const path = unitTypeToPath[unit.unitType] ?? `/projects/${slug}`;
                                            const imageUrl = unit.coverImage ? getImageUrl(unit.coverImage) : '';
                                            const locationLabel = site.charAt(0) + site.slice(1).toLowerCase();
                                            return (
                                                <Link
                                                    key={unit._id}
                                                    className='w-full lg:w-[33%] flex flex-col gap-4 transition-transform duration-300 hover:scale-105'
                                                    href={`${path}?location=${locationLabel}`}
                                                >
                                                    <div
                                                        className='w-full bg-cover bg-center bg-gray-100'
                                                        style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : undefined, height: '300px' }}
                                                    />
                                                    <div className='flex flex-col gap-2'>
                                                        <p className='text-[#001624] text-lg font-medium'>{unitTypeLabel[unit.unitType] ?? unit.unitType}</p>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                    {/* Mobile carousel */}
                                    <div className='lg:hidden block'>
                                        <Splide options={{ perPage: 1, arrows: true, autoplay: true, interval: 3000, type: 'loop', pagination: false }}>
                                            {units.map((unit) => {
                                                const path = unitTypeToPath[unit.unitType] ?? `/projects/${slug}`;
                                                const imageUrl = unit.coverImage ? getImageUrl(unit.coverImage) : '';
                                                const locationLabel = site.charAt(0) + site.slice(1).toLowerCase();
                                                return (
                                                    <SplideSlide key={unit._id}>
                                                        <Link
                                                            className='w-full flex flex-col gap-4 transition-transform duration-300 hover:scale-105'
                                                            href={`${path}?location=${locationLabel}`}
                                                        >
                                                            <div
                                                                className='w-full bg-cover bg-center bg-gray-100'
                                                                style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : undefined, height: '300px' }}
                                                            />
                                                            <div className='flex flex-col gap-2'>
                                                                <p className='text-[#001624] text-lg font-medium'>{unitTypeLabel[unit.unitType] ?? unit.unitType}</p>
                                                            </div>
                                                        </Link>
                                                    </SplideSlide>
                                                );
                                            })}
                                        </Splide>
                                    </div>
                                </>
                            )}
                    </div>

                    {
                        isRegisterInterestOpen ? <RegisterInterest isRegisterInterestOpen={isRegisterInterestOpen}
                                                                   setRegisterInterestOpen={setRegisterInterestOpen}
                                                                   currentProjectSlug={slug}/> : null

                    }
                </div>
            </div>
            {project.virtualTourUrl && (
                <div className='w-full bg-[#f5f8fc]'>
                    <div className='container mx-auto py-20 flex flex-col items-end gap-10 px-5 lg:px-0'>
                        <div className='flex flex-col lg:flex-row justify-between w-full items-start gap-10'>
                            <div className='flex w-full lg:w-[33%] text-[#00416B] text-xl lg:text-sm font-semibold'>
                                <p>360° VIRTUAL TOUR</p>
                            </div>
                            <div className='flex flex-col gap-6 w-full lg:w-[66.5%]'>
                                <p className='text-3xl lg:text-4xl font-medium text-[#001624]'>
                                    Explore Metro™ {project.projectName} Virtually
                                </p>
                                <p className='text-[#738195] font-normal'>
                                    Take an immersive 360° virtual tour of the property from the comfort of your home.
                                </p>
                                <a
                                    href={project.virtualTourUrl}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='flex text-md text-white justify-center gap-4 font-medium w-full lg:w-80 h-[4rem] bg-[#041428] border-2 border-[#ffbf00] hover:bg-[#ffbf00] hover:text-[#041428] transition-all duration-200 items-center'
                                >
                                    START VIRTUAL TOUR
                                    <Image src={NextIconLight} width={24} height={24} alt='next' />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className='bg-[#031428] w-full'>
                <div className='container mx-auto py-20 flex flex-col items-end gap-14 px-5 lg:px-0'>
                    <div data-aos="fade-up" data-aos-duration="1000"
                         className='flex flex-col lg:flex-row justify-between gap-10'>
                        <div className='hidden lg:block w-full lg:w-[33%] text-white text-md font-semibold'>
                            <p>PROPERTY LOCATION</p>
                        </div>
                        <div
                            className='flex flex-col gap-20 w-full lg:w-[66.5%]'>
                            <div className='flex flex-col gap-5'>
                                <p className='text-5xl lg:text-6xl font-semibold leading-snug text-white'>Metro™ {project.projectName} Area, </p>
                                <div className='w-full text-white text-md font-medium'>
                                    <p>{localizeField(project, 'address', lang)}</p>
                                </div>
                            </div>
                            <div className='flex flex-col lg:flex-row justify-start gap-10'>
                                <div className='w-full lg:w-1/2 flex flex-col gap-6'>
                                    <p className='text-white font-semibold text-md'>{project.distanceFromBoleIntlAirport} AWAY
                                        FROM BOLE INTL.
                                        AIRPORT</p>
                                    <p className='text-md  font-normal text-white'>{localizeField(project, 'distanceFromBoleIntlAirportDesc', lang)}</p>
                                </div>
                                <div className='w-full lg:w-1/2 flex flex-col gap-5'>
                                    <p className='text-white font-semibold text-md'>{project.distanceFromFriendshipPark} FROM
                                        FRIENDSHIP PARK</p>
                                    <p className='text-md  font-normal text-white'>{localizeField(project, 'distanceFromFriendshipParkDesc', lang)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-[66%] hidden lg:flex flex-col lg:flex-row justify-start items-center gap-5 '>

                        <button
                            onClick={() => setRegisterInterestOpen(true)}
                            className='flex text-md text-white justify-center gap-4 font-medium w-full lg:w-80 h-[4rem] bg-[#041428] border-2 border-[#ffbf00] hover:bg-[#ffbf00] hover:text-[#041428] transition-all duration-200 items-center'>
                           REGISTER INTEREST
                            <Image src={NextIconLight} width={24} height={24} alt='next'/>
                        </button>
                        <Link
                            href='/download-brochure'
                            className='flex justify-center text-white gap-4 ml-[18%] font-semibold w-full lg:w-80 h-14 text-sm items-center'>{downloadBrochureText}
                            <GoDownload color='#002e6b' size={20}/>
                        </Link>

                    </div>


                    <a href="tel:+25193 806 0606"
                       onClick={() => setRegisterInterestOpen(true)}
                       className='flex lg:hidden text-white justify-center gap-4 font-semibold w-full h-[72px] text-[16px] lg:text-sm bg-[#002e6b] text-white hover:bg-[#022c47] transition-all duration-200 items-center'>
                        CALL METRO SALES
                        <Image src={CallIconLight} width={30} height={30} alt='next'/>

                    </a>

                    <div className='h-[50vh] lg:h-[70vh] w-full'>
                        <div className="relative h-full " style={{paddingBottom: '36.25%'}}>
                            {
                                project.mapLocation &&
                                <Map height={500}

                                     defaultCenter={[project.mapLocation.latitude, project.mapLocation.longitude]}
                                     defaultZoom={15}>
                                    <Marker
                                        width={50}
                                        anchor={[project.mapLocation.latitude, project.mapLocation.longitude]}
                                    />
                                </Map>
                            }
                        </div>
                    </div>

                    <DiscoverProperties currentProjectSlug={slug} />
                </div>
            </div>
        </>
    );
}

export default ProjectDetail;