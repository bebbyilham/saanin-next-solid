"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

type CategoryListProps = {
  data: any[];
  category: string;
  titleText: string;
  baseUrl: string;
  pageMeta: {
    totalItems: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
    nextPage: number | null;
    prevPage: number | null;
  };
};

export default function CategoryList({ data, category, titleText, baseUrl, pageMeta }: CategoryListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Client-side filtering on current page's data
  const filteredData = data.filter((item) => 
    item.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full rounded-xl border border-stroke bg-white p-7.5 shadow-solid-13 dark:border-strokedark dark:bg-blacksection">
      <h2 className="mb-6 border-b-2 border-primary pb-2 text-3xl font-bold text-black dark:text-white inline-block">
        {titleText}
      </h2>
      
      {/* Search Input */}
      {data.length > 0 && (
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`Cari dokumen ${titleText}...`}
              className="w-full rounded-full border border-stroke bg-gray-50 px-6 py-3 pl-12 shadow-sm focus:border-primary focus:outline-none dark:border-strokedark dark:bg-black dark:text-white transition-colors"
            />
            <svg
              className="absolute left-5 top-1/2 -translate-y-1/2 opacity-50"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          {(searchTerm !== "" || pageMeta.totalItems > 0) && (
            <p className="mt-4 text-xs text-body-color dark:text-gray-400">
               {searchTerm !== "" 
                  ? `Ditemukan ${filteredData.length} hasil dari kata kunci pencarian` 
                  : `Menampilkan dokumen halaman ${pageMeta.currentPage} dari total ${pageMeta.totalItems} dokumen`}
            </p>
          )}
        </div>
      )}

      {/* Content Rendering */}
      {data.length === 0 ? (
        <div className="py-10 text-center text-gray-500">
          Belum ada data dokumen untuk kategori ini.
        </div>
      ) : filteredData.length === 0 ? (
         <div className="py-10 text-center text-gray-500">
           Tidak ditemukan dokumen yang cocok dengan kata &quot;{searchTerm}&quot;.
         </div>
      ) : category === "infografis" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          {filteredData.map((item: any, key: number) => (
            <div key={key} className="group relative block overflow-hidden rounded-xl border border-stroke dark:border-strokedark shadow-solid-8 aspect-square">
              {item.gambar ? (
                <Link href={`/perpustakaan/${category}/${item.slug}`}>
                  <Image
                    src={baseUrl + item.gambar}
                    alt={item.title || "Infografis"}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105 group-hover:opacity-80"
                    unoptimized
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     <span className="bg-black/60 text-white px-6 py-2 rounded-full font-medium border border-white/40">Lihat</span>
                  </div>
                </Link>
              ) : (
                <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                  No Image
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredData.map((item: any, key: number) => (
            <Link 
              key={key} 
              href={`/perpustakaan/${category}/${item.slug}`}
              className="flex items-center gap-4 rounded-xl border border-stroke bg-white p-4 transition-all duration-300 hover:border-primary hover:shadow-solid-4 dark:border-strokedark dark:bg-blacksection"
            >
              <div className="flex h-16 w-14 shrink-0 flex-col items-center justify-center rounded bg-red-50 text-red-500 shadow-sm border border-red-100">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                <span className="mt-1 text-[10px] font-bold">PDF</span>
              </div>
              
              <div className="flex-1">
                <h4 className="text-base font-bold text-black line-clamp-1 dark:text-white group-hover:text-primary">
                  {item.title}
                </h4>
                <p className="mt-1 text-sm text-body-color dark:text-gray-400">
                  {item.created_at ? item.created_at.split(' ').slice(0, 3).join(' ') : ""}
                </p>
              </div>
              
              <div className="hidden sm:block opacity-40">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {pageMeta.totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-3">
           <button 
             onClick={() => pageMeta.prevPage && handlePageChange(pageMeta.prevPage)}
             disabled={!pageMeta.prevPage}
             className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white hover:border-primary hover:text-primary disabled:opacity-50 disabled:hover:border-stroke disabled:hover:text-body-color dark:border-strokedark dark:bg-blacksection"
           >
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
               <polyline points="15 18 9 12 15 6"></polyline>
             </svg>
           </button>
           
           <span className="text-sm font-medium">Halaman {pageMeta.currentPage} dari {pageMeta.totalPages}</span>
           
           <button 
             onClick={() => pageMeta.nextPage && handlePageChange(pageMeta.nextPage)}
             disabled={!pageMeta.nextPage}
             className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white hover:border-primary hover:text-primary disabled:opacity-50 disabled:hover:border-stroke disabled:hover:text-body-color dark:border-strokedark dark:bg-blacksection"
           >
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
               <polyline points="9 18 15 12 9 6"></polyline>
             </svg>
           </button>
        </div>
      )}
    </div>
  );
}
