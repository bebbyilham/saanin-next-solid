import { Metadata } from "next";
import Image from "next/image";
import SharePost from "@/components/Blog/SharePost";
import SidebarNews from "@/components/Blog/SidebarNews";
import SidebarPhotos from "@/components/Blog/SidebarPhotos";
import SidebarVideos from "@/components/Blog/SidebarVideos";

type Props = {
  params: Promise<{ slug: string; itemSlug: string }>;
};

export const metadata: Metadata = {
  title: "Detail Informasi - RSJ Prof HB Saanin",
  description:
    "Detail informasi pelayanan dan publikasi terbaru RSJ Prof HB Saanin",
};

async function getDetailData(categorySlug: string, articleSlug: string) {
  // api: https://api-web.sumbarprov.go.id/api/{path menu}/detail/${slug}
  const res = await fetch(
    `https://api-web.sumbarprov.go.id/api/berita/detail/${articleSlug}`,
    {
      next: { revalidate: 3600 },
    },
  );
  if (!res.ok) return null;
  const result = await res.json();
  return result?.data || null;
}

const DetailPage = async ({ params }: Props) => {
  const { slug, itemSlug } = await params;
  const data = await getDetailData(slug, itemSlug);
  const baseUrl = "https://api-web.sumbarprov.go.id";

  if (!data) {
    return (
      <section className="pt-35 pb-20 lg:pt-45 lg:pb-25 xl:pt-50 xl:pb-30">
        <div className="max-w-c-1390 mx-auto px-4 md:px-8 2xl:px-0">
          <h1 className="text-2xl font-bold">Informasi tidak ditemukan</h1>
        </div>
      </section>
    );
  }

  const imageUrl = data.gambar ? `${baseUrl}${data.gambar}` : null;

  return (
    <>
      {/* <!-- Banner Title Section Start --> */}
      <section className="bg-zumthor relative z-10 overflow-hidden pt-35 pb-20 lg:pt-45 lg:pb-25 xl:pt-50 xl:pb-30 dark:bg-black">
        <div className="absolute top-0 left-0 -z-1 h-full w-full">
          <Image
            fill
            src="/images/hero/hero2.png"
            alt="Hero Background"
            className="object-cover object-[left_center] opacity-20 dark:opacity-10"
          />
        </div>

        <div className="max-w-c-1390 mx-auto px-4 md:px-8 2xl:px-0">
          <div className="flex flex-col items-center text-center">
            <h2 className="mb-5 text-4xl font-bold text-black md:text-5xl xl:text-6xl dark:text-white">
              {data.title}
            </h2>

            <ul className="flex flex-wrap items-center justify-center gap-4.5">
              {data.created_by && (
                <li className="flex items-center gap-2.5">
                  <span className="shadow-solid-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black dark:bg-black dark:text-white">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-current"
                    >
                      <path d="M9 9C10.6569 9 12 7.65685 12 6C12 4.34315 10.6569 3 9 3C7.34315 3 6 4.34315 6 6C6 7.65685 7.34315 9 9 9Z" />
                      <path d="M15 14.25C15 12.1789 12.3137 10.5 9 10.5C5.68629 10.5 3 12.1789 3 14.25V15H15V14.25Z" />
                    </svg>
                  </span>
                  <p>
                    <span className="text-black dark:text-white">Oleh: </span>
                    {data.created_by || "Admin"}
                  </p>
                </li>
              )}
              {data.created_at && (
                <li className="flex items-center gap-2.5">
                  <span className="shadow-solid-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black dark:bg-black dark:text-white">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-current"
                    >
                      <path d="M14.25 2.25H3.75C2.92157 2.25 2.25 2.92157 2.25 3.75V14.25C2.25 15.0784 2.92157 15.75 3.75 15.75H14.25C15.0784 15.75 15.75 15.0784 15.75 14.25V3.75C15.75 2.92157 15.0784 2.25 14.25 2.25ZM3.75 3.75H14.25V5.25H3.75V3.75ZM14.25 14.25H3.75V6.75H14.25V14.25Z" />
                    </svg>
                  </span>
                  <p>
                    <span className="text-black dark:text-white">
                      Tanggal:{" "}
                    </span>
                    {data.created_at}
                  </p>
                </li>
              )}
              {data.hits !== undefined && (
                <li className="flex items-center gap-2.5">
                  <span className="shadow-solid-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black dark:bg-black dark:text-white">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </span>
                  <p>
                    <span className="text-black dark:text-white">
                      Dilihat:{" "}
                    </span>
                    {data.hits || "0"}
                  </p>
                </li>
              )}
            </ul>
          </div>
        </div>
      </section>
      {/* <!-- Banner Title Section End --> */}

      <section className="pt-15 pb-20 lg:pt-20 lg:pb-25 xl:pt-25 xl:pb-30">
        <div className="max-w-c-1390 mx-auto px-4 md:px-8 2xl:px-0">
          <div className="flex flex-col gap-7.5 lg:flex-row xl:gap-12.5">
            <div className="lg:w-2/3">
              <div className="animate_top border-stroke shadow-solid-13 dark:border-strokedark dark:bg-blacksection rounded-md border bg-white p-7.5 md:p-10">
                {imageUrl && (
                  <div className="mb-10 w-full overflow-hidden">
                    <div className="relative aspect-97/60 w-full sm:aspect-97/44">
                      <Image
                        src={imageUrl}
                        alt={data.title}
                        fill
                        className="rounded-md object-cover object-center"
                        unoptimized
                      />
                    </div>
                  </div>
                )}

                <div
                  className="blog-details"
                  dangerouslySetInnerHTML={{ __html: data.isi || "" }}
                ></div>

                <div className="border-stroke dark:border-strokedark mt-10 flex items-center justify-between border-t pt-7.5">
                  <SharePost />
                </div>
              </div>
            </div>

            <div className="md:w-1/2 lg:w-[32%]">
              <SidebarNews />
              <SidebarPhotos />
              <SidebarVideos />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DetailPage;
