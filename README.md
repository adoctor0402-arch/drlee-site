# 小王子醫師 Dr. Lee — 個人網站 V1

依照 `PRINCE_DOCTOR_WEBSITE_V1.md`（Style C Hybrid）建立。

## 本機執行

```bash
npm install
npm run dev
```

打開 http://localhost:3000

## 常改的地方

| 要改什麼 | 檔案 |
| --- | --- |
| 掛號連結（含李俊逸醫師門診頁）、電話、院區、導覽列 | `src/config/site.ts` |
| 首頁文字（六大問題、第一次門診、方法、筆記、Now） | `src/config/content.ts` |
| 第一次門診頁（帶什麼、流程、FAQ） | `src/config/first-visit.ts` |
| 備孕筆記文章 | `content/notes/*.md`（複製 `_範本.md` 開新文章） |
| 星際觀測站論文 | `content/observatory/*.md`（由抓取腳本產生） |
| 星空試算工具（兩個） | `src/components/sky/`（`model.ts`＝自然懷孕公式、`eggs-model.ts`＝凍卵公式） |
| 觀測站追蹤的主題與期刊 | `scripts/observatory.config.json` |
| 醫師照片、頭銜 | `public/images/dr-lee.webp`、`site.ts` 的 `roles` |
| 顏色 / 字型 / 動畫 | `src/app/globals.css` |
| 小王子角色插畫 | `src/components/prince.tsx` |

## 目前狀態

- ✅ 首頁全部區塊、手機優先版面、院區選擇彈窗（記住上次選的院區）
- ✅ SEO 網址：/infertility、/advanced-age、/egg-freezing、/recurrent-implantation-failure、/recurrent-miscarriage、/pgt-a
- ✅ 關於我（真人照片、身分、理念）
- ✅ 第一次門診（帶什麼、流程、常見問題）
- ✅ 備孕筆記：列表、分類篩選、文章模板（Markdown 寫作）
- ✅ 星際觀測站：PubMed 自動抓取 → 醫師審核 → 上線
- ✅ 星空試算工具 /sky（入口頁，底下兩個工具）
  - /sky/natural 你們的星空：自然懷孕機率（Cameron 2026，蘇格蘭 7,086 對伴侶）
  - /sky/eggs 我的卵子，夠不夠？：凍卵累積活產機率（Cascante 2024，NYU 731 位解凍患者；截距為重建值，顯示值封頂 85%）
- ⏳ Dr. Lee Lab、/now：目前是「整理中」頁面
- ✅ 真人照片：public/images/dr-lee.webp（大頭照 dr-lee-avatar.webp）

## 寫一篇新筆記

1. 複製 `content/notes/_範本.md`，改成新檔名（英文、短橫線分隔），檔名就是網址。
2. 填上面的 title、summary、category、updated、keyPoints、references。
3. 內文用四個段落：問題是什麼 → 目前研究怎麼說 → 我的解讀 → 對你可能代表什麼。
4. 寫完把 `draft: true` 改成 `draft: false`（或整行刪掉），文章就會出現在網站上。

分類請從這九個選：準備懷孕、高齡備孕、凍卵、試管嬰兒、胚胎、PGT、反覆流產、男性生育力、最新研究。

## 星際觀測站（新論文自動更新）

流程是「自動抓取 → 你審核 → 上線」，沒審核的論文不會出現在網站上。

```bash
npm run fetch:papers          # 抓最近 30 天的新論文，存成待審核檔案
npm run fetch:papers -- --dry # 只看會抓到什麼，不寫檔
npm run test:parse            # 不用連網，測試解析邏輯有沒有壞掉
```

- 抓回來的檔案在 `content/observatory/<PMID>.md`，一律是 `draft: true`。
- 審核方式：打開檔案，改中文標題、補「三十秒看懂」三句、寫「小王子醫師的解讀」，
  刪掉最下面的原文摘要註解，再把 `draft` 改成 `false`。
- 要追蹤哪些主題、只收哪些期刊，改 `scripts/observatory.config.json`。
- 本機 `npm run dev` 時，觀測站頁面上方會顯示「有幾篇待審核」，正式站不會出現。

### 從 Slack 每日文獻摘要挑文章

你每天早上的 Slack 文獻摘要，挑好的那幾則可以直接變成觀測站的待審稿：

```bash
node scripts/new-paper.mjs '{"id":"42567929","title":"中文標題", ...}'
cat papers.json | node scripts/new-paper.mjs   # 一次多筆
```

實務上更簡單的做法：在 Cowork 對 Claude 說「把今天 Slack 上打 ✅ 的那幾則放進觀測站」，
Claude 會讀 Slack、產生待審檔案，你再補上解讀。

### 讓它每週自動跑

`.github/workflows/observatory.yml` 已經設定好：推上 GitHub 後，每週一台灣時間早上 8 點
自動抓取並把待審核檔案 commit 回 repo（也可以在 GitHub 頁面手動按 Run）。

選用：在 GitHub 的 Settings → Secrets 加上 `ANTHROPIC_API_KEY`，抓取時會順便產生
中文標題與白話重點的**草稿**，你只要修改、確認即可 —— 草稿一樣是待審核狀態。

## 部署

看 `DEPLOY.md`，裡面有逐步指令（Vercel CLI 最快 5 分鐘上線；接 GitHub 之後 push 就自動更新）。
