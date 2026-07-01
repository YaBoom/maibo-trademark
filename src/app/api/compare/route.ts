import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { store } from "@/lib/store";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "请先登录" }, { status: 401 });
  return NextResponse.json({ items: store.getCompare(user.id) });
}

export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "请先登录" }, { status: 401 });

  try {
    const { trademarkId } = await req.json();
    const added = store.toggleCompare(user.id, trademarkId);
    return NextResponse.json({ added, items: store.getCompare(user.id) });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "操作失败" },
      { status: 400 },
    );
  }
}
