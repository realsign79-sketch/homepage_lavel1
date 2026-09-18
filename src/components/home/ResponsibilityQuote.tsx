import { RESPONSIBILITY } from "@/content/home";

export function ResponsibilityQuote() {
  return (
    <section aria-label="효효그루밍의 책임" className="bg-sand/45 py-24 md:py-32">
      <figure className="container-page reveal mx-auto max-w-4xl text-center">
        <span aria-hidden="true" className="display block text-7xl leading-none text-clay md:text-8xl">
          “
        </span>
        <blockquote>
          <p className="display mt-2 text-[clamp(1.625rem,1.1rem+2.2vw,2.75rem)] leading-[1.45] text-forest-strong">
            {RESPONSIBILITY.quote}
          </p>
        </blockquote>
        <figcaption className="mx-auto mt-10 max-w-2xl text-[1.0625rem] leading-relaxed text-ink/80">
          {RESPONSIBILITY.body}
        </figcaption>
      </figure>
    </section>
  );
}
