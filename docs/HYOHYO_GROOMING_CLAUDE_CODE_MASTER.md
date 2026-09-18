# 효효그루밍 홈페이지 구축 MASTER SPEC

> 용도: GitHub Codespaces에서 Claude Code가 이 문서를 읽고 바로 홈페이지를 구현하기 위한 단일 실행 명세서  
> 작성 기준일: 2026-09-18  
> 기준 브랜드: 효효그루밍  
> 참고 사이트: https://www.signviewer.co.kr  
> 핵심 지역: 부산광역시 동래구 안락동  

---

## 0. Claude Code에게 내리는 최상위 지시

이 문서는 단순 기획서가 아니라 구현 명세서다. 아래 내용을 읽은 뒤 실제 작동하는 production-ready 홈페이지를 완성하라.

1. 먼저 현재 저장소를 조사한다. 기존 프로젝트가 있으면 덮어쓰지 말고 구조와 미완성 작업을 파악한다.
2. 프로젝트가 없다면 `Next.js App Router + TypeScript + Tailwind CSS` 최신 안정 버전으로 시작한다.
3. 패키지 버전을 추측해서 하드코딩하지 말고, 설치 시점의 최신 안정 버전을 사용한다.
4. 구현 전에 `IMPLEMENTATION_PLAN.md`를 만들고, 이 문서의 TASK-00~TASK-10을 체크리스트로 옮긴다.
5. 하나의 거대한 컴포넌트를 만들지 말고 섹션, 데이터, SEO, UI를 분리한다.
6. 실제 자료에 없는 경력, 자격증, 수상, 고객 수, 리뷰, 별점, 가격, 주소, 영업시간을 절대 만들어내지 않는다.
7. 누락 정보는 `src/config/site.ts`의 `TODO_REQUIRED`에 모으고, 화면에는 거짓 정보 대신 자연스러운 안내 또는 해당 블록 비노출 처리를 한다.
8. 첫 구현은 사용자의 추가 답변을 기다리지 말고, 확정 정보만으로 끝까지 완성한다.
9. 모든 페이지는 모바일 우선으로 구현하고 360px에서도 가로 스크롤이 없어야 한다.
10. 모든 변경 후 `npm run lint`, `npm run typecheck`, `npm run build`, 핵심 UI 테스트를 실행하고 오류를 수정한다.
11. 작업이 끝나면 `README.md`에 실행법, 배포법, 교체해야 할 정보와 이미지 목록을 한국어로 기록한다.
12. 미완료 기능을 완료한 것처럼 보고하지 않는다. 임시 링크와 TODO는 최종 보고에 정확히 적는다.

Claude Code 시작 프롬프트:

```text
이 저장소의 HYOHYO_GROOMING_CLAUDE_CODE_MASTER.md를 처음부터 끝까지 읽고 그대로 구현해줘.
먼저 저장소 상태를 확인하고 IMPLEMENTATION_PLAN.md를 만든 뒤 TASK-00부터 순서대로 진행해.
추가 정보가 없는 항목은 절대 지어내지 말고 src/config/site.ts의 TODO_REQUIRED로 관리해.
각 TASK 완료 때 체크 표시하고, lint/typecheck/build/test를 통과할 때까지 스스로 수정해.
중간에 설명만 하고 멈추지 말고 실제 파일 생성과 구현을 계속 진행해.
```

---

## 1. 프로젝트 목표

효효그루밍을 일반적인 “예쁘게 깎는 애견미용실”이 아니라 다음과 같이 명확하게 포지셔닝한다.

> 미용하기 어려운 반려견의 행동과 경험을 이해하고, 오늘 한 번의 미용보다 앞으로 이어질 미용을 함께 설계하는 미용 교육 전문 애견미용실.

홈페이지의 1차 목표는 **보호자가 ‘우리 아이도 상담받을 수 있겠다’고 느끼고 상담 행동을 하는 것**이다.

우선순위:

1. 모바일 상담 전환
2. 전문성 및 신뢰 형성
3. 서비스 대상과 진행 방식의 명확한 이해
4. 부산·동래구·안락동 지역검색 노출 기반
5. AI 검색에서 인용하기 쉬운 명확한 답변 구조
6. 빠른 로딩, 접근성, 유지보수성

핵심 전환 이벤트:

- 전화 상담 클릭: `tel:01035731499`
- 카카오톡 상담 클릭: URL 확보 후 활성화
- 네이버 예약 또는 상담 클릭: URL 확보 후 활성화
- 상담 폼 완료: 백엔드 연결 전에는 제출 성공을 가장하지 말 것
- 오시는 길 클릭: 정확한 주소/지도 링크 확보 후 활성화

---

## 2. 첨부 소개서에서 추출한 확정 정보

### 사업자 정보

| 항목 | 확정 값 |
|---|---|
| 상호명 | 효효그루밍 |
| 대표자 | 전효정 |
| 전화번호 | 010-3573-1499 |
| 사업자등록번호 | 460-27-01246 |
| 지역 | 부산광역시 동래구 안락동 |
| 전문 분야 | 미용하기 어려운 반려견을 위한 미용 교육 |
| 집중 과정 | 평균 1~3회 중심, 이후 변화와 상태에 따라 결정 |

### 브랜드가 지켜야 할 핵심 관점

