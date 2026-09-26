"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BookingButton } from "@/components/booking";
import { site } from "@/config/site";
import s from "@/app/sky/sky.module.css";
import { DIAGNOSES, guidance, riskcalc, type ModelInput } from "./model";
import { skySVG } from "./stars";

type Step = "intro" | "question" | "result" | "compare" | "share" | "about";
const QUESTIONS = ["age", "dur", "bmi", "sec", "smoke", "alc", "dx"] as const;
type QKey = (typeof QUESTIONS)[number];

const ART = {
  hero: { src: site.art.hero, alt: "小王子醫師坐在星球上，身旁有一隻小狐狸，遠方是茂盛醫院", w: 1254, h: 1254 },
  bubble: { src: site.art.embryo, alt: "小王子醫師抱著發光的胚胎", w: 1024, h: 1536 },
  plane: { src: site.art.plane, alt: "小王子醫師和小狐狸搭著飛機", w: 1145, h: 1374 },
  earth: { src: site.art.globe, alt: "小王子醫師擁抱地球", w: 1024, h: 1536 },
  books: { src: site.art.books, alt: "小王子醫師坐在醫學書堆上閱讀", w: 1145, h: 1374 },
};

function Sky({ n, animate = true, label = "" }: { n: number; animate?: boolean; label?: string }) {
  // SVG 字串完全由程式產生（無使用者輸入）
  return <div dangerouslySetInnerHTML={{ __html: skySVG(n, animate, label) }} />;
}

