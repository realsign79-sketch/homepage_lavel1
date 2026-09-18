import Link from "next/link";

import type { Crumb } from "@/lib/schema";

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="현재 위치" className="text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-ink">
                  {c.name}
                </span>
              ) : (
                <>
                  <Link href={c.path} className="link-underline hover:text-ink">
                    {c.name}
                  </Link>
                  <span aria-hidden="true" className="text-line">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
