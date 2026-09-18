import type { StaticImageData } from "next/image";

import bathCare from "../../public/images/bath-care.jpg";
import floorNail from "../../public/images/floor-nail.jpg";
import heroGroomer from "../../public/images/hero-groomer.jpg";
import lectureContact from "../../public/images/lecture-contact.jpg";
import lectureSeminar from "../../public/images/lecture-seminar.jpg";
import ownerPortrait from "../../public/images/owner-portrait.jpg";
import tableClipper from "../../public/images/table-clipper.jpg";
import tablePoodle from "../../public/images/table-poodle.jpg";
import touchPaw from "../../public/images/touch-paw.jpg";

export type Photo = { src: StaticImageData; alt: string };

/** 실제 효효그루밍 사진 (docs/images 원본을 리사이즈·메타데이터 제거) */
export const PHOTOS = {
  hero: {
    src: heroGroomer,
    alt: "미용 테이블 위에 앉은 반려견 곁에서 도구를 든 채 아이의 반응을 기다리는 효효그루밍 미용사",
  },
  owner: {
    src: ownerPortrait,
    alt: "효효그루밍 전효정 대표 프로필 사진",
  },
  touchPaw: {
    src: touchPaw,
    alt: "샤페이의 앞발을 부드럽게 잡고, 간식 그릇으로 편안한 경험을 연결하며 접촉에 적응시키는 장면",
  },
  floorNail: {
    src: floorNail,
    alt: "미용 테이블 대신 바닥에 앉아 반려견을 무릎에 안은 채 발 관리를 진행하는 모습",
  },
  tablePoodle: {
    src: tablePoodle,
    alt: "턴테이블 위에 앉은 흰색 푸들을 드라이하며 반응을 살피는 미용사",
  },
  tableClipper: {
    src: tableClipper,
    alt: "갈색 반려견의 몸을 가볍게 받친 채 클리퍼로 미용을 진행하는 모습",
  },
  bath: {
    src: bathCare,
    alt: "욕조에서 반려견의 얼굴을 손으로 감싸며 조심스럽게 샤워하는 모습",
  },
  lectureContact: {
    src: lectureContact,
    alt: "‘애견미용은 접촉의 연속입니다’라는 슬라이드 앞에서 강연하는 전효정 대표",
  },
  lectureSeminar: {
    src: lectureSeminar,
    alt: "HYOHYO GROOMING 자료를 띄워 두고 청중에게 설명하는 전효정 대표",
  },
} satisfies Record<string, Photo>;
