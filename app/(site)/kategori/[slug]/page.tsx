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

async function getCategoryData(slug: string, page: string = "1") {
  const res = await fetch(
    `https://api-web.sumbarprov.go.id/api/category/${slug}/3107?page=${page}`,
    {
      next: { revalidate: 60 },
    },
  );
  if (!res.ok) return null;
  return res.json();
}

const CategoryPage = async ({ params, searchParams }: Props) => {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const searchQuery =
    typeof resolvedSearchParams.search === "string"
      ? resolvedSearchParams.search
      : "";

  const pageQuery = resolvedSearchParams.page;
  const currentPage = typeof pageQuery === "string" ? pageQuery : "1";

  const result = await getCategoryData(slug, currentPage);
  const data = result?.data || [];

  const pageMeta = result?.page || {
    totalItems: data.length,
    currentPage: 1,
    pageSize: 9,
    totalPages: 1,
    nextPage: null,
    prevPage: null
  };

  let displayedData = data;
  if (searchQuery) {
    displayedData = data.filter(
      (item: any) =>
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }

  const totalPages = pageMeta.totalPages;
  const activePage = pageMeta.currentPage;

  const getPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams();
    if (searchQuery) {
      params.set("search", searchQuery);
    }
    params.set("page", pageNumber.toString());
    return `/kategori/${slug}?${params.toString()}`;
  };

  const getPages = () => {
    const pages = [];
    const range = 1; // Number of pages to show around current page
    
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= activePage - range && i <= activePage + range)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    return pages;
  };

  const baseUrl = "https://api-web.sumbarprov.go.id";

  return (
    <>
      <section className="relative z-10 overflow-hidden py-20 lg:py-25 xl:py-30">
        {/* Backlight Glows - Pendar Cahaya Latar Belakang untuk Efek Glassmorphic Maksimal */}
        <div className="absolute left-1/4 top-1/4 -z-10 h-[350px] w-[350px] rounded-full bg-gradient-to-tr from-blue-400/20 to-cyan-400/10 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-indigo-400/15 to-blue-400/15 blur-[150px]" />

        <div className="max-w-c-1280 mx-auto mt-15 px-4 md:px-8 xl:mt-20 xl:px-0">
          <SectionHeader
            headerInfo={{
              title: "Kategori",
              subtitle: slug.replace(/-/g, " ").toUpperCase(),
              description: `Menampilkan semua data untuk kategori ${slug}`,
            }}
          />

          {/* Search Bar - Kapsul Kaca Biru yang Menawan */}
          <div className="mt-8 flex justify-center animate_top">
            <form action="" method="GET" className="relative w-full max-w-[500px]">
              <input
                type="text"
                name="search"
                defaultValue={searchQuery}
                placeholder="Cari informasi di kategori ini..."
                className="w-full rounded-full bg-blue-500/8 dark:bg-blue-950/40 border border-blue-200/30 dark:border-blue-800/30 py-3 px-6 pr-12 text-blue-950 dark:text-blue-100 placeholder-blue-400/60 focus:outline-none focus:ring-2 focus:ring-blue-400/40 focus:border-blue-400/40 shadow-lg shadow-blue-500/3 transition-all duration-300"
                style={{
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)"
                }}
              />
              <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            </form>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {displayedData.length > 0 ? (
              displayedData.map((item: any, key: number) => (
                <div
                  key={key}
                  className="group animate_top flex h-full flex-col overflow-hidden rounded-2xl bg-blue-500/5 dark:bg-blue-950/20 border border-blue-200/30 dark:border-blue-800/20 shadow-lg shadow-blue-500/3 transition-all duration-300 hover:-translate-y-1.5 hover:bg-blue-500/10 dark:hover:bg-blue-950/30 hover:border-blue-300/45 dark:hover:border-blue-700/30 hover:shadow-xl hover:shadow-blue-500/8"
                  style={{
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)"
                  }}
                >
                  <Link
                    href={`/kategori/${slug}/${item.slug}`}
                    className="relative block aspect-[16/10] shrink-0 overflow-hidden"
                  >
                    {item.gambar ? (
                      <Image
                        src={baseUrl + encodeURI(item.gambar)}
                        alt={item.title || "Post image"}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        unoptimized
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-blue-100/30 dark:bg-blue-950/30 text-blue-400 font-semibold">
                        No Image
                      </div>
                    )}
                  </Link>

                  <div className="flex grow flex-col p-6">
                    {item.created_at && (
                      <div className="text-blue-600 dark:text-blue-400 mb-3 flex items-center gap-2 text-sm font-semibold">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect
                            x="3"
                            y="4"
                            width="18"
                            height="18"
                            rx="2"
                            ry="2"
                          ></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <span>
                          {item.created_at.split(" ").slice(0, 3).join(" ")}
                        </span>
                      </div>
                    )}

                    <h3 className="mb-6 line-clamp-2 text-[20px] leading-snug font-bold text-blue-950 dark:text-blue-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      <Link href={`/kategori/${slug}/${item.slug}`}>
                        {item.title}
                      </Link>
                    </h3>

                    <div className="border-blue-100/40 dark:border-blue-900/30 mt-auto border-t pt-4">
                      <Link
                        href={`/kategori/${slug}/${item.slug}`}
                        className="flex items-center gap-1.5 text-[15px] font-bold text-blue-600 hover:underline dark:text-blue-400"
                      >
                        Baca Selengkapnya
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        >
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-10 text-center text-blue-500 font-medium">
                Data tidak ditemukan
              </div>
            )}
          </div>

          {/* Pagination Controls - Indikator Glassmorphism Elegan */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2 animate_top">
              {/* Prev Button */}
              <Link
                href={getPageUrl(activePage - 1)}
                className={`flex h-10 w-10 items-center justify-center rounded-xl border border-blue-200/30 dark:border-blue-800/30 bg-blue-500/5 dark:bg-blue-950/20 text-blue-950 dark:text-blue-100 transition-all hover:bg-blue-500/10 dark:hover:bg-blue-950/30 hover:border-blue-300/45 dark:hover:border-blue-700/30 hover:shadow-md hover:shadow-blue-500/5 ${
                  activePage === 1 ? "pointer-events-none opacity-40" : ""
                }`}
                style={{
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)"
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </Link>

              {/* Page Numbers */}
              {getPages().map((page, index) => {
                if (page === "...") {
                  return (
                    <span
                      key={`dots-${index}`}
                      className="px-2 text-blue-400/60 font-semibold select-none"
                    >
                      ...
                    </span>
                  );
                }

                const isCurrent = page === activePage;
                return (
                  <Link
                    key={page}
                    href={getPageUrl(page as number)}
                    className={`flex h-10 w-10 items-center justify-center rounded-xl border font-bold transition-all hover:shadow-md ${
                      isCurrent
                        ? "border-blue-500 bg-blue-500 text-white dark:border-blue-600 dark:bg-blue-600 shadow-lg shadow-blue-500/25 dark:shadow-blue-600/20 scale-105"
                        : "border-blue-200/30 dark:border-blue-800/30 bg-blue-500/5 dark:bg-blue-950/20 text-blue-950 dark:text-blue-100 hover:bg-blue-500/10 dark:hover:bg-blue-950/30 hover:border-blue-300/45 dark:hover:border-blue-700/30 hover:shadow-blue-500/5"
                    }`}
                    style={{
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)"
                    }}
                  >
                    {page}
                  </Link>
                );
              })}

              {/* Next Button */}
              <Link
                href={getPageUrl(activePage + 1)}
                className={`flex h-10 w-10 items-center justify-center rounded-xl border border-blue-200/30 dark:border-blue-800/30 bg-blue-500/5 dark:bg-blue-950/20 text-blue-950 dark:text-blue-100 transition-all hover:bg-blue-500/10 dark:hover:bg-blue-950/30 hover:border-blue-300/45 dark:hover:border-blue-700/30 hover:shadow-md hover:shadow-blue-500/5 ${
                  activePage === totalPages ? "pointer-events-none opacity-40" : ""
                }`}
                style={{
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)"
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CategoryPage;
