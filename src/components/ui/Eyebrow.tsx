type EyebrowProps = {
  children: React.ReactNode;
  index?: string;
  tone?: "light" | "dark";
  centered?: boolean;
};

export function Eyebrow({
  children,
  index,
  tone = "light",
  centered = false,
}: EyebrowProps) {
  const accent = tone === "dark" ? "text-sky-300" : "text-blue-500";
  const line = tone === "dark" ? "bg-white/15" : "bg-navy-900/10";

  return (
    <div
      className={`mb-4 flex items-center gap-3 ${centered ? "justify-center" : ""}`}
    >
      {index && (
        <span className={`font-mono text-xs ${accent}`}>{`// ${index}`}</span>
      )}
      <span
        className={`text-xs font-medium uppercase tracking-[0.2em] ${accent}`}
      >
        {children}
      </span>
      {!centered && <span className={`h-px flex-1 ${line}`} />}
    </div>
  );
}
