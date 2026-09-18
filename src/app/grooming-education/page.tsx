import Image from "next/image";

import { FinalCta } from "@/components/home/FinalCta";
import { AnswerBlock } from "@/components/ui/AnswerBlock";
import { FaqList } from "@/components/ui/FaqList";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Principles } from "@/components/ui/Principles";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQ } from "@/content/faq";
import { PHILOSOPHY } from "@/content/home";
import { PHOTOS } from "@/content/images";
import { EDUCATION as P } from "@/content/pages";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, graph, serviceSchema, webPageSchema } from "@/lib/schema";

export const metadata = pageMetadata({ title: P.metaTitle, description: P.description, path: P.path });

const crumbs = [
  { name: "홈", path: "/" },
  { name: "미용 교육", path: P.path },
];
const faqs = FAQ.filter((f) => ["refused-elsewhere", "biting", "sessions", "homework"].includes(f.id));

export default function GroomingEducationPage() {
  return (
    <>
      <PageHero crumbs={crumbs} eyebrow="Grooming education" title={P.title} lead={P.description} photo={PHOTOS.tableClipper} />

      <div className="container-page pb-8">
        <AnswerBlock question={P.answerQuestion}>
          <p>{P.answer}</p>
        </AnswerBlock>
      </div>

      {/* 1. 행동 맥락 */}
      <section aria-labelledby="context-title" className="py-20 md:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <SectionHeading id="context-title" eyebrow="Context" title="입질 행동에도 이유가 있습니다." />
            <div className="prose-body reveal mt-7 text-muted">
              {P.contextBody.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <ul className="grid gap-3 self-end sm:grid-cols-2">
            {PHILOSOPHY.observations.map((o) => (
              <li key={o.title} className="reveal card p-5">
                <p className="font-semibold text-forest-strong">{o.title}</p>
                <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">{o.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 2. 접근 원칙 */}
      <section aria-labelledby="principles-title" className="bg-surface py-20 md:py-28">
        <div className="container-page">
          <SectionHeading id="principles-title" eyebrow="Principles" title="효효그루밍이 지키는 여섯 가지 원칙" />
          <div className="mt-12">
            <Principles items={P.principles} />
          </div>
        </div>
      </section>

      {/* 3. 진행 예시 */}
      <section aria-labelledby="flow-title" className="py-20 md:py-28">
        <div className="container-page grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <figure className="reveal">
            <div className="photo aspect-[4/5]">
              <Image src={PHOTOS.floorNail.src} alt={PHOTOS.floorNail.alt} fill placeholder="blur" sizes="(min-width: 1024px) 36vw, 100vw" />
            </div>
          </figure>
          <div>
            <SectionHeading id="flow-title" eyebrow="How it goes" title="이런 흐름으로 진행될 수 있습니다." lead={P.flowIntro} />
            <ol className="mt-10 space-y-3">
              {P.flow.map((f, i) => (
                <li key={f.title} className="reveal card flex gap-5 p-6">
                  <span className="display flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-muted text-lg text-forest">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-forest-strong">{f.title}</h3>
                    <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">{f.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 4. 한계와 안전 */}
      <section aria-labelledby="limits-title" className="bg-surface-muted py-20 md:py-28">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading id="limits-title" eyebrow="Safety & limits" title="할 수 있는 것과 약속하지 않는 것" />
          <ul className="reveal space-y-4">
            {P.limits.map((l) => (
              <li key={l} className="flex gap-4 border-b border-line pb-4 text-[1.0625rem] leading-relaxed text-ink">
                <span aria-hidden="true" className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                {l}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="edu-faq-title" className="py-20 md:py-28">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading id="edu-faq-title" eyebrow="FAQ" title="미용 교육에 대해 자주 묻는 질문" />
          <div className="reveal">
            <FaqList items={faqs} />
          </div>
        </div>
      </section>

      <FinalCta />
      <JsonLd
        data={graph(
          webPageSchema({ name: P.title, description: P.description, path: P.path }),
          serviceSchema({ name: "맞춤 미용 교육", description: P.answer, path: P.path }),
          breadcrumbSchema(crumbs),
          faqSchema(faqs),
        )}
      />
    </>
  );
}
