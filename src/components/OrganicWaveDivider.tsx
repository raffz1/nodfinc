"use client";

import React from "react";

interface OrganicWaveDividerProps {
  topColor?: string;
  bottomColor?: string;
  accentColors?: {
    primary?: string;
    secondary?: string;
    zebra?: string;
  };
  inverted?: boolean;
  className?: string;
}

export function OrganicWaveDivider({
  topColor = "#161513",
  bottomColor = "#FAF7F2",
  accentColors = {
    primary: "#FFA6C9",
    secondary: "#501CE6",
    zebra: "#0EB574",
  },
  inverted = false,
  className = "",
}: OrganicWaveDividerProps) {
  const primary = accentColors.primary || "#FFA6C9";
  const secondary = accentColors.secondary || "#501CE6";
  const zebra = accentColors.zebra || "#0EB574";

  return (
    <div
      className={`relative w-full overflow-hidden leading-none z-10 -mb-[1px] select-none pointer-events-none ${className} ${
        inverted ? "transform rotate-180" : ""
      }`}
      style={{ backgroundColor: topColor }}
    >
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-16 sm:h-24 md:h-28 block"
        preserveAspectRatio="none"
      >
        {/* Layer 1: Background accent wave (e.g. Pink #FFA6C9) */}
        <path
          d="M 0,35 C 260,75 460,10 740,45 C 1020,80 1220,15 1440,40 L 1440,120 L 0,120 Z"
          fill={primary}
        />

        {/* Layer 2: Secondary wave overlay (e.g. Violet #501CE6) */}
        <path
          d="M 800,38 C 960,15 1160,28 1440,18 L 1440,120 L 800,120 Z"
          fill={secondary}
        />

        {/* Layer 3: Accent pill with neo-brutalist hatched strokes (e.g. Emerald Zebra) */}
        <g>
          <path
            d="M 240,55 C 320,18 480,14 600,42 C 690,65 770,55 850,75 L 850,120 L 240,120 Z"
            fill={zebra}
          />
          <path
            d="M 280,60 Q 440,26 570,48"
            stroke="#121212"
            strokeWidth="3.5"
            strokeOpacity="0.3"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 310,72 Q 470,38 600,60"
            stroke="#121212"
            strokeWidth="3.5"
            strokeOpacity="0.3"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 340,84 Q 500,50 630,72"
            stroke="#121212"
            strokeWidth="3.5"
            strokeOpacity="0.3"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* Layer 4: Foreground clean bottom curve extending into bottom section */}
        <path
          d="M 0,60 C 220,30 480,75 720,55 C 960,35 1200,70 1440,50 L 1440,120 L 0,120 Z"
          fill={bottomColor}
        />

        {/* Top border stroke curve only (NO vertical side strokes or enclosed boxes) */}
        <path
          d="M 0,60 C 220,30 480,75 720,55 C 960,35 1200,70 1440,50"
          stroke="#111111"
          strokeWidth="2.5"
          strokeOpacity="0.9"
          fill="none"
        />
      </svg>
    </div>
  );
}
