import React from "react";
import Image from "next/image";
import Link from "next/link";

interface NewsItem {
  slug: string;
  title: string;
  gambar: string;
}

const NewsNavigation = async ({ currentSlug }: { currentSlug: string }) => {
  const baseUrl = "https://api-web.sumbarprov.go.id";
  
  async function getNeighbors() {
    try {
      const res = await fetch("https://api-web.sumbarprov.go.id/api/berita", {
        next: { revalidate: 3600 },
      });
      if (!res.ok) return { prev: null, next: null };
      
      const result = await res.json();
      const posts: NewsItem[] = result?.data || [];
      
      const currentIndex = posts.findIndex((p) => p.slug === currentSlug);
      if (currentIndex === -1) return { prev: null, next: null };
      
      return {
        prev: currentIndex > 0 ? posts[currentIndex - 1] : null,
        next: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
      };
    } catch (error) {
      console.error("Error fetching news neighbors:", error);
      return { prev: null, next: null };
    }
  }

  const { prev, next } = await getNeighbors();

  if (!prev && !next) return null;

  return (
    <div className="mt-15 border-t border-stroke pt-10 dark:border-strokedark">
      <div className="flex flex-wrap items-center justify-between gap-10">
        <div className="w-full sm:w-1/2 lg:w-5/12">
          {prev && (
            <Link
              href={`/berita/${prev.slug}`}
              className="group flex items-center gap-4 xl:gap-8"
            >
              <div className="relative h-15 w-15 overflow-hidden rounded-md transition-all group-hover:opacity-80 md:h-20 md:w-20 lg:h-25 lg:w-25">
                <Image
                  src={`${baseUrl}${prev.gambar}`}
                  alt={prev.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="flex-1">
                <span className="mb-2 block text-sm font-medium text-waterloo">
                  Berita Sebelumnya
                </span>
                <h4 className="text-sm font-semibold text-black transition-all group-hover:text-primary dark:text-white md:text-base lg:text-lg">
                  {prev.title.length > 45 ? `${prev.title.slice(0, 45)}...` : prev.title}
                </h4>
              </div>
            </Link>
          )}
        </div>

        <div className="w-full text-right sm:w-1/2 lg:w-5/12">
          {next && (
            <Link
              href={`/berita/${next.slug}`}
              className="group flex flex-row-reverse items-center gap-4 xl:gap-8"
            >
              <div className="relative h-15 w-15 overflow-hidden rounded-md transition-all group-hover:opacity-80 md:h-20 md:w-20 lg:h-25 lg:w-25">
                <Image
                  src={`${baseUrl}${next.gambar}`}
                  alt={next.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="flex-1">
                <span className="mb-2 block text-sm font-medium text-waterloo">
                  Berita Selanjutnya
                </span>
                <h4 className="text-sm font-semibold text-black transition-all group-hover:text-primary dark:text-white md:text-base lg:text-lg">
                  {next.title.length > 45 ? `${next.title.slice(0, 45)}...` : next.title}
                </h4>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsNavigation;
