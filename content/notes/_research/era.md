# ERA 文獻筆記（寫作用，不會上線）

整理日：2026-09-24。所有數字都查過原始文獻；查不到的一律標示「未驗證」。

## 一、這個檢查怎麼來的（全部出自開發團隊）

- **Díaz-Gimeno P, et al. Fertil Steril. 2011;95(1):50-60.e15.** 原始開發。88 位健康捐卵者 + 5 位著床失敗 + 2 位水輸卵管。238 個基因的客製化晶片，134 個基因的容受性訊號。論文裡的 sensitivity 0.998 / specificity 0.886 是「對得上月經週期天數」的內部交叉驗證，**不是預測著床或懷孕**。
- **Díaz-Gimeno P, et al. Fertil Steril. 2013;99(2):508-517.** 開發團隊自己的再現性研究。**再測信度的受試者只有 7 人**（相隔 29–40 個月），宣稱 100% 一致。對照組是主觀的 Noyes 組織學判讀。作者為 ERA 專利共同發明人。
- **Ruiz-Alonso M, et al. Fertil Steril. 2013;100(3):818-824.** 首次用於 RIF。85 位 RIF，25.9%（22/85）判為非容受期。**實際接受個人化植入的只有 8 位**，懷孕率 50.0% —— 與容受期組的 51.7% 幾乎相同。無對照組。作者含 Igenomix 員工與專利發明人。

## 二、再現性：最大的證據空缺

- 開發團隊：n=7，100% 一致（同上）。
- **Cho K, et al. J Assist Reprod Genet. 2018;35(5):929-930.** 獨立個案報告，同一位女性 4 個月內做 4 次 ERA，**四次結果都不同**（pre-receptive→post-receptive→post-receptive→receptive），前三次的窗期完全不重疊。n=1，不能推估比例。
- 後續筆戰：Stankewicz T, et al. JARG 2018;35:1307-1308（Igenomix 回應，主張是未依規範執行）；Dahan MH, Tan SL. JARG 2018;35(10):1923-1924（反駁，主張是檢測誤差）。
- **Place TL, et al. F&S Rep. 2023;4(4):375-379.** 獨立、盲性。12 位患者，同一次週期取子宮底／中段／下段三處。**三處 ERA 結果完全一致**（histology 則有差異）。意思是：同一個週期內「精密」沒有問題，但精密 ≠ 準確。

> **寫作提醒：** 「重做一次會不會得到同樣答案」這題，目前沒有任何足夠規模的獨立研究。開發端 n=7、獨立端 n=1。文章要把它寫成「證據空缺」，不要給數字。

## 三、關鍵：這個標籤對應到真實的東西嗎？

**Chae-Kim J, Doyle N, Hill MJ, et al. Fertil Steril. 2023;120(6):1255-1256.**（Synchrony 試驗對照組的巢式診斷準確度研究）

- 386 位患者**做了 ERA，但結果對醫病雙方隱藏，所有人一律照標準時間植入**。
- **AUC 0.52（敏感度分析 0.54）** —— 與擲硬幣無異。
- 被標為「非容受期」的人，活產率 **62.5%（130/208）**；「容受期」**61.2%（109/178）**，P=0.881。
- 由 Shady Grove Fertility 執行（非開發團隊），部分由 Igenomix 資助。
- 後續筆戰：Valbuena D, et al. Fertil Steril. 2024;121(2):360（Igenomix 質疑）；Hill MJ, et al. 2024;121(2):361-362（作者回覆：AUC 不受該爭議影響）。

## 四、隨機試驗

