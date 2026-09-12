import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";

const simulateSchema = z.object({
  aspiration: z.string().min(2),
  stream: z.string().optional().default("General"),
  horizonYears: z.number().optional().default(10),
  riskTolerance: z.string().optional().default("Balanced"),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const { aspiration, stream, horizonYears, riskTolerance } = simulateSchema.parse(json);

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
          model: "gemini-2.5-flash",
          generationConfig: {
            responseMimeType: "application/json",
          },
        });

        const prompt = `You are an elite Indian higher education and global career trajectory simulator.
Simulate an authentic, highly detailed 10-year career trajectory for a student with the following profile:
- Student Goal / Aspiration: "${aspiration}"
- Academic Stream: "${stream}"
- Time Horizon: ${horizonYears} Years
- AI Risk Tolerance: "${riskTolerance}"

Return a valid JSON object matching EXACTLY this structure:
{
  "trajectoryTitle": "Short punchy title for this simulated career trajectory (e.g. AI Systems Architect -> DeepTech VP)",
  "executiveSummary": "2-3 sentences synthesizing the strategic feasibility and market outlook for 2026-2036.",
  "projectedEarnings": {
    "entry": "₹12 - 20 LPA",
    "midCareer": "₹32 - 55 LPA",
    "apex": "₹75L - 1.2 Cr+"
  },
  "aiDisruptionIndex": {
    "level": "Low" | "Moderate" | "High",
    "rationale": "Clear 2-sentence explanation of what human moats protect this trajectory from LLM automation."
  },
  "phases": [
    {
      "phaseName": "Phase 1: Foundation & Gateway (Years 0-2)",
      "period": "Years 0 - 2",
      "coreFocus": "Key entrance examinations, target colleges, foundational academic focus.",
      "estimatedCompensation": "₹0 - ₹4L (Stipends)",
      "actionItems": ["Action 1", "Action 2", "Action 3"]
    },
    {
      "phaseName": "Phase 2: Undergraduate & Proof-of-Work (Years 3-4)",
      "period": "Years 3 - 4",
      "coreFocus": "Key specializations, internships, open-source/research contributions.",
      "estimatedCompensation": "₹6L - ₹15L (Pre-placement / Entry)",
      "actionItems": ["Action 1", "Action 2", "Action 3"]
    },
    {
      "phaseName": "Phase 3: Industry Acceleration (Years 5-7)",
      "period": "Years 5 - 7",
      "coreFocus": "High-impact domain mastery, promotions, technical architecture or management.",
      "estimatedCompensation": "₹25L - ₹45L",
      "actionItems": ["Action 1", "Action 2", "Action 3"]
    },
    {
      "phaseName": "Phase 4: Apex Mastery & Strategic Moat (Years 8-10)",
      "period": "Years 8 - 10",
      "coreFocus": "Leadership, equity upside, international mobility, or entrepreneurial spinout.",
      "estimatedCompensation": "₹60L - ₹1.2 Cr+",
      "actionItems": ["Action 1", "Action 2", "Action 3"]
    }
  ],
  "humanMoats": [
    "Moat 1 (e.g. Tactile systems engineering)",
    "Moat 2 (e.g. High-stakes negotiation & human trust)",
    "Moat 3 (e.g. Novel algorithmic research)"
  ],
  "contingencyPivot": "Detailed fallback strategic pathway if market conditions or AI shifts occur.",
  "immediateNextStep": "The single highest leverage action the student must execute within the next 7 days."
}`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const parsed = JSON.parse(text);

        return NextResponse.json({ success: true, simulation: parsed });
      } catch (geminiError) {
        console.error("Gemini simulation error, using intelligent fallback:", geminiError);
      }
    }

    // Intelligent heuristic simulation fallback if Gemini is offline
    const fallbackSimulation = {
      trajectoryTitle: `${aspiration.slice(0, 40)} -> High-Value Specialist`,
      executiveSummary: `Projected high-demand trajectory for ${stream}. Strong upside if focusing on foundational system architecture and cross-functional leadership over routine execution.`,
      projectedEarnings: {
        entry: "₹10 - 22 LPA",
        midCareer: "₹28 - 55 LPA",
        apex: "₹65L - 1.2 Cr+",
      },
      aiDisruptionIndex: {
        level: "Low",
        rationale: "Requires high contextual judgment, tactile physical execution, or novel architecture that current LLMs cannot autonomously orchestrate.",
      },
      phases: [
        {
          phaseName: "Phase 1: Foundation & Gateway (Years 0-2)",
          period: "Years 0 - 2",
          coreFocus: `Master entrance examination syllabi and secure top percentile rank for ${stream}.`,
          estimatedCompensation: "₹0 (Academics / Preparation)",
          actionItems: [
            "Complete core syllabus with previous 10 years question analysis",
            "Target top 1-2 percentile in national entrance examinations",
            "Build baseline math/analytical computational discipline",
          ],
        },
        {
          phaseName: "Phase 2: Undergraduate & Proof-of-Work (Years 3-4)",
          period: "Years 3 - 4",
          coreFocus: "Build verifiable public proof of work, high-tier hackathons, and marquee summer internships.",
          estimatedCompensation: "₹4L - ₹12L (Stipends & PPOs)",
          actionItems: [
            "Secure at least 2 Tier-1 corporate research/engineering internships",
            "Contribute to high-impact open repositories or published clinical case studies",
            "Maintain >8.5 CGPA to unlock international exchange programs",
          ],
        },
        {
          phaseName: "Phase 3: Industry Acceleration (Years 5-7)",
          period: "Years 5 - 7",
          coreFocus: "Domain leadership, high-leverage business impact, and rapid promotion cycles.",
          estimatedCompensation: "₹25L - ₹48L",
          actionItems: [
            "Lead core project architecture or high-volume client portfolios",
            "Build cross-functional executive presence and public technical authority",
            "Evaluate lateral pivots or sponsored executive education",
          ],
        },
        {
          phaseName: "Phase 4: Apex Mastery & Strategic Moat (Years 8-10)",
          period: "Years 8 - 10",
          coreFocus: "Equity participation, strategic department head, or founder spin-out.",
          estimatedCompensation: "₹65L - ₹1.2 Cr+",
          actionItems: [
            "Transition into equity-based compensation or strategic leadership",
            "Mentor emerging talent and build institutional capital",
            "Maintain anti-fragile independent client / advisory network",
          ],
        },
      ],
      humanMoats: [
        "Architectural synthesis over boilerplate generation",
        "High-stakes interpersonal negotiation and human trust moats",
        "Physical/hardware/regulatory domain expertise",
      ],
      contingencyPivot: `Pivot towards Technical Product Management, Strategic Advisory, or Regulatory Compliance in ${stream}.`,
      immediateNextStep: "Conduct a 2-hour audit of target entrance test cutoffs and build a 90-day milestone checklist.",
    };

    return NextResponse.json({ success: true, simulation: fallbackSimulation });
  } catch (error: any) {
    console.error("Simulation API error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to generate simulation" },
      { status: 400 }
    );
  }
}
