import { CalendarHeart, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

import { SITE, TODO_REQUIRED, has } from "@/config/site";

/**
 * 모바일 하단 고정 상담 독 — 실제 사용 가능한 채널만 노출합니다.
 * (카카오 URL이 비어 있으면 카카오 버튼 자체를 렌더링하지 않음)
 */
export function MobileContactDock() {
  const kakao = TODO_REQUIRED.kakaoChannelUrl;
  const itemCls =
    "flex min-h-14 flex-1 flex-col items-center justify-center gap-1 rounded-2xl text-[0.8125rem] font-semibold transition-colors";

  return (
    <nav
      aria-label="빠른 상담"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line/80 bg-surface/95 px-3 pt-2 backdrop-blur-md lg:hidden"
      style={{ paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom, 0px))" }}
    >
      <ul className="mx-auto flex max-w-md gap-2">
        <li className="flex flex-1">
          <a
            href={`tel:${SITE.phone.tel}`}
            data-track="click_phone"
            data-track-location="mobile_dock"
            className={`${itemCls} text-forest-strong hover:bg-surface-muted`}
          >
            <Phone aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
            전화 상담
          </a>
        </li>
        {has(kakao) ? (
          <li className="flex flex-1">
            <a
              href={kakao}
              target="_blank"
              rel="noopener noreferrer"
              data-track="click_kakao"
              data-track-location="mobile_dock"
              className={`${itemCls} text-forest-strong hover:bg-surface-muted`}
            >
              <MessageCircle aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
              카카오 상담
              <span className="sr-only">(새 창)</span>
            </a>
          </li>
        ) : null}
        <li className="flex flex-[1.4]">
          <Link href="/contact" className={`${itemCls} bg-forest text-surface hover:bg-forest-strong`}>
            <CalendarHeart aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
            우리 아이 상담하기
          </Link>
        </li>
      </ul>
    </nav>
  );
}
