import { useId } from "react";

type BlueprintGridProps = {
  className?: string;
  tone?: "light" | "dark";
};

const NODES = [
  { top: "18%", left: "10%" },
  { top: "72%", left: "88%" },
  { top: "42%", left: "94%" },
  { top: "86%", left: "22%" },
] as const;

export function BlueprintGrid({ className = "", tone = "light" }: BlueprintGridProps) {
  const gridId = useId();
  const fadeId = useId();
  const maskId = useId();

  const lineColor =
    tone === "dark" ? "rgba(255,255,255,0.08)" : "rgba(11,18,32,0.08)";
  const nodeClass = tone === "dark" ? "bg-sky-400/50" : "bg-blue-500/40";

  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className}`}
      aria-hidden
    >
      <svg className="h-full w-full">
        <defs>
          <pattern
            id={gridId}
            width="56"
            height="56"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 56 0 L 0 0 0 56"
              fill="none"
              stroke={lineColor}
              strokeWidth="1"
            />
          </pattern>
          <radialGradient id={fadeId} cx="50%" cy="25%" r="75%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id={maskId}>
            <rect width="100%" height="100%" fill={`url(#${fadeId})`} />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={`url(#${gridId})`}
          mask={`url(#${maskId})`}
        />
      </svg>
      {NODES.map((node, i) => (
        <span
          key={i}
          className={`absolute h-1.5 w-1.5 rounded-full ${nodeClass}`}
          style={{ top: node.top, left: node.left }}
        />
      ))}
    </div>
  );
}
