# Project Documentation Summaries: Student Saarthi

This file contains consolidated summaries of all key Markdown documentation files in the Student Saarthi project.

---

## 1. [README.md](file:///Users/akshat/Desktop/student-saarthi/Student-Saarthi/README.md)
**Overview:** A comprehensive guide to the Student Saarthi application—an AI-powered career counseling platform for Indian students after the 10th grade.
- **Key Features:** Includes an aptitude/interest quiz, AI-driven guidance using Gemini 1.5, voice input (Web Speech API), and Hindi text-to-speech output.
- **Technologies:** Built with Next.js 16 (App Router), Supabase (Auth and Database), and Tailwind CSS v4.
- **Project Structure:** Outlines the directory layout, setup instructions, and primary API endpoints (`/api/guidance`, `/api/tts`).

---

## 2. [FRONTEND_WORKFLOW.md](file:///Users/akshat/Desktop/student-saarthi/Student-Saarthi/FRONTEND_WORKFLOW.md)
**Overview:** Detailed architecture and user journey documentation for the frontend.
- **Architecture:** Explains the strategic use of React Server Components (fetching/pre-rendering) versus Client Components (interactivity, Web APIs).
- **Workflows:** Tracks the user from landing to authentication (Supabase SSR), through the multi-step quiz, and finally to the AI-generated guidance and resources.
- **Themes:** Details the implementation of dark/light modes using `next-themes` and the `shadcn/ui` component system.

---

## 3. [BACKEND_INTERVIEW_QUESTIONS.md](file:///Users/akshat/Desktop/student-saarthi/Student-Saarthi/BACKEND_INTERVIEW_QUESTIONS.md)
**Overview:** Technical interview preparation focused on the backend architecture.
- **Core Topics:** Explains Next.js Route Handlers vs. Server Actions, secure environment variable management, and Supabase SSR authentication cycles.
- **Integration:** Deep dives into the backend logic for Gemini AI structured JSON output and Google Cloud TTS audio streaming.
- **Scaling & Security:** Covers PostgreSQL Row Level Security (RLS) policies, rate limiting, and performance optimizations like streaming responses.

---

## 4. [FRONTEND_INTERVIEW_QUESTIONS.md](file:///Users/akshat/Desktop/student-saarthi/Student-Saarthi/FRONTEND_INTERVIEW_QUESTIONS.md)
**Overview:** Technical interview preparation focused on frontend engineering.
- **React Patterns:** Focuses on the distinction between Server and Client Components, state management with `react-hook-form`, and `zod` validation.
- **Interactive Features:** Discusses the implementation and fallback strategies for the Web Speech API and the `next-themes` dark mode selector.
- **UI & Performance:** Explains the `cn()` utility in Shadcn/UI, Tailwind CSS v4 features, and Next.js navigation optimizations like `loading.tsx` and `useTransition`.

---

## 5. [INTERVIEW_QUESTIONS.md](file:///Users/akshat/Desktop/student-saarthi/Student-Saarthi/INTERVIEW_QUESTIONS.md)
**Overview:** A holistic collection of interview questions covering the entire application lifecycle.
- **Architecture:** Reinforces concepts related to Next.js 16, Supabase, and Gemini integration.
- **Full-Stack Logic:** Details user profile creation triggers, the data flow for Hindi TTS, and common hurdles like migrating to SSR authentication.
- **Scaling:** Addresses potential bottlenecks such as database connection overhead and API rate limits, proposing solutions like connection pooling and background processing.
