import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "dark" | "ghost";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
};

const baseStyles =
  "inline-flex items-center justify-center gap-3 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-500/15 disabled:pointer-events-none disabled:opacity-50";

const variants = {
  primary:
    "bg-[#e30613] text-white shadow-[0_12px_30px_rgba(227,6,19,0.2)] hover:-translate-y-0.5 hover:bg-[#c80511] hover:shadow-[0_18px_40px_rgba(227,6,19,0.28)]",

  secondary:
    "border border-black/10 bg-white/70 text-black backdrop-blur-xl hover:-translate-y-0.5 hover:border-[#e30613]/30 hover:bg-white",

  dark:
    "bg-[#090909] text-white shadow-[0_12px_30px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 hover:bg-[#242424]",

  ghost:
    "bg-transparent text-black hover:bg-black/[0.04]",
};

export default function Button({
  children,
  href,
  type = "button",
  variant = "primary",
  className = "",
  onClick,
  disabled = false,
}: ButtonProps) {
  const classes = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}