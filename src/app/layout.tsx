import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Header from "@/sections/Header";
import Footer from "@/sections/Footer";
import {CustomeLayout} from "@/app/CustomeLayout";
import {SplashPageProvider} from "@/context/SplashPageContext";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Metro Real Estate",
    description: "Metro Real Estate - Home to live your dream lifestyle",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <SplashPageProvider>
            <CustomeLayout>
                {children}
            </CustomeLayout>
        </SplashPageProvider>
        </body>
        </html>
    );
}
