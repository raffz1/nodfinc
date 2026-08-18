"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ShieldCheck,
  Zap,
  Check,
  TrendingUp,
  AlertOctagon,
  ArrowRight,
} from "lucide-react";

export interface MetricBadge {
  label: string;
  value: string;
  sub: string;
}

export interface ManipulationStep {
  step: string;
  title: string;
  desc: string;
}

export interface CaseFactSheetData {
  id: "pinjol" | "judol" | "ponzi" | "phishing";
  badge: string;
  badgeBg: string;
  badgeText: string;
  title: string;
  subtitle: string;
  metrics: MetricBadge[];
  steps: ManipulationStep[];
  safetyTitle: string;
  safetyChecklist: string[];
  ctaUrl: string;
  ctaText: string;
}

export const FACT_SHEET_CASES: Record<string, CaseFactSheetData> = {
  pinjol: {
    id: "pinjol",
    badge: "🚨 MODUS #01: PINJOL ILEGAL & TEROR DATA",
    badgeBg: "bg-rose-100",
    badgeText: "text-rose-800",
    title: "Anatomi Teror DC & Jebakan Izin Kontak",
    subtitle:
      "Bagaimana sindikat pinjol ilegal menyandera privasi melalui perizinan smartphone dan manipulasi psikologis.",
    metrics: [
      {
        label: "Potongan Admin",
        value: "40% di Muka",
        sub: "Dana cair dipotong separuh",
      },
      {
        label: "Bunga Harian",
        value: "1% - 2% / Hari",
        sub: "Tanpa batas akumulasi OJK",
      },
      {
        label: "Penyedotan Data",
        value: "100% Kontak & Foto",
        sub: "Malware membaca isi galeri",
      },
    ],
    steps: [
      {
        step: "1",
        title: "Umpan Cair Cepat",
        desc: "Tanpa KTP/SLIK, namun meminta akses penuh izin kontak, galeri, dan SMS saat instalasi.",
      },
      {
        step: "2",
        title: "Jebakan Bunga Menumpuk",
        desc: "Utang membengkak 3x lipat dalam kurun 14 hari akibat denda harian tidak masuk akal.",
      },
      {
        step: "3",
        title: "Teror & Sebar Data",
        desc: "Penagihan intimidasi ke keluarga, teman, dan dosen disertai ancaman foto editan.",
      },
    ],
    safetyTitle: "🛡️ 3 LANGKAH PENCEGAHAN MUTLAK (OJK READY)",
    safetyChecklist: [
      "Rumus Izin C-A-M: Fintech legal HANYA boleh akses Camera, Audio, Location. Tolak jika minta Kontak & Galeri.",
      "Cek Legalitas Cepat: Hubungi WhatsApp resmi OJK di 081-157-157-157 sebelum mengunduh aplikasi.",
      "Lapor Nomor Teror: Laporkan intimidasi ke portal resmi patrolisiber.id dan konsumen@ojk.go.id.",
    ],
    ctaUrl: "/simulation?module=pinjol",
    ctaText: "🚀 UJI INSTING DI SIMULASI ➔",
  },
  judol: {
    id: "judol",
    badge: "🎰 MODUS #02: MANIPULASI DOPAMIN JUDOL",
    badgeBg: "bg-purple-100",
    badgeText: "text-purple-800",
    title: "Siklus Adiksi & Ilusi Kemenangan Awal",
    subtitle:
      "Bagaimana algoritma perjudian digital mempermainkan neurosains korban lewat jebakan deposit bertingkat.",
    metrics: [
      {
        label: "Deposit Awal",
        value: "100% Hangus",
        sub: "Kemenangan semu di awal",
      },
      {
        label: "Peluang Jackpot",
        value: "< 0.01% Diatur",
        sub: "Algoritma diatur admin server",
      },
      {
        label: "Kecanduan",
        value: "3x Lonjakan Dopamin",
        sub: "Efek 'Near-Miss' bikin penasaran",
      },
    ],
    steps: [
      {
        step: "1",
        title: "Freebet & Kemenangan Awal",
        desc: "Pemain sengaja dibuat menang saldo virtual agar terpacu melakukan deposit uang sungguhan.",
      },
      {
        step: "2",
        title: "Near-Miss Effect (Chasing Loss)",
        desc: "Simbol slot dibuat 'hampir jackpot' untuk memicu ilusi bahwa putaran berikutnya pasti menang besar.",
      },
      {
        step: "3",
        title: "Akun Terkunci & Uang Tebusan",
        desc: "CS Telegram meminta setoran jaminan untuk mencairkan saldo yang sebenarnya fiktif.",
      },
    ],
    safetyTitle: "🛡️ PANDUAN PEMUTUSAN SIKLUS (KOMDIGI & OJK)",
    safetyChecklist: [
      "Tiada Rumus Pola Gacor: Algoritma RNG 100% diatur bandar untuk selalu menguras modal pemain.",
      "Blokir Rekening Penampung: Catat nomor rekening bank/e-wallet deposit dan laporkan ke cekrekening.id.",
      "Detoks Total: Hapus aplikasi, pasang DNS filtering keluarga, dan hapus kontak agen judi online.",
    ],
    ctaUrl: "/simulation?module=judol",
    ctaText: "🚀 UJI INSTING DI SIMULASI ➔",
  },
  ponzi: {
    id: "ponzi",
    badge: "📉 MODUS #03: INVESTASI BODONG & PONZI",
    badgeBg: "bg-amber-100",
    badgeText: "text-amber-900",
    title: "Skema Robot Trading & Janji Profit Fix",
    subtitle:
      "Memutar uang member baru untuk membayar profit semu investor lama sebelum membawa kabur seluruh aset.",
    metrics: [
      {
        label: "Janji Return",
        value: "30% / Bulan",
        sub: "Klaim robot AI bebas risiko",
      },
      {
        label: "Sumber Profit",
        value: "100% Uang Member",
        sub: "Bukan dari aktivitas riil",
      },
      {
        label: "Risiko Akhir",
        value: "100% Exit Scam",
        sub: "Website ditutup saat macet",
      },
    ],
    steps: [
      {
        step: "1",
        title: "Iming-Iming Return Tetap",
        desc: "Menjanjikan profit pasti puluhan persen per bulan tanpa risiko dengan pamer mobil mewah di media sosial.",
      },
      {
        step: "2",
        title: "Bonus Referral Berjenjang",
        desc: "Member ditekan merekrut keluarga dan rekan dekat demi komisi downline berlipat ganda.",
      },
      {
        step: "3",
        title: "Penarikan Terkunci (Exit Scam)",
        desc: "Ketika arus deposit baru melambat, admin platform mengunci penarikan dana lalu menghilang.",
      },
    ],
    safetyTitle: "🛡️ PRINSIP INVESTASI SEHAT (BAPPEBTI & OJK)",
    safetyChecklist: [
      "Prinsip 2L (Legal & Logis): Tidak ada instrumen investasi resmi yang menjamin fixed return puluhan persen.",
      "Verifikasi Izin Entitas: Periksa legalitas perusahaan di situs resmi bappebti.go.id dan satgaspasti.ojk.go.id.",
      "Pemisahan Rekening: Dana investasi sah selalu disetor ke rekening segregated account atas nama bursa/kustodian.",
    ],
    ctaUrl: "/simulation?module=pinjol",
    ctaText: "🚀 UJI INSTING DI SIMULASI ➔",
  },
  phishing: {
    id: "phishing",
    badge: "📱 MODUS #04: SOCIAL ENGINEERING & APK",
    badgeBg: "bg-blue-100",
    badgeText: "text-blue-900",
    title: "Malware APK Kurir & Pencurian OTP",
    subtitle:
      "Penyusupan malware perbankan melalui pesan darurat berkedok surat tilang elektronik atau resi paket kurir.",
    metrics: [
      {
        label: "Akses Disadap",
        value: "100% SMS OTP",
        sub: "Menerobos m-banking korban",
      },
      {
        label: "Kecepatan Kuras",
        value: "< 3 Menit",
        sub: "Transfer kilat ke rekening gelap",
      },
      {
        label: "Rata-rata Rugi",
        value: "Rp 12.5 Juta",
        sub: "Saldo tabungan + limit pinjol",
      },
    ],
    steps: [
      {
        step: "1",
        title: "Pesan Rekayasa Urgensi",
        desc: "Pelaku mengirimkan pesan WhatsApp darurat berisi file .APK bertuliskan 'Surat Tilang' atau 'Foto Paket'.",
      },
      {
        step: "2",
        title: "Penyusupan Akses SMS",
        desc: "Aplikasi malware langsung meminta izin akses 'Notification Listener' dan 'Read SMS' tanpa disadari.",
      },
      {
        step: "3",
        title: "Pengurasan Saldo Kilat",
        desc: "Pelaku mengambil alih akun m-banking dan mentransfer seluruh tabungan serta mencairkan limit paylater.",
      },
    ],
    safetyTitle: "🛡️ PROTOKOL KEAMANAN PERANGKAT (CYBER READY)",
    safetyChecklist: [
      "Haram Install File .APK: Jangan pernah mengklik atau menginstal file berekstensi .APK dari pesan WhatsApp.",
      "Matikan Izin Sumber Asing: Nonaktifkan toggle 'Install Unknown Apps' di menu pengaturan privasi smartphone.",
      "Blokir Cepat Saat Terlanjur: Segera hubungi call center bank untuk blokir rekening dan aktifkan Mode Pesawat.",
    ],
    ctaUrl: "/simulation?module=budget",
    ctaText: "🚀 UJI INSTING DI SIMULASI ➔",
  },
};

