import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/Common/SectionHeader";

export const metadata: Metadata = {
  title: "Pengumuman - RSJ HBSAANIN",
  description: "Daftar pengumuman resmi RSJ HBSAANIN",
};

async function getPengumumanData() {
  const res = await fetch(`https://api-web.sumbarprov.go.id/api/pengumuman/3107`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return null;
  return res.json();
}

const PengumumanPage = async () => {
  const result = await getPengumumanData();
  const data = result?.data || [];

  return (
    <>
      <section className="py-20 lg:py-25 xl:py-30">
        <div className="mx-auto mt-15 max-w-c-1280 px-4 md:px-8 xl:mt-20 xl:px-0">
          <SectionHeader
            headerInfo={{
              title: "Informasi Terkini",
              subtitle: "PENGUMUMAN",
              description: `Daftar pengumuman resmi dan informasi terbaru dari RSJ HBSAANIN`,
            }}
          />

          <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10 mt-10">
            {data.length > 0 ? (
              data.map((item: any, key: number) => (
                <div
                  key={key}
                  className="animate_top rounded-lg bg-white p-4 pb-9 shadow-solid-8 dark:bg-blacksection"
                >
                  <div className="relative block aspect-368/239">
                    {item.thumbnail ? (
                      <Image
                        src={item.thumbnail}
                        alt={item.title || "Announcement image"}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="px-4">
                    <h3 className="mb-3.5 mt-7.5 line-clamp-2 inline-block text-lg font-medium text-black duration-300 hover:text-primary dark:text-white dark:hover:text-primary xl:text-itemtitle2">
                      <Link href={`/berita/${item.slug}`}>
                        {item.title}
                      </Link>
                    </h3>
                    <p className="line-clamp-3">{item.content_short || ""}</p>
                    <div className="mt-4 text-sm text-gray-500">
                      📅 {item.created_at || "Baru-baru ini"}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                Belum ada pengumuman saat ini.
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default PengumumanPage;
