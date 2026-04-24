import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/Common/SectionHeader";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const metadata: Metadata = {
  title: "Kategori - RSJ Prof HB Saanin",
  description: "Daftar publikasi berdasarkan kategori",
};

async function getCategoryData(slug: string) {
  const res = await fetch(`https://api-web.sumbarprov.go.id/api/category/${slug}/3107`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return null;
  return res.json();
}

const CategoryPage = async ({ params, searchParams }: Props) => {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const searchQuery = typeof resolvedSearchParams.search === 'string' ? resolvedSearchParams.search : '';
  
  const result = await getCategoryData(slug);
  let data = result?.data || [];
  
  if (searchQuery) {
    data = data.filter((item: any) => 
      item.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  const baseUrl = "https://api-web.sumbarprov.go.id";

  return (
    <>
      <section className="py-20 lg:py-25 xl:py-30">
        <div className="mx-auto mt-15 max-w-c-1280 px-4 md:px-8 xl:mt-20 xl:px-0">
          <SectionHeader
            headerInfo={{
              title: "Kategori",
              subtitle: slug.replace(/-/g, " ").toUpperCase(),
              description: `Menampilkan semua data untuk kategori ${slug}`,
            }}
          />

          <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10 mt-10">
            {data.length > 0 ? (
              data.map((item: any, key: number) => (
                <div
                  key={key}
                  className="animate_top flex flex-col h-full overflow-hidden rounded-xl bg-white shadow-solid-8 border border-stroke dark:border-strokedark dark:bg-blacksection"
                >
                  <Link href={`/berita/${item.slug}`} className="relative block shrink-0 aspect-[16/10]">
                    {item.gambar ? (
                      <Image
                        src={baseUrl + item.gambar}
                        alt={item.title || "Post image"}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                        No Image
                      </div>
                    )}
                  </Link>

                  <div className="p-6 flex flex-col grow">
                    {item.created_at && (
                      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <span>{item.created_at.split(' ').slice(0, 3).join(' ')}</span>
                      </div>
                    )}
                    
                    <h3 className="mb-6 line-clamp-2 text-[20px] font-bold leading-snug text-black hover:text-primary dark:text-white dark:hover:text-primary">
                      <Link href={`/berita/${item.slug}`}>
                        {item.title}
                      </Link>
                    </h3>

                    <div className="mt-auto border-t border-stroke pt-4 dark:border-strokedark">
                      <Link
                        href={`/berita/${item.slug}`}
                        className="text-[15px] font-bold text-[#1e3a8a] hover:underline flex items-center gap-1.5 dark:text-blue-400"
                      >
                        Baca Selengkapnya
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                Data tidak ditemukan
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoryPage;
