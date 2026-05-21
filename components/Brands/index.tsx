"use client";
import React from "react";
import SingleBrand from "./SingleBrand";
import brandData from "./brandData";

const Brands = () => {
  return (
    <>
      {/* <!-- ===== Clients Start ===== --> */}
      <section 
        className="overflow-hidden border border-x-0 border-y-blue-200/20 bg-blue-500/5 py-11 dark:border-y-blue-800/20 dark:bg-blue-950/10 shadow-lg shadow-blue-500/3"
        style={{
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)"
        }}
      >
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex w-[200%] animate-marquee items-center gap-10 md:gap-20">
            {/* First set of logos */}
            {brandData.map((brand, key) => (
              <div key={`brand-${key}`} className="flex-shrink-0">
                <SingleBrand brand={brand} />
              </div>
            ))}
            {/* Second set of logos for seamless loop */}
            {brandData.map((brand, key) => (
              <div key={`brand-duplicate-${key}`} className="flex-shrink-0">
                <SingleBrand brand={brand} />
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* <!-- ===== Clients End ===== --> */}
    </>
  );
};

export default Brands;
