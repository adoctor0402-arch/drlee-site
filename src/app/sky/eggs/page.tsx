import type { Metadata } from "next";
import { EggsApp } from "@/components/sky/eggs-app";

export const metadata: Metadata = {
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
