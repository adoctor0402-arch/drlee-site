import type { MetadataRoute } from "next";
import { topics } from "@/config/content";
import { getNotes } from "@/lib/notes";
import { getPapers } from "@/lib/observatory";
import { siteUrl } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = [
    "",
    "/about",
    "/first-visit",
    "/notes",
    "/observatory",
    "/lab",
    "/now",
    "/sky",
    "/sky/eggs",
  ].map((p) => ({
    url: `${siteUrl}${p}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.8,
  }));
  const topicPages = topics.map((t) => ({
    url: `${siteUrl}/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  const notes = getNotes().map((n) => ({
    url: `${siteUrl}/notes/${n.slug}`,
    lastModified: new Date(`${n.updated}-01`),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));
  const papers = getPapers().map((p) => ({
    url: `${siteUrl}/observatory/${p.pmid}`,
    lastModified: new Date(p.pubdate || now),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));
  return [...pages, ...topicPages, ...notes, ...papers];
}
