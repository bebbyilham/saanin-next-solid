import React from "react";
import SectionHeader from "@/components/Common/SectionHeader";
import DoctorScheduleTable from "@/components/Doctors/DoctorScheduleTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jadwal Dokter | Rumah Sakit Jiwa Prof HB. Saanin Padang",
  description: "Cari dan temukan jadwal praktik dokter spesialis kami di RSJ Prof HB. Saanin Padang.",
};

const JadwalDokterPage = () => {
  return (
    <>
      <section className="pb-16 pt-32 md:pb-20 md:pt-36 lg:pb-24 lg:pt-42 xl:pb-28 xl:pt-48">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <SectionHeader
            headerInfo={{
              title: "JADWAL DOKTER",
              subtitle: "Jadwal Praktik Tenaga Medis",
              description: `Gunakan fitur pencarian dan filter di bawah ini untuk menemukan dokter spesialis pilihan Anda beserta jadwal praktiknya.`,
            }}
          />
          
          <DoctorScheduleTable />
        </div>
      </section>
    </>
  );
};

export default JadwalDokterPage;
