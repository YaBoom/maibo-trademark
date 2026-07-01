import Link from "next/link";

export function Logo({ href = "/pc", compact }: { href?: string; compact?: boolean }) {
  return (
    <Link href={href} className="flex items-center gap-2.5 no-underline">
      <div className="logo-circle">MB</div>
      {!compact && (
        <span className="text-base font-bold text-gray-900 hidden sm:inline">
          脉搏跳动商标超市
        </span>
      )}
    </Link>
  );
}

export function TrademarkLogo({
  initial,
  gradient,
  size = "md",
}: {
  initial: string;
  gradient: string;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  const sizes = {
    sm: "w-12 h-12 text-lg rounded-xl",
    md: "w-16 h-16 text-2xl rounded-full",
    lg: "w-20 h-20 text-3xl rounded-full",
    xl: "w-48 h-48 text-6xl rounded-full",
  };
  return (
    <div
      className={`bg-gradient-to-br ${gradient} ${sizes[size]} flex items-center justify-center text-white font-bold shrink-0`}
    >
      {initial}
    </div>
  );
}

export function formatPrice(price: number) {
  return `¥${price.toLocaleString("zh-CN")}`;
}

export function categoryBadge(code: number, name: string) {
  return `${String(code).padStart(2, "0")}类 ${name}`;
}
