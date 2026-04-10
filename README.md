# Website Resmi Rumah Sakit Jiwa Prof. HB. Saanin Padang

Website ini merupakan platform informasi digital modern untuk Rumah Sakit Jiwa (RSJ) Prof. HB. Saanin Padang. Dibuat dengan teknologi web terkini untuk memberikan layanan informasi kesehatan jiwa, keterbukaan informasi publik, dan aksesibilitas maksimal bagi seluruh lapisan masyarakat.

## Deskripsi Aplikasi

Platform ini dirancang untuk menjadi pusat kanal informasi bagi pasien, keluarga, dan masyarakat umum. Selain menampilkan profil rumah sakit dan layanan kesehatan, aplikasi ini mengintegrasikan berbagai API data pemerintah untuk menyajikan informasi yang akurat dan real-time, mulai dari berita daerah hingga statistik pelayanan publik.

## Fitur Utama

Berikut adalah fitur-fitur unggulan yang diimplementasikan dalam aplikasi ini:

### 1. Integrasi Berita & Pengumuman Dinamis
Menyajikan berita terbaru dan pengumuman resmi yang ditarik langsung dari **API SumbarProv**. Fitur ini memastikan informasi yang disampaikan selalu mutakhir tanpa perlu pembaruan manual di tingkat aplikasi.

### 2. Portal Keterbukaan Informasi (PPID)
Sistem manajemen dokumen yang komprehensif untuk Pejabat Pengelola Informasi dan Dokumentasi (PPID). Dilengkapi dengan:
- Pencarian dokumen cepat.
- Kategorisasi dokumen yang dinamis.
- Slicing data dengan paginasi client-side untuk performa optimal.

### 3. Panel Aksesibilitas (Ramah Disabilitas)
Fitur khusus untuk mendukung inklusivitas pengguna, memungkinkan penyesuaian tampilan seperti:
- Pengaturan ukuran teks (Zoom In/Out).
- Mode kontras tinggi (High Contrast).
- Alat bantu navigasi untuk pembaca layar (Screen Reader Helpers).

### 4. Dashboard Statistik Real-time
Visualisasi data statistik yang terhubung dengan **API SEPAKAT**, menampilkan:
- **Indeks Kepuasan Masyarakat (IKM)**: Tren kepuasan layanan secara periodik.
- **Realisasi Anggaran**: Transparansi penggunaan dana rumah sakit.

### 5. Daftar & Jadwal Dokter Interaktif
Katalog lengkap tenaga medis yang memudahkan pasien dalam:
- Mencari dokter berdasarkan nama atau spesialisasi.
- Melihat jadwal praktik mingguan melalui modal interaktif.

### 6. Galeri Multimedia Terotomatisasi
Integrasi galeri foto dan video dari kanal resmi yang ditampilkan dalam bentuk slider responsif menggunakan modern library **Swiper**.

### 7. Integrasi Media Sosial & Instagram Feed
Menampilkan feed Instagram resmi RSJ Saanin secara otomatis dengan sistem pembaruan token sisi server (Server-side Access Token Refresh) untuk konektivitas jangka panjang.

### 8. Performa dan Estetika Modern
- **Teknologi**: Dibangun menggunakan Next.js (React) dengan optimasi performa tinggi.
- **Desain**: Antarmuka premium dengan animasi halus menggunakan Framer Motion.
- **Responsivitas**: Optimal di perangkat Mobile, Tablet, maupun Desktop dengan Tailwind CSS 4.

---

## Teknologi yang Digunakan

- **Framework**: [Next.js](https://nextjs.org/) (React 19)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animasi**: [Framer Motion](https://www.framer.com/motion/)
- **Statistik & Data**: Axios & Fetch API Core
- **Slider/Carousel**: [Swiper](https://swiperjs.com/)
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/)

## Penggunaan Lokal

1. Instal dependensi:
   ```bash
   npm install --legacy-peer-deps
   ```

2. Jalankan server pengembangan:
   ```bash
   npm run dev
   ```

3. Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

---
© 2026 RSJ Prof. HB. Saanin Padang. All Rights Reserved.
