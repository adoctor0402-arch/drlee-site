import re, sys, yaml

src = open(sys.argv[1], encoding="utf-8").read()
fm = yaml.safe_load(src.split('---')[1])
body = src.split('---', 2)[2].strip()

def clean(s):
    s = re.sub(r'\*\*(.+?)\*\*', r'\1', s)          # 粗體
    s = re.sub(r'\*(.+?)\*', r'\1', s)              # 斜體
    s = re.sub(r'`(.+?)`', r'\1', s)                # 行內程式碼
    s = re.sub(r'\[(.+?)\]\((.+?)\)', r'\1', s)     # 連結
    return s.strip()

out = []
out.append("小王子的備孕筆記｜文章草稿")
out.append("")
out.append("＝" * 34)
out.append("這是純文字版，給你直接改用的。")
out.append("")
out.append("・想怎麼改就怎麼改，不用管格式、不用管排版。")
out.append("・想刪整段就刪，想重寫就重寫。")
out.append("・句子裡的 [1] [2] 是引用編號，對應最後面的參考資料。")
out.append("  如果你把那句話刪掉或改寫，編號不用管，我會重新對。")
out.append("・改完把檔案（或整段文字）丟回來給我，我負責變回網站格式。")
out.append("＝" * 34)
out.append("")
out.append("")
out.append("【標題】")
out.append(clean(fm['title']))
out.append("")
out.append("【摘要】※ 會顯示在文章列表的卡片和 Google 搜尋結果上")
out.append(clean(fm['summary']))
out.append("")
out.append("【分類】" + fm['category'] + "　　【更新月份】" + str(fm['updated']))
out.append("")
out.append("")
out.append("─" * 34)
out.append("重點先看　※ 文章最上方的方框，讀者 30 秒掃完的部分")
out.append("─" * 34)
for i, k in enumerate(fm['keyPoints'], 1):
    out.append(f"{i}. {clean(k)}")
out.append("")
out.append("")

# 內文
lines = body.split('\n')
i = 0
while i < len(lines):
    ln = lines[i]
    st = ln.strip()

    if st.startswith('## '):
        out.append("")
        out.append("─" * 34)
        out.append(clean(st[3:]))
        out.append("─" * 34)
    elif st.startswith('### '):
        out.append("")
        out.append("■ " + clean(st[4:]))
    elif st.startswith('> '):
        out.append("")
        out.append("　　「" + clean(st[2:]) + "」")
        out.append("")
    elif st.startswith('|'):
        # 收集整個表格
        rows = []
        while i < len(lines) and lines[i].strip().startswith('|'):
            cells = [clean(c) for c in lines[i].strip().strip('|').split('|')]
            if not all(set(c) <= set('-: ') for c in cells):
                rows.append(cells)
            i += 1
        i -= 1
        hdr = rows[0]
        out.append("")
        for r in rows[1:]:
            out.append("　◆ " + r[0])
            for h, c in zip(hdr[1:], r[1:]):
                out.append(f"　　　{h}：{c}")
            out.append("")
    elif st.startswith('- '):
        out.append("・" + clean(st[2:]))
    elif st == '':
        if out and out[-1] != '':
            out.append("")
    else:
        out.append(clean(st))
    i += 1

out.append("")
out.append("")
out.append("─" * 34)
out.append("參考資料　※ 這些是文獻出處，你如果不動內容就不用改")
out.append("─" * 34)
for i, r in enumerate(fm['references'], 1):
    out.append(f"[{i}] {r['text']}")
    if r.get('url'):
        out.append(f"    {r['url']}")
    out.append("")

txt = '\n'.join(out)
txt = re.sub(r'\n{4,}', '\n\n\n', txt)
open(sys.argv[2], 'w', encoding='utf-8').write(txt)
print("字數:", len(txt))
