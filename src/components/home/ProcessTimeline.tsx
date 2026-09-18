import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { PHOTOS } from "@/content/images";
import { PROCESS_NOTE, PROCESS_STEPS } from "@/content/services";

export function ProcessTimeline() {
  return (
    <section aria-labelledby="process-title" className="py-24 md:py-32">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            id="process-title"
            eyebrow="Process"
            title={
              <>
                상담부터 다음 미용까지,
                <br />
                아이의 속도에 맞춥니다.
              </>
            }
          />
          <Link
            href="/process"
            className="reveal link-underline inline-flex items-center gap-2 pb-1 font-semibold text-forest-strong"
          >
            진행 과정 자세히 보기
            <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
          </Link>
        </div>

        {/* 에디토리얼 사진 스트립 */}
        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-[1fr_1.6fr_1fr] md:gap-4">
          <div className="reveal photo aspect-[3/4]">
            <Image src={PHOTOS.tablePoodle.src} alt={PHOTOS.tablePoodle.alt} fill placeholder="blur" sizes="(min-width: 768px) 25vw, 50vw" />
          </div>
          <div className="reveal photo order-first col-span-2 aspect-[16/10] md:order-none md:col-span-1 md:aspect-auto">
            <Image
              src={PHOTOS.bath.src}
              alt={PHOTOS.bath.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 768px) 42vw, 100vw"
              className="object-[35%_50%]"
            />
          </div>
          <div className="reveal photo aspect-[3/4]">
            <Image src={PHOTOS.tableClipper.src} alt={PHOTOS.tableClipper.alt} fill placeholder="blur" sizes="(min-width: 768px) 25vw, 50vw" />
          </div>
        </div>

        <ol className="mt-16 grid gap-px overflow-hidden rounded-[var(--radius-md)] border border-line bg-line md:grid-cols-5">
          {PROCESS_STEPS.map((step) => (
            <li key={step.no} className="reveal flex flex-col bg-surface p-7 md:min-h-72">
              <span className="text-xs font-semibold tracking-[0.2em] text-clay-strong">STEP {step.no}</span>
              <h3 className="display mt-4 text-xl text-forest-strong">{step.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{step.summary}</p>
            </li>
          ))}
        </ol>
        <p className="reveal mt-6 text-[0.9375rem] text-muted">※ {PROCESS_NOTE}</p>
      </div>
    </section>
  );
}
