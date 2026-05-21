"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Doctor } from "@/types/doctor";
import { getSpecialtyName, getInitials } from "@/utils/specialtyHelper";

const SingleDoctor = ({
  doctor,
  onViewSchedule,
}: {
  doctor: Doctor;
  onViewSchedule: (doctor: Doctor) => void;
}) => {
  const [imageError, setImageError] = useState(false);
  const { dokter_nama, foto_pegawai, poli_kdsubspesialis, profesi } = doctor;

  const specialty =
    poli_kdsubspesialis && poli_kdsubspesialis.length > 0
      ? getSpecialtyName(poli_kdsubspesialis[0])
      : profesi;

  const displayName =
    dokter_nama.length > 65 ? dokter_nama.substring(0, 65) + "..." : dokter_nama;

  const hasImage =
    foto_pegawai &&
    foto_pegawai.trim() !== "" &&
    !foto_pegawai.endsWith("/");

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="animate_top z-40 rounded-2xl border border-blue-200/20 bg-blue-500/5 dark:bg-blue-950/10 dark:border-blue-800/20 p-6.5 shadow-lg shadow-blue-500/3 hover:border-blue-400/40 hover:bg-blue-500/10 hover:shadow-blue-500/10 transition-all duration-300 hover:scale-[1.02] group"
      style={{
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)"
      }}
    >
      <div className="relative mb-6 flex h-[350px] w-full items-center justify-center overflow-hidden rounded-xl border border-blue-200/20 dark:border-blue-800/20 bg-blue-500/5 dark:bg-blue-950/30 shadow-inner">
        {hasImage && !imageError ? (
          <Image
            src={foto_pegawai}
            alt={dokter_nama}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
            unoptimized
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-blue-500/10 text-3xl font-bold text-blue-500 dark:text-blue-400">
            {getInitials(dokter_nama)}
          </div>
        )}
        {/* Glow overlay effect */}
        <div className="absolute inset-0 bg-linear-to-t from-blue-950/40 via-transparent to-transparent opacity-0 duration-300 group-hover:opacity-100" />
      </div>

      <div className="min-h-[110px] flex flex-col justify-start">
        <h3 className="text-lg font-bold text-blue-950 dark:text-blue-100 xl:text-xl line-clamp-2 leading-snug">
          <button
            onClick={() => onViewSchedule(doctor)}
            className="text-left hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
            title={dokter_nama}
          >
            {displayName}
          </button>
        </h3>
        <div className="mt-2.5">
          <span className="inline-block rounded-full bg-blue-500/10 border border-blue-200/20 dark:border-blue-800/20 px-3.5 py-1 text-xs font-bold text-blue-600 dark:text-blue-400 shadow-sm">
            {specialty}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onViewSchedule(doctor)}
        className="w-full flex items-center justify-center gap-2 rounded-full bg-blue-500/20 border border-blue-200/30 text-blue-950 dark:text-blue-100 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white backdrop-blur-md shadow-md transition-all duration-300 py-2.5 font-bold text-sm mt-4"
      >
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
        Lihat Jadwal
      </button>
    </motion.div>
  );
};

export default SingleDoctor;
