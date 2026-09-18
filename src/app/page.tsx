import { CasePreview } from "@/components/home/CasePreview";
import { Difference } from "@/components/home/Difference";
import { EmpathyCards } from "@/components/home/EmpathyCards";
import { FaqPreview } from "@/components/home/FaqPreview";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { OwnerNote } from "@/components/home/OwnerNote";
import { Philosophy } from "@/components/home/Philosophy";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { ResponsibilityQuote } from "@/components/home/ResponsibilityQuote";
import { SeniorCare } from "@/components/home/SeniorCare";
import { JsonLd } from "@/components/ui/JsonLd";
import { SITE } from "@/config/site";
import { graph, webPageSchema } from "@/lib/schema";

export default function HomePage() {
  return (
    <>
      <Hero />
      <EmpathyCards />
      <Philosophy />
      <Difference />
      <ProcessTimeline />
      <OwnerNote />
      <SeniorCare />
      <ResponsibilityQuote />
      <CasePreview />
      <FaqPreview />
      <FinalCta />
      <JsonLd data={graph(webPageSchema({ name: SITE.name, description: SITE.description, path: "/" }))} />
    </>
  );
}
