import React from "react";

/**
 * High-Resolution Hand-Drawn Indie Line-Art Illustrations
 * Style: Hipster / Editorial Ink Line Art with black fills for hair,
 * crisp 2.5px strokes, and 100% transparent backgrounds.
 * Zero pixelation, razor-sharp on Retina / 4K displays.
 */

// 1. PAPER AIRPLANE CHARACTER (Deep AI Research)
export function CoolAirplaneGuy({ className = "w-20 h-20" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Motion trail */}
      <path
        d="M48 64 C 58 54, 70 42, 80 32"
        stroke="#171717"
        strokeWidth="2"
        strokeDasharray="3 3.5"
        strokeLinecap="round"
      />

      {/* Paper Airplane */}
      <g transform="translate(74, 16) rotate(10)">
        {/* Main wing */}
        <polygon
          points="0,18 36,0 12,24"
          fill="#ffffff"
          stroke="#171717"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        {/* Center fold */}
        <polygon
          points="12,24 36,0 22,28"
          fill="#f4f4f5"
          stroke="#171717"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        {/* Underbody */}
        <polygon
          points="22,28 36,0 26,14"
          fill="#e4e4e7"
          stroke="#171717"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </g>

      {/* Motion spark behind plane */}
      <path d="M72 18 L 68 14" stroke="#171717" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M78 12 L 77 7" stroke="#171717" strokeWidth="1.8" strokeLinecap="round" />

      {/* Cool Guy Head & Face */}
      {/* Hair - solid stylish black sweep */}
      <path
        d="M20 54 C 18 42, 24 28, 38 27 C 48 26, 56 32, 54 44 C 54 45, 51 47, 49 46 C 45 44, 40 46, 38 52 C 34 52, 28 53, 26 58 C 23 58, 20 57, 20 54 Z"
        fill="#171717"
      />
      {/* Hair strand accent */}
      <path
        d="M38 27 C 43 23, 49 23, 53 26"
        stroke="#171717"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Face profile */}
      <path
        d="M38 46 C 41 46, 44 47, 46 50 C 48 53, 51 55, 53 55 C 55 55, 54 59, 51 61 C 48 63, 49 68, 47 71 C 45 74, 41 76, 37 77 C 32 78, 30 75, 29 70"
        fill="#ffffff"
        stroke="#171717"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Minimalist eye & brow */}
      <ellipse cx="43" cy="53" rx="1.8" ry="2.2" fill="#171717" />
      <path d="M41 49 C 43 48, 46 48, 48 50" stroke="#171717" strokeWidth="1.6" strokeLinecap="round" />

      {/* Smirk / Smile */}
      <path d="M42 66 C 45 67, 48 66, 49 63" stroke="#171717" strokeWidth="2" strokeLinecap="round" />

      {/* Ear with inner curve */}
      <path
        d="M29 57 C 27 57, 26 62, 27 65 C 28 67, 31 67, 32 64"
        fill="#ffffff"
        stroke="#171717"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M28 61 C 29 62, 30 63, 31 62" stroke="#171717" strokeWidth="1.6" strokeLinecap="round" />

      {/* Neck & Shirt Collar */}
      <path d="M34 77 L 34 88" stroke="#171717" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M44 74 L 46 88" stroke="#171717" strokeWidth="2.2" strokeLinecap="round" />
      <path
        d="M26 90 C 31 87, 48 87, 54 90"
        stroke="#171717"
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      {/* Throwing Hand */}
      <path
        d="M48 83 C 51 81, 56 78, 59 74 C 61 72, 63 73, 62 76 C 60 80, 56 86, 53 88"
        fill="#ffffff"
        stroke="#171717"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M58 76 C 62 73, 64 74, 63 77 C 61 80, 58 84, 56 86" stroke="#171717" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// 2. NEWSPAPER / GUIDE READING GIRL (Live Exam Radar)
