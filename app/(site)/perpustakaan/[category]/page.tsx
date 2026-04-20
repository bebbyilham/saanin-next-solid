import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/Common/SectionHeader";
import Sidebar from "@/components/Perpustakaan/Sidebar";
import CategoryList from "@/components/Perpustakaan/CategoryList";

type Props = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const metadata: Metadata = {
  title: "Perpustakaan - RSJ Prof HB Saanin",
  description: "Daftar publikasi perpustakaan",
};

async function getCategoryData(category: string, page: string = "1") {
  const res = await fetch(`https://api-web.sumbarprov.go.id/api/category/${category}/3107?page=${page}`, {
    cache: 'no-store', // Disable cache to show latest data immediately
  });
  if (!res.ok) return null;
  return res.json();
}

const formatTitle = (category: string) => {
  return category
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const CategoryPage = async ({ params, searchParams }: Props) => {
  const { category } = await params;
  const resolvedSearchParams = await searchParams;
  const page = typeof resolvedSearchParams.page === "string" ? resolvedSearchParams.page : "1";
  
  const result = await getCategoryData(category, page);
  const data = result?.data || [];
  const pageMeta = result?.page || {
    totalItems: 0,
    currentPage: 1,
    pageSize: 9,
    totalPages: 1,
    nextPage: null,
    prevPage: null
  };
  const baseUrl = "https://api-web.sumbarprov.go.id";
  const titleText = formatTitle(category);

  return (
    <>
      <section className="pb-20 pt-35 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50 bg-zumthor dark:bg-black">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          {/* Breadcrumb style text could go here */}
          <p className="text-sm text-gray-500 mb-6">Beranda &gt; Perpustakaan &gt; <span className="font-semibold text-primary">{titleText}</span></p>

          <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-10">
            {/* Sidebar Left */}
            <Sidebar />

            {/* Main Content Right */}
            <div className="flex-1">
               <CategoryList 
                  data={data} 
                  category={category} 
                  titleText={titleText} 
                  baseUrl={baseUrl} 
                  pageMeta={pageMeta}
               />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoryPage;
