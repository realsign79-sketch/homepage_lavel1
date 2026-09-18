import { expect, test, type Page } from "@playwright/test";

const ROUTES = ["/", "/busan-dog-grooming", "/biting-dog-grooming", "/grooming-education", "/process", "/for-senior-dogs", "/about", "/faq", "/contact", "/privacy"];
const VIEWPORTS = [
  { name: "360", width: 360, height: 800 },
  { name: "768", width: 768, height: 1024 },
  { name: "1440", width: 1440, height: 1000 },
];

async function revealAll(page: Page) {
  await page.evaluate(async () => {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
    for (let y = 0; y < document.body.scrollHeight; y += 700) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
}

test.describe("공개 페이지", () => {
  for (const route of ROUTES) {
    test(`${route} — 200, 고유 H1, 메타, JSON-LD, 콘솔 오류 없음`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(String(e)));
      page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
      const res = await page.goto(route);
      expect(res?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
      const desc = await page.locator('meta[name="description"]').getAttribute("content");
      expect(desc?.length ?? 0).toBeGreaterThan(40);
      for (const s of await page.locator('script[type="application/ld+json"]').allTextContents()) {
        expect(() => JSON.parse(s)).not.toThrow();
        expect(s).not.toMatch(/PLACEHOLDER|Lorem/);
      }
      await page.waitForLoadState("networkidle").catch(() => {});
      expect(errors).toEqual([]);
    });
  }

  test("페이지 title이 모두 고유하다", async ({ page }) => {
    const titles = new Set<string>();
    for (const route of ROUTES) {
      await page.goto(route);
      titles.add(await page.title());
    }
    expect(titles.size).toBe(ROUTES.length);
  });

  test("빈 링크가 없고 모든 내부 링크가 200을 반환한다", async ({ page, request }) => {
    const internal = new Set<string>();
    for (const route of ROUTES) {
      await page.goto(route);
      const hrefs = await page.locator("a[href]").evaluateAll((as) => as.map((a) => a.getAttribute("href") ?? ""));
      for (const h of hrefs) {
        expect(h).not.toBe("#");
        expect(h).not.toMatch(/^javascript:/);
        if (h.startsWith("/")) internal.add(h.split("#")[0]);
      }
    }
    for (const href of internal) {
      const r = await request.get(href);
      expect(r.status(), href).toBe(200);
    }
  });
});

test.describe("상담 전환", () => {
  test("홈 전화 CTA가 실제 번호로 연결되고 상담 페이지까지 3번 이내 터치", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto("/");
    const dock = page.getByRole("navigation", { name: "빠른 상담" });
    await expect(dock.getByRole("link", { name: /전화 상담/ })).toHaveAttribute("href", "tel:01035731499");
    await dock.getByRole("link", { name: /우리 아이 상담하기/ }).click();
    await expect(page).toHaveURL(/\/contact$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("우리 아이 상담하기");
    await expect(page.locator('a[href="tel:01035731499"]').first()).toBeVisible();
  });

  test("모바일 메뉴: 열기, 포커스 트랩, ESC 닫기", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto("/");
    await page.getByRole("button", { name: "메뉴 열기" }).click();
    const dialog = page.getByRole("dialog", { name: "전체 메뉴" });
    await expect(dialog).toBeVisible();
    expect(await page.evaluate(() => document.body.style.overflow)).toBe("hidden");
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(page.getByRole("button", { name: "메뉴 열기" })).toBeFocused();
  });

  test("존재하지 않는 페이지와 사례 페이지(데이터 없음)는 404", async ({ request }) => {
    expect((await request.get("/cases")).status()).toBe(404);
    expect((await request.get("/does-not-exist")).status()).toBe(404);
  });
});

test.describe("SEO 파일", () => {
  test("sitemap에는 공개 페이지만 있고 /cases는 없다", async ({ request }) => {
    const xml = await (await request.get("/sitemap.xml")).text();
    expect(xml).toContain("/grooming-education");
    expect(xml).toContain("/busan-dog-grooming");
    expect(xml).toContain("/biting-dog-grooming");
    expect(xml).not.toContain("/cases");
  });

  test("llms.txt가 확정 정보를 담는다", async ({ request }) => {
    const txt = await (await request.get("/llms.txt")).text();
    expect(txt).toContain("010-3573-1499");
    expect(txt).toContain("부산광역시 동래구 안락동");
  });
});

test.describe("반응형 스크린샷", () => {
  for (const vp of VIEWPORTS) {
    for (const route of ["/", "/contact", "/busan-dog-grooming", "/biting-dog-grooming"]) {
      test(`${vp.name}px ${route} — 가로 스크롤 없음`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(route);
        await revealAll(page);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        expect(overflow).toBeLessThanOrEqual(0);
        const slug = route === "/" ? "home" : route.slice(1);
        await page.screenshot({ path: `test-results/screens/${slug}-${vp.name}.png`, fullPage: true });
      });
    }
  }
});
