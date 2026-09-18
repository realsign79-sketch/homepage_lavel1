import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  id?: string;
  align?: "left" | "center";
  tone?: "default" | "inverse";
  as?: "h2" | "h3";
};

export function SectionHeading({ eyebrow, title, lead, id, align = "left", tone = "default", as: Tag = "h2" }: Props) {
  const inverse = tone === "inverse";
  return (
    <div className={`reveal ${align === "center" ? "mx-auto text-center" : ""} max-w-3xl`}>
      {eyebrow ? <p className={`eyebrow ${inverse ? "text-sand!" : ""}`}>{eyebrow}</p> : null}
      <Tag id={id} className={`display h2-section mt-4 ${inverse ? "text-surface" : "text-forest-strong"}`}>
        {title}
      </Tag>
      {lead ? (
        <p className={`lead mt-5 ${align === "center" ? "mx-auto" : ""} ${inverse ? "text-surface/80!" : ""}`}>{lead}</p>
      ) : null}
    </div>
  );
}
