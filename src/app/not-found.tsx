import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[70svh] flex-col items-start justify-center pt-32 pb-24">
      <p className="eyebrow">404</p>
      <h1 className="display h1-page mt-5 text-forest-strong">찾으시는 페이지가 없습니다.</h1>
      <p className="lead mt-5">주소가 바뀌었거나 아직 준비 중인 페이지일 수 있습니다.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/">홈으로 가기</ButtonLink>
        <ButtonLink href="/contact" variant="secondary">
          상담하기
        </ButtonLink>
      </div>
    </section>
  );
}
