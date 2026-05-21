import React from "react";
import SectionHeader from "@/components/Common/SectionHeader";
import BedInfoTable from "@/components/BedInfo/BedInfoTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Info Tempat Tidur | Rumah Sakit Jiwa Prof HB. Saanin",
  description:
    "Informasi ketersediaan tempat tidur rawat inap di RSJ Prof HB. Saanin Padang secara real-time.",
};

const InfoTempatTidurPage = () => {
  return (
    <>
      <section className="pt-32 pb-16 md:pt-36 md:pb-20 lg:pt-42 lg:pb-24 xl:pt-48 xl:pb-28">
        <div className="max-w-c-1315 mx-auto px-4 md:px-8 xl:px-0">
          <SectionHeader
            headerInfo={{
              title: "INFO TEMPAT TIDUR",
              subtitle: "Ketersediaan Tempat Tidur Rawat Inap",
              description: `Informasi real-time mengenai ketersediaan tempat tidur rawat inap di RSJ Prof HB. Saanin Padang.`,
            }}
          />

          <BedInfoTable />
        </div>
      </section>
    </>
  );
};

export default InfoTempatTidurPage;
