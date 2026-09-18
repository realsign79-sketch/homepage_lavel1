import { Info } from "lucide-react";

import { FinalCta } from "@/components/home/FinalCta";
import { SENIOR_ROLES } from "@/components/home/SeniorCare";
import { AnswerBlock } from "@/components/ui/AnswerBlock";
import { FaqList } from "@/components/ui/FaqList";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQ } from "@/content/faq";
import { SENIOR } from "@/content/home";
import { SENIOR_PAGE as P } from "@/content/pages";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, graph, serviceSchema, webPageSchema } from "@/lib/schema";

export const metadata = pageMetadata({ title: P.metaTitle, description: P.description, path: P.path });

const crumbs = [
  { name: "홈", path: "/" },
  { name: "노령견 케어", path: P.path },
];
const faqs = FAQ.filter((f) => ["senior", "first-visit", "before-booking"].includes(f.id));

export default function SeniorDogsPage() {
  return (
    <>
      <PageHero crumbs={crumbs} eyebrow="Senior care" title={P.title} lead={SENIOR.body} />

      <div className="container-page pb-8">
        <AnswerBlock question={P.answerQuestion}>
          <p>{P.answer}</p>
        </AnswerBlock>
      </div>

      <section aria-labelledby="senior-change-title" className="py-20 md:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <SectionHeading id="senior-change-title" eyebrow="What changes" title="예전과 달라진 모습이 보인다면" />
            <div className="prose-body reveal mt-7 text-muted">
              {P.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <ul className="grid gap-3 self-end">
            {P.changes.map((c, i) => (
              <li key={c.title} className="reveal card flex items-start gap-5 p-6">
                <span aria-hidden="true" className="display text-2xl leading-none text-sand">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-forest-strong">{c.title}</h3>
                  <p className="mt-1 text-[0.9375rem] text-muted">{c.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="senior-roles-title" className="bg-forest-strong py-20 text-surface md:py-28">
        <div className="container-page">
          <SectionHeading
            id="senior-roles-title"
            eyebrow="Three areas"
            tone="inverse"
            title="미용사가 할 일과 병원이 할 일을 구분합니다."
          />
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {SENIOR_ROLES.map((r, i) => (
              <li key={r.title} className="reveal rounded-[var(--radius-md)] border border-surface/15 p-7">
                <span aria-hidden="true" className="display text-3xl text-clay">
                  {["Ⅰ", "Ⅱ", "Ⅲ"][i]}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-surface">{r.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-surface/75">{r.body}</p>
              </li>
            ))}
          </ul>
          <p className="reveal mt-8 flex items-start gap-2.5 text-sm text-surface/80">
            <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-sand" strokeWidth={1.8} />
            {SENIOR.notice}
          </p>
        </div>
      </section>

      <section aria-labelledby="senior-faq-title" className="py-20 md:py-28">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading id="senior-faq-title" eyebrow="FAQ" title="노령견 보호자분들이 묻는 질문" />
          <div className="reveal">
            <FaqList items={faqs} />
          </div>
        </div>
      </section>

      <FinalCta />
      <JsonLd
        data={graph(
          webPageSchema({ name: P.title, description: P.description, path: P.path }),
          serviceSchema({ name: "노령견 미용 상담", description: P.answer, path: P.path }),
          breadcrumbSchema(crumbs),
          faqSchema(faqs),
        )}
      />
    </>
  );
}
