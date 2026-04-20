"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const quickLinks = [
  { title: "Profil", path: "/profil/visi-misi" },
  { title: "Publikasi", path: "/kategori/berita-utama" },
  { title: "Perpustakaan", path: "/perpustakaan/laporan-kinerja-instansi-pemerintah" },
  { title: "Jadwal Dokter", path: "/jadwal-dokter" },
  { title: "Kontak", path: "/contact" },
];

const CTA = () => {
  return (
    <>
      <section className="overflow-hidden px-4 py-20 md:px-8 lg:py-25 xl:py-30 2xl:px-0">
        <div className="mx-auto max-w-c-1390 rounded-lg bg-linear-to-t from-[#F8F9FF] to-[#DEE7FF] px-7.5 py-12.5 dark:bg-blacksection dark:bg-linear-to-t dark:from-transparent dark:to-transparent dark:stroke-strokedark md:px-12.5 xl:px-17.5 xl:py-0">
          <div className="flex flex-wrap items-center gap-8 md:flex-nowrap md:justify-between md:gap-0">
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: -20,
                },
                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_left md:w-[70%] lg:w-[60%]"
            >
              <h2 className="mb-4 text-3xl font-bold text-black dark:text-white xl:text-sectiontitle4">
                Akses Cepat Layanan & Informasi
              </h2>
              <p className="mb-8 text-body-color dark:text-gray-400">
                Temukan informasi, layanan publik, profil institusi, serta dokumen penting RS Jiwa Prof. HB. Saanin Padang dengan lebih cepat melalui pintasan di bawah ini.
              </p>
              
              <div className="flex flex-wrap items-center gap-3">
                {quickLinks.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.path}
                    className="inline-flex items-center gap-2 rounded-full border border-stroke bg-white px-5 py-2.5 text-sm font-medium text-black shadow-solid-4 transition-all hover:bg-black hover:text-white dark:border-strokedark dark:bg-black dark:text-white dark:hover:bg-primary dark:hover:border-primary"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </motion.div>
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: 20,
                },
                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_right lg:w-[35%] py-8 xl:py-16"
            >
              <div className="flex items-center justify-center md:justify-end">
                <Image
                  width={299}
                  height={299}
                  src="/images/shape/shape-06.png"
                  alt="Ilustrasi"
                  className="hidden md:block" // Tampilkan di md ke atas atau jika ingin di mobile ganti jadi block saja
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CTA;