export function CoolNewspaperGirl({ className = "w-20 h-20" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Dark Wavy Hair with Bow/Pin */}
      <path
        d="M44 24 C 54 22, 68 24, 76 34 C 84 45, 84 62, 79 74 C 77 78, 73 80, 71 74 C 69 68, 73 54, 71 44 C 68 36, 58 34, 48 35 C 44 35, 40 40, 41 46 C 42 54, 44 68, 41 74 C 39 78, 36 76, 35 71 C 33 60, 34 46, 38 36 C 40 30, 42 26, 44 24 Z"
        fill="#171717"
      />
      {/* Quirky hair pin */}
      <ellipse cx="68" cy="28" rx="3.5" ry="2" transform="rotate(-20 68 28)" fill="#ffffff" stroke="#171717" strokeWidth="1.8" />

      {/* Face */}
      <path
        d="M47 38 C 55 37, 67 38, 70 48 C 72 58, 68 70, 59 72 C 51 74, 46 68, 46 56 Z"
        fill="#ffffff"
        stroke="#171717"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Cute eyes & smile */}
      <ellipse cx="53" cy="50" rx="1.8" ry="2.2" fill="#171717" />
      <ellipse cx="65" cy="50" rx="1.8" ry="2.2" fill="#171717" />
      <path d="M51 45 C 53 44, 56 44, 57 46" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M63 45 C 65 44, 68 44, 69 46" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M57 58 C 59 61, 62 61, 64 58" stroke="#171717" strokeWidth="2" strokeLinecap="round" />

      {/* Neck */}
      <path d="M54 72 L 54 78" stroke="#171717" strokeWidth="2" />
      <path d="M64 72 L 64 78" stroke="#171717" strokeWidth="2" />

      {/* Open Broadsheet Newspaper */}
      <g transform="translate(18, 62)">
        {/* Left Page */}
        <path
          d="M40 16 L 6 10 C 4 9.6, 2 11.5, 2 13.5 L 4 50 C 4 52, 6 53.5, 8 54 L 40 48 Z"
          fill="#ffffff"
          stroke="#171717"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        {/* Right Page */}
        <path
          d="M40 16 L 74 10 C 76 9.6, 78 11.5, 78 13.5 L 76 50 C 76 52, 74 53.5, 72 54 L 40 48 Z"
          fill="#ffffff"
          stroke="#171717"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        {/* Center Fold */}
        <line x1="40" y1="16" x2="40" y2="48" stroke="#171717" strokeWidth="2.2" />

        {/* Newspaper Content: Photo & Text Lines */}
        {/* Left Page Lines */}
        <rect x="8" y="16" width="12" height="10" fill="#f4f4f5" stroke="#171717" strokeWidth="1.5" />
        <line x1="24" y1="18" x2="35" y2="17" stroke="#171717" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="24" y1="23" x2="34" y2="22" stroke="#171717" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="8" y1="31" x2="34" y2="28" stroke="#171717" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="8" y1="36" x2="33" y2="33" stroke="#171717" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="8" y1="41" x2="28" y2="39" stroke="#171717" strokeWidth="1.6" strokeLinecap="round" />

        {/* Right Page Lines */}
        <line x1="46" y1="17" x2="70" y2="15" stroke="#171717" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="46" y1="22" x2="68" y2="20" stroke="#171717" strokeWidth="1.6" strokeLinecap="round" />
        <rect x="46" y="27" width="24" height="12" fill="#f4f4f5" stroke="#171717" strokeWidth="1.5" />
        <line x1="46" y1="44" x2="66" y2="43" stroke="#171717" strokeWidth="1.6" strokeLinecap="round" />

        {/* Hands Gripping the Paper */}
        {/* Left Hand */}
        <path
          d="M8 28 C 5 28, 4 33, 5 36 C 6 38, 9 38, 10 35"
          fill="#ffffff"
          stroke="#171717"
          strokeWidth="2.2"
        />
        {/* Right Hand */}
        <path
          d="M72 28 C 75 28, 76 33, 75 36 C 74 38, 71 38, 70 35"
          fill="#ffffff"
          stroke="#171717"
          strokeWidth="2.2"
        />
      </g>
    </svg>
  );
}