- 행동을 단순히 “성격이 사납다” 또는 “버릇이 나쁘다”고 판단하지 않는다.
- 어떤 상황, 접근 방식, 신체 부위, 과거 경험에서 반응이 나타나는지 함께 살핀다.
- 처음부터 무조건 미용하지 않고 보호자와 충분히 상담한다.
- 힘으로 제압해 한 번 끝내는 것보다 할 수 있는 것과 어려운 것을 구분해 과정을 조절한다.
- 사람의 손, 미용도구, 미용 공간과의 관계를 다시 만들어가는 경험을 중시한다.
- 모든 개에게 같은 방법을 적용하지 않고 눈앞의 개에게 맞는 방법을 찾는다.
- 미용실에서 바꿔야 할 경험을 보호자의 과도한 숙제로 넘기지 않는다.
- 노령견 또는 신체 불편 가능성이 있으면 미용사가 관찰할 수 있는 범위에서 살피고, 필요하면 보호자 관찰 또는 동물병원 확인 영역을 구분한다.
- “오늘 성공”보다 다음 미용이 조금 더 나아지는 흐름을 중요하게 여긴다.

### 표현상 안전 원칙

- 수의학적 진단, 치료, 완치, 교정 보장 표현 금지.
- “공격성을 치료합니다”, “입질을 고칩니다”, “무조건 미용 가능합니다” 같은 확정 표현 금지.
- 권장 표현: “행동이 나타나는 맥락을 살핍니다”, “미용사가 관찰 가능한 범위에서 확인합니다”, “상태에 따라 동물병원 확인을 권할 수 있습니다”.
- 특정 횟수 안에 변화가 보장된다고 말하지 않는다. `평균 1~3회 집중 과정`은 운영 방식 설명으로만 사용한다.

---

## 3. 필요한 추가 정보: TODO_REQUIRED

다음 값은 아직 확정되지 않았다. `src/config/site.ts` 한 곳에서 관리한다.

```ts
export const TODO_REQUIRED = {
  domain: "",                 // 최종 도메인
  roadAddress: "",            // 실제 도로명 주소
  postalCode: "",
  latitude: null,
  longitude: null,
  openingHours: "",           // 요일별 영업시간과 휴무일
  kakaoChannelUrl: "",
  naverPlaceUrl: "",
  naverBookingUrl: "",
  instagramUrl: "",
  email: "",
  priceGuide: [],              // 실제 확정 가격만 입력
  ownerCareer: [],             // 검증된 경력/자격만 입력
  realReviews: [],             // 실제 게시 허락을 받은 후기만 입력
  realCaseStudies: [],         // 실제 공개 허락을 받은 사례만 입력
} as const;
```

구현 규칙:

- 빈 URL은 `#` 링크로 만들지 말고 해당 버튼을 숨기거나 “준비 중” 상태로 비활성화한다.
- 주소가 없으면 지도 임베드를 만들지 않는다.
- 가격이 없으면 “상태와 필요한 과정에 따라 상담 후 안내”라고만 표시한다.
- 실제 후기와 사례가 없으면 가짜 카드나 임의 별점을 넣지 않는다.
- 구조화데이터에도 빈 값이나 `PLACEHOLDER`를 출력하지 않는다.

---

## 4. 2026 디자인 방향

### 한 줄 콘셉트

**따뜻한 에디토리얼 웰니스 + 행동 전문성 + 모바일 상담 우선**

### 최신 트렌드 반영 원칙

1. Warm minimalism: 새하얀 병원 느낌보다 오트밀·세이지·포레스트 톤의 차분한 화면.
2. Editorial storytelling: 긴 소개서를 그대로 붙이지 말고 짧은 질문과 답, 여백이 큰 문장으로 스크롤 서사를 만든다.
3. Selective bento layout: 핵심 대상·차별점 카드에만 벤토 그리드를 사용하며 모든 섹션을 카드로 만들지 않는다.
4. Authentic imagery: 실제 반려견, 상담, 도구 적응, 공간 사진을 우선한다. AI 이미지로 실제 사례인 것처럼 연출하지 않는다.
5. Human microcopy: “문제견”보다 “미용이 어려운 아이”, “예약”보다 첫 단계에서는 “우리 아이 상담하기”를 사용한다.
6. Subtle motion: 180~320ms 페이드·슬라이드·호버만 사용하고 과한 패럴랙스, 자동 슬라이더, 커서 효과는 쓰지 않는다.
7. Mobile conversion dock: 모바일 하단에 전화·카카오·상담 버튼을 고정한다. 사용 가능한 링크만 노출한다.
8. Answer-first content: 각 섹션 첫 문장에서 질문에 바로 답해 AI 검색과 빠른 스캔에 유리하게 만든다.
9. Trust before decoration: 실적 숫자를 꾸며내는 대신 과정, 기준, 한계, 안전 원칙을 구체적으로 보여준다.
10. Inclusive UX: WCAG 2.2 AA 수준, 키보드 접근, 충분한 대비, `prefers-reduced-motion`을 적용한다.

### 참고 사이트에서 가져올 구조적 장점

`www.signviewer.co.kr`의 다음 패턴을 참고하되 디자인을 복제하지 않는다.

- 투명 헤더에서 스크롤 시 솔리드 헤더로 변화
- 첫 화면의 강한 H1, 짧은 설명, 기본/보조 CTA
- ABOUT → 강점 → 사례 → 서비스 → 과정 → 지역 → CTA → 연락처 순서
- 모바일 메뉴와 명확한 고정 CTA
- 실제 사진 중심의 포트폴리오
- LocalBusiness JSON-LD, canonical, OG/Twitter 메타, sitemap/robots 기반

효효그루밍에서는 아래처럼 치환한다.

| SIGNVIEWER 구조 | 효효그루밍 구조 |
|---|---|
| 간판 서비스 | 미용 교육이 필요한 상황 |
| 시공 포트폴리오 | 실제 변화 과정/보호자 동의 사례 |
| 제작 4단계 | 상담부터 다음 계획까지 5단계 |
| 대구 상담 지역 | 부산 동래구 안락동 지역 신뢰 |
| 무료 견적 | 우리 아이 상담하기 |

### 디자인 토큰

