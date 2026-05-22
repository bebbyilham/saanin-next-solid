import { Metadata } from "next";
import WhistleBlowingSystem from "@/components/WBS";

export const metadata: Metadata = {
  title: "Whistle Blowing System (WBS) - RSJ Prof Dr HB Saanin",
  description: "Whistle Blowing System (WBS) RSJ Prof. Dr. HB. Saanin Padang - Sarana pengaduan resmi bagi Anda untuk melaporkan segala bentuk pelanggaran, kecurangan, atau tindakan tidak etis.",
};

const WhistleBlowingSystemPage = () => {
  return <WhistleBlowingSystem />;
};

export default WhistleBlowingSystemPage;
