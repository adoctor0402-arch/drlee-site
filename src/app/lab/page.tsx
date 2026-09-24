import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "Dr. Lee Lab", alternates: { canonical: "/lab" } };

export default function Page() {
  return <ComingSoon eyebrow="Dr. Lee Lab" title="Dr. Lee Lab" />;
}
