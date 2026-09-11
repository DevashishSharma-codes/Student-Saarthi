"use client";

import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Search,
  ExternalLink,
  Printer,
  ShieldCheck,
  TrendingUp,
  GraduationCap,
  DollarSign,
  AlertCircle,
  Loader2,
  Share2,
  Compass,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

interface SourceItem {
  title: string;
  url: string;
}

interface ResearchResponse {
  success: boolean;
  report: string;
  sources: SourceItem[];
  webSearchQueries: string[];
  timestamp: string;
}

const PRESET_QUERIES = [
  "AI & Machine Learning Engineering vs Data Science 2026",
  "Corporate Law via CLAT: Top NLUs, Fees & Tier-1 Law Firm ROI",
  "Bioinformatics & Genetic Engineering Career Prospects in India",
  "CUET Strategy for Economics Honours in Top Delhi University Colleges",
  "Product Design via NID/UCEED: Salaries, Tech Industry Demand & Portfolio",
  "Chartered Accountancy vs CFA vs Investment Banking in India",
];

export default function DeepResearchPage() {
  const [query, setQuery] = useState("");
  const [stream, setStream] = useState("All Streams");
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResearchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSearch = async (targetQuery?: string) => {
    const searchQuery = targetQuery || query;
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: searchQuery,
          stream: stream === "All Streams" ? undefined : stream,
          budgetRange: budget.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to conduct deep research.");
      }

      setResult(data);
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <main className="min-h-screen bg-background relative selection:bg-primary selection:text-primary-foreground">
      <Header />

      <div className="mx-auto max-w-6xl px-4 pt-32 pb-20">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase shadow-sm">
            <Sparkles className="h-3.5 w-3.5 animate-spin text-primary" style={{ animationDuration: "3s" }} />
            Gemini 2.5 Real-Time Web Grounding
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Autonomous <span className="bg-gradient-to-r from-primary via-emerald-500 to-teal-400 text-transparent bg-clip-text">Deep Career Research</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg">
            Investigate real-time market trends, actual college cutoffs, NIRF shifts, and AI disruption indices. Grounded directly in live Google search data.
          </p>
        </div>

        {/* Research Query Console */}
        <Card className="glass-panel border border-border/80 shadow-xl max-w-4xl mx-auto overflow-hidden">
          <CardHeader className="bg-muted/30 pb-4 border-b border-border/50">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-primary" />
                <CardTitle className="text-lg font-semibold">Live Intelligence Engine</CardTitle>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Google Search Grounding Connected
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Input
                  placeholder="e.g. AI Engineering vs Cybersecurity jobs in 2026, or Top Design colleges under 10 Lakhs..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="h-12 pl-4 pr-10 text-base rounded-xl shadow-inner bg-background"
                />
              </div>
              <Button
                onClick={() => handleSearch()}
                disabled={loading || !query.trim()}
                className="h-12 px-6 rounded-xl font-medium shadow-md transition-all duration-200"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Investigating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Deep Research
                  </>
                )}
              </Button>
            </div>

            {/* Optional Filter Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                  Target Stream (Optional)
                </label>
                <select
                  value={stream}
                  onChange={(e) => setStream(e.target.value)}
                  className="w-full h-9 rounded-lg border border-input bg-background px-3 text-xs focus:outline-none focus:ring-1 focus:ring-ring"
                >
                  <option>All Streams</option>
                  <option>Science (PCM / Tech)</option>
                  <option>Science (PCB / Healthcare)</option>
                  <option>Commerce & Finance</option>
                  <option>Humanities & Social Sciences</option>
                  <option>Design & Media</option>
                  <option>Law & Public Policy</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                  Budget Constraint (Optional)
                </label>
                <Input
                  placeholder="e.g. Under ₹6 Lakhs total, or Govt only"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="h-9 text-xs rounded-lg bg-background"
                />
              </div>
            </div>

            {/* Preset Query Chips */}
            <div className="pt-2">
              <span className="text-xs text-muted-foreground block mb-2 font-medium">
                Try popular research topics:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_QUERIES.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setQuery(item);
                      handleSearch(item);
                    }}
                    className="text-xs px-2.5 py-1 rounded-full border bg-secondary/50 hover:bg-primary/10 hover:border-primary/40 transition-colors text-left text-muted-foreground hover:text-foreground"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Loading Visualizer */}
        {loading && (
          <div className="max-w-3xl mx-auto my-12 text-center space-y-4 animate-in fade-in duration-500">
            <div className="inline-flex p-4 rounded-2xl bg-primary/10 border border-primary/20 text-primary">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-lg">Synthesizing Real-Time Career Intelligence...</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Scanning live university cutoffs, industry hiring indexes, and market compensation data for verified ground truth.
              </p>
            </div>
            <div className="flex justify-center items-center gap-6 pt-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Live Google Search
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> AI Disruption Risk Model
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> ROI Verification
              </span>
            </div>
          </div>
        )}

        {/* Error Notification */}
        {error && (
          <div className="max-w-4xl mx-auto my-8 p-4 rounded-xl border border-destructive/30 bg-destructive/10 text-destructive flex items-center gap-3">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Dossier Report Presentation */}
        {result && (
          <div className="mt-12 space-y-8 animate-in fade-in duration-700">
            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border bg-card/60 backdrop-blur-sm shadow-sm">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-500" />
                <span className="font-semibold text-sm">Verified Executive Dossier</span>
                <Badge variant="outline" className="text-xs bg-muted">
                  {new Date(result.timestamp).toLocaleDateString()}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleShare} className="rounded-full text-xs">
                  <Share2 className="h-3.5 w-3.5 mr-1" />
                  {copied ? "Link Copied!" : "Share"}
                </Button>
                <Button variant="outline" size="sm" onClick={handlePrint} className="rounded-full text-xs">
                  <Printer className="h-3.5 w-3.5 mr-1" />
                  Print / Save PDF
                </Button>
                <Link href="/simulator">
                  <Button size="sm" className="rounded-full text-xs bg-primary hover:bg-primary/90">
                    <Compass className="h-3.5 w-3.5 mr-1" />
                    Simulate Pathway
                  </Button>
                </Link>
              </div>
            </div>

            {/* Live Web Sources Banner */}
            {result.sources.length > 0 && (
              <Card className="glass-panel border-emerald-500/20 bg-emerald-500/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                    <ExternalLink className="h-4 w-4" /> Ground Truth Citations & Live Sources
                  </CardTitle>
                  <CardDescription className="text-xs">
                    This dossier is synthesized from active web references:
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {result.sources.map((src, i) => (
                      <a
                        key={i}
                        href={src.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-background/80 hover:bg-background border text-foreground/80 hover:text-primary transition-all shadow-xs"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span className="truncate max-w-[200px]">{src.title}</span>
                        <ExternalLink className="h-3 w-3 opacity-60" />
                      </a>
                    ))}
                  </div>
                  {result.webSearchQueries.length > 0 && (
                    <div className="mt-3 text-xs text-muted-foreground flex items-center gap-2">
                      <span className="font-medium">Queries Run:</span>
                      {result.webSearchQueries.map((q, idx) => (
                        <Badge key={idx} variant="secondary" className="text-[10px]">
                          {q}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Main Report Container */}
            <Card className="glass-panel border shadow-xl print:shadow-none print:border-none">
              <CardContent className="p-6 md:p-10 space-y-6">
                <div className="prose prose-neutral dark:prose-invert max-w-none text-foreground leading-relaxed">
                  {/* Render Markdown sections cleanly */}
                  {result.report.split("\n\n").map((paragraph, index) => {
                    if (paragraph.startsWith("### ")) {
                      return (
                        <h3 key={index} className="text-xl md:text-2xl font-bold mt-8 mb-3 text-primary border-b border-border/50 pb-2">
                          {paragraph.replace("### ", "")}
                        </h3>
                      );
                    }
                    if (paragraph.startsWith("## ")) {
                      return (
                        <h2 key={index} className="text-2xl md:text-3xl font-extrabold mt-8 mb-4 text-foreground">
                          {paragraph.replace("## ", "")}
                        </h2>
                      );
                    }
                    if (paragraph.startsWith("- ")) {
                      return (
                        <ul key={index} className="list-disc pl-5 space-y-1 my-2">
                          {paragraph.split("\n").map((line, liIdx) => (
                            <li key={liIdx} className="text-sm md:text-base text-foreground/90">
                              {line.replace(/^[-\*]\s+/, "")}
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    return (
                      <p key={index} className="text-sm md:text-base text-foreground/85 leading-relaxed my-2 whitespace-pre-line">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </main>
  );
}
