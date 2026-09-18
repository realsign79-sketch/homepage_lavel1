import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { SITE, TODO_REQUIRED, has } from "@/config/site";
import { PRIVACY_PAGE as P } from "@/content/pages";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, graph } from "@/lib/schema";

export const metadata = pageMetadata({ title: P.title, description: P.description, path: P.path });

const crumbs = [
  { name: "홈", path: "/" },
  { name: P.title, path: P.path },
];

/**
 * 현재 웹사이트는 온라인 상담 폼을 운영하지 않습니다.
 * 상담 폼·분석 도구를 연결하면 이 문서를 실제 운영 기준에 맞게 반드시 갱신해야 합니다.
 */
export default function PrivacyPage() {
  const gaEnabled = has(process.env.NEXT_PUBLIC_GA_ID);
  const contact = has(TODO_REQUIRED.email) ? `${SITE.phone.display} / ${TODO_REQUIRED.email}` : SITE.phone.display;

  const sections = [
    {
      title: "1. 웹사이트에서 직접 수집하는 개인정보",
      body: [
        `${SITE.name} 웹사이트는 현재 회원가입이나 온라인 상담 신청서를 운영하지 않으며, 웹사이트를 통해 이름·연락처 등 개인정보를 직접 입력받지 않습니다.`,
      ],
    },
    {
      title: "2. 전화·문자 상담 시 받는 정보",
      body: [
        "전화나 문자로 상담하실 때 보호자 성함, 연락처, 반려견의 나이·견종·이전 미용 경험·건강상 특이사항 등을 여쭐 수 있습니다.",
        "이 정보는 상담과 미용 교육 진행을 위한 목적으로만 사용하며, 목적 외 용도로 이용하거나 제3자에게 제공하지 않습니다.",
        "상담 정보 제공을 원하지 않으시면 거부하실 수 있으며, 이 경우 안내 가능한 범위가 제한될 수 있습니다.",
      ],
    },
    {
      title: "3. 방문 기록과 분석 도구",
      body: gaEnabled
        ? [
            "웹사이트 개선을 위해 Google Analytics를 사용하며, 방문 페이지·유입 경로·버튼 클릭 등 개인을 식별하지 않는 이용 통계를 수집합니다.",
            "분석 이벤트에는 이름, 전화번호, 반려견 건강정보를 포함하지 않습니다.",
          ]
        : ["현재 웹사이트는 별도의 방문자 분석 도구를 사용하지 않습니다."],
    },
    {
      title: "4. 문의",
      body: [`개인정보와 관련한 문의는 ${contact}로 연락해 주세요.`],
    },
  ];

  return (
    <>
      <PageHero crumbs={crumbs} eyebrow="Privacy" title={P.title} lead={`${SITE.name}(대표 ${SITE.owner})의 개인정보 처리 기준을 안내합니다.`} />
      <section aria-label="개인정보 처리 안내 본문" className="pb-24 md:pb-32">
        <div className="container-page">
          <div className="card max-w-3xl space-y-10 p-7 md:p-12">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="text-lg font-semibold text-forest-strong">{s.title}</h2>
                <div className="mt-3 space-y-2 text-[1rem] leading-relaxed text-muted">
                  {s.body.map((b) => (
                    <p key={b}>{b}</p>
                  ))}
                </div>
              </div>
            ))}
            <p className="border-t border-line pt-6 text-sm text-muted">시행일: {SITE.contentUpdatedAt}</p>
          </div>
        </div>
      </section>
      <JsonLd data={graph(breadcrumbSchema(crumbs))} />
    </>
  );
}
