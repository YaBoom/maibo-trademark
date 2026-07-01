"use client";

import { useCallback, useEffect, useState } from "react";
import type { User } from "@/lib/types";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const res = await fetch("/api/auth/me");
    const data = await res.json();
    setUser(data.user ?? null);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const login = async () => {
    const res = await fetch("/api/auth/login", { method: "POST" });
    const data = await res.json();
    setUser(data.user);
    return data.user as User;
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
  };

  return { user, loading, login, logout, refresh };
}

export async function toggleFavorite(trademarkId: string) {
  const res = await fetch("/api/favorites", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ trademarkId }),
  });
  if (res.status === 401) return { needLogin: true };
  return res.json();
}

export async function toggleCompare(trademarkId: string) {
  const res = await fetch("/api/compare", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ trademarkId }),
  });
  if (res.status === 401) return { needLogin: true };
  return res.json();
}

export async function createInquiry(trademarkId: string, message?: string) {
  const res = await fetch("/api/inquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ trademarkId, message }),
  });
  if (res.status === 401) return { needLogin: true };
  return res.json();
}
