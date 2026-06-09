import React from "react";
import Image from "next/image";
import Link from "next/link";

async function getRelatedPosts() {
  try {
    const res = await fetch(`https://api-web.sumbarprov.go.id/api/category/berita-utama/3107`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const result = await res.json();
    return result?.data?.slice(0, 3) || [];
  } catch (error) {
    return [];
  }
}

const SidebarNews = async () => {
  const posts = await getRelatedPosts();
  const baseUrl = "https://api-web.sumbarprov.go.id";
  return (
    <div 
      className="animate_top mb-8 overflow-hidden rounded-2xl bg-blue-500/5 dark:bg-blue-950/20 border border-blue-200/30 dark:border-blue-800/20 shadow-lg shadow-blue-500/3"
      style={{
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)"
      }}
    >
      <div className="bg-blue-500/10 dark:bg-blue-950/30 border-b border-blue-200/30 dark:border-blue-800/30 p-4 flex items-center justify-between">
        <h4 className="flex items-center gap-2 text-[18px] font-bold text-blue-950 dark:text-blue-100">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-blue-600 dark:text-blue-400">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          Berita Terbaru
        </h4>
      </div>

      <div className="p-5 flex flex-col gap-6">
        {posts.length > 0 ? (
          posts.map((post: any, key: number) => (
            <div className="flex gap-4 border-b border-blue-100/40 dark:border-blue-900/30 pb-4 last:border-0 last:pb-0" key={key}>
              <div className="relative shrink-0 h-16 w-16 overflow-hidden rounded-lg border border-blue-200/20">
                {post.gambar ? (
                  post.gambar.toLowerCase().endsWith(".pdf") ? (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-blue-500/10 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 font-bold transition-colors duration-300">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="animate-pulse"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                      <span className="text-[7px] font-extrabold uppercase bg-blue-500/20 px-1 py-0.2 rounded border border-blue-500/30 mt-0.5 scale-90">
                        PDF
                      </span>
                    </div>
                  ) : (
                    <Image 
                      fill 
                      src={`${baseUrl}${post.gambar}`} 
                      alt={post.judul || post.title || "Thumbnail Berita"} 
                      className="object-cover" 
                      unoptimized 
                    />
                  )
                ) : (
                  <div className="w-full h-full bg-blue-100/30 dark:bg-blue-950/30 rounded flex items-center justify-center text-[10px] text-blue-400">No Image</div>
                )}
              </div>
              
              <div className="flex flex-col justify-center">
                <div className="mb-1 flex items-center gap-1.5 text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <span>{post.created_at ? post.created_at.split(' ').slice(0, 3).join(' ') : ""}</span>
                </div>
                
                <h5 className="mb-1.5 text-[14px] font-bold leading-snug text-blue-950 dark:text-blue-100 transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400">
                  <Link href={`/berita/${post.slug}`}>
                    {post.title.length > 55 ? `${post.title.slice(0, 55)}...` : post.title}
                  </Link>
                </h5>
                
                <Link href={`/berita/${post.slug}`} className="text-[12px] font-bold text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
                  Baca selengkapnya...
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-blue-400">Tidak ada berita terbaru</p>
        )}
      </div>
    </div>
  );
};

export default SidebarNews;
