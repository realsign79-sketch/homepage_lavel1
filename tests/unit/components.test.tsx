import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

import { MobileContactDock } from "@/components/layout/MobileContactDock";
import { ContactButtons } from "@/components/ui/ContactButtons";
import { FaqList } from "@/components/ui/FaqList";
import { FAQ } from "@/content/faq";

describe("상담 UI", () => {
  it("전화 CTA는 실제 번호로 연결된다", () => {
    render(<ContactButtons location="test" />);
    const phone = screen.getByRole("link", { name: /010-3573-1499 전화 상담/ });
    expect(phone).toHaveAttribute("href", "tel:01035731499");
  });

  it("빈 링크(href='#')나 미입력 카카오 버튼을 렌더링하지 않는다", () => {
    const { container } = render(
      <>
        <ContactButtons location="test" />
        <MobileContactDock />
      </>,
    );
    const hrefs = Array.from(container.querySelectorAll("a")).map((a) => a.getAttribute("href"));
    expect(hrefs).not.toContain("#");
    expect(hrefs).not.toContain("");
    expect(screen.queryByText(/카카오/)).toBeNull();
  });

  it("모바일 독에는 전화와 상담하기가 있다", () => {
    render(<MobileContactDock />);
    const nav = screen.getByRole("navigation", { name: "빠른 상담" });
    expect(within(nav).getByRole("link", { name: /전화 상담/ })).toHaveAttribute("href", "tel:01035731499");
    expect(within(nav).getByRole("link", { name: /우리 아이 상담하기/ })).toHaveAttribute("href", "/contact");
  });
});

describe("FAQ", () => {
  it("모든 답변 텍스트가 DOM에 포함된다 (JS 없이도 읽을 수 있음)", () => {
    const { container } = render(<FaqList items={FAQ} />);
    for (const f of FAQ) {
      expect(container.textContent).toContain(f.question);
      expect(container.textContent).toContain(f.answer);
    }
    expect(container.querySelectorAll("details")).toHaveLength(FAQ.length);
    expect(container.querySelectorAll("summary")).toHaveLength(FAQ.length);
  });
});
