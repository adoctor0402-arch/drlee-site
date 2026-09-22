import Image from "next/image";
import Link from "next/link";
import { approach, firstVisitSteps, labItems, noteCategories, now, sampleNotes, topics } from "@/config/content";
import { branches, site } from "@/config/site";
import { BookingButton } from "./booking";
import { buttonClass } from "./button-class";
import { Sparkle, TopicIcon } from "./icons";
import { PrinceOnPlanet, Starfield } from "./prince";

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`flex items-center gap-2 font-display text-[15px] italic tracking-[0.18em] ${light ? "text-gold-soft" : "text-gold"}`}>
      <Sparkle className="h-2.5 w-2.5" />
      {children}
    </p>
  );
}

/* ---------------------------------------------------------------- Hero §10–11 */
export function Hero() {
  return (
    <section className="relative -mt-16 overflow-hidden pt-16 lg:-mt-20 lg:pt-20">
      {/* soft celestial backdrop */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_78%_30%,#DCE8F2_0%,rgba(220,232,242,0)_55%),radial-gradient(ellipse_at_10%_90%,#F1ECE2_0%,rgba(241,236,226,0)_50%)]" />
      <Starfield className="absolute inset-0 -z-10" />

      {/* 手機順序（§26）：標語 → 醫師照片 → 按鈕；桌機：左文右圖 */}
      <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-6 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:grid-rows-[auto_auto] lg:gap-x-8 lg:gap-y-9 lg:px-10 lg:pb-28 lg:pt-14">
        {/* Copy */}
        <div className="animate-fade-up lg:col-start-1 lg:row-start-1 lg:self-end">
          <p className="font-display text-[13px] font-semibold uppercase tracking-[0.32em] text-deep/60 sm:text-sm">
            More Life <span className="mx-1.5 text-gold">·</span> A Kinder Tomorrow
          </p>
          <p className="mt-6 font-serif text-lg font-semibold tracking-[0.2em] text-gold sm:text-xl">小王子醫師</p>
          <h1 className="mt-3 font-serif text-[34px] font-semibold leading-[1.35] text-deep sm:text-5xl sm:leading-[1.3] lg:text-[56px]">
            讓生殖醫學變得
            <br />
            溫柔、清楚、
            <span className="relative whitespace-nowrap">
              值得信任
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 10" preserveAspectRatio="none" aria-hidden>
                <path d="M2 7 C 50 2, 150 2, 198 6" stroke="#C6A15B" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="mt-7 max-w-md text-[16px] leading-[1.95] text-ink/75 sm:text-[17px]">
            以專業為引導，以溫柔為初心，
            <br />
            陪你走過備孕路上的每一個問號，
            <br />
            一起迎向生命的下一個可能。
          </p>
        </div>

        {/* Visual: real doctor + subtle celestial elements */}
        <div className="relative mx-auto w-full max-w-[460px] animate-fade-up [animation-delay:200ms] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:max-w-none lg:self-center">
          <div className="relative mx-auto aspect-[4/5] w-[82%] lg:w-[78%]">
            {/* orbit ring behind */}
            <div className="absolute -inset-[9%] rounded-full border border-dashed border-gold/40 animate-orbit" aria-hidden>
              <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 text-gold">
                <Sparkle className="h-3.5 w-3.5" />
              </span>
            </div>
            <div className="relative h-full overflow-hidden rounded-t-full rounded-b-[36px] bg-mist shadow-[0_40px_80px_-40px_rgba(23,54,93,0.45)]">
              <Image
                src={site.heroImage}
                alt="李俊逸醫師（小王子醫師 Dr. Lee）"
                fill
                sizes="(min-width: 1024px) 40vw, 80vw"
                loading="eager"
                fetchPriority="high"
                className="object-cover"
              />
            </div>
            {/* name plate */}
            <div className="absolute -right-4 bottom-10 rounded-2xl bg-ivory/95 px-4 py-3 shadow-[0_12px_30px_-12px_rgba(23,54,93,0.35)] backdrop-blur sm:-right-8">
              <p className="font-serif text-[15px] font-semibold text-deep">李俊逸 醫師</p>
              <p className="mt-0.5 text-xs text-muted">茂盛醫院｜{branches.map((b) => b.name).join("・")}</p>
            </div>
          </div>
          {/* the guide */}
          <div className="absolute -bottom-6 -left-4 w-[46%] animate-float sm:-left-8 lg:-bottom-10 lg:-left-8 lg:w-[46%]">
            <PrinceOnPlanet />
          </div>
        </div>

        <div className="flex flex-col gap-3 animate-fade-up [animation-delay:350ms] sm:flex-row lg:col-start-1 lg:row-start-2 lg:self-start">
          <BookingButton />
          <Link href="#first-visit" className={buttonClass("ghost")}>
            了解第一次門診
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- 我可以怎麼幫你 §13 */
export function HelpSection() {
  return (
    <section id="help" className="bg-white/60 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="max-w-2xl">
          <Eyebrow>How can I help</Eyebrow>
          <h2 className="mt-3 font-serif text-3xl font-semibold leading-snug text-deep sm:text-4xl">我可以怎麼幫你？</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-muted">
            你不需要先知道醫學名詞。從你現在最在意的那件事開始就好。
          </p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {topics.map((t, i) => (
            <li key={t.slug}>
              <Link
                href={`/${t.slug}`}
                className="group relative flex h-full flex-col rounded-3xl border border-deep/[0.07] bg-ivory p-7 transition-all duration-500 hover:-translate-y-1 hover:border-gold/50 hover:bg-white hover:shadow-[0_24px_50px_-30px_rgba(23,54,93,0.35)]"
              >
                <div className="flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-mist/70 text-deep transition-colors group-hover:bg-deep group-hover:text-gold-soft">
                    <TopicIcon name={t.icon} className="h-6 w-6" />
                  </span>
                  <span className="font-display text-lg italic text-deep/25">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-6 font-serif text-[20px] font-semibold leading-snug text-deep">{t.problem}</h3>
                <p className="mt-2 text-sm text-muted">{t.label}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[15px] font-medium text-deep">
                  {t.cta}
                  <span className="text-gold transition-transform group-hover:translate-x-1" aria-hidden>→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- First Visit §14 */
export function FirstVisit() {
  return (
    <section id="first-visit" className="relative overflow-hidden py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-10">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Eyebrow>Your First Visit</Eyebrow>
          <h2 className="mt-3 font-serif text-3xl font-semibold leading-snug text-deep sm:text-4xl">
            第一次來找我，
            <br />
            不需要準備好所有答案。
          </h2>
          <p className="mt-6 border-l-2 border-gold pl-5 font-serif text-xl text-deep/80">帶著你的故事來就好。</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <Link href="/first-visit" className={buttonClass("ghost")}>
              第一次門診要準備什麼 <span aria-hidden>→</span>
            </Link>
            <BookingButton />
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
  );
}

/* ---------------------------------------------------------------- Trust §15 */
export function Approach() {
  return (
    <section className="relative overflow-hidden bg-deep py-20 text-ivory sm:py-28">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full border border-gold/15" aria-hidden />
      <div className="pointer-events-none absolute -right-20 -top-20 h-[360px] w-[360px] rounded-full border border-gold/10" aria-hidden />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="max-w-2xl">
          <Eyebrow light>My Approach</Eyebrow>
          <h2 className="mt-3 font-serif text-3xl font-semibold leading-snug sm:text-4xl">我看生殖醫學的方法</h2>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2">
          {approach.map((a) => (
            <div key={a.n} className="bg-deep p-8 sm:p-10">
              <span className="font-display text-sm italic tracking-[0.2em] text-gold">{a.n}</span>
              <h3 className="mt-3 font-serif text-2xl font-semibold leading-snug">{a.title}</h3>
              <p className="mt-3 text-[15.5px] leading-[1.9] text-ivory/70">{a.body}</p>
              {a.quote && <p className="mt-4 font-display text-xl italic leading-snug text-gold-soft">{a.quote}</p>}
              {a.tags.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {a.tags.map((t) => (
                    <li key={t} className="rounded-full border border-white/15 px-3 py-1 font-display text-sm tracking-wide text-ivory/80">
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <blockquote className="mx-auto mt-20 max-w-3xl text-center">
          <p className="font-display text-2xl italic leading-relaxed text-gold-soft sm:text-3xl">
            Science can be rational. Care should still feel human.
          </p>
          <p className="mt-3 font-serif text-lg text-ivory/80">科學可以很理性，醫療應該很溫柔。</p>
        </blockquote>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Notes §16 */
export function Notes() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Eyebrow>Fertility Notes</Eyebrow>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-deep sm:text-4xl">小王子的備孕筆記</h2>
          </div>
          <Link href="/notes" className="inline-flex items-center gap-1.5 text-[15px] font-medium text-deep hover:text-gold">
            看全部筆記 <span aria-hidden>→</span>
          </Link>
        </div>

        <ul className="-mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
          {noteCategories.map((c) => (
            <li key={c}>
              <Link
                href={`/notes?category=${encodeURIComponent(c)}`}
                className="block whitespace-nowrap rounded-full border border-deep/10 bg-white px-4 py-2 text-sm text-ink/80 transition-colors hover:border-gold hover:text-deep"
              >
                {c}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {sampleNotes.map((n, i) => (
            <Link
              key={n.slug}
              href={`/notes/${n.slug}`}
              className="group flex flex-col overflow-hidden rounded-3xl border border-deep/[0.07] bg-white transition-shadow duration-500 hover:shadow-[0_24px_50px_-30px_rgba(23,54,93,0.35)]"
            >
              <div className={`relative h-40 overflow-hidden ${["bg-mist", "bg-sand", "bg-sage/40"][i % 3]}`}>
                <NoteArt variant={i} />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <p className="text-xs font-medium tracking-widest text-gold">{n.category}</p>
                <h3 className="mt-2 font-serif text-xl font-semibold leading-snug text-deep group-hover:underline group-hover:decoration-gold/60 group-hover:underline-offset-4">
                  {n.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.85] text-muted">{n.summary}</p>
                <p className="mt-auto pt-6 text-xs text-muted/80">更新於 {n.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function NoteArt({ variant }: { variant: number }) {
  // 品牌 metaphor 插畫：星軌 / 星座 / 新芽
  if (variant === 0)
    return (
      <svg viewBox="0 0 300 160" className="absolute inset-0 h-full w-full" aria-hidden>
        <ellipse cx="150" cy="80" rx="110" ry="34" fill="none" stroke="#17365D" strokeOpacity=".18" />
        <ellipse cx="150" cy="80" rx="70" ry="20" fill="none" stroke="#C6A15B" strokeOpacity=".6" strokeDasharray="2 5" />
        <circle cx="150" cy="80" r="16" fill="#17365D" fillOpacity=".85" />
        <circle cx="222" cy="68" r="5" fill="#C6A15B" />
      </svg>
    );
  if (variant === 1)
    return (
      <svg viewBox="0 0 300 160" className="absolute inset-0 h-full w-full" aria-hidden>
        <path d="M60 110 L110 60 L160 90 L205 45 L245 75" fill="none" stroke="#17365D" strokeOpacity=".3" />
        {[[60, 110], [110, 60], [160, 90], [205, 45], [245, 75]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i === 3 ? 6 : 4} fill={i === 3 ? "#C6A15B" : "#17365D"} />
        ))}
      </svg>
    );
  return (
    <svg viewBox="0 0 300 160" className="absolute inset-0 h-full w-full" aria-hidden>
      <path d="M40 140 Q150 110 260 140" fill="none" stroke="#17365D" strokeOpacity=".25" />
      <path d="M150 128 C 150 110, 150 96, 152 82" stroke="#5E7B66" strokeWidth="2" fill="none" />
      <path d="M152 92 C 136 90, 128 78, 130 66 C 144 68, 153 78, 152 92z" fill="#8FA897" />
      <path d="M152 86 C 164 76, 178 76, 184 82 C 176 94, 162 94, 152 86z" fill="#BBC9BE" />
      <circle cx="200" cy="40" r="4" fill="#C6A15B" />
    </svg>
  );
}

/* ---------------------------------------------------------------- Lab + Now §18–19 */
export function LabTeaser() {
  return (
    <section className="pb-20 sm:pb-28">
      <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:px-10">
        <Link
          href="/lab"
          className="group relative overflow-hidden rounded-3xl bg-deep-2 p-8 text-ivory sm:p-12"
        >
          <Starfield className="absolute inset-0 opacity-60 invert" />
          <div className="relative">
            <Eyebrow light>For the curious</Eyebrow>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-wide sm:text-5xl">Dr. Lee Lab</h2>
            <p className="mt-4 max-w-md text-[15.5px] leading-[1.9] text-ivory/70">
              研究、AI 與生殖醫學、演講與論文。給想看得更深的你。
            </p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {labItems.map((l) => (
                <li key={l} className="rounded-full border border-white/15 px-3 py-1 font-display text-sm tracking-wide text-ivory/80">
                  {l}
                </li>
              ))}
            </ul>
            <span className="mt-10 inline-flex items-center gap-1.5 text-[15px] font-medium text-gold-soft">
              走進 Lab <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
            </span>
          </div>
        </Link>

        <Link href="/now" className="group rounded-3xl border border-deep/10 bg-white p-8 sm:p-10">
          <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-50 [animation-duration:3s]" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            /now
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-deep">What I&rsquo;m working on</h2>
          <dl className="mt-6 space-y-5 text-[15px]">
            <div>
              <dt className="text-xs uppercase tracking-widest text-gold">Currently researching</dt>
              <dd className="mt-1.5 text-ink/80">{now.researching.join(" · ")}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-widest text-gold">Currently building</dt>
              <dd className="mt-1.5 text-ink/80">{now.building.join(" · ")}</dd>
            </div>
          </dl>
        </Link>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Closing CTA §22 */
export function ClosingCTA() {
  return (
    <section className="relative overflow-hidden bg-mist/60 py-20 sm:py-24">
      <Starfield className="absolute inset-0" />
      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 text-center sm:px-6">
        <div className="w-28 sm:w-32">
          <PrinceOnPlanet />
        </div>
        <h2 className="mt-4 font-serif text-2xl font-semibold leading-relaxed text-deep sm:text-[32px]">
          了解現在的位置，
          <br className="sm:hidden" />
          才能做出適合自己的下一步。
        </h2>
        <p className="mt-4 text-[15.5px] text-muted">台中總院・板橋分院 皆有門診</p>
        <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <BookingButton />
          <Link href="#first-visit" className={buttonClass("ghost")}>
            了解第一次門診
          </Link>
        </div>
      </div>
    </section>
  );
}
