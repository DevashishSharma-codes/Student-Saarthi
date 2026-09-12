"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/site/Header";
import {
  Search,
  MapPin,
  Check,
  ArrowUpRight,
  X,
  ChevronDown,
  SlidersHorizontal,
  CheckCircle2,
  TrendingUp,
  DollarSign,
} from "lucide-react";

interface MatchedCollege {
  id: string;
  name: string;
  shortName: string;
  stream: string;
  city: string;
  state: string;
  type: string;
  nirfRank: number | string;
  annualFeesEstimate: string;
  medianCtcEstimate: string;
  admissionExam: string;
  rating: number;
  highlight: string;
  popularPrograms: string[];
  keyStrengths: string[];
  specializations?: string[];
  totalDegreeLakhs?: number;
  ctcLakhs?: number;
  fitsBudget?: boolean;
  budgetDelta?: number;
}

const STREAMS = [
  { label: "All Streams", value: "All Streams" },
  { label: "Science & Tech (Engineering)", value: "Science (PCM / Tech)" },
  { label: "Medical & Healthcare", value: "Science (PCB / Healthcare)" },
  { label: "Commerce & Finance", value: "Commerce & Finance" },
  { label: "Law & Public Policy", value: "Law & Public Policy" },
  { label: "Design & Media", value: "Design & Media" },
];

const BUDGET_PRESETS = [
  { label: "₹5L", value: 5, desc: "Govt Subsidized" },
  { label: "₹10L", value: 10, desc: "NITs / State Top" },
  { label: "₹16L", value: 16, desc: "Premier Tech" },
  { label: "₹25L", value: 25, desc: "Top Private" },
  { label: "Flexible", value: null, desc: "No Limit" },
];

const POPULAR_TAGS = ["AI & ML", "Data Science", "Cybersecurity", "Corporate Law"];

