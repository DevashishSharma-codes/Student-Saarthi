"use client";

import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import {
  BrainCircuit,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Compass,
} from "lucide-react";

export interface RiasecQuestion {
  id: number;
  dimension: "Realistic" | "Investigative" | "Artistic" | "Social" | "Enterprising" | "Conventional";
  question: string;
  context: string;
  options: {
    label: string;
    score: number; // 1 to 4
  }[];
}

const RIASEC_QUESTIONS: RiasecQuestion[] = [
  // Investigative (Analytical & Scientific)
  {
    id: 1,
    dimension: "Investigative",
    question: "When you encounter a complex puzzle or a difficult math problem, how do you typically react?",
    context: "Cognitive Problem-Solving Tendency",
    options: [
      { label: "I am deeply energized and will spend hours dissecting the underlying logic until I solve it.", score: 4 },
      { label: "I enjoy it if there is a systematic formula or framework to follow.", score: 3 },
      { label: "I prefer discussing the conceptual meaning rather than crunching equations.", score: 2 },
      { label: "I find extensive numerical abstractions tedious and prefer hands-on or social tasks.", score: 1 },
    ],
  },
  {
    id: 2,
    dimension: "Investigative",
    question: "Which of these reading topics or documentary subjects would keep you glued to your screen?",
    context: "Intellectual Curiosity Orientation",
    options: [
      { label: "Artificial Intelligence architectures, quantum physics, or biotechnology breakthroughs.", score: 4 },
      { label: "How venture-backed companies scale, market trends, and economic shifts.", score: 3 },
      { label: "Deep psychology, behavioral sociology, and historical geopolitical movements.", score: 2 },
      { label: "Architectural aesthetics, cinema direction, and graphic visual design.", score: 1 },
    ],
  },
  {
    id: 3,
    dimension: "Investigative",
    question: "How do you approach forming opinions on controversial global or technological matters?",
    context: "Epistemological & Data-driven Bias",
    options: [
      { label: "I hunt for raw empirical research papers, statistics, and verifiable benchmarks.", score: 4 },
      { label: "I assess the real-world economic ROI and regulatory implications.", score: 3 },
      { label: "I evaluate the ethical, philosophical, and human humanitarian consequences.", score: 2 },
      { label: "I rely on gut intuition, aesthetic resonance, and creative possibilities.", score: 1 },
    ],
  },

  // Realistic (Technical, Systems & Hands-on)
  {
    id: 4,
    dimension: "Realistic",
    question: "If given a free weekend with open access to a modern makerspace lab, what would you build?",
    context: "Physical & Systems Prototyping",
    options: [
      { label: "Assemble a custom IoT robotics circuit, drone, or high-performance computer rig.", score: 4 },
      { label: "Code a software web dashboard or automated trading script.", score: 3 },
      { label: "Create a multimedia video project, digital painting, or UI prototype.", score: 2 },
      { label: "Host a community workshop, debate club, or peer mentoring session.", score: 1 },
    ],
  },
  {
    id: 5,
    dimension: "Realistic",
    question: "How do you prefer to interact with technology and machinery?",
    context: "Tactile vs Abstract Affinity",
    options: [
      { label: "I want to dismantle the hardware, understand the mechanics, and solder or engineer it.", score: 4 },
      { label: "I want to write algorithmic logic and abstract software systems.", score: 3 },
      { label: "I want to pitch and sell the tech product to enterprise clients.", score: 2 },
      { label: "I care primarily about how intuitive the user interface and visuals feel.", score: 1 },
    ],
  },

  // Artistic (Creative, Design & Expression)
  {
    id: 6,
    dimension: "Artistic",
    question: "When evaluating a newly launched website, smartphone, or building, what catches your eye first?",
    context: "Sensory & Aesthetic Acuity",
    options: [
      { label: "The visual harmony, color psychology, typography, and emotional resonance.", score: 4 },
      { label: "The underlying tech stack, speed, and algorithmic elegance.", score: 2 },
      { label: "The monetization strategy, price point, and market dominance.", score: 3 },
      { label: "How accessible and welcoming it is for diverse everyday users.", score: 1 },
    ],
  },
  {
    id: 7,
    dimension: "Artistic",
    question: "In collaborative school or college projects, which role naturally gravitates toward you?",
    context: "Expressive & Storytelling Preference",
    options: [
      { label: "The Creative Director: crafting the narrative, visual slide deck, and brand identity.", score: 4 },
      { label: "The Analytical Engine: building the data models, graphs, and technical proof.", score: 2 },
      { label: "The Project Lead: pitching the project, delegating tasks, and presenting on stage.", score: 3 },
      { label: "The Empath: ensuring everyone's voice is heard and resolving team friction.", score: 1 },
    ],
  },

  // Enterprising (Leadership, Persuasion & Business)
  {
    id: 8,
    dimension: "Enterprising",
    question: "Suppose your school gave you a ₹10,000 grant for an extracurricular initiative. What is your impulse?",
    context: "Entrepreneurial & Commercial Instinct",
    options: [
      { label: "Launch a micro-business or pop-up venture to generate revenue and reinvest the profits.", score: 4 },
      { label: "Purchase high-end sensors and books to run scientific experiments.", score: 1 },
      { label: "Organize a charitable fundraising drive for a local NGO or shelter.", score: 2 },
      { label: "Produce an independent short film, zine, or art exhibition.", score: 3 },
    ],
  },
  {
    id: 9,
    dimension: "Enterprising",
    question: "How comfortable are you standing before a large skeptical audience to pitch an unconventional idea?",
    context: "Persuasion & Public Presence",
    options: [
      { label: "I thrive on the adrenaline of persuasion, debate, and closing the deal.", score: 4 },
      { label: "I am comfortable if my data and slide deck are mathematically bulletproof.", score: 3 },
      { label: "I prefer smaller, intimate roundtables where we can collaborate gently.", score: 2 },
      { label: "I dislike public sales pitches and prefer doing focused deep work behind the scenes.", score: 1 },
    ],
  },
  {
    id: 10,
    dimension: "Enterprising",
    question: "Which long-term professional status sounds most genuinely satisfying to you?",
    context: "Ambition & Impact Metric",
    options: [
      { label: "Founder / CEO leading a fast-scaling company with hundreds of employees.", score: 4 },
      { label: "Chief Scientist / Distinguished Engineer inventing foundational breakthroughs.", score: 2 },
      { label: "Senior Corporate Lawyer or Investment Banker closing multi-million dollar deals.", score: 3 },
      { label: "Acclaimed Author, Creative Director, or Renowned Cultural Architect.", score: 1 },
    ],
  },

  // Social (Healthcare, Teaching, Community & Empathy)
  {
    id: 11,
    dimension: "Social",
    question: "When a friend or classmate is struggling with severe exam stress or personal dilemmas, what is your stance?",
    context: "Emotional Resonance & Support Drive",
    options: [
      { label: "I naturally pause my own work, listen deeply, and offer empathetic emotional support.", score: 4 },
      { label: "I immediately devise an efficient step-by-step study schedule to solve the root problem.", score: 3 },
      { label: "I cheer them up by taking them to a creative movie, concert, or sports activity.", score: 2 },
      { label: "I feel awkward handling high emotional volatility and prefer objective tasks.", score: 1 },
    ],
  },
  {
    id: 12,
    dimension: "Social",
    question: "If all careers paid the exact same salary, which calling would you find most deeply meaningful?",
    context: "Altruistic Fulfillment Horizon",
    options: [
      { label: "A doctor / clinical psychologist healing patients and saving lives daily.", score: 4 },
      { label: "An astronautical or AI scientist expanding the frontiers of human civilization.", score: 2 },
      { label: "A diplomat or public policy leader reforming national legal and welfare systems.", score: 3 },
      { label: "An artist, musician, or novelist touching millions of human hearts.", score: 1 },
    ],
  },

  // Conventional (Structure, Governance & Financial Precision)
  {
    id: 13,
    dimension: "Conventional",
    question: "How do you feel about rigorous rules, tax audits, spreadsheets, and organizational compliance?",
    context: "Systematic Order & Governance Preference",
    options: [
      { label: "I take pride in precision, zero error rates, and clean, auditable systems.", score: 4 },
      { label: "I tolerate detail work as a means to build greater tech or financial architecture.", score: 3 },
      { label: "I find strict bureaucratic protocols suffocating and prefer flexible ambiguity.", score: 1 },
      { label: "I prefer human conversations over spreadsheets and compliance checklists.", score: 2 },
    ],
  },
  {
    id: 14,
    dimension: "Conventional",
    question: "When planning a 2-week international vacation or major project, what is your style?",
    context: "Planning Rigor vs Spontaneity",
    options: [
      { label: "A minute-by-minute itinerary, cross-referenced budget, and pre-booked tickets.", score: 4 },
      { label: "A high-level milestone roadmap with room to pivot if new opportunities emerge.", score: 3 },
      { label: "Completely spontaneous: land first and figure it out based on the vibe.", score: 1 },
      { label: "Focus purely on finding hidden local culinary and artistic experiences.", score: 2 },
    ],
  },

  // Synthesis & Holistic Work Environment
  {
    id: 15,
    dimension: "Investigative",
    question: "Which of the following daily work environments would make you feel most proud at the end of the day?",
    context: "Ideal Environmental Synergy",
    options: [
      { label: "High-tech research laboratory or high-performance software engineering desk.", score: 4 },
      { label: "Fast-paced corporate boardroom or venture capital investment floor.", score: 3 },
      { label: "Busy hospital ward, courtroom, or academic university hall.", score: 2 },
      { label: "Open creative studio, design workshop, or architecture firm.", score: 1 },
    ],
  },
];

