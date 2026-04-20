"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarMenus = [
  { title: "RPJMD", path: "#" }, // as per screenshot, but user didn't ask for API for this
  { title: "Renstra", path: "#" },
  { title: "Edukasi Bencana", path: "#" },
  { title: "Unduh Data", path: "/perpustakaan/download" },
  { title: "Infografis", path: "/perpustakaan/infografis" },
  { title: "Laporan Kinerja", path: "/perpustakaan/laporan-kinerja-instansi-pemerintah" },
  { title: "Perjanjian Kinerja", path: "/perpustakaan/perjanjian-kinerja" },
  { title: "Rencana Kerja", path: "/perpustakaan/rencana-kerja" },
  { title: "Rencana Kinerja Tahunan", path: "/perpustakaan/rencana-kinerja-tahunan" },
  { title: "Rencana Strategis", path: "/perpustakaan/rencana-strategis" }, // also renstra?
  { title: "SOP", path: "/perpustakaan/sop" },
  { title: "Indikator Kinerja Individu", path: "/perpustakaan/indikator-kinerja-individu" },
  { title: "Renaksi & Realisasi Renaksi", path: "/perpustakaan/renaksi-dan-realisasi-renaksi" },
  { title: "SKP", path: "/perpustakaan/skp" },
  { title: "IKU", path: "/perpustakaan/iku" },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-full lg:w-1/4 xl:w-1/4 space-y-5">
      <div className="overflow-hidden rounded-xl border border-stroke bg-white shadow-solid-13 dark:border-strokedark dark:bg-blacksection shrink-0">
        <div className="bg-[#1e3a8a] px-6 py-4 flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
          </svg>
          <h3 className="text-xl font-bold text-white">Perpustakaan</h3>
        </div>
        <div className="flex flex-col py-2">
          {sidebarMenus.map((menu, idx) => {
            // we ignore the first 3 placeholders if they are not requested, but keeping them to match screenshot exactly if they want
            const isActive = pathname.startsWith(menu.path) && menu.path !== "#" || pathname === menu.path;
            
            return (
              <Link
                key={idx}
                href={menu.path}
                className={`flex items-center gap-3 px-6 py-3.5 text-base font-medium duration-300 ease-in-out hover:bg-gray-100 hover:text-primary dark:hover:bg-gray-800 ${
                  isActive ? "border-l-4 border-[#1e3a8a] bg-gray-50 text-[#1e3a8a] dark:bg-gray-800 dark:text-white" : "border-l-4 border-transparent text-body-color dark:text-gray-400"
                }`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                {menu.title}
              </Link>
            )
          })}
        </div>
      </div>
      
      {/* Pusat Unduhan module below as seen in screenshot */}
      <div className="rounded-xl border border-blue-200 bg-[#eff6ff] p-6 dark:border-strokedark dark:bg-blacksection">
        <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-[#1e3b8a] dark:text-white">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Pusat Unduhan
        </h4>
        <p className="text-sm text-body-color dark:text-gray-400">
          Semua dokumen publik resmi RS Jiwa Prof. HB. Saanin Padang dapat diakses dan diunduh melalui menu ini.
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
