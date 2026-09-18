import Link from "next/link";
import type { ReactNode } from "react";

import type { AnalyticsEvent } from "@/lib/analytics";

type Variant = "primary" | "secondary" | "light" | "ghost-light";

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  /** 분석 이벤트 이름 — ClientEnhancements가 data-track 속성으로 수집 */
  track?: AnalyticsEvent;
  trackLocation?: string;
  ariaLabel?: string;
};

const variantClass: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  light: "btn-light",
  "ghost-light": "btn-ghost-light",
};

/** 이동은 항상 <a>. 내부 경로는 next/link, tel:/sms:/외부 URL은 일반 <a>. */
export function ButtonLink({ href, children, variant = "primary", className = "", track, trackLocation, ariaLabel }: Props) {
  const cls = `btn ${variantClass[variant]} ${className}`.trim();
  const data = track ? { "data-track": track, "data-track-location": trackLocation } : {};
  const isInternal = href.startsWith("/");
  const isExternal = /^https?:\/\//.test(href);

  if (isInternal) {
    return (
      <Link href={href} className={cls} aria-label={ariaLabel} {...data}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={cls}
      aria-label={ariaLabel}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...data}
    >
      {children}
      {isExternal ? <span className="sr-only">(새 창)</span> : null}
    </a>
  );
}
