"use client";

import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import Image from "next/image";
import { InterfaceCraftsCards } from "@/components/landing/InterfaceCraftsCards";
import { GlobalCollegesSection } from "@/components/landing/GlobalCollegesSection";
import {
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {

  return (
    <main className="min-h-screen bg-[#0a0908] text-[#f7f4ee] selection:bg-[#f7f4ee] selection:text-[#0a0908] relative overflow-x-hidden font-sans">
      <Header />

      {/* =========================================================================
          HERO SECTION (Original Artwork Background + Interactive Cards)
          ========================================================================= */}
      <section className="relative w-full pt-16 sm:pt-20 pb-0 px-4 sm:px-6 md:px-10 lg:px-12 flex flex-col items-center justify-between select-none overflow-visible min-h-screen h-screen min-h-[100dvh]">
        {/* User Provided Background Image - Covers the Whole Screen */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <Image
            src="/image.png"
            alt="Students holding glowing cloud over rolling green valley"
            fill
            priority
            className="object-cover object-center"
            quality={100}
          />
        </div>

        {/* Top: Hero Content in High-Contrast Deep Forest Editorial Style */}
        <div className="relative z-20 w-full max-w-5xl mx-auto text-center flex flex-col items-center pt-2 sm:pt-4">
          <div className="relative w-full flex flex-col items-center">
            {/* Headline (Deep Forest Charcoal Typography with Supreme Contrast on Morning Sky) */}
            <h1 className="font-outfit font-light tracking-[-0.03em] leading-[1.06] text-[#0f291e] text-3xl sm:text-5xl md:text-5xl lg:text-[3.5rem] max-w-4xl mx-auto">
              Real-Time Higher Ed
              <span className="block font-serif italic font-normal text-[#123826] mt-0.5 sm:mt-1">
                &amp; Career Intelligence.
              </span>
            </h1>

            {/* Subtitle in Deep Forest Tone */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-[#1b3d2d] font-outfit font-normal max-w-xl mx-auto leading-relaxed"
            >
              Multi-step market intelligence grounded in Gemini 2.5, 60L+ aspirant national exam radar, branch simulators, and deterministic payback modeling.
            </motion.p>

            {/* Doodle Annotation: Positioned on the side of the main text, smaller scale */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="mt-3 md:mt-0 md:absolute md:top-8 lg:top-10 md:right-0 lg:-right-4 xl:-right-12 flex items-center justify-center select-none z-30 pointer-events-auto"
            >
              <Link
                href="/simulator"
                className="group inline-flex items-end gap-2 cursor-pointer transition-transform duration-300 hover:scale-[1.05]"
              >
                {/* Smaller Dotted Looping Doodle Arrow in Black */}
                <span
                  className="inline-block bg-black transition-colors shrink-0"
                  style={{
                    width: "48px",
                    height: `${(48 * 345) / 292}px`,
                    aspectRatio: "292 / 345",
                    maskImage: "url(/doodle-arrow.png)",
                    WebkitMaskImage: "url(/doodle-arrow.png)",
                    maskSize: "contain",
                    WebkitMaskSize: "contain",
                    maskRepeat: "no-repeat",
                    WebkitMaskRepeat: "no-repeat",
                    maskPosition: "center",
                    WebkitMaskPosition: "center",
                  }}
                  aria-hidden="true"
                />

                {/* Smaller Handwritten Doodle Text with Balance Icon */}
                <span
                  className="inline-flex items-center text-sm sm:text-base md:text-lg lg:text-xl text-black tracking-wide transition-colors -rotate-3 font-normal whitespace-nowrap mb-1"
                  style={{
                    fontFamily: '"Starlight", cursive, sans-serif',
                  }}
                >
                  <span>Balance dream</span>
                  {/* Smaller Playful Hand-Drawn Doodle Balance Scale Icon */}
                  <svg
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 inline-block text-black mx-1 sm:mx-1.5 shrink-0 stroke-[2.2] -rotate-3 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
                    aria-hidden="true"
                  >
                    {/* Central Stem & Base */}
                    <path d="M16 6v19M11 25.5c1.8-.6 3.2-.8 5-.8s3.2.2 5 .8" stroke="currentColor" strokeLinecap="round" />
                    {/* Playful Wobbly Crossbeam */}
                    <path d="M5.5 11.5c3.2-1 6.8-1.3 10.5-1.3s7.3.3 10.5 1.3" stroke="currentColor" strokeLinecap="round" />
                    {/* Left Pan Chains & Smile Pan (Dream side) */}
                    <path d="M6 12l-2.2 5.5M8.5 12L6 17.5" stroke="currentColor" strokeLinecap="round" />
                    <path d="M2.5 17.5c.8 2.4 4.7 2.4 5.5 0" stroke="currentColor" strokeLinecap="round" />
                    <circle cx="5.2" cy="16" r="1" fill="currentColor" />
                    {/* Right Pan Chains & Smile Pan (ROI side) */}
                    <path d="M26 12l-2.2 5.5M28.5 12L26 17.5" stroke="currentColor" strokeLinecap="round" />
                    <path d="M22.5 17.5c.8 2.4 4.7 2.4 5.5 0" stroke="currentColor" strokeLinecap="round" />
                    <circle cx="26.8" cy="16" r="1" fill="currentColor" />
                    {/* Pivot Top Ring with Playful Sparkle */}
                    <circle cx="16" cy="6" r="2" fill="currentColor" />
                    <path d="M16 2.5v1.2M14.2 3.8l1.8.8 1.8-.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="inline-flex items-baseline">
                    <span
                      className="font-bold text-[1.25em] leading-none inline-block mr-[0.5px]"
                      style={{ fontFamily: '"Caveat", "Kalam", cursive, sans-serif' }}
                    >
                      R
                    </span>
                    <span>oi</span>
                  </span>
                </span>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Bottom: Interactive Folder & Intelligence Cards Deck */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-30 w-full max-w-5xl mx-auto mt-auto pb-2 sm:pb-3"
        >
          <InterfaceCraftsCards />
        </motion.div>
      </section>

      {/* =========================================================================
          GLOBAL COLLEGES & DECISION SYSTEMS (3D Globe + How We Help Valley Section)
          ========================================================================= */}
      <section className="w-full pt-16 sm:pt-20 pb-0 bg-white text-neutral-950 border-t border-black/10 select-text relative z-10">
        <GlobalCollegesSection />
      </section>

      {/* =========================================================================
          VERIFIED TESTIMONIALS (CONVERSION STYLE: CENTERED EDITORIAL + 5-TIER STEPPED BANDS)
          Generous breathing room between cards and rectangular bands
          ========================================================================= */}
      <section className="w-full pt-16 sm:pt-20 pb-0 bg-white text-neutral-950 border-t border-neutral-200 select-text relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 space-y-8 sm:space-y-10 w-full">
          
          {/* Top: Centered Brand Mark & Large Editorial Headline */}
          <div className="text-center max-w-3xl mx-auto space-y-2.5">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-neutral-100 border border-neutral-300 rounded-none mb-1.5">
              <div className="w-4 h-4 bg-neutral-950 text-white font-mono text-[10px] font-bold flex items-center justify-center rounded-none">
                S
              </div>
              <span className="font-outfit font-semibold text-xs text-neutral-900 tracking-tight">
                Student Saarthi
              </span>
            </div>

            <h2 className="font-outfit text-3xl sm:text-5xl lg:text-[46px] font-light text-neutral-950 tracking-tight leading-[1.08]">
              The student intelligence <span className="font-serif italic font-normal">platform.</span>
            </h2>

            <p className="font-outfit text-xs sm:text-sm text-neutral-600 font-light max-w-lg mx-auto leading-relaxed pt-0.5">
              Verified outcomes, unbiased branch telemetry, and zero coaching sponsorships. Trusted by 60,000+ students and parents across 28 Indian states.
            </p>
          </div>

          {/* Testimonial Cards Grid (Full-Sized Long Cards with Transparent Mirror Style Border) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 max-w-6xl mx-auto w-full">
            
            {/* Testimonial 1 */}
            <div className="relative min-h-[320px] sm:min-h-[350px] p-6 sm:p-7 lg:p-8 rounded-none border border-white/70 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.95),inset_0_-1.5px_2px_rgba(0,0,0,0.08),0_16px_40px_-10px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.06)] hover:border-white hover:shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_24px_50px_-8px_rgba(0,0,0,0.18)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-5 sm:space-y-6 overflow-hidden backdrop-blur-md">
              <Image
                src="/testimonial-bg-1.png"
                alt="Periwinkle blue texture"
                fill
                className="object-cover object-center pointer-events-none select-none z-0"
                priority
              />
              {/* Mirror Glass Sheen Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/15 to-transparent pointer-events-none z-[1]" />
              {/* Top Mirror Bevel Light Strip */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent opacity-90 z-20 pointer-events-none" />

              <div className="relative z-10 space-y-3.5 sm:space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[9.5px] uppercase tracking-wider px-2.5 py-1 bg-neutral-950/85 backdrop-blur-xs text-white font-semibold rounded-none border border-white/30 shadow-xs">
                    AIR 384 • IIT Bombay
                  </span>
                  <span className="font-mono text-[9.5px] text-[#1e3a8a] bg-white/80 backdrop-blur-sm border border-white/80 px-2 py-0.5 font-semibold flex items-center gap-1 rounded-none shadow-xs">
                    <ShieldCheck size={12} className="text-[#1d4ed8]" />
                    Verified
                  </span>
                </div>
                <p className="font-outfit text-xs sm:text-[13.5px] text-neutral-950 leading-relaxed font-light">
                  &ldquo;Student Saarthi eliminated all the marketing noise between Computer Science vs Mathematics &amp; Computing at IITs. The live cutoff percentiles gave our family 100% confidence on choice filling day.&rdquo;
                </p>
              </div>
              <div className="relative z-10 pt-3.5 sm:pt-4 border-t border-white/60 space-y-0.5">
                <p className="font-outfit text-xs sm:text-sm font-semibold text-neutral-950">Rohan Kulkarni</p>
                <p className="font-mono text-[10px] sm:text-[10.5px] text-neutral-700">JEE Advanced Aspirant • B.Tech CSE</p>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="relative min-h-[320px] sm:min-h-[350px] p-6 sm:p-7 lg:p-8 rounded-none border border-white/70 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.95),inset_0_-1.5px_2px_rgba(0,0,0,0.08),0_16px_40px_-10px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.06)] hover:border-white hover:shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_24px_50px_-8px_rgba(0,0,0,0.18)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-5 sm:space-y-6 overflow-hidden backdrop-blur-md">
              <Image
                src="/testimonial-bg-2.jpg"
                alt="Soft sage texture"
                fill
                className="object-cover object-center pointer-events-none select-none z-0"
                priority
              />
              {/* Mirror Glass Sheen Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/15 to-transparent pointer-events-none z-[1]" />
              {/* Top Mirror Bevel Light Strip */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent opacity-90 z-20 pointer-events-none" />

              <div className="relative z-10 space-y-3.5 sm:space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[9.5px] uppercase tracking-wider px-2.5 py-1 bg-neutral-950/85 backdrop-blur-xs text-white font-semibold rounded-none border border-white/30 shadow-xs">
                    Parent • NEET UG
                  </span>
                  <span className="font-mono text-[9.5px] text-[#065f46] bg-white/80 backdrop-blur-sm border border-white/80 px-2 py-0.5 font-semibold flex items-center gap-1 rounded-none shadow-xs">
                    <ShieldCheck size={12} className="text-[#047857]" />
                    ₹85L Saved
                  </span>
                </div>
                <p className="font-outfit text-xs sm:text-[13.5px] text-neutral-950 leading-relaxed font-light">
                  &ldquo;The ROI calculator saved our family from taking an ₹85 Lakh private medical college loan. We used the quota simulator to target premier state government institutions with zero debt burden.&rdquo;
                </p>
              </div>
              <div className="relative z-10 pt-3.5 sm:pt-4 border-t border-white/60 space-y-0.5">
                <p className="font-outfit text-xs sm:text-sm font-semibold text-neutral-950">Dr. P. Venkat</p>
                <p className="font-mono text-[10px] sm:text-[10.5px] text-neutral-700">Parent of Class 12 NEET Aspirant (AIR 1,240)</p>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="relative min-h-[320px] sm:min-h-[350px] p-6 sm:p-7 lg:p-8 rounded-none border border-white/70 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.95),inset_0_-1.5px_2px_rgba(0,0,0,0.08),0_16px_40px_-10px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.06)] hover:border-white hover:shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_24px_50px_-8px_rgba(0,0,0,0.18)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-5 sm:space-y-6 overflow-hidden backdrop-blur-md">
              <Image
                src="/testimonial-bg-3.png"
                alt="Sky to sunset gradient"
                fill
                className="object-cover object-center pointer-events-none select-none z-0"
                priority
              />
              {/* Mirror Glass Sheen Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/15 to-transparent pointer-events-none z-[1]" />
              {/* Top Mirror Bevel Light Strip */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent opacity-90 z-20 pointer-events-none" />

              <div className="relative z-10 space-y-3.5 sm:space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[9.5px] uppercase tracking-wider px-2.5 py-1 bg-neutral-950/85 backdrop-blur-xs text-white font-semibold rounded-none border border-white/30 shadow-xs">
                    CUET 792/800 • SRCC
                  </span>
                  <span className="font-mono text-[9.5px] text-[#9a3412] bg-white/80 backdrop-blur-sm border border-white/80 px-2 py-0.5 font-semibold flex items-center gap-1 rounded-none shadow-xs">
                    <ShieldCheck size={12} className="text-[#b45309]" />
                    Tier-1 Feeder
                  </span>
                </div>
                <p className="font-outfit text-xs sm:text-[13.5px] text-neutral-950 leading-relaxed font-light">
                  &ldquo;Deciding between DU North Campus Economics vs IIM Indore 5-Year IPM was a huge dilemma. Student Saarthi traced realistic starting compensation and Tier-1 firm recruitment mobility.&rdquo;
                </p>
              </div>
              <div className="relative z-10 pt-3.5 sm:pt-4 border-t border-white/60 space-y-0.5">
                <p className="font-outfit text-xs sm:text-sm font-semibold text-neutral-950">Ananya Sen</p>
                <p className="font-mono text-[10px] sm:text-[10.5px] text-neutral-700">B.Com (Hons) @ SRCC • DU North Campus</p>
              </div>
            </div>

          </div>

        </div>

        {/* =====================================================================
            SIGNATURE 5-TIER STEPPED COLORFUL HALFTONE BANDS (Conversion Style)
            Stepped Ladder: 22% -> 46% -> 73% -> 88% -> 100%
            Guaranteed generous breathing room between cards and rectangular bands
            ===================================================================== */}
        <div className="w-full mt-16 sm:mt-20 lg:mt-24 relative select-none">
          
          {/* Step 1: Deep Royal Blue / Violet (~22% width) */}
          <div className="w-[22%] sm:w-[24%] h-10 sm:h-11 bg-gradient-to-r from-[#1d2d88] via-[#2554c7] to-[#3b82f6] flex items-center relative overflow-hidden shadow-xs">
            <span className="text-[9.5px] sm:text-[10px] font-mono font-semibold text-white/95 uppercase tracking-widest pl-3 sm:pl-4 truncate">
              AIR 384 • IIT BOMBAY
            </span>
          </div>

          {/* Step 2: Sky Blue with Halftone Dots (~46% width) */}
          <div className="w-[46%] sm:w-[48%] h-10 sm:h-11 bg-gradient-to-r from-[#38bdf8] via-[#60a5fa] to-[#93c5fd] flex items-center relative overflow-hidden shadow-xs">
            <div
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{ backgroundImage: "radial-gradient(#1e3a8a 1.2px, transparent 1.2px)", backgroundSize: "6px 6px" }}
            />
            <span className="relative z-10 text-[9.5px] sm:text-[10px] font-mono font-semibold text-neutral-950 uppercase tracking-widest pl-3 sm:pl-4 truncate">
              NEET 685 • TOP STATE GOVT MBBS
            </span>
          </div>

          {/* Step 3: Mint / Seafoam Green (~73% width) */}
          <div className="w-[73%] sm:w-[75%] h-10 sm:h-11 bg-gradient-to-r from-[#86efac] via-[#bbf7d0] to-[#dcfce7] flex items-center relative overflow-hidden shadow-xs">
            <span className="text-[9.5px] sm:text-[10px] font-mono font-semibold text-neutral-900 uppercase tracking-widest pl-3 sm:pl-4 truncate">
              BITSAT 324 • PILANI COMPUTER SCIENCE
            </span>
          </div>

          {/* Step 4: Olive Green to Golden Amber with Halftone Dots (~88% width) */}
          <div className="w-[88%] sm:w-[90%] h-10 sm:h-11 bg-gradient-to-r from-[#2e5318] via-[#4d7c0f] to-[#eab308] flex items-center relative overflow-hidden shadow-xs">
            <div
              className="absolute inset-0 opacity-35 pointer-events-none"
              style={{ backgroundImage: "radial-gradient(#000000 1.2px, transparent 1.2px)", backgroundSize: "6px 6px" }}
            />
            <span className="relative z-10 text-[9.5px] sm:text-[10px] font-mono font-semibold text-white/95 uppercase tracking-widest pl-3 sm:pl-4 truncate">
              CUET 792/800 • SRCC DU NORTH CAMPUS
            </span>
          </div>

          {/* Step 5: Full Width Sunset Purple-Magenta to Coral (100% width) */}
          <div className="w-full h-11 sm:h-13 bg-gradient-to-r from-[#3b0764] via-[#701a75] via-[#db2777] to-[#fb7185] flex items-center justify-between px-3 sm:px-6 relative overflow-hidden">
            <span className="text-[9.5px] sm:text-[10.5px] font-mono font-semibold text-white uppercase tracking-widest truncate">
              60,000+ ADMISSIONS GUIDED // 100% UNBIASED EDITORIAL TELEMETRY
            </span>
            <span className="font-mono text-[9px] text-white/80 uppercase tracking-wider hidden sm:inline-block">
              2026 OFFICIAL DATA
            </span>
          </div>

        </div>

      </section>

      <Footer />
    </main>
  );
}
