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
| 醫師照片、頭銜 | `public/images/dr-lee.webp`、`site.ts` 的 `roles` |
| 顏色 / 字型 / 動畫 | `src/app/globals.css` |
| 小王子角色插畫 | `src/components/prince.tsx` |

## 目前狀態

- ✅ 首頁全部區塊、手機優先版面、院區選擇彈窗（記住上次選的院區）
- ✅ SEO 網址：/infertility、/advanced-age、/egg-freezing、/recurrent-implantation-failure、/recurrent-miscarriage、/pgt-a
- ✅ 關於我（真人照片、身分、理念）
- ✅ 第一次門診（帶什麼、流程、常見問題）
- ✅ 備孕筆記：列表、分類篩選、文章模板（Markdown 寫作）
- ⏳ Dr. Lee Lab、/now：目前是「整理中」頁面
- ✅ 真人照片：public/images/dr-lee.webp（大頭照 dr-lee-avatar.webp）

## 寫一篇新筆記

1. 複製 `content/notes/_範本.md`，改成新檔名（英文、短橫線分隔），檔名就是網址。
2. 填上面的 title、summary、category、updated、keyPoints、references。
3. 內文用四個段落：問題是什麼 → 目前研究怎麼說 → 我的解讀 → 對你可能代表什麼。
4. 寫完把 `draft: true` 改成 `draft: false`（或整行刪掉），文章就會出現在網站上。

分類請從這九個選：準備懷孕、高齡備孕、凍卵、試管嬰兒、胚胎、PGT、反覆流產、男性生育力、最新研究。

## 部署

推到 GitHub 後，在 Vercel 匯入專案即可（Framework：Next.js，不需額外設定）。
