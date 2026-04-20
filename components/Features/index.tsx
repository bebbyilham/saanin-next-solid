"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import SectionHeader from "../Common/SectionHeader";
import SingleDoctor from "../Doctors/SingleDoctor";
import DoctorModal from "../Doctors/DoctorModal";
import { Doctor } from "@/types/doctor";

const Feature = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://api-simrsj.rsjhbsaanin.com/dokter");
        if (!response.ok) {
          throw new Error("Gagal mengambil data dokter");
        }
        const data = await response.json();
        setDoctors(data);
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching doctors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleViewSchedule = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* <!-- ===== Features Start ===== --> */}
      <section id="features" className="py-20 lg:py-25 xl:py-30">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          {/* <!-- Section Title Start --> */}
          <SectionHeader
            headerInfo={{
              title: "JADWAL DOKTER",
              subtitle: "Tim Medis Profesional Kami",
              description: `Temukan tim dokter ahli kami dan jadwal praktik mereka. Kami berkomitmen memberikan pelayanan kesehatan terbaik bagi Anda dan keluarga.`,
            }}
          />
          {/* <!-- Section Title End --> */}

          {loading ? (
            <div className="mt-20 flex flex-col items-center justify-center">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              <p className="mt-4 font-medium text-black dark:text-white">Memuat data dokter...</p>
            </div>
          ) : error ? (
            <div className="mt-20 text-center text-red-500">
              <p>{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 rounded-full bg-primary px-6 py-2 text-white hover:bg-primaryho"
              >
                Coba Lagi
              </button>
            </div>
          ) : (
            <div className="mt-12.5 lg:mt-15 xl:mt-20">
              <Swiper
                spaceBetween={30}
                slidesPerView={1}
                breakpoints={{
                  768: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 3,
                  },
                }}
                pagination={{ clickable: true }}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                }}
                modules={[Pagination, Autoplay]}
                className="pb-16"
              >
                {doctors.map((doctor, key) => (
                  <SwiperSlide key={key}>
                    <SingleDoctor
                      doctor={doctor}
                      onViewSchedule={handleViewSchedule}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
      </section>

      <DoctorModal
        doctor={selectedDoctor}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      {/* <!-- ===== Features End ===== --> */}
    </>
  );
};

export default Feature;

