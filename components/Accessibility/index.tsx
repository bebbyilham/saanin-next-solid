"use client";

import React, { useEffect, useState, useRef } from "react";
import "./accessibility.css";
import { useTheme } from "next-themes";

export default function Accessibility() {
  const [isOpen, setIsOpen] = useState(false);
  const [resetText, setResetText] = useState("Reset Semua Pengaturan");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [settings, setSettings] = useState({
    "high-contrast": false,
    "dark-mode": false,
    "light-mode": false,
    "readable-font": false,
    "grey-scale": false,
    "underline-links": false,
    "text-left": false,
    "big-cursor": false,
    "screen-reader": false,
  });

  const panelRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Load from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem("accessibilitySettings");
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      setSettings(parsed);
      Object.keys(parsed).forEach((key) => {
        if (parsed[key] && key !== "screen-reader" && key !== "dark-mode" && key !== "light-mode") {
          document.body.classList.add(`access-${key}`);
        }
      });
      // Handle dark/light specific restoration if any custom handling needed
    }
    setMounted(true);
  }, []);

  const togglePanel = () => setIsOpen(!isOpen);

  const toggleAccess = (feature: string) => {
    const newSettings = { ...settings } as any;
    newSettings[feature] = !newSettings[feature];

    // Handle exclusive modes
    if (feature === "dark-mode" && newSettings["dark-mode"]) {
      newSettings["light-mode"] = false;
      document.body.classList.remove("access-light-mode");
      setTheme("dark");
    } else if (feature === "light-mode" && newSettings["light-mode"]) {
      newSettings["dark-mode"] = false;
      document.body.classList.remove("access-dark-mode");
      setTheme("light");
    } else if (feature === "dark-mode" && !newSettings["dark-mode"]) {
        setTheme("light");
    } else if (feature === "light-mode" && !newSettings["light-mode"]) {
        setTheme("dark");
    }

    setSettings(newSettings);
    localStorage.setItem("accessibilitySettings", JSON.stringify(newSettings));

    if (feature !== "screen-reader" && feature !== "dark-mode" && feature !== "light-mode") {
      document.body.classList.toggle(`access-${feature}`);
    }
  };

  const resetAccess = () => {
    const defaultSettings = {
      "high-contrast": false,
      "dark-mode": false,
      "light-mode": false,
      "readable-font": false,
      "grey-scale": false,
      "underline-links": false,
      "text-left": false,
      "big-cursor": false,
      "screen-reader": false,
    };
    setSettings(defaultSettings);
    localStorage.removeItem("accessibilitySettings");

    Object.keys(defaultSettings).forEach((key) => {
      document.body.classList.remove(`access-${key}`);
    });
    setTheme("light"); // Default is usually light

    // Feedback visual
    setResetText("✓ Reset Berhasil!");
    setTimeout(() => {
      setResetText("Reset Semua Pengaturan");
    }, 2000);
  };

  // Screen reader logic hook
  useEffect(() => {
    function isSpeakableTag(tag: string) {
      return ["p", "a", "span", "h1", "h2", "h3", "h4", "h5", "h6", "button", "div"].includes(tag);
    }

    let synth = typeof window !== "undefined" ? window.speechSynthesis : null;

    function handleMouseOver(e: MouseEvent) {
      if (!settings["screen-reader"]) return;
      
      const target = e.target as HTMLElement;
      if (!target) return;
      if (panelRef.current && panelRef.current.contains(target)) return;
      if (btnRef.current && btnRef.current.contains(target)) return;

      const tag = target.tagName.toLowerCase();

      if (isSpeakableTag(tag)) {
        target.classList.add("highlight-reader");
        const text = target.innerText || target.textContent || "";
        if (text.trim() && synth) {
          synth.cancel();
          const msg = new SpeechSynthesisUtterance(text.trim());
          msg.lang = "id-ID";
          msg.rate = 1;
          synth.speak(msg);
        }
      }
    }

    function handleMouseOut(e: MouseEvent) {
      if (!settings["screen-reader"]) return;
      const target = e.target as HTMLElement;
      if (!target) return;
      if (panelRef.current && panelRef.current.contains(target)) return;
      if (btnRef.current && btnRef.current.contains(target)) return;
      const tag = target.tagName.toLowerCase();

      if (isSpeakableTag(tag)) {
        target.classList.remove("highlight-reader");
        if (synth) synth.cancel();
      }
    }

    document.body.addEventListener("mouseover", handleMouseOver);
    document.body.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.body.removeEventListener("mouseover", handleMouseOver);
      document.body.removeEventListener("mouseout", handleMouseOut);
    };
  }, [settings]);

  // Click outside and escape handling
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <>
      <button
        ref={btnRef}
        className="access-btn"
        onClick={togglePanel}
        aria-label="Buka Panel Aksesibilitas"
        title="Aksesibilitas"
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 13v-2c-1.54.02-3.09-.75-4.07-1.83l-1.29-1.43c-.17-.19-.38-.34-.61-.45-.01 0-.01-.01-.02-.01H13c-.35-.2-.75-.3-1.19-.26C10.76 7.11 10 8.04 10 9.09V15c0 1.1.9 2 2 2h5v5h2v-5.5c0-1.1-.9-2-2-2h-3v-3.45c1.29 1.07 3.25 1.94 5 1.95zm-6.17 5c-.41 1.16-1.52 2-2.83 2-1.66 0-3-1.34-3-3 0-1.31.84-2.41 2-2.83V12.1a5 5 0 1 0 5.9 5.9h-2.07zM15 5.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
        </svg>
      </button>

      <div
        ref={panelRef}
        className={`access-panel ${isOpen ? "active" : ""}`}
        id="accessPanel"
        role="dialog"
        aria-label="Panel Aksesibilitas"
      >
        <div className="access-panel-header">
          <h3 className="access-panel-title">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13v-2c-1.54.02-3.09-.75-4.07-1.83l-1.29-1.43c-.17-.19-.38-.34-.61-.45-.01 0-.01-.01-.02-.01H13c-.35-.2-.75-.3-1.19-.26C10.76 7.11 10 8.04 10 9.09V15c0 1.1.9 2 2 2h5v5h2v-5.5c0-1.1-.9-2-2-2h-3v-3.45c1.29 1.07 3.25 1.94 5 1.95zm-6.17 5c-.41 1.16-1.52 2-2.83 2-1.66 0-3-1.34-3-3 0-1.31.84-2.41 2-2.83V12.1a5 5 0 1 0 5.9 5.9h-2.07zM15 5.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
            </svg>
            Aksesibilitas
          </h3>
          <button
            className="close-panel"
            onClick={togglePanel}
            aria-label="Tutup Panel"
          >
            ×
          </button>
        </div>

        <div className="access-panel-content">
          <div className="access-category">
            <div className="access-category-title">Mode Tampilan</div>

            <button
              className={`access-item ${mounted && (theme === "dark" || settings["dark-mode"]) ? "active" : ""}`}
              onClick={() => toggleAccess("dark-mode")}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
              <span className="access-item-text">Mode Gelap</span>
              <div className="access-toggle"></div>
            </button>

            <button
              className={`access-item ${mounted && (theme === "light" || settings["light-mode"]) ? "active" : ""}`}
              onClick={() => toggleAccess("light-mode")}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
              <span className="access-item-text">Mode Terang</span>
              <div className="access-toggle"></div>
            </button>

            <button
              className={`access-item ${settings["high-contrast"] ? "active" : ""}`}
              onClick={() => toggleAccess("high-contrast")}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18V4c4.41 0 8 3.59 8 8s-3.59 8-8 8z" />
              </svg>
              <span className="access-item-text">Kontras Tinggi</span>
              <div className="access-toggle"></div>
            </button>

            <button
              className={`access-item ${settings["grey-scale"] ? "active" : ""}`}
              onClick={() => toggleAccess("grey-scale")}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" />
              </svg>
              <span className="access-item-text">Skala Abu-abu</span>
              <div className="access-toggle"></div>
            </button>
          </div>

          <div className="access-category">
            <div className="access-category-title">Teks & Keterbacaan</div>

            <button
              className={`access-item ${settings["readable-font"] ? "active" : ""}`}
              onClick={() => toggleAccess("readable-font")}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.93 13.5h4.14L12 7.98zM20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-4.05 16.5l-1.14-3H9.17l-1.12 3H5.96l5.11-13h1.86l5.11 13h-2.09z" />
              </svg>
              <span className="access-item-text">Font Mudah Dibaca</span>
              <div className="access-toggle"></div>
            </button>

            <button
              className={`access-item ${settings["underline-links"] ? "active" : ""}`}
              onClick={() => toggleAccess("underline-links")}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z" />
              </svg>
              <span className="access-item-text">Garis Bawah Link</span>
              <div className="access-toggle"></div>
            </button>

            <button
              className={`access-item ${settings["text-left"] ? "active" : ""}`}
              onClick={() => toggleAccess("text-left")}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 21h18v-2H3v2zm0-4h12v-2H3v2zm0-4h18v-2H3v2zm0-4h12V7H3v2zm0-6v2h18V3H3z" />
              </svg>
              <span className="access-item-text">Rata Kiri</span>
              <div className="access-toggle"></div>
            </button>

            <button
              className={`access-item ${settings["big-cursor"] ? "active" : ""}`}
              onClick={() => toggleAccess("big-cursor")}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.64 21.97c-.21 0-.42-.05-.61-.15-.58-.31-.93-.99-.93-1.72V14l-4.24 4.24c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41l5.66-5.66L3 4.72V2.28l18.36 9.18-8.72 8.72v1.79c0 .73-.35 1.41-.93 1.72-.19.1-.4.15-.61.15z" />
              </svg>
              <span className="access-item-text">Kursor Besar</span>
              <div className="access-toggle"></div>
            </button>
            
            <button
              className={`access-item ${settings["screen-reader"] ? "active" : ""}`}
              onClick={() => toggleAccess("screen-reader")}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              </svg>
              <span className="access-item-text">Pembaca Layar (Hover)</span>
              <div className="access-toggle"></div>
            </button>
          </div>

          <button
            className="access-reset"
            onClick={resetAccess}
            style={{
              background: resetText !== "Reset Semua Pengaturan" ? "linear-gradient(135deg, #22c55e, #16a34a)" : "",
              color: resetText !== "Reset Semua Pengaturan" ? "#ffffff" : ""
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ display: "inline-block", marginRight: "8px" }}
            >
              <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
            </svg>
            {resetText}
          </button>
        </div>
      </div>
    </>
  );
}
