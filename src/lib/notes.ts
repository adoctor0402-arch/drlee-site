import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const NOTES_DIR = path.join(process.cwd(), "content", "notes");

export type NoteRef = { text: string; url?: string };

export type NoteMeta = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  updated: string;
  keyPoints: string[];
  references: NoteRef[];
  draft: boolean;
  art?: string;
};

export type Note = NoteMeta & { html: string };

function parseFile(file: string): Note {
  const slug = file.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(NOTES_DIR, file), "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: String(data.title ?? slug),
    summary: String(data.summary ?? ""),
    category: String(data.category ?? "最新研究"),
    updated: String(data.updated ?? ""),
    keyPoints: Array.isArray(data.keyPoints) ? data.keyPoints.map(String) : [],
    references: Array.isArray(data.references)
      ? data.references.map((r: NoteRef | string) => (typeof r === "string" ? { text: r } : r))
      : [],
    draft: Boolean(data.draft),
    art: data.art ? String(data.art) : undefined,
    html: marked.parse(content, { async: false }) as string,
  };
}

/** 本機開發時（npm run dev）才會看到草稿；正式網站永遠不會。 */
const showDrafts = process.env.NODE_ENV === "development";

function readAll(): Note[] {
  if (!fs.existsSync(NOTES_DIR)) return [];
  return fs
    .readdirSync(NOTES_DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map(parseFile)
    .sort((a, b) => b.updated.localeCompare(a.updated));
}

/** 讀取筆記，最新的在前面。檔名開頭是 _ 的會被忽略（範本、地圖、研究筆記用）。 */
export function getNotes(): Note[] {
  return readAll().filter((n) => showDrafts || !n.draft);
}

/** 待審核的草稿篇數（只在本機開發時顯示提醒用） */
export function countDrafts(): number {
  return readAll().filter((n) => n.draft).length;
}

export function getNote(slug: string): Note | undefined {
  return getNotes().find((n) => n.slug === slug);
}

/** 依文章數量排序的分類清單 */
export function getCategories(): { name: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const n of getNotes()) counts.set(n.category, (counts.get(n.category) ?? 0) + 1);
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function formatUpdated(updated: string) {
  const [y, m] = updated.split("-");
  return m ? `${y} 年 ${Number(m)} 月` : updated;
}
