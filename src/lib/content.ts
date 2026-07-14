export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/learn", label: "Learn" },
  { href: "/contact", label: "Contact" },
] as const;

export const SERVICES = [
  {
    title: "Custom Web Applications",
    description:
      "Software built around how your business actually works, not a one-size-fits-all template.",
  },
  {
    title: "Dashboards & Internal Tools",
    description:
      "Clear, real-time views into what matters, so decisions are made on data instead of guesswork.",
  },
  {
    title: "Workflow Automation",
    description:
      "We take repetitive tasks off your team's plate so they can focus on the work that actually matters.",
  },
  {
    title: "Technology Planning",
    description:
      "Before we write any code, we map out exactly how your business runs, then design technology that fits it.",
  },
  {
    title: "AI-Assisted Tools",
    description:
      "Custom tools built around AI, tailored to a specific problem in your business, not a generic chatbot.",
  },
] as const;

export const LEARN_TRACKS = [
  {
    title: "Foundations of Technical Thinking",
    description:
      "How software and technology actually work, explained in plain language anyone can follow.",
  },
  {
    title: "Own Your Systems",
    description:
      "For clients who want to understand, maintain, and eventually grow the tools we build together.",
  },
  {
    title: "AI & Automation Coaching",
    description:
      "1:1 and small-group coaching on AI tools like Claude and ChatGPT, plus hands-on help automating your own work.",
  },
] as const;

export const FOUNDERS = [
  {
    name: "Mike Charles",
    role: "Co-Founder",
    photo: "/founders/mike.jpg",
    bio: "Mike has years of experience keeping large financial company systems running smoothly and securely. That experience is why the technology we build for you is dependable, not fragile.",
    focusAreas: [
      "Reliable Technology",
      "Cloud Systems",
      "Web Applications",
    ],
  },
  {
    name: "Yadley Charles",
    role: "Co-Founder",
    photo: "/founders/yadley.jpg",
    bio: "Yadley has years of experience turning messy data into simple dashboards that helped healthcare and nonprofit teams make better decisions. That experience is why we design technology that's clear and easy to use, not confusing.",
    focusAreas: [
      "Data & Analytics",
      "Nonprofit Technology",
      "Dashboards & Reports",
    ],
  },
] as const;

export const INDUSTRIES = [
  "Retail & E-commerce",
  "Healthcare & Wellness",
  "Real Estate",
  "Finance & Insurance",
  "Education & Training",
  "Technology & Software",
  "Nonprofit & Community",
  "Professional Services (legal, consulting, accounting)",
  "Food & Beverage",
  "Construction & Trades",
  "Creative & Media",
  "Faith-Based Organization",
  "Other",
] as const;

export const BUSINESS_TYPES = [
  "Product-Based (physical goods)",
  "Service-Based",
  "Consulting / Coaching",
  "Software / Technology",
  "Content / Media / Creator",
  "Nonprofit / Community Work",
  "Education / Training",
  "Other",
] as const;

export const YEARS_OPERATING = [
  "Just starting (pre-launch)",
  "Less than 1 year",
  "1–3 years",
  "3–5 years",
  "5–10 years",
  "10+ years",
] as const;

export const AUDIENCES = [
  "Individual Consumers (B2C)",
  "Other Businesses (B2B)",
  "Both B2B and B2C",
  "Nonprofits / Community Organizations",
  "Government / Public Sector",
  "Other",
] as const;

export const BUDGET_RANGES = [
  "Under $2,000",
  "$2,000 – $5,000",
  "$5,000 – $15,000",
  "$15,000+",
  "Not sure yet",
] as const;

export const TIMELINES = [
  "As soon as possible",
  "Within a month",
  "1–3 months",
  "Just exploring for now",
] as const;

export const REFERRAL_SOURCES = [
  "Word of mouth / referral",
  "Social media",
  "Search engine",
  "Local event or community",
  "Other",
] as const;

export const LEARN_TOPICS = [
  "Foundations of Technical Thinking",
  "Owning & Maintaining Your Systems",
  "AI Tools & Coaching (Claude, ChatGPT, etc.)",
  "Applied Automation",
  "Data & Dashboards Basics",
] as const;

export const BUILD_SERVICE_OPTIONS = [
  "Custom Web Application",
  "Dashboard / Internal Tool",
  "Workflow Automation",
  "AI-Assisted Tools",
  "E-commerce / Online Store",
  "Booking / Scheduling System",
  "Systems Architecture / Consulting",
] as const;

export const SCALE_FEATURES = [
  "Automation & Workflows",
  "Client / Customer Dashboards",
  "Online Payments / E-commerce",
  "Scheduling & Booking",
  "Reporting & Analytics",
  "Team Collaboration Tools",
  "Marketing / CRM Tools",
  "Mobile App",
] as const;

export const FEATURED_STAT = {
  value: "100%",
  label: "System ownership handed back to you. Never locked in, never dependent on us.",
} as const;

export const JOURNEY_STEPS = [
  {
    icon: "Lightbulb",
    title: "Your Idea",
    description: "You bring the goal. A business problem, or just a spark of an idea.",
  },
  {
    icon: "Search",
    title: "We Learn Your Business",
    description: "We learn how you actually operate before we start building.",
  },
  {
    icon: "Code2",
    title: "We Design & Build Your Solution",
    description: "We plan it out, then build the software that brings it to life.",
  },
  {
    icon: "BookOpen",
    title: "We Teach You How It Works",
    description: "You learn how it works, not just how to click it.",
  },
  {
    icon: "Key",
    title: "You Own Your Technology",
    description: "The system is yours. No lock-in, no dependency on us.",
  },
] as const;

export const SITE = {
  name: "MYCTAlgos",
  tagline: "Technology, Translated.",
  subtext:
    "We build custom web applications and AI-powered tools, and empower people to understand and own the technology behind their work.",
  description:
    "MYCTAlgos is a faith-centered technology company that builds custom software and AI-powered tools, and teaches people to understand and own the systems behind their work.",
} as const;
