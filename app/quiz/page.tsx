"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { useRouter } from "next/navigation";
import {
  BrainCircuit,
  Compass,
  ArrowRight,
  ArrowLeft,
  Loader2,
  CheckCircle2,
} from "lucide-react";

export interface RiasecQuestion {
  id: number;
  dimension: "Realistic" | "Investigative" | "Artistic" | "Social" | "Enterprising" | "Conventional";
  question: string;
  context: string;
  options: {
    label: string;
    score: number;
  }[];
}

const RIASEC_QUESTIONS: RiasecQuestion[] = [
  {
    id: 1,
    dimension: "Investigative",
    question: "When you encounter a complex puzzle or difficult math problem, how do you react?",
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
    question: "How do you approach forming opinions on controversial technological matters?",
    context: "Epistemological & Data-driven Bias",
    options: [
      { label: "I hunt for raw empirical research papers, statistics, and verifiable benchmarks.", score: 4 },
      { label: "I assess the real-world economic ROI and regulatory implications.", score: 3 },
      { label: "I evaluate the ethical, philosophical, and human humanitarian consequences.", score: 2 },
      { label: "I rely on gut intuition, aesthetic resonance, and creative possibilities.", score: 1 },
    ],
  },
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
      { label: "I want to dismantle hardware, understand mechanics, and solder or engineer it.", score: 4 },
      { label: "I want to write algorithmic logic and abstract software systems.", score: 3 },
      { label: "I want to pitch and sell tech products to enterprise clients.", score: 2 },
      { label: "I care primarily about intuitive user interface and visuals.", score: 1 },
    ],
  },
  {
    id: 6,
    dimension: "Artistic",
    question: "When evaluating a newly launched website or physical product, what catches your eye first?",
    context: "Sensory & Aesthetic Acuity",
    options: [
      { label: "Visual harmony, color psychology, typography, and emotional resonance.", score: 4 },
      { label: "Underlying tech stack, speed, and algorithmic elegance.", score: 2 },
      { label: "Monetization strategy, price point, and market dominance.", score: 3 },
      { label: "How accessible and welcoming it is for everyday users.", score: 1 },
    ],
  },
  {
    id: 7,
    dimension: "Artistic",
    question: "In collaborative school or college projects, which role naturally gravitates toward you?",
    context: "Expressive & Storytelling Preference",
    options: [
      { label: "The Creative Director: crafting the narrative, visual slide deck, and brand identity.", score: 4 },
      { label: "The Analytical Engine: building data models, graphs, and technical proof.", score: 2 },
      { label: "The Project Lead: pitching the project, delegating tasks, and presenting on stage.", score: 3 },
      { label: "The Empath: ensuring everyone's voice is heard and resolving team friction.", score: 1 },
    ],
  },
  {
    id: 8,
    dimension: "Enterprising",
    question: "Suppose your school gave you a ₹10,000 grant for an extracurricular initiative. What is your impulse?",
    context: "Entrepreneurial & Commercial Instinct",
    options: [
      { label: "Launch a micro-business or venture to generate revenue and reinvest the profits.", score: 4 },
      { label: "Purchase high-end sensors and books to run scientific experiments.", score: 1 },
      { label: "Organize a charitable fundraising drive for a local NGO or shelter.", score: 2 },
      { label: "Produce an independent short film, publication, or art exhibition.", score: 3 },
    ],
  },
  {
    id: 9,
    dimension: "Enterprising",
    question: "How comfortable are you standing before an audience to pitch an unconventional idea?",
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
      { label: "Founder / CEO leading a fast-scaling company with hundreds of team members.", score: 4 },
      { label: "Chief Scientist / Distinguished Engineer inventing foundational breakthroughs.", score: 2 },
      { label: "Senior Corporate Lawyer or Investment Banker closing multi-million dollar deals.", score: 3 },
      { label: "Acclaimed Author, Creative Director, or Cultural Architect.", score: 1 },
    ],
  },
  {
    id: 11,
    dimension: "Social",
    question: "When a friend is struggling with severe exam stress or personal dilemmas, what is your stance?",
    context: "Emotional Resonance & Support Drive",
    options: [
      { label: "I naturally pause my own work, listen deeply, and offer empathetic emotional support.", score: 4 },
      { label: "I immediately devise an efficient step-by-step study schedule to solve the root problem.", score: 3 },
      { label: "I cheer them up by taking them out for a creative activity or sports.", score: 2 },
      { label: "I feel awkward handling emotional volatility and prefer objective tasks.", score: 1 },
    ],
  },
  {
    id: 12,
    dimension: "Social",
    question: "If all careers paid the exact same salary, which calling would you find most deeply meaningful?",
    context: "Altruistic Fulfillment Horizon",
    options: [
      { label: "A doctor / clinical psychologist healing patients and saving lives daily.", score: 4 },
      { label: "An astronautical or AI scientist expanding human civilization frontiers.", score: 2 },
      { label: "A diplomat or public policy leader reforming legal and welfare systems.", score: 3 },
      { label: "An artist, musician, or novelist touching millions of human hearts.", score: 1 },
    ],
  },
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
    question: "When planning a major journey or complex project, what is your style?",
    context: "Planning Rigor vs Spontaneity",
    options: [
      { label: "A minute-by-minute itinerary, cross-referenced budget, and pre-booked milestones.", score: 4 },
      { label: "A high-level milestone roadmap with room to pivot if new opportunities emerge.", score: 3 },
      { label: "Completely spontaneous: land first and figure it out based on the vibe.", score: 1 },
      { label: "Focus purely on finding hidden local culinary and artistic experiences.", score: 2 },
    ],
  },
  {
    id: 15,
    dimension: "Investigative",
    question: "Which daily work environment would make you feel most proud at the end of the day?",
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

    const sortedDimensions = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const primaryTrait = sortedDimensions[0][0];
    const secondaryTrait = sortedDimensions[1][0];

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
    <main
      style={{
        backgroundImage: "url('/quiz-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
      }}
      className="min-h-screen text-[#0f291e] selection:bg-[#0f291e] selection:text-white relative font-sans flex flex-col justify-between overflow-x-hidden"
    >
      {/* =========================================================================
          FIXED CYAN-TEAL TEXTURED WAVE GRADIENT BACKGROUND LAYER
          ========================================================================= */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="/quiz-bg.png"
          alt="Aptitude Cyan-Teal Wallpaper"
          className="w-full h-full object-cover object-top pointer-events-none select-none"
        />
        <div className="absolute inset-0 bg-white/[0.04] backdrop-blur-[0.5px]" />
      </div>

      <Header />

      {/* =========================================================================
          HERO & CONTROL SECTION
          ========================================================================= */}
      <section className="w-full max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-10 pt-24 sm:pt-28 pb-12 space-y-8 relative z-10">
        
        {/* Centered Editorial Headline Header (Clean Light Colors for High Contrast) */}
        <div className="space-y-3 max-w-3xl mx-auto text-center flex flex-col items-center">
          <h1 className="font-normal text-3xl sm:text-5xl lg:text-[3.5rem] text-white tracking-[-0.035em] leading-[1.08] drop-shadow-[0_3px_16px_rgba(0,0,0,0.30)] text-center">
            Aptitude &amp; Holland Code Test
            <span className="block font-serif italic text-emerald-100 font-normal mt-0.5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
              15-point empirical psychometric engine.
            </span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-white/90 leading-relaxed font-light max-w-2xl mx-auto text-center drop-shadow-[0_1px_6px_rgba(0,0,0,0.25)]">
            Evaluates Realistic, Investigative, Artistic, Social, Enterprising, and Conventional traits to synthesize an empirically matched academic stream.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {/* Progress Bar in Clean Frosted Glass */}
          <div
            style={{
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.88) 0%, rgba(245, 250, 252, 0.80) 100%)",
              backdropFilter: "blur(28px) saturate(140%)",
              WebkitBackdropFilter: "blur(28px) saturate(140%)",
            }}
            className="border border-white/90 rounded-none p-3.5 sm:p-4 shadow-[0_16px_40px_rgba(0,0,0,0.08),inset_0_1px_2px_rgba(255,255,255,0.95)] space-y-2.5"
          >
            <div className="flex items-center justify-between text-xs font-mono font-bold text-neutral-800">
              <span className="tracking-wide">QUESTION {String(currentQuestion + 1).padStart(2, "0")} / {RIASEC_QUESTIONS.length}</span>
              <span className="px-2.5 py-0.5 bg-white/90 border border-neutral-200/80 text-emerald-900 tracking-wider shadow-2xs">
                DIMENSION: {currentQ.dimension.toUpperCase()}
              </span>
            </div>
            <div className="w-full h-1.5 bg-neutral-200/80 overflow-hidden rounded-none">
              <div
                className="h-full bg-emerald-700 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Card (Clean High-Contrast Glassmorphism) */}
          <div
            style={{
              background: "linear-gradient(180deg, rgba(255, 255, 255, 0.92) 0%, rgba(255, 255, 255, 0.80) 50%, rgba(248, 252, 252, 0.88) 100%)",
              backdropFilter: "blur(32px) saturate(140%)",
              WebkitBackdropFilter: "blur(32px) saturate(140%)",
              boxShadow: "inset 0 1px 2px rgba(255, 255, 255, 0.95), 0 20px 45px rgba(0, 0, 0, 0.10)",
            }}
            className="p-6 sm:p-9 rounded-none border border-white/90 shadow-sm space-y-6"
          >
            <div className="space-y-2 border-b border-black/10 pb-4">
              <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-900 font-bold bg-emerald-50 px-2.5 py-0.5 border border-emerald-200/80">
                {currentQ.context}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 leading-snug pt-1">
                {currentQ.question}
              </h2>
            </div>

            {/* Options Matrix */}
            <div className="space-y-3 pt-1">
              {currentQ.options.map((option, idx) => {
                const isSelected = answers[currentQ.id] === option.score;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(currentQ.id, option.score)}
                    className={`w-full p-4 rounded-none border text-left text-xs sm:text-sm transition-all flex items-start gap-3.5 group cursor-pointer ${
                      isSelected
                        ? "bg-[#0a1e16] text-white border-[#0a1e16] font-semibold shadow-xs"
                        : "bg-white/85 hover:bg-white text-neutral-800 border-neutral-200/80 hover:border-neutral-400 shadow-2xs font-normal"
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-none border shrink-0 mt-0.5 flex items-center justify-center text-[10px] ${
                        isSelected
                          ? "border-white bg-white text-[#0a1e16] font-bold"
                          : "border-neutral-400"
                      }`}
                    >
                      {isSelected && "✓"}
                    </span>
                    <span className="leading-relaxed">{option.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Navigation Controls */}
            <div className="pt-6 border-t border-black/10 flex items-center justify-between">
              <button
                onClick={previousQuestion}
                disabled={currentQuestion === 0}
                className="px-4 py-2 text-xs font-semibold border border-neutral-200/80 bg-white hover:bg-neutral-100 text-neutral-800 rounded-none transition-all disabled:opacity-30 flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed shadow-2xs"
              >
                <ArrowLeft size={13} /> Previous
              </button>

              {currentQuestion < RIASEC_QUESTIONS.length - 1 ? (
                <button
                  onClick={nextQuestion}
                  disabled={!isAnswered}
                  className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#0a1e16] hover:bg-black text-white rounded-none transition-all disabled:opacity-40 flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed shadow-xs"
                >
                  Next <ArrowRight size={13} />
                </button>
              ) : (
                <button
                  onClick={submitQuiz}
                  disabled={!isAnswered || loading}
                  className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#0a1e16] hover:bg-black text-white rounded-none transition-all disabled:opacity-40 flex items-center gap-1.5 shadow-md cursor-pointer disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 size={13} className="animate-spin" /> Synthesizing...
                    </>
                  ) : (
                    <>
                      <Compass size={13} /> Generate Blueprint
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Clean Minimalist Footer with Light Contrasting Text */}
      <footer className="w-full max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-10 py-6 border-t border-white/30 bg-black/20 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/90 font-medium relative z-10">
        <div className="flex items-center gap-2">
          <span className="font-bold text-white">Student Saarthi</span>
          <span>•</span>
          <span>Psychometric Aptitude &amp; Career Modeling</span>
        </div>
        <div className="flex items-center gap-6 text-white/90">
          <Link href="/research" className="hover:text-white transition-colors">Deep Research</Link>
          <Link href="/exams" className="hover:text-white transition-colors">Exam Radar</Link>
          <Link href="/colleges" className="hover:text-white transition-colors">Colleges</Link>
          <Link href="/simulator" className="hover:text-white transition-colors">Simulator</Link>
          <Link href="/calculator" className="hover:text-white transition-colors">ROI Calculator</Link>
        </div>
        <div>
          <span>© 2026 Student Saarthi. All rights reserved.</span>
        </div>
      </footer>
    </main>
  );
}
