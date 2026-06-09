"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const quickLinks = [
  { title: "Berita", path: "/kategori/berita-utama" },
  { title: "PPID", path: "/ppid" },
  { title: "Jadwal Dokter", path: "/jadwal-dokter" },
  { title: "Info Tempat Tidur", path: "/info-tempat-tidur" },
  { title: "Tanya AI 🤖", path: "/tanya-ai" },
];

const trendingSearches = [
  "jadwal dokter",
  "informasi tempat tidur",
  "Pendaftaran online",
];
const promotedSearches = ["Rawat Jalan", "Rawat Inap", "Napza"];

const CTA = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "pendaftaran online",
    "poliklinik",
  ]);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
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
    setRecentSearches(recentSearches.filter((s) => s !== item));
  };

  return (
    <>
      <section className="px-4 py-20 md:px-8 lg:py-25 xl:py-30 2xl:px-0">
        <div className="max-w-c-1390 dark:bg-blacksection dark:stroke-strokedark mx-auto rounded-lg bg-linear-to-t from-[#F8F9FF] to-[#DEE7FF] px-7.5 py-12.5 md:px-12.5 xl:px-17.5 xl:py-0 dark:bg-linear-to-t dark:from-transparent dark:to-transparent">
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
              <h2 className="xl:text-sectiontitle4 mb-4 text-3xl font-bold text-black dark:text-white">
                Akses Cepat Layanan & Informasi
              </h2>
              <p className="text-body-color mb-8 dark:text-gray-400">
                Temukan informasi, layanan publik, profil institusi, serta
                dokumen penting RS Jiwa Prof. HB. Saanin Padang dengan lebih
                cepat melalui pintasan di bawah ini.
              </p>

              <div ref={searchRef} className="relative mb-8 max-w-[400px]">
                <form onSubmit={handleSearch} className="relative z-50 w-full">
                  <input
                    type="text"
                    placeholder="Cari di seluruh situs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    className={`border-stroke focus:border-primary dark:border-strokedark dark:focus:border-primary w-full border bg-white py-3 pr-12 pl-6 text-sm transition-all outline-none dark:bg-black dark:text-white ${
                      isFocused
                        ? "shadow-solid-4 rounded-t-2xl border-b-transparent"
                        : "rounded-full"
                    }`}
                  />
                  <button
                    type="submit"
                    aria-label="Cari Berita"
                    className="bg-primary absolute top-1/2 right-1 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-white transition-all hover:opacity-90"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  </button>
                </form>

                {/* Dropdown Menu */}
                {isFocused && (
                  <div className="border-stroke shadow-solid-4 dark:border-strokedark absolute top-full left-0 z-40 w-full rounded-b-2xl border border-t-0 bg-white px-5 py-5 dark:bg-black">
                    {/* Yang sedang ramai dicari */}
                    <div className="mb-6">
                      <h4 className="mb-4 flex items-center gap-1.5 text-[13px] font-bold text-black dark:text-white">
                        Yang sedang ramai dicari{" "}
                        <span className="text-base">🔥</span>
                      </h4>
                      <ul className="flex flex-col gap-3">
                        {trendingSearches.map((item, idx) => (
                          <li
                            key={idx}
                            className="group flex cursor-pointer items-center justify-between"
                            onClick={() => {
                              setSearchQuery(item);
                              executeSearch(item);
                            }}
                          >
                            <span className="group-hover:text-primary text-sm font-medium text-black transition-colors dark:text-white">
                              <span className="mr-2 text-[13px] font-bold text-black dark:text-white">
                                #{idx + 1}
                              </span>
                              {item}
                            </span>
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-red-500"
                            >
                              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                              <polyline points="17 6 23 6 23 12"></polyline>
                            </svg>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Promoted */}
                    <div className="mb-6">
                      <h4 className="mb-4 flex items-center gap-1.5 text-[13px] font-bold text-black dark:text-white">
                        Promoted <span className="text-base">📢</span>
                      </h4>
                      <ul className="flex flex-col gap-3">
                        {promotedSearches.map((item, idx) => (
                          <li
                            key={idx}
                            className="group flex cursor-pointer items-center gap-2"
                            onClick={() => {
                              setSearchQuery(item);
                              executeSearch(item);
                            }}
                          >
                            <div className="group-hover:bg-primary h-1 w-1 rounded-full bg-black transition-colors dark:bg-white"></div>
                            <span className="group-hover:text-primary text-sm text-black transition-colors dark:text-white">
                              {item}
                            </span>
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
                            <li
                              key={idx}
                              className="group flex cursor-pointer items-center justify-between"
                            >
                              <div
                                className="flex grow items-center gap-2"
                                onClick={() => {
                                  setSearchQuery(item);
                                  executeSearch(item);
                                }}
                              >
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-waterloo shrink-0"
                                >
                                  <circle cx="12" cy="12" r="10"></circle>
                                  <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                                <span className="text-waterloo group-hover:text-primary text-sm transition-colors">
                                  {item}
                                </span>
                              </div>
                              <button
                                aria-label="Hapus pencarian"
                                onClick={(e) => removeRecentSearch(item, e)}
                                className="text-waterloo rounded-full bg-gray-100 p-0.5 transition-colors hover:text-red-500 dark:bg-gray-800"
                              >
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
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
                    className="border-stroke shadow-solid-4 dark:border-strokedark dark:hover:bg-primary dark:hover:border-primary inline-flex items-center gap-2 rounded-full border bg-white px-5 py-2.5 text-xs font-medium text-black transition-all hover:bg-black hover:text-white sm:text-sm dark:bg-black dark:text-white"
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
              className="animate_right py-8 lg:w-[35%] xl:py-16"
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
