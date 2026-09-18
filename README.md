# 효효그루밍 홈페이지

부산 동래구 안락동 **효효그루밍**(미용하기 어려운 반려견을 위한 미용 교육 전문 애견미용실) 공식 홈페이지입니다.

- 명세서: [`docs/HYOHYO_GROOMING_CLAUDE_CODE_MASTER.md`](docs/HYOHYO_GROOMING_CLAUDE_CODE_MASTER.md)
- 구현 계획·진행 체크리스트: [`IMPLEMENTATION_PLAN.md`](IMPLEMENTATION_PLAN.md)
- 기술: Next.js 16 (App Router) · TypeScript strict · Tailwind CSS 4 · Vitest · Playwright · Vercel

## 실행

```bash
npm install
npm run dev          # http://localhost:3000
```

## 검수 명령

```bash
npm run lint
npm run typecheck
npm run test         # 단위 테스트 (Vitest)
npm run build
npx playwright install chromium   # 최초 1회
npm run test:e2e     # E2E + 360/768/1440 스크린샷 (test-results/screens/)
```

## 운영 정보 교체 — 비개발자용

**모든 사업 정보는 [`src/config/site.ts`](src/config/site.ts) 한 파일에서 관리합니다.**

- `SITE` : 확정 정보 (상호, 대표, 전화, 사업자번호, 지역)
- `TODO_REQUIRED` : 아직 받지 못한 정보. **값을 채우면 화면과 구조화데이터에 자동으로 나타나고, 비어 있으면 해당 버튼·블록이 숨겨집니다.**

| 항목 | 채우면 바뀌는 것 |
|---|---|
| `domain` | canonical·사이트맵 기준 주소 (또는 환경변수 `NEXT_PUBLIC_SITE_URL`) |
| `address`, `postalCode` | 푸터·상담·랜딩 페이지 주소, 네이버 지도 버튼, LocalBusiness 주소 |
| `latitude`, `longitude` | LocalBusiness 좌표 |
| `openingHours` | 푸터·상담 페이지 운영시간 |
| `kakaoChannelUrl` | 카카오 상담 버튼(모바일 하단 독, CTA) |
| `naverBookingUrl` | 네이버 예약 버튼 |
| `naverPlaceUrl`, `instagramUrl` | 푸터 링크, 구조화데이터 `sameAs` |
| `email` | 개인정보 안내 문의처, 구조화데이터 |
| `ownerCareer` | /about 경력·자격 섹션 (검증된 것만) |
| `realCaseStudies` | 홈 사례 섹션, `/cases` 페이지 공개 + 사이트맵 포함 |
| `priceGuide`, `realReviews` | 데이터 구조만 준비됨 — 확정 후 화면 추가 필요 |

> ⚠️ 추측값·임시값을 넣지 마세요. 빈 값이 가장 안전합니다.

문구는 `src/content/` 폴더(`home.ts`, `pages.ts`, `faq.ts`, `services.ts`)에서, 사진은 [`public/images/ASSET_CHECKLIST.md`](public/images/ASSET_CHECKLIST.md)를 참고해 교체합니다.

## 환경변수

`.env.example`을 참고해 Vercel 프로젝트 설정(Settings → Environment Variables)에 입력합니다.

| 변수 | 설명 |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | 최종 도메인. **비어 있으면 robots.txt가 전체 색인을 차단**합니다 (임시 주소가 검색에 노출되지 않도록). |
| `NEXT_PUBLIC_NAVER_SITE_VERIFICATION` | 네이버 서치어드바이저 소유확인 값 |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console 소유확인 값 |
| `NEXT_PUBLIC_GA_ID` | GA4 측정 ID. 비어 있으면 분석 스크립트 없음 |

## 배포 (Vercel)

- 프로덕션: https://hyohyo-grooming.vercel.app (Vercel 팀 `bookprint`, 프로젝트 `hyohyo-grooming`)
- `vercel.json`의 `framework: nextjs` 설정을 지우지 마세요 (없으면 404).

```bash
npm i -g vercel
vercel login
vercel link          # 최초 1회: 프로젝트 연결
vercel               # 미리보기 배포
vercel --prod        # 프로덕션 배포
```

### 도메인 연결 후 할 일

1. Vercel → Settings → Domains에 도메인 추가, DNS 설정
2. `NEXT_PUBLIC_SITE_URL=https://도메인` 설정 후 재배포 → robots.txt 색인 허용
3. **Google Search Console**: 속성 추가 → HTML 태그 값을 `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`에 입력 → 재배포 → 확인 → `sitemap.xml` 제출
4. **네이버 서치어드바이저**: 사이트 등록 → HTML 태그 값을 `NEXT_PUBLIC_NAVER_SITE_VERIFICATION`에 입력 → 재배포 → 확인 → 사이트맵·RSS 제출, 웹 페이지 수집 요청
5. **Bing Webmaster Tools**: Search Console 가져오기 (ChatGPT 검색이 Bing 색인을 활용)
6. **네이버 플레이스·카카오맵·구글 비즈니스 프로필**의 상호·주소·전화(NAP)를 `site.ts`와 글자 하나까지 동일하게 맞추기
7. [Rich Results Test](https://search.google.com/test/rich-results), [Schema Validator](https://validator.schema.org/)로 구조화데이터 검증

## SEO · AEO · GEO 구현 요약

- 페이지별 고유 title/description/canonical, OG·Twitter 이미지(빌드 시 생성)
- JSON-LD: LocalBusiness, WebSite, WebPage, Service, BreadcrumbList, FAQPage, HowTo, Person — **빈 값은 자동 제거**, 자체 별점·리뷰 없음
- 각 상세 페이지 상단 **직접 답변 블록(Summary)** + 질문형 제목
- FAQ는 `<details>`로 JS 없이도 전문이 HTML에 포함
- `robots.txt`: 검색·AI 크롤러(Googlebot, Yeti, GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot 등) 명시 허용
- `/llms.txt`: AI 답변 엔진용 사이트 요약 (확정 정보만)
- `sitemap.xml`: 완성된 공개 페이지만 (사례 없으면 `/cases` 제외·404)
- **검색 의도별 랜딩페이지** (`src/content/landing.ts`)
  - `/busan-dog-grooming` — 부산애견미용 · 부산강아지미용 · 동래애견미용 (지역 의도)
  - `/biting-dog-grooming` — 무는개미용 · 입질 강아지 미용 (상황 의도)
  - 키워드만 바꾼 중복 페이지는 구글 스팸 정책(도어웨이 페이지)에 걸리므로 의도별 1페이지로 구성

## 폴더 구조

```text
src/
  app/            라우트 (페이지, sitemap, robots, manifest, OG, llms.txt)
  components/
    layout/       Header, MobileNav, Footer, MobileContactDock, ClientEnhancements
    home/         홈페이지 섹션
    ui/           Button, SectionHeading, AnswerBlock, FaqList, JsonLd 등
  config/site.ts  사업 정보 단일 관리
  content/        문구·FAQ·서비스·사진 데이터
  lib/            metadata, schema(JSON-LD), analytics, og
  styles/         globals.css (디자인 토큰)
tests/            unit(Vitest), e2e(Playwright)
```

## 알려진 보류 항목

- 온라인 상담 폼: 백엔드가 없으므로 만들지 않았습니다 (가짜 "접수 완료" 방지). 대신 전화·문자(양식 자동 입력) 상담을 제공합니다.
- 가격표·후기·사례: 확정 자료가 없어 비노출.
- 대표 경력·자격: 사진 속 액자는 있으나 내용 미확인 → 비노출.
