"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import type { Trademark } from "@/lib/types";
import { TrademarkLogo, categoryBadge, formatPrice } from "@/components/shared";

export default function GridToolPage() {
  const { user } = useAuth();
  const [trademarks, setTrademarks] = useState<Trademark[]>([]);
  const [cols, setCols] = useState(3);
  const [rows, setRows] = useState(3);
  const [showName, setShowName] = useState(true);
  const [showPrice, setShowPrice] = useState(true);
  const [showCategory, setShowCategory] = useState(false);
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [sort, setSort] = useState<"default" | "price-asc" | "price-desc">("default");

  useEffect(() => {
    fetch("/api/trademarks?pageSize=50")
      .then((r) => r.json())
      .then((d) => setTrademarks(d.items));
  }, []);

  let display = [...trademarks];
  if (sort === "price-asc") display.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") display.sort((a, b) => b.price - a.price);
  display = display.slice(0, cols * rows);

  const colors = ["#FFFFFF", "#E8F0FE", "#F3F4F6", "#EEFBF6", "#FFF0E8"];

  return (
    <>
      <section className="max-w-[var(--container-max)] mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">九宫格工具</h1>
        <p className="text-gray-500 mb-8">快速生成商标展示图片，支持自定义布局和样式</p>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-[320px] shrink-0">
            <div className="rounded-xl border border-gray-200 p-6 bg-white shadow-sm space-y-6">
              <div>
                <h3 className="text-xs font-semibold uppercase text-gray-400 mb-4">基本设置</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium block mb-1">商标类别</label>
                    <input placeholder="如：9类、25类..." className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm" />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1">手机号</label>
                    <input placeholder="手机号" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm" />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1">调高价格</label>
                    <input disabled placeholder="登录后可用" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-100 text-sm opacity-60 cursor-not-allowed" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase text-gray-400 mb-4">布局设置</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium block mb-2">每行个数</label>
                    <div className="flex gap-2 flex-wrap">
                      {[3, 4, 5, 6].map((n) => (
                        <button key={n} onClick={() => setCols(n)} className={`px-4 py-1.5 rounded-full text-sm border ${cols === n ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]" : "border-gray-200 text-gray-600"}`}>
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-2">行数</label>
                    <div className="flex gap-2 flex-wrap">
                      {[2, 3, 4, 5].map((n) => (
                        <button key={n} onClick={() => setRows(n)} className={`px-4 py-1.5 rounded-full text-sm border ${rows === n ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]" : "border-gray-200 text-gray-600"}`}>
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-2">显示信息</label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        ["商标名", showName, setShowName],
                        ["价格", showPrice, setShowPrice],
                        ["类目", showCategory, setShowCategory],
                      ].map(([label, val, setter]) => (
                        <button
                          key={label as string}
                          onClick={() => (setter as (v: boolean) => void)(!(val as boolean))}
                          className={`px-3 py-2 rounded-lg text-sm border ${val ? "bg-[var(--color-primary-subtle)] border-[var(--color-primary)]/30 text-[var(--color-primary)]" : "border-gray-200 text-gray-600"}`}
                        >
                          {label as string}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase text-gray-400 mb-4">样式设置</h3>
                <div className="flex gap-3 mb-4">
                  {colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setBgColor(c)}
                      className={`w-8 h-8 rounded-full border-2 ${bgColor === c ? "border-[var(--color-primary)] scale-110" : "border-gray-200"}`}
                      style={{ background: c }}
                    />
                  ))}
                </div>
                <div className="flex gap-2 flex-wrap">
                  {[
                    ["default", "默认"],
                    ["price-asc", "价格升序"],
                    ["price-desc", "价格降序"],
                  ].map(([v, l]) => (
                    <button
                      key={v}
                      onClick={() => setSort(v as typeof sort)}
                      className={`px-3 py-2 rounded-lg text-sm border ${sort === v ? "bg-[var(--color-primary-subtle)] border-[var(--color-primary)]/30 text-[var(--color-primary)]" : "border-gray-200 text-gray-600"}`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => alert(user ? "图片生成功能 Demo：预览已更新" : "请先登录后使用完整功能")}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-hover)] text-white font-semibold text-sm"
              >
                生成图片
              </button>
            </div>
          </div>

          <div className="flex-1">
            <div className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm">
              <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100">
                <span className="text-sm font-semibold">预览</span>
                <span className="text-xs text-gray-400">{cols}×{rows} = {cols * rows} 个</span>
              </div>
              <div className="p-5" style={{ background: bgColor }}>
                <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
                  {display.map((tm) => (
                    <div key={tm.id} className="rounded-lg border border-gray-100 p-4 flex flex-col items-center text-center bg-white">
                      <TrademarkLogo initial={tm.initial} gradient={tm.gradient} size="sm" />
                      {showName && <span className="text-sm font-semibold mt-2">{tm.name}</span>}
                      {showCategory && <span className="text-xs text-gray-400 mt-1">{categoryBadge(tm.categoryCode, tm.categoryName)}</span>}
                      {showPrice && <span className="text-sm font-semibold text-[var(--color-primary)] mt-1">{formatPrice(tm.price)}</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
