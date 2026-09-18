import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { SITE } from "@/config/site";
import { OWNER_NOTE } from "@/content/home";
import { PHOTOS } from "@/content/images";

export function OwnerNote() {
  return (
    <section aria-labelledby="owner-title" className="bg-surface-muted py-24 md:py-32">
      <div className="container-page grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <figure className="reveal relative mx-auto w-full max-w-sm lg:max-w-none">
          <div className="photo aspect-[3/4]">
            <Image src={PHOTOS.owner.src} alt={PHOTOS.owner.alt} fill placeholder="blur" sizes="(min-width: 1024px) 32vw, 90vw" />
          </div>
          <figcaption className="card absolute right-4 -bottom-6 px-6 py-4 shadow-soft sm:-right-6">
            <span className="block text-xs font-semibold tracking-[0.2em] text-sage-text uppercase">Founder</span>
            <span className="display mt-1 block text-xl text-forest-strong">{SITE.owner} 대표</span>
          </figcaption>
        </figure>

        <div className="reveal">
          <p className="eyebrow">{OWNER_NOTE.eyebrow}</p>
          <h2 id="owner-title" className="display h2-section mt-4 text-forest-strong">
            {OWNER_NOTE.quoteTitle}
          </h2>
          <blockquote className="mt-8 border-l-2 border-clay pl-6">
            <p className="display text-xl leading-relaxed text-ink md:text-2xl">“{OWNER_NOTE.quote}”</p>
            <footer className="mt-4 text-sm text-muted">— {OWNER_NOTE.source}</footer>
          </blockquote>

          <ol aria-label="미용 과정에서 개가 경험하는 접촉의 순서" className="mt-10 flex flex-wrap items-center gap-2">
            {OWNER_NOTE.sequence.map((s, i) => (
              <li key={s} className="flex items-center gap-2">
                <span className="rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-forest-strong">
                  {s}
                </span>
                {i < OWNER_NOTE.sequence.length - 1 ? (
                  <span aria-hidden="true" className="text-sage">
                    →
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
          <p className="prose-body mt-6 text-muted">{OWNER_NOTE.detail}</p>

          <Link href="/about" className="link-underline mt-10 inline-flex items-center gap-2 pb-1 font-semibold text-forest-strong">
            효효그루밍 이야기
            <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
          </Link>
        </div>
      </div>
    </section>
  );
}
