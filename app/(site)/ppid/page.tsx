import { Metadata } from "next";
import SectionHeader from "@/components/Common/SectionHeader";
import PPIDContent from "@/components/PPID/PPIDContent";

export const metadata: Metadata = {
  title: "PPID - RSJ Prof HB Saanin",
  description: "Pejabat Pengelola Informasi dan Dokumentasi (PPID) RSJ Prof HB Saanin",
};

const PPIDPage = async () => {
  return (
    <>
      <section className="pb-20 pt-35 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <SectionHeader
            headerInfo={{
              title: "Pelayanan Informasi Publik",
              subtitle: "PPID",
              description: `Pejabat Pengelola Informasi dan Dokumentasi (PPID) RSJ Prof HB Saanin berkomitmen menyediakan akses informasi publik yang transparan dan akuntabel.`,
            }}
          />

          <PPIDContent />
        </div>
      </section>
    </>
  );
};

export default PPIDPage;
