import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";

const evaluateSchema = z.object({
  collegeName: z.string().min(2),
  targetCourse: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const { collegeName, targetCourse } = evaluateSchema.parse(json);

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

    const prompt = `You are a candid, verified higher education investigator.
Evaluate the institution "${collegeName}" ${targetCourse ? `specifically for "${targetCourse}"` : ""}.
Use Google Search Grounding to find the latest real-time facts (accounting for recent 2024-2026 placement statistics, NIRF updates, campus infrastructure, fee hikes, or major student reviews).

Provide a structured, unbiased evaluation in Markdown with:
1. 🏛️ **Institutional Standing & Accreditation**: NIRF rank tier, NAAC grade, autonomous status.
2. 💼 **Recent Placement Ground Truth**: Actual median and average package, percentage placed, marquee recruiters.
3. 🏫 **Campus Life & Infrastructure**: Hostels, labs, library, peer culture.
4. ✅ **Top 3 Advantages**: What makes this college genuinely worth attending.
5. ⚠️ **Top 3 Red Flags / Watchouts**: Hidden fees, strict policies, location isolation, or attendance issues.
6. 🎯 **Final Admission Verdict**: Who should join vs who should look elsewhere.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const candidate = response.candidates?.[0];
    const groundingMetadata = candidate?.groundingMetadata;

    const sources: Array<{ title: string; url: string }> = [];
    if (groundingMetadata?.groundingChunks) {
      for (const chunk of groundingMetadata.groundingChunks as Array<{ web?: { uri?: string; title?: string } }>) {
        if (chunk.web?.uri) {
          sources.push({
            title: chunk.web.title || "College Review Source",
            url: chunk.web.uri,
          });
        }
      }
    }

    return NextResponse.json({
      success: true,
      evaluation: text,
      sources: Array.from(new Map(sources.map((s) => [s.url, s])).values()),
      evaluatedAt: new Date().toISOString(),
    });
  } catch (error: unknown) {
    console.error("College Evaluation API Error:", error);
    const msg = error instanceof Error ? error.message : "Error evaluating college";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
