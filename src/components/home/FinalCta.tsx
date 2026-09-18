import Image from "next/image";

import { ContactButtons } from "@/components/ui/ContactButtons";
import { SITE } from "@/config/site";
import { FINAL_CTA } from "@/content/home";
import { PHOTOS } from "@/content/images";

export function FinalCta() {
  return (
    <section aria-labelledby="final-cta-title" className="px-3 py-3 md:px-5 md:py-5">
      <div className="grain relative overflow-hidden rounded-[var(--radius-lg)] bg-forest text-surface">
        <div className="relative z-10 grid lg:grid-cols-[1.15fr_0.85fr]">
          <div className="px-6 py-16 sm:px-10 md:px-16 md:py-24">
            <p className="eyebrow text-sand!">Consultation</p>
            <h2 id="final-cta-title" className="display h2-section mt-5 text-surface">
              {FINAL_CTA.titleLines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </h2>
            <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-surface/80">{FINAL_CTA.body}</p>
            <div className="mt-10">
              <ContactButtons location="final_cta" tone="inverse" />
            </div>
            <p className="mt-8 text-sm text-surface/70">
              {SITE.name} · {SITE.region.label}
            </p>
          </div>
          <div className="relative hidden min-h-[28rem] lg:block">
            <Image
              src={PHOTOS.tableClipper.src}
              alt=""
              fill
              placeholder="blur"
              sizes="36vw"
              className="object-cover object-[50%_40%]"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-forest via-forest/20 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
