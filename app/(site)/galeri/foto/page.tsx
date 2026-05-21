import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/Common/SectionHeader";

export const metadata: Metadata = {
  title: "Galeri Foto - RSJ Prof HB Saanin",
  description: "Dokumentasi kegiatan RSJ Prof HB Saanin dalam bentuk foto",
};

type GalleryItem = {
  _id: number;
  title: string;
  slug: string;
  cover: string;
  createdAt: string;
};

const GaleriFotoPage = async () => {
  let galleryData: GalleryItem[] = [];

  try {
    const res = await fetch(
      "https://api-web.sumbarprov.go.id/api/galery-foto/3107",
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    const result = await res.json();

    if (result?.data && Array.isArray(result.data)) {
      galleryData = result.data.map((item: any, index: number) => ({
        _id: index,
        title: item.title,
        slug: item.slug,
        cover: `https://api-web.sumbarprov.go.id${item.cover}`,
        createdAt: item.created_at,
      }));
    }
  } catch (error) {
    console.error("Gagal memuat data galeri foto:", error);
  }

  return (
    <>
      <section className="relative py-20 lg:py-25 xl:py-30 overflow-hidden">
        {/* Background Decorative Glow Circles */}
        <div className="absolute top-[10%] left-[-10%] -z-10 h-[350px] w-[350px] rounded-full bg-blue-400/8 blur-[120px] dark:bg-blue-600/5" />
        <div className="absolute bottom-[20%] right-[-10%] -z-10 h-[400px] w-[400px] rounded-full bg-blue-500/8 blur-[130px] dark:bg-blue-500/5" />

        <div className="mx-auto mt-15 max-w-c-1280 px-4 md:px-8 xl:mt-20 xl:px-0">
          <div className="animate_top mx-auto text-center mb-12">
            <SectionHeader
              headerInfo={{
                title: "Media & Visual",
                subtitle: "GALERI FOTO",
                description: `Koleksi foto kegiatan dan fasilitas di RSJ Prof HB Saanin`,
              }}
            />
          </div>

          <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-8 mt-10">
            {galleryData.length > 0 ? (
              galleryData.map((item) => (
                <Link
                  key={item._id}
                  href={`/galeri/foto/${item.slug}`}
                  className="animate_top group block overflow-hidden rounded-2xl bg-blue-500/5 border border-blue-200/20 dark:border-blue-800/20 dark:bg-blue-950/10 shadow-lg shadow-blue-500/3 hover:border-blue-400/40 hover:bg-blue-500/10 hover:shadow-blue-500/10 transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                  }}
                >
                  <div className="relative h-[240px] w-full overflow-hidden rounded-t-2xl border-b border-blue-200/10 dark:border-blue-800/10">
                    <Image
                      src={item.cover}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-108"
                    />
                    {/* Hover Glow Light Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-blue-950/40 via-transparent to-transparent opacity-0 duration-300 group-hover:opacity-100" />
                  </div>
                  <div className="px-5 py-5.5">
                    <h3 className="line-clamp-2 text-lg font-bold text-blue-950 duration-300 group-hover:text-blue-500 dark:text-blue-100 dark:group-hover:text-blue-400">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-xs font-semibold text-blue-500/80 dark:text-blue-400/80 flex items-center gap-1.5">
                      <svg className="fill-current text-blue-500/70 dark:text-blue-400/70" width="13" height="13" viewBox="0 0 24 24">
                        <path d="M19,4H18V2H16V4H8V2H6V4H5C3.89,4 3,4.9 3,6V20C3,21.1 3.89,22 5,22H19C20.1,22 21,21.1 21,20V6C21,4.9 20.1,4 19,4M19,20H5V10H19V20M19,8H5V6H19V8Z" />
                      </svg>
                      {item.createdAt}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div 
                className="col-span-full py-16 text-center text-blue-500/70 dark:text-blue-400/70 bg-blue-500/5 rounded-2xl border border-blue-200/20 dark:border-blue-800/20 shadow-lg shadow-blue-500/2 font-semibold"
                style={{
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                }}
              >
                Belum ada foto galeri saat ini.
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default GaleriFotoPage;
