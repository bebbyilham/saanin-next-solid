import { Metadata } from "next";
import Link from "next/link";
import SectionHeader from "@/components/Common/SectionHeader";
import Image from "next/image";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const metadata: Metadata = {
  title: "Pencarian Global - RSJ Prof HB Saanin",
  description: "Hasil pencarian untuk seluruh konten website",
};

// Define static routes to search
const STATIC_PAGES = [
  { title: "Profil & Visi Misi", path: "/profil/visi-misi", type: "Halaman", desc: "Informasi profil, visi, dan misi Rumah Sakit." },
  { title: "Sejarah", path: "/profil/sejarah", type: "Halaman", desc: "Sejarah Rumah Sakit Jiwa Prof. HB. Saanin Padang." },
  { title: "Struktur Organisasi", path: "/profil/struktur-organisasi", type: "Halaman", desc: "Bagan dan struktur organisasi rumah sakit." },
  { title: "Profil Pejabat", path: "/profil/profil-pejabat", type: "Halaman", desc: "Profil lengkap para pejabat di lingkungan RSJ." },
  { title: "Jadwal Dokter", path: "/jadwal-dokter", type: "Layanan", desc: "Informasi lengkap jadwal praktik dokter dan poliklinik." },
  { title: "Info Tempat Tidur", path: "/info-tempat-tidur", type: "Layanan", desc: "Informasi ketersediaan tempat tidur / bed occupancy secara real-time." },
  { title: "Kontak & Lokasi", path: "/contact", type: "Halaman", desc: "Informasi kontak, nomor telepon, dan lokasi rumah sakit." },
  { title: "PPID (Pejabat Pengelola Informasi dan Dokumentasi)", path: "/ppid", type: "Halaman", desc: "Layanan permohonan informasi publik (PPID)." },
  { title: "Perpustakaan - Laporan Kinerja", path: "/perpustakaan/laporan-kinerja-instansi-pemerintah", type: "Dokumen", desc: "Dokumen Laporan Kinerja Instansi Pemerintah (LKIP)." },
];

