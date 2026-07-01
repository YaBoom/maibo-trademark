"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import type { Trademark } from "@/lib/types";
import { TrademarkLogo, categoryBadge, formatPrice } from "@/components/shared";
import { FavoriteButton } from "@/components/FavoriteButton";

const CATEGORIES = [
  { value: "all", label: "全部分类" },
  { value: "9", label: "09类电子电器" },
  { value: "25", label: "25类服装鞋帽" },
  { value: "30", label: "30类食品" },
  { value: "35", label: "35类广告销售" },
  { value: "43", label: "43类餐饮住宿" },
];

export default function PcMarketPage() {
  const [items, setItems] = useState<Trademark[]>([]);
  const [total, setTotal] = useState(0);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const [page, setPage] = useState(1);

  const load = useCallback(async () => {
    const params = new URLSearchParams({
      page: String(page),
      pageSize: "8",
      sort,
      ...(q && { q }),
      ...(category !== "all" && { category }),
    });
    const res = await fetch(`/api/trademarks?${params}`);
    const data = await res.json();
    setItems(data.items);
    setTotal(data.total);
  }, [q, category, sort, page]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <>
      <section className="py-10 bg-gradient-to-b from-[var(--color-primary-subtle)] to-white">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex justify-center gap-2 mb-4 flex-wrap">
            {["智能", "商标名", "注册号"].map((tab, i) => (
              <button
                key={tab}
                className={`px-4 py-1.5 rounded-full text-sm font-medium ${i === 0 ? "bg-[var(--color-primary)] text-white" : "border border-gray-300 text-gray-600"}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative flex items-center">
            <input
              value={q}
              onChange={(e) => { setQ(e.target.value); setPage(1); }}
              placeholder="商标名/注册号/AI推荐"
              className="w-full h-14 pl-5 pr-28 rounded-xl border-2 border-[var(--color-primary)] outline-none"
            />
            <button
              onClick={load}
              className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5 h-10 px-5 rounded-lg bg-[var(--color-primary)] text-white text-sm font-medium"
            >
              <Search className="w-4 h-4" /> 搜索
            </button>
          </div>
        </div>
      </section>

      <section className="border-b border-gray-200">
        <div className="max-w-[var(--container-max)] mx-auto px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              onClick={() => { setCategory(c.value); setPage(1); }}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                category === c.value
                  ? "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white border-transparent"
                  : "border-gray-300 text-gray-600"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-[var(--container-max)] mx-auto px-4 py-3 flex justify-between text-sm text-gray-500">
        <span>共 <strong className="text-gray-900">{total}</strong> 件商标</span>
        <select
          value={sort}
          onChange={(e) => { setSort(e.target.value); setPage(1); }}
          className="border border-gray-300 rounded-lg px-2 py-1 text-sm"
        >
          <option value="default">综合排序</option>
          <option value="price-asc">价格升序</option>
          <option value="price-desc">价格降序</option>
          <option value="newest">最新</option>
          <option value="hot">热门</option>
        </select>
      </section>

      <section className="max-w-[var(--container-max)] mx-auto px-4 pb-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((tm) => (
            <Link
              key={tm.id}
              href={`/pc/detail/${tm.id}`}
              className="relative bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:border-[var(--color-primary)]/30 transition-all text-center"
            >
              <div className="absolute top-3 right-3">
                <FavoriteButton trademarkId={tm.id} />
              </div>
              <div className="flex flex-col items-center pt-4">
                <TrademarkLogo initial={tm.initial} gradient={tm.gradient} size="lg" />
                <h3 className="font-bold mt-3 mb-2">{tm.name}</h3>
                <span className="text-xs px-2 py-0.5 rounded-md bg-[var(--color-primary-light)] text-[var(--color-primary)] mb-1">
                  {categoryBadge(tm.categoryCode, tm.categoryName)}
                </span>
                <span className="text-xs text-gray-400 mb-2">{tm.itemCount}个小项</span>
                {tm.sameNameClasses > 0 && (
                  <span className="text-xs px-2 py-0.5 rounded-md bg-teal-50 text-teal-600 mb-2">
                    同名{tm.sameNameClasses}类
                  </span>
                )}
                <div className="text-xl font-bold text-[var(--color-accent)]">
                  {formatPrice(tm.price)}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-16 text-gray-400">暂无匹配的商标</div>
        )}

        <div className="flex justify-center gap-2 mt-8">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 rounded-lg border text-sm disabled:opacity-40"
          >
            上一页
          </button>
          <span className="px-4 py-2 text-sm">第 {page} 页</span>
          <button
            disabled={page * 8 >= total}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white text-sm disabled:opacity-40"
          >
            下一页
          </button>
        </div>
      </section>
    </>
  );
}
