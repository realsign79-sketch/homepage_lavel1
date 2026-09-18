import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { FaqList } from "@/components/ui/FaqList";
import { FAQ, FAQ_PREVIEW_IDS } from "@/content/faq";

export function FaqPreview() {
  const items = FAQ.filter((f) => FAQ_PREVIEW_IDS.includes(f.id));
  return (
    <section aria-labelledby="faq-preview-title" className="bg-surface py-24 md:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="reveal lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-preview-title" className="display h2-section mt-4 text-forest-strong">
            보호자분들이
            <br />
            가장 많이 묻는 질문
          </h2>
          <p className="lead mt-5">답변에 없는 상황이라면, 아이의 이야기를 먼저 들려주세요.</p>
          <Link href="/faq" className="link-underline mt-8 inline-flex items-center gap-2 pb-1 font-semibold text-forest-strong">
            전체 질문 보기
            <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
          </Link>
        </div>
        <div className="reveal">
          <FaqList items={items} openFirst />
        </div>
      </div>
    </section>
  );
}
