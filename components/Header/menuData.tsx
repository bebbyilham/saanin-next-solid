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
    title: "Publikasi",
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
        title: "Pengumuman",
        newTab: false,
        path: "/pengumuman",
      },
      {
        id: 35,
        title: "Jadwal Dokter",
        newTab: false,
        path: "/jadwal-dokter",
      },
      {
        id: 36,
        title: "Info Tempat Tidur",
        newTab: false,
        path: "/info-tempat-tidur",
      },
    ],
  },
  {
    id: 5,
    title: "PPID",
    newTab: false,
    path: "/ppid",
  },
  {
    id: 6,
    title: "Perpustakaan",
    newTab: false,
    submenu: [
      {
        id: 61,
        title: "Unduh Data",
        newTab: false,
        path: "/perpustakaan/download",
      },
      {
        id: 62,
        title: "Infografis",
        newTab: false,
        path: "/perpustakaan/infografis",
      },
      {
        id: 63,
        title: "Laporan Kinerja Instansi Pemerintah",
        newTab: false,
        path: "/perpustakaan/laporan-kinerja-instansi-pemerintah",
      },
      {
        id: 64,
        title: "Perjanjian Kinerja",
        newTab: false,
        path: "/perpustakaan/perjanjian-kinerja",
      },
      {
        id: 65,
        title: "Rencana Kerja",
        newTab: false,
        path: "/perpustakaan/rencana-kerja",
      },
      {
        id: 66,
        title: "Rencana Kerja Tahunan",
        newTab: false,
        path: "/perpustakaan/rencana-kinerja-tahunan",
      },
      {
        id: 67,
        title: "Rencana Strategis",
        newTab: false,
        path: "/perpustakaan/rencana-strategis",
      },
      {
        id: 68,
        title: "SOP",
        newTab: false,
        path: "/perpustakaan/sop",
      },
      {
        id: 69,
        title: "Indikator Kinerja Individu",
        newTab: false,
        path: "/perpustakaan/indikator-kinerja-individu",
      },
      {
        id: 70,
        title: "Renaksi dan Realisasi Renaksi",
        newTab: false,
        path: "/perpustakaan/renaksi-dan-realisasi-renaksi",
      },
      {
        id: 71,
        title: "SKP",
        newTab: false,
        path: "/perpustakaan/skp",
      },
      {
        id: 72,
        title: "IKU",
        newTab: false,
        path: "/perpustakaan/iku",
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
