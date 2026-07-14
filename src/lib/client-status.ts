import { BookOpen, Code2, Key, Lightbulb, Search } from "lucide-react";

export const STAGES = [
  { value: "idea", label: "Idea Received", icon: Lightbulb, color: "#4fc3f7" },
  { value: "learning", label: "Learning the Business", icon: Search, color: "#8fdcff" },
  { value: "building", label: "Design & Build", icon: Code2, color: "#4d8cff" },
  { value: "teaching", label: "Teaching & Training", icon: BookOpen, color: "#2f6fed" },
  { value: "delivered", label: "Delivered & Owned", icon: Key, color: "#1d4ed8" },
] as const;

export type StageValue = (typeof STAGES)[number]["value"];

export function stageInfo(value: string) {
  return STAGES.find((s) => s.value === value) ?? STAGES[0];
}

export function stageIndex(value: string) {
  const i = STAGES.findIndex((s) => s.value === value);
  return i === -1 ? 0 : i;
}
