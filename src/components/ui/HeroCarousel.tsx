import {
  BookOpen,
  Code2,
  Database,
  LayoutDashboard,
  Sparkles,
  Users,
} from "lucide-react";

// Placeholder tiles until real brand photography is dropped in. To swap:
// give each item an `image` path (e.g. "/carousel/build.jpg") and render
// an <Image> instead of the icon/gradient below.
const SLIDES = [
  { label: "Custom Web Apps", icon: Code2, from: "#4d8cff", to: "#1e40af" },
  { label: "AI-Powered Tools", icon: Sparkles, from: "#8fdcff", to: "#2f6fed" },
  { label: "Dashboards", icon: LayoutDashboard, from: "#4fc3f7", to: "#1d4ed8" },
  { label: "Automation", icon: Database, from: "#2f6fed", to: "#1e40af" },
  { label: "Learning Paths", icon: BookOpen, from: "#8fdcff", to: "#1d4ed8" },
  { label: "Client Empowerment", icon: Users, from: "#4d8cff", to: "#2c3e63" },
] as const;

function Slide({ item }: { item: (typeof SLIDES)[number] }) {
  const Icon = item.icon;
  return (
    <div
      className="flex h-40 w-40 shrink-0 flex-col items-center justify-center gap-3 rounded-2xl border border-navy-900/5 shadow-sm sm:h-44 sm:w-44"
      style={{
        background: `linear-gradient(135deg, ${item.from}, ${item.to})`,
      }}
    >
      <Icon className="h-8 w-8 text-white" strokeWidth={1.75} />
      <span className="px-3 text-center text-xs font-medium text-white/90">
        {item.label}
      </span>
    </div>
  );
}

export function HeroCarousel() {
  const track = [...SLIDES, ...SLIDES];

  return (
    <div
      className="relative left-1/2 mt-16 w-screen -translate-x-1/2 overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div className="animate-marquee flex w-max gap-5 px-5">
        {track.map((item, i) => (
          <Slide key={`${item.label}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}
