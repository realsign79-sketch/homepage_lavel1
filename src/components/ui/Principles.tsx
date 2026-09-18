type Item = { title: string; body: string };

/** 번호가 붙은 원칙 목록 — 상세 페이지 공통 */
export function Principles({ items, columns = 2 }: { items: Item[]; columns?: 2 | 3 }) {
  return (
    <ol className={`grid gap-x-10 gap-y-2 ${columns === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
      {items.map((item, i) => (
        <li key={item.title} className="reveal grid grid-cols-[auto_1fr] gap-5 border-t border-line py-7">
          <span aria-hidden="true" className="display text-2xl leading-none text-clay-strong">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="text-lg font-semibold text-forest-strong">{item.title}</h3>
            <p className="mt-2 text-[1rem] leading-relaxed text-muted">{item.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
