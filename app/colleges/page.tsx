"use client";

import { useState } from "react";
import { Header } from "@/components/site/Header";
import { COLLEGE_DIRECTORY, CollegeProfile } from "@/lib/collegeData";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  MapPin,
  Star,
  Search,
  Sparkles,
  DollarSign,
  TrendingUp,
  GraduationCap,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ExternalLink,
  Award,
  Layers,
  HelpCircle,
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

    try {
      const res = await fetch("/api/colleges/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collegeName: nameToEval }),
      });

      const data = await res.json();
      if (res.ok) {
        setEvalResult({
          college: nameToEval,
          text: data.evaluation,
          sources: data.sources || [],
        });
      }
    } catch (err) {
      console.error("Evaluation failed:", err);
    } finally {
      setEvaluatingName(null);
    }
  };

  return (
    <main className="min-h-screen bg-background relative selection:bg-primary selection:text-primary-foreground">
      <Header />

      <div className="mx-auto max-w-6xl px-4 pt-32 pb-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase shadow-sm">
            <Building2 className="h-3.5 w-3.5 text-primary" />
            Verified Higher Education Intelligence
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Top Colleges & <span className="bg-gradient-to-r from-primary via-emerald-500 to-teal-400 text-transparent bg-clip-text">Live Institutional Audit</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg">
            Explore premier institutions across India with verified fee structures, median placement compensation, and real-time AI fact-checking.
          </p>
        </div>

        {/* Custom College Live Evaluator Banner */}
        <Card className="glass-panel border-primary/30 bg-primary/5 shadow-md mb-10 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 text-primary font-bold text-sm">
                  <Sparkles className="h-4 w-4" />
                  Live AI Fact-Checker: Evaluate ANY College in India
                </div>
                <p className="text-xs text-muted-foreground">
                  Type any university, state college, or private campus to pull real-time placement stats, NIRF tier, and student red flags.
                </p>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <Input
                  placeholder="e.g. Thapar University, Manipal, Delhi University..."
                  value={customCollege}
                  onChange={(e) => setCustomCollege(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleEvaluate(customCollege)}
                  className="h-10 text-xs bg-background rounded-xl min-w-[240px]"
                />
                <Button
                  onClick={() => handleEvaluate(customCollege)}
                  disabled={evaluatingName === customCollege || !customCollege.trim()}
                  className="h-10 text-xs rounded-xl px-4 shrink-0"
                >
                  {evaluatingName === customCollege ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                      Scanning...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                      Audit
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Evaluation Result Display */}
        {evalResult && (
          <Card className="glass-panel border-emerald-500/30 bg-card/90 shadow-xl mb-10 animate-in fade-in duration-500">
            <CardHeader className="bg-emerald-500/10 border-b border-emerald-500/20 pb-3 flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <div>
                  <CardTitle className="text-base font-bold">
                    Live Audit Report: {evalResult.college}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Synthesized from real-time web sources and verified campus data
                  </CardDescription>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEvalResult(null)}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Close Audit
              </Button>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="prose prose-sm dark:prose-invert max-w-none text-foreground/90 whitespace-pre-line leading-relaxed">
                {evalResult.text}
              </div>

              {evalResult.sources.length > 0 && (
                <div className="pt-3 border-t border-border/50">
                  <span className="text-xs font-semibold text-muted-foreground block mb-2">
                    Verified Reference Sources:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {evalResult.sources.map((src, i) => (
                      <a
                        key={i}
                        href={src.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] bg-secondary border hover:text-primary transition-colors"
                      >
                        <ExternalLink className="h-3 w-3" />
                        <span className="truncate max-w-[180px]">{src.title}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Search & Stream Filter Controls */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search directory by college name, city (Mumbai, Delhi, Chennai), degree or program..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 rounded-xl bg-background shadow-inner text-base"
            />
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {STREAMS.map((s) => (
              <Button
                key={s}
                variant={selectedStream === s ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedStream(s)}
                className="rounded-full text-xs transition-all"
              >
                {s}
              </Button>
            ))}
          </div>
        </div>

        {/* College Directory Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredColleges.map((college) => {
            const isAuditing = evaluatingName === college.name;

            return (
              <Card
                key={college.id}
                className="glass-panel border-border/80 hover:border-primary/40 transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <Badge variant="secondary" className="text-[11px] font-semibold">
                      {college.stream}
                    </Badge>
                    <Badge variant="outline" className="text-[11px] font-medium bg-secondary/30">
                      NIRF #{college.nirfRank}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-bold leading-tight">
                    {college.name}
                  </CardTitle>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-0.5">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    <span>
                      {college.city}, {college.state}
                    </span>
                    <span className="text-muted-foreground/40">•</span>
                    <span className="font-medium text-foreground/70">{college.type}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 pt-0">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {college.highlight}
                  </p>

                  {/* Financial & Placement Snapshot */}
                  <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-secondary/30 border border-border/40 text-xs">
                    <div>
                      <span className="text-[10px] text-muted-foreground block">Approx. Tuition</span>
                      <span className="font-bold text-foreground">{college.annualFeesEstimate}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-muted-foreground block">Median CTC (Est.)</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        {college.medianCtcEstimate}
                      </span>
                    </div>
                  </div>

                  {/* Admission Gateway */}
                  <div className="text-xs flex items-center justify-between text-muted-foreground pt-1">
                    <span>Admission Gateway:</span>
                    <Badge variant="outline" className="text-[11px] font-semibold text-primary">
                      {college.admissionExam}
                    </Badge>
                  </div>

                  {/* Programs */}
                  <div>
                    <span className="text-[11px] font-medium text-muted-foreground block mb-1">
                      Flagship Programs:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {college.popularPrograms.map((prog, i) => (
                        <Badge key={i} variant="outline" className="text-[10px] bg-background">
                          {prog}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Audit Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEvaluate(college.name)}
                    disabled={isAuditing}
                    className="w-full text-xs rounded-xl mt-2 border-primary/30 hover:bg-primary/10"
                  >
                    {isAuditing ? (
                      <>
                        <Loader2 className="h-3 w-3 mr-1.5 animate-spin text-primary" />
                        Running Live Audit...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-3 w-3 mr-1.5 text-primary" />
                        Live AI Fact-Check
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </main>
  );
}
