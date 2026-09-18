import { FAQ, type FaqItem } from "@/content/faq";
import { SERVICES } from "@/content/services";
import { SITE, TODO_REQUIRED, getSameAs, getSiteUrl, has, type TodoRequired } from "@/config/site";

/**
 * 빈 문자열, null, undefined, 빈 배열/객체를 재귀적으로 제거합니다.
 * → 구조화데이터에 빈 값이나 PLACEHOLDER가 출력되지 않도록 보장.
 */
export function prune<T>(value: T): T {
  if (Array.isArray(value)) {
    const arr = value.map(prune).filter((v) => !isEmpty(v));
    return arr as T;
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      const p = prune(v);
      if (!isEmpty(p)) out[k] = p;
    }
    return out as T;
  }
  return value;
}

function isEmpty(v: unknown): boolean {
  if (v === null || v === undefined) return true;
  if (typeof v === "string") return v.trim() === "";
  if (Array.isArray(v)) return v.length === 0;
  if (typeof v === "object") return Object.keys(v as object).length === 0;
  return false;
}

export function businessId(siteUrl = getSiteUrl()) {
  return `${siteUrl}/#business`;
}

/** LocalBusiness — 확정된 값만 출력. 주소·좌표·영업시간은 입력 전까지 생략(지역만 표기). */
export function localBusinessSchema(todo: TodoRequired = TODO_REQUIRED, siteUrl = getSiteUrl()) {
  const hasGeo = typeof todo.latitude === "number" && typeof todo.longitude === "number";

  return prune({
    "@type": "LocalBusiness",
    "@id": businessId(siteUrl),
    name: SITE.name,
    alternateName: SITE.nameEn,
    url: siteUrl,
    telephone: SITE.phone.international,
    description: SITE.description,
    image: `${siteUrl}/opengraph-image`,
    founder: { "@type": "Person", name: SITE.owner },
    email: has(todo.email) ? todo.email : undefined,
    address: {
      "@type": "PostalAddress",
      addressCountry: "KR",
      addressRegion: SITE.region.province,
      addressLocality: `${SITE.region.district} ${SITE.region.neighborhood}`,
      streetAddress: has(todo.roadAddress) ? todo.roadAddress : undefined,
      postalCode: has(todo.postalCode) ? todo.postalCode : undefined,
    },
    geo: hasGeo ? { "@type": "GeoCoordinates", latitude: todo.latitude, longitude: todo.longitude } : undefined,
    areaServed: [
      { "@type": "City", name: SITE.region.province },
      { "@type": "AdministrativeArea", name: `${SITE.region.province} ${SITE.region.district}` },
    ],
    knowsAbout: ["반려견 미용 교육", "미용을 어려워하는 반려견", "노령견 미용 상담", "미용 접촉 적응"],
    sameAs: getSameAs(todo),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${SITE.name} 서비스`,
      itemListElement: SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name, url: `${siteUrl}${s.path}` },
      })),
    },
  });
}

export function websiteSchema(siteUrl = getSiteUrl()) {
  return {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: SITE.name,
    inLanguage: "ko-KR",
    publisher: { "@id": businessId(siteUrl) },
  };
}

export function serviceSchema(
  input: { name: string; description: string; path: string },
  siteUrl = getSiteUrl(),
) {
  return {
    "@type": "Service",
    "@id": `${siteUrl}${input.path}#service`,
    name: input.name,
    description: input.description,
    url: `${siteUrl}${input.path}`,
    provider: { "@id": businessId(siteUrl) },
    areaServed: `${SITE.region.province} ${SITE.region.district}`,
    serviceType: "반려견 미용 교육",
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbSchema(crumbs: Crumb[], siteUrl = getSiteUrl()) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.path === "/" ? siteUrl : `${siteUrl}${c.path}`,
    })),
  };
}

export function faqSchema(items: FaqItem[] = FAQ) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function webPageSchema(input: { name: string; description: string; path: string }, siteUrl = getSiteUrl()) {
  return {
    "@type": "WebPage",
    "@id": `${siteUrl}${input.path}#webpage`,
    url: `${siteUrl}${input.path}`,
    name: input.name,
    description: input.description,
    inLanguage: "ko-KR",
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": businessId(siteUrl) },
    dateModified: SITE.contentUpdatedAt,
  };
}

/** @graph로 묶어 한 개의 JSON-LD 스크립트로 출력 */
export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

/** XSS 방지: `<` 문자를 유니코드 이스케이프 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
