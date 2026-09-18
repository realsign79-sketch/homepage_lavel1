import { ArrowRight, Info } from "lucide-react";
import Link from "next/link";

import { SENIOR } from "@/content/home";

export const SENIOR_ROLES = [
  {
    title: "미용 과정에서 조절할 부분",
    body: "자세, 순서, 휴식, 진행 시간처럼 미용사가 현장에서 바꿀 수 있는 부분입니다.",
  },
  {
    title: "보호자가 생활에서 관찰할 부분",
    body: "집에서 걷는 모습, 특정 부위를 만질 때의 반응처럼 일상에서 확인할 수 있는 부분입니다.",
  },
  {
    title: "동물병원 확인이 필요한 가능성",
    body: "신체 불편 가능성이 보이면 안전을 위해 동물병원 확인을 먼저 권할 수 있습니다.",
  },
];

export function SeniorCare() {
  return (
    <section aria-labelledby="senior-title" className="py-24 md:py-32">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div className="reveal">
            <p className="eyebrow">{SENIOR.eyebrow}</p>
            <h2 id="senior-title" className="display h2-section mt-4 text-forest-strong">
              {SENIOR.title}
            </h2>
          </div>
          <div className="reveal">
            <p className="prose-body text-muted">{SENIOR.body}</p>
            <Link
              href="/for-senior-dogs"
              className="link-underline mt-8 inline-flex items-center gap-2 pb-1 font-semibold text-forest-strong"
            >
              노령견 케어 자세히 보기
              <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
            </Link>
          </div>
        </div>

        <ul className="mt-14 grid gap-4 md:grid-cols-3">
          {SENIOR_ROLES.map((r, i) => (
            <li key={r.title} className="reveal card p-7">
              <span aria-hidden="true" className="display text-3xl text-sand">
                {["Ⅰ", "Ⅱ", "Ⅲ"][i]}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-forest-strong">{r.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{r.body}</p>
            </li>
          ))}
        </ul>

        <p className="reveal mt-6 flex items-start gap-2.5 rounded-[var(--radius-sm)] bg-surface-muted px-5 py-4 text-sm text-ink">
          <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-sage-text" strokeWidth={1.8} />
          {SENIOR.notice}
        </p>
      </div>
    </section>
  );
}
