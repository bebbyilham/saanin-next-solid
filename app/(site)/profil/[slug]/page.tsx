import { Metadata } from "next";
import Image from "next/image";

type Props = {
  params: Promise<{ slug: string }>;
};

export const metadata: Metadata = {
  title: "Profil - RSJ HBSAANIN",
  description: "Profil RSJ HBSAANIN",
};

async function getData(slug: string) {
  const res = await fetch(`https://api-web.sumbarprov.go.id/api/pages/${slug}/3107`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return null;
  return res.json();
}

const ProfilePage = async ({ params }: Props) => {
  const { slug } = await params;
  const result = await getData(slug);
  const data = result?.data;

  if (!data) {
    return (
      <section className="pb-20 pt-35 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <h1 className="text-2xl font-bold">Data tidak ditemukan</h1>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="pb-20 pt-35 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex flex-col gap-7.5 lg:flex-row xl:gap-12.5">
            <div className="lg:w-2/3 mx-auto">
              <div className="animate_top rounded-md border border-stroke bg-white p-7.5 shadow-solid-13 dark:border-strokedark dark:bg-blacksection md:p-10">
                {data.thumbnail && (
                  <div className="mb-10 w-full overflow-hidden">
                    <div className="relative aspect-97/60 w-full sm:aspect-97/44">
                      <Image
                        src={data.thumbnail}
                        alt={data.title || "Profile image"}
                        fill
                        className="rounded-md object-cover object-center"
                        unoptimized
                      />
                    </div>
                  </div>
                )}

                <h2 className="mb-5 mt-11 text-3xl font-semibold text-black dark:text-white 2xl:text-sectiontitle2">
                  {data.title}
                </h2>

                <div className="blog-details" dangerouslySetInnerHTML={{ __html: data.content }}>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
