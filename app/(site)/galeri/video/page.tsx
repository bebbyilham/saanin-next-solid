import { Metadata } from "next";
import Image from "next/image";
import SectionHeader from "@/components/Common/SectionHeader";

export const metadata: Metadata = {
  title: "Galeri Video - RSJ Prof HB Saanin",
  description: "Dokumentasi video kegiatan RSJ Prof HB Saanin",
};

type VideoItem = {
  _id: number;
  title: string;
  slug: string;
  url: string;
  thumbnailUrl: string;
  createdAt: string;
};

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

const GaleriVideoPage = async () => {
  let videoData: VideoItem[] = [];

  try {
    const res = await fetch(
      "https://api-web.sumbarprov.go.id/api/galery-video/3107",
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    const result = await res.json();

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
    <>
      <section className="py-20 lg:py-25 xl:py-30">
        <div className="mx-auto mt-15 max-w-c-1280 px-4 md:px-8 xl:mt-20 xl:px-0">
          <SectionHeader
            headerInfo={{
              title: "Media & Visual",
              subtitle: "GALERI VIDEO",
              description: `Koleksi video informasi, publikasi, dan edukasi dari RSJ Prof HB Saanin`,
            }}
          />

          <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10 mt-10">
            {videoData.length > 0 ? (
              videoData.map((item) => (
                <a
                  key={item._id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="animate_top group block overflow-hidden rounded-xl bg-white shadow-solid-8 dark:bg-blacksection"
                >
                  <div className="relative h-[220px] w-full overflow-hidden rounded-t-xl">
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
                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors duration-300 group-hover:bg-black/40">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="line-clamp-2 text-lg font-medium text-black duration-300 group-hover:text-primary dark:text-white dark:group-hover:text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-waterloo">{item.createdAt}</p>
                  </div>
                </a>
              ))
            ) : (
              <div className="col-span-full py-10 text-center text-waterloo">
                Belum ada video galeri saat ini.
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default GaleriVideoPage;
