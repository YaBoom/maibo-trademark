"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, MessageCircle, GitCompare } from "lucide-react";
import type { Trademark, Inquiry } from "@/lib/types";
import { useAuth } from "@/hooks/useAuth";
import { TrademarkLogo, formatPrice } from "@/components/shared";
import { MobileHeader } from "../layout";

export default function ProfilePage() {
  const { user, login, logout, loading } = useAuth();
  const router = useRouter();
  const [favorites, setFavorites] = useState<Trademark[]>([]);
  const [compare, setCompare] = useState<Trademark[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  useEffect(() => {
    if (!user) return;
    fetch("/api/favorites").then((r) => r.json()).then((d) => setFavorites(d.items ?? []));
    fetch("/api/compare").then((r) => r.json()).then((d) => setCompare(d.items ?? []));
    fetch("/api/inquiries").then((r) => r.json()).then((d) => setInquiries(d.items ?? []));
  }, [user]);

  if (loading) {
    return <div className="p-8 text-center text-gray-400 text-sm">加载中...</div>;
  }

  if (!user) {
    return (
      <>
        <MobileHeader title="我的" />
        <div className="px-6 py-16 text-center">
          <div className="logo-circle w-16 h-16 text-xl mx-auto mb-4">MB</div>
          <h2 className="text-lg font-bold mb-2">登录后体验完整功能</h2>
          <p className="text-xs text-gray-500 mb-6">收藏 · 对比 · 咨询记录</p>
          <button
            onClick={async () => { await login(); router.refresh(); }}
            className="w-full py-3 rounded-full bg-[#07C160] text-white font-semibold text-sm flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" /> 微信登录
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <MobileHeader title="我的" />

      <div className="px-4 py-5 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold">
            {user.avatar}
          </div>
          <div>
            <div className="font-bold text-lg">{user.name}</div>
            <div className="text-xs opacity-80">{user.phone ?? user.wechatId}</div>
          </div>
        </div>
        <button onClick={() => logout()} className="mt-3 text-xs opacity-70 underline">退出登录</button>
      </div>

      <div className="flex justify-around py-4 bg-white border-b border-gray-100">
        {[
          { icon: Heart, label: "收藏", count: favorites.length },
          { icon: GitCompare, label: "对比", count: compare.length },
          { icon: MessageCircle, label: "咨询", count: inquiries.length },
        ].map(({ icon: Icon, label, count }) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <Icon className="w-5 h-5 text-[var(--color-primary)]" />
            <span className="text-sm font-bold">{count}</span>
            <span className="text-[10px] text-gray-500">{label}</span>
          </div>
        ))}
      </div>

      {favorites.length > 0 && (
        <div className="px-4 py-4">
          <div className="text-sm font-semibold mb-3">我的收藏</div>
          <div className="space-y-2">
            {favorites.map((tm) => (
              <Link key={tm.id} href={`/m/detail/${tm.id}`} className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm">
                <TrademarkLogo initial={tm.initial} gradient={tm.gradient} size="sm" />
                <div className="flex-1">
                  <div className="text-sm font-semibold">{tm.name}</div>
                  <div className="text-xs text-red-500 font-bold">{formatPrice(tm.price)}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {inquiries.length > 0 && (
        <div className="px-4 py-4">
          <div className="text-sm font-semibold mb-3">咨询记录</div>
          <div className="space-y-2">
            {inquiries.map((inq) => (
              <div key={inq.id} className="bg-white rounded-lg p-3 shadow-sm text-xs">
                <div className="font-semibold text-sm">{inq.trademarkName}</div>
                <div className="text-gray-500 mt-1">{inq.message}</div>
                <div className="text-gray-400 mt-1">{new Date(inq.createdAt).toLocaleString("zh-CN")}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {favorites.length === 0 && inquiries.length === 0 && (
        <div className="px-4 py-12 text-center text-gray-400 text-sm">
          暂无收藏和咨询记录，去{" "}
          <Link href="/m/market" className="text-[var(--color-primary)]">商标市场</Link>{" "}
          看看吧
        </div>
      )}
    </>
  );
}
