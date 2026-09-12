"use client";

import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import {
  Compass,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  GraduationCap,
  Layers,
  ChevronRight,
  Briefcase,
  Share2,
  Loader2,
  CheckCircle2,
  Target,
  Cpu,
  RotateCcw,
  Check,
  FileText,
  Dna,
  Stethoscope,
  Scale,
  LineChart,
  Palette,
  BarChart3,
  Zap,
  Activity,
} from "lucide-react";
import Link from "next/link";

interface PathwayData {
  streamId: string;
  streamName: string;
  degrees: {
    id: string;
    title: string;
    duration: string;
    entrance: string;
    roles: string[];
    startingSalary: string;
    midSalary: string;
    aiRisk: "Low" | "Moderate" | "High";
    aiRiskRationale: string;
    growthRating: number;
    pivots: string[];
    skillsToMaster: string[];
  }[];
}

interface SimulationPhase {
  phaseName: string;
  period: string;
  coreFocus: string;
  estimatedCompensation: string;
  actionItems: string[];
}

interface SimulationResult {
  trajectoryTitle: string;
  executiveSummary: string;
  projectedEarnings: {
    entry: string;
    midCareer: string;
    apex: string;
  };
  aiDisruptionIndex: {
    level: "Low" | "Moderate" | "High";
    rationale: string;
  };
  phases: SimulationPhase[];
  humanMoats: string[];
  contingencyPivot: string;
  immediateNextStep: string;
}

const PRESET_GOALS = [
  {
    label: "AI Systems Architect (PCM)",
    goal: "Build large-scale AI distributed infrastructure and models. Target ₹35 LPA+ entry package and global relocation by 2029.",
  },
  {
    label: "Clinical Robotic Specialist (PCB)",
    goal: "Complete MBBS, pursue surgical residency, and specialize in robotic minimally-invasive surgery with clinical AI diagnostic integration.",
  },
  {
    label: "Quant Trader & Algorithmic Finance",
    goal: "Mathematics & Computing or B.Tech CS graduate targeting High Frequency Trading (HFT) firms with ₹50LPA+ day-1 compensation.",
  },
  {
    label: "Cross-Border Tech Counsel (Law)",
    goal: "Top NLU corporate law graduate specializing in international technology M&A, venture capital syndication, and AI IP litigation.",
  },
];

