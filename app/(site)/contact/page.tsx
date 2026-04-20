import React from "react";
import Contact from "@/components/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hubungi Kami - RSJ Prof HB Saanin",

  // other metadata
  description: "Halaman Kontak RSJ Prof HB Saanin Padang"
};

const ContactPage = () => {
  return (
    <div className="pb-20 pt-40">
      <Contact />
    </div>
  );
};

export default ContactPage;
