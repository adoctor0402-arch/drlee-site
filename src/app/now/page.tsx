import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "What I'm Working On", alternates: { canonical: "/now" } };

export default function Page() {
  return <ComingSoon eyebrow="/now" title="What I'm Working On" />;
}
