import { cookies } from "next/headers";
import type { User } from "./types";
import { DEMO_USERS } from "./seed";

const SESSION_COOKIE = "maibo_session";

export async function getSessionUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const userId = cookieStore.get(SESSION_COOKIE)?.value;
  if (!userId) return null;
  return DEMO_USERS.find((u) => u.id === userId) ?? null;
}

export function getSessionCookieName() {
  return SESSION_COOKIE;
}

export function findUserById(id: string): User | undefined {
  return DEMO_USERS.find((u) => u.id === id);
}
