import Image from "next/image";

import { FinalCta } from "@/components/home/FinalCta";
import { AnswerBlock } from "@/components/ui/AnswerBlock";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Principles } from "@/components/ui/Principles";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE, TODO_REQUIRED, getSiteUrl } from "@/config/site";
import { OWNER_NOTE, RESPONSIBILITY } from "@/content/home";
import { PHOTOS } from "@/content/images";
import { ABOUT_PAGE as P } from "@/content/pages";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, businessId, graph, prune, webPageSchema } from "@/lib/schema";

export const metadata = pageMetadata({ title: P.metaTitle, description: P.description, path: P.path });

const crumbs = [
  { name: "홈", path: "/" },
  { name: "효효그루밍", path: P.path },
];

export default function AboutPage() {
  const career = TODO_REQUIRED.ownerCareer;
  const siteUrl = getSiteUrl();

  return (
    <>
      <PageHero crumbs={crumbs} eyebrow="About" title={P.title} lead={RESPONSIBILITY.quote} photo={PHOTOS.owner} />

      <div className="container-page pb-8">
        <AnswerBlock question={P.answerQuestion}>
          <p>{P.answer}</p>
        </AnswerBlock>
      </div>

      <section aria-labelledby="story-title" className="py-20 md:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading id="story-title" eyebrow="Our story" title="왜 어려운 아이들을 계속 만나는가" />
          <div className="prose-body reveal text-ink/85">
            {P.story.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="mt-8! text-base text-muted">— {SITE.name} 대표 {SITE.owner}</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="lecture-title" className="bg-forest-strong py-20 text-surface md:py-28">
        <div className="container-page grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div className="grid grid-cols-5 gap-3">
            <div className="reveal photo col-span-3 aspect-[3/4]">
              <Image src={PHOTOS.lectureContact.src} alt={PHOTOS.lectureContact.alt} fill placeholder="blur" sizes="(min-width: 1024px) 30vw, 60vw" />
            </div>
            <div className="reveal photo col-span-2 aspect-[3/4] self-end">
              <Image
                src={PHOTOS.lectureSeminar.src}
                alt={PHOTOS.lectureSeminar.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 20vw, 40vw"
                className="object-[45%_50%]"
              />
            </div>
          </div>
          <div>
            <SectionHeading id="lecture-title" eyebrow="Sharing the view" tone="inverse" title={OWNER_NOTE.quoteTitle} />
            <blockquote className="reveal mt-8 border-l-2 border-clay pl-6">
              <p className="display text-xl leading-relaxed text-surface md:text-2xl">“{OWNER_NOTE.quote}”</p>
              <footer className="mt-4 text-sm text-surface/70">— {OWNER_NOTE.source}</footer>
            </blockquote>
            <p className="reveal mt-8 text-[1.0625rem] leading-relaxed text-surface/80">{OWNER_NOTE.detail}</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="values-title" className="py-20 md:py-28">
        <div className="container-page">
          <SectionHeading id="values-title" eyebrow="Values" title="효효그루밍이 일하는 방식" />
          <div className="mt-12">
            <Principles items={P.values} />
          </div>
        </div>
      </section>

      {career.length > 0 ? (
        <section aria-labelledby="career-title" className="bg-surface py-20 md:py-28">
          <div className="container-page">
            <SectionHeading id="career-title" eyebrow="Career" title={`${SITE.owner} 대표 경력·자격`} />
            <ul className="mt-10 divide-y divide-line border-y border-line">
              {career.map((c) => (
                <li key={c.title} className="grid gap-1 py-5 sm:grid-cols-[10rem_1fr]">
                  <span className="text-sm text-muted">{c.period}</span>
                  <span className="text-ink">
                    {c.title}
                    {c.issuer ? <span className="text-muted"> · {c.issuer}</span> : null}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <FinalCta />
      <JsonLd
        data={graph(
          { ...webPageSchema({ name: P.title, description: P.description, path: P.path }), "@type": "AboutPage" },
          prune({
            "@type": "Person",
            "@id": `${siteUrl}/about#owner`,
            name: SITE.owner,
            jobTitle: "대표",
            worksFor: { "@id": businessId(siteUrl) },
            image: `${siteUrl}${PHOTOS.owner.src.src}`,
            hasCredential: career.map((c) => ({ "@type": "EducationalOccupationalCredential", name: c.title })),
          }),
          breadcrumbSchema(crumbs),
        )}
      />
    </>
  );
}
