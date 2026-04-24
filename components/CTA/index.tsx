"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const quickLinks = [
  { title: "Profil", path: "/profil/visi-misi" },
  { title: "Publikasi", path: "/kategori/berita-utama" },
  { title: "Perpustakaan", path: "/perpustakaan/laporan-kinerja-instansi-pemerintah" },
  { title: "Jadwal Dokter", path: "/jadwal-dokter" },
  { title: "Info Tempat Tidur", path: "/info-tempat-tidur" },
];

const trendingSearches = ["surat keterangan sehat jiwa", "jadwal dokter spesialis", "bpjs kesehatan", "penerimaan pegawai", "rekrutmen"];
const promotedSearches = ["Layanan Konsultasi Psikologi", "Medical Check Up Terpadu", "Fasilitas Rawat Inap VIP"];

const CTA = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(["pendaftaran online", "poliklinik"]);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const executeSearch = (query: string) => {
    if (query.trim()) {
      if (!recentSearches.includes(query.trim())) {
        setRecentSearches([query.trim(), ...recentSearches].slice(0, 3));
      }
      setIsFocused(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(searchQuery);
  };

  const removeRecentSearch = (item: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentSearches(recentSearches.filter(s => s !== item));
  };

  return (
    <>
      <section className="px-4 py-20 md:px-8 lg:py-25 xl:py-30 2xl:px-0">
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
              
              <div ref={searchRef} className="mb-8 relative max-w-[400px]">
                <form onSubmit={handleSearch} className="relative z-50 w-full">
                  <input
                    type="text"
                    placeholder="Cari di seluruh situs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    className={`w-full border border-stroke bg-white py-3 pl-6 pr-12 text-sm outline-none transition-all focus:border-primary dark:border-strokedark dark:bg-black dark:text-white dark:focus:border-primary ${isFocused ? 'rounded-t-2xl shadow-solid-4 border-b-transparent' : 'rounded-full'}`}
                  />
                  <button
                    type="submit"
                    aria-label="Cari Berita"
                    className="absolute right-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-white transition-all hover:opacity-90"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  </button>
                </form>

                {/* Dropdown Menu */}
                {isFocused && (
                  <div className="absolute left-0 top-full z-40 w-full rounded-b-2xl border border-t-0 border-stroke bg-white px-5 py-5 shadow-solid-4 dark:border-strokedark dark:bg-black">
                    {/* Yang sedang ramai dicari */}
                    <div className="mb-6">
                      <h4 className="mb-4 text-[13px] font-bold text-black dark:text-white flex items-center gap-1.5">
                        Yang sedang ramai dicari <span className="text-base">🔥</span>
                      </h4>
                      <ul className="flex flex-col gap-3">
                        {trendingSearches.map((item, idx) => (
                          <li key={idx} className="flex items-center justify-between group cursor-pointer" onClick={() => { setSearchQuery(item); executeSearch(item); }}>
                            <span className="text-sm font-medium text-black dark:text-white group-hover:text-primary transition-colors">
                              <span className="text-black dark:text-white font-bold mr-2 text-[13px]">#{idx + 1}</span>
                              {item}
                            </span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                              <polyline points="17 6 23 6 23 12"></polyline>
                            </svg>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Promoted */}
                    <div className="mb-6">
                      <h4 className="mb-4 text-[13px] font-bold text-black dark:text-white flex items-center gap-1.5">
                        Promoted <span className="text-base">📢</span>
                      </h4>
                      <ul className="flex flex-col gap-3">
                        {promotedSearches.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2 cursor-pointer group" onClick={() => { setSearchQuery(item); executeSearch(item); }}>
                            <div className="h-1 w-1 rounded-full bg-black dark:bg-white group-hover:bg-primary transition-colors"></div>
                            <span className="text-sm text-black dark:text-white group-hover:text-primary transition-colors">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Terakhir yang dicari */}
                    {recentSearches.length > 0 && (
                      <div>
                        <h4 className="mb-4 text-[13px] font-bold text-black dark:text-white">
                          Terakhir yang dicari
                        </h4>
                        <ul className="flex flex-col gap-3">
                          {recentSearches.map((item, idx) => (
                            <li key={idx} className="flex items-center justify-between group cursor-pointer">
                              <div className="flex items-center gap-2 grow" onClick={() => { setSearchQuery(item); executeSearch(item); }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-waterloo shrink-0">
                                  <circle cx="12" cy="12" r="10"></circle>
                                  <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                                <span className="text-sm text-waterloo group-hover:text-primary transition-colors">{item}</span>
                              </div>
                              <button aria-label="Hapus pencarian" onClick={(e) => removeRecentSearch(item, e)} className="text-waterloo hover:text-red-500 bg-gray-100 dark:bg-gray-800 rounded-full p-0.5 transition-colors">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <line x1="18" y1="6" x2="6" y2="18"></line>
                                  <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
                {quickLinks.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.path}
                    className="inline-flex items-center gap-2 rounded-full border border-stroke bg-white px-5 py-2.5 text-xs font-medium text-black shadow-solid-4 transition-all hover:bg-black hover:text-white dark:border-strokedark dark:bg-black dark:text-white dark:hover:bg-primary dark:hover:border-primary sm:text-sm"
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
