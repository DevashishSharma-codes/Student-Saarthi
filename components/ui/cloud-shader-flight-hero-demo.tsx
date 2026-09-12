"use client";

import { motion } from "framer-motion";
import { CloudShader } from "@/components/ui/cloud-shader";
import Link from "next/link";
import { Compass, ArrowRight } from "lucide-react";
import { LogoMark } from "@/components/common/LogoMark";

export default function CloudShaderFlightHeroDemo() {
  return (
    <div className="relative h-dvh min-h-[40rem] w-full overflow-hidden bg-gradient-to-t from-[#8cbfe8] to-[#3876ba]">
      {/* clouds drift left to right; the sky fades in softly on mount */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      >
        {/* the shader renders at half size and upscales 2x — the clouds are
            soft so nothing visible is lost, and the GPU does a quarter of
            the fragment work, which keeps the drift smooth */}
        <div className="absolute h-1/2 w-1/2 origin-top-left scale-200">
          <CloudShader speed={1} className="absolute inset-0" />
        </div>
      </motion.div>

      {/* navbar */}
      <nav className="relative z-30 mx-auto flex w-full max-w-7xl items-center justify-between px-4 pt-6 md:px-8">
        <div className="flex items-center gap-10">
          <span className="text-lg font-semibold tracking-tight text-white flex items-center gap-2">
            <LogoMark size={22} className="text-white shrink-0" /> Student Saarthi
          </span>
          <div className="hidden items-center gap-8 text-sm font-medium text-white/90 md:flex">
            <Link href="/colleges" className="transition hover:text-white">
              Colleges
            </Link>
            <Link href="/simulator" className="transition hover:text-white">
              Simulators
            </Link>
            <Link href="/exams" className="transition hover:text-white">
              Exam Radar
            </Link>
            <Link href="/calculator" className="transition hover:text-white">
              ROI Calculator
            </Link>
          </div>
        </div>
        <Link
          href="/research"
          className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-black transition hover:bg-white/90"
        >
          Explore Cutoffs
        </Link>
      </nav>

      {/* hero content, left aligned with the navbar */}
      <div className="relative z-20 mx-auto mt-12 w-full max-w-7xl px-4 md:mt-20 md:px-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-mono tracking-wider mb-4">
            <Compass size={13} className="text-emerald-300" />
            <span>DIRECT FLIGHT // GATEWAY TO TOP INSTITUTIONS 2026</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white [text-shadow:0_2px_14px_rgba(15,42,67,0.4)] md:text-6xl">
            Fly to Your Dream College
          </h1>
          <p className="mt-4 max-w-xl text-base text-balance text-white/90 md:text-lg leading-relaxed">
            Your window seat to IITs, AIIMS, BITS &amp; 500+ premier institutions. Watch cutoffs in real-time, predict your branch admissions, and take off with 100% verified intelligence.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/colleges"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90 flex items-center gap-2 shadow-lg"
            >
              <span>Board Your Dream Campus</span>
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/simulator"
              className="rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15 backdrop-blur-sm border border-white/30"
            >
              Simulate Cutoffs
            </Link>
          </div>

          {/* social proof */}
          <div className="mt-8 flex items-center gap-3">
            <div className="flex -space-x-2.5">
              {[1, 2, 3, 4, 5].map((i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={`https://assets.aceternity.com/avatars/${i}.webp`}
                  alt={`Aspirant ${i}`}
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full border-2 border-white/80 object-cover"
                />
              ))}
            </div>
            <p className="text-sm text-white/90">
              <span className="font-semibold text-white">60,000+</span> aspirants successfully landed at their target colleges
            </p>
          </div>
        </div>
      </div>

      {/* window-seat wing view with a gentle in-flight bob */}
      <motion.div
        className="pointer-events-none absolute -bottom-6 left-0 z-10 w-[85%] md:w-[70%]"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://assets.aceternity.com/components/plane-wing.png"
          alt="Airplane wing above the clouds"
          className="h-auto w-full object-cover"
        />
      </motion.div>
    </div>
  );
}
export { CloudShaderFlightHeroDemo };
