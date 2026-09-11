import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";

const verifySchema = z.object({
  examName: z.string().min(2),
  shortName: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const { examName, shortName } = verifySchema.parse(json);

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

    const prompt = `You are a national entrance exam alert tracker in India.
Check the latest real-time status and dates for "${examName} (${shortName || ""})" in 2025/2026.
Use Google Search grounding to find:
1. Current registration window / application status (Open, Closed, or Upcoming Date).
2. Expected or confirmed exam dates for the next session.
3. Any recent critical advisory, pattern change, or eligibility notification announced by the conducting body.

Provide a concise, 3-4 bullet point update with verified dates. Include exact dates where available.`;

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
            title: chunk.web.title || "Official Portal",
            url: chunk.web.uri,
          });
        }
      }
    }

    return NextResponse.json({
      success: true,
      statusUpdate: text,
      sources: Array.from(new Map(sources.map((s) => [s.url, s])).values()),
      verifiedAt: new Date().toISOString(),
    });
  } catch (error: unknown) {
    console.error("Exam Verification API Error:", error);
    const msg = error instanceof Error ? error.message : "Error verifying exam status";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
