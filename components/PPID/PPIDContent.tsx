"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const categories = [
  { id: 1, name: "Informasi Serta Merta" },
  { id: 3, name: "Informasi Berkala" },
  { id: 6, name: "Informasi Yang Dikecualikan" },
  { id: 2, name: "Informasi Tersedia Setiap Saat" },
];

const PPIDContent = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when category changes
    setSearchQuery(""); // Reset search when category changes
    const fetchDocuments = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `/api/ppid?id_instansi=17&id_category=${activeTab}`
        );
        if (!response.ok) {
          throw new Error("Gagal mengambil data dari server PPID");
        }
        const responseData = await response.json();
        
        let list = [];
        if (Array.isArray(responseData)) {
          list = responseData;
        } else if (responseData && typeof responseData === 'object') {
          list = responseData.data || responseData.result || [];
        }
        
        setDocuments(Array.isArray(list) ? list : []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [activeTab]);

  const filteredDocuments = documents.filter((doc) => {
    const title = (doc.title_content || doc.title || doc.judul || "").toLowerCase();
    const category = (doc.title_sub_category || doc.category || "").toLowerCase();
    const year = (doc.tahun || doc.year || "").toString().toLowerCase();
    const query = searchQuery.toLowerCase();
    
    return title.includes(query) || category.includes(query) || year.includes(query);
  });

  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
  const displayDocuments = filteredDocuments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="mt-10 animate_top">
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeTab === cat.id
                ? "bg-[#1e3a8a] text-white shadow-lg scale-105"
                : "bg-white text-black hover:bg-gray-100 shadow-md dark:bg-blacksection dark:text-white"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Document Search and List */}
      <div className="rounded-xl border border-stroke bg-white p-7.5 shadow-solid-13 dark:border-strokedark dark:bg-blacksection min-h-[400px]">
        {/* Search Bar */}
        {!loading && !error && documents.length > 0 && (
          <div className="mb-8 relative max-w-[400px]">
            <input
              type="text"
              placeholder="Cari judul informasi atau tahun..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to first page when searching
              }}
              className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-12 pr-4 outline-none transition-all focus:border-[#1e3a8a] dark:border-strokedark dark:focus:border-[#1e3a8a]"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-waterloo">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-waterloo hover:text-black dark:hover:text-white"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-center h-full">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#1e3a8a] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-waterloo">Memuat dokumen kategori {categories.find(c => c.id === activeTab)?.name}...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 text-center text-red-500 h-full">
            <p>{error}</p>
            <button 
              onClick={() => setActiveTab(activeTab)} 
              className="mt-4 text-[#1e3a8a] underline"
            >
              Coba lagi
            </button>
          </div>
        ) : documents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center text-waterloo h-full">
            <svg width="68" height="68" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-20 mb-4">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="9" y1="15" x2="15" y2="15"></line>
              <line x1="9" y1="11" x2="15" y2="11"></line>
              <line x1="9" y1="19" x2="15" y2="19"></line>
            </svg>
            <p>Tidak ada dokumen yang ditemukan untuk kategori ini.</p>
          </div>
        ) : filteredDocuments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center text-waterloo h-full">
            <svg width="68" height="68" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-20 mb-4">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <p>Tidak ada hasil untuk pencarian <span className="font-bold text-black dark:text-white">"{searchQuery}"</span>.</p>
            <button 
              onClick={() => setSearchQuery("")}
              className="mt-4 text-[#1e3a8a] font-semibold hover:underline"
            >
              Bersihkan pencarian
            </button>
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[600px] md:min-w-full">
                <thead>
                  <tr className="border-b border-stroke dark:border-strokedark">
                    <th className="pb-5 font-bold text-black dark:text-white">Judul Informasi</th>
                    <th className="pb-5 font-bold text-black dark:text-white text-center">Tahun</th>
                    <th className="pb-5 font-bold text-black dark:text-white text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {displayDocuments.map((doc, idx) => {
                    const title = doc.title_content || doc.title || doc.judul || "Berkas Informasi";
                      const downloadUrl = doc.downloads || doc.link || doc.ssr_downloads;
                      
                      return (
                        <tr key={idx} className="border-b border-stroke last:border-0 dark:border-strokedark hover:bg-gray-50 dark:hover:bg-black/20 transition-colors">
                          <td className="py-5 pr-4">
                            <p className="font-semibold text-black dark:text-white line-clamp-2 leading-snug">
                              {title}
                            </p>
                            <span className="text-xs text-waterloo mt-1.5 inline-flex items-center gap-1">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="7 10 12 15 17 10"></polyline>
                                <line x1="12" y1="15" x2="12" y2="3"></line>
                              </svg>
                              {doc.title_sub_category || doc.category || "Dokumen Publik"}
                            </span>
                          </td>
                          <td className="py-5 text-center text-waterloo font-medium">
                            {doc.tahun || doc.year || "-"}
                          </td>
                          <td className="py-5 text-right">
                            {downloadUrl ? (
                              <a
                                href={downloadUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-md bg-[#1e3a8a] px-4 py-2 text-sm font-bold text-white hover:bg-opacity-90 transition-all duration-300 whitespace-nowrap"
                              >
                                Unduh
                              </a>
                            ) : (
                              <span className="text-xs text-gray-400">Berkas tidak tersedia</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {filteredDocuments.length > itemsPerPage && (
              <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-stroke pt-10 dark:border-strokedark">
                <p className="text-sm font-medium text-black dark:text-white">
                  Menampilkan {Math.min((currentPage - 1) * itemsPerPage + 1, filteredDocuments.length)} Sampai {Math.min(currentPage * itemsPerPage, filteredDocuments.length)} Dari {filteredDocuments.length} Dokumen
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="flex h-10 w-10 items-center justify-center rounded-md border border-stroke bg-white text-black transition-all hover:bg-[#1e3a8a] hover:text-white disabled:opacity-50 dark:border-strokedark dark:bg-blacksection dark:text-white"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>
                  
                  {Array.from({ length: Math.ceil(documents.length / itemsPerPage) }, (_, i) => i + 1)
                    .filter(page => {
                      // Logic to show limited page numbers
                      const total = Math.ceil(documents.length / itemsPerPage);
                      if (total <= 5) return true;
                      if (page === 1 || page === total) return true;
                      if (Math.abs(page - currentPage) <= 1) return true;
                      return false;
                    })
                    .map((page, index, array) => (
                      <React.Fragment key={page}>
                        {index > 0 && array[index - 1] !== page - 1 && (
                          <span className="text-waterloo">...</span>
                        )}
                        <button
                          onClick={() => setCurrentPage(page)}
                          className={`flex h-10 w-10 items-center justify-center rounded-md border font-medium transition-all ${
                            currentPage === page
                              ? "border-[#1e3a8a] bg-[#1e3a8a] text-white"
                              : "border-stroke bg-white text-black hover:bg-gray-100 dark:border-strokedark dark:bg-blacksection dark:text-white dark:hover:bg-black"
                          }`}
                        >
                          {page}
                        </button>
                      </React.Fragment>
                    ))}

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="flex h-10 w-10 items-center justify-center rounded-md border border-stroke bg-white text-black transition-all hover:bg-[#1e3a8a] hover:text-white disabled:opacity-50 dark:border-strokedark dark:bg-blacksection dark:text-white"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Manual Request Info */}
      <div className="mt-10 p-8 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="grow text-center md:text-left">
            <h4 className="text-xl font-bold text-[#1e3a8a] dark:text-white mb-2">
              Tidak menemukan informasi yang Anda cari?
            </h4>
            <p className="text-body-color dark:text-body-color-dark">
              Anda berhak mengajukan permohonan informasi publik kepada PPID RSJ Prof HB Saanin sesuai dengan UU No. 14 Tahun 2008.
            </p>
          </div>
          <a
            href="https://ppid.sumbarprov.go.id"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center justify-center rounded-full bg-[#1e3a8a] px-7.5 py-3 text-white duration-300 ease-in-out hover:opacity-90"
          >
            Ajukan Permohonan
            <svg className="ml-2" width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 1L17 7L11 13M1 7H17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PPIDContent;
