export interface User {
  id: string;
  name: string;
  avatar: string;
  phone?: string;
  wechatId: string;
}

export interface TrademarkItem {
  name: string;
  group: string;
}

export interface RiskItem {
  text: string;
  ok: boolean;
  note?: string;
}

export interface Trademark {
  id: string;
  name: string;
  initial: string;
  registrationNo: string;
  categoryCode: number;
  categoryName: string;
  price: number;
  originalPrice?: number;
  itemCount: number;
  sameNameClasses: number;
  gradient: string;
  status: "available" | "reserved";
  hot?: boolean;
  deal?: boolean;
  dealTag?: string;
  scenes?: string[];
  aiScore?: number;
  aiTags?: string[];
  aiReason?: string;
  aiEvaluation?: string;
  riskScore?: number;
  riskLevel?: "low" | "medium" | "high";
  riskItems?: RiskItem[];
  items: TrademarkItem[];
  applyDate: string;
  registerDate: string;
  expireDate: string;
  applicant: string;
  similarGroups: string;
}

export interface Inquiry {
  id: string;
  userId: string;
  trademarkId: string;
  trademarkName: string;
  message: string;
  createdAt: string;
  status: "pending" | "replied";
}

export interface AiRecommendRequest {
  scene?: string;
  namePref?: string;
  budget?: string;
  note?: string;
}

export interface AiRecommendResult {
  trademark: Trademark;
  matchScore: number;
  reason: string;
}

export interface TrademarkFilters {
  q?: string;
  category?: number | "all";
  scene?: string;
  sort?: "default" | "price-asc" | "price-desc" | "newest" | "hot";
  page?: number;
  pageSize?: number;
  hot?: boolean;
  deal?: boolean;
}
