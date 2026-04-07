# Integrasi API RSJ HBSAANIN

Rencana implementasi integrasi API RSJ HBSAANIN ke dalam boilerplate Next.js Solid ini mencakup pembaruan menu navigasi (Navbar) dan pembuatan *dynamic routes* untuk memfasilitasi pengambilan data (fetching data) langsung dari API yang diberikan. 

## User Review Required

> [!IMPORTANT]
> Mohon tinjau struktur menu navigasi dan rute di bawah ini agar sesuai dengan kebutuhan yang diinginkan. Apakah struktur menu ini sudah sesuai, atau ada penambahan/pengurangan?
> Khusus untuk halaman **Bidang**, **Media**, dan **Dokumen Lainnya** (seperti Download, Infografis, SOP, dsb), saya mengelompokkannya di dalam navigasi **Publikasi & Layanan**. Mohon konfirmasi jika disetujui.

## Proposed Changes

### 1. Struktur Navigasi Utama (Navbar)
File yang akan dimodifikasi: 
#### [MODIFY] `components/Header/menuData.tsx`
*   **Beranda** (`/`)
*   **Profil** (Submenu)
    *   Visi Misi (`/profil/visi-misi`)
    *   Tugas dan Fungsi (`/profil/tugas-dan-fungsi`)
    *   Struktur Organisasi (`/profil/struktur-organisasi`)
    *   LHKPN (`/profil/lhkpn`)
    *   Sejarah Singkat (`/profil/sejarah-singkat`)
    *   Profil Pejabat (`/profil/profil-pejabat`)
*   **Berita Publikasi** (Submenu)
    *   Berita Utama (`/kategori/berita-utama`)
    *   Galeri Foto (`/galeri/foto`)
    *   Galeri Video (`/galeri/video`)
*   **Pengumuman** (`/pengumuman`)
*   **PPID** (`/ppid`)
*   **Publikasi & Dokumen** (Submenu untuk API Lainnya)
    *   Download (`/kategori/download`)
    *   Infografis (`/kategori/infografis`)
    *   Laporan Kinerja (`/kategori/laporan-kinerja-instansi-pemerintah`)
    *   dll (dari list Endpoint Kategori)
*   **Kontak** (`/contact`)

---

### 2. Pembuatan Dynamic Routes untuk Menu Profil (Static Pages)
Untuk halaman Profil yang menggunakan endpoint `/api/pages/[slug]/3107`:
#### [NEW] `app/(site)/profil/[slug]/page.tsx`
Menampilkan halaman dinamis bedasarkan `slug` (seperti `visi-misi`, `lhkpn`). Data diambil di server-side.

---

### 3. Pembuatan Dynamic Routes untuk Kategori (Berita, Dokumen, dll)
Untuk halaman berita dan dokumen lainnya yang menggunakan endpoint `/api/category/[slug]/3107`:
#### [NEW] `app/(site)/kategori/[slug]/page.tsx`
Akan menampilkan index atau daftar data (berita/unduhan) dari masing-masing kategori di atas.

---

### 4. Pembuatan Halaman Pengumuman & Galeri
#### [NEW] `app/(site)/pengumuman/page.tsx`
Fetch API `/api/pengumuman/3107`
#### [NEW] `app/(site)/galeri/foto/page.tsx`
Fetch API `/api/galery-foto/3107`
#### [NEW] `app/(site)/galeri/video/page.tsx`
Fetch API `/api/galery-video/3107`

---

### 5. Pembuatan Halaman PPID
#### [NEW] `app/(site)/ppid/page.tsx`
Fetch data institusi & klaster dasar dari domain `ppid.sumbarprov.go.id`. Endpoint dan parameter akan disesuaikan dengan instruksi `id_instansi=90` dsb.

## Open Questions

> [!WARNING]
> 1. Apakah ada desain antarmuka (UI) khusus yang diinginkan untuk detail berita, halaman statis, dan list pengumuman? Jika tidak ada, saya akan menggunakan layout bawaan dari *Solid boilerplate* yang telah tersedia.
> 2. Apakah *base URL* API tersebut (https://api-web.sumbarprov.go.id/ dan ppid) sudah bisa diakses secara publik dan tidak memerlukan token autentikasi *(Bearer Token)*? 
> 3. Apakah menu **Kontak** tetap menggunakan halaman kontak bawaan dari *template*, atau ada API khusus untuk Kontak/Pesan?

## Verification Plan
1. Menyimpan semua perubahan dan menjalankan `npm run dev`.
2. Melakukan navigasi melalui Navbar yang baru ke setiap rute (Profil, Berita, Pengumuman, PPID).
3. Memastikan Next.js tidak mengalami error saat *fetching* dari API Provinsi/PPID menggunakan komponen Server (RSC).
4. Menambahkan komponen loading state apabila API cukup lambat untuk di-*resolve*.
