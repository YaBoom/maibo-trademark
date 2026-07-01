import Link from "next/link";
import { MobileTabBar } from "@/components/MobileTabBar";

export default function MobileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-200 flex justify-center items-start py-10">
      <div className="phone-frame">
        <div className="flex-1 overflow-y-auto pb-[84px]">{children}</div>
        <MobileTabBar />
      </div>
    </div>
  );
}

export function MobileHeader({
  title,
  backHref,
  right,
}: {
  title: string;
  backHref?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 bg-white sticky top-0 z-40">
      {backHref ? (
        <Link href={backHref} className="text-gray-600 text-sm">
          ← 返回
        </Link>
      ) : (
        <div className="text-lg font-bold">
          <span className="text-gray-900">脉搏</span>
          <span className="text-[var(--color-primary)]">跳动</span>
        </div>
      )}
      <div className="font-semibold text-sm">{title}</div>
      <div className="w-10">{right}</div>
    </div>
  );
}
