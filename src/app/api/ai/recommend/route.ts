import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/store";
import type { AiRecommendRequest } from "@/lib/types";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as AiRecommendRequest;
  const results = store.aiRecommend(body);
  return NextResponse.json({ results, total: results.length });
}
