import { Suspense } from "react";

export default function MobileMarketWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<div className="p-8 text-center text-gray-400 text-sm">加载中...</div>}>{children}</Suspense>;
}
