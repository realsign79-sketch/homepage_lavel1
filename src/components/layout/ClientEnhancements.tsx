"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { isAnalyticsEvent, trackEvent } from "@/lib/analytics";

/**
 * 1) .reveal 요소 스크롤 등장 (IntersectionObserver, reduced-motion은 CSS에서 무효화)
 * 2) data-track 속성을 가진 링크 클릭을 분석 이벤트로 전송 (GA 미연결 시 아무 일도 하지 않음)
 */
export function ClientEnhancements() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-track]");
      const name = target?.dataset.track;
      if (isAnalyticsEvent(name)) trackEvent(name, { location: target?.dataset.trackLocation });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (pathname === "/grooming-education") trackEvent("view_grooming_education");
    if (pathname === "/process") trackEvent("view_process");
  }, [pathname]);

  return null;
}
