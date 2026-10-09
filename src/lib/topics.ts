import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import type { NoteRef } from "./notes";

const TOPICS_DIR = path.join(process.cwd(), "content", "topics");

export type TopicPage = {
  slug: string;
  /** 卡片上那句話，也是 <h1> */
  title: string;
  /** 瀏覽器分頁與 SEO 用的標題，比 title 更具體 */
  heading: string;
  summary: string;
  updated: string;
  keyPoints: string[];
  /** 這個主題底下要列出的備孕筆記 slug，順序就是顯示順序 */
  notes: string[];
  references: NoteRef[];
  draft: boolean;
  html: string;
};

/** 本機開發時（npm run dev）才會看到草稿；正式網站永遠不會。 */
const showDrafts = process.env.NODE_ENV === "development";

function parseFile(slug: string): TopicPage {
  const raw = fs.readFileSync(path.join(TOPICS_DIR, `${slug}.md`), "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: String(data.title ?? slug),
    heading: String(data.heading ?? data.title ?? slug),
    summary: String(data.summary ?? ""),
    updated: String(data.updated ?? ""),
    keyPoints: Array.isArray(data.keyPoints) ? data.keyPoints.map(String) : [],
    notes: Array.isArray(data.notes) ? data.notes.map(String) : [],
    references: Array.isArray(data.references)
      ? data.references.map((r: NoteRef | string) => (typeof r === "string" ? { text: r } : r))
      : [],
    draft: Boolean(data.draft),
    html: marked.parse(content, { async: false }) as string,
  };
}

/**
 * 讀取某個主題頁的內容。還沒寫的主題會回傳 undefined，
 * /[topic] 那一頁就會自動退回「整理中」的佔位畫面。
 */
export function getTopicPage(slug: string): TopicPage | undefined {
  const file = path.join(TOPICS_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return undefined;
  const page = parseFile(slug);
  if (page.draft && !showDrafts) return undefined;
  return page;
}

const PAGES_DIR = path.join(process.cwd(), "content", "pages");

/**
 * 讀取單張獨立頁的內容（content/pages/<slug>.md），例如 lab、now。
 * 檔案不存在或還是草稿時回傳 undefined，該路由就會退回「整理中」的佔位畫面。
 */
export function getStandalonePage(slug: string): TopicPage | undefined {
  const file = path.join(PAGES_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return undefined;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const page: TopicPage = {
    slug,
    title: String(data.title ?? slug),
    heading: String(data.heading ?? data.title ?? slug),
    summary: String(data.summary ?? ""),
    updated: String(data.updated ?? ""),
    keyPoints: Array.isArray(data.keyPoints) ? data.keyPoints.map(String) : [],
    notes: Array.isArray(data.notes) ? data.notes.map(String) : [],
    references: Array.isArray(data.references)
      ? data.references.map((r: NoteRef | string) => (typeof r === "string" ? { text: r } : r))
      : [],
    draft: Boolean(data.draft),
    html: marked.parse(content, { async: false }) as string,
  };
  if (page.draft && !showDrafts) return undefined;
  return page;
}
