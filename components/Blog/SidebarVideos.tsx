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
            <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14v-4z"></path>
            <rect x="3" y="6" width="12" height="12" rx="2" ry="2"></rect>
          </svg>
          Video Terbaru
        </h4>
        <Link href="/galeri/video" className="text-[11px] font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300">
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
              className="group relative block aspect-[16/9] w-full overflow-hidden rounded-lg border border-blue-200/10"
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
                <div className="w-full h-full bg-blue-100/30 dark:bg-blue-950/30 flex items-center justify-center">
                  <span className="text-[10px] text-blue-400">No Thumbnail</span>
                </div>
              )}
              
              <div className="absolute inset-0 flex items-center justify-center bg-blue-950/20 transition-colors duration-300 group-hover:bg-blue-950/40">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20 backdrop-blur-sm border border-blue-300 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white">
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
