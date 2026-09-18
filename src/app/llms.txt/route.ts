import { SITE, TODO_REQUIRED, getAddress, getSiteUrl, has } from "@/config/site";
import { FAQ } from "@/content/faq";
import { LANDINGS } from "@/content/landing";
import { PROCESS_NOTE, PROCESS_STEPS, SERVICES } from "@/content/services";

export const dynamic = "force-static";

/** AI 답변 엔진용 사이트 요약 (llms.txt) — 확정 정보만 포함 */
export function GET() {
  const base = getSiteUrl();
  const t = TODO_REQUIRED;
  const lines = [
    `# ${SITE.name} (${SITE.nameEn})`,
    "",
    `> ${SITE.region.label}의 ${SITE.specialty} 전문 애견미용실. 행동을 억누르고 한 번의 미용을 끝내기보다, 행동이 나타나는 이유를 살피고 다음 미용까지 이어지는 경험을 보호자와 함께 만든다.`,
    "",
    "## 기본 정보",
    `- 상호: ${SITE.name}`,
    `- 대표: ${SITE.owner}`,
    `- 전화: ${SITE.phone.display}`,
    `- 주소: ${getAddress(t)}`,
    ...(has(t.openingHours) ? [`- 운영시간: ${t.openingHours}`] : []),
    `- 사업자등록번호: ${SITE.businessNumber}`,
    `- 진행 방식: ${SITE.programNote}`,
    "",
    "## 서비스",
    ...SERVICES.map((s) => `- [${s.name}](${base}${s.path}): ${s.description}`),
    "",
    "## 진행 과정",
    ...PROCESS_STEPS.map((s) => `${Number(s.no)}. ${s.title} — ${s.summary}`),
    `- ${PROCESS_NOTE}`,
    "",
    "## 검색 의도별 안내",
    ...LANDINGS.map((l) => `- ${l.answerQuestion} → ${l.answer}`),
    "",
    "## 안전 원칙",
    "- 수의학적 진단이나 치료를 하지 않으며, 행동 교정·완치를 보장하지 않는다.",
    "- 신체 불편 가능성이 보이면 동물병원 확인을 먼저 권할 수 있다.",
    "",
    "## 자주 묻는 질문",
    ...[...FAQ, ...LANDINGS.flatMap((l) => l.faqs)].flatMap((f) => [`### ${f.question}`, f.answer, ""]),
    "## 주요 페이지",
    `- [홈](${base}/)`,
    ...LANDINGS.map((l) => `- [${l.navLabel}](${base}${l.path}): ${l.description}`),
    `- [미용 교육](${base}/grooming-education)`,
    `- [진행 과정](${base}/process)`,
    `- [노령견 케어](${base}/for-senior-dogs)`,
    `- [소개](${base}/about)`,
    `- [자주 묻는 질문](${base}/faq)`,
    `- [상담하기](${base}/contact)`,
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