const PATHWAYS: PathwayData[] = [
  {
    streamId: "pcm",
    streamName: "Science (PCM - Tech & AI)",
    degrees: [
      {
        id: "btech-cs-ai",
        title: "B.Tech in Computer Science / AI & Data",
        duration: "4 Years",
        entrance: "JEE Main, JEE Advanced, BITSAT, State CETs",
        roles: ["AI/ML Engineer", "Full Stack Architect", "Cloud Systems Engineer"],
        startingSalary: "₹10 - 24 LPA",
        midSalary: "₹30 - 65 LPA",
        aiRisk: "Low",
        aiRiskRationale: "High defensibility if mastering system architecture, model fine-tuning, and infrastructure rather than boilerplate coding.",
        growthRating: 5,
        pivots: ["Technical Product Management", "Quantitative Finance", "AI Solutions Consulting"],
        skillsToMaster: ["Distributed Systems", "PyTorch / LLM Orchestration", "Algorithms", "System Architecture"],
      },
      {
        id: "btech-electronics-vlsi",
        title: "B.Tech in Electronics & VLSI / Semiconductor",
        duration: "4 Years",
        entrance: "JEE Main, JEE Advanced, GATE",
        roles: ["Chip Design Engineer", "Embedded Systems Architect", "Robotics Engineer"],
        startingSalary: "₹9 - 20 LPA",
        midSalary: "₹25 - 55 LPA",
        aiRisk: "Low",
        aiRiskRationale: "Physical hardware, silicon fabrication, and edge IoT are immune to pure software LLM replacement.",
        growthRating: 5,
        pivots: ["Hardware Acceleration", "EV & Aerospace Systems", "Defense Tech"],
        skillsToMaster: ["Verilog / VHDL", "FPGA Programming", "Circuit Synthesis", "C++ / Embedded Linux"],
      },
      {
        id: "bs-math-computing",
        title: "BS / Integrated M.Sc in Mathematics & Computing",
        duration: "4 - 5 Years",
        entrance: "JEE Advanced, IAT, ISI / CMI Entrance",
        roles: ["Quantitative Trader", "Data Cryptographer", "Algorithm Researcher"],
        startingSalary: "₹14 - 35 LPA",
        midSalary: "₹45 - 90 LPA",
        aiRisk: "Low",
        aiRiskRationale: "Deep mathematical rigor and algorithmic modeling remain high-value human moats in algorithmic finance and cryptography.",
        growthRating: 5,
        pivots: ["High Frequency Trading", "Machine Learning Theory", "Actuarial Science"],
        skillsToMaster: ["Stochastic Calculus", "Statistical Mechanics", "C++", "Algorithmic Game Theory"],
      },
    ],
  },
  {
    streamId: "pcb",
    streamName: "Science (PCB - Medicine & Biotech)",
    degrees: [
      {
        id: "mbbs-clinical",
        title: "MBBS -> MD / MS Specialization",
        duration: "5.5 Years + 3 Years",
        entrance: "NEET UG -> NEET PG / INI-CET",
        roles: ["Interventional Cardiologist", "Neurosurgeon", "Diagnostic Radiologist"],
        startingSalary: "₹9 - 16 LPA (Stipend/Resident)",
        midSalary: "₹35 - 75+ LPA",
        aiRisk: "Low",
        aiRiskRationale: "High human trust, tactile surgical execution, and patient empathy protect clinical healthcare.",
        growthRating: 5,
        pivots: ["Clinical AI Research", "Hospital Administration", "MedTech Medical Advisor"],
        skillsToMaster: ["Clinical Diagnostics", "Surgical Procedures", "Patient Ethics", "AI Medical Imaging"],
      },
      {
        id: "btech-biotech-genomics",
        title: "B.Tech / BS in Bioinformatics & Genomics",
        duration: "4 Years",
        entrance: "JEE Main, IAT, NEET, Institutional Tests",
        roles: ["Genomic Data Scientist", "Synthetic Biologist", "Drug Discovery Analyst"],
        startingSalary: "₹7 - 15 LPA",
        midSalary: "₹20 - 45 LPA",
        aiRisk: "Low",
        aiRiskRationale: "High convergence with AlphaFold and computational drug discovery creates exploding biotech demand.",
        growthRating: 4.5,
        pivots: ["Pharmaceutical Product Strategy", "Precision Medicine Consulting", "Bio-patent Law"],
        skillsToMaster: ["CRISPR Protocols", "Python / Bio-Python", "Structural Biology", "Next-Gen Sequencing"],
      },
    ],
  },
  {
    streamId: "commerce",
    streamName: "Commerce with Math (Finance & Strategy)",
    degrees: [
      {
        id: "bcom-hons-fintech",
        title: "B.Com (Hons) / B.A. Economics -> Tier-1 MBA / CFA",
        duration: "3 - 4 Years (+ 2 Years MBA)",
        entrance: "CUET UG (SRCC, Stephen's) -> CAT (IIMs)",
        roles: ["Investment Banking Analyst", "Management Consultant", "Corporate Finance Lead"],
        startingSalary: "₹10 - 22 LPA",
        midSalary: "₹30 - 70 LPA",
        aiRisk: "Moderate",
        aiRiskRationale: "Entry-level slide decks and spreadsheets are automated; strategic negotiation, M&A, and deal origination thrive.",
        growthRating: 4.5,
        pivots: ["Venture Capital / Private Equity", "Fintech Growth Strategy", "Founder CFO"],
        skillsToMaster: ["Financial Modeling (LBO/DCF)", "Corporate Valuation", "Capital Markets Law", "Macroeconomics"],
      },
      {
        id: "chartered-accountancy",
        title: "Chartered Accountancy (ICAI CA)",
        duration: "4.5 - 5 Years",
        entrance: "CA Foundation -> Intermediate -> Final",
        roles: ["Statutory Auditor", "Tax Litigation Specialist", "Forensic Auditor"],
        startingSalary: "₹9 - 18 LPA",
        midSalary: "₹25 - 55 LPA",
        aiRisk: "Moderate",
        aiRiskRationale: "Routine tax return filing is automated; cross-border structuring, forensic accounting, and judicial representation remain human.",
        growthRating: 4,
        pivots: ["Corporate Tax Governance", "Internal Risk Controller", "Wealth Advisory"],
        skillsToMaster: ["Direct & Indirect Tax Laws", "Ind-AS Accounting Standards", "SAP / ERP Systems", "Forensic Auditing"],
      },
    ],
  },
  {
    streamId: "humanities",
    streamName: "Humanities & Law (Policy & Design)",
    degrees: [
      {
        id: "ba-llb-nlu",
        title: "B.A. LL.B (Hons) from Tier-1 NLUs",
        duration: "5 Years",
        entrance: "CLAT UG / AILET",
        roles: ["Corporate M&A Lawyer", "Arbitration Counsel", "IP / Tech Regulatory Lawyer"],
        startingSalary: "₹14 - 22 LPA",
        midSalary: "₹35 - 80 LPA",
        aiRisk: "Low",
        aiRiskRationale: "Contract drafting is accelerated by AI, but courtroom advocacy, courtroom negotiation, and regulatory litigation require human jurisprudence.",
        growthRating: 5,
        pivots: ["General Counsel (Tech Unicorns)", "Public Policy Director", "Venture Partner"],
        skillsToMaster: ["Contract Law", "Cross-Border Arbitration", "Tech / Privacy Regulation", "Oral Persuasion"],
      },
      {
        id: "bdes-nid-uceed",
        title: "B.Des in Interaction & Industrial Design",
        duration: "4 Years",
        entrance: "NID DAT / UCEED",
        roles: ["Principal Product Designer", "Spatial Computing Architect", "Design Strategist"],
        startingSalary: "₹9 - 18 LPA",
        midSalary: "₹25 - 60 LPA",
        aiRisk: "Low",
        aiRiskRationale: "AI generates visual mockups, but human user empathy, system interactions, and physical product ergonomics remain irreplaceable.",
        growthRating: 4.5,
        pivots: ["Design Systems Director", "Creative Technologist", "Hardware Design"],
        skillsToMaster: ["User Research", "Figma / Spatial Design", "Physical Prototyping", "Design Ethics"],
      },
    ],
  },
];

