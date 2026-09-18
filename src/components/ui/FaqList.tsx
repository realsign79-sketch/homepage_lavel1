import { Plus } from "lucide-react";

import type { FaqItem } from "@/content/faq";

/**
 * <details> 기반 FAQ — JS 없이도 열고 닫을 수 있고, 답변 텍스트가 HTML에 모두 포함되어
 * 검색엔진·AI가 그대로 읽을 수 있습니다.
 */
export function FaqList({ items, openFirst = false, headingLevel = "h3" }: { items: FaqItem[]; openFirst?: boolean; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, i) => (
        <details key={item.id} id={item.id} className="faq-item group" open={openFirst && i === 0}>
          <summary className="flex min-h-11 items-start justify-between gap-6 py-6 text-left">
            <Heading className="text-[1.0625rem] font-semibold leading-snug text-forest-strong md:text-lg">
              <span aria-hidden="true" className="display mr-2 text-clay-strong">
                Q.
              </span>
              {item.question}
            </Heading>
            <span
              aria-hidden="true"
              className="faq-icon mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-forest group-hover:border-forest/40"
            >
              <Plus className="h-4 w-4" strokeWidth={1.8} />
            </span>
          </summary>
          <p className="max-w-3xl pr-12 pb-7 text-[1.0625rem] leading-[1.85] text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
