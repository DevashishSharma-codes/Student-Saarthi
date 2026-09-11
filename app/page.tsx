import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BrainCircuit,
  Compass,
  Sparkles,
  Calendar,
  Building2,
  Calculator,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  ExternalLink,
  CheckCircle2,
  Flame,
  Award,
} from "lucide-react";

export default function Home() {
  const capabilities = [
    {
      title: "Autonomous Deep Research",
      description:
        "Multi-step market intelligence grounded in live Google Search. Synthesizes 2026 cutoffs, AI disruption risk, and verified web citations into an executive dossier.",
      href: "/research",
      badge: "Real-Time AI Grounding",
      icon: Sparkles,
      color: "from-primary/20 to-emerald-500/10",
      accent: "text-primary",
    },
    {
      title: "Live National Exam Radar",
      description:
        "Track upcoming application windows, admit cards, and exam dates across JEE, NEET, CUET, CLAT, IPMAT, and NIFT with live AI status verification.",
      href: "/exams",
      badge: "Active Radar",
      icon: Calendar,
      color: "from-amber-500/20 to-orange-500/10",
      accent: "text-amber-500",
    },
    {
      title: "Career Pathway Simulator",
      description:
        "Interactive node-based decision tree. Trace how choosing PCM vs PCB vs Commerce branches into specific undergraduate degrees, compensation curves, and contingency exit pivots.",
      href: "/simulator",
      badge: "Decision Tree",
      icon: Compass,
      color: "from-blue-500/20 to-cyan-500/10",
      accent: "text-blue-500",
    },
    {
      title: "College & Institutional Intelligence",
      description:
        "Search 30+ top institutions across Science, Commerce, Law, and Design. Features an on-demand AI auditor to fact-check real placement records and campus red flags for ANY college.",
      href: "/colleges",
      badge: "Live AI Auditor",
      icon: Building2,
      color: "from-purple-500/20 to-pink-500/10",
      accent: "text-purple-500",
    },
    {
      title: "Education ROI & Loan Breakeven",
      description:
        "Calculate true educational capital outlay (tuition + hostel + prep) vs starting CTC, loan EMIs, cumulative 5-year cashflows, and payback horizon in months.",
      href: "/calculator",
      badge: "Financial DSS",
      icon: Calculator,
      color: "from-emerald-500/20 to-teal-500/10",
      accent: "text-emerald-500",
    },
    {
      title: "RIASEC Psychometric Engine",
      description:
        "15-point Holland Code assessment evaluating Realistic, Investigative, Artistic, Social, Enterprising, and Conventional traits for tailored guidance.",
      href: "/quiz",
      badge: "Holland Codes",
      icon: BrainCircuit,
      color: "from-indigo-500/20 to-violet-500/10",
      accent: "text-indigo-500",
    },
  ];

  return (
    <main className="min-h-screen relative overflow-hidden bg-background selection:bg-primary selection:text-primary-foreground">
      {/* Ambient background blur spots */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-20 w-96 h-96 bg-accent/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 left-1/3 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <Header />

      {/* Hero Section */}
      <section className="relative mx-auto max-w-6xl px-4 pt-36 pb-16 z-10">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          {/* Real-time Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-background/80 backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-foreground">
              Powered by Gemini 2.5 Flash & Real-Time Google Search Grounding
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.08]">
            Real-Time AI <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-primary via-emerald-500 to-teal-400 text-transparent bg-clip-text">
              Career & Higher Ed Intelligence
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed">
            Move beyond static, outdated counseling. Discover live university cutoffs, AI disruption risk models, national entrance exam trackers, and financial payback simulators.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-4">
            <Link href="/research">
              <Button size="lg" className="h-13 px-7 rounded-full text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                <Sparkles className="mr-2 h-4 w-4" /> Launch Deep Research
              </Button>
            </Link>

            <Link href="/simulator">
              <Button variant="outline" size="lg" className="h-13 px-7 rounded-full border-2 text-base font-bold hover:bg-secondary/50 transition-all duration-300">
                <Compass className="mr-2 h-4 w-4 text-blue-500" /> Simulate Career Pathways
              </Button>
            </Link>

            <Link href="/quiz">
              <Button variant="ghost" size="lg" className="h-13 px-6 rounded-full text-base font-semibold hover:bg-secondary/40">
                <BrainCircuit className="mr-2 h-4 w-4 text-primary" /> Take Psychometric Test
              </Button>
            </Link>
          </div>
        </div>

        {/* Live Metrics Proof Strip */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="p-4 rounded-2xl border bg-card/60 backdrop-blur-sm shadow-xs text-center space-y-1">
            <span className="text-2xl sm:text-3xl font-black text-foreground">Live Web</span>
            <p className="text-xs text-muted-foreground font-medium">Google Search Grounding</p>
          </div>
          <div className="p-4 rounded-2xl border bg-card/60 backdrop-blur-sm shadow-xs text-center space-y-1">
            <span className="text-2xl sm:text-3xl font-black text-primary">60L+</span>
            <p className="text-xs text-muted-foreground font-medium">Annual Exam Aspirants Tracked</p>
          </div>
          <div className="p-4 rounded-2xl border bg-card/60 backdrop-blur-sm shadow-xs text-center space-y-1">
            <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">15-Point</span>
            <p className="text-xs text-muted-foreground font-medium">Holland RIASEC Profiling</p>
          </div>
          <div className="p-4 rounded-2xl border bg-card/60 backdrop-blur-sm shadow-xs text-center space-y-1">
            <span className="text-2xl sm:text-3xl font-black text-foreground">5-Year</span>
            <p className="text-xs text-muted-foreground font-medium">Cashflow & ROI Simulator</p>
          </div>
        </div>

        {/* 6 Core Enterprise Capabilities Section */}
        <div className="mt-24 space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Enterprise-Grade Decision Support Suite
            </h2>
            <p className="text-sm text-muted-foreground">
              Engineered specifically to solve high-stakes academic and career transition dilemmas with verifiable data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, idx) => {
              const Icon = cap.icon;

              return (
                <Link key={idx} href={cap.href} className="group">
                  <Card className="h-full glass-panel border border-border/80 group-hover:border-primary/50 transition-all duration-300 group-hover:shadow-xl flex flex-col justify-between overflow-hidden">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cap.color} flex items-center justify-center ${cap.accent}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-wider bg-secondary/50">
                          {cap.badge}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                          {cap.title}
                          <ArrowRight className="h-4 w-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {cap.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Call to Action Banner */}
        <div className="mt-24 p-8 sm:p-12 rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-background to-emerald-500/10 text-center space-y-6 max-w-4xl mx-auto shadow-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-background text-xs font-bold text-primary">
            <Award className="h-3.5 w-3.5" /> High-End Final Year Capstone Innovation
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
            Ready to experience real-time career intelligence?
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            Test any query or career option with live search grounding, investigate live college cutoffs, or simulate full educational ROI.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/research">
              <Button size="lg" className="rounded-full font-bold px-8 shadow-md">
                Try Deep Research Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/exams">
              <Button variant="outline" size="lg" className="rounded-full font-bold px-6">
                Explore Exam Radar
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
