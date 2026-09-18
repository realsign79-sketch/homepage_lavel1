/**
 * 분석 이벤트 — GA4(gtag)가 연결된 경우에만 전송합니다.
 * 이벤트에는 이름·전화번호·건강정보 같은 개인정보를 절대 넣지 않습니다.
 */
export const ANALYTICS_EVENTS = [
  "click_phone",
  "click_kakao",
  "click_naver_booking",
  "click_sms",
  "view_grooming_education",
  "view_process",
  "start_contact_form",
  "submit_contact_form_success",
  "click_map",
] as const;

export type AnalyticsEvent = (typeof ANALYTICS_EVENTS)[number];

type Gtag = (command: "event", name: string, params?: Record<string, string>) => void;

export function trackEvent(name: AnalyticsEvent, params?: { location?: string }) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag !== "function") return;
  gtag("event", name, params?.location ? { location: params.location } : undefined);
}

export function isAnalyticsEvent(value: string | undefined): value is AnalyticsEvent {
  return !!value && (ANALYTICS_EVENTS as readonly string[]).includes(value);
}
