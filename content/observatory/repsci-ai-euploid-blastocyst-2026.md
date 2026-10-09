---
pmid: "repsci-ai-euploid-blastocyst-2026"
title: "不切片，AI 能挑出染色體正常的囊胚嗎？"
titleEn: "The Building and Application of a Machine Learning Model on Predicting Euploid Blastocysts in IVF Treatments Without PGT-A"
journal: "Reproductive Sciences"
pubdate: "2026-10-02"
firstAuthor: "Yuan Z"
doi: "10.1007/s43032-026-02230-4"
url: "https://link.springer.com/article/10.1007/s43032-026-02230-4"
topic: "AI × 生殖醫學"
takeaways:
  - "中國三個生殖中心的團隊（徐州市婦幼保健院、南通市婦幼保健院、昆明醫科大學第一附屬醫院）結合胚胎發育動力學、囊胚型態與女性年齡，用兩階段邏輯迴歸模型預測哪些囊胚是染色體正常（整倍體），以 PGT-A 結果為標準答案。"
  - "模型 AUROC 為 0.877；在獨立資料集中準確率 77.35%、召回率 72.55%、真陰性率 81.55%、偽陽性率 18.45%、偽陰性率 27.45%。"
  - "作者另報告以該模型選擇囊胚的凍胚植入，臨床結果優於以 Gardner 分級選擇者，但摘要未給任何數字，也未揭露樣本數。作者自己呼籲需在不同族群、實驗室流程與影像系統上做外部驗證。"
# 審核完成後把 draft 改成 false，這篇才會出現在網站上
draft: true
fetchedAt: "2026-10-06"
---

## 小王子醫師說

方向有意思，但現在不能取代 PGT-A。

AUROC 0.877 聽起來不錯，真正要看的是它猜錯的時候怎麼錯。偽陰性率百分之二十七點四五，意思是真正染色體正常的囊胚裡，超過四分之一會被判成不正常。如果拿它來決定哪些不植入，手上只有兩三顆的人，這個代價太大。

我會這樣定位它：在沒做 PGT-A 的情況下，比單看 Gardner 分級聰明一點的排序工具。幫忙決定先放哪一顆，不是決定哪一顆該丟掉。

作者確實有提到用這個模型挑的胚胎，植入結果比用 Gardner 分級挑的好，但摘要沒有給任何數字，也沒有揭露收了幾顆胚胎、幾個病人。在看到那些數字之前，這句話只能當成一個待驗證的主張。作者自己也說需要在不同族群和不同實驗室流程上再驗一次。

## 延伸閱讀

- [Bioengineer 科普報導（10/2）](https://bioengineer.org/ai-model-predicts-chromosomally-normal-ivf-embryos-without-genetic-biopsy/)
- [原始論文 DOI](https://doi.org/10.1007/s43032-026-02230-4)
