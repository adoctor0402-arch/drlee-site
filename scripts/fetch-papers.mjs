#!/usr/bin/env node
/**
 * 星際觀測站：從 PubMed 抓最新論文，存成待審核的 Markdown 檔。
 *
 *   npm run fetch:papers            # 抓新論文，寫進 content/observatory/
 *   npm run fetch:papers -- --dry   # 只印出會抓到什麼，不寫檔
 *
 * 所有抓回來的檔案都是 draft: true（不會出現在網站上），
 * 醫師審核、補上中文重點後把 draft 改成 false，才會上線。
 *
 * 不會自動產生中文草稿。中文標題與重點一律由每週審稿流程查核後撰寫。
 * 仍然是 draft，仍然需要醫師確認。
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT_DIR = path.join(ROOT, "content", "observatory");
const CONFIG = JSON.parse(fs.readFileSync(path.join(__dirname, "observatory.config.json"), "utf8"));

const DRY = process.argv.includes("--dry");
const EUTILS = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils";
const UA = "drlee-site-observatory/1.0 (mailto:adoctor0402@gmail.com)";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getJson(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`PubMed 回應 ${res.status}：${url}`);
  return res.json();
}

async function getText(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`PubMed 回應 ${res.status}：${url}`);
  return res.text();
}

/** esearch：找出某個主題最近 N 天的 PMID */
export async function searchTopic(topic, { days, perTopic }) {
  const params = new URLSearchParams({
    db: "pubmed",
    term: topic.query,
    retmode: "json",
    retmax: String(perTopic * 4), // 多抓一些，後面還要過濾期刊
    sort: "date",
    datetype: "pdat",
    reldate: String(days),
  });
  const data = await getJson(`${EUTILS}/esearch.fcgi?${params}`);
  return data?.esearchresult?.idlist ?? [];
}

/** esummary JSON → 乾淨的論文資料 */
// PubMed 回傳的是期刊縮寫（Hum Reprod），但網站上二十幾篇都是全名（Human Reproduction）。
// 這張表讓自動抓回來的稿子跟手寫的長得一樣。沒對到的就照 PubMed 原樣。
const JOURNAL_FULL_NAMES = {
  "Hum Reprod": "Human Reproduction",
  "Hum Reprod Update": "Human Reproduction Update",
  "Hum Reprod Open": "Human Reproduction Open",
  "Fertil Steril": "Fertility and Sterility",
  "Fertil Steril Rep": "F&S Reports",
  "Reprod Biomed Online": "Reproductive BioMedicine Online",
  "J Assist Reprod Genet": "Journal of Assisted Reproduction and Genetics",
  "N Engl J Med": "The New England Journal of Medicine",
  "Lancet": "The Lancet",
  "BMJ": "The BMJ",
  "Nat Med": "Nature Medicine",
  "Hum Fertil (Camb)": "Human Fertility",
  "Reprod Biol Endocrinol": "Reproductive Biology and Endocrinology",
};

