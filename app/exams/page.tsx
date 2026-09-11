"use client";

import { useState } from "react";
import { Header } from "@/components/site/Header";
import { ENTRANCE_EXAMS, EntranceExam } from "@/lib/examData";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  ExternalLink,
  Search,
  Sparkles,
  Users,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  Flame,
  Loader2,
  RefreshCw,
  ShieldAlert,
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

export default function ExamRadarPage() {
  const [selectedStream, setSelectedStream] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const [verificationData, setVerificationData] = useState<Record<string, VerificationResult>>({});

  const filteredExams = ENTRANCE_EXAMS.filter((exam) => {
    const matchesStream = selectedStream === "All" || exam.stream === selectedStream;
    const matchesQuery =
      exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.conductingBody.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStream && matchesQuery;
  });

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
      if (res.ok) {
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
    <main className="min-h-screen bg-background relative selection:bg-primary selection:text-primary-foreground">
      <Header />

      <div className="mx-auto max-w-6xl px-4 pt-32 pb-20">
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase shadow-sm">
            <Clock className="h-3.5 w-3.5 text-primary" />
            2025 - 2026 National Entrance Opportunity Radar
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Live Entrance Exam <span className="bg-gradient-to-r from-primary via-emerald-500 to-teal-400 text-transparent bg-clip-text">Radar & Tracker</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg">
            Stay ahead of critical application deadlines, official notifications, applicant volumes, and verified dates with live AI fact-checking.
          </p>
        </div>

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-2xl border bg-card/60 backdrop-blur-sm shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              {ENTRANCE_EXAMS.length}
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Tracked Exams</p>
              <p className="text-sm font-bold">Major National</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl border bg-card/60 backdrop-blur-sm shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              {ENTRANCE_EXAMS.filter((e) => e.status === "Registration Open").length}
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Active Now</p>
              <p className="text-sm font-bold">Open Windows</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl border bg-card/60 backdrop-blur-sm shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              60L+
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Candidate Pool</p>
              <p className="text-sm font-bold">Annual Test-Takers</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl border bg-card/60 backdrop-blur-sm shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Live AI Check</p>
              <p className="text-sm font-bold">Search Grounded</p>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by exam name (JEE, NEET, CUET, CLAT...) or conducting agency (NTA, IIT, UPSC)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 rounded-xl bg-background shadow-inner text-base"
            />
          </div>

          {/* Stream Pills */}
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

        {/* Exam Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredExams.map((exam) => {
            const isVerifying = verifyingId === exam.id;
            const verified = verificationData[exam.id];

            return (
              <Card
                key={exam.id}
                className="glass-panel border-border/80 hover:border-primary/40 transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <Badge variant="secondary" className="text-xs font-semibold">
                      {exam.stream}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`text-xs font-medium ${
                        exam.status === "Registration Open"
                          ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : exam.status === "Announced"
                          ? "border-blue-500/50 bg-blue-500/10 text-blue-600 dark:text-blue-400"
                          : "border-amber-500/50 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 animate-pulse" />
                      {exam.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold flex items-center justify-between">
                    <span>{exam.name}</span>
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">
                    Conducted by: <span className="font-semibold text-foreground/80">{exam.conductingBody}</span>
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 pt-0">
                  <p className="text-sm text-foreground/85 leading-relaxed">{exam.description}</p>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-border/40">
                    <div className="flex items-center gap-1.5 py-1 text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5 text-primary" />
                      <span>{exam.examDateEstimate}</span>
                    </div>
                    <div className="flex items-center gap-1.5 py-1 text-muted-foreground">
                      <Users className="h-3.5 w-3.5 text-primary" />
                      <span>{exam.annualApplicants} candidates</span>
                    </div>
                    <div className="flex items-center gap-1.5 py-1 text-muted-foreground">
                      <Award className="h-3.5 w-3.5 text-primary" />
                      <span>{exam.seatsOffered}</span>
                    </div>
                    <div className="flex items-center gap-1.5 py-1 text-muted-foreground">
                      <Flame className="h-3.5 w-3.5 text-amber-500" />
                      <span>Difficulty: {exam.difficultyRating}/5.0</span>
                    </div>
                  </div>

                  {/* Key Subject Tags */}
                  <div>
                    <span className="text-[11px] font-semibold text-muted-foreground block mb-1.5">
                      Tested Core Subjects:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {exam.keySubjects.map((sub, i) => (
                        <Badge key={i} variant="outline" className="text-[10px] bg-secondary/30">
                          {sub}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Live AI Status Result Drawer */}
                  {verified && (
                    <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/5 text-xs space-y-2 animate-in fade-in duration-300">
                      <div className="flex items-center justify-between font-semibold text-emerald-600 dark:text-emerald-400">
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Live AI Web Verification
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {new Date(verified.verifiedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                      <p className="text-foreground/90 whitespace-pre-line leading-relaxed">
                        {verified.statusUpdate}
                      </p>
                      {verified.sources.length > 0 && (
                        <div className="pt-1 flex flex-wrap gap-1">
                          {verified.sources.slice(0, 3).map((src, i) => (
                            <a
                              key={i}
                              href={src.url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[10px] text-primary underline truncate max-w-[200px]"
                            >
                              🔗 {src.title}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-2 border-t border-border/50">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleVerifyLive(exam)}
                      disabled={isVerifying}
                      className="flex-1 text-xs rounded-lg"
                    >
                      {isVerifying ? (
                        <>
                          <Loader2 className="h-3 w-3 mr-1.5 animate-spin text-primary" />
                          Checking Web...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="h-3 w-3 mr-1.5 text-primary" />
                          Live Date Check
                        </>
                      )}
                    </Button>

                    <a href={exam.officialUrl} target="_blank" rel="noreferrer" className="flex-1">
                      <Button size="sm" className="w-full text-xs rounded-lg">
                        Official Portal <ExternalLink className="h-3 w-3 ml-1.5" />
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredExams.length === 0 && (
          <div className="text-center py-16 space-y-3">
            <ShieldAlert className="h-10 w-10 text-muted-foreground mx-auto" />
            <h3 className="font-semibold text-lg">No matching examinations found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search keywords or switching stream filters.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
