"use client";

import { useRouter } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const { user, login } = useAuth();
  const router = useRouter();

  if (user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="logo-circle w-16 h-16 text-xl mx-auto mb-4">{user.avatar}</div>
        <h1 className="text-2xl font-bold mb-2">已登录</h1>
        <p className="text-gray-500 mb-8">欢迎，{user.name}</p>
        <button
          onClick={() => router.push("/pc/market")}
          className="px-8 py-3 rounded-full bg-[var(--color-primary)] text-white font-semibold"
        >
          进入商标市场
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg text-center">
        <div className="logo-circle w-16 h-16 text-xl mx-auto mb-6">MB</div>
        <h1 className="text-2xl font-bold mb-2">微信登录</h1>
        <p className="text-sm text-gray-500 mb-8">
          Demo 模式：点击登录即可模拟微信授权，体验收藏、对比、咨询等完整流程
        </p>
        <button
          onClick={async () => {
            await login();
            router.push("/pc/market");
          }}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-white font-semibold bg-[#07C160] hover:bg-[#06AD56] transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          微信一键登录
        </button>
        <p className="mt-6 text-xs text-gray-400">
          登录后可使用：收藏 · 对比 · 咨询 · 九宫格调价
        </p>
      </div>
    </div>
  );
}
