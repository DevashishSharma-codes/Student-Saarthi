"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Header } from "@/components/site/Header";
import { EntranceExam } from "@/lib/examData";
import {
  Search,
  ExternalLink,
  Loader2,
  ArrowUpRight,
  ShieldCheck,
  ChevronDown,
  X,
  Shuffle,
  FileText,
} from "lucide-react";

const STREAMS = [
  "All",
  "Engineering",
  "Medical",
  "Commerce & Management",
  "Law",
  "Design & Arts",
  "Defense & Civil",
] as const;

interface VerificationResult {
  examId: string;
  statusUpdate: string;
  sources: Array<{ title: string; url: string }>;
  verifiedAt: string;
}

export interface FolderColorTheme {
  id: string;
  name: string;
  start: string;
  mid: string;
  end: string;
  highlight: string;
  accent: string;
}

// 24 Curated, Highly Contrasting Folder Color Themes
// Structured with maximum contrast between adjacent items (Cool <-> Warm <-> Deep <-> Vivid)
const CARD_COLOR_THEMES: FolderColorTheme[] = [
  // 0. Royal Cobalt Blue (Cool Vivid)
  {
    id: "royal-cobalt",
    name: "Royal Cobalt",
    start: "#1d4ed8",
    mid: "#2563eb",
    end: "#0284c7",
    highlight: "#93c5fd",
    accent: "#1e40af",
  },
  // 1. Warm Sunset Tangerine (Warm Vivid)
  {
    id: "sunset-tangerine",
    name: "Sunset Tangerine",
    start: "#ea580c",
    mid: "#f97316",
    end: "#f59e0b",
    highlight: "#fef08a",
    accent: "#c2410c",
  },
  // 2. Emerald Jade (Cool Lush Green)
  {
    id: "emerald-jade",
    name: "Emerald Jade",
    start: "#047857",
    mid: "#059669",
    end: "#10b981",
    highlight: "#a7f3d0",
    accent: "#064e3b",
  },
  // 3. Crimson Berry Rose (Warm Bold Pink/Red)
  {
    id: "crimson-berry",
    name: "Crimson Berry",
    start: "#be123c",
    mid: "#e11d48",
    end: "#f43f5e",
    highlight: "#ffe4e6",
    accent: "#9f1239",
  },
  // 4. Electric Violet Purple (Cool Rich Purple)
  {
    id: "electric-violet",
    name: "Electric Violet",
    start: "#6d28d9",
    mid: "#7c3aed",
    end: "#9333ea",
    highlight: "#ede9fe",
    accent: "#5b21b6",
  },
  // 5. Ocean Peacock Cyan (Cool Aqua/Teal)
  {
    id: "ocean-peacock",
    name: "Ocean Peacock",
    start: "#0e7490",
    mid: "#06b6d4",
    end: "#22d3ee",
    highlight: "#cffafe",
    accent: "#155e75",
  },
  // 6. Marigold Gold (Warm Bright Amber/Yellow)
  {
    id: "marigold-gold",
    name: "Marigold Gold",
    start: "#b45309",
    mid: "#d97706",
    end: "#eab308",
    highlight: "#fef9c3",
    accent: "#92400e",
  },
  // 7. Neon Fuchsia Orchid (Warm Vivid Magenta)
  {
    id: "neon-fuchsia",
    name: "Neon Fuchsia",
    start: "#a21caf",
    mid: "#c026d3",
    end: "#e879f9",
    highlight: "#fae8ff",
    accent: "#701a75",
  },
  // 8. Forest Pine & Lime (Cool Botanical)
  {
    id: "forest-pine",
    name: "Forest Pine",
    start: "#14532d",
    mid: "#166534",
    end: "#22c55e",
    highlight: "#bbf7d0",
    accent: "#14532d",
  },
  // 9. Fiery Coral Terracotta (Warm Earthy Orange)
  {
    id: "fiery-coral",
    name: "Fiery Coral",
    start: "#c2410c",
    mid: "#dc2626",
    end: "#f87171",
    highlight: "#fee2e2",
    accent: "#991b1b",
  },
  // 10. Midnight Sapphire Navy (Deep Cool Indigo)
  {
    id: "midnight-sapphire",
    name: "Midnight Sapphire",
    start: "#1e3a8a",
    mid: "#1d4ed8",
    end: "#3b82f6",
    highlight: "#bfdbfe",
    accent: "#172554",
  },
  // 11. Acid Chartreuse Lime (Cool Electric Lime)
  {
    id: "acid-chartreuse",
    name: "Acid Chartreuse",
    start: "#4d7c0f",
    mid: "#65a30d",
    end: "#84cc16",
    highlight: "#ecfccb",
    accent: "#365314",
  },
  // 12. Bordeaux Wine (Deep Warm Burgundy)
  {
    id: "bordeaux-wine",
    name: "Bordeaux Wine",
    start: "#701a75",
    mid: "#881337",
    end: "#be123c",
    highlight: "#fecdd3",
    accent: "#4c0519",
  },
  // 13. Deep Sea Cerulean (Cool Sky Blue)
  {
    id: "sea-cerulean",
    name: "Sea Cerulean",
    start: "#0369a1",
    mid: "#0284c7",
    end: "#38bdf8",
    highlight: "#e0f2fe",
    accent: "#075985",
  },
  // 14. Apricot Peach Glow (Warm Soft Tangerine)
  {
    id: "apricot-peach",
    name: "Apricot Peach",
    start: "#c2410c",
    mid: "#ea580c",
    end: "#fb923c",
    highlight: "#ffedd5",
    accent: "#9a3412",
  },
  // 15. Mint Seafoam (Cool Refreshing Teal)
  {
    id: "mint-seafoam",
    name: "Mint Seafoam",
    start: "#0f766e",
    mid: "#0d9488",
    end: "#2dd4bf",
    highlight: "#ccfbf1",
    accent: "#115e59",
  },
  // 16. Royal Amethyst (Cool Majestic Violet)
  {
    id: "royal-amethyst",
    name: "Royal Amethyst",
    start: "#581c87",
    mid: "#6b21a8",
    end: "#a855f7",
    highlight: "#f3e8ff",
    accent: "#3b0764",
  },
  // 17. Sunburst Honey (Warm Radiant Amber)
  {
    id: "sunburst-honey",
    name: "Sunburst Honey",
    start: "#a16207",
    mid: "#ca8a04",
    end: "#fde047",
    highlight: "#fef08a",
    accent: "#713f12",
  },
  // 18. Electric Iris Blue (Cool Vivid Periwinkle)
  {
    id: "electric-iris",
    name: "Electric Iris",
    start: "#3730a3",
    mid: "#4338ca",
    end: "#6366f1",
    highlight: "#e0e7ff",
    accent: "#312e81",
  },
  // 19. Raspberry Rose (Warm Electric Magenta)
  {
    id: "raspberry-rose",
    name: "Raspberry Rose",
    start: "#9d174d",
    mid: "#be185d",
    end: "#ec4899",
    highlight: "#fce7f3",
    accent: "#831843",
  },
  // 20. Aegean Teal (Cool Mediterranean Deep Aqua)
  {
    id: "aegean-teal",
    name: "Aegean Teal",
    start: "#115e59",
    mid: "#0f766e",
    end: "#14b8a6",
    highlight: "#99f6e4",
    accent: "#134e4a",
  },
  // 21. Burnished Copper (Warm Earth Metallic)
  {
    id: "burnished-copper",
    name: "Burnished Copper",
    start: "#9a3412",
    mid: "#c2410c",
    end: "#ea580c",
    highlight: "#fed7aa",
    accent: "#7c2d12",
  },
  // 22. Polar Glacier Cyan (Cool Crisp Ice)
  {
    id: "polar-glacier",
    name: "Polar Glacier",
    start: "#155e75",
    mid: "#0891b2",
    end: "#06b6d4",
    highlight: "#cffafe",
    accent: "#164e63",
  },
  // 23. Flame Papaya (Warm Vivid Coral)
  {
    id: "flame-papaya",
    name: "Flame Papaya",
    start: "#991b1b",
    mid: "#dc2626",
    end: "#fb7185",
    highlight: "#ffe4e6",
    accent: "#7f1d1d",
  },
];

