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
    ],
  },
  {
    id: 3,
    title: "Layanan",
    newTab: false,
    path: "/kategori/layanan",
    submenu: [
      {
        id: 31,
        title: "Standar Pelayanan",
        newTab: false,
        path: "/kategori/standar-pelayanan",
      },
      {
        id: 32,
        title: "Maklumat Pelayanan",
        newTab: false,
        path: "/kategori/maklumat-pelayanan",
      },
      {
        id: 33,
        title: "Alur Pelayanan",
        newTab: false,
        path: "/kategori/alur-pelayanan",
      },
      {
        id: 34,
        title: "Rawat Jalan",
        newTab: false,
        path: "/kategori/rawat-jalan",
      },
      {
        id: 35,
        title: "Rawat Inap",
        newTab: false,
        path: "/kategori/rawat-inap",
      },
      {
        id: 36,
        title: "NAPZA",
        newTab: false,
        path: "/kategori/napza",
      },
      {
        id: 37,
        title: "Jadwal Dokter",
        newTab: false,
        path: "/jadwal-dokter",
      },
      {
        id: 38,
        title: "Info Tempat Tidur",
        newTab: false,
        path: "/info-tempat-tidur",
      },
    ],
  },
  {
    id: 4,
    title: "Publikasi",
    newTab: false,
    submenu: [
      {
        id: 41,
        title: "Berita Utama",
        newTab: false,
        path: "/kategori/berita-utama",
      },
      {
        id: 42,
        title: "Galeri Foto",
        newTab: false,
        path: "/galeri/foto",
      },
      {
        id: 43,
        title: "Galeri Video",
        newTab: false,
        path: "/galeri/video",
      },
      {
        id: 44,
        title: "Pengumuman",
        newTab: false,
        path: "/pengumuman",
      },
    ],
  },
  {
    id: 5,
    title: "PPID",
    newTab: false,
    submenu: [
      {
        id: 51,
        title: "Inovasi",
        newTab: false,
        path: "/kategori/inovasi",
      },
      {
        id: 52,
        title: "Profil PPID",
        newTab: false,
        path: "/kategori/profil-ppid",
      },
      {
        id: 53,
        title: "Visi & Misi PPID",
        newTab: false,
        path: "/kategori/visi-misi-ppid",
      },
      {
        id: 54,
        title: "Tugas & Fungsi PPID",
        newTab: false,
        path: "/kategori/tugas-fungsi-ppid",
      },
      {
        id: 55,
        title: "Maklumat",
        newTab: false,
        path: "/kategori/maklumat-ppid",
      },
      {
        id: 56,
        title: "Tata Cara",
        newTab: false,
        path: "/kategori/tata-cara",
      },
      {
        id: 57,
        title: "Informasi Publik",
        newTab: false,
        path: "/ppid",
      },
      {
        id: 58,
        title: "Regulasi",
        newTab: false,
        path: "/kategori/regulasi",
      },
    ],
  },
  {
    id: 6,
    title: "ZI",
    newTab: false,
    submenu: [
      {
        id: 61,
        title: "Galeri Penghargaan",
        newTab: false,
        path: "/kategori/galeri-penghargaan",
      },
    ],
  },
  {
    id: 7,
    title: "Pengaduan",
    newTab: false,
    submenu: [
      {
        id: 71,
        title: "Whistle Blowing System",
        newTab: true,
        path: "/whistle-blowing-system",
      },
      {
        id: 72,
        title: "Kontak",
        newTab: false,
        path: "/contact",
      },
      {
        id: 73,
        title: "SPAN LAPOR",
        newTab: true,
        path: "https://lapor.go.id/",
      },
    ],
  },
];

export default menuData;
