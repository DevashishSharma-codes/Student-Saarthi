import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import "lenis/dist/lenis.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Grain } from "@/components/common/Grain";
import SmoothScroll from "@/components/providers/SmoothScroll";

export const metadata: Metadata = {
  title: "Student Saarthi — Real-Time Higher Ed & Career Intelligence",
  description:
    "AI-powered decision support system for Indian students after 10th and 12th standards, powered by Gemini 2.5 Flash and real-time search grounding.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=Kalam:wght@400;700&family=Patrick+Hand&family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600&family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased font-sans bg-[#0a0908] text-[#f7f4ee] selection:bg-[#f7f4ee] selection:text-[#0a0908] relative">
        <SmoothScroll>
          <Grain />
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            forcedTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            {children}
            <Toaster richColors />
          </ThemeProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
