"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Doctor } from "@/types/doctor";
import { getSpecialtyName, getInitials } from "@/utils/specialtyHelper";

const DoctorScheduleTable = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("ALL");

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("https://api-simrsj.rsjhbsaanin.com/dokter");
        if (!response.ok) {
          throw new Error("Gagal mengambil data dokter dari server");
        }
        const data = await response.json();
        setDoctors(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Extract unique specialties from doctors for the filter dropdown
  const uniqueSpecialties = Array.from(
    new Set(doctors.flatMap((doc) => doc.poli_kdsubspesialis))
  ).sort();

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch =
      doc.dokter_nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.poli_kdsubspesialis.some((code) =>
        getSpecialtyName(code).toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesSpecialty =
      selectedSpecialty === "ALL" ||
      doc.poli_kdsubspesialis.includes(selectedSpecialty);

    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="mt-10 animate_top">
      <div className="rounded-xl border border-stroke bg-white p-7.5 shadow-solid-13 dark:border-strokedark dark:bg-blacksection min-h-[400px]">
        {/* Controls */}
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full max-w-[400px]">
            <input
              type="text"
              placeholder="Cari nama dokter atau spesialisasi..."
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

          <div className="relative w-full max-w-[250px]">
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full appearance-none rounded-lg border border-stroke bg-transparent py-3 pl-5 pr-10 outline-none transition-all focus:border-primary dark:border-strokedark dark:bg-black dark:focus:border-primary"
            >
              <option value="ALL">Semua Spesialisasi</option>
              {uniqueSpecialties.map((code) => (
                <option key={code} value={code}>
                  {getSpecialtyName(code)}
                </option>
              ))}
            </select>
            <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-waterloo">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </span>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p className="mt-4 text-waterloo">Memuat jadwal dokter...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 text-center text-red-500">
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className="mt-4 text-primary underline">
              Coba lagi
            </button>
          </div>
        ) : filteredDoctors.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center text-waterloo font-medium">
            <p className="text-xl">Tidak ada data dokter ditemukan.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-stroke dark:border-strokedark">
                  <th className="pb-5 font-bold text-black dark:text-white">Foto</th>
                  <th className="pb-5 font-bold text-black dark:text-white">Nama Dokter</th>
                  <th className="pb-5 font-bold text-black dark:text-white">Spesialisasi</th>
                  <th className="pb-5 font-bold text-black dark:text-white">Jadwal Praktik</th>
                </tr>
              </thead>
              <tbody>
                {filteredDoctors.map((doc, idx) => {
                  const hasImage = doc.foto_pegawai && doc.foto_pegawai.trim() !== "" && !doc.foto_pegawai.endsWith("/");
                  
                  return (
                    <tr key={idx} className="border-b border-stroke last:border-0 dark:border-strokedark hover:bg-gray-50 dark:hover:bg-black/20 transition-colors">
                      <td className="py-5 pr-4">
                        <div className="relative h-14 w-14 overflow-hidden rounded-full border border-stroke dark:border-strokedark bg-gray-50 dark:bg-btndark">
                          {hasImage ? (
                            <Image
                              src={doc.foto_pegawai}
                              alt={doc.dokter_nama}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-xs font-bold text-primary">
                              {getInitials(doc.dokter_nama)}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-5 pr-4">
                        <p className="font-bold text-black dark:text-white">
                          {doc.dokter_nama}
                        </p>
                        <p className="text-xs text-primary font-medium mt-1">
                          {doc.profesi}
                        </p>
                      </td>
                      <td className="py-5 pr-4">
                        <div className="flex flex-wrap gap-1">
                          {doc.poli_kdsubspesialis.map((code) => (
                            <span
                              key={code}
                              className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                            >
                              {getSpecialtyName(code)}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-5">
                        {doc.hari && doc.hari.length > 0 ? (
                          <ul className="space-y-1">
                            {doc.hari.map((h, i) => (
                              <li key={i} className="text-sm text-waterloo dark:text-gray-400 flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0"></div>
                                {h}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-xs text-gray-400 italic">Jadwal tidak tersedia</span>
                        )}
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

export default DoctorScheduleTable;
