import Link from "next/link";
import { Logo } from "@/components/shared";
import { LoginButton } from "@/components/LoginButton";

const navItems = [
  { href: "/pc", label: "首页", exact: true },
  { href: "/pc/market", label: "商标市场" },
  { href: "/pc/grid-tool", label: "九宫格工具" },
];

export default function PcLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-[var(--container-max)] mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          <Logo href="/pc" />
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-subtle)] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <LoginButton />
        </div>
      </nav>
      <main>{children}</main>
      <footer className="bg-gray-900 text-gray-400 mt-16">
        <div className="max-w-[var(--container-max)] mx-auto px-4 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="logo-circle">MB</div>
                <span className="text-white font-bold">脉搏跳动商标超市</span>
              </div>
              <p className="text-sm leading-relaxed">
                全国商标交易与知识产权服务平台 MVP Demo
              </p>
            </div>
            <div>
              <h4 className="text-white text-sm font-bold mb-4">快速链接</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/pc/market" className="hover:text-white">商标市场</Link></li>
                <li><Link href="/pc/grid-tool" className="hover:text-white">九宫格工具</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-sm font-bold mb-4">其他端</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/m" className="hover:text-white">小程序原型</Link></li>
                <li><Link href="/" className="hover:text-white">入口选择</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-gray-700 text-xs text-center">
            © 2026 脉搏跳动商标超市 · MVP Demo · 内存数据存储
          </div>
        </div>
      </footer>
    </div>
  );
}
