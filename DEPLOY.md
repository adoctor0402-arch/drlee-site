# 上線步驟

網站是 Next.js 專案，最適合部署在 Vercel（免費方案就夠用，自動 HTTPS、全球 CDN）。
兩條路，先做 A 最快看到網站，之後再補 B 就能自動更新。

---

## A. 最快：用 Vercel CLI 直接上線（約 5 分鐘）

在你的 Mac 打開「終端機」，貼這幾行（一行一行按 Enter）：

```bash
cd ~/Documents/Claude/茂盛小王子網站/drlee-site
npm install
npx vercel login      # 會開瀏覽器，用 Google/GitHub 帳號登入即可
npx vercel            # 第一次會問幾個問題，全部按 Enter 用預設值
npx vercel --prod     # 正式上線
```

跑完會給你一個網址（像 `drlee-site.vercel.app`），那就是你的網站。

之後每次改了內容，重跑一次 `npx vercel --prod` 就會更新。

---

## B. 接上 GitHub：之後改檔案就自動更新（約 10 分鐘）

1. 到 <https://github.com/new> 開一個 repository，名稱 `drlee-site`，選 **Private**，
   下面的 README、.gitignore、License 都**不要勾**，按 Create。

2. 回到終端機（把網址換成你剛剛建立的）：

```bash
cd ~/Documents/Claude/茂盛小王子網站/drlee-site
git remote add origin https://github.com/<你的帳號>/drlee-site.git
git branch -M main
git push -u origin main
```

   第一次推會要求登入 GitHub。如果問密碼，要用 Personal Access Token
   （GitHub → Settings → Developer settings → Personal access tokens → 產生一個有 repo 權限的）。
   或是裝 GitHub Desktop 用圖形介面推，比較省事。

3. 到 <https://vercel.com/new>，用 GitHub 帳號登入，選這個 repo，
   其他設定都不用改（Vercel 會自動認出 Next.js），按 **Deploy**。

完成後：**每次 `git push`，網站就自動重新部署**。星際觀測站每週一的自動抓取
（`.github/workflows/observatory.yml`）也會在這時開始運作。

---

## 上線後要做的三件事

### 1. 設定正式網址

在 Vercel 專案 → Settings → Environment Variables 新增：

| Name | Value |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://你的網域`（例如 `https://drlee.tw`） |

這會影響 sitemap、robots.txt 和社群分享預覽圖的網址。設完要重新部署一次。

### 2. 綁自己的網域（選用）

Vercel 專案 → Settings → Domains → 輸入你的網域，照畫面指示到網域商
（GoDaddy、Cloudflare、Gandi…）設定 DNS。通常是加一筆 A 或 CNAME 記錄，10 分鐘內生效。

### 3. 裝流量分析

Vercel 專案 → Analytics 一鍵開啟，或用 Google Analytics 4。
重點看：哪些頁面帶來最多「預約門診」點擊。

---

## 之後在 Mac mini 上跑

把專案放到 Mac mini 之後，只要那台電腦裝了 Node.js，就能跑同樣的指令。
Cowork 的每日排程任務（從 Slack 摘要挑論文）也可以改綁到 Mac mini：
在那台電腦的 Claude 桌面版打開這個任務，選「Require this computer」。

Mac mini 上第一次要做的：

```bash
cd <專案資料夾>
npm install
npm run dev     # 本機預覽 http://localhost:3000
```

---

## 常用指令

```bash
npm run dev            # 本機預覽
npm run build          # 檢查有沒有壞掉（上線前跑一次）
npm run fetch:papers   # 抓 PubMed 新論文（待審核）
npm run test:parse     # 測試抓取腳本的解析邏輯
```
