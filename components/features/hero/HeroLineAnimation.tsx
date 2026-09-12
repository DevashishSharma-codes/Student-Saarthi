"use client";

import { motion } from "framer-motion";
import { LogoMark } from "@/components/common/LogoMark";

const PATHS = [
  { d: "M 0 0 L 0 408", transform: "translate(370 0)" },
  {
    d: "M 145 0 L 98.814 0 L -15 83.557 L -15 298",
    transform: "translate(400 110)",
  },
  {
    d: "M -145 0 L -98.814 0 L 15 83.557 L 15 298",
    transform: "translate(340 110)",
  },
  { d: "M 0 0 L 340 0 L 340 187", transform: "translate(0 221)" },
  { d: "M 0 0 L -340 0 L -340 187", transform: "translate(740 221)" },
];

export function HeroLineAnimation() {
  return (
    <div className="pointer-events-none z-20 w-full px-4 sm:px-6 pb-6 sm:pb-8 md:pb-10 mt-auto select-none">
      {/* Responsive stage with max-height & viewport scaling */}
      <div className="relative mx-auto aspect-[734/405] max-h-[22vh] sm:max-h-[26vh] md:max-h-[28vh] lg:max-h-[32vh] w-full max-w-[500px] sm:max-w-[650px] lg:max-w-[740px]">
        {/* Staggered Entrance Capability Tags */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto border border-white/40 bg-gradient-to-br from-black/55 via-black/45 to-black/35 backdrop-blur-xl px-2.5 py-1 sm:px-3.5 sm:py-1.5 text-center font-mono text-[8px] sm:text-[9px] md:text-[11px] font-semibold uppercase text-white shadow-xl tracking-wider absolute left-[50.41%] top-0 z-30 w-fit -translate-x-1/2 -translate-y-1/2 gpu-layer"
        >
          Autonomous Deep Research
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto border border-white/40 bg-gradient-to-br from-black/55 via-black/45 to-black/35 backdrop-blur-xl px-2.5 py-1 sm:px-3.5 sm:py-1.5 text-center font-mono text-[8px] sm:text-[9px] md:text-[11px] font-semibold uppercase text-white shadow-xl tracking-wider absolute left-[24.68%] top-[27.16%] z-30 w-fit -translate-x-1/2 -translate-y-1/2 gpu-layer"
        >
          National Exam Radar
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.56, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto border border-white/40 bg-gradient-to-br from-black/55 via-black/45 to-black/35 backdrop-blur-xl px-2.5 py-1 sm:px-3.5 sm:py-1.5 text-center font-mono text-[8px] sm:text-[9px] md:text-[11px] font-semibold uppercase text-white shadow-xl tracking-wider absolute left-[76.84%] top-[27.16%] z-30 w-fit -translate-x-1/2 -translate-y-1/2 gpu-layer"
        >
          Career Pathway Simulator
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.64, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto border border-white/40 bg-gradient-to-br from-black/55 via-black/45 to-black/35 backdrop-blur-xl px-2.5 py-1 sm:px-3.5 sm:py-1.5 text-center font-mono text-[8px] sm:text-[9px] md:text-[11px] font-semibold uppercase text-white shadow-xl tracking-wider absolute left-[12%] sm:left-0 top-[54.56%] z-30 w-fit -translate-x-1/2 -translate-y-1/2 gpu-layer"
        >
          <span className="block sm:inline">College </span>
          <span className="block sm:inline">Fact-Checker</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto border border-white/40 bg-gradient-to-br from-black/55 via-black/45 to-black/35 backdrop-blur-xl px-2.5 py-1 sm:px-3.5 sm:py-1.5 text-center font-mono text-[8px] sm:text-[9px] md:text-[11px] font-semibold uppercase text-white shadow-xl tracking-wider absolute left-[88%] sm:left-full top-[54.56%] z-30 w-fit -translate-x-1/2 -translate-y-1/2 gpu-layer"
        >
          <span className="block sm:inline">Education </span>
          <span className="block sm:inline">ROI DSS</span>
        </motion.div>

        {/* Converging SVG Line Paths (Pure CSS Hardware Accelerated) */}
        <motion.svg
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.6, ease: "easeOut" }}
          role="presentation"
          viewBox="0 0 734 405"
          className="absolute inset-0 h-full w-full z-10 gpu-layer"
          shapeRendering="geometricPrecision"
          fill="none"
        >
          {PATHS.map((path, idx) => (
            <g key={idx} transform={path.transform}>
              {/* Background Guide Line */}
              <path
                d={path.d}
                stroke="rgba(23, 19, 15, 0.16)"
                strokeWidth={2.5}
              />
              {/* Moving Line Dash */}
              <path
                d={path.d}
                pathLength={1}
                stroke="#17130f"
                strokeWidth={2.5}
                strokeLinecap="square"
                className="animate-hero-dash"
              />
            </g>
          ))}
        </motion.svg>

        {/* Destination Node: Glass Square Box with Bubble Reflection & Student Saarthi Logo */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto absolute bottom-0 left-[50.41%] size-20 sm:size-24 md:size-28 lg:size-32 aspect-square -translate-x-1/2 translate-y-1/2 rounded-none p-3 sm:p-4 z-50 flex items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-105 border-2 border-white/95 ring-4 ring-black/5 shadow-xl gpu-layer"
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.97) 0%, rgba(245, 243, 240, 0.90) 100%)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
          }}
        >
          {/* Glass Bubble Top Sheen */}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white via-white/70 to-transparent pointer-events-none opacity-90 z-0" />
          <div
            className="absolute inset-x-2 top-1 h-8 sm:h-12 bg-gradient-to-b from-white via-white/50 to-transparent pointer-events-none opacity-90 z-0"
            style={{ borderRadius: "50% 50% 0 0 / 100% 100% 0 0" }}
          />

          <LogoMark className="relative z-10 text-[#17130f] w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 shrink-0" />
        </motion.div>
      </div>
    </div>
  );
}

export default HeroLineAnimation;
