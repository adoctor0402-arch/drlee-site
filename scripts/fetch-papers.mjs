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
 * 若環境變數有 ANTHROPIC_API_KEY，會順便請 Claude 產生中文標題與白話重點的「草稿」，
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

/** 選用：請 Claude 產生中文草稿 */
async function draftChinese(paper, abstract) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key || !abstract) return null;
  const model = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-5";
  const prompt = `你是協助一位台灣生殖醫學醫師整理文獻的助理。以下是一篇論文的標題與摘要。

標題：${paper.title}
期刊：${paper.journal}
摘要：${abstract}

請用台灣繁體中文輸出 JSON（不要其他文字）：
{
  "titleZh": "中文標題，20 字內，用病人看得懂的說法，盡量寫成一個問句",
  "takeaways": ["條列一", "條列二", "條列三", "條列四"]
}

takeaways 寫法：三到四條，每一條是完整的一句話，交代研究設計、樣本數與主要結果。
數字要帶上效應量與信賴區間（例如「校正後 FOR 0.79，95% CI 0.67–0.94」），
有分母的要寫出分母。最後一條如果原文有講限制或作者自己的但書，就寫那一條。

規則：不要誇大、不要寫成治療建議、不要出現「保證」「最有效」這類字眼；
原文沒有的數字不要自己補；相對風險與絕對風險不要混用；
關聯性研究不要寫成因果。`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({ model, max_tokens: 1000, messages: [{ role: "user", content: prompt }] }),
  });
  if (!res.ok) {
    console.warn(`  ⚠ Claude API ${res.status}，這篇先留空白由醫師填`);
    return null;
  }
  const data = await res.json();
  const text = data?.content?.map((c) => c.text ?? "").join("") ?? "";
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try {
    return JSON.parse(match[0]);
  } catch {
    return null;
  }
}

const esc = (s) => String(s ?? "").replace(/"/g, '\\"');

export function buildMarkdown(paper, topic, abstract, zh) {
  const takeaways = zh?.takeaways ?? ["（待補：一句話講清楚這篇在說什麼）"];
  const doiUrl = paper.doi ? `https://doi.org/${paper.doi}` : paper.url;
  const reading = [`- [原始論文：${paper.journal}](${doiUrl})`];
  if (paper.doi) reading.push(`- [PubMed（PMID ${paper.pmid}）](${paper.url})`);
  return `---
pmid: "${paper.pmid}"
title: "${esc(zh?.titleZh || paper.title)}"
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
      const zh = await draftChinese(paper, abstract);
      const file = path.join(OUT_DIR, `${paper.pmid}.md`);
      console.log(`  + ${paper.journal}｜${paper.title.slice(0, 60)}…`);
      if (!DRY) fs.writeFileSync(file, buildMarkdown(paper, topic, abstract, zh));
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
