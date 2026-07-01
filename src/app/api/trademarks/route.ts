import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const result = store.listTrademarks({
    q: sp.get("q") ?? undefined,
    category: sp.get("category")
      ? sp.get("category") === "all"
        ? "all"
        : Number(sp.get("category"))
      : "all",
    scene: sp.get("scene") ?? undefined,
    sort: (sp.get("sort") as "default") ?? "default",
    page: Number(sp.get("page") ?? 1),
    pageSize: Number(sp.get("pageSize") ?? 20),
    hot: sp.get("hot") === "1",
    deal: sp.get("deal") === "1",
  });
  return NextResponse.json(result);
}
