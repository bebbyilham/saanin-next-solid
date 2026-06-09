"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const SUGGESTIONS = [
  { text: "Bagaimana cara daftar online?", category: "Pendaftaran" },
  { text: "Cek jadwal dokter spesialis", category: "Dokter" },
  { text: "Lihat ketersediaan kamar rawat inap", category: "Kamar Inap" },
  { text: "Bagaimana cara mengadu di WBS?", category: "Pengaduan" },
  { text: "Lokasi dan kontak RSJ Saanin", category: "Kontak" },
  { text: "Apa saja layanan rehabilitasi di sini?", category: "Layanan" },
];

const parseMarkdown = (text: string) => {
  if (!text) return "";

  // Escape HTML to prevent XSS
  let html = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Format bold: **text** -> <strong>text</strong>
  html = html.replace(
    /\*\*(.*?)\*\*/g,
    "<strong class='font-bold text-blue-950 dark:text-blue-200'>$1</strong>",
  );

  // Format unordered lists
  const lines = html.split("\n");
  let inList = false;
  const processedLines = lines.map((line) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      const content = trimmed.substring(2);
      let listHtml = "";
      if (!inList) {
        inList = true;
        listHtml +=
          "<ul class='list-disc pl-5 my-2 space-y-1 text-sm md:text-base'>";
      }
      listHtml += `<li>${content}</li>`;
      return listHtml;
    } else {
      let extra = "";
      if (inList) {
        inList = false;
        extra = "</ul>";
      }
      return (
        extra +
        (trimmed
          ? `<p class='mb-2 last:mb-0 text-sm md:text-base leading-relaxed'>${trimmed}</p>`
          : "<div class='h-2.5'></div>")
      );
    }
  });

  let finalHtml = processedLines.join("");
  if (inList) {
    finalHtml += "</ul>";
  }

  // Auto-link configuration page slugs
  const linkReplacements = [
    {
      pattern: /\/jadwal-dokter/g,
      url: "/jadwal-dokter",
      label: "Jadwal Dokter",
    },
    {
      pattern: /\/info-tempat-tidur/g,
      url: "/info-tempat-tidur",
      label: "Info Tempat Tidur",
    },
    {
      pattern: /\/whistle-blowing-system/g,
      url: "/whistle-blowing-system",
      label: "Whistle Blowing System (WBS)",
    },
    { pattern: /\/ppid/g, url: "/ppid", label: "PPID" },
    { pattern: /\/contact/g, url: "/contact", label: "Kontak" },
  ];

  linkReplacements.forEach(({ pattern, url, label }) => {
    finalHtml = finalHtml.replace(
      pattern,
      `<a href='${url}' class='text-primary dark:text-blue-400 hover:underline font-bold inline-flex items-center gap-0.5'>${label} <span class='text-[10px]'>↗</span></a>`,
    );
  });

  return finalHtml;
};

