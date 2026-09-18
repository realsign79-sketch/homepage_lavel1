"use client";

import { Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { SITE, getAddress } from "@/config/site";
import { MAIN_NAV, isActive } from "@/content/navigation";

import { Logo } from "./Logo";

/** 모바일 메뉴 — 포커스 트랩, ESC 닫기, body 스크롤 잠금 */
export function MobileNav({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  // 경로가 바뀌면 닫기 (링크 클릭 시 onClick에서도 닫음)
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const { body } = document;
    const prevOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    const panel = panelRef.current;
    const focusables = () =>
      Array.from(panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []);
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full text-forest-strong transition-colors hover:bg-forest/5"
      >
        <Menu aria-hidden="true" className="h-6 w-6" strokeWidth={1.6} />
        <span className="sr-only">메뉴 열기</span>
      </button>

      {open ? (
        <div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="전체 메뉴"
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-canvas"
        >
          <div className="container-page flex h-[4.5rem] shrink-0 items-center justify-between md:h-20">
            <Logo onClick={() => setOpen(false)} />
            <button
              type="button"
              onClick={close}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-forest-strong hover:bg-forest/5"
            >
              <X aria-hidden="true" className="h-6 w-6" strokeWidth={1.6} />
              <span className="sr-only">메뉴 닫기</span>
            </button>
          </div>

          <nav aria-label="모바일 주요 메뉴" className="container-page flex-1 pt-6 pb-10">
            <ul className="divide-y divide-line border-y border-line">
              {MAIN_NAV.map((item, i) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className="flex min-h-16 items-center justify-between py-4"
                    >
                      <span className={`display text-2xl ${active ? "text-clay-strong" : "text-forest-strong"}`}>
                        {item.label}
                      </span>
                      <span aria-hidden="true" className="text-xs font-semibold tracking-[0.2em] text-sage-text">
                        0{i + 1}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <a
              href={`tel:${SITE.phone.tel}`}
              data-track="click_phone"
              data-track-location="mobile_menu"
              className="btn btn-primary mt-10 w-full"
            >
              <Phone aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
              {SITE.phone.display} 전화 상담
            </a>
            <p className="mt-4 text-center text-sm text-muted">{getAddress()}</p>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
