import type { Metadata } from "next";
import { EggsApp } from "@/components/sky/eggs-app";

// 尚未公開：目前只有知道網址的人看得到，不進 sitemap、不讓搜尋引擎收錄。
// 要正式上線時，把 robots 這一行刪掉，並把 /sky/eggs 加回 src/app/sitemap.ts。
export const metadata: Metadata = {
  robots: { index: false, follow: false },
  alternates: { canonical: "/sky/eggs" },
  title: "我的卵子，夠不夠？｜凍卵累積活產機率試算",
  description:
    "輸入凍卵當時年齡與成熟卵子數，依 NYU 2024 年 731 位實際解凍患者的研究（Cascante et al., JARG 2024），估算至少迎來一個寶寶的累積機率區間。",
  openGraph: {
    title: "我的卵子，夠不夠？｜凍卵累積活產機率試算",
    description: "輸入凍卵年齡與成熟卵子數，估算至少迎來一個寶寶的累積機率區間。小王子醫師 Dr. Lee",
    type: "website",
  },
};

export default function EggsPage() {
  return <EggsApp />;
}
