"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WhistleBlowingSystem = () => {
  // State for FAQ Accordion
  const [isFaqOpen, setIsFaqOpen] = useState(true);

  const handleContactClick = () => {
    window.location.href = "https://forms.gle/MM8xYLM6JEbcwuyd7";
  };

  return (
    <>
      <section
        id="wbs-hero"
        className="relative overflow-hidden pt-35 pb-20 lg:pt-40 lg:pb-25 xl:pt-45 xl:pb-30"
      >
        {/* Background Decorative Glow Circles */}
        <div className="absolute top-[10%] left-[-15%] -z-10 h-[450px] w-[450px] rounded-full bg-blue-400/8 blur-[120px] dark:bg-blue-600/5" />
        <div className="absolute top-[50%] right-[-15%] -z-10 h-[500px] w-[500px] rounded-full bg-blue-500/8 blur-[130px] dark:bg-blue-500/5" />

        <div className="max-w-c-1280 mx-auto px-4 md:px-8 xl:px-0">
          {/* ================= HERO SECTION (TENNIS-STYLE CARD DESIGN) ================= */}
          <div className="group relative mb-20 flex min-h-[580px] w-full flex-col justify-between overflow-hidden rounded-[2.5rem] border border-blue-200/10 p-8 shadow-2xl md:p-12 lg:min-h-[640px] lg:p-16 dark:border-blue-800/10">
            {/* The sharp hospital building image background */}
            <img
              src="/images/hero/wbs-hero-bg.jpg"
              alt="Kawasan Zona Integritas RSJ Prof Dr HB Saanin"
              className="absolute inset-0 -z-10 h-full w-full object-cover object-center transition-transform duration-[4000ms] ease-out group-hover:scale-103"
            />
            {/* Elegant glass overlay (dimmer and blue tint for readability) */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-950/70 via-blue-950/60 to-blue-950/90" />

            {/* Top Decor spacer */}
            <div />

            {/* Centered Main Content Area */}
            <div className="animate_top mx-auto max-w-4xl py-10 text-center">
              <span className="mb-6 inline-block rounded-full border border-white/20 bg-white/10 px-4.5 py-1.5 text-xs font-bold tracking-wider text-blue-200 uppercase shadow-sm backdrop-blur-md">
                INTEGRITAS & TRANSPARANSI
              </span>
              <h1 className="mb-6 text-3xl leading-tight font-extrabold tracking-tight text-white xl:text-5xl">
                Whistle Blowing System{" "}
                <span className="text-blue-300">(WBS)</span>
              </h1>
              <p className="mx-auto mb-8 max-w-3xl text-base leading-relaxed font-medium text-white/85 md:text-lg">
                Sarana pengaduan resmi bagi Anda untuk melaporkan segala bentuk
                pelanggaran, kecurangan, atau tindakan tidak etis di lingkungan
                RSJ Prof. HB. Saanin demi menjaga komitmen pelayanan yang bersih
                dan berintegritas.
              </p>
              <button
                onClick={handleContactClick}
                className="inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-blue-500 px-8 py-3.5 text-base font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-600 hover:shadow-blue-500/30 active:scale-95"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
                </svg>
                Buat Pengaduan
              </button>
            </div>

            {/* Bottom Row Area (Left: Secure Row / Right: Quick Info Links) */}
            <div className="mt-10 flex w-full flex-col items-end justify-between gap-6 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
              {/* Left Side: Secure Row glass card */}
              <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
                {/* Visual Avatar Row representing safe, supportive services */}
                <div className="flex -space-x-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border border-blue-400 bg-blue-500 text-[10px] font-bold text-white shadow-sm">
                    🔒
                  </div>
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border border-green-400 bg-green-500 text-[10px] font-bold text-white shadow-sm">
                    ✔
                  </div>
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border border-cyan-400 bg-cyan-500 text-[10px] font-bold text-white shadow-sm">
                    👤
                  </div>
                </div>
                <span className="text-xs font-bold text-white/90">
                  Laporan Dijamin 100% Aman & Anonim
                </span>
              </div>

              {/* Right Side: Quick info links like Social/Phone */}
              <div className="flex items-center gap-5 text-xs font-bold text-white/80">
                <a
                  href="mailto:rjshbsaanin@yahoo.co.id"
                  className="flex items-center gap-1.5 transition-colors hover:text-blue-300"
                >
                  rjshbsaanin@yahoo.co.id ↗
                </a>
                <span className="h-3 w-px bg-white/20" />
                <a
                  href="tel:075172001"
                  className="flex items-center gap-1.5 transition-colors hover:text-blue-300"
                >
                  (0751) 72001 ↗
                </a>
              </div>
            </div>
          </div>

          {/* ================= ALUR CARA KERJA WBS ================= */}
          <div id="wbs-alur" className="mb-20 scroll-mt-25">
            <div className="animate_top mb-12 text-center">
              <h2 className="text-2xl font-bold tracking-tight text-blue-950 xl:text-3xl dark:text-blue-100">
                Cara Kerja WBS
              </h2>
              <p className="mt-2 text-sm font-bold text-blue-500/80 dark:text-blue-400/80">
                Bagaimana Whistleblowing System bekerja?
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8.5 md:grid-cols-3">
              {/* Langkah 1 */}
              <div
                className="animate_top group relative rounded-2xl border border-blue-200/20 bg-blue-500/5 p-8 shadow-lg shadow-blue-500/3 transition-all duration-300 hover:border-blue-400/40 hover:bg-blue-500/10 dark:border-blue-800/20 dark:bg-blue-950/10"
                style={{
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                }}
              >
                <div className="absolute -top-6 -left-3 text-7xl font-extrabold text-blue-500/10 transition-transform duration-300 select-none group-hover:scale-110 dark:text-blue-400/5">
                  01
                </div>
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-blue-200/20 bg-blue-500/10 dark:border-blue-800/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="text-blue-500 dark:text-blue-400"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
                  </svg>
                </div>
                <h3 className="mb-3 text-lg font-bold text-blue-950 transition-colors group-hover:text-blue-500 dark:text-blue-100 dark:group-hover:text-blue-400">
                  Mengirim Laporan
                </h3>
                <p className="text-sm leading-relaxed font-semibold text-blue-950/70 dark:text-blue-100/70">
                  Pelapor mengirim aduan dengan cara klik tombol{" "}
                  <span className="font-bold text-blue-500 dark:text-blue-400">
                    Buat Pengaduan
                  </span>{" "}
                  untuk menyusun dokumen aduan melalui saluran email resmi kami,
                  serta melampirkan berkas bukti pendukung terkait.
                </p>
              </div>

              {/* Langkah 2 */}
              <div
                className="animate_top group relative rounded-2xl border border-blue-200/20 bg-blue-500/5 p-8 shadow-lg shadow-blue-500/3 transition-all duration-300 hover:border-blue-400/40 hover:bg-blue-500/10 dark:border-blue-800/20 dark:bg-blue-950/10"
                style={{
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                }}
              >
                <div className="absolute -top-6 -left-3 text-7xl font-extrabold text-blue-500/10 transition-transform duration-300 select-none group-hover:scale-110 dark:text-blue-400/5">
                  02
                </div>
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-blue-200/20 bg-blue-500/10 dark:border-blue-800/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="text-blue-500 dark:text-blue-400"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="16" rx="2"></rect>
                    <path d="m3 10 9 6 9-6"></path>
                  </svg>
                </div>
                <h3 className="mb-3 text-lg font-bold text-blue-950 transition-colors group-hover:text-blue-500 dark:text-blue-100 dark:group-hover:text-blue-400">
                  Laporan Diterima
                </h3>
                <p className="text-sm leading-relaxed font-semibold text-blue-950/70 dark:text-blue-100/70">
                  Laporan yang diterima oleh sistem akan diverifikasi terlebih
                  dahulu oleh tim admin unit kepatuhan integritas RSJ Prof. Dr.
                  HB. Saanin Padang secara rahasia dan aman.
                </p>
              </div>

              {/* Langkah 3 */}
              <div
                className="animate_top group relative rounded-2xl border border-blue-200/20 bg-blue-500/5 p-8 shadow-lg shadow-blue-500/3 transition-all duration-300 hover:border-blue-400/40 hover:bg-blue-500/10 dark:border-blue-800/20 dark:bg-blue-950/10"
                style={{
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                }}
              >
                <div className="absolute -top-6 -left-3 text-7xl font-extrabold text-blue-500/10 transition-transform duration-300 select-none group-hover:scale-110 dark:text-blue-400/5">
                  03
                </div>
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-blue-200/20 bg-blue-500/10 dark:border-blue-800/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="text-blue-500 dark:text-blue-400"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                </div>
                <h3 className="mb-3 text-lg font-bold text-blue-950 transition-colors group-hover:text-blue-500 dark:text-blue-100 dark:group-hover:text-blue-400">
                  Verifikasi Laporan
                </h3>
                <p className="text-sm leading-relaxed font-semibold text-blue-950/70 dark:text-blue-100/70">
                  Pelaporan akan ditindaklanjuti dan diverifikasi keasliannya
                  setelah laporan dikirimkan.
                </p>
              </div>
            </div>
          </div>

          {/* ================= FREQUENTLY ASKED QUESTION (FAQ) ================= */}
          <div id="wbs-faq" className="mb-20 scroll-mt-25">
            <div className="animate_top mb-10 text-center">
              <h2 className="text-2xl font-bold tracking-tight text-blue-950 xl:text-3xl dark:text-blue-100">
                Frequently Asked Question
              </h2>
              <p className="mt-2 text-sm font-bold text-blue-500/80 dark:text-blue-400/80">
                Pelajari lebih lanjut mengenai Whistleblowing System.
              </p>
            </div>

            <div className="mx-auto max-w-3xl space-y-4">
              <div
                className="animate_top overflow-hidden rounded-2xl border border-blue-200/20 bg-blue-500/5 shadow-lg dark:border-blue-800/20 dark:bg-blue-950/10"
                style={{
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                }}
              >
                <button
                  onClick={() => setIsFaqOpen(!isFaqOpen)}
                  className="flex w-full items-center justify-between p-6 text-left font-bold text-blue-950 transition-colors duration-300 hover:text-blue-500 dark:text-blue-100 dark:hover:text-blue-400"
                >
                  <span className="text-base md:text-lg">
                    Bagaimana cara melakukan pelaporan/pengaduan ?
                  </span>
                  <span
                    className={`transform text-blue-500 transition-transform duration-300 dark:text-blue-400 ${
                      isFaqOpen ? "rotate-180" : ""
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </button>

                <AnimatePresence>
                  {isFaqOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="border-t border-blue-200/10 px-6 pt-1 pb-6 text-sm leading-relaxed font-semibold text-blue-950/70 md:text-base dark:border-blue-800/10 dark:text-blue-100/70">
                        Anda dapat melakukan pelaporan secara mudah dan cepat
                        dengan cara mengklik tombol{" "}
                        <span className="font-bold text-blue-500 dark:text-blue-400">
                          Buat Pengaduan
                        </span>{" "}
                        atau mengirimkannya langsung melalui surel resmi kami
                        perihal rincian pelanggaran, serta melampirkan berkas
                        bukti pendukung terkait. Identitas Anda dijamin aman dan
                        dapat dirahasiakan (Anonim).
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* ================= LOKASI KAMI ================= */}
          <div id="wbs-lokasi" className="animate_top scroll-mt-25">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-bold tracking-tight text-blue-950 xl:text-3xl dark:text-blue-100">
                Lokasi Kami
              </h2>
              <p className="mt-2 text-sm font-bold text-blue-500/80 dark:text-blue-400/80">
                Hubungi kami atau kunjungi kantor pelayanan resmi kami
              </p>
            </div>

            <div
              className="flex flex-col items-center gap-8 rounded-3xl border border-blue-200/20 bg-blue-500/5 p-6 shadow-2xl md:p-8 lg:flex-row dark:border-blue-800/20 dark:bg-blue-950/10"
              style={{
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
            >
              {/* Iframe Peta Google Maps RSJ HB Saanin */}
              <div className="h-[350px] w-full overflow-hidden rounded-2xl border border-blue-200/30 shadow-md lg:w-1/2 dark:border-blue-800/30">
                <iframe
                  title="Peta Lokasi RSJ Prof Dr HB Saanin Padang"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.27756281489!2d100.45711117424683!3d-0.9441866990575775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2fd4b75d9fc243df%3A0x81ab3052a670d12e!2sRumah+Sakit+Jiwa+Prof.+Dr.+HB.+Saanin+Padang!5e0!3m2!1sid!2sid!4v1716335198902!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              {/* Rincian Alamat */}
              <div className="w-full space-y-6 lg:w-1/2">
                <div>
                  <h3 className="mb-2 flex items-center gap-2 text-lg font-bold text-blue-950 dark:text-blue-100">
                    <svg
                      className="text-blue-500 dark:text-blue-400"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    Alamat RSJ Pro HB Saanin
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed font-semibold text-blue-950/70 dark:text-blue-100/70">
                    Jl. Raya Ulu Gadut Padang, Kelurahan Limau Manis Selatan,
                    Kecamatan Pauh 25129, Sumatera Barat, Indonesia.
                  </p>
                  <a
                    href="https://maps.app.goo.gl/MRQwLowzxsbhSZJNA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-blue-500 px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-blue-600 hover:shadow-blue-500/20 active:scale-95"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 3h6v6"></path>
                      <path d="M10 14 21 3"></path>
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    </svg>
                    Buka di Google Maps
                  </a>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <h4 className="mb-2 flex items-center gap-2 text-sm font-bold text-blue-950 dark:text-blue-100">
                      <svg
                        className="text-blue-500 dark:text-blue-400"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                      Hubungi Email
                    </h4>
                    <p className="text-sm font-semibold text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
                      <a href="mailto:rjshbsaanin@yahoo.co.id">
                        rjshbsaanin@yahoo.co.id
                      </a>
                    </p>
                  </div>

                  <div>
                    <h4 className="mb-2 flex items-center gap-2 text-sm font-bold text-blue-950 dark:text-blue-100">
                      <svg
                        className="text-blue-500 dark:text-blue-400"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                      No. Telepon
                    </h4>
                    <p className="text-sm font-semibold text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
                      <a href="tel:075172001">(0751) 72001</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhistleBlowingSystem;
