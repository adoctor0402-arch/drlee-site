#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
小王子醫師・備孕筆記　社群圖卡產生器

用法：
    python3 scripts/make-cards.py cards/便利商店.json 輸出資料夾/

輸入是一個 JSON，裡面是一串卡片。每張卡片有 type，目前支援四種：
    cover    海報感封面（可放主視覺照片）
    stat     數據卡（大數字）
    list     清單卡（勾與叉）
    concept  觀念卡（一張講一件事）
    a4       門診列印用的單頁清單，輸出 PDF

輸出是 1080×1350 的 PNG，IG 與 Threads 的原生比例，不會被裁。

品牌規格鎖定在下面的 TOKENS，不要在個別卡片裡改顏色。
"""
import json, sys, os, asyncio, html

sys.path.insert(0, "/home/claude/.npm-global/lib/node_modules")

W, H = 1080, 1350

# ── 品牌規格（鎖定，不要個別更動）───────────────────────────
TOKENS = {
    "ink":      "#140D08",   # 深底
    "ink2":     "#231810",   # 深底的次層
    "gold":     "#D99A3E",   # 主色・唯一的強調色
    "gold_dk":  "#C4843A",
    "cream":    "#FAF6EF",   # 淺底
    "paper":    "#FFFFFF",
    "line":     "#EDE4D6",   # 淺底的分隔線
    "text":     "#23201C",   # 淺底的字
    "muted":    "#9A9083",   # 淺底的次要字
    "onink":    "#F7F2E8",   # 深底的字
    "onink_mu": "#A3927A",   # 深底的次要字
    "ok":       "#2F5F4E",   # 勾
    "no":       "#C0523A",   # 叉
    "sans":     '"Noto Sans CJK TC",sans-serif',
    "serif":    '"Noto Serif CJK TC",serif',
}
T = TOKENS

BRAND = f"""<div class="mark">小王子醫師<span>備 孕 筆 記</span></div>"""

BASE = f"""
*{{margin:0;padding:0;box-sizing:border-box}}
html,body{{width:{W}px;height:{H}px}}
body{{font-family:{T['sans']};position:relative;overflow:hidden}}
.mark{{font-family:{T['serif']};font-size:28px;font-weight:700;letter-spacing:2px;text-align:right;line-height:1.45;white-space:nowrap}}
.mark span{{display:block;font-family:{T['sans']};font-size:19px;font-weight:300;letter-spacing:5px}}
.grain{{position:absolute;inset:0;opacity:.15;mix-blend-mode:overlay;pointer-events:none}}
"""
GRAIN = ('<svg class="grain"><filter id="n"><feTurbulence type="fractalNoise" '
         'baseFrequency="0.85" numOctaves="3"/></filter>'
         '<rect width="100%" height="100%" filter="url(#n)"/></svg>')


def esc(s):
    return html.escape(str(s)).replace("\n", "<br>")


# ── cover ───────────────────────────────────────────────────
def cover(c):
    photo = c.get("photo")
    stage = (f'<img class="hero" src="{photo}">' if photo else
             '<div class="plate"></div><div class="shadow"></div>'
             '<div class="ph">主視覺照片放這裡<b>把 photo 欄位指到圖檔即可</b></div>')
    calls = ""
    for side, cl in (("a", c.get("left")), ("b", c.get("right"))):
        if not cl:
            continue
        sub = f'<small>{esc(cl.get("sub",""))}</small>' if cl.get("sub") else ""
        calls += f'<div class="call {side}">{esc(cl["text"])}{sub}</div>'
    arrows = """
<svg class="arw" style="left:96px;top:600px" width="190" height="230" viewBox="0 0 190 230">
  <path d="M18 8C8 66 26 128 86 176"/><path d="M58 176l32 10 4-36"/></svg>
<svg class="arw" style="right:92px;top:578px" width="200" height="236" viewBox="0 0 200 236">
  <path d="M178 8C190 64 170 126 108 174"/><path d="M136 172l-34 12 0-36"/></svg>"""
    return f"""<style>{BASE}
