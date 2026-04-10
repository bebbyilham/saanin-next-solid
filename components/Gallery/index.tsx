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
        <div className="flex flex-wrap items-center justify-between gap-5 border-b border-stroke pb-6 dark:border-strokedark">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-500/10">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="fill-blue-500"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19,5V19H5V5H19M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M13.96,12.29L11.21,15.83L9.25,13.47L6.5,17H17.5L13.96,12.29Z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-black dark:text-white xl:text-itemtitle2">
              Foto Kegiatan Terbaru
            </h2>
          </div>
          <Link
            href="/galeri/foto"
            className="flex items-center gap-2 font-semibold text-blue-500 duration-300 hover:gap-3"
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
                className="animate_top group block overflow-hidden rounded-xl bg-white shadow-solid-8 dark:bg-blacksection"
              >
                <div className="relative h-[220px] w-full overflow-hidden">
                  <Image
                    src={item.cover}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
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
                  <p className="mt-1 text-xs text-waterloo">{item.createdAt}</p>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-10 text-center text-waterloo">
              Belum ada foto kegiatan saat ini.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