export default function EnhancedQuizPage() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSelectOption = (questionId: number, score: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: score }));
  };

  const nextQuestion = () => {
    if (currentQuestion < RIASEC_QUESTIONS.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const submitQuiz = async () => {
    if (Object.keys(answers).length < RIASEC_QUESTIONS.length) {
      alert("Please answer all 15 psychometric questions before generating guidance.");
      return;
    }

    setLoading(true);

    // Calculate RIASEC dimension totals
    const scores: Record<string, number> = {
      Investigative: 0,
      Realistic: 0,
      Artistic: 0,
      Enterprising: 0,
      Social: 0,
      Conventional: 0,
    };

    RIASEC_QUESTIONS.forEach((q) => {
      const selectedScore = answers[q.id] || 0;
      scores[q.dimension] = (scores[q.dimension] || 0) + selectedScore;
    });

    // Determine Top 2 Primary Archetypes
    const sortedDimensions = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const primaryTrait = sortedDimensions[0][0];
    const secondaryTrait = sortedDimensions[1][0];

    // Summary string for AI ingestion
    const summary = `Psychometric Profile: Primary Archetype is ${primaryTrait}, Secondary Archetype is ${secondaryTrait}. Dimension Breakdown: ${JSON.stringify(
      scores
    )}.`;

    const payload = {
      scores,
      primaryTrait,
      secondaryTrait,
      summary,
    };

    const queryParams = new URLSearchParams({
      psychometric: JSON.stringify(payload),
    });

    router.push(`/guidance?${queryParams.toString()}`);
  };

  const currentQ = RIASEC_QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + 1) / RIASEC_QUESTIONS.length) * 100;
  const isAnswered = answers[currentQ.id] !== undefined;

  return (
    <main className="min-h-screen bg-background relative selection:bg-primary selection:text-primary-foreground">
      <Header />

      <div className="mx-auto max-w-3xl px-4 pt-32 pb-16 flex flex-col items-center justify-center min-h-[85vh]">
        <Card className="w-full glass-panel border border-border/80 shadow-2xl overflow-hidden">
          <CardHeader className="space-y-4 bg-muted/30 border-b border-border/50 pb-6">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-xs bg-background text-primary border-primary/30">
                <BrainCircuit className="h-3.5 w-3.5 mr-1" />
                RIASEC Psychometric Aptitude Engine
              </Badge>
              <span className="text-xs font-semibold text-muted-foreground">
                Question {currentQuestion + 1} of {RIASEC_QUESTIONS.length}
              </span>
            </div>

            <CardTitle className="text-center text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-primary via-emerald-500 to-teal-400 text-transparent bg-clip-text">
              Multi-Dimensional Career Profiler
            </CardTitle>

            <div className="w-full bg-secondary rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </CardHeader>

          <CardContent className="space-y-6 pt-6 p-6 md:p-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-[10px]">
                  {currentQ.dimension} Axis
                </Badge>
                <span className="text-xs text-muted-foreground">• {currentQ.context}</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold leading-relaxed text-foreground">
                {currentQ.question}
              </h3>
            </div>

            <div className="space-y-3 pt-2">
              {currentQ.options.map((opt, idx) => {
                const isSelected = answers[currentQ.id] === opt.score;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(currentQ.id, opt.score)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-start gap-3.5 ${
                      isSelected
                        ? "border-primary bg-primary/10 shadow-sm ring-1 ring-primary"
                        : "border-border/70 bg-card/60 hover:bg-secondary/40 hover:border-border"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-muted-foreground/40 bg-background"
                      }`}
                    >
                      {isSelected && <span className="w-2 h-2 rounded-full bg-background" />}
                    </div>
                    <span className="text-xs md:text-sm font-medium leading-relaxed text-foreground/90">
                      {opt.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-border/50">
              <Button
                variant="outline"
                onClick={previousQuestion}
                disabled={currentQuestion === 0}
                className="rounded-xl text-xs"
              >
                <ArrowLeft className="h-3.5 w-3.5 mr-1" /> Previous
              </Button>

              {currentQuestion === RIASEC_QUESTIONS.length - 1 ? (
                <Button
                  onClick={submitQuiz}
                  disabled={loading || !isAnswered}
                  className="rounded-xl text-xs px-6 font-bold shadow-md"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                      Analyzing Aptitude...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                      Complete & Get Guidance
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={nextQuestion}
                  disabled={!isAnswered}
                  className="rounded-xl text-xs px-5"
                >
                  Next <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              )}
            </div>

            <div className="text-[11px] text-muted-foreground text-center pt-2">
              {Object.keys(answers).length} of {RIASEC_QUESTIONS.length} assessment prompts completed
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
