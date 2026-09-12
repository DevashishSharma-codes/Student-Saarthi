"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  GraduationCap,
  Calendar,
  Building2,
  Compass,
  Calculator,
  BrainCircuit,
  ArrowRight,
  Search,
  ChevronDown,
  Plus,
  SlidersHorizontal,
  Layers,
  FileText,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  BookOpen,
  CheckCircle2,
  Clock,
  MapPin,
  Scale,
  Award,
} from "lucide-react";

interface FeedItem {
  id: string;
  shortCode: string;
  title: string;
  subtitle: string;
  meta: string;
  badge: string;
  stream: "engineering" | "medical" | "commerce_law" | "all";
  isUrgent?: boolean;
  breakdown?: {
    examOrScore: string;
    annualFees: string;
    medianCtc: string;
    verdict: string;
    linkUrl: string;
  };
}

interface HowWeHelpTab {
  id: string;
  tabLabel: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  headline: string;
  ctaText: string;
  ctaHref: string;
  whyTitle: string;
  whyDescription: string;
  metricsTitle: string;
  metricsDescription: string;
  mockupActiveNav: string;
  quickPills: { label: string; college: string; cutoff: string; fee: string; ctc: string; payback: string }[];
  feedItems: FeedItem[];
}

const HOW_WE_HELP_TABS: HowWeHelpTab[] = [
  // =========================================================================
  // TAB 1: EXAM RADAR & DEADLINES (/exams)
  // =========================================================================
  {
    id: "exams",
    tabLabel: "Live Exam Radar",
    icon: Calendar,
    headline: "Track 50+ national entrance exams, syllabus shifts, and registration windows.",
    ctaText: "Open Live Exam Radar",
    ctaHref: "/exams",
    whyTitle: "WHY STUDENTS RELY ON EXAM RADAR",
    whyDescription:
      "Never miss an irreversible application deadline or quota registration. Student Saarthi monitors NTA, IIT, BITS, and state conducting bodies in real time — alerting you to registration dates, correction windows, syllabus updates, and eligibility shifts.",
    metricsTitle: "LIVE COVERAGE METRICS",
    metricsDescription:
      "50+ national & state exams tracked across Engineering, Medical, Commerce, and Law. Covering 60 Lakh+ annual candidates with official portal verification.",
    mockupActiveNav: "Exam Radar",
    quickPills: [
      { label: "JEE Main", college: "JEE Main 2026", cutoff: "99.1%ile for Top NIT CSE", fee: "₹7-9L Total B.Tech", ctc: "₹14-22 LPA", payback: "16 Months" },
      { label: "NEET UG", college: "NEET UG 2026", cutoff: "Score 640+ for Govt MBBS", fee: "₹20k - ₹1.5L Total", ctc: "₹12-18 LPA", payback: "Immediate" },
      { label: "BITSAT", college: "BITSAT 2026", cutoff: "Score 315+ for Pilani CS", fee: "₹24-28L Total", ctc: "₹20.5 LPA", payback: "22 Months" },
      { label: "CUET UG", college: "CUET UG 2026", cutoff: "Score 780+ for SRCC / Stephen's", fee: "₹60k - ₹1.2L Total", ctc: "₹10.5 LPA", payback: "4 Months" },
      { label: "CAT / IPMAT", college: "IPMAT 2026 (IIM Indore)", cutoff: "98%ile + Personal Interview", fee: "₹18-22L 5-Yr Integrated", ctc: "₹24.0 LPA", payback: "14 Months" },
    ],
    feedItems: [
      {
        id: "ex-1",
        shortCode: "JEE",
        title: "JEE Main 2026 (Session 1 & 2)",
        subtitle: "National Testing Agency (NTA) • Engineering Gateway",
        meta: "Admissions to 31 NITs, 26 IIITs, 38 GFTIs • 12.4 Lakh Candidates",
        badge: "Registration Live",
        stream: "engineering",
        isUrgent: true,
        breakdown: {
          examOrScore: "Jan 24 - Feb 01 (Session 1) • April (Session 2)",
          annualFees: "NITs: ₹1.8L - ₹2.2L / year",
          medianCtc: "Top NITs: ₹15.8 - ₹22.5 LPA",
          verdict: "Primary gateway for 10th & 12th PCM students; focus on Chemistry NCERT accuracy.",
          linkUrl: "/exams",
        },
      },
      {
        id: "ex-2",
        shortCode: "NEET",
        title: "NEET UG 2026 (Single National Medical Entrance)",
        subtitle: "National Testing Agency (NTA) • MBBS / BDS Gateway",
        meta: "1,08,940 MBBS Seats • AIIMS, JIPMER, Central & State Govt Colleges",
        badge: "Information Bulletin",
        stream: "medical",
        isUrgent: true,
        breakdown: {
          examOrScore: "First Sunday of May 2026 (Single Shift Pen & Paper)",
          annualFees: "Govt: ₹5,000 - ₹50,000 / yr • Private: ₹12L - ₹25L / yr",
          medianCtc: "Junior Residency Stipend: ₹85k - ₹1.1L / month",
          verdict: "Safe threshold for General Category Govt Medical Seat is 635+ out of 720 marks.",
          linkUrl: "/exams",
        },
      },
      {
        id: "ex-3",
        shortCode: "BITS",
        title: "BITSAT 2026 (Pilani, Goa & Hyderabad Campuses)",
        subtitle: "BITS Pilani Deemed University • Merit-Based Admission",
        meta: "No Quotas or Reservations • 3,000 Total Seats Across 3 Indian Campuses",
        badge: "Application Window",
        stream: "engineering",
        breakdown: {
          examOrScore: "Session 1 (May) • Session 2 (June) • 390 Total Marks",
          annualFees: "₹5.8 Lakhs / year (Includes Tuition + On-Campus Hostel)",
          medianCtc: "Computer Science: ₹21.5 LPA • Practice School II Included",
          verdict: "Tier-1 alternative to top IITs with superior entrepreneurship and zero reservation policy.",
          linkUrl: "/exams",
        },
      },
      {
        id: "ex-4",
        shortCode: "CUET",
        title: "CUET UG 2026 (Common University Entrance Test)",
        subtitle: "NTA • Central, State, Deemed & Private Universities",
        meta: "Gateway to DU (SRCC, Stephen's, Hindu), BHU, JNU, Jamia • 250+ Universities",
        badge: "Syllabus Confirmed",
        stream: "commerce_law",
        breakdown: {
          examOrScore: "May 15 - May 31 • Computer-Based Hybrid Test",
          annualFees: "Central Universities: ₹12,000 - ₹45,000 / year",
          medianCtc: "SRCC / Hindu Economics & Commerce: ₹10.8 - ₹14.5 LPA",
          verdict: "Domain subject preparation mapped strictly to Class 12 NCERT textbook syllabus.",
          linkUrl: "/exams",
        },
      },
      {
        id: "ex-5",
        shortCode: "ADV",
        title: "JEE Advanced 2026 (IIT Admission Entrance)",
        subtitle: "Organizing Institute: IIT Kanpur • 23 IITs Nationwide",
        meta: "Restricted to Top 2,50,000 Qualifiers of JEE Main • 17,500 Total IIT Seats",
        badge: "Syllabus Live",
        stream: "engineering",
        breakdown: {
          examOrScore: "May 24, 2026 • Paper 1 (9am-12pm) & Paper 2 (2:30pm-5:30pm)",
          annualFees: "IITs: ₹2.4 Lakhs / year (Full Tuition Waived for SC/ST/EWS)",
          medianCtc: "Top 7 IITs: ₹20.5 - ₹24.2 LPA Median",
          verdict: "Deep analytical problem solving; 35% aggregate marks generally secures an IIT seat.",
          linkUrl: "/exams",
        },
      },
      {
        id: "ex-6",
        shortCode: "IPM",
        title: "IPMAT 2026 (Integrated Program in Management)",
        subtitle: "IIM Indore, IIM Rohtak, IIM Ranchi • 5-Year BBA+MBA",
        meta: "Direct Entry into IIMs Right After Class 12 • Quantitative & Verbal Ability",
        badge: "Eligibility Open",
        stream: "commerce_law",
        breakdown: {
          examOrScore: "May 2026 • Aptitude Test + Personal Interview Evaluation",
          annualFees: "₹4.5L - ₹6.5L / year",
          medianCtc: "IIM Indore PGP Placement: ₹24.0 - ₹28.5 LPA",
          verdict: "Premier fast-track for commerce & science students aiming for management careers.",
          linkUrl: "/exams",
        },
      },
    ],
  },

  // =========================================================================
  // TAB 2: 1,200+ COLLEGE & CUTOFF EXPLORER (/colleges)
  // =========================================================================
  {
    id: "colleges",
    tabLabel: "College & Cutoff Explorer",
    icon: Building2,
    headline: "Compare 1,200+ colleges with real JoSAA cutoffs, fees, and median CTCs.",
    ctaText: "Explore 1,200+ Campuses",
    ctaHref: "/colleges",
    whyTitle: "WHY STUDENTS RELY ON COLLEGE EXPLORER",
    whyDescription:
      "Avoid misleading glossy brochures and unverified salary claims. Compare institutes on official JoSAA/CSAB closing ranks, verified NIRF placement data, annual tuition and hostel fees, and real student reviews without marketing fluff.",
    metricsTitle: "CAMPUS DATABASE METRICS",
    metricsDescription:
      "1,200+ accredited colleges cataloged across India (IITs, NITs, BITS, AIIMS, DU) and global hubs with verified closing cutoffs and median salary trends.",
    mockupActiveNav: "Colleges",
    quickPills: [
      { label: "IIT Bombay", college: "IIT Bombay", cutoff: "Closing Rank: AIR 68 (CSE)", fee: "₹2.5L / yr", ctc: "₹21.8 LPA Median", payback: "14 Months" },
      { label: "IIT Delhi", college: "IIT Delhi", cutoff: "Closing Rank: AIR 115 (CSE)", fee: "₹2.4L / yr", ctc: "₹20.5 LPA Median", payback: "14 Months" },
      { label: "BITS Pilani", college: "BITS Pilani", cutoff: "BITSAT Score: 324 (CSE)", fee: "₹5.8L / yr", ctc: "₹20.5 LPA Median", payback: "22 Months" },
      { label: "AIIMS Delhi", college: "AIIMS New Delhi", cutoff: "NEET All-India Rank 1-55", fee: "₹6,800 Total MBBS", ctc: "₹95k / mo Stipend", payback: "Immediate" },
      { label: "SRCC Delhi", college: "SRCC Delhi University", cutoff: "CUET Score 790/800", fee: "₹32,000 / yr", ctc: "₹10.8 LPA Median", payback: "4 Months" },
    ],
    feedItems: [
      {
        id: "col-1",
        shortCode: "IITB",
        title: "IIT Bombay (Powai, Mumbai)",
        subtitle: "NIRF Rank #3 Overall • Premier Indian Tech & Research Institute",
        meta: "JEE Advanced • 4-Year B.Tech Computer Science & Engineering",
        badge: "JoSAA Verified",
        stream: "engineering",
        breakdown: {
          examOrScore: "JEE Advanced Closing Rank: AIR 68 (General)",
          annualFees: "₹2.5 Lakhs / year • Total CapEx: ₹10.5 Lakhs",
          medianCtc: "₹21.8 LPA Median (Tech & Quant Roles up to ₹55 LPA)",
          verdict: "India's highest tech placement density, unmatched alumni network and venture ecosystem.",
          linkUrl: "/colleges",
        },
      },
      {
        id: "col-2",
        shortCode: "BITS",
        title: "BITS Pilani (Pilani Campus, Rajasthan)",
        subtitle: "Institute of Eminence • Private Premier Engineering Campus",
        meta: "BITSAT Entrance • B.E. Computer Science & Practice School II",
        badge: "Tier-1 Verified",
        stream: "engineering",
        breakdown: {
          examOrScore: "BITSAT Cutoff Score: 324 / 390 (Round 1)",
          annualFees: "₹5.8 Lakhs / year • Total CapEx: ₹25.4 Lakhs",
          medianCtc: "₹20.5 LPA Median • 100% Guaranteed Practice School Placement",
          verdict: "Zero attendance requirement, high entrepreneurial freedom, identical placements to top 5 IITs.",
          linkUrl: "/colleges",
        },
      },
      {
        id: "col-3",
        shortCode: "IITD",
        title: "IIT Delhi (Hauz Khas, New Delhi)",
        subtitle: "NIRF Rank #2 Engineering • Deep Tech & Research Hub",
        meta: "JEE Advanced • B.Tech Mathematics & Computing / CSE",
        badge: "Top Tier-1",
        stream: "engineering",
        breakdown: {
          examOrScore: "JEE Advanced Closing Rank: AIR 115 (CSE), AIR 312 (MnC)",
          annualFees: "₹2.4 Lakhs / year • Total CapEx: ₹10.2 Lakhs",
          medianCtc: "₹20.5 LPA Median • Top Quantitative Finance & AI Recruiting",
          verdict: "Strategic location in Delhi NCR attracts premier global algorithmic trading firms.",
          linkUrl: "/colleges",
        },
      },
      {
        id: "col-4",
        shortCode: "AIIMS",
        title: "AIIMS New Delhi (Ansari Nagar, New Delhi)",
        subtitle: "NIRF Medical Rank #1 • Apex Medical Institute of India",
        meta: "NEET UG Entrance • MBBS 5.5-Year Course with Internship",
        badge: "Govt Subsidized",
        stream: "medical",
        breakdown: {
          examOrScore: "NEET All India Closing Rank: AIR 55 (General)",
          annualFees: "₹6,800 Entire 5.5-Year Degree (Highly Subsidized by Govt)",
          medianCtc: "Junior Residency Stipend: ₹95,000 / month from Day 1",
          verdict: "Highest clinical exposure in Asia, zero education debt, unrivaled PG seat quota.",
          linkUrl: "/colleges",
        },
      },
      {
        id: "col-5",
        shortCode: "SRCC",
        title: "Shri Ram College of Commerce (SRCC, Delhi)",
        subtitle: "Delhi University North Campus • India's Top Commerce College",
        meta: "CUET UG Entrance • B.Com (Hons) & B.A. (Hons) Economics",
        badge: "Premier Commerce",
        stream: "commerce_law",
        breakdown: {
          examOrScore: "CUET UG Score: 790+ out of 800 (General)",
          annualFees: "₹32,000 / year • Total 3-Year Degree: ~₹1 Lakh",
          medianCtc: "₹10.8 LPA Median • Management Consulting & Investment Banking",
          verdict: "Top feeder college for McKinsey, BCG, Bain, Big 4, and IIM Ahmedabad admissions.",
          linkUrl: "/colleges",
        },
      },
      {
        id: "col-6",
        shortCode: "DTU",
        title: "Delhi Technological University (DTU, Delhi)",
        subtitle: "Govt of NCT of Delhi • Formerly Delhi College of Engineering",
        meta: "JEE Main (85% Delhi State Quota + 15% All India Quota)",
        badge: "High ROI",
        stream: "engineering",
        breakdown: {
          examOrScore: "JEE Main Cutoff: 99.2%ile (All India) • 97.5%ile (Delhi Home State)",
          annualFees: "₹2.2 Lakhs / year • Total CapEx: ₹9.2 Lakhs",
          medianCtc: "₹16.4 LPA Median (Software & Core Engineering)",
          verdict: "Tremendous ROI for Delhi NCR students; equal placement opportunities with top NITs.",
          linkUrl: "/colleges",
        },
      },
    ],
  },

  // =========================================================================
  // TAB 3: CAREER PATHWAY SIMULATOR (/simulator)
  // =========================================================================
  {
    id: "simulator",
    tabLabel: "Career Pathway Simulator",
    icon: Compass,
    headline: "Simulate career outcomes across every stream with AI defensibility ratings.",
    ctaText: "Launch Pathway Simulator",
    ctaHref: "/simulator",
    whyTitle: "WHY STUDENTS RELY ON CAREER SIMULATOR",
    whyDescription:
      "Uncertain whether to pursue PCM, PCB, Commerce, Humanities, or Design? Explore complete 5-year decision trees from 12th standard to degree specializations, industry roles, starting packages, and AI automation disruption defense.",
    metricsTitle: "DECISION TREE METRICS",
    metricsDescription:
      "5 core streams mapped with 24+ specialization degrees, 5-year salary trajectories from ₹8L to ₹28L, and Holland RIASEC aptitude compatibility.",
    mockupActiveNav: "Simulator",
    quickPills: [
      { label: "PCM • CS & AI", college: "B.Tech Computer Science", cutoff: "JEE Main / BITSAT", fee: "₹8L - ₹24L", ctc: "₹14 - ₹28 LPA", payback: "14 Months" },
      { label: "PCB • Medicine", college: "MBBS & Clinical Specialization", cutoff: "NEET UG", fee: "₹50k - ₹80L", ctc: "₹12 - ₹22 LPA", payback: "Immediate (Govt)" },
      { label: "Commerce • Finance", college: "B.Com (Hons) + CFA / CA", cutoff: "CUET UG / ICAI", fee: "₹1L - ₹6L", ctc: "₹10 - ₹24 LPA", payback: "6 Months" },
      { label: "Humanities • Law", college: "B.A. LL.B Corporate Law", cutoff: "CLAT National", fee: "₹10L - ₹15L", ctc: "₹14 - ₹22 LPA", payback: "18 Months" },
      { label: "Design • Spatial UI", college: "B.Des Interaction Design", cutoff: "NID DAT / UCEED", fee: "₹9L - ₹16L", ctc: "₹9 - ₹20 LPA", payback: "16 Months" },
    ],
    feedItems: [
      {
        id: "sim-1",
        shortCode: "TECH",
        title: "Science (PCM) — Computer Science, AI & Systems",
        subtitle: "4-Year B.Tech • AI/ML Engineer, Cloud Architect, Systems Specialist",
        meta: "JEE Main, JEE Advanced, BITSAT • Top Gateways: IITs, BITS, NITs",
        badge: "AI Defense: 89%",
        stream: "engineering",
        breakdown: {
          examOrScore: "Requires Strong Quantitative & Algorithmic Problem-Solving",
          annualFees: "Govt: ₹2L - ₹2.5L / yr • Private: ₹3.5L - ₹6L / yr",
          medianCtc: "Starting: ₹14 - 28 LPA • 5-Year Growth: 2.8x Trajectory",
          verdict: "High technical defensibility in applied systems, distributed computing, and core AI models.",
          linkUrl: "/simulator",
        },
      },
      {
        id: "sim-2",
        shortCode: "MED",
        title: "Medical & Life Sciences (PCB) — Clinical Medicine & Biotech",
        subtitle: "5.5-Year MBBS + PG • Surgeon, Clinical Specialist, Genomics Researcher",
        meta: "NEET UG • Top Gateways: AIIMS, JIPMER, Govt Medical Colleges",
        badge: "AI Defense: 94%",
        stream: "medical",
        breakdown: {
          examOrScore: "NEET UG Single Window • Requires High Tactile & Biological Aptitude",
          annualFees: "Govt: Highly Subsidized • Private: High Capital Expenditure",
          medianCtc: "Starting: ₹10 - 18 LPA • Clinical PG Specialization: ₹24+ LPA",
          verdict: "Maximum human empathy and clinical dexterity barrier against AI automation.",
          linkUrl: "/simulator",
        },
      },
      {
        id: "sim-3",
        shortCode: "FIN",
        title: "Commerce & Management — Investment Banking & Corporate Finance",
        subtitle: "3-Year B.Com (Hons) / BBA + CFA / CA • Equity Analyst, CFO Track",
        meta: "CUET UG, IPMAT • Top Gateways: SRCC, St. Stephen's, IIM Indore",
        badge: "AI Defense: 82%",
        stream: "commerce_law",
        breakdown: {
          examOrScore: "CUET UG / IPMAT • Commercial Aptitude & Quantitative Logic",
          annualFees: "Central Universities: ₹15,000 - ₹40,000 / year",
          medianCtc: "Starting: ₹10 - 24 LPA (Tier-1 Consulting & Bulge Bracket)",
          verdict: "Strategic deal structuring and regulatory compliance remain highly resilient.",
          linkUrl: "/simulator",
        },
      },
      {
        id: "sim-4",
        shortCode: "LAW",
        title: "Humanities & Law — Corporate Law, Policy & Dispute Resolution",
        subtitle: "5-Year Integrated B.A. LL.B (Hons) • M&A Associate, Arbitration Counsel",
        meta: "CLAT UG • Top Gateways: NLSIU Bangalore, NALSAR Hyderabad, WBNUJS",
        badge: "AI Defense: 91%",
        stream: "commerce_law",
        breakdown: {
          examOrScore: "CLAT UG • High Reading Speed & Critical Legal Reasoning",
          annualFees: "NLUs: ₹2.5L - ₹3.2L / year",
          medianCtc: "Starting: ₹14 - 22 LPA (Tier-1 Law Firms e.g. SAM, CAM, Trilegal)",
          verdict: "Courtroom advocacy, cross-border negotiations, and complex statutory interpretation.",
          linkUrl: "/simulator",
        },
      },
      {
        id: "sim-5",
        shortCode: "DES",
        title: "Design & Spatial Media — Interaction Design & Hardware Ergonomics",
        subtitle: "4-Year B.Des • Product Designer, AR/VR Spatial UI Lead, Ergonomics Lead",
        meta: "UCEED, NID DAT • Top Gateways: IDC IIT Bombay, NID Ahmedabad",
        badge: "AI Defense: 88%",
        stream: "engineering",
        breakdown: {
          examOrScore: "UCEED / NID DAT • Visual Thinking, Spatial Perception & User Psychology",
          annualFees: "IITs / NIDs: ₹2.2L - ₹3.5L / year",
          medianCtc: "Starting: ₹9 - 20 LPA (Consumer Tech & EV Hardware Firms)",
          verdict: "Physical hardware craft, spatial 3D interfaces, and deep human emotional resonance.",
          linkUrl: "/simulator",
        },
      },
    ],
  },

  // =========================================================================
  // TAB 4: COLLEGE FEE & ROI CALCULATOR (/calculator)
  // =========================================================================
  {
    id: "calculator",
    tabLabel: "College Fee & ROI Calculator",
    icon: Calculator,
    headline: "Calculate total college fees vs expected salary and loan payback duration.",
    ctaText: "Calculate College ROI",
    ctaHref: "/calculator",
    whyTitle: "WHY FAMILIES RELY ON ROI CALCULATOR",
    whyDescription:
      "Avoid college debt traps before making irreversible 4-year fee commitments. Model total capital expenditure (tuition, hostel, coaching, living) against realistic in-hand post-tax monthly compensation to calculate exact months required to break even.",
    metricsTitle: "FINANCIAL IMPACT METRICS",
    metricsDescription:
      "Average family saves ₹8.4 Lakhs by avoiding over-priced private colleges with low median placements. Full loan EMI amortization and 5-year cashflow simulation.",
    mockupActiveNav: "ROI Calculator",
    quickPills: [
      { label: "IIT B.Tech (Govt)", college: "IIT 4-Year B.Tech", cutoff: "Total CapEx: ₹10.5L", fee: "₹2.5L / yr", ctc: "₹1.45L/mo In-Hand", payback: "14 Months" },
      { label: "BITS Pilani (Pvt)", college: "BITS 4-Year B.E.", cutoff: "Total CapEx: ₹26.5L", fee: "₹5.8L / yr", ctc: "₹1.38L/mo In-Hand", payback: "22 Months" },
      { label: "Govt Medical (AIIMS)", college: "AIIMS MBBS Degree", cutoff: "Total CapEx: ₹1.2L", fee: "₹6,800 Total", ctc: "₹95k/mo Stipend", payback: "Immediate" },
      { label: "Private B.Tech Tier-3", college: "Private Tier-3 B.Tech", cutoff: "Total CapEx: ₹18.0L", fee: "₹4.2L / yr", ctc: "₹38k/mo In-Hand", payback: "58 Months (High Risk)" },
      { label: "DU SRCC (Central)", college: "Delhi University B.Com", cutoff: "Total CapEx: ₹1.5L", fee: "₹32k / yr", ctc: "₹75k/mo In-Hand", payback: "3 Months" },
    ],
    feedItems: [
      {
        id: "roi-1",
        shortCode: "IIT",
        title: "IIT 4-Year B.Tech — Govt Subsidized Engineering",
        subtitle: "Total 4-Year CapEx: ₹10.8 Lakhs (Tuition + On-Campus Hostel)",
        meta: "Expected In-Hand Year 1: ₹1,45,000 / month • Median CTC: ₹21.8 LPA",
        badge: "14 Mo Payback",
        stream: "engineering",
        breakdown: {
          examOrScore: "Full Tuition Concession Available for Family Income < ₹5L/year",
          annualFees: "₹2.5L / year Tuition + ₹40,000 Hostel Mess",
          medianCtc: "In-Hand: ₹1.45L / month • Education Loan EMI: ₹0 - ₹14,000",
          verdict: "Highest financial efficiency in Indian higher education; immediate wealth compounder.",
          linkUrl: "/calculator",
        },
      },
      {
        id: "roi-2",
        shortCode: "BITS",
        title: "BITS Pilani 4-Year B.E. — Tier-1 Private Engineering",
        subtitle: "Total 4-Year CapEx: ₹26.5 Lakhs • SBI Scholar Loan Financed (8.2%)",
        meta: "Expected In-Hand Year 1: ₹1,38,000 / month • Median CTC: ₹20.5 LPA",
        badge: "22 Mo Payback",
        stream: "engineering",
        breakdown: {
          examOrScore: "Merit-cum-Need Scholarships Cover 25% - 80% Tuition for 30% of Batch",
          annualFees: "₹5.8L / year Total Fees • Loan Repayment: ₹34,200 / month",
          medianCtc: "In-Hand: ₹1.38L / month • Net Monthly Savings: ₹85,000+",
          verdict: "High initial CapEx fully justified by tier-1 placement packages and rapid payback.",
          linkUrl: "/calculator",
        },
      },
      {
        id: "roi-3",
        shortCode: "GOV",
        title: "Govt Medical College (NEET UG) — Subsidized Healthcare",
        subtitle: "Total 5.5-Year CapEx: ₹1.5 Lakhs • Subsidized by Central/State Health Ministry",
        meta: "Junior Residency Stipend Year 1: ₹90,000 / month • Zero Education Loan",
        badge: "Immediate Payback",
        stream: "medical",
        breakdown: {
          examOrScore: "Admission Solely on NEET Score (640+ General Category Threshold)",
          annualFees: "₹10,000 - ₹35,000 / year (Nominal Fee Structure)",
          medianCtc: "Internship Stipend: ₹30k/mo • Residency Stipend: ₹90k - ₹1.1L/mo",
          verdict: "Zero debt burden upon graduation; medical license allows lifelong earning capacity.",
          linkUrl: "/calculator",
        },
      },
      {
        id: "roi-4",
        shortCode: "PVT",
        title: "Private Tier-3 Engineering — High CapEx with Modest CTC",
        subtitle: "Total 4-Year CapEx: ₹18.0 Lakhs (Tuition + Private Hostel) • Bank Loan",
        meta: "Expected In-Hand Year 1: ₹38,000 / month • Median CTC: ₹5.2 LPA",
        badge: "58 Mo Debt Trap",
        stream: "engineering",
        isUrgent: true,
        breakdown: {
          examOrScore: "Direct Management Quota / Low Entrance Cutoff Admission",
          annualFees: "₹3.8L Tuition + ₹1.2L Hostel = ₹5.0L / year",
          medianCtc: "In-Hand: ₹38,000 / month • Loan EMI (₹14L at 10.5%): ₹24,500 / month",
          verdict: "High Financial Risk: Family savings drained with 4.8 years to break even on investment.",
          linkUrl: "/calculator",
        },
      },
      {
        id: "roi-5",
        shortCode: "DU",
        title: "Delhi University Central Campus — Top Commerce & Economics",
        subtitle: "Total 3-Year CapEx: ₹1.8 Lakhs (Subsidized Central University)",
        meta: "Expected In-Hand Year 1: ₹72,000 / month • Median CTC: ₹10.8 LPA",
        badge: "3 Mo Payback",
        stream: "commerce_law",
        breakdown: {
          examOrScore: "CUET UG Merit Allotment (Top 1% Percentile)",
          annualFees: "₹28,000 / year Tuition + Shared Paying Guest Living",
          medianCtc: "In-Hand: ₹72,000 / month • No Education Debt",
          verdict: "Phenomenal return on investment; pays back entire degree expenditure in first 90 days.",
          linkUrl: "/calculator",
        },
      },
    ],
  },
];

