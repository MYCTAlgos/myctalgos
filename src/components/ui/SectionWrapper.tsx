import { BlueprintGrid } from "@/components/ui/BlueprintGrid";
import { BackgroundBlobs } from "@/components/ui/BackgroundBlobs";

type SectionWrapperProps = {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  tone?: "light" | "dark" | "mist";
  decorated?: boolean;
  id?: string;
};

const TONE_STYLES: Record<NonNullable<SectionWrapperProps["tone"]>, string> = {
  light: "bg-white text-navy-900",
  dark: "bg-navy-900 text-white",
  mist: "bg-mist-50 text-navy-900",
};

export function SectionWrapper({
  children,
  className = "",
  innerClassName = "",
  tone = "light",
  decorated = false,
  id,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`relative ${decorated ? "overflow-hidden" : ""} ${TONE_STYLES[tone]} ${className}`}
    >
      {decorated && (
        <>
          <BackgroundBlobs tone={tone === "dark" ? "dark" : "light"} />
          <BlueprintGrid tone={tone === "dark" ? "dark" : "light"} />
        </>
      )}
      <div
        className={`relative z-10 mx-auto max-w-6xl px-6 py-24 sm:px-8 lg:px-12 ${innerClassName}`}
      >
        {children}
      </div>
    </section>
  );
}
