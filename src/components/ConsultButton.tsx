"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { createInquiry } from "@/hooks/useAuth";

export function ConsultButton({
  trademarkId,
  trademarkName,
  className = "",
}: {
  trademarkId: string;
  trademarkName: string;
  className?: string;
}) {
  const [done, setDone] = useState(false);
  const router = useRouter();

  return (
    <button
      type="button"
      disabled={done}
      onClick={async () => {
        const res = await createInquiry(
          trademarkId,
          `我想咨询「${trademarkName}」的转让事宜`,
        );
        if (res.needLogin) {
          router.push("/pc/login");
          return;
        }
        setDone(true);
        alert("咨询已提交，顾问将尽快联系您！");
      }}
      className={`inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full text-white font-semibold text-base transition-all hover:shadow-xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-hover)] disabled:opacity-70 ${className}`}
    >
      <MessageCircle className="w-5 h-5" />
      {done ? "已提交咨询" : "立即咨询"}
    </button>
  );
}
