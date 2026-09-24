import { notFound } from "next/navigation";
import { ComingSoon } from "@/components/coming-soon";
import { topics } from "@/config/content";

// SEO 友善的主題頁：/infertility、/egg-freezing、/pgt-a …（Spec §29）
export const dynamicParams = false;

export function generateStaticParams() {
  return topics.map((t) => ({ topic: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[topic]">) {
  const { topic } = await params;
  return { title: topics.find((t) => t.slug === topic)?.label, alternates: { canonical: `/${topic}` } };
}

export default async function Page({ params }: PageProps<"/[topic]">) {
  const { topic } = await params;
  const t = topics.find((x) => x.slug === topic);
  if (!t) notFound();
  return <ComingSoon eyebrow={t.label} title={t.problem} />;
}
