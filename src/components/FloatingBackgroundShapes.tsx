"use client";

import React from "react";
import { motion } from "framer-motion";

export function FloatingBackgroundShapes() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10 select-none">
      {/* 1. Top Right Floating Concentric Rings */}
      <motion.div
        className="absolute -top-12 -right-12 w-64 h-64 sm:w-80 sm:h-80 rounded-full border-3 border-black/15 flex items-center justify-center"
        animate={{
          y: [-12, 14, -12],
          rotate: [0, 180, 360],
        }}
        transition={{
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 24, repeat: Infinity, ease: "linear" },
        }}
      >
        <div className="w-48 h-48 sm:w-60 sm:h-60 rounded-full border-2 border-dashed border-black/20 flex items-center justify-center">
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-[#FFE17D]/30 border-2 border-black/15" />
        </div>
      </motion.div>

      {/* 2. Top Left Floating Pastel Blob (Pink) */}
      <motion.div
        className="absolute top-1/4 -left-16 w-56 h-56 sm:w-72 sm:h-72 rounded-[45%_55%_60%_40%/50%_60%_40%_50%] bg-[#FFA6C9]/25 border-2 border-black/10 blur-[1px]"
        animate={{
          y: [0, -20, 0],
          x: [0, 15, 0],
          scale: [1, 1.06, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 3. Mid Right Violet Floating Pill with Dotted Texture */}
      <motion.div
        className="absolute top-1/2 -right-10 w-44 sm:w-56 h-28 sm:h-36 rounded-full bg-[#C8B6FF]/30 border-2 border-black/15 rotate-[25deg]"
        animate={{
          y: [15, -15, 15],
          rotate: [20, 30, 20],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 4. Center Emerald Geometric Floating Ring */}
      <motion.div
        className="absolute top-2/3 left-8 sm:left-16 w-20 h-20 sm:w-28 sm:h-28 rounded-2xl bg-[#0EB574]/20 border-2 border-black/15 rotate-12"
        animate={{
          rotate: [12, -12, 12],
          y: [-10, 10, -10],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 5. Floating Retro Asterisk Sparkles */}
      <motion.div
        className="absolute top-1/3 left-1/4 text-black/15 text-4xl sm:text-5xl font-black font-mono select-none"
        animate={{
          rotate: [0, 360],
          scale: [0.9, 1.15, 0.9],
        }}
        transition={{
          rotate: { duration: 18, repeat: Infinity, ease: "linear" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        ✦
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 right-1/4 text-black/15 text-5xl sm:text-6xl font-black font-mono select-none"
        animate={{
          rotate: [360, 0],
          scale: [1.1, 0.85, 1.1],
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        ★
      </motion.div>
    </div>
  );
}
