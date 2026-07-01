"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import type { Trademark } from "@/lib/types";
import { TrademarkLogo, categoryBadge, formatPrice } from "@/components/shared";
import { FavoriteButton } from "@/components/FavoriteButton";
import { ConsultButton } from "@/components/ConsultButton";
import { MobileHeader } from "../../layout";

export default function MobileDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [id, setId] = useState("");
  const [tm, setTm] = useState<Trademark | null>(null);
  const [similar, setSimilar] = useState<Trademark[]>([]);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => { params.then((p) => setId(p.id)); }, [params]);
  useEffect(() => {
    if (!id) return;
    fetch(`/api/trademarks/${id}`).then((r) => r.json()).then((d) => {
      setTm(d.trademark);
      setSimilar(d.similar ?? []);
    });
  }, [id]);

  if (!tm) return <div className="p-8 text-center text-gray-400 text-sm">加载中...</div>;

  const displayItems = expanded ? tm.items : tm.items.slice(0, 5);

  return (
    <>
      <MobileHeader title={tm.name} backHref="/m/market" />

      <div className="px-4 py-4 bg-white">
        <div className="flex gap-4">
          <TrademarkLogo initial={tm.initial} gradient={tm.gradient} size="lg" />
          <div className="flex-1">
            <h1 className="text-xl font-bold">{tm.name}</h1>
            <span className="text-[10px] font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">注册号: {tm.registrationNo}</span>
            <div className="text-2xl font-bold text-[var(--color-accent)] mt-2">{formatPrice(tm.price)}</div>
          </div>
        </div>
      </div>

      {tm.riskScore && (
        <div className="mx-3 mb-3 p-[2px] rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)]">
          <div className="bg-white rounded-[10px] p-4">
            <div className="flex items-center gap-1.5 mb-3">
              <Sparkles className="w-4 h-4 text-[var(--color-primary)]" />
              <span className="text-sm font-semibold">AI 风险评估</span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl font-bold text-[var(--color-secondary)]">{tm.riskScore}<span className="text-sm">分</span></span>
              <span className="text-[10px] font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">低风险</span>
            </div>
            <div className="space-y-2">
              {tm.riskItems?.map((r) => (
                <div key={r.text} className="flex items-center gap-2 text-xs text-gray-700">
                  <Check className={`w-3.5 h-3.5 ${r.ok ? "text-green-500" : "text-amber-500"}`} />
                  {r.text}
                  {r.note && <span className="text-gray-400">{r.note}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mx-3 mb-3 bg-white rounded-xl p-4 shadow-sm">
        <div className="text-sm font-semibold mb-3">基本信息</div>
        <div className="grid grid-cols-2 gap-3 text-xs">
          {[
            ["商标类别", categoryBadge(tm.categoryCode, tm.categoryName)],
            ["小项数量", `${tm.itemCount}个小项`],
            ["申请日期", tm.applyDate],
            ["有效期至", tm.expireDate],
          ].map(([k, v]) => (
            <div key={k}>
              <div className="text-gray-400 mb-0.5">{k}</div>
              <div className="font-medium text-gray-800">{v}</div>
            </div>
          ))}
          <div className="col-span-2">
            <div className="text-gray-400 mb-0.5">申请人</div>
            <div className="font-medium text-gray-800 truncate">{tm.applicant}</div>
          </div>
        </div>
      </div>

      <div className="mx-3 mb-3 bg-white rounded-xl p-4 shadow-sm">
        <div className="text-sm font-semibold mb-3">适用商品/服务 ({tm.itemCount}项)</div>
        {displayItems.map((item, i) => (
          <div key={i} className="flex items-center gap-2 py-2 border-b border-gray-50 last:border-0 text-xs">
            <span className="w-5 h-5 rounded-full bg-blue-50 text-[var(--color-primary)] text-[10px] font-bold flex items-center justify-center">{i + 1}</span>
            {item.name}
          </div>
        ))}
        {tm.items.length > 5 && (
          <button onClick={() => setExpanded(!expanded)} className="w-full text-center text-xs text-[var(--color-primary)] py-2">
            {expanded ? "收起" : "展开全部"}
          </button>
        )}
      </div>

      {tm.aiTags && (
        <div className="mx-3 mb-3 bg-white rounded-xl p-4 shadow-sm">
          <div className="text-sm font-semibold mb-2">AI 推荐理由</div>
          <div className="flex flex-wrap gap-1.5">
            {tm.aiTags.map((tag) => (
              <span key={tag} className="text-[10px] text-[var(--color-primary)] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">{tag}</span>
            ))}
          </div>
        </div>
      )}

      {similar.length > 0 && (
        <div className="mx-3 mb-20 bg-white rounded-xl p-4 shadow-sm">
          <div className="text-sm font-semibold mb-3">相似推荐</div>
          <div className="flex gap-2.5 overflow-x-auto no-scrollbar">
            {similar.map((s) => (
              <Link key={s.id} href={`/m/detail/${s.id}`} className="shrink-0 w-[130px] border border-gray-200 rounded-lg p-2.5">
                <TrademarkLogo initial={s.initial} gradient={s.gradient} size="sm" />
                <div className="text-xs font-semibold mt-1">{s.name}</div>
                <div className="text-xs font-bold text-[var(--color-accent)]">{formatPrice(s.price)}</div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[375px] bg-white border-t border-gray-200 px-3 py-2 flex items-center gap-2 z-50">
        <div className="w-12 flex flex-col items-center">
          <FavoriteButton trademarkId={tm.id} />
          <span className="text-[10px] text-gray-500">收藏</span>
        </div>
        <ConsultButton trademarkId={tm.id} trademarkName={tm.name} className="flex-1 py-2.5 text-sm" />
      </div>
    </>
  );
}
