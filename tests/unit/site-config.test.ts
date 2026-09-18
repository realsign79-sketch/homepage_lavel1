import { describe, expect, it } from "vitest";

import { SITE, TODO_REQUIRED, getContactChannels, getSameAs, getSmsHref, has, type TodoRequired } from "@/config/site";

const empty: TodoRequired = { ...TODO_REQUIRED, kakaoChannelUrl: "", naverBookingUrl: "", naverPlaceUrl: "", instagramUrl: "" };

describe("site config", () => {
  it("전화번호 형식이 서로 일치한다", () => {
    const digits = SITE.phone.display.replace(/-/g, "");
    expect(digits).toBe(SITE.phone.tel);
    expect(SITE.phone.international).toBe("+82-10-3573-1499");
  });

  it("has()는 공백 문자열을 빈 값으로 본다", () => {
    expect(has("")).toBe(false);
    expect(has("   ")).toBe(false);
    expect(has(null)).toBe(false);
    expect(has("https://example.com")).toBe(true);
  });

  it("빈 외부 URL은 상담 채널로 만들지 않는다 (전화만 남음)", () => {
    const channels = getContactChannels(empty);
    expect(channels.map((c) => c.id)).toEqual(["phone"]);
    expect(channels[0].href).toBe("tel:01035731499");
  });

  it("URL이 채워지면 해당 채널만 추가된다", () => {
    const channels = getContactChannels({ ...empty, kakaoChannelUrl: "https://pf.kakao.com/_abc" });
    expect(channels.map((c) => c.id)).toEqual(["phone", "kakao"]);
  });

  it("sameAs에는 실제 URL만 포함된다", () => {
    expect(getSameAs(empty)).toEqual([]);
    expect(getSameAs({ ...empty, instagramUrl: "https://instagram.com/x" })).toEqual(["https://instagram.com/x"]);
  });

  it("문자 상담 링크는 실제 번호로 연결된다", () => {
    expect(getSmsHref("안녕")).toBe(`sms:01035731499?body=${encodeURIComponent("안녕")}`);
  });
});
