"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BookingButton } from "@/components/booking";
import { site } from "@/config/site";
import s from "@/app/sky/sky.module.css";
import { CAP, clbr, need, observed } from "./eggs-model";
import { eggSkySVG } from "./egg-stars";

type Step = "intro" | "question" | "result" | "more" | "share" | "about";
const QUESTIONS = ["age", "mii"] as const;

function EggSky({ mii, age, p, animate = true }: { mii: number; age: number; p: number | null; animate?: boolean }) {
  // SVG 字串完全由程式產生（無使用者輸入）
  return <div dangerouslySetInnerHTML={{ __html: eggSkySVG(mii, age, p, animate) }} />;
}

export function EggsApp() {
  const [step, setStep] = useState<Step>("intro");
  const [q, setQ] = useState(0);
  const [age, setAge] = useState(34);
  const [mii, setMii] = useState(10); // 已定案的顆數：星空跟著它重畫
  const [miiLive, setMiiLive] = useState(10); // 拖曳中的顆數：只改數字
  const [showNum, setShowNum] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light" | undefined>(undefined);

  const setBoth = (v: number) => {
    setMii(v);
    setMiiLive(v);
  };

  const go = (next: Step) => {
    setStep(next);
    window.scrollTo(0, 0);
  };
  const nextQ = () => {
    setBoth(miiLive);
    if (q < QUESTIONS.length - 1) setQ(q + 1);
    else go("result");
  };
  const backQ = () => (q > 0 ? setQ(q - 1) : go("intro"));

  const Progress = () => (
    <>
      <div className={s.progress}>
        {QUESTIONS.map((_, i) => (
          <i key={i} className={i <= q ? s.on : undefined} />
        ))}
      </div>
      <div className={s.qcount}>
        第 {q + 1} 題，共 {QUESTIONS.length} 題
      </div>
    </>
  );

  const Nav = () => (
    <>
      <div className={s.spacer} />
      <button className={s.btn} onClick={nextQ}>
        {q < QUESTIONS.length - 1 ? "下一題" : "點亮我的星空"}
      </button>
      <button className={s.link} onClick={backQ}>
        {q ? "上一題" : "回首頁"}
      </button>
    </>
  );

  const Legend = ({ showGlow }: { showGlow: boolean }) => (
    <div className={s.legend}>
      <i />
      星星數＝目前累積的成熟卵子（MII）；星星亮度＝年齡相關生殖潛力
      {showGlow ? "；整片光暈＝模型估計的累積活產／持續妊娠機率。" : "。"}
      <br />
      亮度是年齡層面的概念呈現，不代表任何一顆卵子實際的染色體狀態。
    </div>
  );

  function question() {
    if (QUESTIONS[q] === "age")
      return (
        <>
          <Progress />
          <h2>這些卵子是在幾歲時取得的？</h2>
          <div className={s.qhint}>是「凍卵當時」的年齡，不是現在的年齡。</div>
          <div className={s.bignum}>
            {age}
            <small>歲</small>
          </div>
          <div className={s.stepper}>
            <button aria-label="減一歲" onClick={() => setAge(Math.max(25, age - 1))}>
              −
            </button>
            <button aria-label="加一歲" onClick={() => setAge(Math.min(45, age + 1))}>
              +
            </button>
          </div>
          <input
            type="range"
            min={25}
            max={45}
            value={age}
            aria-label="凍卵時年齡"
            onChange={(e) => setAge(+e.target.value)}
          />
          <Nav />
        </>
      );
    return (
      <>
        <Progress />
        <h2>目前保存了幾顆成熟卵子？</h2>
        <div className={s.qhint}>請填未來可供解凍使用的 MII（成熟卵子）總數，多次取卵請加總。</div>
        <div className={s.bignum}>
          {miiLive}
          <small>顆</small>
        </div>
        <div className={s["hero-sky"]}>
          <EggSky mii={mii} age={age} p={null} />
        </div>
        <div className={s.stepper}>
          <button aria-label="減一顆" onClick={() => setBoth(Math.max(1, miiLive - 1))}>
            −
          </button>
          <button aria-label="加一顆" onClick={() => setBoth(Math.min(80, miiLive + 1))}>
            +
          </button>
        </div>
        {/* 拖曳中只改數字，放開才重畫星空 */}
        <input
          type="range"
          min={1}
          max={80}
          value={miiLive}
          aria-label="成熟卵子數"
          onChange={(e) => setMiiLive(+e.target.value)}
          onPointerUp={() => setMii(miiLive)}
          onKeyUp={() => setMii(miiLive)}
          onBlur={() => setMii(miiLive)}
        />
        <Nav />
      </>
    );
  }

  function view() {
    if (step === "intro")
      return (
        <>
          <div className={s["hero-sky"]}>
            <EggSky mii={12} age={32} p={0.45} />
          </div>
          <h1>
            我的卵子，
            <br />
            夠不夠？
          </h1>
          <p className={s.muted}>
            輸入<strong>凍卵當時的年齡</strong>與<strong>成熟卵子（MII）數</strong>
            ，看看在真實回來解凍冷凍卵子的族群中，至少迎來一個寶寶的累積機率大約落在哪裡。
          </p>
          <p className={`${s.small} ${s.muted}`}>
            主要依據 NYU 2024 年 731 位實際解凍患者的研究。這是族群層級的衛教估計，不是個人成功保證，也不能取代門診評估。
          </p>
          <div className={s.spacer} />
          <button
            className={s.btn}
            onClick={() => {
              setQ(0);
              go("question");
            }}
          >
            開始
          </button>
          <button className={s.link} onClick={() => go("about")}>
            研究依據與限制
          </button>
        </>
      );

    if (step === "question") return question();

    if (step === "result") {
      const { p, capped } = clbr(age, mii);
      const model = Math.round(p * 100);
      const obs = observed(age, mii);
      const lo = Math.min(model, obs.p);
      const hi = Math.max(model, obs.p);
      const diff = Math.abs(model - obs.p);
      const targets = [0.5, 0.6, 0.7, 0.8];
      return (
        <>
          <EggSky mii={mii} age={age} p={p} />
          <Legend showGlow />
          <p className={s.range}>
            {age} 歲取得的 {mii} 顆成熟卵子，估計至少一個活產／持續妊娠的累積機率約在{" "}
            <strong>
              {lo}–{hi}%
            </strong>{" "}
            之間。
          </p>
          <div className={s.cmp2}>
            <div className={`${s.box} ${s.model}`}>
              <b>{model}%</b>
              <span>文獻模型估計{capped ? "（已封頂）" : ""}</span>
            </div>
            <div className={s.box}>
              <b>{obs.p}%</b>
              <span>
                研究中同組實際觀察
                <br />（{obs.ageLabel} 歲・{obs.miiLabel} 顆，n={obs.n}）
              </span>
            </div>
          </div>
          {diff >= 10 ? (
            <div className={s.flag}>
              <b>兩個數字差距較大。</b>在「{obs.ageLabel} 歲、{obs.miiLabel} 顆」這一格，平滑模型
              {model > obs.p ? "高於" : "低於"}實際觀察值 {diff} 個百分點。該格只有 {obs.n} 人，估計本來就不穩定；
              {model > obs.p ? "實際狀況可能比模型樂觀值保守。" : "模型在此區間偏保守。"}
              請以較寬的區間理解，並與醫師討論。
            </div>
          ) : null}
          {capped ? (
            <p className={`${s.small} ${s.muted}`}>
              模型的數學式對卵數是線性的，外推時會沒有上限，但研究中任何一組的實際結果都未超過約 78%。因此顯示值封頂於{" "}
              {Math.round(CAP * 100)}%。
            </p>
          ) : null}
          <div className={s.note}>
            <b>研究原型：</b>論文公開了年齡與 MII 的迴歸係數，但未公開截距；本版截距依作者的案例反推重建，因此不是作者的官方計算器。
          </div>
          <h2 style={{ fontSize: 21, marginTop: 24 }}>距離各個目標還有多遠</h2>
          <div className={s.row}>
            {targets.map((t) => {
              const nd = need(age, t);
              const d = Math.max(0, nd - mii);
              const far = nd > 45;
              return (
                <div key={t} className={`${s.tgt} ${d === 0 ? s.done : ""} ${far ? s.off : ""}`}>
                  <span>模型 {Math.round(t * 100)}% 目標</span>
                  <b>{d === 0 ? "✓ 已達到" : far ? `約需 ${nd} 顆・超出研究觀察範圍` : `約需 ${nd} 顆・再 ${d} 顆`}</b>
                </div>
              );
            })}
          </div>
          <p className={`${s.small} ${s.muted}`}>
            這些是「依此文獻模型估計，相近族群要達到該機率所對應的成熟卵數」，不是「妳一定需要幾顆」。研究中實際解凍 45
            顆以上的人非常少，超出範圍的數字僅供理解趨勢。
          </p>
          <div className={s.spacer} />
          <div className={s.row}>
            <button className={s.btn} onClick={() => go("more")}>
              如果再多凍 5–15 顆呢？
            </button>
            <button className={`${s.btn} ${s.ghost}`} onClick={() => go("share")}>
              製作分享卡
            </button>
          </div>
          <button
            className={s.link}
            onClick={() => {
              setQ(0);
              go("question");
            }}
          >
            重新填寫
          </button>
        </>
      );
    }

    if (step === "more") {
      const vals = [0, 5, 10, 15].map((d) => {
        const m = mii + d;
        const c = clbr(age, m);
        return [m, Math.round(c.p * 100), c.capped] as [number, number, boolean];
      });
      return (
        <>
          <h2>再多收藏一些星星</h2>
          <p className={s.muted}>固定凍卵年齡 {age} 歲，只改變成熟卵子總數，在同一條迴歸線上做情境模擬。</p>
          <div className={s.compare} style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
            {vals.map(([n, pc, c]) => (
              <div key={n} className={`${s.col} ${n === mii ? s.now : s.later}`}>
                <div className={s.bar}>
                  <span style={{ height: `${Math.max(8, pc * 1.15)}px` }} />
                </div>
                <div className={s.val} style={{ fontSize: 26 }}>
                  {pc}
                  {c ? "+" : ""}%
                </div>
                <div className={s.lab} style={{ fontSize: 12.5 }}>
                  {n} 顆
                </div>
              </div>
            ))}
          </div>
          <div className={s.note}>
            這回答的是「如果能累積更多成熟卵子，模型機率如何變化」，不等於建議再做一次取卵。實際決策還要看現在的年齡、AMH／AFC、過去的刺激反應、身體風險與家庭目標——這些屬於下一版的「下一次取卵預測」模組，也是門診裡才談得完整的部分。
          </div>
          <div className={s.spacer} />
          <div className={s.row}>
            <button className={s.btn} onClick={() => go("share")}>
              製作分享卡
            </button>
            <button className={`${s.btn} ${s.ghost}`} onClick={() => go("result")}>
              回到我的星空
            </button>
          </div>
        </>
      );
    }

    if (step === "share") {
      const { p } = clbr(age, mii);
      const model = Math.round(p * 100);
      const obs = observed(age, mii);
      const lo = Math.min(model, obs.p);
      const hi = Math.max(model, obs.p);
      return (
        <>
          <h2>我的分享卡</h2>
          <p className={`${s.small} ${s.muted}`}>預設不顯示數字，避免族群估計被誤解成個人保證。</p>
          <label className={s.toggle}>
            <span>在卡片上顯示估計區間</span>
            <input type="checkbox" checked={showNum} onChange={(e) => setShowNum(e.target.checked)} />
          </label>
          <div className={`${s.card916} ${s.light}`}>
            <div style={{ fontSize: 12, color: "#6A73A6" }}>我的卵子星空</div>
            <div className={s.ct}>
              {showNum ? (
                <>
                  {age} 歲・{mii} 顆成熟卵子
                  <br />
                  文獻模型估計約 {lo}–{hi}%
                </>
              ) : (
                <>
                  每一顆卵子，
                  <br />
                  都是為未來留下的一種可能。
                </>
              )}
            </div>
            <div style={{ margin: "14px -6px 0" }}>
              <EggSky mii={mii} age={age} p={p} animate={false} />
            </div>
            <div className={s.cf} style={{ marginTop: "auto" }}>
              <span>
                卵子星空
                <br />
                研究／衛教原型
              </span>
              <b>茂盛醫院小王子</b>
            </div>
          </div>
          <div className={s.row}>
            <BookingButton className={s.btn}>預約諮詢，和醫師聊聊</BookingButton>
            <button className={`${s.btn} ${s.ghost}`} onClick={() => go("result")}>
              回到我的星空
            </button>
          </div>
        </>
      );
    }

    return (
      <>
        <div className={`${s.sticker} ${s["top-sticker"]}`}>
          <Image src={site.art.books} alt="小王子醫師坐在醫學書堆上閱讀" width={1145} height={1374} sizes="400px" />
        </div>
        <h2>研究依據與限制</h2>
        <details open>
          <summary>主要根據哪一篇研究？</summary>
          <p>
            Cascante SD 等人，Journal of Assisted Reproduction and Genetics 2024;41:2979–2985。納入 731
            位實際回來解凍自體冷凍卵子的患者（527 位做過 1 次取卵、149 位 2 次、55 位 ≥3 次），整體累積活產／持續妊娠率
            43%。首次凍卵年齡與解凍的成熟卵總數都是獨立預測因子，凍卵週期數本身不是。
          </p>
        </details>
        <details>
          <summary>為什麼同時顯示兩個數字？</summary>
          <p>
            左邊是平滑迴歸模型的估計，右邊是研究中同一格（年齡 × 卵數）的真實觀察值與人數。模型在 35
            歲以下、卵數較少的區間明顯高於實際觀察值，因此本版不再只顯示一個看似精準的百分比，而是呈現一段區間。
          </p>
        </details>
        <details>
          <summary>截距是怎麼來的？</summary>
          <p>
            論文公開了年齡係數 −0.14 與 MII 係數 +0.07，但未公開截距。本原型依作者的案例（34 歲／10 顆約 49%）反推得到約
            4.02，並以第二個案例（34 歲／20 顆約 66%）驗證吻合。這是重建值，不是作者公布的官方方程式。
          </p>
        </details>
        <details>
          <summary>星星的意義是什麼？</summary>
          <p>
            星星數量＝目前累積的成熟卵子數；亮度＝年齡相關的生殖潛力（概念呈現，不代表單顆卵子的染色體狀態）；整片光暈＝模型估計的累積活產機率。另一個工具「你們的星空」中，100
            顆星代表 100 對伴侶，兩者意義不同。
          </p>
        </details>
        <details>
          <summary>台灣的法規限制</summary>
          <p>
            單身女性在台灣凍卵合法，但依現行《人工生殖法》，後續解凍使用須為不孕的合法夫妻。行政院版修正草案已將未婚女性與已婚女同性配偶納入適用對象並送立法院審議，2026
            年 7 月完成部分條文初審（代理孕母脫鉤處理），截至 2026 年 9 月尚未三讀通過。實際請以最新公告為準。
          </p>
        </details>
        <details>
          <summary>還沒加入什麼？</summary>
          <p>
            下一版可加入 Age + MII → 至少一顆整倍體囊胚的模組，以及以 AMH／AFC 預測「下一次取卵可能取得多少卵」。AMH
            用於預測未來取卵反應，不應拿來重新調整已經冷凍好的卵子。正式病人版應先以茂盛院內的解凍、囊胚形成、PGT-A
            與活產資料做外部驗證與再校準。
          </p>
        </details>
        <details>
          <summary>醫療提醒</summary>
          <p>本工具為研究與衛教原型，不是醫療器材，也不是個人化治療建議。任何治療決定請與生殖醫學專科醫師討論。</p>
        </details>
        <div className={s.spacer} />
        <div style={{ height: 16 }} />
        <button
          className={s.btn}
          onClick={() => {
            setQ(0);
            go("question");
          }}
        >
          開始試算
        </button>
        <Link className={s.link} href="/sky" style={{ display: "block", textAlign: "center" }}>
          另一個工具：你們的星空（自然懷孕機率）
        </Link>
        <Link className={s.link} href="/" style={{ display: "block", textAlign: "center" }}>
          回小王子醫師網站
        </Link>
      </>
    );
  }

  return (
    <div className={s.app} data-theme={theme}>
      <div className={s.wrap}>
        <div className={s.brand}>
          <b>我的卵子，夠不夠？</b>
          <button
            className={s.theme}
            onClick={() =>
              setTheme((t) => {
                const cur = t ?? (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
                return cur === "light" ? "dark" : "light";
              })
            }
            aria-label="切換深淺色"
          >
            {theme === "light" ? "夜空" : theme === "dark" ? "晨光" : "切換色調"}
          </button>
        </div>
        <div key={step + (step === "question" ? q : "")} className={s.fade} style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          {view()}
        </div>
      </div>
    </div>
  );
}
