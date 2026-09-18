import type { MetadataRoute } from "next";

import { SITE, getSiteUrl } from "@/config/site";
import { getCases } from "@/content/cases";

/** 공개 가능하고 완성된 페이지만 포함 (사례는 실제 데이터가 있을 때만) */
export const PUBLIC_ROUTES: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/busan-dog-grooming", priority: 0.9 },
  { path: "/biting-dog-grooming", priority: 0.9 },
  { path: "/grooming-education", priority: 0.9 },
  { path: "/process", priority: 0.8 },
  { path: "/for-senior-dogs", priority: 0.8 },
  { path: "/about", priority: 0.7 },
  { path: "/faq", priority: 0.7 },
  { path: "/contact", priority: 0.8 },
  { path: "/privacy", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const routes = [...PUBLIC_ROUTES];
  if (getCases().length > 0) routes.push({ path: "/cases", priority: 0.6 });
  return routes.map((r) => ({
    url: r.path === "/" ? base : `${base}${r.path}`,
    lastModified: SITE.contentUpdatedAt,
    changeFrequency: "monthly",
    priority: r.priority,
  }));
}
