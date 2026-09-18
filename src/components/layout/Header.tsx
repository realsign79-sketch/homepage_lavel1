"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { CTA_LABEL, MAIN_NAV, isActive } from "@/content/navigation";

import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = MAIN_NAV.filter((n) => n.href !== "/contact");

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled
          ? "border-b border-line/70 bg-surface/90 shadow-[0_6px_30px_rgba(20,39,31,0.06)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-6 md:h-20">
        <Logo />

        <nav aria-label="주요 메뉴" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-[0.9375rem] font-medium">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`link-underline py-2 transition-colors ${
                      active ? "text-forest-strong [background-size:100%_1px]" : "text-muted hover:text-forest-strong"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            aria-current={isActive(pathname, "/contact") ? "page" : undefined}
            className="btn btn-primary hidden min-h-11! px-5! py-2.5! text-[0.9375rem] lg:inline-flex"
          >
            {CTA_LABEL}
          </Link>
          <MobileNav pathname={pathname} />
        </div>
      </div>
    </header>
  );
}
