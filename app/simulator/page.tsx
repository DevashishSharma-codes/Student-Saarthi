"use client";

import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Compass,
  ArrowRight,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  GraduationCap,
  Layers,
  ChevronRight,
  DollarSign,
  Briefcase,
  Share2,
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
    growthRating: number; // 1-5
    pivots: string[];
    skillsToMaster: string[];
  }[];
}

const PATHWAYS: PathwayData[] = [
  {
    streamId: "pcm",
    streamName: "Science (PCM - Tech & Engineering)",
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
        aiRiskRationale: "High defensibility if mastering system design, model fine-tuning, and infrastructure rather than boilerplate coding.",
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
    streamName: "Science (PCB - Medicine & BioSciences)",
    degrees: [
      {
        id: "mbbs-clinical",
        title: "MBBS -> MD / MS Specialization",
        duration: "5.5 Years + 3 Years",
        entrance: "NEET UG -> NEET PG / INI-CET",
        roles: ["Interventional Cardiologist", "Neurosurgeon", "Diagnostic Radiologist"],
        startingSalary: "₹9 - 16 LPA (Stipend/Junior Resident)",
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
    streamId: "commerce-math",
    streamName: "Commerce with Math (Finance & Strategy)",
    degrees: [
      {
        id: "bcom-hons-fintech",
        title: "B.Com (Hons) / B.A. Economics -> Tier-1 MBA / CFA",
        duration: "3 - 4 Years (+ 2 Years MBA)",
        entrance: "CUET UG (SRCC, Stephen's, LSR) -> CAT (IIMs)",
        roles: ["Investment Banking Analyst", "Management Consultant", "Corporate Finance Lead"],
        startingSalary: "₹10 - 22 LPA",
        midSalary: "₹30 - 70 LPA",
        aiRisk: "Moderate",
        aiRiskRationale: "Entry-level slide decks and financial spreadsheets are getting automated; strategic negotiation and deal origination thrive.",
        growthRating: 4.5,
        pivots: ["Venture Capital / Private Equity", "Corporate M&A", "Fintech Product Ops"],
        skillsToMaster: ["Financial Modeling", "Valuation Analysis", "SQL & PowerBI", "Executive Communication"],
      },
      {
        id: "ca-icai",
        title: "Chartered Accountancy (ICAI) + B.Com",
        duration: "4.5 - 5 Years",
        entrance: "CA Foundation -> Intermediate -> Articleship -> Final",
        roles: ["Statutory Auditor", "Tax Strategist", "Chief Financial Officer (CFO)"],
        startingSalary: "₹9 - 18 LPA",
        midSalary: "₹25 - 50+ LPA",
        aiRisk: "Moderate",
        aiRiskRationale: "Routine compliance audits are streamlined by software, but cross-border taxation and forensic fraud investigation remain highly resilient.",
        growthRating: 4,
        pivots: ["Forensic Accounting", "Risk & Governance Advisory", "Strategic M&A"],
        skillsToMaster: ["International Taxation", "Forensic Auditing", "Corporate Law", "ERP Systems"],
      },
    ],
  },
  {
    streamId: "law-policy",
    streamName: "Law & Public Policy (Integrated B.A./BBA LL.B)",
    degrees: [
      {
        id: "ba-llb-nlu",
        title: "5-Year Integrated B.A. LL.B. (Hons) at National Law Universities",
        duration: "5 Years",
        entrance: "CLAT UG, AILET",
        roles: ["Tier-1 Corporate Law Associate", "M&A Counsel", "Litigation Advocate"],
        startingSalary: "₹14 - 20 LPA (Tier-1 Law Firms)",
        midSalary: "₹35 - 75 LPA",
        aiRisk: "Low",
        aiRiskRationale: "Courtroom advocacy, complex cross-border contract negotiations, and judicial reasoning cannot be substituted by LLMs in India.",
        growthRating: 4.5,
        pivots: ["General Counsel / Legal Tech", "Arbitration & Dispute Resolution", "Public Policy Think Tanks"],
        skillsToMaster: ["Contractual Drafting", "Statutory Interpretation", "Moot Court Oral Advocacy", "IPR"],
      },
    ],
  },
  {
    streamId: "design-creative",
    streamName: "Design & Creative Tech (B.Des / Interactive Media)",
    degrees: [
      {
        id: "bdes-interaction-product",
        title: "B.Des in Product / Interaction Design (NID, IIT IDC)",
        duration: "4 Years",
        entrance: "UCEED, NID DAT",
        roles: ["Product Designer (UX/UI)", "Design Systems Lead", "Creative Technologist"],
        startingSalary: "₹10 - 22 LPA",
        midSalary: "₹28 - 55 LPA",
        aiRisk: "Moderate",
        aiRiskRationale: "Pure graphic generation is disrupted by generative AI, but human-centered user ergonomics, enterprise software workflows, and hardware interaction require human empathy.",
        growthRating: 4.5,
        pivots: ["Design Operations (DesignOps)", "Product Management", "Spatial Computing (AR/VR) Design"],
        skillsToMaster: ["Figma & Design Systems", "User Research & Usability Testing", "Prototyping", "Design Ethics"],
      },
    ],
  },
];

export default function PathwaySimulatorPage() {
  const [selectedStreamId, setSelectedStreamId] = useState(PATHWAYS[0].streamId);
  const activeStream = PATHWAYS.find((p) => p.streamId === selectedStreamId) || PATHWAYS[0];
  const [selectedDegreeId, setSelectedDegreeId] = useState(activeStream.degrees[0].id);

  const activeDegree =
    activeStream.degrees.find((d) => d.id === selectedDegreeId) || activeStream.degrees[0];

  const handleStreamChange = (streamId: string) => {
    setSelectedStreamId(streamId);
    const target = PATHWAYS.find((p) => p.streamId === streamId);
    if (target && target.degrees.length > 0) {
      setSelectedDegreeId(target.degrees[0].id);
    }
  };

  return (
    <main className="min-h-screen bg-background relative selection:bg-primary selection:text-primary-foreground">
      <Header />

      <div className="mx-auto max-w-6xl px-4 pt-32 pb-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase shadow-sm">
            <Compass className="h-3.5 w-3.5 text-primary" />
            Dynamic Decision Engine
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Interactive Career <span className="bg-gradient-to-r from-primary via-emerald-500 to-teal-400 text-transparent bg-clip-text">Pathway Simulator</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg">
            Map out alternative academic branches, compensation growth curves, AI disruption resilience, and contingency exit pivots before committing.
          </p>
        </div>

        {/* Pathway Tree Navigation */}
        <div className="space-y-6 mb-10">
          {/* Step 1: Base Anchor */}
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <span>Step 1: Foundational Milestone</span>
            <ArrowRight className="h-3.5 w-3.5" />
            <span className="text-primary font-bold">10th Class Board Completed</span>
          </div>

          {/* Step 2: Stream Selection Pills */}
          <div>
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block text-center mb-3">
              Step 2: Select Target Stream
            </span>
            <div className="flex flex-wrap justify-center gap-2">
              {PATHWAYS.map((p) => (
                <Button
                  key={p.streamId}
                  variant={selectedStreamId === p.streamId ? "default" : "outline"}
                  onClick={() => handleStreamChange(p.streamId)}
                  className="rounded-full text-xs transition-all shadow-xs"
                >
                  {p.streamName}
                </Button>
              ))}
            </div>
          </div>

          {/* Step 3: Undergraduate Degree Branch Selection */}
          <div>
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block text-center mb-3">
              Step 3: Choose Degree Pathway
            </span>
            <div className="flex flex-wrap justify-center gap-2">
              {activeStream.degrees.map((deg) => (
                <Button
                  key={deg.id}
                  variant={selectedDegreeId === deg.id ? "secondary" : "ghost"}
                  onClick={() => setSelectedDegreeId(deg.id)}
                  className={`rounded-xl text-xs border ${
                    selectedDegreeId === deg.id
                      ? "border-primary bg-primary/10 text-primary font-bold shadow-xs"
                      : "border-border/60 text-muted-foreground"
                  }`}
                >
                  <GraduationCap className="h-3.5 w-3.5 mr-1.5" />
                  {deg.title}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Simulation Dossier Card */}
        <Card className="glass-panel border-border/80 shadow-2xl overflow-hidden max-w-5xl mx-auto">
          <CardHeader className="bg-muted/40 border-b border-border/60 pb-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs bg-background">
                    {activeDegree.duration}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      activeDegree.aiRisk === "Low"
                        ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "border-amber-500/50 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                    }`}
                  >
                    AI Disruption Risk: {activeDegree.aiRisk}
                  </Badge>
                </div>
                <CardTitle className="text-2xl md:text-3xl font-extrabold text-foreground">
                  {activeDegree.title}
                </CardTitle>
                <CardDescription className="text-xs md:text-sm mt-1 text-muted-foreground">
                  Key Entrance Gateways: <span className="font-semibold text-foreground/80">{activeDegree.entrance}</span>
                </CardDescription>
              </div>

              {/* Link to Deep Research */}
              <Link
                href={`/research?query=${encodeURIComponent(
                  activeDegree.title + " career outlook and top colleges in India"
                )}`}
              >
                <Button size="sm" className="rounded-xl text-xs shadow-md">
                  <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                  Deep Research This Path
                </Button>
              </Link>
            </div>
          </CardHeader>

          <CardContent className="p-6 md:p-8 space-y-8">
            {/* Compensation & Trajectory Bracket */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl border bg-card/60 shadow-xs space-y-1">
                <span className="text-xs text-muted-foreground block font-medium">Starting CTC (0-2 Yrs)</span>
                <span className="text-xl md:text-2xl font-black text-foreground">
                  {activeDegree.startingSalary}
                </span>
                <span className="text-[11px] text-muted-foreground block">Campus recruitment & entry roles</span>
              </div>

              <div className="p-4 rounded-2xl border bg-card/60 shadow-xs space-y-1">
                <span className="text-xs text-muted-foreground block font-medium">Mid-Career CTC (5-8 Yrs)</span>
                <span className="text-xl md:text-2xl font-black text-emerald-600 dark:text-emerald-400">
                  {activeDegree.midSalary}
                </span>
                <span className="text-[11px] text-muted-foreground block">Specialist & team lead compensation</span>
              </div>

              <div className="p-4 rounded-2xl border bg-card/60 shadow-xs space-y-1 sm:col-span-2 lg:col-span-1">
                <span className="text-xs text-muted-foreground block font-medium">Market Growth Rating</span>
                <div className="flex items-center gap-1 text-amber-500 pt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-lg">
                      {i < Math.floor(activeDegree.growthRating) ? "★" : "☆"}
                    </span>
                  ))}
                  <span className="text-xs font-bold text-foreground ml-1">
                    {activeDegree.growthRating} / 5.0
                  </span>
                </div>
                <span className="text-[11px] text-muted-foreground block">Hiring velocity index</span>
              </div>
            </div>

            {/* Typical Roles Grid */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                Target Industry Roles
              </span>
              <div className="flex flex-wrap gap-2">
                {activeDegree.roles.map((role, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl border bg-secondary/40 text-xs font-medium text-foreground"
                  >
                    <Briefcase className="h-3.5 w-3.5 text-primary" />
                    <span>{role}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Disruption & Defensibility Rationale */}
            <div className="p-4 rounded-2xl border border-primary/20 bg-primary/5 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-foreground">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span>AI Automation & Disruption Analysis</span>
              </div>
              <p className="text-xs md:text-sm text-foreground/85 leading-relaxed">
                {activeDegree.aiRiskRationale}
              </p>
            </div>

            {/* Contingency / Alternative Pivot Points */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Strategic Contingency & Exit Pivots
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                If industry demand shifts, students from this path can pivot seamlessly to:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {activeDegree.pivots.map((piv, i) => (
                  <div key={i} className="p-3 rounded-xl border bg-card/60 text-xs font-medium text-foreground/90">
                    <span className="text-primary font-bold mr-1.5">0{i + 1}.</span> {piv}
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Checklist */}
            <div className="space-y-2 pt-2 border-t border-border/50">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                Core Defensible Competencies to Master:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeDegree.skillsToMaster.map((skill, i) => (
                  <Badge key={i} variant="outline" className="text-xs py-1 px-3 bg-secondary/30">
                    ✓ {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
