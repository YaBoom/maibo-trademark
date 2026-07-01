import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { store } from "@/lib/store";

export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "请先登录" }, { status: 401 });

  const body = await req.json();
  const inquiry = store.createInquiry(
    user.id,
    body.trademarkId,
    body.message ?? "我想咨询这个商标的转让事宜",
  );
  return NextResponse.json({ inquiry });
}

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "请先登录" }, { status: 401 });
  return NextResponse.json({ items: store.getInquiries(user.id) });
}
