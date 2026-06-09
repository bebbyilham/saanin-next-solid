"use client";
import { Blog } from "@/types/blog";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const BlogItem = ({ blog, variant = "small" }: { blog: Blog; variant?: "large" | "small" }) => {
  const { mainImage, title, metadata, slug, publishedAt } = blog;
  const isPdf = mainImage && mainImage.toLowerCase().endsWith(".pdf");

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
        className="animate_top group relative overflow-hidden rounded-2xl bg-blue-500/5 dark:bg-blue-950/10 border border-blue-200/30 dark:border-blue-800/20 shadow-lg shadow-blue-500/3 transition-all duration-300 hover:border-blue-400/40 hover:shadow-blue-500/10"
        style={{
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)"
        }}
      >
        <Link href={`/berita/${slug}`} className="relative block aspect-video w-full overflow-hidden">
          {isPdf ? (
            <div className="flex h-full w-full flex-col items-center justify-center bg-blue-500/10 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 font-bold gap-2 transition-colors duration-300 group-hover:bg-blue-500/15">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-pulse"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              <span className="text-[10px] tracking-wider uppercase font-extrabold bg-blue-500/20 px-2 py-0.5 rounded-full border border-blue-500/30">
                DOKUMEN PDF
              </span>
              <span className="text-sm font-bold text-center px-6 line-clamp-2 max-w-[280px] text-blue-900 dark:text-blue-200 mt-1">
                {title}
              </span>
            </div>
          ) : (
            <Image
              src={mainImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          {/* Badge */}
          <div 
            className="absolute left-5 top-5 z-10 rounded-full bg-blue-500/30 border border-blue-200/40 px-3 py-1 text-xs font-bold uppercase text-white"
            style={{
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)"
            }}
          >
            Terbaru
          </div>
          {/* Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-blue-950/90 via-blue-950/30 to-transparent">
            <div className="absolute bottom-0 p-6 md:p-10 w-full">
              <div className="mb-2 flex items-center gap-2 text-blue-200/80">
                <svg
                  className="fill-current text-blue-400"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                >
                  <path d="M19,4H18V2H16V4H8V2H6V4H5C3.89,4 3,4.9 3,6V20C3,21.1 3.89,22 5,22H19C20.1,22 21,21.1 21,20V6C21,4.9 20.1,4 19,4M19,20H5V10H19V20M19,8H5V6H19V8Z" />
                </svg>
                <span className="text-sm font-semibold">{publishedAt}</span>
              </div>
              <h3 className="text-xl font-bold text-white md:text-2xl xl:text-itemtitle transition-colors duration-300 group-hover:text-blue-300">
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
      className="animate_top group flex items-center gap-5 rounded-xl border border-blue-200/20 bg-blue-500/5 p-4 shadow-lg shadow-blue-500/3 duration-300 dark:border-blue-800/20 dark:bg-blue-950/10 hover:border-blue-400/40 hover:bg-blue-500/10 hover:shadow-blue-500/10 transition-all"
      style={{
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)"
      }}
    >
      <Link href={`/berita/${slug}`} className="relative h-20 w-24 flex-shrink-0 overflow-hidden rounded-lg md:h-24 md:w-32 border border-blue-200/10 dark:border-blue-800/10">
        {isPdf ? (
          <div className="flex h-full w-full flex-col items-center justify-center bg-blue-500/10 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 font-bold transition-colors duration-300 group-hover:bg-blue-500/15">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-pulse"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            <span className="text-[8px] font-extrabold uppercase bg-blue-500/20 px-1 py-0.5 rounded border border-blue-500/30 mt-1">
              PDF
            </span>
          </div>
        ) : (
          <Image
            src={mainImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        )}
      </Link>

      <div className="flex flex-col">
        <div className="mb-1 flex items-center gap-2 text-blue-600/70 dark:text-blue-400/70">
          <svg className="fill-current text-blue-500 dark:text-blue-400" width="12" height="12" viewBox="0 0 24 24">
            <path d="M19,4H18V2H16V4H8V2H6V4H5C3.89,4 3,4.9 3,6V20C3,21.1 3.89,22 5,22H19C20.1,22 21,21.1 21,20V6C21,4.9 20.1,4 19,4M19,20H5V10H19V20M19,8H5V6H19V8Z" />
          </svg>
          <span className="text-xs font-semibold">{publishedAt}</span>
        </div>
        <h3 className="line-clamp-2 text-base font-semibold text-blue-950 duration-300 group-hover:text-blue-500 dark:text-blue-100 dark:group-hover:text-blue-400">
          <Link href={`/berita/${slug}`}>{title}</Link>
        </h3>
      </div>
    </motion.div>
  );
};

export default BlogItem;
