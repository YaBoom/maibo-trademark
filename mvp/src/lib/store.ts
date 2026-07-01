import type {
  AiRecommendRequest,
  AiRecommendResult,
  Inquiry,
  Trademark,
  TrademarkFilters,
  User,
} from "./types";
import { DEMO_USERS, SEED_TRADEMARKS } from "./seed";

interface UserState {
  favorites: Set<string>;
  compare: Set<string>;
  inquiries: Inquiry[];
}

class MemoryStore {
  trademarks: Trademark[] = [...SEED_TRADEMARKS];
  users: User[] = [...DEMO_USERS];
  userStates = new Map<string, UserState>();

  private ensureUserState(userId: string): UserState {
    if (!this.userStates.has(userId)) {
      this.userStates.set(userId, {
        favorites: new Set(),
        compare: new Set(),
        inquiries: [],
      });
    }
    return this.userStates.get(userId)!;
  }

  listTrademarks(filters: TrademarkFilters = {}) {
    const {
      q,
      category = "all",
      scene,
      sort = "default",
      page = 1,
      pageSize = 20,
      hot,
      deal,
    } = filters;

    let list = [...this.trademarks];

    if (q) {
      const query = q.toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          t.registrationNo.includes(query) ||
          t.categoryName.includes(query),
      );
    }

    if (category !== "all") {
      list = list.filter((t) => t.categoryCode === category);
    }

    if (scene && scene !== "all") {
      list = list.filter((t) => t.scenes?.includes(scene));
    }

    if (hot) list = list.filter((t) => t.hot);
    if (deal) list = list.filter((t) => t.deal);

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        list.sort(
          (a, b) =>
            new Date(b.registerDate).getTime() -
            new Date(a.registerDate).getTime(),
        );
        break;
      case "hot":
        list.sort((a, b) => (b.hot ? 1 : 0) - (a.hot ? 1 : 0));
        break;
    }

    const total = list.length;
    const start = (page - 1) * pageSize;
    const items = list.slice(start, start + pageSize);

    return { items, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
  }

  getTrademark(id: string) {
    return this.trademarks.find((t) => t.id === id) ?? null;
  }

  getSimilar(id: string, limit = 4) {
    const current = this.getTrademark(id);
    if (!current) return [];
    return this.trademarks
      .filter(
        (t) =>
          t.id !== id &&
          (t.categoryCode === current.categoryCode ||
            t.scenes?.some((s) => current.scenes?.includes(s))),
      )
      .slice(0, limit);
  }

  toggleFavorite(userId: string, trademarkId: string) {
    const state = this.ensureUserState(userId);
    if (state.favorites.has(trademarkId)) {
      state.favorites.delete(trademarkId);
      return false;
    }
    state.favorites.add(trademarkId);
    return true;
  }

  getFavorites(userId: string) {
    const state = this.ensureUserState(userId);
    return this.trademarks.filter((t) => state.favorites.has(t.id));
  }

  isFavorite(userId: string | null, trademarkId: string) {
    if (!userId) return false;
    return this.ensureUserState(userId).favorites.has(trademarkId);
  }

  toggleCompare(userId: string, trademarkId: string) {
    const state = this.ensureUserState(userId);
    if (state.compare.has(trademarkId)) {
      state.compare.delete(trademarkId);
      return false;
    }
    if (state.compare.size >= 4) {
      throw new Error("最多对比 4 个商标");
    }
    state.compare.add(trademarkId);
    return true;
  }

  getCompare(userId: string) {
    const state = this.ensureUserState(userId);
    return this.trademarks.filter((t) => state.compare.has(t.id));
  }

  isInCompare(userId: string | null, trademarkId: string) {
    if (!userId) return false;
    return this.ensureUserState(userId).compare.has(trademarkId);
  }

  createInquiry(
    userId: string,
    trademarkId: string,
    message: string,
  ): Inquiry {
    const tm = this.getTrademark(trademarkId);
    if (!tm) throw new Error("商标不存在");

    const inquiry: Inquiry = {
      id: `inq-${Date.now()}`,
      userId,
      trademarkId,
      trademarkName: tm.name,
      message,
      createdAt: new Date().toISOString(),
      status: "pending",
    };

    this.ensureUserState(userId).inquiries.unshift(inquiry);
    return inquiry;
  }

  getInquiries(userId: string) {
    return this.ensureUserState(userId).inquiries;
  }

  aiRecommend(params: AiRecommendRequest): AiRecommendResult[] {
    let list = [...this.trademarks];

    const sceneMap: Record<string, string[]> = {
      ecommerce: ["ecommerce"],
      food: ["food"],
      tech: ["tech"],
      fashion: ["fashion"],
      education: ["education"],
      beauty: ["beauty"],
      service: ["service"],
      other: [],
    };

    if (params.scene && params.scene !== "other") {
      const scenes = sceneMap[params.scene] ?? [params.scene];
      list = list.filter((t) => t.scenes?.some((s) => scenes.includes(s)));
    }

    if (params.budget && params.budget !== "all") {
      const budgetRanges: Record<string, [number, number]> = {
        "under-5k": [0, 5000],
        "5k-10k": [5000, 10000],
        "10k-30k": [10000, 30000],
        "over-30k": [30000, Infinity],
      };
      const range = budgetRanges[params.budget];
      if (range) {
        list = list.filter((t) => t.price >= range[0] && t.price < range[1]);
      }
    }

    if (params.namePref === "cn-2") {
      list = list.filter((t) => /^[\u4e00-\u9fa5]{2}$/.test(t.name));
    } else if (params.namePref === "cn-3") {
      list = list.filter((t) => /^[\u4e00-\u9fa5]{3}$/.test(t.name));
    } else if (params.namePref === "en") {
      list = list.filter((t) => /^[A-Za-z]+$/.test(t.name));
    }

    if (list.length === 0) list = [...this.trademarks];

    return list.slice(0, 12).map((tm, i) => ({
      trademark: tm,
      matchScore: Math.max(75, 96 - i * 3),
      reason: tm.aiReason ?? "综合匹配您的选标需求",
    }));
  }
}

const globalForStore = globalThis as unknown as { __maiboStore?: MemoryStore };

export const store =
  globalForStore.__maiboStore ?? (globalForStore.__maiboStore = new MemoryStore());

export function formatPrice(price: number) {
  return `¥${price.toLocaleString("zh-CN")}`;
}

export function categoryLabel(code: number, name: string) {
  return `${String(code).padStart(2, "0")}类 ${name}`;
}