body{{color:{T['onink']};background:
 radial-gradient(ellipse 70% 42% at 50% 74%, rgba(217,154,62,.26), transparent 62%),
 radial-gradient(ellipse 95% 60% at 50% 100%, rgba(120,72,30,.32), transparent 70%),
 radial-gradient(ellipse 120% 80% at 50% 16%, #3A2A1E 0%, {T['ink2']} 46%, {T['ink']} 100%)}}
.vig{{position:absolute;inset:0;background:radial-gradient(ellipse 78% 62% at 50% 56%,transparent 36%,rgba(0,0,0,.72) 100%)}}
.stage{{position:absolute;left:50%;transform:translateX(-50%);bottom:188px;width:770px;height:470px}}
.stage.hasphoto{{bottom:368px;width:716px;height:396px}}
.hero{{width:100%;height:100%;object-fit:cover;border-radius:10px;filter:drop-shadow(0 30px 50px rgba(0,0,0,.65)) saturate(1.04) contrast(1.03);-webkit-mask-image:radial-gradient(ellipse 74% 76% at 50% 54%,#000 40%,rgba(0,0,0,.30) 78%,transparent 100%)}}
.plate{{position:absolute;inset:0;border-radius:50%/42%;filter:blur(2px);
 background:radial-gradient(ellipse 58% 52% at 50% 44%, rgba(217,154,62,.38), rgba(120,72,30,.14) 56%, transparent 74%)}}
.shadow{{position:absolute;left:8%;right:8%;bottom:14px;height:62px;border-radius:50%;filter:blur(10px);
 background:radial-gradient(ellipse at center, rgba(0,0,0,.70), transparent 72%)}}
.ph{{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);text-align:center;
 font-size:25px;letter-spacing:7px;color:rgba(247,242,232,.34);font-weight:300;line-height:2.1}}
.ph b{{display:block;font-size:19px;letter-spacing:4px;color:rgba(247,242,232,.22);font-weight:300}}
header{{position:absolute;left:0;right:0;top:74px;text-align:center;z-index:5}}
.whisk{{position:absolute;top:36px}} .whisk.l{{left:120px}} .whisk.r{{right:120px}}
h1{{font-family:{T['serif']};font-weight:900;font-size:122px;line-height:1.06;letter-spacing:-2px;
 text-shadow:0 6px 36px rgba(0,0,0,.6)}}
h1 .s{{display:block;font-size:92px;letter-spacing:4px}}
.sub{{margin-top:26px;font-size:30px;letter-spacing:9px;color:#D9CDBA}}
.call{{position:absolute;z-index:6;font-weight:900;line-height:1.16;letter-spacing:1px;font-size:54px;
 text-shadow:0 4px 22px rgba(0,0,0,.75)}}
.call.a{{left:46px;top:452px;transform:rotate(-13deg)}}
.call.b{{right:44px;top:430px;transform:rotate(9deg);text-align:right}}
.call small{{display:block;font-size:30px;font-weight:500;letter-spacing:3px;margin-top:8px;color:#EBD9B8}}
svg.arw{{position:absolute;z-index:6;overflow:visible}}
svg.arw path{{fill:none;stroke:{T['onink']};stroke-width:7;stroke-linecap:round;stroke-linejoin:round}}
footer{{position:absolute;left:0;right:0;bottom:62px;text-align:center;z-index:5}}
.cta{{font-size:46px;font-weight:900;letter-spacing:11px}}
.hair{{width:108px;height:2px;background:rgba(247,242,232,.35);margin:24px auto 22px}}
.lede{{font-size:27px;letter-spacing:2px;color:#CDBFA8;font-weight:300;line-height:1.75}}
footer .mark{{margin-top:18px;text-align:center}}
footer .mark span{{color:{T['onink_mu']}}}
</style>
<div class="vig"></div>{GRAIN}
<header>
 <svg class="whisk l" width="130" height="86" viewBox="0 0 130 86"><g fill="none" stroke="{T['onink']}" stroke-width="6" stroke-linecap="round"><path d="M126 10C92 4 44 14 12 40"/><path d="M122 40C94 40 58 50 30 70"/></g></svg>
 <svg class="whisk r" width="130" height="86" viewBox="0 0 130 86"><g fill="none" stroke="{T['onink']}" stroke-width="6" stroke-linecap="round"><path d="M4 10C38 4 86 14 118 40"/><path d="M8 40C36 40 72 50 100 70"/></g></svg>
 <h1>{esc(c['title1'])}<span class="s">{esc(c['title2'])}</span></h1>
 <div class="sub">{esc(c.get('sub',''))}</div>
</header>
{calls}{arrows}
<div class="stage{" hasphoto" if c.get("photo") else ""}">{stage}</div>
<footer><div class="cta">{esc(c.get('cta','完 整 清 單'))}</div><div class="hair"></div>
<div class="lede">{esc(c.get('lede',''))}</div>{BRAND}</footer>"""


# ── stat ────────────────────────────────────────────────────
def stat(c):
    doses = "".join(
        f'<div class="d{" on" if d.get("on") else ""}"><div class="q">{esc(d["q"])}</div>'
        f'<div class="s">{esc(d.get("s",""))}</div></div>' for d in c.get("dose", []))
    dose_block = (f'<div class="dose">{doses}</div>'
                  f'<div class="dcap">{esc(c.get("dosecap",""))}</div>') if doses else ""
    nums = "".join(
        f'<div class="n"><div class="who">{esc(n["who"])}</div><div class="v">{esc(n["v"])}</div>'
        f'<div class="ci">{esc(n.get("ci",""))}</div><div class="cap">{esc(n.get("cap",""))}</div></div>'
        for n in c["nums"])
    return f"""<style>{BASE}
body{{background:{T['ink']};color:{T['onink']};display:flex;flex-direction:column;padding:84px 78px 70px}}
body::after{{content:"";position:absolute;right:-230px;top:-230px;width:640px;height:640px;border-radius:50%;
 background:radial-gradient(circle,rgba(217,154,62,.16),transparent 66%)}}
.eyebrow{{display:flex;align-items:center;gap:18px;font-size:25px;letter-spacing:5px;color:{T['gold']};font-weight:500}}
.eyebrow::before{{content:"";width:58px;height:3px;background:{T['gold']}}}
h1{{font-size:84px;line-height:1.19;font-weight:900;margin-top:38px;letter-spacing:-1px}}
h1 em{{font-style:normal;color:{T['gold']}}}
.lede{{margin-top:26px;font-size:30px;line-height:1.72;color:#9FAEBD;font-weight:300;max-width:830px}}
.dose{{margin-top:62px;display:flex;gap:16px}}
.d{{flex:1;border:1px solid #2E2317;border-radius:18px;padding:26px 22px;text-align:center;background:#1C140C}}
.d.on{{background:{T['gold']};border-color:{T['gold']}}}
.d .q{{font-size:30px;font-weight:700;color:#A3927A}} .d.on .q{{color:#231810}}
.d .s{{font-size:22px;margin-top:10px;color:#75654F;font-weight:300}} .d.on .s{{color:#5A4312;font-weight:500}}
.dcap{{margin-top:22px;font-size:25px;color:{T['onink_mu']};font-weight:300}}
.nums{{margin-top:52px;display:flex;gap:30px}}
.n{{flex:1;background:#1C140C;border:1px solid #2E2317;border-radius:26px;padding:38px 38px 34px}}
.n .who{{font-size:28px;color:#A3927A;letter-spacing:3px;font-weight:500}}
.n .v{{font-size:124px;font-weight:900;line-height:1;margin-top:16px;letter-spacing:-5px;color:{T['gold']}}}
.n .ci{{font-size:23px;color:#75654F;margin-top:16px;font-weight:300}}
.n .cap{{font-size:25px;color:#C9BBA6;margin-top:24px;padding-top:22px;border-top:1px solid #2E2317;font-weight:300}}
.foot{{margin-top:auto;padding-top:40px;display:flex;justify-content:space-between;align-items:flex-end;gap:40px}}
.src{{font-size:21px;line-height:1.75;color:#75654F;font-weight:300;max-width:700px}}
.foot .mark span{{color:#75654F}}
</style>{GRAIN}
<div class="eyebrow">{esc(c.get('eyebrow',''))}</div>
<h1>{c['title']}</h1>
<p class="lede">{esc(c.get('lede',''))}</p>
{dose_block}
<div class="nums">{nums}</div>
<div class="foot"><div class="src">{esc(c.get('src',''))}</div>{BRAND}</div>"""


# ── list ────────────────────────────────────────────────────
def listcard(c):
    blocks = ""
    for b in c["blocks"]:
        rows = []
        for i in b["yes"]:
            why = i.get("why")
            whyhtml = '<span class="why">' + esc(why) + "</span>" if why else ""
            rows.append('<li><span class="ic">\u2713</span><span>'
                        + esc(i["t"]) + whyhtml + "</span></li>")
        items = "".join(rows)
        no = (f'<div class="no"><span class="ic">✕</span>'
              f'<span class="t">{esc(b["no"])}</span></div>') if b.get("no") else ""
        blocks += (f'<div class="card"><span class="chip">{esc(b["chip"])}</span>'
                   f'<ul>{items}</ul>{no}</div>')
    return f"""<style>{BASE}
body{{background:{T['cream']};color:{T['text']};padding:58px 58px 48px;display:flex;flex-direction:column}}
.top{{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:28px}}
h1{{font-size:55px;font-weight:900;letter-spacing:-1px}}
.page{{font-size:24px;color:{T['muted']};letter-spacing:4px;font-weight:500}}
.card{{background:{T['paper']};border-radius:30px;padding:30px 36px 28px;margin-bottom:20px;
 box-shadow:0 2px 0 {T['line']},0 18px 40px rgba(93,76,48,.07)}}
.chip{{display:inline-block;background:{T['ok']};color:#fff;font-size:24px;font-weight:700;
 letter-spacing:4px;padding:8px 22px;border-radius:999px}}
ul{{list-style:none;margin-top:20px}}
li{{display:flex;gap:16px;align-items:flex-start;font-size:29px;line-height:1.45;margin-bottom:12px;font-weight:500}}
li .ic{{flex:0 0 36px;height:36px;border-radius:50%;background:#E7F0EA;color:{T['ok']};font-size:21px;
 font-weight:900;display:flex;align-items:center;justify-content:center;margin-top:5px}}
li .why{{display:block;font-size:21px;color:{T['muted']};font-weight:300;margin-top:3px;line-height:1.45}}
.no{{margin-top:20px;padding-top:18px;border-top:2px dashed {T['line']};display:flex;gap:16px;align-items:flex-start}}
.no .ic{{flex:0 0 36px;height:36px;border-radius:50%;background:#FBEAE4;color:{T['no']};font-size:21px;
 font-weight:900;display:flex;align-items:center;justify-content:center;margin-top:4px}}
.no .t{{font-size:25px;line-height:1.55;color:{T['no']};font-weight:500}}
.foot{{margin-top:auto;display:flex;justify-content:space-between;align-items:center;
 padding-top:24px;border-top:2px solid {T['line']}}}
.foot .l{{font-size:23px;color:{T['muted']};line-height:1.6;font-weight:300}}
.foot .mark span{{color:{T['muted']}}}
</style>
<div class="top"><h1>{esc(c['title'])}</h1><div class="page">{esc(c.get('page',''))}</div></div>
{blocks}
<div class="foot"><div class="l">{esc(c.get('note',''))}</div>{BRAND}</div>"""


# ── concept ─────────────────────────────────────────────────
def concept(c):
    notes = "".join(f"<p>{esc(n)}</p>" for n in c.get("notes", []))
    big = (f'<div class="zero"><div class="box">{esc(c["big"])}</div>'
           f'<div class="arrow">＝</div><div class="expl">{c["expl"]}</div></div>') if c.get("big") else ""
    return f"""<style>{BASE}
body{{background:#F3EEE4;color:#2B2722;padding:92px 86px 74px;display:flex;flex-direction:column}}
.kicker{{font-size:23px;letter-spacing:9px;color:{T['onink_mu']};font-weight:400}}
.rule{{height:1px;background:#D3C7B2;margin:26px 0 54px}}
h1{{font-family:{T['serif']};font-size:98px;font-weight:700;line-height:1.26;letter-spacing:-1px}}
h1 u{{text-decoration:none;border-bottom:7px solid {T['gold_dk']};padding-bottom:4px}}
.zero{{margin:66px 0 0;display:flex;align-items:center;gap:40px}}
.box{{width:228px;height:228px;border:4px solid #2B2722;border-radius:22px;display:flex;align-items:center;
 justify-content:center;font-family:{T['serif']};font-size:142px;font-weight:700;background:#fff;flex:0 0 auto}}
.arrow{{font-size:46px;color:{T['onink_mu']};flex:0 0 auto}}
.expl{{font-size:37px;line-height:1.66;font-weight:400;color:#4A443B}}
.expl b{{font-weight:900;color:#2B2722}}
.notes{{margin-top:auto;border-top:1px solid #D3C7B2;padding-top:38px}}
.notes p{{font-size:27px;line-height:1.78;color:#6E6559;font-weight:300;margin-bottom:16px;padding-left:28px;position:relative}}
.notes p::before{{content:"";position:absolute;left:0;top:19px;width:12px;height:2px;background:{T['gold_dk']}}}
.foot{{margin-top:34px;display:flex;justify-content:space-between;align-items:flex-end}}
.src{{font-size:21px;color:#9A8F7F;font-weight:300;line-height:1.7}}
.foot .mark span{{color:#9A8F7F}}
</style>
<div class="kicker">{esc(c.get('kicker',''))}</div><div class="rule"></div>
<h1>{c['title']}</h1>{big}
<div class="notes">{notes}</div>
<div class="foot"><div class="src">{esc(c.get('src',''))}</div>{BRAND}</div>"""



# ── a4（門診列印用，輸出 PDF）─────────────────────────────
def a4(c):
    blocks = ""
    for b in c["blocks"]:
        rows = []
        for i in b["yes"]:
            why = i.get("why")
            whyhtml = '<span class="why">' + esc(why) + "</span>" if why else ""
            rows.append('<li><span class="ic">\u2713</span><span>'
                        + esc(i["t"]) + whyhtml + "</span></li>")
        no = ('<div class="no"><span class="ic">\u2715</span><span class="t">'
              + esc(b["no"]) + "</span></div>") if b.get("no") else ""
        blocks += ('<section><h2>' + esc(b["chip"]) + '</h2><div class="bd"><ul>'
                   + "".join(rows) + "</ul>" + no + "</div></section>")
    checks = "".join(
        '<div class="ck"><div class="n">' + esc(k["n"]) + '</div><div class="t">'
        + esc(k["t"]) + "</div></div>" for k in c.get("checks", []))
    return f"""<style>
@page{{size:A4;margin:13mm 12mm}}
*{{margin:0;padding:0;box-sizing:border-box}}
body{{font-family:{T['sans']};color:{T['text']};font-size:10.6pt;line-height:1.56;-webkit-print-color-adjust:exact}}
header{{border-bottom:2.5px solid {T['gold_dk']};padding-bottom:4mm;margin-bottom:5mm;
 display:flex;justify-content:space-between;align-items:flex-end}}
h1{{font-family:{T['serif']};font-size:22pt;font-weight:700;letter-spacing:.5px}}
.sub{{font-size:9pt;color:{T['muted']};margin-top:1.5mm}}
.brand{{font-family:{T['serif']};font-size:11.5pt;font-weight:700;text-align:right;line-height:1.4;white-space:nowrap}}
.brand span{{display:block;font-family:{T['sans']};font-size:7pt;font-weight:300;color:{T['muted']};letter-spacing:3px}}
.grid{{display:grid;grid-template-columns:1fr 1fr;gap:5.5mm}}
section{{break-inside:avoid;border:1px solid {T['line']};border-radius:2mm;overflow:hidden}}
h2{{font-size:11pt;margin:0;padding:2.8mm 3.6mm;background:{T['ok']};color:#fff;letter-spacing:3px}}
.bd{{padding:3.4mm 3.6mm}}
ul{{list-style:none}}
li{{display:flex;gap:2mm;align-items:flex-start;margin-bottom:2.2mm;font-size:10.6pt;font-weight:500}}
li .ic{{color:{T['ok']};font-weight:900;flex:0 0 auto}}
li .why{{display:block;font-size:9pt;color:{T['muted']};font-weight:300;margin-top:.4mm}}
.no{{margin-top:2.4mm;padding-top:2.2mm;border-top:1px dashed {T['line']};display:flex;gap:2mm;align-items:flex-start}}
.no .ic{{color:{T['no']};font-weight:900;flex:0 0 auto}}
.no .t{{font-size:9.6pt;color:{T['no']};font-weight:500}}
.checks{{grid-column:1/-1;display:grid;grid-template-columns:repeat(3,1fr);gap:3.5mm;margin-top:1mm}}
.ck{{border:1px solid {T['line']};border-left:3px solid {T['gold_dk']};border-radius:1.5mm;padding:2.6mm 3mm;background:#FCFAF6}}
.ck .n{{font-size:9pt;color:{T['gold_dk']};font-weight:700;letter-spacing:2px}}
.ck .t{{font-size:10pt;margin-top:.8mm}}
footer{{margin-top:6mm;padding-top:3.5mm;border-top:1px solid {T['line']};font-size:8.2pt;color:{T['muted']};line-height:1.6}}
</style>
<header><div><h1>{esc(c['title'])}</h1><div class="sub">{esc(c.get('sub',''))}</div></div>
<div class="brand">小王子醫師<span>備 孕 筆 記</span></div></header>
<div class="grid">{blocks}<div class="checks">{checks}</div></div>
<footer>{esc(c.get('foot',''))}</footer>"""


RENDER = {"cover": cover, "stat": stat, "list": listcard, "concept": concept, "a4": a4}


async def run(cards, outdir, base):
    from playwright.async_api import async_playwright
    os.makedirs(outdir, exist_ok=True)
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for i, c in enumerate(cards, 1):
            body = RENDER[c["type"]](c)
            doc = f'<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><base href="file://{base}/"></head><body>{body}</body></html>'
            f = os.path.join(outdir, f"_{i:02d}.html")
            open(f, "w", encoding="utf-8").write(doc)
            is_a4 = c["type"] == "a4"
            vp = {"width": 794, "height": 1123} if is_a4 else {"width": W, "height": H}
            pg = await b.new_page(viewport=vp, device_scale_factor=1)
            await pg.goto("file://" + os.path.abspath(f))
            await pg.wait_for_timeout(450)
            name = c.get("name", f"{i:02d}")
            if is_a4:
                out = os.path.join(outdir, f"{i:02d}-{name}.pdf")
                await pg.pdf(path=out, format="A4", print_background=True)
                flag = ""
            else:
                out = os.path.join(outdir, f"{i:02d}-{name}.png")
                await pg.screenshot(path=out)
                h = await pg.evaluate("document.body.scrollHeight")
                flag = "  ⚠ 內容超出畫布，請縮短文字" if h > H + 2 else ""
            print(f"{out}{flag}")
            await pg.close()
            os.remove(f)
        await b.close()


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(__doc__)
        sys.exit(1)
    spec = json.load(open(sys.argv[1], encoding="utf-8"))
    base = os.path.dirname(os.path.abspath(sys.argv[1]))
    asyncio.run(run(spec["cards"], sys.argv[2], base))
