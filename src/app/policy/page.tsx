import exp from "node:constants";
import Image from "next/image";
import AbourImage2 from "../../../public/about2Image.svg";
import Link from "next/link";
import NextIcon from "../../../public/NextIcon.svg";
import {GoDownload} from "react-icons/go";

const Policy = () => {
    return (
        <div className='container mx-auto py-14 flex flex-col items-end gap-20 px-5 lg:px-0'>
            <div
                className='flex flex-col gap-10 w-full lg:w-[66.5%]'>
                <p className='text-4xl lg:text-5xl font-medium leading-snug'>Metro Data Protection Policy</p>
            </div>
            <div data-aos="fade-up" data-aos-duration="1000" className='flex justify-between items-start '>
                <div className='hidden lg:flex w-full lg:w-[33%] text-[#738195] text-md font-medium'>
                    <p>GENERAL INFORMATION</p>
                </div>
                <div
                    className='flex flex-col gap-10 w-full lg:w-[66.5%]'>
                    <div className='lg:hidden w-full lg:w-[33%]'>
                        <p className='text-[#738195] text-lg font-medium'>GENERAL INFORMATION
                        </p>
                    </div>
                    <div className='flex justify-start gap-5'>
                        <p className='flex w-full text-md font-normal text-[#738195]'>The following
                            information provides a simple overview of what happens to your personal data when visiting
                            our website. Personal data are all data that can be used to personally identify you. For
                            in-depth information on data protection, please see the data protection policy to be found
                            below this text.</p>
                    </div>
                </div>
            </div>
            <div data-aos="fade-up" data-aos-duration="1000" className='w-full md:w-[66.5%] flex flex-col lg:flex-row gap-20 justify-between flex-wrap'>
                <div className='w-full md:w-[45%] flex flex-col gap-4 '>
                    <p className='text-[#001624] text-md'>DATA COLLECTION ON OUR WEBSITE</p>
                    <div className='flex flex-col w-full gap-5'>
                        <p className='text-[#738195] text-md font-normal mt-3'>Data processing on this website is
                            performed by the website’s operator. Please see the legal notice of this website for the
                            relevant contact details.</p>
                        <p className='text-[#738195] text-md font-normal mt-3'>Some of the data are collected in order
                            to ensure the fault-free provision of the website. Other data can be used to analyze your
                            user behavior. We may use your data to send you marketing emails, which you may opt out of
                            via the link contained in each email.</p>

                    </div>
                </div>

                <div className='w-full md:w-[45%] flex flex-col gap-4 '>
                    <p className='text-[#001624] text-md '>HOW DO WE USE YOUR DATA?</p>
                    <div className='flex flex-col w-full gap-5'>
                        <p className='text-[#738195] text-md font-normal mt-3'>Some of your data is collected when you
                            provide it to us. These might be data that you e.g. enter into a contact form. Other data
                            are automatically collected by our IT systems when you visit our website. </p>
                        <p className='text-[#738195] text-md font-normal mt-3'>These are primarily technical data (e.g.
                            web browser, operating system, or the time of the page view). These data are collected
                            automatically as soon as you access our site.</p>

                    </div>
                </div>
            </div>

            <div data-aos="fade-up" data-aos-duration="1000" className='w-full md:w-[66.5%] flex flex-col lg:flex-row gap-20 justify-between flex-wrap'>
                <div className='w-full md:w-[45%] flex flex-col gap-4 '>
                    <p className='text-[#001624] text-md '>WHAT RIGHTS DO YOU’VE REGARDING YOUR DATA?</p>
                    <div className='flex flex-col w-full gap-5'>
                        <p className='text-[#738195] text-md font-normal mt-3'>You have the right to request information
                            about the origins, recipients, and purposes of your personal data stored by us at any time
                            and free of charge. You also have the right to request the rectification, restriction or
                            erasure of these data. </p>
                        <p className='text-[#738195] text-md font-normal mt-3'>If you have any questions concerning this
                            or any other aspect of data protection, you can contact us at any time using the address
                            provided in our legal notice. You also have the right to lodge a complaint with the
                            responsible supervisory authority.</p>

                    </div>
                </div>

                <div className='w-full md:w-[45%] flex flex-col gap-4 '>
                    <p className='text-[#001624] text-md '>SOCIAL MEDIA DATA COLLECTION AND MARKETING</p>
                    <div className='flex flex-col w-full gap-5'>
                        <p className='text-[#738195] text-md font-normal mt-3'>We use Social Media to promote our
                            business and its products. We collect data through these Social Media channels which we use
                            to send you sales and marketing communications. These communications will include (but not
                            be limited to) email, Facebook and Instagram messages and phone calls where you have given
                            us your telephone number.</p>
                        <p className='text-[#738195] text-md font-normal mt-3'>If you no longer wish to receive
                            marketing via Social Media channels you can unsubscribe from our feeds.</p>

                    </div>
                </div>
            </div>


            <div data-aos="fade-up" data-aos-duration="1000" className='flex justify-between gap-4 '>
                <div className='hidden lg:flex w-full lg:w-[33%] text-[#738195] text-md font-medium'>
                    <p>METRO DATA PROTECTION</p>
                </div>
                <div
                    className='flex flex-col gap-10 w-full lg:w-[66.5%]'>
                    <div className='lg:hidden w-full lg:w-[33%]'>
                        <p className='text-[#738195] text-lg font-medium'>METRO DATA PROTECTION</p>
                    </div>
                    <div className='flex justify-start gap-5'>
                        <p className='flex w-full text-md font-normal text-[#738195]'>The following
                            The operators of this website take the protection of your personal data very seriously. We
                            treat your personal data confidentially and in accordance with data protection law and this
                            data protection policy. When you use this website, various personal data are collected. </p>
                    </div>

                    <div className='flex justify-start gap-5'>
                        <p className='hidden lg:flex w-full text-md font-normal text-[#738195]'>Personal data are data
                            that can be used to personally identify you. This data protection policy explains which data
                            we collect and what we use them for. It also explains how and to which purpose this is
                            performed. Please note that data transmitted via the Internet (e.g. via e-mail
                            communication) may be subject to security breaches. Complete protection of your data from
                            third-party access is not possible.</p>
                    </div>


                </div>
            </div>
            <div data-aos="fade-up" data-aos-duration="1000" className='w-full md:w-[66.5%] flex flex-col lg:flex-row gap-20 justify-between flex-wrap'>
                <div className='w-full md:w-[45%] flex flex-col gap-4 '>
                    <p className='text-[#001624] text-md '>REVOKING YOUR CONSENT TO DATA PROCESSING</p>
                    <div className='flex flex-col w-full gap-5'>
                        <p className='text-[#738195] text-md font-normal mt-3'>Many data-processing procedures are only
                            possible with your express consent. You can revoke your previously provided consent at any
                            time. An informal notification by e-mail will suffice. The legality of the data processing
                            conducted prior to the revocation shall remain unaffected.</p>
                    </div>
                </div>

                <div className='w-full md:w-[45%] flex flex-col gap-4 '>
                    <p className='text-[#001624] text-md '>SSL AND/OR TLS ENCRYPTION</p>
                    <div className='flex flex-col w-full gap-5'>
                        <p className='text-[#738195] text-md font-normal mt-3'>This site uses SSL or TLS encryption for
                            security reasons and for the protection of the transmission of confidential content, such as
                            orders and inquiries you send to us as the site operator. You can recognise an encrypted
                            connection in your browser’s address bar when it changes from “http://” to “https://” and
                            the lock icon is displayed there. When SSL or TLS encryption is activated, the data you
                            transfer to us cannot be read by third parties.</p>
                    </div>
                </div>
            </div>
            <div data-aos="fade-up" data-aos-duration="1000" className='w-full md:w-[66.5%] flex flex-col lg:flex-row gap-20 justify-between flex-wrap'>
                <div className='w-full md:w-[45%] flex flex-col gap-4 '>
                    <p className='text-[#001624] text-md '>INFORMATION, RESTRICTION, ERASURE</p>
                    <div className='flex flex-col w-full gap-5'>
                        <p className='text-[#738195] text-md font-normal mt-3'>Within the framework of the applicable
                            legal provisions, you have the right to request information about the origins, recipients,
                            and purposes of your personal data stored by us at any time and free of charge. If desired,
                            you also have the right to the rectification, restriction or erasure of these data. If you
                            have any questions concerning this or any other aspect of personal data, you can contact us
                            at any time using the address provided in our legal notice.</p>
                    </div>
                </div>

                <div className='w-full md:w-[45%] flex flex-col gap-4 '>
                    <p className='text-[#001624] text-md '>OBJECTION TO PROMOTIONAL E-MAILS</p>
                    <div className='flex flex-col w-full gap-5'>
                        <p className='text-[#738195] text-md font-normal mt-3'>We hereby prohibit the use of the contact
                            data published as part of our duty to provide a legal notice in order to send unsolicited
                            promotional and informational materials. The operators of this website reserve the express
                            right to take legal action in the case of the unsolicited receipt of advertising, e.g. via
                            spam e-mails.</p>
                    </div>
                </div>
            </div>


            <div data-aos="fade-up" data-aos-duration="1000" className='flex justify-between gap-4 '>
                <div className='hidden lg:flex w-full lg:w-[33%] text-[#738195] text-md font-medium'>
                    <p>METRO COOKIES</p>
                </div>
                <div
                    className='flex flex-col gap-10 w-full lg:w-[66.5%]'>
                    <div className='lg:hidden w-full lg:w-[33%]'>
                        <p className='text-[#738195] text-lg '>METRO COOKIES</p>
                    </div>
                    <div className='flex flex-col justify-start gap-5'>
                        <p className='flex w-full text-md font-normal text-[#738195]'>Some of our web pages use cookies.
                            Cookies do not harm your computer and do not contain any viruses. Cookies help make our
                            website more user-friendly, efficient, and secure. Cookies are small text files that are
                            stored on your computer and saved by your browser.</p>
                        <p className='flex w-full text-md font-normal text-[#738195]'>Most of the cookies we use are
                            so-called “session cookies.” These are automatically deleted after your visit. Other cookies
                            remain in your device’s memory until you delete them. These cookies make it possible for us
                            to recognise your browser when you next visit the site.</p>
                        <p className='flex w-full text-md font-normal text-[#738195]'>You can configure your browser to
                            inform you about the use of cookies so that you can decide on a case-by-case basis whether
                            to accept or reject a cookie. Alternatively, your browser can be configured to automatically
                            accept cookies under certain conditions or to always reject them, and to automatically
                            delete cookies when closing your browser. Disabling cookies may limit the functionality of
                            this website.</p>
                        <p className='flex w-full text-md font-normal text-[#738195]'>Cookies that are necessary to
                            allow electronic communications or to provide certain functions you wish to use (such as a
                            shopping cart) are stored pursuant to point (f) of Art. 6 (1) GDPR. The website operator has
                            a legitimate interest in the storage of cookies to ensure an optimised service provided free
                            of technical errors. If other cookies (such as those used to analyse your browsing
                            behaviour) are also stored, these will be treated separately in this data protection
                            policy.</p>
                    </div>

                    <div className='flex justify-start gap-5'>
                        <p className='hidden lg:flex w-full text-md font-normal text-[#738195]'>Personal data are data
                            that can be used to personally identify you. This data protection policy explains which data
                            we collect and what we use them for. It also explains how and to which purpose this is
                            performed. Please note that data transmitted via the Internet (e.g. via e-mail
                            communication) may be subject to security breaches. Complete protection of your data from
                            third-party access is not possible.</p>
                    </div>


                </div>
            </div>
            <div data-aos="fade-up" data-aos-duration="1000" className='w-full md:w-[66.5%] flex flex-col lg:flex-row gap-20 justify-between flex-wrap'>
                <div className='w-full md:w-[45%] flex flex-col gap-4 '>
                    <p className='text-[#001624] text-md '>SERVER LOG FILES</p>
                    <div className='flex flex-col w-full gap-5'>
                        <p className='text-[#738195] text-md font-normal mt-3'>The website provider automatically
                            collects and stores information that your browser automatically transmits to us in so-called
                            server log files. These are:</p>

                        <ul>
                            <li className='text-[#738195] text-md font-normal mt-3'>
                                Browser type and browser version
                            </li>
                            <li className='text-[#738195] text-md font-normal mt-3'>
                                Operating system used
                            </li>
                            <li className='text-[#738195] text-md font-normal mt-3'>
                                Referrer URL
                            </li>
                            <li className='text-[#738195] text-md font-normal mt-3'>
                                Host name of the accessing computer
                            </li>
                            <li className='text-[#738195] text-md font-normal mt-3'>
                                Time of the server request
                            </li>
                            <li className='text-[#738195] text-md font-normal mt-3'>
                                IP address
                            </li>

                        </ul>

                        <p className='text-[#738195] text-md font-normal mt-3'>These data will not be combined with data
                            from other sources. The basis for data processing is point (f) of Art. 6 (1) GDPR, which
                            allows the processing of data to fulfil a contract or for measures preliminary to a
                            contract.</p>
                    </div>
                </div>

                <div className='w-full md:w-[45%] flex flex-col gap-4 '>
                    <p className='text-[#001624] text-md '>CONTACT FORM</p>
                    <div className='flex flex-col w-full gap-5'>
                        <p className='text-[#738195] text-md font-normal mt-3'>Should you send us questions via the
                            contact form, we will collect the data entered on the form, including the contact details
                            you provide, to answer your question and any follow-up questions. We do not share these data
                            without your permission. We will, therefore, process any data you enter onto the contact
                            form exclusively with your consent pursuant to point (a) of Art. 6 (1) GDPR. You can revoke
                            your consent at any time. An informal notification by e-mail will suffice. The legality of
                            the data processing conducted prior to the revocation shall remain unaffected.</p>
                        <p className='text-[#738195] text-md font-normal mt-3'>We will retain the data you provide on
                            the contact form until you request its deletion, revoke your consent for its storage, or the
                            purpose for its storage no longer pertains (e.g. after fulfilling your request). Any
                            mandatory statutory provisions, especially those regarding mandatory data retention periods,
                            remain unaffected by this provision.</p>
                    </div>
                </div>
            </div>


            <div data-aos="fade-up" data-aos-duration="1000" className='flex justify-between gap-4 '>
                <div className='hidden lg:flex w-full lg:w-[33%] text-[#738195] text-md font-medium'>
                    <p>ANALYTICS TOOLS AND ADVERTISING</p>
                </div>
                <div
                    className='flex flex-col gap-10 w-full lg:w-[66.5%]'>
                    <div className='lg:hidden w-full lg:w-[33%]'>
                        <p className='text-[#738195] text-lg font-medium'>ANALYTICS TOOLS AND ADVERTISING</p>
                    </div>
                    <div className='w-full flex flex-col lg:flex-row gap-20 justify-between flex-wrap'>
                        <div className='w-full md:w-[45%] flex flex-col gap-4 '>
                            <p className='text-[#001624] text-md'>GOOGLE ANALYSTICS</p>
                            <div className='flex flex-col w-full gap-5'>
                                <p className='text-[#738195] text-md font-normal mt-3'>This website uses Google
                                    Analytics, a web analytics service. It is operated by Google Inc., 1600 Amphitheatre
                                    Parkway, Mountain View, CA 94043, USA.</p>
                                <p className='text-[#738195] text-md font-normal mt-3'>Google Analytics uses so-called
                                    “cookies”. These are text files stored on your computer to help the website analyse
                                    how you use the site. The information generated by the cookie about your use of this
                                    website is usually transmitted to a Google server in the USA and stored there.</p>
                                <p className='text-[#738195] text-md font-normal mt-3'>The storage of Google Analytics
                                    cookies and the use of this analytics tool are based on point (f) of Art. 6 (1)
                                    GDPR. The website operator has a legitimate interest in analysing user behaviour to
                                    optimise both its website and its advertising.</p>

                            </div>
                        </div>

                        <div className='w-full md:w-[45%] flex flex-col gap-4 '>
                            <p className='text-[#001624] text-md '>IP ANONYMIZATION</p>
                            <div className='flex flex-col w-full gap-5'>
                                <p className='text-[#738195] text-md font-normal mt-3'>We have activated the IP
                                    anonymisation feature on this website. Your IP address will be shortened by Google
                                    within the European Union or other parties to the Agreement on the European Economic
                                    Area prior to transmission to the United States. Only in exceptional cases is the
                                    full IP address sent to a Google server in the US and shortened there. </p>
                                <p className='text-[#738195] text-md font-normal mt-3'>Google will use this information
                                    on behalf of the operator of this website to evaluate your use of the website, to
                                    compile reports on website activity, and to provide other services regarding website
                                    activity and Internet usage for the website operator. The IP address transmitted by
                                    your browser as part of Google Analytics will not be merged with any other data held
                                    by Google.</p>

                            </div>
                        </div>
                    </div>

                    <div className='w-full flex flex-col lg:flex-row gap-20 justify-between flex-wrap'>
                        <div className='w-full md:w-[45%] flex flex-col gap-4 '>
                            <p className='text-[#001624] text-md'>BROWSER PLUGIN</p>
                            <div className='flex flex-col w-full gap-5'>
                                <p className='text-[#738195] text-md font-normal mt-3'>You can prevent these cookies
                                    being stored by selecting the appropriate settings in your browser. However, we wish
                                    to point out that doing so may mean you will not be able to enjoy the full
                                    functionality of this website. You can also prevent the data generated by cookies
                                    about your use of the website (incl. your IP address) from being passed to Google,
                                    and the processing of these data by Google, by downloading and installing the
                                    browser plugin available at the following link:<Link className='text-primary'
                                                                                         href='tools.google.com/dlpage/gaoptout'>tools.google.com/dlpage/gaoptout</Link>.
                                </p>

                            </div>
                        </div>

                        <div className='w-full md:w-[45%] flex flex-col gap-4 '>
                            <p className='text-[#001624] text-md '>REFUSAL OF DATA COLLECTION</p>
                            <div className='flex flex-col w-full gap-5'>
                                <p className='text-[#738195] text-md font-normal mt-3'>
                                    You can prevent the collection of your data by Google Analytics by clicking on the
                                    following link. An opt-out cookie will be set to prevent your data from being
                                    collected on future visits to this site: Deactivate Google Analytics
                                </p>
                                <p className='text-[#738195] text-md font-normal mt-3 flex flex-col'>For more information about how
                                    Google Analytics handles user data, see Google’s data protection policy:<Link
                                        className='text-primary'
                                        href='https://support.google.com/analytics/answer/6004245?hl=en.'>https://support.google.com/analytics<br/>/answer/6004245?hl=en.</Link>.
                                </p>

                            </div>
                        </div>
                    </div>

                    <div className='w-full flex flex-col lg:flex-row gap-20 justify-between flex-wrap'>
                        <div className='w-full md:w-[45%] flex flex-col gap-4 '>
                            <p className='text-[#001624] text-md'>DEMOGRAPHIC DATA COLLECTION BY GOOGLE</p>
                            <div className='flex flex-col w-full gap-5'>
                                <p className='text-[#738195] text-md font-normal mt-3'>
                                    This website uses Google Analytics’ demographic features. This allows reports to be
                                    generated containing statements about the age, gender, and interests of site
                                    visitors. These data come from interest-based advertising from Google and
                                    third-party visitor data.
                                </p>
                                <p className='text-[#738195] text-md font-normal mt-3'>
                                    These collected data cannot be attributed to any specific individual person. You can
                                    disable this feature at any time by adjusting the ads settings in your Google
                                    account or you can forbid the collection of your data by Google Analytics as
                                    described in the section “Refusal of data collection”.
                                </p>

                            </div>
                        </div>

                        <div className='w-full md:w-[45%] flex flex-col gap-4 '>
                            <p className='text-[#001624] text-md '>OUTSOURCED DATA PROCESSING</p>
                            <div className='flex flex-col w-full gap-5'>
                                <p className='text-[#738195] text-md font-normal mt-3'>
                                    We have entered into an agreement with Google for the outsourcing of our data
                                    processing and fully implement the strict requirements of the German data protection
                                    authorities when using Google Analytics.
                                </p>

                            </div>
                        </div>
                    </div>
                    <div className='w-full flex flex-col lg:flex-row justify-start'>
                        <div className=''>
                            <Link
                                href='/contact#form-section'
                                // onClick={() => setRegisterInterestOpen(true)}
                                className='flex text-md justify-center gap-4 font-medium w-80 h-[4rem] bg-primary hover:bg-primaryHover transition-all duration-200 items-center'>CONTACT
                                METRO SALES TEAM
                                <Image src={NextIcon} width={30} height={30} alt='next'/>
                            </Link>
                        </div>
                        <div className=''>
                            <Link
                                href='/download-brochure'
                                className='flex justify-center gap-4 font-normal w-80 h-14 text-sm items-center'>DOWNLOAD
                                BROUCHER (2.8mB)
                                <GoDownload color='#FFCF01'/>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>


        </div>
    )
}

export default Policy