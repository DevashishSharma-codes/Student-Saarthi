# Frontend Interview Questions for Student Saarthi

This document outlines frontend-specific interview questions and answers tailored to the **Student Saarthi** application, which is built with Next.js 16 (App Router), React 19, Tailwind CSS v4, and `shadcn/ui`.

---

## 1. React Server Components (RSC) vs Client Components

**Q1: In the App Router of Next.js 16, components default to being Server Components. How do you decide when to add the `'use client'` directive to a component in this project?**
**Answer:** I only add the `'use client'` directive at the top of a file when the component requires interactivity or browser APIs that the server does not have access to. Specifically, I use it when I need React hooks for state and lifecycle management (`useState`, `useEffect`, `useRef`), when I need to attach event listeners (like `onClick` or `onChange` on forms), or when using browser-exclusive APIs like the Web Speech API (for the microphone feature) or `window.matchMedia` (for detecting dark mode preferences). 

**Q2: Since `shadcn/ui` components are copied directly into the project rather than installed as a library, how do you handle the mix of Server and Client components within that ecosystem?**
**Answer:** Most basic `shadcn/ui` components (like a simple `<Button>` or `<Card>`) can remain Server Components if they just render HTML. However, interactive components from Shadcn, which are built on Radix UI primitives (like Dialogs, Dropdowns, or Selects), inherently require state management for their open/close functionality. For those specific files, the `'use client'` directive is required at the top of the Shadcn component file itself, allowing me to import them into my Server Components seamlessly.

---

## 2. State Management & Data Fetching

**Q3: How do you handle form state and validation during the "Quiz" section of the app before submitting the data to the Gemini API?**
**Answer:** I utilize `react-hook-form` coupled with `zod` for schema validation. This combination prevents unnecessary re-renders during typing (compared to standard controlled standard inputs via `useState`) and ensures the data perfectly matches the required structure before it is ever sent to the backend. It also allows me to easily trigger accessible error states and styling changes on the Shadcn inputs depending on whether a field is valid or empty.

**Q4: Instead of using `useEffect` for data fetching on the client side, how is data loading generally handled in the App Router for pages like the "Academic Timeline" or "Colleges"?**
**Answer:** In the Next.js App Router, I perform data fetching directly inside Server Components by making the component an `async` function and using `await fetch()` or direct database calls (like querying Supabase). This eliminates the waterfall loading issues of client-side `useEffect` fetching and ensures the HTML sent to the browser is fully populated, improving SEO and Time to Interactive (TTI).

---

## 3. Web APIs & Interactivity

**Q5: The Speech-to-Text feature uses the Web Speech API. Explain how you capture the user's speech and update the React state with the transcription.**
**Answer:** I created a custom Client Component that instantiates `window.SpeechRecognition` (or `webkitSpeechRecognition`). I attach a `.onresult` event listener to the recognition instance. When the user speaks, the API fires this event containing the transcript string. I then capture this string and update my local React state (or my `react-hook-form` value) representing the current quiz answer, which automatically updates the UI to show the user what was heard.

**Q6: What happens if a student is using a browser that does not support the Web Speech API or denies microphone permissions? How did you design the fallback?**
**Answer:** Progressive enhancement is key here. Before rendering the microphone button, the component checks if the API exists on the `window` object. If it doesn't, the microphone UI simply doesn't render. The fundamental text input area is always present as the core input method. If a user denies permission when they click the mic, I catch that specific error event from the Speech API and display an error toast (using the `sonner` library), directing them to use the text input instead.

---

## 4. UI/UX, Tailwind CSS, & Theming

**Q7: You are using Tailwind CSS v4 in this project. How does your dark mode toggle implementation work at the DOM level, and how does Tailwind react to it?**
**Answer:** I implemented dark mode using `next-themes`. The `ThemeProvider` from `next-themes` manages detecting system preferences or manual user toggles. When the theme is strictly set to "dark", the provider injects the `dark` CSS class directly onto the global `<html>` element. I configured Tailwind CSS to use the `selector` strategy for dark mode. This means any utility classes prefixed with `dark:` (e.g., `text-slate-900 dark:text-gray-100`) will automatically apply their styling whenever that HTML tag possesses the `dark` class, creating an instant theme switch without full page reloads.

**Q8: Explain the role of the `cn()` utility function (class names utility) heavily utilized in Shadcn UI components.**
**Answer:** The `cn()` function is a wrapper that combines `clsx` and `tailwind-merge`. `clsx` allows for conditional rendering of classes (e.g., adding a disabled opacity class only if a disabled prop is active). However, standard conditional classes in Tailwind can cause specificity conflicts if multiple classes target the same property (like `px-2` and `px-4`). The `tailwind-merge` portion intelligently resolves these conflicts by ensuring the explicitly passed overriding class "wins", which is crucial for creating highly reusable and customizable UI components in Next.js.

---

## 5. Performance Optimization

**Q9: When navigating from the specific Quiz page to the generated AI Guidance page, the user has to wait for the Gemini API. How do you handle Next.js routing performance to ensure the user doesn't think the app is frozen?**
**Answer:** I utilize Next.js's built-in `loading.tsx` file for the guidance route, which displays a loading skeleton or a custom spinner immediately upon navigation. Furthermore, if I'm navigating via the `useRouter()` hook or `<Link>`, I can wrap the dynamic operation in React's `useTransition` hook to keep the UI responsive, allowing me to show an inline loading state on the Quiz submit button itself while the next route is fetching its async data on the server.
