import Link from "next/link";
import { Sparkles, Zap } from "lucide-react";
import { store } from "@/lib/store";
import { TrademarkLogo, categoryBadge, formatPrice } from "@/components/shared";
import { MobileHeader } from "./layout";

export default function MobileHomePage() {
  const recommended = store.listTrademarks({ hot: true, pageSize: 4 }).items;
  const deals = store.listTrademarks({ deal: true, pageSize: 4 }).items;

  return (
    <>
      <MobileHeader title="" />

      <div className="px-4 pb-3">
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2.5 gap-2">
          <span className="text-xs text-gray-400 flex-1">搜索商标名/行业/注册号</span>
          <Link href="/m/market" className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </Link>
        </div>
      </div>

      <div className="px-4 mb-4">
        <Link
          href="/m/ai-picker"
          className="block rounded-xl p-5 hero-gradient text-white relative overflow-hidden"
        >
          <div className="text-lg font-bold mb-1">AI 3秒帮你选商标</div>
          <div className="text-xs opacity-85 mb-3">描述你的需求，智能匹配最合适的商标</div>
          <span className="inline-block bg-white text-[var(--color-primary)] px-5 py-2 rounded-full text-xs font-semibold">
            立即体验
          </span>
        </Link>
      </div>

      <div className="px-4 mb-4 grid grid-cols-2 gap-2">
        {[
          { label: "电商入驻", sub: "天猫/京东/拼多多", href: "/m/market?scene=ecommerce", color: "bg-orange-50" },
          { label: "餐饮开店", sub: "奶茶/火锅/快餐", href: "/m/market?scene=food", color: "bg-teal-50" },
          { label: "品牌升级", sub: "爆款标/组合标", href: "/m/market", color: "bg-blue-50" },
          { label: "商标猎头", sub: "帮我找标", href: "/m/ai-picker", color: "bg-purple-50" },
        ].map((s) => (
          <Link key={s.label} href={s.href} className={`${s.color} rounded-lg p-3 block`}>
            <div className="text-xs font-semibold text-gray-900">{s.label}</div>
            <div className="text-[10px] text-gray-400 mt-0.5">{s.sub}</div>
          </Link>
        ))}
      </div>

      <div className="px-4 mb-3 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Sparkles className="w-4 h-4 text-[var(--color-primary)]" />
          <span className="text-sm font-bold">为你推荐</span>
          <span className="text-[10px] text-[var(--color-primary)] bg-[var(--color-primary-light)] px-1.5 py-0.5 rounded-full">AI</span>
        </div>
        <Link href="/m/market" className="text-xs text-gray-500">换一批 ›</Link>
      </div>

      <div className="grid grid-cols-2 gap-2.5 px-4 mb-5">
        {recommended.map((tm) => (
          <Link key={tm.id} href={`/m/detail/${tm.id}`} className="bg-white rounded-xl p-3.5 shadow-sm block">
            <TrademarkLogo initial={tm.initial} gradient={tm.gradient} size="sm" />
            <div className="text-sm font-semibold mt-2">{tm.name}</div>
            <span className="text-[10px] text-[var(--color-primary)] bg-[var(--color-primary-light)] px-2 py-0.5 rounded-full">
              {categoryBadge(tm.categoryCode, tm.categoryName)}
            </span>
            <div className="text-base font-bold text-red-500 mt-1">{formatPrice(tm.price)}</div>
          </Link>
        ))}
      </div>

      <div className="px-4 mb-3 flex items-center gap-1">
        <Zap className="w-4 h-4 text-[var(--color-accent)]" />
        <span className="text-sm font-bold">精选特价</span>
      </div>

      <div className="flex gap-2.5 px-4 pb-4 overflow-x-auto no-scrollbar">
        {deals.map((tm) => (
          <Link key={tm.id} href={`/m/detail/${tm.id}`} className="shrink-0 w-[200px] bg-white rounded-xl overflow-hidden shadow-sm block">
            <div className={`h-[100px] bg-gradient-to-br ${tm.gradient} flex items-center justify-center relative`}>
              <span className="text-2xl font-bold text-white">{tm.initial}</span>
              <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded font-semibold">特价</span>
            </div>
            <div className="p-3">
              <div className="text-xs font-semibold">{tm.name}</div>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-sm font-bold text-red-500">{formatPrice(tm.price)}</span>
                {tm.originalPrice && (
                  <span className="text-[10px] text-gray-400 line-through">{formatPrice(tm.originalPrice)}</span>
                )}
              </div>
              {tm.dealTag && (
                <span className="text-[10px] text-[var(--color-accent)] bg-orange-50 px-1.5 py-0.5 rounded mt-1 inline-block">{tm.dealTag}</span>
              )}
            </div>
          </Link>
        ))}
      </div>

      <div className="mx-4 mb-4 p-4 bg-white rounded-lg border border-gray-100 flex justify-around text-[10px] text-gray-500">
        <span>10000+ 精选商标</span>
        <span>明码标价</span>
        <span>48h极速转让</span>
      </div>
    </>
  );
}
