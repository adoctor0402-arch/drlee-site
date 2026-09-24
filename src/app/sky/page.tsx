import type { Metadata } from "next";
import { SkyHub } from "@/components/sky/hub";

export const metadata: Metadata = {
  alternates: { canonical: "/sky" },
  title: "小王子醫師的星空｜生育力試算工具",
  description:
    "兩個以近年國際研究為基礎的生育力試算工具：自然懷孕機率，以及凍卵後的累積活產機率。30 秒完成，資料只在你的裝置上計算。",
  openGraph: {
    title: "小王子醫師的星空｜生育力試算工具",
    description: "兩個以近年國際研究為基礎的生育力試算工具。30 秒完成，資料只在你的裝置上計算。",
    type: "website",
  },
};

export default function SkyIndexPage() {
  return <SkyHub />;
}
