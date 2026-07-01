import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { store } from "@/lib/store";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "请先登录" }, { status: 401 });
  return NextResponse.json({ items: store.getFavorites(user.id) });
}

export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "请先登录" }, { status: 401 });

  const { trademarkId } = await req.json();
  const added = store.toggleFavorite(user.id, trademarkId);
  return NextResponse.json({ added, items: store.getFavorites(user.id) });
}
