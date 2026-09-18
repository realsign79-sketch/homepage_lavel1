import Link from "next/link";

import { SITE, TODO_REQUIRED, has } from "@/config/site";
import { LANDINGS } from "@/content/landing";
import { MAIN_NAV } from "@/content/navigation";

import { Logo } from "./Logo";

export function Footer() {
  const { naverPlaceUrl, instagramUrl, roadAddress, openingHours } = TODO_REQUIRED;
  const externals = [
    { href: naverPlaceUrl, label: "네이버 플레이스" },
    { href: instagramUrl, label: "인스타그램" },
  ].filter((l) => has(l.href));

  return (
    <footer className="grain bg-forest-strong text-surface/80">
      <div className="container-page relative z-10 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <Logo tone="inverse" />
            <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-surface/70">
              미용이 어려운 아이의 행동과 경험을 이해하고, 앞으로 이어질 미용을 함께 설계합니다.
            </p>
          </div>

          <nav aria-label="하단 메뉴">
            <p className="text-xs font-semibold tracking-[0.2em] text-sand uppercase">Menu</p>
            <ul className="mt-5 space-y-3 text-[0.9375rem]">
              {MAIN_NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="link-underline hover:text-surface">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-xs font-semibold tracking-[0.2em] text-sand uppercase">Guide</p>
            <ul className="mt-4 space-y-3 text-[0.9375rem]">
              {LANDINGS.map((l) => (
                <li key={l.path}>
                  <Link href={l.path} className="link-underline hover:text-surface">
                    {l.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-sand uppercase">Contact</p>
            <a
              href={`tel:${SITE.phone.tel}`}
              data-track="click_phone"
              data-track-location="footer"
              className="display mt-5 inline-block text-2xl text-surface hover:text-sand"
            >
              {SITE.phone.display}
            </a>
            <p className="mt-3 text-[0.9375rem]">{has(roadAddress) ? roadAddress : SITE.region.label}</p>
            {has(openingHours) ? <p className="mt-1 text-[0.9375rem]">{openingHours}</p> : null}
            {externals.length > 0 ? (
              <ul className="mt-5 flex flex-wrap gap-4 text-[0.9375rem]">
                {externals.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-surface">
                      {l.label}
                      <span className="sr-only">(새 창)</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>

        <div className="mt-14 border-t border-surface/15 pt-8 text-[0.8125rem] leading-relaxed text-surface/70">
          <dl className="flex flex-wrap gap-x-6 gap-y-1">
            <div className="flex gap-2">
              <dt>상호</dt>
              <dd className="text-surface/90">{SITE.name}</dd>
            </div>
            <div className="flex gap-2">
              <dt>대표</dt>
              <dd className="text-surface/90">{SITE.owner}</dd>
            </div>
            <div className="flex gap-2">
              <dt>사업자등록번호</dt>
              <dd className="text-surface/90">{SITE.businessNumber}</dd>
            </div>
            <div className="flex gap-2">
              <dt>전화</dt>
              <dd className="text-surface/90">{SITE.phone.display}</dd>
            </div>
          </dl>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} {SITE.nameEn}. All rights reserved.</p>
            <Link href="/privacy" className="link-underline font-semibold text-surface/90 hover:text-surface">
              개인정보 처리 안내
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
