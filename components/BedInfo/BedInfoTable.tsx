"use client";

import React, { useState, useEffect } from "react";

interface BedInfo {
  id_bed_available: number;
  koderuang: string;
  namaruang: string;
  kodekelas: string;
  namakelas: string;
  kapasitas: number;
  tersedia: number;
  tersediapria: number;
  tersediawanita: number;
  tersediapriawanita: string;
  statusruang: number;
  id_tt: string;
}

interface BedInfoResponse {
  response: {
    list_tempat_tidur: BedInfo[];
    total_kapasitas: number;
    total_tersedia: number;
    total_terisi: number;
  };
  metadata: {
    message: string;
    code: number;
  };
}

const BedInfoTable = () => {
  const [bedData, setBedData] = useState<BedInfoResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBedInfo = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/bed-info");
        if (!response.ok) {
          throw new Error("Gagal mengambil data ketersediaan tempat tidur");
        }
        const data = await response.json();
        setBedData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBedInfo();
    
    // Refresh data every 60 seconds
    const interval = setInterval(fetchBedInfo, 60000);
    return () => clearInterval(interval);
  }, []);

  const beds = bedData?.response?.list_tempat_tidur || [];
  
  const filteredBeds = beds.filter((bed) => {
    return (
      bed.namaruang.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bed.namakelas.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="mt-10 animate_top">
      {/* Summary Cards */}
      {!loading && !error && bedData && (
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-stroke bg-white p-6 shadow-solid-13 dark:border-strokedark dark:bg-blacksection">
            <h4 className="mb-2 text-title-sm font-bold text-black dark:text-white">Total Kapasitas</h4>
            <p className="text-3xl font-bold text-primary">{bedData.response.total_kapasitas}</p>
          </div>
          <div className="rounded-xl border border-stroke bg-white p-6 shadow-solid-13 dark:border-strokedark dark:bg-blacksection">
            <h4 className="mb-2 text-title-sm font-bold text-black dark:text-white">Total Terisi</h4>
            <p className="text-3xl font-bold text-orange-500">{bedData.response.total_terisi}</p>
          </div>
          <div className="rounded-xl border border-stroke bg-white p-6 shadow-solid-13 dark:border-strokedark dark:bg-blacksection">
            <h4 className="mb-2 text-title-sm font-bold text-black dark:text-white">Total Tersedia</h4>
            <p className="text-3xl font-bold text-green-500">{bedData.response.total_tersedia}</p>
          </div>
        </div>
      )}

      <div className="rounded-xl border border-stroke bg-white p-7.5 shadow-solid-13 dark:border-strokedark dark:bg-blacksection min-h-[400px]">
        {/* Controls */}
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full max-w-[400px]">
            <input
              type="text"
              placeholder="Cari nama ruang atau kelas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-12 pr-4 outline-none transition-all focus:border-primary dark:border-strokedark dark:focus:border-primary"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-waterloo">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p className="mt-4 text-waterloo">Memuat data ketersediaan tempat tidur...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 text-center text-red-500">
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className="mt-4 text-primary underline">
              Coba lagi
            </button>
          </div>
        ) : filteredBeds.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center text-waterloo font-medium">
            <p className="text-xl">Tidak ada data ruangan ditemukan.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-stroke dark:border-strokedark bg-gray-50 dark:bg-btndark">
                  <th className="py-4 px-4 font-bold text-black dark:text-white rounded-tl-lg">Ruangan</th>
                  <th className="py-4 px-4 font-bold text-black dark:text-white">Kelas</th>
                  <th className="py-4 px-4 font-bold text-black dark:text-white text-center">Kapasitas</th>
                  <th className="py-4 px-4 font-bold text-black dark:text-white text-center">Terisi</th>
                  <th className="py-4 px-4 font-bold text-black dark:text-white text-center rounded-tr-lg">Tersedia</th>
                </tr>
              </thead>
              <tbody>
                {filteredBeds.map((bed, idx) => {
                  const terisi = bed.kapasitas - bed.tersedia;
                  const percentTersedia = bed.kapasitas > 0 ? (bed.tersedia / bed.kapasitas) * 100 : 0;
                  
                  return (
                    <tr key={idx} className="border-b border-stroke last:border-0 dark:border-strokedark hover:bg-gray-50 dark:hover:bg-black/20 transition-colors">
                      <td className="py-4 px-4">
                        <p className="font-bold text-black dark:text-white">
                          {bed.namaruang}
                        </p>
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                          {bed.namakelas}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center font-medium">
                        {bed.kapasitas}
                      </td>
                      <td className="py-4 px-4 text-center text-orange-500 font-medium">
                        {terisi}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <span className={`font-bold ${bed.tersedia > 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {bed.tersedia}
                          </span>
                        </div>
                        {/* Progress bar indicator */}
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2 dark:bg-gray-700 max-w-[80px] mx-auto">
                          <div 
                            className={`h-1.5 rounded-full ${bed.tersedia > 0 ? 'bg-green-500' : 'bg-red-500'}`} 
                            style={{ width: `${percentTersedia}%` }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BedInfoTable;
