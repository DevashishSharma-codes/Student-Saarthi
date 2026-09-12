"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { GlobeMarker } from "@/components/ui/3d-globe";
import { HowWeHelpValleySection } from "@/components/landing/HowWeHelpValleySection";
import {
  Compass,
  ArrowRight,
  GraduationCap,
  MapPin,
  TrendingUp,
  ShieldCheck,
  Coins,
  Globe2,
  ExternalLink,
  FileText,
} from "lucide-react";

// Dynamically import Globe3D to prevent SSR hydration mismatches in Next.js
const Globe3D = dynamic(
  () => import("@/components/ui/3d-globe").then((mod) => mod.Globe3D),
  {
    ssr: false,
    loading: () => (
      <div className="h-[340px] sm:h-[400px] w-full flex flex-col items-center justify-center gap-2 bg-transparent">
        <div className="w-8 h-8 border-2 border-[#60782c] border-t-transparent animate-spin" />
        <span className="font-mono text-[11px] uppercase tracking-widest text-[#60782c]">
          Loading 3D Earth Telemetry...
        </span>
      </div>
    ),
  }
);

interface OrbitCountry {
  id: string;
  name: string;
  flag: string;
  stat: string;
  angleDeg: number;
  radiusXPercent: number; // Offset % from center of orbit stage
  radiusYPercent: number; // Offset % from center of orbit stage
  topColleges: string;
  avgSalary: string;
  cutoffText: string;
  payback: string;
  defensibility: string;
  lat: number;
  lng: number;
  markerSrc: string;
}

// Ordered sequentially along the natural rotation of the Earth
const ORBIT_COUNTRIES: OrbitCountry[] = [
  // 1. India (Top Center)
  {
    id: "india",
    name: "India",
    flag: "🇮🇳",
    stat: "1,200+ Tier-1 • ₹24.1L Avg",
    angleDeg: -90,
    radiusXPercent: 0,
    radiusYPercent: -42,
    topColleges: "IIT Bombay, IIT Delhi, IIM Ahmedabad, AIIMS",
    avgSalary: "₹24.1 LPA Median (Top ₹3.6 Cr Intl)",
    cutoffText: "JEE Advanced AIR < 65 • CAT 99.85%ile • JoSAA Matrix",
    payback: "4-Month Full Degree Payback",
    defensibility: "96% AI Defensibility Index",
    lat: 19.1334,
    lng: 72.9133,
    markerSrc: "https://assets.aceternity.com/avatars/5.webp",
  },
  // 2. Singapore (Top Right)
  {
    id: "singapore",
    name: "Singapore",
    flag: "🇸🇬",
    stat: "NUS Global #8 • S$78K Tech",
    angleDeg: -45,
    radiusXPercent: 36,
    radiusYPercent: -28,
    topColleges: "National University of Singapore (NUS), NTU",
    avgSalary: "S$78,000 / yr (₹48 LPA)",
    cutoffText: "CBSE 95%+ or JEE Advanced Top 2% Percentile",
    payback: "11-Month Singapore Tuition Grant Payback",
    defensibility: "96% AI Defensibility Index",
    lat: 1.2966,
    lng: 103.7764,
    markerSrc: "https://assets.aceternity.com/avatars/8.webp",
  },
  // 3. Japan (Right)
  {
    id: "japan",
    name: "Japan",
    flag: "🇯🇵",
    stat: "Univ of Tokyo • ¥7.2M Robotics",
    angleDeg: 0,
    radiusXPercent: 44,
    radiusYPercent: 0,
    topColleges: "University of Tokyo, Kyoto University, Tokyo Tech",
    avgSalary: "¥7,200,000 / yr (₹42 LPA)",
    cutoffText: "EJU Science Matrix or PEAK Global English Program",
    payback: "12-Month MEXT Scholarship Payback",
    defensibility: "95% AI Defensibility Index",
    lat: 35.7128,
    lng: 139.7620,
    markerSrc: "https://assets.aceternity.com/avatars/10.webp",
  },
  // 4. Australia (Bottom Right)
  {
    id: "australia",
    name: "Australia",
    flag: "🇦🇺",
    stat: "Melbourne & Go8 • AUD $88K",
    angleDeg: 45,
    radiusXPercent: 36,
    radiusYPercent: 28,
    topColleges: "Univ of Melbourne, Univ of Sydney, UNSW",
    avgSalary: "AUD $88,000 / yr (₹48 LPA)",
    cutoffText: "CBSE 90%+ Overall • 2-4 Year Post-Study Visa",
    payback: "16-Month Post-Study Work Visa Payback",
    defensibility: "94% AI Defensibility Index",
    lat: -37.7964,
    lng: 144.9612,
    markerSrc: "https://assets.aceternity.com/avatars/12.webp",
  },
  // 5. United States (Bottom Center)
  {
    id: "usa",
    name: "United States",
    flag: "🇺🇸",
    stat: "MIT & Stanford • $138K STEM",
    angleDeg: 90,
    radiusXPercent: 0,
    radiusYPercent: 42,
    topColleges: "MIT, Stanford, Harvard, UC Berkeley, Caltech",
    avgSalary: "$138,000 / yr (₹1.15 Cr Median)",
    cutoffText: "SAT 1550+ • 3-Year STEM OPT Work Authorization",
    payback: "14-Month STEM OPT Payback",
    defensibility: "98% AI Defensibility Index",
    lat: 42.3601,
    lng: -71.0942,
    markerSrc: "https://assets.aceternity.com/avatars/1.webp",
  },
  // 6. Canada (Bottom Left)
  {
    id: "canada",
    name: "Canada",
    flag: "🇨🇦",
    stat: "U of Toronto • CAD $92K PGWP",
    angleDeg: 135,
    radiusXPercent: -36,
    radiusYPercent: 28,
    topColleges: "University of Toronto (U15), McGill, UBC",
    avgSalary: "CAD $92,000 / yr (₹56 LPA)",
    cutoffText: "CBSE / ISC 92%+ with Math • 3-Year PGWP Visa",
    payback: "18-Month PGWP Work Visa Payback",
    defensibility: "94% AI Defensibility Index",
    lat: 43.6629,
    lng: -79.3957,
    markerSrc: "https://assets.aceternity.com/avatars/11.webp",
  },
  // 7. United Kingdom (Left)
  {
    id: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    stat: "Oxbridge • £72K Starting",
    angleDeg: 180,
    radiusXPercent: -44,
    radiusYPercent: 0,
    topColleges: "Oxford, Cambridge, Imperial College, LSE",
    avgSalary: "£72,000 / yr (₹76 LPA Median)",
    cutoffText: "CBSE 96%+ • 2-Year Post-Study Work Route",
    payback: "15-Month UK Graduate Route Payback",
    defensibility: "96% AI Defensibility Index",
    lat: 51.7548,
    lng: -1.2544,
    markerSrc: "https://assets.aceternity.com/avatars/3.webp",
  },
  // 8. Switzerland & Europe (Top Left)
  {
    id: "switzerland",
    name: "Switzerland",
    flag: "🇨🇭",
    stat: "ETH Zurich • CHF 110K",
    angleDeg: -135,
    radiusXPercent: -36,
    radiusYPercent: -28,
    topColleges: "ETH Zurich (QS Continental Europe #1), EPFL",
    avgSalary: "CHF 110,000 / yr (₹1.05 Cr Median)",
    cutoffText: "Comprehensive Entrance Examination • ECTS Transfers",
    payback: "7-Month Low Tuition Swiss Payback",
    defensibility: "99% AI Defensibility Index",
    lat: 47.3763,
    lng: 8.5477,
    markerSrc: "https://assets.aceternity.com/avatars/9.webp",
  },
];

