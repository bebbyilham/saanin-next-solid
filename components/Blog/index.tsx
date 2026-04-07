import React from "react";
import SectionHeader from "../Common/SectionHeader";
import BlogItem from "./BlogItem";
import { Blog as BlogType } from "@/types/blog";
import Link from "next/link";

const Blog = async () => {
  const response = await fetch(
    "https://api-web.sumbarprov.go.id/api/category/berita-utama/3107",
    {
      next: { revalidate: 3600 },
    }
  );
  const result = await response.json();
  const blogData: BlogType[] = result.data.map((item: any, index: number) => ({
    _id: index,
    title: item.title,
    slug: item.slug,
    metadata: item.category,
    mainImage: `https://api-web.sumbarprov.go.id${item.gambar}`,
    publishedAt: item.created_at,
  }));

  return (
    <section className="py-20 lg:py-25 xl:py-30">
      <div className="max-w-c-1315 mx-auto px-4 md:px-8 xl:px-0">
        <div className="animate_top mx-auto mb-15 text-center">
          <SectionHeader
            headerInfo={{
              title: `BERITA UTAMA`,
              subtitle: ``,
              description: `Dapatkan informasi terbaru termasuk layanan kesehatan, program unggulan, dan kegiatan terkini yang kami lakukan untuk memberikan pelayanan terbaik kepada masyarakat.`,
            }}
          />
        </div>

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
                <path d="M19 5V19H5V5H19ZM19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM17 17H7V15H17V17ZM17 13H7V11H17V13ZM17 9H7V7H17V9Z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-black dark:text-white xl:text-itemtitle2">
              Berita Terkini
            </h2>
          </div>
          <Link
            href="/kategori/berita-utama"
            className="flex items-center gap-2 font-semibold text-blue-500 duration-300 hover:gap-3"
          >
            Lihat Semua Berita
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

        <div className="mt-12 grid grid-cols-1 gap-7.5 lg:grid-cols-12 xl:gap-10">
          {/* Featured Post */}
          <div className="lg:col-span-7">
            {blogData.length > 0 && (
              <BlogItem blog={blogData[0]} variant="large" />
            )}
          </div>

          {/* Sidebar Posts */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            {blogData.slice(1, 4).map((blog, key) => (
              <BlogItem blog={blog} key={key} variant="small" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