```css
:root {
  --canvas: #F7F3EA;
  --surface: #FFFDF8;
  --surface-muted: #EEF1EB;
  --forest: #20382F;
  --forest-strong: #14271F;
  --sage: #778B7D;
  --clay: #C9785B;
  --sand: #DCCDB8;
  --text: #1C2924;
  --text-muted: #5F6C66;
  --border: #D8DED7;
  --focus: #245DFF;
  --radius-sm: 12px;
  --radius-md: 20px;
  --radius-lg: 32px;
  --shadow-soft: 0 18px 50px rgba(20, 39, 31, 0.10);
}
```

타이포그래피:

- 본문: Pretendard Variable을 self-host하거나 성능 문제가 없도록 시스템 한국어 폰트 스택 사용.
- 포인트 문장: `Noto Serif KR`를 꼭 사용해야 한다면 필요한 weight만 self-host. 외부 런타임 폰트 호출 금지.
- H1: desktop 64~76px, tablet 48~56px, mobile 38~46px 범위의 `clamp()`.
- 본문: mobile 16px 이상, line-height 1.7 전후.
- 본문 한 줄 길이: 약 45~70자 이내.

이미지 아트 디렉션:

- 실제 공간의 자연광, 낮은 채도, 크림색 배경, 반려견 눈높이의 사진.
- 억지로 붙잡거나 입마개만 강조한 공포 이미지 금지.
- 영웅 이미지는 “미용 완료 포즈”보다 편안하게 미용사 손과 도구를 경험하는 장면이 적합.
- `public/images/ASSET_CHECKLIST.md`를 만들어 필요한 촬영 목록과 권장 비율을 기록한다.
- 실제 이미지가 없을 때 외부 URL을 hotlink하지 않는다. 로컬 SVG 선화와 컬러 블록으로 품질 있게 대체하고 `TODO`를 남긴다.

필요한 촬영 목록:

1. Hero 가로 16:9 또는 4:3 이미지 1장
2. 미용사와 반려견 상호작용 3장
3. 손·발·얼굴 접촉 적응 장면 각 1장
4. 도구와 공간 적응 장면 2장
5. 매장 내부/외부/주차 또는 접근 동선 각 1장
6. 대표자 프로필 1장
7. 보호자 동의를 받은 실제 과정 사례: 전/중/후 각 1장

---

## 5. 정보 구조와 라우트

### 필수 라우트

| 경로 | 목적 | 주요 검색 의도 |
|---|---|---|
| `/` | 브랜드·서비스·상담 전환 허브 | 부산 애견미용, 동래구 애견미용 |
| `/grooming-education` | 미용 교육 상세 | 미용 거부 강아지, 입질견 미용 상담 |
| `/process` | 상담과 진행 과정 | 강아지 미용 교육 과정 |
| `/for-senior-dogs` | 노령견 접근과 한계 | 부산 노령견 미용 상담 |
| `/cases` | 실제 동의 사례 목록 | 애견미용 적응 사례 |
| `/about` | 효효그루밍 철학·대표 소개 | 효효그루밍, 전효정 |
| `/faq` | 보호자 질문 해결 | 애견미용 FAQ |
| `/contact` | 전화·상담·위치 | 안락동 애견미용 상담 |
| `/privacy` | 개인정보 처리 안내 | 법적/신뢰 페이지 |

추가 규칙:

- 실제 사례가 하나도 없으면 `/cases`는 공개 링크에서 제외하고 `noindex` 처리하거나 구축 보류한다.
- 지역 키워드만 바꾼 얇은 페이지를 대량 생성하지 않는다.
- `/blog`는 실제로 지속 작성할 수 있을 때만 2단계에서 추가한다.
- 사이트맵에는 공개 가능하고 완성된 페이지만 포함한다.

### 상단 메뉴

- 효효그루밍
- 미용 교육
- 진행 과정
- 노령견 케어
- 자주 묻는 질문
- 상담하기

헤더 CTA: `우리 아이 상담하기`

모바일 하단 고정 독:

- 전화
- 카카오 상담: URL 있을 때만
- 상담하기

---

## 6. 홈페이지 상세 카피와 섹션 설계

### 6.1 Header

- 로고: `효효그루밍` 워드마크 + 작은 영문 `HYO HYO GROOMING`
- 처음에는 Hero 위 투명 또는 반투명.
- 스크롤 24px 이후 `surface/90 + backdrop-blur` 헤더로 전환.
- 현재 메뉴에 `aria-current="page"`.
- 모바일 메뉴 열림 시 포커스 트랩, ESC 닫기, body scroll lock.

### 6.2 Hero

Eyebrow:

> 부산 동래구 안락동 · 미용 교육 전문

H1:

> 미용이 어려운 아이에게,  
> 참는 법보다 안전한 경험을 가르칩니다.

본문:

> 효효그루밍은 행동을 억누르고 한 번의 미용을 끝내기보다, 아이가 왜 어려워하는지 살피고 지금 가능한 것부터 새로운 미용 경험을 만들어갑니다.

CTA:

- Primary: `우리 아이 상담하기`
- Secondary: `미용 교육 과정 보기`

신뢰 라인:

- 상담 후 맞춤 진행
- 평균 1~3회 집중 과정 중심
- 다음 미용까지 생각하는 피드백

Hero 구현:

- `100svh`를 무조건 쓰지 말고 모바일 주소창을 고려해 `min-height: min(860px, 92svh)` 수준으로 설계.
- LCP 이미지는 `next/image`, `priority`, 정확한 `sizes`, AVIF/WebP.
- Hero 동영상은 실제 영상이 확보되기 전에는 사용하지 않는다. 확보해도 mobile poster와 reduced-data 대안을 제공한다.
- 장식용 원형/선화는 `aria-hidden="true"`.

