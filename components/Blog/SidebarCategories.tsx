import React from "react";
import Link from "next/link";

async function getCategories() {
  const res = await fetch(`https://api-web.sumbarprov.go.id/api/category/3107`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return [];
  const result = await res.json();
  return result?.data || [];
}

const SidebarCategories = async () => {
  const categories = await getCategories();

  return (
    <div className="animate_top mb-10 rounded-md border border-stroke bg-white p-9 shadow-solid-13 dark:border-strokedark dark:bg-blacksection">
      <h4 className="mb-7.5 text-2xl font-semibold text-black dark:text-white">
        Kategori
      </h4>

      <ul>
        {categories.length > 0 ? (
          categories.map((cat: any, key: number) => (
            <li key={key} className="mb-3 transition-all duration-300 last:mb-0 hover:text-primary">
              <Link href={`/kategori/${cat.slug}`}>
                {cat.category}
              </Link>
            </li>
          ))
        ) : (
          <p className="text-sm">Tidak ada kategori tersedia</p>
        )}
      </ul>
    </div>
  );
};

export default SidebarCategories;
