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
      className="animate_top z-40 rounded-lg border border-white bg-white p-7.5 shadow-solid-3 transition-all hover:shadow-solid-4 dark:border-strokedark dark:bg-blacksection dark:hover:bg-hoverdark xl:p-10"
    >
      <div className="relative mb-7.5 flex h-[400px] w-full items-center justify-center overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
        {hasImage && !imageError ? (
          <Image
            src={foto_pegawai}
            alt={dokter_nama}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
            unoptimized
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-primary/10 text-2xl font-bold text-primary">
            {getInitials(dokter_nama)}
          </div>
        )}
      </div>

      <h3 className="mb-2 text-lg font-semibold text-black dark:text-white xl:text-itemtitle2">
        <button
          onClick={() => onViewSchedule(doctor)}
          className="text-left hover:text-primary transition-colors"
          title={dokter_nama}
        >
          {displayName}
        </button>
      </h3>
      <p className="mb-5 text-sm text-gray-600 dark:text-gray-400">{specialty}</p>

      <button
        type="button"
        onClick={() => onViewSchedule(doctor)}
        className="flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-primaryho"
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