### 6.3 Empathy / “이런 고민으로 찾아옵니다”

제목:

> “우리 아이도 미용할 수 있을까요?”

설명:

> 효효그루밍의 미용 교육은 그 질문에서 시작됩니다.

4개 상황 카드:

1. 다른 미용실에서 진행이 어렵다는 이야기를 들은 아이
2. 발이나 얼굴을 만지는 것을 특히 힘들어하는 아이
3. 미용도구나 공간을 보면 긴장하고 강하게 반응하는 아이
4. 나이가 들면서 이전의 미용 자세와 접촉이 어려워진 아이

하단 주의문:

> 모든 아이에게 같은 방법을 적용하지 않습니다. 현재 상태와 안전을 먼저 확인한 뒤 가능한 범위를 함께 정합니다.

### 6.4 Philosophy split section

작은 제목: `BEHAVIOR BEFORE GROOMING`

큰 제목:

> 행동을 멈추게 하기 전에,  
> 행동이 나타난 이유부터 봅니다.

본문 요약:

> 같은 으르렁거림이나 입질 행동도 이유는 다를 수 있습니다. 어떤 상황에서 시작됐는지, 어떤 접근에서 달라지는지, 특정 부위의 불편 가능성은 없는지, 이전 경험과 보호자와의 일상은 어떤지를 연결해 살펴봅니다.

관찰 항목 벤토 카드:

- 상황과 자극
- 접근 방식
- 접촉이 어려운 부위
- 과거 미용 경험
- 보호자와의 일상 반응
- 자세·움직임의 변화

### 6.5 Difference / 세 가지 차이

제목:

> 한 번 빨리 끝내는 미용과는 접근이 다릅니다.

01 `억지로 참게 하지 않습니다`

> 지금 할 수 있는 것과 아직 어려운 것을 구분하고 과정의 강도와 순서를 조절합니다.

02 `미용 경험을 다시 연결합니다`

> 사람의 손, 도구, 공간을 무서운 신호로만 기억하지 않도록 작은 경험부터 다시 쌓습니다.

03 `다음 미용까지 계획합니다`

> 오늘의 결과뿐 아니라 다음 방문에서 무엇을 이어갈지 보호자에게 설명합니다.

### 6.6 Process / 5단계

제목:

> 상담부터 다음 미용까지, 아이의 속도에 맞춥니다.

1. `보호자 사전 상담`  
   평소 어려운 상황, 접촉 부위, 이전 경험, 보호자의 대응을 듣습니다.
2. `행동과 상태 관찰`  
   공간, 사람, 도구, 자세, 움직임에 대한 반응을 관찰합니다.
3. `오늘 가능한 범위 설정`  
   무리해서 전 과정을 끝내는 대신 안전하게 가능한 목표를 정합니다.
4. `맞춤 미용 교육 진행`  
   반응에 따라 접근, 순서, 도구, 휴식과 진행 속도를 조절합니다.
5. `보호자 피드백과 다음 계획`  
   오늘 확인한 점, 집에서 관찰할 점, 다음 방문에서 이어갈 부분을 안내합니다.

보조 문구:

> 집중 과정은 평균 1~3회를 중심으로 진행하며, 이후 과정은 각 반려견의 변화와 상태에 따라 달라집니다.

### 6.7 Senior dog section

제목:

> 예전에는 괜찮았는데 갑자기 힘들어한다면

본문:

> 노령견은 서 있는 자세, 체중을 싣는 방식, 특정 부위의 접촉 반응이 달라질 수 있습니다. 효효그루밍은 미용사가 관찰 가능한 범위에서 변화를 살피고, 미용 과정에서 조절할 부분과 보호자가 생활에서 관찰할 부분, 동물병원 확인이 필요한 가능성을 구분해 안내합니다.

주의 표시:

> 효효그루밍의 관찰과 안내는 수의학적 진단이나 치료를 대신하지 않습니다.

### 6.8 Responsibility section

강한 인용문:

> 미용실에서 바꿔야 할 경험은, 미용실에서부터 바뀌어야 한다고 생각합니다.

설명:

> 보호자와 함께 필요한 부분을 이어가되, 미용사가 해야 할 역할까지 수많은 숙제로 넘기지 않습니다. 보호자가 자신의 반려견을 더 잘 이해하고 다음 상황을 준비할 수 있도록 필요한 만큼 구체적으로 안내합니다.

### 6.9 Cases / 실제 사례

- `realCaseStudies.length > 0`일 때만 렌더링.
- 카드 필드: 반려견 가명, 연령대, 어려웠던 상황, 관찰 내용, 접근, 변화, 다음 계획, 보호자 동의 상태.
- Before/After를 외모 변화가 아닌 “과정의 변화” 관점으로 설명.
- 성공을 과장하지 않고 날짜와 회차를 표시.
- 영상/사진은 보호자 서면 동의가 확인된 것만 게시.

### 6.10 FAQ

화면에 답을 모두 렌더링하고 아코디언은 JS 없이도 내용을 읽을 수 있는 `<details>` 또는 접근성 있는 컴포넌트로 만든다.

Q1. 다른 곳에서 미용이 어렵다고 했는데 상담할 수 있나요?  
A. 네. 어떤 상황과 접촉에서 어려움이 나타나는지 먼저 상담합니다. 다만 현재 상태와 안전에 따라 당일 전체 미용보다 관찰과 적응 과정부터 시작할 수 있습니다.

Q2. 입질 행동이 있어도 가능한가요?  
A. 행동 자체만 보고 가능 여부를 단정하지 않습니다. 시작 상황, 강도, 접촉 부위, 과거 경험 등을 확인한 뒤 안전하게 진행 가능한 범위를 안내합니다.