async function getApiData(url: string) {
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const json = await res.json();
    return json?.data || [];
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

const SearchPage = async ({ searchParams }: Props) => {
  const resolvedSearchParams = await searchParams;
  const q = typeof resolvedSearchParams.q === "string" ? resolvedSearchParams.q.toLowerCase() : "";

  // 1. Filter Static Pages
  const matchedStatic = q
    ? STATIC_PAGES.filter(
        (page) =>
          page.title.toLowerCase().includes(q) || page.desc.toLowerCase().includes(q) || page.type.toLowerCase().includes(q)
      )
    : [];

  // 2. Fetch and Filter News (Berita Utama)
  const allBerita = await getApiData("https://api-web.sumbarprov.go.id/api/category/berita-utama/3107");
  const matchedBerita = q
    ? allBerita.filter((item: any) => item.title?.toLowerCase().includes(q) || item.isi?.toLowerCase().includes(q))
    : [];

  // 3. Fetch and Filter Announcements (Pengumuman)
  const allPengumuman = await getApiData("https://api-web.sumbarprov.go.id/api/pengumuman/3107");
  const matchedPengumuman = q
    ? allPengumuman.filter((item: any) => item.title?.toLowerCase().includes(q) || item.isi?.toLowerCase().includes(q))
    : [];

  const totalResults = matchedStatic.length + matchedBerita.length + matchedPengumuman.length;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://api-web.sumbarprov.go.id";

  return (
    <>
      <section className="py-20 lg:py-25 xl:py-30">
        <div className="mx-auto mt-15 max-w-c-1280 px-4 md:px-8 xl:mt-20 xl:px-0">
          <SectionHeader
            headerInfo={{
              title: "Pencarian Global",
              subtitle: q ? `Hasil Pencarian: "${q}"` : "Masukkan kata kunci",
              description: q 
                ? `Menemukan ${totalResults} hasil untuk kata kunci yang Anda cari di seluruh situs.`
                : "Gunakan kolom pencarian untuk menemukan informasi, layanan, berita, atau pengumuman.",
            }}
          />

          {!q ? (
             <div className="mt-15 text-center p-10 border border-stroke rounded-lg dark:border-strokedark">
                <h3 className="text-xl font-medium text-black dark:text-white">Silakan masukkan kata kunci pencarian.</h3>
             </div>
          ) : totalResults === 0 ? (
             <div className="mt-15 text-center p-10 border border-stroke rounded-lg dark:border-strokedark">
                <div className="mx-auto w-24 h-24 mb-5 text-gray-300 dark:text-gray-600">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-black dark:text-white mb-2">Pencarian Tidak Ditemukan</h3>
                <p>Maaf, kami tidak dapat menemukan hasil apa pun untuk "{q}". Coba gunakan kata kunci lain.</p>
             </div>
          ) : (
            <div className="mt-15 flex flex-col gap-10">
              {/* Static Pages Results */}
              {matchedStatic.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-black dark:text-white mb-6 border-b border-stroke pb-3 dark:border-strokedark flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-primary rounded-full inline-block"></span>
                    Halaman & Layanan ({matchedStatic.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {matchedStatic.map((page, idx) => (
                      <Link href={page.path} key={idx} className="block group">
                        <div className="p-6 rounded-lg border border-stroke bg-white hover:border-primary hover:shadow-solid-4 transition-all dark:border-strokedark dark:bg-blacksection dark:hover:border-primary">
                           <div className="mb-2">
                             <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 uppercase tracking-wider">{page.type}</span>
                           </div>
                           <h4 className="text-lg font-bold text-black dark:text-white group-hover:text-primary transition-colors mb-2">{page.title}</h4>
                           <p className="text-sm text-body-color dark:text-gray-400">{page.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* News Results */}
              {matchedBerita.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-black dark:text-white mb-6 border-b border-stroke pb-3 dark:border-strokedark flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-green-500 rounded-full inline-block"></span>
                    Berita Utama ({matchedBerita.length})
                  </h3>
                  <div className="grid grid-cols-1 gap-5">
                    {matchedBerita.map((item: any, idx: number) => {
                       const imageUrl = item.gambar ? `${baseUrl}${item.gambar}` : null;
                       return (
                        <Link href={`/berita/${item.slug}`} key={idx} className="flex flex-col sm:flex-row gap-6 p-5 rounded-lg border border-stroke bg-white hover:shadow-solid-4 transition-all dark:border-strokedark dark:bg-blacksection group">
                          {imageUrl && (
                            <div className="w-full sm:w-48 h-32 shrink-0 relative rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800">
                              <Image src={imageUrl} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                            </div>
                          )}
                          <div className="flex flex-col justify-center">
                            <h4 className="text-lg font-bold text-black dark:text-white group-hover:text-primary transition-colors mb-2 line-clamp-2">{item.title}</h4>
                            {item.created_at && (
                              <p className="text-xs font-medium text-waterloo mb-2">{item.created_at.split(' ').slice(0, 3).join(' ')}</p>
                            )}
                            <p className="text-sm text-body-color dark:text-gray-400 line-clamp-2">Lihat selengkapnya tentang berita ini...</p>
                          </div>
                        </Link>
                       )
                    })}
                  </div>
                </div>
              )}

              {/* Announcements Results */}
              {matchedPengumuman.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-black dark:text-white mb-6 border-b border-stroke pb-3 dark:border-strokedark flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-orange-500 rounded-full inline-block"></span>
                    Pengumuman ({matchedPengumuman.length})
                  </h3>
                  <div className="grid grid-cols-1 gap-5">
                    {matchedPengumuman.map((item: any, idx: number) => {
                       const imageUrl = item.gambar ? `${baseUrl}${item.gambar}` : null;
                       return (
                        <Link href={`/berita/${item.slug}`} key={idx} className="flex flex-col sm:flex-row gap-6 p-5 rounded-lg border border-stroke bg-white hover:shadow-solid-4 transition-all dark:border-strokedark dark:bg-blacksection group border-l-4 border-l-orange-500">
                          {imageUrl && (
                            <div className="w-full sm:w-48 h-32 shrink-0 relative rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800">
                              <Image src={imageUrl} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                            </div>
                          )}
                          <div className="flex flex-col justify-center">
                            <h4 className="text-lg font-bold text-black dark:text-white group-hover:text-primary transition-colors mb-2 line-clamp-2">{item.title}</h4>
                            {item.created_at && (
                              <p className="text-xs font-medium text-waterloo mb-2">{item.created_at.split(' ').slice(0, 3).join(' ')}</p>
                            )}
                            <p className="text-sm text-body-color dark:text-gray-400 line-clamp-2">Baca informasi pengumuman selengkapnya...</p>
                          </div>
                        </Link>
                       )
                    })}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SearchPage;
