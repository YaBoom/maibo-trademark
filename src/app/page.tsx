import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EFF4FF] via-white to-[#EEFBF6] flex flex-col items-center justify-center p-8">
      <div className="logo-circle w-16 h-16 text-xl mb-6">MB</div>
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
        脉搏跳动商标超市
      </h1>
      <p className="text-gray-500 mb-10">Next.js 动态 MVP Demo · 内存数据存储</p>

      <div className="grid sm:grid-cols-2 gap-6 max-w-xl w-full">
        <Link
          href="/pc"
          className="group bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl hover:border-primary/30 transition-all"
        >
          <div className="text-4xl mb-4">🖥️</div>
          <h2 className="text-xl font-bold mb-2 group-hover:text-[var(--color-primary)]">
            PC 网站
          </h2>
          <p className="text-sm text-gray-500">
            首页 · 商标市场 · 详情 · 九宫格工具 · 微信登录
          </p>
          <div className="mt-4 text-sm font-semibold text-[var(--color-primary)]">
            进入 PC 端 →
          </div>
        </Link>

        <Link
          href="/m"
          className="group bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl hover:border-primary/30 transition-all"
        >
          <div className="text-4xl mb-4">📱</div>
          <h2 className="text-xl font-bold mb-2 group-hover:text-[var(--color-primary)]">
            小程序原型
          </h2>
          <p className="text-sm text-gray-500">
            首页 · 市场 · AI选标 · 详情 · 我的
          </p>
          <div className="mt-4 text-sm font-semibold text-[var(--color-primary)]">
            进入小程序端 →
          </div>
        </Link>
      </div>

      <p className="mt-12 text-xs text-gray-400">
        演示账号：点击「微信登录」即可体验完整流程 · 数据存储于服务端内存
      </p>
    </div>
  );
}