Q3. 첫 방문에 미용을 모두 끝낼 수 있나요?  
A. 아이의 상태에 따라 다릅니다. 한 번에 끝내는 것이 다음 미용을 더 어렵게 만들 수 있다면, 오늘 가능한 범위를 정해 단계적으로 진행합니다.

Q4. 미용 교육은 몇 번 받아야 하나요?  
A. 평균적으로 1~3회의 집중 과정을 중심으로 진행하지만, 횟수와 다음 단계는 각 반려견의 반응과 변화에 따라 달라집니다.

Q5. 보호자가 집에서 많은 훈련을 해야 하나요?  
A. 필요한 관찰과 접근 방법은 안내하지만, 미용실에서 바꿔야 할 경험까지 모두 보호자의 숙제로 넘기지는 않습니다.

Q6. 노령견도 상담할 수 있나요?  
A. 가능합니다. 다만 자세나 움직임, 특정 부위의 반응에서 신체 불편 가능성이 보이면 안전을 위해 동물병원 확인을 먼저 권할 수 있습니다.

Q7. 가격은 어떻게 정해지나요?  
A. 현재 자료에는 확정 가격표가 없습니다. 가격은 실제 운영 정책이 확정된 뒤 견종·크기만이 아니라 필요한 과정과 상태를 이해하기 쉽게 안내합니다.

Q8. 예약 전에 무엇을 알려야 하나요?  
A. 나이, 견종, 이전 미용 경험, 어려워하는 접촉 부위, 짖음·으르렁거림·입질이 나타나는 상황, 건강상 특이사항을 알려주세요.

### 6.11 Final CTA

제목:

> “이번에도 안 되면 어떡하지?”를  
> 혼자 고민하지 마세요.

본문:

> 아이가 왜 어려워하는지 이해하는 상담부터 시작하겠습니다. 오늘 한 번의 미용이 아니라 앞으로 이어질 미용을 함께 생각합니다.

버튼:

- `010-3573-1499 전화 상담`
- 카카오 URL 확보 시 `카카오톡으로 상담하기`

### 6.12 Contact and footer

표시할 확정 정보:

- 효효그루밍
- 대표 전효정
- 전화 010-3573-1499
- 사업자등록번호 460-27-01246
- 부산광역시 동래구 안락동

정확한 도로명 주소와 운영시간이 입력되기 전에는 더 구체적으로 표시하지 않는다.

Footer 링크:

- 개인정보 처리 안내
- 전화하기
- 네이버 플레이스: 값 있을 때
- 인스타그램: 값 있을 때

---

## 7. 상세 페이지 작성 원칙

### `/grooming-education`

- H1: `미용하기 어려운 반려견을 위한 미용 교육`
- “입질견” 키워드는 검색 의도를 위해 설명문과 FAQ에서 자연스럽게 1~2회만 사용한다.
- 행동 맥락 → 접근 원칙 → 진행 예시 → 한계와 안전 → 상담 CTA 순서.
- 과도한 행동학 전문용어를 남발하지 않는다.

### `/process`

- 홈페이지의 5단계를 더 자세히 풀고, 보호자가 준비할 정보를 체크리스트로 제공.
- 상담 정보 항목: 나이, 견종, 중성화 여부는 필요한 경우, 건강/복용약, 이전 미용 경험, 특정 접촉 반응, 보호자가 원하는 우선 목표.
- 민감정보를 받을 경우 개인정보 수집·보관 기준을 명확히 한다.

### `/for-senior-dogs`

- 노화 자체를 문제 행동으로 설명하지 않는다.
- 통증이나 질환을 진단하는 문구 금지.
- 미용사가 조절할 수 있는 영역과 동물병원 영역을 명확히 구분.

### `/about`

- 대표자명 전효정과 소개서에 확인된 철학만 사용.
- 자격증과 경력은 자료 확보 전까지 비노출.
- “왜 어려운 아이들을 계속 만나왔는가”를 중심으로 브랜드 스토리 구성.

### `/contact`

- 전화 클릭을 최우선.
- 주소 확보 후 네이버지도 링크와 대중교통/주차 안내 추가.
- 상담 폼을 만들 경우 최소 필드만 사용:
  - 보호자 이름
  - 연락처
  - 반려견 이름
  - 나이/견종
  - 미용 시 어려운 상황
  - 개인정보 수집 동의
- 건강 세부정보는 첫 폼에서 과도하게 요구하지 않는다.

---

## 8. 기술 스택과 아키텍처

### 기본 스택

- Next.js App Router 최신 안정 버전
- TypeScript strict mode
- Tailwind CSS 최신 안정 버전
- ESLint
- 아이콘이 필요하면 `lucide-react`만 사용
- 테스트: Vitest + Testing Library, E2E/화면 검증은 Playwright
- 배포 목표: Vercel

원칙:

- 기본은 Server Components.
- Client Component는 모바일 메뉴, 스크롤 헤더, 상담 폼처럼 실제 상호작용이 필요한 곳에만.
- UI 프레임워크를 여러 개 섞지 않는다.
- 애니메이션 라이브러리는 꼭 필요하지 않으면 설치하지 않는다. CSS와 작은 IntersectionObserver 훅으로 충분히 구현.
- 마크다운 CMS나 외부 DB는 1차 MVP에 넣지 않는다. 콘텐츠는 typed data 파일로 분리.
- API key와 비밀값을 클라이언트 번들에 넣지 않는다.

### 권장 폴더 구조

