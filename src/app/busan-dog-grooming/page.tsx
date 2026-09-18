import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { FinalCta } from "@/components/home/FinalCta";
import { AnswerBlock } from "@/components/ui/AnswerBlock";
import { ContactButtons } from "@/components/ui/ContactButtons";
import { FaqList } from "@/components/ui/FaqList";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE } from "@/config/site";
import { PHOTOS } from "@/content/images";
import { BITING_LANDING, BUSAN_LANDING as P } from "@/content/landing";
import { PROCESS_STEPS } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, graph, serviceSchema, webPageSchema } from "@/lib/schema";

export const metadata = pageMetadata({ title: P.metaTitle, description: P.description, path: P.path });

const crumbs = [
  { name: "홈", path: "/" },
  { name: P.navLabel, path: P.path },
];

export default function BusanDogGroomingPage() {
  return (
    <>
      <PageHero crumbs={crumbs} eyebrow={P.eyebrow} title={P.title} lead={P.lead} photo={PHOTOS.tablePoodle} />

      <div className="container-page pb-8">
        <AnswerBlock question={P.answerQuestion}>
          <p>{P.answer}</p>
        </AnswerBlock>
      </div>

      {/* 한눈에 보기 — AI가 인용하기 쉬운 사실 표 */}
      <section aria-labelledby="facts-title" className="py-20 md:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading id="facts-title" eyebrow="At a glance" title="효효그루밍 한눈에 보기" />
          <div className="reveal overflow-x-auto">
            <table className="w-full border-t border-line text-left">
              <caption className="sr-only">효효그루밍 기본 정보</caption>
              <tbody>
                {P.facts.map((f) => (
                  <tr key={f.label} className="border-b border-line">
                    <th scope="row" className="w-32 py-4 pr-6 align-top font-semibold text-forest-strong">
                      {f.label}
                    </th>
                    <td className="py-4 text-ink">{f.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-8">
              <ContactButtons location="busan_facts" />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="who-title" className="bg-surface py-20 md:py-28">
        <div className="container-page">
          <SectionHeading id="who-title" eyebrow="Who we meet" title={P.whoTitle} />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {P.who.map((w) => (
              <li key={w} className="reveal display rounded-[var(--radius-md)] border border-line bg-canvas p-7 text-xl leading-snug text-forest-strong">
                “{w}”
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="compare-title" className="py-20 md:py-28">
        <div className="container-page">
          <SectionHeading id="compare-title" eyebrow="Difference" title={P.compareTitle} lead={P.compareIntro} />
          <div className="reveal mt-12 overflow-x-auto rounded-[var(--radius-md)] border border-line bg-surface">
            <table className="w-full min-w-[34rem] text-left text-[0.9375rem]">
              <caption className="sr-only">한 번 완성 미용과 효효그루밍 미용 교육 비교</caption>
              <thead className="bg-surface-muted text-sm">
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold text-muted">구분</th>
                  <th scope="col" className="px-6 py-4 font-semibold text-muted">한 번 완성 미용</th>
                  <th scope="col" className="px-6 py-4 font-semibold text-forest-strong">효효그루밍 미용 교육</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {P.compare.map((r) => (
                  <tr key={r.topic}>
                    <th scope="row" className="px-6 py-4 font-semibold text-forest-strong">{r.topic}</th>
                    <td className="px-6 py-4 text-muted">{r.common}</td>
                    <td className="px-6 py-4 font-medium text-ink">{r.ours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section aria-labelledby="busan-steps-title" className="bg-forest-strong py-20 text-surface md:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <SectionHeading id="busan-steps-title" eyebrow="Process" tone="inverse" title="상담부터 다음 미용까지 5단계" />
            <div className="reveal photo mt-10 aspect-[4/3] max-w-md">
              <Image src={PHOTOS.bath.src} alt={PHOTOS.bath.alt} fill placeholder="blur" sizes="(min-width: 1024px) 28rem, 90vw" />
            </div>
          </div>
          <ol className="self-center">
            {PROCESS_STEPS.map((s) => (
              <li key={s.no} className="reveal grid grid-cols-[auto_1fr] gap-6 border-t border-surface/15 py-6">
                <span className="display text-2xl text-clay">{s.no}</span>
                <div>
                  <h3 className="text-lg font-semibold text-surface">{s.title}</h3>
                  <p className="mt-1 text-[0.9375rem] text-surface/75">{s.summary}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="area-title" className="py-20 md:py-28">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading id="area-title" eyebrow="Area" title={P.areaTitle} />
          <div className="reveal">
            <p className="flex items-start gap-3 text-[1.0625rem] leading-relaxed text-ink">
              <MapPin aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-sage-text" strokeWidth={1.8} />
              {P.areaBody}
            </p>
            <Link
              href={BITING_LANDING.path}
              className="link-underline mt-8 inline-flex items-center gap-2 pb-1 font-semibold text-forest-strong"
            >
              미용할 때 무는 강아지라면
              <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="busan-faq-title" className="bg-surface py-20 md:py-28">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading id="busan-faq-title" eyebrow="FAQ" title="부산 보호자분들이 자주 묻는 질문" />
          <div className="reveal">
            <FaqList items={P.faqs} />
          </div>
        </div>
      </section>

      <FinalCta />
      <JsonLd
        data={graph(
          webPageSchema({ name: P.title, description: P.description, path: P.path }),
          {
            ...serviceSchema({ name: `부산 애견미용 · ${SITE.specialty}`, description: P.answer, path: P.path }),
            areaServed: [
              { "@type": "City", name: SITE.region.province },
              { "@type": "AdministrativeArea", name: `${SITE.region.province} ${SITE.region.district}` },
            ],
            serviceType: "애견미용",
          },
          breadcrumbSchema(crumbs),
          faqSchema(P.faqs),
        )}
      />
    </>
  );
}