// 3. DETECTIVE / MAGNIFYING GLASS CHARACTER (Career Simulator)
export function CoolDetectiveGuy({ className = "w-20 h-20" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Sparkle of insight */}
      <path
        d="M86 34 L 88 26 L 90 34 L 98 36 L 90 38 L 88 46 L 86 38 L 78 36 Z"
        fill="#60782c"
      />
      <circle cx="94" cy="24" r="1.5" fill="#171717" />

      {/* Hair - Dark Textured Quiff */}
      <path
        d="M26 50 C 22 38, 28 26, 44 24 C 54 23, 62 28, 62 38 C 58 37, 52 38, 48 42 C 43 43, 38 46, 36 51 C 32 50, 28 50, 26 50 Z"
        fill="#171717"
      />

      {/* Face & Upturned Chin */}
      <path
        d="M37 44 C 42 45, 49 46, 52 50 C 54 53, 58 55, 59 55 C 60 56, 59 60, 56 62 C 52 64, 53 71, 48 76 C 42 81, 36 82, 32 78 C 30 74, 30 68, 30 64"
        fill="#ffffff"
        stroke="#171717"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Dot Eye focused on lens */}
      <ellipse cx="46" cy="51" rx="2" ry="2.4" fill="#171717" />
      <path d="M43 47 C 46 46, 49 47, 50 48" stroke="#171717" strokeWidth="1.8" strokeLinecap="round" />

      {/* Nose & Smile */}
      <path d="M44 68 C 47 69, 50 68, 51 65" stroke="#171717" strokeWidth="2.2" strokeLinecap="round" />

      {/* Ear */}
      <path
        d="M31 54 C 29 55, 29 60, 30 62 C 31 64, 34 64, 34 61"
        fill="#ffffff"
        stroke="#171717"
        strokeWidth="2"
      />

      {/* Upturned Trench Collar */}
      <path
        d="M26 84 L 34 76 L 38 90 L 22 96 Z"
        fill="#ffffff"
        stroke="#171717"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path
        d="M48 76 L 56 82 L 46 94"
        stroke="#171717"
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      {/* Magnifying Glass held in hand */}
      <g transform="translate(56, 38) rotate(22)">
        {/* Glass Lens Rim */}
        <circle
          cx="16"
          cy="16"
          r="15"
          fill="#ffffff"
          stroke="#171717"
          strokeWidth="2.8"
        />
        {/* Lens Specular Reflection */}
        <path
          d="M8 12 C 10 7, 18 6, 23 8"
          stroke="#171717"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        {/* Handle */}
        <path
          d="M16 31 L 16 48"
          stroke="#171717"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        {/* Hand gripping handle */}
        <path
          d="M11 36 C 8 36, 8 42, 12 44 C 16 46, 20 44, 21 40 C 22 36, 17 35, 13 36"
          fill="#ffffff"
          stroke="#171717"
          strokeWidth="2.2"
        />
      </g>
    </svg>
  );
}

