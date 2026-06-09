"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const SUGGESTIONS = [
  "Bagaimana cara daftar online?",
  "Cek jadwal dokter",
  "Lihat ketersediaan kamar rawat inap",
  "Bagaimana cara mengadu di WBS?",
  "Lokasi dan kontak RSJ Saanin",
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
        listHtml += "<ul class='list-disc pl-5 my-2 space-y-1 text-sm'>";
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
          ? `<p class='mb-2 last:mb-0 text-sm leading-relaxed'>${trimmed}</p>`
          : "<div class='h-2'></div>")
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

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [unread, setUnread] = useState(false);
  const [showGreetingTooltip, setShowGreetingTooltip] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with greeting
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

    // Show suggestion tooltip after 3 seconds if never opened
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowGreetingTooltip(true);
        setUnread(true);
      }
    }, 4000);

    return () => clearTimeout(timer);
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

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    setUnread(false);
    setShowGreetingTooltip(false);
  };

  return (
    <div className="font-inter fixed right-6 bottom-6 z-99999">
      {/* Floating Greeting Tooltip */}
      {showGreetingTooltip && !isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="dark:bg-blacksection pointer-events-none absolute right-0 bottom-16 mb-2 w-64 rounded-xl border border-blue-200 bg-white p-3.5 shadow-xl select-none dark:border-blue-900/60"
        >
          <div className="relative">
            <p className="text-xs leading-relaxed font-semibold text-black dark:text-white">
              🤖 Tanya AI Saanin
            </p>
            <p className="text-waterloo mt-1 text-[11px] dark:text-gray-400">
              Butuh bantuan informasi RSJ Saanin? Klik untuk bertanya langsung
              ke AI!
            </p>
            {/* Arrow */}
            <div className="dark:bg-blacksection absolute right-6 -bottom-5 h-3 w-3 rotate-45 border-r border-b border-blue-200 bg-white dark:border-blue-900/60"></div>
          </div>
        </motion.div>
      )}

      {/* Floating Action Button Launcher */}
      <motion.button
        onClick={toggleOpen}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`relative flex h-14 w-14 items-center justify-center rounded-full text-white shadow-xl transition-all duration-300 focus:outline-none ${
          isOpen
            ? "bg-red-500 shadow-red-500/20 hover:bg-red-600"
            : "from-primary hover:shadow-primary/30 bg-gradient-to-tr to-blue-500"
        }`}
      >
        {unread && !isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex h-4.5 w-4.5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              1
            </span>
          </span>
        )}

        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className="dark:bg-blacksection/95 absolute right-0 bottom-20 z-99999 flex h-[75vh] max-h-[580px] w-[90vw] flex-col overflow-hidden rounded-2xl border border-blue-200/40 bg-white/95 shadow-2xl sm:w-[400px] dark:border-blue-900/40"
            style={{
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            {/* Header */}
            <div className="from-primary flex shrink-0 items-center justify-between bg-gradient-to-r to-blue-600 px-5 py-4 text-white shadow-md">
              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10">
                  <span className="text-xl">🤖</span>
                  <span className="dark:border-strokedark absolute right-0 bottom-0 h-2.5 w-2.5 animate-pulse rounded-full border border-white bg-green-400"></span>
                </div>
                <div>
                  <h4 className="text-sm leading-tight font-bold text-white">
                    Tanya AI Saanin
                  </h4>
                  <p className="flex items-center gap-1 text-[11px] font-medium text-blue-100">
                    Asisten AI Aktif
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {/* Reset Chat */}
                <button
                  onClick={handleResetChat}
                  title="Reset Obrolan"
                  className="rounded-full p-1.5 text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                  </svg>
                </button>
                {/* Minimize */}
                <button
                  onClick={toggleOpen}
                  title="Tutup Chat"
                  className="rounded-full p-1.5 text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="no-scrollbar flex-1 space-y-4 overflow-y-auto bg-gray-50/50 px-4 py-4 dark:bg-black/10">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`shadow-solid-12 max-w-[85%] rounded-2xl px-4 py-3 ${
                      msg.role === "user"
                        ? "bg-primary rounded-tr-none text-white"
                        : "dark:bg-btndark rounded-tl-none border border-blue-100/20 bg-white text-black dark:text-gray-200"
                    }`}
                  >
                    <div
                      className="chat-message-content prose dark:prose-invert max-w-none text-xs"
                      dangerouslySetInnerHTML={{
                        __html: parseMarkdown(msg.content),
                      }}
                    />
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="dark:bg-btndark shadow-solid-12 max-w-[85%] rounded-2xl rounded-tl-none border border-blue-100/20 bg-white px-4 py-3">
                    <div className="flex items-center gap-1.5 py-1">
                      <span
                        className="bg-primary h-2 w-2 animate-bounce rounded-full"
                        style={{ animationDelay: "0ms" }}
                      ></span>
                      <span
                        className="bg-primary h-2 w-2 animate-bounce rounded-full"
                        style={{ animationDelay: "150ms" }}
                      ></span>
                      <span
                        className="bg-primary h-2 w-2 animate-bounce rounded-full"
                        style={{ animationDelay: "300ms" }}
                      ></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions Chips */}
            {messages.length === 1 && !isLoading && (
              <div className="flex shrink-0 flex-wrap gap-1.5 border-t border-blue-100/10 bg-gray-50/50 px-4 py-2 dark:bg-black/10">
                {SUGGESTIONS.map((sug, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(sug)}
                    className="text-primary bg-primary/5 hover:bg-primary/10 border-primary/20 cursor-pointer rounded-full border px-2.5 py-1 text-left text-[10px] font-semibold transition-colors duration-200 dark:border-blue-500/20 dark:text-blue-300"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="dark:bg-blacksection flex shrink-0 items-center gap-2 border-t border-blue-100/20 bg-white px-4 py-3 dark:border-blue-900/30"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                placeholder="Tanyakan sesuatu tentang RSJ Saanin..."
                className="border-stroke dark:border-strokedark focus:border-primary dark:focus:border-primary flex-1 rounded-xl border bg-gray-50 px-4 py-2.5 text-xs text-black transition-all outline-none dark:bg-black dark:text-white"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-primary hover:bg-primaryho dark:disabled:bg-strokedark shadow-primary/10 shrink-0 cursor-pointer rounded-xl p-2.5 text-white shadow-md transition-colors disabled:bg-gray-200 disabled:text-gray-400"
              >
                <svg
                  width="16"
                  height="16"
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

            {/* Footer Tag */}
            <div className="text-waterloo shrink-0 border-t border-blue-100/10 bg-gray-50 px-4 py-1 text-center text-[9px] dark:bg-black dark:text-gray-500">
              Didukung oleh AI. Selalu verifikasi info penting. Hubungi
              pendaftaran untuk tindakan medis.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
