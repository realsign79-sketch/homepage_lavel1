import Image from "next/image";

import { PHILOSOPHY } from "@/content/home";
import { PHOTOS } from "@/content/images";

export function Philosophy() {
  return (
    <section aria-labelledby="philosophy-title" className="bg-surface py-24 md:py-32">
      <div className="container-page grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <figure className="reveal">
            <div className="photo aspect-[4/5] w-full">
              <Image
                src={PHOTOS.touchPaw.src}
                alt={PHOTOS.touchPaw.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 38vw, 100vw"
              />
            </div>
            <figcaption className="mt-4 text-sm text-muted">
              발을 잡는 순간에도 아이가 편안한 경험과 연결될 수 있도록 순서를 조절합니다.
            </figcaption>
          </figure>
        </div>

        <div>
          <div className="reveal">
            <p className="eyebrow">{PHILOSOPHY.eyebrow}</p>
            <h2 id="philosophy-title" className="display h2-section mt-4 text-forest-strong">
              {PHILOSOPHY.titleLines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </h2>
            <p className="prose-body mt-7 text-muted">{PHILOSOPHY.body}</p>
          </div>

          <h3 className="reveal mt-14 text-sm font-semibold tracking-[0.2em] text-sage-text uppercase">
            함께 살펴보는 여섯 가지
          </h3>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {PHILOSOPHY.observations.map((o, i) => (
              <li
                key={o.title}
                className={`reveal rounded-[var(--radius-md)] p-6 ${
                  i === 0
                    ? "bg-forest text-surface sm:col-span-2 sm:p-8"
                    : i === PHILOSOPHY.observations.length - 1
                      ? "border border-sand bg-sand/35 sm:col-span-2"
                      : "border border-line bg-canvas"
                }`}
              >
                <p className={`text-xs font-semibold tracking-[0.2em] ${i === 0 ? "text-sand" : "text-sage-text"}`}>
                  0{i + 1}
                </p>
                <p className={`display mt-3 text-xl ${i === 0 ? "text-surface sm:text-2xl" : "text-forest-strong"}`}>
                  {o.title}
                </p>
                <p className={`mt-2 text-[0.9375rem] leading-relaxed ${i === 0 ? "text-surface/80" : "text-muted"}`}>
                  {o.desc}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
