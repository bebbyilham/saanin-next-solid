# Panduan Deployment Production (Apache Reverse Proxy)

Dokumen ini menjelaskan cara men-deploy aplikasi Next.js ini di server production menggunakan Apache sebagai Reverse Proxy (melalui folder `htdocs`).

---

## Prasyarat
1. **Node.js** (versi >= 20) terinstal di server.
2. **Apache Web Server** dengan modul berikut diaktifkan:
   - `mod_rewrite`
   - `mod_proxy`
   - `mod_proxy_http`
   - `mod_headers`
3. **PM2** (Process Manager untuk Node.js) terinstal secara global untuk menjaga aplikasi tetap berjalan di latar belakang:
   ```bash
   npm install -g pm2
   ```

---

## Langkah 1: Persiapan File & Build Project
1. Masuk ke direktori project Next.js Anda di server:
   ```bash
   cd /path/to/saanin-nextjs-solid
   ```
2. Instal dependensi:
   ```bash
   npm install --production=false
   ```
3. Lakukan build aplikasi untuk production:
   ```bash
   npm run build
   ```
   *Perintah ini akan menghasilkan folder `.next` yang berisi aplikasi terkompilasi.*

---

## Langkah 2: Menjalankan Next.js Server menggunakan PM2
Untuk memastikan server Next.js berjalan di latar belakang secara terus-menerus dan otomatis menyala kembali jika server reboot, jalankan perintah berikut:

```bash
pm2 start npm --name "saanin-nextjs" -- start -- -p 3000
```

> [!TIP]
> - Port default yang digunakan adalah `3000`. Jika Anda ingin menggunakan port lain (misal `3001`), ganti `-p 3000` dengan `-p 3001` dan sesuaikan port pada `.htaccess`.
> - Jalankan `pm2 save` untuk menyimpan konfigurasi agar otomatis berjalan saat OS restart.

---

## Langkah 3: Konfigurasi Apache `htdocs`
Kami telah membuat folder `htdocs` yang berisi file `.htaccess`. 

1. Cari direktori `htdocs` (atau `public_html` pada cPanel / Linux Web Server) yang diarahkan oleh domain Anda di Apache.
2. Salin atau pindahkan file `.htaccess` yang ada di dalam folder `htdocs` project ini ke direktori `htdocs` server Apache Anda.

Isi dari `.htaccess` tersebut adalah:
```apache
RewriteEngine On

# 1. Izinkan Apache melayani file fisik jika ada di htdocs (misal robots.txt, sitemap.xml)
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]

# 2. Teruskan semua request lainnya ke server Next.js (port 3000)
RewriteRule ^(.*)$ http://127.0.0.1:3000/$1 [P,L]
```

---

## Perintah PM2 yang Berguna
- **Melihat status aplikasi:** `pm2 status`
- **Melihat log real-time:** `pm2 logs saanin-nextjs`
- **Restart aplikasi (setelah update kode):** `pm2 restart saanin-nextjs`
- **Stop aplikasi:** `pm2 stop saanin-nextjs`
