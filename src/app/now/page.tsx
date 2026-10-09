import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";
import { MdArticle } from "@/components/md-article";
import { getStandalonePage } from "@/lib/topics";

export async function generateMetadata(): Promise<Metadata> {
  const page = getStandalonePage("now");
  return {
    title: page?.heading ?? "What I'm Working On",
    description: page?.summary,
    alternates: { canonical: "/now" },
  };
}

export default function Page() {
  const page = getStandalonePage("now");
  if (!page) return <ComingSoon eyebrow="/now" title="What I'm Working On" />;

  return (
    <MdArticle
      page={page}
      eyebrow="/now"
      backHref="/"
      backLabel="回到首頁"
      keyPointsHeading=""
      ctaTitle="想找我討論？"
      sourcePath="content/pages/now.md"
    />
  );
}
