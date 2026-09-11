import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";

const researchRequestSchema = z.object({
  query: z.string().min(2, "Query must be at least 2 characters long"),
  stream: z.string().optional(),
  targetLocation: z.string().optional(),
  budgetRange: z.string().optional(),
});

interface GroundingChunk {
  web?: {
    uri?: string;
    title?: string;
  };
}

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const { query, stream, targetLocation, budgetRange } = researchRequestSchema.parse(json);

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured on the server." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      tools: [{ googleSearch: {} } as any],
    });

    const prompt = `You are "Student Saarthi Deep Research Analyst", an elite, authoritative education and career market intelligence advisor for Indian and international academia.

User Research Target: "${query}"
${stream ? `Target Academic Stream: ${stream}` : ""}
${targetLocation ? `Preferred Location/Region: ${targetLocation}` : ""}
${budgetRange ? `Budget Constraint: ${budgetRange}` : ""}

Perform an in-depth, verified investigation using Google Search to gather the latest real-time information (accounting for current 2025/2026 market data, exam dates, cutoffs, and emerging industry dynamics).

Structure your comprehensive report using clear Markdown formatting with the following exact sections:

### 1. 📊 Executive Summary & Verdict
- A 3-sentence high-impact synthesis of this career/academic path today.
- Direct recommendation on whether this is a high-growth, stable, or high-risk choice in 2026.

### 2. ⚡ Real-Time Market Demand & AI Disruption Index
- Current hiring trends, industry growth rate, and demand in India & globally.
- **AI Automation & Disruption Risk**: Low / Moderate / High with concrete explanation of how AI/LLMs affect this field.
- High-demand specializations within this domain.

### 3. 🎓 Top Tier Institutions, Exams & Verified Cutoffs
- Premier government and private institutions offering this pathway.
- Primary entrance examinations, typical cutoff percentiles/ranks, and admission timelines.

### 4. 💰 Financial Investment vs Career ROI Analysis
- Estimated total tuition & living expenditure.
- Realistic starting compensation (0-3 years CTC), mid-career projection (5-8 years), and estimated ROI payback period.

### 5. 🛠️ Critical Skill Stack for 2026+
- Technical / hard skills mandatory for success.
- Foundational and soft skills that provide human defensibility against automation.

### 6. ⚠️ Key Risks, Pitfalls & Strategic Mitigations
- Realistic challenges (oversaturation, high exam competition, high burnout, or high upfront fees).
- Step-by-step actionable advice for the student/client to de-risk their trajectory.

Keep your tone analytical, objective, encouraging, and rich with data. Cite specific facts, institutions, and trends.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Extract grounding metadata from candidate response
    const candidate = response.candidates?.[0];
    const groundingMetadata = candidate?.groundingMetadata;

    const sources: Array<{ title: string; url: string }> = [];
    if (groundingMetadata?.groundingChunks) {
      const chunks = groundingMetadata.groundingChunks as GroundingChunk[];
      for (const chunk of chunks) {
        if (chunk.web?.uri) {
          sources.push({
            title: chunk.web.title || "Web Source",
            url: chunk.web.uri,
          });
        }
      }
    }

    // Deduplicate sources by URL
    const uniqueSources = Array.from(
      new Map(sources.map((s) => [s.url, s])).values()
    );

    const webSearchQueries = groundingMetadata?.webSearchQueries || [];

    return NextResponse.json({
      success: true,
      report: text,
      sources: uniqueSources,
      webSearchQueries,
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    console.error("Deep Research API Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
