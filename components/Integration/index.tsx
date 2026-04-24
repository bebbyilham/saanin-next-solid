"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeader from "../Common/SectionHeader";

const Integration = () => {
  return (
    <>
      <section>
        

        <div className="pattern-dots pattern-blue-500 pattern-bg-white pattern-size-4 pattern-opacity-10 relative z-50 mx-auto mt-15 max-w-c-1154 px-4 md:px-8 xl:mt-20 xl:px-0">
          <div className="absolute -top-3/4 left-0 right-0 -z-1 mx-auto h-full w-full">
            <Image
              width={1200}
              height={400}
              sizes="(max-width: 768px) 100vw"
              src="/images/shape/shape-dotted-light.svg"
              alt="Dotted"
              className="dark:hidden"
              style={{ position: "static" }}
            />
            <Image
              fill
              src="/images/shape/shape-dotted-dark.svg"
              alt="Dotted"
              className="hidden dark:block"
            />
          </div>
          <div className="grid grid-cols-3 items-center justify-items-center gap-y-10 sm:grid-cols-4 md:grid-cols-6 lg:flex lg:flex-wrap lg:justify-around">
            {/* Instagram */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_top w-full max-w-[90px] lg:w-1/6"
            >
              <a href="https://www.instagram.com/rsjsaaninpadang" target="_blank" rel="noopener noreferrer" className="mx-auto flex aspect-square w-full items-center justify-center rounded-[10px] bg-white shadow-solid-7 transition-transform hover:scale-110 dark:bg-btndark">
                <svg className="h-[40px] w-[40px] md:h-[50px] md:w-[50px] fill-[#E1306C]" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </motion.div>

            {/* Empty/Spacing - Hidden on mobile */}
            <motion.div variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }} initial="hidden" whileInView="visible" transition={{ duration: 1, delay: 0.1 }} viewport={{ once: true }} className="animate_top hidden lg:block w-1/6" />

            {/* Facebook */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_top w-full max-w-[90px] lg:w-1/6"
            >
              <a href="https://www.facebook.com/jiwamobile" className="mx-auto flex aspect-square w-full items-center justify-center rounded-[10px] bg-white shadow-solid-7 transition-transform hover:scale-110 dark:bg-btndark">
                <svg className="h-[40px] w-[40px] md:h-[50px] md:w-[50px] fill-[#1877F2]" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
            </motion.div>

            {/* Yellow Dot - Hidden on mobile */}
            <motion.div variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }} initial="hidden" whileInView="visible" transition={{ duration: 1, delay: 0.1 }} viewport={{ once: true }} className="animate_top hidden lg:flex items-center justify-center w-1/6"><div className="h-[11px] w-[11px] rounded-full bg-[#FFDB26]"></div></motion.div>

            {/* X */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_top w-full max-w-[90px] lg:w-1/6"
            >
              <a href="https://x.com/rsjsaaninpadang" className="mx-auto flex aspect-square w-full items-center justify-center rounded-[10px] bg-white shadow-solid-7 transition-transform hover:scale-110 dark:bg-btndark">
                <svg className="h-[40px] w-[40px] md:h-[50px] md:w-[50px] fill-black dark:fill-white" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </motion.div>

            {/* Empty space - Hidden on mobile */}
            <motion.div variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }} initial="hidden" whileInView="visible" transition={{ duration: 1, delay: 0.1 }} viewport={{ once: true }} className="animate_top hidden lg:block w-1/6" />

            {/* Green Dot - Hidden on mobile */}
            <motion.div variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }} initial="hidden" whileInView="visible" transition={{ duration: 1, delay: 0.1 }} viewport={{ once: true }} className="animate_top hidden lg:flex items-center justify-center w-1/6"><div className="h-[15px] w-[15px] rounded-full bg-[#62E888]"></div></motion.div>

            {/* TikTok */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_top w-full max-w-[90px] lg:w-1/6"
            >
              <a href="https://www.tiktok.com/@rsjsaaninpadang" className="mx-auto flex aspect-square w-full items-center justify-center rounded-[10px] bg-white shadow-solid-7 transition-transform hover:scale-110 dark:bg-btndark">
                <svg className="h-[40px] w-[40px] md:h-[50px] md:w-[50px] fill-black dark:fill-white" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.89 2.89 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                </svg>
              </a>
            </motion.div>

            {/* Orange Dot - Hidden on mobile */}
            <motion.div variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }} initial="hidden" whileInView="visible" transition={{ duration: 1, delay: 0.1 }} viewport={{ once: true }} className="animate_top hidden lg:flex items-center justify-center w-1/6"><div className="h-[23px] w-[23px] rounded-full bg-[#EF5C00]"></div></motion.div>

            {/* WhatsApp */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_top w-full max-w-[90px] lg:w-1/6"
            >
              <a href="#" className="mx-auto flex aspect-square w-full items-center justify-center rounded-[10px] bg-white shadow-solid-7 transition-transform hover:scale-110 dark:bg-btndark">
                <svg className="h-[40px] w-[40px] md:h-[50px] md:w-[50px] fill-[#25D366]" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.888-4.439 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.88-.788-1.474-1.761-1.648-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.52-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </a>
            </motion.div>

            {/* Blue Dot - Hidden on mobile */}
            <motion.div variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }} initial="hidden" whileInView="visible" transition={{ duration: 1, delay: 0.1 }} viewport={{ once: true }} className="animate_top hidden lg:flex items-center justify-center w-1/6"><div className="h-[15px] w-[15px] rounded-full bg-[#016BFF]"></div></motion.div>

            {/* Youtube */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_top w-full max-w-[90px] lg:w-1/6"
            >
              <a href="https://www.youtube.com/@rs.jiwaprof.hb.saaninpadan1477" className="mx-auto flex aspect-square w-full items-center justify-center rounded-[10px] bg-white shadow-solid-7 transition-transform hover:scale-110 dark:bg-btndark">
                <svg className="h-[40px] w-[40px] md:h-[50px] md:w-[50px] fill-[#FF0000]" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Integration;
