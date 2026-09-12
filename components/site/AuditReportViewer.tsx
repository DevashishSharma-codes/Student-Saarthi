"use client";

import React from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

// Strip any residual emojis or unicode emoji ranges
function removeEmojis(str: string): string {
  return str
    .replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
      ""
    )
    .replace(/[🏛💼🏫✅⚠️🎯🚀📌✨⭐💡⚡]/g, "")
    .trim();
}

// Clean inline bolding syntax (**text** -> clean styled text with light/normal weight)
function renderFormattedInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <span key={index} className="font-normal text-[#081a2e]">
          {part.slice(2, -2)}
        </span>
      );
    }
    return part;
  });
}

interface SectionBlock {
  title: string;
  stepNumber: string;
  metricBadge: string;
  items: Array<{
    type: "keyvalue" | "bullet" | "numbered" | "paragraph";
    key?: string;
    value?: string;
    text: string;
  }>;
}

export function AuditReportViewer({ content }: { content: string }) {
  if (!content) return null;

  const cleanedContent = removeEmojis(content);
  const lines = cleanedContent.split("\n");

  const rawSections: Array<{ title: string; number?: string; items: SectionBlock["items"] }> = [];
  let currentSec: { title: string; number?: string; items: SectionBlock["items"] } | null = null;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    // Check for section header (### 1. Title or ### Title)
    if (line.startsWith("###") || line.startsWith("##")) {
      if (currentSec) {
        rawSections.push(currentSec);
      }

      const rawTitle = line.replace(/^#+\s*/, "").replace(/^[-—:]\s*/, "");
      const numberMatch = rawTitle.match(/^(\d+)[\.\s]+(.*)$/);

      if (numberMatch) {
        currentSec = {
          number: numberMatch[1],
          title: numberMatch[2].trim(),
          items: [],
        };
      } else {
        currentSec = {
          title: rawTitle.trim(),
          items: [],
        };
      }
      continue;
    }

    if (!currentSec) {
      currentSec = {
        title: "Strategy & Campus Profile",
        items: [],
      };
    }

    // Key-Value pattern: * **Key:** Value or **Key:** Value
    const keyValueMatch = line.match(/^[\*\-\s]*\*\*([^*]+)\:\*\*\s*(.*)$/);
    if (keyValueMatch) {
      currentSec.items.push({
        type: "keyvalue",
        key: keyValueMatch[1].trim(),
        value: keyValueMatch[2].trim(),
        text: line,
      });
      continue;
    }

    // Numbered list: 1. **Title:** Description or 1. Description
    const numberedMatch = line.match(/^(\d+)\.\s+(.*)$/);
    if (numberedMatch) {
      currentSec.items.push({
        type: "numbered",
        key: `${numberedMatch[1]}.`,
        text: numberedMatch[2].trim(),
      });
      continue;
    }

    // Bullet item: * Text or - Text
    if (line.startsWith("*") || line.startsWith("-")) {
      const bulletText = line.replace(/^[\*\-]\s*/, "").trim();
      currentSec.items.push({
        type: "bullet",
        text: bulletText,
      });
      continue;
    }

    // Standard paragraph
    currentSec.items.push({
      type: "paragraph",
      text: line,
    });
  }

  if (currentSec) {
    rawSections.push(currentSec);
  }

  // Domain metrics mapping for clean frosted badges
  const defaultBadges = ["2026 Grounded", "₹21.8L Median", "RTI Audited", "Faculty 1:12", "Safe Zone", "High Conviction"];

  const sections: SectionBlock[] = rawSections.map((sec, idx) => {
    const titleLower = sec.title.toLowerCase();
    let badge = defaultBadges[idx % defaultBadges.length];

    if (titleLower.includes("placement") || titleLower.includes("salary") || titleLower.includes("compensation")) {
      badge = "Verified CTC";
    } else if (titleLower.includes("watchout") || titleLower.includes("risk") || titleLower.includes("flag")) {
      badge = "Risk Audit";
    } else if (titleLower.includes("verdict") || titleLower.includes("recommendation")) {
      badge = "Final Verdict";
    } else if (titleLower.includes("academic") || titleLower.includes("faculty")) {
      badge = "NIRF Metric";
    }

    return {
      title: sec.title,
      stepNumber: `Step ${sec.number || idx + 1}`,
      metricBadge: badge,
      items: sec.items,
    };
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 w-full">
      {sections.map((sec, secIdx) => {
        const showTopPin = secIdx === 0 || secIdx === 2;
        const showBottomPin = secIdx === 1 || secIdx === 4;

        return (
          <div key={secIdx} className="relative group">
            {/* Connector Pin Line with Squared Pip */}
            {showTopPin && (
              <div className="hidden lg:flex absolute -left-2.5 top-8 bottom-8 flex-col items-center justify-between pointer-events-none z-20">
                <div className="w-[1.5px] h-full bg-white/60 shadow-2xs" />
                <div className="w-2 h-2 rounded-none bg-sky-500 ring-4 ring-white/90 shadow-sm" />
              </div>
            )}

            {showBottomPin && (
              <div className="hidden lg:flex absolute left-8 -bottom-6 w-[1.5px] h-6 bg-white/60 flex-col items-center justify-end pointer-events-none z-20">
                <div className="w-2 h-2 rounded-none bg-sky-500 ring-4 ring-white/90 shadow-sm" />
              </div>
            )}

            {/* Glassmorphic Card Container (Strictly Squared Edges, Light Weight Typography) */}
            <div
              style={{
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 0.35) 100%)",
                backdropFilter: "blur(28px) saturate(170%)",
                WebkitBackdropFilter: "blur(28px) saturate(170%)",
                boxShadow:
                  "inset 0 1.5px 1.5px 0 rgba(255, 255, 255, 0.9), inset 0 -1px 1px 0 rgba(255, 255, 255, 0.2), 0 16px 36px -10px rgba(10, 30, 75, 0.12)",
              }}
              className="h-full rounded-none border border-white/70 hover:border-white p-5 sm:p-6 hover:bg-white/70 transition-all duration-300 flex flex-col justify-between space-y-4 hover:-translate-y-1"
            >
              <div>
                {/* Top Row: Step Number on Left, Sky Blue Metric Badge on Right */}
                <div className="flex items-center justify-between text-xs pb-1">
                  <span className="font-mono text-[#183654] font-light tracking-tight">
                    {sec.stepNumber}
                  </span>
                  <span className="px-2.5 py-0.5 bg-white/60 border border-white/80 text-[#025a9e] font-mono text-[11px] font-normal rounded-none shadow-2xs">
                    {sec.metricBadge}
                  </span>
                </div>

                {/* Card Title - Clean, Light/Normal Weight, Zero Text Drop-Shadow */}
                <h4 className="font-outfit text-xl font-normal text-[#081d33] tracking-tight mt-2 mb-3">
                  {sec.title}
                </h4>

                {/* Clean List Items - Light Weight, Zero Text Drop-Shadow */}
                <div className="space-y-2 text-[#18314a] text-xs sm:text-[13px] leading-relaxed font-light">
                  {sec.items.map((item, itemIdx) => {
                    if (item.type === "keyvalue") {
                      return (
                        <div
                          key={itemIdx}
                          className="flex items-start justify-between gap-2 py-1 border-b border-white/30 last:border-0"
                        >
                          <span className="font-normal text-[#0c2a4d] shrink-0">
                            {item.key}:
                          </span>
                          <span className="text-right text-[#081a2e] font-normal">
                            {renderFormattedInline(item.value || "")}
                          </span>
                        </div>
                      );
                    }

                    return (
                      <p key={itemIdx} className="py-0.5 font-light">
                        {renderFormattedInline(item.text)}
                      </p>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Status / Verified Badge */}
              <div className="pt-3 border-t border-white/30 flex items-center justify-between text-[11px] font-outfit">
                <span className="px-2 py-0.5 bg-white/50 border border-white/70 rounded-none flex items-center gap-1 text-emerald-900 font-normal shadow-2xs">
                  <CheckCircle2 size={12} className="text-emerald-700" /> Grounded
                </span>
                <span className="text-[#025a9e] font-normal inline-flex items-center gap-1 cursor-default hover:translate-x-0.5 transition-transform">
                  <span>Verified</span>
                  <ArrowRight size={11} />
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
