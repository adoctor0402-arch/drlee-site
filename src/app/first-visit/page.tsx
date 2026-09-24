import type { Metadata } from "next";
import Link from "next/link";
import { BookingButton } from "@/components/booking";
import { buttonClass } from "@/components/button-class";
import { Crown } from "@/components/logo";
import { Starfield, Sticker, Twinkle } from "@/components/prince";
import { firstVisitSteps } from "@/config/content";
import { bringItems, clinicHours, faqs, hospitalFlow } from "@/config/first-visit";
import { branches, doctorPage, hospitalLinks } from "@/config/site";

export const metadata: Metadata = {
  alternates: { canonical: "/first-visit" },
  title: "第一次門診要準備什麼",
  description:
    "第一次看小王子醫師（李俊逸醫師）的門診要帶什麼、流程怎麼走、常見問題整理。茂盛醫院台中總院與板橋分院皆有門診。",
};

export default function FirstVisitPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#22385F_0%,#2E4A7E_72%,#5F73A3_100%)] text-ivory">
        <Starfield light className="absolute inset-0" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1.15fr_0.85fr] lg:px-10 lg:py-20">
          <div>
            <p className="flex items-center gap-2 font-display text-sm italic tracking-[0.2em] text-gold-soft">
              <Twinkle className="h-3 w-3" />
              Your First Visit
            </p>
            <h1 className="mt-3 font-serif text-[32px] font-semibold leading-[1.4] sm:text-[42px]">
              第一次來找我，
              <br />
              不需要準備好所有答案。
            </h1>
            <p className="mt-5 flex items-center gap-2 font-hand text-2xl text-sun">
              帶著你的故事來就好
              <Crown className="h-5 w-6 -translate-y-1 rotate-12" stroke="#EFC75E" />
            </p>
            <p className="mt-6 max-w-lg text-[16px] leading-[1.95] text-ivory/80">
              很多人第一次來，會擔心自己「還沒準備好」：報告不齊、名詞看不懂、不知道該問什麼。
              其實都沒關係。這一頁把可以先準備的事情寫清楚，讓你當天輕鬆一點。
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <BookingButton variant="sun" />
              <Link href="#bring" className={buttonClass("ghostLight")}>
                看要帶什麼
              </Link>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[300px]">
            <Sticker name="ultrasound" card eager sizes="300px" />
          </div>
        </div>
      </section>

      {/* 帶什麼來 */}
      <section id="bring" className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
          <div className="flex items-end justify-between gap-8">
            <div>
              <h2 className="font-serif text-3xl font-semibold text-deep sm:text-4xl">可以先準備的東西</h2>
              <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-muted">
                下面這些有就帶，沒有也沒關係 —— 缺的部分，我們會依你的情況安排。
              </p>
            </div>
            <div className="hidden w-40 shrink-0 sm:block lg:w-48">
              <Sticker name="watering" card sizes="200px" />
            </div>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {bringItems.map((g, i) => (
              <div key={g.title} className="rounded-3xl border border-deep/[0.07] bg-ivory p-8">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-lg italic text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-serif text-xl font-semibold text-deep">{g.title}</h3>
                </div>
                {g.note && <p className="mt-2 text-sm text-muted">{g.note}</p>}
                <ul className="mt-5 space-y-2.5">
                  {g.items.map((it) => (
                    <li key={it} className="flex gap-3 text-[15.5px] leading-[1.8] text-ink/80">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-8 font-hand text-2xl text-deep/85">
            真的忘了帶也沒關係，人來就好 <span className="text-blush">♥</span>
          </p>
        </div>
      </section>

      {/* 診間裡會發生什麼 */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-10">
          <div>
            <h2 className="font-serif text-3xl font-semibold leading-snug text-deep sm:text-4xl">
              在診間裡，
              <br />
              我們會一起做這四件事。
            </h2>
            <p className="mt-5 text-[16px] leading-[1.95] text-muted">
              我不會急著把所有檢查都排下去。先把你的狀況看清楚，才知道哪一步最值得先走。
            </p>
            <div className="mt-8 w-40 sm:w-48">
              <Sticker name="embryo" />
            </div>
          </div>

          <ol className="relative">
            <span className="absolute bottom-8 left-[27px] top-8 w-px bg-gradient-to-b from-gold/70 via-gold/30 to-transparent" aria-hidden />
            {firstVisitSteps.map((s) => (
              <li key={s.n} className="relative flex gap-6 pb-10 last:pb-0">
                <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border border-gold/50 bg-ivory font-display text-xl font-semibold text-gold">
                  {s.n}
                </span>
                <div className="pt-2.5">
                  <h3 className="font-serif text-xl font-semibold text-deep">{s.title}</h3>
                  <p className="mt-2 max-w-md text-[15.5px] leading-[1.9] text-muted">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 當天流程 */}
      <section className="bg-mist/50 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
          <h2 className="font-serif text-3xl font-semibold text-deep sm:text-4xl">初診當天的流程</h2>
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-muted">
            以茂盛醫院的初診流程為準，實際動線請依當天院區指示與現場人員說明。
          </p>

          <ol className="mt-10 grid gap-3 sm:grid-cols-2">
            {hospitalFlow.map((step, i) => (
              <li key={step} className="flex items-center gap-4 rounded-2xl bg-white px-5 py-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-deep font-display text-sm text-gold-soft">
                  {i + 1}
                </span>
                <span className="text-[15.5px] text-ink/80">{step}</span>
              </li>
            ))}
          </ol>

          <div className="mt-10 grid gap-5 sm:grid-cols-[1fr_1fr]">
            <div className="rounded-3xl bg-white p-7">
              <h3 className="font-serif text-lg font-semibold text-deep">掛號時段</h3>
              <ul className="mt-4 space-y-2 text-[15.5px] text-ink/80">
                {clinicHours.map((h) => (
                  <li key={h.label} className="flex justify-between border-b border-deep/[0.07] pb-2 last:border-0">
                    <span>{h.label}</span>
                    <span className="font-display tracking-wide text-deep">{h.time}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted">
                門診時段以醫院公告為準：
                <a href={doctorPage} target="_blank" rel="noopener" className="ml-1 text-deep underline-offset-4 hover:underline">
                  李俊逸醫師門診表 ↗
                </a>
              </p>
            </div>
            <div className="rounded-3xl bg-white p-7">
              <h3 className="font-serif text-lg font-semibold text-deep">別忘了帶</h3>
              <p className="mt-3 text-[15.5px] leading-[1.9] text-ink/80">健保卡、身分證。這兩樣是掛號報到必備的。</p>
              <p className="mt-4 text-sm text-muted">
                醫院初診指南：
                <a href={hospitalLinks.firstVisitGuide} target="_blank" rel="noopener" className="ml-1 text-deep underline-offset-4 hover:underline">
                  前往醫院說明 ↗
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-center font-serif text-3xl font-semibold text-deep sm:text-4xl">常見問題</h2>
          <div className="mt-10 divide-y divide-deep/[0.09] border-y border-deep/[0.09]">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-[18px] font-semibold text-deep marker:hidden">
                  {f.q}
                  <span className="shrink-0 text-xl text-gold transition-transform duration-300 group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="mt-3 text-[15.5px] leading-[1.95] text-muted">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-muted">
            以上為一般性的說明，實際檢查與療程仍需要依你的狀況個別判斷。
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white pb-20 sm:pb-24">
        <div className="mx-auto grid max-w-5xl items-center gap-8 px-4 sm:px-6 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="font-serif text-2xl font-semibold leading-relaxed text-deep sm:text-[30px]">
              準備好了，就從掛號開始。
            </h2>
            <p className="mt-4 text-[15.5px] text-muted">
              {branches.map((b) => b.name).join("・")} 皆有門診，按下預約後可以選擇院區。
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <BookingButton />
              <Link href="/#help" className={buttonClass("ghost")}>
                先看看我可以幫你什麼
              </Link>
            </div>
          </div>
          <div className="mx-auto w-full max-w-xs">
            <Sticker name="plane" card />
          </div>
        </div>
      </section>
    </>
  );
}
