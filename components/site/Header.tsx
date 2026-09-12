"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";
import {
  Search,
  Compass,
  Calendar,
  Building2,
  Calculator,
  BrainCircuit,
  Menu,
  X,
} from "lucide-react";
import { LogoMark } from "@/components/common/LogoMark";

export function Header() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const supabase = getSupabaseBrowserClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  // Scroll detection: when scrolled, show a frosted glass background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const navLinks = [
    {
      name: "Deep Research",
      href: "/research",
      icon: Search,
    },
    {
      name: "Exam Radar",
      href: "/exams",
      icon: Calendar,
    },
    {
      name: "Simulator",
      href: "/simulator",
      icon: Compass,
    },
    {
      name: "Colleges",
      href: "/colleges",
      icon: Building2,
    },
    {
      name: "ROI Calculator",
      href: "/calculator",
      icon: Calculator,
    },
    {
      name: "Aptitude Quiz",
      href: "/quiz",
      icon: BrainCircuit,
    },
  ];

  // Light page detection: light background pages use dark forest text (#0f291e)
  const isLightPage = pathname !== "/quiz";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-8 lg:px-12 transition-all duration-300 flex items-center justify-between ${
        scrolled
          ? isLightPage
            ? "bg-white/85 backdrop-blur-xl border-b border-black/10 shadow-sm py-2.5 sm:py-3"
            : "bg-[#0a0908]/85 backdrop-blur-xl border-b border-white/15 shadow-sm py-2.5 sm:py-3"
          : "bg-transparent py-3.5 sm:py-4.5"
      }`}
    >
      {/* Brand Logo */}
      <Link
        href="/"
        className={`group font-extrabold text-lg sm:text-xl tracking-tight flex items-center gap-2.5 transition-colors ${
          isLightPage ? "text-[#0f291e]" : "text-white"
        }`}
      >
        <LogoMark
          size={24}
          className="shrink-0 transition-transform duration-500 group-hover:rotate-45"
        />
        <span className="font-outfit font-bold tracking-tight">Student Saarthi</span>
        <span
          className={`hidden sm:inline-block font-mono text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded-sm border font-semibold ${
            isLightPage
              ? "border-[#0f291e]/20 text-[#0f291e]/80 bg-[#0f291e]/5"
              : "border-white/20 text-white/80 bg-white/5"
          }`}
        >
          AI 2.0
        </span>
      </Link>

      {/* Desktop Navigation Links */}
      <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
        {navLinks.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative font-outfit text-xs xl:text-sm font-semibold transition-colors py-1 ${
                isLightPage
                  ? isActive
                    ? "text-[#0f291e] font-bold"
                    : "text-[#0f291e]/75 hover:text-[#0f291e]"
                  : isActive
                    ? "text-white font-bold"
                    : "text-white/75 hover:text-white"
              }`}
            >
              <span>{item.name}</span>
              {isActive && (
                <span
                  className={`absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full ${
                    isLightPage ? "bg-[#0f291e]" : "bg-white"
                  }`}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Right Action Area */}
      <div className="flex items-center gap-3">
        {user ? (
          <div className="hidden sm:flex items-center gap-2.5">
            <span
              className={`font-outfit text-xs px-2.5 py-1 rounded-sm font-medium border ${
                isLightPage
                  ? "bg-black/5 text-[#0f291e] border-black/10"
                  : "bg-white/10 text-white border-white/15"
              }`}
            >
              👋 {user.user_metadata?.full_name || "Student"}
            </span>
            <button
              onClick={handleLogout}
              className={`font-outfit text-xs transition-colors px-1.5 py-1 ${
                isLightPage
                  ? "text-[#0f291e]/70 hover:text-[#0f291e]"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <Link href="/login" className="hidden sm:inline-block">
            <button
              className={`h-8 px-4 rounded-sm font-outfit text-xs font-semibold tracking-wide transition-all shadow-xs cursor-pointer ${
                isLightPage
                  ? "bg-[#0f291e] text-white hover:bg-[#183e2e]"
                  : "bg-white text-[#0a0908] hover:bg-white/90"
              }`}
            >
              Sign In
            </button>
          </Link>
        )}

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`lg:hidden p-1.5 rounded-sm transition-colors cursor-pointer ${
            isLightPage
              ? "text-[#0f291e] hover:bg-black/5"
              : "text-white hover:bg-white/10"
          }`}
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden absolute top-full left-0 right-0 px-4 py-4 backdrop-blur-2xl border-b shadow-2xl space-y-3 ${
            isLightPage
              ? "bg-white/95 border-black/10 text-[#0f291e]"
              : "bg-[#0a0908]/95 border-white/15 text-white"
          }`}
        >
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 p-2 rounded-sm text-xs font-outfit font-medium transition-all ${
                    isActive
                      ? isLightPage
                        ? "bg-[#0f291e] text-white font-bold"
                        : "bg-white text-[#0a0908] font-bold"
                      : isLightPage
                        ? "bg-black/5 text-[#0f291e] hover:bg-black/10"
                        : "bg-white/10 text-white hover:bg-white/15"
                  }`}
                >
                  <Icon size={14} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
            {user ? (
              <div className="flex items-center justify-between w-full">
                <span className="font-outfit text-xs opacity-75">
                  {user.user_metadata?.full_name || "Student"}
                </span>
                <button
                  onClick={handleLogout}
                  className="font-outfit text-xs text-red-600 font-semibold"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                <button className="w-full py-2 font-outfit text-xs font-semibold rounded-sm bg-[#0f291e] text-white text-center tracking-wider hover:bg-[#183e2e] shadow-md">
                  Sign In to Student Saarthi
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
