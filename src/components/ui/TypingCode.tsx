"use client";

import { useEffect, useState } from "react";

const LINES = [
  "const mission = 'build + empower';",
  "function architect(order) { return systems; }",
  "> automation.deploy()",
  "> dashboard.render({ realtime: true })",
  "system.status: 'online'",
] as const;

type Phase = "typing" | "pausing" | "deleting";

export function TypingCode() {
  const [lineIndex, setLineIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");

  useEffect(() => {
    const current = LINES[lineIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < current.length) {
        timeout = setTimeout(
          () => setText(current.slice(0, text.length + 1)),
          32
        );
      } else {
        timeout = setTimeout(() => setPhase("pausing"), 1400);
      }
    } else if (phase === "pausing") {
      timeout = setTimeout(() => setPhase("deleting"), 700);
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(text.slice(0, -1)), 18);
      } else {
        timeout = setTimeout(() => {
          setPhase("typing");
          setLineIndex((i) => (i + 1) % LINES.length);
        }, 300);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, phase, lineIndex]);

  return (
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-navy-950/60 px-6 py-5 font-mono text-sm text-sky-300 shadow-2xl backdrop-blur-md">
      <div className="mb-4 flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
      </div>
      <p className="min-h-[1.5rem] leading-relaxed">
        {text}
        <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-sky-300" />
      </p>
    </div>
  );
}
