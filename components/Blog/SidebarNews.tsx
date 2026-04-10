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
    <div className="animate_top mb-8 overflow-hidden rounded-xl bg-white shadow-solid-8 border border-stroke dark:border-strokedark dark:bg-blacksection">
      <div className="bg-gray-100 p-4 flex items-center justify-between">
        <h4 className="flex items-center gap-2 text-[18px] font-bold text-black">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#006bff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            <div className="flex gap-4 border-b border-stroke pb-4 last:border-0 last:pb-0 dark:border-strokedark" key={key}>
              <div className="relative shrink-0 h-16 w-16 overflow-hidden rounded-lg">
                {post.gambar ? (
                  <Image 
                    fill 
                    src={`${baseUrl}${post.gambar}`} 
                    alt={post.judul || post.title || "Thumbnail Berita"} 
                    className="object-cover" 
                    unoptimized 
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 dark:bg-gray-800 rounded flex items-center justify-center text-[10px]">No Image</div>
                )}
              </div>
              
              <div className="flex flex-col justify-center">
                <div className="mb-1 flex items-center gap-1.5 text-[11px] font-bold text-[#006bff] uppercase tracking-wide">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <span>{post.created_at ? post.created_at.split(' ').slice(0, 3).join(' ') : ""}</span>
                </div>
                
                <h5 className="mb-2 text-[14px] font-bold leading-snug text-[#1e3a8a] transition-all duration-300 hover:text-primary dark:text-white dark:hover:text-primary">
                  <Link href={`/berita/${post.slug}`}>
                    {post.title.length > 55 ? `${post.title.slice(0, 55)}...` : post.title}
                  </Link>
                </h5>
                
                <Link href={`/berita/${post.slug}`} className="text-[12px] font-medium text-waterloo hover:text-primary">
                  Baca selengkapnya...
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm">Tidak ada berita terbaru</p>
        )}
      </div>
    </div>
  );
};

export default SidebarNews;
