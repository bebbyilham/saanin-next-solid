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
      <section id="features" className="relative py-20 lg:py-25 xl:py-30 overflow-hidden">
        {/* Background Decorative Glow Circles */}
        <div className="absolute top-[15%] left-[-15%] -z-10 h-[400px] w-[400px] rounded-full bg-blue-400/8 blur-[120px] dark:bg-blue-600/5" />
        <div className="absolute bottom-[10%] right-[-15%] -z-10 h-[450px] w-[450px] rounded-full bg-blue-500/8 blur-[130px] dark:bg-blue-500/5" />

        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          {/* <!-- Section Title Start --> */}
          <div className="animate_top mx-auto text-center mb-12">
            <SectionHeader
              headerInfo={{
                title: "JADWAL DOKTER",
                subtitle: "Tim Medis Profesional Kami",
                description: `Temukan tim dokter ahli kami dan jadwal praktik mereka. Kami berkomitmen memberikan pelayanan kesehatan terbaik bagi Anda dan keluarga.`,
              }}
            />
          </div>
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
                spaceBetween={40}
                slidesPerView={1}
                breakpoints={{
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 35,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                  },
                }}
                pagination={{ clickable: true }}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                }}
                modules={[Pagination, Autoplay]}
                className="pb-20"
              >
                {doctors.map((doctor, key) => (
                  <SwiperSlide key={key} className="pb-10">
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

