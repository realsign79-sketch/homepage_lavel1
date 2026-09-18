import { ArrowRight, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { FinalCta } from "@/components/home/FinalCta";
import { AnswerBlock } from "@/components/ui/AnswerBlock";
import { ContactButtons } from "@/components/ui/ContactButtons";
import { FaqList } from "@/components/ui/FaqList";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Principles } from "@/components/ui/Principles";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PHOTOS } from "@/content/images";
import { BITING_LANDING as P, BUSAN_LANDING } from "@/content/landing";
import { PREP_CHECKLIST } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, graph, serviceSchema, webPageSchema } from "@/lib/schema";

export const metadata = pageMetadata({ title: P.metaTitle, description: P.description, path: P.path });

const crumbs = [
  { name: "홈", path: "/" },
  { name: P.navLabel, path: P.path },
];

export default function BitingDogGroomingPage() {
  return (
    <>
      <PageHero crumbs={crumbs} eyebrow={P.eyebrow} title={P.title} lead={P.lead} photo={PHOTOS.touchPaw} />

      <div className="container-page pb-8">
        <AnswerBlock question={P.answerQuestion}>
          <p>{P.answer}</p>
        </AnswerBlock>
      </div>

      <section aria-labelledby="why-title" className="py-20 md:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <SectionHeading id="why-title" eyebrow="Why" title={P.whyTitle} />
            <div className="prose-body reveal mt-7 text-muted">
              {P.whyBody.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <ul className="grid gap-3 self-end sm:grid-cols-2">
            {P.checkpoints.map((c) => (
              <li key={c.title} className="reveal card p-6">
                <h3 className="display text-xl text-forest-strong">{c.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{c.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="approach-title" className="bg-surface py-20 md:py-28">
        <div className="container-page grid items-start gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <div>
            <SectionHeading id="approach-title" eyebrow="Approach" title={P.approachTitle} />
            <div className="mt-10">
              <Principles items={P.approach} />
            </div>
          </div>
          <figure className="reveal">
            <div className="photo aspect-[3/4]">
              <Image src={PHOTOS.floorNail.src} alt={PHOTOS.floorNail.alt} fill placeholder="blur" sizes="(min-width: 1024px) 30vw, 100vw" />
            </div>
            <figcaption className="mt-4 text-sm text-muted">
              테이블이 어려운 아이라면 바닥에서, 품에 안긴 채로 시작하기도 합니다.
            </figcaption>
          </figure>
        </div>
      </section>

      <section aria-labelledby="safety-title" className="bg-surface-muted py-20 md:py-28">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading id="safety-title" eyebrow="Safety" title="안전을 위해 약속하지 않는 것" />
          <ul className="reveal space-y-4">
            {P.safety.map((s) => (
              <li key={s} className="flex gap-3 border-b border-line pb-4 text-[1.0625rem] leading-relaxed text-ink">
                <Info aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-sage-text" strokeWidth={1.8} />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="biting-prep-title" className="py-20 md:py-28">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading
            id="biting-prep-title"
            eyebrow="Before you call"
            title="상담 전에 알려주시면 좋아요"
            lead="아는 만큼만 알려주셔도 괜찮습니다."
          />
          <div className="reveal">
            <ol className="divide-y divide-line border-y border-line">
              {PREP_CHECKLIST.map((item, i) => (
                <li key={item} className="flex items-center gap-5 py-4">
                  <span aria-hidden="true" className="display w-6 text-lg text-clay-strong">
                    {i + 1}
                  </span>
                  <span className="text-[1.0625rem] text-ink">{item}</span>
                </li>
              ))}
            </ol>
            <div className="mt-8">
              <ContactButtons location="biting_prep" />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="biting-faq-title" className="bg-surface py-20 md:py-28">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionHeading id="biting-faq-title" eyebrow="FAQ" title="무는 강아지 보호자분들이 묻는 질문" />
            <Link
              href={BUSAN_LANDING.path}
              className="reveal link-underline mt-8 inline-flex items-center gap-2 pb-1 font-semibold text-forest-strong"
            >
              부산 동래 효효그루밍 안내
              <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
            </Link>
          </div>
          <div className="reveal">
            <FaqList items={P.faqs} />
          </div>
        </div>
      </section>

      <FinalCta />
      <JsonLd
        data={graph(
          webPageSchema({ name: P.title, description: P.description, path: P.path }),
          serviceSchema({ name: "무는 강아지 미용 상담 · 미용 교육", description: P.answer, path: P.path }),
          breadcrumbSchema(crumbs),
          faqSchema(P.faqs),
        )}
      />
    </>
  );
}
