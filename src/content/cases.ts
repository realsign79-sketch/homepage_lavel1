import { TODO_REQUIRED, type CaseStudy } from "@/config/site";

/** 보호자 공개 동의를 받은 실제 사례만 노출합니다. 없으면 사례 블록과 /cases는 비공개. */
export function getCases(): CaseStudy[] {
  return TODO_REQUIRED.realCaseStudies.filter((c) => c.consent === true);
}
