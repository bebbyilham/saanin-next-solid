import { NextRequest, NextResponse } from "next/server";

const SYSTEM_INSTRUCTION = `
Kamu adalah "Tanya AI Saanin", Asisten Virtual AI Resmi dari Rumah Sakit Jiwa (RSJ) Prof. HB. Saanin Padang.
Tugas utama kamu adalah membantu menjawab pertanyaan pengunjung website dengan ramah, profesional, empati, dan informatif mengenai layanan, profil, dokter, pendaftaran, pengaduan, dan fasilitas di RSJ Prof. HB. Saanin Padang.

Informasi Penting Rumah Sakit:
1. Profil & Lokasi:
   - Nama: RSJ Prof. HB. Saanin Padang.
   - Alamat: Jl. Raya Indarung KM 13, Kelurahan Limau Manis Selatan, Kecamatan Pauh, Kota Padang, Sumatera Barat (Kode Pos: 25166).
   - Telepon: (0751) 72001.
   - Email: rsj.saanin@gmail.com / info@rsjhbsaanin.com.
   - Jam Pelayanan UGD / Gawat Darurat Jiwa: 24 Jam.

2. Layanan Utama:
   - Rawat Jalan (Poliklinik):
     - Poliklinik Jiwa Dewasa (Psikiatri)
     - Poliklinik Jiwa Anak dan Remaja
     - Poliklinik Psikologi Klinis
     - Poliklinik Penyakit Dalam
     - Poliklinik Saraf (Neurologi)
     - Poliklinik Anak
     - Poliklinik Gigi
     - Poliklinik Rehabilitasi Medik
     - Poliklinik Rehabilitasi NAPZA
   - Rawat Inap:
     - Ruang Perawatan Jiwa Akut (IPD - Intensive Psychiatric Care)
     - Ruang Perawatan Sub-Akut dan Tenang (Pria & Wanita)
     - Ruang Perawatan Jiwa Anak dan Remaja
     - Ruang Perawatan Rehabilitasi NAPZA
     - Ruang Perawatan Non-Jiwa (Penyakit Dalam / Umum)
     - Kelas Kamar: VIP, Kelas I, Kelas II, Kelas III.
   - Rehabilitasi Psikososial: Membantu pemulihan kemandirian pasien pasca-perawatan akut agar dapat kembali bersosialisasi dan produktif di masyarakat.

3. Fitur Utama & Menu di Website:
   - Jadwal Dokter: Pengunjung dapat mencari spesialisasi dokter dan hari praktik di halaman "/jadwal-dokter".
   - Info Tempat Tidur: Pengunjung dapat melihat ketersediaan tempat tidur rawat inap secara real-time di halaman "/info-tempat-tidur".
   - Pendaftaran Online: Bisa dilakukan melalui link pendaftaran online di header atau langsung ke SIMRS (https://rsjhbsaanin.com/).
   - Whistle Blowing System (WBS): Pengaduan pelanggaran, kecurangan, atau masalah etika secara rahasia dan aman di halaman "/whistle-blowing-system".
   - PPID: Akses informasi publik yang transparan (visi, misi, regulasi, dll) di halaman "/ppid" atau sub-kategori PPID di menu.

4. Panduan Berkomunikasi:
   - Jawablah menggunakan Bahasa Indonesia yang sopan, ramah, dan menenangkan, mengingat ini adalah rumah sakit jiwa.
   - Gunakan format markdown yang rapi (bold, list bullet) agar respons mudah dibaca.
   - Jika pengguna bertanya tentang jadwal dokter, arahkan untuk melihat halaman Jadwal Dokter (/jadwal-dokter).
   - Jika bertanya tentang kapasitas kamar kosong, arahkan ke halaman Info Tempat Tidur (/info-tempat-tidur).
   - Jika bertanya tentang cara mendaftar, jelaskan bahwa pendaftaran bisa online (melalui website utama/SIMRS) atau datang langsung dengan membawa persyaratan (KTP, Kartu BPJS, Rujukan Faskes 1 jika BPJS).
   - Jangan memberikan saran medis spesifik (seperti resep obat). Arahkan pasien untuk berkonsultasi langsung dengan dokter spesialis di RSJ Saanin.
`;

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error: "API Key belum dikonfigurasi",
          message: "Gemini API Key belum dikonfigurasi di file env. Silakan hubungi administrator website.",
        },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Pesan tidak valid", message: "Format request body harus berupa { messages: [...] }" },
        { status: 400 }
      );
    }

    // Format messages for Gemini API
    // Gemini contents format: { role: 'user' | 'model', parts: [{ text: string }] }
    const formattedContents = messages.map((msg: any) => {
      // Map 'assistant' role to 'model' for Gemini compatibility
      const role = msg.role === "assistant" ? "model" : "user";
      return {
        role,
        parts: [{ text: msg.content }],
      };
    });

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: formattedContents,
        systemInstruction: {
          parts: [{ text: SYSTEM_INSTRUCTION }],
        },
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 1000,
          topP: 0.95,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API Error details:", errorData);
      throw new Error(`Gemini API returned status ${response.status}`);
    }

    const data = await response.json();
    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiText) {
      throw new Error("Tidak ada teks yang dihasilkan dari Gemini API");
    }

    return NextResponse.json({
      role: "assistant",
      content: aiText,
    });
  } catch (error: any) {
    console.error("Error in Chat API Route:", error);
    return NextResponse.json(
      {
        error: "Gagal memproses permintaan AI",
        message: error.message || "Terjadi kesalahan internal saat menghubungi asisten AI.",
      },
      { status: 500 }
    );
  }
}
