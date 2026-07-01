import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { store } from "@/lib/store";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const tm = store.getTrademark(id);
  if (!tm) return NextResponse.json({ error: "未找到" }, { status: 404 });

  const user = await getSessionUser();
  const similar = store.getSimilar(id);

  return NextResponse.json({
    trademark: tm,
    similar,
    isFavorite: store.isFavorite(user?.id ?? null, id),
    inCompare: store.isInCompare(user?.id ?? null, id),
  });
}
