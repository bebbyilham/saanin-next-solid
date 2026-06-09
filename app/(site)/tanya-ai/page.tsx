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
  { text: "Apa saja layanan rehabilitasi di sini?", category: "Layanan" }
];

const parseMarkdown = (text: string) => {
  if (!text) return "";
  
  // Escape HTML to prevent XSS
  let html = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
    
  // Format bold: **text** -> <strong>text</strong>
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong class='font-bold text-blue-950 dark:text-blue-200'>$1</strong>");
  
  // Format unordered lists
  const lines = html.split("\n");
  let inList = false;
  const processedLines = lines.map(line => {
    const trimmed = line.trim();
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      const content = trimmed.substring(2);
      let listHtml = "";
      if (!inList) {
        inList = true;
        listHtml += "<ul class='list-disc pl-5 my-2 space-y-1 text-sm md:text-base'>";
      }
      listHtml += `<li>${content}</li>`;
      return listHtml;
    } else {
      let extra = "";
      if (inList) {
        inList = false;
        extra = "</ul>";
      }
      return extra + (trimmed ? `<p class='mb-2 last:mb-0 text-sm md:text-base leading-relaxed'>${trimmed}</p>` : "<div class='h-2.5'></div>");
    }
  });
  
  let finalHtml = processedLines.join("");
  if (inList) {
    finalHtml += "</ul>";
  }
  
  // Auto-link configuration page slugs
  const linkReplacements = [
    { pattern: /\/jadwal-dokter/g, url: "/jadwal-dokter", label: "Jadwal Dokter" },
    { pattern: /\/info-tempat-tidur/g, url: "/info-tempat-tidur", label: "Info Tempat Tidur" },
    { pattern: /\/whistle-blowing-system/g, url: "/whistle-blowing-system", label: "Whistle Blowing System (WBS)" },
    { pattern: /\/ppid/g, url: "/ppid", label: "PPID" },
    { pattern: /\/contact/g, url: "/contact", label: "Kontak" }
  ];

  linkReplacements.forEach(({ pattern, url, label }) => {
    finalHtml = finalHtml.replace(
      pattern,
      `<a href='${url}' class='text-primary dark:text-blue-400 hover:underline font-bold inline-flex items-center gap-0.5'>${label} <span class='text-[10px]'>↗</span></a>`
    );
  });
  
  return finalHtml;
};

