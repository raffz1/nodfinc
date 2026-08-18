"use client";

import React, { useState, useEffect, useRef, useCallback, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  XCircle,
  CheckCircle2,
  ArrowRight,
  Shield,
  Volume2,
  VolumeX,
  Zap,
  Flame,
  Gamepad2,
  Wallet,
  Camera,
  CameraOff,
  RotateCcw,
  Smile,
  AlertTriangle,
  Award,
  Check,
  X,
  Keyboard,
  Eye,
  Sparkles,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { GestureDetector } from "@/lib/gestureDetector";
import {
  ALL_SCENARIOS,
  getRandomScenarios,
  ScenarioCard,
  DecisionImpact,
} from "@/data/scenariosData";

// Types
type ModuleType = "pinjol" | "judol" | "budget";
type ViewState = "loading" | "case-select" | "simulation";

interface ModuleConfig {
  id: ModuleType;
  title: string;
  tag: string;
  badgeLabel: string;
  color: string;
  bgColor: string;
  icon: typeof Flame;
  initialCash: number;
  initialDebt: number;
}

const MODULE_CONFIGS: Record<ModuleType, ModuleConfig> = {
  pinjol: {
    id: "pinjol",
    title: "Jebakan Pinjol Ilegal",
    tag: "📌 RISIKO KRITIS",
    badgeLabel: "KASUS: PINJOL ILEGAL",
    color: "#FFA6C9",
    bgColor: "#FECDD3",
    icon: Flame,
    initialCash: 500000,
    initialDebt: 0,
  },
  judol: {
    id: "judol",
    title: "Judol Berkedok Game",
    tag: "📌 MANIPULASI DOPAMIN",
    badgeLabel: "KASUS: JUDOL GAME",
    color: "#C8B6FF",
    bgColor: "#DDD6FE",
    icon: Gamepad2,
    initialCash: 1000000,
    initialDebt: 0,
  },
  budget: {
    id: "budget",
    title: "Uang Saku & Paylater 30 Hari",
    tag: "📌 MANAJEMEN ANGGARAN",
    badgeLabel: "KASUS: PAYLATER",
    color: "#FF8C42",
    bgColor: "#A7F3D0",
    icon: Wallet,
    initialCash: 2000000,
    initialDebt: 0,
  },
};

function SimulationContent() {
  const searchParams = useSearchParams();
  const moduleParam = searchParams.get("module") as ModuleType | null;

  // 3-Step Navigation Flow State
  const [viewState, setViewState] = useState<ViewState>("loading");
  const [loadingMessageIndex, setLoadingMessageIndex] = useState<number>(0);

  // Selected module state
  const [currentModuleKey, setCurrentModuleKey] = useState<ModuleType>(
    moduleParam && MODULE_CONFIGS[moduleParam] ? moduleParam : "pinjol"
  );

  // Active sampled 5-card deck
  const [deck, setDeck] = useState<ScenarioCard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);

  // Financial Game State
  const [cash, setCash] = useState<number>(500000);
  const [debt, setDebt] = useState<number>(0);
  const [stress, setStress] = useState<number>(20);
  const [literacy, setLiteracy] = useState<number>(50);
  const [decisionHistory, setDecisionHistory] = useState<{
    scenario: string;
    action: "YES" | "NO";
    impact: DecisionImpact;
    safetyType: "safe" | "warning" | "fatal";
  }[]>([]);

  // Simulation status & Card swipe animation state
  const [cardAnimation, setCardAnimation] = useState<"idle" | "swipe-left" | "swipe-right" | "entering">("idle");
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [gameOverReason, setGameOverReason] = useState<string>("");
  const [lastFeedback, setLastFeedback] = useState<{
    text: string;
    type: "positive" | "negative";
    deltaCash: number;
    deltaDebt: number;
    deltaStress: number;
    deltaLiteracy: number;
  } | null>(null);

  // Floating Floater Badges for +/- metrics
  const [floaters, setFloaters] = useState<{
    id: number;
    cashDelta?: number;
    debtDelta?: number;
    stressDelta?: number;
    literacyDelta?: number;
  } | null>(null);

  // Screen Edge Vignette Flash Effect
  const [screenVignette, setScreenVignette] = useState<"safe" | "danger" | null>(null);
  const [screenShake, setScreenShake] = useState<boolean>(false);

  // Audio state
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);

  // Input Mode: "gesture" or "manual"
  const [inputMode, setInputMode] = useState<"gesture" | "manual">("gesture");

  // Webcam & Gesture Detection States
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [gestureStatus, setGestureStatus] = useState<string>("🟢 Siap Membaca Gerakan");
  const [rotationMetrics, setRotationMetrics] = useState<{
    yaw: number;
    pitch: number;
    deltaYaw: number;
    deltaPitch: number;
    nodProgress: number;
    shakeProgress: number;
  }>({ yaw: 1.0, pitch: 1.25, deltaYaw: 0, deltaPitch: 0, nodProgress: 0, shakeProgress: 0 });
  const [ringEffect, setRingEffect] = useState<"yes" | "no" | null>(null);
  const [isCooldown, setIsCooldown] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mobileVideoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const detectorRef = useRef<GestureDetector>(new GestureDetector());
  const isCooldownRef = useRef<boolean>(false);

  const loadingMessages = [
    "Menyiapkan pendeteksi insting finansialmu...",
    "Memanaskan kamera AI...",
    "Siap-siap pasang wajah waspada! 🧐",
  ];

  // Step 1: Auto-advance after exactly 2000ms
  useEffect(() => {
    if (viewState === "loading") {
      const msgInterval = setInterval(() => {
        setLoadingMessageIndex((prev) => (prev + 1) % loadingMessages.length);
      }, 650);

      const timer = setTimeout(() => {
        clearInterval(msgInterval);
        setViewState("case-select");
      }, 2000);

      return () => {
        clearInterval(msgInterval);
        clearTimeout(timer);
      };
    }
  }, [viewState]);

  // Keep isCooldownRef synchronized with state
  useEffect(() => {
    isCooldownRef.current = isCooldown;
    detectorRef.current.setLock(isCooldown);
  }, [isCooldown]);

  // Sound Synthesizer (100% safe Web Audio API)
  const playSound = useCallback((type: "click" | "nod" | "shake" | "win" | "lose") => {
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
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } else if (type === "nod") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(523, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(784, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === "shake") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(280, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(140, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === "win") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(523, ctx.currentTime);
        osc.frequency.setValueAtTime(659, ctx.currentTime + 0.1);
        osc.frequency.setValueAtTime(784, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      } else if (type === "lose") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(120, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      }
    } catch {
      // Audio fallback
    }
  }, [audioEnabled]);

  // Initialize selected module and sample 5 random cards from the pool of 20+
  const initializeModule = (key: ModuleType) => {
    setCurrentModuleKey(key);
    const config = MODULE_CONFIGS[key];
    const sampledCards = getRandomScenarios(key, 5);
    setDeck(sampledCards);
    setCash(config.initialCash);
    setDebt(config.initialDebt);
    setStress(20);
    setLiteracy(50);
    setCurrentCardIndex(0);
    setDecisionHistory([]);
    setIsGameOver(false);
    setGameOverReason("");
    setLastFeedback(null);
    setFloaters(null);
    setScreenVignette(null);
    setCardAnimation("idle");
    detectorRef.current.reset();
    playSound("click");
  };

  const selectCaseAndStart = (key: ModuleType) => {
    initializeModule(key);
    setViewState("simulation");
  };

  const currentModule = MODULE_CONFIGS[currentModuleKey];
  const currentCard = deck[currentCardIndex];

  // Handle Decision Logic with Instant Swipe & 1.2s Cooldown
  const handleDecision = useCallback(
    (action: "YES" | "NO") => {
      if (isCooldownRef.current || isGameOver || !currentCard || viewState !== "simulation") return;

      const impact = action === "YES" ? currentCard.yes : currentCard.no;
      const isPositive = impact.literacy >= 0 && impact.stress <= 10 && impact.debt <= 0;

      // Determine safety classification
      let safetyType: "safe" | "warning" | "fatal" = "safe";
      if (impact.literacy < -20 || impact.stress >= 30 || impact.debt >= 2000000) {
        safetyType = "fatal";
      } else if (impact.literacy < 0 || impact.stress > 10 || impact.debt > 0) {
        safetyType = "warning";
      }

      // Lock cooldown immediately
      isCooldownRef.current = true;
      setIsCooldown(true);
      detectorRef.current.setLock(true);

      // Flash camera animated ring
      setRingEffect(action === "YES" ? "yes" : "no");

      // Full-screen Screen Edge Feedback Vignette
      if (isPositive) {
        setScreenVignette("safe");
      } else {
        setScreenVignette("danger");
        setScreenShake(true);
        setTimeout(() => setScreenShake(false), 400);
      }
      setTimeout(() => setScreenVignette(null), 600);

      // Trigger Card Swipe Animation (-10deg left for Tolak, +10deg right for Terima)
      setCardAnimation(action === "YES" ? "swipe-right" : "swipe-left");

      // Play Audio Feedback
      if (action === "YES") playSound("nod");
      else playSound("shake");

      // Update Financial Metrics
      const nextCash = Math.max(0, cash + impact.cash);
      const nextDebt = Math.max(0, debt + impact.debt);
      const nextStress = Math.min(100, Math.max(0, stress + impact.stress));
      const nextLiteracy = Math.min(100, Math.max(0, literacy + impact.literacy));

      setCash(nextCash);
      setDebt(nextDebt);
      setStress(nextStress);
      setLiteracy(nextLiteracy);

      // Floating indicator badge
      setFloaters({
        id: Date.now(),
        cashDelta: impact.cash,
        debtDelta: impact.debt,
        stressDelta: impact.stress,
        literacyDelta: impact.literacy,
      });

      setDecisionHistory((prev) => [
        ...prev,
        { scenario: currentCard.scenario, action, impact, safetyType },
      ]);

      setLastFeedback({
        text: impact.feedback,
        type: isPositive ? "positive" : "negative",
        deltaCash: impact.cash,
        deltaDebt: impact.debt,
        deltaStress: impact.stress,
        deltaLiteracy: impact.literacy,
      });

      // Advance card after 320ms transition
      setTimeout(() => {
        if (nextStress >= 100) {
          setIsGameOver(true);
          setGameOverReason("Tingkat stresmu mencapai 100%! Kamu mengalami kelelahan mental akibat tekanan finansial.");
          playSound("lose");
        } else if (currentCardIndex + 1 >= deck.length) {
          setIsGameOver(true);
          setGameOverReason("Simulasi Selesai! Kamu telah menyelesaikan seluruh 5 skenario kasus finansial.");
          playSound("win");
        } else {
          setCurrentCardIndex((prev) => prev + 1);
          setCardAnimation("entering");
          setTimeout(() => setCardAnimation("idle"), 50);
        }

        // Release cooldown lock after 1200ms total
        setTimeout(() => {
          isCooldownRef.current = false;
          setIsCooldown(false);
          setRingEffect(null);
          detectorRef.current.setLock(false);
          setLastFeedback(null);
          setFloaters(null);
        }, 880);
      }, 320);
    },
    [isGameOver, currentCard, cash, debt, stress, literacy, currentCardIndex, deck.length, playSound, viewState]
  );

  // Keyboard navigation fallback
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewState !== "simulation" || isGameOver || isCooldownRef.current) return;
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        handleDecision("NO");
      } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        handleDecision("YES");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [viewState, isGameOver, handleDecision]);

  // Webcam Setup
  useEffect(() => {
    if (viewState !== "simulation") return;

    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 320, height: 240, facingMode: "user" },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
        if (mobileVideoRef.current) {
          mobileVideoRef.current.srcObject = stream;
          await mobileVideoRef.current.play();
        }
        setCameraActive(true);
        setCameraError(null);
      } catch (err) {
        console.error("Camera access error:", err);
        setCameraError("Kamera tidak aktif. Mode tombol & keyboard tetap berfungsi penuh.");
        setCameraActive(false);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [viewState]);

  // Real-Time Gesture Processing Loop via GestureDetector
  useEffect(() => {
    if (!cameraActive || isGameOver || viewState !== "simulation" || inputMode !== "gesture") return;

    const loop = () => {
      const video = videoRef.current || mobileVideoRef.current;
      const canvas = canvasRef.current;

      if (video && canvas && video.readyState >= 2) {
        const result = detectorRef.current.processFrame(video, canvas);
        setGestureStatus(result.statusText);
        setRotationMetrics({
          yaw: result.yawRatio,
          pitch: result.pitchRatio,
          deltaYaw: result.deltaYaw,
          deltaPitch: result.deltaPitch,
          nodProgress: result.nodProgress,
          shakeProgress: result.shakeProgress,
        });

        if (result.detected === "NOD" && !isCooldownRef.current) {
          handleDecision("YES");
        } else if (result.detected === "SHAKE" && !isCooldownRef.current) {
          handleDecision("NO");
        }
      }

      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    animFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [cameraActive, isGameOver, viewState, inputMode, handleDecision]);

  // Currency Formatter
  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Stress badge helper
  const getStressBadge = (val: number) => {
    if (val < 35) return { text: "TENANG", emoji: "😌", color: "bg-emerald-100 text-emerald-800 border-emerald-400" };
    if (val < 70) return { text: "WASPADA", emoji: "😟", color: "bg-amber-100 text-amber-800 border-amber-400" };
    return { text: "PANIK", emoji: "🤯", color: "bg-rose-100 text-rose-800 border-rose-500 animate-pulse" };
  };

  // Literacy Grade
  const getLiteracyGrade = () => {
    if (literacy >= 80) return { title: "Pawang Finansial Tangguh", badge: "🛡️ PAWANG FINANSIAL TANGGUH", color: "#0EB574", tagColor: "bg-emerald-500" };
    if (literacy >= 50) return { title: "Rawan Terpengaruh", badge: "⚠️ RAWAN TERPENGARUH", color: "#FF8C42", tagColor: "bg-amber-500" };
    return { title: "Korban Manipulasi Digital", badge: "🔴 KORBAN MANIPULASI DIGITAL", color: "#FF5F56", tagColor: "bg-rose-600" };
  };

  return (
    <div className={`w-full min-h-screen bg-[#0F1115] text-[#1E1E1E] flex flex-col items-center selection:bg-[#FFA6C9] relative overflow-x-hidden ${
      screenShake ? "animate-wiggle" : ""
    }`}>
      
      {/* Screen Edge Feedback Vignette Flash */}
      {screenVignette === "safe" && (
        <div className="fixed inset-0 pointer-events-none z-50 transition-all duration-300 shadow-[inset_0_0_50px_12px_rgba(16,185,129,0.85)] border-4 sm:border-8 border-emerald-500/80" />
      )}
      {screenVignette === "danger" && (
        <div className="fixed inset-0 pointer-events-none z-50 transition-all duration-300 shadow-[inset_0_0_55px_15px_rgba(239,68,68,0.9)] border-4 sm:border-8 border-rose-500/85" />
      )}

      {/* Hidden Canvas for Optical Image Processing */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Background Animated Glowing Blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10 select-none">
        <div className="absolute -top-20 -left-20 w-96 sm:w-[32rem] h-96 sm:h-[32rem] bg-pink-500/15 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-1/4 -right-24 w-[24rem] sm:w-[32rem] h-[24rem] sm:h-[32rem] bg-indigo-500/15 rounded-full blur-3xl animate-float-reverse" />
        <div className="absolute -bottom-24 -left-20 w-80 sm:w-[28rem] h-80 sm:h-[28rem] bg-orange-500/15 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute -bottom-20 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-emerald-500/10 rounded-full blur-3xl animate-float-reverse" />
      </div>

      <AnimatePresence mode="wait">
        
        {/* ========================================================================= */}
        {/* STEP 1: PLAYFUL NEO-BRUTALISM LOADING SCREEN (2 SECONDS)                  */}
        {/* ========================================================================= */}
        {viewState === "loading" && (
          <motion.div
            key="step-loading"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[#FEF08A] flex flex-col items-center justify-center p-4"
          >
            <div className="bg-white border-3 border-black rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_#000] flex flex-col items-center gap-5 max-w-sm w-full text-center">
              
              {/* Bouncing Mascot Icon */}
              <motion.div
                animate={{
                  rotate: [-10, 10, -10],
                  y: [-6, 6, -6],
                  scale: [0.98, 1.04, 0.98],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.4,
                  ease: "easeInOut",
                }}
                className="w-20 h-20 rounded-full bg-[#FF8C42] border-3 border-black flex items-center justify-center shadow-[4px_4px_0px_#000]"
              >
                <Smile className="w-10 h-10 text-white stroke-[2.5]" />
              </motion.div>

              {/* Title & Playful Status Text */}
              <div>
                <h2 className="text-xl sm:text-2xl font-sans font-black tracking-tight text-black mb-1">
                  Menyiapkan Simulator...
                </h2>
                <p className="text-xs sm:text-sm font-medium text-gray-700 h-10 flex items-center justify-center px-2">
                  {loadingMessages[loadingMessageIndex]}
                </p>
              </div>

              {/* Neo-Brutalist Striped Progress Bar (Fills 0% -> 100% in 2s) */}
              <div className="w-full h-5 bg-gray-100 rounded-full border-2 border-black overflow-hidden p-0.5 shadow-inner">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="h-full bg-[#FF6B4A] rounded-full"
                />
              </div>

              <span className="text-[11px] font-mono font-bold text-gray-500">
                ⚡ Menginisialisasi AI Vision...
              </span>

            </div>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: CASE SELECTION SCREEN (CaseSelectionView)                         */}
        {/* ========================================================================= */}
        {viewState === "case-select" && (
          <motion.div
            key="step-case-select"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 180 }}
            className="w-full max-w-5xl mx-auto px-4 sm:px-8 py-10 sm:py-16 flex flex-col items-center z-10"
          >
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-[#FFE17D] text-black px-4 py-1.5 rounded-full text-xs font-mono font-black border-2 border-black uppercase shadow-[3px_3px_0px_#000] mb-4">
                <Zap className="w-4 h-4 fill-black" />
                PILIH MEDAN SIMULASI
              </div>
              <h1 className="text-3xl sm:text-5xl font-sans font-black text-white tracking-tight mb-3">
                Pilih Skenario Kasus Finansial
              </h1>
              <p className="text-sm sm:text-base text-gray-300 max-w-lg mx-auto font-medium">
                Pilih salah satu jebakan yang ingin kamu hadapi hari ini untuk menguji refleks angguk &amp; geleng kepalamu.
              </p>
            </div>

            {/* 3 Interactive Neo-Brutalism Case Cards */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {(Object.keys(MODULE_CONFIGS) as ModuleType[]).map((key) => {
                const item = MODULE_CONFIGS[key];
                const Icon = item.icon;
                const sampleDeck = ALL_SCENARIOS[key];

                return (
                  <motion.div
                    key={key}
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    style={{ backgroundColor: item.bgColor }}
                    className="p-6 sm:p-7 rounded-3xl border-3 border-black shadow-[6px_6px_0px_#000] flex flex-col justify-between text-left relative overflow-hidden"
                  >
                    <div>
                      {/* Risk Level Badge */}
                      <span className="inline-block bg-black text-white text-[10px] font-mono font-black uppercase px-3 py-1 rounded-full mb-4 shadow-sm">
                        {item.tag}
                      </span>

                      {/* Icon */}
                      <div className="w-14 h-14 rounded-2xl bg-white border-2.5 border-black flex items-center justify-center text-black shadow-[3px_3px_0px_#000] mb-4">
                        <Icon className="w-7 h-7" />
                      </div>

                      {/* Title & Teaser */}
                      <h3 className="text-xl sm:text-2xl font-sans font-black text-black leading-tight mb-2">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-800 font-medium leading-relaxed font-sans mb-6">
                        {sampleDeck[0]?.scenario.slice(0, 110)}...
                      </p>
                    </div>

                    {/* Action Button */}
                    <button
                      type="button"
                      onClick={() => selectCaseAndStart(key)}
                      className="w-full bg-black hover:bg-zinc-800 text-white py-3.5 px-5 rounded-2xl border-2 border-black text-xs font-black tracking-wider uppercase shadow-[3px_3px_0px_#fff] hover:shadow-[5px_5px_0px_#fff] active:translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer font-sans"
                    >
                      Gas. Mulai kasus ini
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                );
              })}
            </div>

            {/* Back to Home Link */}
            <Link
              href="/"
              className="text-xs font-mono font-bold text-gray-400 hover:text-white underline transition-colors"
            >
              ← Kembali ke Beranda
            </Link>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* STEP 3: GESTURE SIMULATION PAGE (GestureSimulationView)                   */}
        {/* ========================================================================= */}
        {viewState === "simulation" && (
          <motion.div
            key="step-simulation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full flex flex-col flex-1"
          >
            
            {/* 1. STICKY TOP UNIFIED CONTAINER: NAVBAR + 4 STATUS BARS */}
            <div className="w-full sticky top-0 z-40 bg-[#0F1115]/95 backdrop-blur-md border-b-2.5 border-black shadow-lg">
              
              {/* Navbar */}
              <header className="w-full bg-white border-b-2 border-black/20 text-[#111111]">
                <div className="max-w-7xl mx-auto px-4 sm:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-3">
                  
                  {/* Logo Nodfinc */}
                  <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-1.5 group">
                      <Smile className="w-6 h-6 text-[#FF6B4A] group-hover:rotate-12 transition-transform" />
                      <span className="font-sans font-black text-xl sm:text-2xl tracking-tight">
                        <span className="text-[#FF6B4A]">Nod</span>
                        <span className="text-[#111111]">finc</span>
                        <span className="text-[#FF6B4A]">.</span>
                      </span>
                    </Link>
                  </div>

                  {/* Case Switcher & Audio Toggle */}
                  <div className="flex items-center gap-2 sm:gap-3">
                    <button
                      type="button"
                      onClick={() => setViewState("case-select")}
                      className="bg-[#FFE17D] hover:bg-[#fed653] text-[#111111] text-[11px] sm:text-xs font-mono font-black px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:shadow-[3px_3px_0px_0px_#000] hover:-translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer max-w-[210px] sm:max-w-none truncate"
                    >
                      <span className="truncate">{currentModule.badgeLabel}</span>
                      <span className="text-[10px] text-gray-700 underline font-sans font-bold hidden sm:inline">Ganti Kasus</span>
                    </button>

                    {/* Audio Toggle */}
                    <button
                      type="button"
                      onClick={() => setAudioEnabled(!audioEnabled)}
                      className="p-1.5 sm:p-2 rounded-xl bg-gray-100 hover:bg-gray-200 border-2 border-black text-black transition-all cursor-pointer shadow-[2px_2px_0px_0px_#000]"
                      title={audioEnabled ? "Matikan Audio" : "Aktifkan Audio"}
                    >
                      {audioEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-rose-600" />}
                    </button>
                  </div>

                </div>
              </header>

              {/* 4 Status Bars Grid */}
              <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-2.5">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                  
                  {/* Card 1: Saldo Kas */}
                  <div className="bg-white p-2.5 sm:p-3.5 rounded-xl border-2 md:border-3 border-black shadow-[3px_3px_0px_#000] flex flex-col justify-between relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] sm:text-[11px] font-mono font-bold text-gray-500 uppercase tracking-wider">
                        💵 SALDO KAS
                      </span>
                      {floaters && floaters.cashDelta !== undefined && floaters.cashDelta !== 0 && (
                        <motion.span
                          initial={{ opacity: 0, y: 10, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10 }}
                          className={`text-[10px] sm:text-xs font-mono font-black ${
                            floaters.cashDelta > 0 ? "text-emerald-600" : "text-rose-600"
                          }`}
                        >
                          {floaters.cashDelta > 0 ? "+" : ""}{formatRupiah(floaters.cashDelta)}
                        </motion.span>
                      )}
                    </div>
                    <p className="text-base sm:text-lg md:text-xl font-sans font-black text-emerald-600 tracking-tight mt-0.5">
                      {formatRupiah(cash)}
                    </p>
                  </div>

                  {/* Card 2: Beban Utang */}
                  <div className="bg-white p-2.5 sm:p-3.5 rounded-xl border-2 md:border-3 border-black shadow-[3px_3px_0px_#000] flex flex-col justify-between relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] sm:text-[11px] font-mono font-bold text-gray-500 uppercase tracking-wider">
                        💳 BEBAN UTANG
                      </span>
                      {floaters && floaters.debtDelta !== undefined && floaters.debtDelta > 0 && (
                        <motion.span
                          initial={{ opacity: 0, y: 10, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-[10px] sm:text-xs font-mono font-black text-rose-600"
                        >
                          +{formatRupiah(floaters.debtDelta)}
                        </motion.span>
                      )}
                    </div>
                    <p className={`text-base sm:text-lg md:text-xl font-sans font-black tracking-tight mt-0.5 ${
                      debt > 0 ? "text-rose-600 font-extrabold" : "text-slate-800"
                    }`}>
                      {formatRupiah(debt)}
                    </p>
                  </div>

                  {/* Card 3: Tingkat Stres */}
                  <div className="bg-white p-2.5 sm:p-3.5 rounded-xl border-2 md:border-3 border-black shadow-[3px_3px_0px_#000] flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] sm:text-[11px] font-mono font-bold text-gray-500 uppercase tracking-wider">
                        🧠 STRES
                      </span>
                      <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-black border ${getStressBadge(stress).color}`}>
                        {getStressBadge(stress).emoji} {getStressBadge(stress).text}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-base sm:text-lg md:text-xl font-sans font-black text-[#111111]">
                        {stress}%
                      </span>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full border border-black overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${
                            stress > 70 ? "bg-rose-500" : stress > 35 ? "bg-amber-400" : "bg-emerald-400"
                          }`}
                          style={{ width: `${stress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card 4: Skor Literasi */}
                  <div className="bg-white p-2.5 sm:p-3.5 rounded-xl border-2 md:border-3 border-black shadow-[3px_3px_0px_#000] flex flex-col justify-between relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] sm:text-[11px] font-mono font-bold text-gray-500 uppercase tracking-wider">
                        📈 LITERASI
                      </span>
                      {floaters && floaters.literacyDelta !== undefined && floaters.literacyDelta !== 0 && (
                        <motion.span
                          initial={{ opacity: 0, y: 10, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10 }}
                          className={`text-[10px] sm:text-xs font-mono font-black ${
                            floaters.literacyDelta > 0 ? "text-emerald-600" : "text-rose-600"
                          }`}
                        >
                          {floaters.literacyDelta > 0 ? `+${floaters.literacyDelta}` : floaters.literacyDelta} Poin
                        </motion.span>
                      )}
                    </div>
                    <p className="text-base sm:text-lg md:text-xl font-sans font-black text-[#FF6B4A] tracking-tight mt-0.5">
                      {literacy} <span className="text-xs text-gray-500 font-bold">/ 100 Poin</span>
                    </p>
                  </div>

                </div>
              </div>

            </div>

            {/* 2. MAIN SIMULATION CANVAS */}
            <main className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-5 sm:py-8 flex-1 flex flex-col justify-center relative z-10">
              
              {/* MOBILE VIEW ONLY: COMPACT CAMERA HUD BANNER POSITIONED CLEANLY ABOVE CARD */}
              <div className="md:hidden w-full bg-white border-2 border-black rounded-2xl p-2.5 shadow-[4px_4px_0px_#000] mb-4 flex items-center gap-3">
                <div className={`w-20 h-16 rounded-xl overflow-hidden border-2 flex-shrink-0 relative bg-black ${
                  ringEffect === "yes" ? "border-emerald-500 ring-2 ring-emerald-400" : ringEffect === "no" ? "border-rose-500 ring-2 ring-rose-400" : "border-black"
                }`}>
                  <video
                    ref={mobileVideoRef}
                    playsInline
                    muted
                    className="w-full h-full object-cover transform -scale-x-100"
                  />
                  {!cameraActive && (
                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 text-white">
                      <CameraOff className="w-4 h-4 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping shrink-0" />
                    <span className="text-[10px] font-mono font-black text-black uppercase">AI VISION HUD</span>
                  </div>
                  <span className={`text-[10px] font-mono font-black px-2 py-0.5 rounded-full border border-black block truncate ${
                    isCooldown
                      ? "bg-amber-100 text-amber-900"
                      : gestureStatus.includes("Geleng")
                      ? "bg-rose-100 text-rose-800"
                      : gestureStatus.includes("Angguk")
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-gray-100 text-gray-800"
                  }`}>
                    {gestureStatus}
                  </span>
                  <div className="flex items-center gap-2 text-[8px] font-mono text-gray-500 mt-1">
                    <span>Geleng: Δ{rotationMetrics.deltaYaw.toFixed(2)}</span>
                    <span>•</span>
                    <span>Angguk: Δ{rotationMetrics.deltaPitch.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* DESKTOP & MOBILE GRID LAYOUT */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
                
                {/* COLUMN LEFT: KARTU DILEMA SKENARIO DENGAN SWIPE ANIMASI */}
                <div className="md:col-span-7 lg:col-span-8 flex flex-col gap-4">
                  
                  <div
                    className={`rounded-2xl sm:rounded-3xl border-3 border-black p-5 sm:p-8 bg-white shadow-[6px_6px_0px_0px_#000] relative flex flex-col justify-between min-h-[340px] sm:min-h-[420px] transform transition-all duration-300 ease-out ${
                      cardAnimation === "swipe-left"
                        ? "-translate-x-[115%] -rotate-[10deg] opacity-0 pointer-events-none"
                        : cardAnimation === "swipe-right"
                        ? "translate-x-[115%] rotate-[10deg] opacity-0 pointer-events-none"
                        : cardAnimation === "entering"
                        ? "scale-95 opacity-0"
                        : "translate-x-0 rotate-0 scale-100 opacity-100"
                    }`}
                  >
                    {/* Top Card Badge & Step Indicator */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span
                        style={{ backgroundColor: currentModule.color }}
                        className="text-xs font-mono font-black text-black px-3.5 py-1 rounded-full border-2 border-black uppercase shadow-[2px_2px_0px_0px_#000]"
                      >
                        [ {currentCard?.category || "Skenario Kasus"} ]
                      </span>

                      <div className="flex items-center gap-1.5 text-xs font-mono font-black text-gray-800 bg-gray-100 px-3 py-1 rounded-full border-2 border-black">
                        <span>KARTU</span>
                        <span className="text-[#FF6B4A] text-sm font-black">{currentCardIndex + 1}</span>
                        <span>/</span>
                        <span>{deck.length}</span>
                      </div>
                    </div>

                    {/* Scenario Narrative Question */}
                    <div className="my-auto py-2 sm:py-4">
                      <h3 className="text-lg sm:text-2xl md:text-3xl font-sans font-extrabold text-slate-900 leading-snug tracking-tight">
                        {currentCard?.scenario}
                      </h3>
                    </div>

                    {/* Instant Decision Feedback Pop-up */}
                    {lastFeedback && (
                      <div
                        className={`p-3.5 rounded-xl border-2.5 border-black my-3 shadow-[3px_3px_0px_0px_#000] animate-fadeIn ${
                          lastFeedback.type === "positive" ? "bg-emerald-100 text-emerald-950" : "bg-rose-100 text-rose-950"
                        }`}
                      >
                        <p className="text-xs sm:text-sm font-bold leading-relaxed">{lastFeedback.text}</p>
                      </div>
                    )}

                    {/* Action Buttons (Split 50/50) */}
                    <div className="pt-4 border-t-2.5 border-black/10 grid grid-cols-2 gap-3 sm:gap-4 items-center">
                      
                      {/* Button TOLAK (Geleng) */}
                      <button
                        type="button"
                        disabled={isCooldown || isGameOver}
                        onClick={() => handleDecision("NO")}
                        className="w-full bg-rose-100 hover:bg-rose-200 text-rose-950 py-3 sm:py-4 px-3 sm:px-4 rounded-xl sm:rounded-2xl border-2.5 border-black shadow-[3px_3px_0px_0px_#000] hover:shadow-[5px_5px_0px_0px_#000] active:translate-y-[2px] transition-all flex items-center justify-center gap-2 cursor-pointer group disabled:opacity-50"
                      >
                        <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-rose-600 group-hover:rotate-12 transition-transform shrink-0" />
                        <div className="text-left">
                          <span className="text-[9px] sm:text-[10px] font-mono font-black text-rose-700 block uppercase">
                            [← / GELENG]
                          </span>
                          <span className="text-xs sm:text-sm font-black text-black uppercase tracking-wide">
                            TOLAK
                          </span>
                        </div>
                      </button>

                      {/* Button TERIMA (Angguk) */}
                      <button
                        type="button"
                        disabled={isCooldown || isGameOver}
                        onClick={() => handleDecision("YES")}
                        className="w-full bg-emerald-100 hover:bg-emerald-200 text-emerald-950 py-3 sm:py-4 px-3 sm:px-4 rounded-xl sm:rounded-2xl border-2.5 border-black shadow-[3px_3px_0px_0px_#000] hover:shadow-[5px_5px_0px_0px_#000] active:translate-y-[2px] transition-all flex items-center justify-center gap-2 cursor-pointer group disabled:opacity-50"
                      >
                        <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 group-hover:scale-110 transition-transform shrink-0" />
                        <div className="text-left">
                          <span className="text-[9px] sm:text-[10px] font-mono font-black text-emerald-700 block uppercase">
                            [→ / ANGGUK]
                          </span>
                          <span className="text-xs sm:text-sm font-black text-black uppercase tracking-wide">
                            TERIMA
                          </span>
                        </div>
                      </button>

                    </div>

                  </div>

                </div>

                {/* COLUMN RIGHT: DESKTOP ARCADE AI VISION HUD */}
                <div className="hidden md:flex md:col-span-5 lg:col-span-4 flex-col gap-4">
                  <div className="bg-[#FAF9F6] rounded-2xl border-3 border-black p-5 shadow-[5px_5px_0px_#000] flex flex-col items-center">
                    
                    {/* Header Webcam HUD */}
                    <div className="w-full flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping shrink-0" />
                        <span className="text-xs font-mono font-black text-[#111111] uppercase tracking-wider">
                          AI VISION HUD
                        </span>
                      </div>

                      <span className="text-[10px] font-mono font-bold text-gray-700 bg-gray-200 px-2.5 py-0.5 rounded-full border border-black/20">
                        {isCooldown ? "⏳ Terkunci" : "Real-time"}
                      </span>
                    </div>

                    {/* Video Feed Viewport with Arcade Corners */}
                    <div
                      className={`w-full aspect-[4/3] bg-black rounded-xl border-3 relative overflow-hidden flex items-center justify-center shadow-inner transition-all duration-200 ${
                        ringEffect === "yes"
                          ? "border-emerald-500 ring-4 ring-emerald-400"
                          : ringEffect === "no"
                          ? "border-rose-500 ring-4 ring-rose-400"
                          : "border-black"
                      }`}
                    >
                      <video
                        ref={videoRef}
                        playsInline
                        muted
                        className="w-full h-full object-cover transform -scale-x-100"
                      />

                      {ringEffect === "yes" && (
                        <div className="absolute inset-0 bg-emerald-500/30 flex items-center justify-center animate-fadeIn pointer-events-none">
                          <span className="bg-emerald-500 text-white font-mono font-black text-xs px-3 py-1.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                            ✓ ANGGUK (TERIMA)
                          </span>
                        </div>
                      )}
                      {ringEffect === "no" && (
                        <div className="absolute inset-0 bg-rose-500/30 flex items-center justify-center animate-fadeIn pointer-events-none">
                          <span className="bg-rose-500 text-white font-mono font-black text-xs px-3 py-1.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                            ✕ GELENG (TOLAK)
                          </span>
                        </div>
                      )}

                      {/* Arcade Target Corners */}
                      <div className="absolute inset-3 border border-white/20 rounded-lg pointer-events-none flex flex-col justify-between p-1.5">
                        <div className="flex justify-between">
                          <span className="w-3 h-3 border-t-2 border-l-2 border-emerald-400" />
                          <span className="w-3 h-3 border-t-2 border-r-2 border-emerald-400" />
                        </div>
                        <div className="flex justify-between">
                          <span className="w-3 h-3 border-b-2 border-l-2 border-emerald-400" />
                          <span className="w-3 h-3 border-b-2 border-r-2 border-emerald-400" />
                        </div>
                      </div>

                      {!cameraActive && (
                        <div className="absolute inset-0 bg-zinc-900/95 flex flex-col items-center justify-center p-3 text-center text-white">
                          <CameraOff className="w-8 h-8 text-gray-400 mb-1" />
                          <p className="text-[10px] font-mono text-gray-300">
                            {cameraError || "Mengaktifkan kamera..."}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Status Indicator Text */}
                    <div className="w-full mt-3 flex flex-col gap-1.5 text-center">
                      <span className={`text-xs font-mono font-black px-2.5 py-1.5 rounded-xl border-2 border-black block truncate shadow-[2px_2px_0px_#000] ${
                        isCooldown
                          ? "bg-amber-100 text-amber-900"
                          : gestureStatus.includes("Geleng")
                          ? "bg-rose-100 text-rose-800 animate-pulse"
                          : gestureStatus.includes("Angguk")
                          ? "bg-emerald-100 text-emerald-800 animate-pulse"
                          : "bg-white text-gray-800"
                      }`}>
                        {gestureStatus}
                      </span>

                      {/* Dynamic Telemetry */}
                      <div className="flex items-center justify-between gap-1.5 text-[9px] font-mono font-bold text-gray-700 bg-white px-2.5 py-1.5 rounded-lg border border-black/20 shadow-sm">
                        <span className={`${Math.abs(rotationMetrics.deltaYaw) > 0.090 ? "text-rose-600 font-black" : "text-gray-700"}`}>
                          Geleng: Δ{rotationMetrics.deltaYaw >= 0 ? "+" : ""}{rotationMetrics.deltaYaw.toFixed(3)}
                        </span>
                        <span className="text-gray-300">|</span>
                        <span className={`${rotationMetrics.deltaPitch > 0.160 ? "text-emerald-600 font-black" : "text-gray-700"}`}>
                          Angguk: Δ{rotationMetrics.deltaPitch >= 0 ? "+" : ""}{rotationMetrics.deltaPitch.toFixed(3)}
                        </span>
                      </div>
                    </div>

                    {/* Mode Toggle Controls */}
                    <div className="w-full mt-3 flex items-center gap-1.5 p-1 bg-gray-200 rounded-xl border-2 border-black">
                      <button
                        type="button"
                        onClick={() => setInputMode("gesture")}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-mono font-black transition-all flex items-center justify-center gap-1 cursor-pointer ${
                          inputMode === "gesture"
                            ? "bg-white text-black border-2 border-black shadow-[2px_2px_0px_0px_#000]"
                            : "text-gray-600 hover:text-black"
                        }`}
                      >
                        <Eye className="w-3 h-3 text-[#FF6B4A]" />
                        Gestur AI
                      </button>

                      <button
                        type="button"
                        onClick={() => setInputMode("manual")}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-mono font-black transition-all flex items-center justify-center gap-1 cursor-pointer ${
                          inputMode === "manual"
                            ? "bg-white text-black border-2 border-black shadow-[2px_2px_0px_0px_#000]"
                            : "text-gray-600 hover:text-black"
                        }`}
                      >
                        <Keyboard className="w-3 h-3 text-blue-600" />
                        Keyboard
                      </button>
                    </div>

                  </div>
                </div>

              </div>

            </main>

            {/* MODAL EVALUASI AKHIR / RESULT MODAL VIEW */}
            {isGameOver && (
              <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md overflow-y-auto p-4 sm:p-6 flex justify-center items-start sm:items-center">
                <div className="relative w-full max-w-2xl md:max-w-3xl bg-[#FAF9F6] border-3 border-black rounded-3xl p-5 sm:p-8 shadow-[8px_8px_0px_#000] my-auto flex flex-col gap-4 sm:gap-5 max-h-[90vh] overflow-y-auto animate-fadeIn">
                  
                  {/* Top Header & Persona Badge */}
                  <div className="text-center pb-4 border-b-2.5 border-black/15 shrink-0">
                    <div className="w-full flex justify-center pt-1 mb-2.5">
                      <div
                        style={{ backgroundColor: getLiteracyGrade().color }}
                        className="border-2 border-black text-white px-4 py-1.5 rounded-full text-xs font-mono font-black uppercase shadow-[2px_2px_0px_#000]"
                      >
                        {getLiteracyGrade().badge}
                      </div>
                    </div>
                    
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-black text-[#111111] leading-tight">
                      {getLiteracyGrade().title}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1.5 max-w-lg mx-auto font-medium font-sans">
                      {gameOverReason}
                    </p>
                  </div>

                  {/* 4 Final Metric Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 shrink-0">
                    <div className="bg-white p-3 sm:p-3.5 rounded-xl border-2 border-black text-center shadow-[2px_2px_0px_#000]">
                      <span className="text-[10px] font-mono font-black text-gray-500 uppercase">SISA KAS</span>
                      <p className="text-base sm:text-lg font-black text-emerald-600 mt-0.5">{formatRupiah(cash)}</p>
                    </div>

                    <div className="bg-white p-3 sm:p-3.5 rounded-xl border-2 border-black text-center shadow-[2px_2px_0px_#000]">
                      <span className="text-[10px] font-mono font-black text-gray-500 uppercase">TOTAL UTANG</span>
                      <p className="text-base sm:text-lg font-black text-rose-600 mt-0.5">{formatRupiah(debt)}</p>
                    </div>

                    <div className="bg-white p-3 sm:p-3.5 rounded-xl border-2 border-black text-center shadow-[2px_2px_0px_#000]">
                      <span className="text-[10px] font-mono font-black text-gray-500 uppercase">TINGKAT STRES</span>
                      <p className="text-base sm:text-lg font-black text-[#111111] mt-0.5">{stress}%</p>
                    </div>

                    <div className="bg-white p-3 sm:p-3.5 rounded-xl border-2 border-black text-center shadow-[2px_2px_0px_#000]">
                      <span className="text-[10px] font-mono font-black text-gray-500 uppercase">SKOR LITERASI</span>
                      <p className="text-base sm:text-lg font-black text-[#FF6B4A] mt-0.5">{literacy} Poin</p>
                    </div>
                  </div>

                  {/* Categorized Color Status Recap Cards */}
                  <div className="shrink-0">
                    <h4 className="text-xs font-mono font-black text-gray-700 uppercase mb-2">
                      📋 REKAP KEPUTUSAN GESTURMU ({decisionHistory.length} KEPUTUSAN):
                    </h4>
                    <div className="space-y-2 max-h-44 sm:max-h-56 overflow-y-auto pr-1">
                      {decisionHistory.map((item, index) => {
                        const isSafe = item.safetyType === "safe";
                        const isWarning = item.safetyType === "warning";

                        return (
                          <div
                            key={index}
                            className={`p-3 rounded-xl border-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${
                              isSafe
                                ? "bg-emerald-50 border-emerald-600 text-emerald-950"
                                : isWarning
                                ? "bg-amber-50 border-amber-500 text-amber-950"
                                : "bg-rose-50 border-rose-600 text-rose-950"
                            }`}
                          >
                            <div className="flex items-start gap-2">
                              <span
                                className={`px-2 py-0.5 rounded font-mono font-black text-[10px] uppercase shrink-0 border ${
                                  item.action === "YES" ? "bg-emerald-100 text-emerald-800 border-emerald-300" : "bg-rose-100 text-rose-800 border-rose-300"
                                }`}
                              >
                                {item.action === "YES" ? "ANGGUK" : "GELENG"}
                              </span>
                              <p className="font-medium font-sans leading-snug">{item.impact.feedback}</p>
                            </div>

                            <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono font-black shrink-0 uppercase text-white ${
                              isSafe ? "bg-emerald-600" : isWarning ? "bg-amber-500" : "bg-rose-600"
                            }`}>
                              {isSafe ? "[ KEPUTUSAN TEPAT ]" : isWarning ? "[ BERISIKO ]" : "[ FATAL / JEBAKAN ]"}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-2.5 pt-2 mt-auto shrink-0">
                    <button
                      type="button"
                      onClick={() => initializeModule(currentModuleKey)}
                      className="flex-1 bg-[#FFA6C9] hover:bg-[#ff8cb8] text-black py-3 px-5 rounded-xl border-2 border-black text-xs font-black tracking-wider uppercase shadow-[3px_3px_0px_#000] hover:shadow-[5px_5px_0px_#000] hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer font-sans"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Mainkan Lagi (Acak 5 Baru)
                    </button>

                    <button
                      type="button"
                      onClick={() => setViewState("case-select")}
                      className="flex-1 bg-[#C8B6FF] hover:bg-[#bba6f7] text-black py-3 px-5 rounded-xl border-2 border-black text-xs font-black tracking-wider uppercase shadow-[3px_3px_0px_#000] hover:shadow-[5px_5px_0px_#000] hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer font-sans"
                    >
                      Pilih Kasus Lain
                    </button>

                    <Link
                      href="/"
                      className="bg-black text-white hover:bg-zinc-800 py-3 px-5 rounded-xl border-2 border-black text-xs font-black tracking-wider uppercase shadow-[3px_3px_0px_#fff] hover:shadow-[5px_5px_0px_#fff] hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer text-center font-sans"
                    >
                      Kembali ke Beranda
                    </Link>
                  </div>

                </div>
              </div>
            )}

          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}

export default function SimulationPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen bg-[#0F1115] flex items-center justify-center text-white">
          <div className="p-8 bg-white text-black rounded-3xl border-3 border-black shadow-[6px_6px_0px_0px_#000] text-center font-mono">
            <span className="animate-spin inline-block mr-2">⚡</span> Memuat Simulator Nodfinc...
          </div>
        </div>
      }
    >
      <SimulationContent />
    </Suspense>
  );
}
