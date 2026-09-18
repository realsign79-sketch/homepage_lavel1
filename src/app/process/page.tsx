import { ClipboardList, Lock } from "lucide-react";
import Image from "next/image";

import { FinalCta } from "@/components/home/FinalCta";
import { AnswerBlock } from "@/components/ui/AnswerBlock";
import { ContactButtons } from "@/components/ui/ContactButtons";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PHOTOS } from "@/content/images";
import { PROCESS_PAGE as P } from "@/content/pages";
import { PREP_CHECKLIST, PROCESS_NOTE, PROCESS_STEPS } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, graph, serviceSchema, webPageSchema } from "@/lib/schema";

export const metadata = pageMetadata({ title: P.metaTitle, description: P.description, path: P.path });

const crumbs = [
  { name: "홈", path: "/" },
  { name: "진행 과정", path: P.path },
];

export default function ProcessPage() {
  return (
    <>
      <PageHero crumbs={crumbs} eyebrow="Process" title={P.title} lead={PROCESS_NOTE} photo={PHOTOS.tablePoodle} />

      <div className="container-page pb-8">
        <AnswerBlock question={P.answerQuestion}>
          <p>{P.answer}</p>
        </AnswerBlock>
      </div>

      <section aria-labelledby="steps-title" className="py-20 md:py-28">
        <div className="container-page">
          <SectionHeading id="steps-title" eyebrow="5 steps" title="아이의 속도에 맞춘 다섯 단계" />
          <ol className="relative mt-14 space-y-4 before:absolute before:top-4 before:bottom-4 before:left-[1.4rem] before:w-px before:bg-line md:before:left-[1.9rem]">
            {PROCESS_STEPS.map((s) => (
              <li key={s.no} className="reveal relative grid grid-cols-[auto_1fr] gap-5 md:gap-8">
                <span className="display relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-base text-clay-strong md:h-15 md:w-15 md:text-xl">
                  {s.no}
                </span>
                <div className="card p-6 md:p-8">
                  <h3 className="display text-xl text-forest-strong md:text-2xl">{s.title}</h3>
                  <p className="mt-2 text-[1.0625rem] leading-relaxed text-ink">{s.summary}</p>
                  <ul className="mt-4 space-y-2 border-t border-line pt-4">
                    {s.detail.map((d) => (
                      <li key={d} className="flex gap-3 text-[0.9375rem] leading-relaxed text-muted">
                        <span aria-hidden="true" className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-sage" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="prep-title" className="bg-surface py-20 md:py-28">
        <div className="container-page grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <SectionHeading
              id="prep-title"
              eyebrow="Before you call"
              title="상담 전에 알려주시면 좋은 정보"
              lead="모두 준비하지 않으셔도 괜찮습니다. 아는 만큼만 알려주시면 상담에서 함께 채워갑니다."
            />
            <ul className="reveal mt-10 grid gap-3 sm:grid-cols-2">
              {PREP_CHECKLIST.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-[var(--radius-sm)] border border-line bg-canvas p-4">
                  <ClipboardList aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-sage-text" strokeWidth={1.6} />
                  <span className="text-[0.9375rem] leading-relaxed text-ink">{item}</span>
                </li>
              ))}
            </ul>
            <p className="reveal mt-6 flex items-start gap-2.5 text-sm leading-relaxed text-muted">
              <Lock aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.8} />
              건강 정보처럼 민감한 내용은 상담에 꼭 필요한 범위에서만 여쭙고, 상담 목적 외에는 사용하지 않습니다.
            </p>
            <div className="reveal mt-10">
              <ContactButtons location="process_prep" />
            </div>
          </div>
          <figure className="reveal">
            <div className="photo aspect-[4/5]">
              <Image src={PHOTOS.bath.src} alt={PHOTOS.bath.alt} fill placeholder="blur" sizes="(min-width: 1024px) 36vw, 100vw" className="object-[30%_50%]" />
            </div>
          </figure>
        </div>
      </section>

      <FinalCta />
      <JsonLd
        data={graph(
          webPageSchema({ name: P.title, description: P.description, path: P.path }),
          serviceSchema({ name: "미용 교육 상담", description: P.answer, path: P.path }),
          breadcrumbSchema(crumbs),
          {
            "@type": "HowTo",
            name: "효효그루밍 미용 교육 진행 과정",
            description: PROCESS_NOTE,
            step: PROCESS_STEPS.map((s, i) => ({
              "@type": "HowToStep",
              position: i + 1,
              name: s.title,
              text: s.summary,
            })),
          },
        )}
      />
    </>
  );
}
