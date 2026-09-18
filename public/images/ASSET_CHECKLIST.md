# 이미지 자산 체크리스트

## 현재 사용 중인 사진 (docs/images 원본 → 리사이즈·EXIF 제거)

| 파일 | 장면 | 사용 위치 | 비고 |
|---|---|---|---|
| hero-groomer.jpg | 대표가 반려견 옆에서 도구를 들고 기다리는 장면 | 홈 Hero, OG 이미지 | 영상 캡처본 → 고해상도 원본으로 교체 권장 |
| owner-portrait.jpg | 대표 프로필 | 홈 대표 섹션, /about | |
| touch-paw.jpg | 샤페이 앞발 접촉 적응 | 홈 철학 섹션 | 보호자 게시 동의 확인 필요 |
| floor-nail.jpg | 바닥에서 안고 발 관리 | 홈 차이점, /grooming-education | |
| table-poodle.jpg | 턴테이블 위 푸들 드라이 | 홈 과정, /process | 보호자 게시 동의 확인 필요 |
| table-clipper.jpg | 카바푸 클리퍼 작업 | 홈 과정·CTA, /grooming-education | 보호자 게시 동의 확인 필요 |
| bath-care.jpg | 목욕 | 홈 과정, /process | |
| lecture-contact.jpg | "애견미용은 접촉의 연속" 강연 | /about | 청중 뒷모습 포함 |
| lecture-seminar.jpg | HYOHYO GROOMING 세미나 | /about | 청중 일부 모자이크됨 |

**사용하지 않은 사진:** `KakaoTalk_..._02.jpg`(스터디 현장) — 수강생 얼굴이 그대로 보여 게시 동의 확인 전까지 제외.

## 추가로 필요한 촬영 (명세서 4장)

1. Hero 가로 16:9 또는 4:3 고해상도 원본 1장 (현재는 영상 캡처본)
2. 미용사와 반려견 상호작용 3장
3. 손·발·얼굴 접촉 적응 장면 각 1장
4. 도구와 공간 적응 장면 2장
5. 매장 내부/외부/주차 또는 접근 동선 각 1장
6. 보호자 동의를 받은 실제 과정 사례: 전/중/후 각 1장

## 교체 방법

1. 같은 파일명으로 `public/images/`에 덮어쓰면 됩니다 (권장: 긴 변 1600px 이하, JPG 품질 80~85).
2. 새 사진을 추가하면 `src/content/images.ts`에 import와 alt 문구를 추가합니다.
3. alt는 "무엇을 하는 장면인지" 구체적으로 씁니다. 장식용은 빈 alt("")를 사용합니다.
