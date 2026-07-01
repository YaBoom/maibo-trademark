"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GitCompare } from "lucide-react";
import { toggleCompare } from "@/hooks/useAuth";

export function CompareButton({
  trademarkId,
  initial = false,
  label,
  variant = "outline",
}: {
  trademarkId: string;
  initial?: boolean;
  label?: string;
  variant?: "outline" | "solid";
}) {
  const [active, setActive] = useState(initial);
  const router = useRouter();

  const base =
    variant === "solid"
      ? "inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 font-semibold text-base transition-all border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-gray-50"
      : "inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium border-gray-200 text-gray-600 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]";

  return (
    <button
      type="button"
      onClick={async () => {
        const res = await toggleCompare(trademarkId);
        if (res.needLogin) {
          router.push("/pc/login");
          return;
        }
        setActive(res.added);
        if (res.error) alert(res.error);
      }}
      className={`${base} ${active ? "bg-[var(--color-primary-subtle)] border-[var(--color-primary)] text-[var(--color-primary)]" : ""}`}
    >
      <GitCompare className="w-4 h-4" />
      {label ?? (active ? "已加入对比" : "加入对比")}
    </button>
  );
}
