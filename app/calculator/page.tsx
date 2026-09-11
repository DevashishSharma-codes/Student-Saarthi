"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/site/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calculator,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
  Sparkles,
  PieChart,
  ArrowUpRight,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";

export default function RoiCalculatorPage() {
  // Input states
  const [durationYears, setDurationYears] = useState<number>(4);
  const [annualTuition, setAnnualTuition] = useState<number>(250000);
  const [annualLiving, setAnnualLiving] = useState<number>(120000);
  const [coachingCost, setCoachingCost] = useState<number>(150000);
  const [loanAmount, setLoanAmount] = useState<number>(800000);
  const [interestRate, setInterestRate] = useState<number>(9.5);
  const [tenureYears, setTenureYears] = useState<number>(7);
  const [expectedCtc, setExpectedCtc] = useState<number>(1200000);
  const [ctcGrowthRate, setCtcGrowthRate] = useState<number>(12);

  // Computed financial metrics
  const calculations = useMemo(() => {
    const totalTuition = annualTuition * durationYears;
    const totalLiving = annualLiving * durationYears;
    const totalInvestment = totalTuition + totalLiving + coachingCost;

    // Monthly EMI Calculation: P * r * (1+r)^n / ((1+r)^n - 1)
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

    // In-hand post-tax income estimate (~78% of CTC in India under new tax regime brackets)
    const annualInHandYear1 = expectedCtc * 0.78;
    const monthlyInHandYear1 = annualInHandYear1 / 12;

    // Estimated cumulative earnings over 5 years with growth
    let cumulativeEarnings5Yrs = 0;
    let currentYearCtc = expectedCtc;
    for (let yr = 1; yr <= 5; yr++) {
      cumulativeEarnings5Yrs += currentYearCtc * 0.78;
      currentYearCtc *= 1 + ctcGrowthRate / 100;
    }

    const netInvestmentWithInterest = totalInvestment + totalInterest;

    // Payback period in months:
    // If loan exists: time to pay off loan and recoup net investment
    const monthlyDisposableIncome = Math.max(0, monthlyInHandYear1 - monthlyEmi);
    const paybackMonths =
      monthlyInHandYear1 > 0
        ? Math.ceil(totalInvestment / (annualInHandYear1 / 12))
        : 0;

    const roi5YearMultiplier =
      totalInvestment > 0 ? (cumulativeEarnings5Yrs / totalInvestment).toFixed(2) : "0";

    // Feasibility score evaluation
    let riskLevel: "Excellent" | "Balanced" | "High Leverage Risk" = "Balanced";
    let riskColor = "text-emerald-500";
    let riskAdvice = "";

    const loanToCtcRatio = expectedCtc > 0 ? loanAmount / expectedCtc : 0;
    if (loanToCtcRatio <= 0.8 && paybackMonths <= 30) {
      riskLevel = "Excellent";
      riskColor = "text-emerald-500";
      riskAdvice = "Exceptional financial feasibility. Expected starting package easily amortizes the education capital outlay.";
    } else if (loanToCtcRatio <= 1.5 && paybackMonths <= 48) {
      riskLevel = "Balanced";
      riskColor = "text-blue-500";
      riskAdvice = "Healthy, standard college investment. Manage living expenses and maintain academic performance to secure top placement tier.";
    } else {
      riskLevel = "High Leverage Risk";
      riskColor = "text-amber-500";
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
    <main className="min-h-screen bg-background relative selection:bg-primary selection:text-primary-foreground">
      <Header />

      <div className="mx-auto max-w-6xl px-4 pt-32 pb-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase shadow-sm">
            <Calculator className="h-3.5 w-3.5 text-primary" />
            Financial Decision Intelligence
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Higher Education <span className="bg-gradient-to-r from-primary via-emerald-500 to-teal-400 text-transparent bg-clip-text">ROI & Loan Breakeven</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg">
            Simulate tuition, hostel costs, education loan interest, and starting salary trajectories to evaluate payback periods and financial risk.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          {/* Left Column: Inputs Console (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="glass-panel border-border/80 shadow-lg">
              <CardHeader className="pb-3 border-b border-border/50 flex flex-row items-center justify-between">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-primary" /> Cost & Loan Inputs
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleResetDefaults}
                  className="text-xs text-muted-foreground hover:text-foreground h-8"
                >
                  <RotateCcw className="h-3 w-3 mr-1" /> Reset
                </Button>
              </CardHeader>
              <CardContent className="p-5 space-y-4 text-xs">
                {/* Degree Duration */}
                <div>
                  <div className="flex justify-between font-medium mb-1.5">
                    <span>Program Duration</span>
                    <span className="font-bold text-primary">{durationYears} Years</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[3, 4, 5].map((yrs) => (
                      <Button
                        key={yrs}
                        type="button"
                        variant={durationYears === yrs ? "default" : "outline"}
                        size="sm"
                        onClick={() => setDurationYears(yrs)}
                        className="rounded-lg text-xs"
                      >
                        {yrs} Years
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Annual Tuition Fees */}
                <div>
                  <label className="font-medium text-muted-foreground block mb-1">
                    Annual Tuition Fees (₹)
                  </label>
                  <Input
                    type="number"
                    step="10000"
                    value={annualTuition}
                    onChange={(e) => setAnnualTuition(Number(e.target.value) || 0)}
                    className="h-9 text-xs rounded-lg"
                  />
                  <span className="text-[10px] text-muted-foreground">
                    Total Tuition: ₹{(annualTuition * durationYears).toLocaleString("en-IN")}
                  </span>
                </div>

                {/* Annual Living / Hostel Expenses */}
                <div>
                  <label className="font-medium text-muted-foreground block mb-1">
                    Annual Hostel & Living (₹)
                  </label>
                  <Input
                    type="number"
                    step="5000"
                    value={annualLiving}
                    onChange={(e) => setAnnualLiving(Number(e.target.value) || 0)}
                    className="h-9 text-xs rounded-lg"
                  />
                </div>

                {/* Coaching / Entrance Prep */}
                <div>
                  <label className="font-medium text-muted-foreground block mb-1">
                    Coaching & Entrance Prep Cost (₹)
                  </label>
                  <Input
                    type="number"
                    step="10000"
                    value={coachingCost}
                    onChange={(e) => setCoachingCost(Number(e.target.value) || 0)}
                    className="h-9 text-xs rounded-lg"
                  />
                </div>

                <div className="pt-2 border-t border-border/50">
                  <span className="font-bold text-foreground text-xs block mb-3">
                    Education Loan Parameters (Optional)
                  </span>

                  <div className="space-y-3">
                    <div>
                      <label className="font-medium text-muted-foreground block mb-1">
                        Loan Principal Borrowed (₹)
                      </label>
                      <Input
                        type="number"
                        step="50000"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(Number(e.target.value) || 0)}
                        className="h-9 text-xs rounded-lg"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="font-medium text-muted-foreground block mb-1">
                          Interest Rate (% p.a.)
                        </label>
                        <Input
                          type="number"
                          step="0.25"
                          value={interestRate}
                          onChange={(e) => setInterestRate(Number(e.target.value) || 0)}
                          className="h-9 text-xs rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="font-medium text-muted-foreground block mb-1">
                          Repayment (Years)
                        </label>
                        <Input
                          type="number"
                          value={tenureYears}
                          onChange={(e) => setTenureYears(Number(e.target.value) || 1)}
                          className="h-9 text-xs rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-border/50">
                  <span className="font-bold text-foreground text-xs block mb-3">
                    Career Compensation Assumptions
                  </span>

                  <div className="space-y-3">
                    <div>
                      <label className="font-medium text-muted-foreground block mb-1">
                        Expected Starting Annual CTC (₹)
                      </label>
                      <Input
                        type="number"
                        step="50000"
                        value={expectedCtc}
                        onChange={(e) => setExpectedCtc(Number(e.target.value) || 0)}
                        className="h-9 text-xs rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="font-medium text-muted-foreground block mb-1">
                        Expected Annual Salary Growth (%)
                      </label>
                      <Input
                        type="number"
                        step="1"
                        value={ctcGrowthRate}
                        onChange={(e) => setCtcGrowthRate(Number(e.target.value) || 0)}
                        className="h-9 text-xs rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Output Intelligence Dashboard (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl border bg-card/60 backdrop-blur-sm shadow-xs space-y-1">
                <span className="text-[11px] text-muted-foreground block font-medium">
                  Total Capital Investment
                </span>
                <span className="text-xl md:text-2xl font-black text-foreground">
                  ₹{calculations.totalInvestment.toLocaleString("en-IN")}
                </span>
                <span className="text-[10px] text-muted-foreground block">Tuition + Living + Prep</span>
              </div>

              <div className="p-4 rounded-2xl border bg-card/60 backdrop-blur-sm shadow-xs space-y-1">
                <span className="text-[11px] text-muted-foreground block font-medium">
                  Est. Payback Horizon
                </span>
                <span className="text-xl md:text-2xl font-black text-emerald-600 dark:text-emerald-400">
                  {calculations.paybackYears} Years
                </span>
                <span className="text-[10px] text-muted-foreground block">
                  ({calculations.paybackMonths} post-grad months)
                </span>
              </div>

              <div className="p-4 rounded-2xl border bg-card/60 backdrop-blur-sm shadow-xs space-y-1">
                <span className="text-[11px] text-muted-foreground block font-medium">
                  5-Year Cumulative ROI
                </span>
                <span className="text-xl md:text-2xl font-black text-primary">
                  {calculations.roi5YearMultiplier}x
                </span>
                <span className="text-[10px] text-muted-foreground block">Net return multiplier</span>
              </div>
            </div>

            {/* Financial Feasibility Audit Banner */}
            <Card className="glass-panel border-border/80 shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-bold flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    Financial Feasibility Verdict
                  </CardTitle>
                  <Badge variant="outline" className={`font-bold text-xs ${calculations.riskColor}`}>
                    {calculations.riskLevel}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pt-0 text-xs">
                <p className="text-foreground/85 leading-relaxed text-sm">
                  {calculations.riskAdvice}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-border/50 text-[11px]">
                  <div>
                    <span className="text-muted-foreground block">Monthly Loan EMI</span>
                    <span className="font-bold text-foreground">
                      ₹{calculations.monthlyEmi.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Total Loan Interest</span>
                    <span className="font-bold text-amber-600 dark:text-amber-400">
                      ₹{calculations.totalInterest.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">First Year In-Hand/Mo</span>
                    <span className="font-bold text-foreground">
                      ₹{calculations.monthlyInHandYear1.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">5-Yr Total In-Hand</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      ₹{calculations.cumulativeEarnings5Yrs.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Visual Breakeven & Cashflow Schedule */}
            <Card className="glass-panel border-border/80 shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Cumulative Cashflow Payback Timeline
                </CardTitle>
                <CardDescription className="text-xs">
                  Visual projection of total post-graduation cumulative earnings versus initial educational investment.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5 space-y-4">
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((year) => {
                    let cumulativeEarned = 0;
                    let yearCtc = expectedCtc;
                    for (let y = 1; y <= year; y++) {
                      cumulativeEarned += yearCtc * 0.78;
                      yearCtc *= 1 + ctcGrowthRate / 100;
                    }
                    const progressPercent = Math.min(
                      100,
                      Math.round((cumulativeEarned / calculations.totalInvestment) * 100)
                    );
                    const isBreakeven = cumulativeEarned >= calculations.totalInvestment;

                    return (
                      <div key={year} className="space-y-1">
                        <div className="flex justify-between text-xs font-medium">
                          <span>Year {year} After Graduation</span>
                          <span className={isBreakeven ? "text-emerald-600 dark:text-emerald-400 font-bold" : "text-muted-foreground"}>
                            ₹{Math.round(cumulativeEarned).toLocaleString("en-IN")} ({progressPercent}% recouped)
                          </span>
                        </div>
                        <div className="w-full bg-secondary h-2.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              isBreakeven ? "bg-emerald-500" : "bg-primary"
                            }`}
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 border-t border-border/50 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-muted-foreground">
                    Want to research top scholarship portals and fee waivers?
                  </div>
                  <Link href="/research?query=Top%20college%20scholarships%20fee%20waivers%20in%20India">
                    <Button size="sm" variant="outline" className="rounded-xl text-xs">
                      <Sparkles className="h-3.5 w-3.5 mr-1 text-primary" />
                      Research Scholarships
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