export default function DeepResearchPage() {
  const [query, setQuery] = useState("");
  const [stream, setStream] = useState("All Streams");
  // User's custom budget in ₹ Lakhs (null means flexible/no limit)
  const [customBudget, setCustomBudget] = useState<number | null>(12);
  const [budgetInputText, setBudgetInputText] = useState("12");

  // Right side filter & sort controls
  const [onlyInBudget, setOnlyInBudget] = useState(false);
  const [minCtcFilter, setMinCtcFilter] = useState<number>(0);
  const [sortBy, setSortBy] = useState<"rank" | "roi" | "fee">("rank");

  const [loading, setLoading] = useState(false);
  const [colleges, setColleges] = useState<MatchedCollege[]>([]);

  // Fetch colleges from API
  const fetchColleges = useCallback(
    async (searchQuery: string, selectedStream: string, budgetNum: number | null) => {
      setLoading(true);
      try {
        const res = await fetch("/api/research", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: searchQuery,
            stream: selectedStream === "All Streams" ? undefined : selectedStream,
            maxBudget: budgetNum !== null ? budgetNum : undefined,
          }),
        });

        const data = await res.json();
        if (data.colleges) {
          setColleges(data.colleges);
        }
      } catch (err) {
        console.error("Error loading colleges:", err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Initial load
  useEffect(() => {
    fetchColleges("", "All Streams", 12);
  }, [fetchColleges]);

  // Handle custom budget input change
  const handleBudgetInputChange = (val: string) => {
    setBudgetInputText(val);
    const parsed = parseFloat(val);
    if (!isNaN(parsed) && parsed > 0) {
      setCustomBudget(parsed);
      fetchColleges(query, stream, parsed);
    } else if (val === "") {
      setCustomBudget(null);
      fetchColleges(query, stream, null);
    }
  };

  // Handle preset budget button
  const handlePresetSelect = (presetVal: number | null) => {
    setCustomBudget(presetVal);
    setBudgetInputText(presetVal !== null ? presetVal.toString() : "");
    fetchColleges(query, stream, presetVal);
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    fetchColleges(query, stream, customBudget);
  };

  // Filter and sort colleges on the client in real-time
  const processedColleges = useMemo(() => {
    let result = colleges.map((c) => {
      const annualLakhs = parseFloat((c.annualFeesEstimate || "0").replace(/[^0-9.]/g, "")) || 2;
      const duration = c.stream.includes("Commerce") || c.stream.includes("Arts") ? 3 : c.stream.includes("Law") ? 5 : 4;
      const totalDegreeLakhs = c.totalDegreeLakhs || annualLakhs * duration;

      const ctcMatch = c.medianCtcEstimate.match(/([0-9.]+)/);
      const ctcLakhs = c.ctcLakhs || (ctcMatch ? parseFloat(ctcMatch[1]) : 0);

      const fitsBudget = customBudget === null ? true : totalDegreeLakhs <= customBudget;
      const budgetDelta = customBudget !== null ? parseFloat((totalDegreeLakhs - customBudget).toFixed(1)) : 0;

      return {
        ...c,
        totalDegreeLakhs,
        ctcLakhs,
        fitsBudget,
        budgetDelta,
      };
    });

    // Filter by "In Budget Only"
    if (onlyInBudget && customBudget !== null) {
      result = result.filter((c) => c.fitsBudget);
    }

    // Filter by Min CTC
    if (minCtcFilter > 0) {
      result = result.filter((c) => (c.ctcLakhs || 0) >= minCtcFilter);
    }

    // Sort
    return result.sort((a, b) => {
      if (sortBy === "roi") {
        return (b.ctcLakhs || 0) - (a.ctcLakhs || 0);
      }
      if (sortBy === "fee") {
        return (a.totalDegreeLakhs || 999) - (b.totalDegreeLakhs || 999);
      }
      const rankA = typeof a.nirfRank === "number" ? a.nirfRank : 999;
      const rankB = typeof b.nirfRank === "number" ? b.nirfRank : 999;
      return rankA - rankB;
    });
  }, [colleges, customBudget, onlyInBudget, minCtcFilter, sortBy]);

  return (
    <main
      style={{
        backgroundImage: "url('/deep-research-page-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
      }}
      className="min-h-screen text-[#0f291e] selection:bg-[#0f291e] selection:text-white relative font-sans flex flex-col justify-between overflow-x-hidden"
    >
      {/* Fixed Ambient Background Wallpaper Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <Image
          src="/deep-research-page-bg.png"
          alt="Deep Research Ambient Background"
          fill
          priority
          className="object-cover object-center pointer-events-none select-none"
        />
        {/* Very subtle frosted wash for maximum content readability */}
        <div className="absolute inset-0 bg-white/[0.04] backdrop-blur-[0.5px]" />
      </div>

      {/* Normal Transparent Navbar Without Background */}
      <Header />

      {/* =========================================================================
          TOP & DOWN LAYOUT:
          - TOP: Rectangular hero banner using the deep research ambient image
          - DOWN: Live college directory with toolbar and multi-column grid cards
          - All squared edges (rounded-none), light typography, zero text glows
          ========================================================================= */}
      <section className="relative z-10 w-full max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-12 space-y-6">
        {/* -----------------------------------------------------------------------
            TOP HERO MODULE: Upper rectangle using custom sage green gradient bg
            ----------------------------------------------------------------------- */}
        <div
          style={{
            backgroundImage: "url('/research-hero-bg.png?v=4')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="relative z-10 w-full rounded-none border border-white/90 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6 shadow-[0_16px_40px_rgba(0,0,0,0.05),inset_0_1px_2px_rgba(255,255,255,0.9)] overflow-hidden"
        >
            
            {/* Header Text: Headline & Subtitle */}
            <div className="space-y-2 max-w-3xl">
            <h1 className="font-outfit font-light text-3xl sm:text-4xl lg:text-[2.75rem] text-[#0f291e] tracking-tight leading-[1.1]">
              Find colleges that fit{" "}
              <span className="font-serif italic font-normal text-[#123826]">
                your budget &amp; ambitions.
              </span>
            </h1>
            <p className="font-outfit text-xs sm:text-sm text-[#1b3d2d]/85 leading-relaxed font-light max-w-2xl">
              Enter your custom degree budget and choose your stream. Real-time filtering recalculates costs, placement CTC, and rankings instantly.
            </p>
          </div>

            {/* Search Input & Stream Dropdown */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              {/* Search Form */}
              <form
                onSubmit={handleSearchSubmit}
                className="md:col-span-7 lg:col-span-8 relative bg-white/90 border border-[#0f291e]/20 hover:border-[#0f291e]/50 focus-within:border-[#0f291e] rounded-none p-1.5 flex items-center gap-2 shadow-xs transition-all"
              >
                <Search size={16} className="text-[#0f291e]/50 shrink-0 ml-2.5" />
                <input
                  type="text"
                  placeholder='Search "data science", "ai", "cybersecurity", "iit"...'
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent text-xs sm:text-sm font-outfit text-[#0f291e] placeholder:text-[#0f291e]/40 focus:outline-none py-1"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      fetchColleges("", stream, customBudget);
                    }}
                    className="w-5 h-5 rounded-none bg-black/5 hover:bg-black/10 text-xs font-mono text-[#0f291e]/70 flex items-center justify-center cursor-pointer"
                  >
                    <X size={12} />
                  </button>
                )}
                <button
                  type="submit"
                  className="px-5 py-2 rounded-none bg-[#0f291e] hover:bg-[#183e2e] text-white text-xs font-outfit font-normal transition-all cursor-pointer shrink-0 shadow-xs"
                >
                  Search
                </button>
              </form>

              {/* Stream Select Dropdown */}
              <div className="md:col-span-5 lg:col-span-4 relative">
                <select
                  value={stream}
                  onChange={(e) => {
                    setStream(e.target.value);
                    fetchColleges(query, e.target.value, customBudget);
                  }}
                  className="w-full appearance-none bg-white/90 hover:bg-white border border-[#0f291e]/20 rounded-none px-3.5 py-2.5 text-xs font-outfit text-[#0f291e] focus:outline-none focus:border-[#0f291e] cursor-pointer pr-8 shadow-xs"
                >
                  {STREAMS.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-3 text-[#0f291e]/50 pointer-events-none" />
              </div>
            </div>

            {/* Interactive Budget Controller & Quick Focus Areas */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center pt-1">
              
              {/* Custom Budget Controller */}
              <div className="lg:col-span-8 bg-white/80 backdrop-blur-sm p-4 rounded-none border border-[#0f291e]/15 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[#0f291e]/70 font-medium flex items-center gap-1.5">
                    <DollarSign size={12} className="text-[#0f291e]" />
                    <span>Your 4-Year Degree Budget:</span>
                  </label>
                  <span className="font-outfit text-xs font-medium text-[#0f291e]">
                    {customBudget !== null ? `₹${customBudget} Lakhs` : "Flexible / Any"}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  {/* Direct Numeric Input */}
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-2 text-xs font-mono font-medium text-[#0f291e]/60">
                      ₹
                    </span>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      step="0.5"
                      placeholder="Enter budget (e.g. 12)"
                      value={budgetInputText}
                      onChange={(e) => handleBudgetInputChange(e.target.value)}
                      className="w-full bg-white border border-[#0f291e]/20 focus:border-[#0f291e] rounded-none pl-7 pr-20 py-1.5 text-xs font-outfit font-normal text-[#0f291e] focus:outline-none shadow-xs"
                    />
                    <span className="absolute right-3 top-2 text-xs font-mono text-[#0f291e]/50">
                      Lakhs Total
                    </span>
                  </div>

                  {/* Preset Pills */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {BUDGET_PRESETS.map((p) => {
                      const isSelected = customBudget === p.value;
                      return (
                        <button
                          key={p.label}
                          type="button"
                          onClick={() => handlePresetSelect(p.value)}
                          className={`text-xs px-2.5 py-1 rounded-none border transition-all cursor-pointer font-outfit ${
                            isSelected
                              ? "bg-[#0f291e] text-white border-[#0f291e] font-normal"
                              : "bg-white border-[#0f291e]/15 text-[#0f291e]/75 hover:bg-black/5"
                          }`}
                        >
                          {p.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Range Slider */}
                <div className="space-y-1 pt-0.5">
                  <input
                    type="range"
                    min="2"
                    max="30"
                    step="0.5"
                    value={customBudget ?? 30}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      setCustomBudget(val);
                      setBudgetInputText(val.toString());
                      fetchColleges(query, stream, val);
                    }}
                    className="w-full accent-[#0f291e] cursor-pointer h-1.5 bg-black/10 rounded-none"
                  />
                  <div className="flex justify-between text-[9px] font-mono text-[#0f291e]/60">
                    <span>₹2L</span>
                    <span>₹10L (NITs)</span>
                    <span>₹20L (Bits/Pvt)</span>
                    <span>₹30L+</span>
                  </div>
                </div>
              </div>

              {/* Quick Focus Tags & Telemetry */}
              <div className="lg:col-span-4 bg-white/80 backdrop-blur-sm p-4 rounded-none border border-[#0f291e]/15 flex flex-col justify-between space-y-3 h-full shadow-xs">
                <div className="space-y-1.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#0f291e]/60 font-medium block">
                    Quick Focus Areas:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {POPULAR_TAGS.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          setQuery(tag);
                          fetchColleges(tag, stream, customBudget);
                        }}
                        className={`text-xs px-2.5 py-1 rounded-none border transition-all cursor-pointer font-outfit ${
                          query.toLowerCase() === tag.toLowerCase()
                            ? "bg-[#0f291e] text-white border-[#0f291e]"
                            : "border-[#0f291e]/20 bg-white hover:bg-black/5 text-[#0f291e]/85"
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#0f291e]/10 flex items-center justify-between text-[10px] font-mono text-[#0f291e]/60">
                  <span>NIRF 2026 Grounded</span>
                  <span>{customBudget !== null ? `Cap: ₹${customBudget}L` : "Flexible"}</span>
                </div>
              </div>

            </div>

        </div>

        {/* -----------------------------------------------------------------------
            DOWN SECTION: Live College Directory with Toolbar and Multi-Column Grid
            ----------------------------------------------------------------------- */}
        <div className="relative z-10 space-y-4">
          
          {/* Directory Toolbar with Real-time Filters & Sorters */}
          <div className="bg-white/60 backdrop-blur-xl border border-white/80 p-3 sm:p-4 rounded-none shadow-[0_8px_24px_rgba(0,0,0,0.04),inset_0_1px_2px_rgba(255,255,255,0.9)] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 flex-wrap min-w-0">
              <div className="flex items-center gap-1 shrink-0">
                <span className="w-2 h-2 rounded-none bg-[#0f291e]/40" />
                <span className="w-2 h-2 rounded-none bg-[#0f291e]/25" />
                <span className="w-2 h-2 rounded-none bg-[#0f291e]/15" />
              </div>

              <span className="text-sm font-outfit text-[#0f291e] font-normal">
                <strong className="font-medium">{processedColleges.length}</strong> Institutions Matched
              </span>

              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono px-2 py-0.5 rounded-none bg-emerald-900/10 text-emerald-900 border border-emerald-900/20">
                <span className="w-1.5 h-1.5 rounded-none bg-emerald-600 animate-pulse" />
                <span>Live API Grounded</span>
              </span>

              {customBudget !== null && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-none bg-[#0f291e]/5 text-[#0f291e] border border-[#0f291e]/15">
                  Cap: ₹{customBudget}L
                </span>
              )}
            </div>

            {/* Right Side Filter & Sort Controls */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* "In-Budget Only" Toggle */}
              {customBudget !== null && (
                <button
                  onClick={() => setOnlyInBudget(!onlyInBudget)}
                  className={`px-3 py-1 rounded-none text-xs font-outfit font-normal transition-all border cursor-pointer ${
                    onlyInBudget
                      ? "bg-[#0f291e] text-white border-[#0f291e] shadow-xs"
                      : "bg-white/70 hover:bg-white text-[#0f291e] border-white/80 shadow-2xs"
                  }`}
                  title="Show only colleges that fit within your budget"
                >
                  {onlyInBudget ? "✓ In-Budget Only" : "Show In-Budget Only"}
                </button>
              )}

              {/* CTC Filter Dropdown */}
              <select
                value={minCtcFilter}
                onChange={(e) => setMinCtcFilter(parseFloat(e.target.value))}
                className="bg-white/70 hover:bg-white border border-white/80 text-[#0f291e] rounded-none px-2.5 py-1 text-xs font-outfit focus:outline-none cursor-pointer shadow-2xs"
              >
                <option value={0}>CTC: All</option>
                <option value={10}>&gt; ₹10 LPA</option>
                <option value={15}>&gt; ₹15 LPA</option>
                <option value={20}>&gt; ₹20 LPA</option>
              </select>

              {/* Sorting Buttons */}
              <div className="flex items-center gap-1 text-xs font-outfit">
                <span className="text-[10px] font-mono text-[#0f291e]/60 mr-1 uppercase">Sort:</span>
                <button
                  onClick={() => setSortBy("rank")}
                  className={`px-2.5 py-1 rounded-none cursor-pointer transition-colors border ${
                    sortBy === "rank"
                      ? "bg-[#0f291e] text-white font-normal border-[#0f291e] shadow-xs"
                      : "bg-white/70 hover:bg-white text-[#0f291e] border-white/80 shadow-2xs"
                  }`}
                  title="Sort by NIRF Ranking"
                >
                  NIRF
                </button>
                <button
                  onClick={() => setSortBy("roi")}
                  className={`px-2.5 py-1 rounded-none cursor-pointer transition-colors border ${
                    sortBy === "roi"
                      ? "bg-[#0f291e] text-white font-normal border-[#0f291e] shadow-xs"
                      : "bg-white/70 hover:bg-white text-[#0f291e] border-white/80 shadow-2xs"
                  }`}
                  title="Sort by Placement CTC"
                >
                  CTC ↓
                </button>
                <button
                  onClick={() => setSortBy("fee")}
                  className={`px-2.5 py-1 rounded-none cursor-pointer transition-colors border ${
                    sortBy === "fee"
                      ? "bg-[#0f291e] text-white font-normal border-[#0f291e] shadow-xs"
                      : "bg-white/70 hover:bg-white text-[#0f291e] border-white/80 shadow-2xs"
                  }`}
                  title="Sort by Lowest Degree Fees"
                >
                  Fee ↑
                </button>
              </div>
            </div>
          </div>

          {/* Multi-Column Responsive College Cards Grid */}
          {loading ? (
            <div className="w-full bg-white/60 backdrop-blur-xl border border-white/80 rounded-none py-20 flex flex-col items-center justify-center space-y-3 shadow-[0_8px_24px_rgba(0,0,0,0.04),inset_0_1px_2px_rgba(255,255,255,0.9)]">
              <div className="w-7 h-7 border-2 border-[#0f291e] border-t-transparent rounded-full animate-spin" />
              <p className="font-outfit text-xs text-[#0f291e] font-normal">
                Filtering colleges matching your budget...
              </p>
            </div>
          ) : processedColleges.length === 0 ? (
            <div className="w-full bg-white/60 backdrop-blur-xl border border-white/80 rounded-none py-16 px-4 flex flex-col items-center justify-center space-y-2 text-center shadow-[0_8px_24px_rgba(0,0,0,0.04),inset_0_1px_2px_rgba(255,255,255,0.9)]">
              <p className="font-outfit text-base font-normal text-[#0f291e]">
                No colleges match your criteria
              </p>
              <p className="font-outfit text-xs text-[#0f291e]/70 max-w-sm">
                Try increasing your degree budget or toggle off &ldquo;In-Budget Only&rdquo;.
              </p>
              {onlyInBudget && (
                <button
                  onClick={() => setOnlyInBudget(false)}
                  className="mt-2 px-4 py-1.5 rounded-none bg-[#0f291e] text-white text-xs font-outfit cursor-pointer"
                >
                  Show all matching colleges
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {processedColleges.map((college) => (
                <div
                  key={college.id}
                  className="bg-white/60 hover:bg-white/75 backdrop-blur-xl border border-white/80 hover:border-white rounded-none p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04),inset_0_1px_2px_rgba(255,255,255,0.9)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.07),inset_0_1px_2px_rgba(255,255,255,1)] transition-all flex flex-col justify-between space-y-4 group"
                >
                  {/* Top Meta Bar */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="px-2 py-0.5 rounded-none text-[9px] font-mono font-medium bg-[#0f291e] text-white">
                          {college.type}
                        </span>
                        <span className="font-mono text-[10px] text-[#0f291e] font-medium">
                          NIRF #{college.nirfRank}
                        </span>
                      </div>

                      {/* Dynamic Budget Match Status */}
                      {customBudget !== null && (
                        college.fitsBudget ? (
                          <span className="px-2 py-0.5 rounded-none text-[9px] font-mono font-medium bg-emerald-900/10 text-emerald-900 border border-emerald-900/20 flex items-center gap-1">
                            <Check size={9} /> Within Budget
                            {college.budgetDelta !== undefined && college.budgetDelta < 0 && (
                              <span className="opacity-75">
                                ({Math.abs(college.budgetDelta)}L Under)
                              </span>
                            )}
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.5 rounded-none text-[9px] font-mono bg-amber-900/10 text-amber-900 border border-amber-900/20">
                            +₹{college.budgetDelta}L Above Budget
                          </span>
                        )
                      )}
                    </div>

                    <div>
                      <h3 className="font-outfit text-base sm:text-lg font-normal text-[#0a2016] group-hover:text-[#0f291e] transition-colors leading-snug line-clamp-2">
                        {college.name}
                      </h3>
                      <p className="font-outfit text-xs text-[#0f291e]/75 flex items-center gap-1 font-light mt-1">
                        <MapPin size={11} className="shrink-0" /> {college.city}, {college.state}
                      </p>
                    </div>

                    {/* Specializations Tags */}
                    {(college.specializations || college.popularPrograms) && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {(college.specializations || college.popularPrograms).slice(0, 3).map((prog, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-none bg-[#0f291e]/5 border border-[#0f291e]/10 text-[10px] font-outfit text-[#0f291e] font-light"
                          >
                            {prog}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 3 Metrics Columns & CTA Button */}
                  <div className="space-y-3 pt-3 border-t border-[#0f291e]/10">
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <span className="font-mono text-[8.5px] uppercase text-[#0f291e]/60 block font-medium">
                          Degree Fee
                        </span>
                        <span className="font-outfit font-normal text-sm text-[#0f291e]">
                          ₹{college.totalDegreeLakhs?.toFixed(1)}L
                        </span>
                        <span className="font-mono text-[9px] text-[#0f291e]/50 block truncate font-light">
                          {college.annualFeesEstimate}
                        </span>
                      </div>

                      <div>
                        <span className="font-mono text-[8.5px] uppercase text-[#0f291e]/60 block font-medium">
                          Median CTC
                        </span>
                        <span className="font-outfit font-normal text-sm text-[#064e3b]">
                          {college.medianCtcEstimate}
                        </span>
                        {college.totalDegreeLakhs && college.ctcLakhs && (
                          <span className="font-mono text-[9px] text-emerald-800 font-medium block">
                            {(college.ctcLakhs / college.totalDegreeLakhs).toFixed(1)}x ROI
                          </span>
                        )}
                      </div>

                      <div>
                        <span className="font-mono text-[8.5px] uppercase text-[#0f291e]/60 block font-medium">
                          Exam
                        </span>
                        <span className="font-outfit font-normal text-sm text-[#0f291e] truncate block">
                          {college.admissionExam}
                        </span>
                        <span className="font-mono text-[9px] text-[#0f291e]/50 block font-light">
                          Rating: {college.rating}/5.0
                        </span>
                      </div>
                    </div>

                    {/* Simulate Button */}
                    <Link
                      href={`/simulator?college=${encodeURIComponent(college.shortName)}`}
                      className="block w-full"
                    >
                      <button className="w-full py-2 rounded-none bg-[#0f291e] hover:bg-[#183e2e] text-white text-xs font-outfit font-normal transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs">
                        <span>Simulate Admission &amp; ROI</span>
                        <ArrowUpRight size={13} />
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </section>

      {/* Clean Minimalist Footer */}
      <footer className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-5 border-t border-[#0f291e]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-outfit text-[#0f291e]/70">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#0f291e]">Student Saarthi</span>
          <span>•</span>
          <span>Decision Support System for Higher Education</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/exams" className="hover:text-[#0f291e] transition-colors">Exam Radar</Link>
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
