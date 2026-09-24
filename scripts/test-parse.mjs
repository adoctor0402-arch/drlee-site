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
assert.equal(p.journal, "Hum Reprod");
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

const md = buildMarkdown(p, { label: "凍卵・生育保存" }, abstract, {
  titleZh: "凍卵後真的回來用的人，結果如何？",
  takeaways: ["重點一", "重點二"],
  whatItAsks: "問題",
  whatItFound: "發現",
});
assert.equal(md.includes('pmid: "40123456"'), true);
assert.equal(md.includes("draft: true"), true, "抓回來一定是待審核狀態");
assert.equal(md.includes('title: "凍卵後真的回來用的人，結果如何？"'), true);
assert.equal(md.includes("小王子醫師的解讀"), true);

const mdNoAi = buildMarkdown(p, { label: "凍卵・生育保存" }, "", null);
assert.equal(mdNoAi.includes("（待補"), true, "沒有 AI 草稿時要留待補欄位");

console.log("✓ PubMed 解析與 Markdown 產生測試通過");
