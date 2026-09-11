# Frontend Workflow & Architecture: Student Saarthi

This document outlines the primary user journeys, state management, and component architecture for the frontend of the **Student Saarthi** application built on Next.js 16.

---

## 1. Core User Journeys
The frontend is designed around a clean, linear flow guiding 10th-grade students from onboarding to actionable career advice.

### A. Authentication Flow
1. **Landing:** The user arrives at `/` (Homepage).
2. **Login/Signup:** The user navigates to `/login`.
    *   **UI:** `shadcn/ui` forms collect the email/password or OTP (if configured).
    *   **Action:** Supabase Auth methods are called securely via Server Actions or Client supabase instances.
    *   **Middleware:** The Next.js middleware in `proxy.ts` intercepts this request, validates the session, sets secure HTTP-only cookies, and redirects the user to protected routes (like their dashboard or quiz).

### B. The Quiz Flow (`/quiz`)
The core data collection mechanism of the app.
1. **Component Initialization:** A Client Component mounts, rendering the first of 8 aptitude/interest questions.
2. **Input Methods:**
    *   **Text Input:** Standard typing using controlled inputs managed by `react-hook-form`.
    *   **Voice Input:** The user clicks the microphone icon. The app initializes the `window.SpeechRecognition` API. As the user speaks, the transcript updates the form state in real-time.
3. **Validation & Progress:** `zod` schema validates each answer before allowing the user to proceed to the next question. A progress bar component visually indicates completion status.
4. **Submission:** Upon completing the final question, a Server Action or fetch call is made to the `/api/guidance` backend, submitting the accumulated JSON answers. A loading state (skeleton or spinner) is triggered.

### C. AI Guidance Display (`/guidance`)
This route receives and displays the structured JSON response from the Gemini API.
1. **Server Rendering:** The Next.js server deeply parses the JSON (containing `stream`, `rationale`, `careers`, `subjects`). The `page.tsx` directly renders this into categorized `shadcn/ui` Cards.
2. **Audio Playback (TTS):** 
    *   A Client Component attached to these cards allows the user to click "Listen in Hindi."
    *   This triggers a fetch to `/api/tts`, which streams back an `audio/mpeg` buffer.
    *   An HTML5 `<audio>` element plays the translated and synthesized guidance to the student.

### D. Academic Timeline & College Information (`/timeline`, `/colleges`)
Static and dynamically fetched reference data to assist the student after receiving their AI guidance.
1. **Timeline:** Visually outlines the steps from 10th grade through 12th grade and degree completion using vertical timeline components.
2. **Colleges:** Maps the recommended streams (Science, Commerce, Arts) to top-tier Indian institutions, heavily utilizing grid layouts (`grid-cols-1 md:grid-cols-3`) with Tailwind CSS for responsiveness.

---

## 2. Component Architecture Overview

### Server Components (Default)
Most routes (`app/page.tsx`, `app/guidance/page.tsx`) are React Server Components.
*   **Purpose:** They fetch session data from Supabase directly in the Next.js Node environment, compile the initial UI, and send pre-rendered HTML to the browser.
*   **Benefit:** Zero JavaScript bundle size overhead for these static parts, ensuring rapid loading on mobile networks.

### Client Components (`'use client'`)
Used surgically throughout the application for interactivity.
*   **Voice Inputs:** Components interfacing with the Web Speech API inherently require the browser environment.
*   **Theme Toggle:** The `next-themes` dark/light mode switcher relies on `window.matchMedia` and local storage.
*   **Forms:** The quiz navigation and client-side validation rely on React (`useState`, `useForm`).

### Styling & Theming
*   **Tailwind CSS v4:** Utility-first styling is used exclusively.
*   **shadcn/ui:** Unstyled, accessible components (like Accordions, Dialogs, Cards) are customized via standard Tailwind classes resulting in a minimal, highly specific CSS bundle.
*   **Dark Mode:** Controlled by `next-themes` injecting the `dark` class into the DOM relative to user/system preferences.
