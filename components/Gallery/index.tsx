import React from "react";
import SectionHeader from "../Common/SectionHeader";
import Image from "next/image";
import Link from "next/link";

type GalleryItem = {
  _id: number;
  title: string;
  slug: string;
  cover: string;
  createdAt: string;
};

const Gallery = async () => {
  let galleryData: GalleryItem[] = [];

  try {
    const response = await fetch(
      "https://api-web.sumbarprov.go.id/api/galery-foto/3107",
      { cache: "no-store" }
    );

    if (!response.ok) {
      console.warn(`Gagal memuat galeri foto: HTTP ${response.status}`);
    } else {
      const result = await response.json();

    if (result?.data && Array.isArray(result.data)) {
      galleryData = result.data.map((item: any, index: number) => ({
        _id: index,
        title: item.title,
        slug: item.slug,
        cover: `https://api-web.sumbarprov.go.id${item.cover}`,
        createdAt: item.created_at,
      }));
    }
    }
  } catch (error) {
    console.error("Gagal memuat data galeri foto:", error);
  }

  return (
    <section className="py-10 lg:py-15 xl:py-20">
      <div className="max-w-c-1315 mx-auto px-4 md:px-8 xl:px-0">
        <div className="animate_top mx-auto mb-15 text-center">
          <SectionHeader
            headerInfo={{
              title: `GALERI & DOKUMENTASI`,
              subtitle: ``,
              description: `Dokumentasi informasi terbaru termasuk layanan kesehatan, program unggulan, dan kegiatan terkini yang kami lakukan.`,
            }}
          />
        </div>
        {/* <!-- Section Header Start --> */}
        <div className="flex flex-wrap items-center justify-center gap-5 border-b border-blue-200/20 pb-6 dark:border-blue-800/20 sm:justify-between">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-200/20 dark:border-blue-800/20">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="fill-blue-500 dark:fill-blue-400"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19,5V19H5V5H19M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M13.96,12.29L11.21,15.83L9.25,13.47L6.5,17H17.5L13.96,12.29Z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-blue-950 dark:text-blue-100 xl:text-itemtitle2">
              Foto Kegiatan Terbaru
            </h2>
          </div>
          <Link
            href="/galeri/foto"
            className="flex items-center gap-2 font-semibold text-blue-500 duration-300 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 hover:gap-3 text-sm sm:text-base"
          >
            Lihat Semua Foto
            <svg
              width="18"
              height="14"
              viewBox="0 0 18 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 1L17 7L11 13M1 7H17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
        {/* <!-- Section Header End --> */}

        <div className="mt-12 grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-4 xl:gap-7.5">
          {galleryData.length > 0 ? (
            galleryData.slice(0, 4).map((item, key) => (
              <Link
                key={item._id}
                href={`/galeri/foto`}
                className="animate_top group block overflow-hidden rounded-xl bg-blue-500/5 border border-blue-200/20 shadow-lg shadow-blue-500/3 dark:border-blue-800/20 dark:bg-blue-950/10 hover:border-blue-400/40 hover:bg-blue-500/10 hover:shadow-blue-500/10 transition-all duration-300"
                style={{
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)"
                }}
              >
                <div className="relative h-[220px] w-full overflow-hidden border-b border-blue-200/10 dark:border-blue-800/10">
                  <Image
                    src={item.cover}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-blue-950/80 via-transparent to-transparent opacity-0 duration-300 group-hover:opacity-100 flex items-end">
                    <div className="p-4 w-full">
                      <h3 className="line-clamp-2 text-sm font-semibold text-white">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="line-clamp-1 text-sm font-semibold text-blue-950 dark:text-blue-100 transition-colors duration-300 group-hover:text-blue-500 dark:group-hover:text-blue-400">
                    {item.title}
                  </p>
                  <p className="mt-1.5 text-xs font-semibold text-blue-500/80 dark:text-blue-400/80 flex items-center gap-1">
                    <svg className="fill-current text-blue-500/70 dark:text-blue-400/70" width="12" height="12" viewBox="0 0 24 24">
                      <path d="M19,4H18V2H16V4H8V2H6V4H5C3.89,4 3,4.9 3,6V20C3,21.1 3.89,22 5,22H19C20.1,22 21,21.1 21,20V6C21,4.9 20.1,4 19,4M19,20H5V10H19V20M19,8H5V6H19V8Z" />
                    </svg>
                    {item.createdAt}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-10 text-center text-blue-400/70 font-semibold">
              Belum ada foto kegiatan saat ini.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
