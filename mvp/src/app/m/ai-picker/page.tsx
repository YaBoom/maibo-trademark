"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import type { AiRecommendResult } from "@/lib/types";
import { TrademarkLogo, categoryBadge, formatPrice } from "@/components/shared";
import { MobileHeader } from "../layout";

const SCENES = [
  { id: "ecommerce", label: "电商平台" },
  { id: "food", label: "餐饮美食" },
  { id: "tech", label: "科技互联网" },
  { id: "fashion", label: "服装时尚" },
  { id: "education", label: "教育培训" },
  { id: "beauty", label: "美妆个护" },
  { id: "service", label: "生活服务" },
  { id: "other", label: "其他行业" },
];

const NAME_PREFS = [
  { id: "all", label: "不限" },
  { id: "cn-2", label: "2个字" },
  { id: "cn-3", label: "3个字" },
  { id: "en", label: "英文" },
];

const BUDGETS = [
  { id: "all", label: "不限" },
  { id: "under-5k", label: "5千以下" },
  { id: "5k-10k", label: "5千-1万" },
  { id: "10k-30k", label: "1万-3万" },
  { id: "over-30k", label: "3万以上" },
];

export default function AiPickerPage() {
  const [step, setStep] = useState(2);
  const [scene, setScene] = useState("ecommerce");
  const [namePref, setNamePref] = useState("all");
  const [budget, setBudget] = useState("all");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<AiRecommendResult[]>([]);

  const recommend = async () => {
    setLoading(true);
    setStep(3);
    const res = await fetch("/api/ai/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ scene, namePref, budget, note }),
    });
    const data = await res.json();
    setResults(data.results ?? []);
    setLoading(false);
  };

  return (
    <>
      <MobileHeader title="AI 智能选标" backHref="/m" />

      <div className="flex items-center justify-center px-8 py-4 gap-0">
        {[1, 2, 3].map((s, i) => (
          <div key={s} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${
                step > s ? "bg-[var(--color-primary)] text-white" :
                step === s ? "border-2 border-[var(--color-primary)] text-[var(--color-primary)] bg-blue-50" :
                "border-2 border-gray-300 text-gray-300"
              }`}>
                {step > s ? "✓" : s}
              </div>
              <span className={`text-[10px] ${step >= s ? "text-[var(--color-primary)]" : "text-gray-400"}`}>
                {["选行业", "选偏好", "看结果"][i]}
              </span>
            </div>
            {i < 2 && <div className={`w-12 h-0.5 mb-4 ${step > s + 1 ? "bg-[var(--color-primary)]" : "bg-gray-200"}`} />}
          </div>
        ))}
      </div>

      <div className="px-4 mb-2">
        <div className="text-base font-bold">告诉我你的需求</div>
        <div className="text-xs text-gray-500 mt-0.5">选择你感兴趣的选项，AI 会为你精准推荐</div>
      </div>

      <div className="text-sm font-semibold px-4 mt-4 mb-2">你的行业场景</div>
      <div className="grid grid-cols-2 gap-2.5 px-4">
        {SCENES.map((s) => (
          <button
            key={s.id}
            onClick={() => setScene(s.id)}
            className={`rounded-lg border p-3 text-xs font-medium transition-all ${
              scene === s.id ? "border-[var(--color-primary)] bg-[var(--color-primary-subtle)] text-[var(--color-primary)]" : "border-gray-200 text-gray-700"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="text-sm font-semibold px-4 mt-5 mb-2">你想要什么样的名字？</div>
      <div className="flex flex-wrap gap-2 px-4">
        {NAME_PREFS.map((p) => (
          <button key={p.id} onClick={() => setNamePref(p.id)} className={`px-3.5 py-1.5 rounded-full text-xs border ${namePref === p.id ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]" : "border-gray-200 text-gray-600"}`}>
            {p.label}
          </button>
        ))}
      </div>

      <div className="text-sm font-semibold px-4 mt-5 mb-2">预算范围</div>
      <div className="flex flex-wrap gap-2 px-4">
        {BUDGETS.map((b) => (
          <button key={b.id} onClick={() => setBudget(b.id)} className={`px-3.5 py-1.5 rounded-full text-xs border ${budget === b.id ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]" : "border-gray-200 text-gray-600"}`}>
            {b.label}
          </button>
        ))}
      </div>

      <div className="text-sm font-semibold px-4 mt-5 mb-2">补充说明（选填）</div>
      <div className="px-4">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          placeholder="比如：想要好听的、有寓意的、偏年轻化的..."
          className="w-full border border-gray-200 rounded-lg p-3 text-sm outline-none focus:border-[var(--color-primary)] resize-none"
        />
      </div>

      <div className="px-4 mt-5 mb-4">
        <button
          onClick={recommend}
          disabled={loading}
          className="w-full py-3.5 rounded-2xl text-white font-bold text-base hero-gradient shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
        >
          <Sparkles className="w-5 h-5" />
          {loading ? "AI 分析中..." : "AI 为我推荐商标"}
        </button>
      </div>

      {results.length > 0 && (
        <div className="bg-gray-50 pb-6">
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm font-semibold flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-[var(--color-primary)]" />
              AI 已为你匹配 {results.length} 个商标
            </span>
            <span className="text-[10px] text-green-600 bg-green-50 px-2 py-0.5 rounded-full">分析完成</span>
          </div>
          {results.slice(0, 5).map((r) => (
            <Link
              key={r.trademark.id}
              href={`/m/detail/${r.trademark.id}`}
              className="block mx-4 mb-2 p-3.5 bg-white rounded-xl border border-gray-100 relative"
            >
              <span className="absolute top-3 right-3 text-[10px] font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-100">
                {r.matchScore}%匹配
              </span>
              <div className="flex items-center gap-2.5 mb-2">
                <TrademarkLogo initial={r.trademark.initial} gradient={r.trademark.gradient} size="sm" />
                <div>
                  <div className="text-sm font-semibold">{r.trademark.name}</div>
                  <div className="text-[10px] text-gray-500">{categoryBadge(r.trademark.categoryCode, r.trademark.categoryName)}</div>
                </div>
              </div>
              <p className="text-xs text-gray-500 pl-[52px] mb-2">{r.reason}</p>
              <div className="flex justify-between items-center pl-[52px]">
                <span className="text-base font-bold text-red-500">{formatPrice(r.trademark.price)}</span>
                <span className="text-xs text-[var(--color-primary)]">查看详情 ›</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
