"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Folder,
  LayoutGrid,
  Maximize2,
  Minus,
  Search,
  X,
} from "lucide-react";

type MetricItem = {
  label: string;
  value: string;
};

type Card = {
  id: string;
  number: string;
  titleLine1: string;
  titleLine2: string;
  category: string;
  badge: string;
  description: string;
  href: string;
  ctaText: string;
  color: string;
  className: string;
  flapBg: string;
  flapBorder?: string;
  flapTextColor: string;
  flapDescColor: string;
  badgeClass: string;
  artworkGraphic: React.ReactNode;
  monographTypography: React.ReactNode;
  flapGradientStops?: React.ReactNode;
  titleColor: string;
  descColor: string;
  buttonClass: string;
  closeBtnClass: string;
  bentoClass: string;
  metricValueColor: string;
  metricLabelColor: string;
  metrics: MetricItem[];
  highlights: string[];
  statsFooter?: string;
  miniGraphic: React.ReactNode;
  config: {
    y: number;
    rotate: number;
    zIndex: number;
  };
};

type SpringConfig = {
  type: "spring";
  bounce?: number;
  visualDuration?: number;
  stiffness?: number;
  damping?: number;
  mass?: number;
};

export interface CardsProps {
  spring?: SpringConfig;
  cardSpacing?: number;
}

const defaultSpring: SpringConfig = {
  type: "spring",
  visualDuration: 0.6,
  bounce: 0.22,
};

/**
 * Motion Designer Geometric Shapes (From User-Provided Reference Sheet)
 * Exactly matching the 15 motion designer shapes:
 * - 8-Petal Asterisk (Row 1, Col 1)
 * - Radiant Sunburst (Row 1, Col 3)
 * - Serpentine Trace (Row 2, Col 2)
 * - Aperture Donut Disc (Row 3, Col 3)
 * - Slanted Chevrons (Row 1, Col 4)
 * - Dot Matrix Grid (Row 2, Col 3)
 * - Stepped Terrain (Row 3, Col 4)
 */

export const MotionAsterisk = ({
  className,
  fill = "currentColor",
}: {
  className?: string;
  fill?: string;
}) => (
  <svg viewBox="0 0 100 100" className={className} fill={fill}>
    {[0, 45, 90, 135].map((angle, i) => (
      <rect
        key={i}
        x="43"
        y="10"
        width="14"
        height="80"
        rx="7"
        transform={`rotate(${angle} 50 50)`}
      />
    ))}
    <circle cx="50" cy="50" r="12" />
  </svg>
);

export const RadiantSunburst = ({
  className,
  fill = "currentColor",
}: {
  className?: string;
  fill?: string;
}) => (
  <svg viewBox="0 0 100 100" className={className} fill={fill}>
    {Array.from({ length: 24 }).map((_, i) => {
      const angle = (i * 360) / 24;
      return (
        <polygon
          key={i}
          points="50,50 46,2 54,2"
          transform={`rotate(${angle} 50 50)`}
        />
      );
    })}
    <circle cx="50" cy="50" r="9" fill={fill} />
  </svg>
);

export const SerpentineTrace = ({
  className,
  stroke = "currentColor",
  strokeWidth = 3.5,
}: {
  className?: string;
  stroke?: string;
  strokeWidth?: number;
}) => (
  <svg viewBox="0 0 130 66" fill="none" className={className}>
    <path
      d="M 12 11 H 118 C 125 11, 125 27, 118 27 H 14 C 7 27, 7 43, 14 43 H 118 C 125 43, 125 59, 118 59 H 12"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ApertureDonutDisc = ({
  className,
  fill = "currentColor",
}: {
  className?: string;
  fill?: string;
}) => (
  <svg viewBox="0 0 100 100" className={className}>
    <path
      d="M 50 0 A 50 50 0 1 0 50 100 A 50 50 0 1 0 50 0 Z M 50 35 A 15 15 0 1 1 50 65 A 15 15 0 1 1 50 35 Z"
      fill={fill}
      fillRule="evenodd"
    />
  </svg>
);

export const SlantedChevrons = ({
  className,
  fill = "currentColor",
}: {
  className?: string;
  fill?: string;
}) => (
  <svg viewBox="0 0 100 64" className={className} fill={fill}>
    <polygon points="4,6 44,6 34,17 0,17" />
    <polygon points="56,6 96,6 86,17 52,17" />
    <polygon points="4,22 44,22 34,33 0,33" />
    <polygon points="56,22 96,22 86,33 52,33" />
    <polygon points="4,38 44,38 34,49 0,49" />
    <polygon points="56,38 96,38 86,49 52,49" />
  </svg>
);

export const DotMatrixGrid = ({
  rows = 4,
  cols = 6,
  className,
  fill = "currentColor",
}: {
  rows?: number;
  cols?: number;
  className?: string;
  fill?: string;
}) => (
  <svg viewBox="0 0 120 70" className={className} fill={fill}>
    {Array.from({ length: rows }).map((_, r) =>
      Array.from({ length: cols }).map((_, c) => (
        <circle key={`${r}-${c}`} cx={12 + c * 19} cy={11 + r * 16} r={2} />
      ))
    )}
  </svg>
);

export const SteppedTerrain = ({
  className,
  fill = "currentColor",
}: {
  className?: string;
  fill?: string;
}) => (
  <svg viewBox="0 0 100 80" className={className} fill={fill}>
    <path d="M 0 80 L 0 62 L 20 62 L 20 44 L 42 44 L 42 26 L 64 26 C 78 26, 85 10, 100 10 L 100 80 Z" />
  </svg>
);

/**
 * Tabbed Folder Flap SVG Silhouette with White Morphism Gradient Support:
 * High tab on the left, smooth cubic-bezier S-curve transition, lower shelf on the right.
 */
const FolderCardFlapShape = ({
  fill,
  stroke,
  className,
  gradientId,
  gradientStops,
}: {
  fill?: string;
  stroke?: string;
  className?: string;
  gradientId?: string;
  gradientStops?: React.ReactNode;
}) => {
  const actualFill = gradientId ? `url(#${gradientId})` : fill || "#ffffff";
  return (
    <svg
      viewBox="0 0 260 290"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("absolute inset-0 w-full h-full pointer-events-none", className)}
      preserveAspectRatio="none"
    >
      {gradientId && gradientStops && (
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            {gradientStops}
          </linearGradient>
        </defs>
      )}
      <path
        d="M 0 24 A 24 24 0 0 1 24 0 L 105 0 C 118 0, 126 26, 142 26 L 236 26 A 24 24 0 0 1 260 50 L 260 266 A 24 24 0 0 1 236 290 L 24 290 A 24 24 0 0 1 0 266 Z"
        fill={actualFill}
        stroke={stroke}
        strokeWidth={stroke ? "1.5" : "0"}
      />
    </svg>
  );
};

/**
 * Tabbed Folder Card Cover with White Morphism Gradient & Motion Designer Shapes:
 * Tab shape preserved with VOL index on tab.
 * On hover, the tabbed flap slides down smoothly to reveal the colorful upper morphism graphic.
 */
