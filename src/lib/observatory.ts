import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const DIR = path.join(process.cwd(), "content", "observatory");

export type Paper = {
  pmid: string;
  title: string;
  titleEn: string;
  journal: string;
  pubdate: string;
  firstAuthor: string;
  doi: string;
  url: string;
  topic: string;
  takeaways: string[];
  draft: boolean;
  fetchedAt: string;
  html: string;
};

function parse(file: string): Paper {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const { data, content } = matter(raw);
  return {
    pmid: String(data.pmid ?? file.replace(/\.md$/, "")),
    title: String(data.title ?? ""),
    titleEn: String(data.titleEn ?? ""),
    journal: String(data.journal ?? ""),
    pubdate: String(data.pubdate ?? ""),
    firstAuthor: String(data.firstAuthor ?? ""),
    doi: String(data.doi ?? ""),
    url: String(data.url ?? ""),
    topic: String(data.topic ?? "最新研究"),
    takeaways: Array.isArray(data.takeaways) ? data.takeaways.map(String) : [],
    draft: Boolean(data.draft),
    fetchedAt: String(data.fetchedAt ?? ""),
    // 移除審稿用的 HTML 註解（原文摘要），不讓它進到網頁原始碼
    html: marked.parse(content.replace(/<!--[\s\S]*?-->/g, ""), { async: false }) as string,
  };
}

/** 已審核發布的論文，新的在前面 */
export function getPapers(): Paper[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map(parse)
    .filter((p) => !p.draft)
    .sort((a, b) => b.pubdate.localeCompare(a.pubdate));
}

/** 待審核的篇數（只在本機開發時顯示提醒用） */
export function countPending(): number {
  if (!fs.existsSync(DIR)) return 0;
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map(parse)
    .filter((p) => p.draft).length;
}

export function getPaper(pmid: string): Paper | undefined {
  return getPapers().find((p) => p.pmid === pmid);
}

export function getTopics(): { name: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const p of getPapers()) counts.set(p.topic, (counts.get(p.topic) ?? 0) + 1);
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function formatDate(d: string) {
  const [y, m] = d.split("-");
  return m ? `${y} 年 ${Number(m)} 月` : d;
}
