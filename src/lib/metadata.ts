import type { Metadata } from "next";

import { SITE } from "@/config/site";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
};

/** 페이지별 고유 title/description/canonical/OG. metadataBase는 루트 layout에서 설정합니다. */
export function pageMetadata({ title, description, path, noindex }: PageMetaInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "ko_KR",
      siteName: SITE.name,
      url: path,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}
