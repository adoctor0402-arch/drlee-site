import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "第一次門診要準備什麼" };

export default function Page() {
  return <ComingSoon eyebrow="Your First Visit" title="第一次門診要準備什麼" />;
}
