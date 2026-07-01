"use client";

import { useRouter } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export function LoginButton({
  className = "",
  redirect,
}: {
  className?: string;
  redirect?: string;
}) {
  const { user, login, logout } = useAuth();
  const router = useRouter();

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600 hidden sm:inline">
          {user.name}
        </span>
        <button
          onClick={() => logout()}
          className={`text-sm text-gray-500 hover:text-gray-700 ${className}`}
        >
          退出
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={async () => {
        await login();
        if (redirect) router.push(redirect);
      }}
      className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold text-white bg-[#07C160] hover:bg-[#06AD56] transition-colors ${className}`}
    >
      <MessageCircle className="w-4 h-4" />
      微信登录
    </button>
  );
}
