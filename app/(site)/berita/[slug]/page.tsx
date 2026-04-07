import { Metadata } from "next";
import Image from "next/image";
import SharePost from "@/components/Blog/SharePost";
import RelatedPost from "@/components/Blog/RelatedPost";
import SidebarCategories from "@/components/Blog/SidebarCategories";
import NewsNavigation from "@/components/Blog/NewsNavigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export const metadata: Metadata = {
  title: "Detail Berita - RSJ HBSAANIN",
  description: "Informasi terbaru dari RSJ HBSAANIN",
};

async function getNewsDetail(slug: string) {
  const res = await fetch(`https://api-web.sumbarprov.go.id/api/berita/detail/${slug}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return null;
  const result = await res.json();
  return result?.data || null;
}

const NewsDetailPage = async ({ params }: Props) => {
  const { slug } = await params;
  const data = await getNewsDetail(slug);
  const baseUrl = "https://api-web.sumbarprov.go.id";

  if (!data) {
    return (
      <section className="pb-20 pt-35 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <h1 className="text-2xl font-bold">Berita tidak ditemukan</h1>
        </div>
      </section>
    );
  }

  const imageUrl = data.gambar ? `${baseUrl}${data.gambar}` : null;

  return (
    <>
      {/* <!-- Hero / Title Banner Section Start --> */}
      <section className="relative z-10 overflow-hidden bg-zumthor pb-20 pt-35 dark:bg-black lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
        <div className="absolute left-0 top-0 -z-1 h-full w-full">
          <Image
            fill
            src="/images/shape/shape-dotted-light.svg"
            alt="Dotted"
            className="dark:hidden opacity-30 object-cover"
          />
          <Image
            fill
            src="/images/shape/shape-dotted-dark.svg"
            alt="Dotted"
            className="hidden dark:block opacity-10 object-cover"
          />
        </div>

        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex flex-col items-center text-center">
            <h2 className="mb-5 text-4xl font-bold text-black dark:text-white md:text-5xl xl:text-6xl">
              {data.title}
            </h2>

            <ul className="flex flex-wrap items-center justify-center gap-4.5">
              <li className="flex items-center gap-2.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-solid-10 dark:bg-black dark:text-white">
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
                  <span className="text-black dark:text-white">By: </span>
                  {data.created_by || "Admin"}
                </p>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-solid-10 dark:bg-black dark:text-white">
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
                  <span className="text-black dark:text-white">Date: </span>
                  {data.created_at}
                </p>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-solid-10 dark:bg-black dark:text-white">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-current"
                  >
                    <path d="M13.5 4.5H2.5C1.94772 4.5 1.5 4.94772 1.5 5.5V12.5C1.5 13.0523 1.94772 13.5 2.5 13.5H13.5C14.0523 13.5 14.5 13.0523 14.5 12.5V5.5C14.5 4.94772 14.0523 4.5 13.5 4.5Z" />
                    <path d="M10.5 2.5H5.5C4.94772 2.5 4.5 2.94772 4.5 3.5V4.5H11.5V3.5C11.5 2.94772 11.0523 2.5 10.5 2.5Z" />
                  </svg>
                </span>
                <p>
                  <span className="text-black dark:text-white">Category: </span>
                  {data.category}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>
      {/* <!-- Hero / Title Banner Section End --> */}

      <section className="pb-20 pt-15 lg:pb-25 lg:pt-20 xl:pb-30 xl:pt-25">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex flex-col gap-7.5 lg:flex-row xl:gap-12.5">
            <div className="lg:w-2/3">
              <div className="animate_top rounded-md border border-stroke bg-white p-7.5 shadow-solid-13 dark:border-strokedark dark:bg-blacksection md:p-10">
                <div className="mb-10 w-full overflow-hidden ">
                  <div className="relative aspect-97/60 w-full sm:aspect-97/44">
                    {imageUrl && (
                      <Image
                        src={imageUrl}
                        alt={data.title}
                        fill
                        className="rounded-md object-cover object-center"
                        unoptimized
                      />
                    )}
                  </div>
                </div>

                <div className="blog-details" dangerouslySetInnerHTML={{ __html: data.isi || "" }}>
                </div>

                <NewsNavigation currentSlug={slug} />

                <SharePost />
              </div>
            </div>

            <div className="md:w-1/2 lg:w-[32%]">
              <div className="animate_top mb-10 rounded-md border border-stroke bg-white p-3.5 shadow-solid-13 dark:border-strokedark dark:bg-blacksection">
                <form action="#">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Cari berita..."
                      className="w-full rounded-lg border border-stroke px-6 py-4 shadow-solid-12 focus:border-primary focus:outline-hidden dark:border-strokedark dark:bg-black dark:shadow-none dark:focus:border-primary"
                    />
                    <button className="absolute right-0 top-0 p-5" aria-label="search-icon">
                      <svg
                        className="fill-black transition-all duration-300 hover:fill-primary dark:fill-white dark:hover:fill-primary"
                        width="21"
                        height="21"
                        viewBox="0 0 21 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M16.031 14.617L20.314 18.899L18.899 20.314L14.617 16.031C13.0237 17.3082 11.042 18.0029 9 18C4.032 18 0 13.968 0 9C0 4.032 4.032 0 9 0C13.968 0 18 4.032 18 9C18.0029 11.042 17.3082 13.0237 16.031 14.617ZM14.025 13.875C15.2941 12.5699 16.0029 10.8204 16 9C16 5.132 12.867 2 9 2C5.132 2 2 5.132 2 9C2 12.867 5.132 16 9 16C10.8204 16.0029 12.5699 15.2941 13.875 14.025L14.025 13.875Z" />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>

              <SidebarCategories />
              <RelatedPost />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsDetailPage;
