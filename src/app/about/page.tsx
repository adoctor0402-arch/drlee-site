import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "關於我" };

export default function Page() {
  return <ComingSoon eyebrow="About Dr. Lee" title="關於我" />;
}
