import Link from "next/link";
import { GraduationCap, Sparkles, ShieldCheck, Heart, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-muted/20 backdrop-blur-md pt-16 pb-12 text-foreground/80">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2 font-extrabold text-lg text-foreground">
              <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <GraduationCap className="h-4 w-4" />
              </div>
              <span>Student Saarthi</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              An enterprise-grade, real-time AI career intelligence and decision support platform powered by Gemini 2.5 and live web grounding.
            </p>
            <div className="flex items-center gap-2 text-xs text-primary font-medium pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Search Grounding Active
            </div>
          </div>

          {/* Col 2: AI Intelligence */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              AI Market Intelligence
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/research" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3 text-primary" /> Autonomous Deep Research
                </Link>
              </li>
              <li>
                <Link href="/exams" className="hover:text-primary transition-colors">
                  Live National Exam Radar
                </Link>
              </li>
              <li>
                <Link href="/colleges" className="hover:text-primary transition-colors">
                  Institutional Intelligence Directory
                </Link>
              </li>
              <li>
                <Link href="/guidance" className="hover:text-primary transition-colors">
                  Bilingual Voice Counselor
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Simulation & Planning */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Decision & Planning Tools
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/simulator" className="hover:text-primary transition-colors">
                  Interactive Pathway Simulator
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="hover:text-primary transition-colors">
                  Education ROI & EMI Calculator
                </Link>
              </li>
              <li>
                <Link href="/quiz" className="hover:text-primary transition-colors">
                  15-Point RIASEC Aptitude Test
                </Link>
              </li>
              <li>
                <Link href="/timeline" className="hover:text-primary transition-colors">
                  Academic Journey Milestones
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Capstone Engineering Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Engineering Architecture
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Engineered with Next.js 16 (App Router), Google Gemini 2.5 Flash, Google Search Grounding API, Supabase SSR, and Tailwind CSS v4.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border bg-background text-[11px] text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              Final Year Capstone Project
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Student Saarthi. All rights reserved.</p>
          <p className="text-center sm:text-right text-[11px]">
            Data synthesized from live Google Search grounding. Verify critical registration deadlines with official exam gazettes.
          </p>
        </div>
      </div>
    </footer>
  );
}
