import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookingButton } from "@/components/booking";
import { buttonClass } from "@/components/button-class";
import { Twinkle } from "@/components/prince";
import { formatDate, getPaper, getPapers } from "@/lib/observatory";
import { site } from "@/config/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPapers().map((p) => ({ pmid: p.pmid }));
}

export async function generateMetadata({ params }: PageProps<"/observatory/[pmid]">): Promise<Metadata> {
  const { pmid } = await params;
  const paper = getPaper(pmid);
  if (!paper) return {};
  return {
    alternates: { canonical: `/observatory/${paper.pmid}` },
    title: paper.title,
    description: paper.takeaways[0] ?? paper.titleEn,
  };
}

export default async function PaperPage({ params }: PageProps<"/observatory/[pmid]">) {
  const { pmid } = await params;
  const paper = getPaper(pmid);
  if (!paper) notFound();

  const others = getPapers()
    .filter((p) => p.pmid !== paper.pmid)
    .slice(0, 3);

  return (
    <>
      <article>
        <header className="border-b border-deep/[0.07] bg-white">
          <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-14">
            <Link href="/observatory" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-deep">
              <span aria-hidden>←</span> 星際觀測站
            </Link>
            <p className="mt-6 flex items-center gap-2 font-display text-sm italic tracking-[0.2em] text-gold">
              <Twinkle className="h-3 w-3" />
              {paper.topic}
            </p>
            <h1 className="mt-3 font-serif text-[28px] font-semibold leading-[1.45] text-deep sm:text-[36px]">
              {paper.title}
            </h1>

            {/* 論文出處 */}
            <div className="mt-7 rounded-2xl bg-ivory p-5 text-[14.5px] leading-[1.9] text-muted sm:p-6">
              <p className="text-ink/80">{paper.titleEn}</p>
              <p className="mt-2">
                {[paper.firstAuthor && `${paper.firstAuthor} et al.`, paper.journal, formatDate(paper.pubdate)]
                  .filter(Boolean)
                  .join("・")}
              </p>
              <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
                <a href={paper.url} target="_blank" rel="noopener" className="text-deep underline-offset-4 hover:underline">
                  PubMed 原文 ↗
                </a>
                {paper.doi && (
                  <a
                    href={`https://doi.org/${paper.doi}`}
                    target="_blank"
                    rel="noopener"
                    className="text-deep underline-offset-4 hover:underline"
                  >
                    DOI：{paper.doi} ↗
                  </a>
                )}
              </p>
            </div>

            <p className="mt-6 text-sm text-muted/80">由 {site.doctor} 閱讀並撰寫解讀</p>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
          {paper.takeaways.length > 0 && (
            <div className="rounded-3xl bg-mist/60 p-7 sm:p-9">
              <h2 className="font-serif text-lg font-semibold text-deep">三十秒看懂</h2>
              <ul className="mt-4 space-y-3">
                {paper.takeaways.map((t) => (
                  <li key={t} className="flex gap-3 text-[15.5px] leading-[1.85] text-ink/80">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="prose-note mt-10" dangerouslySetInnerHTML={{ __html: paper.html }} />

          <aside className="mt-12 rounded-3xl border border-gold/40 bg-ivory p-8 text-center sm:p-10">
            <h2 className="font-serif text-xl font-semibold text-deep">研究歸研究，你的情況要個別看</h2>
            <p className="mt-3 text-[15.5px] leading-[1.9] text-muted">
              一篇研究說的是整體趨勢，不等於每個人都適用。
              <br className="hidden sm:block" />
              想知道它跟你的狀況有沒有關係，帶著問題來門診。
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <BookingButton>帶著問題來門診</BookingButton>
              <Link href="/notes" className={buttonClass("ghost")}>
                看備孕筆記
              </Link>
            </div>
          </aside>

          <p className="mt-8 text-center text-xs leading-relaxed text-muted/80">
            本頁為文獻導讀與個人解讀，不代表原作者立場，也不能取代醫師的個別診斷與建議。
          </p>
        </div>
      </article>

      {others.length > 0 && (
        <section className="border-t border-deep/[0.07] bg-white py-14">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="font-serif text-2xl font-semibold text-deep">其他觀測紀錄</h2>
            <ul className="mt-6 divide-y divide-deep/[0.09]">
              {others.map((p) => (
                <li key={p.pmid}>
                  <Link href={`/observatory/${p.pmid}`} className="group flex flex-col gap-1 py-4">
                    <span className="text-xs text-muted">
                      {p.topic}・{p.journal}・{formatDate(p.pubdate)}
                    </span>
                    <span className="font-serif text-[17px] font-semibold text-deep group-hover:text-gold">{p.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
