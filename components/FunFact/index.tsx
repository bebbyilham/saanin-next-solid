"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { InstagramMedia } from "@/app/api/instagram/route";

// Ikon Play untuk video
const PlayIcon = () => (
  <svg
    className="h-12 w-12 text-white drop-shadow-lg"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M8 5v14l11-7z" />
  </svg>
);

// Ikon Carousel untuk album
const CarouselIcon = () => (
  <svg
    className="h-5 w-5 text-white drop-shadow"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M2 6h2v12H2zm18 0h2v12h-2zM6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z" />
  </svg>
);

// Skeleton loader untuk kartu
const CardSkeleton = () => (
  <div className="aspect-square animate-pulse overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-700" />
);

const fadeUp = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

const FunFact = () => {
  const [posts, setPosts] = useState<InstagramMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/instagram");
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Gagal memuat feed Instagram");
        }
        const data: InstagramMedia[] = await res.json();
        setPosts(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);

  return (
    <>
      {/* ===== Instagram Feed Start ===== */}
      <section className="px-4 py-20 md:px-8 lg:py-22.5 2xl:px-0">
        <div className="relative z-1 mx-auto max-w-c-1390 rounded-lg bg-linear-to-t from-[#F8F9FF] to-[#DEE7FF] py-22.5 dark:bg-blacksection dark:bg-linear-to-t dark:from-transparent dark:to-transparent dark:stroke-strokedark xl:py-27.5">
          {/* Decorative shapes */}
          <Image
            width={335}
            height={384}
            src="/images/shape/shape-04.png"
            alt="Man"
            className="absolute -left-10 -top-15 -z-1 w-[200px] md:w-[335px] lg:left-0 lg:-top-25"
          />
          <Image
            width={132}
            height={132}
            src="/images/shape/shape-05.png"
            alt="Doodle"
            className="absolute bottom-0 right-0 -z-1"
          />
          <Image
            fill
            src="/images/shape/shape-dotted-light-02.svg"
            alt="Dotted"
            className="absolute left-0 top-0 -z-1 dark:hidden"
          />
          <Image
            fill
            src="/images/shape/shape-dotted-dark-02.svg"
            alt="Dotted"
            className="absolute left-0 top-0 -z-1 hidden dark:block"
          />

          {/* Header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 1, delay: 0.1 }}
            viewport={{ once: true }}
            className="animate_top mx-auto mb-12.5 px-4 text-center md:w-4/5 md:px-0 lg:mb-17.5 lg:w-2/3 xl:w-1/2"
          >
            {/* Instagram logo badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E1306C]/30 bg-white/80 px-4 py-1.5 shadow-sm dark:bg-blackho/50">
              <svg
                className="h-5 w-5 text-[#E1306C]"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                @rsjsaaninpadang
              </span>
            </div>

            <h2 className="mb-4 text-2xl font-bold text-black dark:text-white sm:text-3xl xl:text-sectiontitle3">
              Ikuti Kami di Instagram
            </h2>
            <p className="mx-auto lg:w-11/12">
              Dapatkan informasi terbaru, kegiatan, dan layanan RSJ Prof. HB.
              Saanin Padang langsung dari laman Instagram resmi kami.
            </p>
          </motion.div>

          {/* Feed Grid */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="animate_top px-6 xl:px-16"
          >
            {/* Error state */}
            {error && (
              <div className="mx-auto mb-6 max-w-lg rounded-xl border border-red-200 bg-red-50 p-5 text-center dark:border-red-800 dark:bg-red-900/20">
                <p className="text-sm font-medium text-red-600 dark:text-red-400">
                  ⚠️ {error}
                </p>
                {error.includes("not configured") && (
                  <p className="mt-1 text-xs text-red-500 dark:text-red-500">
                    Tambahkan INSTAGRAM_ACCESS_TOKEN dan INSTAGRAM_USER_ID ke
                    file .env.local
                  </p>
                )}
              </div>
            )}

            {/* Grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-3">
              {loading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <CardSkeleton key={i} />
                  ))
                : posts.map((post, index) => (
                    <motion.a
                      key={post.id}
                      href={post.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                      viewport={{ once: true }}
                      className="group relative aspect-square overflow-hidden rounded-xl shadow-md"
                      aria-label={
                        post.caption
                          ? post.caption.slice(0, 60)
                          : "Lihat di Instagram"
                      }
                    >
                      {/* Gambar */}
                      <Image
                        src={
                          post.media_type === "VIDEO"
                            ? (post.thumbnail_url ?? post.media_url)
                            : post.media_url
                        }
                        alt={post.caption?.slice(0, 100) ?? "Instagram post"}
                        fill
                        sizes="(max-width: 640px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />

                      {/* Overlay hover */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/50">
                        {/* Ikon media type */}
                        {post.media_type === "VIDEO" && (
                          <div className="absolute right-2.5 top-2.5 opacity-90">
                            <PlayIcon />
                          </div>
                        )}
                        {post.media_type === "CAROUSEL_ALBUM" && (
                          <div className="absolute right-2.5 top-2.5 opacity-90">
                            <CarouselIcon />
                          </div>
                        )}

                        {/* Caption on hover */}
                        <div className="translate-y-4 px-3 text-center opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                          {post.caption && (
                            <p className="line-clamp-4 text-xs leading-relaxed text-white">
                              {post.caption}
                            </p>
                          )}
                          <span className="mt-2 inline-block text-xs font-semibold text-white/80">
                            Lihat di Instagram →
                          </span>
                        </div>
                      </div>
                    </motion.a>
                  ))}
            </div>

            {/* CTA Button */}
            {!loading && !error && posts.length > 0 && (
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
                className="mt-10 text-center"
              >
                <a
                  href="https://www.instagram.com/rsjsaaninpadang/"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="instagram-follow-btn"
                  className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] px-8 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  Ikuti @rsjsaaninpadang
                </a>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
      {/* ===== Instagram Feed End ===== */}
    </>
  );
};

export default FunFact;
