import Link from "next/link";
import type { ReactNode } from "react";

/** Page section with vertical rhythm. */
export function Section({
  children,
  className = "",
  tone = "default",
}: {
  children: ReactNode;
  className?: string;
  tone?: "default" | "white" | "navy" | "ivory";
}) {
  const tones = {
    default: "",
    white: "bg-white border-y border-line",
    navy: "bg-navy text-white",
    ivory: "bg-ivory",
  };
  return (
    <section className={`py-16 sm:py-20 ${tones[tone]} ${className}`}>
      <div className="container-x">{children}</div>
    </section>
  );
}

/** Centered eyebrow + heading + optional lede. */
export function SectionHead({
  label,
  title,
  lede,
  invert = false,
}: {
  label?: string;
  title: string;
  lede?: string;
  invert?: boolean;
}) {
  return (
    <div className="mx-auto mb-11 max-w-2xl text-center">
      {label && (
        <p className="mb-2.5 text-xs font-bold uppercase tracking-[0.16em] text-red">
          {label}
        </p>
      )}
      <h2 className={`text-3xl sm:text-4xl ${invert ? "text-white" : "text-navy"}`}>
        {title}
      </h2>
      {lede && (
        <p className={`mt-3 ${invert ? "text-white/80" : "text-muted"}`}>{lede}</p>
      )}
    </div>
  );
}

export function Badge({
  children,
  variant = "gold",
}: {
  children: ReactNode;
  variant?: "gold" | "red" | "ok";
}) {
  return <span className={`badge badge-${variant}`}>{children}</span>;
}

type ButtonVariant = "primary" | "navy" | "gold" | "outline" | "ghost";

/** Link styled as a button. */
export function LinkButton({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  external?: boolean;
}) {
  const cls = `btn btn-${variant} ${className}`;
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