export function parseSummary(result, pmid) {
  const r = result?.[pmid];
  if (!r || r.error) return null;
  const doi = (r.articleids ?? []).find((a) => a.idtype === "doi")?.value;
  const authors = (r.authors ?? []).map((a) => a.name).filter(Boolean);
  return {
    pmid,
    title: (r.title ?? "").replace(/\.$/, "").replace(/<[^>]+>/g, "").trim(),
    journal: JOURNAL_FULL_NAMES[r.source] ?? r.source ?? "",
    pubdate: (r.sortpubdate || r.pubdate || "").slice(0, 10).replace(/\//g, "-"),
    authors,
    firstAuthor: authors[0] ?? "",
    doi: doi ?? "",
    type: (r.pubtype ?? []).join("、"),
    url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`,
  };
}

export async function fetchSummaries(pmids) {
  if (pmids.length === 0) return [];
  const params = new URLSearchParams({ db: "pubmed", id: pmids.join(","), retmode: "json" });
  const data = await getJson(`${EUTILS}/esummary.fcgi?${params}`);
  return pmids.map((id) => parseSummary(data?.result, id)).filter(Boolean);
}

/** efetch 純文字摘要，取出 abstract 段落 */
export function parseAbstractText(text) {
  const lines = text.split("\n");
  // PubMed 純文字格式：標題、作者、單位…中間空行分段，摘要通常是最長的一段
  const blocks = text
    .split(/\n\s*\n/)
    .map((b) => b.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  const body = blocks.filter((b) => b.length > 200 && !b.startsWith("Author information"));
  void lines;
  return body.join("\n\n").slice(0, 4000);
}

export async function fetchAbstract(pmid) {
  const params = new URLSearchParams({ db: "pubmed", id: pmid, rettype: "abstract", retmode: "text" });
  return parseAbstractText(await getText(`${EUTILS}/efetch.fcgi?${params}`));
}

/**
 * 這裡原本會呼叫 Claude API 產生中文標題與重點草稿，已經刻意移除。
 *
 * 原因：prompt 要求它「數字要帶上效應量與信賴區間」，但摘要裡沒有那些數字時，
 * 它仍然會生出看起來很專業的內容。2026-10-16 查核時發現 jecs-house-dust 那一篇的
 * 各組勝算比、趨勢檢定 p 值、22 個校正變項與 r = 0.785 全都無法對上任何公開資料，
 * 因為那篇當時只有摘要、全文未公開。空白的「待補」不會騙人，錯的信賴區間會。
 *
 * 現在的分工：這支腳本只負責抓論文與建立骨架，中文標題與重點由每週的審稿流程
 * 回原始論文查核後撰寫（見 scripts/weekly-review.md）。
 * 要加回自動草稿前，請先想清楚誰來為那些數字負責。
 */

const esc = (s) => String(s ?? "").replace(/"/g, '\\"');

export function buildMarkdown(paper, topic, abstract) {
  const takeaways = ["（待補：一句話講清楚這篇在說什麼）"];
  const doiUrl = paper.doi ? `https://doi.org/${paper.doi}` : paper.url;
  const reading = [`- [原始論文：${paper.journal}](${doiUrl})`];
  if (paper.doi) reading.push(`- [PubMed（PMID ${paper.pmid}）](${paper.url})`);
  return `---
pmid: "${paper.pmid}"
title: "${esc(paper.title)}"
titleEn: "${esc(paper.title)}"
journal: "${esc(paper.journal)}"
pubdate: "${paper.pubdate}"
firstAuthor: "${esc(paper.firstAuthor)}"
doi: "${esc(paper.doi)}"
url: "${paper.url}"
topic: "${esc(topic.label)}"
takeaways:
${takeaways.map((t) => `  - "${esc(t)}"`).join("\n")}
# 審核完成後把 draft 改成 false，這篇才會出現在網站上
draft: true
fetchedAt: "${new Date().toISOString().slice(0, 10)}"
---

## 小王子醫師說

（待補：李醫師親自寫，三百到七百字，口語，像在門診講話。

先講這則消息值得注意的地方，再講不要過度解讀的地方，最後講今天的處置要不要因此改變。
不要用破折號，粗體少用，引號只給真正的引文，不要每一段都用一句漂亮的話收尾。）

## 延伸閱讀

${reading.join("\n")}

<!-- 原文摘要（僅供審稿參考，上線前請刪除；請勿整段照登以免侵犯期刊著作權）
${abstract || "（這篇沒有公開摘要）"}
-->
`;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const existing = new Set(
    fs
      .readdirSync(OUT_DIR)
      .filter((f) => f.endsWith(".md"))
      .map((f) => f.replace(/\.md$/, "")),
  );

  const journals = (CONFIG.journals ?? []).map((j) => j.toLowerCase());
  let added = 0;

  for (const topic of CONFIG.topics) {
    console.log(`\n◇ ${topic.label}`);
    let ids = [];
    try {
      ids = await searchTopic(topic, CONFIG);
    } catch (err) {
      console.error(`  ✗ 搜尋失敗：${err.message}`);
      continue;
    }
    const fresh = ids.filter((id) => !existing.has(id));
    if (fresh.length === 0) {
      console.log("  （沒有新論文）");
      continue;
    }

    let papers = [];
    try {
      papers = await fetchSummaries(fresh.slice(0, CONFIG.perTopic * 4));
    } catch (err) {
      console.error(`  ✗ 取得資料失敗：${err.message}`);
      continue;
    }

    const picked = papers
      .filter((p) => journals.length === 0 || journals.includes(p.journal.toLowerCase()))
      .slice(0, CONFIG.perTopic);

    for (const paper of picked) {
      await sleep(400); // 尊重 PubMed 的速率限制
      let abstract = "";
      try {
        abstract = await fetchAbstract(paper.pmid);
      } catch {
        /* 沒有摘要也沒關係 */
      }
      const file = path.join(OUT_DIR, `${paper.pmid}.md`);
      console.log(`  + ${paper.journal}｜${paper.title.slice(0, 60)}…`);
      if (!DRY) fs.writeFileSync(file, buildMarkdown(paper, topic, abstract));
      existing.add(paper.pmid);
      added++;
    }
  }

  console.log(
    `\n${DRY ? "（dry run）" : ""}新增 ${added} 篇待審核論文 → content/observatory/\n` +
      `審核方式：打開檔案、補上中文重點與解讀，把 draft 改成 false。\n`,
  );
}

if (process.argv[1] && process.argv[1].endsWith("fetch-papers.mjs")) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