```text
src/
  app/
    layout.tsx
    page.tsx
    about/page.tsx
    cases/page.tsx
    contact/page.tsx
    faq/page.tsx
    for-senior-dogs/page.tsx
    grooming-education/page.tsx
    process/page.tsx
    privacy/page.tsx
    robots.ts
    sitemap.ts
    manifest.ts
    opengraph-image.tsx
    not-found.tsx
  components/
    layout/
      Header.tsx
      MobileNav.tsx
      Footer.tsx
      MobileContactDock.tsx
    home/
      Hero.tsx
      EmpathyCards.tsx
      Philosophy.tsx
      Difference.tsx
      ProcessTimeline.tsx
      SeniorCare.tsx
      ResponsibilityQuote.tsx
      CasePreview.tsx
      FaqPreview.tsx
      FinalCta.tsx
    ui/
      Button.tsx
      Container.tsx
      SectionHeading.tsx
      JsonLd.tsx
  config/
    site.ts
  content/
    home.ts
    faq.ts
    services.ts
    cases.ts
  lib/
    metadata.ts
    schema.ts
    analytics.ts
  styles/
    globals.css
public/
  images/
    ASSET_CHECKLIST.md
tests/
```

### 초기화 예시

프로젝트가 비어 있을 때만 실행:

```bash
npx create-next-app@latest . --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
npm install lucide-react
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @playwright/test
```

설치 후 실제 생성된 Next.js/Tailwind 구조에 맞춰 설정하고, 오래된 설정 예제를 억지로 적용하지 않는다.

### 환경변수

```bash
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_NAVER_SITE_VERIFICATION=
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
NEXT_PUBLIC_GA_ID=
```

- 값이 없을 때 빌드가 깨지지 않아야 한다.
- 검증 태그는 값이 있을 때만 출력.
- 운영 비밀값은 `.env.local`, 공개 예시는 `.env.example`에 빈 값으로 제공.

---

## 9. SEO, AEO, GEO 구현

### 핵심 키워드 군

브랜드:

- 효효그루밍
- 효효그루밍 부산
- 효효그루밍 안락동

지역+서비스:

- 부산 애견미용
- 동래구 애견미용
- 안락동 애견미용
- 부산 미용교육 애견미용실
- 동래구 노령견 미용 상담

문제 해결형:

- 미용 거부 강아지
- 발 만지기 싫어하는 강아지 미용
- 얼굴 미용 싫어하는 강아지
- 입질견 미용 상담
- 애견미용 적응 교육

키워드 규칙:

- H1은 페이지당 1개.
- 제목과 첫 문단에서 주제를 분명히 하되 반복 삽입 금지.
- 사람에게 어색한 “부산 동래구 안락동 애견미용 추천” 식 문장 금지.
- 지역명만 바꾼 중복 페이지 금지.
- 전문성은 숫자 과장이 아니라 상세 과정과 안전 기준으로 입증.

### 홈페이지 메타데이터 초안

```ts
title: "부산 동래구 애견미용 교육 전문 | 효효그루밍"
description: "미용도구, 발·얼굴 접촉, 이전 경험 때문에 미용이 어려운 반려견을 위한 효효그루밍. 부산 동래구 안락동에서 행동의 이유를 살피고 다음 미용까지 이어지는 경험을 함께 만듭니다."
```

- title 30~60자 내에서 검토.
- description은 약 80~155자 범위에서 자연스럽게 조정.
- `metadataBase`, canonical, OG, Twitter card 구현.
- 페이지별 고유 title/description/canonical.
- OG 이미지는 1200×630 동적 또는 정적 생성.

### 구조화데이터

홈페이지에 실제 값만으로 JSON-LD 그래프를 구성한다.

필수 후보:

1. `LocalBusiness`
2. `WebSite`
3. `Organization` 또는 LocalBusiness 안에 통합
4. 상세 페이지별 `Service`
5. 내부 탐색용 `BreadcrumbList`
6. FAQ 페이지의 `FAQPage`

LocalBusiness 필드:

- `@id`: `${siteUrl}/#business`
- `name`: 효효그루밍
- `url`
- `telephone`: `+82-10-3573-1499`
- `description`
- `image`, `logo`: 실제 파일이 있을 때
- `address`: 정확한 도로명 주소가 들어온 뒤에만 완성
- `geo`: 정확한 좌표가 들어온 뒤에만
- `openingHoursSpecification`: 실제 운영시간 입력 후
- `sameAs`: 실제 URL만 filter
- `areaServed`: 부산광역시, 동래구
- `hasOfferCatalog`: 미용 교육 상담, 맞춤 미용 교육, 노령견 미용 상담

중요:

- `aggregateRating`과 `review`를 자체 후기로 임의 추가하지 않는다.
- FAQ 구조화데이터가 리치결과를 보장한다고 표현하지 않는다.
- 화면에 없는 내용을 JSON-LD에만 넣지 않는다.
- Rich Results Test와 Schema Markup Validator로 검증한다.

### 크롤링과 인덱싱

- `app/sitemap.ts`: 공개 완성 페이지만 포함.
- `app/robots.ts`: production에서 사이트맵 명시, staging/preview 인덱싱 방지 전략 기록.
- canonical은 최종 도메인 확정 후 한 도메인으로 통일.
- `not-found.tsx` 제공.
- 301/308이 필요한 기존 URL이 있으면 `next.config` redirects로 관리.
- Google Search Console과 네이버 서치어드바이저 등록 절차를 README에 정리.
- 네이버 플레이스의 상호·주소·전화 NAP 정보를 홈페이지와 완전히 일치시킨다.

### AEO/GEO 콘텐츠 패턴

각 상세 페이지 상단에 40~70단어 수준의 직접 답변 블록을 둔다.

예시:

> 효효그루밍의 미용 교육은 미용을 거부하거나 특정 접촉과 도구를 어려워하는 반려견을 위해, 행동이 나타나는 상황을 먼저 살피고 가능한 범위부터 단계적으로 미용 경험을 다시 만드는 과정입니다. 한 번의 완성보다 다음 미용까지 안전하게 이어가는 것을 목표로 합니다.

