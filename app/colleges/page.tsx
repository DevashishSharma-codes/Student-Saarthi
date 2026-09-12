"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { COLLEGE_DIRECTORY, CollegeProfile } from "@/lib/collegeData";
import {
  getCollegePlacementSources,
  PlacementSource,
} from "@/lib/placementSources";
import { AuditReportViewer } from "@/components/site/AuditReportViewer";
import {
  MapPin,
  Search,
  Loader2,
  ExternalLink,
  ArrowUpRight,
  CheckCircle2,
  X,
  ShieldCheck,
  FileText,
  AlertTriangle,
} from "lucide-react";

const STREAMS = [
  "All Streams",
  "Science & Tech",
  "Commerce & Business",
  "Arts & Humanities",
  "Law",
  "Design & Media",
  "Medical & Bio",
] as const;

export default function CollegesPage() {
  const [selectedStream, setSelectedStream] = useState<string>("All Streams");
  const [searchQuery, setSearchQuery] = useState("");
  const [customCollege, setCustomCollege] = useState("");
  const [evaluatingName, setEvaluatingName] = useState<string | null>(null);
  const [evalResult, setEvalResult] = useState<{
    college: string;
    text: string;
    sources: Array<{ title: string; url: string }>;
  } | null>(null);
  const [evalError, setEvalError] = useState<string | null>(null);

  // Dedicated Placement Audit Modal State
  const [modalCollege, setModalCollege] = useState<CollegeProfile | null>(null);
  const [modalSources, setModalSources] = useState<PlacementSource | null>(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalAuditText, setModalAuditText] = useState<string | null>(null);
  const [modalGroundedSources, setModalGroundedSources] = useState<
    Array<{ title: string; url: string }>
  >([]);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModalCollege(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredColleges = COLLEGE_DIRECTORY.filter((college) => {
    const matchesStream =
      selectedStream === "All Streams" || college.stream === selectedStream;
    const matchesSearch =
      college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      college.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      college.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      college.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      college.popularPrograms.some((p) =>
        p.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesStream && matchesSearch;
  });

  const handleEvaluate = async (nameToEval: string) => {
    if (!nameToEval.trim()) return;
    setEvaluatingName(nameToEval);
    setEvalResult(null);
    setEvalError(null);

    try {
      const res = await fetch("/api/colleges/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collegeName: nameToEval }),
      });

      const data = await res.json();
      if (res.ok && data.evaluation) {
        setEvalResult({
          college: data.college || nameToEval,
          text: data.evaluation,
          sources: data.sources || [],
        });
      } else {
        setEvalError(data.error || "Could not retrieve audit for this institution. Please try another campus name.");
      }
    } catch (err: any) {
      console.error("Evaluation failed:", err);
      setEvalError(err?.message || "Network request failed. Please check your connection.");
    } finally {
      setEvaluatingName(null);
    }
  };

  const openAuditModal = async (col: CollegeProfile) => {
    setModalCollege(col);
    const sources = getCollegePlacementSources(col);
    setModalSources(sources);
    setModalAuditText(null);
    setModalGroundedSources([]);
    setModalLoading(true);

    try {
      const res = await fetch("/api/colleges/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collegeName: col.name }),
      });

      const data = await res.json();
      if (res.ok) {
        setModalAuditText(data.evaluation || null);
        setModalGroundedSources(data.sources || []);
      }
    } catch (err) {
      console.error("Modal evaluation failed:", err);
    } finally {
      setModalLoading(false);
    }
  };

  return (
    <main
      style={{
        backgroundImage: "url('/colleges-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
      }}
      className="min-h-screen text-[#0f291e] selection:bg-[#0f291e] selection:text-white relative font-sans flex flex-col justify-between overflow-x-hidden"
    >
      {/* =========================================================================
          FIXED ROLLING HILLS LANDSCAPE BACKGROUND LAYER
          ========================================================================= */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="/colleges-bg.png"
          alt="Colleges Landscape Wallpaper"
          className="w-full h-full object-cover object-top pointer-events-none select-none"
        />
        <div className="absolute inset-0 bg-white/[0.04] backdrop-blur-[0.5px]" />
      </div>

      <Header />

      {/* =========================================================================
          HERO & CONTROL SECTION
          ========================================================================= */}
      <section className="w-full max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-10 pt-24 sm:pt-28 pb-12 space-y-8 relative z-10">
        
        {/* Centered Editorial Headline Header */}
        <div className="space-y-3 max-w-3xl mx-auto text-center flex flex-col items-center">
          <h1 className="font-light text-3xl sm:text-5xl lg:text-[3.5rem] text-[#0a1e16] tracking-[-0.035em] leading-[1.08] text-center">
            Top Colleges &amp; Campuses
            <span className="block font-serif italic text-[#123628] font-normal mt-0.5">
              institutional audits &amp; NIRF truth.
            </span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-[#123628]/85 leading-relaxed font-light max-w-2xl mx-auto text-center">
            Explore premier institutions across India with verified fee structures, median placement compensation, and direct access to official placement reports and NIRF disclosures.
          </p>
        </div>

        {/* =========================================================================
            CUSTOM COLLEGE LIVE EVALUATOR (Aura Sense Glassmorphism with Squared Edges)
            ========================================================================= */}
        <div
          style={{
            backgroundImage: "url('/aura-sense-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="relative overflow-hidden border border-white/70 rounded-none p-6 sm:p-8 shadow-[0_20px_50px_rgba(10,35,80,0.10)]"
        >
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#0a2540] font-normal flex items-center justify-center md:justify-start gap-2 bg-white/50 border border-white/70 px-2.5 py-1 rounded-none w-fit backdrop-blur-md shadow-2xs">
                <ShieldCheck size={14} className="text-[#025a9e]" /> Real-Time Higher Ed Auditor
              </span>
              <h3 className="text-lg sm:text-2xl font-normal tracking-tight text-[#081d33]">
                Fact-check any university or college in India.
              </h3>
              <p className="text-xs text-[#18314a] font-light max-w-md">
                Type any campus to pull real-time placement stats, NIRF tier, student red flags, and candid admission verdicts.
              </p>
            </div>

            <div className="flex flex-col gap-2 w-full md:w-auto">
              <div className="flex items-center gap-2 w-full">
                <input
                  type="text"
                  placeholder="e.g. BITS Pilani, Thapar, Manipal, SRCC, Delhi University..."
                  value={customCollege}
                  onChange={(e) => setCustomCollege(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleEvaluate(customCollege)}
                  className="flex-1 md:w-80 bg-white/50 backdrop-blur-xl border border-white/80 focus:border-[#025a9e] focus:bg-white/85 rounded-none px-4 py-2.5 text-xs text-[#0a1e32] placeholder:text-[#0a1e32]/50 focus:outline-none transition-all shadow-xs"
                />
                <button
                  onClick={() => handleEvaluate(customCollege)}
                  disabled={evaluatingName === customCollege || !customCollege.trim()}
                  className="px-5 py-2.5 bg-[#081d33] hover:bg-black text-white font-mono text-xs font-semibold uppercase tracking-wider rounded-none transition-all shrink-0 cursor-pointer disabled:opacity-50 shadow-md flex items-center gap-1.5"
                >
                  {evaluatingName === customCollege ? (
                    <>
                      <Loader2 size={12} className="animate-spin inline mr-1" /> Scanning...
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={12} />
                      <span>Audit Live</span>
                    </>
                  )}
                </button>
              </div>

              {/* Sample Campus Quick Pills */}
              <div className="flex flex-wrap items-center gap-1.5 text-[10.5px] text-[#0a2540] font-mono">
                <span className="font-bold">Quick Audit:</span>
                {["BITS Pilani", "IIT Bombay", "SRCC Delhi", "Manipal MIT", "Thapar", "NLSIU Bangalore"].map((quick) => (
                  <button
                    key={quick}
                    onClick={() => {
                      setCustomCollege(quick);
                      handleEvaluate(quick);
                    }}
                    className="px-2.5 py-1 bg-white/45 hover:bg-white/75 border border-white/70 rounded-none text-[#0a1e32] font-semibold cursor-pointer transition-colors backdrop-blur-md shadow-2xs"
                  >
                    {quick}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active Scanning Pulse Indicator */}
          {evaluatingName && (
            <div className="relative z-10 mt-6 pt-5 border-t border-white/30 p-6 bg-white/60 backdrop-blur-md border border-white/80 rounded-none flex items-center gap-3 animate-pulse">
              <Loader2 size={20} className="animate-spin text-[#081d33] shrink-0" />
              <div className="space-y-0.5">
                <p className="text-xs font-mono font-normal text-[#081d33] uppercase tracking-wider">
                  Auditing &ldquo;{evaluatingName}&rdquo; across institutional databases...
                </p>
                <p className="text-[11px] text-[#18314a]/85 font-light">
                  Analyzing median compensation, NIRF filings, RTI statistics, and campus feedback.
                </p>
              </div>
            </div>
          )}

          {/* Error Notice */}
          {evalError && !evaluatingName && (
            <div className="relative z-10 mt-5 p-4 bg-rose-50/90 border border-rose-300 text-rose-950 text-xs font-mono rounded-none flex items-center gap-2">
              <AlertTriangle size={14} className="text-rose-700 shrink-0" />
              <span>{evalError}</span>
            </div>
          )}

          {/* Audit Result Display with Grounded Sources (Crisp, Zero Blurring) */}
          {evalResult && !evaluatingName && (
            <div className="relative z-10 mt-6 pt-5 border-t border-white/40 space-y-4 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-sky-500 rounded-none animate-pulse shadow-[0_0_8px_rgba(14,165,233,0.8)]" />
                  <span className="font-mono text-xs uppercase tracking-widest text-[#0a2540] font-normal">
                    Audit Target: {evalResult.college}
                  </span>
                </div>
                <span className="font-mono text-[9.5px] text-[#025a9e] flex items-center gap-1.5 font-normal bg-white/70 px-2.5 py-1 rounded-none border border-white/80 shadow-2xs">
                  <CheckCircle2 size={11} className="text-emerald-700" /> Verified Institutional Intelligence
                </span>
              </div>

              {/* Clean Glassmorphic Cards Grid */}
              <AuditReportViewer content={evalResult.text} />

              {/* Verified Source Links (Compact Row) */}
              {evalResult.sources && evalResult.sources.length > 0 && (
                <div className="pt-3 border-t border-white/40 space-y-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#0a2540]/80 font-normal block">
                    Verified Sources:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {evalResult.sources.map((s, idx) => (
                      <a
                        key={idx}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-[#0a2540] bg-white/70 hover:bg-white hover:text-black border border-white/80 px-2.5 py-1 font-normal transition-all shadow-2xs group rounded-none backdrop-blur-md"
                      >
                        <span className="truncate max-w-[240px]">{s.title || "Official Source"}</span>
                        <ArrowUpRight size={11} className="text-[#025a9e] shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* =========================================================================
            DIRECTORY CONTROLS & STREAM FILTER (Squared Greyish Glass)
            ========================================================================= */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(235, 238, 242, 0.65) 0%, rgba(212, 218, 226, 0.50) 50%, rgba(195, 204, 215, 0.40) 100%)",
            backdropFilter: "blur(32px) saturate(130%)",
            WebkitBackdropFilter: "blur(32px) saturate(130%)",
          }}
          className="border border-white/80 rounded-none p-4 sm:p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-[0_16px_40px_rgba(0,0,0,0.06),inset_0_1px_2px_rgba(255,255,255,0.9)]"
        >
          <div className="flex flex-wrap gap-1.5 items-center">
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

          <div className="relative w-full md:w-64">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0f291e]/50"
            />
            <input
              type="text"
              placeholder="Search colleges, cities, exams..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-100/55 backdrop-blur-md border border-white/80 rounded-none text-xs text-[#0f291e] placeholder:text-[#0f291e]/50 focus:outline-none focus:border-[#0f291e] focus:bg-white/80 transition-all shadow-xs"
            />
          </div>
        </div>

        {/* Directory Count Bar */}
        <div className="flex items-center justify-between px-1 text-xs text-[#0f291e]/80 font-mono font-medium">
          <span>Showing {filteredColleges.length} Verified Institutions</span>
          <span className="hidden sm:inline">Official Placement &amp; NIRF Data Calibrated</span>
        </div>

        {/* =========================================================================
            COLLEGES DIRECTORY GRID (Greyish Frosted Glass Cards with Squared Edges)
            ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredColleges.map((col) => {
            const sources = getCollegePlacementSources(col);
            return (
              <div
                key={col.id}
                style={{
                  background:
                    "linear-gradient(180deg, rgba(235, 238, 242, 0.65) 0%, rgba(212, 218, 226, 0.50) 50%, rgba(195, 204, 215, 0.40) 100%)",
                  backdropFilter: "blur(28px) saturate(130%)",
                  WebkitBackdropFilter: "blur(28px) saturate(130%)",
                  boxShadow: "0 10px 24px rgba(0, 0, 0, 0.05)",
                }}
                className="relative p-6 rounded-none border border-white/90 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-sm"
              >
                <div className="space-y-4">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between border-b border-black/10 pb-3">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#0f291e] font-bold bg-white/70 px-2 py-0.5 border border-white/80">
                      {col.stream}
                    </span>
                    <span className="font-mono text-[9px] uppercase px-2 py-0.5 border border-white/90 bg-white/90 text-[#0a1e16] font-bold shadow-2xs">
                      NIRF #{col.nirfRank}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-[#0a1e16] group-hover:text-emerald-950 transition-colors">
                      {col.shortName}
                    </h3>
                    <p className="text-xs text-[#0f291e]/70 font-medium flex items-center gap-1 pt-0.5">
                      <MapPin size={11} /> {col.city}, {col.state} • {col.type}
                    </p>
                  </div>

                  <p className="text-xs font-normal text-[#0f291e]/85 leading-relaxed line-clamp-2">
                    {col.highlight}
                  </p>

                  {/* Financial & Package Metrics */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-black/10 text-[11px]">
                    <div className="p-2 bg-white/60 backdrop-blur-xs border border-white/70">
                      <span className="text-[#0f291e]/60 block text-[10px] uppercase font-mono font-semibold">Annual Tuition</span>
                      <span className="font-bold text-[#0a1e16]">{col.annualFeesEstimate}</span>
                    </div>
                    <div className="p-2 bg-white/60 backdrop-blur-xs border border-white/70">
                      <span className="text-[#0f291e]/60 block text-[10px] uppercase font-mono font-semibold">Median Package</span>
                      <span className="font-bold text-emerald-800">{col.medianCtcEstimate}</span>
                    </div>
                  </div>
                </div>

                {/* Action Bar with Direct Placement Sources Link & Audit Button */}
                <div className="pt-4 mt-4 border-t border-black/10 flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] text-[#0f291e]/70 font-semibold truncate max-w-[110px] sm:max-w-none">
                    Exam: {col.admissionExam}
                  </span>
                  
                  <div className="flex items-center gap-2 shrink-0">
                    {/* Direct External Link to Official Placement Portal / Report */}
                    <a
                      href={sources.officialPortalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#0a1e16] hover:text-emerald-900 font-bold flex items-center gap-1 cursor-pointer hover:underline transition-colors"
                      title={`Open official placement portal: ${sources.officialLabel}`}
                    >
                      <span>Audit Placement Truth</span>
                      <ArrowUpRight size={13} className="text-emerald-700" />
                    </a>

                    {/* All Sources (NIRF & RTI) Modal Trigger */}
                    <button
                      onClick={() => openAuditModal(col)}
                      className="px-2 py-1 bg-[#0f291e] hover:bg-black text-white text-[10.5px] font-mono font-bold uppercase tracking-wider rounded-none cursor-pointer flex items-center gap-1 shadow-2xs transition-colors"
                      title="Inspect verified NIRF, RTI and AI grounded placement sources"
                    >
                      <FileText size={11} className="text-emerald-300" />
                      <span>All Sources</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          AUDITED PLACEMENT TRUTH & SOURCES MODAL
          ========================================================================= */}
      {modalCollege && modalSources && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            style={{
              background: "linear-gradient(135deg, rgba(248, 250, 252, 0.96) 0%, rgba(238, 242, 246, 0.94) 100%)",
              boxShadow: "0 24px 60px rgba(0, 0, 0, 0.35)",
            }}
            className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-none border border-black/15 p-6 sm:p-8 space-y-6 relative"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-black/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 bg-[#0a1e16] text-white rounded-none">
                    NIRF #{modalCollege.nirfRank}
                  </span>
                  <span className="font-mono text-[10px] uppercase text-[#0a1e16]/80 font-bold bg-emerald-100/90 border border-emerald-300 px-2 py-0.5 rounded-none">
                    {modalSources.sourceType}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a1e16] tracking-tight mt-1">
                  {modalCollege.name}
                </h2>
                <p className="text-xs text-[#0f291e]/75 font-medium flex items-center gap-1 pt-0.5">
                  <MapPin size={11} /> {modalCollege.city}, {modalCollege.state} • {modalCollege.stream}
                </p>
              </div>

              <button
                onClick={() => setModalCollege(null)}
                className="w-8 h-8 rounded-none bg-black/5 hover:bg-black/10 border border-black/10 flex items-center justify-center text-[#0a1e16] cursor-pointer transition-colors shrink-0"
              >
                <X size={18} />
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-white/80 border border-black/[0.08] rounded-none">
                <span className="text-[10px] font-mono uppercase text-[#0f291e]/70 block font-semibold">
                  Audited Median Package
                </span>
                <span className="text-lg sm:text-xl font-extrabold text-emerald-800 block">
                  {modalCollege.medianCtcEstimate}
                </span>
              </div>
              <div className="p-3 bg-white/80 border border-black/[0.08] rounded-none">
                <span className="text-[10px] font-mono uppercase text-[#0f291e]/70 block font-semibold">
                  Annual Tuition
                </span>
                <span className="text-lg sm:text-xl font-extrabold text-[#0a1e16] block">
                  {modalCollege.annualFeesEstimate}
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1 p-3 bg-white/80 border border-black/[0.08] rounded-none">
                <span className="text-[10px] font-mono uppercase text-[#0f291e]/70 block font-semibold">
                  Admission Gateway
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#0a1e16] block truncate">
                  {modalCollege.admissionExam}
                </span>
              </div>
            </div>

            {/* DIRECT PLACEMENT SOURCES (The Core User Need) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-mono text-xs uppercase tracking-widest text-[#0a1e16] font-bold flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-emerald-700" />
                  <span>Official Sources Showing Placement</span>
                </h4>
                <span className="text-[11px] text-emerald-800 font-semibold font-mono">
                  1-Click Direct Access ↗
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Source 1: Official Placement Portal */}
                <a
                  href={modalSources.officialPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-emerald-50/70 hover:bg-emerald-100/80 border border-emerald-300/80 rounded-none transition-all group flex flex-col justify-between space-y-3 cursor-pointer shadow-2xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] uppercase font-bold text-emerald-900 bg-white/80 px-1.5 py-0.5 border border-emerald-200">
                        Primary Source
                      </span>
                      <ArrowUpRight size={14} className="text-emerald-800 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                    <span className="text-xs font-bold text-[#0a1e16] block leading-snug">
                      {modalSources.officialLabel}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-900 flex items-center gap-1">
                    <span>Open Official Portal</span>
                    <span>→</span>
                  </span>
                </a>

                {/* Source 2: NIRF Audited MHRD Data */}
                <a
                  href={modalSources.nirfReportUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-white/80 hover:bg-white border border-black/10 rounded-none transition-all group flex flex-col justify-between space-y-3 cursor-pointer shadow-2xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] uppercase font-bold text-[#0a1e16] bg-slate-100 px-1.5 py-0.5 border border-black/10">
                        Govt of India
                      </span>
                      <ArrowUpRight size={14} className="text-[#0a1e16] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                    <span className="text-xs font-bold text-[#0a1e16] block leading-snug">
                      NIRF 2024 Audited Placement Filing
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-[#0a1e16] flex items-center gap-1">
                    <span>View NIRF Data</span>
                    <span>→</span>
                  </span>
                </a>

                {/* Source 3: RTI Salary & Median CTC Audit */}
                <a
                  href={modalSources.rtiAuditUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-white/80 hover:bg-white border border-black/10 rounded-none transition-all group flex flex-col justify-between space-y-3 cursor-pointer shadow-2xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] uppercase font-bold text-[#0a1e16] bg-slate-100 px-1.5 py-0.5 border border-black/10">
                        Public Audit
                      </span>
                      <ArrowUpRight size={14} className="text-[#0a1e16] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                    <span className="text-xs font-bold text-[#0a1e16] block leading-snug">
                      RTI Branch-Wise Placement Statistics
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-[#0a1e16] flex items-center gap-1">
                    <span>Inspect RTI Records</span>
                    <span>→</span>
                  </span>
                </a>
              </div>
            </div>

            {/* Verified Placement Highlights */}
            {modalSources.highlights && modalSources.highlights.length > 0 && (
              <div className="space-y-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#0a1e16] font-bold block">
                  Audited Placement Highlights:
                </span>
                <div className="flex flex-wrap gap-2">
                  {modalSources.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 bg-white/90 border border-black/10 text-[#0a1e16] font-semibold rounded-none flex items-center gap-1.5"
                    >
                      <CheckCircle2 size={12} className="text-emerald-700" />
                      <span>{h}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Live Search-Grounded AI Placement Analysis */}
            <div className="space-y-3 pt-2 border-t border-black/10">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-[#0a1e16] font-bold flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-700" />
                  <span>Live Grounded Fact-Check &amp; Student Reviews</span>
                </span>
                {modalLoading && (
                  <span className="text-xs font-mono text-emerald-800 font-semibold flex items-center gap-1">
                    <Loader2 size={12} className="animate-spin" /> Cross-referencing 2024-2026 data...
                  </span>
                )}
              </div>

              {modalAuditText ? (
                <AuditReportViewer content={modalAuditText} />
              ) : modalLoading ? (
                <div className="p-8 text-center space-y-2 bg-white/60 border border-black/10 rounded-none">
                  <Loader2 size={20} className="animate-spin mx-auto text-[#0f291e]" />
                  <p className="text-xs text-[#0f291e]/80 font-mono">
                    Grounding latest placement statistics, recruiter lists, and NIRF disclosures...
                  </p>
                </div>
              ) : null}

              {/* Real-Time Grounding Citation Links */}
              {modalGroundedSources && modalGroundedSources.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="font-mono text-[10.5px] uppercase tracking-wider text-[#0a1e16] font-bold block">
                    Live Web Citations &amp; Articles:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {modalGroundedSources.map((s, idx) => (
                      <a
                        key={idx}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-[#0a1e16] bg-white hover:bg-emerald-50 hover:text-emerald-900 border border-black/15 px-3 py-1.5 font-semibold transition-all shadow-2xs group rounded-none"
                      >
                        <ExternalLink size={12} className="text-emerald-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        <span className="truncate max-w-[260px]">{s.title || "External Source"}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-[#0f291e]/70 font-mono">
                Student Saarthi • Independent Higher Ed Verification
              </span>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={modalSources.officialPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none px-4 py-2 bg-[#0a1e16] hover:bg-emerald-950 text-white text-xs font-mono font-bold uppercase tracking-wider rounded-none flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Open Primary Source Directly</span>
                  <ExternalLink size={12} />
                </a>
                <button
                  onClick={() => setModalCollege(null)}
                  className="px-4 py-2 bg-white hover:bg-slate-100 border border-black/15 text-[#0a1e16] text-xs font-mono font-bold uppercase tracking-wider rounded-none transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Clean Minimalist Footer on Frosted Glass */}
      <footer className="w-full max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-10 py-6 border-t border-white/40 bg-white/40 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#0f291e]/80 font-medium relative z-10">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#0f291e]">Student Saarthi</span>
          <span>•</span>
          <span>National College Directory &amp; Audit</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/research" className="hover:text-[#0f291e] transition-colors">Deep Research</Link>
          <Link href="/exams" className="hover:text-[#0f291e] transition-colors">Exam Radar</Link>
          <Link href="/simulator" className="hover:text-[#0f291e] transition-colors">Simulator</Link>
          <Link href="/calculator" className="hover:text-[#0f291e] transition-colors">ROI Calculator</Link>
        </div>
        <div>
          <span>© 2026 Student Saarthi. All rights reserved.</span>
        </div>
      </footer>
    </main>
  );
}
