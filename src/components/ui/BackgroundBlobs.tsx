import { Blob } from "@/components/ui/Blob";

type BackgroundBlobsProps = {
  tone?: "light" | "dark";
};

export function BackgroundBlobs({ tone = "light" }: BackgroundBlobsProps) {
  const isDark = tone === "dark";

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <Blob
        size={480}
        top="-14%"
        left="62%"
        from={isDark ? "var(--color-blue-600)" : "var(--color-blue-600)"}
        to={isDark ? "var(--color-navy-950)" : "var(--color-navy-800)"}
        opacity={isDark ? 0.5 : 0.16}
        duration={24}
      />
      <Blob
        size={360}
        top="58%"
        left="-12%"
        from={isDark ? "var(--color-sky-400)" : "var(--color-sky-400)"}
        to={isDark ? "var(--color-blue-700)" : "var(--color-blue-700)"}
        opacity={isDark ? 0.35 : 0.12}
        duration={28}
      />
    </div>
  );
}
