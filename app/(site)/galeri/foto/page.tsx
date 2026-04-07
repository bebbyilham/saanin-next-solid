import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/Common/SectionHeader";

export const metadata: Metadata = {
  title: "Galeri Foto - RSJ HBSAANIN",
  description: "Dokumentasi kegiatan RSJ HBSAANIN dalam bentuk foto",
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
      <section className="py-20 lg:py-25 xl:py-30">
        <div className="mx-auto mt-15 max-w-c-1280 px-4 md:px-8 xl:mt-20 xl:px-0">
          <SectionHeader
            headerInfo={{
              title: "Media & Visual",
              subtitle: "GALERI FOTO",
              description: `Koleksi foto kegiatan dan fasilitas di RSJ HBSAANIN`,
            }}
          />

          <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10 mt-10">
            {galleryData.length > 0 ? (
              galleryData.map((item) => (
                <Link
                  key={item._id}
                  href={`/galeri/foto/${item.slug}`}
                  className="animate_top group block overflow-hidden rounded-xl bg-white shadow-solid-8 dark:bg-blacksection"
                >
                  <div className="relative h-[250px] w-full overflow-hidden rounded-t-xl">
                    <Image
                      src={item.cover}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="px-4 py-5">
                    <h3 className="line-clamp-2 text-lg font-medium text-black duration-300 group-hover:text-primary dark:text-white dark:group-hover:text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-waterloo">{item.createdAt}</p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full py-10 text-center text-waterloo">
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
