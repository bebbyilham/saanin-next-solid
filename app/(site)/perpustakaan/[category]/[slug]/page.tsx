import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "@/components/Perpustakaan/Sidebar";

type Props = {
  params: Promise<{ category: string; slug: string }>;
};

export const metadata: Metadata = {
  title: "Detail Dokumen - RSJ Prof HB Saanin",
  description: "Detail dokumen perpustakaan",
};

async function getDocumentDetail(slug: string) {
  const res = await fetch(`https://api-web.sumbarprov.go.id/api/berita/detail/${slug}`, {
    cache: 'no-store', // Disable cache to show latest data immediately
  });
  if (!res.ok) return null;
  const result = await res.json();
  return result?.data || null;
}

const formatTitle = (category: string) => {
  return category
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const DocumentDetailPage = async ({ params }: Props) => {
  const { category, slug } = await params;
  const data = await getDocumentDetail(slug);
  const baseUrl = "https://api-web.sumbarprov.go.id";
  const categoryTitle = formatTitle(category);

  if (!data) {
    return (
      <section className="pb-20 pt-35 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50 bg-zumthor dark:bg-black">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <Sidebar />
          <h1 className="text-2xl font-bold mt-10">Dokumen tidak ditemukan</h1>
        </div>
      </section>
    );
  }

  const fileUrl = data.gambar ? `${baseUrl}${data.gambar}` : null;
  const isPdf = fileUrl && fileUrl.toLowerCase().endsWith(".pdf");

  return (
    <section className="pb-20 pt-35 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50 bg-[#f8fafc] dark:bg-black">
      <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
        
        {/* Top Breadcrumb Nav */}
        <p className="text-sm text-gray-500 mb-4">
          Beranda &gt; Perpustakaan &gt; <Link href={`/perpustakaan/${category}`} className="hover:text-primary">{categoryTitle}</Link> &gt; <span className="font-semibold text-primary">{data.title}</span>
        </p>

        {/* Title area */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-black dark:text-white mb-2 tracking-tight">
            {data.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
             <span>{data.created_at?.split(' ').slice(0, 3).join(' ')}</span>
             <span className="w-1 h-1 rounded-full bg-gray-300 inline-block"></span>
             <span className="flex items-center gap-1">
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
               {data.created_by || "Admin BPBD"}
             </span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-10 mt-6">
          {/* Main Content Area (Left side) */}
          <div className="flex-1 overflow-hidden">
            <div className="w-full rounded-xl border border-stroke bg-white shadow-solid-13 dark:border-strokedark dark:bg-blacksection overflow-hidden flex flex-col">
              
              <div className="bg-[#1e3a8a] px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-white font-semibold text-sm">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                  Dokumen {isPdf ? "PDF" : "Image"}
                </div>
                {fileUrl && (
                   <a 
                    href={fileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-white text-xs flex items-center gap-1 hover:underline"
                   >
                     Buka di tab baru
                     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                   </a>
                )}
              </div>

              <div className="p-0 bg-gray-100 min-h-[600px] lg:h-[800px] w-full relative flex items-center justify-center">
                {fileUrl ? (
                  isPdf ? (
                    <iframe
                      src={`${fileUrl}#toolbar=0`}
                      className="w-full h-full border-none"
                      title={data.title}
                    />
                  ) : (
                    <div className="relative w-full h-full">
                       <Image
                         src={fileUrl}
                         alt={data.title}
                         fill
                         className="object-contain"
                         unoptimized
                       />
                    </div>
                  )
                ) : (
                  <div className="text-gray-400">File dokumen tidak tersedia</div>
                )}
              </div>
            </div>
            
            {/* HTML Content if available */}
            {data.isi && data.isi.trim() !== "" && (
              <div className="w-full mt-8 rounded-xl border border-stroke bg-white p-7.5 shadow-solid-13 dark:border-strokedark dark:bg-blacksection">
                 <div className="blog-details" dangerouslySetInnerHTML={{ __html: data.isi }}></div>
              </div>
            )}
          </div>

          {/* Sidebar Area (Right side) */}
          <Sidebar />
        </div>
      </div>
    </section>
  );
};

export default DocumentDetailPage;