export default function TanyaAIClient() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize and load chat history
  useEffect(() => {
    const savedMessages = localStorage.getItem("saanin_ai_chat_history");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      const initialGreeting: Message = {
        role: "assistant",
        content:
          "Halo! Saya **Tanya AI Saanin**, asisten virtual resmi RSJ Prof. HB. Saanin Padang. Ada yang bisa saya bantu hari ini? Anda bisa menanyakan info pendaftaran, jadwal dokter, info kamar rawat inap, atau pengaduan WBS.",
      };
      setMessages([initialGreeting]);
    }
  }, []);

  // Save history to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("saanin_ai_chat_history", JSON.stringify(messages));
    }
  }, [messages]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async (textToSend: string) => {
    const text = textToSend.trim();
    if (!text) return;

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: text },
    ];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: newMessages,
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal terhubung dengan asisten AI.");
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.content },
      ]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Maaf, sistem sedang mengalami kendala teknis dalam menghubungkan ke AI. Silakan coba beberapa saat lagi, atau buka halaman [Kontak](/contact) kami.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    if (
      window.confirm("Apakah Anda yakin ingin menghapus riwayat obrolan ini?")
    ) {
      const initialGreeting: Message = {
        role: "assistant",
        content:
          "Halo! Saya **Tanya AI Saanin**, asisten virtual resmi RSJ Prof. HB. Saanin Padang. Ada yang bisa saya bantu hari ini? Anda bisa menanyakan info pendaftaran, jadwal dokter, info kamar rawat inap, atau pengaduan WBS.",
      };
      setMessages([initialGreeting]);
      localStorage.removeItem("saanin_ai_chat_history");
    }
  };

  return (
    <section className="min-h-screen bg-gray-50/30 pt-32 pb-16 lg:pt-36 lg:pb-20 xl:pt-40 xl:pb-24 dark:bg-black/20">
      <div className="max-w-c-1390 mx-auto px-4 md:px-8 2xl:px-0">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Sidebar - Quick Info & Tips */}
          <div className="flex w-full flex-col gap-6 lg:w-1/3">
            <div
              className="animate_top dark:bg-blacksection shadow-solid-13 rounded-2xl border border-blue-200/30 bg-white p-6 md:p-8 dark:border-blue-800/25"
              style={{
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="text-3xl">🤖</span>
                <div>
                  <h3 className="text-xl font-bold text-blue-950 dark:text-blue-100">
                    Tanya AI Saanin
                  </h3>
                  <span className="mt-0.5 inline-flex items-center gap-1.5 text-xs font-semibold text-green-500">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
                    Asisten Virtual Online
                  </span>
                </div>
              </div>

              <p className="text-waterloo mb-6 text-sm leading-relaxed font-medium dark:text-gray-400">
                Selamat datang di layanan Tanya AI. Di sini Anda dapat melakukan
                tanya jawab instan seputar informasi rumah sakit, jadwal praktik
                dokter, atau ketersediaan tempat tidur.
              </p>

              <div className="border-t border-blue-100/20 pt-6 dark:border-blue-900/30">
                <h4 className="mb-3 text-sm font-bold tracking-wider text-blue-950 uppercase dark:text-blue-200">
                  Topik Pertanyaan Populer
                </h4>
                <div className="flex flex-col gap-2">
                  {SUGGESTIONS.map((sug, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(sug.text)}
                      className="group text-waterloo hover:text-primary border-stroke dark:border-strokedark hover:border-primary dark:hover:border-primary/40 hover:bg-primary/5 dark:hover:bg-primary/5 flex cursor-pointer items-start gap-2.5 rounded-xl border bg-gray-50/50 p-3 text-left text-xs font-semibold transition-colors duration-200 dark:bg-black/30 dark:text-gray-400 dark:hover:text-blue-300"
                    >
                      <span className="bg-primary/10 text-primary shrink-0 rounded-md px-2 py-0.5 text-[10px] uppercase dark:bg-blue-500/10 dark:text-blue-400">
                        {sug.category}
                      </span>
                      <span className="flex-1">{sug.text}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 border-t border-blue-100/20 pt-6 dark:border-blue-900/30">
                <Link
                  href="/"
                  className="border-stroke dark:border-strokedark dark:hover:bg-btndark flex items-center justify-center gap-2 rounded-full border px-6 py-2.5 text-sm font-semibold text-black transition-all hover:bg-gray-100 dark:text-white"
                >
                  Kembali ke Beranda
                </Link>
                <button
                  onClick={handleResetChat}
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-full border border-red-200 px-6 py-2.5 text-sm font-semibold text-red-500 transition-all hover:bg-red-500/5 dark:border-red-900/40"
                >
                  Hapus Riwayat Chat
                </button>
              </div>
            </div>
          </div>

          {/* Main Chat Interface */}
          <div className="w-full lg:w-2/3">
            <div
              className="animate_top dark:bg-blacksection shadow-solid-13 flex h-[70vh] min-h-[500px] flex-col overflow-hidden rounded-2xl border border-blue-200/30 bg-white lg:h-[75vh] dark:border-blue-800/25"
              style={{
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
            >
              {/* Chat Header */}
              <div className="from-primary flex shrink-0 items-center justify-between bg-gradient-to-r to-blue-600 px-6 py-4.5 text-white shadow-md">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      Ruang Percakapan Tanya AI
                    </h3>
                    <p className="text-xs font-medium text-blue-100">
                      Bertanya secara langsung dengan asisten cerdas kami
                    </p>
                  </div>
                </div>
              </div>

              {/* Chat Message Board */}
              <div className="flex-1 space-y-4 overflow-y-auto bg-gray-50/30 p-6 dark:bg-black/15">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`shadow-solid-12 max-w-[80%] rounded-2xl px-5 py-3.5 ${
                        msg.role === "user"
                          ? "bg-primary rounded-tr-none text-white"
                          : "dark:bg-btndark rounded-tl-none border border-blue-100/10 bg-white text-black dark:text-gray-200"
                      }`}
                    >
                      <div
                        className="chat-message-content prose dark:prose-invert max-w-none text-sm md:text-base"
                        dangerouslySetInnerHTML={{
                          __html: parseMarkdown(msg.content),
                        }}
                      />
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="dark:bg-btndark shadow-solid-12 max-w-[80%] rounded-2xl rounded-tl-none border border-blue-100/10 bg-white px-5 py-4">
                      <div className="flex items-center gap-2 py-1">
                        <span
                          className="bg-primary h-2.5 w-2.5 animate-bounce rounded-full"
                          style={{ animationDelay: "0ms" }}
                        ></span>
                        <span
                          className="bg-primary h-2.5 w-2.5 animate-bounce rounded-full"
                          style={{ animationDelay: "150ms" }}
                        ></span>
                        <span
                          className="bg-primary h-2.5 w-2.5 animate-bounce rounded-full"
                          style={{ animationDelay: "300ms" }}
                        ></span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Bar */}
              <div className="dark:bg-blacksection border-t border-blue-100/20 bg-white p-4 dark:border-blue-900/30">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend(input);
                  }}
                  className="flex items-center gap-3"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isLoading}
                    placeholder="Tulis pesan Anda di sini (misal: Persyaratan BPJS, poli jiwa, dll)..."
                    className="border-stroke dark:border-strokedark focus:border-primary dark:focus:border-primary flex-1 rounded-xl border bg-gray-50 px-5 py-3.5 text-sm text-black transition-all outline-none dark:bg-black dark:text-white"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="bg-primary hover:bg-primaryho dark:disabled:bg-strokedark shadow-primary/20 shrink-0 cursor-pointer rounded-xl p-3.5 text-white shadow-md transition-colors disabled:bg-gray-200 disabled:text-gray-400"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </button>
                </form>
                <p className="text-waterloo mt-3 text-center text-[10px] dark:text-gray-500">
                  Didukung oleh Kecerdasan Buatan (Gemini AI). Data diperbarui
                  berdasarkan situs resmi RSJ Prof. HB. Saanin Padang.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
