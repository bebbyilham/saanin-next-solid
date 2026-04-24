import React from "react";
import SectionHeader from "@/components/Common/SectionHeader";
import BedInfoTable from "@/components/BedInfo/BedInfoTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Info Tempat Tidur | Rumah Sakit Jiwa Prof HB. Saanin Padang",
  description: "Informasi ketersediaan tempat tidur rawat inap di RSJ Prof HB. Saanin Padang secara real-time.",
};

const InfoTempatTidurPage = () => {
  return (
    <>
      <section className="pb-16 pt-32 md:pb-20 md:pt-36 lg:pb-24 lg:pt-42 xl:pb-28 xl:pt-48">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
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
