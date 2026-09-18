import Image from "next/image";

import { DIFFERENCE } from "@/content/home";
import { PHOTOS } from "@/content/images";

export function Difference() {
  return (
    <section aria-labelledby="difference-title" className="grain relative overflow-hidden bg-forest-strong text-surface">
      <div className="container-page relative z-10 grid gap-14 py-24 md:py-32 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="reveal">
          <p className="eyebrow text-sand!">{DIFFERENCE.eyebrow}</p>
          <h2 id="difference-title" className="display h2-section mt-4 text-surface">
            {DIFFERENCE.title}
          </h2>
          <figure className="mt-10">
            <div className="photo aspect-[4/5] max-w-sm">
              <Image
                src={PHOTOS.floorNail.src}
                alt={PHOTOS.floorNail.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 24rem, 90vw"
              />
            </div>
            <figcaption className="mt-4 max-w-sm text-sm text-surface/70">
              테이블이 어려운 아이라면 바닥에서, 품에 안긴 채로 시작하기도 합니다.
            </figcaption>
          </figure>
        </div>

        <ol className="self-center">
          {DIFFERENCE.items.map((item) => (
            <li key={item.no} className="reveal grid grid-cols-[auto_1fr] gap-6 border-t border-surface/15 py-10 md:gap-10">
              <span aria-hidden="true" className="display text-5xl leading-none text-clay md:text-6xl">
                {item.no}
              </span>
              <div>
                <h3 className="display text-2xl text-surface md:text-[1.75rem]">{item.title}</h3>
                <p className="mt-3 max-w-md text-[1.0625rem] leading-relaxed text-surface/75">{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
