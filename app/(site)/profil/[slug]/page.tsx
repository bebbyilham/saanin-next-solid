import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export const metadata: Metadata = {
  title: "Profil - RSJ Prof HB Saanin",
  description: "Profil RSJ Prof HB Saanin",
};

async function getData(slug: string) {
  const res = await fetch(`https://api-web.sumbarprov.go.id/api/pages/${slug}/3107`, {
    cache: "no-store",
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
      <section className="pb-20 pt-35 lg:pb-25 lg:pt-40 xl:pb-30 xl:pt-45">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div 
            className="animate_top rounded-2xl border border-blue-200/30 bg-blue-500/5 p-10 text-center shadow-lg shadow-blue-500/3 dark:bg-blue-950/20 dark:border-blue-800/25 max-w-md mx-auto"
            style={{
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)"
            }}
          >
            <h2 className="text-2xl font-bold text-blue-950 dark:text-blue-100 mb-2">Data Tidak Ditemukan</h2>
            <p className="text-blue-600/80 dark:text-blue-400/80 text-sm font-semibold">Halaman yang Anda cari tidak tersedia atau sedang diperbarui.</p>
          </div>
        </div>
      </section>
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://api-web.sumbarprov.go.id";
  const coverImage = data.gambar ? `${baseUrl}${data.gambar}` : data.thumbnail;

  return (
    <>
      <section className="pb-20 pt-35 lg:pb-25 lg:pt-40 xl:pb-30 xl:pt-45">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex flex-col gap-7.5 lg:flex-row xl:gap-12.5">
            <div className="lg:w-2/3 mx-auto">
              <div 
                className="animate_top rounded-2xl border border-blue-200/30 bg-blue-500/5 dark:bg-blue-950/20 dark:border-blue-800/25 p-6 md:p-10 shadow-lg shadow-blue-500/3"
                style={{
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)"
                }}
              >
                {coverImage && (
                  <div className="mb-8 w-full overflow-hidden rounded-xl border border-blue-200/20 dark:border-blue-800/20 shadow-md shadow-blue-500/3 bg-blue-500/5 dark:bg-blue-950/30 p-2 flex justify-center items-center">
                    <img
                      src={coverImage}
                      alt={data.title || "Profile image"}
                      className="w-full h-auto max-h-[650px] object-contain rounded-lg"
                      loading="eager"
                    />
                  </div>
                )}

                <h2 className="mb-6 mt-4 text-3xl font-extrabold text-blue-950 dark:text-blue-100 xl:text-4xl tracking-tight border-b border-blue-200/20 dark:border-blue-800/20 pb-4">
                  {data.title}
                </h2>

                <div 
                  className="blog-details prose prose-blue dark:prose-invert prose-headings:text-blue-950 dark:prose-headings:text-blue-200 prose-a:text-blue-600 dark:prose-a:text-blue-400 max-w-none leading-relaxed font-medium text-blue-950 dark:text-blue-100/90"
                  dangerouslySetInnerHTML={{ __html: data.isi || data.content }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
