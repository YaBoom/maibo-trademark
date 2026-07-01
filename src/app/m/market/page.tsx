"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Trademark } from "@/lib/types";
import { TrademarkLogo, categoryBadge, formatPrice } from "@/components/shared";
import { MobileHeader } from "../layout";

export default function MobileMarketPage() {
  const sp = useSearchParams();
  const [items, setItems] = useState<Trademark[]>([]);
  const [total, setTotal] = useState(0);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("default");

  const load = useCallback(async () => {
    const params = new URLSearchParams({
      pageSize: "20",
      sort,
      ...(q && { q }),
      ...(sp.get("scene") && { scene: sp.get("scene")! }),
    });
    const res = await fetch(`/api/trademarks?${params}`);
    const data = await res.json();
    setItems(data.items);
    setTotal(data.total);
  }, [q, sort, sp]);

  useEffect(() => { load(); }, [load]);

  return (
    <>
      <MobileHeader title="商标市场" />

      <div className="px-4 py-2 bg-white">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && load()}
          placeholder="搜索商标名/注册号"
          className="w-full bg-gray-100 rounded-full px-4 py-2.5 text-sm outline-none"
        />
      </div>

      <div className="px-4 py-2 bg-white flex gap-2 overflow-x-auto no-scrollbar">
        {["全部", "电商入驻", "餐饮开店", "品牌升级"].map((label, i) => (
          <span key={label} className={`shrink-0 px-3 py-1 rounded-full text-xs ${i === 0 ? "bg-[var(--color-primary)] text-white" : "border border-gray-200 text-gray-600"}`}>
            {label}
          </span>
        ))}
      </div>

      <div className="px-4 py-2 bg-white flex justify-between text-xs text-gray-500">
        <span>共 {total} 个商标</span>
        <div className="flex gap-3">
          {["综合", "价格↑", "最新"].map((s, i) => (
            <button
              key={s}
              onClick={() => setSort(i === 1 ? "price-asc" : i === 2 ? "newest" : "default")}
              className={i === 0 ? "text-[var(--color-primary)] font-semibold" : ""}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 px-3 pt-2 pb-4 bg-gray-50 min-h-[400px]">
        {items.map((tm) => (
          <Link key={tm.id} href={`/m/detail/${tm.id}`} className="bg-white rounded-xl overflow-hidden shadow-sm block">
            <div className="flex justify-center pt-3 pb-2">
              <TrademarkLogo initial={tm.initial} gradient={tm.gradient} size="sm" />
            </div>
            <div className="px-3 pb-3">
              <div className="text-sm font-bold">{tm.name}</div>
              <span className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded mt-1 inline-block">
                {categoryBadge(tm.categoryCode, tm.categoryName)}
              </span>
              <div className="text-base font-bold text-red-500 mt-1">{formatPrice(tm.price)}</div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
