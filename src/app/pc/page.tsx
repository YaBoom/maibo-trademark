import Link from "next/link";
import { ArrowRight, Search, Shield, Sparkles, Zap } from "lucide-react";
import { store } from "@/lib/store";
import { TrademarkLogo, categoryBadge, formatPrice } from "@/components/shared";
import { FavoriteButton } from "@/components/FavoriteButton";

export default function PcHomePage() {
  const hot = store.listTrademarks({ hot: true, pageSize: 4 }).items;

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="max-w-[var(--container-max)] mx-auto">
          <div className="flex flex-col lg:flex-row min-h-[480px]">
            <div className="hero-gradient w-full lg:w-[55%] px-6 sm:px-10 lg:px-16 py-16 flex flex-col justify-center text-white">
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
                AI 智能选标
              </h1>
              <p className="text-lg opacity-90 mb-3">更快、更准地找到心仪商标</p>
              <p className="text-sm opacity-75 max-w-lg mb-8 leading-relaxed">
                全国商标交易与知识产权服务平台，AI 辅助推荐，让商标选择更精准。
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/pc/market"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-bold bg-white text-[var(--color-primary)] hover:shadow-lg transition-all"
                >
                  立即选标 <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/m/ai-picker"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-bold border-2 border-white/60 hover:bg-white/10 transition-all"
                >
                  AI 选标体验
                </Link>
              </div>
            </div>
            <div className="w-full lg:w-[45%] flex items-center justify-center px-6 py-12 bg-gray-50">
              <div className="w-full max-w-sm aspect-[4/3] rounded-2xl bg-gradient-to-br from-[var(--color-primary-light)] to-[var(--color-secondary)]/20 flex flex-col items-center justify-center">
                <Sparkles className="w-16 h-16 text-[var(--color-primary)] mb-4" />
                <p className="text-sm text-gray-500">AI 智能推荐</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-gray-200 bg-white py-10">
        <div className="max-w-[var(--container-max)] mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Search, value: `${store.trademarks.length}+`, label: "精选商标" },
            { icon: Shield, value: "45 类", label: "全覆盖" },
            { icon: Sparkles, value: "AI 智能", label: "匹配" },
            { icon: Zap, value: "48h", label: "极速转让" },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-primary-light)] flex items-center justify-center">
                <Icon className="w-6 h-6 text-[var(--color-primary)]" />
              </div>
              <div>
                <div className="text-2xl font-extrabold">{value}</div>
                <div className="text-sm text-gray-400">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-[var(--container-max)] mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">核心优势</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { title: "智能推荐", desc: "AI 算法精准分析需求，推荐最匹配方案" },
              { title: "安全交易", desc: "全程资金担保，官方流程透明可查" },
              { title: "极速转让", desc: "签约后 48 小时内完成转让" },
            ].map((f) => (
              <div key={f.title} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <h3 className="font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-[var(--container-max)] mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold">热门推荐</h2>
            <Link href="/pc/market" className="text-sm font-medium text-[var(--color-primary)] flex items-center gap-1">
              查看全部 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {hot.map((tm) => (
              <Link
                key={tm.id}
                href={`/pc/detail/${tm.id}`}
                className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all block"
              >
                <div className="flex items-start justify-between mb-4">
                  <TrademarkLogo initial={tm.initial} gradient={tm.gradient} size="sm" />
                  <FavoriteButton trademarkId={tm.id} />
                </div>
                <h4 className="font-bold text-lg mb-1">{tm.name}</h4>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)]">
                    {categoryBadge(tm.categoryCode, tm.categoryName)}
                  </span>
                  <span className="text-lg font-extrabold text-[var(--color-accent)]">
                    {formatPrice(tm.price)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="hero-gradient py-16 text-center text-white">
        <h2 className="text-3xl font-bold mb-3">准备好找到心仪商标了吗？</h2>
        <p className="opacity-80 mb-8">立即开始 AI 智能选标体验</p>
        <Link href="/pc/login" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-[var(--color-primary)] font-bold hover:shadow-lg transition-all">
          免费注册体验 <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </>
  );
}
