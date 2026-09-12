import { NextRequest, NextResponse } from "next/server";
import { ENTRANCE_EXAMS, EntranceExam } from "@/lib/examData";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const stream = searchParams.get("stream") || "All";
    const status = searchParams.get("status") || "All";
    const query = (searchParams.get("query") || "").toLowerCase().trim();

    let filtered = [...ENTRANCE_EXAMS];

    if (stream !== "All") {
      filtered = filtered.filter((exam) => exam.stream === stream);
    }

    if (status !== "All") {
      filtered = filtered.filter((exam) => {
        if (status === "Registration Open") return exam.status === "Registration Open";
        if (status === "Upcoming") return exam.status === "Upcoming" || exam.status === "Announced";
        return true;
      });
    }

    if (query) {
      filtered = filtered.filter(
        (exam) =>
          exam.name.toLowerCase().includes(query) ||
          exam.shortName.toLowerCase().includes(query) ||
          exam.conductingBody.toLowerCase().includes(query) ||
          exam.keySubjects.some((s) => s.toLowerCase().includes(query))
      );
    }

    return NextResponse.json({
      success: true,
      exams: filtered,
      totalCount: filtered.length,
      timestamp: new Date().toISOString(),
    });
  } catch (err: unknown) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch exam telemetry", exams: ENTRANCE_EXAMS },
      { status: 500 }
    );
  }
}