const FolderCardCover = ({
  card,
  screenTier,
}: {
  card: Card;
  screenTier: "lg" | "md" | "sm";
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const slideDownY = screenTier === "sm" ? 52 : screenTier === "md" ? 62 : 68;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-full rounded-[24px] sm:rounded-[28px] overflow-hidden select-none group"
    >
      {/* 1. UPPER COLOR MORPHISM ARTWORK (Revealed when flap slides down) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {card.artworkGraphic}
      </div>

      {/* Top Glass Morphism Sheen Overlay */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-white/30 via-white/10 to-transparent pointer-events-none z-[5]" />

      {/* 2. THE SLIDING TABBED FOLDER FLAP WITH WHITE MORPHISM GRADIENT */}
      <motion.div
        animate={{
          y: isHovered ? slideDownY : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 340,
          damping: 26,
        }}
        className="absolute inset-x-0 bottom-0 select-none pointer-events-auto"
        style={{
          top: screenTier === "sm" ? "40px" : "48px",
          bottom: 0,
        }}
      >
        {/* SVG Tabbed Flap Silhouette with White-to-Color Morphism Gradient */}
        <FolderCardFlapShape
          fill={card.flapBg}
          stroke={card.flapBorder}
          gradientId={`flap-grad-${card.id}`}
          gradientStops={card.flapGradientStops}
        />

        {/* Tab Header: Index on left tab */}
        <div className="absolute top-1.5 sm:top-2 left-3.5 sm:left-4 z-10 select-none">
          <span
            className={cn(
              "font-mono font-black tracking-widest leading-none text-xs sm:text-sm uppercase opacity-90",
              card.flapTextColor
            )}
          >
            VOL. 0{card.number}
          </span>
        </div>

        {/* Flap Body: EXACT ICONIC ORIGINAL TYPOGRAPHY + PROMINENT USER MOTION SHAPES */}
        <div className="absolute top-10 sm:top-11 inset-x-3.5 sm:inset-x-4 bottom-3 sm:bottom-3.5 z-10 flex flex-col justify-between text-left">
          {card.monographTypography}
        </div>
      </motion.div>
    </div>
  );
};

export const Cards = ({
  spring = defaultSpring,
  cardSpacing = 180,
}: CardsProps = {}) => {
  const cards: Card[] = [
    // =========================================================================
    // 01: OBSIDIAN / PLATINUM MORPHISM GRADIENT — DEEP INTELL.
    // =========================================================================
    {
      id: "research",
      number: "1",
      titleLine1: "Autonomous",
      titleLine2: "Deep Research",
      category: "AUTONOMOUS DOSSIER",
      badge: "2026 LIVE",
      description:
        "Multi-step market intelligence grounded in real-time Google search data, cutoffs, and verified citations into an executive dossier.",
      href: "/research",
      ctaText: "Launch Deep Research",
      color: "#111113",
      className: "bg-gradient-to-br from-white via-slate-100 to-slate-300 text-slate-900 border border-white/80 shadow-[0_24px_50px_-8px_rgba(15,23,42,0.18)]",
      flapBg: "#ffffff",
      flapBorder: "rgba(255, 255, 255, 0.7)",
      flapTextColor: "text-slate-800",
      flapDescColor: "text-slate-700",
      badgeClass: "bg-slate-950 text-white font-mono text-[8px] font-bold",
      flapGradientStops: (
        <>
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="25%" stopColor="#f8fafc" stopOpacity="0.98" />
          <stop offset="65%" stopColor="#cbd5e1" stopOpacity="0.96" />
          <stop offset="100%" stopColor="#64748b" stopOpacity="0.98" />
        </>
      ),
      artworkGraphic: (
        <div className="relative w-full h-full bg-gradient-to-br from-[#1e293b] via-[#334155] to-[#64748b] p-3 sm:p-4 overflow-hidden select-none">
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/20 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between text-white/90 border-b border-white/20 pb-2 relative z-10">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[8.5px] uppercase tracking-widest font-bold text-white">LIVE // 2026</span>
            </div>
            <span className="font-mono text-[8px] uppercase tracking-wider text-white/70">AUTONOMOUS DOSSIER</span>
          </div>
          {/* Upper revealed motion shape composition */}
          <div className="mt-2.5 sm:mt-3 flex items-center justify-between px-2 relative z-10">
            <RadiantSunburst className="w-12 h-12 text-white/50" />
            <SlantedChevrons className="w-14 h-8 text-white/60" />
          </div>
        </div>
      ),
      monographTypography: (
        <>
          {/* TOP ROW: Motion shape on left, big number + date on right */}
          <div className="flex items-start justify-between">
            <div className="text-slate-900 pt-0.5">
              <SlantedChevrons className="w-11 h-7 text-slate-900" />
            </div>
            <div className="text-right select-none">
              <span className="block font-sans font-black text-3xl sm:text-4xl tracking-tight leading-none text-slate-950">
                01
              </span>
              <span className="block font-mono text-[8.5px] sm:text-[9.5px] font-bold tracking-widest uppercase text-slate-700 pt-1">
                OCT &apos;26
              </span>
            </div>
          </div>

          {/* MIDDLE BODY: Iconic Typography + Editorial Statement */}
          <div className="my-auto space-y-1.5 py-1">
            <div>
              <span className="block font-sans font-black text-2xl sm:text-3xl lg:text-[32px] tracking-[-0.04em] leading-[0.9] text-slate-950">
                DEEP
              </span>
              <span className="block font-sans font-black text-2xl sm:text-3xl lg:text-[32px] tracking-[-0.04em] leading-[0.9] text-slate-700">
                INTELL.
              </span>
            </div>
            <p className="font-sans text-[11px] sm:text-[11.5px] leading-snug font-medium text-slate-800 pt-1">
              How autonomous intelligence turns live cutoffs and web data into an executive dossier.
            </p>
          </div>

          {/* BOTTOM ROW: BY STUDENT SAARTHI & Tech Spec */}
          <div className="flex items-center justify-between border-t border-slate-900/15 pt-2 select-none">
            <span className="font-mono text-[8px] sm:text-[8.5px] font-extrabold tracking-wider uppercase text-slate-900">
              BY STUDENT SAARTHI
            </span>
            <span className="font-mono text-[7.5px] sm:text-[8px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full bg-slate-950 text-white shadow-xs">
              GEMINI 2.5 FLASH
            </span>
          </div>
        </>
      ),
      titleColor: "text-slate-950",
      descColor: "text-slate-600",
      buttonClass: "bg-slate-950 text-white hover:bg-slate-800 shadow-md",
      closeBtnClass: "bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200",
      bentoClass: "bg-slate-50/90 border border-slate-200/80 hover:border-slate-300 shadow-xs",
      metricValueColor: "text-slate-950",
      metricLabelColor: "text-slate-500",
      metrics: [
        { value: "60L+", label: "Aspirant Profiles" },
        { value: "98.4%", label: "Grounding Accuracy" },
        { value: "< 3.2s", label: "Synthesis Latency" },
        { value: "100%", label: "Verified Citations" },
      ],
      highlights: ["Live Google Search 2026", "Deterministic Citations"],
      statsFooter: "REF // SAARTHI-DSS-INTEL",
      miniGraphic: (
        <div className="w-full h-full bg-gradient-to-br from-white via-slate-200 to-slate-400 rounded-[8px] p-2 flex flex-col justify-between text-slate-900 border-[1.5px] border-slate-300 shadow-md select-none">
          <div className="flex justify-between items-start">
            <SlantedChevrons className="w-4 h-2.5 text-slate-900" />
            <span className="font-sans font-black text-[11px] leading-none text-slate-900">01</span>
          </div>
          <div className="my-auto text-left leading-tight">
            <span className="block font-sans font-black text-[10px] tracking-tight text-slate-950">DEEP</span>
            <span className="block font-sans font-black text-[10px] tracking-tight text-slate-700">INTELL.</span>
          </div>
          <span className="font-mono text-[5.5px] font-bold tracking-wider uppercase text-slate-700">STUDENT SAARTHI</span>
        </div>
      ),
      config: {
        y: 84,
        rotate: -10,
        zIndex: 2,
      },
    },

    // =========================================================================
    // 02: ELECTRIC COBALT & AZURE MORPHISM GRADIENT — Entrance Telemetry.
    // =========================================================================
    {
      id: "exams",
      number: "2",
      titleLine1: "National",
      titleLine2: "Exam Radar",
      category: "TELEMETRY RADAR",
      badge: "REAL-TIME",
      description:
        "Real-time radar tracking confirmed registration windows, admit cards, and exam dates for JEE, NEET, CUET, CLAT, and IPMAT.",
      href: "/exams",
      ctaText: "Open Exam Radar",
      color: "#0052ff",
      className: "bg-gradient-to-br from-white via-blue-100 to-blue-300 text-slate-900 border border-blue-200/90 shadow-[0_24px_50px_-8px_rgba(0,82,255,0.22)]",
      flapBg: "#ffffff",
      flapBorder: "rgba(255, 255, 255, 0.7)",
      flapTextColor: "text-blue-900",
      flapDescColor: "text-slate-700",
      badgeClass: "bg-blue-600 text-white font-mono text-[8px] font-bold",
      flapGradientStops: (
        <>
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="25%" stopColor="#eff6ff" stopOpacity="0.98" />
          <stop offset="60%" stopColor="#93c5fd" stopOpacity="0.96" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.98" />
        </>
      ),
      artworkGraphic: (
        <div className="relative w-full h-full bg-gradient-to-br from-[#1e40af] via-[#2563eb] to-[#60a5fa] p-3 sm:p-4 overflow-hidden select-none">
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-cyan-300/30 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between text-white/90 border-b border-white/20 pb-2 relative z-10">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-300 animate-pulse" />
              <span className="font-mono text-[8.5px] uppercase tracking-widest font-bold text-white">REAL-TIME // 60L+</span>
            </div>
            <span className="font-mono text-[8px] uppercase tracking-wider text-white/70">TELEMETRY RADAR</span>
          </div>
          {/* Upper revealed motion shape composition */}
          <div className="mt-2.5 sm:mt-3 flex items-center justify-between px-2 relative z-10">
            <ApertureDonutDisc className="w-11 h-11 text-white/50" />
            <div className="flex flex-col gap-1 w-14">
              <div className="h-0.5 w-full bg-white/50 rounded" />
              <div className="h-0.5 w-3/4 bg-white/40 rounded" />
              <div className="h-0.5 w-full bg-white/30 rounded" />
            </div>
          </div>
        </div>
      ),
      monographTypography: (
        <>
          {/* TOP ROW: Motion shape on left, big number + date on right */}
          <div className="flex items-start justify-between">
            <div className="text-blue-700 pt-0.5">
              <ApertureDonutDisc className="w-9 h-9 text-blue-700" />
            </div>
            <div className="text-right select-none">
              <span className="block font-sans font-black text-3xl sm:text-4xl tracking-tight leading-none text-slate-950">
                02
              </span>
              <span className="block font-mono text-[8.5px] sm:text-[9.5px] font-bold tracking-widest uppercase text-blue-900 pt-1">
                NOV &apos;26
              </span>
            </div>
          </div>

          {/* MIDDLE BODY: Iconic Typography + Editorial Statement */}
          <div className="my-auto space-y-1.5 py-1">
            <div>
              <p className="font-serif italic text-2xl sm:text-[26px] text-slate-950 leading-tight">
                Entrance <span className="font-bold text-blue-900">Telemetry.</span>
              </p>
            </div>
            <p className="font-sans text-[11px] sm:text-[11.5px] leading-snug font-medium text-slate-800 pt-0.5">
              Real-time telemetry tracking registration dates and admits for 60L+ candidates.
            </p>
          </div>

          {/* BOTTOM ROW: BY STUDENT SAARTHI & Tech Spec */}
          <div className="flex items-center justify-between border-t border-slate-900/15 pt-2 select-none">
            <span className="font-mono text-[8px] sm:text-[8.5px] font-extrabold tracking-wider uppercase text-slate-900">
              BY STUDENT SAARTHI
            </span>
            <span className="font-mono text-[7.5px] sm:text-[8px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full bg-blue-950 text-blue-100 shadow-xs">
              NTA • MCC SYNCS
            </span>
          </div>
        </>
      ),
      titleColor: "text-slate-950",
      descColor: "text-slate-600",
      buttonClass: "bg-blue-600 text-white hover:bg-blue-700 shadow-md",
      closeBtnClass: "bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200",
      bentoClass: "bg-blue-50/70 border border-blue-200/70 hover:border-blue-300 shadow-xs",
      metricValueColor: "text-blue-700",
      metricLabelColor: "text-slate-500",
      metrics: [
        { value: "12", label: "Tier-1 Exams Live" },
        { value: "2.4M+", label: "Candidates Tracked" },
        { value: "0 Days", label: "Alert Latency" },
        { value: "100%", label: "NTA / MCC Synced" },
      ],
      highlights: ["Admit Card & Exam Alerts", "Direct Portal Linkage"],
      statsFooter: "SYNCED // NTA • MCC • CUET",
      miniGraphic: (
        <div className="w-full h-full bg-gradient-to-br from-white via-blue-200 to-blue-500 rounded-[8px] p-2 flex flex-col justify-between text-slate-900 border-[1.5px] border-blue-300 shadow-md select-none">
          <div className="flex justify-between items-start">
            <ApertureDonutDisc className="w-3.5 h-3.5 text-blue-700" />
            <span className="font-sans font-black text-[11px] leading-none text-slate-900">02</span>
          </div>
          <div className="my-auto text-left leading-tight">
            <span className="block font-serif italic text-[10px] tracking-tight text-slate-950">Entrance</span>
            <span className="block font-serif italic text-[10px] tracking-tight text-blue-900 font-bold">Telemetry.</span>
          </div>
          <span className="font-mono text-[5.5px] font-bold tracking-wider uppercase text-slate-700">STUDENT SAARTHI</span>
        </div>
      ),
      config: {
        y: 20,
        rotate: 8,
        zIndex: 3,
      },
    },

    // =========================================================================
    // 03: GOLDEN AMBER & SUNSET MORPHISM GRADIENT — PATHWAY Simulator.
    // =========================================================================
    {
      id: "simulator",
      number: "3",
      titleLine1: "Career Pathway",
      titleLine2: "Simulator",
      category: "DECISION TREE",
      badge: "140+ PATHS",
      description:
        "Trace how choosing PCM, PCB, or Commerce branches into specific undergraduate degrees, compensation curves, and contingency exit pivots.",
      href: "/simulator",
      ctaText: "Simulate Pathways",
      color: "#ffe600",
      className: "bg-gradient-to-br from-white via-amber-100 to-amber-300 text-slate-900 border border-amber-200/90 shadow-[0_24px_50px_-8px_rgba(245,158,11,0.22)]",
      flapBg: "#ffffff",
      flapBorder: "rgba(255, 255, 255, 0.7)",
      flapTextColor: "text-amber-900",
      flapDescColor: "text-slate-700",
      badgeClass: "bg-amber-500 text-black font-mono text-[8px] font-bold",
      flapGradientStops: (
        <>
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="25%" stopColor="#fffdf5" stopOpacity="0.98" />
          <stop offset="60%" stopColor="#fde68a" stopOpacity="0.96" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.98" />
        </>
      ),
      artworkGraphic: (
        <div className="relative w-full h-full bg-gradient-to-br from-[#b45309] via-[#d97706] to-[#f59e0b] p-3 sm:p-4 overflow-hidden select-none">
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-amber-200/40 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between text-white/95 border-b border-white/20 pb-2 relative z-10">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-300 animate-pulse" />
              <span className="font-mono text-[8.5px] uppercase tracking-widest font-bold text-white">140+ PATHS // SIM</span>
            </div>
            <span className="font-mono text-[8px] uppercase tracking-wider text-white/80">DECISION TREE</span>
          </div>
          {/* Upper revealed motion shape composition */}
          <div className="mt-2.5 sm:mt-3 flex items-center justify-between px-2 relative z-10">
            <DotMatrixGrid className="w-14 h-8 text-white/50" />
            <MotionAsterisk className="w-10 h-10 text-white/60" />
          </div>
        </div>
      ),
      monographTypography: (
        <>
          {/* TOP ROW: Motion shape on left, big number + date on right */}
          <div className="flex items-start justify-between">
            <div className="text-amber-700 pt-0.5">
              <MotionAsterisk className="w-9 h-9 text-amber-700" />
            </div>
            <div className="text-right select-none">
              <span className="block font-sans font-black text-3xl sm:text-4xl tracking-tight leading-none text-slate-950">
                03
              </span>
              <span className="block font-mono text-[8.5px] sm:text-[9.5px] font-bold tracking-widest uppercase text-amber-900 pt-1">
                DEC &apos;26
              </span>
            </div>
          </div>

          {/* MIDDLE BODY: Iconic Typography + Editorial Statement */}
          <div className="my-auto space-y-1 py-1">
            <div>
              <span className="block font-sans font-black text-2xl sm:text-3xl tracking-tight text-slate-950 leading-[0.9]">
                PATHWAY
              </span>
              <span className="block font-serif italic font-normal text-xl sm:text-2xl tracking-tight text-amber-900 font-bold leading-[0.95]">
                Simulator.
              </span>
            </div>
            <p className="font-sans text-[11px] sm:text-[11.5px] leading-snug font-medium text-slate-800 pt-1">
              How choosing PCM, PCB, or Commerce diverges into career exit pivots and salary trajectories.
            </p>
          </div>

          {/* BOTTOM ROW: BY STUDENT SAARTHI & Tech Spec */}
          <div className="flex items-center justify-between border-t border-slate-900/15 pt-2 select-none">
            <span className="font-mono text-[8px] sm:text-[8.5px] font-extrabold tracking-wider uppercase text-slate-900">
              BY STUDENT SAARTHI
            </span>
            <span className="font-mono text-[7.5px] sm:text-[8px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full bg-amber-950 text-amber-100 shadow-xs">
              140+ BRANCHES
            </span>
          </div>
        </>
      ),
      titleColor: "text-slate-950",
      descColor: "text-slate-600",
      buttonClass: "bg-amber-500 text-black hover:bg-amber-400 font-bold shadow-md",
      closeBtnClass: "bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200",
      bentoClass: "bg-amber-50/70 border border-amber-200/70 hover:border-amber-300 shadow-xs",
      metricValueColor: "text-amber-800",
      metricLabelColor: "text-slate-500",
      metrics: [
        { value: "140+", label: "Branch Decision Paths" },
        { value: "₹8.5L–₹42L", label: "5-Yr CTC Curves" },
        { value: "3 Tiers", label: "Contingency Pivots" },
        { value: "10-Yr", label: "AI Disruption Model" },
      ],
      highlights: ["Multi-Branch Divergence", "Recession Stress-Test"],
      statsFooter: "EMPIRICAL // NASSCOM & PLACEMENTS",
      miniGraphic: (
        <div className="w-full h-full bg-gradient-to-br from-white via-amber-200 to-amber-500 rounded-[8px] p-2 flex flex-col justify-between text-slate-900 border-[1.5px] border-amber-300 shadow-md select-none">
          <div className="flex justify-between items-start">
            <MotionAsterisk className="w-3.5 h-3.5 text-amber-700" />
            <span className="font-sans font-black text-[11px] leading-none text-slate-900">03</span>
          </div>
          <div className="my-auto text-left leading-none">
            <span className="block font-sans font-black text-[9.5px] tracking-tight text-slate-950">PATHWAY</span>
            <span className="block font-serif italic text-[8.5px] text-amber-900 font-bold">Simulator.</span>
          </div>
          <span className="font-mono text-[5.5px] font-bold tracking-wider uppercase text-slate-700">STUDENT SAARTHI</span>
        </div>
      ),
      config: {
        y: -80,
        rotate: -5,
        zIndex: 4,
      },
    },

    // =========================================================================
    // 04: EMERALD MINT & AURORA MORPHISM GRADIENT — how to.
    // =========================================================================
    {
      id: "calculator",
      number: "4",
      titleLine1: "Education ROI",
      titleLine2: "& Loan DSS",
      category: "CAPITAL MODELING",
      badge: "₹ DSS",
      description:
        "Calculate true educational capital outlay (tuition + hostel + coaching) vs starting CTC, loan EMIs, cumulative 5-year cashflows, and payback horizon.",
      href: "/calculator",
      ctaText: "Calculate ROI",
      color: "#00e575",
      className: "bg-gradient-to-br from-white via-emerald-100 to-emerald-300 text-slate-900 border border-emerald-200/90 shadow-[0_24px_50px_-8px_rgba(16,185,129,0.22)]",
      flapBg: "#ffffff",
      flapBorder: "rgba(255, 255, 255, 0.7)",
      flapTextColor: "text-emerald-950",
      flapDescColor: "text-slate-700",
      badgeClass: "bg-emerald-600 text-white font-mono text-[8px] font-bold",
      flapGradientStops: (
        <>
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="25%" stopColor="#f0fdf4" stopOpacity="0.98" />
          <stop offset="60%" stopColor="#a7f3d0" stopOpacity="0.96" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0.98" />
        </>
      ),
      artworkGraphic: (
        <div className="relative w-full h-full bg-gradient-to-br from-[#065f46] via-[#059669] to-[#10b981] p-3 sm:p-4 overflow-hidden select-none">
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-emerald-200/40 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between text-white/95 border-b border-white/20 pb-2 relative z-10">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="font-mono text-[8.5px] uppercase tracking-widest font-bold text-white">₹ DSS // 28 MO.</span>
            </div>
            <span className="font-mono text-[8px] uppercase tracking-wider text-white/80">CAPITAL MODEL</span>
          </div>
          {/* Upper revealed motion shape composition */}
          <div className="mt-2.5 sm:mt-3 flex items-center justify-between px-2 relative z-10">
            <SteppedTerrain className="w-12 h-9 text-white/50" />
            <div className="flex flex-col gap-1 w-14">
              <div className="h-0.5 w-full bg-white/50 rounded" />
              <div className="h-0.5 w-2/3 bg-white/40 rounded" />
              <div className="h-0.5 w-full bg-white/30 rounded" />
            </div>
          </div>
        </div>
      ),
      monographTypography: (
        <>
          {/* TOP ROW: Motion shape on left, big number + date on right */}
          <div className="flex items-start justify-between">
            <div className="text-emerald-700 pt-0.5">
              <SerpentineTrace className="w-11 h-6 text-emerald-700" strokeWidth={4} />
            </div>
            <div className="text-right select-none">
              <span className="block font-sans font-black text-3xl sm:text-4xl tracking-tight leading-none text-slate-950">
                04
              </span>
              <span className="block font-mono text-[8.5px] sm:text-[9.5px] font-bold tracking-widest uppercase text-emerald-950 pt-1">
                JAN &apos;27
              </span>
            </div>
          </div>

          {/* MIDDLE BODY: Iconic Typography + Editorial Statement */}
          <div className="my-auto space-y-1 py-1">
            <div>
              <span className="block font-sans font-black text-3xl sm:text-4xl lg:text-[42px] tracking-[-0.06em] leading-[0.85] text-slate-950">
                how
              </span>
              <span className="block font-sans font-black text-3xl sm:text-4xl lg:text-[42px] tracking-[-0.06em] leading-[0.85] text-emerald-900">
                to.
              </span>
            </div>
            <p className="font-sans text-[11px] sm:text-[11.5px] leading-snug font-medium text-slate-800 pt-1">
              Calculate true education outlay, starting CTC curves, and reducing loan EMIs.
            </p>
          </div>

          {/* BOTTOM ROW: BY STUDENT SAARTHI & Tech Spec */}
          <div className="flex items-center justify-between border-t border-slate-900/15 pt-2 select-none">
            <span className="font-mono text-[8px] sm:text-[8.5px] font-extrabold tracking-wider uppercase text-slate-900">
              BY STUDENT SAARTHI
            </span>
            <span className="font-mono text-[7.5px] sm:text-[8px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-100 shadow-xs">
              ₹ DSS MODEL
            </span>
          </div>
        </>
      ),
      titleColor: "text-slate-950",
      descColor: "text-slate-600",
      buttonClass: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md",
      closeBtnClass: "bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200",
      bentoClass: "bg-emerald-50/70 border border-emerald-200/70 hover:border-emerald-300 shadow-xs",
      metricValueColor: "text-emerald-800",
      metricLabelColor: "text-slate-500",
      metrics: [
        { value: "₹85L+", label: "Bad Debt Prevented" },
        { value: "28 Mo.", label: "Avg Payback Horizon" },
        { value: "8.5%", label: "Reducing EMI Model" },
        { value: "5 Years", label: "Net Cashflow Curve" },
      ],
      highlights: ["All-in Outlay Calculation", "Inflation-Adjusted NPV"],
      statsFooter: "QUANTITATIVE ROI MODEL",
      miniGraphic: (
        <div className="w-full h-full bg-gradient-to-br from-white via-emerald-200 to-emerald-500 rounded-[8px] p-2 flex flex-col justify-between text-slate-900 border-[1.5px] border-emerald-300 shadow-md select-none">
          <div className="flex justify-between items-start">
            <SerpentineTrace className="w-4 h-2.5 text-emerald-700" strokeWidth={4} />
            <span className="font-sans font-black text-[11px] leading-none text-slate-900">04</span>
          </div>
          <div className="my-auto text-left leading-tight">
            <span className="block font-sans font-black text-[11px] tracking-tight text-slate-950">how</span>
            <span className="block font-sans font-black text-[11px] tracking-tight text-emerald-900">to.</span>
          </div>
          <span className="font-mono text-[5.5px] font-bold tracking-wider uppercase text-slate-700">STUDENT SAARTHI</span>
        </div>
      ),
      config: {
        y: 20,
        rotate: 12,
        zIndex: 5,
      },
    },

    // =========================================================================
    // 05: ROSE FUCHSIA & ORCHID MORPHISM GRADIENT — COGNITIVE PROFILING.
    // =========================================================================
    {
      id: "quiz",
      number: "5",
      titleLine1: "Holland RIASEC",
      titleLine2: "Engine",
      category: "COGNITIVE PROFILING",
      badge: "RIASEC 2026",
      description:
        "15-point assessment evaluating Realistic, Investigative, Artistic, Social, Enterprising, and Conventional traits for empirical stream selection.",
      href: "/quiz",
      ctaText: "Take Aptitude Quiz",
      color: "#ff2465",
      className: "bg-gradient-to-br from-white via-rose-100 to-rose-300 text-slate-900 border border-rose-200/90 shadow-[0_24px_50px_-8px_rgba(244,63,94,0.22)]",
      flapBg: "#ffffff",
      flapBorder: "rgba(255, 255, 255, 0.7)",
      flapTextColor: "text-rose-950",
      flapDescColor: "text-slate-700",
      badgeClass: "bg-rose-600 text-white font-mono text-[8px] font-bold",
      flapGradientStops: (
        <>
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="25%" stopColor="#fff1f2" stopOpacity="0.98" />
          <stop offset="60%" stopColor="#fbcfe8" stopOpacity="0.96" />
          <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.98" />
        </>
      ),
      artworkGraphic: (
        <div className="relative w-full h-full bg-gradient-to-br from-[#9f1239] via-[#e11d48] to-[#f43f5e] p-3 sm:p-4 overflow-hidden select-none">
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-rose-200/40 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between text-white/95 border-b border-white/20 pb-2 relative z-10">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-300 animate-pulse" />
              <span className="font-mono text-[8.5px] uppercase tracking-widest font-bold text-white">15-PT ENGINE</span>
            </div>
            <span className="font-mono text-[8px] uppercase tracking-wider text-white/80">COGNITIVE DSS</span>
          </div>
          {/* Upper revealed motion shape composition */}
          <div className="mt-2.5 sm:mt-3 flex items-center justify-between px-2 relative z-10">
            <RadiantSunburst className="w-11 h-11 text-white/50" />
            <SerpentineTrace className="w-14 h-8 text-white/60" />
          </div>
        </div>
      ),
      monographTypography: (
        <>
          {/* TOP ROW: Motion shape on left, big number + date on right */}
          <div className="flex items-start justify-between">
            <div className="text-rose-700 pt-0.5">
              <RadiantSunburst className="w-9 h-9 text-rose-700" />
            </div>
            <div className="text-right select-none">
              <span className="block font-sans font-black text-3xl sm:text-4xl tracking-tight leading-none text-slate-950">
                05
              </span>
              <span className="block font-mono text-[8.5px] sm:text-[9.5px] font-bold tracking-widest uppercase text-rose-950 pt-1">
                FEB &apos;27
              </span>
            </div>
          </div>

          {/* MIDDLE BODY: Iconic Typography + Editorial Statement */}
          <div className="my-auto space-y-1.5 py-1">
            <div>
              <span className="block font-sans font-black text-2xl sm:text-3xl tracking-tight text-slate-950 leading-[0.9]">
                COGNITIVE
              </span>
              <span className="block font-sans font-black text-2xl sm:text-3xl tracking-tight text-rose-900 leading-[0.9]">
                PROFILING.
              </span>
            </div>
            <p className="font-sans text-[11px] sm:text-[11.5px] leading-snug font-medium text-slate-800 pt-1">
              How Holland RIASEC 15-point traits predict empirical stream fit and career aptitude.
            </p>
          </div>

          {/* BOTTOM ROW: BY STUDENT SAARTHI & Tech Spec */}
          <div className="flex items-center justify-between border-t border-slate-900/15 pt-2 select-none">
            <span className="font-mono text-[8px] sm:text-[8.5px] font-extrabold tracking-wider uppercase text-slate-900">
              BY STUDENT SAARTHI
            </span>
            <span className="font-mono text-[7.5px] sm:text-[8px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full bg-rose-950 text-rose-100 shadow-xs">
              15-POINT ENGINE
            </span>
          </div>
        </>
      ),
      titleColor: "text-slate-950",
      descColor: "text-slate-600",
      buttonClass: "bg-rose-600 text-white hover:bg-rose-700 shadow-md",
      closeBtnClass: "bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200",
      bentoClass: "bg-rose-50/70 border border-rose-200/70 hover:border-rose-300 shadow-xs",
      metricValueColor: "text-rose-700",
      metricLabelColor: "text-slate-500",
      metrics: [
        { value: "15 PTS", label: "Diagnostic Questions" },
        { value: "6 Traits", label: "Holland RIASEC Hexagon" },
        { value: "94.2%", label: "Stream Match Score" },
        { value: "8 Mins", label: "Avg Completion Time" },
      ],
      highlights: ["Stream Suitability Matrix", "Cognitive Blindspots"],
      statsFooter: "STANDARDIZED PSYCHOMETRIC DSS",
      miniGraphic: (
        <div className="w-full h-full bg-gradient-to-br from-white via-rose-200 to-rose-500 rounded-[8px] p-2 flex flex-col justify-between text-slate-900 border-[1.5px] border-rose-300 shadow-md select-none">
          <div className="flex justify-between items-start">
            <RadiantSunburst className="w-3.5 h-3.5 text-rose-700" />
            <span className="font-sans font-black text-[11px] leading-none text-slate-900">05</span>
          </div>
          <div className="my-auto text-left leading-none">
            <span className="block font-sans font-black text-[9px] tracking-tight text-slate-950">COGNITIVE</span>
            <span className="block font-sans font-black text-[9px] tracking-tight text-rose-900">PROFILING.</span>
          </div>
          <span className="font-mono text-[5.5px] font-bold tracking-wider uppercase text-slate-700">STUDENT SAARTHI</span>
        </div>
      ),
      config: {
        y: 84,
        rotate: -8,
        zIndex: 6,
      },
    },
  ];

  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const [isFolderHovered, setIsFolderHovered] = useState(false);
  const [active, setActive] = useState<Card | null>(null);
  const [screenTier, setScreenTier] = useState<"lg" | "md" | "sm">("lg");

  const ref = useRef<HTMLDivElement>(null);
  const cardSpring = spring;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        if (active) {
          setActive(null);
        } else if (isFolderOpen) {
          setIsFolderOpen(false);
        }
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (active) {
          setActive(null);
        } else if (isFolderOpen) {
          setIsFolderOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [active, isFolderOpen]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => {
      setScreenTier(mq.matches ? "lg" : window.innerWidth >= 640 ? "md" : "sm");
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // 5 Layered Documents with real written intelligence text peeking out
  const peekCards = [
    {
      id: "doc-career-fit",
      w: 86,
      h: 88,
      initialX: -48,
      initialY: -28,
      initialRotate: -12,
      hoverX: -58,
      hoverY: -42,
      hoverRotate: -15,
      zIndex: 10,
      tag: "INTEL",
      page: "01",
      title: "Career Trajectory",
      lines: [
        "Stream fit analysis",
        "Match score: 98.4%",
        "Engineering track",
      ],
    },
    {
      id: "doc-cutoff-telemetry",
      w: 92,
      h: 94,
      initialX: -26,
      initialY: -34,
      initialRotate: -5,
      hoverX: -32,
      hoverY: -50,
      hoverRotate: -7,
      zIndex: 14,
      tag: "NTA // 2026",
      page: "02",
      title: "Cutoff Telemetry",
      lines: [
        "JEE / CUET cutoffs",
        "Percentile: 99.2",
        "Preference matrix",
      ],
    },
    {
      id: "doc-decision-matrix",
      w: 94,
      h: 98,
      initialX: 0,
      initialY: -40,
      initialRotate: 1,
      hoverX: 0,
      hoverY: -56,
      hoverRotate: 2,
      zIndex: 12,
      tag: "DECISION DSS",
      page: "03",
      title: "Strategic Matrix",
      lines: [
        "Aptitude diagnostic",
        "Forecast trajectory",
        "Curated roadmap",
      ],
    },
    {
      id: "doc-psychometrics",
      w: 90,
      h: 92,
      initialX: 26,
      initialY: -34,
      initialRotate: 7,
      hoverX: 32,
      hoverY: -50,
      hoverRotate: 10,
      zIndex: 13,
      tag: "RIASEC",
      page: "04",
      title: "Psychometrics",
      lines: [
        "Investigative fit",
        "15/15 traits synced",
        "Cognitive profile",
      ],
    },
    {
      id: "doc-action-plan",
      w: 86,
      h: 88,
      initialX: 48,
      initialY: -28,
      initialRotate: 13,
      hoverX: 58,
      hoverY: -42,
      hoverRotate: 16,
      zIndex: 11,
      tag: "MILESTONES",
      page: "05",
      title: "Action Plan",
      lines: [
        "Counseling schedule",
        "Key deadlines 2026",
        "Milestone steps",
      ],
    },
  ];

  // Spacing & Card Dimensions for the open Zig-Zag layout inside the transparent glass window
  const zigZagDimensions = {
    lg: {
      baseW: 240,
      baseH: 340,
      activeW: 390,
      activeH: 490,
      spacing: cardSpacing,
    },
    md: {
      baseW: 210,
      baseH: 300,
      activeW: 340,
      activeH: 450,
      spacing: Math.round(cardSpacing * 0.75),
    },
    sm: {
      baseW: 175,
      baseH: 255,
      activeW: 285,
      activeH: 390,
      spacing: Math.round(cardSpacing * 0.42),
    },
  }[screenTier];

  const middle = (cards.length - 1) / 2;

  return (
    <div className="relative flex w-full items-center justify-center overflow-visible py-6">
      <AnimatePresence mode="wait">
        {!isFolderOpen ? (
          /* =========================================================================
             CLOSED STATE: SKY BLUE FOLDER WITH WRITTEN DOCUMENTS & "MY WORLD" TITLE
             ========================================================================= */
          <motion.div
            key="closed-folder"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.88, y: 15 }}
            transition={cardSpring}
            onClick={() => setIsFolderOpen(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setIsFolderOpen(true);
              }
            }}
            tabIndex={0}
            role="button"
            aria-label="Open My World folder"
            onMouseEnter={() => setIsFolderHovered(true)}
            onMouseLeave={() => setIsFolderHovered(false)}
            className="relative cursor-pointer flex flex-col items-center select-none py-4 group focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-3xl"
          >
            {/* Folder 3D Body Container - Slightly compact refined scale */}
            <motion.div
              animate={{
                scale: isFolderHovered ? 1.05 : 1,
                y: isFolderHovered ? -7 : 0,
              }}
              transition={cardSpring}
              className="relative w-[236px] sm:w-[252px] h-[160px] sm:h-[172px]"
            >
              {/* Soft Diffused Sky Blue Ground Shadow */}
              <div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[210px] sm:w-[226px] h-[26px] rounded-full blur-xl pointer-events-none transition-all duration-300"
                style={{
                  background: isFolderHovered
                    ? "radial-gradient(ellipse at center, rgba(92, 160, 248, 0.48) 0%, rgba(92, 160, 248, 0) 72%)"
                    : "radial-gradient(ellipse at center, rgba(92, 160, 248, 0.36) 0%, rgba(92, 160, 248, 0) 70%)",
                  transform: `translateX(-50%) scale(${isFolderHovered ? 1.12 : 1})`,
                }}
              />

              {/* Pure Sky Blue Back Flap Panel */}
              <div
                className="absolute inset-0 rounded-[26px] sm:rounded-[30px] overflow-hidden shadow-lg"
                style={{
                  background: "linear-gradient(180deg, #7db7fc 0%, #5b9ff7 100%)",
                  boxShadow: "0 12px 28px rgba(85, 155, 248, 0.28)",
                }}
              />

              {/* 5 Layered Documents with Written Content Peeking Out */}
              {peekCards.map((card) => {
                return (
                  <motion.div
                    key={card.id}
                    initial={{
                      x: card.initialX,
                      y: card.initialY,
                      rotate: card.initialRotate,
                    }}
                    animate={{
                      x: isFolderHovered ? card.hoverX : card.initialX,
                      y: isFolderHovered ? card.hoverY : card.initialY,
                      rotate: isFolderHovered ? card.hoverRotate : card.initialRotate,
                    }}
                    transition={cardSpring}
                    style={{
                      zIndex: card.zIndex,
                      marginLeft: -(card.w / 2),
                      marginTop: -(card.h / 2),
                      width: card.w,
                      height: card.h,
                    }}
                    className="absolute top-1/2 left-1/2 pointer-events-none select-none"
                  >
                    <div className="w-full h-full bg-white rounded-[10px] p-2 sm:p-2.5 shadow-md shadow-sky-950/15 ring-1 ring-black/[0.04] flex flex-col justify-between overflow-hidden select-none text-slate-800">
                      {/* Top Row: Tag + Page */}
                      <div className="flex items-center justify-between border-b border-slate-100 pb-1">
                        <span className="font-mono text-[6px] font-extrabold text-sky-600 uppercase tracking-wider">
                          {card.tag}
                        </span>
                        <span className="font-mono text-[5.5px] font-bold text-slate-400">
                          {card.page}
                        </span>
                      </div>

                      {/* Document Title & Written Text */}
                      <div className="my-auto space-y-0.5">
                        <p className="font-sans font-black text-[7.5px] text-slate-900 leading-tight">
                          {card.title}
                        </p>
                        <div className="space-y-0.5 text-[5px] font-sans text-slate-600 leading-[1.25]">
                          {card.lines.map((line, idx) => (
                            <p key={idx} className="truncate">{line}</p>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Row */}
                      <div className="flex items-center justify-between border-t border-slate-100 pt-0.5 text-[5px] font-mono text-slate-400">
                        <span className="font-semibold">SAARTHI</span>
                        <span className="text-sky-600 font-bold">✓</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Frosted Translucent Sky-Blue Front Pocket */}
              <div className="absolute inset-x-0 bottom-0 h-[126px] sm:h-[136px] z-20 pointer-events-none select-none">
                <svg
                  viewBox="0 0 252 136"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full overflow-visible drop-shadow-[0_14px_24px_rgba(80,150,245,0.3)]"
                >
                  <defs>
                    {/* Frosted Translucent Sky Blue Gradient */}
                    <linearGradient id="skyFolderFrontGrad" x1="0" y1="0" x2="0.1" y2="1">
                      <stop offset="0%" stopColor="#e2f1ff" stopOpacity="0.88" />
                      <stop offset="28%" stopColor="#b4dcfe" stopOpacity="0.72" />
                      <stop offset="65%" stopColor="#81beff" stopOpacity="0.84" />
                      <stop offset="100%" stopColor="#5ea2f8" stopOpacity="0.95" />
                    </linearGradient>

                    {/* Specular Rim Stroke */}
                    <linearGradient id="skyRimStroke" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(255, 255, 255, 0.95)" />
                      <stop offset="30%" stopColor="rgba(255, 255, 255, 0.5)" />
                      <stop offset="100%" stopColor="rgba(255, 255, 255, 0.1)" />
                    </linearGradient>
                  </defs>

                  {/* Asymmetrical Tab Front Pocket Silhouette */}
                  <path
                    d="M 0 24 A 24 24 0 0 1 24 0 L 84 0 C 100 0, 110 22, 126 22 L 228 22 A 24 24 0 0 1 252 46 L 252 112 A 24 24 0 0 1 228 136 L 24 136 A 24 24 0 0 1 0 112 Z"
                    fill="url(#skyFolderFrontGrad)"
                  />

                  {/* Top Rim Highlight */}
                  <path
                    d="M 0 24 A 24 24 0 0 1 24 0 L 84 0 C 100 0, 110 22, 126 22 L 228 22 A 24 24 0 0 1 252 46 L 252 112 A 24 24 0 0 1 228 136 L 24 136 A 24 24 0 0 1 0 112 Z"
                    fill="none"
                    stroke="url(#skyRimStroke)"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </motion.div>

            {/* Folder Caption Label: "My World" + click hint */}
            <div className="mt-4 text-center">
              <p className="font-sans font-semibold text-[16px] sm:text-[17px] text-white tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] group-hover:text-sky-200 transition-colors">
                My World
              </p>
              <p className="font-mono text-[10.5px] text-slate-400 uppercase tracking-widest mt-0.5 opacity-85 group-hover:opacity-100 group-hover:text-sky-300 transition-all flex items-center justify-center gap-1">
                <span>Click to open folder</span>
                <span className="group-hover:translate-x-0.5 transition-transform">↗</span>
              </p>
            </div>
          </motion.div>
        ) : (
          /* =========================================================================
             OPEN STATE: MACOS TRANSPARENT GLASS WINDOW WITH CARDS OPENED IN ZIG-ZAG
             ========================================================================= */
          <motion.div
            key="mac-glass-window"
            ref={ref}
            initial={{ opacity: 0, scale: 0.88, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 20 }}
            transition={cardSpring}
            className="relative w-full max-w-5xl xl:max-w-6xl rounded-[26px] sm:rounded-[30px] border border-white/25 shadow-[0_35px_100px_-15px_rgba(0,0,0,0.45),0_0_1px_1px_rgba(255,255,255,0.2),inset_0_1px_2px_rgba(255,255,255,0.25)] overflow-hidden bg-white/[0.07] dark:bg-slate-950/20 backdrop-blur-3xl text-slate-100 select-none mx-auto min-h-[530px] sm:min-h-[570px] flex flex-col justify-between"
          >
            {/* 1. MACOS TRANSPARENT GLASS TITLEBAR */}
            <div className="h-12 sm:h-13 bg-white/[0.08] dark:bg-white/[0.04] backdrop-blur-md border-b border-white/15 px-4 sm:px-5 flex items-center justify-between select-none z-30">
              {/* Left: Traffic Lights */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setActive(null);
                    setIsFolderOpen(false);
                  }}
                  aria-label="Close window"
                  className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] border border-[#e0443e] hover:opacity-85 active:scale-90 flex items-center justify-center group transition-all cursor-pointer"
                >
                  <X size={8.5} className="text-black/70 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActive(null);
                    setIsFolderOpen(false);
                  }}
                  aria-label="Minimize window"
                  className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] border border-[#dea123] hover:opacity-85 active:scale-90 flex items-center justify-center group transition-all cursor-pointer"
                >
                  <Minus size={8.5} className="text-black/70 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  aria-label="Zoom window"
                  className="w-3.5 h-3.5 rounded-full bg-[#27c93f] border border-[#1aab29] hover:opacity-85 active:scale-90 flex items-center justify-center group transition-all cursor-pointer"
                >
                  <Maximize2 size={7.5} className="text-black/70 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                {/* Finder Navigation Arrows */}
                <div className="hidden sm:flex items-center gap-0.5 ml-3 pl-3 border-l border-white/15 text-slate-300">
                  <button
                    type="button"
                    onClick={() => setActive(null)}
                    disabled={!active}
                    aria-label="Previous view"
                    className={cn(
                      "p-1 rounded hover:bg-white/10 transition-colors",
                      !active ? "opacity-30 cursor-not-allowed" : "cursor-pointer"
                    )}
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <button
                    type="button"
                    disabled
                    aria-label="Next view"
                    className="p-1 rounded opacity-30 cursor-not-allowed"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              {/* Center: Window Title / Breadcrumb */}
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-white/95 drop-shadow-sm">
                <Folder size={15} className="text-sky-400 fill-sky-400/30" />
                <span className="font-semibold tracking-tight">
                  {active ? `Vol. 0${active.number} — ${active.titleLine1} ${active.titleLine2}` : "My World"}
                </span>
                <span className="text-white/40">•</span>
                <span className="text-white/70 font-mono text-[11px] hidden md:inline">
                  {active ? active.category : "5 Intelligence Dossiers"}
                </span>
              </div>

              {/* Right: Actions / View Controls */}
              <div className="flex items-center gap-2">
                {active ? (
                  <button
                    type="button"
                    onClick={() => setActive(null)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/15 hover:bg-white/25 text-white text-xs font-medium transition-all cursor-pointer backdrop-blur-md"
                  >
                    <ChevronLeft size={13} />
                    <span>All Cards</span>
                  </button>
                ) : (
                  <div className="hidden sm:flex items-center bg-white/10 rounded-lg p-0.5 border border-white/15 text-xs backdrop-blur-md">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-white/20 text-white font-medium text-[11px]">
                      <LayoutGrid size={11} />
                      <span>Zig-Zag</span>
                    </span>
                    <span className="px-2 py-0.5 text-white/70 text-[11px]">5 Opened</span>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setActive(null);
                    setIsFolderOpen(false);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-all flex items-center gap-1 cursor-pointer"
                >
                  <X size={13} />
                  <span className="hidden sm:inline">Close</span>
                </button>
              </div>
            </div>

            {/* 2. WINDOW CANVAS: CARDS OPENED IN EXACT ZIG-ZAG MANNER */}
            <div className="relative w-full flex-1 min-h-[440px] sm:min-h-[480px] flex items-center justify-center overflow-visible p-4">
              {/* Subtle glass reflection & ambient light */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] via-transparent to-black/[0.08] pointer-events-none" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[180px] bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />

              {cards.map((card, index) => {
                const offsetX = (index - middle) * zigZagDimensions.spacing;
                const isCurrentActive = active?.id === card.id;
                const anyActive = Boolean(active);

                // Exact Zig-Zag coordinates from landing
                const targetX = isCurrentActive
                  ? 0
                  : anyActive
                    ? offsetX * 0.35
                    : offsetX;

                const targetY = isCurrentActive
                  ? 0
                  : anyActive
                    ? 320
                    : screenTier === "sm"
                      ? card.config.y * 0.6
                      : card.config.y;

                const targetRotate = isCurrentActive
                  ? 0
                  : anyActive
                    ? 0.12 * card.config.rotate
                    : card.config.rotate;

                const targetScale = isCurrentActive
                  ? 1
                  : anyActive
                    ? 0.65
                    : 1;

                const targetZIndex = isCurrentActive
                  ? 100
                  : 20 + card.config.zIndex;

                const targetWidth = isCurrentActive
                  ? zigZagDimensions.activeW
                  : zigZagDimensions.baseW;

                const targetHeight = isCurrentActive
                  ? zigZagDimensions.activeH
                  : zigZagDimensions.baseH;

                return (
                  <motion.div
                    key={card.id}
                    role="button"
                    tabIndex={0}
                    initial={{
                      x: 0,
                      y: 0,
                      scale: 0.85,
                      opacity: 0,
                    }}
                    animate={{
                      width: targetWidth,
                      height: targetHeight,
                      x: targetX,
                      y: targetY,
                      rotate: targetRotate,
                      scale: targetScale,
                      opacity: anyActive && !isCurrentActive ? 0.2 : 1,
                    }}
                    whileHover={
                      !isCurrentActive && !anyActive
                        ? {
                            scale: 1.05,
                            y: targetY - 18,
                            zIndex: 60,
                            transition: { type: "spring", stiffness: 400, damping: 25 },
                          }
                        : undefined
                    }
                    transition={cardSpring}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActive(isCurrentActive ? null : card);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.stopPropagation();
                        setActive(isCurrentActive ? null : card);
                      }
                    }}
                    style={{
                      marginLeft: -(targetWidth / 2),
                      marginTop: -(targetHeight / 2),
                      zIndex: targetZIndex,
                    }}
                    className={cn(
                      "absolute top-1/2 left-1/2 flex flex-col justify-between overflow-hidden select-none transition-shadow cursor-pointer rounded-[24px] sm:rounded-[28px] border shadow-2xl",
                      card.className,
                      isCurrentActive
                        ? "ring-2 ring-white/60 cursor-default p-2"
                        : "hover:shadow-[0_25px_60px_-10px_rgba(0,0,0,0.35)]"
                    )}
                  >
                    {!isCurrentActive ? (
                      /* Full Cover with sliding tab flap hover interaction */
                      <FolderCardCover card={card} screenTier={screenTier} />
                    ) : (
                      /* Expanded Bento Grid Drawer */
                      <AnimatePresence mode="popLayout">
                        <motion.div
                          layoutId={card.id + "-description"}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 12 }}
                          transition={cardSpring}
                          className="flex flex-col justify-between h-full w-full p-4 sm:p-5 text-left z-10 select-none overflow-hidden"
                        >
                          {/* Top Bar: Category, Badge & Close Button */}
                          <div className="flex items-center justify-between pb-2 border-b border-current/15">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest font-bold opacity-75">
                                {card.category}
                              </span>
                              <span className="px-1.5 py-0.5 rounded text-[8px] sm:text-[8.5px] font-mono font-black uppercase tracking-wider bg-current/10 border border-current/20">
                                {card.badge}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActive(null);
                              }}
                              aria-label="Close"
                              className={cn(
                                "p-1.5 rounded-full transition-all hover:scale-110 active:scale-95 border cursor-pointer",
                                card.closeBtnClass
                              )}
                            >
                              <X size={13} />
                            </button>
                          </div>

                          {/* Header: Title & Description */}
                          <div className="pt-2">
                            <h2 className={cn("font-sans text-xl sm:text-2xl font-extrabold tracking-tight leading-tight", card.titleColor)}>
                              {card.titleLine1} {card.titleLine2}
                            </h2>
                            <p className={cn("mt-1.5 font-outfit text-xs leading-relaxed line-clamp-3", card.descColor)}>
                              {card.description}
                            </p>
                          </div>

                          {/* Middle: 2x2 Bento Metric Matrix */}
                          <div className="grid grid-cols-2 gap-2 my-auto py-2">
                            {card.metrics.map((metric, idx) => (
                              <div
                                key={idx}
                                className={cn(
                                  "p-2.5 rounded-xl flex flex-col justify-center transition-all duration-200",
                                  card.bentoClass
                                )}
                              >
                                <span className={cn("font-sans text-base sm:text-lg font-black tracking-tight", card.metricValueColor)}>
                                  {metric.value}
                                </span>
                                <span className={cn("font-outfit text-[10px] leading-tight font-medium mt-0.5", card.metricLabelColor)}>
                                  {metric.label}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Highlights Pill Row */}
                          <div className="flex flex-wrap gap-1.5 pb-2">
                            {card.highlights.map((highlight, hIdx) => (
                              <span
                                key={hIdx}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-current/10 text-[9px] sm:text-[9.5px] font-mono font-semibold"
                              >
                                <span className="w-1 h-1 rounded-full bg-current" />
                                {highlight}
                              </span>
                            ))}
                          </div>

                          {/* Action Buttons Row */}
                          <div className="pt-2 flex items-center justify-between gap-2 border-t border-current/15">
                            <Link
                              href={card.href}
                              onClick={(e) => e.stopPropagation()}
                              className={cn(
                                "inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-outfit text-xs font-bold tracking-wide transition-transform hover:scale-105 active:scale-95 shadow-lg",
                                card.buttonClass
                              )}
                            >
                              <span>{card.ctaText}</span>
                              <ArrowUpRight size={14} />
                            </Link>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActive(null);
                              }}
                              className={cn(
                                "inline-flex items-center gap-1 px-3 py-2 rounded-xl font-outfit text-xs font-semibold transition-all hover:scale-105 active:scale-95 border cursor-pointer",
                                card.closeBtnClass
                              )}
                            >
                              <span>Back</span>
                              <X size={12} />
                            </button>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* 3. MACOS STATUS BAR */}
            <div className="h-8 bg-white/[0.05] border-t border-white/10 px-4 sm:px-5 flex items-center justify-between text-[10.5px] font-mono text-white/70 select-none z-20">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-white/90">5 items</span>
                <span>•</span>
                <span>140+ Branches</span>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:inline">2.4M+ Candidates</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white/90 font-medium">Grounded with Gemini 2.5 Flash</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const InterfaceCraftsCards = Cards;
export default Cards;
