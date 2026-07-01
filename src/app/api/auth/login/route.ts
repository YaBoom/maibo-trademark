import { NextResponse } from "next/server";
import { getSessionCookieName } from "@/lib/auth";
import { DEMO_USERS } from "@/lib/seed";

export async function POST() {
  const user = DEMO_USERS[0];
  const res = NextResponse.json({ user });
  res.cookies.set(getSessionCookieName(), user.id, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
