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
    title: "AI-Assisted Tools",
    description:
      "Custom tools built around AI, tailored to a specific problem in your business, not a generic chatbot.",
  },
  {
    title: "Ongoing Maintenance & Support",
    description:
      "Once your tool is live, we're still here: updates, troubleshooting, and small changes as your business grows.",
  },
] as const;

export const LEARN_TRACKS = [
  {
    title: "1:1 & Small-Group Coaching",
    description:
      "Hands-on sessions on AI tools like Claude and ChatGPT, tailored to your specific work.",
  },
  {
    title: "Team Workshops",
    description:
      "Practical AI use cases for your staff: lesson planning, reporting, communications, and more.",
  },
  {
    title: "Office Hours Support",
    description:
      "Ongoing help while you build and maintain your own tools, whenever you get stuck.",
  },
  {
    title: "Custom Guides & SOPs",
    description:
      "Documentation your team can actually use to maintain what we build together.",
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

export const PACKAGES = [
  {
    name: "Build Only",
    included: "Scoped project, delivered and handed off with documentation.",
    bestFor: "Clients who just need the tool, not the training.",
  },
  {
    name: "Train Only",
    included: "Coaching sessions or workshops, no build deliverable.",
    bestFor: "Teams that want to build their own confidence and skills.",
  },
  {
    name: "Build + Train",
    included:
      "Tool built together with you, with training baked into the process.",
    bestFor: "Clients who want a working tool and long-term independence.",
  },
  {
    name: "Ongoing Support",
    included:
      "Monthly retainer for maintenance, troubleshooting, and small updates.",
    bestFor: "Clients with a live tool who want a safety net.",
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
