import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "脉搏跳动商标超市 - MVP Demo",
  description: "全国商标交易与知识产权服务平台 MVP 演示",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
