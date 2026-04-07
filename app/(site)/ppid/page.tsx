import { Metadata } from "next";
import SectionHeader from "@/components/Common/SectionHeader";
import Image from "next/image";

export const metadata: Metadata = {
  title: "PPID - RSJ HBSAANIN",
  description: "Pejabat Pengelola Informasi dan Dokumentasi (PPID) RSJ HBSAANIN",
};

async function getPPIDData() {
  // Berdasarkan instruksi: domain ppid.sumbarprov.go.id dengan id_instansi=90
  const res = await fetch(`https://ppid.sumbarprov.go.id/api/v1/institusi/90`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return null;
  return res.json();
}

const PPIDPage = async () => {
  const result = await getPPIDData();
  const data = result?.data;

  return (
    <>
      <section className="py-20 lg:py-25 xl:py-30">
        <div className="mx-auto mt-15 max-w-c-1280 px-4 md:px-8 xl:mt-20 xl:px-0">
          <SectionHeader
            headerInfo={{
              title: "Transparansi Informasi",
              subtitle: "PPID RSJ HBSAANIN",
              description: `Pejabat Pengelola Informasi dan Dokumentasi (PPID) menyediakan akses informasi publik sesuai amanat UU No. 14 Tahun 2008.`,
            }}
          />

          <div className="mt-12 animate_top rounded-md border border-stroke bg-white p-7.5 shadow-solid-13 dark:border-strokedark dark:bg-blacksection md:p-10">
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="md:w-1/3">
                <div className="relative aspect-square w-full max-w-[300px] mx-auto">
                   <Image 
                    src="/images/hero/hero-light.svg" 
                    alt="PPID Logo"
                    fill
                    className="dark:hidden"
                   />
                   <Image 
                    src="/images/hero/hero-dark.svg" 
                    alt="PPID Logo"
                    fill
                    className="hidden dark:block"
                   />
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-2xl font-bold text-black dark:text-white mb-5">
                   {data?.nama_institusi || "PPID Pelaksana RSJ Dr. H.B. Saanin Padang"}
                </h3>
                <p className="text-body-color dark:text-body-color-dark mb-6">
                   Layanan informasi publik ini terintegrasi dengan PPID Utama Provinsi Sumatera Barat. 
                   Masyarakat dapat mengajukan permohonan informasi, keberatan, serta melihat laporan layanan informasi secara transparan.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
                  <div className="p-5 rounded-lg border border-stroke dark:border-strokedark bg-gray-50 dark:bg-black">
                    <h4 className="font-semibold mb-2">Informasi Wajib Berkala</h4>
                    <p className="text-sm">Dokumen yang wajib disediakan dan diumumkan secara berkala.</p>
                  </div>
                  <div className="p-5 rounded-lg border border-stroke dark:border-strokedark bg-gray-50 dark:bg-black">
                    <h4 className="font-semibold mb-2">Informasi Setiap Saat</h4>
                    <p className="text-sm">Dokumen yang harus tersedia setiap saat ketika dimohonkan.</p>
                  </div>
                </div>

                <div className="mt-10">
                  <a 
                    href="https://ppid.sumbarprov.go.id" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-primary px-7.5 py-3.5 text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho"
                  >
                    Kunjungi Website PPID Utama
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PPIDPage;
