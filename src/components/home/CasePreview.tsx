import { SectionHeading } from "@/components/ui/SectionHeading";
import { getCases } from "@/content/cases";

/** 보호자 동의를 받은 실제 사례가 있을 때만 렌더링합니다. */
export function CasePreview() {
  const cases = getCases();
  if (cases.length === 0) return null;

  return (
    <section aria-labelledby="cases-title" className="py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          id="cases-title"
          eyebrow="Cases"
          title="외모의 변화보다, 과정의 변화를 기록합니다."
          lead="보호자의 동의를 받은 실제 사례입니다. 날짜와 회차를 함께 표시합니다."
        />
        <ul className="mt-12 grid gap-5 md:grid-cols-2">
          {cases.slice(0, 4).map((c) => (
            <li key={c.slug} className="reveal card p-7">
              <p className="text-sm text-muted">
                {c.date} · {c.sessions}
              </p>
              <h3 className="display mt-2 text-2xl text-forest-strong">
                {c.dogAlias} <span className="text-base text-muted">({c.ageGroup})</span>
              </h3>
              <dl className="mt-5 space-y-3 text-[0.9375rem]">
                <div>
                  <dt className="font-semibold text-forest-strong">어려웠던 상황</dt>
                  <dd className="text-muted">{c.difficulty}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-forest-strong">변화</dt>
                  <dd className="text-muted">{c.change}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
