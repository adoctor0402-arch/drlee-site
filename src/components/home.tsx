import Image from "next/image";
import Link from "next/link";
import { approach, firstVisitSteps, labItems, now, topics } from "@/config/content";
import { getCategories, getNotes } from "@/lib/notes";
import { site } from "@/config/site";
import { BookingButton } from "./booking";
import { buttonClass } from "./button-class";
import { TopicIcon } from "./icons";
import { NoteCard } from "./note-card";
import { Crown } from "./logo";
import { Starfield, Sticker, Twinkle } from "./prince";

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`flex items-center gap-2 font-display text-[15px] italic tracking-[0.18em] ${light ? "text-gold-soft" : "text-gold"}`}>
      <Twinkle className="h-3 w-3" />
      {children}
    </p>
  );
}

/* ---------------------------------------------------------------- Hero §10–11（V1.1：品牌插畫夜空版） */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#22385F_0%,#2E4A7E_48%,#5F73A3_82%,#8C95B1_100%)] text-ivory">
      <Starfield light className="absolute inset-0" />
      {/* 地平線的暖光，呼應插畫裡的日出 */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-[radial-gradient(ellipse_at_70%_100%,rgba(251,233,199,0.55)_0%,rgba(251,233,199,0)_60%)]" aria-hidden />

      <div className="relative mx-auto grid max-w-7xl gap-8 px-4 pb-14 pt-10 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:grid-rows-[auto_auto] lg:gap-x-10 lg:gap-y-9 lg:px-10 lg:pb-24 lg:pt-16">
        {/* Copy */}
        <div className="animate-fade-up lg:col-start-1 lg:row-start-1 lg:self-end">
          <p className="font-display text-[13px] font-semibold uppercase tracking-[0.3em] text-ivory/70 sm:text-sm">
            {site.slogan}
          </p>
          <p className="mt-6 flex items-center gap-2 font-hand text-2xl text-sun sm:text-[28px]">
            嗨，我是小王子醫師
            <Crown className="h-6 w-7 -translate-y-2 rotate-12" stroke="#EFC75E" />
          </p>
          <h1 className="mt-3 font-serif text-[34px] font-semibold leading-[1.35] sm:text-5xl sm:leading-[1.3] lg:text-[54px]">
            讓生殖醫學變得
            <br />
            溫柔、清楚、
            <span className="relative whitespace-nowrap">
              值得信任
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 10" preserveAspectRatio="none" aria-hidden>
                <path d="M2 7 C 50 2, 150 2, 198 6" stroke="#EFC75E" strokeWidth="2.2" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="mt-7 max-w-md text-[16px] leading-[1.95] text-ivory/80 sm:text-[17px]">
            以專業為引導，以溫柔為初心，
            <br />
            陪你走過備孕路上的每一個問號，
            <br />
            一起迎向生命的下一個可能。
          </p>
        </div>

        {/* Visual: 品牌主視覺插畫，邊緣柔化融入夜空 */}
        <div className="relative mx-auto w-full max-w-[520px] animate-fade-up [animation-delay:200ms] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:max-w-none lg:self-center">
          <div className="overflow-hidden rounded-[40px] shadow-[0_40px_80px_-40px_rgba(10,20,40,0.7)] ring-1 ring-white/15">
            <Sticker name="hero" eager sizes="(min-width: 1024px) 600px, 90vw" />
          </div>
          {/* 真人名牌：把插畫和真人連在一起 */}
          <Link
            href="/about"
            className="absolute -bottom-6 right-3 flex rotate-[-2deg] items-center gap-3 rounded-full bg-ivory py-2 pl-2 pr-5 text-deep shadow-[0_14px_34px_-12px_rgba(10,20,40,0.55)] transition-transform hover:rotate-0 sm:right-6"
          >
            <Image src={site.avatar} alt="李俊逸醫師" width={52} height={52} className="h-12 w-12 rounded-full object-cover ring-2 ring-sun sm:h-[52px] sm:w-[52px]" />
            <span className="leading-tight">
              <span className="block font-serif text-[15px] font-semibold sm:text-base">李俊逸 醫師 <span className="font-display text-sm italic text-gold">Dr. Lee</span></span>
              <span className="block text-xs text-muted">台中總院・板橋分院</span>
            </span>
          </Link>
        </div>

        <div className="flex flex-col gap-3 pt-6 animate-fade-up [animation-delay:350ms] sm:flex-row lg:col-start-1 lg:row-start-2 lg:self-start lg:pt-0">
          <BookingButton variant="sun" />
          <Link href="#first-visit" className={buttonClass("ghostLight")}>
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
    <section id="help" className="bg-white pb-20 pt-16 sm:pb-28 sm:pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex items-end justify-between gap-6">
          <div className="max-w-2xl pb-2">
            <Eyebrow>How can I help</Eyebrow>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-snug text-deep sm:text-4xl">我可以怎麼幫你？</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-muted">
              你不需要先知道醫學名詞。從你現在最在意的那件事開始就好。
            </p>
          </div>
          <div className="-mt-6 hidden w-44 shrink-0 sm:block lg:w-52">
            <Sticker name="embryo" />
          </div>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {topics.map((t, i) => (
            <li key={t.slug}>
              <Link
                href={`/${t.slug}`}
                className="group relative flex h-full flex-col rounded-3xl border border-deep/[0.07] bg-ivory p-7 transition-all duration-500 hover:-translate-y-1 hover:border-gold/50 hover:bg-white hover:shadow-[0_24px_50px_-30px_rgba(23,54,93,0.35)]"
              >
                <div className="flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-mist/70 text-deep transition-colors group-hover:bg-deep group-hover:text-sun">
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

/* ---------------------------------------------------------------- 互動工具：你們的星空 */
export function SkyBand() {
  return (
    <section className="bg-[linear-gradient(140deg,#22385F_0%,#2E4A7E_60%,#5F73A3_100%)] py-14 text-ivory sm:py-16">
      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 text-center sm:px-6 md:flex-row md:text-left lg:px-10">
        <Starfield light className="absolute inset-0" />
        <div className="relative w-40 shrink-0 sm:w-48">
          <Sticker name="hero" card sizes="200px" />
        </div>
        <div className="relative flex-1">
          <Eyebrow light>Interactive</Eyebrow>
          <h2 className="mt-3 font-serif text-2xl font-semibold leading-snug sm:text-3xl">
            在試管之前，先看看你們的星空
          </h2>
          <p className="mt-3 max-w-xl text-[15.5px] leading-[1.9] text-ivory/75">
            被診斷不孕，不代表只能靠治療。回答 7 個問題，約 30 秒，估算你們在不治療的情況下、
            一年內自然懷孕並生下寶寶的機率。資料只在你的裝置上計算，不會上傳。
          </p>
          <Link href="/sky" className={`${buttonClass("sun")} mt-6`}>
            開始試算
          </Link>
        </div>
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
          <p className="mt-6 font-hand text-2xl text-deep/85">帶著你的故事來就好 <span className="text-blush">♥</span></p>
          <div className="mt-6 w-52 sm:w-60">
            <Sticker name="ultrasound" card />
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
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
    <section className="relative overflow-hidden bg-night py-20 text-ivory sm:py-28">
      <Starfield light className="absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full border border-gold/15" aria-hidden />
      <div className="pointer-events-none absolute -right-20 -top-20 h-[360px] w-[360px] rounded-full border border-gold/10" aria-hidden />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="max-w-2xl">
          <Eyebrow light>My Approach</Eyebrow>
          <h2 className="mt-3 font-serif text-3xl font-semibold leading-snug sm:text-4xl">我看生殖醫學的方法</h2>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2">
          {approach.map((a) => (
            <div key={a.n} className="bg-night p-8 sm:p-10">
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
          <p className="mt-4 font-hand text-2xl text-ivory/90">科學可以很理性，醫療應該很溫柔。</p>
        </blockquote>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Notes §16 */
export function Notes() {
  const notes = getNotes().slice(0, 3);
  const categories = getCategories();
  if (notes.length === 0) return null;

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex items-end justify-between gap-6">
          <div>
            <Eyebrow>Fertility Notes</Eyebrow>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-deep sm:text-4xl">小王子的備孕筆記</h2>
            <p className="mt-2 font-hand text-lg text-muted">持續學習，只為了更多幸福</p>
            <Link href="/notes" className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-medium text-deep hover:text-gold">
              看全部筆記 <span aria-hidden>→</span>
            </Link>
          </div>
          <div className="hidden w-36 shrink-0 sm:block lg:w-44">
            <Sticker name="books" card sizes="200px" />
          </div>
        </div>

        <ul className="-mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
          {categories.map((c) => (
            <li key={c.name}>
              <Link
                href={`/notes?category=${encodeURIComponent(c.name)}`}
                className="block whitespace-nowrap rounded-full border border-deep/10 bg-white px-4 py-2 text-sm text-ink/80 transition-colors hover:border-gold hover:text-deep"
              >
                {c.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {notes.map((n, i) => (
            <NoteCard key={n.slug} note={n} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Lab + Now §18–19 */
export function LabTeaser() {
  return (
    <section className="pb-20 sm:pb-28">
      <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:px-10">
        <Link
          href="/lab"
          className="group relative overflow-hidden rounded-3xl bg-[linear-gradient(160deg,#22385F,#2E4A7E)] p-8 text-ivory sm:p-12"
        >
          <Starfield light className="absolute inset-0 opacity-70" />
          <div className="relative grid gap-8 sm:grid-cols-[1.25fr_0.75fr] sm:items-center">
            <div>
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
            <div className="hidden sm:block">
              <Sticker name="microscope" card sizes="280px" />
            </div>
          </div>
        </Link>

        <div className="grid gap-5">
        <Link
          href="/observatory"
          className="group rounded-3xl border border-deep/10 bg-white p-8 transition-colors hover:border-gold/60 sm:p-10"
        >
          <Eyebrow>Research Observatory</Eyebrow>
          <h2 className="mt-3 font-serif text-2xl font-semibold text-deep">星際觀測站</h2>
          <p className="mt-3 text-[15px] leading-[1.9] text-muted">
            國際期刊的最新研究，我讀過之後用白話寫下重點：這篇在問什麼、發現了什麼、對你可能代表什麼。
          </p>
          <span className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-medium text-deep">
            看最新研究
            <span className="text-gold transition-transform group-hover:translate-x-1" aria-hidden>→</span>
          </span>
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
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Closing CTA §22 */
export function ClosingCTA() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-24">
      <div className="relative mx-auto grid max-w-6xl items-center gap-6 px-4 sm:px-6 md:grid-cols-[1fr_1.1fr] lg:gap-12">
        <div className="mx-auto w-full max-w-sm md:order-2">
          <Sticker name="heart" card />
        </div>
        <div className="text-center md:text-left">
          <Eyebrow>Next Step</Eyebrow>
          <h2 className="mt-3 font-serif text-2xl font-semibold leading-relaxed text-deep sm:text-[32px]">
            了解現在的位置，
            <br />
            才能做出適合自己的下一步。
          </h2>
          <p className="mt-4 text-[15.5px] text-muted">台中總院・板橋分院 皆有門診</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
            <BookingButton />
            <Link href="#first-visit" className={buttonClass("ghost")}>
              了解第一次門診
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Meet Dr. Lee（真人信任區） */
export function MeetDrLee() {
  return (
    <section className="relative overflow-hidden bg-mist/50 py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 md:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-10">
        <div className="relative mx-auto w-full max-w-[340px]">
          <div className="overflow-hidden rounded-t-[200px] rounded-b-[32px] bg-[#e9e9ea] shadow-[0_30px_60px_-30px_rgba(23,54,93,0.45)]">
            <Image src={site.photo} alt="李俊逸醫師穿著白袍的正式照片" width={719} height={1040} className="h-auto w-full" />
          </div>
          <span className="absolute -right-3 top-6 rotate-12 text-sun">
            <Crown className="h-9 w-10" stroke="#EFC75E" />
          </span>
        </div>
        <div>
          <Eyebrow>Meet Dr. Lee</Eyebrow>
          <h2 className="mt-3 font-serif text-3xl font-semibold leading-snug text-deep sm:text-4xl">
            插畫裡的小王子，
            <br />
            診間裡的李俊逸醫師。
          </h2>
          <p className="mt-2 font-display text-lg italic tracking-wide text-gold">{site.nameEnFull}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {site.roles.map((r) => (
              <li key={r} className="rounded-full border border-deep/10 bg-white px-4 py-1.5 text-sm text-ink/80">
                {r}
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-xl text-[16px] leading-[1.95] text-ink/75">
            我相信生殖醫學可以很專業，也可以很溫柔。把複雜的檢查和數據講清楚，陪你一起找到最適合自己的下一步。
          </p>
          <p className="mt-4 font-hand text-2xl text-deep/85">每一個生命，都是獨一無二的星星 <span className="text-blush">♥</span></p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/about" className={buttonClass("ghost")}>
              認識 Dr. Lee <span aria-hidden>→</span>
            </Link>
            <BookingButton />
          </div>
        </div>
      </div>
    </section>
  );
}