export type CaseEducationalData = CaseFactSheetData;
export const CASE_MODAL_DATA = FACT_SHEET_CASES;

export interface EducationalModalProps {
  caseData?: CaseFactSheetData | null;
  caseId?: string | null;
  isOpen: boolean;
  onClose: () => void;
  onCtaClick?: () => void;
}

export function EducationalModal({
  caseData,
  caseId,
  isOpen,
  onClose,
  onCtaClick,
}: EducationalModalProps) {
  if (!isOpen) return null;

  const currentCase = caseData || (caseId ? FACT_SHEET_CASES[caseId] : null) || FACT_SHEET_CASES.pinjol;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
        
        {/* Unified Neo-Brutalism Infographic Fact Sheet Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ type: "spring", damping: 24, stiffness: 280 }}
          className="relative w-full max-w-3xl md:max-w-4xl bg-[#FAF9F6] border-3 border-black rounded-2xl md:rounded-3xl shadow-[8px_8px_0px_#000] overflow-hidden text-left my-auto max-h-[90vh] flex flex-col"
        >
          {/* ========================================================================= */}
          {/* TOP HEADER SECTION                                                        */}
          {/* ========================================================================= */}
          <div className="bg-white border-b-3 border-black p-4 sm:p-6 shrink-0 relative">
            
            {/* Top Bar: Badge Tag & Close Button */}
            <div className="flex items-center justify-between gap-3 mb-2 pr-10 sm:pr-12">
              <span className={`inline-block ${currentCase.badgeBg} ${currentCase.badgeText} border-2 border-black font-black text-[11px] sm:text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-sm`}>
                {currentCase.badge}
              </span>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 sm:w-10 sm:h-10 bg-white border-2 border-black rounded-full flex items-center justify-center font-bold hover:bg-rose-50 shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] cursor-pointer transition-colors"
              title="Tutup Lembar Fakta"
            >
              <X className="w-5 h-5 stroke-[2.5] text-black" />
            </button>

            {/* Title & Subtitle */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 leading-tight font-sans tracking-tight">
              {currentCase.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium font-sans mt-1.5 leading-relaxed max-w-2xl">
              {currentCase.subtitle}
            </p>
          </div>

          {/* ========================================================================= */}
          {/* SCROLLABLE INFOGRAPHIC BODY (2-Column Layout on Desktop)                  */}
          {/* ========================================================================= */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col gap-5 bg-[#FAF9F6]">
            
            {/* 3 Key Metric Badges */}
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {currentCase.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="bg-white border-2 border-black p-3.5 rounded-xl shadow-[3px_3px_0px_#000] flex flex-col justify-between"
                  >
                    <span className="text-[10px] sm:text-[11px] font-mono font-bold text-gray-500 uppercase tracking-wider">
                      {metric.label}
                    </span>
                    <span className="text-lg sm:text-xl font-sans font-black text-rose-600 tracking-tight my-1">
                      {metric.value}
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-gray-600 font-medium leading-tight">
                      {metric.sub}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2 Editorial Columns: Alur Manipulasi (Left) & Panduan OJK (Right) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 items-start">
              
              {/* Left Column (7 cols): Alur Manipulasi */}
              <div className="md:col-span-7 flex flex-col gap-3">
                <span className="text-xs font-mono font-black uppercase text-slate-900 tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#FF6B00]" />
                  ALUR REKAYASA & SIKLUS PERANGKAP:
                </span>

                <div className="flex flex-col gap-2.5">
                  {currentCase.steps.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white border-2 border-black p-3 rounded-xl shadow-[2px_2px_0px_#000] flex items-start gap-3"
                    >
                      <span className="w-6 h-6 rounded-lg bg-black text-white text-xs font-mono font-black flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                        {item.step}
                      </span>
                      <div className="flex-1">
                        <h4 className="text-xs sm:text-sm font-black text-slate-900 font-sans">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-600 font-medium font-sans mt-0.5 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column (5 cols): Safety Box (OJK Ready) */}
              <div className="md:col-span-5">
                <div className="bg-emerald-100/90 border-2 border-black p-4 rounded-xl shadow-[3px_3px_0px_#000] flex flex-col gap-3">
                  <span className="text-[11px] sm:text-xs font-mono font-black uppercase text-emerald-950 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0" />
                    {currentCase.safetyTitle}
                  </span>

                  <ul className="space-y-2.5">
                    {currentCase.safetyChecklist.map((bullet, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-emerald-950 flex items-start gap-2 font-sans font-medium leading-relaxed"
                      >
                        <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

          </div>

          {/* ========================================================================= */}
          {/* FOOTER ACTION BAR                                                         */}
          {/* ========================================================================= */}
          <div className="p-4 sm:px-6 sm:py-4 bg-white border-t-2 border-slate-200 flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              href={currentCase.ctaUrl}
              onClick={() => {
                if (onCtaClick) onCtaClick();
                onClose();
              }}
              className="w-full sm:flex-1 bg-[#FF6B00] hover:bg-[#fa5a00] text-white font-black py-3.5 px-6 rounded-xl border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[5px_5px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#000] transition-all text-center text-xs sm:text-sm uppercase tracking-wider font-sans flex items-center justify-center gap-2 cursor-pointer"
            >
              {currentCase.ctaText}
            </Link>

            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto bg-white hover:bg-slate-100 text-slate-800 font-bold py-3.5 px-6 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] cursor-pointer text-xs sm:text-sm font-sans"
            >
              TUTUP
            </button>
          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  );
}
