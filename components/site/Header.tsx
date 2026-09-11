"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Sparkles,
  Compass,
  Calendar,
  Building2,
  Calculator,
  BrainCircuit,
  Menu,
  X,
  GraduationCap,
} from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const navLinks = [
    {
      name: "Deep Research",
      href: "/research",
      icon: Sparkles,
      highlight: true,
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

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center p-3 md:p-4">
      <header className="w-full max-w-6xl rounded-full border border-border/80 bg-background/85 backdrop-blur-xl shadow-md pill-shadow supports-[backdrop-filter]:bg-background/70 transition-all duration-300">
        <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-extrabold text-lg sm:text-xl tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black text-sm">
              <GraduationCap className="h-4 w-4" />
            </div>
            <span className="bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground bg-clip-text">
              Student Saarthi
            </span>
            <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-bold uppercase tracking-wider">
              AI 2.0
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    size="sm"
                    className={`rounded-full text-xs font-semibold px-3.5 h-8 transition-all ${
                      item.highlight && !isActive
                        ? "text-primary hover:bg-primary/10"
                        : ""
                    }`}
                  >
                    <Icon className={`h-3.5 w-3.5 mr-1.5 ${item.highlight ? "text-primary" : ""}`} />
                    {item.name}
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {user ? (
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-xs font-medium px-3 py-1 bg-secondary rounded-full">
                  👋 {user.user_metadata?.full_name || "Student"}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full text-xs h-8"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Link href="/login" className="hidden sm:inline-block">
                <Button
                  variant="default"
                  size="sm"
                  className="rounded-full font-semibold text-xs px-4 h-8 shadow-sm"
                >
                  Sign In
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden p-1.5 h-8 w-8 rounded-full"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 pb-4 pt-2 border-t border-border/60 animate-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-2 gap-2 pt-2">
              {navLinks.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button
                      variant={isActive ? "secondary" : "outline"}
                      size="sm"
                      className="w-full justify-start text-xs rounded-xl h-9 font-medium"
                    >
                      <Icon className="h-3.5 w-3.5 mr-2 text-primary" />
                      {item.name}
                    </Button>
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-border/40 mt-3 flex items-center justify-between">
              {user ? (
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs text-muted-foreground">
                    Logged in as {user.user_metadata?.full_name || "Student"}
                  </span>
                  <Button variant="ghost" size="sm" onClick={handleLogout} className="text-xs h-7">
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Link href="/login" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                  <Button size="sm" className="w-full rounded-xl text-xs">
                    Sign In to Student Saarthi
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
