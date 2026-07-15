import Image from "next/image";

const SLIDES = [
  { src: "/carousel/ai-dashboard.jpg", alt: "AI-powered dashboards and analytics" },
  { src: "/carousel/code.jpg", alt: "Custom software development" },
  { src: "/carousel/ai-lightbulb.jpg", alt: "AI-driven innovation" },
  { src: "/carousel/design-process.jpg", alt: "Thoughtful design and build process" },
] as const;

function Slide({ item }: { item: (typeof SLIDES)[number] }) {
  return (
    <div className="relative aspect-[5/4] h-56 shrink-0 overflow-hidden rounded-2xl border border-navy-900/5 shadow-sm sm:h-64">
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="(min-width: 640px) 320px, 280px"
        className="object-cover"
      />
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
          <Slide key={`${item.src}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}
