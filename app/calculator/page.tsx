"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import {
  Calculator,
  RotateCcw,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function RoiCalculatorPage() {
  const [durationYears, setDurationYears] = useState<number>(4);
  const [annualTuition, setAnnualTuition] = useState<number>(250000);
  const [annualLiving, setAnnualLiving] = useState<number>(120000);
  const [coachingCost, setCoachingCost] = useState<number>(150000);
  const [loanAmount, setLoanAmount] = useState<number>(800000);
  const [interestRate, setInterestRate] = useState<number>(9.5);
  const [tenureYears, setTenureYears] = useState<number>(7);
  const [expectedCtc, setExpectedCtc] = useState<number>(1200000);
  const [ctcGrowthRate, setCtcGrowthRate] = useState<number>(12);

  const calculations = useMemo(() => {
    const totalTuition = annualTuition * durationYears;
    const totalLiving = annualLiving * durationYears;
    const totalInvestment = totalTuition + totalLiving + coachingCost;

    let monthlyEmi = 0;
    let totalInterest = 0;
    const principal = loanAmount;
    if (principal > 0 && interestRate > 0 && tenureYears > 0) {
      const monthlyRate = interestRate / 12 / 100;
      const totalMonths = tenureYears * 12;
      monthlyEmi =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);
      totalInterest = monthlyEmi * totalMonths - principal;
    }

    const annualInHandYear1 = expectedCtc * 0.78;
    const monthlyInHandYear1 = annualInHandYear1 / 12;

    let cumulativeEarnings5Yrs = 0;
    let currentYearCtc = expectedCtc;
    for (let yr = 1; yr <= 5; yr++) {
      cumulativeEarnings5Yrs += currentYearCtc * 0.78;
      currentYearCtc *= 1 + ctcGrowthRate / 100;
    }

    const paybackMonths =
      monthlyInHandYear1 > 0
        ? Math.ceil(totalInvestment / (annualInHandYear1 / 12))
        : 0;

    const roi5YearMultiplier =
      totalInvestment > 0 ? (cumulativeEarnings5Yrs / totalInvestment).toFixed(2) : "0";

    let riskLevel: "Excellent" | "Balanced" | "High Leverage Risk" = "Balanced";
    let riskColor = "text-[#0a3d24]";
    let riskAdvice = "";

    const loanToCtcRatio = expectedCtc > 0 ? loanAmount / expectedCtc : 0;
    if (loanToCtcRatio <= 0.8 && paybackMonths <= 30) {
      riskLevel = "Excellent";
      riskColor = "text-[#0a3d24]";
      riskAdvice = "Exceptional financial feasibility. Expected starting package easily amortizes the education capital outlay.";
    } else if (loanToCtcRatio <= 1.5 && paybackMonths <= 48) {
      riskLevel = "Balanced";
      riskColor = "text-[#0a3150]";
      riskAdvice = "Healthy, standard college investment. Manage living expenses and maintain academic performance to secure top placement tier.";
    } else {
      riskLevel = "High Leverage Risk";
      riskColor = "text-[#6b1515]";
      riskAdvice = "High debt-to-income ratio. Seek scholarships, explore semi-government college options, or negotiate lower tuition fee tiers.";
    }

    return {
      totalTuition,
      totalLiving,
      totalInvestment,
      monthlyEmi: Math.round(monthlyEmi),
      totalInterest: Math.round(totalInterest),
      annualInHandYear1: Math.round(annualInHandYear1),
      monthlyInHandYear1: Math.round(monthlyInHandYear1),
      paybackMonths,
      paybackYears: (paybackMonths / 12).toFixed(1),
      cumulativeEarnings5Yrs: Math.round(cumulativeEarnings5Yrs),
      roi5YearMultiplier,
      riskLevel,
      riskColor,
      riskAdvice,
    };
  }, [
    durationYears,
    annualTuition,
    annualLiving,
    coachingCost,
    loanAmount,
    interestRate,
    tenureYears,
    expectedCtc,
    ctcGrowthRate,
  ]);

  const handleResetDefaults = () => {
    setDurationYears(4);
    setAnnualTuition(250000);
    setAnnualLiving(120000);
    setCoachingCost(150000);
    setLoanAmount(800000);
    setInterestRate(9.5);
    setTenureYears(7);
    setExpectedCtc(1200000);
    setCtcGrowthRate(12);
  };

  return (
    <main
      style={{
        backgroundImage: "url('/calculator-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
      }}
      className="min-h-screen text-[#0f291e] selection:bg-[#0f291e] selection:text-white relative font-sans flex flex-col justify-between overflow-x-hidden"
    >
      {/* =========================================================================
          FIXED MATCHA SAGE GRADIENT BACKGROUND LAYER
          ========================================================================= */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="/calculator-bg.png"
          alt="Matcha Sage Calculator Wallpaper"
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
            Education ROI &amp; Payback DSS
            <span className="block font-serif italic text-[#123628] font-normal mt-0.5">
              debt breakeven, EMI &amp; cashflow modeling.
            </span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-[#123628]/85 leading-relaxed font-light max-w-2xl mx-auto text-center drop-shadow-2xs">
            Quantify total degree capital expenditure vs starting compensation, reducing-balance EMI schedules, and cumulative 5-year payback timelines.
          </p>
        </div>

        {/* =========================================================================
            CALCULATOR TWO-COLUMN GRID (Frosted Glass with Squared Edges)
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Financial Input Parameters */}
          <div
            style={{
              background: "linear-gradient(180deg, rgba(255, 255, 255, 0.78) 0%, rgba(255, 255, 255, 0.52) 50%, rgba(248, 250, 252, 0.65) 100%)",
              backdropFilter: "blur(28px) saturate(130%)",
              WebkitBackdropFilter: "blur(28px) saturate(130%)",
              boxShadow: "inset 0 1px 2px rgba(255, 255, 255, 0.95), 0 14px 30px rgba(0, 0, 0, 0.07)",
            }}
            className="lg:col-span-6 p-6 sm:p-8 rounded-none border border-white/90 shadow-sm space-y-6"
          >
            <div className="flex items-center justify-between border-b border-black/10 pb-3">
              <span className="font-mono text-[10.5px] uppercase tracking-widest text-[#0a1e16] font-bold flex items-center gap-2">
                <Calculator size={14} className="text-[#0a3d24]" /> Degree Capital Parameters
              </span>
              <button
                onClick={handleResetDefaults}
                className="font-mono text-[10px] uppercase text-[#0a1e16]/80 hover:text-black font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RotateCcw size={11} /> Reset Defaults
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] uppercase tracking-wider text-[#0a1e16] font-semibold block mb-1">
                  Course Duration (Years)
                </label>
                <input
                  type="number"
                  value={durationYears}
                  onChange={(e) => setDurationYears(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-slate-100/70 backdrop-blur-md border border-white/90 focus:border-[#0a1e16] focus:bg-white rounded-none px-3 py-2 text-xs text-[#0a1e16] focus:outline-none transition-all shadow-xs font-semibold"
                />
              </div>

              <div>
                <label className="font-mono text-[10px] uppercase tracking-wider text-[#0a1e16] font-semibold block mb-1">
                  Annual Tuition Fee (₹)
                </label>
                <input
                  type="number"
                  step="25000"
                  value={annualTuition}
                  onChange={(e) => setAnnualTuition(Number(e.target.value))}
                  className="w-full bg-slate-100/70 backdrop-blur-md border border-white/90 focus:border-[#0a1e16] focus:bg-white rounded-none px-3 py-2 text-xs text-[#0a1e16] focus:outline-none transition-all shadow-xs font-semibold"
                />
              </div>

              <div>
                <label className="font-mono text-[10px] uppercase tracking-wider text-[#0a1e16] font-semibold block mb-1">
                  Annual Hostel / Living (₹)
                </label>
                <input
                  type="number"
                  step="10000"
                  value={annualLiving}
                  onChange={(e) => setAnnualLiving(Number(e.target.value))}
                  className="w-full bg-slate-100/70 backdrop-blur-md border border-white/90 focus:border-[#0a1e16] focus:bg-white rounded-none px-3 py-2 text-xs text-[#0a1e16] focus:outline-none transition-all shadow-xs font-semibold"
                />
              </div>

              <div>
                <label className="font-mono text-[10px] uppercase tracking-wider text-[#0a1e16] font-semibold block mb-1">
                  Coaching &amp; Prep Spend (₹)
                </label>
                <input
                  type="number"
                  step="10000"
                  value={coachingCost}
                  onChange={(e) => setCoachingCost(Number(e.target.value))}
                  className="w-full bg-slate-100/70 backdrop-blur-md border border-white/90 focus:border-[#0a1e16] focus:bg-white rounded-none px-3 py-2 text-xs text-[#0a1e16] focus:outline-none transition-all shadow-xs font-semibold"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-black/10 space-y-4">
              <span className="font-mono text-[10.5px] uppercase tracking-widest text-[#0a1e16] font-bold block">
                Education Loan Financing
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[#0a1e16] font-semibold block mb-1">
                    Loan Principal (₹)
                  </label>
                  <input
                    type="number"
                    step="50000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full bg-slate-100/70 backdrop-blur-md border border-white/90 focus:border-[#0a1e16] focus:bg-white rounded-none px-3 py-2 text-xs text-[#0a1e16] focus:outline-none transition-all shadow-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[#0a1e16] font-semibold block mb-1">
                    Interest Rate (% p.a.)
                  </label>
                  <input
                    type="number"
                    step="0.25"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full bg-slate-100/70 backdrop-blur-md border border-white/90 focus:border-[#0a1e16] focus:bg-white rounded-none px-3 py-2 text-xs text-[#0a1e16] focus:outline-none transition-all shadow-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[#0a1e16] font-semibold block mb-1">
                    Tenure (Years)
                  </label>
                  <input
                    type="number"
                    value={tenureYears}
                    onChange={(e) => setTenureYears(Math.max(1, Number(e.target.value)))}
                    className="w-full bg-slate-100/70 backdrop-blur-md border border-white/90 focus:border-[#0a1e16] focus:bg-white rounded-none px-3 py-2 text-xs text-[#0a1e16] focus:outline-none transition-all shadow-xs font-semibold"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-black/10 space-y-4">
              <span className="font-mono text-[10.5px] uppercase tracking-widest text-[#0a1e16] font-bold block">
                Post-Graduation Compensation
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[#0a1e16] font-semibold block mb-1">
                    Expected Starting CTC (₹)
                  </label>
                  <input
                    type="number"
                    step="50000"
                    value={expectedCtc}
                    onChange={(e) => setExpectedCtc(Number(e.target.value))}
                    className="w-full bg-slate-100/70 backdrop-blur-md border border-white/90 focus:border-[#0a1e16] focus:bg-white rounded-none px-3 py-2 text-xs text-[#0a1e16] focus:outline-none transition-all shadow-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[#0a1e16] font-semibold block mb-1">
                    Annual Salary Hike (% p.a.)
                  </label>
                  <input
                    type="number"
                    value={ctcGrowthRate}
                    onChange={(e) => setCtcGrowthRate(Number(e.target.value))}
                    className="w-full bg-slate-100/70 backdrop-blur-md border border-white/90 focus:border-[#0a1e16] focus:bg-white rounded-none px-3 py-2 text-xs text-[#0a1e16] focus:outline-none transition-all shadow-xs font-semibold"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Key Payback & Cashflow Metrics */}
          <div className="lg:col-span-6 space-y-6">
            <div
              style={{
                background: "linear-gradient(180deg, rgba(255, 255, 255, 0.78) 0%, rgba(255, 255, 255, 0.52) 50%, rgba(248, 250, 252, 0.65) 100%)",
                backdropFilter: "blur(28px) saturate(130%)",
                WebkitBackdropFilter: "blur(28px) saturate(130%)",
                boxShadow: "inset 0 1px 2px rgba(255, 255, 255, 0.95), 0 14px 30px rgba(0, 0, 0, 0.07)",
              }}
              className="p-6 sm:p-8 rounded-none border border-white/90 shadow-sm space-y-6"
            >
              <div className="space-y-2">
                <span className="font-mono text-[10.5px] uppercase tracking-widest text-[#0a1e16] font-bold block">
                  DSS Feasibility Verdict
                </span>
                <div className="flex items-center justify-between">
                  <h3 className={`text-3xl sm:text-4xl font-black tracking-tight ${calculations.riskColor} drop-shadow-xs`}>
                    {calculations.riskLevel}
                  </h3>
                  <span className="font-mono text-xs px-3 py-1 bg-white/95 border border-black/10 font-bold text-[#0a1e16] shadow-2xs">
                    5-Yr ROI: {calculations.roi5YearMultiplier}x
                  </span>
                </div>
                <p className="text-xs font-medium text-[#0a1e16] leading-relaxed pt-1">
                  {calculations.riskAdvice}
                </p>
              </div>

              {/* Output Grid */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-black/10">
                <div className="p-4 bg-white/60 backdrop-blur-xs border border-white/80 text-center">
                  <span className="font-mono text-[10px] uppercase text-[#0a1e16]/80 font-bold block mb-1">
                    Total Educational Outlay
                  </span>
                  <span className="text-2xl font-black text-[#0a1e16]">
                    ₹{(calculations.totalInvestment / 100000).toFixed(2)}L
                  </span>
                </div>

                <div className="p-4 bg-white/60 backdrop-blur-xs border border-white/80 text-center">
                  <span className="font-mono text-[10px] uppercase text-[#0a1e16]/80 font-bold block mb-1">
                    Capital Payback Horizon
                  </span>
                  <span className="text-2xl font-black text-[#0a3d24]">
                    {calculations.paybackMonths} Mo. ({calculations.paybackYears} Yrs)
                  </span>
                </div>

                <div className="p-4 bg-white/60 backdrop-blur-xs border border-white/80 text-center">
                  <span className="font-mono text-[10px] uppercase text-[#0a1e16]/80 font-bold block mb-1">
                    Monthly Loan EMI
                  </span>
                  <span className="text-xl font-black text-[#0a1e16]">
                    ₹{calculations.monthlyEmi.toLocaleString()}
                  </span>
                </div>

                <div className="p-4 bg-white/60 backdrop-blur-xs border border-white/80 text-center">
                  <span className="font-mono text-[10px] uppercase text-[#0a1e16]/80 font-bold block mb-1">
                    Net In-Hand (Mo. 1)
                  </span>
                  <span className="text-xl font-black text-[#0a3d24]">
                    ₹{calculations.monthlyInHandYear1.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* 5-Year Cumulative Trajectory */}
              <div className="p-4 bg-white/50 border border-white/70 text-xs space-y-2">
                <div className="flex items-center justify-between text-[11.5px]">
                  <span className="text-[#0a1e16] font-semibold">Cumulative 5-Year Earnings (Post-Tax):</span>
                  <span className="font-black text-[#0a3d24] text-sm">
                    ₹{(calculations.cumulativeEarnings5Yrs / 100000).toFixed(2)} Lakhs
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11.5px]">
                  <span className="text-[#0a1e16] font-semibold">Cumulative Loan Interest Burden:</span>
                  <span className="font-black text-[#6b1515] text-sm">
                    ₹{(calculations.totalInterest / 100000).toFixed(2)} Lakhs
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Clean Minimalist Footer on Frosted Glass */}
      <footer className="w-full max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-10 py-6 border-t border-white/40 bg-white/40 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#0f291e]/80 font-medium relative z-10">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#0f291e]">Student Saarthi</span>
          <span>•</span>
          <span>Education Capital ROI &amp; Payback Modeling</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/research" className="hover:text-[#0f291e] transition-colors">Deep Research</Link>
          <Link href="/exams" className="hover:text-[#0f291e] transition-colors">Exam Radar</Link>
          <Link href="/colleges" className="hover:text-[#0f291e] transition-colors">Colleges</Link>
          <Link href="/simulator" className="hover:text-[#0f291e] transition-colors">Simulator</Link>
        </div>
        <div>
          <span>© 2026 Student Saarthi. All rights reserved.</span>
        </div>
      </footer>
    </main>
  );
}
