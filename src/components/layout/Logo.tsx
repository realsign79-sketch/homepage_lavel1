import Link from "next/link";

import { SITE } from "@/config/site";

export function Logo({ tone = "default", onClick }: { tone?: "default" | "inverse"; onClick?: () => void }) {
  const inverse = tone === "inverse";
  return (
    <Link href="/" onClick={onClick} className="group inline-flex flex-col leading-none" aria-label={`${SITE.name} 홈`}>
      <span className={`display text-[1.375rem] tracking-[-0.04em] ${inverse ? "text-surface" : "text-forest-strong"}`}>
        {SITE.name}
      </span>
      <span
        className={`mt-1.5 text-[0.625rem] font-semibold tracking-[0.32em] ${inverse ? "text-sand" : "text-sage-text"}`}
      >
        {SITE.nameEn}
      </span>
    </Link>
  );
}
