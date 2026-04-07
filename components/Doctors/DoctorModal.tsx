"use client";
import React from "react";
import Image from "next/image";
import { Doctor } from "@/types/doctor";
import { getSpecialtyName, getInitials } from "@/utils/specialtyHelper";

const DoctorModal = ({
  doctor,
  isOpen,
  onClose,
}: {
  doctor: Doctor | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen || !doctor) return null;

  const { dokter_nama, foto_pegawai, poli_kdsubspesialis, profesi, hari } =
    doctor;

  const hasImage =
    foto_pegawai &&
    foto_pegawai.trim() !== "" &&
    !foto_pegawai.endsWith("/");

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 transition-all duration-300">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl animate_top overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-blacksection">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-gray-500 hover:bg-gray-100 hover:text-black dark:text-gray-400 dark:hover:bg-white/20 dark:hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
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

        <div className="flex flex-col md:flex-row">
          {/* Sidebar / Photo */}
          <div className="bg-gray-50 p-8 dark:bg-black md:w-1/3">
            <div className="relative mx-auto h-[300px] w-full overflow-hidden rounded-xl border-4 border-white shadow-md dark:border-strokedark">
              {hasImage ? (
                <Image
                  src={foto_pegawai}
                  alt={dokter_nama}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-primary/10 text-4xl font-bold text-primary">
                  {getInitials(dokter_nama)}
                </div>
              )}
            </div>
          </div>

          {/* Main Info */}
          <div className="p-8 md:w-2/3">
            <h2 className="mb-2 text-2xl font-bold text-black dark:text-white">
              {dokter_nama}
            </h2>
            <p className="mb-6 inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
              {profesi}
            </p>

            <div className="mb-6">
              <h3 className="mb-3 flex items-center gap-2 font-semibold text-black dark:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m5 12 7-7 7 7"></path>
                  <path d="M12 19V5"></path>
                </svg>
                Spesialisasi
              </h3>
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {poli_kdsubspesialis && poli_kdsubspesialis.length > 0 ? (
                  poli_kdsubspesialis.map((kode, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                      {getSpecialtyName(kode)}
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-gray-500 italic">
                    Spesialisasi belum tersedia
                  </li>
                )}
              </ul>
            </div>

            <div>
              <h3 className="mb-3 flex items-center gap-2 font-semibold text-black dark:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Jadwal Praktik
              </h3>
              <div className="space-y-2">
                {hari && hari.length > 0 ? (
                  hari.map((jadwal, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg border border-stroke bg-gray-50 p-3 text-sm font-medium text-black dark:border-strokedark dark:bg-black/20 dark:text-gray-300"
                    >
                      {jadwal}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 italic">
                    Jadwal belum tersedia
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorModal;
