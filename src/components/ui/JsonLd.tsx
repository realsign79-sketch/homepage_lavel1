import { serializeJsonLd } from "@/lib/schema";

/** 검증된 JSON-LD 직렬화 외에는 dangerouslySetInnerHTML을 사용하지 않습니다. */
export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />;
}
