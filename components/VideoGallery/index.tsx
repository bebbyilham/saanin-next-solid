import React from "react";
import Image from "next/image";
import Link from "next/link";

type VideoItem = {
  _id: number;
  title: string;
  slug: string;
  url: string;
  thumbnailUrl: string;
  createdAt: string;
};

/**
 * Ekstrak YouTube video ID dari berbagai format URL:
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 */
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

const VideoGallery = async () => {
  let videoData: VideoItem[] = [];

  try {
    const response = await fetch(
      "https://api-web.sumbarprov.go.id/api/galery-video/3107",
      { cache: "no-store" }
    );
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const result = await response.json();

    if (result?.data && Array.isArray(result.data)) {
      videoData = result.data.map((item: any, index: number) => {
        const videoId = getYouTubeId(item.url || "");
        return {
          _id: index,
          title: item.title,
          slug: item.slug,
          url: item.url,
          thumbnailUrl: videoId
            ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
            : "",
          createdAt: item.created_at,
        };
      });
    }
  } catch (error) {
    console.error("Gagal memuat data galeri video:", error);
  }

  return (
    <section className="py-10 lg:py-15 xl:py-20">
      <div className="max-w-c-1315 mx-auto px-4 md:px-8 xl:px-0">
        {/* <!-- Section Header Start --> */}
        <div className="flex flex-wrap items-center justify-between gap-5 border-b border-stroke pb-6 dark:border-strokedark">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-500/10">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="fill-blue-500"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 15L15.19 12L10 9V15ZM21.56 7.17C21.69 7.64 21.78 8.27 21.84 9.07C21.91 9.87 21.94 10.56 21.94 11.16L22 12C22 14.19 21.84 15.8 21.56 16.83C21.31 17.73 20.73 18.31 19.83 18.56C19.36 18.69 18.5 18.78 17.18 18.84C15.88 18.91 14.69 18.94 13.59 18.94L12 19C7.81 19 5.2 18.84 4.17 18.56C3.27 18.31 2.69 17.73 2.44 16.83C2.31 16.36 2.22 15.73 2.16 14.93C2.09 14.13 2.06 13.44 2.06 12.84L2 12C2 9.81 2.16 8.2 2.44 7.17C2.69 6.27 3.27 5.69 4.17 5.44C4.64 5.31 5.5 5.22 6.82 5.16C8.12 5.09 9.31 5.06 10.41 5.06L12 5C16.19 5 18.8 5.16 19.83 5.44C20.73 5.69 21.31 6.27 21.56 7.17Z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-black dark:text-white xl:text-itemtitle2">
              Video Terbaru
            </h2>
          </div>
          <Link
            href="/galeri/video"
            className="flex items-center gap-2 font-semibold text-blue-500 duration-300 hover:gap-3"
          >
            Lihat Semua Video
            <svg
              width="18"
              height="14"
              viewBox="0 0 18 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 1L17 7L11 13M1 7H17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
        {/* <!-- Section Header End --> */}

        <div className="mt-12 grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
          {videoData.length > 0 ? (
            videoData.slice(0, 3).map((item) => (
              <a
                key={item._id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="animate_top group block overflow-hidden rounded-xl bg-white shadow-solid-8 dark:bg-blacksection"
              >
                {/* Thumbnail */}
                <div className="relative h-[200px] w-full overflow-hidden">
                  {item.thumbnailUrl ? (
                    <Image
                      src={item.thumbnailUrl}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-black">
                      <span className="text-white">Video</span>
                    </div>
                  )}
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors duration-300 group-hover:bg-black/40">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="line-clamp-2 text-base font-semibold text-black duration-300 group-hover:text-primary dark:text-white dark:group-hover:text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-waterloo">{item.createdAt}</p>
                </div>
              </a>
            ))
          ) : (
            <div className="col-span-full py-10 text-center text-waterloo">
              Belum ada video kegiatan saat ini.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default VideoGallery;