export default function TanyaAIPage() {
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
        content: "Halo! Saya **Tanya AI Saanin**, asisten virtual resmi RSJ Prof. HB. Saanin Padang. Ada yang bisa saya bantu hari ini? Anda bisa menanyakan info pendaftaran, jadwal dokter, info kamar rawat inap, atau pengaduan WBS.",
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

    const newMessages: Message[] = [...messages, { role: "user", content: text }];
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
      setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Maaf, sistem sedang mengalami kendala teknis dalam menghubungkan ke AI. Silakan coba beberapa saat lagi, atau buka halaman [Kontak](/contact) kami.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    if (window.confirm("Apakah Anda yakin ingin menghapus riwayat obrolan ini?")) {
      const initialGreeting: Message = {
        role: "assistant",
        content: "Halo! Saya **Tanya AI Saanin**, asisten virtual resmi RSJ Prof. HB. Saanin Padang. Ada yang bisa saya bantu hari ini? Anda bisa menanyakan info pendaftaran, jadwal dokter, info kamar rawat inap, atau pengaduan WBS.",
      };
      setMessages([initialGreeting]);
      localStorage.removeItem("saanin_ai_chat_history");
    }
  };

  return (
    <section className="pb-16 pt-32 lg:pb-20 lg:pt-36 xl:pb-24 xl:pt-40 min-h-screen bg-gray-50/30 dark:bg-black/20">
      <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
        <div className="flex flex-col gap-6 lg:flex-row">
          
          {/* Sidebar - Quick Info & Tips */}
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <div 
              className="animate_top rounded-2xl border border-blue-200/30 bg-white dark:bg-blacksection dark:border-blue-800/25 p-6 md:p-8 shadow-solid-13"
              style={{
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)"
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl">🤖</span>
                <div>
                  <h3 className="text-xl font-bold text-blue-950 dark:text-blue-100">
                    Tanya AI Saanin
                  </h3>
                  <span className="inline-flex items-center gap-1.5 text-xs text-green-500 font-semibold mt-0.5">
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                    Asisten Virtual Online
                  </span>
                </div>
              </div>

              <p className="text-sm text-waterloo dark:text-gray-400 leading-relaxed mb-6 font-medium">
                Selamat datang di layanan Tanya AI. Di sini Anda dapat melakukan tanya jawab instan seputar informasi rumah sakit, jadwal praktik dokter, atau ketersediaan tempat tidur.
              </p>

              <div className="border-t border-blue-100/20 dark:border-blue-900/30 pt-6">
                <h4 className="font-bold text-sm text-blue-950 dark:text-blue-200 mb-3 uppercase tracking-wider">
                  Topik Pertanyaan Populer
                </h4>
                <div className="flex flex-col gap-2">
                  {SUGGESTIONS.map((sug, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(sug.text)}
                      className="group flex items-start gap-2.5 text-left text-xs font-semibold text-waterloo hover:text-primary dark:text-gray-400 dark:hover:text-blue-300 transition-colors duration-200 border border-stroke dark:border-strokedark hover:border-primary dark:hover:border-primary/40 rounded-xl p-3 bg-gray-50/50 dark:bg-black/30 hover:bg-primary/5 dark:hover:bg-primary/5 cursor-pointer"
                    >
                      <span className="shrink-0 bg-primary/10 text-primary dark:bg-blue-500/10 dark:text-blue-400 px-2 py-0.5 rounded-md text-[10px] uppercase">
                        {sug.category}
                      </span>
                      <span className="flex-1">{sug.text}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-blue-100/20 dark:border-blue-900/30 pt-6 mt-6 flex flex-col gap-3">
                <Link 
                  href="/"
                  className="flex items-center justify-center gap-2 rounded-full border border-stroke dark:border-strokedark px-6 py-2.5 text-sm font-semibold text-black dark:text-white hover:bg-gray-100 dark:hover:bg-btndark transition-all"
                >
                   Kembali ke Beranda
                </Link>
                <button
                  onClick={handleResetChat}
                  className="flex items-center justify-center gap-2 rounded-full border border-red-200 dark:border-red-900/40 px-6 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-500/5 transition-all cursor-pointer"
                >
                  Hapus Riwayat Chat
                </button>
              </div>
            </div>
          </div>

          {/* Main Chat Interface */}
          <div className="w-full lg:w-2/3">
            <div 
              className="animate_top flex flex-col h-[70vh] min-h-[500px] lg:h-[75vh] rounded-2xl border border-blue-200/30 bg-white dark:bg-blacksection dark:border-blue-800/25 shadow-solid-13 overflow-hidden"
              style={{
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)"
              }}
            >
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-primary to-blue-600 px-6 py-4.5 text-white flex items-center justify-between shadow-md shrink-0">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 border border-white/20">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white">Ruang Percakapan Tanya AI</h3>
                    <p className="text-xs text-blue-100 font-medium">Bertanya secara langsung dengan asisten cerdas kami</p>
                  </div>
                </div>
              </div>

              {/* Chat Message Board */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/30 dark:bg-black/15">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-5 py-3.5 shadow-solid-12 ${
                        msg.role === "user"
                          ? "bg-primary text-white rounded-tr-none"
                          : "bg-white dark:bg-btndark text-black dark:text-gray-200 border border-blue-100/10 rounded-tl-none"
                      }`}
                    >
                      <div
                        className="chat-message-content prose dark:prose-invert max-w-none text-sm md:text-base"
                        dangerouslySetInnerHTML={{ __html: parseMarkdown(msg.content) }}
                      />
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-2xl rounded-tl-none bg-white dark:bg-btndark px-5 py-4 border border-blue-100/10 shadow-solid-12">
                      <div className="flex items-center gap-2 py-1">
                        <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-primary" style={{ animationDelay: "0ms" }}></span>
                        <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-primary" style={{ animationDelay: "150ms" }}></span>
                        <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-primary" style={{ animationDelay: "300ms" }}></span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Bar */}
              <div className="p-4 border-t border-blue-100/20 dark:border-blue-900/30 bg-white dark:bg-blacksection">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend(input);
                  }}
                  className="flex gap-3 items-center"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isLoading}
                    placeholder="Tulis pesan Anda di sini (misal: Persyaratan BPJS, poli saraf, dll)..."
                    className="flex-1 bg-gray-50 dark:bg-black border border-stroke dark:border-strokedark focus:border-primary dark:focus:border-primary text-sm rounded-xl px-5 py-3.5 outline-none transition-all text-black dark:text-white"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="bg-primary hover:bg-primaryho disabled:bg-gray-200 dark:disabled:bg-strokedark disabled:text-gray-400 text-white p-3.5 rounded-xl shrink-0 transition-colors shadow-md shadow-primary/20 cursor-pointer"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </button>
                </form>
                <p className="text-[10px] text-center text-waterloo dark:text-gray-500 mt-3">
                  Didukung oleh Kecerdasan Buatan (Gemini AI). Data diperbarui berdasarkan situs resmi RSJ Prof. HB. Saanin Padang.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
