import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";
import { COLLEGE_DIRECTORY, CollegeProfile } from "@/lib/collegeData";

const researchRequestSchema = z.object({
  query: z.string().optional().default(""),
  stream: z.string().optional(),
  targetLocation: z.string().optional(),
  budgetRange: z.string().optional(),
  maxBudget: z.number().optional().nullable(),
});

function parseAnnualFeeInLakhs(feeStr: string): number {
  const clean = feeStr.toLowerCase();
  if (clean.includes("lakh")) {
    const match = clean.match(/([0-9.]+)\s*lakh/);
    if (match) return parseFloat(match[1]);
  }
  const numMatch = clean.replace(/,/g, "").match(/([0-9]+)/);
  if (numMatch) {
    const val = parseFloat(numMatch[1]);
    if (val > 1000) {
      return val / 100000;
    }
    return val;
  }
  return 2.5;
}

function parseMaxBudgetInLakhs(budgetStr?: string): number | null {
  if (!budgetStr || !budgetStr.trim()) return null;
  const lower = budgetStr.toLowerCase();
  if (lower.includes("govt") || lower.includes("subsidized")) return 4.0;
  const numMatch = lower.match(/([0-9.]+)/);
  if (numMatch) {
    return parseFloat(numMatch[1]);
  }
  return null;
}

// College filter function for verified directory
function filterColleges(query: string, stream?: string, budgetRange?: string, customBudget?: number | null) {
  let colleges = [...COLLEGE_DIRECTORY];

  // 1. Stream filter
  if (stream && stream !== "All Streams") {
    if (stream.includes("PCM") || stream.includes("Tech") || stream.includes("Engineering")) {
      colleges = colleges.filter((c) => c.stream === "Science & Tech");
    } else if (stream.includes("PCB") || stream.includes("Healthcare") || stream.includes("Medical")) {
      colleges = colleges.filter((c) => c.stream === "Medical & Bio");
    } else if (stream.includes("Commerce") || stream.includes("Finance") || stream.includes("Business")) {
      colleges = colleges.filter((c) => c.stream === "Commerce & Business");
    } else if (stream.includes("Humanities") || stream.includes("Social") || stream.includes("Arts")) {
      colleges = colleges.filter((c) => c.stream === "Arts & Humanities");
    } else if (stream.includes("Law")) {
      colleges = colleges.filter((c) => c.stream === "Law");
    } else if (stream.includes("Design") || stream.includes("Media")) {
      colleges = colleges.filter((c) => c.stream === "Design & Media");
    }
  }

  // 2. Query keyword filter
  const q = query.trim().toLowerCase();
  if (q) {
    const queryWords = q.split(/\s+/).filter((w) => w.length > 1);
    
    colleges = colleges.filter((c) => {
      const corpus = [
        c.name,
        c.shortName,
        c.city,
        c.state,
        c.type,
        c.admissionExam,
        c.highlight,
        ...(c.popularPrograms || []),
        ...(c.specializations || []),
        ...(c.keyStrengths || []),
      ]
        .join(" ")
        .toLowerCase();

      return queryWords.some((word) => corpus.includes(word));
    });

    // If query was very specific and matched few or none, widen back to stream
    if (colleges.length === 0) {
      colleges = COLLEGE_DIRECTORY.filter((c) => {
        if (!stream || stream === "All Streams") return true;
        if (stream.includes("PCM") || stream.includes("Tech") || stream.includes("Engineering")) return c.stream === "Science & Tech";
        if (stream.includes("PCB") || stream.includes("Healthcare") || stream.includes("Medical")) return c.stream === "Medical & Bio";
        if (stream.includes("Commerce") || stream.includes("Finance")) return c.stream === "Commerce & Business";
        if (stream.includes("Law")) return c.stream === "Law";
        if (stream.includes("Design")) return c.stream === "Design & Media";
        return true;
      });
    }
  }

  // 3. Budget filter scoring
  const effectiveMaxBudget = customBudget !== undefined && customBudget !== null ? customBudget : parseMaxBudgetInLakhs(budgetRange);

  const scored = colleges.map((college) => {
    const annualLakhs = parseAnnualFeeInLakhs(college.annualFeesEstimate);
    const duration = college.stream === "Commerce & Business" || college.stream === "Arts & Humanities" ? 3 : college.stream === "Law" ? 5 : 4;
    const totalDegreeLakhs = annualLakhs * duration;

    // Parse CTC
    const ctcMatch = college.medianCtcEstimate.match(/([0-9.]+)/);
    const ctcLakhs = ctcMatch ? parseFloat(ctcMatch[1]) : 0;

    let fitsBudget = true;
    let budgetDelta = 0;

    if (effectiveMaxBudget !== null && effectiveMaxBudget > 0) {
      fitsBudget = totalDegreeLakhs <= effectiveMaxBudget;
      budgetDelta = parseFloat((totalDegreeLakhs - effectiveMaxBudget).toFixed(1));
    }

    return {
      ...college,
      annualLakhs,
      totalDegreeLakhs: parseFloat(totalDegreeLakhs.toFixed(1)),
      ctcLakhs,
      fitsBudget,
      budgetDelta,
      userBudget: effectiveMaxBudget,
    };
  });

  scored.sort((a, b) => {
    if (a.fitsBudget && !b.fitsBudget) return -1;
    if (!a.fitsBudget && b.fitsBudget) return 1;
    const rankA = typeof a.nirfRank === "number" ? a.nirfRank : 999;
    const rankB = typeof b.nirfRank === "number" ? b.nirfRank : 999;
    return rankA - rankB;
  });

  return scored;
}