export function GlobalCollegesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [manualTarget, setManualTarget] = useState<OrbitCountry | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // As the globe continuously spins, dynamically highlight whichever country is currently facing front
  const handleFacingLngChange = (facingLng: number) => {
    if (isPaused) return;

    let minDiff = Infinity;
    let closestIndex = 0;
    ORBIT_COUNTRIES.forEach((c, index) => {
      let diff = Math.abs(c.lng - facingLng);
      if (diff > 180) diff = 360 - diff;
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = index;
      }
    });

    setCurrentIndex(closestIndex);
  };

  const selectedCountry = ORBIT_COUNTRIES[currentIndex];

  const handleCountryClick = (country: OrbitCountry, index: number) => {
    setCurrentIndex(index);
    setManualTarget(country);
    setIsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
      setManualTarget(null);
    }, 6000);
  };

  const globeMarkers: GlobeMarker[] = ORBIT_COUNTRIES.map((c) => ({
    lat: c.lat,
    lng: c.lng,
    src: c.markerSrc,
    label: `${c.name} (${c.flag})`,
  }));

  return (
    <div className="w-full text-black flex flex-col items-center select-none space-y-12 sm:space-y-16">
      {/* 1, 2, 3: Orbit Stage, Globe & Telemetry Ticker Container (Contained max-w-7xl) */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 flex flex-col items-center space-y-6 sm:space-y-8">
        {/* =========================================================================
            1. COMPACT, HIGH-IMPACT EDITORIAL HEADING (ONE-SCREEN FIT)
            ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-2 px-2">
          <h2 className="font-outfit text-3xl sm:text-5xl lg:text-5xl font-light tracking-tight text-black leading-tight">
          Colleges across India{" "}
          <span className="text-[#60782c] font-normal">and around the globe.</span>
        </h2>

        <p className="font-outfit text-xs sm:text-sm text-neutral-600 font-light max-w-xl mx-auto leading-relaxed">
          From domestic premier institutes (IITs, IIMs, AIIMS) to Ivy League and European research universities — explore verified cutoffs, currency-adjusted tuition ROI, and AI defensibility.
        </p>
      </div>

      {/* =========================================================================
          2. THE ORBIT STAGE: 3D GLOBE CENTERED + COUNTRIES IN CIRCULAR MANNER
          ========================================================================= */}
      <div className="relative w-full max-w-5xl h-[460px] sm:h-[500px] lg:h-[520px] flex items-center justify-center overflow-visible my-auto">
        {/* Visual Orbital Rings in #60782c */}
        <div className="absolute inset-4 sm:inset-6 lg:inset-8 border border-dashed border-[#60782c]/25 rounded-full pointer-events-none" />
        <div className="absolute inset-16 sm:inset-20 lg:inset-24 border border-black/5 rounded-full pointer-events-none" />

        {/* Center: Free-Floating 3D Globe with continuous moving animation */}
        <div className="relative z-10 w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] lg:w-[400px] lg:h-[400px] flex items-center justify-center">
          <Globe3D
            markers={globeMarkers}
            focusCoordinates={manualTarget ? { lat: manualTarget.lat, lng: manualTarget.lng } : null}
            onFacingLngChange={handleFacingLngChange}
            config={{
              radius: 1.9,
              atmosphereColor: "#38bdf8",
              atmosphereIntensity: 14,
              bumpScale: 1.5,
              autoRotateSpeed: 0.22,
              enableZoom: false,
              enablePan: false,
            }}
            onMarkerClick={(marker) => {
              const foundIndex = ORBIT_COUNTRIES.findIndex(
                (c) => marker.label && marker.label.includes(c.name)
              );
              if (foundIndex !== -1) {
                handleCountryClick(ORBIT_COUNTRIES[foundIndex], foundIndex);
              }
            }}
            onMarkerHover={(marker) => {
              if (marker) {
                const foundIndex = ORBIT_COUNTRIES.findIndex(
                  (c) => marker.label && marker.label.includes(c.name)
                );
                if (foundIndex !== -1) {
                  handleCountryClick(ORBIT_COUNTRIES[foundIndex], foundIndex);
                }
              }
            }}
          />
        </div>

        {/* 8 Orbiting Country Nodes Positioned in a Circular Manner Around the Globe (Clean Text & Flag, No Pill BG) */}
        {ORBIT_COUNTRIES.map((c, index) => {
          const isSelected = selectedCountry.id === c.id;

          return (
            <button
              key={c.id}
              onClick={() => handleCountryClick(c, index)}
              style={{
                top: `calc(50% + ${c.radiusYPercent}%)`,
                left: `calc(50% + ${c.radiusXPercent}%)`,
                transform: "translate(-50%, -50%)",
              }}
              className={`absolute z-20 transition-all duration-300 text-left cursor-pointer p-1 group ${
                isSelected ? "scale-105 z-30" : "hover:scale-105 opacity-85 hover:opacity-100"
              }`}
            >
              <div className="flex items-center gap-2 whitespace-nowrap">
                <span className="text-base sm:text-lg leading-none select-none">{c.flag}</span>
                <div className="flex flex-col">
                  <span
                    className={`font-mono text-xs tracking-wider uppercase leading-tight transition-colors ${
                      isSelected ? "text-[#60782c] font-bold" : "text-black group-hover:text-[#60782c] font-semibold"
                    }`}
                  >
                    {c.name}
                  </span>
                  <span className="font-mono text-[9.5px] tracking-wide text-[#60782c] font-medium leading-none mt-0.5">
                    {c.stat}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* =========================================================================
          3. SUBTLE LIVE GLOBE TELEMETRY TICKER
          ========================================================================= */}
      <div className="w-full max-w-5xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 px-3 py-3 border-t border-b border-black/10 text-xs text-neutral-600 mt-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#60782c] animate-pulse shrink-0" />
          <span className="font-mono text-[11px] font-bold text-neutral-900 uppercase tracking-wider">
            {selectedCountry.flag} {selectedCountry.name}:
          </span>
          <span className="font-sans text-xs text-neutral-700">
            {selectedCountry.topColleges}
          </span>
        </div>
        <div className="flex items-center gap-3.5 font-mono text-[11px] self-end sm:self-auto">
          <span className="text-neutral-500 hidden md:inline">
            Avg: <strong className="text-[#60782c] font-bold">{selectedCountry.avgSalary}</strong>
          </span>
          <span className="text-neutral-500 hidden md:inline">
            Payback: <strong className="text-black font-semibold">{selectedCountry.payback}</strong>
          </span>
          <Link href="/colleges" className="text-[#60782c] hover:underline flex items-center gap-1 font-semibold">
            View Country Institutes <ArrowRight size={11} />
          </Link>
        </div>
      </div>
      </div>

      {/* =========================================================================
          4A. EXCLUSIVE FEATURES HEADING + ANIMATED SHOWCASE + 4 COLUMNS (Contained max-w-5xl)
          ========================================================================= */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-6 sm:pt-10 space-y-8 select-text">
        <div className="space-y-4 sm:space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="font-serif text-2xl sm:text-4xl text-neutral-900 font-normal tracking-tight leading-tight">
              Exclusive <em className="italic font-serif">features</em> for your next{" "}
              <span className="relative inline-block px-1.5 mx-0.5">
                <em className="italic font-serif text-[#60782c] relative z-10 font-semibold not-italic sm:italic">career</em>
                
                {/* Hand-drawn ink doodle loop circling "career" */}
                <svg
                  className="absolute -inset-x-2 -inset-y-1 w-[calc(100%+16px)] h-[calc(100%+8px)] pointer-events-none z-0"
                  viewBox="0 0 120 44"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 24 C 8 10, 30 4, 60 5 C 95 6, 114 12, 112 25 C 110 38, 80 41, 40 40 C 20 39, 6 34, 12 18 C 15 12, 28 8, 48 6"
                    stroke="#60782c"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-80"
                  />
                </svg>

                {/* Hand-drawn doodle arrow pointing at "career" */}
                <svg
                  className="absolute -top-6 -right-6 w-7 h-7 pointer-events-none text-[#60782c] hidden sm:block"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M32 4 C 28 14, 20 18, 10 28"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M8 19 L 10 29 L 20 27"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M34 10 L 38 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M28 2 L 31 -1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </span>{" "}
              <em className="italic font-serif">breakthrough</em>.
            </h3>
            <p className="font-sans text-xs sm:text-sm text-neutral-500 font-normal max-w-md mx-auto">
              Everything ambitious students need to navigate college admissions, entrance exams, and high-ROI careers.
            </p>
          </div>

          {/* Bakernews Animated Characters Showcase - Trimmed vacant top/bottom whitespace */}
          <div className="w-full flex justify-center items-center overflow-hidden">
            <div className="relative w-full max-w-3xl h-[190px] sm:h-[230px] md:h-[250px] flex items-center justify-center overflow-hidden">
              <Image
                src="/illustrations/bakernews_animation.gif"
                alt="Student Saarthi Community & Features Animation"
                width={800}
                height={600}
                unoptimized
                className="w-full max-w-[740px] h-auto object-contain select-none pointer-events-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pt-2">
            {/* Feature 1: Deep AI Research (Boy with Laptop & College) */}
            <div className="flex flex-col items-start space-y-3 group">
              <div className="h-28 sm:h-32 flex items-end">
                <Image
                  src="/illustrations/char_college_laptop.png"
                  alt="Deep AI Research"
                  width={200}
                  height={180}
                  className="w-24 h-24 sm:w-28 sm:h-28 object-contain group-hover:-translate-y-1.5 transition-transform duration-300 select-none"
                />
              </div>
              <h4 className="font-outfit text-base font-semibold text-neutral-900 tracking-tight">
                Deep AI Research
              </h4>
              <p className="font-sans text-xs text-neutral-600 leading-relaxed">
                Autonomous multi-agent intelligence auditing real cutoffs, NIRF placement data, peer groups, and verified faculty ratios.
              </p>
            </div>

            {/* Feature 2: Live Exam Radar (Boy with phone & Best College search) */}
            <div className="flex flex-col items-start space-y-3 group">
              <div className="h-28 sm:h-32 flex items-end">
                <Image
                  src="/illustrations/char_best_college_search.png"
                  alt="Live Exam Radar"
                  width={200}
                  height={180}
                  className="w-24 h-24 sm:w-28 sm:h-28 object-contain group-hover:-translate-y-1.5 transition-transform duration-300 select-none"
                />
              </div>
              <h4 className="font-outfit text-base font-semibold text-neutral-900 tracking-tight">
                Live Exam Radar
              </h4>
              <p className="font-sans text-xs text-neutral-600 leading-relaxed">
                Real-time alerts on 50+ national & global entrance tests, syllabus shifts, registration deadlines, and quota calculators.
              </p>
            </div>

            {/* Feature 3: Verified Placements (Boy pointing to clipboard audit) */}
            <div className="flex flex-col items-start space-y-3 group">
              <div className="h-28 sm:h-32 flex items-end">
                <Image
                  src="/illustrations/char_clipboard_placements.png"
                  alt="Verified Placements"
                  width={200}
                  height={180}
                  className="w-24 h-24 sm:w-28 sm:h-28 object-contain group-hover:-translate-y-1.5 transition-transform duration-300 select-none"
                />
              </div>
              <h4 className="font-outfit text-base font-semibold text-neutral-900 tracking-tight">
                Verified Placements
              </h4>
              <p className="font-sans text-xs text-neutral-600 leading-relaxed">
                Unbiased salary metrics, real median CTCs, campus life auditing, and verified peer reviews without marketing fluff.
              </p>
            </div>

            {/* Feature 4: Global ROI & Fees (Students with campus map & university building) */}
            <div className="flex flex-col items-start space-y-3 group">
              <div className="h-28 sm:h-32 flex items-end">
                <Image
                  src="/illustrations/char_campus_map_transparent.png"
                  alt="Global ROI & Fees"
                  width={240}
                  height={220}
                  className="w-24 h-24 sm:w-28 sm:h-28 object-contain group-hover:-translate-y-1.5 transition-transform duration-300 select-none"
                />
              </div>
              <h4 className="font-outfit text-base font-semibold text-neutral-900 tracking-tight">
                Global ROI & Fees
              </h4>
              <p className="font-sans text-xs text-neutral-600 leading-relaxed">
                Currency-adjusted tuition payback modeling, scholarship probabilities, and post-study work visa (PGWP) roadmaps.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          4B. EDITORIAL SHOWCASE - "Be the first-in on verified college intelligence"
          FULL VIEWPORT WIDTH, NO OUTER BORDER, CLEAN UNBOUNDED PRESENTATION
          ========================================================================= */}
      <div className="relative w-full bg-white border-t border-neutral-200/70 py-12 sm:py-16 select-text">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-10 space-y-8 sm:space-y-10">
          {/* Top Row: Title + Graduation Hat Side Doodle */}
          <div className="flex flex-row items-start justify-between gap-4 pb-2 sm:pb-4">
            <div className="space-y-3 max-w-xl">
              <h3 className="font-outfit text-2xl sm:text-3xl lg:text-4xl text-neutral-900 font-semibold tracking-tight leading-[1.18]">
                Be the <span className="font-serif italic font-normal text-[#60782c]">first-in</span> on <br className="hidden sm:inline" />
                verified college intelligence.
              </h3>
              <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Introducing Student Saarthi, intelligent tools for verified placements, real-time cutoffs, ROI payback modeling, and international student pathways.
              </p>
            </div>

            {/* Top-Right: Graduation Hat Side Doodle + Brand Mark */}
            <div className="flex flex-col items-end gap-1 shrink-0 pt-1">
              <div className="relative -rotate-12 hover:rotate-3 transition-transform duration-300 select-none cursor-pointer group">
                <Image
                  src="/illustrations/doodle_grad_hat.png"
                  alt="Graduation Hat Doodle"
                  width={90}
                  height={80}
                  className="w-14 sm:w-20 md:w-24 h-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform"
                  unoptimized
                />
              </div>
              <div className="hidden md:flex items-center gap-1 text-neutral-400 font-outfit text-xs font-semibold tracking-tight pt-1">
                <span className="text-neutral-500 font-bold">Student Saarthi</span>
                <span className="text-neutral-400 font-normal">Intelligence</span>
              </div>
            </div>
          </div>

          {/* Center: The 4 Colorful Doodle Capsule Windows + User's Doodle Characters */}
          <div className="relative w-full flex flex-col items-center justify-center py-4 sm:py-6">
            {/* 4 Capsule Doodle Windows with Authentic Hand-Drawn Looping Doodle Borders */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full max-w-3xl mx-auto pb-4">
              {/* Window 1: Blue Hand-Drawn Doodle Capsule (Global Ivy) */}
              <div className="relative p-4 sm:p-5 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1.5 -rotate-1 group cursor-default">
                {/* Hand-Drawn Sketch Capsule Border with Organic Wobble, Looping Overshoot & Corner Hatches */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
                  viewBox="0 0 100 135"
                  preserveAspectRatio="none"
                >
                  {/* Outer hand-inked looping outline */}
                  <path
                    d="M 26,5.2 C 14,4.5 4.5,14 4.2,33 C 3.8,55 5.5,78 4.5,100 C 3.8,118 13.5,130.8 30,130.5 C 50,131.2 72,130 82,130.5 C 93,131 96.2,118 95.8,99 C 95.2,77 96.5,54 95.5,33 C 94.8,15 85,4.5 69,5 C 51,5.5 34,4.8 22,5.2 C 12,5.6 4.5,16 5,36"
                    fill="#eff6ff"
                    stroke="#2563eb"
                    strokeWidth="3.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Subtle pencil hatch marks at corner */}
                  <path
                    d="M 11,20 L 7,26 M 15,17 L 11,23 M 88,115 L 94,119 M 84,118 L 90,122"
                    stroke="#2563eb"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    opacity="0.5"
                  />
                </svg>

                {/* Hand-Drawn Doodle Icon 1: Diploma Scroll with Ribbon & Verified Stamp (No Stars!) */}
                <div className="relative z-10 my-1">
                  <svg
                    width="44"
                    height="44"
                    viewBox="0 0 48 48"
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:scale-110 transition-transform"
                  >
                    {/* Rolled Diploma Scroll */}
                    <path d="M 10,14 C 10,10 14,8 18,8 L 36,8 C 40,8 42,11 41,15 L 37,34 C 36,38 32,40 28,40 L 12,40 C 8,40 7,37 8,33 L 11,15" />
                    <path d="M 10,14 C 13,16 17,15 18,8" />
                    <path d="M 28,40 C 31,38 33,35 34,31 L 37,13" strokeDasharray="1.5 2.5" />
                    {/* Ribbon band tied around scroll */}
                    <path d="M 21,11 L 19,37" strokeWidth="2.8" />
                    <path d="M 25,11 L 23,37" strokeWidth="2.8" />
                    {/* Ribbon bow & tails */}
                    <circle cx="21" cy="24" r="2.8" fill="#2563eb" />
                    <path d="M 21,27 L 17,34 M 22,27 L 23,35" strokeWidth="2.2" />
                    {/* Official Verified Degree Seal */}
                    <circle cx="31" cy="22" r="4.5" stroke="#2563eb" strokeWidth="2" fill="#eff6ff" />
                    <path d="M 29.5,22 L 31,23.5 L 33,20.5" stroke="#2563eb" strokeWidth="2" />
                  </svg>
                </div>
                <span className="relative z-10 font-outfit text-xs sm:text-sm font-bold text-neutral-900 leading-tight mt-1">
                  Global Ivy
                </span>
                <span className="relative z-10 font-mono text-[10px] text-[#2563eb] font-semibold mt-0.5">
                  QS Top 100
                </span>
                <p className="relative z-10 font-sans text-[11px] text-neutral-600 mt-1 leading-tight hidden sm:block">
                  Overseas & Ivy cutoffs
                </p>
              </div>

              {/* Window 2: Red Hand-Drawn Doodle Capsule (Domestic Tier-1) */}
              <div className="relative p-4 sm:p-5 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1.5 rotate-1 group cursor-default">
                {/* Hand-Drawn Sketch Capsule Border with Organic Wobble & Looping Overshoot */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
                  viewBox="0 0 100 135"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 30,5 C 16,5.2 5.5,15 5,34 C 4.5,54 5.8,78 5,100 C 4.5,118 15,130 32,130 C 52,130 70,130.5 81,130 C 92,129.5 96.5,117 95.8,98 C 95.2,76 96,54 95.2,33 C 94.5,15 84,5 68,5.2 C 48,5.5 30,4.8 19,5.8 C 9.5,6.8 5.2,18 5.8,38"
                    fill="#fff1f2"
                    stroke="#ef4444"
                    strokeWidth="3.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Subtle pencil hatch marks */}
                  <path
                    d="M 8,110 L 13,116 M 13,107 L 18,113 M 87,18 L 92,23 M 83,21 L 88,26"
                    stroke="#ef4444"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    opacity="0.5"
                  />
                </svg>

                {/* Hand-Drawn Doodle Icon 2: Campus Columns, Pediment & Victory Flag */}
                <div className="relative z-10 my-1">
                  <svg
                    width="44"
                    height="44"
                    viewBox="0 0 48 48"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:scale-110 transition-transform"
                  >
                    <path d="M 6,18 L 24,7 L 42,18 Z" />
                    <path d="M 20,15 C 20,12.5 28,12.5 28,15 Z" fill="#ef4444" />
                    <path d="M 4,20 L 44,20" />
                    <path d="M 11,20 L 11,35" />
                    <path d="M 19,20 L 19,35" />
                    <path d="M 29,20 L 29,35" />
                    <path d="M 37,20 L 37,35" />
                    <path d="M 7,35 L 41,35" />
                    <path d="M 4,39 L 44,39" />
                    <path d="M 24,7 L 24,2 M 24,2 L 31,4.5 L 24,7" />
                  </svg>
                </div>
                <span className="relative z-10 font-outfit text-xs sm:text-sm font-bold text-neutral-900 leading-tight mt-1">
                  Domestic Tier-1
                </span>
                <span className="relative z-10 font-mono text-[10px] text-[#ef4444] font-semibold mt-0.5">
                  IIT • BITS • IIM
                </span>
                <p className="relative z-10 font-sans text-[11px] text-neutral-600 mt-1 leading-tight hidden sm:block">
                  National exam radar
                </p>
              </div>

              {/* Window 3: Yellow/Amber Hand-Drawn Doodle Capsule (Verified CTCs) */}
              <div className="relative p-4 sm:p-5 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1.5 -rotate-0.5 group cursor-default">
                {/* Hand-Drawn Sketch Capsule Border with Organic Wobble & Looping Overshoot */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
                  viewBox="0 0 100 135"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 28,5.2 C 15,4.8 5.2,16 5.8,34 C 6.2,56 4.8,77 5.5,99 C 6,117 15,130.5 31,130 C 51,129.5 70,130.5 82,130 C 94,129.5 96.5,116 95.8,97 C 95.2,75 96.2,52 95.5,33 C 94.8,15 85,5.2 69,5 C 50,4.5 32,5.8 21,5.2 C 11,4.8 5.2,15 5.8,33"
                    fill="#fffbeb"
                    stroke="#f59e0b"
                    strokeWidth="3.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Subtle pencil hatch marks */}
                  <path
                    d="M 9,24 L 14,28 M 13,20 L 18,24 M 86,110 L 91,115 M 82,114 L 87,119"
                    stroke="#f59e0b"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    opacity="0.5"
                  />
                </svg>

                {/* Hand-Drawn Doodle Icon 3: Audited Placement Clipboard & CTC Bars */}
                <div className="relative z-10 my-1">
                  <svg
                    width="44"
                    height="44"
                    viewBox="0 0 48 48"
                    fill="none"
                    stroke="#d97706"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:scale-110 transition-transform"
                  >
                    {/* Clipboard body */}
                    <rect x="9" y="8" width="30" height="34" rx="4" />
                    {/* Top clamp */}
                    <path d="M 18,8 L 18,5 C 18,3.5 20,3 24,3 C 28,3 30,3.5 30,5 L 30,8 Z" fill="#fef3c7" />
                    {/* 2 Verified placement checklist lines */}
                    <path d="M 14,16 L 17,19 L 22,14" strokeWidth="2.5" />
                    <path d="M 25,16 L 33,16" />
                    <path d="M 14,24 L 17,27 L 22,22" strokeWidth="2.5" />
                    <path d="M 25,24 L 33,24" />
                    {/* Salary CTC rising bar graph */}
                    <path d="M 15,36 L 18,36" strokeWidth="4" />
                    <path d="M 21,36 L 24,32" strokeWidth="4" />
                    <path d="M 27,36 L 30,28" strokeWidth="4" />
                    <path d="M 33,36 L 36,24" strokeWidth="4" />
                  </svg>
                </div>
                <span className="relative z-10 font-outfit text-xs sm:text-sm font-bold text-neutral-900 leading-tight mt-1">
                  Verified CTCs
                </span>
                <span className="relative z-10 font-mono text-[10px] text-[#d97706] font-semibold mt-0.5">
                  100% Audited
                </span>
                <p className="relative z-10 font-sans text-[11px] text-neutral-600 mt-1 leading-tight hidden sm:block">
                  Real median salaries
                </p>
              </div>

              {/* Window 4: Olive Green Hand-Drawn Doodle Capsule (High ROI Visas) */}
              <div className="relative p-4 sm:p-5 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1.5 rotate-1 group cursor-default">
                {/* Hand-Drawn Sketch Capsule Border with Organic Wobble & Looping Overshoot */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
                  viewBox="0 0 100 135"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 30,4.8 C 15,5 5.5,15 5,34 C 4.5,54 5.8,76 5,98 C 4.5,116 15,130 32,130.5 C 52,131 72,130 82,130.5 C 93,131 96,118 95.2,99 C 94.5,78 95.8,55 95,35 C 94.2,16 85,4.8 68,5 C 50,5.2 32,4.5 21,5 C 11,5.5 5,16 5.5,36"
                    fill="#f4f7ee"
                    stroke="#60782c"
                    strokeWidth="3.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Subtle pencil hatch marks */}
                  <path
                    d="M 10,18 L 15,23 M 15,15 L 20,20 M 85,115 L 90,120 M 81,118 L 86,123"
                    stroke="#60782c"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    opacity="0.5"
                  />
                </svg>

                {/* Hand-Drawn Doodle Icon 4: Passport & Official VISA APPROVED Stamp */}
                <div className="relative z-10 my-1">
                  <svg
                    width="44"
                    height="44"
                    viewBox="0 0 48 48"
                    fill="none"
                    stroke="#60782c"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:scale-110 transition-transform"
                  >
                    {/* Passport booklet cover */}
                    <rect x="8" y="8" width="22" height="32" rx="3" />
                    {/* Emblem circle */}
                    <circle cx="19" cy="20" r="5" strokeWidth="2" />
                    <path d="M 13,31 L 23,31" />
                    <path d="M 13,34 L 20,34" />
                    {/* Circular VISA APPROVED Stamp */}
                    <circle cx="33" cy="27" r="10" strokeWidth="2.2" fill="#f4f7ee" strokeDasharray="3 1.5" />
                    <path d="M 28,27 L 32,30 L 38,23" strokeWidth="2.6" />
                    <path d="M 28,33 C 31,35 35,35 38,33" strokeWidth="1.8" />
                  </svg>
                </div>
                <span className="relative z-10 font-outfit text-xs sm:text-sm font-bold text-neutral-900 leading-tight mt-1">
                  High ROI Visas
                </span>
                <span className="relative z-10 font-mono text-[10px] text-[#60782c] font-semibold mt-0.5">
                  Payback Model
                </span>
                <p className="relative z-10 font-sans text-[11px] text-neutral-600 mt-1 leading-tight hidden sm:block">
                  Tuition ROI & PGWP
                </p>
              </div>
            </div>

            {/* Doodle Characters: 5 friends sitting with one raising hand ("Be the first one") */}
            <div className="relative w-full max-w-lg flex flex-col items-center pt-2 select-none">
              {/* Hand-drawn style floating badge above the raised finger */}
              <div className="absolute top-0 left-[35%] -translate-x-1/2 -translate-y-2 hidden sm:flex items-center gap-1 bg-white border-2 border-neutral-900 shadow-[2px_2px_0px_0px_#000] px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold text-neutral-900 -rotate-3 select-none pointer-events-none z-10">
                <span>First to know!</span>
                <span className="text-[#60782c]">✓</span>
              </div>

              <Image
                src="/illustrations/char_first_one_doodle.png"
                alt="Be the first-in on verified college intelligence"
                width={859}
                height={340}
                className="w-full max-w-sm sm:max-w-md md:max-w-lg h-auto object-contain hover:scale-[1.02] transition-transform duration-300"
                unoptimized
              />
            </div>
          </div>

          {/* Bottom Row: Brand Logo + 4 App Micro-Icons + Links matching reference */}
          <div className="pt-6 mt-2 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Left: Brand + 4 Product App Icons */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-5">
              <div className="flex items-center gap-2">
                <span className="font-outfit text-base sm:text-lg font-bold tracking-tight text-neutral-900 flex items-center gap-1.5">
                  <GraduationCap className="text-[#60782c]" size={20} />
                  Student Saarthi
                </span>
              </div>

              {/* 4 Intelligence Feature Icons matching the 4 apps in the reference poster */}
              <div className="flex items-center gap-2 pl-2 sm:border-l sm:border-neutral-200">
                <div
                  className="w-7 h-7 rounded-md bg-blue-50 border border-blue-200/80 flex items-center justify-center text-blue-600 hover:scale-110 transition-transform cursor-pointer"
                  title="Deep AI Research"
                >
                  <FileText size={13} />
                </div>
                <div
                  className="w-7 h-7 rounded-md bg-rose-50 border border-rose-200/80 flex items-center justify-center text-rose-600 hover:scale-110 transition-transform cursor-pointer"
                  title="Live Exam Radar"
                >
                  <Compass size={13} />
                </div>
                <div
                  className="w-7 h-7 rounded-md bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-600 hover:scale-110 transition-transform cursor-pointer"
                  title="Verified Placements"
                >
                  <TrendingUp size={13} />
                </div>
                <div
                  className="w-7 h-7 rounded-md bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-600 hover:scale-110 transition-transform cursor-pointer"
                  title="Global ROI & Visas"
                >
                  <Globe2 size={13} />
                </div>
              </div>
            </div>

            {/* Right: URL + Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-mono text-neutral-400 hidden lg:inline">
                studentsaarthi.com/colleges
              </span>
              <Link href="/colleges">
                <button className="h-9 px-4 bg-[#60782c] hover:bg-[#4a5f22] text-white font-mono text-xs uppercase tracking-wider font-semibold transition-all rounded shadow-sm flex items-center gap-1.5 cursor-pointer">
                  <GraduationCap size={13} />
                  Explore 1,200+
                </button>
              </Link>
              <Link href="/research">
                <button className="h-9 px-3.5 bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-300 font-mono text-xs uppercase tracking-wider font-semibold transition-all rounded flex items-center gap-1.5 cursor-pointer">
                  <FileText size={13} className="text-[#60782c]" />
                  Run AI Audit
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          4C. "HOW WE HELP" INTERACTIVE SHOWCASE (VALLEY.CO STYLE)
          FULL VIEWPORT WIDTH, 4 PERSONA TABS, LIVE DECISION FEED MOCKUP
          ========================================================================= */}
      <HowWeHelpValleySection />
    </div>
  );
}

export default GlobalCollegesSection;
