import type { Metadata } from "next";
import { SkyApp } from "@/components/sky/sky-app";

export const metadata: Metadata = {
  title: "你們的星空｜自然懷孕機率試算",
  description:
    "被診斷不孕，不代表只能靠治療。依據英國亞伯丁大學 7,086 對伴侶的研究（Cameron et al., HRO 2026），估算一年內自然懷孕並活產的機率。7 個問題、約 30 秒，資料只在你的裝置上計算。",
  openGraph: {
    title: "你們的星空｜自然懷孕機率試算",
    description: "7 個問題，估算你們一年內自然懷孕並生下寶寶的機率。小王子醫師 Dr. Lee",
    type: "website",
  },
};

export default function SkyPage() {
  return <SkyApp />;
}
