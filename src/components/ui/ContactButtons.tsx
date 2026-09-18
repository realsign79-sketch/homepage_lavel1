import { MessageCircle, MessageSquareText, Phone } from "lucide-react";

import { SITE, TODO_REQUIRED, getSmsHref, has } from "@/config/site";
import { SMS_TEMPLATE } from "@/content/services";

import { ButtonLink } from "./Button";

type Props = { location: string; tone?: "default" | "inverse"; showSms?: boolean };

/** 실제 동작하는 상담 채널만 노출: 전화(항상) · 문자(항상) · 카카오/네이버 예약(URL 있을 때만) */
export function ContactButtons({ location, tone = "default", showSms = true }: Props) {
  const inverse = tone === "inverse";
  const { kakaoChannelUrl, naverBookingUrl } = TODO_REQUIRED;

  return (
    <div className="flex flex-wrap gap-3">
      <ButtonLink
        href={`tel:${SITE.phone.tel}`}
        variant={inverse ? "light" : "primary"}
        track="click_phone"
        trackLocation={location}
      >
        <Phone aria-hidden="true" className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.8} />
        {SITE.phone.display} 전화 상담
      </ButtonLink>
      {has(kakaoChannelUrl) ? (
        <ButtonLink
          href={kakaoChannelUrl}
          variant={inverse ? "ghost-light" : "secondary"}
          track="click_kakao"
          trackLocation={location}
        >
          <MessageCircle aria-hidden="true" className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.8} />
          카카오톡으로 상담하기
        </ButtonLink>
      ) : null}
      {has(naverBookingUrl) ? (
        <ButtonLink
          href={naverBookingUrl}
          variant={inverse ? "ghost-light" : "secondary"}
          track="click_naver_booking"
          trackLocation={location}
        >
          네이버 예약
        </ButtonLink>
      ) : null}
      {showSms ? (
        <ButtonLink
          href={getSmsHref(SMS_TEMPLATE)}
          variant={inverse ? "ghost-light" : "secondary"}
          track="click_sms"
          trackLocation={location}
        >
          <MessageSquareText aria-hidden="true" className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.8} />
          문자로 상담 남기기
        </ButtonLink>
      ) : null}
    </div>
  );
}
