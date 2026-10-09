import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";
import { MdArticle } from "@/components/md-article";
import { getNotes } from "@/lib/notes";
import { getStandalonePage } from "@/lib/topics";

export async function generateMetadata(): Promise<Metadata> {
  const page = getStandalonePage("lab");
  return {
    title: page?.heading ?? "Dr. Lee Lab",
    description: page?.summary,
    alternates: { canonical: "/lab" },
  };
}

export default function Page() {
  const page = getStandalonePage("lab");
  if (!page) return <ComingSoon eyebrow="Dr. Lee Lab" title="Dr. Lee Lab" />;

  const all = getNotes();
  const related = page.notes.map((s) => all.find((n) => n.slug === s)).filter((n) => n !== undefined);

  return (
    <MdArticle
      page={page}
      eyebrow="Dr. Lee Lab"
      backHref="/"
      backLabel="回到首頁"
      keyPointsHeading="這一頁的重點"
      relatedNotes={related}
      relatedHeading="相關的備孕筆記"
      ctaTitle="想知道這些研究跟你的狀況有什麼關係？"
      sourcePath="content/pages/lab.md"
    />
  );
}
