import React from "react";
import Image from "next/image";
import Link from "next/link";
import BlogData from "./blogData";

async function getRelatedPosts() {
  // Ambil beberapa berita terbaru sebagai related posts
  const res = await fetch(`https://api-web.sumbarprov.go.id/api/posts/3107`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return [];
  const result = await res.json();
  return result?.data?.slice(0, 3) || [];
}

const RelatedPost = async () => {
  const posts = await getRelatedPosts();
  const baseUrl = "https://api-web.sumbarprov.go.id";

  return (
    <>
      <div className="animate_top rounded-md border border-stroke bg-white p-9 shadow-solid-13 dark:border-strokedark dark:bg-blacksection">
        <h4 className="mb-7.5 text-2xl font-semibold text-black dark:text-white">
          Berita Terkait
        </h4>

        <div>
          {posts.length > 0 ? (
            posts.map((post: any, key: number) => (
              <div
                className="mb-7.5 flex flex-wrap gap-4 xl:flex-nowrap 2xl:gap-6"
                key={key}
              >
                <div className="max-w-45 relative h-18 w-45">
                  {post.thumbnail ? (
                    <Image fill src={post.thumbnail} alt={post.title} className="object-cover rounded" unoptimized />
                  ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-800 rounded flex items-center justify-center text-[10px]">No Image</div>
                  )}
                </div>
                <h5 className="text-md font-medium text-black transition-all duration-300 hover:text-primary dark:text-white dark:hover:text-primary">
                  <Link href={`/berita/${post.slug}`}>
                    {" "}
                    {post.title.length > 40 ? `${post.title.slice(0, 40)}...` : post.title}
                  </Link>
                </h5>
              </div>
            ))
          ) : (
            <p className="text-sm">Tidak ada berita terkait</p>
          )}
        </div>
      </div>
    </>
  );
};

export default RelatedPost;