function getDegreeIcon(id: string) {
  if (id.includes("cs") || id.includes("ai")) return Cpu;
  if (id.includes("vlsi") || id.includes("electronics")) return Zap;
  if (id.includes("math")) return Activity;
  if (id.includes("mbbs") || id.includes("clinical")) return Stethoscope;
  if (id.includes("biotech") || id.includes("genomics")) return Dna;
  if (id.includes("fintech") || id.includes("bcom")) return LineChart;
  if (id.includes("accountancy") || id.includes("ca")) return BarChart3;
  if (id.includes("llb") || id.includes("law")) return Scale;
  if (id.includes("des") || id.includes("design")) return Palette;
  return Layers;
}

export default function CareerSimulatorPage() {
  const [activeStreamId, setActiveStreamId] = useState<string>("pcm");
  const [customAspiration, setCustomAspiration] = useState<string>("");
  const [horizonYears, setHorizonYears] = useState<number>(10);
  const [riskTolerance, setRiskTolerance] = useState<string>("Balanced");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
  const [simError, setSimError] = useState<string | null>(null);

  const currentPathway = PATHWAYS.find((p) => p.streamId === activeStreamId) || PATHWAYS[0];

  const handleSimulate = async (customGoalText?: string) => {
    const goalToRun = customGoalText !== undefined ? customGoalText : customAspiration;
    if (!goalToRun.trim()) return;

    setIsSimulating(true);
    setSimError(null);

    try {
      const res = await fetch("/api/simulator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          aspiration: goalToRun,
          stream: currentPathway.streamName,
          horizonYears,
          riskTolerance,
        }),
      });

      const data = await res.json();
      if (res.ok && data.simulation) {
        setSimulationResult(data.simulation);
        setTimeout(() => {
          const el = document.getElementById("ai-sim-results-container");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        setSimError(data.error || "Failed to generate simulation. Please retry.");
      }
    } catch (err) {
      console.error(err);
      setSimError("Network error while simulating career path. Please check your connection.");
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <main
      style={{
        backgroundImage: "url('/simulator-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
      }}
      className="min-h-screen text-[#0f291e] selection:bg-[#0f291e] selection:text-white relative font-sans flex flex-col justify-between overflow-x-hidden"
    >
      {/* =========================================================================
          FIXED SIMULATOR AMBER & BLUE BACKGROUND LAYER
          ========================================================================= */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="/simulator-bg.png"
          alt="Simulator Amber & Blue Wallpaper"
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
          <h1 className="font-normal text-3xl sm:text-5xl lg:text-[3.5rem] text-[#0a1e16] tracking-[-0.035em] leading-[1.08] drop-shadow-xs text-center">
            Career Pathway Simulator
            <span className="block font-serif italic text-[#123628] font-normal mt-0.5">
              interactive AI future trajectory &amp; compensation.
            </span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-[#123628]/85 leading-relaxed font-light max-w-2xl mx-auto text-center drop-shadow-2xs">
            Simulate your authentic 10-year higher education timeline, projected compensation curve, AI disruption moats, and contingency pivots using Gemini 2.5 Flash.
          </p>
        </div>

        {/* =========================================================================
            INTERACTIVE AI CAREER FUTURE SIMULATOR (Squared Bento Module)
            ========================================================================= */}
        <div
          style={{
            background: "linear-gradient(180deg, rgba(255, 255, 255, 0.88) 0%, rgba(248, 250, 252, 0.76) 100%)",
            backdropFilter: "blur(32px) saturate(135%)",
            WebkitBackdropFilter: "blur(32px) saturate(135%)",
            boxShadow: "0 16px 40px rgba(0, 0, 0, 0.07)",
          }}
          className="rounded-none border border-black/[0.08] p-6 sm:p-8 space-y-6"
        >
          {/* Top Bar: Title & AI Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/10 pb-4">
            <div className="space-y-1">
              <span className="font-mono text-[10.5px] uppercase tracking-widest text-[#0a1e16] font-bold flex items-center gap-2">
                <Cpu size={15} className="text-[#0a3d24]" /> AI Future Trajectory Engine
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#0a1e16] tracking-tight">
                Simulate Your Custom Career Future
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-300 font-semibold flex items-center gap-1">
                <Cpu size={12} className="text-emerald-300" /> Powered by Gemini 2.5
              </span>
            </div>
          </div>

          {/* Quick Presets Strip */}
          <div className="space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#0a1e16]/80 font-bold block">
              Quick One-Click Simulations:
            </span>
            <div className="flex flex-wrap gap-2">
              {PRESET_GOALS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCustomAspiration(preset.goal);
                    handleSimulate(preset.goal);
                  }}
                  className="px-3 py-1.5 bg-white/85 hover:bg-white text-[#0a1e16] text-xs font-semibold rounded-none border border-black/10 hover:border-[#0a3d24] transition-all cursor-pointer shadow-2xs text-left"
                >
                  ⚡ {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input & Parameters Controls Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
            <div className="lg:col-span-8 space-y-1.5">
              <label className="font-mono text-[10.5px] uppercase tracking-wider text-[#0a1e16] font-bold block">
                Your Aspiration, Target Role, or Question:
              </label>
              <input
                type="text"
                value={customAspiration}
                onChange={(e) => setCustomAspiration(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSimulate();
                }}
                placeholder="e.g. 11th PCM student wanting to enter autonomous robotics in Bangalore with ₹30LPA by 2029..."
                className="w-full px-4 py-3 bg-white text-[#0a1e16] text-xs sm:text-sm font-semibold rounded-none border border-black/15 focus:border-[#0a3d24] focus:outline-none transition-colors shadow-xs placeholder:text-[#0a1e16]/40"
              />
            </div>

            <div className="lg:col-span-2 space-y-1.5">
              <label className="font-mono text-[10.5px] uppercase tracking-wider text-[#0a1e16] font-bold block">
                Time Horizon:
              </label>
              <select
                value={horizonYears}
                onChange={(e) => setHorizonYears(Number(e.target.value))}
                className="w-full px-3 py-3 bg-white text-[#0a1e16] text-xs font-semibold rounded-none border border-black/15 focus:border-[#0a3d24] focus:outline-none transition-colors shadow-xs cursor-pointer"
              >
                <option value={5}>5-Year Horizon</option>
                <option value={8}>8-Year Horizon</option>
                <option value={10}>10-Year Master Horizon</option>
              </select>
            </div>

            <div className="lg:col-span-2">
              <button
                onClick={() => handleSimulate()}
                disabled={isSimulating || !customAspiration.trim()}
                className="w-full py-3 px-4 bg-[#0a1e16] hover:bg-[#0a3d24] disabled:opacity-50 text-white font-mono text-xs font-bold uppercase tracking-wider rounded-none transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSimulating ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    <span>Simulating...</span>
                  </>
                ) : (
                  <>
                    <TrendingUp size={14} className="text-emerald-300" />
                    <span>Run AI Simulation</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Error notice if any */}
          {simError && (
            <div className="p-3 bg-rose-50 border border-rose-300 text-rose-950 text-xs font-medium rounded-none">
              {simError}
            </div>
          )}

          {/* =========================================================================
              AI SIMULATION RESULT DISPLAY (Bento Dashboard)
              ========================================================================= */}
          {simulationResult && (
            <div id="ai-sim-results-container" className="pt-6 border-t border-black/10 space-y-6 animate-in fade-in duration-300">
              
              {/* Executive Overview Bento Card */}
              <div
                style={{
                  background: "linear-gradient(135deg, rgba(235, 245, 238, 0.92) 0%, rgba(220, 238, 226, 0.80) 100%)",
                }}
                className="p-6 rounded-none border border-emerald-300/80 shadow-xs space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-emerald-600 animate-pulse rounded-none" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-950 font-bold">
                      Simulated Career Vector
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold text-emerald-900 bg-white/90 px-3 py-0.5 rounded-none border border-emerald-300">
                    AI Resilience: {simulationResult.aiDisruptionIndex.level} Risk
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-[#0a1e16] tracking-tight">
                  {simulationResult.trajectoryTitle}
                </h3>

                <p className="text-xs sm:text-sm text-[#0a1e16] font-medium leading-relaxed max-w-4xl">
                  {simulationResult.executiveSummary}
                </p>
              </div>

              {/* Bento Grid 2: Financial Matrix + AI Moat + Contingency */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Financial Compensation Bento Tile (col-span-12 lg:col-span-5) */}
                <div className="md:col-span-12 lg:col-span-5 p-5 sm:p-6 bg-white/90 rounded-none border border-black/10 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="flex items-center justify-between border-b border-black/10 pb-2">
                    <span className="font-mono text-[10.5px] uppercase tracking-widest text-[#0a1e16] font-bold flex items-center gap-1.5">
                      <TrendingUp size={14} className="text-[#0a3d24]" /> Projected Earnings Curve
                    </span>
                    <span className="font-mono text-[9px] font-bold text-[#0a3d24] bg-emerald-50 px-2 py-0.5 border border-emerald-200 rounded-none">
                      Post-Tax Model
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center py-2">
                    <div className="p-2.5 bg-slate-50 border border-black/[0.06] rounded-none space-y-0.5">
                      <span className="font-mono text-[8.5px] uppercase text-[#0a1e16]/70 font-bold block">
                        Entry (0-2 Yrs)
                      </span>
                      <span className="text-sm font-black text-[#0a1e16] block">
                        {simulationResult.projectedEarnings.entry}
                      </span>
                    </div>

                    <div className="p-2.5 bg-slate-50 border border-black/[0.06] rounded-none space-y-0.5">
                      <span className="font-mono text-[8.5px] uppercase text-[#0a1e16]/70 font-bold block">
                        Mid (5-7 Yrs)
                      </span>
                      <span className="text-sm font-black text-[#0a3d24] block">
                        {simulationResult.projectedEarnings.midCareer}
                      </span>
                    </div>

                    <div className="p-2.5 bg-slate-50 border border-black/[0.06] rounded-none space-y-0.5">
                      <span className="font-mono text-[8.5px] uppercase text-[#0a1e16]/70 font-bold block">
                        Apex (10+ Yrs)
                      </span>
                      <span className="text-sm font-black text-emerald-800 block">
                        {simulationResult.projectedEarnings.apex}
                      </span>
                    </div>
                  </div>

                  <div className="text-[11px] font-mono text-[#0a1e16]/80 pt-1 border-t border-black/10 flex items-center justify-between">
                    <span>Career Escalation:</span>
                    <span className="font-bold text-[#0a3d24]">Top 5% Performance Tier</span>
                  </div>
                </div>

                {/* AI Moats & Automation Shield Tile (col-span-12 lg:col-span-4) */}
                <div className="md:col-span-12 lg:col-span-4 p-5 sm:p-6 bg-white/90 rounded-none border border-black/10 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="flex items-center justify-between border-b border-black/10 pb-2">
                    <span className="font-mono text-[10.5px] uppercase tracking-widest text-[#0a1e16] font-bold flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-[#0a3d24]" /> Human Moats &amp; Immunity
                    </span>
                  </div>

                  <ul className="space-y-1.5 py-1">
                    {simulationResult.humanMoats.map((moat, mIdx) => (
                      <li key={mIdx} className="flex items-start gap-2 text-xs font-semibold text-[#0a1e16]">
                        <CheckCircle2 size={13} className="text-[#0a3d24] shrink-0 mt-0.5" />
                        <span>{moat}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="text-[10.5px] text-[#0a1e16]/70 leading-relaxed border-t border-black/10 pt-2">
                    {simulationResult.aiDisruptionIndex.rationale}
                  </p>
                </div>

                {/* Strategic Fallback & 7-Day Action Tile (col-span-12 lg:col-span-3) */}
                <div className="md:col-span-12 lg:col-span-3 p-5 sm:p-6 bg-white/90 rounded-none border border-black/10 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-amber-900 font-bold block">
                      ⚡ Immediate 7-Day Action
                    </span>
                    <p className="text-xs font-bold text-[#0a1e16] leading-snug">
                      {simulationResult.immediateNextStep}
                    </p>
                  </div>

                  <div className="space-y-1 pt-3 border-t border-black/10">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#0a1e16]/70 font-bold block">
                      Contingency Exit Pivot
                    </span>
                    <p className="text-xs text-[#0a3d24] font-semibold leading-snug">
                      {simulationResult.contingencyPivot}
                    </p>
                  </div>
                </div>
              </div>

              {/* 4-Phase Chronological Roadmap Bento Strip */}
              <div className="space-y-2">
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#0a1e16] font-bold block">
                  Chronological 10-Year Execution Milestones:
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {simulationResult.phases.map((phase, pIdx) => (
                    <div
                      key={pIdx}
                      className="p-5 bg-white/95 rounded-none border border-black/10 shadow-xs flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold px-2 py-0.5 bg-[#0a1e16] text-white rounded-none">
                            0{pIdx + 1}
                          </span>
                          <span className="font-mono text-[10px] font-bold text-[#0a3d24] bg-emerald-50 px-2 py-0.5 border border-emerald-200 rounded-none">
                            {phase.period}
                          </span>
                        </div>

                        <h4 className="font-bold text-sm text-[#0a1e16] pt-1">
                          {phase.phaseName}
                        </h4>

                        <p className="text-xs text-[#0a1e16]/80 font-medium leading-relaxed">
                          {phase.coreFocus}
                        </p>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-black/10">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-[#0a1e16]/70 font-bold block">
                          Phase Compensation: {phase.estimatedCompensation}
                        </span>
                        <ul className="space-y-1">
                          {phase.actionItems.map((act, aIdx) => (
                            <li key={aIdx} className="text-[11px] text-[#0a1e16] font-medium flex items-start gap-1.5">
                              <span className="text-[#0a3d24] font-bold">›</span>
                              <span>{act}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* =========================================================================
            STREAM SELECTOR TABS (Squared Greyish Frosted Glass)
            ========================================================================= */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(235, 238, 242, 0.65) 0%, rgba(212, 218, 226, 0.50) 50%, rgba(195, 204, 215, 0.40) 100%)",
            backdropFilter: "blur(32px) saturate(130%)",
            WebkitBackdropFilter: "blur(32px) saturate(130%)",
          }}
          className="border border-white/80 rounded-none p-4 sm:p-5 flex flex-wrap gap-2 justify-center shadow-[0_16px_40px_rgba(0,0,0,0.06),inset_0_1px_2px_rgba(255,255,255,0.9)]"
        >
          {PATHWAYS.map((p) => {
            const isActive = activeStreamId === p.streamId;
            return (
              <button
                key={p.streamId}
                onClick={() => setActiveStreamId(p.streamId)}
                className={`text-xs sm:text-sm px-5 py-2.5 rounded-none border transition-all cursor-pointer font-medium ${
                  isActive
                    ? "bg-[#0f291e] text-white border-[#0f291e] shadow-xs font-semibold"
                    : "bg-slate-100/55 backdrop-blur-md border-white/80 text-[#0f291e]/85 hover:bg-slate-100/90"
                }`}
              >
                {p.streamName}
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            DEGREES BENTO SECTIONS (Strictly Squared Edges)
            ========================================================================= */}
        <div className="space-y-12">
          {currentPathway.degrees.map((deg, degIdx) => {
            const DegreeIcon = getDegreeIcon(deg.id);
            return (
            <div
              key={deg.id}
              className="space-y-3.5"
            >
              {/* Bento Section Header Bar */}
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-none bg-[#0a1e16] text-white">
                    0{degIdx + 1}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-widest text-[#0a1e16] font-bold">
                    Career Pathway Track
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0a3d24]">
                  <ShieldCheck size={14} />
                  <span>2026 Industry Calibrated</span>
                </div>
              </div>

              {/* Bento Asymmetric Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                
                {/* Bento Tile 1: Core Degree Identity & Title (col-span-12 lg:col-span-7) */}
                <div
                  style={{
                    background: "linear-gradient(180deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.60) 50%, rgba(248, 250, 252, 0.72) 100%)",
                    backdropFilter: "blur(28px) saturate(130%)",
                    WebkitBackdropFilter: "blur(28px) saturate(130%)",
                    boxShadow: "0 10px 24px rgba(0, 0, 0, 0.05)",
                  }}
                  className="md:col-span-12 lg:col-span-7 p-6 sm:p-7 rounded-none border border-black/[0.08] flex flex-col justify-between space-y-4 hover:shadow-md transition-all group"
                >
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#0a1e16] font-bold bg-white/90 px-2.5 py-1 rounded-none border border-black/10 shadow-2xs">
                        {deg.duration}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#0a1e16]/80 font-semibold bg-white/70 px-2.5 py-1 rounded-none border border-black/10">
                        {deg.entrance}
                      </span>
                    </div>

                    <div className="flex items-start gap-3 pt-1">
                      <div className="w-9 h-9 rounded-none bg-[#0a1e16] text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                        <DegreeIcon size={18} className="text-emerald-300" />
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0a1e16] tracking-tight leading-tight">
                        {deg.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-black/10">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-none bg-[#0a3d24]/10 border border-[#0a3d24]/20 flex items-center justify-center text-[#0a3d24]">
                        <Activity size={13} />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[10.5px] uppercase tracking-wider text-[#0a1e16]/80 font-bold">
                          Growth Index:
                        </span>
                        <span className="font-mono text-xs font-bold text-[#0a3d24] bg-emerald-100/90 px-2 py-0.5 border border-emerald-300 rounded-none">
                          {deg.growthRating}.0 / 5.0 High Expansion
                        </span>
                      </div>
                    </div>

                    {/* Interactive 1-click AI simulation button */}
                    <button
                      onClick={() => {
                        setCustomAspiration(`${deg.title} with focus on Tier-1 Indian placements and global compensation`);
                        handleSimulate(`${deg.title} with focus on Tier-1 Indian placements and global compensation`);
                      }}
                      className="px-3 py-1.5 bg-[#0a1e16] hover:bg-[#0a3d24] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-none shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <TrendingUp size={12} className="text-emerald-300" />
                      <span>Simulate This Degree</span>
                    </button>
                  </div>
                </div>

                {/* Bento Tile 2: Compensation Matrix & Trajectory (col-span-12 lg:col-span-5) */}
                <div
                  style={{
                    background: "linear-gradient(180deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.60) 50%, rgba(248, 250, 252, 0.72) 100%)",
                    backdropFilter: "blur(28px) saturate(130%)",
                    WebkitBackdropFilter: "blur(28px) saturate(130%)",
                    boxShadow: "0 10px 24px rgba(0, 0, 0, 0.05)",
                  }}
                  className="md:col-span-12 lg:col-span-5 p-6 sm:p-7 rounded-none border border-black/[0.08] flex flex-col justify-between space-y-4 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between border-b border-black/10 pb-2.5">
                    <span className="font-mono text-[10.5px] uppercase tracking-widest text-[#0a1e16] font-bold flex items-center gap-1.5">
                      <TrendingUp size={14} className="text-[#0a3d24]" /> Compensation Trajectory
                    </span>
                    <span className="font-mono text-[9.5px] font-bold text-[#0a3d24] bg-emerald-100/90 px-2 py-0.5 rounded-none border border-emerald-300">
                      Tier-1 Benchmark
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 py-1">
                    <div className="p-3.5 bg-white/70 rounded-none border border-black/[0.06] text-center space-y-1">
                      <span className="font-mono text-[9.5px] uppercase text-[#0a1e16]/80 font-bold block">
                        Starting (0-3 Yrs)
                      </span>
                      <span className="text-xl sm:text-2xl font-black text-[#0a1e16] block">
                        {deg.startingSalary}
                      </span>
                    </div>

                    <div className="p-3.5 bg-white/70 rounded-none border border-black/[0.06] text-center space-y-1">
                      <span className="font-mono text-[9.5px] uppercase text-[#0a1e16]/80 font-bold block">
                        Mid-Career (5-8 Yrs)
                      </span>
                      <span className="text-xl sm:text-2xl font-black text-[#0a3d24] block">
                        {deg.midSalary}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-medium text-[#0a1e16]/80 pt-1">
                    <span>Expected Escalation Curve:</span>
                    <span className="font-bold text-[#0a3d24] font-mono">~2.8x - 3.5x Multiplier</span>
                  </div>
                </div>

                {/* Bento Tile 3: AI Defensibility & Automation Shield (col-span-12 md:col-span-6 lg:col-span-4) */}
                <div
                  style={{
                    background: "linear-gradient(180deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.60) 50%, rgba(248, 250, 252, 0.72) 100%)",
                    backdropFilter: "blur(28px) saturate(130%)",
                    WebkitBackdropFilter: "blur(28px) saturate(130%)",
                    boxShadow: "0 10px 24px rgba(0, 0, 0, 0.05)",
                  }}
                  className="md:col-span-12 lg:col-span-4 p-5 sm:p-6 rounded-none border border-black/[0.08] flex flex-col justify-between space-y-3 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between border-b border-black/10 pb-2">
                    <span className="font-mono text-[10.5px] uppercase tracking-widest text-[#0a1e16] font-bold flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-[#0a3d24]" /> AI Defensibility
                    </span>
                    <span
                      className={`font-mono text-[9px] uppercase px-2 py-0.5 rounded-none font-bold border ${
                        deg.aiRisk === "Low"
                          ? "border-emerald-300 text-emerald-950 bg-emerald-100/90"
                          : "border-amber-300 text-amber-950 bg-amber-100/90"
                      }`}
                    >
                      {deg.aiRisk} Risk
                    </span>
                  </div>

                  <p className="text-xs text-[#0a1e16] font-medium leading-relaxed my-auto">
                    {deg.aiRiskRationale}
                  </p>

                  <div className="pt-2 border-t border-black/10 flex items-center justify-between text-[10.5px] font-mono text-[#0a1e16]/70">
                    <span>Human Moat:</span>
                    <span className="font-bold text-[#0a1e16]">Tactile / Architectural</span>
                  </div>
                </div>

                {/* Bento Tile 4: Primary Target Roles (col-span-12 md:col-span-6 lg:col-span-4) */}
                <div
                  style={{
                    background: "linear-gradient(180deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.60) 50%, rgba(248, 250, 252, 0.72) 100%)",
                    backdropFilter: "blur(28px) saturate(130%)",
                    WebkitBackdropFilter: "blur(28px) saturate(130%)",
                    boxShadow: "0 10px 24px rgba(0, 0, 0, 0.05)",
                  }}
                  className="md:col-span-6 lg:col-span-4 p-5 sm:p-6 rounded-none border border-black/[0.08] flex flex-col justify-between space-y-3 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between border-b border-black/10 pb-2">
                    <span className="font-mono text-[10.5px] uppercase tracking-widest text-[#0a1e16] font-bold flex items-center gap-1.5">
                      <Briefcase size={14} className="text-[#0a3d24]" /> Primary Target Roles
                    </span>
                    <span className="font-mono text-[9.5px] text-[#0a1e16]/70 font-semibold">
                      High Demand
                    </span>
                  </div>

                  <ul className="space-y-2 py-1">
                    {deg.roles.map((r, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs font-bold text-[#0a1e16] bg-white/60 p-2 rounded-none border border-black/[0.05]">
                        <span className="w-1.5 h-1.5 bg-[#0a3d24] rounded-none" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2 border-t border-black/10 text-[10.5px] font-mono text-[#0a1e16]/70">
                    Campus Recruitment &amp; Global Hiring
                  </div>
                </div>

                {/* Bento Tile 5: Contingency Exit Pivots (col-span-12 md:col-span-6 lg:col-span-4) */}
                <div
                  style={{
                    background: "linear-gradient(180deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.60) 50%, rgba(248, 250, 252, 0.72) 100%)",
                    backdropFilter: "blur(28px) saturate(130%)",
                    WebkitBackdropFilter: "blur(28px) saturate(130%)",
                    boxShadow: "0 10px 24px rgba(0, 0, 0, 0.05)",
                  }}
                  className="md:col-span-6 lg:col-span-4 p-5 sm:p-6 rounded-none border border-black/[0.08] flex flex-col justify-between space-y-3 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between border-b border-black/10 pb-2">
                    <span className="font-mono text-[10.5px] uppercase tracking-widest text-[#0a1e16] font-bold flex items-center gap-1.5">
                      <Compass size={14} className="text-[#0a3d24]" /> Contingency Exit Pivots
                    </span>
                    <span className="font-mono text-[9.5px] text-[#0a3d24] font-bold">
                      Resilient
                    </span>
                  </div>

                  <ul className="space-y-2 py-1">
                    {deg.pivots.map((p, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs font-semibold text-[#0a3d24] bg-emerald-50/70 p-2 rounded-none border border-emerald-200/80">
                        <span>→</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2 border-t border-black/10 text-[10.5px] font-mono text-[#0a1e16]/70">
                    Lateral Corporate &amp; Strategic Switches
                  </div>
                </div>

                {/* Bento Tile 6: Future-Proof Skills (col-span-12) */}
                <div
                  style={{
                    background: "linear-gradient(180deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.60) 50%, rgba(248, 250, 252, 0.72) 100%)",
                    backdropFilter: "blur(28px) saturate(130%)",
                    WebkitBackdropFilter: "blur(28px) saturate(130%)",
                    boxShadow: "0 10px 24px rgba(0, 0, 0, 0.05)",
                  }}
                  className="col-span-12 p-5 sm:p-6 rounded-none border border-black/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-all"
                >
                  <div className="space-y-0.5">
                    <span className="font-mono text-[10.5px] uppercase tracking-widest text-[#0a1e16] font-bold flex items-center gap-1.5">
                      <Target size={14} className="text-[#0a3d24]" /> Critical Skills for 2026+
                    </span>
                    <p className="text-xs text-[#0a1e16]/80 font-medium">
                      Core competencies required to reach the upper 90th percentile compensation bracket.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {deg.skillsToMaster.map((sk, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1.5 bg-white/95 text-[#0a1e16] border border-black/10 font-bold rounded-none shadow-2xs hover:border-[#0a3d24] transition-colors"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          );
        })}
        </div>
      </section>

      {/* Clean Minimalist Footer on Frosted Glass */}
      <footer className="w-full max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-10 py-6 border-t border-white/40 bg-white/40 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#0f291e]/80 font-medium relative z-10 rounded-none">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#0f291e]">Student Saarthi</span>
          <span>•</span>
          <span>Career Pathway Decision Modeling</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/research" className="hover:text-[#0f291e] transition-colors">Deep Research</Link>
          <Link href="/exams" className="hover:text-[#0f291e] transition-colors">Exam Radar</Link>
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
