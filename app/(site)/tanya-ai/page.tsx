import React from "react";
import { Metadata } from "next";
import TanyaAIClient from "@/components/TanyaAI/TanyaAIClient";

export const metadata: Metadata = {
  title: "Tanya AI | Rumah Sakit Jiwa Prof. HB. Saanin Padang",
  description: "Asisten Virtual AI RSJ Prof. HB. Saanin Padang. Tanyakan tentang jadwal dokter, pendaftaran online, ketersediaan tempat tidur, pengaduan WBS, dan info layanan lainnya.",
};

export default function TanyaAIPage() {
  return <TanyaAIClient />;
}
