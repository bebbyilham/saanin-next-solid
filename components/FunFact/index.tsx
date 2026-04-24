"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const socialMedia = [
  {
    name: "Instagram",
    handle: "@rsjsaaninpadang",
    link: "https://www.instagram.com/rsjsaaninpadang",
    icon: (
      <svg className="h-10 w-10 fill-current" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    color: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
    hoverColor: "hover:shadow-[0_0_20px_rgba(238,42,123,0.5)]",
  },
  {
    name: "TikTok",
    handle: "@rsjsaaninpadang",
    link: "https://www.tiktok.com/@rsjsaaninpadang",
    icon: (
      <svg className="h-10 w-10 fill-current" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.89 2.89 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
      </svg>
    ),
    color: "bg-black",
    hoverColor: "hover:shadow-[0_0_20px_rgba(0,0,0,0.3)]",
  },
  {
    name: "Facebook",
    handle: "Jiwa Hospital",
    link: "https://www.facebook.com/jiwamobile",
    icon: (
      <svg className="h-10 w-10 fill-current" viewBox="0 0 24 24">
        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
      </svg>
    ),
    color: "bg-[#1877F2]",
    hoverColor: "hover:shadow-[0_0_20px_rgba(24,119,242,0.5)]",
  },
  {
    name: "X (Twitter)",
    handle: "@rsjsaaninpadang",
    link: "https://x.com/rsjsaaninpadang",
    icon: (
      <svg className="h-10 w-10 fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    color: "bg-[#000000] dark:bg-[#1DA1F2]",
    hoverColor: "hover:shadow-[0_0_20px_rgba(29,161,242,0.5)]",
  },
  {
    name: "WhatsApp",
    handle: "Hubungi Kami",
    link: "https://wa.me/6275172001",
    icon: (
      <svg className="h-10 w-10 fill-current" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.888-4.439 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.88-.788-1.474-1.761-1.648-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.52-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
      </svg>
    ),
    color: "bg-[#25D366]",
    hoverColor: "hover:shadow-[0_0_20px_rgba(37,211,102,0.5)]",
  },
  {
    name: "YouTube",
    handle: "RS Jiwa Prof. HB. Saanin",
    link: "https://www.youtube.com/@rs.jiwaprof.hb.saaninpadan1477",
    icon: (
      <svg className="h-10 w-10 fill-current" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    color: "bg-[#FF0000]",
    hoverColor: "hover:shadow-[0_0_20px_rgba(255,0,0,0.5)]",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const FunFact = () => {
  return (
    <>
      {/* ===== Social Media Hub Start ===== */}
      <section className="px-4 py-20 md:px-8 lg:py-22.5 2xl:px-0">
        <div className="relative z-1 mx-auto max-w-c-1390 rounded-lg bg-linear-to-t from-[#F8F9FF] to-[#DEE7FF] py-22.5 dark:bg-blacksection dark:bg-linear-to-t dark:from-transparent dark:to-transparent dark:stroke-strokedark xl:py-27.5">
          {/* Decorative shapes */}
          <Image
            width={335}
            height={384}
            src="/images/shape/shape-04.png"
            alt="Man"
            className="absolute -left-10 -top-15 -z-1 w-[200px] md:w-[335px] lg:left-0 lg:-top-25"
          />
          <Image
            width={132}
            height={132}
            src="/images/shape/shape-05.png"
            alt="Doodle"
            className="absolute bottom-0 right-0 -z-1"
          />
          <Image
            fill
            src="/images/shape/shape-dotted-light-02.svg"
            alt="Dotted"
            className="absolute left-0 top-0 -z-1 dark:hidden"
          />
          <Image
            fill
            src="/images/shape/shape-dotted-dark-02.svg"
            alt="Dotted"
            className="absolute left-0 top-0 -z-1 hidden dark:block"
          />

          {/* Header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 1, delay: 0.1 }}
            viewport={{ once: true }}
            className="animate_top mx-auto mb-12.5 px-4 text-center md:w-4/5 md:px-0 lg:mb-17.5 lg:w-2/3 xl:w-1/2"
          >
            <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl xl:text-sectiontitle3">
              Media Sosial Kami
            </h2>
            <p className="mx-auto lg:w-11/12">
              Tetap terhubung dengan kami untuk mendapatkan informasi terbaru, edukasi kesehatan jiwa, dan berbagai kegiatan RSJ Prof. HB. Saanin Padang melalui platform media sosial resmi kami.
            </p>
          </motion.div>

          {/* Social Media Grid */}
          <div className="grid grid-cols-1 gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3 xl:px-16">
            {socialMedia.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
                className={`group relative flex items-center gap-5 overflow-hidden rounded-2xl bg-white p-6 shadow-solid-7 transition-all duration-300 hover:-translate-y-2 dark:bg-btndark ${social.hoverColor}`}
              >
                {/* Background Accent */}
                <div
                  className={`absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-10 transition-transform duration-500 group-hover:scale-150 ${social.color}`}
                ></div>

                {/* Icon Container */}
                <div
                  className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110 ${social.color}`}
                >
                  {social.icon}
                </div>

                {/* Content */}
                <div className="z-10">
                  <h3 className="text-xl font-bold text-black dark:text-white">
                    {social.name}
                  </h3>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors">
                    {social.handle}
                  </p>
                </div>

                {/* Arrow Icon */}
                <div className="ml-auto opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
      {/* ===== Social Media Hub End ===== */}
    </>
  );
};

export default FunFact;
