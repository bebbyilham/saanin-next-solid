import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export interface InstagramMedia {
  id: string;
  caption?: string;
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  timestamp: string;
}

interface InstagramAPIResponse {
  data: InstagramMedia[];
}

// Path untuk menyimpan token yang sudah di-refresh agar persisten
const TOKEN_FILE_PATH = path.join(process.cwd(), ".instagram-token.json");

// Fungsi untuk membaca token dari file atau mengambil fallback dari .env.local
async function getStoredToken() {
  try {
    const fileContent = await fs.readFile(TOKEN_FILE_PATH, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    // Jika file belum ada, ambil dari .env.local
    return {
      accessToken: process.env.INSTAGRAM_ACCESS_TOKEN,
      lastUpdated: 0,
    };
  }
}

// Fungsi untuk menyimpan token ke file
async function saveToken(accessToken: string, lastUpdated: number) {
  try {
    await fs.writeFile(
      TOKEN_FILE_PATH,
      JSON.stringify({ accessToken, lastUpdated }, null, 2),
      "utf-8",
    );
  } catch (error) {
    console.error("Gagal menyimpan token Instagram ke file:", error);
  }
}

// Fungsi otomatis perpanjang token jika sudah berumur lebih dari 30 hari
async function refreshInstagramToken(currentToken: string) {
  try {
    const url = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${currentToken}`;
    const res = await fetch(url);
    const data = await res.json();

    if (res.ok && data.access_token) {
      // Simpan token baru dan reset waktu
      await saveToken(data.access_token, Date.now());
      console.log("Instagram Token berhasil di-refresh secara otomatis.");
      return data.access_token;
    } else {
      console.error("Gagal me-refresh token:", data);
      return currentToken; // Tetap gunakan token lama walau gagal agar tak langsung error
    }
  } catch (error) {
    console.error("Terjadi error saat me-refresh token:", error);
    return currentToken;
  }
}

export async function GET() {
  let { accessToken, lastUpdated } = await getStoredToken();
  const userId = process.env.INSTAGRAM_USER_ID;

  if (!accessToken || !userId) {
    return NextResponse.json(
      {
        error:
          "Instagram credentials belum di-setup. Pastikan INSTAGRAM_ACCESS_TOKEN dan INSTAGRAM_USER_ID sudah ada di .env.local",
      },
      { status: 500 },
    );
  }

  // Cek apakah token perlu diperbarui (Jika usianya > 30 hari / 2.592.000.000 ms)
  const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
  if (Date.now() - lastUpdated > THIRTY_DAYS_MS) {
    accessToken = await refreshInstagramToken(accessToken);
  } else if (lastUpdated === 0) {
    // Jika ini adalah pertama kalinya membaca dari .env, kita catat waktunya ke file sekarang
    await saveToken(accessToken, Date.now());
  }

  try {
    const fields =
      "id,caption,media_url,thumbnail_url,permalink,media_type,timestamp";
    const url = `https://graph.instagram.com/v22.0/${userId}/media?fields=${fields}&limit=6&access_token=${accessToken}`;

    const res = await fetch(url, {
      next: { revalidate: 3600 }, // Tetap gunakan caching dari Next.js untuk data gambar 1 jam
    });

    if (!res.ok) {
      const errorBody = await res.json();
      console.error("Instagram Fetch API error:", errorBody);
      return NextResponse.json(
        { error: "Gagal fetch dari Instagram API", details: errorBody },
        { status: res.status },
      );
    }

    const data: InstagramAPIResponse = await res.json();
    return NextResponse.json(data.data);
  } catch (error) {
    console.error("Instagram fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error saat mengambil feed Instagram" },
      { status: 500 },
    );
  }
}
