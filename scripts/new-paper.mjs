#!/usr/bin/env node
/**
 * 把一則「精選論文」寫成星際觀測站的待審稿。
 * 給 Slack 每日文獻摘要用：挑好的那幾則，用這支腳本轉成網站檔案。
 *
 *   node scripts/new-paper.mjs '{"id":"42567929","title":"...","takeaways":["..."]}'
 *   cat paper.json | node scripts/new-paper.mjs
 *
 * 欄位：
 *   id        檔名用（PubMed PMID 最好；沒有 PMID 就自己取一個短英文代號）
 *   title     中文標題
 *   titleEn   原文標題
 *   journal   期刊
 *   pubdate   YYYY-MM-DD
 *   firstAuthor / doi / url / topic
 *   takeaways 三十秒看懂（陣列）
 *   asks      這篇研究在問什麼
 *   found     研究發現了什麼
 *   reading   小王子醫師的解讀（留空就是「待補」）
 *   sources   其他來源連結 [{text,url}]
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "content", "observatory");

const esc = (s) => String(s ?? "").replace(/"/g, '\\"');

export function paperMarkdown(p) {
  const takeaways = p.takeaways?.length ? p.takeaways : ["（待補：一句話講清楚這篇在說什麼）"];
  const sources = (p.sources ?? []).map((s) => `- [${s.text}](${s.url})`).join("\n");
  return `---
pmid: "${esc(p.id)}"
title: "${esc(p.title)}"
titleEn: "${esc(p.titleEn)}"
journal: "${esc(p.journal)}"
pubdate: "${esc(p.pubdate)}"
firstAuthor: "${esc(p.firstAuthor)}"
doi: "${esc(p.doi)}"
url: "${esc(p.url)}"
topic: "${esc(p.topic || "最新研究")}"
takeaways:
${takeaways.map((t) => `  - "${esc(t)}"`).join("\n")}
# 審核完成後把 draft 改成 false，這篇才會出現在網站上
draft: true
fetchedAt: "${new Date().toISOString().slice(0, 10)}"
---

## 這篇研究在問什麼？

${p.asks || "（待補）"}

## 研究發現了什麼？

${p.found || "（待補）"}

## 小王子醫師的解讀

${p.reading || "（待補：這個結果在你的診間代表什麼？哪些人適用、哪些人先別急著套用？）"}
${sources ? `\n## 延伸閱讀\n\n${sources}\n` : ""}`;
}

async function readInput() {
  if (process.argv[2]) return process.argv[2];
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}

async function main() {
  const raw = await readInput();
  if (!raw.trim()) {
    console.error("請用參數或 stdin 傳入 JSON（可以是單筆物件或陣列）。");
    process.exit(1);
  }
  const input = JSON.parse(raw);
  const papers = Array.isArray(input) ? input : [input];
  fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const p of papers) {
    if (!p.id || !p.title) {
      console.error("每一筆至少要有 id 與 title：", JSON.stringify(p).slice(0, 80));
      continue;
    }
    const file = path.join(OUT_DIR, `${p.id}.md`);
    fs.writeFileSync(file, paperMarkdown(p));
    console.log(`✓ ${path.relative(process.cwd(), file)}（待審核）`);
  }
}

if (process.argv[1] && process.argv[1].endsWith("new-paper.mjs")) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