export default function ExamRadarPage() {
  const [exams, setExams] = useState<EntranceExam[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStream, setSelectedStream] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const [verificationData, setVerificationData] = useState<Record<string, VerificationResult>>({});
  const [activeModalExam, setActiveModalExam] = useState<EntranceExam | null>(null);
  
  // Random seed state to allow shuffling card backgrounds randomly
  const [bgSeed, setBgSeed] = useState<number>(0);

  // Fetch real exam data from API
  useEffect(() => {
    async function loadExams() {
      setLoading(true);
      try {
        const res = await fetch("/api/exams");
        const data = await res.json();
        if (data.exams) {
          setExams(data.exams);
        }
      } catch (err) {
        console.error("Failed to load exams from API:", err);
      } finally {
        setLoading(false);
      }
    }
    loadExams();
  }, []);

  // Filter exams in real-time
  const filteredExams = useMemo(() => {
    return exams.filter((exam) => {
      const matchesStream = selectedStream === "All" || exam.stream === selectedStream;
      const matchesStatus =
        selectedStatus === "All" ||
        (selectedStatus === "Registration Open" && exam.status === "Registration Open") ||
        (selectedStatus === "Upcoming" && (exam.status === "Upcoming" || exam.status === "Announced"));
      const matchesQuery =
        !searchQuery ||
        exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.conductingBody.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.keySubjects.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesStream && matchesStatus && matchesQuery;
    });
  }, [exams, selectedStream, selectedStatus, searchQuery]);

  // Dynamic Background resolver: ensures EVERY card gets a distinct contrasting color theme
  const getColorThemeForExam = (index: number) => {
    const themeIndex = (index + bgSeed) % CARD_COLOR_THEMES.length;
    return CARD_COLOR_THEMES[themeIndex];
  };

  // Live fact-check via Gemini API
  const handleVerifyLive = async (exam: EntranceExam) => {
    setVerifyingId(exam.id);
    try {
      const res = await fetch("/api/exams/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          examName: exam.name,
          shortName: exam.shortName,
        }),
      });

      const data = await res.json();
      if (res.ok && data.statusUpdate) {
        setVerificationData((prev) => ({
          ...prev,
          [exam.id]: {
            examId: exam.id,
            statusUpdate: data.statusUpdate,
            sources: data.sources || [],
            verifiedAt: data.verifiedAt,
          },
        }));
      }
    } catch (err) {
      console.error("Failed to verify live exam status:", err);
    } finally {
      setVerifyingId(null);
    }
  };

  return (
    <main
      style={{
        backgroundImage: "url('/exams-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
      }}
      className="min-h-screen text-[#0f291e] selection:bg-[#0f291e] selection:text-white relative font-sans flex flex-col justify-between overflow-x-hidden"
    >
      {/* =========================================================================
          FIXED EXAM RADAR GRADIENT BACKGROUND LAYER
          ========================================================================= */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="/exams-bg.png"
          alt="Exam Radar Lavender Gradient Wallpaper"
          className="w-full h-full object-cover object-top pointer-events-none select-none"
        />
        {/* Very subtle ambient glass wash */}
        <div className="absolute inset-0 bg-white/[0.04] backdrop-blur-[0.5px]" />
      </div>

      {/* Normal Transparent Navbar (Transparent at top, frosted glass on scroll) */}
      <Header />

      {/* =========================================================================
          HERO & CONTROL SECTION
          ========================================================================= */}
      <section className="w-full max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-10 pt-24 sm:pt-28 pb-12 space-y-7 relative z-10">
        
        {/* Centered Editorial Headline Header (Pill removed as requested) */}
        <div className="space-y-3 max-w-3xl mx-auto text-center flex flex-col items-center">
          <h1 className="font-normal text-3xl sm:text-5xl lg:text-[3.5rem] text-[#0a1e16] tracking-[-0.035em] leading-[1.08] drop-shadow-xs text-center">
            National Entrance Exam
            <span className="block font-serif italic text-[#123628] font-normal mt-0.5">
              interactive folders &amp; portals.
            </span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-[#123628]/85 leading-relaxed font-light max-w-2xl mx-auto text-center drop-shadow-2xs">
            Real-time tracking of NTA, IIT, UPSC, and Central authority entrance dates, registration windows, and applicant volumes. Each folder contains verified papers and official portals.
          </p>
        </div>

        {/* =========================================================================
            GREYISH GLASS FILTER & SEARCH BAR (Squared Edges)
            ========================================================================= */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(235, 238, 242, 0.65) 0%, rgba(212, 218, 226, 0.50) 50%, rgba(195, 204, 215, 0.40) 100%)",
            backdropFilter: "blur(32px) saturate(130%)",
            WebkitBackdropFilter: "blur(32px) saturate(130%)",
          }}
          className="border border-white/80 rounded-none p-4 sm:p-5 space-y-4 shadow-[0_16px_40px_rgba(0,0,0,0.06),inset_0_1px_2px_rgba(255,255,255,0.9)]"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Search Input (Squared Greyish Glass) */}
            <div className="md:col-span-5 relative">
              <Search size={16} className="absolute left-3.5 top-3.5 text-[#0f291e]/60" />
              <input
                type="text"
                placeholder='Search "JEE", "NEET", "CLAT", "BITSAT", "NTA"...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-100/60 backdrop-blur-md border border-white/80 focus:border-[#0f291e] focus:bg-white/80 rounded-none pl-9 pr-8 py-2.5 text-xs text-[#0f291e] placeholder:text-[#0f291e]/50 focus:outline-none transition-all shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-2.5 w-5 h-5 rounded-none bg-black/5 hover:bg-black/10 text-xs text-[#0f291e] flex items-center justify-center cursor-pointer"
                >
                  <X size={11} />
                </button>
              )}
            </div>

            {/* Stream Dropdown (Squared Greyish Glass) */}
            <div className="md:col-span-4 relative">
              <select
                value={selectedStream}
                onChange={(e) => setSelectedStream(e.target.value)}
                className="w-full appearance-none bg-slate-100/60 backdrop-blur-md hover:bg-slate-100/80 border border-white/80 rounded-none px-3.5 py-2.5 text-xs text-[#0f291e] focus:outline-none focus:border-[#0f291e] cursor-pointer pr-8 shadow-xs transition-colors"
              >
                {STREAMS.map((s) => (
                  <option key={s} value={s}>
                    Stream: {s}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-3.5 text-[#0f291e]/60 pointer-events-none" />
            </div>

            {/* Status Dropdown (Squared Greyish Glass) */}
            <div className="md:col-span-3 relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full appearance-none bg-slate-100/60 backdrop-blur-md hover:bg-slate-100/80 border border-white/80 rounded-none px-3.5 py-2.5 text-xs text-[#0f291e] focus:outline-none focus:border-[#0f291e] cursor-pointer pr-8 shadow-xs transition-colors"
              >
                <option value="All">Status: All Statuses</option>
                <option value="Registration Open">Status: Registration Open</option>
                <option value="Upcoming">Status: Upcoming / Announced</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-3.5 text-[#0f291e]/60 pointer-events-none" />
            </div>

          </div>

          {/* Stream Quick Filter Tags & Randomize Button (Squared) */}
          <div className="flex items-center justify-between gap-3 flex-wrap pt-2 border-t border-black/[0.08]">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#0f291e]/70 font-semibold mr-1">
                Stream:
              </span>
              {STREAMS.map((st) => {
                const isActive = selectedStream === st;
                return (
                  <button
                    key={st}
                    onClick={() => setSelectedStream(st)}
                    className={`text-xs px-3 py-1.5 rounded-none border transition-all cursor-pointer font-medium ${
                      isActive
                        ? "bg-[#0f291e] text-white border-[#0f291e] shadow-xs font-semibold"
                        : "bg-slate-100/55 backdrop-blur-md border-white/80 text-[#0f291e]/85 hover:bg-slate-100/90"
                    }`}
                  >
                    {st}
                  </button>
                );
              })}
            </div>

            {/* Interactive Randomize Backgrounds Button (Squared Greyish Glass) */}
            <button
              onClick={() => setBgSeed((prev) => prev + 1)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-none border border-white/80 bg-slate-100/65 backdrop-blur-md hover:bg-[#0f291e] hover:text-white hover:border-[#0f291e] text-xs font-mono font-medium tracking-wide text-[#0f291e] transition-all cursor-pointer shadow-xs"
              title="Shuffle folder color gradients randomly"
            >
              <Shuffle size={12} />
              <span>Shuffle Folder Colors</span>
            </button>
          </div>
        </div>

        {/* Live Telemetry Status Bar */}
        <div className="flex items-center justify-between text-xs text-[#0f291e]/80 px-1 font-medium">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#0a1e16]">{filteredExams.length} National Examinations</span>
            <span>•</span>
            <span>Compact 3D Folders</span>
          </div>
          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span className="inline-flex items-center gap-1 text-emerald-900 font-bold bg-white/60 backdrop-blur-md px-2.5 py-0.5 rounded-none border border-white/80 shadow-2xs">
              <span className="w-2 h-2 rounded-none bg-emerald-600 animate-pulse" />
              Verified Official Direct Portals
            </span>
          </div>
        </div>

        {/* =========================================================================
            COMPACT 3D FROSTED GLASS FOLDER CARDS (Scaled down to compact sleek size)
            ========================================================================= */}
        {loading ? (
          <div className="py-24 text-center space-y-3">
            <div className="w-8 h-8 border-2 border-[#0f291e] border-t-transparent rounded-none animate-spin mx-auto" />
            <p className="text-xs text-[#0f291e]/80 font-medium">
              Loading national exam folder telemetry...
            </p>
          </div>
        ) : filteredExams.length === 0 ? (
          <div className="py-20 text-center space-y-3 border border-white/90 rounded-none bg-white/70 backdrop-blur-2xl shadow-sm">
            <p className="text-base font-semibold text-[#0f291e]">
              No examinations match your current filters
            </p>
            <p className="text-xs text-[#0f291e]/70">
              Try clearing your search query or setting Stream to &ldquo;All&rdquo;.
            </p>
            <button
              onClick={() => {
                setSelectedStream("All");
                setSelectedStatus("All");
                setSearchQuery("");
              }}
              className="px-4 py-1.5 rounded-none bg-[#0f291e] text-white text-xs cursor-pointer hover:bg-black transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-y-8 gap-x-5 pt-2 pb-6">
            {filteredExams.map((exam, index) => {
              const theme = getColorThemeForExam(index);
              const isVerifying = verifyingId === exam.id;
              const liveFact = verificationData[exam.id];

              return (
                <div
                  key={exam.id}
                  className="relative w-full max-w-[305px] mx-auto h-[370px] select-none group transition-transform duration-300 hover:-translate-y-2"
                >
                  {/* =========================================================
                      LAYER 1: BACK FOLDER SHELL (High-Contrast Theme Gradients)
                      ========================================================= */}
                  <svg
                    viewBox="0 0 300 370"
                    className="absolute inset-0 w-full h-full drop-shadow-[0_14px_24px_rgba(0,0,0,0.12)]"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      {/* Base High-Contrast Color Gradient */}
                      <linearGradient
                        id={`folder-grad-${exam.id}`}
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor={theme.start} />
                        <stop offset="48%" stopColor={theme.mid} />
                        <stop offset="100%" stopColor={theme.end} />
                      </linearGradient>

                      {/* Tab Specular Gloss Highlight */}
                      <radialGradient
                        id={`folder-highlight-${exam.id}`}
                        cx="22%"
                        cy="8%"
                        r="45%"
                      >
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.65" />
                        <stop offset="50%" stopColor={theme.highlight} stopOpacity="0.30" />
                        <stop offset="100%" stopColor={theme.highlight} stopOpacity="0" />
                      </radialGradient>

                      {/* Base Shading Depth */}
                      <linearGradient
                        id={`folder-depth-${exam.id}`}
                        x1="0%"
                        y1="35%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#000000" stopOpacity="0" />
                        <stop offset="100%" stopColor="#000000" stopOpacity="0.22" />
                      </linearGradient>
                    </defs>

                    {/* Compact Folder Tab & Main Silhouette */}
                    <path
                      d="M 22 0 
                         L 116 0 
                         C 132 0, 138 20, 155 20 
                         L 278 20 
                         C 290 20, 300 30, 300 42 
                         L 300 350 
                         C 300 361, 290 370, 278 370 
                         L 22 370 
                         C 10 370, 0 361, 0 350 
                         L 0 22 
                         C 0 10, 10 0, 22 0 Z"
                      fill={`url(#folder-grad-${exam.id})`}
                    />

                    {/* Tab Ambient Gloss Specular Lighting */}
                    <path
                      d="M 22 0 
                         L 116 0 
                         C 132 0, 138 20, 155 20 
                         L 278 20 
                         C 290 20, 300 30, 300 42 
                         L 300 350 
                         C 300 361, 290 370, 278 370 
                         L 22 370 
                         C 10 370, 0 361, 0 350 
                         L 0 22 
                         C 0 10, 10 0, 22 0 Z"
                      fill={`url(#folder-highlight-${exam.id})`}
                    />

                    {/* Base Shading Depth */}
                    <path
                      d="M 22 0 
                         L 116 0 
                         C 132 0, 138 20, 155 20 
                         L 278 20 
                         C 290 20, 300 30, 300 42 
                         L 300 350 
                         C 300 361, 290 370, 278 370 
                         L 22 370 
                         C 10 370, 0 361, 0 350 
                         L 0 22 
                         C 0 10, 10 0, 22 0 Z"
                      fill={`url(#folder-depth-${exam.id})`}
                    />
                  </svg>

                  {/* =========================================================
                      LAYER 2: WHITE PAPERS PEEKING OUT FROM INSIDE THE FOLDER
                      ========================================================= */}
                  {/* Paper 1 (Left - Tilted) */}
                  <div className="absolute top-6 left-5 w-[46%] h-28 bg-white/95 rounded-lg shadow-sm -rotate-6 border border-black/[0.05] transition-transform duration-500 ease-out group-hover:-translate-y-3 group-hover:-rotate-8 p-2 flex flex-col justify-between overflow-hidden pointer-events-none">
                    <div className="space-y-1 opacity-75">
                      <div style={{ backgroundColor: theme.start }} className="w-8 h-1 rounded-full opacity-80" />
                      <div className="w-14 h-1 bg-neutral-300 rounded-full" />
                    </div>
                    <span className="font-mono text-[7.5px] font-bold text-neutral-400 uppercase tracking-wider">
                      {exam.stream.split(' ')[0]}
                    </span>
                  </div>

                  {/* Paper 2 (Right - Tilted) */}
                  <div className="absolute top-5 right-5 w-[47%] h-28 bg-white/90 rounded-lg shadow-sm rotate-6 border border-black/[0.05] transition-transform duration-500 ease-out group-hover:-translate-y-3.5 group-hover:rotate-8 p-2 flex flex-col justify-between overflow-hidden pointer-events-none">
                    <div className="space-y-1 opacity-75">
                      <div style={{ backgroundColor: theme.mid }} className="w-10 h-1 rounded-full opacity-80" />
                      <div className="w-16 h-1 bg-neutral-300 rounded-full" />
                    </div>
                    <span className="font-mono text-[7.5px] font-bold text-neutral-400 uppercase tracking-wider text-right">
                      {exam.seatsOffered.split(' ')[0]} Seats
                    </span>
                  </div>

                  {/* Paper 3 (Center - Main Document) */}
                  <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-[62%] h-32 bg-white rounded-lg shadow-md rotate-0 border border-black/[0.07] transition-transform duration-500 ease-out group-hover:-translate-y-4 p-2.5 flex flex-col justify-between overflow-hidden pointer-events-none">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between border-b border-neutral-100 pb-1">
                        <span className="font-mono text-[6.5px] font-bold tracking-wider text-neutral-400 uppercase">
                          OFFICIAL DOCUMENT
                        </span>
                        <FileText size={8} className="text-neutral-400" />
                      </div>
                      <p className="font-bold text-[9px] text-neutral-800 leading-tight line-clamp-1">
                        {exam.examDateEstimate}
                      </p>
                    </div>
                    <div className="pt-0.5 border-t border-neutral-100">
                      <span className="font-mono text-[7.5px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-xs">
                        {exam.status}
                      </span>
                    </div>
                  </div>

                  {/* =========================================================
                      LAYER 3: FROSTED GLASS FRONT POCKET (Lower ~73% of Folder)
                      ========================================================= */}
                  <div
                    style={{
                      background: "linear-gradient(180deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.60) 50%, rgba(248, 250, 252, 0.72) 100%)",
                      backdropFilter: "blur(26px) saturate(140%)",
                      WebkitBackdropFilter: "blur(26px) saturate(140%)",
                      boxShadow: "0 14px 30px rgba(0, 0, 0, 0.08)",
                    }}
                    className="absolute left-0 right-0 bottom-0 top-[27%] rounded-[20px] p-3.5 sm:p-4 flex flex-col justify-between overflow-hidden z-20"
                  >
                    
                    {/* Top Header of the Front Pocket: Title on left, (i) on right */}
                    <div className="flex items-start justify-between gap-1.5">
                      <div className="space-y-0.5 min-w-0 flex-1">
                        <h3 className="font-bold text-base sm:text-[17px] text-neutral-900 tracking-tight leading-tight truncate drop-shadow-2xs">
                          {exam.shortName}
                        </h3>
                        <p className="text-[10px] text-neutral-600 font-medium truncate">
                          {exam.annualApplicants} • {exam.conductingBody}
                        </p>
                      </div>

                      {/* Info Button (i) inside circle */}
                      <button
                        onClick={() => setActiveModalExam(exam)}
                        className="w-5 h-5 rounded-full border border-neutral-300 bg-white/70 backdrop-blur-sm flex items-center justify-center text-[10px] font-serif italic text-neutral-800 hover:bg-white hover:border-neutral-900 transition-all shadow-xs cursor-pointer shrink-0"
                        title="View exam details & syllabus"
                      >
                        i
                      </button>
                    </div>

                    {/* Middle: Clean Description & Spec Badges */}
                    <div className="space-y-1.5 my-auto pt-0.5">
                      <p className="text-[10.5px] text-neutral-700 leading-snug line-clamp-2 font-normal">
                        {exam.name}. {exam.description}
                      </p>

                      {/* Frosted Spec Telemetry Badges */}
                      <div className="flex flex-wrap gap-1 pt-0.5">
                        <span className="px-1.5 py-0.5 rounded-full text-[8.5px] font-mono font-semibold bg-white/90 backdrop-blur-md text-neutral-800 shadow-2xs">
                          {exam.examMonth}
                        </span>
                        <span className="px-1.5 py-0.5 rounded-full text-[8.5px] font-mono font-semibold bg-white/90 backdrop-blur-md text-neutral-800 shadow-2xs">
                          {exam.status}
                        </span>
                        <span className="px-1.5 py-0.5 rounded-full text-[8.5px] font-mono font-semibold bg-white/90 backdrop-blur-md text-neutral-800 shadow-2xs">
                          {exam.stream.split(' ')[0]}
                        </span>
                      </div>

                      {/* Live AI Fact Check Drawer (if active) */}
                      {liveFact && (
                        <div className="p-1.5 rounded-md bg-emerald-50/90 backdrop-blur-md border border-emerald-300 text-[9.5px] text-emerald-950 space-y-0.5 shadow-xs animate-in fade-in duration-200">
                          <div className="flex items-center justify-between font-mono font-bold text-[7.5px] text-emerald-800">
                            <span className="flex items-center gap-1">
                              <ShieldCheck size={9} className="text-emerald-700" />
                              Live Verified
                            </span>
                            <span>{new Date(liveFact.verifiedAt).toLocaleTimeString()}</span>
                          </div>
                          <p className="text-[9.5px] leading-tight font-normal whitespace-pre-line line-clamp-2">
                            {liveFact.statusUpdate}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Bottom Row: Deadline on Left, Official Portal Button on Right */}
                    <div className="pt-2 border-t border-black/10 flex items-center justify-between gap-1">
                      <span className="text-[9.5px] text-neutral-500 font-mono truncate max-w-[48%]">
                        {exam.applicationDeadline.split('|')[0].trim()}
                      </span>

                      {/* Action buttons */}
                      <div className="flex items-center gap-1">
                        {/* Live AI Fact-Check Button */}
                        <button
                          onClick={() => handleVerifyLive(exam)}
                          disabled={isVerifying}
                          className="p-1 rounded-full bg-white/80 hover:bg-white text-neutral-800 shadow-xs transition-colors cursor-pointer shrink-0 disabled:opacity-60"
                          title="Run live AI fact-checking"
                        >
                          {isVerifying ? (
                            <Loader2 size={10} className="animate-spin" />
                          ) : (
                            <ShieldCheck size={10} className="text-emerald-700" />
                          )}
                        </button>

                        {/* Primary Official Portal Button */}
                        <a
                          href={exam.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[10px] font-bold text-neutral-900 bg-white hover:bg-neutral-50 px-2.5 py-0.5 rounded-full shadow-xs hover:shadow-md transition-all"
                          title={`Visit Official Portal: ${exam.officialUrl}`}
                        >
                          <span>Portal</span>
                          <ExternalLink size={9} />
                        </a>
                      </div>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </section>

      {/* =========================================================================
          INFO MODAL (Triggered by the (i) button on each folder)
          ========================================================================= */}
      {activeModalExam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-neutral-200/80 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between border-b border-neutral-100 pb-3">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-sm">
                  {activeModalExam.stream}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 pt-1">
                  {activeModalExam.name}
                </h2>
                <p className="text-xs text-neutral-500 font-medium">
                  {activeModalExam.conductingBody}
                </p>
              </div>
              <button
                onClick={() => setActiveModalExam(null)}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X size={14} />
              </button>
            </div>

            <div className="space-y-3 text-xs text-neutral-700 leading-relaxed">
              <p>{activeModalExam.description}</p>
              
              <div className="grid grid-cols-2 gap-2 p-3 bg-neutral-50 rounded-xl border border-neutral-200/80">
                <div>
                  <span className="text-[10px] font-mono text-neutral-500 font-semibold block uppercase">
                    Timeline
                  </span>
                  <span className="font-bold text-neutral-900">{activeModalExam.examDateEstimate}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-neutral-500 font-semibold block uppercase">
                    Application Deadline
                  </span>
                  <span className="font-bold text-neutral-900">{activeModalExam.applicationDeadline}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-neutral-500 font-semibold block uppercase">
                    Seats Available
                  </span>
                  <span className="font-bold text-neutral-900">{activeModalExam.seatsOffered}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-neutral-500 font-semibold block uppercase">
                    Aspirants
                  </span>
                  <span className="font-bold text-neutral-900">{activeModalExam.annualApplicants}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono text-neutral-500 font-semibold block uppercase pb-1">
                  Eligibility
                </span>
                <p className="p-2 bg-neutral-50 rounded-lg text-neutral-800">
                  {activeModalExam.eligibility}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-mono text-neutral-500 font-semibold block uppercase pb-1">
                  Key Subjects
                </span>
                <div className="flex flex-wrap gap-1">
                  {activeModalExam.keySubjects.map((sub, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-full bg-neutral-200/70 font-mono text-[10px] font-medium text-neutral-800">
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-3">
              <Link
                href={`/simulator?exam=${encodeURIComponent(activeModalExam.shortName)}`}
                className="flex-1"
              >
                <button className="w-full py-2.5 px-4 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer">
                  <span>Cutoff Simulator</span>
                  <ArrowUpRight size={12} />
                </button>
              </Link>
              <a
                href={activeModalExam.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <button className="w-full py-2.5 px-4 rounded-full bg-[#0f291e] hover:bg-black text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm">
                  <span>Visit Official Portal</span>
                  <ExternalLink size={12} />
                </button>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Clean Minimalist Footer on Frosted Glass */}
      <footer className="w-full max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-10 py-6 border-t border-white/40 bg-white/40 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#0f291e]/80 font-medium relative z-10">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#0f291e]">Student Saarthi</span>
          <span>•</span>
          <span>National Entrance Exam Telemetry</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/research" className="hover:text-[#0f291e] transition-colors">Deep Research</Link>
          <Link href="/simulator" className="hover:text-[#0f291e] transition-colors">Simulator</Link>
          <Link href="/colleges" className="hover:text-[#0f291e] transition-colors">Colleges</Link>
          <Link href="/calculator" className="hover:text-[#0f291e] transition-colors">ROI Calculator</Link>
        </div>
        <div>
          <span>© 2026 Student Saarthi. All rights reserved.</span>
        </div>
      </footer>
    </main>
  );
}
