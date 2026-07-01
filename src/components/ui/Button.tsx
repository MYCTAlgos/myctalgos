import Link from "next/link";
import { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "ghost";

const VARIANT_STYLES: Record<Variant, string> = {
  primary:
    "bg-navy-900 text-white hover:bg-navy-800 border border-navy-900",
  secondary:
    "bg-transparent text-navy-900 border border-navy-900/20 hover:border-navy-900/50",
  ghost: "bg-transparent text-navy-900 hover:text-gold-500",
};

type ButtonProps = {
  href: string;
  variant?: Variant;
  children: React.ReactNode;
} & Omit<ComponentProps<typeof Link>, "href">;

export function Button({
  href,
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-200 ${VARIANT_STYLES[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
