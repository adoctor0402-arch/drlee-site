// 首頁內容（Spec §13–§19）。之後可改為從 /content 的 MDX 讀取。

export type Topic = {
  slug: string;
  problem: string;
  label: string;
  cta: string;
  icon: "time" | "hourglass" | "snow" | "repeat" | "heart" | "embryo";
};

// Patient Problem First（§13）
export const topics: Topic[] = [
  { slug: "infertility", problem: "努力很久，還是沒有懷孕", label: "不孕症評估", cta: "了解可能原因", icon: "time" },
  { slug: "advanced-age", problem: "35 歲以後，開始擔心時間", label: "高齡備孕", cta: "了解生育力", icon: "hourglass" },
  { slug: "egg-freezing", problem: "想把現在的生育力留下來", label: "凍卵", cta: "了解凍卵", icon: "snow" },
  { slug: "recurrent-implantation-failure", problem: "試管做過很多次，還是不成功", label: "反覆著床失敗", cta: "重新找問題", icon: "repeat" },
  { slug: "recurrent-miscarriage", problem: "懷孕了，卻一次又一次失去", label: "反覆流產", cta: "了解可能原因", icon: "heart" },
  { slug: "pgt-a", problem: "有胚胎，卻不知道怎麼選", label: "PGT・胚胎評估・AI", cta: "了解胚胎評估", icon: "embryo" },
];

// First Visit（§14）
export const firstVisitSteps = [
  { n: "01", title: "先聽你的故事", body: "你試了多久、經歷過什麼、最擔心的是什麼。從你的故事開始，而不是從檢查單開始。" },
  { n: "02", title: "整理過去的檢查與療程", body: "把散落在不同醫院、不同時間的報告放在一起看，常常會看到新的線索。" },
  { n: "03", title: "找出現在最重要的問題", body: "不是把所有檢查都做一遍，而是先找出此刻最關鍵、最值得處理的那一個。" },
  { n: "04", title: "一起決定下一步", body: "說明每個選擇的理由、機會與代價。最後的決定，由我們一起做。" },
];

// Trust Section（§15）
export const approach: { n: string; title: string; body: string; quote?: string; tags: string[] }[] = [
  {
    n: "01",
    title: "先理解問題，再決定治療",
    body: "不是每個人都需要立刻做試管。先弄清楚卡在哪裡，治療才會有方向。",
    tags: [],
  },
  {
    n: "02",
    title: "不只看卵巢，也看完整的生殖系統",
    body: "懷孕是一條很長的路，每一段都可能是關鍵。",
    tags: ["Egg", "Sperm", "Embryo", "Uterus", "Implantation", "Genetics"],
  },
  {
    n: "03",
    title: "用數據幫助判斷",
    body: "以研究證據與臨床數據作為判斷基礎，而不是只靠經驗或感覺。",
    tags: ["Evidence-based", "Embryology", "PGT", "AI", "Clinical Data"],
  },
  {
    n: "04",
    title: "最後做決定的仍然是人",
    body: "科技可以幫忙看得更清楚，但你的價值、你的人生規劃，只有你自己最清楚。",
    quote: "Technology supports decisions. It does not replace human judgment.",
    tags: [],
  },
];

// Knowledge（§16）
export const noteCategories = [
  "準備懷孕", "高齡備孕", "凍卵", "試管嬰兒", "胚胎", "PGT", "反覆流產", "男性生育力", "最新研究",
];

// 範例文章（上線前替換為真實文章）
export const sampleNotes = [
  {
    slug: "age-41-how-many-eggs",
    category: "凍卵",
    title: "41 歲，要凍幾顆卵才夠？",
    summary: "「夠」不是一個固定數字。年齡、卵巢功能與你對未來的規劃，都會改變答案。",
    date: "2026-09",
  },
  {
    slug: "does-everyone-need-pgt-a",
    category: "PGT",
    title: "PGT-A 是不是每個人都需要？",
    summary: "胚胎染色體篩檢能回答一些問題，但不是所有問題。先弄清楚它能幫你什麼。",
    date: "2026-09",
  },
  {
    slug: "recurrent-miscarriage-where-to-start",
    category: "反覆流產",
    title: "反覆流產，該從哪裡開始找原因？",
    summary: "從胚胎、子宮、免疫到凝血，整理一條不慌亂的評估路徑。",
    date: "2026-09",
  },
];

// Dr. Lee Lab / Now（§18–§19）
export const labItems = ["Research", "AI × Reproductive Medicine", "Lectures", "Publications", "Projects", "Clinical Research Notes"];

export const now = {
  researching: ["AI embryo selection", "FET", "PGT", "RPL", "Embryo morphokinetics"],
  building: ["Fertility App", "AI knowledge system", "Patient education platform"],
};