콘텐츠 규칙:

- 질문형 H2 + 첫 문장 직접 답변.
- 목록과 단계, 조건, 예외를 명확히 표현.
- 작성자/검토자, 최종 수정일을 실제 운영 가능한 경우 표시.
- 근거 없는 “부산 최고”, “유일”, “100%” 금지.

---

## 10. 접근성, 성능, 개인정보, 분석

### 접근성 목표

- WCAG 2.2 AA 수준.
- 텍스트 대비 최소 4.5:1, 큰 텍스트 3:1.
- 포커스 링을 숨기지 않는다.
- 버튼/링크 최소 터치 영역 44×44px 권장.
- 모든 이미지에 목적에 맞는 alt. 장식 이미지는 빈 alt.
- 색상만으로 상태를 전달하지 않는다.
- Skip to content 링크 제공.
- `prefers-reduced-motion`에서 모든 불필요한 이동 애니메이션 제거.
- 키보드만으로 메뉴, 아코디언, 폼, CTA 사용 가능.
- 오류 메시지는 필드와 연결하고 스크린리더에 전달.

### Core Web Vitals 목표

- LCP ≤ 2.5초
- INP ≤ 200ms
- CLS ≤ 0.1
- 모바일 Lighthouse Performance 90 이상을 목표로 하되 실제 테스트 환경과 측정일을 기록.
- Accessibility, Best Practices, SEO 각 95 이상 목표.

성능 규칙:

- Hero LCP 리소스만 preload/priority.
- 아래쪽 이미지는 lazy load.
- width/height 또는 aspect-ratio로 이미지 공간 예약.
- 초기 JS를 줄이고 Server Components 유지.
- 자동재생 대형 영상, 자동 슬라이더, 무거운 3D 효과 금지.
- third-party script는 동의와 필요성이 있을 때만 지연 로딩.
- 이미지 원본을 그대로 올리지 말고 적절히 리사이즈.

### 개인정보와 상담 폼

상담 폼을 실제 전송 가능하게 구현할 때:

- 명시적 개인정보 수집 동의 체크.
- 수집 항목, 이용 목적, 보관 기간, 거부 권리 표기.
- 서버 측 Zod 검증.
- honeypot, rate limit, 크기 제한.
- 로그에 연락처와 민감한 상담 내용을 그대로 남기지 않는다.
- 백엔드 미연결 상태에서 “접수되었습니다” 가짜 성공 메시지 금지.

### 분석 이벤트

GA4 또는 다른 도구가 연결될 때만 다음 이벤트를 발생:

```text
click_phone
click_kakao
click_naver_booking
view_grooming_education
view_process
start_contact_form
submit_contact_form_success
click_map
```

- 이벤트에 보호자 이름, 전화번호, 반려견 건강정보를 절대 넣지 않는다.
- 추적 스크립트가 없을 때 앱 오류가 없어야 한다.

---

## 11. 컴포넌트 품질 규칙

- 모든 내부 링크는 Next.js `Link` 사용.
- 전화, 지도, 외부 SNS는 목적에 맞는 `<a>` 사용.
- 새 창 링크는 사용자에게 예측 가능해야 하며 필요한 경우 `rel="noopener noreferrer"`.
- 버튼처럼 보이는 요소는 `<button>`, 이동은 `<a>`.
- 문자열과 연락처를 여러 파일에 중복 하드코딩하지 않고 config에서 가져온다.
- 콘텐츠 배열은 TypeScript 타입을 정의한다.
- 빈 데이터 상태를 디자인한다.
- `dangerouslySetInnerHTML`은 검증된 JSON-LD 직렬화 외에는 사용하지 않는다.
- JSON-LD 직렬화 시 `<` 문자를 escape한다.
- 한국어 줄바꿈은 CSS `word-break: keep-all`, 긴 URL은 `overflow-wrap: anywhere`.
- 모바일 고정 독 때문에 마지막 콘텐츠가 가리지 않도록 safe-area padding 적용.
- iOS safe area: `env(safe-area-inset-bottom)` 적용.

---

## 12. 구현 TASK

### TASK-00 — 저장소 조사 및 계획

- 현재 파일, git 상태, package manager, Node 버전 확인.
- 기존 사용자 파일과 변경사항 보존.
- `IMPLEMENTATION_PLAN.md` 생성.
- 모호하거나 누락된 실제 사업 정보는 `TODO_REQUIRED`로 기록.

완료 조건:

- 저장소를 덮어쓰지 않고 프로젝트 방향이 문서화됨.

### TASK-01 — 프로젝트 기반

- Next.js/TypeScript/Tailwind 구성.
- strict 타입, lint, typecheck, build scripts.
- 글로벌 스타일과 디자인 토큰.
- `site.ts`, content 파일, 공용 타입.

완료 조건:

- 빈 기본 페이지가 아닌 브랜드 기본 레이아웃으로 빌드 성공.

### TASK-02 — 공통 레이아웃

- Header, desktop nav, accessible mobile nav.
- Footer, skip link, mobile contact dock.
- CTA 링크 availability 처리.

완료 조건:

- 360/768/1440px에서 깨지지 않고 키보드 탐색 가능.

### TASK-03 — 홈페이지

- 6장의 모든 필수 섹션 구현.
- 확정 카피를 사용하고 긴 문단은 스캔 가능한 구조로 편집.
- 실제 이미지가 없을 때 품질 좋은 로컬 SVG 대체 비주얼.

완료 조건:

- Hero→신뢰→과정→FAQ→상담 전환 흐름이 완결.

### TASK-04 — 상세 페이지

- grooming-education, process, for-senior-dogs, about, faq, contact, privacy.
- cases는 실제 데이터 유무에 따라 공개/보류 처리.
- Breadcrumb UI와 구조화데이터.

