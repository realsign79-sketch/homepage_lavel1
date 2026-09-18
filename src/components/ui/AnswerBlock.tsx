import type { ReactNode } from "react";

/**
 * AEO/GEO 직접 답변 블록 — 페이지 상단에서 질문에 바로 답합니다.
 * AI 검색과 빠른 스캔 모두를 위해 40~70단어 분량으로 작성합니다.
 */
export function AnswerBlock({ question, children }: { question: string; children: ReactNode }) {
  return (
    <section aria-label="요약 답변" className="reveal card relative overflow-hidden p-6 md:p-8">
      <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-clay" />
      <p className="text-xs font-semibold tracking-[0.2em] text-sage-text uppercase">Summary</p>
      <h2 className="mt-2 text-lg font-semibold text-forest-strong md:text-xl">{question}</h2>
      <div className="mt-3 text-[1.0625rem] leading-[1.85] text-ink">{children}</div>
    </section>
  );
}
