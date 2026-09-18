# 효효그루밍 홈페이지 구현 계획

기준 명세: `docs/HYOHYO_GROOMING_CLAUDE_CODE_MASTER.md`
기준 사진: `docs/images/` 10장 → `public/images/`로 최적화 복사

## 저장소 조사 결과 (TASK-00)

- 기존 파일: `README.md`(제목만), `docs/01-renewal-plan.md`(도쿠애견미용학원 기획서, 별개 프로젝트), 명세서, 사진 10장
- 기존 앱 코드 없음 → Next.js App Router + TypeScript + Tailwind CSS 신규 구성
- 환경: Node 24, npm 11, Next.js 16, Tailwind CSS 4

## 사진 매핑

| 원본 | 사용 파일 | 장면 | 사용 위치 |
|---|---|---|---|
| `_08.jpg` | `hero-groomer.jpg` | 대표가 반려견 옆에서 도구를 든 채 기다리는 장면 | Hero |
| `_09.jpg` | `owner-portrait.jpg` | 대표 프로필 | 소개, 홈 대표 섹션 |
| `_06.jpg` | `touch-paw.jpg` | 샤페이 앞발 접촉 적응(간식 그릇) | 철학, 노령견 |
| `_05.jpg` | `floor-nail.jpg` | 바닥에서 안고 발톱 관리 | 차이점, 미용 교육 |
| `_03.jpg` | `table-poodle.jpg` | 턴테이블 위 푸들 드라이 | 과정 |
| `_04.jpg` | `table-clipper.jpg` | 카바푸 클리퍼 작업 | 미용 교육 |
| 무번호 | `bath-care.jpg` | 목욕 | 과정 |
| `_07.jpg` | `lecture-contact.jpg` | "애견미용은 '접촉의 연속'입니다" 강연 | 소개, 인용 |
| `_01.jpg` | `lecture-seminar.jpg` | HYOHYO GROOMING 세미나 | 소개 |
| `_02.jpg` | `study-group.jpg` | 스터디 현장(수강생 얼굴 노출) | 게시 동의 확인 전 비사용 |

## TASK 체크리스트

- [x] TASK-00 저장소 조사 및 계획
- [x] TASK-01 프로젝트 기반 (Next.js/TS/Tailwind, 토큰, site.ts, content)
- [x] TASK-02 공통 레이아웃 (Header, MobileNav, Footer, Skip link, MobileContactDock)
- [x] TASK-03 홈페이지 전 섹션
- [x] TASK-04 상세 페이지 (grooming-education, process, for-senior-dogs, about, faq, contact, privacy, cases 보류)
- [x] TASK-05 SEO/AEO/GEO (metadata, canonical, OG, JSON-LD, sitemap, robots, manifest, llms.txt)
- [x] TASK-06 상담 UX (전화 실동작, 빈 링크 숨김, 폼 미연결 시 가짜 성공 없음, 준비 체크리스트)
- [x] TASK-07 접근성 및 성능
- [x] TASK-08 테스트 (Vitest + Playwright, 360/768/1440 스크린샷)
- [x] TASK-09 README, .env.example, 배포 문서
- [x] TASK-10 최종 감사

## 검수 결과 (2026-09-18)

- lint ✅ · typecheck ✅ · unit 15/15 ✅ · build ✅ · e2e 24/24 ✅ (360/768/1440 가로 스크롤 0)
- 감사: PLACEHOLDER/Lorem/`href="#"`/javascript:void 0건, 과장 표현 0건, 자체 별점·리뷰 스키마 0건

## 보류 / 사용자 입력 필요

- P0: 최종 도메인, 도로명 주소·우편번호, 영업시간, 카카오채널·네이버 플레이스·네이버 예약 URL, 로고 원본, 가격 정책
- P1: 대표 경력·자격(검증본), 동의받은 사례·후기, 주차·교통 안내, 인스타그램 URL
- 온라인 상담 폼: 백엔드 미정 → 미구현 (전화·문자 상담으로 대체)
- 사진: 고객 반려견 사진의 보호자 게시 동의 확인, `_02.jpg`(수강생 얼굴 노출) 미사용
