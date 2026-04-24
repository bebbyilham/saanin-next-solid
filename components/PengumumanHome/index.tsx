import React from "react";
import Image from "next/image";
import Link from "next/link";

async function getPengumumanData() {
  try {
    const res = await fetch(`https://api-web.sumbarprov.go.id/api/pengumuman/3107`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

const PengumumanHome = async () => {
  const result = await getPengumumanData();
  const data = result?.data?.slice(0, 4) || [];
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://api-web.sumbarprov.go.id";

  if (data.length === 0) return null;

  return (
    <section className="py-20 lg:py-25 xl:py-30">
      <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
        <div className="flex flex-wrap items-center justify-center gap-5 border-b border-stroke pb-6 dark:border-strokedark mb-10 sm:justify-between">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-500/10">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="stroke-blue-500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-black dark:text-white xl:text-itemtitle2">
              Pengumuman Terbaru
            </h2>
          </div>
          <Link
            href="/pengumuman"
            className="flex items-center gap-2 font-semibold text-blue-500 duration-300 hover:gap-3 text-sm sm:text-base"
          >
            Lihat Semua Pengumuman
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 1L17 7L11 13M1 7H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-4 xl:gap-7.5">
          {data.map((item: any, key: number) => {
            const imageUrl = item.gambar ? `${baseUrl}${item.gambar}` : null;
            
            return (
              <Link
                key={key}
                href={`/pengumuman/${item.slug}`}
                className="animate_top group block overflow-hidden rounded-xl bg-white shadow-solid-8 dark:bg-blacksection"
              >
                <div className="relative h-[220px] w-full overflow-hidden">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={item.title || "Pengumuman image"}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-800 text-sm">
                      No Image
                    </div>
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 duration-300 group-hover:opacity-100">
                    <div className="absolute bottom-0 p-4">
                      <h3 className="line-clamp-2 text-sm font-semibold text-white">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="line-clamp-1 text-sm font-medium text-black dark:text-white">
                    {item.title}
                  </p>
                  <p className="mt-1 text-xs text-waterloo">{item.created_at}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PengumumanHome;
