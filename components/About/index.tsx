"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const About = () => {
  return (
    <>
      <section className="overflow-hidden py-18 md:py-20 xl:py-23">
        <div className="max-w-c-1390 mx-auto px-4 md:px-8 2xl:px-0">
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-stretch xl:gap-32.5">
            {/* LEFT - Info & Tombol Lokasi */}
            <div className="flex w-full flex-col items-center justify-center text-center lg:w-1/2">
              <div className="max-w-md">
                {/* Icon */}
                <div className="mb-6 flex justify-center">
                  <div className="bg-primary/10 flex h-16 w-16 items-center justify-center rounded-full">
                    <svg
                      className="text-primary h-8 w-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                </div>

                {/* Title */}
                <h2 className="mb-4 text-2xl font-bold text-black md:text-3xl dark:text-white">
                  Lokasi Kami
                </h2>

                {/* Description */}
                <p className="mb-8 text-base leading-relaxed text-gray-600 dark:text-gray-400">
                  Rumah Sakit Jiwa Prof. HB Saanin Padang menyediakan layanan
                  kesehatan mental untuk masyarakat dengan fasilitas perawatan
                  yang lengkap dan tenaga medis profesional. Anda dapat
                  menghubungi langsung atau mengunjungi untuk mendapatkan
                  layanan konsultasi dan perawatan kesehatan mental.
                </p>

                {/* Tombol Lokasi */}
                <a
                  href="https://maps.app.goo.gl/MRQwLowzxsbhSZJNA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary hover:bg-primaryho inline-flex items-center gap-2 rounded-full px-7.5 py-3 text-white duration-300 ease-in-out"
                >
                  Buka di Google Maps
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* RIGHT - Google Maps Embed */}
            <div className="animate_right w-full lg:w-1/2">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.277671377878!2d100.45887342668033!3d-0.9432431555447762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2fd4b76b05bc1b37%3A0xabfe39622755c999!2sIGD%20RSJ%20HB.%20Saanin%20Padang!5e0!3m2!1sid!2sid!4v1728371281660!5m2!1sid!2sid"
                className="h-[400px] w-full rounded-2xl lg:h-[500px]"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
