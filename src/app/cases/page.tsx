import { notFound } from "next/navigation";

import { CasePreview } from "@/components/home/CasePreview";
import { FinalCta } from "@/components/home/FinalCta";
import { PageHero } from "@/components/ui/PageHero";
import { getCases } from "@/content/cases";
import { pageMetadata } from "@/lib/metadata";

const hasCases = getCases().length > 0;

export const metadata = pageMetadata({
  title: "미용 적응 사례",
  description: "보호자의 동의를 받은 효효그루밍의 실제 미용 교육 사례입니다.",
  path: "/cases",
  // 실제 사례가 없으면 색인하지 않음 (명세 5장)
  noindex: !hasCases,
});

/** 실제 동의 사례가 입력되기 전까지는 404 — 메뉴·사이트맵에서도 제외됩니다. */
export default function CasesPage() {
  if (!hasCases) notFound();
  return (
    <>
      <PageHero
        crumbs={[
          { name: "홈", path: "/" },
          { name: "사례", path: "/cases" },
        ]}
        eyebrow="Cases"
        title="미용 적응 사례"
        lead="외모의 변화가 아니라 과정의 변화를 기록합니다. 모든 사례는 보호자의 동의를 받았습니다."
      />
      <CasePreview />
      <FinalCta />
    </>
  );
}
