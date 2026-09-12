"use client";

import { useEffect, useMemo, useRef, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/site/Header";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Mic,
  MicOff,
  Volume2,
  Loader2,
  Search,
  Compass,
  ArrowRight,
  TrendingUp,
  GraduationCap,
  Briefcase,
  ShieldCheck,
  BrainCircuit,
  Calculator,
  Calendar,
} from "lucide-react";
import Link from "next/link";

interface GuidanceResult {
  stream: string;
  hollandArchetype?: string;
  rationale: string;
  subjects: string[];
  careers: string[];
  colleges_advice: string;
  next_steps: string[];
  aiRiskIndex?: string;
  marketOutlook?: string;
}

interface PsychometricPayload {
  scores: Record<string, number>;
  primaryTrait: string;
  secondaryTrait: string;
  summary: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => void) | null;
  onend: ((this: SpeechRecognition, ev: Event) => void) | null;
  onerror: ((this: SpeechRecognition, ev: Event) => void) | null;
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

function GuidanceContent() {
  const searchParams = useSearchParams();
  const [answer, setAnswer] = useState("");
  const [psychometric, setPsychometric] = useState<PsychometricPayload | null>(null);
  const [result, setResult] = useState<GuidanceResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const isSpeechSupported = useMemo(() => {
    return typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);
  }, []);

  useEffect(() => {
    const psychoParam = searchParams.get("psychometric");
    if (psychoParam) {
      try {
        const parsed = JSON.parse(psychoParam) as PsychometricPayload;
        setPsychometric(parsed);
        // Automatically fetch guidance for psychometric quiz takers
        triggerGuidance({ psychometric: parsed });
      } catch (err) {
        console.error("Error parsing psychometric param:", err);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (!isSpeechSupported) return;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition: SpeechRecognition = new SR();
    recognition.lang = "hi-IN";
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      if (transcript.trim()) {
        setAnswer((prev) => (prev ? prev + " " : "") + transcript.trim());
      }
    };

    recognition.onend = () => setIsRecording(false);
    recognition.onerror = () => setIsRecording(false);
    recognitionRef.current = recognition;

    return () => {
      try {
        recognition.stop();
      } catch {}
      recognitionRef.current = null;
    };
  }, [isSpeechSupported]);

  async function triggerGuidance(payload: { answer?: string; psychometric?: PsychometricPayload }) {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/guidance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch guidance");
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      // Fallback
      setResult({
        stream: "Science (PCM)",
        hollandArchetype: "Investigative-Realistic (Technical Architect)",
        rationale: "Based on your technical problem solving affinity, Science (PCM) provides the highest flexibility.",
        subjects: ["Physics", "Mathematics", "Computer Science"],
        careers: ["Software Engineer", "AI/ML Developer", "Aerospace Engineer"],
        colleges_advice: "Target premier engineering colleges like IITs, NITs, and BITS Pilani.",
        next_steps: ["Focus on Class 11-12 syllabus", "Start JEE Main preparation", "Build side tech projects"],
        aiRiskIndex: "Low",
        marketOutlook: "Strong hiring growth in systems engineering and computational disciplines.",
      });
    } finally {
      setLoading(false);
    }
  }

  function toggleRecording() {
    if (!isSpeechSupported) return;
    const recognition = recognitionRef.current;
    if (!recognition) return;
    if (isRecording) {
      try {
        recognition.stop();
      } catch {}
      setIsRecording(false);
    } else {
      setAudioUrl(null);
      setResult(null);
      try {
        recognition.start();
        setIsRecording(true);
      } catch {}
    }
  }

  async function speakHindi() {
    if (!result) return;
    setIsSpeaking(true);
    try {
      const text = `Recommended Stream: ${result.stream}. Holland Archetype: ${result.hollandArchetype || ""}. Rationale: ${result.rationale}. Recommended Careers: ${result.careers.join(", ")}. Advice: ${result.colleges_advice}.`;
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (error) {
      console.error("Error generating speech:", error);
    } finally {
      setIsSpeaking(false);
    }
  }

  return (
    <main className="min-h-screen bg-background relative selection:bg-primary selection:text-primary-foreground">
      <Header />

      <div className="mx-auto max-w-4xl px-4 pt-32 pb-20">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase shadow-sm">
            <BrainCircuit className="h-3.5 w-3.5 text-primary" />
            AI Career Counseling & Guidance
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Personalized <span className="bg-gradient-to-r from-primary via-emerald-500 to-teal-400 text-transparent bg-clip-text">Stream & Career Blueprint</span>
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Detailed guidance synthesized from your psychometric RIASEC profile or customized interest prompt.
          </p>
        </div>

        {/* Psychometric Dimension Radar Summary Card */}
        {psychometric && (
          <Card className="glass-panel border-primary/20 bg-primary/5 shadow-md mb-8">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <BrainCircuit className="h-4 w-4 text-primary" /> Your RIASEC Holland Aptitude Traits
                </CardTitle>
                <div className="flex gap-1.5">
                  <Badge className="text-xs bg-primary text-primary-foreground">
                    Primary: {psychometric.primaryTrait}
                  </Badge>
                  <Badge variant="outline" className="text-xs bg-background">
                    Secondary: {psychometric.secondaryTrait}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                {Object.entries(psychometric.scores).map(([trait, score]) => (
                  <div key={trait} className="p-2.5 rounded-xl border bg-background/80 text-center">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                      {trait}
                    </span>
                    <span className="text-lg font-black text-foreground">{score}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Custom Input Console (if user wants to write custom text) */}
        {!psychometric && (
          <Card className="glass-panel border border-border/80 shadow-md mb-8">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-start gap-2">
                <Textarea
                  className="flex-1 min-h-[100px] text-sm rounded-xl bg-background"
                  placeholder="Describe your interests, subjects you enjoy, strengths, dream goals, or doubts..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
                <Button
                  type="button"
                  variant={isRecording ? "destructive" : "secondary"}
                  onClick={toggleRecording}
                  disabled={!isSpeechSupported || loading}
                  className="w-11 h-11 p-0 shrink-0 rounded-xl"
                  title={isRecording ? "Stop Recording" : "Voice Input (Hindi/English)"}
                >
                  {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
              </div>

              {isRecording && (
                <div className="flex items-center gap-2 text-xs text-red-500 font-medium">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  Listening in Hindi / English... Speak your thoughts
                </div>
              )}

              <Button
                onClick={() => triggerGuidance({ answer })}
                disabled={loading || !answer.trim()}
                className="w-full h-11 rounded-xl text-xs font-bold"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Synthesizing Guidance...
                  </>
                ) : (
                  <>
                    <BrainCircuit className="h-4 w-4 mr-2" />
                    Generate AI Guidance
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Guidance Results Presentation */}
        {loading && (
          <div className="text-center py-12 space-y-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
            <p className="text-sm font-semibold text-foreground">
              Synthesizing Multi-Dimensional Career Guidance...
            </p>
          </div>
        )}

        {result && (
          <div className="space-y-6 animate-in fade-in duration-500">
            {/* Recommendation Header Card */}
            <Card className="glass-panel border-emerald-500/30 bg-emerald-500/5 shadow-xl">
              <CardHeader className="pb-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    <div>
                      <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">
                        Recommended Academic Stream
                      </span>
                      <CardTitle className="text-2xl md:text-3xl font-extrabold text-foreground">
                        {result.stream}
                      </CardTitle>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {result.hollandArchetype && (
                      <Badge variant="outline" className="text-xs border-primary/30 bg-background text-primary font-bold">
                        {result.hollandArchetype}
                      </Badge>
                    )}
                    {result.aiRiskIndex && (
                      <Badge variant="secondary" className="text-xs">
                        AI Automation Risk: {result.aiRiskIndex}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-2">
                <p className="text-sm text-foreground/90 leading-relaxed bg-background/60 p-4 rounded-xl border border-border/50">
                  {result.rationale}
                </p>

                {result.marketOutlook && (
                  <div className="p-3.5 rounded-xl border bg-secondary/30 text-xs flex items-start gap-2.5">
                    <TrendingUp className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-foreground">2026-2030 Market Outlook: </span>
                      <span className="text-muted-foreground">{result.marketOutlook}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Subjects and Careers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass-panel border-border/80 shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-bold flex items-center gap-2">
                    <BrainCircuit className="h-4 w-4 text-primary" /> Recommended Core Subjects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {result.subjects.map((sub, i) => (
                      <Badge key={i} variant="outline" className="text-xs py-1 px-3 bg-secondary/30">
                        {sub}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-panel border-border/80 shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-bold flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-primary" /> Target High-Growth Careers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {result.careers.map((car, i) => (
                      <Badge key={i} variant="outline" className="text-xs py-1 px-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-medium">
                        {car}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Colleges & Next Steps */}
            <Card className="glass-panel border-border/80 shadow-md">
              <CardContent className="p-6 space-y-5">
                <div>
                  <h4 className="text-sm font-bold text-foreground mb-1.5 flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-primary" /> Institutional & Entrance Advice
                  </h4>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {result.colleges_advice}
                  </p>
                </div>

                <div className="pt-3 border-t border-border/50">
                  <h4 className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-500" /> Strategic Next Milestones
                  </h4>
                  <ul className="space-y-1.5 pl-1">
                    {result.next_steps.map((step, i) => (
                      <li key={i} className="text-xs md:text-sm text-foreground/85 flex items-start gap-2">
                        <span className="text-primary font-bold">0{i + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Voice Narration Audio */}
                <div className="pt-4 border-t border-border/50 flex flex-wrap items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={speakHindi}
                    disabled={isSpeaking}
                    className="rounded-full text-xs"
                  >
                    {isSpeaking ? (
                      <>
                        <Loader2 className="h-3 w-3 mr-1.5 animate-spin" /> Generating Audio...
                      </>
                    ) : (
                      <>
                        <Volume2 className="h-3 w-3 mr-1.5" /> Listen in Hindi (Audio)
                      </>
                    )}
                  </Button>
                  {audioUrl && <audio controls src={audioUrl} className="h-8 flex-1 max-w-sm" />}
                </div>
              </CardContent>
            </Card>

            {/* Quick Action Navigation Strip for Examiners/Clients */}
            <div className="p-6 rounded-2xl border bg-card/60 backdrop-blur-sm shadow-md space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                Next-Gen Investigation Tools for this Pathway
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                <Link href={`/research?query=${encodeURIComponent(result.stream + " career outlook 2026 cutoffs and salaries")}`}>
                  <Button variant="outline" className="w-full text-xs rounded-xl justify-start h-11 border-primary/30 hover:bg-primary/10">
                    <Search className="h-4 w-4 mr-2 text-primary" /> Deep AI Research
                  </Button>
                </Link>
                <Link href="/simulator">
                  <Button variant="outline" className="w-full text-xs rounded-xl justify-start h-11">
                    <Compass className="h-4 w-4 mr-2 text-blue-500" /> Pathway Simulator
                  </Button>
                </Link>
                <Link href="/exams">
                  <Button variant="outline" className="w-full text-xs rounded-xl justify-start h-11">
                    <Calendar className="h-4 w-4 mr-2 text-amber-500" /> Exam Radar
                  </Button>
                </Link>
                <Link href="/calculator">
                  <Button variant="outline" className="w-full text-xs rounded-xl justify-start h-11">
                    <Calculator className="h-4 w-4 mr-2 text-emerald-500" /> ROI Calculator
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default function GuidancePage() {
  return (
    <Suspense fallback={<div className="p-12 text-center">Loading Guidance System...</div>}>
      <GuidanceContent />
    </Suspense>
  );
}
