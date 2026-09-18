import type { Metadata, Viewport } from "next";
import Script from "next/script";

import { ClientEnhancements } from "@/components/layout/ClientEnhancements";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileContactDock } from "@/components/layout/MobileContactDock";
import { JsonLd } from "@/components/ui/JsonLd";
import { SITE, getSiteUrl, has } from "@/config/site";
import { graph, localBusinessSchema, websiteSchema } from "@/lib/schema";

import "@/styles/globals.css";

const HOME_TITLE = "부산 동래구 애견미용 교육 전문 | 효효그루밍";

const naverVerification = process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION;
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const gaId = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: { default: HOME_TITLE, template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: SITE.name,
    url: "/",
    title: HOME_TITLE,
    description: SITE.description,
  },
  twitter: { card: "summary_large_image", title: HOME_TITLE, description: SITE.description },
  formatDetection: { telephone: false, address: false, email: false },
  verification: {
    ...(has(googleVerification) ? { google: googleVerification } : {}),
    ...(has(naverVerification) ? { other: { "naver-site-verification": naverVerification } } : {}),
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f3ea",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        {/* JS가 동작할 때만 스크롤 등장 효과용 숨김 상태를 적용 (JS 없이도 모든 콘텐츠 노출) */}
        <Script id="js-flag" strategy="beforeInteractive">
          {`document.documentElement.classList.add('js')`}
        </Script>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-forest focus:px-5 focus:py-3 focus:text-surface"
        >
          본문으로 바로가기
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <MobileContactDock />
        <ClientEnhancements />
        <JsonLd data={graph(localBusinessSchema(), websiteSchema())} />
        {has(gaId) ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
