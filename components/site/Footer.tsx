"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CloudShader } from "@/components/ui/cloud-shader";
import { LogoMark } from "@/components/common/LogoMark";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isMobile;
}

export function Footer() {
  const isMobile = useIsMobile();

  return (
    <footer className="relative w-full h-[calc(100vh-60px)] min-h-[660px] overflow-hidden select-none bg-gradient-to-r from-neutral-950 via-neutral-800 to-neutral-950 px-2 pt-3 sm:pt-5 md:px-8 md:pt-6 flex flex-col justify-between border-t border-white/10">
      {/* Plane Window Structure:
          black shell → dark bezel → 3D perspective dotted walls → light bezel → sky view */}
      <div className="h-full w-full rounded-t-[54px] bg-neutral-950 p-0.5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9),0_12px_32px_rgba(0,0,0,0.6)] md:rounded-t-[200px] flex flex-col">
        <div className="relative h-full overflow-hidden rounded-t-[52px] bg-neutral-900 p-3 sm:p-4 md:rounded-t-[198px] md:p-6 shadow-[inset_0_2px_4px_rgba(255,255,255,0.12),inset_0_-8px_20px_rgba(0,0,0,0.55)] flex flex-col">
          
          {/* Four 3D Perspective Dotted Bezel Walls */}
          <div aria-hidden className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 [clip-path:polygon(0_0,100%_0,50%_50%)] [perspective:2000px]">
              <div className="absolute -inset-x-1/4 inset-y-0 origin-top [transform:rotateX(-40deg)] bg-[radial-gradient(circle,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:16px_16px]" />
            </div>
            <div className="absolute inset-0 [clip-path:polygon(0_100%,100%_100%,50%_50%)] [perspective:2000px]">
              <div className="absolute -inset-x-1/4 inset-y-0 origin-bottom [transform:rotateX(40deg)] bg-[radial-gradient(circle,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:16px_16px]" />
            </div>
            <div className="absolute inset-0 [clip-path:polygon(0_0,0_100%,50%_50%)] [perspective:2000px]">
              <div className="absolute inset-x-0 -inset-y-1/4 origin-left [transform:rotateY(40deg)] bg-[radial-gradient(circle,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:16px_16px]" />
            </div>
            <div className="absolute inset-0 [clip-path:polygon(100%_0,100%_100%,50%_50%)] [perspective:2000px]">
              <div className="absolute inset-x-0 -inset-y-1/4 origin-right [transform:rotateY(-40deg)] bg-[radial-gradient(circle,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:16px_16px]" />
            </div>
          </div>

          {/* Sky Window Opening */}
          <div className="relative h-full w-full overflow-hidden rounded-t-[38px] bg-gradient-to-t from-[#8cbfe8] via-[#5c98d6] to-[#3876ba] md:rounded-t-[166px] flex flex-col justify-between">
            
            {/* Live WebGL Clouds Drift */}
            <motion.div
              className="absolute inset-0 z-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
            >
              <div className="absolute h-1/2 w-1/2 origin-top-left scale-200">
                <CloudShader
                  speed={1}
                  count={isMobile ? 3 : 6}
                  className="absolute inset-0"
                />
              </div>
            </motion.div>

            {/* Atmospheric Horizon Vignette for Rich Contrast with Fading Text */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-44 sm:h-60 bg-gradient-to-t from-[#123157]/35 via-[#123157]/10 to-transparent pointer-events-none z-[1]"
            />

            {/* In-Flight Airplane Wing Overlapping Typography at the Bottom (z-20 sits in front of z-10 text) */}
            <motion.div
              className="pointer-events-none absolute -bottom-10 sm:-bottom-4 left-0 z-20 w-[92%] sm:w-[82%] lg:w-[68%] max-w-3xl select-none"
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://assets.aceternity.com/components/plane-wing.png"
                alt="Airplane wing soaring in front of typography"
                className="h-auto w-full object-cover select-none pointer-events-none drop-shadow-[0_25px_45px_rgba(0,0,0,0.45)]"
              />
            </motion.div>

            {/* TOP: All Original Details with Clean Editorial Alignment */}
            <div className="relative z-30 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pt-7 sm:pt-10 md:pt-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
                
                {/* Left Column: Brand Logo + Tagline + Social Icons */}
                <div className="lg:col-span-5 space-y-2.5">
                  <Link href="/" className="inline-flex items-center gap-2 group">
                    <LogoMark size={22} className="text-white transition-transform duration-500 group-hover:rotate-45" />
                    <span className="font-outfit font-semibold text-base sm:text-lg text-white tracking-tight [text-shadow:0_2px_8px_rgba(15,42,67,0.4)]">
                      Student Saarthi
                    </span>
                  </Link>

                  <p className="font-outfit font-light text-xs sm:text-[13px] text-white/85 max-w-xs leading-relaxed [text-shadow:0_1px_6px_rgba(15,42,67,0.3)]">
                    Built for students and parents who believe verified intelligence should be the default.
                  </p>

                  {/* Social Icons Row */}
                  <div className="flex items-center gap-4 pt-0.5 text-white/85">
                    {/* X */}
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="X (Twitter)"
                      className="hover:text-white transition-colors"
                    >
                      <svg className="w-4 h-4 fill-current drop-shadow-sm" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>

                    {/* GitHub */}
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub"
                      className="hover:text-white transition-colors"
                    >
                      <svg className="w-4 h-4 fill-current drop-shadow-sm" viewBox="0 0 24 24">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        />
                      </svg>
                    </a>

                    {/* Discord */}
                    <a
                      href="https://discord.com"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Discord"
                      className="hover:text-white transition-colors"
                    >
                      <svg className="w-4 h-4 fill-current drop-shadow-sm" viewBox="0 0 24 24">
                        <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.893.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                      </svg>
                    </a>

                    {/* Instagram */}
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Instagram"
                      className="hover:text-white transition-colors"
                    >
                      <svg className="w-4 h-4 fill-current drop-shadow-sm" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>

                    {/* LinkedIn */}
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn"
                      className="hover:text-white transition-colors"
                    >
                      <svg className="w-4 h-4 fill-current drop-shadow-sm" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
                      </svg>
                    </a>
                  </div>

                  {/* Copyright Underneath Brand Details */}
                  <p className="font-outfit font-light text-[11px] text-white/75 pt-2 [text-shadow:0_1px_4px_rgba(15,42,67,0.3)]">
                    © {new Date().getFullYear()} Student Saarthi. All rights reserved.
                  </p>
                </div>

                {/* Right Columns: 4 Nav Columns */}
                <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                  
                  {/* Column 1: Product */}
                  <div className="space-y-1.5">
                    <span className="font-outfit font-medium text-xs sm:text-[13px] text-white block tracking-wide [text-shadow:0_1px_6px_rgba(15,42,67,0.35)]">
                      Product
                    </span>
                    <ul className="space-y-1 font-outfit font-light text-xs text-white/80">
                      <li>
                        <Link href="/research" className="hover:text-white transition-colors">
                          Features
                        </Link>
                      </li>
                      <li>
                        <Link href="/simulator" className="hover:text-white transition-colors">
                          Integrations
                        </Link>
                      </li>
                      <li>
                        <Link href="/calculator" className="hover:text-white transition-colors">
                          Pricing
                        </Link>
                      </li>
                      <li>
                        <Link href="/exams" className="hover:text-white transition-colors">
                          Roadmap
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Column 2: Resources */}
                  <div className="space-y-1.5">
                    <span className="font-outfit font-medium text-xs sm:text-[13px] text-white block tracking-wide [text-shadow:0_1px_6px_rgba(15,42,67,0.35)]">
                      Resources
                    </span>
                    <ul className="space-y-1 font-outfit font-light text-xs text-white/80">
                      <li>
                        <Link href="/research" className="hover:text-white transition-colors">
                          Blog
                        </Link>
                      </li>
                      <li>
                        <Link href="/exams" className="hover:text-white transition-colors">
                          Documentation
                        </Link>
                      </li>
                      <li>
                        <Link href="/colleges" className="hover:text-white transition-colors">
                          Help center
                        </Link>
                      </li>
                      <li>
                        <Link href="/quiz" className="hover:text-white transition-colors">
                          Community
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Column 3: Company */}
                  <div className="space-y-1.5">
                    <span className="font-outfit font-medium text-xs sm:text-[13px] text-white block tracking-wide [text-shadow:0_1px_6px_rgba(15,42,67,0.35)]">
                      Company
                    </span>
                    <ul className="space-y-1 font-outfit font-light text-xs text-white/80">
                      <li>
                        <Link href="/about" className="hover:text-white transition-colors">
                          About
                        </Link>
                      </li>
                      <li>
                        <Link href="/careers" className="hover:text-white transition-colors">
                          Career
                        </Link>
                      </li>
                      <li>
                        <Link href="/contact" className="hover:text-white transition-colors">
                          Contact
                        </Link>
                      </li>
                      <li>
                        <Link href="/press" className="hover:text-white transition-colors">
                          Press
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Column 4: Legal */}
                  <div className="space-y-1.5">
                    <span className="font-outfit font-medium text-xs sm:text-[13px] text-white block tracking-wide [text-shadow:0_1px_6px_rgba(15,42,67,0.35)]">
                      Legal
                    </span>
                    <ul className="space-y-1 font-outfit font-light text-xs text-white/80">
                      <li>
                        <Link href="/privacy" className="hover:text-white transition-colors">
                          Privacy Policy
                        </Link>
                      </li>
                      <li>
                        <Link href="/terms" className="hover:text-white transition-colors">
                          Terms of Service
                        </Link>
                      </li>
                      <li>
                        <Link href="/security" className="hover:text-white transition-colors">
                          Security
                        </Link>
                      </li>
                    </ul>
                  </div>

                </div>
              </div>
            </div>

            {/* BOTTOM: Modern Headline Hugging Far Right with Intact (Non-Cut) Fading Letters */}
            <div className="relative z-20 w-full text-right flex flex-col items-end mt-auto select-none pointer-events-none pb-3 sm:pb-5 md:pb-7 pr-2 sm:pr-4 md:pr-5 lg:pr-6 xl:pr-7 pl-4">
              <p className="font-outfit font-light text-base sm:text-lg md:text-xl lg:text-2xl xl:text-[1.75rem] text-white/90 tracking-tight mb-1 sm:mb-1.5 select-none pr-0.5 sm:pr-1 [text-shadow:0_2px_14px_rgba(10,35,65,0.5)]">
                Fly to your dream college with
              </p>
              
              <h2
                className="font-outfit font-bold text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] xl:text-[7.6rem] 2xl:text-[8.5rem] tracking-[-0.045em] leading-[0.88] bg-clip-text text-transparent select-none whitespace-nowrap drop-shadow-[0_14px_40px_rgba(10,35,65,0.38)]"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.65) 55%, rgba(255, 255, 255, 0.2) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Student Sarthi
              </h2>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
