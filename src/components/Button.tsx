import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "dark";
  className?: string;
};

const variants = {
  primary: "bg-redbrand text-white hover:bg-reddeep",
  secondary: "border border-ink/15 bg-white text-ink hover:border-redbrand hover:text-redbrand",
  ghost: "text-ink hover:bg-ink/5",
  dark: "bg-ink text-white hover:bg-coal"
};

export function Button({ href, children, variant = "primary", className = "" }: Props) {
  const cls = `touch inline-flex items-center justify-center rounded-panel px-5 py-3 text-sm font-bold transition ${variants[variant]} ${className}`;
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return <button className={cls}>{children}</button>;
}
