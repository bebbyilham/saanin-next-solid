import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Beranda",
    newTab: false,
    path: "/",
  },
  {
    id: 2,
    title: "Profil",
    newTab: false,
    submenu: [
      {
        id: 21,
        title: "Visi Misi",
        newTab: false,
        path: "/profil/visi-misi",
      },
      {
        id: 22,
        title: "Tugas dan Fungsi",
        newTab: false,
        path: "/profil/tugas-dan-fungsi",
      },
      {
        id: 23,
        title: "Struktur Organisasi",
        newTab: false,
        path: "/profil/struktur-organisasi",
      },
      {
        id: 24,
        title: "LHKPN",
        newTab: false,
        path: "/profil/lhkpn",
      },
      {
        id: 25,
        title: "Sejarah Singkat",
        newTab: false,
        path: "/profil/sejarah-singkat",
      },
      {
        id: 26,
        title: "Profil Pejabat",
        newTab: false,
        path: "/profil/profil-pejabat",
      },
    ],
  },
  {
    id: 3,
    title: "Berita Publikasi",
    newTab: false,
    submenu: [
      {
        id: 31,
        title: "Berita Utama",
        newTab: false,
        path: "/kategori/berita-utama",
      },
      {
        id: 32,
        title: "Galeri Foto",
        newTab: false,
        path: "/galeri/foto",
      },
      {
        id: 33,
        title: "Galeri Video",
        newTab: false,
        path: "/galeri/video",
      },
      {
        id: 34,
        title: "Jadwal Dokter",
        newTab: false,
        path: "/jadwal-dokter",
      },
    ],
  },
  {
    id: 4,
    title: "Pengumuman",
    newTab: false,
    path: "/pengumuman",
  },
  {
    id: 5,
    title: "PPID",
    newTab: false,
    path: "/ppid",
  },
  {
    id: 6,
    title: "Publikasi & Dokumen",
    newTab: false,
    submenu: [
      {
        id: 61,
        title: "Download",
        newTab: false,
        path: "/kategori/download",
      },
      {
        id: 62,
        title: "Infografis",
        newTab: false,
        path: "/kategori/infografis",
      },
      {
        id: 63,
        title: "Laporan Kinerja",
        newTab: false,
        path: "/kategori/laporan-kinerja-instansi-pemerintah",
      },
    ],
  },
  {
    id: 10,
    title: "Kontak",
    newTab: false,
    path: "/contact",
  },
];

export default menuData;
