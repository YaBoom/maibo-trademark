"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Sparkles, User } from "lucide-react";

const tabs = [
  { href: "/m", label: "首页", icon: Home, exact: true },
  { href: "/m/market", label: "商标市场", icon: LayoutGrid },
  { href: "/m/ai-picker", label: "AI选标", icon: Sparkles },
  { href: "/m/profile", label: "我的", icon: User },
];

export function MobileTabBar() {
  const pathname = usePathname();
  const hidden = pathname.includes("/detail") || pathname.includes("/login");

  if (hidden) return null;

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex items-start justify-around pt-2 pb-7 z-50">
      {tabs.map(({ href, label, icon: Icon, exact }) => {
        const active = exact ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center gap-0.5 w-16 ${active ? "text-[var(--color-primary)]" : "text-gray-400"}`}
          >
            <Icon className="w-5 h-5" strokeWidth={active ? 2.5 : 2} />
            <span className={`text-[10px] ${active ? "font-semibold" : ""}`}>{label}</span>
          </Link>
        );
      })}
    </div>
  );
}
