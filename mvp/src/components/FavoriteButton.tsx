"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { toggleFavorite } from "@/hooks/useAuth";

export function FavoriteButton({
  trademarkId,
  initial = false,
  size = 18,
}: {
  trademarkId: string;
  initial?: boolean;
  size?: number;
}) {
  const [active, setActive] = useState(initial);
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const res = await toggleFavorite(trademarkId);
        if (res.needLogin) {
          router.push("/pc/login");
          return;
        }
        setActive(res.added);
      }}
      className="p-1.5 rounded-lg transition-colors"
    >
      <Heart
        width={size}
        height={size}
        className={active ? "fill-red-500 text-red-500" : "text-gray-400"}
      />
    </button>
  );
}
