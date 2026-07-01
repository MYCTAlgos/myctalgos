export const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/learn", label: "Learn" },
  { href: "/contact", label: "Contact" },
] as const;

export const SERVICES = [
  {
    title: "Custom Web Applications",
    description:
      "Full-stack products built for how your business actually operates — not a template forced to fit.",
  },
  {
    title: "Dashboards & Internal Tools",
    description:
      "Clear, real-time views into what matters, so decisions are made on data instead of guesswork.",
  },
  {
    title: "Workflow Automation",
    description:
      "We remove the repetitive, error-prone steps between your systems so your team can focus on the work that matters.",
  },
  {
    title: "Systems Architecture",
    description:
      "Before we write code, we map how your operation is structured — then design technology that mirrors that order.",
  },
] as const;

export const LEARN_TRACKS = [
  {
    title: "Foundations of Technical Thinking",
    description:
      "How software, data, and logic actually work — explained in plain language for non-technical builders.",
  },
  {
    title: "Own Your Systems",
    description:
      "For clients who want to understand, maintain, and eventually extend the tools we build together.",
  },
  {
    title: "Applied Automation",
    description:
      "Hands-on guidance for teams ready to build their own internal tools and workflows.",
  },
] as const;

export const FOUNDERS = [
  {
    name: "Mike Charles",
    role: "Co-Founder",
    photo: "/founders/mike.jpg",
    bio: "Mike brings enterprise IT and systems experience from financial services, where he's built and maintained the technical infrastructure behind mission-critical operations. That background shapes how we design for reliability at scale.",
    focusAreas: [
      "Enterprise IT Systems",
      "Cloud Architecture",
      "Web Application Infrastructure",
    ],
  },
  {
    name: "Yadley Charles",
    role: "Co-Founder",
    photo: "/founders/yadley.jpg",
    bio: "Yadley brings data systems and analytics experience from healthcare and nonprofit organizations, where she's turned raw data into dashboards that shaped real decisions. That background shapes how we design for clarity and impact.",
    focusAreas: [
      "Data Systems & Analytics",
      "Nonprofit & Organizational Systems",
      "Dashboards & Reporting",
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

export const LEARN_TOPICS = [
  "Foundations of Technical Thinking",
  "Owning & Maintaining Your Systems",
  "Applied Automation",
  "Data & Dashboards Basics",
] as const;

export const BUILD_SERVICE_OPTIONS = [
  "Custom Web Application",
  "Dashboard / Internal Tool",
  "Workflow Automation",
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

export const IMPACT_STATS = [
  {
    value: "70%",
    label: "Less manual work when repetitive tasks are automated",
  },
  {
    value: "3x",
    label: "Faster decisions with real-time dashboards instead of spreadsheets",
  },
  {
    value: "100%",
    label: "System ownership handed back to you, not locked to us",
  },
  {
    value: "2",
    label: "Ways to work with us — build it for you, or teach you to build it",
  },
] as const;

export const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Assess",
    description:
      "We map how your business actually runs before touching any code.",
  },
  {
    step: "02",
    title: "Architect",
    description:
      "We design a system structured around that reality, not a template.",
  },
  {
    step: "03",
    title: "Automate",
    description:
      "We build the tools that remove manual work and hand you the keys.",
  },
] as const;

export const SITE = {
  name: "MYCTAlgos",
  tagline: "Where Purpose Meets Technology.",
  subtext:
    "We build custom web applications and empower people to understand and own the technology behind their work.",
  description:
    "MYCTAlgos is a faith-centered technology company that builds custom software and teaches people to understand and own the systems behind their work.",
} as const;
