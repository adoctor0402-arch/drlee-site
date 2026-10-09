import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComingSoon } from "@/components/coming-soon";
import { MdArticle } from "@/components/md-article";
import { topics } from "@/config/content";
import { getNotes } from "@/lib/notes";
import { getTopicPage } from "@/lib/topics";

// SEO 友善的主題頁：/infertility、/egg-freezing、/pgt-a …（Spec §29）
// 內容寫在 content/topics/<slug>.md；還沒寫的主題自動顯示「整理中」。
export const dynamicParams = false;

export function generateStaticParams() {
  return topics.map((t) => ({ topic: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[topic]">): Promise<Metadata> {
  const { topic } = await params;
  const t = topics.find((x) => x.slug === topic);
  const page = getTopicPage(topic);
  return {
    title: page?.heading ?? t?.label,
    description: page?.summary,
    alternates: { canonical: `/${topic}` },
    openGraph: page ? { title: page.heading, description: page.summary, type: "article" } : undefined,
  };
}

export default async function Page({ params }: PageProps<"/[topic]">) {
  const { topic } = await params;
  const t = topics.find((x) => x.slug === topic);
  if (!t) notFound();

  const page = getTopicPage(topic);
  if (!page) return <ComingSoon eyebrow={t.label} title={t.problem} />;

  const all = getNotes();
  const related = page.notes.map((slug) => all.find((n) => n.slug === slug)).filter((n) => n !== undefined);

  return (
    <MdArticle
      page={page}
      eyebrow={t.label}
      backHref="/#help"
      backLabel="我可以怎麼幫你"
      relatedNotes={related}
      relatedHeading="這個主題底下的備孕筆記"
      relatedLede="每一篇都把一個問題拆開來談，附上原始文獻。"
      sourcePath={`content/topics/${page.slug}.md`}
    />
  );
}
