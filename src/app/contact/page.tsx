import { Clock, MapPin, MessageSquareText, Phone } from "lucide-react";

import { AnswerBlock } from "@/components/ui/AnswerBlock";
import { ContactButtons } from "@/components/ui/ContactButtons";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE, TODO_REQUIRED, getSmsHref, has } from "@/config/site";
import { CONTACT_PAGE as P } from "@/content/pages";
import { PREP_CHECKLIST, SMS_TEMPLATE } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, businessId, graph, webPageSchema } from "@/lib/schema";

export const metadata = pageMetadata({ title: P.metaTitle, description: P.description, path: P.path });

const crumbs = [
  { name: "홈", path: "/" },
  { name: "상담하기", path: P.path },
];

export default function ContactPage() {
  const { openingHours, naverPlaceUrl } = TODO_REQUIRED;
  const address = has(TODO_REQUIRED.address) ? TODO_REQUIRED.address : null;
  const mapHref = has(naverPlaceUrl)
    ? naverPlaceUrl
    : address
      ? `https://map.naver.com/p/search/${encodeURIComponent(address)}`
      : null;

  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow="Consultation"
        title={P.title}
        lead="아이가 왜 어려워하는지 이해하는 상담부터 시작합니다. 편한 방법으로 연락 주세요."
      />

      <div className="container-page pb-8">
        <AnswerBlock question={P.answerQuestion}>
          <p>{P.answer}</p>
        </AnswerBlock>
      </div>

      <section aria-label="상담 방법" className="py-16 md:py-24">
        <div className="container-page grid gap-4 lg:grid-cols-2">
          <a
            href={`tel:${SITE.phone.tel}`}
            data-track="click_phone"
            data-track-location="contact_card"
            className="reveal group grain relative overflow-hidden rounded-[var(--radius-lg)] bg-forest p-8 text-surface transition-transform duration-300 hover:-translate-y-1 md:p-12"
          >
            <span className="relative z-10 flex items-center gap-3 text-sm font-semibold tracking-[0.2em] text-sand uppercase">
              <Phone aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} /> Call
            </span>
            <span className="display relative z-10 mt-6 block text-[clamp(2rem,1.4rem+2.6vw,3.25rem)] leading-none">
              {SITE.phone.display}
            </span>
            <span className="relative z-10 mt-5 block text-[1.0625rem] text-surface/80">
              전화로 바로 상담하기 <span aria-hidden="true">→</span>
            </span>
          </a>

          <div className="reveal card flex flex-col rounded-[var(--radius-lg)] p-8 md:p-12">
            <span className="flex items-center gap-3 text-sm font-semibold tracking-[0.2em] text-sage-text uppercase">
              <MessageSquareText aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} /> Message
            </span>
            <p className="display mt-6 text-2xl text-forest-strong md:text-[1.75rem]">통화가 어렵다면 문자로 남겨주세요.</p>
            <p className="mt-3 text-[0.9375rem] text-muted">버튼을 누르면 아래 양식이 담긴 문자 창이 열립니다.</p>
            <pre className="mt-5 overflow-x-auto rounded-[var(--radius-sm)] bg-surface-muted p-4 font-sans text-sm leading-relaxed whitespace-pre-wrap text-ink">
              {SMS_TEMPLATE}
            </pre>
            <a
              href={getSmsHref(SMS_TEMPLATE)}
              data-track="click_sms"
              data-track-location="contact_card"
              className="btn btn-secondary mt-6 self-start"
            >
              문자 양식으로 상담 남기기
            </a>
          </div>
        </div>
      </section>

      <section aria-labelledby="contact-prep-title" className="bg-surface py-20 md:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionHeading
            id="contact-prep-title"
            eyebrow="Checklist"
            title="이런 정보를 알려주시면 좋아요"
            lead="아는 만큼만 알려주셔도 괜찮습니다."
          />
          <ol className="reveal divide-y divide-line border-y border-line">
            {PREP_CHECKLIST.map((item, i) => (
              <li key={item} className="flex items-center gap-5 py-4">
                <span aria-hidden="true" className="display w-6 text-lg text-clay-strong">
                  {i + 1}
                </span>
                <span className="text-[1.0625rem] text-ink">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="visit-title" className="py-20 md:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionHeading id="visit-title" eyebrow="Visit" title="오시는 길" />
          <div className="reveal">
            <dl className="divide-y divide-line border-y border-line">
              <div className="grid gap-2 py-5 sm:grid-cols-[8rem_1fr]">
                <dt className="flex items-center gap-2 font-semibold text-forest-strong">
                  <MapPin aria-hidden="true" className="h-4 w-4 text-sage-text" strokeWidth={1.8} /> 위치
                </dt>
                <dd className="text-ink">
                  {address ?? SITE.region.label}
                  {!address ? (
                    <span className="mt-1 block text-sm text-muted">정확한 위치는 상담 시 안내해 드립니다.</span>
                  ) : null}
                </dd>
              </div>
              {has(openingHours) ? (
                <div className="grid gap-2 py-5 sm:grid-cols-[8rem_1fr]">
                  <dt className="flex items-center gap-2 font-semibold text-forest-strong">
                    <Clock aria-hidden="true" className="h-4 w-4 text-sage-text" strokeWidth={1.8} /> 운영시간
                  </dt>
                  <dd className="text-ink">{openingHours}</dd>
                </div>
              ) : null}
              <div className="grid gap-2 py-5 sm:grid-cols-[8rem_1fr]">
                <dt className="flex items-center gap-2 font-semibold text-forest-strong">
                  <Phone aria-hidden="true" className="h-4 w-4 text-sage-text" strokeWidth={1.8} /> 전화
                </dt>
                <dd>
                  <a href={`tel:${SITE.phone.tel}`} data-track="click_phone" data-track-location="contact_visit" className="link-underline text-ink">
                    {SITE.phone.display}
                  </a>
                </dd>
              </div>
            </dl>
            {mapHref ? (
              <a
                href={mapHref}
                target="_blank"
                rel="noopener noreferrer"
                data-track="click_map"
                className="btn btn-secondary mt-8"
              >
                <MapPin aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
                네이버 지도에서 보기
                <span className="sr-only">(새 창)</span>
              </a>
            ) : null}
            <div className="mt-10">
              <ContactButtons location="contact_bottom" showSms={false} />
            </div>
          </div>
        </div>
      </section>

      <JsonLd
        data={graph(
          {
            ...webPageSchema({ name: P.title, description: P.description, path: P.path }),
            "@type": "ContactPage",
            mainEntity: { "@id": businessId() },
          },
          breadcrumbSchema(crumbs),
        )}
      />
    </>
  );
}
