"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

type SliderItem = {
  status: string;
  gambar: string;
  created_by: string;
  created_at: string;
};

const Hero = () => {
  const [sliders, setSliders] = useState<SliderItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const res = await fetch("https://api-web.sumbarprov.go.id/api/slider/3107");
        if (res.ok) {
          const data = await res.json();
          if (data?.data && Array.isArray(data.data)) {
            setSliders(
              data.data.filter((item: SliderItem) => item.status === "Publish")
            );
          }
        }
      } catch (error) {
        console.error("Error fetching sliders:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSliders();
  }, []);

  return (
    <>
      <section className="overflow-hidden pt-35 pb-20 md:pt-40 xl:pt-46 xl:pb-25">
        <div className="max-w-c-1390 mx-auto px-4 md:px-8 2xl:px-0">
          <div className="animate_right">
            {isLoading ? (
              <div className="flex aspect-[139/50] w-full items-center justify-center rounded-2xl bg-gray-100 dark:bg-strokedark">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
              </div>
            ) : sliders.length > 0 ? (
                <Swiper
                  modules={[Autoplay, Pagination]}
                  spaceBetween={30}
                  slidesPerView={1}
                  loop={true}
                  autoplay={{ delay: 5000, disableOnInteraction: false }}
                  pagination={{ clickable: true }}
                className="w-full rounded-2xl"
              >
                {sliders.map((slider, index) => (
                  <SwiperSlide key={index}>
                    <Image
                      src={`https://api-web.sumbarprov.go.id${slider.gambar}`}
                      alt={`Slider ${index + 1}`}
                      width={1390}
                      height={500}
                      priority={index === 0}
                      className="h-auto w-full rounded-2xl object-cover object-center"
                      unoptimized
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <Image
                src="/images/hero/h1_hero.png"
                alt="Rumah Sakit Jiwa Prof. HB Saanin"
                width={1390}
                height={500}
                priority
                className="h-auto w-full rounded-2xl object-cover object-center"
              />
            )}
          </div>
        </div>
      </section>
      <section className="overflow-hidden pt-18 pb-10 md:pt-20 xl:pt-23 xl:pb-23">
        <div className="max-w-c-1390 mx-auto px-4 md:px-8 2xl:px-0">
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center xl:gap-32.5">
            <div className="w-full text-center lg:w-1/2">
              <h3 className="mb-6 text-2xl font-bold text-black md:text-4xl dark:text-white">
                Pemerintah Daerah Sumatera Barat
              </h3>

              {/* Logo */}
              <div className="flex justify-center">
                <Image
                  src="/images/hero/logosbhbs2222.png"
                  alt="Logo Pemerintah Sumatera Barat"
                  width={250}
                  height={250}
                  className="h-auto w-auto rounded-lg"
                  style={{ maxWidth: "250px" }}
                />
              </div>
            </div>
            <div className="animate_right w-full lg:w-1/2">
              <div className="flex justify-center">
                <Image
                  src="/images/hero/gubernur.jpg"
                  alt="Gubernur & Wakil Gubernur Sumatera Barat"
                  width={600}
                  height={400}
                  className="h-auto w-4/5 rounded-lg object-cover shadow-lg"
                  unoptimized // diperlukan untuk GIF
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
