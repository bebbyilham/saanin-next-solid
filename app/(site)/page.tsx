import { Metadata } from "next";
import Hero from "@/components/Hero";
import Dashboard from "@/components/Dashboard";
import Brands from "@/components/Brands";
import Feature from "@/components/Features";
import About from "@/components/About";
import FeaturesTab from "@/components/FeaturesTab";
import FunFact from "@/components/FunFact";
import Integration from "@/components/Integration";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Blog from "@/components/Blog";
import Gallery from "@/components/Gallery";
import VideoGallery from "@/components/VideoGallery";
import PengumumanHome from "@/components/PengumumanHome";
import Testimonial from "@/components/Testimonial";

export const metadata: Metadata = {
  title: "Rumah Sakit Jiwa Prof HB. Saanin Padang",

  // other metadata
  description: "Rumah Sakit Jiwa Prof HB. Saanin Padang",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Dashboard />
      <CTA />
      <Blog />
      <Gallery />
      <VideoGallery />
      <PengumumanHome />
      <Brands />
      <Feature />
      {/* <Integration /> */}
      <About />
      <FunFact />
    </main>
  );
}