// Fetch live dynamic colleges using Gemini API (gemini-2.5-flash-lite)
async function fetchDynamicCollegesFromAPI(
  query: string,
  stream?: string,
  maxBudget?: number | null
): Promise<any[]> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return [];

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const prompt = `Return a strictly valid JSON array of 12 real, accredited higher education colleges and universities in India matching:
Search Query / Keyword: "${query || "Top Universities"}"
Stream: "${stream || "All Streams"}"
4-Year Degree Budget Cap: ${maxBudget ? "₹" + maxBudget + " Lakhs Total" : "Flexible"}

Each item in the JSON array must follow this schema:
{
  "id": "unique-slug-lowercase",
  "name": "Full Official Institution Name",
  "shortName": "Common Short Name",
  "stream": "Science & Tech" | "Commerce & Business" | "Arts & Humanities" | "Law" | "Design & Media" | "Medical & Bio",
  "city": "City",
  "state": "State",
  "type": "IIT" | "NIT / IIIT" | "Central University" | "Top Private" | "State Govt" | "National Institute",
  "nirfRank": number,
  "annualFeesEstimate": "₹X.X Lakhs / yr",
  "medianCtcEstimate": "₹X.X LPA",
  "admissionExam": "Accepted Exam (e.g. JEE Main, NEET, CAT, CUET, CLAT, etc.)",
  "rating": 4.6,
  "highlight": "Short 1-sentence distinguishing achievement",
  "popularPrograms": ["Program 1", "Program 2"],
  "specializations": ["Spec 1", "Spec 2"]
}

Provide realistic and accurate NIRF rank estimates, annual tuition fees, and median CTC figures based on latest NIRF/AICTE reports.`;

    const promptPromise = model.generateContent(prompt);
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("API Timeout")), 3500)
    );

    const result = (await Promise.race([promptPromise, timeoutPromise])) as any;
    const responseText = result.response.text();
    const parsed = JSON.parse(responseText);

    if (Array.isArray(parsed)) {
      return parsed;
    }
    if (parsed && Array.isArray(parsed.colleges)) {
      return parsed.colleges;
    }
    return [];
  } catch (err) {
    // Return empty list if API times out or rate limits
    return [];
  }
}

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const { query, stream, budgetRange, maxBudget } = researchRequestSchema.parse(json);

    // 1. Get filtered colleges from verified directory
    const verifiedColleges = filterColleges(query, stream, budgetRange, maxBudget);

    // 2. Call external Gemini API to get dynamic live colleges
    const dynamicCollegesRaw = await fetchDynamicCollegesFromAPI(query, stream, maxBudget);

    // 3. Process dynamic colleges with fee & budget scoring
    const effectiveMaxBudget = maxBudget !== undefined && maxBudget !== null ? maxBudget : parseMaxBudgetInLakhs(budgetRange);
    const processedDynamicColleges = dynamicCollegesRaw.map((college: any) => {
      const annualLakhs = parseAnnualFeeInLakhs(college.annualFeesEstimate || "2.5 Lakhs");
      const duration = college.stream?.includes("Commerce") || college.stream?.includes("Arts") ? 3 : college.stream?.includes("Law") ? 5 : 4;
      const totalDegreeLakhs = annualLakhs * duration;

      const ctcMatch = (college.medianCtcEstimate || "").match(/([0-9.]+)/);
      const ctcLakhs = ctcMatch ? parseFloat(ctcMatch[1]) : 10;

      let fitsBudget = true;
      let budgetDelta = 0;
      if (effectiveMaxBudget !== null && effectiveMaxBudget > 0) {
        fitsBudget = totalDegreeLakhs <= effectiveMaxBudget;
        budgetDelta = parseFloat((totalDegreeLakhs - effectiveMaxBudget).toFixed(1));
      }

      return {
        id: college.id || college.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        name: college.name,
        shortName: college.shortName || college.name,
        stream: college.stream || "Science & Tech",
        city: college.city || "India",
        state: college.state || "India",
        type: college.type || "Top Institution",
        nirfRank: college.nirfRank || 50,
        annualFeesEstimate: college.annualFeesEstimate || `₹${annualLakhs.toFixed(1)} Lakhs / yr`,
        medianCtcEstimate: college.medianCtcEstimate || `₹${ctcLakhs.toFixed(1)} LPA`,
        admissionExam: college.admissionExam || "National Merit / Entrance",
        rating: college.rating || 4.5,
        highlight: college.highlight || "Recognized institution with accredited degree pathways.",
        popularPrograms: college.popularPrograms || ["B.Tech", "Degree Programs"],
        specializations: college.specializations || [query || "Core Studies"],
        annualLakhs,
        totalDegreeLakhs: parseFloat(totalDegreeLakhs.toFixed(1)),
        ctcLakhs,
        fitsBudget,
        budgetDelta,
        userBudget: effectiveMaxBudget,
      };
    });

    // 4. Merge verified and dynamic colleges (deduplicating by name/shortName)
    const seenNames = new Set<string>();
    const mergedColleges: any[] = [];

    // Prioritize verified colleges
    for (const c of verifiedColleges) {
      const key = (c.shortName || c.name).toLowerCase().replace(/[^a-z0-9]/g, "");
      if (!seenNames.has(key)) {
        seenNames.add(key);
        mergedColleges.push(c);
      }
    }

    // Append dynamic API colleges
    for (const c of processedDynamicColleges) {
      const key = (c.shortName || c.name).toLowerCase().replace(/[^a-z0-9]/g, "");
      if (!seenNames.has(key)) {
        seenNames.add(key);
        mergedColleges.push(c);
      }
    }

    // Sort by budget fit first, then NIRF rank
    mergedColleges.sort((a, b) => {
      if (a.fitsBudget && !b.fitsBudget) return -1;
      if (!a.fitsBudget && b.fitsBudget) return 1;
      const rankA = typeof a.nirfRank === "number" ? a.nirfRank : 999;
      const rankB = typeof b.nirfRank === "number" ? b.nirfRank : 999;
      return rankA - rankB;
    });

    return NextResponse.json({
      success: true,
      colleges: mergedColleges,
      totalCount: mergedColleges.length,
      dynamicCount: processedDynamicColleges.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    console.error("Deep Research API Error:", error);
    const fallbackColleges = filterColleges("", "All Streams", undefined, undefined);
    return NextResponse.json({
      success: true,
      colleges: fallbackColleges,
      totalCount: fallbackColleges.length,
      timestamp: new Date().toISOString(),
    });
  }
}
