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
        className="fixed inset-0 bg-black/65 backdrop-blur-md"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div 
        className="relative w-full max-w-2xl animate_top overflow-y-auto rounded-2xl bg-blue-950/45 border border-blue-200/30 dark:border-blue-800/30 shadow-2xl max-h-[90vh] md:overflow-hidden text-left"
        style={{
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)"
        }}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20 border border-blue-200/30 text-blue-100 backdrop-blur-md hover:bg-red-500/80 hover:text-white shadow-sm transition-all duration-300"
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
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="flex flex-col md:flex-row h-full">
          {/* Sidebar / Photo */}
          <div className="bg-blue-500/5 dark:bg-blue-950/20 border-r border-blue-200/10 dark:border-blue-800/10 p-6 md:p-8 md:w-1/3 flex flex-col justify-center items-center">
            <div className="relative mx-auto h-[200px] w-[200px] md:h-[260px] md:w-full overflow-hidden rounded-xl border border-blue-200/20 dark:border-blue-800/20 shadow-md bg-blue-500/5">
              {hasImage ? (
                <Image
                  src={foto_pegawai}
                  alt={dokter_nama}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-blue-500/10 text-4xl font-bold text-blue-400">
                  {getInitials(dokter_nama)}
                </div>
              )}
            </div>
          </div>

          {/* Main Info */}
          <div className="p-6 md:w-2/3 md:p-8 md:overflow-y-auto">
            <h2 className="mb-2 text-xl font-bold text-white md:text-2xl leading-tight">
              {dokter_nama}
            </h2>
            <p className="mb-6 inline-block rounded-full bg-blue-500/20 border border-blue-200/20 px-4 py-1.5 text-xs font-semibold text-blue-200">
              {profesi}
            </p>

            <div className="mb-6">
              <h3 className="mb-3 flex items-center gap-2 font-bold text-white text-base">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-400"
                >
                  <path d="m5 12 7-7 7 7"></path>
                  <path d="M12 19V5"></path>
                </svg>
                Spesialisasi
              </h3>
              <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {poli_kdsubspesialis && poli_kdsubspesialis.length > 0 ? (
                  poli_kdsubspesialis.map((kode, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-sm font-semibold text-blue-100"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-400"></div>
                      {getSpecialtyName(kode)}
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-blue-200/60 italic font-semibold">
                    Spesialisasi belum tersedia
                  </li>
                )}
              </ul>
            </div>

            <div className="pb-4">
              <h3 className="mb-3 flex items-center gap-2 font-bold text-white text-base">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-400"
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
                      className="rounded-xl border border-blue-200/15 bg-blue-500/10 p-3 text-sm font-bold text-blue-100 dark:border-blue-800/15 dark:bg-blue-950/30 shadow-inner"
                    >
                      {jadwal}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-blue-200/60 italic font-semibold">
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
