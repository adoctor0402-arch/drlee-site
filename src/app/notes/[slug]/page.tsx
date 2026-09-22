import { notFound } from "next/navigation";
import { ComingSoon } from "@/components/coming-soon";
import { sampleNotes } from "@/config/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return sampleNotes.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: PageProps<"/notes/[slug]">) {
  const { slug } = await params;
  return { title: sampleNotes.find((n) => n.slug === slug)?.title };
}

export default async function Page({ params }: PageProps<"/notes/[slug]">) {
  const { slug } = await params;
  const note = sampleNotes.find((n) => n.slug === slug);
  if (!note) notFound();
  return <ComingSoon eyebrow={note.category} title={note.title} note="這篇筆記正在撰寫中。" />;
}
