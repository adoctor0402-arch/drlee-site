import Link from "next/link";
import { BookingButton } from "@/components/booking";
import { buttonClass } from "@/components/button-class";
import { NoteCard } from "@/components/note-card";
import { Twinkle } from "@/components/prince";
import { site } from "@/config/site";
import { formatUpdated, type Note } from "@/lib/notes";
import type { TopicPage } from "@/lib/topics";

type Props = {
  page: TopicPage;
  /** 標題上方那個小標，例如分類名稱 */
  eyebrow: string;
  /** 左上角返回連結 */
  backHref: string;
  backLabel: string;
  /** 「重點先看」那一塊的標題；不給就不顯示該區塊 */
  keyPointsHeading?: string;
  /** 底部的相關筆記；空陣列就不顯示 */
  relatedNotes?: Note[];
  relatedHeading?: string;
  relatedLede?: string;
  /** 結尾 CTA 的標題 */
  ctaTitle?: string;
  /** 檔案在 repo 裡的位置，草稿提示用 */
  sourcePath: string;
};

/** /[topic]、/lab、/now 共用的文章版型。內容來自 markdown。 */
export function MdArticle({
  page,
  eyebrow,
  backHref,
  backLabel,
  keyPointsHeading = "這一頁要回答的事",
  relatedNotes = [],
  relatedHeading = "相關的備孕筆記",
  relatedLede,
  ctaTitle = "想知道你自己的狀況是哪一種？",
  sourcePath,
}: Props) {
  return (
    <>
      <article>
        <header className="border-b border-deep/[0.07] bg-white">
          <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
            <Link href={backHref} className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-deep">
              <span aria-hidden>←</span> {backLabel}
            </Link>
            {page.draft ? (
              <p className="mt-5 rounded-xl border border-gold/50 bg-gold/10 px-4 py-3 text-sm leading-relaxed text-deep">
                <strong>草稿，尚未發布。</strong>只有本機開發模式看得到。審完把{" "}
                <code className="rounded bg-white/70 px-1">{sourcePath}</code> 的{" "}
                <code className="rounded bg-white/70 px-1">draft: true</code> 改成{" "}
                <code className="rounded bg-white/70 px-1">false</code>。
              </p>
            ) : null}
            <p className="mt-6 flex items-center gap-2 font-display text-sm italic tracking-[0.2em] text-gold">
              <Twinkle className="h-3 w-3" />
              {eyebrow}
            </p>
            <h1 className="mt-3 font-serif text-[30px] font-semibold leading-[1.45] text-deep sm:text-[40px]">
              {page.title}
            </h1>
            <p className="mt-5 text-[16.5px] leading-[1.95] text-muted">{page.summary}</p>
            <p className="mt-6 text-sm text-muted/80">
              {site.doctor}・更新於 {formatUpdated(page.updated)}
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
          {keyPointsHeading && page.keyPoints.length > 0 && (
            <div className="rounded-3xl bg-mist/60 p-7 sm:p-9">
              <h2 className="font-serif text-lg font-semibold text-deep">{keyPointsHeading}</h2>
              <ul className="mt-4 space-y-3">
                {page.keyPoints.map((k) => (
                  <li key={k} className="flex gap-3 text-[15.5px] leading-[1.85] text-ink/80">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                    {k}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="prose-note mt-10" dangerouslySetInnerHTML={{ __html: page.html }} />

          {page.references.length > 0 && (
            <section className="mt-14 border-t border-deep/[0.09] pt-8">
              <h2 className="font-serif text-lg font-semibold text-deep">參考資料</h2>
              <ol className="mt-4 space-y-2.5 text-[14.5px] leading-[1.8] text-muted">
                {page.references.map((r, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="font-display text-gold">{i + 1}.</span>
                    {r.url ? (
                      <a href={r.url} target="_blank" rel="noopener" className="underline-offset-4 hover:text-deep hover:underline">
                        {r.text} ↗
                      </a>
                    ) : (
                      <span>{r.text}</span>
                    )}
                  </li>
                ))}
              </ol>
            </section>
          )}

          <aside className="mt-12 rounded-3xl border border-gold/40 bg-ivory p-8 text-center sm:p-10">
            <h2 className="font-serif text-xl font-semibold text-deep">{ctaTitle}</h2>
            <p className="mt-3 text-[15.5px] leading-[1.9] text-muted">
              每個人的年齡、卵巢功能與過去治療都不同，
              <br className="hidden sm:block" />
              實際策略仍需要個別判斷。
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <BookingButton>帶著資料來門診討論</BookingButton>
              <Link href="/first-visit" className={buttonClass("ghost")}>
                第一次門診要準備什麼
              </Link>
            </div>
          </aside>

          <p className="mt-8 text-center text-xs leading-relaxed text-muted/80">
            本文為衛教資訊，不能取代醫師的個別診斷與建議。
          </p>
        </div>
      </article>

      {relatedNotes.length > 0 && (
        <section className="border-t border-deep/[0.07] bg-white py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
            <h2 className="font-serif text-2xl font-semibold text-deep">{relatedHeading}</h2>
            {relatedLede ? <p className="mt-3 text-[15.5px] text-muted">{relatedLede}</p> : null}
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {relatedNotes.map((n, i) => (
                <NoteCard key={n.slug} note={n} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
