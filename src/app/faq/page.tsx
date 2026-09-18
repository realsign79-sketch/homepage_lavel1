import { FinalCta } from "@/components/home/FinalCta";
import { FaqList } from "@/components/ui/FaqList";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { FAQ } from "@/content/faq";
import { FAQ_PAGE as P } from "@/content/pages";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, graph, webPageSchema } from "@/lib/schema";

export const metadata = pageMetadata({ title: P.metaTitle, description: P.description, path: P.path });

const crumbs = [
  { name: "홈", path: "/" },
  { name: "자주 묻는 질문", path: P.path },
];

export default function FaqPage() {
  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow="FAQ"
        title={P.title}
        lead="모든 답변은 아이마다 달라질 수 있습니다. 여기에 없는 상황이라면 편하게 상담해 주세요."
      />
      <section aria-label="질문과 답변" className="pb-24 md:pb-32">
        <div className="container-page">
          <nav aria-label="질문 목록" className="mb-10 flex flex-wrap gap-2">
            {FAQ.map((f, i) => (
              <a
                key={f.id}
                href={`#${f.id}`}
                className="rounded-full border border-line bg-surface px-4 py-2 text-sm text-muted transition-colors hover:border-forest/40 hover:text-forest-strong"
              >
                Q{i + 1}
              </a>
            ))}
          </nav>
          <FaqList items={FAQ} headingLevel="h2" openFirst />
        </div>
      </section>
      <FinalCta />
      <JsonLd
        data={graph(
          webPageSchema({ name: P.title, description: P.description, path: P.path }),
          faqSchema(FAQ),
          breadcrumbSchema(crumbs),
        )}
      />
    </>
  );
}
