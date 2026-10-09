import type { Metadata } from "next";
import Link from "next/link";
import { BookingButton } from "@/components/booking";
import { Sticker, Starfield, Twinkle } from "@/components/prince";
import { countPending, formatDate, getPapers, getTopics } from "@/lib/observatory";

export const metadata: Metadata = {
  alternates: { canonical: "/observatory" },
  title: "星際觀測站",
  description:
    "星際觀測站：小王子醫師（李俊逸醫師）追蹤生殖醫學的國際研究消息，附上期刊、日期與原文連結，再用幾句話說我怎麼看。",
};

export default async function ObservatoryPage({ searchParams }: PageProps<"/observatory">) {
  const { topic } = await searchParams;
  const active = typeof topic === "string" ? topic : undefined;
  const all = getPapers();
  const topics = getTopics();
  const papers = active ? all.filter((p) => p.topic === active) : all;
  const pending = process.env.NODE_ENV === "development" ? countPending() : 0;

  return (
    <>
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#22385F_0%,#2E4A7E_75%,#5F73A3_100%)] text-ivory">
        <Starfield light className="absolute inset-0" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.2fr_0.8fr] lg:px-10 lg:py-18">
          <div>
            <p className="flex items-center gap-2 font-display text-sm italic tracking-[0.2em] text-gold-soft">
              <Twinkle className="h-3 w-3" />
              Research Observatory
            </p>
            <h1 className="mt-3 font-serif text-[32px] font-semibold sm:text-[42px]">星際觀測站</h1>
            <p className="mt-4 font-hand text-2xl text-sun">看見生命的可能，也看見研究的方向</p>
            <p className="mt-5 max-w-lg text-[16px] leading-[1.95] text-ivory/80">
              生殖醫學每週都有新的研究發表。我讓系統持續掃描國際期刊，挑出值得看的幾篇，
              親自讀過之後寫下我的看法。消息本身附上期刊、日期和原文連結，我的部分盡量短。
            </p>
            <p className="mt-5 text-sm text-ivory/60">
              每篇都附上原始論文連結，你可以自己查證，也可以帶到門診一起討論。
            </p>
          </div>
          <div className="mx-auto w-44 sm:w-56">
            <Sticker name="microscope" card eager sizes="240px" />
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
          {pending > 0 && (
            <p className="mb-8 rounded-2xl border border-gold/50 bg-gold/10 px-5 py-3 text-sm text-deep">
              本機提醒：有 {pending} 篇論文待審核（content/observatory/ 裡 draft: true 的檔案）。這行字只會出現在開發模式。
            </p>
          )}

          {all.length > 0 && (
            <ul className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
              <li>
                <Link
                  href="/observatory"
                  className={`block whitespace-nowrap rounded-full border px-4 py-2 text-sm transition-colors ${
                    active ? "border-deep/10 bg-white text-ink/80 hover:border-gold" : "border-deep bg-deep text-ivory"
                  }`}
                >
                  全部（{all.length}）
                </Link>
              </li>
              {topics.map((t) => (
                <li key={t.name}>
                  <Link
                    href={`/observatory?topic=${encodeURIComponent(t.name)}`}
                    className={`block whitespace-nowrap rounded-full border px-4 py-2 text-sm transition-colors ${
                      active === t.name ? "border-deep bg-deep text-ivory" : "border-deep/10 bg-white text-ink/80 hover:border-gold"
                    }`}
                  >
                    {t.name}（{t.count}）
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {papers.length > 0 ? (
            <ul className="mt-10 divide-y divide-deep/[0.08] border-y border-deep/[0.08]">
              {papers.map((p) => (
                <li key={p.pmid}>
                  <Link
                    href={`/observatory/${p.pmid}`}
                    className="group flex flex-col gap-1.5 py-5 transition-colors sm:flex-row sm:items-baseline sm:gap-5"
                  >
                    <span className="flex shrink-0 items-center gap-2.5 text-xs sm:w-60">
                      <span className="whitespace-nowrap tabular-nums text-muted/80">{formatDate(p.pubdate)}</span>
                      <span className="truncate font-display italic tracking-wide text-gold">{p.journal}</span>
                    </span>
                    <span className="flex-1 font-serif text-[17.5px] font-semibold leading-snug text-deep decoration-gold/60 underline-offset-4 group-hover:underline sm:text-[19px]">
                      {p.title}
                    </span>
                    <span className="shrink-0 self-start rounded-full bg-mist/70 px-2.5 py-1 text-[11px] text-deep/80 sm:self-center">
                      {p.topic}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-16 text-center">
              <p className="text-muted">第一批論文正在審閱中，很快就會出現在這裡。</p>
              <Link href="/notes" className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-medium text-deep hover:text-gold">
                先看看備孕筆記 <span aria-hidden>→</span>
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="bg-mist/50 py-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-4 text-center sm:px-6">
          <h2 className="font-serif text-2xl font-semibold leading-relaxed text-deep">研究看起來跟你的狀況有關？</h2>
          <p className="mt-3 text-[15.5px] leading-relaxed text-muted">
            研究是整體趨勢，你的身體是個別情況。把想問的那篇帶來門診，我們一起看它適不適用在你身上。
          </p>
          <div className="mt-7">
            <BookingButton />
          </div>
        </div>
      </section>
    </>
  );
}