// 4. CELEBRATING FRISBEE DOG (Global ROI & Visas)
export function CoolFrisbeeDog({ className = "w-20 h-20" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Floating Frisbee Ring hovering above */}
      <g transform="translate(26, 18) rotate(-18)">
        <ellipse
          cx="30"
          cy="12"
          rx="22"
          ry="6"
          fill="#ffffff"
          stroke="#171717"
          strokeWidth="2.6"
        />
        <ellipse
          cx="30"
          cy="12"
          rx="18"
          ry="4"
          fill="#f4f4f5"
          stroke="#171717"
          strokeWidth="1.4"
        />
        {/* Motion lines */}
        <path d="M12 6 C 14 3, 20 2, 24 3" stroke="#171717" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M40 4 C 44 3, 50 4, 52 7" stroke="#171717" strokeWidth="1.8" strokeLinecap="round" />
      </g>

      {/* Excited Dog Head looking up */}
      {/* Ear with black spot */}
      <path
        d="M48 64 C 42 56, 36 48, 38 42 C 40 36, 48 38, 52 46 C 54 50, 54 58, 52 64 Z"
        fill="#171717"
      />

      {/* Head Profile */}
      <path
        d="M52 48 C 58 44, 70 46, 78 54 C 84 60, 92 64, 94 68 C 95 72, 90 75, 84 75 C 80 75, 78 78, 76 80 L 68 82 C 62 84, 56 80, 52 74 Z"
        fill="#ffffff"
        stroke="#171717"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Dalmatian Spot on Cheek */}
      <ellipse cx="64" cy="62" rx="4" ry="5" fill="#171717" />
      <circle cx="58" cy="72" r="2.5" fill="#171717" />

      {/* Dog Eye looking at frisbee */}
      <ellipse cx="68" cy="56" rx="2.2" ry="2.8" fill="#171717" />
      <path d="M66 52 C 68 50, 71 50, 73 52" stroke="#171717" strokeWidth="1.6" strokeLinecap="round" />

      {/* Nose */}
      <path
        d="M91 66 C 94 66, 96 68, 94 71 C 92 73, 89 72, 89 69 Z"
        fill="#171717"
      />

      {/* Open Smiling Mouth & Playful Tongue */}
      <path d="M84 75 C 82 78, 78 81, 74 81" stroke="#171717" strokeWidth="2.4" strokeLinecap="round" />
      <path
        d="M78 77 C 82 82, 82 88, 79 92 C 76 94, 72 92, 72 87 C 72 84, 74 80, 75 78"
        fill="#e11d48"
        stroke="#171717"
        strokeWidth="2"
      />

      {/* Collar */}
      <path
        d="M50 78 C 56 84, 66 87, 72 84"
        stroke="#60782c"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Dog tag */}
      <circle cx="62" cy="90" r="3" fill="#ffffff" stroke="#171717" strokeWidth="1.8" />
    </svg>
  );
}

