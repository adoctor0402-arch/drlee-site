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
| 掛號連結、電話、院區、導覽列 | `src/config/site.ts` |
| 首頁文字（六大問題、第一次門診、方法、筆記、Now） | `src/config/content.ts` |
| 第一次門診頁（帶什麼、流程、FAQ） | `src/config/first-visit.ts` |
| 醫師照片、頭銜 | `public/images/dr-lee.webp`、`site.ts` 的 `roles` |
| 顏色 / 字型 / 動畫 | `src/app/globals.css` |
| 小王子角色插畫 | `src/components/prince.tsx` |

## 目前狀態

- ✅ 首頁全部區塊、手機優先版面、院區選擇彈窗（記住上次選的院區）
- ✅ SEO 網址：/infertility、/advanced-age、/egg-freezing、/recurrent-implantation-failure、/recurrent-miscarriage、/pgt-a
- ✅ 關於我（真人照片、身分、理念）
- ✅ 第一次門診（帶什麼、流程、常見問題）
- ⏳ 備孕筆記、文章模板、Lab、/now：目前是「整理中」頁面
- ✅ 真人照片：public/images/dr-lee.webp（大頭照 dr-lee-avatar.webp）

## 部署

推到 GitHub 後，在 Vercel 匯入專案即可（Framework：Next.js，不需額外設定）。
