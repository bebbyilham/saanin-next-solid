"use client";
import Image from "next/image";
import { useState } from "react";

const Hero = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section className="overflow-hidden pt-35 pb-20 md:pt-40 xl:pt-46 xl:pb-25">
        <div className="max-w-c-1390 mx-auto px-4 md:px-8 2xl:px-0">
          <div className="animate_right">
            <Image
              src="/images/hero/h1_hero.png"
              alt="Rumah Sakit Jiwa Prof. HB Saanin"
              width={1390}
              height={500}
              priority
              className="h-auto w-full rounded-2xl object-cover object-center"
            />
          </div>
        </div>
      </section>
      <section className="overflow-hidden pt-18 pb-10 md:pt-20 xl:pt-23 xl:pb-23">
        <div className="max-w-c-1390 mx-auto px-4 md:px-8 2xl:px-0">
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center xl:gap-32.5">
            <div className="w-full text-center lg:w-1/2">
              <h3 className="text-md mb-6 font-bold text-black md:text-4xl dark:text-white">
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
