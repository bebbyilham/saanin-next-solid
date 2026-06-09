import { Metadata } from "next";
import Image from "next/image";
import SharePost from "@/components/Blog/SharePost";
import SidebarNews from "@/components/Blog/SidebarNews";
import SidebarPhotos from "@/components/Blog/SidebarPhotos";
import SidebarVideos from "@/components/Blog/SidebarVideos";

type Props = {
  params: Promise<{ slug: string; itemSlug: string }>;
};

export const metadata: Metadata = {
  title: "Detail Informasi - RSJ Prof HB Saanin",
  description:
    "Detail informasi pelayanan dan publikasi terbaru RSJ Prof HB Saanin",
};

async function getDetailData(categorySlug: string, articleSlug: string) {
  try {
    const res = await fetch(
      `https://api-web.sumbarprov.go.id/api/berita/detail/${articleSlug}`,
      {
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) return null;
    const result = await res.json();
    if (result && result.error) {
      console.warn("API Error:", result.error);
      return null;
    }
    return result?.data || null;
  } catch (error) {
    console.error("Fetch category detail error:", error);
    return null;
  }
}

const DetailPage = async ({ params }: Props) => {
  const { slug, itemSlug } = await params;
  const data = await getDetailData(slug, itemSlug);
  const baseUrl = "https://api-web.sumbarprov.go.id";

  if (!data) {
    return (
      <section className="relative z-10 overflow-hidden pt-35 pb-20 lg:pt-45 lg:pb-25 xl:pt-50 xl:pb-30">
        <div className="absolute top-1/4 left-1/4 -z-10 h-[300px] w-[300px] rounded-full bg-gradient-to-tr from-blue-400/20 to-cyan-400/10 blur-[120px]" />
        <div className="max-w-c-1390 mx-auto px-4 text-center md:px-8 2xl:px-0">
          <h1 className="text-2xl font-bold text-blue-950 dark:text-blue-200">
            Informasi tidak ditemukan
          </h1>
        </div>
      </section>
    );
  }

  const imageUrl = data.gambar ? `${baseUrl}${data.gambar}` : null;
  const isPdf = imageUrl && imageUrl.toLowerCase().endsWith(".pdf");
  
  let pdfExists = false;
  if (isPdf && imageUrl) {
    try {
      const checkRes = await fetch(imageUrl, { method: "HEAD" });
      if (checkRes.ok) {
        pdfExists = true;
      }
    } catch (e) {
      pdfExists = false;
    }
  }

  return (
    <>
      <div className="relative z-10 overflow-hidden pt-30 pb-20 lg:pt-35 lg:pb-25 xl:pt-40 xl:pb-30">
        {/* Backlight Glows - Pendar Cahaya Latar Belakang untuk Efek Glassmorphic Maksimal */}
        <div className="absolute top-10 left-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-blue-400/25 to-cyan-400/15 blur-[130px]" />
        <div className="absolute right-1/4 bottom-10 -z-10 h-[450px] w-[450px] rounded-full bg-gradient-to-tr from-indigo-400/20 to-blue-400/15 blur-[160px]" />

        <div className="max-w-c-1390 mx-auto px-4 md:px-8 2xl:px-0">
          {/* Header Banner - Panel Kaca Biru Premium */}
          <div
            className="animate_top mb-10 flex w-full flex-col items-center rounded-2xl border border-blue-200/25 bg-blue-500/5 p-8 text-center shadow-lg shadow-blue-500/3 md:p-12 dark:border-blue-800/25 dark:bg-blue-950/20"
            style={{
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-blue-200/30 bg-blue-500/10 px-4 py-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400">
              Kategori: {slug.replace(/-/g, " ").toUpperCase()}
            </div>

            <h1 className="mb-6 max-w-[900px] text-3xl leading-tight font-extrabold text-blue-950 md:text-4xl xl:text-5xl dark:text-blue-100">
              {data.title}
            </h1>

            <ul className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              {data.created_by && (
                <li className="flex items-center gap-2 rounded-full border border-blue-200/20 bg-blue-500/5 px-4 py-2 text-sm font-semibold text-blue-950 dark:text-blue-200">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </span>
                  <span>{data.created_by || "Admin"}</span>
                </li>
              )}
              {data.created_at && (
                <li className="flex items-center gap-2 rounded-full border border-blue-200/20 bg-blue-500/5 px-4 py-2 text-sm font-semibold text-blue-950 dark:text-blue-200">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </span>
                  <span>{data.created_at}</span>
                </li>
              )}
              {data.hits !== undefined && (
                <li className="flex items-center gap-2 rounded-full border border-blue-200/20 bg-blue-500/5 px-4 py-2 text-sm font-semibold text-blue-950 dark:text-blue-200">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </span>
                  <span>{data.hits || "0"} Dilihat</span>
                </li>
              )}
            </ul>
          </div>

          <div className="flex flex-col gap-7.5 lg:flex-row xl:gap-12.5">
            {/* Main Content Area */}
            <div className="lg:w-2/3">
              <div
                className="animate_top rounded-2xl border border-blue-200/30 bg-blue-500/5 p-6 shadow-lg shadow-blue-500/3 md:p-10 dark:border-blue-800/25 dark:bg-blue-950/20"
                style={{
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                }}
              >
                  {imageUrl && (
                  <div className="mb-10 w-full overflow-hidden rounded-xl border border-blue-200/20 dark:border-blue-800/25 shadow-lg shadow-blue-500/3">
                    {isPdf ? (
                      pdfExists ? (
                        <div className="w-full h-[500px] md:h-[700px] bg-blue-500/5 dark:bg-blue-950/20 flex flex-col">
                          <div className="bg-blue-600 dark:bg-blue-950 border-b border-blue-200/20 dark:border-blue-800/30 px-5 py-3 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-white font-semibold text-sm">
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                <line x1="16" y1="17" x2="8" y2="17"></line>
                              </svg>
                              Dokumen PDF
                            </div>
                            <a
                              href={imageUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white text-xs flex items-center gap-1 hover:underline"
                            >
                              Buka di tab baru
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                <polyline points="15 3 21 3 21 9"></polyline>
                                <line x1="10" y1="14" x2="21" y2="3"></line>
                              </svg>
                            </a>
                          </div>
                          <iframe
                            src={`${imageUrl}`}
                            className="w-full h-full border-none"
                            title={data.title}
                          />
                        </div>
                      ) : (
                        <div className="w-full p-8 text-center bg-blue-500/5 dark:bg-blue-950/20 border border-blue-200/30 dark:border-blue-800/20 rounded-2xl">
                          <div className="mx-auto w-12 h-12 text-blue-500/60 dark:text-blue-400/60 mb-4 flex items-center justify-center">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                              <polyline points="14 2 14 8 20 8"></polyline>
                              <line x1="9" y1="15" x2="15" y2="15"></line>
                              <line x1="9" y1="11" x2="15" y2="11"></line>
                              <line x1="9" y1="19" x2="15" y2="19"></line>
                            </svg>
                          </div>
                          <h4 className="text-lg font-bold text-blue-950 dark:text-blue-200 mb-2">Berkas PDF Tidak Ditemukan</h4>
                          <p className="text-sm text-blue-600/70 dark:text-blue-400/70 max-w-md mx-auto">
                            Maaf, berkas lampiran PDF untuk informasi ini tidak tersedia atau telah dihapus dari server pusat.
                          </p>
                        </div>
                      )
                    ) : (
                      <div className="relative aspect-[16/9] w-full">
                        <Image
                          src={imageUrl}
                          alt={data.title}
                          fill
                          className="object-cover object-center"
                          unoptimized
                        />
                      </div>
                    )}
                  </div>
                )}

                <div
                  className="blog-details prose prose-blue dark:prose-invert prose-headings:text-blue-950 dark:prose-headings:text-blue-200 prose-a:text-blue-600 dark:prose-a:text-blue-400 max-w-none leading-relaxed font-medium text-blue-950 dark:text-blue-100/90"
                  dangerouslySetInnerHTML={{ __html: data.isi || "" }}
                ></div>

                <div className="mt-10 flex items-center justify-between border-t border-blue-100/40 pt-7.5 dark:border-blue-900/30">
                  <SharePost />
                </div>
              </div>
            </div>

            {/* Sidebar Area */}
            <div className="flex flex-col gap-1 md:w-1/2 lg:w-[32%]">
              <SidebarNews />
              <SidebarPhotos />
              <SidebarVideos />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPage;
