export type FaqItem = { id: string; question: string; answer: string };

export const FAQ: FaqItem[] = [
  {
    id: "refused-elsewhere",
    question: "다른 곳에서 미용이 어렵다고 했는데 상담할 수 있나요?",
    answer:
      "네. 어떤 상황과 접촉에서 어려움이 나타나는지 먼저 상담합니다. 다만 현재 상태와 안전에 따라 당일 전체 미용보다 관찰과 적응 과정부터 시작할 수 있습니다.",
  },
  {
    id: "biting",
    question: "입질 행동이 있어도 가능한가요?",
    answer:
      "행동 자체만 보고 가능 여부를 단정하지 않습니다. 시작 상황, 강도, 접촉 부위, 과거 경험 등을 확인한 뒤 안전하게 진행 가능한 범위를 안내합니다.",
  },
  {
    id: "first-visit",
    question: "첫 방문에 미용을 모두 끝낼 수 있나요?",
    answer:
      "아이의 상태에 따라 다릅니다. 한 번에 끝내는 것이 다음 미용을 더 어렵게 만들 수 있다면, 오늘 가능한 범위를 정해 단계적으로 진행합니다.",
  },
  {
    id: "sessions",
    question: "미용 교육은 몇 번 받아야 하나요?",
    answer:
      "평균적으로 1~3회의 집중 과정을 중심으로 진행하지만, 횟수와 다음 단계는 각 반려견의 반응과 변화에 따라 달라집니다.",
  },
  {
    id: "homework",
    question: "보호자가 집에서 많은 훈련을 해야 하나요?",
    answer:
      "필요한 관찰과 접근 방법은 안내하지만, 미용실에서 바꿔야 할 경험까지 모두 보호자의 숙제로 넘기지는 않습니다.",
  },
  {
    id: "senior",
    question: "노령견도 상담할 수 있나요?",
    answer:
      "가능합니다. 다만 자세나 움직임, 특정 부위의 반응에서 신체 불편 가능성이 보이면 안전을 위해 동물병원 확인을 먼저 권할 수 있습니다.",
  },
  {
    id: "price",
    question: "가격은 어떻게 정해지나요?",
    answer:
      "가격은 견종·크기만이 아니라 아이의 상태와 필요한 과정에 따라 달라지므로, 상담 후 안내해 드립니다.",
  },
  {
    id: "before-booking",
    question: "예약 전에 무엇을 알려야 하나요?",
    answer:
      "나이, 견종, 이전 미용 경험, 어려워하는 접촉 부위, 짖음·으르렁거림·입질이 나타나는 상황, 건강상 특이사항을 알려주세요.",
  },
];

/** 홈페이지 미리보기용 */
export const FAQ_PREVIEW_IDS = ["refused-elsewhere", "biting", "first-visit", "sessions", "senior"];
