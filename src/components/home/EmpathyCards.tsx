import { ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { EMPATHY } from "@/content/home";
import { BITING_LANDING, BUSAN_LANDING } from "@/content/landing";

export function EmpathyCards() {
  return (
    <section aria-labelledby="empathy-title" className="py-24 md:py-32">
      <div className="container-page">
        <SectionHeading id="empathy-title" eyebrow="Who we meet" title={EMPATHY.title} lead={EMPATHY.body} align="center" />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {EMPATHY.cards.map((card, i) => (
            <li
              key={card.title}
              className="reveal card group flex flex-col justify-between p-6 sm:min-h-56 sm:p-7 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-soft"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-surface-muted px-3 py-1 text-xs font-semibold text-sage-text">
                  {card.tag}
                </span>
                <span aria-hidden="true" className="display text-lg text-sand">
                  0{i + 1}
                </span>
              </div>
              <p className="display mt-5 text-[1.3125rem] sm:mt-8 leading-snug text-forest-strong">{card.title}</p>
            </li>
          ))}
        </ul>

        <p className="reveal mx-auto mt-10 flex max-w-2xl items-start justify-center gap-3 text-center text-[0.9375rem] text-muted">
          <ShieldCheck aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-sage" strokeWidth={1.6} />
          {EMPATHY.note}
        </p>

        <div className="reveal mt-8 flex flex-wrap justify-center gap-3">
          {[
            { href: BITING_LANDING.path, label: "미용할 때 무는 강아지라면" },
            { href: BUSAN_LANDING.path, label: "부산 동래 애견미용 안내" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-3 text-[0.9375rem] font-semibold text-forest-strong transition-colors hover:border-forest/40"
            >
              {l.label}
              <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