export function SkyApp() {
  const [step, setStep] = useState<Step>("intro");
  const [q, setQ] = useState(0);
  const [age, setAge] = useState(32);
  const [dur, setDur] = useState(1.5);
  const [h, setH] = useState("");
  const [w, setW] = useState("");
  const [sec, setSec] = useState<number | null>(null);
  const [smoke, setSmoke] = useState<number | null>(null);
  const [alc, setAlc] = useState<number | null>(null);
  const [dx, setDx] = useState<string[]>([]);
  const [showNum, setShowNum] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light" | undefined>(undefined);
  const numRef = useRef<HTMLElement>(null);

  const bmiVal = () => {
    const hh = parseFloat(h) / 100;
    const ww = parseFloat(w);
    return hh > 1 && ww > 20 ? ww / (hh * hh) : null;
  };

  const data = (extra = 0): ModelInput => {
    const f = (k: string) => (dx.includes(k) ? 1 : 0);
    return {
      age: age + extra,
      dur: dur + extra,
      bmi: bmiVal() ?? 24.6,
      sec: sec ?? 0,
      smoke: smoke ?? 0,
      alc: alc ?? 0,
      male: f("male"),
      endo: f("endo"),
      ovu: f("ovu"),
      unexp: f("unexp"),
      tubal: f("tubal"),
      other: f("other"),
    };
  };

  const p = riskcalc(data());
  const n = Math.round(p * 100);

  // 結果頁的數字跟著星星一顆顆亮起來
  useEffect(() => {
    if (step !== "result") return;
    const el = numRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ms = n ? Math.min(90, 2400 / n) * n : 0;
    const t0 = performance.now() + 300;
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, Math.max(0, (t - t0) / ms));
      el.textContent = String(Math.round(n * k));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [step, n]);

  const go = (next: Step) => {
    setStep(next);
    window.scrollTo(0, 0);
  };
  const nextQ = () => (q < QUESTIONS.length - 1 ? setQ(q + 1) : go("result"));
  const backQ = () => (q > 0 ? setQ(q - 1) : go("intro"));

  const pick = (id: string) => {
    if (id === "none" || id === "unexp") setDx(dx.includes(id) ? [] : [id]);
    else {
      const base = dx.filter((x) => x !== "none" && x !== "unexp");
      setDx(base.includes(id) ? base.filter((x) => x !== id) : [...base, id]);
    }
  };

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

  const Nav = ({ ok = true }: { ok?: boolean }) => (
    <>
      <div className={s.spacer} />
      <button className={s.btn} disabled={!ok} onClick={nextQ}>
        下一題
      </button>
      <button className={s.link} onClick={backQ}>
        上一題
      </button>
    </>
  );

  const YesNo = ({
    value,
    onPick,
    title,
    hint,
    yes,
    no,
  }: {
    value: number | null;
    onPick: (v: number) => void;
    title: string;
    hint: string;
    yes: string;
    no: string;
  }) => (
    <>
      <Progress />
      <h2>{title}</h2>
      <div className={s.qhint}>{hint}</div>
      <div className={s.choices}>
        {([[1, yes], [0, no]] as [number, string][]).map(([v, t]) => (
          <button
            key={v}
            className={`${s.choice} ${value === v ? s.sel : ""}`}
            onClick={() => {
              onPick(v);
              setTimeout(nextQ, 220);
            }}
          >
            <span>{t}</span>
            <span className={s.dot} />
          </button>
        ))}
      </div>
      <div className={s.spacer} />
      <button className={s.link} onClick={backQ}>
        上一題
      </button>
    </>
  );

  const Sticker = ({ name, className }: { name: keyof typeof ART; className?: string }) => {
    const a = ART[name];
    return (
      <div className={className}>
        <Image src={a.src} alt={a.alt} width={a.w} height={a.h} sizes="400px" />
      </div>
    );
  };

  function question() {
    const k: QKey = QUESTIONS[q];
    if (k === "age")
      return (
        <>
          <Progress />
          <h2>女方現在幾歲？</h2>
          <div className={s.qhint}>年齡是影響機率最大的因素之一。</div>
          <div className={s.bignum}>
            {age}
            <small>歲</small>
          </div>
          <div className={s.stepper}>
            <button aria-label="減一歲" onClick={() => setAge(Math.max(18, age - 1))}>
              −
            </button>
            <button aria-label="加一歲" onClick={() => setAge(Math.min(49, age + 1))}>
              +
            </button>
          </div>
          <input type="range" min={18} max={49} value={age} aria-label="女方年齡" onChange={(e) => setAge(+e.target.value)} />
          <Nav />
        </>
      );
    if (k === "dur")
      return (
        <>
          <Progress />
          <h2>你們嘗試懷孕多久了？</h2>
          <div className={s.qhint}>從停止避孕、規律同房開始算。</div>
          <div className={s.bignum}>
            {dur}
            <small>年</small>
          </div>
          <input
            type="range"
            min={0.5}
            max={10}
            step={0.5}
            value={dur}
            aria-label="嘗試懷孕年數"
            onChange={(e) => setDur(+e.target.value)}
          />
          <Nav />
        </>
      );
    if (k === "bmi") {
      const b = bmiVal();
      return (
        <>
          <Progress />
          <h2>女方的身高和體重</h2>
          <div className={s.qhint}>用來計算 BMI。不確定的話可以跳過，會以平均值計算。</div>
          <div className={s.fields}>
            <div className={s.field}>
              <label htmlFor="sky-h">身高（公分）</label>
              <input id="sky-h" inputMode="decimal" value={h} placeholder="160" onChange={(e) => setH(e.target.value)} />
            </div>
            <div className={s.field}>
              <label htmlFor="sky-w">體重（公斤）</label>
              <input id="sky-w" inputMode="decimal" value={w} placeholder="55" onChange={(e) => setW(e.target.value)} />
            </div>
          </div>
          <div className={s.bmi}>{b ? `BMI ${b.toFixed(1)}` : ""}</div>
          <div className={s.spacer} />
          <button className={s.btn} onClick={nextQ}>
            {b ? "下一題" : "跳過"}
          </button>
          <button className={s.link} onClick={backQ}>
            上一題
          </button>
        </>
      );
    }
    if (k === "sec")
      return (
        <YesNo
          value={sec}
          onPick={setSec}
          title="女方以前懷孕過嗎？"
          hint="包含曾經生產、流產或子宮外孕，不論是否與現在的伴侶。"
          yes="懷孕過"
          no="從來沒有懷孕過"
        />
      );
    if (k === "smoke")
      return (
        <YesNo value={smoke} onPick={setSmoke} title="女方曾經抽菸嗎？" hint="包含已經戒菸。" yes="曾經或現在有抽" no="從來沒抽過" />
      );
    if (k === "alc")
      return <YesNo value={alc} onPick={setAlc} title="女方平常會喝酒嗎？" hint="偶爾小酌也算。" yes="會喝" no="完全不喝" />;
    return (
      <>
        <Progress />
        <h2>醫師給過你們哪些診斷？</h2>
        <div className={s.qhint}>可以複選。</div>
        <div className={s.choices}>
          {DIAGNOSES.map(([id, t, hint]) => (
            <button key={id} className={`${s.choice} ${dx.includes(id) ? s.sel : ""}`} onClick={() => pick(id)}>
              <span>
                {t}
                {hint ? <small>{hint}</small> : null}
              </span>
              <span className={s.dot} />
            </button>
          ))}
        </div>
        <div style={{ height: 18 }} />
        <button className={s.btn} disabled={dx.length === 0} onClick={nextQ}>
          點亮我們的星空
        </button>
        <button className={s.link} onClick={backQ}>
          上一題
        </button>
      </>
    );
  }

  function view() {
    if (step === "intro")
      return (
        <>
          <Image
            className={s["hero-img"]}
            src={ART.hero.src}
            alt={ART.hero.alt}
            width={ART.hero.w}
            height={ART.hero.h}
            sizes="460px"
            priority
          />
          <h1>
            在試管之前，
            <br />
            先看看你們的星空
          </h1>
          <p className={s.muted}>
            被診斷不孕，不代表只能靠治療。這個工具依據英國 7,086 對伴侶的追蹤研究，估算你們在不治療的情況下，一年內自然懷孕並生下寶寶的機率。
          </p>
          <p className={`${s.small} ${s.muted}`}>7 個問題，約 30 秒。所有資料只在你的裝置上計算，不會上傳。</p>
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
            這個工具適合誰？
          </button>
        </>
      );

    if (step === "question") return question();

    if (step === "result")
      return (
        <>
          <Sky n={n} />
          <p className={s["result-line"]}>
            在 100 對和你們條件相似的伴侶中，約有 <strong ref={numRef}>{n}</strong> 對，會在一年內自然懷孕並迎來寶寶。
          </p>
          <div className={s.pct}>預估機率 {(p * 100).toFixed(1)}%</div>
          <div className={s.doc}>
            <Sticker name="bubble" className={s.sticker} />
            <div>
              <div className={s.who}>小王子醫師想對你們說</div>
              <div className={s.say}>{guidance(p, dx, age)}</div>
            </div>
          </div>
          <div className={s.spacer} />
          <div className={s.row}>
            <button className={s.btn} onClick={() => go("compare")}>
              如果再自己試一年呢？
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

    if (step === "compare") {
      const a = riskcalc(data());
      const b = riskcalc(data(1));
      const na = Math.round(a * 100);
      const nb = Math.round(b * 100);
      const mx = Math.max(a, 0.01);
      const diff = na - nb;
      return (
        <>
          <Sticker name="plane" className={`${s.sticker} ${s["top-sticker"]}`} />
          <h2>現在，和一年後</h2>
          <p className={s.muted}>
            如果再自己嘗試一年都沒有懷孕，女方會長一歲、嘗試的時間也多了一年。那時再算一次，機率會是這樣：
          </p>
          <div className={s.compare}>
            <div className={`${s.col} ${s.now}`}>
              <div className={s.bar}>
                <span style={{ height: `${Math.max(6, (a / mx) * 110)}px` }} />
              </div>
              <div className={s.val}>{na}</div>
              <div className={s.lab}>現在（每 100 對）</div>
            </div>
            <div className={`${s.col} ${s.later}`}>
              <div className={s.bar}>
                <span style={{ height: `${Math.max(6, (b / mx) * 110)}px` }} />
              </div>
              <div className={s.val}>{nb}</div>
              <div className={s.lab}>一年後（每 100 對）</div>
            </div>
          </div>
          <p className={s.gap}>{diff > 0 ? `時間的代價：每 100 對，少了 ${diff} 對` : "一年後的機率變化不大"}</p>
          <p className={`${s.small} ${s.muted}`}>
            這是把目前的條件往後推一年的參考趨勢。原始研究是為「剛完成不孕檢查」的時間點設計的，一年後的數字屬於推估，請當作與醫師討論的起點，而不是定論。
          </p>
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

    if (step === "share")
      return (
        <>
          <h2>你們的分享卡</h2>
          <p className={`${s.small} ${s.muted}`}>截圖就能分享到限時動態。預設不顯示任何數字，保護你們的隱私。</p>
          <label className={s.toggle}>
            <span>在卡片上顯示我們的機率</span>
            <input type="checkbox" checked={showNum} onChange={(e) => setShowNum(e.target.checked)} />
          </label>
          <div className={`${s.card916} ${s.light}`}>
            <div style={{ fontSize: 12, color: "#6A73A6" }}>我們的星空</div>
            <div className={s.ct}>
              {showNum ? (
                `100 對像我們一樣的伴侶裡，有 ${n} 對，會在一年內等到他們的小星星。`
              ) : (
                <>
                  每一對伴侶，都有屬於自己的星空。
                  <br />
                  我們正在，一顆一顆把它點亮。
                </>
              )}
            </div>
            <div style={{ margin: "14px -6px 0" }}>
              <Sky n={showNum ? n : 13} animate={false} label="分享卡星空" />
            </div>
            <Sticker name="earth" className={s.ci} />
            <div className={s.cf} style={{ marginTop: 8 }}>
              <span>
                More Families
                <br />A Brighter Tomorrow
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

    return (
      <>
        <Sticker name="books" className={`${s.sticker} ${s["top-sticker"]}`} />
        <h2>關於這個工具</h2>
        <details open>
          <summary>適合誰使用？</summary>
          <p>已經嘗試懷孕一段時間、並已在醫院完成初步不孕檢查的異性伴侶。尚未做檢查也可以試算，但結果會比較粗略。</p>
        </details>
        <details>
          <summary>資料從哪裡來？</summary>
          <p>
            英國亞伯丁大學與 NHS Grampian 的研究，追蹤蘇格蘭東北部 7,086 對不孕伴侶，約 13% 在診斷後一年內自然懷孕並活產。Cameron NJ
            等人，Human Reproduction Open 2026；hoag056。
          </p>
        </details>
        <details>
          <summary>準確嗎？</summary>
          <p>
            這是族群層級的機率估計，適合幫助理解大方向，無法精準預測個別結果。模型尚未在台灣或亞洲族群驗證，也沒有納入 AMH、內膜異位嚴重程度、精液詳細數值等資訊。
          </p>
        </details>
        <details>
          <summary>重要提醒</summary>
          <p>本工具僅供衛教參考，不能取代醫師的診斷與建議。任何治療決定，請與你的生殖醫學專科醫師討論。</p>
        </details>
        <div className={s.spacer} />
        <div style={{ height: 20 }} />
        <button
          className={s.btn}
          onClick={() => {
            setQ(0);
            go("question");
          }}
        >
          開始試算
        </button>
        <Link className={s.link} href="/sky/eggs" style={{ display: "block", textAlign: "center" }}>
          另一個工具：我的卵子，夠不夠？（凍卵累積活產機率）
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
          <b>你們的星空</b>
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