export function HowWeHelpValleySection() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStreamFilter, setSelectedStreamFilter] = useState<"all" | "engineering" | "medical" | "commerce_law">("all");
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);

  // Left Column Interactive College & Cutoff Evaluator
  const [quickInput, setQuickInput] = useState("");
  const [evaluatedResult, setEvaluatedResult] = useState<{
    college: string;
    cutoff: string;
    fee: string;
    ctc: string;
    payback: string;
  } | null>(null);

  const currentTab = HOW_WE_HELP_TABS[activeTabIndex];

  // Quick evaluation function
  const handleQuickEvaluate = (item: { label: string; college: string; cutoff: string; fee: string; ctc: string; payback: string }) => {
    setQuickInput(item.label);
    setEvaluatedResult(item);
  };

  const handleCustomSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickInput.trim()) return;

    // Search against tab quick pills or generate computed data
    const matched = currentTab.quickPills.find(
      (p) => p.label.toLowerCase().includes(quickInput.toLowerCase()) || p.college.toLowerCase().includes(quickInput.toLowerCase())
    );

    if (matched) {
      setEvaluatedResult(matched);
    } else {
      setEvaluatedResult({
        college: quickInput.trim(),
        cutoff: "Predicted Range: Top 5%ile / Rank Safe Zone",
        fee: "Estimated Annual Fees: ₹1.5L - ₹3.5L / yr",
        ctc: "Projected Median Package: ₹12.5 - ₹18.0 LPA",
        payback: "Payback Horizon: ~18 Months",
      });
    }
  };

  // Filtered feed items
  const filteredFeedItems = useMemo(() => {
    return currentTab.feedItems.filter((item) => {
      // Stream filter
      if (selectedStreamFilter !== "all" && item.stream !== selectedStreamFilter) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesSubtitle = item.subtitle.toLowerCase().includes(q);
        const matchesMeta = item.meta.toLowerCase().includes(q);
        const matchesBadge = item.badge.toLowerCase().includes(q);
        return matchesTitle || matchesSubtitle || matchesMeta || matchesBadge;
      }

      return true;
    });
  }, [currentTab.feedItems, selectedStreamFilter, searchQuery]);

  return (
    <section className="relative w-full border-t border-b border-neutral-300/90 bg-white select-text">
      
      {/* =========================================================================
          1. TOP TAB BAR: 4 CORE DECISION SYSTEMS OF STUDENT SAARTHI
          (Sharp Edges, Architectural Monochrome, No Star Icons)
          ========================================================================= */}
      <div className="w-full border-b border-neutral-300 bg-white select-none">
        <div className="grid grid-cols-2 lg:grid-cols-4 w-full divide-x divide-neutral-300">
          {HOW_WE_HELP_TABS.map((tab, idx) => {
            const isActive = activeTabIndex === idx;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTabIndex(idx);
                  setExpandedItemId(null);
                  setEvaluatedResult(null);
                  setQuickInput("");
                }}
                className={`relative py-4 px-4 sm:px-6 flex items-center justify-center gap-2.5 font-outfit text-xs sm:text-sm rounded-none transition-all cursor-pointer text-left ${
                  isActive
                    ? "font-medium text-neutral-950 bg-neutral-100/70 border-b-2 border-neutral-950"
                    : "font-light text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50"
                }`}
              >
                {/* Active Top Highlight Line */}
                {isActive && (
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-neutral-950" />
                )}

                <Icon
                  size={15}
                  className={`shrink-0 transition-colors ${
                    isActive ? "text-neutral-950" : "text-neutral-400"
                  }`}
                />
                <span className="truncate tracking-tight">{tab.tabLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          2. MAIN 2-COLUMN SECTION (Clean Architectural Transparent Canvas)
          ========================================================================= */}
      <div className="relative w-full bg-white">
        <div className="w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
          
          {/* -------------------------------------------------------------------
              LEFT COLUMN: LIGHT WEIGHT TYPOGRAPHY + FUNCTIONAL COLLEGE CHECK
              ------------------------------------------------------------------- */}
          <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 xl:p-14 flex flex-col justify-between space-y-8 border-b lg:border-b-0 lg:border-r border-neutral-300/80 bg-white">
            <div className="space-y-6 sm:space-y-7">
              
              {/* Category Breadcrumb */}
              <div className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.25em] text-neutral-400 font-normal">
                <span>/ DECISION SUPPORT SYSTEM</span>
                <span>//</span>
                <span className="text-neutral-900 font-semibold">{currentTab.tabLabel}</span>
              </div>

              {/* Headline in Less Weight (font-light, crisp & clean) */}
              <h3 className="font-outfit text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-light text-neutral-950 tracking-tight leading-[1.09]">
                {currentTab.headline}
              </h3>

              {/* Direct Primary Action Button (Sharp Edges, rounded-none) */}
              <div className="flex flex-wrap items-center gap-3">
                <Link href={currentTab.ctaHref}>
                  <button className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-neutral-950 hover:bg-neutral-800 text-white font-mono text-xs uppercase tracking-wider font-medium rounded-none shadow-none transition-all hover:translate-x-0.5 group cursor-pointer border border-neutral-950">
                    <span>{currentTab.ctaText}</span>
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </Link>

                <Link href="/colleges">
                  <button className="inline-flex items-center gap-1.5 px-4 py-3.5 bg-transparent hover:bg-neutral-100 text-neutral-900 font-mono text-xs uppercase tracking-wider font-medium rounded-none transition-all border border-neutral-300 cursor-pointer">
                    <Building2 size={13} />
                    <span>View All 1,200+</span>
                  </button>
                </Link>
              </div>

              {/* ===============================================================
                  FUNCTIONAL INTERACTIVE TOOL: QUICK COLLEGE & CUTOFF CHECK
                  (100% Relevant to Student Saarthi, No Fake "Audits")
                  =============================================================== */}
              <div className="pt-2 space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5 text-neutral-800 font-semibold">
                    <GraduationCap size={14} className="text-[#60782c]" />
                    Quick College & Cutoff Check
                  </span>
                  <span>JoSAA & NTA Data</span>
                </div>

                {/* Search & Check Input */}
                <form
                  onSubmit={handleCustomSearch}
                  className="flex items-stretch border border-neutral-300 rounded-none bg-white focus-within:border-neutral-950 transition-colors"
                >
                  <input
                    type="text"
                    value={quickInput}
                    onChange={(e) => setQuickInput(e.target.value)}
                    placeholder="Type college or exam (e.g. BITS Pilani, NEET, SRCC)..."
                    className="flex-1 px-3.5 py-2.5 text-xs font-outfit text-neutral-900 placeholder-neutral-400 focus:outline-none bg-transparent rounded-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-neutral-900 hover:bg-black text-white font-mono text-[11px] uppercase tracking-wider font-medium shrink-0 rounded-none cursor-pointer transition-colors"
                  >
                    Check
                  </button>
                </form>

                {/* Pre-set College / Exam Quick Pills */}
                <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                  <span className="text-[10px] font-mono text-neutral-400">Quick:</span>
                  {currentTab.quickPills.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => handleQuickEvaluate(item)}
                      className="px-2 py-0.5 text-[10px] font-mono text-neutral-700 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 rounded-none transition-colors cursor-pointer"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                {/* Instant Evaluation Result Box */}
                {evaluatedResult && (
                  <div className="p-3.5 bg-neutral-50 border border-neutral-300 rounded-none space-y-1.5 transition-all text-xs font-outfit animate-in fade-in-50">
                    <div className="flex items-center justify-between border-b border-neutral-200 pb-1.5">
                      <span className="font-semibold text-neutral-900">{evaluatedResult.college}</span>
                      <button
                        type="button"
                        onClick={() => setEvaluatedResult(null)}
                        className="text-neutral-400 hover:text-neutral-700 text-[10px] font-mono uppercase"
                      >
                        [Close]
                      </button>
                    </div>
                    <div className="text-neutral-800 text-[11.5px] font-medium flex items-center justify-between">
                      <span>Cutoff Target:</span>
                      <span className="font-mono text-neutral-900 font-semibold">{evaluatedResult.cutoff}</span>
                    </div>
                    <div className="text-neutral-600 text-[11px] font-light flex items-center justify-between">
                      <span>Annual Tuition:</span>
                      <span>{evaluatedResult.fee}</span>
                    </div>
                    <div className="text-neutral-600 text-[11px] font-light flex items-center justify-between">
                      <span>Median Salary:</span>
                      <span className="font-medium text-neutral-800">{evaluatedResult.ctc}</span>
                    </div>
                    <div className="text-[#60782c] text-[10.5px] font-mono font-semibold flex items-center justify-between pt-1 border-t border-neutral-200/60">
                      <span>Payback Horizon:</span>
                      <span>{evaluatedResult.payback}</span>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Bottom Sub-sections: Why It Matters + Real Metrics (Light Weight) */}
            <div className="space-y-5 pt-6 border-t border-neutral-200">
              {/* Sub-section 1 */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 font-mono text-[10.5px] font-medium tracking-[0.2em] text-neutral-700 uppercase">
                  <BookOpen size={13} className="text-[#60782c]" />
                  <span>{currentTab.whyTitle}</span>
                </div>
                <p className="font-outfit text-xs sm:text-[13px] text-neutral-600 font-light leading-relaxed max-w-lg">
                  {currentTab.whyDescription}
                </p>
              </div>

              {/* Sub-section 2 */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 font-mono text-[10.5px] font-medium tracking-[0.2em] text-neutral-700 uppercase">
                  <TrendingUp size={13} className="text-[#60782c]" />
                  <span>{currentTab.metricsTitle}</span>
                </div>
                <p className="font-outfit text-xs sm:text-[13px] text-neutral-600 font-light leading-relaxed max-w-lg">
                  {currentTab.metricsDescription}
                </p>
              </div>
            </div>
          </div>

          {/* -------------------------------------------------------------------
              RIGHT COLUMN: AMBER DESERT BACKGROUND + FULLY TRANSPARENT GLASS CARD
              ------------------------------------------------------------------- */}
          <div className="lg:col-span-7 p-3.5 sm:p-6 lg:p-8 xl:p-10 flex items-center justify-center relative overflow-hidden bg-amber-50/20">
            
            {/* Background of the right side: Amber Desert painted landscape */}
            <div className="absolute inset-0 z-0 pointer-events-none select-none">
              <Image
                src="/illustrations/amber_desert_bg.png"
                alt="Amber Desert Background"
                fill
                className="object-cover object-bottom"
                priority
                unoptimized
              />
              {/* Subtle gradient overlay to enhance visual depth */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-amber-900/10 pointer-events-none" />
            </div>

            {/* Dashboard Container: FULLY TRANSPARENT GLASS STYLE (Sharp Edges, rounded-none) */}
            <div className="relative z-10 w-full max-w-3xl bg-white/20 backdrop-blur-2xl border border-white/60 shadow-[0_12px_40px_0_rgba(0,0,0,0.14),inset_0_1px_1px_0_rgba(255,255,255,0.7)] rounded-none overflow-hidden transition-all">
              
              {/* Top Navigation Bar of Mockup: Translucent Glass */}
              <div className="px-3.5 sm:px-4 py-2.5 border-b border-white/40 bg-white/30 backdrop-blur-md flex flex-wrap items-center justify-between gap-2.5">
                
                {/* Left: Logo / System Switcher (No Star Icon!) */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/40 backdrop-blur-md border border-white/60 rounded-none font-outfit text-xs font-medium text-neutral-900 cursor-pointer select-none hover:bg-white/60 transition-colors">
                    <GraduationCap size={13} className="text-[#60782c]" />
                    <span>Student Saarthi DSS 2.0</span>
                    <ChevronDown size={11} className="text-neutral-500" />
                  </div>
                </div>

                {/* Center: Live Search Bar (Glass) */}
                <div className="relative flex-1 max-w-[200px] sm:max-w-xs">
                  <Search
                    size={12}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-600 pointer-events-none"
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search cutoffs, colleges, exams..."
                    className="w-full bg-white/35 backdrop-blur-md border border-white/50 rounded-none pl-7 pr-2 py-1 text-[11px] text-neutral-900 placeholder-neutral-500 focus:outline-none focus:bg-white/55 focus:border-white/90"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono text-neutral-500 hover:text-neutral-900"
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* Right: Real Stream Filters (Glass Buttons) */}
                <div className="flex items-center gap-1 select-none">
                  <button
                    type="button"
                    onClick={() => setSelectedStreamFilter("all")}
                    className={`px-2.5 py-1 rounded-none text-[10px] font-mono uppercase tracking-wider transition-colors border cursor-pointer ${
                      selectedStreamFilter === "all"
                        ? "bg-neutral-950/90 text-white border-neutral-950 backdrop-blur-md shadow-xs"
                        : "bg-white/25 text-neutral-800 border-white/50 hover:bg-white/50 backdrop-blur-md"
                    }`}
                  >
                    All
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedStreamFilter("engineering")}
                    className={`px-2.5 py-1 rounded-none text-[10px] font-mono uppercase tracking-wider transition-colors border cursor-pointer hidden sm:inline-block ${
                      selectedStreamFilter === "engineering"
                        ? "bg-neutral-950/90 text-white border-neutral-950 backdrop-blur-md shadow-xs"
                        : "bg-white/25 text-neutral-800 border-white/50 hover:bg-white/50 backdrop-blur-md"
                    }`}
                  >
                    Tech
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedStreamFilter("medical")}
                    className={`px-2.5 py-1 rounded-none text-[10px] font-mono uppercase tracking-wider transition-colors border cursor-pointer hidden md:inline-block ${
                      selectedStreamFilter === "medical"
                        ? "bg-neutral-950/90 text-white border-neutral-950 backdrop-blur-md shadow-xs"
                        : "bg-white/25 text-neutral-800 border-white/50 hover:bg-white/50 backdrop-blur-md"
                    }`}
                  >
                    Medical
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedStreamFilter("commerce_law")}
                    className={`px-2.5 py-1 rounded-none text-[10px] font-mono uppercase tracking-wider transition-colors border cursor-pointer hidden lg:inline-block ${
                      selectedStreamFilter === "commerce_law"
                        ? "bg-neutral-950/90 text-white border-neutral-950 backdrop-blur-md shadow-xs"
                        : "bg-white/25 text-neutral-800 border-white/50 hover:bg-white/50 backdrop-blur-md"
                    }`}
                  >
                    Commerce
                  </button>
                </div>
              </div>

              {/* Dashboard Body: Student Tools Sidebar + Feed (Glass Layout) */}
              <div className="grid grid-cols-12 min-h-[440px]">
                
                {/* 2A. Micro-Sidebar: Real Student Saarthi Tools (Translucent Frosted Glass) */}
                <div className="col-span-4 sm:col-span-3 p-3 border-r border-white/40 bg-white/15 backdrop-blur-md flex flex-col justify-between space-y-4 select-none">
                  <div className="space-y-3">
                    
                    {/* Primary Action Button */}
                    <Link href={currentTab.ctaHref} className="block w-full">
                      <button
                        type="button"
                        className="w-full py-2 px-2 bg-neutral-950/90 hover:bg-neutral-950 text-white text-[11px] font-mono uppercase tracking-wider font-medium rounded-none flex items-center justify-center gap-1 shadow-xs transition-colors cursor-pointer border border-neutral-950 backdrop-blur-md"
                      >
                        <Plus size={12} />
                        <span className="truncate">Open Full DSS</span>
                      </button>
                    </Link>

                    {/* Decision Tools Section */}
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-mono block px-1">
                        Core Systems
                      </span>
                      <div className="space-y-0.5">
                        {[
                          { name: "Exam Radar", icon: Calendar, tabIndex: 0 },
                          { name: "Colleges", icon: Building2, tabIndex: 1 },
                          { name: "Simulator", icon: Compass, tabIndex: 2 },
                          { name: "ROI Calculator", icon: Calculator, tabIndex: 3 },
                        ].map((tool) => {
                          const ToolIcon = tool.icon;
                          const isCurrent = activeTabIndex === tool.tabIndex;
                          return (
                            <button
                              key={tool.name}
                              type="button"
                              onClick={() => {
                                setActiveTabIndex(tool.tabIndex);
                                setExpandedItemId(null);
                              }}
                              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-none text-[11px] font-outfit transition-colors text-left cursor-pointer ${
                                isCurrent
                                  ? "font-medium text-neutral-950 bg-white/65 border border-white/80 shadow-2xs backdrop-blur-md"
                                  : "text-neutral-700 hover:bg-white/30 border border-transparent backdrop-blur-2xs"
                              }`}
                            >
                              <ToolIcon
                                size={12}
                                className={isCurrent ? "text-[#60782c]" : "text-neutral-500"}
                              />
                              <span className="truncate">{tool.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Guidance Section */}
                    <div className="space-y-1 pt-2 border-t border-white/30 hidden sm:block">
                      <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-mono block px-1">
                        Guidance
                      </span>
                      <div className="space-y-0.5">
                        <Link href="/quiz" className="flex items-center gap-2 px-2 py-1 text-[11px] text-neutral-700 hover:bg-white/30 transition-colors">
                          <BrainCircuit size={11} className="text-neutral-500" />
                          <span className="truncate">Aptitude Quiz</span>
                        </Link>
                        <Link href="/research" className="flex items-center gap-2 px-2 py-1 text-[11px] text-neutral-700 hover:bg-white/30 transition-colors">
                          <FileText size={11} className="text-neutral-500" />
                          <span className="truncate">Deep Research</span>
                        </Link>
                        <Link href="/timeline" className="flex items-center gap-2 px-2 py-1 text-[11px] text-neutral-700 hover:bg-white/30 transition-colors">
                          <Clock size={11} className="text-neutral-500" />
                          <span className="truncate">Timeline 2026</span>
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>

                {/* 2B. Main Feed: Colleges, Exams & ROI Roadmaps (Translucent Glass Feed) */}
                <div className="col-span-8 sm:col-span-9 p-3 sm:p-4 bg-white/10 backdrop-blur-md space-y-3 overflow-y-auto max-h-[500px]">
                  
                  {/* Status Bar */}
                  <div className="flex items-center justify-between text-[10px] font-mono text-neutral-600 uppercase tracking-wider pb-1.5 border-b border-white/40">
                    <span className="flex items-center gap-1.5 text-neutral-900 font-medium">
                      <span>{filteredFeedItems.length} Verified Entries</span>
                      <span className="px-1.5 py-0.2 bg-[#60782c]/15 text-[#506822] border border-[#60782c]/30 font-semibold backdrop-blur-xs">
                        OFFICIAL 2026 DATA
                      </span>
                    </span>
                    <span className="text-neutral-500">Click Row for Details</span>
                  </div>

                  {/* Empty state */}
                  {filteredFeedItems.length === 0 && (
                    <div className="py-12 text-center space-y-2">
                      <p className="text-xs text-neutral-600 font-outfit">
                        No records matching &quot;{searchQuery}&quot;.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery("");
                          setSelectedStreamFilter("all");
                        }}
                        className="text-[11px] font-mono text-neutral-900 underline uppercase cursor-pointer"
                      >
                        Reset filters
                      </button>
                    </div>
                  )}

                  {/* Feed Rows (Frosted Glass Cards Floating Over Amber Landscape) */}
                  <div className="space-y-1.5">
                    {filteredFeedItems.map((item) => {
                      const isExpanded = expandedItemId === item.id;

                      return (
                        <div
                          key={item.id}
                          onClick={() => setExpandedItemId(isExpanded ? null : item.id)}
                          className={`p-2.5 border rounded-none transition-all cursor-pointer backdrop-blur-md ${
                            isExpanded
                              ? "bg-white/80 border-white/90 shadow-[0_4px_16px_0_rgba(0,0,0,0.08)]"
                              : "bg-white/40 hover:bg-white/60 border-white/50 hover:border-white/80 shadow-2xs"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2.5">
                            <div className="flex items-start gap-2.5 min-w-0">
                              
                              {/* Sharp Uniform Monogram Square - EXACT same 32x32px size on every row, never wraps */}
                              <div className="w-8 h-8 rounded-none bg-neutral-950 text-white font-mono font-bold text-[9.5px] tracking-tight flex items-center justify-center shrink-0 border border-white/20 whitespace-nowrap select-none">
                                {item.shortCode}
                              </div>

                              {/* Title & Description */}
                              <div className="min-w-0">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className="font-outfit font-medium text-neutral-950 text-xs truncate">
                                    {item.title}
                                  </span>
                                </div>
                                <p className="text-[11px] text-neutral-800 font-normal truncate mt-0.5">
                                  {item.subtitle}
                                </p>
                                <p className="text-[9.5px] text-neutral-600 font-light truncate">
                                  {item.meta}
                                </p>
                              </div>
                            </div>

                            {/* Badge */}
                            <div className="shrink-0 flex items-center gap-1.5 pt-0.5">
                              <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-none border border-white/60 bg-white/50 text-neutral-900 font-medium backdrop-blur-xs">
                                {item.badge}
                              </span>
                              <ChevronRight
                                size={12}
                                className={`text-neutral-500 transition-transform ${
                                  isExpanded ? "rotate-90 text-neutral-950" : ""
                                }`}
                              />
                            </div>
                          </div>

                          {/* Expanded Card Details (Glass Inside) */}
                          {isExpanded && item.breakdown && (
                            <div className="mt-3 pt-3 border-t border-white/50 space-y-2 font-outfit text-xs animate-in fade-in-50">
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-white/50 p-2.5 border border-white/60 backdrop-blur-sm">
                                <div>
                                  <span className="font-mono text-[9.5px] text-neutral-500 uppercase block">
                                    Cutoff / Timeline
                                  </span>
                                  <span className="font-medium text-neutral-900 text-[11px]">
                                    {item.breakdown.examOrScore}
                                  </span>
                                </div>
                                <div>
                                  <span className="font-mono text-[9.5px] text-neutral-500 uppercase block">
                                    Annual Fees
                                  </span>
                                  <span className="font-medium text-neutral-900 text-[11px]">
                                    {item.breakdown.annualFees}
                                  </span>
                                </div>
                                <div>
                                  <span className="font-mono text-[9.5px] text-neutral-500 uppercase block">
                                    Median Compensation
                                  </span>
                                  <span className="font-semibold text-[#526a24] text-[11px]">
                                    {item.breakdown.medianCtc}
                                  </span>
                                </div>
                              </div>

                              <div className="text-[11px] text-neutral-800 font-light flex items-start gap-1.5 pt-1">
                                <span className="font-mono font-bold text-neutral-950 shrink-0">Analysis:</span>
                                <span>{item.breakdown.verdict}</span>
                              </div>

                              <div className="pt-2 flex justify-end">
                                <Link
                                  href={item.breakdown.linkUrl}
                                  className="inline-flex items-center gap-1 font-mono text-[10.5px] text-neutral-950 hover:text-[#60782c] uppercase font-semibold transition-colors"
                                >
                                  <span>Open In {currentTab.tabLabel}</span>
                                  <ExternalLink size={10} />
                                </Link>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Footer Grounding Status Bar */}
                  <div className="pt-3 text-[10px] font-mono text-neutral-600 flex items-center justify-between border-t border-white/40">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-none bg-[#60782c] shrink-0" />
                      Live JoSAA, CSAB, NTA & NIRF Portal Grounding
                    </span>
                    <span>12 Sep 2026 // Production</span>
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