- **Doyle N, et al. JAMA. 2022;328(21):2117-2125.**（Synchrony）雙盲、30 個中心、**全部植入 PGT-A 正常的胚胎**、意向治療分析。767 人隨機分派。活產率 **58.5%（223/381）vs 61.9%（239/386）**；差異 −3.4%（95% CI −10.3% 到 +3.5%），P=0.38。**注意：55% 的人被判為「窗期偏移」。**
- **Simón C, et al. Reprod Biomed Online. 2020;41(3):402-415.** 開發端的 RCT，Igenomix 贊助，Simón 為專利共同發明人。458 人隨機分派。**意向治療分析的主要終點未達標**（pET 40.4% vs FET 34.5% vs 新鮮 44.1%，不顯著）。被大量引用的正面數字（累積活產 71.2%）來自 **per-protocol 分析，且分析人數從 458 掉到 266（流失約 42%）**。批評見 Lensen S, et al. RBMO 2021;42(1):283。
- **Chen J, et al. J Assist Reprod Genet. 2025;42(10):3321-3332.** 中國 rsERT 平台，PCOS 但非 RIF 族群，n=121。子宮內懷孕率 61.2% vs 60.0%，P=0.901。
- **唯一針對 RIF 設計的 RCT（ChiCTR2100049041, n=132）尚未發表結果。**

## 五、統合分析（這裡是全篇最重要的區分）

**Glujovsky D, et al. J Assist Reprod Genet. 2026;43:1049-1062.** 44 篇研究（4 篇 RCT、40 篇世代研究），搜尋至 2025 年 11 月，作者聲明無利益衝突。分三個族群：

| 族群 | 結果 | 證據等級 |
| --- | --- | --- |
| 非 RIF | 活產 **RR 0.98（0.88–1.10）** 無差異 | 中等 |
| RIF、植入**未做 PGT-A** 的胚胎 | 活產 **OR 1.58（1.34–1.86）** 可能有益 | 中等（但全部是觀察性研究） |
| RIF、植入**染色體正常**的胚胎 | 活產 **OR 1.36（0.83–2.22）** 跨過 1 | **極低** |

較早的同一作者群：**Glujovsky D, et al. Hum Reprod. 2023;38(7):1305-1317.** —— RIF 族群「沒有任何 RCT」。

其他統合分析（方向一致）：
- **Arian SE, et al. Fertil Steril. 2023;119(2):229-238.** 8 篇、2,784 人。活產/持續妊娠 OR 1.38（0.79–2.41），不顯著。依先前失敗次數（≤2 vs >2）分層也沒有差異。
- **Zolfaroli I, et al. J Assist Reprod Genet. 2023;40:985-994.** 12 篇、14,224 人。活產 OR 1.00（0.63–1.58）。
- **Luo R, et al. J Assist Reprod Genet. 2023;40:719-734.** 臨床懷孕 RR 1.07（0.87–1.30）。

## 六、大型世代研究（互相矛盾，要誠實呈現）

- **Cozzolino M, et al. Fertil Steril. 2022;118(4):724-736.** 5,372 次植入，全部是已失敗過至少一次的人。自體、未做 PGT-A 的活產率：**pET 18.18% vs FET 35.18% vs 新鮮 34.43%**；三次累積 33.16% vs 51.87% vs 52.59%。ERA 組**更差**。（合理的替代解釋是 confounding by indication。⚠️ 該文的校正後 OR 0.39（95% CI 0.19–1.79）與其 P<.05 標示不一致，**不要引用那個 OR**。）
- **Cozzolino M, et al. J Assist Reprod Genet. 2020;37(12):2989-2997.** 2,110 位中度 RIF、488 位重度 RIF。PGT-A 對中度 RIF 有幫助；**ERA 在兩組都沒有臨床效益**。
- **Ruiz-Alonso M, et al. Sci Rep. 2025;15:16967.** 200 例 ERA 個人化 vs 70 例標準，全部染色體正常胚胎。活產 48.2% vs 26.1%（P=0.002）。⚠️ **八位作者是 Igenomix 員工，Simón 為專利共同發明人；組別不平衡、回溯性設計。** 這是主要的正面世代研究，而它來自製造商。
- **Yu S, et al. Front Endocrinol. 2025;15:1402575.** 獨立、傾向分數配對的 RIF 世代。43 vs 120。活產 **39.5% vs 38.3%（P=0.890）**。

## 七、真正的 RIF 有多罕見

