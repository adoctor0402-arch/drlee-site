import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookingButton } from "@/components/booking";
import { buttonClass } from "@/components/button-class";
import { Crown } from "@/components/logo";
import { Sticker } from "@/components/prince";
import { approach } from "@/config/content";
import { site } from "@/config/site";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "關於我",
  description: "認識小王子醫師 Dr. Lee（李俊逸醫師）：茂盛醫院生殖醫學，台中總院與板橋分院皆有門診。",
};

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#22385F_0%,#2E4A7E_70%,#5F73A3_100%)] text-ivory">
        <div className="mx-auto grid max-w-6xl items-end gap-10 px-4 pt-14 sm:px-6 md:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:pt-20">
          <div className="pb-14 lg:pb-24">
            <p className="font-display text-sm italic tracking-[0.2em] text-gold-soft">About Dr. Lee</p>
            <h1 className="mt-3 flex items-center gap-3 font-serif text-4xl font-semibold sm:text-5xl">
              李俊逸 醫師
              <Crown className="h-8 w-9 -translate-y-3 rotate-12" stroke="#EFC75E" />
            </h1>
            <p className="mt-2 font-display text-xl italic tracking-wide text-gold-soft">{site.nameEnFull}</p>
            <p className="mt-5 font-hand text-2xl text-sun">大家叫我「小王子醫師」</p>
            <ul className="mt-7 flex flex-wrap gap-2">
              {site.roles.map((r) => (
                <li key={r} className="rounded-full border border-white/20 px-4 py-1.5 text-sm text-ivory/85">
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div className="mx-auto w-full max-w-[380px]">
            <div className="overflow-hidden rounded-t-full bg-[#e9e9ea]">
              <Image src={site.photo} alt="李俊逸醫師穿著白袍的正式照片" width={719} height={1040} loading="eager" fetchPriority="high" className="h-auto w-full" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 md:grid-cols-[1.2fr_0.8fr] lg:px-10">
          <div className="space-y-6 text-[16.5px] leading-[2] text-ink/80">
            <h2 className="font-serif text-3xl font-semibold text-deep">為什麼是「小王子」？</h2>
            <p>
              在診間裡，我常看到很多人帶著一疊報告、一堆沒人解釋清楚的名詞，還有很多說不出口的擔心。
              生殖醫學很複雜，但我相信，它可以被說得清楚，也可以被溫柔地對待。
            </p>
            <p>
              「小王子醫師」是我給自己的提醒：像一個好奇的旅人，陪你在這段路上一起看清楚現在的位置，
              再一起決定下一步。
            </p>
            <p className="font-hand text-2xl text-deep">每一個生命，都是獨一無二的星星 <span className="text-blush">♥</span></p>
          </div>
          <div className="mx-auto w-full max-w-xs">
            <Sticker name="journey" card />
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
          <h2 className="font-serif text-3xl font-semibold text-deep">我看生殖醫學的方法</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {approach.map((a) => (
              <div key={a.n} className="rounded-3xl border border-deep/[0.07] bg-ivory p-8">
                <span className="font-display text-sm italic tracking-[0.2em] text-gold">{a.n}</span>
                <h3 className="mt-2 font-serif text-xl font-semibold text-deep">{a.title}</h3>
                <p className="mt-3 text-[15.5px] leading-[1.9] text-muted">{a.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center">
            <BookingButton />
            <Link href="/#first-visit" className={buttonClass("ghost")}>
              了解第一次門診
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
