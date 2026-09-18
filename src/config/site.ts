/**
 * 효효그루밍 사이트 설정 — 모든 사업 정보는 이 파일 한 곳에서 관리합니다.
 *
 * SITE     : 소개서에서 확인된 "확정" 정보만 들어 있습니다.
 * TODO_REQUIRED : 아직 확인되지 않은 정보입니다. 값을 채우면 화면·구조화데이터에 자동 반영되고,
 *                 비어 있으면 해당 버튼·블록이 숨겨집니다. 절대 추측값을 넣지 마세요.
 */

export type PriceItem = { name: string; price: string; note?: string };
export type CareerItem = { period?: string; title: string; issuer?: string };
export type Review = { author: string; dog?: string; text: string; date: string; consent: true };
export type CaseStudy = {
  slug: string;
  dogAlias: string;
  ageGroup: string;
  difficulty: string;
  observation: string;
  approach: string;
  change: string;
  nextPlan: string;
  sessions: string;
  date: string;
  consent: true;
};

export const SITE = {
  name: "효효그루밍",
  nameEn: "HYO HYO GROOMING",
  owner: "전효정",
  phone: {
    display: "010-3573-1499",
    tel: "01035731499",
    international: "+82-10-3573-1499",
  },
  businessNumber: "460-27-01246",
  region: {
    province: "부산광역시",
    district: "동래구",
    neighborhood: "안락동",
    label: "부산광역시 동래구 안락동",
    short: "부산 동래구 안락동",
  },
  specialty: "미용하기 어려운 반려견을 위한 미용 교육",
  programNote: "평균 1~3회 집중 과정 중심, 이후 변화와 상태에 따라 결정",
  description:
    "미용도구, 발·얼굴 접촉, 이전 경험 때문에 미용이 어려운 반려견을 위한 효효그루밍. 부산 동래구 안락동에서 행동의 이유를 살피고 다음 미용까지 이어지는 경험을 함께 만듭니다.",
  contentUpdatedAt: "2026-09-18",
} as const;

export interface TodoRequired {
  domain: string;
  address: string;
  jibunAddress: string;
  postalCode: string;
  latitude: number | null;
  longitude: number | null;
  openingHours: string;
  kakaoChannelUrl: string;
  naverPlaceUrl: string;
  naverBookingUrl: string;
  instagramUrl: string;
  email: string;
  priceGuide: PriceItem[];
  ownerCareer: CareerItem[];
  realReviews: Review[];
  realCaseStudies: CaseStudy[];
}

export const TODO_REQUIRED: TodoRequired = {
  domain: "", // 최종 도메인 (예: https://hyohyogrooming.com) — NEXT_PUBLIC_SITE_URL로도 지정 가능
  address: "부산광역시 동래구 명안로9번길 92-2, 1층", // 도로명 주소
  jibunAddress: "부산광역시 동래구 안락동 431-52", // 지번 주소
  postalCode: "47787", // OpenStreetMap 건물 단위 조회 (2026-09-18)
  latitude: 35.1985612, // OpenStreetMap 건물 좌표
  longitude: 129.0996695,
  openingHours: "", // 요일별 영업시간과 휴무일
  kakaoChannelUrl: "",
  naverPlaceUrl: "",
  naverBookingUrl: "",
  instagramUrl: "",
  email: "",
  priceGuide: [], // 실제 확정 가격만 입력
  ownerCareer: [], // 검증된 경력/자격만 입력
  realReviews: [], // 실제 게시 허락을 받은 후기만 입력
  realCaseStudies: [], // 실제 공개 허락을 받은 사례만 입력
};

/** 화면 표시용 주소 — 상세 주소가 없으면 지역명까지만 */
export function getAddress(todo: TodoRequired = TODO_REQUIRED): string {
  return has(todo.address) ? todo.address : SITE.region.label;
}

/** 구조화데이터용: "부산광역시 동래구 " 접두어를 뺀 나머지 (예: "안락동 431-52") */
export function getStreetAddress(todo: TodoRequired = TODO_REQUIRED): string | undefined {
  if (!has(todo.address)) return undefined;
  return todo.address
    .replace(new RegExp(`^(${SITE.region.province}|부산시?|부산)\\s*`), "")
    .replace(new RegExp(`^${SITE.region.district}\\s*`), "")
    .trim();
}

/** 값이 채워진 문자열만 true */
export function has(value: string | null | undefined): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * 사이트 기준 URL.
 * 우선순위: NEXT_PUBLIC_SITE_URL → TODO_REQUIRED.domain → Vercel 프로덕션 URL → localhost
 */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  if (has(fromEnv)) return fromEnv.replace(/\/$/, "");
  if (has(TODO_REQUIRED.domain)) return TODO_REQUIRED.domain.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (has(vercel)) return `https://${vercel}`;
  return "http://localhost:3000";
}

/** 최종 도메인이 확정됐는지 — 미확정이면 robots에서 색인을 막습니다. */
export function isProductionDomainSet(): boolean {
  return has(process.env.NEXT_PUBLIC_SITE_URL) || has(TODO_REQUIRED.domain);
}

export type ContactChannel = {
  id: "phone" | "kakao" | "naverBooking" | "naverPlace" | "instagram";
  label: string;
  href: string;
  external: boolean;
  event: string;
};

/** 실제 값이 있는 연락 채널만 반환 — 빈 URL은 절대 링크로 만들지 않습니다. */
export function getContactChannels(todo: TodoRequired = TODO_REQUIRED): ContactChannel[] {
  const channels: ContactChannel[] = [
    {
      id: "phone",
      label: "전화 상담",
      href: `tel:${SITE.phone.tel}`,
      external: false,
      event: "click_phone",
    },
  ];
  if (has(todo.kakaoChannelUrl)) {
    channels.push({
      id: "kakao",
      label: "카카오톡 상담",
      href: todo.kakaoChannelUrl,
      external: true,
      event: "click_kakao",
    });
  }
  if (has(todo.naverBookingUrl)) {
    channels.push({
      id: "naverBooking",
      label: "네이버 예약",
      href: todo.naverBookingUrl,
      external: true,
      event: "click_naver_booking",
    });
  }
  return channels;
}

export function getSameAs(todo: TodoRequired = TODO_REQUIRED): string[] {
  return [todo.naverPlaceUrl, todo.instagramUrl, todo.kakaoChannelUrl].filter(has);
}

/** 문자 상담용 sms: 링크 (실제 번호로 동작하는 채널) */
export function getSmsHref(body: string): string {
  return `sms:${SITE.phone.tel}?body=${encodeURIComponent(body)}`;
}
