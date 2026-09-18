import { describe, expect, it } from "vitest";

import { TODO_REQUIRED, type TodoRequired } from "@/config/site";
import { FAQ } from "@/content/faq";
import { faqSchema, localBusinessSchema, prune, serializeJsonLd } from "@/lib/schema";

const empty: TodoRequired = {
  ...TODO_REQUIRED,
  roadAddress: "",
  postalCode: "",
  latitude: null,
  longitude: null,
  openingHours: "",
  email: "",
  kakaoChannelUrl: "",
  naverPlaceUrl: "",
  naverBookingUrl: "",
  instagramUrl: "",
};

describe("JSON-LD", () => {
  it("미확정 값이 있을 때 빈 주소·좌표·PLACEHOLDER를 출력하지 않는다", () => {
    const json = serializeJsonLd(localBusinessSchema(empty, "https://example.com"));
    expect(json).not.toMatch(/PLACEHOLDER|TODO|""/);
    const data = JSON.parse(json);
    expect(data.address.streetAddress).toBeUndefined();
    expect(data.address.postalCode).toBeUndefined();
    expect(data.geo).toBeUndefined();
    expect(data.sameAs).toBeUndefined();
    expect(data.aggregateRating).toBeUndefined();
    expect(data.review).toBeUndefined();
    expect(data.telephone).toBe("+82-10-3573-1499");
    expect(data.address.addressRegion).toBe("부산광역시");
  });

  it("값이 채워지면 주소와 좌표가 출력된다", () => {
    const data = localBusinessSchema(
      { ...empty, roadAddress: "안락로 1", latitude: 35.2, longitude: 129.1 },
      "https://example.com",
    );
    expect(data.address.streetAddress).toBe("안락로 1");
    expect(data.geo).toMatchObject({ latitude: 35.2, longitude: 129.1 });
  });

  it("prune은 빈 문자열/배열/객체를 재귀적으로 제거한다", () => {
    expect(prune({ a: "", b: [], c: { d: undefined }, e: "x", f: [null, "y"] })).toEqual({ e: "x", f: ["y"] });
  });

  it("serializeJsonLd는 < 문자를 이스케이프한다", () => {
    expect(serializeJsonLd({ x: "</script>" })).toBe('{"x":"\\u003c/script>"}');
  });

  it("FAQPage는 화면의 모든 질문과 답을 담는다", () => {
    const data = faqSchema(FAQ);
    expect(data.mainEntity).toHaveLength(FAQ.length);
    expect(data.mainEntity[0].acceptedAnswer.text).toBe(FAQ[0].answer);
  });
});
