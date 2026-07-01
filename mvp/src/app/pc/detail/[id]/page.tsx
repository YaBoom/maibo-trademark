"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Hash, Sparkles } from "lucide-react";
import type { Trademark } from "@/lib/types";
import { TrademarkLogo, categoryBadge, formatPrice } from "@/components/shared";
import { FavoriteButton } from "@/components/FavoriteButton";
import { CompareButton } from "@/components/CompareButton";
import { ConsultButton } from "@/components/ConsultButton";

export default function PcDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [id, setId] = useState<string>("");
  const [tm, setTm] = useState<Trademark | null>(null);
  const [similar, setSimilar] = useState<Trademark[]>([]);
  const [tab, setTab] = useState<"info" | "items" | "process">("info");

  useEffect(() => {
    params.then((p) => setId(p.id));
  }, [params]);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/trademarks/${id}`)
      .then((r) => r.json())
      .then((d) => {
        setTm(d.trademark);
        setSimilar(d.similar ?? []);
      });
  }, [id]);

  if (!tm) {
    return <div className="max-w-[var(--container-max)] mx-auto px-4 py-20 text-center text-gray-400">加载中...</div>;
  }

  return (
    <>
      <div className="max-w-[var(--container-max)] mx-auto px-4 pt-4 pb-2">
        <Link href="/pc/market" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[var(--color-primary)]">
          <ArrowLeft className="w-4 h-4" /> 返回列表
        </Link>
      </div>

      <section className="max-w-[var(--container-max)] mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="md:w-[40%]">
            <div className="bg-gray-50 rounded-2xl p-10 flex flex-col items-center">
              <TrademarkLogo initial={tm.initial} gradient={tm.gradient} size="xl" />
              <div className="flex gap-4 mt-6">
                <FavoriteButton trademarkId={tm.id} />
              </div>
            </div>
          </div>
          <div className="md:w-[60%]">
            <h1 className="text-4xl font-extrabold mb-4">{tm.name}</h1>
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-xs font-mono text-gray-600">
                <Hash className="w-3 h-3" /> 注册号: {tm.registrationNo}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500 text-white text-xs font-semibold">
                <Check className="w-3 h-3" /> 可转让
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                ["商标类别", categoryBadge(tm.categoryCode, tm.categoryName)],
                ["小项数量", `${tm.itemCount}个小项`],
                ["同名类别", `同名${tm.sameNameClasses}类`],
                ["参考价格", formatPrice(tm.price)],
              ].map(([label, value]) => (
                <div key={label} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div className="text-xs text-gray-400 mb-1">{label}</div>
                  <div className={`text-sm font-semibold ${label === "参考价格" ? "text-[var(--color-accent)] text-xl" : ""}`}>
                    {value}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <ConsultButton trademarkId={tm.id} trademarkName={tm.name} />
              <CompareButton trademarkId={tm.id} variant="solid" />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[var(--container-max)] mx-auto px-4 pb-12">
        <div className="flex border-b border-gray-200 mb-6">
          {[
            { key: "info" as const, label: "商标信息" },
            { key: "items" as const, label: "商品/服务项目" },
            { key: "process" as const, label: "流程说明" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-5 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
                tab === t.key
                  ? "border-[var(--color-primary)] text-[var(--color-primary)] font-semibold"
                  : "border-transparent text-gray-500"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "info" && (
          <>
            <div className="bg-white rounded-2xl border border-gray-200 mb-6 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 font-bold">基本信息</div>
              <div className="p-6 grid sm:grid-cols-2 gap-4">
                {[
                  ["商标名称", tm.name],
                  ["注册号", tm.registrationNo],
                  ["国际分类", `第${tm.categoryCode}类`],
                  ["类似群组", tm.similarGroups],
                  ["申请日期", tm.applyDate],
                  ["注册日期", tm.registerDate],
                  ["有效期至", tm.expireDate],
                  ["申请人", tm.applicant],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-3 py-2">
                    <span className="text-sm text-gray-400 w-20 shrink-0">{k}</span>
                    <span className="text-sm font-semibold">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {tm.aiScore && (
              <div className="rounded-2xl p-[2px] bg-gradient-to-br from-[var(--color-secondary)] via-[var(--color-primary)] to-[var(--color-accent)]">
                <div className="bg-white rounded-2xl p-8">
                  <div className="flex items-center gap-2 mb-5">
                    <Sparkles className="w-5 h-5 text-[var(--color-secondary)]" />
                    <h2 className="text-lg font-bold">AI 智能评价</h2>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex flex-col items-center bg-gray-50 rounded-2xl px-8 py-6">
                      <div className="text-5xl font-extrabold text-[var(--color-secondary)]">
                        {tm.aiScore}<span className="text-2xl ml-1">分</span>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">综合评分</div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {tm.aiTags?.map((tag) => (
                          <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium text-white bg-[var(--color-primary)]">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{tm.aiEvaluation}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {tab === "items" && (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="text-left px-6 py-3 font-semibold text-gray-500">序号</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-500">商品/服务项目</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-500">类似群组</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {tm.items.map((item, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-3 text-gray-400 font-mono">{i + 1}</td>
                    <td className="px-6 py-3 font-medium">{item.name}</td>
                    <td className="px-6 py-3 text-gray-500 font-mono">{item.group}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "process" && (
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="text-lg font-bold mb-6">商标转让流程</h2>
            <div className="space-y-6">
              {[
                ["确认商标信息", "核实商标注册状态、有效期、类别等核心信息"],
                ["签署转让协议", "买卖双方签署商标转让协议，明确转让价格与权利范围"],
                ["提交转让申请", "向国家知识产权局商标局提交转让申请材料"],
                ["核准公告", "商标局核准转让并公告，受让人取得商标专用权"],
              ].map(([title, desc], i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{title}</h3>
                    <p className="text-sm text-gray-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {similar.length > 0 && (
          <div className="mt-12">
            <h3 className="text-lg font-bold mb-4">相似推荐</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {similar.map((s) => (
                <Link key={s.id} href={`/pc/detail/${s.id}`} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <TrademarkLogo initial={s.initial} gradient={s.gradient} size="sm" />
                  <div className="font-bold mt-2">{s.name}</div>
                  <div className="text-sm text-[var(--color-accent)] font-bold mt-1">{formatPrice(s.price)}</div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