완료 조건:

- 모든 공개 메뉴와 링크가 200 응답, 임시 lorem ipsum 없음.

### TASK-05 — SEO/AEO/GEO

- metadataBase, page metadata, canonical, OG image.
- LocalBusiness/WebSite/Service/Breadcrumb/FAQ JSON-LD.
- sitemap, robots, manifest.
- 구조화데이터 빈 값 제거.

완료 조건:

- 각 페이지 title/description/H1 고유.
- schema JSON 파싱 성공.
- sitemap에 미완성·noindex 페이지 없음.

### TASK-06 — 상담 UX

- 전화 CTA 실동작.
- 미입력 외부 링크 숨김.
- 상담 폼은 백엔드가 확정된 경우만 실제 submit.
- 폼이 없더라도 연락 전 준비 정보 체크리스트 제공.

완료 조건:

- 사용자가 죽은 링크나 가짜 성공 화면을 만나지 않음.

### TASK-07 — 접근성 및 성능

- axe 또는 Lighthouse 점검.
- reduced motion, focus, keyboard, alt, contrast 수정.
- 이미지 최적화와 CLS 방지.

완료 조건:

- 심각한 접근성 오류 0.
- 360px 가로 스크롤 0.
- Core Web Vitals 예산을 코드 수준에서 충족하도록 설계.

### TASK-08 — 테스트

최소 테스트:

- site config formatting 테스트.
- 빈 외부 링크가 렌더링되지 않는 테스트.
- 전화 CTA href 테스트.
- FAQ 콘텐츠 접근성 테스트.
- JSON-LD에 PLACEHOLDER/빈 주소가 출력되지 않는 테스트.
- Playwright로 home/contact 핵심 경로.
- 360×800, 768×1024, 1440×1000 스크린샷.

완료 조건:

- lint/typecheck/build/unit/e2e 통과.

### TASK-09 — 문서화와 배포 준비

- 한국어 README.
- `.env.example`.
- Vercel 배포 절차.
- 도메인 연결, Search Console, 네이버 서치어드바이저 절차.
- 실제 사진 교체 위치와 파일명 규칙.

완료 조건:

- 비개발자도 TODO 목록을 보고 운영 정보를 교체할 수 있음.

### TASK-10 — 최종 감사

- 이 명세서와 실제 구현 대조.
- 가짜 후기/자격/주소/시간/가격/통계가 없는지 검색.
- `PLACEHOLDER`, `Lorem`, `href="#"`, `javascript:void` 전수 검색.
- console error, 404 asset, broken link 확인.
- 최종 보고서에 완료, 보류, 사용자 입력 필요 항목 구분.

완료 조건:

- 배포 가능한 코드와 투명한 남은 작업 목록 제공.

---

## 13. 검수 명령

실제 `package.json`에 맞게 스크립트를 제공한다.

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npx playwright test
```

추가 검사:

```bash
rg -n "PLACEHOLDER|Lorem|lorem|href=\"#\"|javascript:void|TODO_REQUIRED" src public
```

`TODO_REQUIRED` 자체는 허용되지만, 사용자 화면과 JSON-LD에 placeholder 값이 노출되면 안 된다.

---

## 14. Definition of Done

- [ ] 360px부터 desktop까지 반응형 완성
- [ ] 전화 상담이 실제 번호로 연결
- [ ] 미확정 링크/정보가 거짓으로 노출되지 않음
- [ ] 홈페이지와 7개 핵심 상세 페이지 완성
- [ ] 사례 데이터가 없으면 가짜 사례 없이 안전하게 비노출
- [ ] 부산·동래구·안락동 지역성과 미용 교육 전문성이 첫 화면에서 이해됨
- [ ] LocalBusiness/WebSite/Service/Breadcrumb/FAQ schema 검증
- [ ] canonical/OG/sitemap/robots 구현
- [ ] WCAG 2.2 AA 핵심 기준 반영
- [ ] LCP/INP/CLS 예산 반영
- [ ] lint/typecheck/test/build 통과
- [ ] 360/768/1440 스크린샷 검수
- [ ] README와 TODO_REQUIRED 작성
- [ ] 실제 자료에 없는 주장 0개
- [ ] 모바일에서 3번 이내 터치로 상담 가능

---

## 15. 배포 전 사용자에게 받아야 할 자료

우선순위 P0:

1. 최종 도메인
2. 정확한 도로명 주소와 우편번호
3. 영업시간, 휴무일, 예약 가능 시간
4. 카카오채널, 네이버 플레이스, 네이버 예약 URL
5. 로고 원본 SVG/PNG
6. 대표 Hero 사진과 매장 사진
7. 실제 가격 또는 가격 안내 정책

우선순위 P1:

8. 대표자 프로필 사진과 검증 가능한 경력/자격
9. 게시 동의를 받은 실제 사례
10. 게시 동의를 받은 실제 후기
11. 주차, 대중교통, 방문 주의사항
12. 인스타그램 URL

자료가 없어도 개발과 미리보기는 완료하되, P0가 채워지기 전에는 production 공개 준비 완료로 표시하지 않는다.

---

## 16. 참고 기준

- 참고 사이트: https://www.signviewer.co.kr
- Google LocalBusiness 구조화데이터: https://developers.google.com/search/docs/appearance/structured-data/local-business
- Google Sitemap 가이드: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Web Vitals: https://web.dev/articles/vitals
- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- Next.js Metadata/OG: https://nextjs.org/docs/app/getting-started/metadata-and-og-images

이 문서는 참고 사이트의 코드를 복제하라는 뜻이 아니다. 검증된 전환 구조와 SEO 기본기를 참고해 효효그루밍만의 브랜드, 카피, 디자인 시스템, 정보 구조로 새롭게 구현한다.

