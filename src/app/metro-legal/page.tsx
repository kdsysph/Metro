import Image from "next/image";
import NextIcon from "../../../public/NextIcon.svg";
import {GoDownload} from "react-icons/go";
import Link from "next/link";

const MetroLegalPage: React.FC = () => {
    return (
        <div className='container mx-auto py-14 flex flex-col items-end gap-20 px-5 lg:px-0'>
            <div data-aos="fade-up" data-aos-duration="1000" className='flex justify-between items-center '>
                <div className='hidden lg:flex w-full lg:w-[33%] text-[#738195] text-md font-medium'>
                    <p>LIABILITY FOR CONTENT</p>
                </div>
                <div
                    className='flex flex-col gap-10 w-full lg:w-[66.5%]'>
                    <p className='text-5xl lg:text-4xl font-medium leading-snug'>Metro Legal Protection</p>
                    <div className='lg:hidden w-full lg:w-[33%]'>
                        <p className='text-[#738195] text-lg font-medium'>LIABILITY FOR CONTENT
                        </p>
                    </div>
                    <div className='flex justify-start gap-5 flex-col'>
                        <p className='flex w-full text-md font-normal text-[#738195]'>The information contained in this
                            website is for guidance only. Although every care has been taken to ensure that this
                            information is correct, this information does not constitute a contract, part of a contract
                            or warranty. All computer generated images, illustrations and photographs are indicative and
                            for illustrative purposes only. Site plans and floor plans are not to scale and dimensions
                            should not be relied upon for flooring or furniture placement. Furniture is not included.
                            Any landscaping shown is indicative only.</p>
                        <p className='flex w-full text-md font-normal text-[#738195]'>All plans are preliminary subject
                            to any changes or amendments in future design stages approved by Metro Real Estate and/or
                            the relevant authorities in Addis Abeba. Rendering and illustrations are artist’s
                            impressions only and cannot be regarded as representations of facts.</p>
                        <p className='flex w-full text-md font-normal text-[#738195]'>Pursuant to Section 7, Para. 1
                            TMG, as a service provider we are responsible under general legislation for our own content
                            on this website. However, according to sections 8 to 10 TMG, we are not obliged to monitor
                            any external information transmitted or stored, or to investigate any circumstances that
                            indicate illegal activities. </p>
                        <p className='flex w-full text-md font-normal text-[#738195]'>Any obligation to remove or block
                            the use of information according to general legislation is not affected by the above.
                            Liability in this regard is, however, only possible once we have been informed about a
                            specific infringement. If any such infringements come to our notice, we will immediately
                            remove the content in question.</p>
                    </div>
                </div>
            </div>


            <div data-aos="fade-up" data-aos-duration="1000" className='flex justify-between '>
                <div className='hidden lg:flex w-full lg:w-[33%] text-[#738195] text-md font-medium'>
                    <p>LIABILITY FOR LINKS</p>
                </div>
                <div
                    className='flex flex-col gap-10 w-full lg:w-[66.5%]'>
                    {/*<p className='text-5xl lg:text-4xl font-medium leading-snug'>Metro Legal Protection</p>*/}
                    <div className='lg:hidden w-full lg:w-[33%]'>
                        <p className='text-[#738195] text-lg font-medium'>LIABILITY FOR LINKS
                        </p>
                    </div>
                    <div className='flex justify-start gap-5 flex-col'>
                        <p className='flex w-full text-md font-normal text-[#738195]'>Our website contains links to the
                            external websites of third parties over whose content we have no influence. We therefore
                            also cannot provide any guarantees regarding such external content. The provider or operator
                            of the respective website is always responsible for the content of the linked pages. At the
                            time of linking, these pages were checked for possible violations of the law. </p>
                        <p className='flex w-full text-md font-normal text-[#738195]'>No illegal content was identified
                            at the time of linking. It is, however, unreasonable to expect permanent monitoring of the
                            content of linked pages without any specific indication of an infringement. If any such
                            infringements come to our notice, we will immediately remove the links in question.</p>
                    </div>
                </div>
            </div>


            <div data-aos="fade-up" data-aos-duration="1000" className='flex justify-between '>
                <div className='hidden lg:flex w-full lg:w-[33%] text-[#738195] text-md font-medium'>
                    <p>COPYRIGHT</p>
                </div>
                <div
                    className='flex flex-col gap-10 w-full lg:w-[66.5%]'>
                    {/*<p className='text-5xl lg:text-4xl font-medium leading-snug'>Metro Legal Protection</p>*/}
                    <div className='lg:hidden w-full lg:w-[33%]'>
                        <p className='text-[#738195] text-lg font-medium'>COPYRIGHT
                        </p>
                    </div>
                    <div className='flex justify-start gap-5 flex-col'>
                        <p className='flex w-full text-md font-normal text-[#738195]'>The content and works published on
                            these pages by the site’s operators are subject to German copyright law. The written
                            permission of the respective author or compiler is required before any content may be
                            copied, edited, disseminated or otherwise utilized outside the limits of copyright law.
                            Downloads or copies of this site are permitted for private, non-commercial use only. </p>
                        <p className='flex w-full text-md font-normal text-[#738195]'>For any contents on this website
                            not created by the operator, the copyright of third parties has been observed. In
                            particular, any third-party content has been marked as such. Should you nevertheless notice
                            any infringement of copyright, we request that you inform us accordingly. If any such
                            infringements come to our notice, we will immediately remove the contents in question.</p>
                    </div>
                </div>
            </div>
            <div className='w-full lg:w-[66.5%] flex flex-col lg:flex-row gap-10 items'>
                <Link
                    href='/contact#form-section'
                    className='flex text-md justify-center gap-4 font-medium w-full lg:w-80 h-14 bg-primary hover:bg-primaryHover transition-all duration-200 items-center'>CONTACT
                    METRO SALES TEAM
                    <Image src={NextIcon} width={20} height={20} alt='next'/>
                </Link>
                <Link
                    href='/download-brochure'
                    className='flex gap-4 font-normal w-full lg:w-80 h-14 text-center justify-center items-center'>DOWNLOAD
                    BROUCHER (2.8mB)
                    <GoDownload color='#FFCF01'/>
                </Link>
            </div>


        </div>
    )
}

export default MetroLegalPage;