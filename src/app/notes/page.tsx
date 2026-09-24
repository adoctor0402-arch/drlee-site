import type { Metadata } from "next";
import Link from "next/link";
import { BookingButton } from "@/components/booking";
import { NoteCard } from "@/components/note-card";
import { Sticker, Twinkle } from "@/components/prince";
import { getCategories, getNotes } from "@/lib/notes";

export const metadata: Metadata = {
  alternates: { canonical: "/notes" },
  title: "小王子的備孕筆記",
  description:
    "小王子醫師（李俊逸醫師）的備孕筆記：不孕症、高齡備孕、凍卵、試管嬰兒、胚胎、PGT、反覆流產與最新研究，用看得懂的方式說清楚。",
};

export default async function NotesPage({ searchParams }: PageProps<"/notes">) {
  const { category } = await searchParams;
  const active = typeof category === "string" ? category : undefined;
  const all = getNotes();
  const categories = getCategories();
  const notes = active ? all.filter((n) => n.category === active) : all;

  return (
    <>
      <section className="border-b border-deep/[0.07] bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-14 sm:px-6 md:grid-cols-[1.25fr_0.75fr] lg:px-10 lg:py-16">
          <div>
            <p className="flex items-center gap-2 font-display text-sm italic tracking-[0.2em] text-gold">
              <Twinkle className="h-3 w-3" />
              Fertility Notes
            </p>
            <h1 className="mt-3 font-serif text-[32px] font-semibold text-deep sm:text-[42px]">小王子的備孕筆記</h1>
            <p className="mt-4 font-hand text-2xl text-deep/85">持續學習，只為了更多幸福</p>
            <p className="mt-5 max-w-lg text-[16px] leading-[1.95] text-muted">
              把生殖醫學的研究與診間經驗，寫成看得懂的樣子。每一篇都會告訴你：問題是什麼、研究怎麼說、對你可能代表什麼。
            </p>
          </div>
          <div className="mx-auto w-40 sm:w-52">
            <Sticker name="books" card eager sizes="220px" />
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
          {/* 分類 */}
          <ul className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
            <li>
              <Link
                href="/notes"
                className={`block whitespace-nowrap rounded-full border px-4 py-2 text-sm transition-colors ${
                  active ? "border-deep/10 bg-white text-ink/80 hover:border-gold" : "border-deep bg-deep text-ivory"
                }`}
              >
                全部（{all.length}）
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c.name}>
                <Link
                  href={`/notes?category=${encodeURIComponent(c.name)}`}
                  className={`block whitespace-nowrap rounded-full border px-4 py-2 text-sm transition-colors ${
                    active === c.name ? "border-deep bg-deep text-ivory" : "border-deep/10 bg-white text-ink/80 hover:border-gold"
                  }`}
                >
                  {c.name}（{c.count}）
                </Link>
              </li>
            ))}
          </ul>

          {notes.length > 0 ? (
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {notes.map((n, i) => (
                <NoteCard key={n.slug} note={n} index={i} />
              ))}
            </div>
          ) : (
            <p className="mt-16 text-center text-muted">這個分類的筆記還在寫，先看看其他主題吧。</p>
          )}
        </div>
      </section>

      <section className="bg-mist/50 py-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-4 text-center sm:px-6">
          <h2 className="font-serif text-2xl font-semibold leading-relaxed text-deep">
            看完覺得「這好像在說我」？
          </h2>
          <p className="mt-3 text-[15.5px] text-muted">帶著你的報告來門診，我們一起看清楚你的狀況。</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <BookingButton />
          </div>
        </div>
      </section>
    </>
  );
}
