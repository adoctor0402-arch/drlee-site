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
| 接下來要寫哪些文章 | `content/notes/_文章地圖.md`（33 篇的清單、優先序、半年排程） |
| 把草稿變成純文字給醫師改 | `python3 scripts/md-to-txt.py content/notes/<檔名>.md 輸出.txt` |

> **同步規則（很重要）：** 所有改動都在雲端這一份做，再整份同步到 Mac。
> 不要直接改 Mac 上的檔案，否則下一次同步會把它蓋掉。
> （2026-09-25 就是這樣把已發布的 ERA 那篇打回草稿。）
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

## 星際觀測站（新論文每週更新）

流程固定四步，少一步都不要上架：

1. **抓** — 每週一台灣時間早上 8 點，`.github/workflows/observatory.yml` 自動抓最近的新論文，
   存成 `content/observatory/<id>.md`，一律 `draft: true`。
2. **查核** — 寫完內容之後、上架之前，一定要對原始論文逐項核對：樣本數、百分比、
   勝算比與信賴區間、研究設計、效應方向、以及評論有沒有過度推論或把話誤掛給作者。
   在 Cowork 對 Claude 說「幫我派論文審查員查核這幾篇」，它會去讀原文再回報。
   **查到不對的一定要改，不能只記下來。**
3. **醫師看過** — 李醫師本人讀過「小王子醫師說」那一段才算數。沒看過不上架。
4. **上架** — 把 `draft: true` 改成 `false`，再部署。

### 每一則長什麼樣

網站上方的資訊框會自動顯示期刊、作者、日期與原始論文連結，所以正文不用重複。

- frontmatter：`title`（中文標題）、`titleEn`（**論文真正的篇名，不要改寫**）、`journal`、
  `pubdate`（期刊線上發表日，不是新聞稿日期）、`firstAuthor`、`doi`、`url`、`topic`、
  `takeaways`（三到四句「三十秒看懂」）
- 正文只有兩節：`## 小王子醫師說`（300 到 700 字，口語，講完就走）和 `## 延伸閱讀`
  （第一行固定是「原始論文：期刊名」加連結）
- 刪掉抓取時留下的原文摘要註解

### 查核最常抓到的六種錯

這幾種在 2026-10-09 那次查核裡全部出現過，寫的時候先自己檢查一遍：

1. 把**收案數**當成**分析數**（世代收了 394 對，實際進影像分析的只有 131 和 205）
2. 把**信賴區間上界**當成風險倍數（HR 是 23.51，區間上界才是 30）
3. 點估計**不顯著**卻寫成風險上升（信賴區間跨過無效線就是「證據不足以判斷」）
4. 英文篇名**自己改寫**，同行一搜就對不上
5. 引用**新聞稿裡沒有出處的數字**（那個「NIPT 四成七假警報」就是這樣來的）
6. 評論和論文**結論相反**，或把自己的推論寫成「作者自己說」

### 手動抓取

```bash
npm run fetch:papers          # 抓最近 30 天的新論文，存成待審核檔案
npm run fetch:papers -- --dry # 只看會抓到什麼，不寫檔
npm run test:parse            # 不用連網，測試解析邏輯有沒有壞掉
```

要追蹤哪些主題、只收哪些期刊，改 `scripts/observatory.config.json`。
本機 `npm run dev` 時，觀測站頁面上方會顯示「有幾篇待審核」，正式站不會出現。

### 從 Slack 每日文獻摘要挑文章

你每天早上的 Slack 文獻摘要，挑好的那幾則可以直接變成觀測站的待審稿：

```bash
node scripts/new-paper.mjs '{"id":"42567929","title":"中文標題", ...}'
cat papers.json | node scripts/new-paper.mjs   # 一次多筆
```

實務上更簡單：在 Cowork 對 Claude 說「把今天 Slack 上打 ✅ 的那幾則放進觀測站」。

### Threads 版

每一則上架的同時可以配一篇 Threads，500 字以內，最後附期刊、年月與 DOI 連結。
內容用上架後的版本，不要用查核前的草稿。Threads 連接器目前只能回覆、不能發新貼文，
所以是複製貼上，送出永遠是醫師本人按。

## 部署

看 `DEPLOY.md`，裡面有逐步指令（Vercel CLI 最快 5 分鐘上線；接 GitHub 之後 push 就自動更新）。

---

## 社群圖卡產生器

每篇文章配一組 IG／Threads 圖卡（1080×1350，原生比例不會被裁），另可輸出門診列印用的 A4 單張。

```bash
python3 scripts/make-cards.py cards/<文章>.json <輸出資料夾>/
```

改 `cards/*.json` 就好，不要動程式裡的顏色與字級。品牌規格鎖在 `scripts/make-cards.py` 的 `TOKENS`：

| 用途 | 色碼 |
| --- | --- |
| 主色（唯一強調色） | `#D99A3E` 暖金 |
| 深底 | `#140D08` |
| 淺底 | `#FAF6EF` |
| 勾 | `#2F5F4E` |
| 叉 | `#C0523A` |

字體：標題思源宋體，內文思源黑體。署名統一用文字組合「小王子醫師／備孕筆記」。

五種卡型：

| type | 用途 |
| --- | --- |
| `cover` | 海報感封面，可放主視覺照片（`photo` 欄填圖檔路徑，相對於 json 所在資料夾） |
| `stat` | 大數字，適合當輪播第一張 |
| `list` | 勾叉清單，這是會被存起來的那一張 |
| `concept` | 一張講一個觀念 |
| `a4` | 門診列印用單頁，輸出 PDF |

文字太長超出畫布時，程式會在該行後面印「⚠ 內容超出畫布」，看到就把文字縮短再跑一次。

現有的圖卡設定：`cards/convenience-store.json`、`cards/fertility-supplements.json`。
