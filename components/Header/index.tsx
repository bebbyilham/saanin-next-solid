"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu } from "@/types/menu";

import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";

const Header = () => {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [dropdownToggler, setDropdownToggler] = useState<number | null>(null);
  const [stickyMenu, setStickyMenu] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  const pathUrl = usePathname();
  const isWbsPage = pathUrl === "/whistle-blowing-system";

  const wbsMenuData: Menu[] = [
    {
      id: 101,
      title: "Beranda WBS",
      path: "#wbs-hero",
      newTab: false,
    },
    {
      id: 102,
      title: "Cara Kerja WBS",
      path: "#wbs-alur",
      newTab: false,
    },
    {
      id: 103,
      title: "FAQ WBS",
      path: "#wbs-faq",
      newTab: false,
    },
    {
      id: 104,
      title: "Lokasi WBS",
      path: "#wbs-lokasi",
      newTab: false,
    },
    {
      id: 105,
      title: "Portal Utama ↗",
      path: "/",
      newTab: false,
    },
  ];

  const currentMenu = isWbsPage ? wbsMenuData : menuData;

  // Sticky menu
  const handleStickyMenu = () => {
    if (window.scrollY >= 80) {
      setStickyMenu(true);
    } else {
      setStickyMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);
    return () => {
      window.removeEventListener("scroll", handleStickyMenu);
    };
  }, []);

  // Track active WBS section on scroll
  useEffect(() => {
    if (!isWbsPage) return;

    const handleScrollActiveSection = () => {
      const wbsSections = ["wbs-hero", "wbs-alur", "wbs-faq", "wbs-lokasi"];
      const scrollPosition = window.scrollY + 140; // Offset to match where the section comes into view

      let active = "";
      for (const sectionId of wbsSections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            active = `#${sectionId}`;
            break;
          }
        }
      }

      // If we scroll to the bottom of the page
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 50
      ) {
        active = "#wbs-lokasi";
      }

      // If we're right at the top
      if (window.scrollY < 50) {
        active = "#wbs-hero";
      }

      if (active) {
        setActiveSection(active);
      }
    };

    window.addEventListener("scroll", handleScrollActiveSection);
    // Initial check
    handleScrollActiveSection();

    return () => {
      window.removeEventListener("scroll", handleScrollActiveSection);
    };
  }, [isWbsPage]);

  return (
    <header
      className={`max-w-c-1390 fixed left-1/2 z-99999 w-[95%] -translate-x-1/2 transition-all duration-300 ${
        navigationOpen
          ? "top-4 rounded-[2rem] border border-blue-300/60 bg-blue-100/95 px-6 py-4 shadow-2xl dark:border-blue-800/60 dark:bg-blue-950/95"
          : stickyMenu
          ? "top-2 rounded-full border border-blue-300/40 bg-blue-500/20 px-6 py-3 shadow-xl shadow-blue-500/12 md:px-8 dark:border-blue-700/40 dark:bg-blue-950/55"
          : "top-4 rounded-full border border-blue-300/30 bg-blue-500/15 px-6 py-4 shadow-lg shadow-blue-500/8 md:px-8 dark:border-blue-800/30 dark:bg-blue-950/40"
      }`}
      style={{
        backdropFilter: navigationOpen ? "blur(40px)" : "blur(24px)",
        WebkitBackdropFilter: navigationOpen ? "blur(40px)" : "blur(24px)",
      }}
    >
      <div className="relative w-full items-center justify-between xl:flex">
        <div className="flex w-full items-center justify-between xl:w-1/4">
          <a href="/">
            <Image
              src="/images/logo/logosbhbss.png"
              alt="logo"
              width={219.03}
              height={60}
              className="hidden w-full max-w-[180px] md:max-w-[219px] dark:block"
            />
            <Image
              src="/images/logo/logosbhbss.png"
              alt="logo"
              width={219.03}
              height={60}
              className="w-full max-w-[180px] md:max-w-[219px] dark:hidden"
            />
          </a>

          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-label="hamburger Toggler"
            className="block xl:hidden"
            onClick={() => setNavigationOpen(!navigationOpen)}
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="absolute right-0 block h-full w-full">
                <span
                  className={`relative top-0 left-0 my-1 block h-0.5 rounded-sm bg-black delay-0 duration-200 ease-in-out dark:bg-white ${
                    !navigationOpen ? "w-full! delay-300" : "w-0"
                  }`}
                ></span>
                <span
                  className={`relative top-0 left-0 my-1 block h-0.5 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !navigationOpen ? "w-full! delay-400" : "w-0"
                  }`}
                ></span>
                <span
                  className={`relative top-0 left-0 my-1 block h-0.5 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !navigationOpen ? "w-full! delay-500" : "w-0"
                  }`}
                ></span>
              </span>
              <span className="du-block absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute top-0 left-2.5 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !navigationOpen ? "h-0! delay-0" : "h-full"
                  }`}
                ></span>
                <span
                  className={`absolute top-2.5 left-0 block h-0.5 w-full rounded-sm bg-black delay-400 duration-200 ease-in-out dark:bg-white ${
                    !navigationOpen ? "h-0! delay-200" : "h-0.5"
                  }`}
                ></span>
              </span>
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}
        </div>

        {/* Nav Menu Start   */}
        <div
          className={`invisible h-0 w-full items-center justify-between xl:visible xl:flex xl:h-auto xl:w-full ${
            navigationOpen &&
            "navbar visible! mt-4 h-auto max-h-[400px] border-none bg-transparent p-4 xl:h-auto xl:border-none xl:bg-transparent xl:p-0 xl:shadow-none xl:dark:bg-transparent"
          }`}
        >
          <nav>
            <ul className="flex flex-col gap-5 xl:flex-row xl:items-center xl:gap-10">
              {currentMenu.map((menuItem, key) => (
                <li key={key} className={menuItem.submenu && "group relative"}>
                  {menuItem.submenu ? (
                    <>
                      <button
                        onClick={() =>
                          setDropdownToggler(
                            dropdownToggler === key ? null : key,
                          )
                        }
                        className="flex cursor-pointer items-center justify-between gap-3 font-medium text-blue-900 duration-300 hover:text-blue-600 dark:text-blue-200 dark:hover:text-blue-300"
                      >
                        {menuItem.title}
                        <span>
                          <svg
                            className="h-3 w-3 cursor-pointer fill-blue-900 duration-300 group-hover:fill-blue-600 dark:fill-blue-200 dark:group-hover:fill-blue-300"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                          </svg>
                        </span>
                      </button>

                      <ul
                        className={`dropdown ${
                          dropdownToggler === key ? "flex" : ""
                        }`}
                      >
                        {menuItem.submenu.map((item, key) => (
                          <li
                            key={key}
                            className="text-blue-900 duration-300 hover:text-blue-600 dark:text-blue-200 dark:hover:text-blue-300"
                          >
                            <Link href={item.path || "#"}>{item.title}</Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link
                      href={`${menuItem.path}`}
                      onClick={() => setNavigationOpen(false)}
                      className={`relative pb-1 font-semibold duration-300 transition-colors ${
                        (isWbsPage && activeSection === menuItem.path) ||
                        (!isWbsPage && !menuItem.path?.startsWith("#") && pathUrl === menuItem.path)
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-blue-900 hover:text-blue-600 dark:text-blue-200 dark:hover:text-blue-300"
                      }`}
                    >
                      {menuItem.title}
                      {((isWbsPage && activeSection === menuItem.path) ||
                        (!isWbsPage && !menuItem.path?.startsWith("#") && pathUrl === menuItem.path)) && (
                        <motion.span
                          layoutId="activeNavigationDot"
                          className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-blue-600 dark:bg-blue-400"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-7 flex items-center gap-6 xl:mt-0">
            <ThemeToggler />
            <Link
              href="https://rsjhbsaanin.com/"
              className="bg-primary text-regular hover:bg-primaryho flex items-center justify-center rounded-full px-7.5 py-2.5 text-white duration-300 ease-in-out"
            >
              Daftar Online
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

// w-full delay-300

export default Header;
