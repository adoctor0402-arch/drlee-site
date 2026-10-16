#!/usr/bin/env node
// 用固定樣本測試 PubMed 回傳的解析邏輯（不需要連網）。
// 執行：npm run test:parse

import assert from "node:assert/strict";
import { parseSummary, parseAbstractText, buildMarkdown } from "./fetch-papers.mjs";

const summary = {
  "40123456": {
    uid: "40123456",
    pubdate: "2026 Aug 14",
    sortpubdate: "2026/08/14 00:00",
    source: "Hum Reprod",
    authors: [
      { name: "Chen Y", authtype: "Author" },
      { name: "Lopez M", authtype: "Author" },
    ],
    title: "Cumulative live birth rates after elective oocyte cryopreservation: a cohort study.",
    pubtype: ["Journal Article"],
    articleids: [
      { idtype: "pubmed", value: "40123456" },
      { idtype: "doi", value: "10.1093/humrep/deaf123" },
    ],
  },
};

const p = parseSummary(summary, "40123456");
assert.equal(p.pmid, "40123456");
assert.equal(p.journal, "Human Reproduction", "期刊縮寫要展開成全名，跟站上其他文章一致");
assert.equal(p.pubdate, "2026-08-14");
assert.equal(p.firstAuthor, "Chen Y");
assert.equal(p.doi, "10.1093/humrep/deaf123");
assert.equal(p.title.endsWith("cohort study"), true, "標題結尾的句點要拿掉");
assert.equal(p.url, "https://pubmed.ncbi.nlm.nih.gov/40123456/");

assert.equal(parseSummary({ "1": { error: "cannot get document summary" } }, "1"), null);

const abstractText = `1. Hum Reprod. 2026 Aug 14;41(8):1234-1245. doi: 10.1093/humrep/deaf123.

Cumulative live birth rates after elective oocyte cryopreservation: a cohort study.

Chen Y(1), Lopez M(2).

Author information:
(1)Department of Obstetrics and Gynecology, Somewhere University.

STUDY QUESTION: What is the cumulative live birth rate among women who returned to use their electively cryopreserved oocytes? SUMMARY ANSWER: In this cohort, outcomes were strongly associated with age at cryopreservation and with the number of mature oocytes stored, and most women who returned required more than one warming cycle to achieve a live birth. WHAT IS KNOWN ALREADY: Utilization rates remain low and published outcome data are limited.

DOI: 10.1093/humrep/deaf123
PMID: 40123456`;

const abstract = parseAbstractText(abstractText);
assert.equal(abstract.includes("STUDY QUESTION"), true, "要抓到摘要本文");
assert.equal(abstract.includes("Author information"), false, "不要抓到作者單位");

const md = buildMarkdown(p, { label: "凍卵・生育保存" }, abstract);
assert.equal(md.includes('pmid: "40123456"'), true);
assert.equal(md.includes("draft: true"), true, "抓回來一定是待審核狀態");

// 腳本不再自動產中文標題與重點（見 fetch-papers.mjs 裡的說明）。
// 標題保持原文，重點保持待補，由每週審稿流程查核後撰寫。
assert.equal(md.includes(`title: "${p.title}"`), true, "標題要保持原文，不要自動翻譯");
assert.equal(md.includes("（待補"), true, "重點欄位要留待補");

// 產出的體例必須跟網站現行的國際消息格式一致。
// 2026-10 改版後腳本一度還在用舊的三段式，這幾條就是防止再漂移。
assert.equal(md.includes("## 小王子醫師說"), true, "必須有『小王子醫師說』這一節");
assert.equal(md.includes("## 延伸閱讀"), true, "必須有『延伸閱讀』這一節");
assert.equal(
  md.indexOf("## 小王子醫師說") < md.indexOf("## 延伸閱讀"),
  true,
  "醫師說要排在延伸閱讀前面",
);
assert.equal(
  md.includes("- [原始論文：Human Reproduction]"),
  true,
  "延伸閱讀第一行一定是原始論文連結，而且要帶期刊名",
);
for (const stale of ["這篇研究在問什麼", "研究發現了什麼", "小王子醫師的解讀"]) {
  assert.equal(md.includes(stale), false, `舊體例的「${stale}」不該再出現`);
}

// 沒有摘要的時候也要照樣產出骨架
const mdNoAbstract = buildMarkdown(p, { label: "凍卵・生育保存" }, "");
assert.equal(mdNoAbstract.includes("（待補"), true, "沒有摘要時一樣留待補欄位");
assert.equal(mdNoAbstract.includes("draft: true"), true);

console.log("✓ PubMed 解析與 Markdown 產生測試通過");
