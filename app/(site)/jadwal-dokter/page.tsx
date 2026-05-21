import React from "react";
import SectionHeader from "@/components/Common/SectionHeader";
import DoctorScheduleTable from "@/components/Doctors/DoctorScheduleTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jadwal Dokter | Rumah Sakit Jiwa Prof HB. Saanin",
  description:
    "Cari dan temukan jadwal praktik dokter spesialis kami di RSJ Prof HB. Saanin Padang.",
};

const JadwalDokterPage = () => {
  return (
    <>
      <section className="pt-32 pb-16 md:pt-36 md:pb-20 lg:pt-42 lg:pb-24 xl:pt-48 xl:pb-28">
        <div className="max-w-c-1315 mx-auto px-4 md:px-8 xl:px-0">
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
