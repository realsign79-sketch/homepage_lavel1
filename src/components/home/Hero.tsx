import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { ButtonLink } from "@/components/ui/Button";
import { HERO } from "@/content/home";
import { PHOTOS } from "@/content/images";
import { CTA_LABEL } from "@/content/navigation";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* 장식 배경 */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-40 h-[38rem] w-[38rem] rounded-full bg-surface-muted blur-3xl" />
        <div className="absolute top-1/2 -left-52 h-[28rem] w-[28rem] rounded-full bg-sand/40 blur-3xl" />
      </div>

      <div className="container-page grid min-h-[min(860px,92svh)] items-center gap-12 pt-28 pb-16 md:pt-32 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 lg:pb-24">
        <div className="max-w-2xl">
          <p className="eyebrow">{HERO.eyebrow}</p>
          <h1 id="hero-title" className="display h1-hero mt-6 text-forest-strong">
            {HERO.titleLines.map((line, i) => (
              <span key={line} className="block">
                {i === 1 ? (
                  <>
                    참는 법보다 <em className="text-clay-strong not-italic">안전한 경험</em>을
                  </>
                ) : (
                  line
                )}
              </span>
            ))}
          </h1>
          <p className="lead mt-7">{HERO.body}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/contact">{CTA_LABEL}</ButtonLink>
            <ButtonLink href="/grooming-education" variant="secondary">
              미용 교육 과정 보기
              <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
            </ButtonLink>
          </div>

          <ul className="mt-12 grid gap-3 border-t border-line pt-7 text-[0.9375rem] text-muted sm:grid-cols-3 sm:gap-6">
            {HERO.trust.map((t) => (
              <li key={t} className="flex items-start gap-2.5">
                <span aria-hidden="true" className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="photo aspect-[4/5] w-full shadow-soft lg:aspect-[5/6]">
            <Image
              src={PHOTOS.hero.src}
              alt={PHOTOS.hero.alt}
              fill
              preload
              placeholder="blur"
              sizes="(min-width: 1024px) 40vw, (min-width: 768px) 28rem, 100vw"
              className="object-[50%_30%]"
            />
          </div>

          <div className="card absolute -bottom-6 left-4 max-w-[15rem] p-5 shadow-soft sm:-left-6 md:p-6">
            <p className="text-xs font-semibold tracking-[0.2em] text-sage-text uppercase">Focus program</p>
            <p className="display mt-2 text-2xl text-forest-strong">평균 1~3회</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">집중 과정을 중심으로, 이후는 아이의 변화에 따라 정합니다.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
