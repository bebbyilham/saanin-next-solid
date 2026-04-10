"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Lines from "@/components/Lines";
import ScrollToTop from "@/components/ScrollToTop";
import Accessibility from "@/components/Accessibility";
import { ThemeProvider } from "next-themes";
import ToasterContext from "../context/ToastContext";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ThemeProvider
            enableSystem={false}
            attribute="class"
            defaultTheme="light"
        >
            <Lines />
            <Header />
            <ToasterContext />
            {children}
            <Footer />
            <Accessibility />
            <ScrollToTop />
        </ThemeProvider>
    );
}
