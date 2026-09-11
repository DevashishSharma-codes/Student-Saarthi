import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";

const guidanceRequestSchema = z.object({
  answer: z.string().optional(),
  psychometric: z
    .object({
      scores: z.record(z.string(), z.number()).optional(),
      primaryTrait: z.string().optional(),
      secondaryTrait: z.string().optional(),
      summary: z.string().optional(),
    })
    .optional(),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const { answer, psychometric } = guidanceRequestSchema.parse(json);

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured on the server." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const systemPrompt = `You are "Student Saarthi", an elite career counseling AI for Indian students after the 10th and 12th standards.
You must respond strictly with valid JSON format matching this schema:
{
  "stream": "Science (PCM) | Science (PCB) | Commerce | Humanities/Arts | Design & Vocational",
  "hollandArchetype": "e.g. Investigative-Enterprising (The Tech Entrepreneur / Quant Analyst)",
  "rationale": "Clear, encouraging explanation connecting their aptitude and interests to this stream.",
  "subjects": ["Recommended Core Subject 1", "Subject 2", "Subject 3", "Elective"],
  "careers": ["Target Career 1", "Target Career 2", "Target Career 3", "Emerging Modern Career 4"],
  "colleges_advice": "Practical advice regarding target universities, entrance exams, and academic preparation.",
  "next_steps": ["Actionable step 1", "Step 2", "Step 3", "Step 4"],
  "aiRiskIndex": "Low | Moderate | High",
  "marketOutlook": "2-sentence forward looking outlook for 2026-2030."
}

Do not include any text before or after the JSON block. Ensure the JSON is syntactically valid.`;

    let userPrompt = "Please provide comprehensive stream and career guidance.";
    if (psychometric) {
      userPrompt += `\nPsychometric Holland RIASEC Assessment Data:
Primary Trait: ${psychometric.primaryTrait || "Not specified"}
Secondary Trait: ${psychometric.secondaryTrait || "Not specified"}
Dimension Scores: ${JSON.stringify(psychometric.scores || {})}
Summary Context: ${psychometric.summary || ""}`;
    }
    if (answer) {
      userPrompt += `\nAdditional Student Input / Interests: "${answer}"`;
    }

    const result = await model.generateContent([systemPrompt, userPrompt]);
    const response = await result.response;
    const text = response.text();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Invalid response format received from Gemini");
    }

    const parsed = JSON.parse(jsonMatch[0]);

    return NextResponse.json({
      stream: parsed.stream ?? "Science (PCM)",
      hollandArchetype: parsed.hollandArchetype ?? "Investigative-Realistic Analyst",
      rationale: parsed.rationale ?? "Based on your aptitude and preferences, this pathway matches your strengths.",
      subjects: Array.isArray(parsed.subjects) ? parsed.subjects : ["Physics", "Mathematics", "Computer Science"],
      careers: Array.isArray(parsed.careers) ? parsed.careers : ["AI Engineer", "Software Architect", "Systems Researcher"],
      colleges_advice: parsed.colleges_advice ?? "Focus on preparing for entrance exams and exploring accredited universities.",
      next_steps: Array.isArray(parsed.next_steps) ? parsed.next_steps : ["Review syllabus", "Attempt mock tests", "Consult counselors"],
      aiRiskIndex: parsed.aiRiskIndex ?? "Low",
      marketOutlook: parsed.marketOutlook ?? "High growth sector with expanding opportunities across India and globally.",
    });
  } catch (error: unknown) {
    console.error("Guidance API error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