**Pirtea P, et al. Fertil Steril. 2021;115(1):45-53.** 4,429 次染色體正常單一胚胎解凍植入、子宮構造正常。持續著床率：第一次 69.9%、兩次累積 87.9%、**三次累積 95.2%**。累積活產 64.8% → 83.9% → **92.6%**。

> 意思是：三次正常胚胎都失敗的人不到 5%。而 ERA 在各研究裡判定「窗期偏移」的比例是 25.9%（Ruiz-Alonso）、37.5%（Simón RCT）、**約 55%（Doyle RCT）**。這個落差本身就是問題。

## 八、各國專業機構的立場

- **HFEA（英國）：紅燈。** 原文：「the findings from moderate/high quality evidence shows that this add-on may reduce treatment effectiveness」。頁面日期 2023-10-16。
- **ESHRE 2023 有兩份文件，語氣不同（值得在文章裡誠實點出）：**
  - Add-ons 指引（Hum Reprod. 2023;38(11):2062-2104）：**「The presently available endometrial receptivity tests are not recommended.」** 證據等級 ⊕⊕◯◯。
  - RIF 指引（Hum Reprod Open. 2023;2023(3):hoad023）：「insufficient data to recommend the routine use... assessment of specific aspects of endometrial function by testing **can be considered**」。引用的合併 OR 0.94（0.70–1.26），6 篇、n=2552。（⚠️ 該文併列的百分比 40.7% vs 49.6% 與 OR 0.94 在算術上對不起來，要引就只引 OR。）
- **ASRM 2026：** Practice Committee. Recurrent implantation failure: a committee opinion. Fertil Steril. 2026;126(2):277-293. **「There is insufficient evidence to support routine use of ERA testing in RIF patients.」** 並指出兩篇 RCT 大多排除了失敗超過兩次的人，因此對 RIF 族群的外推有限。
- **義大利 SIFES-MR 2025：** 不建議用於一般試管族群。
- **澳洲（墨爾本大學實證 IVF 資源，2026-01 更新）：** 「對活產沒有影響」，並註明試驗未納入反覆著床失敗者。

## 九、台灣的現實

- 價格：**約 NT$40,000–50,000**（來源是診所與醫師的行銷/衛教頁面與病人部落格，**不是正式來源**，寫的時候要標明）。
- **不在試管嬰兒補助範圍內。**（來源：診所整理頁；⚠️ 國健署官網無法直接抓取，建議發布前自行核對官方補助項目表。）
- 國內行銷頁面上常見的說法（**文章裡不要點名任何診所**）：「每 10 位女性就有 3 位窗期非標準」「使用 ERA 首次療程懷孕率達 72.5%」「PGS＋ERA 懷孕率最高可達 80%」「提升著床率達 25%」。
- ⚠️ **茂盛自己的網站上也有 ERA 的衛教頁**（ivftaiwan.com/share-detail/209/）。這篇文章的立場要寫到什麼程度，需要李醫師自己決定。

## 十、對前提本身的質疑

**Ben Rafael Z. Hum Reprod Open. 2021;2021(2):hoab010.**
- 胚胎可以在著床前「逗留數日」，與「窗期可被 ±12–24 小時精準調整」的概念不相容。
- 這個檢查讀的是**從未接觸過胚胎的內膜**，完全沒有胚胎端的訊號。
- 各研究定義的基因組差距約十倍（63 / 147 / 238 / 303 / 313 / 616 個基因），比較像方法學造成的，而不是一個固定的生物訊號。
- 黃體素是「房間裡沒人提的大象」：它驅動分泌期轉換，排卵前 >1.5 ng/mL 就會影響 140 個以上的內膜基因。
- 推估真正可能受益的比例只有約 1.8%。

**Patounakis G, Hill MJ. Fertil Steril. 2022;118(2):322.**（社論）臨床端採用得太快，常常只失敗一次就做；把失敗歸因於內膜是過度簡化。

**未驗證、不要引用：** Ohara et al. Reprod Med Biol 2026（WOI 穩定性分析，全文抓不到）；Zheng et al. Int J Gynaecol Obstet 2025（Wiley 403）；Doyle 2022 的利益揭露段落。
