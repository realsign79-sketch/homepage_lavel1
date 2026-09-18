import type { MetadataRoute } from "next";

import { getSiteUrl, isProductionDomainSet } from "@/config/site";

/** 검색·AI 답변 엔진 크롤러를 명시적으로 허용 (GEO) */
export const AI_AND_SEARCH_BOTS = [
  "Googlebot",
  "Bingbot",
  "Yeti", // 네이버
  "Daumoa", // 다음
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
];

/**
 * 최종 도메인(NEXT_PUBLIC_SITE_URL)이 설정되지 않은 빌드(미리보기·스테이징)는 전체 색인 차단.
 */
export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();
  if (!isProductionDomainSet()) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [
      { userAgent: AI_AND_SEARCH_BOTS, allow: "/" },
      { userAgent: "*", allow: "/", disallow: ["/cases"] },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
