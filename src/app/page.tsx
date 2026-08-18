"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  XCircle,
  CheckCircle2,
  ArrowRight,
  Plus,
  Minus,
  Sparkles,
  Flame,
  Gamepad2,
  Wallet,
  Shield,
  Volume2,
  VolumeX,
  Zap,
  ChevronDown,
  ChevronUp,
  Smile,
  ShieldAlert,
  Smartphone,
  TrendingDown,
} from "lucide-react";
import { OrganicWaveDivider } from "@/components/OrganicWaveDivider";
import { FloatingBackgroundShapes } from "@/components/FloatingBackgroundShapes";
import {
  EducationalModal,
  CASE_MODAL_DATA,
  CaseEducationalData,
} from "@/components/EducationalModal";

export default function Home() {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  const [showAllSimulations, setShowAllSimulations] = useState<boolean>(false);
  const [quoteExpanded, setQuoteExpanded] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [selectedCaseModal, setSelectedCaseModal] = useState<CaseEducationalData | null>(null);

  // Track scroll progress for scroll animations
  useEffect(() => {
    const onScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(scrolled);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Web Audio synthesizer
  const playSound = (type: "click" | "toggle" | "nod" | "shake" | "expand") => {
    if (!audioEnabled || typeof window === "undefined") return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof window.AudioContext })
          .webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      if (type === "click") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(480, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } else if (type === "toggle") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(340, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(680, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === "nod") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(523, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(659, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      } else if (type === "shake") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(240, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(140, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === "expand") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(380, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(760, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      }
    } catch {
      // Audio playback fails gracefully
    }
  };

  const handleAccordionToggle = (idx: number) => {
    setActiveAccordion((prev) => (prev === idx ? null : idx));
    playSound("toggle");
  };

  const handleToggleSimulations = () => {
    setShowAllSimulations((prev) => !prev);
    playSound("expand");
  };

  const openCaseDetail = (caseKey: string) => {
    if (CASE_MODAL_DATA[caseKey]) {
      setSelectedCaseModal(CASE_MODAL_DATA[caseKey]);
      playSound("expand");
    }
  };

  const modules = [
    {
      id: "pinjol",
      num: "01",
      tag: "📌 FORESIGHT / BAHAYA EKSTREM",
      title: "Jebakan Pinjol Ilegal",
      desc: "Simulasi teror bunga harian mencekik, peretasan kontak darurat fiktif, dan kalkulasi matematis siklus gali lubang tutup lubang yang menghancurkan skor kredit generasi muda.",
      buttonText: "🔥 MULAI MAINKAN KASUS",
      bg: "#FFA6C9",
      sticker: "⚠️ Bunga Berbunga",
      href: "/simulation?module=pinjol",
      icon: Flame,
    },
    {
      id: "judol",
      num: "02",
      tag: "📌 BEHAVIORAL TRAP / RISIKO TINGGI",
      title: "Judol Berkedok Game",
      desc: "Bongkar manipulasi psikologis di balik game penghasil uang dan deposit instan. Rasakan ilusi kemenangan awal sebelum sistem menguras seluruh saldo kas secara eksponensial.",
      buttonText: "🎰 BONGKAR POLA JEBAKAN",
      bg: "#C8B6FF",
      sticker: "🎰 Depo Jebakan",
      href: "/simulation?module=judol",
      icon: Gamepad2,
    },
    {
      id: "budget",
      num: "03",
      tag: "📌 SURVIVAL 30 HARI / TINGKAT MENENGAH",
      title: "Uang Saku & Paylater",
      desc: "Tantangan bertahan hidup 30 hari sebagai mahasiswa rantau. Uji disiplin anggaran 50/30/20 saat dihadapkan pada godaan flash sale, ajakan nongkrong FOMO, dan cicilan mikro.",
      buttonText: "☕ UJI DAYA TAHAN 30 HARI",
      bg: "#FF8C42",
      sticker: "☕ Anti FOMO",
      href: "/simulation?module=budget",
      icon: Wallet,
    },
  ];

  const extraSimulations = [
    {
      id: "ponzi",
      tag: "KASUS #03",
      title: "Investasi Bodong Skema Ponzi",
      desc: "Pelajari bagaimana robot trading fiktif dan skema titip dana menjanjikan profit 30% per bulan sebelum membawa kabur seluruh modal.",
      badge: "PROFIT 30%",
      bg: "#FFE17D",
      caseKey: "ponzi",
    },
    {
      id: "phishing",
      tag: "KASUS #04",
      title: "Social Engineering & Modus APK Kurir",
      desc: "Deteksi malware pencuri OTP SMS berkedok surat tilang atau resi paket yang langsung membobol rekening m-banking.",
      badge: "VIRUS APK",
      bg: "#99E9F2",
      caseKey: "phishing",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#FAF7F2] text-[#1E1E1E] flex flex-col items-center selection:bg-[#FFA6C9] selection:text-black relative overflow-x-clip">
      
      {/* Top Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1.5 bg-[#FF8C42] z-[60] transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* ========================================================================= */}
      {/* NAVBAR (Sticky on top with backdrop-blur)                                 */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-40 w-full bg-[#161513]/95 backdrop-blur-md border-b-2 md:border-b-3 border-black shadow-[0_2px_0px_#000] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
          {/* Logo Nodfinc (Nod: Orange, finc: Putih, titik: Orange) */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 mr-2">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/30 inline-block shadow-sm" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/30 inline-block shadow-sm" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/30 inline-block shadow-sm" />
            </div>
            <Link
              href="/"
              onClick={() => playSound("click")}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <Smile className="w-6 h-6 text-[#FF8C42] group-hover:rotate-12 transition-transform" />
              <span className="font-sans font-black text-2xl tracking-tight">
                <span className="text-[#FF8C42]">Nod</span>
                <span className="text-white">finc</span>
                <span className="text-[#FF8C42]">.</span>
              </span>
            </Link>
          </div>

          {/* Center Status Pill */}
          <div className="hidden md:flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-xs font-mono text-white/90 border border-white/15 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-bold">⚡ AI IN-BROWSER VISION</span>
          </div>

          {/* Audio Switch & Quick CTA */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                const nextState = !audioEnabled;
                setAudioEnabled(nextState);
                if (!audioEnabled) {
                  setTimeout(() => playSound("toggle"), 50);
                }
              }}
              title={audioEnabled ? "Matikan Efek Suara" : "Aktifkan Efek Suara"}
              className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all text-xs flex items-center gap-1.5 cursor-pointer active:scale-95 shadow-sm"
            >
              {audioEnabled ? (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-mono font-bold hidden sm:inline text-emerald-300">
                    AUDIO ON
                  </span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-rose-400" />
                  <span className="text-[11px] font-mono font-bold hidden sm:inline text-rose-300">
                    AUDIO OFF
                  </span>
                </>
              )}
            </button>

            <Link
              href="/simulation?module=pinjol"
              onClick={() => playSound("click")}
              className="bg-[#FFA6C9] hover:bg-[#ff8cb8] text-black px-4 py-1.5 rounded-full text-xs font-black tracking-wider uppercase border-2 border-black shadow-[2px_2px_0px_0px_#111] hover:shadow-[3px_3px_0px_0px_#111] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all cursor-pointer active:scale-95"
            >
              Mainkan
            </Link>
          </div>
        </div>
      </header>

      {/* Main Full-Width Editorial Canvas */}
      <main className="w-full flex flex-col flex-1 relative">
        
        {/* ========================================================================= */}
        {/* SECTION 1: HERO SECTION                                                   */}
        {/* ========================================================================= */}
        <section className="w-full bg-[#161513] text-white pt-12 sm:pt-16 pb-0 relative overflow-hidden flex flex-col items-center text-center">
          
          {/* Inner Content with Responsive Padding */}
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-10 lg:px-20 flex flex-col items-center text-center relative z-10">
            
            {/* Floating Pebble Shapes Stack */}
            <div className="absolute top-6 left-4 sm:left-10 lg:left-16 flex flex-col items-center pointer-events-none opacity-80 hidden md:flex animate-float-slow z-0">
              <div className="w-7 h-7 rounded-full bg-[#FC814A] border-2 border-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.4)]" />
              <div className="w-12 h-6 rounded-full bg-[#C8B6FF] -mt-1.5 border-2 border-black rotate-[-15deg]" />
              <div className="w-10 h-10 rounded-xl bg-[#FFA6C9] -mt-1 border-2 border-black rotate-12" />
              <div className="w-14 h-7 rounded-full bg-[#0EB574] -mt-1 border-2 border-black" />
            </div>

            {/* Top Pill / Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", damping: 18, stiffness: 120 }}
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 rounded-full bg-[#C8B6FF] text-[#121212] text-xs sm:text-sm font-black tracking-widest uppercase border-2 border-black shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] mb-6 z-10 hover:scale-105 transition-transform"
            >
              <Sparkles className="w-4 h-4 fill-black" />
              AI GESTURE-BASED FINANCIAL SIMULATOR
            </motion.div>

            {/* Main Display Headline */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", damping: 18, stiffness: 120, delay: 0.1 }}
              className="relative z-10 max-w-4xl mx-auto"
            >
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-black tracking-tight text-white leading-[1.15] mb-6">
                Keputusan Finansialmu <br />
                <span className="text-[#FF8C42]">di Ujung Kepala.</span>
              </h1>
            </motion.div>

            {/* Floating Financial Badges */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-full max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-3 sm:gap-4 my-2 z-10"
            >
              <div className="bg-[#FFA6C9] text-black px-3.5 py-1.5 rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_#fff] rotate-[-2deg] text-xs font-black tracking-wide uppercase hover:scale-110 transition-transform cursor-default">
                💸 Bunga Harian 2%?
              </div>
              <div className="bg-[#0EB574] text-white px-3.5 py-1.5 rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_#fff] rotate-[2deg] text-xs font-black tracking-wide uppercase hover:scale-110 transition-transform cursor-default">
                🛑 Geleng Buat Tolak!
              </div>
              <div className="bg-[#FFE17D] text-black px-3.5 py-1.5 rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_#fff] rotate-[-1deg] text-xs font-black tracking-wide uppercase hover:scale-110 transition-transform cursor-default">
                📈 Skor Sehat 100%
              </div>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl leading-relaxed font-normal my-6 z-10 px-2"
            >
              Tentukan nasib uangmu tanpa menyentuh layar. Latih refleks instingtif
              menolak jeratan <strong>pinjol ilegal</strong>,{" "}
              <strong>judol berkedok game</strong>, dan{" "}
              <strong>paylater konsumtif</strong> sebelum uang aslimu habis di
              dunia nyata.
            </motion.p>

            {/* Coral / Orange CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="z-10 mb-10"
            >
              <Link
                href="/simulation?module=pinjol"
                onClick={() => playSound("click")}
                className="inline-flex items-center gap-3 bg-[#FF8C42] hover:bg-[#f07c31] text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full text-sm sm:text-base font-black tracking-widest uppercase border-2.5 border-black shadow-[5px_5px_0px_0px_#ffffff] hover:shadow-[7px_7px_0px_0px_#ffffff] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0px_0px_#ffffff] transition-all cursor-pointer"
              >
                <Zap className="w-5 h-5 fill-white" />
                Coba Simulasi Sekarang
                <ArrowRight className="w-5 h-5 animate-pulse" />
              </Link>
            </motion.div>

          </div>

          {/* Collage-Style Organic Wave Divider (Full Width 100% Edge-to-Edge) */}
          <OrganicWaveDivider
            topColor="#161513"
            bottomColor="#FAF7F2"
            accentColors={{
              primary: "#FFA6C9",
              secondary: "#501CE6",
              zebra: "#0EB574",
            }}
            className="w-full -mb-[1px] mt-4"
          />
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: INTERACTIVE ANIMATED GESTURE VISUALIZER                        */}
        {/* ========================================================================= */}
        <section className="w-full bg-[#FAF7F2] px-4 sm:px-10 lg:px-20 py-14 sm:py-20 relative">
          <FloatingBackgroundShapes />

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Heading & Edge AI Explanation */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ type: "spring", damping: 18, stiffness: 120 }}
              className="lg:col-span-6 flex flex-col items-start text-left"
            >
              <div className="relative mb-4 sm:mb-6">
                <div className="absolute -top-4 -left-4 sm:-left-6 w-48 sm:w-64 h-28 sm:h-32 bg-[#C8B6FF]/70 rounded-[60%_40%_70%_30%/50%_60%_40%_50%] -z-0 blur-[1px]" />
                <h2 className="relative z-10 text-3xl sm:text-5xl lg:text-6xl font-sans font-black text-[#1E1E1E] leading-[1.15] tracking-tight">
                  Angguk Buat Terima, <br />
                  <span className="text-[#FF6B4A]">Geleng Buat Tolak.</span>
                </h2>
              </div>

              <p className="text-sm sm:text-base lg:text-lg text-[#1E1E1E]/80 leading-relaxed font-sans mt-2 mb-6 max-w-xl font-medium">
                Platform simulator interaktif berbasis <strong>Computer Vision langsung di browser</strong>. Sistem membaca pergerakan kepala secara real-time dan 100% privat untuk melatih insting menolak jeratan digital sebelum uang aslimu habis.
              </p>

              {/* Security Badge */}
              <div className="flex items-center gap-3 text-xs sm:text-sm font-bold text-emerald-900 bg-emerald-100/90 px-4 py-2.5 rounded-2xl border-2 border-emerald-500 shadow-[3px_3px_0px_0px_#065f46]">
                <Shield className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>100% Client-Side Privacy</span>
              </div>
            </motion.div>

            {/* Right Column: Cartoon Avatar Gesture Visualizer Cards */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Card 1: GELENG KEPALA (TOLAK KERAS - ROSE/RED) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                onClick={() => playSound("shake")}
                className="bg-rose-50 hover:bg-rose-100/80 border-3 border-rose-500 rounded-3xl p-6 shadow-[5px_5px_0px_0px_#f43f5e] transition-all cursor-pointer flex flex-col items-center text-center group"
              >
                {/* Animated Cartoon Avatar Head Shaking */}
                <div className="w-24 h-24 rounded-full bg-rose-200 border-2.5 border-black flex items-center justify-center mb-4 shadow-[3px_3px_0px_0px_#000] animate-head-shake-loop">
                  <div className="flex flex-col items-center">
                    <div className="flex gap-2 mb-1.5">
                      <span className="w-2 h-2 rounded-full bg-black inline-block" />
                      <span className="w-2 h-2 rounded-full bg-black inline-block" />
                    </div>
                    {/* Wavy mouth */}
                    <div className="w-6 h-2 border-b-2.5 border-black rounded-full" />
                  </div>
                </div>

                <div className="inline-block bg-rose-500 text-white text-[10px] font-mono font-black uppercase px-3 py-1 rounded-full border border-black shadow-[2px_2px_0px_0px_#000] mb-2">
                  🛡️ HINDARI BAHAYA FINANSIAL
                </div>

                <h3 className="text-xl font-sans font-black text-rose-900 tracking-tight">
                  TOLAK KERAS
                </h3>
                <p className="text-xs text-rose-800 font-medium mt-1.5 leading-relaxed">
                  Gerakkan kepala ke kiri-kanan untuk menolak pinjol berbunga harian, judol berkedok game, dan tawaran mencurigakan.
                </p>
              </motion.div>

              {/* Card 2: ANGGUK KEPALA (AMBIL KEPUTUSAN - EMERALD/GREEN) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                transition={{ delay: 0.1 }}
                onClick={() => playSound("nod")}
                className="bg-emerald-50 hover:bg-emerald-100/80 border-3 border-emerald-500 rounded-3xl p-6 shadow-[5px_5px_0px_0px_#10b981] transition-all cursor-pointer flex flex-col items-center text-center group"
              >
                {/* Animated Cartoon Avatar Head Nodding */}
                <div className="w-24 h-24 rounded-full bg-emerald-200 border-2.5 border-black flex items-center justify-center mb-4 shadow-[3px_3px_0px_0px_#000] animate-head-nod-loop">
                  <div className="flex flex-col items-center">
                    <div className="flex gap-2 mb-1.5">
                      <span className="w-2 h-2 rounded-full bg-black inline-block" />
                      <span className="w-2 h-2 rounded-full bg-black inline-block" />
                    </div>
                    {/* Happy Smile Mouth */}
                    <div className="w-6 h-3 border-b-3 border-black rounded-full" />
                  </div>
                </div>

                <div className="inline-block bg-emerald-600 text-white text-[10px] font-mono font-black uppercase px-3 py-1 rounded-full border border-black shadow-[2px_2px_0px_0px_#000] mb-2">
                  ⚡ LANJUTKAN SKENARIO
                </div>

                <h3 className="text-xl font-sans font-black text-emerald-900 tracking-tight">
                  AMBIL KEPUTUSAN
                </h3>
                <p className="text-xs text-emerald-800 font-medium mt-1.5 leading-relaxed">
                  Gerakkan kepala ke atas-bawah saat yakin mengeksekusi keputusan finansial yang sehat dan bertanggung jawab.
                </p>
              </motion.div>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: MODUL KASUS (Interactive + & - Accordions)                      */}
        {/* ========================================================================= */}
        <section className="w-full border-y-2.5 border-black flex flex-col sm:flex-row relative bg-white">
          {/* Vertical Ribbon */}
          <div className="bg-[#3B14C4] text-white py-2 sm:py-0 w-full sm:w-20 md:w-24 flex items-center justify-center border-b-2.5 sm:border-b-0 sm:border-r-2.5 border-black shrink-0 select-none">
            <span className="sm:transform sm:-rotate-90 whitespace-nowrap text-xs sm:text-sm md:text-base font-black tracking-[0.25em] uppercase font-mono">
              MODUL SIMULASI
            </span>
          </div>

          {/* 3 Horizontal Colored Rows */}
          <div className="flex-1 flex flex-col divide-y-2.5 divide-black">
            {modules.map((mod, idx) => {
              const isOpen = activeAccordion === idx;
              const IconComp = mod.icon;

              return (
                <div
                  key={mod.id}
                  style={{ backgroundColor: mod.bg }}
                  className="transition-colors duration-200 relative group"
                >
                  {/* Clickable Header Area */}
                  <div
                    onClick={() => handleAccordionToggle(idx)}
                    className="w-full px-4 sm:px-10 md:px-12 py-6 sm:py-8 flex items-center justify-between text-left cursor-pointer select-none hover:brightness-95 transition-all"
                  >
                    <div className="flex items-center gap-3 sm:gap-6 flex-wrap sm:flex-nowrap pr-2">
                      <span className="font-mono text-xs sm:text-sm font-black text-black/50 border border-black/30 rounded px-1.5 py-0.5 bg-white/40">
                        {mod.num}
                      </span>
                      <h3 className="text-xl sm:text-3xl md:text-4xl font-sans font-black text-black tracking-tight">
                        {mod.title}
                      </h3>
                      <span className="hidden sm:inline-block bg-white text-black px-3 py-1 rounded-full text-[11px] font-mono font-black border-2 border-black shadow-[2px_2px_0px_0px_#111]">
                        {mod.sticker}
                      </span>
                    </div>

                    {/* Dedicated Toggle Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAccordionToggle(idx);
                      }}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-black bg-white/80 hover:bg-white flex items-center justify-center transition-all shadow-[3px_3px_0px_0px_#111] hover:shadow-[4px_4px_0px_0px_#111] hover:-translate-y-0.5 shrink-0 active:scale-90 cursor-pointer"
                      title={isOpen ? "Tutup modul (-)" : "Buka modul (+)"}
                      aria-label={isOpen ? "Tutup modul" : "Buka modul"}
                    >
                      {isOpen ? (
                        <Minus className="w-5 h-5 sm:w-6 sm:h-6 text-black stroke-[3]" />
                      ) : (
                        <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-black stroke-[3]" />
                      )}
                    </button>
                  </div>

                  {/* Expanded Accordion Body */}
                  {isOpen && (
                    <div className="px-4 sm:px-10 md:px-12 pb-8 pt-2 border-t-2 border-black/20 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-black/5 animate-fadeIn">
                      <div className="max-w-2xl text-left">
                        <span className="text-xs sm:text-sm font-mono uppercase tracking-wider font-black text-black/80 block mb-2">
                          {mod.tag}
                        </span>
                        <p className="text-sm sm:text-base text-black/90 font-medium leading-relaxed font-sans">
                          {mod.desc}
                        </p>
                      </div>

                      <Link
                        href={mod.href}
                        onClick={() => playSound("click")}
                        className="inline-flex items-center justify-center gap-2.5 bg-black hover:bg-zinc-800 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl text-xs sm:text-sm font-black tracking-wider uppercase transition-all shadow-[4px_4px_0px_0px_#ffffff] hover:shadow-[6px_6px_0px_0px_#ffffff] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#ffffff] shrink-0 cursor-pointer text-center font-sans"
                      >
                        <IconComp className="w-4 h-4 text-amber-300" />
                        {mod.buttonText}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: URGENT QUOTE BLOCK                                             */}
        {/* ========================================================================= */}
        <section className="w-full bg-[#0EB574] px-4 sm:px-12 lg:px-20 py-16 sm:py-24 relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 pointer-events-none opacity-45 flex items-center justify-center">
            <svg className="w-[140%] h-[140%]" viewBox="0 0 600 350" fill="none">
              <path
                d="M 50,180 C 120,60 380,40 450,180 C 520,300 240,340 180,220 C 120,100 480,30 550,180"
                stroke="#FFFFFF"
                strokeWidth="8"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 90,240 C 220,330 400,20 520,120"
                stroke="#FFA6C9"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="120" cy="100" r="50" stroke="#C8B6FF" strokeWidth="6" fill="none" />
              <circle cx="480" cy="240" r="35" stroke="#FFFFFF" strokeWidth="5" fill="none" />
            </svg>
          </div>

          {/* Urgent Quote Retro Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", damping: 18, stiffness: 120 }}
            onClick={() => {
              playSound("click");
              setQuoteExpanded(!quoteExpanded);
            }}
            className={`relative z-10 max-w-2xl bg-[#FAF7F2] p-6 sm:p-10 md:p-12 rounded-[2rem] border-2.5 border-black shadow-[8px_8px_0px_0px_#111] hover:shadow-[14px_14px_0px_0px_#111] hover:-translate-y-2 hover:rotate-1 transition-all duration-300 cursor-pointer group text-center ${
              quoteExpanded
                ? "-translate-y-2 shadow-[14px_14px_0px_0px_#111] rotate-1"
                : ""
            }`}
            title="Klik untuk melihat insight edukasi"
          >
            <div className="absolute -top-3.5 -right-3.5 bg-[#FF8C42] text-white text-[10px] font-mono font-black uppercase px-3 py-1 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_#111] group-hover:rotate-6 transition-transform">
              📌 OJK INSIGHT 2026
            </div>

            <p className="text-base sm:text-xl md:text-2xl font-sans font-extrabold text-[#1E1E1E] leading-relaxed mb-6 group-hover:italic transition-all tracking-tight">
              &ldquo;Literasi finansial digital bukan sekadar teori menghafal bunga,
              melainkan keberanian instingtif untuk menggelengkan kepala saat
              tawaran transaksi berisiko datang.&rdquo;
            </p>

            <div className="inline-block border-t-2 border-black/20 pt-3 text-xs sm:text-sm font-mono font-black text-gray-700 uppercase tracking-widest group-hover:text-[#501CE6] transition-colors">
              — Edukasi Finansial &amp; OJK Insight 2026
            </div>

            {quoteExpanded && (
              <div className="mt-4 p-3.5 bg-emerald-50 rounded-xl border-2 border-emerald-300 text-xs sm:text-sm text-emerald-900 font-medium text-left animate-fadeIn shadow-sm font-sans">
                💡 <strong>Fakta Riset Lapangan:</strong> Lebih dari 67% korban
                pinjol ilegal terjebak karena tekanan psikologis instan di
                ponsel tanpa jeda berpikir logis. Latihan refleks gestur kepala
                melatih jeda kesadaran sebelum tergiur klik instan.
              </div>
            )}
          </motion.div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 5: DISCOVER MODULES WITH SPLIT NEO-BRUTALISM MODAL                */}
        {/* ========================================================================= */}
        <section className="w-full bg-[#FAF7F2] px-4 sm:px-10 lg:px-20 py-16 sm:py-20 flex flex-col items-center relative">
          <FloatingBackgroundShapes />

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", damping: 18, stiffness: 120 }}
            className="relative text-center max-w-xl mb-12"
          >
            <div className="absolute -top-4 left-1/3 w-28 h-20 bg-[#FFE17D] rounded-[50%_50%_40%_60%] -z-0 opacity-80" />
            <h3 className="relative z-10 text-2xl sm:text-4xl font-sans font-black text-[#1E1E1E] leading-tight tracking-tight">
              Kenali Berbagai Pola Manipulasi Finansial Digital
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mt-2 font-medium font-sans">
              Klik kartu untuk membongkar trik sindikat, tips pencegahan, dan mainkan skenario kasusnya.
            </p>
          </motion.div>

          {/* Grid Simulasi */}
          <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-10">
            
            {/* Card 1: Pinjol Case */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              onClick={() => openCaseDetail("pinjol")}
              className="bg-white rounded-[2rem] border-3 border-black shadow-[6px_6px_0px_0px_#111] hover:shadow-[10px_10px_0px_0px_#111] transition-all overflow-hidden flex flex-col group cursor-pointer"
            >
              <div className="h-44 sm:h-52 bg-[#FFA6C9] p-6 relative overflow-hidden flex items-center justify-center border-b-2.5 border-black">
                <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-xs font-mono font-black uppercase rounded-lg shadow-sm">
                  KASUS #01
                </div>
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#FF8C42] border-2.5 border-black flex items-center justify-center text-white font-sans font-black text-2xl sm:text-3xl rotate-[-8deg] shadow-[4px_4px_0px_0px_#111]">
                  100%
                </div>
                <div className="absolute -bottom-6 right-4 text-6xl sm:text-7xl font-black text-black/10 select-none tracking-tighter font-sans">
                  PINJOL
                </div>
              </div>
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between text-left">
                <div>
                  <h4 className="font-sans font-extrabold text-lg sm:text-xl text-[#1E1E1E] leading-snug mb-2 tracking-tight">
                    Anatomi Teror DC &amp; Perangkap Kontak Darurat
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4 font-sans font-medium">
                    Bagaimana aplikasi ilegal memanipulasi izin ponsel dan menyebarkan data pribadi saat telat 1 hari.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openCaseDetail("pinjol");
                  }}
                  className="text-xs sm:text-sm font-black text-[#501CE6] hover:underline flex items-center gap-1.5 pt-2 border-t border-gray-100 font-sans"
                >
                  Pelajari &amp; Mainkan Simulasi <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            {/* Card 2: Judol Case */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              transition={{ delay: 0.1 }}
              onClick={() => openCaseDetail("judol")}
              className="bg-white rounded-[2rem] border-3 border-black shadow-[6px_6px_0px_0px_#111] hover:shadow-[10px_10px_0px_0px_#111] transition-all overflow-hidden flex flex-col group cursor-pointer"
            >
              <div className="h-44 sm:h-52 bg-[#C8B6FF] p-6 relative overflow-hidden flex items-center justify-center border-b-2.5 border-black">
                <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-xs font-mono font-black uppercase rounded-lg shadow-sm">
                  KASUS #02
                </div>
                <div className="w-32 sm:w-36 h-18 sm:h-20 bg-[#FFE17D] border-2.5 border-black rounded-2xl flex items-center justify-center text-[#1E1E1E] font-mono font-black text-xl sm:text-2xl rotate-[6deg] shadow-[4px_4px_0px_0px_#111]">
                  DEPOSIT
                </div>
                <div className="absolute -bottom-6 left-4 text-6xl sm:text-7xl font-black text-black/10 select-none tracking-tighter font-sans">
                  SLOT
                </div>
              </div>
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between text-left">
                <div>
                  <h4 className="font-sans font-extrabold text-lg sm:text-xl text-[#1E1E1E] leading-snug mb-2 tracking-tight">
                    Siklus Dopamin: Mengapa Korban Selalu Ingin Balas Modal
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4 font-sans font-medium">
                    Bongkar algoritma RTP palsu dan ilusi jackpot yang dirancang membuat pemain kecanduan berulang.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openCaseDetail("judol");
                  }}
                  className="text-xs sm:text-sm font-black text-[#501CE6] hover:underline flex items-center gap-1.5 pt-2 border-t border-gray-100 font-sans"
                >
                  Pelajari &amp; Mainkan Simulasi <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            {/* Extra Cards when expanded */}
            {showAllSimulations &&
              extraSimulations.map((sim) => (
                <motion.div
                  key={sim.id}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  onClick={() => openCaseDetail(sim.caseKey)}
                  className="bg-white rounded-[2rem] border-3 border-black shadow-[6px_6px_0px_0px_#111] hover:shadow-[10px_10px_0px_0px_#111] transition-all overflow-hidden flex flex-col group cursor-pointer"
                >
                  <div
                    style={{ backgroundColor: sim.bg }}
                    className="h-44 sm:h-52 p-6 relative overflow-hidden flex items-center justify-center border-b-2.5 border-black"
                  >
                    <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-xs font-mono font-black uppercase rounded-lg shadow-sm">
                      {sim.tag}
                    </div>
                    <div className="px-5 py-3 rounded-2xl bg-white border-2.5 border-black text-[#1E1E1E] font-mono font-black text-lg sm:text-xl shadow-[4px_4px_0px_0px_#111] rotate-[-4deg]">
                      {sim.badge}
                    </div>
                  </div>
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between text-left">
                    <div>
                      <h4 className="font-sans font-extrabold text-lg sm:text-xl text-[#1E1E1E] leading-snug mb-2 tracking-tight">
                        {sim.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4 font-sans font-medium">
                        {sim.desc}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openCaseDetail(sim.caseKey);
                      }}
                      className="text-xs sm:text-sm font-black text-[#501CE6] hover:underline flex items-center gap-1.5 pt-2 border-t border-gray-100 font-sans"
                    >
                      Pelajari &amp; Mainkan Simulasi <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
          </div>

          {/* Working Toggle Button */}
          <button
            type="button"
            onClick={handleToggleSimulations}
            className="bg-[#501CE6] hover:bg-[#4015bc] text-white px-8 sm:px-10 py-4 rounded-full text-xs sm:text-sm font-black tracking-widest uppercase border-2.5 border-black shadow-[4px_4px_0px_0px_#111] hover:shadow-[7px_7px_0px_0px_#111] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0px_0px_#111] transition-all cursor-pointer inline-flex items-center gap-2 font-sans"
          >
            {showAllSimulations ? (
              <>
                LIHAT LEBIH SEDIKIT
                <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                LIHAT SEMUA SIMULASI
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 6: ROYAL VIOLET CTA BANNER                                        */}
        {/* ========================================================================= */}
        <section className="w-full bg-[#501CE6] text-white px-4 sm:px-12 lg:px-20 py-16 sm:py-20 relative overflow-hidden text-center flex flex-col items-center">
          <div className="absolute -bottom-10 -left-10 w-32 sm:w-36 h-32 sm:h-36 rounded-full bg-[#FFA6C9] border-2.5 border-black" />
          <div className="absolute -bottom-12 -right-12 w-40 sm:w-48 h-40 sm:h-48 rounded-full bg-[#FF8C42] border-2.5 border-black" />

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", damping: 18, stiffness: 120 }}
            className="text-2xl sm:text-4xl md:text-5xl font-sans font-black mb-4 max-w-2xl relative z-10 leading-tight tracking-tight"
          >
            Siap Melatih Refleks Finansialmu Hari Ini?
          </motion.h2>

          <p className="text-xs sm:text-sm md:text-base text-white/80 max-w-lg mb-8 relative z-10 font-medium px-4 font-sans">
            Latih insting menolak jeratan pinjol &amp; judol sebelum uang aslimu
            habis di dunia nyata.
          </p>

          <Link
            href="/simulation?module=pinjol"
            onClick={() => playSound("click")}
            className="relative z-10 bg-white text-black hover:bg-gray-100 px-8 sm:px-10 py-4 rounded-full text-xs sm:text-sm font-black tracking-widest uppercase border-2.5 border-black shadow-[6px_6px_0px_0px_#111] hover:shadow-[8px_8px_0px_0px_#111] hover:-translate-x-0.5 hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer font-sans"
          >
            Mulai Simulasi Gratis
          </Link>

          <svg
            className="absolute bottom-0 left-0 w-full h-8 sm:h-10 text-[#161513] fill-current"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path d="M0,0 C200,90 400,-40 600,60 C800,140 1000,10 1200,40 L1200,120 L0,120 Z" />
          </svg>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 7: FOOTER                                                         */}
        {/* ========================================================================= */}
        <footer className="w-full bg-[#161513] text-white px-4 sm:px-8 py-12 flex flex-col items-center text-center">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs sm:text-sm text-gray-400 font-mono mb-8">
            <Link
              href="/simulation?module=pinjol"
              onClick={() => playSound("click")}
              className="hover:text-white transition-colors"
            >
              Simulasi Pinjol
            </Link>
            <span>•</span>
            <Link
              href="/simulation?module=judol"
              onClick={() => playSound("click")}
              className="hover:text-white transition-colors"
            >
              Simulasi Judol
            </Link>
            <span>•</span>
            <Link
              href="/simulation?module=budget"
              onClick={() => playSound("click")}
              className="hover:text-white transition-colors"
            >
              Simulasi Paylater
            </Link>
          </div>

          <div className="flex items-center gap-2 mb-4 group cursor-default">
            <Smile className="w-7 h-7 sm:w-8 sm:h-8 text-[#FF8C42]" />
            <span className="font-sans font-black text-3xl sm:text-4xl tracking-tight">
              <span className="text-[#FF8C42]">Nod</span>
              <span className="text-white">finc</span>
              <span className="text-[#FF8C42]">.</span>
            </span>
          </div>

          <p className="text-xs text-gray-500 font-mono tracking-wider">
            Nodfinc &copy; 2026 — Karya Inovasi Edukasi Finansial Generasi Muda
          </p>
        </footer>
      </main>

      {/* ========================================================================= */}
      {/* 8. SPLIT NEO-BRUTALISM EDUCATIONAL MODAL (SESUAI SPESIFIKASI)             */}
      {/* ========================================================================= */}
      <EducationalModal
        caseData={selectedCaseModal}
        isOpen={Boolean(selectedCaseModal)}
        onClose={() => setSelectedCaseModal(null)}
        onCtaClick={() => playSound("click")}
      />

    </div>
  );
}
