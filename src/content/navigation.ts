export type NavItem = { href: string; label: string };

export const MAIN_NAV: NavItem[] = [
  { href: "/about", label: "효효그루밍" },
  { href: "/grooming-education", label: "미용 교육" },
  { href: "/process", label: "진행 과정" },
  { href: "/for-senior-dogs", label: "노령견 케어" },
  { href: "/faq", label: "자주 묻는 질문" },
  { href: "/contact", label: "상담하기" },
];

export const CTA_LABEL = "우리 아이 상담하기";

export function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}
