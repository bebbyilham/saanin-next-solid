import React from "react";
import Image from "next/image";
import Link from "next/link";

async function getLatestPhotos() {
  try {
    const res = await fetch(`https://api-web.sumbarprov.go.id/api/galery-foto/3107`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const result = await res.json();
    return result?.data?.slice(0, 4) || [];
  } catch (error) {
    return [];
  }
}

const SidebarPhotos = async () => {
  const photos = await getLatestPhotos();
  const baseUrl = "https://api-web.sumbarprov.go.id";

  if (photos.length === 0) return null;

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
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
          Foto Terbaru
        </h4>
        <Link href="/galeri/foto" className="text-[11px] font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300">
          Lihat Semua →
        </Link>
      </div>

      <div className="p-3">
        <div className="grid grid-cols-2 gap-2">
          {photos.map((foto: any, key: number) => (
            <div key={key} className="relative aspect-square overflow-hidden rounded-lg border border-blue-200/10">
              {foto.cover ? (
                <Image 
                  fill 
                  src={baseUrl + foto.cover} 
                  alt={foto.title || "Gallery photo"} 
                  className="object-cover transition-transform duration-500 hover:scale-110" 
                  unoptimized 
                />
              ) : (
                <div className="w-full h-full bg-blue-100/30 dark:bg-blue-950/30 flex items-center justify-center">
                  <span className="text-[10px] text-blue-400">No Image</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarPhotos;
