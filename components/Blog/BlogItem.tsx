"use client";
import { Blog } from "@/types/blog";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const BlogItem = ({ blog, variant = "small" }: { blog: Blog; variant?: "large" | "small" }) => {
  const { mainImage, title, metadata, slug, publishedAt } = blog;

  if (variant === "large") {
    return (
      <motion.div
        variants={{
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 1, delay: 0.1 }}
        viewport={{ once: true }}
        className="animate_top group relative overflow-hidden rounded-2xl bg-white shadow-solid-8 dark:bg-blacksection"
      >
        <Link href={`/berita/${slug}`} className="relative block aspect-video w-full overflow-hidden">
          <Image
            src={mainImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Badge */}
          <div className="absolute left-5 top-5 z-10 rounded-md bg-blue-500 px-3 py-1 text-xs font-bold uppercase text-white">
            Terbaru
          </div>
          {/* Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent">
            <div className="absolute bottom-0 p-6 md:p-10">
              <div className="mb-2 flex items-center gap-2 text-white/80">
                <svg
                  className="fill-current"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                >
                  <path d="M19,4H18V2H16V4H8V2H6V4H5C3.89,4 3,4.9 3,6V20C3,21.1 3.89,22 5,22H19C20.1,22 21,21.1 21,20V6C21,4.9 20.1,4 19,4M19,20H5V10H19V20M19,8H5V6H19V8Z" />
                </svg>
                <span className="text-sm font-medium">{publishedAt}</span>
              </div>
              <h3 className="text-xl font-bold text-white md:text-2xl xl:text-itemtitle">
                {title}
              </h3>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 1, delay: 0.2 }}
      viewport={{ once: true }}
      className="animate_top group flex items-center gap-5 rounded-xl border border-stroke bg-white p-4 shadow-solid-2 duration-300 hover:shadow-solid-4 dark:border-strokedark dark:bg-blacksection"
    >
      <Link href={`/berita/${slug}`} className="relative h-20 w-24 flex-shrink-0 overflow-hidden rounded-lg md:h-24 md:w-32">
        <Image
          src={mainImage}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </Link>

      <div className="flex flex-col">
        <div className="mb-1 flex items-center gap-2 text-waterloo">
          <svg className="fill-current" width="12" height="12" viewBox="0 0 24 24">
            <path d="M19,4H18V2H16V4H8V2H6V4H5C3.89,4 3,4.9 3,6V20C3,21.1 3.89,22 5,22H19C20.1,22 21,21.1 21,20V6C21,4.9 20.1,4 19,4M19,20H5V10H19V20M19,8H5V6H19V8Z" />
          </svg>
          <span className="text-xs font-medium">{publishedAt}</span>
        </div>
        <h3 className="line-clamp-2 text-base font-semibold text-black duration-300 group-hover:text-primary dark:text-white dark:group-hover:text-primary">
          <Link href={`/berita/${slug}`}>{title}</Link>
        </h3>
      </div>
    </motion.div>
  );
};

export default BlogItem;
