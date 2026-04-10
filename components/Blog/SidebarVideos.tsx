import React from "react";
import Image from "next/image";
import Link from "next/link";

function getYouTubeId(url: string): string | null {
  const patterns = [
    /youtu\.be\/([^?&\s]+)/,
    /youtube\.com\/watch\?v=([^?&\s]+)/,
    /youtube\.com\/embed\/([^?&\s]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

async function getLatestVideos() {
  try {
    const res = await fetch(`https://api-web.sumbarprov.go.id/api/galery-video/3107`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const result = await res.json();
    return result?.data?.slice(0, 2) || [];
  } catch (error) {
    return [];
  }
}

const SidebarVideos = async () => {
  const videos = await getLatestVideos();

  if (videos.length === 0) return null;

  return (
    <div className="animate_top mb-8 overflow-hidden rounded-xl bg-white shadow-solid-8 border border-stroke dark:border-strokedark dark:bg-blacksection">
      <div className="bg-gray-100 p-4 flex items-center justify-between">
        <h4 className="flex items-center gap-2 text-[18px] font-bold text-black">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#006bff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14v-4z"></path>
            <rect x="3" y="6" width="12" height="12" rx="2" ry="2"></rect>
          </svg>
          Video Terbaru
        </h4>
        <Link href="/galeri/video" className="text-[11px] font-bold text-[#1e3a8a] hover:text-primary transition-colors duration-300">
          Lihat Semua →
        </Link>
      </div>

      <div className="p-3 flex flex-col gap-3">
        {videos.map((video: any, key: number) => {
          const videoId = getYouTubeId(video.url || "");
          const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "";

          return (
            <a 
              key={key} 
              href={video.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group relative block aspect-[16/9] w-full overflow-hidden rounded-lg"
            >
              {thumbnailUrl ? (
                <Image 
                  fill 
                  src={thumbnailUrl} 
                  alt={video.title || "Video thumbnail"} 
                  className="object-cover transition-transform duration-500 group-hover:scale-105" 
                  unoptimized 
                />
              ) : (
                <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                  <span className="text-[10px]">No Thumbnail</span>
                </div>
              )}
              
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors duration-300 group-hover:bg-black/40">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/30 backdrop-blur-sm border border-white text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarVideos;
