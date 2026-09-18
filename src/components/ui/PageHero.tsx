import Image from "next/image";
import type { ReactNode } from "react";

import type { Photo } from "@/content/images";
import type { Crumb } from "@/lib/schema";

import { Breadcrumbs } from "./Breadcrumbs";

type Props = {
  crumbs: Crumb[];
  eyebrow: string;
  title: ReactNode;
  lead: ReactNode;
  photo?: Photo;
};

/** 상세 페이지 공통 상단 — 에디토리얼 스플릿 레이아웃 */
export function PageHero({ crumbs, eyebrow, title, lead, photo }: Props) {
  return (
    <header className="container-page pt-28 pb-14 md:pt-36 md:pb-20">
      <Breadcrumbs items={crumbs} />
      <div className={`mt-10 grid items-end gap-10 ${photo ? "lg:grid-cols-[1.15fr_0.85fr] lg:gap-16" : ""}`}>
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="display h1-page mt-5 text-forest-strong">{title}</h1>
          <p className="lead mt-6">{lead}</p>
        </div>
        {photo ? (
          <div className="photo aspect-[4/5] max-h-[34rem] w-full lg:justify-self-end">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              placeholder="blur"
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1024px) 34vw, 100vw"
            />
          </div>
        ) : null}
      </div>
    </header>
  );
}