// 5. LARGE BANNER: GIRL ON LAPTOP WITH 5 FLOATING HAND-DRAWN DOODLES
export function CoolLaptopGirlWithDoodles({ className = "w-full max-w-[360px]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 380 270"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Hand-drawn organic border frame with playful wobbles */}
      <path
        d="M35 55 C 120 52, 260 56, 345 53 C 348 115, 344 200, 346 250 C 265 253, 125 249, 34 252 C 32 195, 36 110, 35 55 Z"
        stroke="#171717"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* =================================================================
          FLOATING DOODLE 1: RETRO CAMERA (Top-Left)
          ================================================================= */}
      <g transform="translate(48, 62) rotate(-14)">
        {/* Camera body */}
        <rect
          x="10"
          y="16"
          width="44"
          height="30"
          rx="4"
          fill="#ffffff"
          stroke="#171717"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        {/* Lens */}
        <circle cx="32" cy="31" r="11" fill="#ffffff" stroke="#171717" strokeWidth="2.2" />
        <circle cx="32" cy="31" r="7" fill="#f4f4f5" stroke="#171717" strokeWidth="1.8" />
        {/* Top Viewfinder & shutter */}
        <rect x="18" y="10" width="12" height="6" rx="2" fill="#171717" />
        <circle cx="44" cy="12" r="3" fill="#ffffff" stroke="#171717" strokeWidth="1.8" />
        {/* Flash radiance rays */}
        <path d="M4 16 L 0 10" stroke="#171717" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 8 L 8 2" stroke="#171717" strokeWidth="2" strokeLinecap="round" />
        <path d="M22 4 L 22 0" stroke="#171717" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* =================================================================
          FLOATING DOODLE 2: STUDENT ID BADGE / PASS (Top-Center)
          ================================================================= */}
      <g transform="translate(170, 22) rotate(6)">
        {/* Lanyard Clip */}
        <rect x="19" y="0" width="10" height="8" rx="2" fill="#ffffff" stroke="#171717" strokeWidth="2" />
        <circle cx="24" cy="4" r="2" fill="#171717" />
        {/* Badge Card */}
        <rect
          x="2"
          y="8"
          width="44"
          height="32"
          rx="3"
          fill="#ffffff"
          stroke="#171717"
          strokeWidth="2.4"
        />
        {/* Avatar sketch on badge */}
        <rect x="8" y="14" width="14" height="18" fill="#f4f4f5" stroke="#171717" strokeWidth="1.6" />
        <circle cx="15" cy="20" r="3" fill="#171717" />
        <path d="M10 29 C 11 26, 19 26, 20 29" fill="#171717" />
        {/* Text lines */}
        <line x1="26" y1="17" x2="40" y2="17" stroke="#171717" strokeWidth="2" strokeLinecap="round" />
        <line x1="26" y1="23" x2="38" y2="23" stroke="#171717" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="26" y1="28" x2="35" y2="28" stroke="#171717" strokeWidth="1.6" strokeLinecap="round" />
      </g>

      {/* =================================================================
          FLOATING DOODLE 3: SMARTPHONE / TECH UI (Top-Right)
          ================================================================= */}
      <g transform="translate(268, 70) rotate(16)">
        <rect
          x="4"
          y="4"
          width="32"
          height="52"
          rx="6"
          fill="#ffffff"
          stroke="#171717"
          strokeWidth="2.4"
        />
        {/* Speaker notch */}
        <line x1="16" y1="8" x2="24" y2="8" stroke="#171717" strokeWidth="1.8" strokeLinecap="round" />
        {/* Screen inner area */}
        <rect x="8" y="12" width="24" height="34" fill="#fafafa" stroke="#171717" strokeWidth="1.4" />
        {/* Wireframe UI blocks */}
        <rect x="11" y="16" width="8" height="6" rx="1" fill="#60782c" opacity="0.3" />
        <rect x="21" y="16" width="8" height="6" rx="1" fill="#171717" opacity="0.15" />
        <line x1="11" y1="26" x2="29" y2="26" stroke="#171717" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="11" y1="31" x2="25" y2="31" stroke="#171717" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="11" y1="36" x2="27" y2="36" stroke="#171717" strokeWidth="1.6" strokeLinecap="round" />
        {/* Home pill */}
        <circle cx="20" cy="50" r="2" fill="#171717" />
      </g>

      {/* =================================================================
          FLOATING DOODLE 4: STUDIO OVER-EAR HEADPHONES (Bottom-Right)
          ================================================================= */}
      <g transform="translate(264, 168) rotate(-6)">
        {/* Headband arch */}
        <path
          d="M8 28 C 6 12, 34 8, 38 28"
          stroke="#171717"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        {/* Left Earcup */}
        <rect
          x="3"
          y="24"
          width="9"
          height="18"
          rx="4"
          fill="#ffffff"
          stroke="#171717"
          strokeWidth="2.2"
        />
        {/* Right Earcup */}
        <rect
          x="34"
          y="24"
          width="9"
          height="18"
          rx="4"
          fill="#ffffff"
          stroke="#171717"
          strokeWidth="2.2"
        />
      </g>

      {/* =================================================================
          FLOATING DOODLE 5: IDEA LIGHTBULB (Bottom-Left)
          ================================================================= */}
      <g transform="translate(38, 165) rotate(14)">
        {/* Bulb glass */}
        <path
          d="M12 24 C 6 18, 8 8, 18 6 C 26 4, 32 12, 28 20 C 26 23, 24 24, 24 28 L 16 28 C 16 24, 14 23, 12 24 Z"
          fill="#ffffff"
          stroke="#171717"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        {/* Filament coil */}
        <path d="M17 18 L 20 14 L 23 18" stroke="#171717" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        {/* Screw Base */}
        <line x1="16" y1="31" x2="24" y2="31" stroke="#171717" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="17" y1="34" x2="23" y2="34" stroke="#171717" strokeWidth="2.2" strokeLinecap="round" />
        {/* Radiance Rays */}
        <line x1="8" y1="12" x2="2" y2="10" stroke="#171717" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="18" y1="2" x2="18" y2="-3" stroke="#171717" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="28" y1="8" x2="34" y2="6" stroke="#171717" strokeWidth="1.8" strokeLinecap="round" />
      </g>

      {/* =================================================================
          CENTER: THE GIRL TYPING ON LAPTOP
          ================================================================= */}
      <g transform="translate(130, 85)">
        {/* Hair: Black Bob with Bangs and Waves */}
        <path
          d="M38 12 C 22 12, 10 24, 8 42 C 6 56, 12 70, 20 74 C 22 68, 22 56, 20 46 C 26 44, 40 44, 48 38 C 58 44, 76 44, 82 46 C 80 58, 80 68, 82 74 C 90 70, 96 56, 94 42 C 92 24, 78 12, 64 12 Z"
          fill="#171717"
        />

        {/* Face */}
        <path
          d="M26 38 C 30 38, 72 38, 76 38 C 78 48, 76 64, 68 70 C 58 76, 44 76, 34 70 C 26 64, 24 48, 26 38 Z"
          fill="#ffffff"
          stroke="#171717"
          strokeWidth="2.4"
          strokeLinecap="round"
        />

        {/* Expressive Minimalist Eyes */}
        <ellipse cx="40" cy="50" rx="2" ry="2.6" fill="#171717" />
        <ellipse cx="62" cy="50" rx="2" ry="2.6" fill="#171717" />
        <path d="M37 45 C 39 44, 43 44, 44 46" stroke="#171717" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M58 46 C 60 44, 64 44, 66 45" stroke="#171717" strokeWidth="1.6" strokeLinecap="round" />

        {/* Cute Smile / Smirk */}
        <path
          d="M48 60 C 51 63, 56 63, 58 59"
          stroke="#171717"
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* Neck & Shoulders */}
        <path d="M44 74 C 44 79, 44 83, 38 86" stroke="#171717" strokeWidth="2.2" />
        <path d="M58 74 C 58 79, 58 83, 64 86" stroke="#171717" strokeWidth="2.2" />
        <path
          d="M20 98 C 24 88, 36 85, 48 87 C 54 87, 68 85, 82 98"
          stroke="#171717"
          strokeWidth="2.4"
          strokeLinecap="round"
        />

        {/* Arms Reaching to Laptop Keyboard */}
        <path
          d="M18 106 C 28 116, 46 122, 54 122"
          stroke="#171717"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M84 106 C 74 116, 58 122, 50 122"
          stroke="#171717"
          strokeWidth="2.4"
          strokeLinecap="round"
        />

        {/* Hands Typing on Keyboard */}
        <path
          d="M46 120 C 49 117, 54 118, 57 122"
          stroke="#171717"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M52 120 C 55 117, 60 118, 63 122"
          stroke="#171717"
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* Modern Wedge Laptop */}
        {/* Screen */}
        <polygon
          points="28,126 44,88 78,88 64,126"
          fill="#ffffff"
          stroke="#171717"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        {/* Apple/Saarthi logo on lid */}
        <circle cx="53" cy="107" r="3.5" fill="#60782c" />
        {/* Keyboard Base */}
        <polygon
          points="20,132 28,126 84,126 92,132"
          fill="#f4f4f5"
          stroke="#171717"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
